// Header files
#include <alloca.h>
#include <string.h>
#include "../common.h"
#include "../crypto.h"
#include "get_address.h"
#include "../mqs.h"
#include "../tor.h"


// Supporting function implementation

// Process get address request
void processGetAddressRequest(unsigned short *responseLength, __attribute__((unused)) const unsigned char *responseFlags) {

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

			// Set address length
			addressLength = TOR_ADDRESS_SIZE;

			// Allocate memory for address
			address = alloca(addressLength);

			// Get Tor address
			getTorAddress(address, account, index);

			// Break
			break;

		// Default
		default:

			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);

			// Break
			break;
	}

	// Check if response with the address will overflow
	if(willResponseOverflow(*responseLength, addressLength)) {

		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append address to response
	memcpy(&G_io_apdu_buffer[*responseLength], address, addressLength);

	*responseLength += addressLength;

	// Throw success
	THROW(SWO_SUCCESS);
}
