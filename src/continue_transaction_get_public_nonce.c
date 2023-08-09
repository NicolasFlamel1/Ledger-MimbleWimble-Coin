// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "continue_transaction_get_public_nonce.h"
#include "transaction.h"


// Supporting function implementation

// Process continue transaction get public nonce request
void processContinueTransactionGetPublicNonceRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

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
	
	// Check if transaction is sending and transaction offset wasn't applied
	if(transaction.send && !transaction.offsetApplied) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;

	// Initialize public nonce
	volatile uint8_t publicNonce[COMPRESSED_PUBLIC_KEY_SIZE];

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get private key from the transaction's secret nonce
			cx_ecfp_init_private_key(CX_CURVE_SECP256K1, (uint8_t *)transaction.secretNonce, sizeof(transaction.secretNonce), (cx_ecfp_private_key_t *)&privateKey);
	
			// Get public nonce from the private key
			getPublicKeyFromPrivateKey(publicNonce, (cx_ecfp_private_key_t *)&privateKey);
		}
		
		// Finally
		FINALLY {
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the public nonce will overflow
	if(willResponseOverflow(*responseLength, sizeof(publicNonce))) {
	
		// Throw length error
		THROW(LENGTH_ERROR);
	}
	
	// Append public nonce to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)publicNonce, sizeof(publicNonce));
	
	*responseLength += sizeof(publicNonce);

	// Throw success
	THROW(SWO_SUCCESS);
}
