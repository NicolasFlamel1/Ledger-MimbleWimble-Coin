// Header files
#include <string.h>
#include "common.h"
#include "currency_information.h"
#include "menus.h"
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
	if(firstParameter || secondParameter || dataLength != sizeof(uint32_t) + sizeof(uint64_t) + sizeof(uint64_t) + sizeof(uint64_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get account from data
	const uint32_t *account = (uint32_t *)data;
	
	// Check if account is invalid
	if(*account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get output value from data
	const uint64_t *outputValue = (uint64_t *)&data[sizeof(*account)];
	
	// Get input value from data
	const uint64_t *inputValue = (uint64_t *)&data[sizeof(*account) + sizeof(*outputValue)];
	
	// Get fee from data
	const uint64_t *fee = (uint64_t *)&data[sizeof(*account) + sizeof(*outputValue) + sizeof(*inputValue)];
	
	// Check if output and input values are invalid
	if(!*outputValue && !*inputValue) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if an input value exists
	if(*inputValue) {
	
		// Check if fee is invalid or will overflow
		if(!*fee || UINT64_MAX - *inputValue < *fee) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
		
		// Copy the input value into the amount line buffer
		explicit_bzero(amountLineBuffer, sizeof(amountLineBuffer));
		toString(amountLineBuffer, *inputValue, currencyInformation.fractionalDigits);
		
		strcat(amountLineBuffer, " ");
		strcat(amountLineBuffer, currencyInformation.abbreviation);
		
		// Copy the fee into the fee line buffer
		explicit_bzero(feeLineBuffer, sizeof(feeLineBuffer));
		toString(feeLineBuffer, *fee, currencyInformation.fractionalDigits);
		
		strcat(feeLineBuffer, " ");
		strcat(feeLineBuffer, currencyInformation.abbreviation);
	
		// Show start transaction menu
		showMenu(START_TRANSACTION_MENU);
		
		// Set response flags to send response later
		*responseFlags |= IO_ASYNCH_REPLY;
	}
	
	// Otherwise
	else {
	
		// Check if fee is invalid
		if(*fee) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	
		// Process start transaction user interaction
		processStartTransactionUserInteraction(responseLength);
	}
}

// Process start transaction user interaction
void processStartTransactionUserInteraction(unsigned short *responseLength) {

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];
	
	// Get transaction's account from data
	transaction.account = *(uint32_t *)data;

	// Get transaction's output value from data
	transaction.outputValue = *(uint64_t *)&data[sizeof(transaction.account)];
	
	// Get transaction's input value from data
	transaction.inputValue = *(uint64_t *)&data[sizeof(transaction.account) + sizeof(transaction.outputValue)] + *(uint64_t *)&data[sizeof(transaction.account) + sizeof(transaction.outputValue) + sizeof(uint64_t)];
	
	// Set that transaction has been started
	transaction.started = true;
	
	// Set transaction's includes input to if the input value exists
	transaction.includesInput = transaction.inputValue;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
