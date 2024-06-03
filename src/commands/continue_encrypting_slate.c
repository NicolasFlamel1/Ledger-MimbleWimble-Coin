// Header files
#include <alloca.h>
#include <string.h>
#include "../chacha20_poly1305.h"
#include "../common.h"
#include "continue_encrypting_slate.h"
#include "../slate.h"


// Supporting function implementation

// Process continue encrypting slate request
void processContinueEncryptingSlateRequest(unsigned short *responseLength, __attribute__((unused)) const unsigned char *responseFlags) {

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
	uint8_t *encryptedData = alloca(dataLength);

	// Encrypt ChaCha20 Poly1305 data
	encryptChaCha20Poly1305Data((ChaCha20Poly1305State *)&slate.chaCha20Poly1305State, encryptedData, data, dataLength);

	// Check if creating message hash
	if(slate.messageHashState.header.info) {

		// Get encrypted data as a string
		const size_t encryptedDataStringLength = dataLength * HEXADECIMAL_CHARACTER_SIZE;
		char *encryptedDataString = alloca(encryptedDataStringLength);
		toHexString(encryptedDataString, encryptedData, dataLength);

		// Add encrypted data string to the message hash state and throw error if it fails
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)encryptedDataString, encryptedDataStringLength, NULL, 0));
	}

	// Check if response with the encrypted data will overflow
	if(willResponseOverflow(*responseLength, dataLength)) {

		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append encrypted data to response
	memcpy(&G_io_apdu_buffer[*responseLength], encryptedData, dataLength);

	*responseLength += dataLength;

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
