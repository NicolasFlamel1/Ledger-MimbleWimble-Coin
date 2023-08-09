// Header files
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"
#include "continue_encrypting_slate.h"
#include "slate.h"


// Supporting function implementation

// Process continue encrypting slate request
void processContinueEncryptingSlateRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || !dataLength || dataLength > CHACHA20_BLOCK_SIZE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if slate encrypting state isn't ready or active
	if(slate.encryptingState != READY_SLATE_STATE && slate.encryptingState != ACTIVE_SLATE_STATE) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Initialize encrypted data
	uint8_t encryptedData[dataLength];
	
	// Encrypt ChaCha20 Poly1305 data
	encryptChaCha20Poly1305Data((ChaCha20Poly1305State *)&slate.chaCha20Poly1305State, encryptedData, data, dataLength);
	
	// Check if response with the encrypted data will overflow
	if(willResponseOverflow(*responseLength, sizeof(encryptedData))) {
	
		// Throw length error
		THROW(LENGTH_ERROR);
	}
	
	// Append encrypted data to response
	memcpy(&G_io_apdu_buffer[*responseLength], encryptedData, sizeof(encryptedData));
	
	*responseLength += sizeof(encryptedData);
	
	// Check if at the last data 
	if(dataLength < CHACHA20_BLOCK_SIZE) {
	
		// Set thatslate encrypting state is complete
		slate.encryptingState = COMPLETE_SLATE_STATE;
	}
	
	// Otherwise
	else {
	
		// Set that slate encrypting state is active
		slate.encryptingState = ACTIVE_SLATE_STATE;
	}
	
	// Throw success
	THROW(SWO_SUCCESS);
}
