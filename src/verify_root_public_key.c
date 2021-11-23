// Header files
#include <string.h>
#include "common.h"
#include "menus.h"
#include "verify_root_public_key.h"


// Supporting function implementation

// Process verify root public key request
void processVerifyRootPublicKeyRequest(__attribute__((unused)) unsigned short *responseLength, unsigned char *responseFlags) {

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
			getPublicKeyFromPrivateKey((uint8_t *)rootPublicKey, (cx_ecfp_private_key_t *)&privateKey);
		}
		
		// Finally
		FINALLY {
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Copy root public key into the public key or address line buffer
	toHexString(publicKeyOrAddressLineBuffer, (uint8_t *)rootPublicKey, sizeof(rootPublicKey));
	publicKeyOrAddressLineBuffer[sizeof(rootPublicKey) * HEXADECIMAL_CHARACTER_SIZE] = '\0';
	
	// Show verify root public key menu
	showMenu(VERIFY_ROOT_PUBLIC_KEY_MENU);
	
	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process verify root public key user interaction
void processVerifyRootPublicKeyUserInteraction(__attribute__((unused)) unsigned short *responseLength) {

	// Throw success
	THROW(SWO_SUCCESS);
}
