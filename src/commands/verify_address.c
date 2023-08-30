// Header files
#include <string.h>
#include "../common.h"
#include "../menus.h"
#include "../mqs.h"
#include "../tor.h"
#include "verify_address.h"


// Supporting function implementation

// Process verify address request
void processVerifyAddressRequest(__attribute__((unused)) const unsigned short *responseLength, unsigned char *responseFlags) {

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
	switch(addressType) {

		// MQS address type
		case MQS_ADDRESS_TYPE:

// Check if has BAGL
#ifdef HAVE_BAGL

			// Set verify address line buffer
			explicit_bzero(verifyAddressLineBuffer, sizeof(verifyAddressLineBuffer));
			strncpy(verifyAddressLineBuffer, "Verify MQS", sizeof(verifyAddressLineBuffer) - sizeof((char)'\0'));

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

			// Set verify address line buffer
			explicit_bzero(verifyAddressLineBuffer, sizeof(verifyAddressLineBuffer));
			strncpy(verifyAddressLineBuffer, "Verify MQS\naddress", sizeof(verifyAddressLineBuffer) - sizeof((char)'\0'));

			// Set succeeded line buffer
			explicit_bzero(succeededLineBuffer, sizeof(succeededLineBuffer));
			strncpy(succeededLineBuffer, "MQS ADDRESS\nVERIFIED", sizeof(succeededLineBuffer) - sizeof((char)'\0'));

			// Set failed line buffer
			explicit_bzero(failedLineBuffer, sizeof(failedLineBuffer));
			strncpy(failedLineBuffer, "Verifying MQS address\nfailed", sizeof(failedLineBuffer) - sizeof((char)'\0'));

			// Set canceled line buffer
			explicit_bzero(canceledLineBuffer, sizeof(canceledLineBuffer));
			strncpy(canceledLineBuffer, "Verifying MQS address\ncanceled", sizeof(canceledLineBuffer) - sizeof((char)'\0'));
#endif

			// Set address type line buffer
			explicit_bzero(addressTypeLineBuffer, sizeof(addressTypeLineBuffer));
			strncpy(addressTypeLineBuffer, "MQS Address", sizeof(addressTypeLineBuffer) - sizeof((char)'\0'));

			// Get MQS address
			char mqsAddress[MQS_ADDRESS_SIZE];
			getMqsAddress(mqsAddress, account, index);

			// Copy MQS address into the address line buffer
			memcpy(addressLineBuffer, mqsAddress, sizeof(mqsAddress));
			addressLineBuffer[sizeof(mqsAddress)] = '\0';

			// Break
			break;

		// Tor address type
		case TOR_ADDRESS_TYPE:

// Check if has BAGL
#ifdef HAVE_BAGL

			// Set verify address line buffer
			explicit_bzero(verifyAddressLineBuffer, sizeof(verifyAddressLineBuffer));
			strncpy(verifyAddressLineBuffer, "Verify Tor", sizeof(verifyAddressLineBuffer) - sizeof((char)'\0'));

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

			// Set verify address line buffer
			explicit_bzero(verifyAddressLineBuffer, sizeof(verifyAddressLineBuffer));
			strncpy(verifyAddressLineBuffer, "Verify Tor\naddress", sizeof(verifyAddressLineBuffer) - sizeof((char)'\0'));

			// Set succeeded line buffer
			explicit_bzero(succeededLineBuffer, sizeof(succeededLineBuffer));
			strncpy(succeededLineBuffer, "TOR ADDRESS\nVERIFIED", sizeof(succeededLineBuffer) - sizeof((char)'\0'));

			// Set failed line buffer
			explicit_bzero(failedLineBuffer, sizeof(failedLineBuffer));
			strncpy(failedLineBuffer, "Verifying Tor address\nfailed", sizeof(failedLineBuffer) - sizeof((char)'\0'));

			// Set canceled line buffer
			explicit_bzero(canceledLineBuffer, sizeof(canceledLineBuffer));
			strncpy(canceledLineBuffer, "Verifying Tor address\ncanceled", sizeof(canceledLineBuffer) - sizeof((char)'\0'));
#endif

			// Set address type line buffer
			explicit_bzero(addressTypeLineBuffer, sizeof(addressTypeLineBuffer));
			strncpy(addressTypeLineBuffer, "Tor Address", sizeof(addressTypeLineBuffer) - sizeof((char)'\0'));

			// Get Tor address
			char torAddress[TOR_ADDRESS_SIZE];
			getTorAddress(torAddress, account, index);

			// Copy Tor address into the address line buffer
			memcpy(addressLineBuffer, torAddress, sizeof(torAddress));
			addressLineBuffer[sizeof(torAddress)] = '\0';

			// Break
			break;

		// Default
		default:

			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);

			// Break
			break;
	}

	// Show verify address menu
	showMenu(VERIFY_ADDRESS_MENU);

	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process verify address user interaction
void processVerifyAddressUserInteraction(__attribute__((unused)) const unsigned short *responseLength) {

	// Throw success
	THROW(SWO_SUCCESS);
}
