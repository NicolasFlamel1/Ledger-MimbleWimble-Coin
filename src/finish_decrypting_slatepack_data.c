// Header files
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"
#include "finish_decrypting_slatepack_data.h"
#include "slatepack.h"


// Supporting function implementation

// Process finish decrypting Slatepack data request
void processFinishDecryptingSlatepackDataRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength != POLY1305_TAG_SIZE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if Slatepack data decrypting state isn't active or complete
	if(slatepackData.decryptingState != ACTIVE_SLATEPACK_DATA_STATE && slatepackData.decryptingState != COMPLETE_SLATEPACK_DATA_STATE) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Get tag from data
	uint8_t *tag = data;
	
	// Initialize expected tag
	volatile uint8_t expectedTag[POLY1305_TAG_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Get ChaCha20 Poly1305 expected tag
			getChaCha20Poly1305Tag(&slatepackData.chaCha20Poly1305State, (uint8_t *)expectedTag);
			
			// Check if tag isn't equal to the expected tag
			if(os_secure_memcmp(tag, (uint8_t *)expectedTag, sizeof(expectedTag))) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		}
		
		// Finally
		FINALLY {
		
			// Clear the expected tag
			explicit_bzero((uint8_t *)expectedTag, sizeof(expectedTag));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the Slatepack data session key will overflow
	if(willResponseOverflow(*responseLength, sizeof(slatepackData.sessionKey))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append Slatepack data session key to response
	memcpy(&G_io_apdu_buffer[*responseLength], slatepackData.sessionKey, sizeof(slatepackData.sessionKey));
	
	*responseLength += sizeof(slatepackData.sessionKey);
	
	// Reset the Slatepack data
	resetSlatepackData();
	
	// Throw success
	THROW(SWO_SUCCESS);
}
