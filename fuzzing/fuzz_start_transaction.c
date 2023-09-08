// Header files
#include <stdint.h>
#include <string.h>
#include <os_apdu.h>
#include <os_io.h>
#include "process_requests.h"
#include "commands/start_transaction.h"


// Fuzz target
int LLVMFuzzerTestOneInput(const uint8_t *data, const size_t size) {

	// Copy data into APDU buffer
	G_io_apdu_buffer[APDU_OFF_CLA] = REQUEST_CLASS;
	G_io_apdu_buffer[APDU_OFF_INS] = START_TRANSACTION_INSTRUCTION;
	G_io_apdu_buffer[APDU_OFF_P1] = 0;
	G_io_apdu_buffer[APDU_OFF_P2] = 0;
	G_io_apdu_buffer[APDU_OFF_LC] = MIN(sizeof(G_io_apdu_buffer) - APDU_OFF_DATA, size);
	memcpy(&G_io_apdu_buffer[APDU_OFF_DATA], data, G_io_apdu_buffer[APDU_OFF_LC]);
	
	// Process start transaction request
	processStartTransactionRequest(NULL, NULL);

	// Return success
	return 0;
}
