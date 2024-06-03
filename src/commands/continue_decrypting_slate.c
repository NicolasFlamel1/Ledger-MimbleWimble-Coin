// Header files
#include <alloca.h>
#include <string.h>
#include "../chacha20_poly1305.h"
#include "../common.h"
#include "continue_decrypting_slate.h"
#include "../crypto.h"
#include "../slate.h"


// Supporting function implementation

// Process continue decrypting slate request
void processContinueDecryptingSlateRequest(unsigned short *responseLength, __attribute__((unused)) const unsigned char *responseFlags) {

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

	// Check if slate decrypting state isn't ready or active
	if(slate.decryptingState != READY_SLATE_STATE && slate.decryptingState != ACTIVE_SLATE_STATE) {

		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}

	// Initialize decrypted data
	volatile uint8_t *decryptedData = alloca(dataLength);

	// Get encrypted data length
	const size_t encryptedDataLength = getEncryptedDataLength(dataLength);

	// Initialize encrypted data
	volatile uint8_t *encryptedData = alloca(encryptedDataLength);

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Decrypt ChaCha20 Poly1305 data
			decryptChaCha20Poly1305Data((ChaCha20Poly1305State *)&slate.chaCha20Poly1305State, decryptedData, data, dataLength);

			// Encrypt the decrypted data
			encryptData(encryptedData, (uint8_t *)decryptedData, dataLength, slate.sessionKey, sizeof(slate.sessionKey));
		}

		// Finally
		FINALLY {

			// Clear the decrypted data
			explicit_bzero((uint8_t *)decryptedData, dataLength);
		}
	}

	// End try
	END_TRY;

	// Check if response with the encrypted data will overflow
	if(willResponseOverflow(*responseLength, encryptedDataLength)) {

		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append encrypted data to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)encryptedData, encryptedDataLength);

	*responseLength += encryptedDataLength;

	// Check if at the last data
	if(dataLength < CHACHA20_BLOCK_SIZE) {

		// Set that slate decrypting state is complete
		slate.decryptingState = COMPLETE_SLATE_STATE;
	}

	// Otherwise
	else {

		// Set that slate decrypting state is active
		slate.decryptingState = ACTIVE_SLATE_STATE;
	}

	// Throw success
	THROW(SWO_SUCCESS);
}
