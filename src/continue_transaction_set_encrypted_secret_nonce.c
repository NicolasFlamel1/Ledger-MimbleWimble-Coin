// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "continue_transaction_set_encrypted_secret_nonce.h"
#include "transaction.h"


// Supporting function implementation

// Process continue transaction set encrypted secret nonce request
void processContinueTransactionSetEncryptedSecretNonceRequest(__attribute__((unused)) unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength < getEncryptedDataLength(sizeof(transaction.secretNonce) + sizeof(uint8_t)) || dataLength > getEncryptedDataLength(sizeof(transaction.secretNonce) + MAXIMUM_DER_SIGNATURE_SIZE)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get encrypted secret nonce and signature from data
	const uint8_t *encryptedSecretNonceAndSignature = data;
	
	// Get encrypted secret nonce and signature size
	const size_t encryptedSecretNonceAndSignatureSize = dataLength;
	
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
	
	// Check if a message was signed for the transaction
	if(transaction.messageSigned) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Check if the secret nonce was set for the transaction
	if(transaction.secretNonceSet) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Initialize secret nonce and signature
	volatile uint8_t secretNonceAndSignature[encryptedSecretNonceAndSignatureSize];
	
	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Decrypt the encrypted secret nonce and signature with the transaction's blinding factor
			const size_t secretNonceAndSignatureLength = decryptData(secretNonceAndSignature, encryptedSecretNonceAndSignature, encryptedSecretNonceAndSignatureSize, (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor));
			
			// Check if secret nonce and signature length is invalid
			if(secretNonceAndSignatureLength <= sizeof(transaction.secretNonce)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Get secret nonce and signature from the secret nonce and signature
			const uint8_t *secretNonce = (uint8_t *)secretNonceAndSignature;
			const uint8_t *signature = (uint8_t *)&secretNonceAndSignature[sizeof(transaction.secretNonce)];
			
			// Get private key from the transaction's blinding factor
			cx_ecfp_init_private_key(CX_CURVE_SECP256K1, (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor), (cx_ecfp_private_key_t *)&privateKey);
			
			// Get public key from private key
			cx_ecfp_public_key_t publicKey;
			cx_ecfp_generate_pair(CX_CURVE_SECP256K1, &publicKey, (cx_ecfp_private_key_t *)&privateKey, KEEP_PRIVATE_KEY);
			
			// Check if the public key and signature don't verify the secret nonce
			if(!cx_ecdsa_verify(&publicKey, CX_LAST, CX_SHA256, secretNonce, sizeof(transaction.secretNonce), signature, secretNonceAndSignatureLength - sizeof(transaction.secretNonce))) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set transaction's secret nonce
			memcpy((uint8_t *)transaction.secretNonce, secretNonce, sizeof(transaction.secretNonce));
		}
		
		// Finally
		FINALLY {
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
			
			// Clear the secret nonce and signature
			explicit_bzero((uint8_t *)secretNonceAndSignature, sizeof(secretNonceAndSignature));
		}
	}
	
	// End try
	END_TRY;
	
	// Set that transaction's secret nonce was set
	transaction.secretNonceSet = true;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
