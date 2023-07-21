// Header files
#include <string.h>
#include "../common.h"
#include "../crypto.h"
#include "continue_transaction_apply_offset.h"
#include "../transaction.h"


// Supporting function implementation

// Process continue transaction apply offset request
void processContinueTransactionApplyOffsetRequest(unsigned short *responseLength, __attribute__((unused)) const unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];

	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];

	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength != BLINDING_FACTOR_SIZE) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Get offset from data
	const uint8_t *offset = data;

	// Check if offset is invalid
	if(!isValidSecp256k1PrivateKey(offset, BLINDING_FACTOR_SIZE)) {

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

	// Check if an offset was already applied to the transaction
	if(transaction.offsetApplied) {

		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}

	// Check if a message was signed for the transaction
	if(transaction.messageSigned) {

		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}

	// Update transaction's blinding factor with the offset as a negative blinding factor
	updateBlindingFactorSum((uint8_t *)transaction.blindingFactor, offset, false);

	// Set that transaction's offset was applied
	transaction.offsetApplied = true;

	// Check if transaction is sending
	if(transaction.send) {

		// Check if transaction doesn't have a secret nonce
		if(!transaction.secretNonceIndex) {

			// Create and save transaction secret nonce
			createAndSaveTransactionSecretNonce();

			// Check if response with transaction's secret nonce index will overflow
			if(willResponseOverflow(*responseLength, sizeof(transaction.secretNonceIndex))) {

				// Throw length error
				THROW(ERR_APD_LEN);
			}

			// Append transaction's secret nonce index to response
			memcpy(&G_io_apdu_buffer[*responseLength], &transaction.secretNonceIndex, sizeof(transaction.secretNonceIndex));

			*responseLength += sizeof(transaction.secretNonceIndex);
		}

		// Otherwise
		else {

			// Restore transaction secret nonce
			restoreTransactionSecretNonce();
		}
	}

	// Throw success
	THROW(SWO_SUCCESS);
}
