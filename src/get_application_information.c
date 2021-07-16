// Header files
#include <string.h>
#include "common.h"
#include "currency_information.h"
#include "get_application_information.h"


// Supporting function implementation

// Process get application information request
void processGetApplicationInformationRequest(unsigned short *responseLength, unsigned char *responseFlags) {

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
	
	// Check if response with the application information will overflow
	if(willResponseOverflow(*responseLength, strlen(currencyInformation.name) + sizeof((char)'\0') + strlen(currencyInformation.version) + sizeof((char)'\0'))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append application information to response
	strcpy((char *)&G_io_apdu_buffer[*responseLength], currencyInformation.name);
	
	*responseLength += strlen(currencyInformation.name) + sizeof((char)'\0');
	
	strcpy((char *)&G_io_apdu_buffer[*responseLength], currencyInformation.version);
	
	*responseLength += strlen(currencyInformation.version) + sizeof((char)'\0');
	
	// Throw success
	THROW(SWO_SUCCESS);
}
