// Header files
#include "commands/get_commitment.h"
#include "common.h"
#include "menus.h"
#include "process_requests.h"
#include "state.h"
#include "storage.h"


// Fuzz target
int LLVMFuzzerTestOneInput(const uint8_t *data, const size_t size) {
	
	// Reset state
	resetState();
	os_boot();
	initializeStorage();
	clearMenuBuffers();
	
	// Copy data into APDU buffer
	G_io_apdu_buffer[APDU_OFF_CLA] = REQUEST_CLASS;
	G_io_apdu_buffer[APDU_OFF_INS] = GET_COMMITMENT_INSTRUCTION;
	G_io_apdu_buffer[APDU_OFF_P1] = (size > 0) ? data[0] : 0;
	G_io_apdu_buffer[APDU_OFF_P2] = (size > 1) ? data[1] : 0;
	G_io_apdu_buffer[APDU_OFF_LC] = MIN(sizeof(G_io_apdu_buffer) - APDU_OFF_DATA, (size > 2) ? size - 2 : 0);
	memcpy(&G_io_apdu_buffer[APDU_OFF_DATA], (size > 2) ? &data[2] : data, G_io_apdu_buffer[APDU_OFF_LC]);
	
	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Process get commitment request
			unsigned short responseLength = 0;
			unsigned char responseFlags = 0;
			processGetCommitmentRequest(&responseLength, &responseFlags);
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
