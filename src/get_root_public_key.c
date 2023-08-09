// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "get_root_public_key.h"
#include "menus.h"


// Supporting function implementation

// Process get root public key request
void processGetRootPublicKeyRequest(__attribute__((unused)) unsigned short *responseLength, unsigned char *responseFlags) {

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
	
	// Show export root public key menu
	showMenu(EXPORT_ROOT_PUBLIC_KEY_MENU);
	
	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process get root public key user interaction
void processGetRootPublicKeyUserInteraction(unsigned short *responseLength) {

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];
	
	// Get account from data
	uint32_t account;
	memcpy(&account, data, sizeof(account));

	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Initialize root public key
	volatile uint8_t rootPublicKey[COMPRESSED_PUBLIC_KEY_SIZE];

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Get private key
			getPrivateKeyAndChainCode(&privateKey, NULL, account);
			
			// Get root public key from the private key
			getPublicKeyFromPrivateKey(rootPublicKey, (cx_ecfp_private_key_t *)&privateKey);
			
			// Check if response with the root public key will overflow
			if(willResponseOverflow(*responseLength, sizeof(rootPublicKey))) {
			
				// Throw length error
				THROW(LENGTH_ERROR);
			}
			
			// Append root public key to response
			memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)rootPublicKey, sizeof(rootPublicKey));
			
			*responseLength += sizeof(rootPublicKey);
		}
		
		// Finally
		FINALLY {
		
			// Clear the root public key
			explicit_bzero((uint8_t *)rootPublicKey, sizeof(rootPublicKey));
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}
	
	// End try
	END_TRY;

	// Throw success
	THROW(SWO_SUCCESS);
}
