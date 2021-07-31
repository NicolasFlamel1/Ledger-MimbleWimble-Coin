// Header files
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"
#include "crypto.h"
#include "mqs.h"
#include "start_decrypting_mqs_data.h"


// Supporting function implementation

// Process start decrypting MQS data request
void processStartDecryptingMqsDataRequest(unsigned short *responseLength, unsigned char *responseFlags) {

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
	if(firstParameter > TESTNET_NETWORK_TYPE || secondParameter || dataLength != sizeof(uint32_t) + UNCOMPRESSED_PUBLIC_KEY_SIZE + MQS_SHARED_PRIVATE_KEY_SALT_SIZE + CHACHA20_NONCE_SIZE) {
	
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
	
	// Get salt from data
	uint8_t *salt = &data[sizeof(*account) + UNCOMPRESSED_PUBLIC_KEY_SIZE];
	
	// Get nonce from data
	const uint8_t *nonce = &data[sizeof(*account) + UNCOMPRESSED_PUBLIC_KEY_SIZE + MQS_SHARED_PRIVATE_KEY_SALT_SIZE];
	
	// Create random MQS data session key
	cx_rng(mqsData.sessionKey, sizeof(mqsData.sessionKey));
	
	// Initialize shared private key
	volatile uint8_t sharedPrivateKey[MQS_SHARED_PRIVATE_KEY_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Create MQS shared private key
			createMqsSharedPrivateKey(sharedPrivateKey, *account, publicKey, salt);
			
			// Initialize ChaCha20 Poly1305 with the shared private key and nonce
			initializeChaCha20Poly1305(&mqsData.chaCha20Poly1305State, (uint8_t *)sharedPrivateKey, 0, nonce, NULL, 0);
		}
		
		// Finally
		FINALLY {
			
			// Clear the shared private key
			explicit_bzero((uint8_t *)sharedPrivateKey, sizeof(sharedPrivateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Set that MQS data decrypting state is ready
	mqsData.decryptingState = READY_MQS_DATA_STATE;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
