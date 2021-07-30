// Header files
#define _GNU_SOURCE
#include <string.h>
#undef _GNU_SOURCE
#include "common.h"
#include "crypto.h"
#include "get_mqs_transaction_signature.h"
#include "mqs.h"


// Supporting function implementation

// Process get MQS transaction signature request
void processGetMqsTransactionSignatureRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(secondParameter || dataLength <= sizeof(uint32_t) + sizeof(uint64_t) + COMMITMENT_SIZE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get network from first parameter
	enum Network network = firstParameter;
	
	// Get account from data
	const uint32_t *account = (uint32_t *)data;
	
	// Check if account is invalid
	if(*account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get value from data
	const uint64_t *value = (uint64_t *)&data[sizeof(*account)];
	
	// Check if value is invalid
	if(!*value) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get commitment from data
	const uint8_t *commitment = &data[sizeof(*account) + sizeof(*value)];
	
	// Check if commitment is invalid
	if(!commitmentIsValid(commitment)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get sender address from data
	const uint8_t *senderAddress = &data[sizeof(*account) + sizeof(*value) + COMMITMENT_SIZE];
	
	// Get sender address length
	const size_t senderAddressLength = dataLength - (sizeof(*account) + sizeof(*value) + COMMITMENT_SIZE);
	
	// Get payment proof message
	uint8_t paymentProofMessage[getPaymentProofMessageLength(*value, senderAddressLength)];
	
	getPaymentProofMessage(paymentProofMessage, *value, commitment, senderAddress, senderAddressLength, network);
	
	// Get hash of the payment proof message
	uint8_t hash[CX_SHA256_SIZE];
	cx_hash_sha256(paymentProofMessage, sizeof(paymentProofMessage), hash, sizeof(hash));
	
	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;
	
	// Initialize signature
	volatile uint8_t signature[MAXIMUM_DER_SIGNATURE_SIZE];
	
	// Initialize signature length
	volatile int signatureLength;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get address private key at the MQS address private key index
			getAddressPrivateKey(&addressPrivateKey, *account, MQS_ADDRESS_PRIVATE_KEY_INDEX, CX_CURVE_SECP256K1);
			
			// Get address public key from the address private key
			cx_ecfp_public_key_t addressPublicKey;
			cx_ecfp_generate_pair(CX_CURVE_SECP256K1, &addressPublicKey, (cx_ecfp_private_key_t *)&addressPrivateKey, KEEP_PRIVATE_KEY);
			
			// Check if the address public key is in the payment proof message
			if(memmem(paymentProofMessage, sizeof(paymentProofMessage), addressPublicKey.W, addressPublicKey.W_len)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Compress the address public key
			addressPublicKey.W[0] = (addressPublicKey.W[addressPublicKey.W_len - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
			
			// Check if the compressed address public key is in the payment proof message
			if(memmem(paymentProofMessage, sizeof(paymentProofMessage), addressPublicKey.W, COMPRESSED_PUBLIC_KEY_SIZE)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
	
			// Get signature of hash
			signatureLength = cx_ecdsa_sign((cx_ecfp_private_key_t *)&addressPrivateKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, hash, sizeof(hash), (uint8_t *)signature, sizeof(signature), NULL);
		}
		
		// Finally
		FINALLY {
		
			// Clear the address private key
			explicit_bzero((cx_ecfp_private_key_t *)&addressPrivateKey, sizeof(addressPrivateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the signature will overflow
	if(willResponseOverflow(*responseLength, signatureLength)) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)signature, signatureLength);
	
	*responseLength += signatureLength;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
