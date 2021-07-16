// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "get_seed_cookie.h"


// Supporting function implementation

// Process get seed cookie request
void processGetSeedCookieRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get seed cookie
	volatile uint8_t seedCookie[CX_SHA512_SIZE];
	
	// Initialize child private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Get private key
			getPrivateKeyAndChainCode(&privateKey, NULL);

			// Get public key from the private key
			uint8_t publicKey[COMPRESSED_PUBLIC_KEY_SIZE];
			getPublicKeyFromPrivateKey(publicKey, (cx_ecfp_private_key_t *)&privateKey);
			
			// Get seed cookie from the public key
			cx_hash_sha512(publicKey, sizeof(publicKey), (uint8_t *)seedCookie, sizeof(seedCookie));
		}
		
		// Finally
		FINALLY {
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the seed cookie will overflow
	if(willResponseOverflow(*responseLength, sizeof(seedCookie))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append seed cookie to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)seedCookie, sizeof(seedCookie));
	
	*responseLength += sizeof(seedCookie);
	
	// Throw success
	THROW(SWO_SUCCESS);
}
