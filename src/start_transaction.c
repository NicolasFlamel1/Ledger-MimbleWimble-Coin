// Header files
#include <string.h>
#include "common.h"
#include "currency_information.h"
#include "mqs.h"
#include "start_transaction.h"
#include "tor.h"
#include "transaction.h"
#include "slatepack.h"


// Supporting function implementation

// Process start transaction request
void processStartTransactionRequest(__attribute__((unused)) unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

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
	if(firstParameter || secondParameter || dataLength < sizeof(uint32_t) + sizeof(uint32_t) + sizeof(uint64_t) + sizeof(uint64_t) + sizeof(uint64_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get account from data
	uint32_t account;
	memcpy(&account, data, sizeof(account));
	
	// Check if account is invalid
	if(account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get index from data
	uint32_t index;
	memcpy(&index, &data[sizeof(account)], sizeof(index));
	
	// Get output from data
	uint64_t output;
	memcpy(&output, &data[sizeof(account) + sizeof(index)], sizeof(output));
	
	// Get input from data
	uint64_t input;
	memcpy(&input, &data[sizeof(account) + sizeof(index) + sizeof(output)], sizeof(input));
	
	// Get fee from data
	uint64_t fee;
	memcpy(&fee, &data[sizeof(account) + sizeof(index) + sizeof(output) + sizeof(input)], sizeof(fee));
	
	// Check if an address is provided
	size_t addressLength = 0;
	const char *address;
	if(dataLength != sizeof(account) + sizeof(index) + sizeof(output) + sizeof(input) + sizeof(fee)) {
	
		// Get address length
		addressLength = dataLength - (sizeof(account) + sizeof(index) + sizeof(output) + sizeof(input) + sizeof(fee));
		
		// Get address from data
		address = (char *)&data[sizeof(account) + sizeof(index) + sizeof(output) + sizeof(input) + sizeof(fee)];
		
		// Check address length
		switch(addressLength) {
		
			// MQS address size
			case MQS_ADDRESS_SIZE:
			
				// Check currency doesn't allow MQS addresses
				if(!currencyInformation.enableMqsAddress) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
			
				// Check if address isn't a valid MQS address
				if(!getPublicKeyFromMqsAddress(NULL, address, addressLength)) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
			
				// Break
				break;
			
			// Tor address size
			case TOR_ADDRESS_SIZE:
			
				// Check currency doesn't allow Tor addresses
				if(!currencyInformation.enableTorAddress) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
			
				// Check if address isn't a valid Tor address
				if(!getPublicKeyFromTorAddress(NULL, address, addressLength)) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
			
				// Break
				break;
			
			// Default
			default:
			
				// Check if address length is a Slatepack address's length
				if(addressLength == SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart)) {
			
					// Check currency doesn't allow Slatepack addresses
					if(!currencyInformation.enableSlatepackAddress) {
					
						// Throw invalid parameters error
						THROW(INVALID_PARAMETERS_ERROR);
					}
				
					// Check if address isn't a valid Slatepack address
					if(!getPublicKeyFromSlatepackAddress(NULL, address, addressLength)) {
					
						// Throw invalid parameters error
						THROW(INVALID_PARAMETERS_ERROR);
					}
				}
				
				// Otherwise
				else {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
			
				// Break
				break;
		}
	}
	
	// Create transaction's secret nonce
	createSingleSignerNonces((uint8_t *)transaction.secretNonce, NULL);
	
	// Check if an input exists
	if(input) {
	
		// Check if input is invalid
		if(input <= output) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	
		// Check if fee is invalid or will overflow
		if(!fee || UINT64_MAX - input < fee) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
		
		// Set transaction's remaining input
		transaction.remainingInput = input + fee;
		
		// Set transaction's send
		transaction.send = input - output;
	}
	
	// Otherwise
	else {
	
		// Check if output is invalid
		if(!output) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
		
		// Set transaction's receive
		transaction.receive = output;
	}
	
	// Set transaction's account
	transaction.account = account;
	
	// Set transaction's index
	transaction.index = index;
	
	// Set transaction's remaining output
	transaction.remainingOutput = output;
	
	// Set transaction's fee
	transaction.fee = fee;
	
	// Set transaction's address length
	transaction.addressLength = addressLength;
	
	// Check if address exists
	if(addressLength) {
	
		// Set transaction's address
		memcpy(transaction.address, address, addressLength);
	}
	
	// Set that transaction has been started
	transaction.started = true;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
