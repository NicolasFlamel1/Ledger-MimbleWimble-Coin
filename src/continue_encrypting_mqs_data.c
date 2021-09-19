// Header files
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"
#include "continue_encrypting_mqs_data.h"
#include "currency_information.h"
#include "mqs.h"


// Supporting function implementation

// Process continue encrypting MQS data request
void processContinueEncryptingMqsDataRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Check currency information ID
	switch(currencyInformation.id) {
	
		// Grin ID
		case GRIN_ID:
	
			// Throw unknown instruction error
			THROW(UNKNOWN_INSTRUCTION_ERROR);
	}
	
	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter > TESTNET_NETWORK_TYPE || secondParameter || !dataLength || dataLength > CHACHA20_BLOCK_SIZE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if MQS data encrypting state isn't ready or active
	if(mqsData.encryptingState != READY_MQS_DATA_STATE && mqsData.encryptingState != ACTIVE_MQS_DATA_STATE) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Initialize encrypted data
	uint8_t encryptedData[dataLength];
	
	// Encrypt ChaCha20 Poly1305 data
	encryptChaCha20Poly1305Data(&mqsData.chaCha20Poly1305State, encryptedData, data, dataLength);
	
	// Check if response with the encrypted data will overflow
	if(willResponseOverflow(*responseLength, sizeof(encryptedData))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append encrypted data to response
	memcpy(&G_io_apdu_buffer[*responseLength], encryptedData, sizeof(encryptedData));
	
	*responseLength += sizeof(encryptedData);
	
	// Check if at the last data 
	if(dataLength < CHACHA20_BLOCK_SIZE) {
	
		// Set that MQS data encrypting state is complete
		mqsData.encryptingState = COMPLETE_MQS_DATA_STATE;
	}
	
	// Otherwise
	else {
	
		// Set that MQS data encrypting state is active
		mqsData.encryptingState = ACTIVE_MQS_DATA_STATE;
	}
	
	// Throw success
	THROW(SWO_SUCCESS);
}
