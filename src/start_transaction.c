// Header files
#include <string.h>
#include "common.h"
#include "start_transaction.h"
#include "transaction.h"


// Supporting function implementation

// Process start transaction request
void processStartTransactionRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Reset the transaction
	resetTransaction();

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter > TESTNET_NETWORK_TYPE || secondParameter || dataLength != sizeof(uint32_t) + sizeof(uint64_t) + sizeof(uint64_t) + sizeof(uint64_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get transaction's account from data
	transaction.account = *(uint32_t *)data;
	
	// Check if account is invalid
	if(transaction.account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get transaction's remaining output from data
	transaction.remainingOutput = *(uint64_t *)&data[sizeof(transaction.account)];
	
	// Get transaction's input from data
	transaction.input = *(uint64_t *)&data[sizeof(transaction.account) + sizeof(transaction.remainingOutput)];
	
	// Get transaction's fee from data
	transaction.fee = *(uint64_t *)&data[sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(transaction.input)];
	
	// Check if remaining output and input are invalid
	if(!transaction.remainingOutput && !transaction.input) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if an input exists
	if(transaction.input) {
	
		// Check if fee is invalid or will overflow
		if(!transaction.fee || UINT64_MAX - transaction.input < transaction.fee) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
		
		// Set transaction's remaining input
		transaction.remainingInput = transaction.input + transaction.fee;
	}
	
	// Otherwise
	else {
	
		// Check if fee is invalid
		if(transaction.fee) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	}
	
	// Set that transaction has been started
	transaction.started = true;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
