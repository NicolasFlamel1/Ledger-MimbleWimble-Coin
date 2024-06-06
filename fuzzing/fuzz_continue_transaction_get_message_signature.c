// Header files
#include "commands/continue_transaction_get_message_signature.h"
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
	
	// Set state to be after continue transaction apply offset request
	transaction.send = 10 - 5;
	transaction.fee = 1;
	transaction.started = true;
	transaction.offsetApplied = true;
	updateBlindingFactorSum((uint8_t *)transaction.blindingFactor, (uint8_t[]){0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1C, 0x1D, 0x1E, 0x1F, 0x20, 0x21}, false);
	createAndSaveTransactionSecretNonce();
	
	// Copy data into APDU buffer
	G_io_apdu_buffer[APDU_OFF_CLA] = REQUEST_CLASS;
	G_io_apdu_buffer[APDU_OFF_INS] = CONTINUE_TRANSACTION_GET_MESSAGE_SIGNATURE_INSTRUCTION;
	G_io_apdu_buffer[APDU_OFF_P1] = (size > 0) ? data[0] : 0;
	G_io_apdu_buffer[APDU_OFF_P2] = (size > 1) ? data[1] : 0;
	G_io_apdu_buffer[APDU_OFF_LC] = MIN(sizeof(G_io_apdu_buffer) - APDU_OFF_DATA, (size > 2) ? size - 2 : 0);
	memcpy(&G_io_apdu_buffer[APDU_OFF_DATA], (size > 2) ? &data[2] : data, G_io_apdu_buffer[APDU_OFF_LC]);
	
	// Begin try
	BEGIN_TRY {

		// Try
		TRY {
			
			// Process continue transaction get message signature request
			unsigned short responseLength = 0;
			unsigned char responseFlags = 0;
			processContinueTransactionGetMessageSignatureRequest(&responseLength, &responseFlags);
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
