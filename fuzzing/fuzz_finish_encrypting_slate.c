// Header files
#include "chacha20_poly1305.h"
#include "commands/finish_encrypting_slate.h"
#include "common.h"
#include "menus.h"
#include "process_requests.h"
#include "slate.h"
#include "state.h"
#include "storage.h"


// Fuzz target
int LLVMFuzzerTestOneInput(const uint8_t *data, const size_t size) {
	
	// Reset state
	resetState();
	os_boot();
	initializeStorage();
	clearMenuBuffers();
	
	// Set state to be after continue encrypting slate request
	slate.encryptingState = COMPLETE_SLATE_STATE;
	initializeChaCha20Poly1305(&slate.chaCha20Poly1305State, (uint8_t[]){0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1C, 0x1D, 0x1E, 0x1F, 0x20, 0x21}, (uint8_t[]){0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B}, NULL, 0, 0, NULL);
	uint8_t encryptedData[5];
	encryptChaCha20Poly1305Data((ChaCha20Poly1305State *)&slate.chaCha20Poly1305State, encryptedData, (uint8_t[]){0x00, 0x01, 0x02, 0x03, 0x04}, 5);
	
	// Copy data into APDU buffer
	G_io_apdu_buffer[APDU_OFF_CLA] = REQUEST_CLASS;
	G_io_apdu_buffer[APDU_OFF_INS] = FINISH_ENCRYPTING_SLATE_INSTRUCTION;
	G_io_apdu_buffer[APDU_OFF_P1] = (size > 0) ? data[0] : 0;
	G_io_apdu_buffer[APDU_OFF_P2] = (size > 1) ? data[1] : 0;
	G_io_apdu_buffer[APDU_OFF_LC] = MIN(sizeof(G_io_apdu_buffer) - APDU_OFF_DATA, (size > 2) ? size - 2 : 0);
	memcpy(&G_io_apdu_buffer[APDU_OFF_DATA], (size > 2) ? &data[2] : data, G_io_apdu_buffer[APDU_OFF_LC]);
	
	// Begin try
	BEGIN_TRY {

		// Try
		TRY {
			
			// Process finish encrypting slate request
			unsigned short responseLength = 0;
			unsigned char responseFlags = 0;
			processFinishEncryptingSlateRequest(&responseLength, &responseFlags);
		}

		// Catch all errors
		CATCH_ALL {
		}

		// Finally
		FINALLY {
		}
	}

	// End try
	END_TRY;
	
	// Cleanup
	os_boot();

	// Return success
	return 0;
}
