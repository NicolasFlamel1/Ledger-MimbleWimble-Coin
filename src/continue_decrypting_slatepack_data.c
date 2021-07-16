// Header files
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"
#include "continue_decrypting_slatepack_data.h"
#include "crypto.h"
#include "slatepack.h"


// Supporting function implementation

// Process continue decrypting Slatepack data request
void processContinueDecryptingSlatepackDataRequest(unsigned short *responseLength, unsigned char *responseFlags) {

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
	
	// Check if Slatepack data decrypting state isn't ready or active
	if(slatepackData.decryptingState != READY_SLATEPACK_DATA_STATE && slatepackData.decryptingState != ACTIVE_SLATEPACK_DATA_STATE) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Initialize decrypted data
	volatile uint8_t decryptedData[dataLength];
	
	// Initialize encrypted data
	volatile uint8_t encryptedData[getEncryptedDataLength(sizeof(decryptedData))];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Decrypt ChaCha20 Poly1305 data
			decryptChaCha20Poly1305Data(&slatepackData.chaCha20Poly1305State, (uint8_t *)decryptedData, data, dataLength);
			
			// Encrypt the decrypted data
			encryptData(encryptedData, (uint8_t *)decryptedData, sizeof(decryptedData), slatepackData.sessionKey, sizeof(slatepackData.sessionKey));
		}
		
		// Finally
		FINALLY {
		
			// Clear the decrypted data
			explicit_bzero((uint8_t *)decryptedData, sizeof(decryptedData));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the encrypted data will overflow
	if(willResponseOverflow(*responseLength, sizeof(encryptedData))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append encrypted data to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)encryptedData, sizeof(encryptedData));
	
	*responseLength += sizeof(encryptedData);
	
	// Check if at the last data 
	if(dataLength < CHACHA20_BLOCK_SIZE) {
	
		// Set that Slatepack data decrypting state is complete
		slatepackData.decryptingState = COMPLETE_SLATEPACK_DATA_STATE;
	}
	
	// Otherwise
	else {
	
		// Set that Slatepack data decrypting state is active
		slatepackData.decryptingState = ACTIVE_SLATEPACK_DATA_STATE;
	}
	
	// Throw success
	THROW(SWO_SUCCESS);
}
