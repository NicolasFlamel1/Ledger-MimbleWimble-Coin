// Header files
#include <string.h>
#include "../blake2b.h"
#include "../common.h"
#include "continue_transaction_get_message_signature.h"
#include "../crypto.h"
#include "../transaction.h"


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
	if(firstParameter || secondParameter || dataLength <= COMPRESSED_PUBLIC_KEY_SIZE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get public key from data
	const uint8_t *publicKey = data;
	
	// Check if public key is invalid
	if(!isValidSecp256k1PublicKey(publicKey, COMPRESSED_PUBLIC_KEY_SIZE)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get message from data
	const char *message = (char *)&data[COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Get message length
	const size_t messageLength = dataLength - COMPRESSED_PUBLIC_KEY_SIZE;
	
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
	
	// Check if transaction is sending and transaction offset wasn't applied
	if(transaction.send && !transaction.offsetApplied) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Check if a message was signed for the transaction
	if(transaction.messageSigned) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Get hash from the message
	uint8_t hash[SINGLE_SIGNER_MESSAGE_SIZE];
	getBlake2b(hash, sizeof(hash), (uint8_t *)message, messageLength, NULL, 0);
	
	// Initialize secret nonce
	volatile uint8_t secretNonce[NONCE_SIZE];
	
	// Initialize signature
	volatile uint8_t signature[SINGLE_SIGNER_COMPACT_SIGNATURE_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Loop while secret nonce is the same as the transaction's secret nonce
			uint8_t publicNonce[COMPRESSED_PUBLIC_KEY_SIZE];
			do {
		
				// Create secret nonce and public nonce
				createSingleSignerNonces((uint8_t *)secretNonce, publicNonce);
			
			} while(!memcmp((uint8_t *)secretNonce, (uint8_t *)transaction.secretNonce, sizeof(transaction.secretNonce)));
			
			// Create single-signer signature from the hash, transaction's blinding factor, secret nonce, public nonce, and public key
			createSingleSignerSignature(signature, hash, (uint8_t *)transaction.blindingFactor, (uint8_t *)secretNonce, publicNonce, publicKey);
		}
		
		// Catch invalid parameters error
		CATCH(INVALID_PARAMETERS_ERROR) {
		
			// Throw internal error error
			THROW(INTERNAL_ERROR_ERROR);
		}
		
		// Finally
		FINALLY {
		
			// Clear the secret nonce
			explicit_bzero((uint8_t *)secretNonce, sizeof(secretNonce));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with signature will overflow
	if(willResponseOverflow(*responseLength, sizeof(signature))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)signature, sizeof(signature));
	
	*responseLength += sizeof(signature);
	
	// Set that transaction's message was signed
	transaction.messageSigned = true;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
