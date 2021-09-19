// Header files
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "mqs.h"
#include "start_encrypting_mqs_data.h"


// Supporting function implementation

// Process start encrypting MQS data request
void processStartEncryptingMqsDataRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {
	
	// Check currency information ID
	switch(currencyInformation.id) {
	
		// Grin ID
		case GRIN_ID:
	
			// Throw unknown instruction error
			THROW(UNKNOWN_INSTRUCTION_ERROR);
	}
	
	// Reset the MQS data
	resetMqsData();
	
	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter > TESTNET_NETWORK_TYPE || secondParameter || dataLength != sizeof(uint32_t) + COMPRESSED_PUBLIC_KEY_SIZE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get account from data
	const uint32_t *account = (uint32_t *)data;
	
	// Check if account is invalid
	if(*account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get public key from data
	uint8_t *publicKey = &data[sizeof(*account)];
	
	// Initialize salt
	uint8_t salt[MQS_SHARED_PRIVATE_KEY_SALT_SIZE];
	
	// Create random salt
	cx_rng(salt, sizeof(salt));
	
	// Initialize shared private key
	volatile uint8_t sharedPrivateKey[MQS_SHARED_PRIVATE_KEY_SIZE];
	
	// Initialize nonce
	uint8_t nonce[CHACHA20_NONCE_SIZE];
	
	// Create random nonce
	cx_rng(nonce, sizeof(nonce));
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Create MQS shared private key
			createMqsSharedPrivateKey(sharedPrivateKey, *account, publicKey, salt);
			
			// Initialize ChaCha20 Poly1305 with the shared private key and nonce
			initializeChaCha20Poly1305(&mqsData.chaCha20Poly1305State, (uint8_t *)sharedPrivateKey, nonce, NULL, 0);
		}
		
		// Finally
		FINALLY {
			
			// Clear the shared private key
			explicit_bzero((uint8_t *)sharedPrivateKey, sizeof(sharedPrivateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the salt and nonce will overflow
	if(willResponseOverflow(*responseLength, sizeof(salt) + sizeof(nonce))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append salt and nonce to response
	memcpy(&G_io_apdu_buffer[*responseLength], salt, sizeof(salt));
	
	*responseLength += sizeof(salt);
	
	memcpy(&G_io_apdu_buffer[*responseLength], nonce, sizeof(nonce));
	
	*responseLength += sizeof(nonce);
	
	// Set that MQS data encrypting state is ready
	mqsData.encryptingState = READY_MQS_DATA_STATE;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
