// Header files
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"
#include "crypto.h"
#include "slatepack.h"
#include "start_encrypting_slatepack_data.h"


// Supporting function implementation

// Process start encrypting Slatepack data request
void processStartEncryptingSlatepackDataRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {
	
	// Reset the Slatepack data
	resetSlatepackData();
	
	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength != sizeof(uint32_t) + ED25519_PUBLIC_KEY_SIZE) {
	
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
	const uint8_t *publicKey = &data[sizeof(*account)];
	
	// Initialize shared private key
	volatile uint8_t sharedPrivateKey[SLATEPACK_SHARED_PRIVATE_KEY_SIZE];
	
	// Initialize nonce
	uint8_t nonce[CHACHA20_NONCE_SIZE];
	
	// Create random nonce
	cx_rng(nonce, sizeof(nonce));
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Create Slatepack shared private key
			createSlatepackSharedPrivateKey(sharedPrivateKey, *account, publicKey);
		
			// Initialize ChaCha20 Poly1305 with the shared private key and nonce
			initializeChaCha20Poly1305(&slatepackData.chaCha20Poly1305State, (uint8_t *)sharedPrivateKey, nonce, NULL, 0);
		}
		
		// Finally
		FINALLY {
		
			// Clear the shared private key
			explicit_bzero((uint8_t *)sharedPrivateKey, sizeof(sharedPrivateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the nonce will overflow
	if(willResponseOverflow(*responseLength, sizeof(nonce))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append nonce to response
	memcpy(&G_io_apdu_buffer[*responseLength], nonce, sizeof(nonce));
	
	*responseLength += sizeof(nonce);
	
	// Set that Slatepack data encrypting state is ready
	slatepackData.encryptingState = READY_SLATEPACK_DATA_STATE;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
