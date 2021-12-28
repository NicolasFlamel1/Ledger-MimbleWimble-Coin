// Header files
#include <string.h>
#include "blake2b.h"
#include "common.h"
#include "continue_transaction_get_message_signature.h"
#include "crypto.h"
#include "transaction.h"


// Supporting function implementation

// Process continue transaction get message signature request
void processContinueTransactionGetMessageSignatureRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength <= NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get secret nonce from data
	uint8_t *secretNonce = data;
	
	// Check if secret nonce is invalid
	if(cx_math_is_zero(secretNonce, NONCE_SIZE)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get public nonce from data
	const uint8_t *publicNonce = &data[NONCE_SIZE];
	
	// Check if public nonce is invalid
	if(!isValidSecp256k1PublicKey(publicNonce, COMPRESSED_PUBLIC_KEY_SIZE)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get public key from data
	const uint8_t *publicKey = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Check if public key is invalid
	if(!isValidSecp256k1PublicKey(publicKey, COMPRESSED_PUBLIC_KEY_SIZE)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get message from data
	char *message = (char *)&data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Get message length
	const size_t messageLength = dataLength - (NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE);
	
	// Check if message is invalid
	if(!isValidUtf8String(message, messageLength)) {
	
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
	
	// Get hash from the message
	uint8_t hash[SINGLE_SIGNER_MESSAGE_SIZE];
	getBlake2b(hash, sizeof(hash), (uint8_t *)message, messageLength, NULL, 0);
	
	// Initialize signature
	uint8_t signature[SINGLE_SIGNER_COMPACT_SIGNATURE_SIZE];

	// Create single-signer signature from the hash, transaction's blinding factor, secret nonce, public nonce, and public key
	createSingleSignerSignature(signature, hash, (uint8_t *)transaction.blindingFactor, secretNonce, publicNonce, publicKey);
	
	// Append signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], signature, sizeof(signature));
	
	*responseLength += sizeof(signature);
	
	// Throw success
	THROW(SWO_SUCCESS);
}
