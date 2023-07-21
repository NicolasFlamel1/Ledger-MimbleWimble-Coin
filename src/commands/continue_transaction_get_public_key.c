// Header files
#include <string.h>
#include "../common.h"
#include "../crypto.h"
#include "continue_transaction_get_public_key.h"
#include "../transaction.h"


// Supporting function implementation

// Process continue transaction get public key request
void processContinueTransactionGetPublicKeyRequest(unsigned short *responseLength, __attribute__((unused)) const unsigned char *responseFlags) {

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

	// Initialize public key
	volatile uint8_t publicKey[COMPRESSED_PUBLIC_KEY_SIZE];

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get private key from the transaction's blinding factor and throw error if it fails
			CX_THROW(cx_ecfp_init_private_key_no_throw(CX_CURVE_SECP256K1, (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor), (cx_ecfp_private_key_t *)&privateKey));

			// Get public key from the private key
			getPublicKeyFromPrivateKey(publicKey, (cx_ecfp_private_key_t *)&privateKey);
		}

		// Finally
		FINALLY {

			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}

	// End try
	END_TRY;

	// Check if response with the public key will overflow
	if(willResponseOverflow(*responseLength, sizeof(publicKey))) {

		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append public key to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)publicKey, sizeof(publicKey));

	*responseLength += sizeof(publicKey);

	// Throw success
	THROW(SWO_SUCCESS);
}
