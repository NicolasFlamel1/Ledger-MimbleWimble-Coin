// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "get_tor_public_key.h"
#include "menus.h"
#include "settings.h"
#include "tor.h"


// Supporting function implementation

// Process get Tor public key request
void processGetTorPublicKeyRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength <= sizeof(uint32_t)) {
	
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
	
	// Check if public keys export manual approval setting is true
	if(settings.publicKeysExportManualApprovalSetting) {
	
		// Get requestor from data
		uint8_t *requestor = &data[sizeof(*account)];
		
		// Get requestor length
		size_t requestorLength = dataLength - sizeof(*account);
	
		// Go through characters in the requestor
		for(size_t i = 0; i < requestorLength; ++i) {
		
			// Check if character isn't a printable character
			if(!isPrintableCharacter(requestor[i])) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		}
		
		// Check if target is the Nano X
		#ifdef TARGET_NANOX
		
			// Check if requestor wont fit in the requestor line buffer
			if(requestorLength > sizeof(requestorLineBuffer) - sizeof((char)'\0')) {
			
				// Go through all characters in the middle of the requestor that wont fit in the requestor line buffer
				while(requestorLength != sizeof(requestorLineBuffer) - sizeof((char)'\0')) {
				
					// Remove character
					memmove(&requestor[requestorLength / 2], &requestor[requestorLength / 2 + 1], requestorLength - (requestorLength / 2 + 1));
					
					// Decrement requestor's length
					--requestorLength;
				}
			}
		
		// Otherwise
		#else
		
			// Check if requestor wont fit in the requestor line buffer with an ellipsis
			if(requestorLength > sizeof(requestorLineBuffer) - sizeof((char)'\0') - (sizeof(ELLIPSIS) - sizeof((char)'\0'))) {
			
				// Check if requestor wont fit in the requestor line buffer without an ellipsis
				if(requestorLength > sizeof(requestorLineBuffer) - sizeof((char)'\0')) {
			
					// Reduce requestor's length to fit in the requestor line buffer
					requestorLength = sizeof(requestorLineBuffer) - sizeof((char)'\0');
					
					// Change end of requestor to be an ellipsis
					memcpy(&requestor[requestorLength - (sizeof(ELLIPSIS) - sizeof((char)'\0'))], ELLIPSIS, sizeof(ELLIPSIS) - sizeof((char)'\0'));
				}
			}
		#endif
		
		// Copy requestor into the requestor line buffer
		memcpy(requestorLineBuffer, requestor, requestorLength);
		requestorLineBuffer[requestorLength] = '\0';
		
		// Show export Tor public key menu
		showMenu(EXPORT_TOR_PUBLIC_KEY_MENU);
		
		// Set response flags to send response later
		*responseFlags |= IO_ASYNCH_REPLY;
	}
	
	// Otherwise
	else {
	
		// Process get Tor public key user interaction
		processGetTorPublicKeyUserInteraction(responseLength);
	}
}

// Process get Tor public key user interaction
void processGetTorPublicKeyUserInteraction(unsigned short *responseLength) {

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];
	
	// Get account from data
	const uint32_t *account = (uint32_t *)data;

	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;
	
	// Initialize address public key
	volatile cx_ecfp_public_key_t addressPublicKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get address private key at the Tor address private key index
			getAddressPrivateKey(&addressPrivateKey, *account, TOR_ADDRESS_PRIVATE_KEY_INDEX, CX_CURVE_Ed25519);
			
			// Get address public key from address private key
			getTorPublicKey((cx_ecfp_public_key_t *)&addressPublicKey, (cx_ecfp_private_key_t *)&addressPrivateKey);
		}
		
		// Finally
		FINALLY {
		
			// Clear the address private key
			explicit_bzero((cx_ecfp_private_key_t *)&addressPrivateKey, sizeof(addressPrivateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the address public key will overflow
	if(willResponseOverflow(*responseLength, ED25519_PUBLIC_KEY_SIZE)) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append address public key to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)&addressPublicKey.W[PUBLIC_KEY_PREFIX_SIZE], ED25519_PUBLIC_KEY_SIZE);
	
	*responseLength += ED25519_PUBLIC_KEY_SIZE;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
