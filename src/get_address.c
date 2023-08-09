// Header files
#include <alloca.h>
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "get_address.h"
#include "mqs.h"
#include "slatepack.h"
#include "tor.h"


// Supporting function implementation

// Process get address request
void processGetAddressRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(secondParameter || dataLength != sizeof(uint32_t) + sizeof(uint32_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get address type from first parameter
	const enum AddressType addressType = firstParameter;
	
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
	
	// Check address type
	char *address;
	size_t addressLength;
	switch(addressType) {
		
		// MQS address type
		case MQS_ADDRESS_TYPE:
		
			// Check currency doesn't allow MQS addresses
			if(!currencyInformation.enableMqsAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set address length
			addressLength = MQS_ADDRESS_SIZE;
			
			// Allocate memory for address
			address = alloca(addressLength);
			
			// Get MQS address
			getMqsAddress(address, account, index);
		
			// Break
			break;
		
		// Tor address type
		case TOR_ADDRESS_TYPE:
		
			// Check currency doesn't allow Tor addresses
			if(!currencyInformation.enableTorAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set address length
			addressLength = TOR_ADDRESS_SIZE;
			
			// Allocate memory for address
			address = alloca(addressLength);
			
			// Get Tor address
			getTorAddress(address, account, index);
			
			// Break
			break;
		
		// Slatepack address type
		case SLATEPACK_ADDRESS_TYPE:
		
			// Check currency doesn't allow Slatepack addresses
			if(!currencyInformation.enableSlatepackAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set address length
			addressLength = SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart);
			
			// Allocate memory for address
			address = alloca(addressLength);
			
			// Get Slatepack address
			getSlatepackAddress(address, account, index);
			
			// Break
			break;
		
		// Default
		default:
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if response with the address will overflow
	if(willResponseOverflow(*responseLength, addressLength)) {
	
		// Throw length error
		THROW(LENGTH_ERROR);
	}
	
	// Append address to response
	memcpy(&G_io_apdu_buffer[*responseLength], address, addressLength);
	
	*responseLength += addressLength;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
