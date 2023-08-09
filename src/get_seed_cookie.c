// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "get_seed_cookie.h"


// Supporting function implementation

// Process get seed cookie request
void processGetSeedCookieRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];
	
	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength != sizeof(uint32_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get account from data
	uint32_t account;
	memcpy(&account, data, sizeof(account));
	
	// Check if account is invalid
	if(account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get seed cookie
	volatile uint8_t seedCookie[CX_SHA512_SIZE];
	
	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Initialize public key
	volatile uint8_t publicKey[COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Get private key
			getPrivateKeyAndChainCode(&privateKey, NULL, account);

			// Get public key from the private key
			getPublicKeyFromPrivateKey(publicKey, (cx_ecfp_private_key_t *)&privateKey);
			
			// Get seed cookie from the public key
			cx_hash_sha512((uint8_t *)publicKey, sizeof(publicKey), (uint8_t *)seedCookie, sizeof(seedCookie));
		}
		
		// Finally
		FINALLY {
		
			// Clear the public key
			explicit_bzero((uint8_t *)publicKey, sizeof(publicKey));
			
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the seed cookie will overflow
	if(willResponseOverflow(*responseLength, sizeof(seedCookie))) {
	
		// Throw length error
		THROW(LENGTH_ERROR);
	}
	
	// Append seed cookie to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)seedCookie, sizeof(seedCookie));
	
	*responseLength += sizeof(seedCookie);
	
	// Throw success
	THROW(SWO_SUCCESS);
}
