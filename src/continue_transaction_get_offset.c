// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "continue_transaction_get_offset.h"
#include "transaction.h"


// Supporting function implementation

// Process continue transaction get offset request
void processContinueTransactionGetOffsetRequest(unsigned short *responseLength, unsigned char *responseFlags) {

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
	
	// Check if transaction still has output or input values
	if(transaction.outputValue || transaction.inputValue) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Check if transaction doesn't include input or the offset was already created
	if(!transaction.includesInput || transaction.offsetCreated) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Initialize offset
	uint8_t offset[BLINDING_FACTOR_SIZE];
	
	// While offset isn't a valid secret key
	do {
	
		// Create a random offset
		cx_rng(offset, sizeof(offset));
		
	} while(!isValidSecp256k1PrivateKey(offset, sizeof(offset)));
	
	// Update transaction's blinding factor with the offset as a negative blinding factor
	updateBlindingFactorSum(transaction.blindingFactor, offset, false);
	
	// Check if response with the offset will overflow
	if(willResponseOverflow(*responseLength, sizeof(offset))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append offset to response
	memcpy(&G_io_apdu_buffer[*responseLength], offset, sizeof(offset));
	
	*responseLength += sizeof(offset);
	
	// Set that transaction's offset was created
	transaction.offsetCreated = true;

	// Throw success
	THROW(SWO_SUCCESS);
}
