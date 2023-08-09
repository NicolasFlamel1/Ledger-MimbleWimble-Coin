// Header files
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"
#include "finish_encrypting_slate.h"
#include "slate.h"


// Supporting function implementation

// Process finish encrypting slate request
void processFinishEncryptingSlateRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

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
	
	// Check if slate encrypting state isn't active or complete
	if(slate.encryptingState != ACTIVE_SLATE_STATE && slate.encryptingState != COMPLETE_SLATE_STATE) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Get ChaCha20 Poly1305 tag
	uint8_t tag[POLY1305_TAG_SIZE];
	getChaCha20Poly1305Tag((ChaCha20Poly1305State *)&slate.chaCha20Poly1305State, tag);
	
	// Check if response with the tag will overflow
	if(willResponseOverflow(*responseLength, sizeof(tag))) {
	
		// Throw length error
		THROW(LENGTH_ERROR);
	}
	
	// Append tag to response
	memcpy(&G_io_apdu_buffer[*responseLength], tag, sizeof(tag));
	
	*responseLength += sizeof(tag);
	
	// Reset the slate
	resetSlate();
	
	// Throw success
	THROW(SWO_SUCCESS);
}
