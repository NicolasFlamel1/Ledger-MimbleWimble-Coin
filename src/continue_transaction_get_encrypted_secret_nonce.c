// Header files
#include <alloca.h>
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "continue_transaction_get_encrypted_secret_nonce.h"
#include "transaction.h"


// Supporting function implementation

// Process continue transaction get encrypted secret nonce request
void processContinueTransactionGetEncryptedSecretNonceRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if transaction hasn't been started
	if(!transaction.started) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Check if transaction has remaining output or input
	if(transaction.remainingOutput || transaction.remainingInput) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Check if transaction isn't sending or transaction offset wasn't applied
	if(!transaction.send || !transaction.offsetApplied) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Check if the secret nonce was set for the transaction
	if(transaction.secretNonceSet) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Initialize signature
	volatile uint8_t signature[MAXIMUM_DER_SIGNATURE_SIZE];
	
	// Initialize secret nonce and signature
	volatile uint8_t secretNonceAndSignature[sizeof(transaction.secretNonce) + sizeof(signature)];
	
	// Initialize encrypted secret nonce and signature
	volatile uint8_t *encryptedSecretNonceAndSignature;
	
	// Initialize encrypted secret nonce and signature length
	volatile size_t encryptedSecretNonceAndSignatureLength;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get private key from the transaction's blinding factor
			cx_ecfp_init_private_key(CX_CURVE_SECP256K1, (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor), (cx_ecfp_private_key_t *)&privateKey);
			
			// Sign the transaction's secret nonce with the private key
			const size_t signatureLength = cx_ecdsa_sign((cx_ecfp_private_key_t *)&privateKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, (uint8_t *)transaction.secretNonce, sizeof(transaction.secretNonce), (uint8_t *)signature, sizeof(signature), NULL);
			
			// Set encrypted secret nonce and signature length
			encryptedSecretNonceAndSignatureLength = getEncryptedDataLength(sizeof(transaction.secretNonce) + signatureLength);
			
			// Allocate memory for the encrypted secret nonce and signature
			encryptedSecretNonceAndSignature = alloca(encryptedSecretNonceAndSignatureLength);
			
			// Encrypt the transaction's secret nonce and the signature with the transaction's blinding factor
			memcpy((uint8_t *)secretNonceAndSignature, (uint8_t *)transaction.secretNonce, sizeof(transaction.secretNonce));
			memcpy((uint8_t *)&secretNonceAndSignature[sizeof(transaction.secretNonce)], (uint8_t *)signature, signatureLength);
			
			encryptData(encryptedSecretNonceAndSignature, (uint8_t *)secretNonceAndSignature, sizeof(transaction.secretNonce) + signatureLength, (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor));
		}
		
		// Finally
		FINALLY {
		
			// Clear the secret nonce and signature
			explicit_bzero((uint8_t *)secretNonceAndSignature, sizeof(secretNonceAndSignature));
		
			// Clear the signature
			explicit_bzero((uint8_t *)signature, sizeof(signature));
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the encrypted secret nonce and signature will overflow
	if(willResponseOverflow(*responseLength, encryptedSecretNonceAndSignatureLength)) {
	
		// Throw length error
		THROW(LENGTH_ERROR);
	}
	
	// Append encrypted secret nonce and signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)encryptedSecretNonceAndSignature, encryptedSecretNonceAndSignatureLength);
	
	*responseLength += encryptedSecretNonceAndSignatureLength;

	// Throw success
	THROW(SWO_SUCCESS);
}
