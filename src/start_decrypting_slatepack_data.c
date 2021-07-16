// Header files
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"
#include "crypto.h"
#include "slatepack.h"
#include "start_decrypting_slatepack_data.h"


// Supporting function implementation

// Process start decrypting Slatepack data request
void processStartDecryptingSlatepackDataRequest(unsigned short *responseLength, unsigned char *responseFlags) {

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
	if(firstParameter || secondParameter || dataLength != COMPRESSED_PUBLIC_KEY_SIZE - PUBLIC_KEY_PREFIX_SIZE + CHACHA20_NONCE_SIZE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get public key from data
	const uint8_t *publicKey = data;
	
	// Get nonce from data
	const uint8_t *nonce = &data[COMPRESSED_PUBLIC_KEY_SIZE - PUBLIC_KEY_PREFIX_SIZE];
	
	// Create random Slatepack data session key
	cx_rng(slatepackData.sessionKey, sizeof(slatepackData.sessionKey));
	
	// Initialize shared private key
	volatile uint8_t sharedPrivateKey[SLATEPACK_SHARED_PRIVATE_KEY_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Create Slatepack shared private key
			createSlatepackSharedPrivateKey(sharedPrivateKey, publicKey);
			
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
	
	// Set that Slatepack data decrypting state is ready
	slatepackData.decryptingState = READY_SLATEPACK_DATA_STATE;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
