// Header files
#include "commands/continue_transaction_include_input.h"
#include "common.h"
#include "menus.h"
#include "process_requests.h"
#include "state.h"
#include "storage.h"
#include "transaction.h"


// Fuzz target
int LLVMFuzzerTestOneInput(const uint8_t *data, const size_t size) {
	
	// Reset state
	resetState();
	os_boot();
	initializeStorage();
	clearMenuBuffers();
	
	// Set state to be after start transaction request
	transaction.send = 10 - 5;
	transaction.fee = 1;
	transaction.remainingOutput = 5;
	transaction.remainingInput = 10 + 1;
	transaction.started = true;
	
	// Copy data into APDU buffer
	G_io_apdu_buffer[APDU_OFF_CLA] = REQUEST_CLASS;
	G_io_apdu_buffer[APDU_OFF_INS] = CONTINUE_TRANSACTION_INCLUDE_INPUT_INSTRUCTION;
	G_io_apdu_buffer[APDU_OFF_P1] = (size > 0) ? data[0] : 0;
	G_io_apdu_buffer[APDU_OFF_P2] = (size > 1) ? data[1] : 0;
	G_io_apdu_buffer[APDU_OFF_LC] = MIN(sizeof(G_io_apdu_buffer) - APDU_OFF_DATA, (size > 2) ? size - 2 : 0);
	memcpy(&G_io_apdu_buffer[APDU_OFF_DATA], (size > 2) ? &data[2] : data, G_io_apdu_buffer[APDU_OFF_LC]);
	
	// Begin try
	BEGIN_TRY {

		// Try
		TRY {
			
			// Process continue transaction include input request
			unsigned short responseLength = 0;
			unsigned char responseFlags = 0;
			processContinueTransactionIncludeInputRequest(&responseLength, &responseFlags);
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
