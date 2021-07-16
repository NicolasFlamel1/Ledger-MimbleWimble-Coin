// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "get_root_public_key.h"
#include "menus.h"
#include "settings.h"


// Supporting function implementation

// Process get root public key request
void processGetRootPublicKeyRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || !dataLength) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get requestor from data
	uint8_t *requestor = data;
	
	// Check if public keys export manual approval setting is true
	if(settings.publicKeysExportManualApprovalSetting) {
	
		// Go through characters in the requestor
		for(size_t i = 0; i < dataLength; ++i) {
		
			// Check if character isn't a printable character
			if(!isPrintableCharacter(requestor[i])) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		}
		
		// Check if target is the Nano X
		#ifdef TARGET_NANOX
		
			// Check if requestor wont fit in the requestor line buffer
			if(dataLength > sizeof(requestorLineBuffer) - sizeof((char)'\0')) {
			
				// Go through all characters in the middle of the requestor that wont fit in the requestor line buffer
				while(dataLength != sizeof(requestorLineBuffer) - sizeof((char)'\0')) {
				
					// Remove character
					memmove(&requestor[dataLength / 2], &requestor[dataLength / 2 + 1], dataLength - (dataLength / 2 + 1));
					
					// Decrement requestor's length
					--dataLength;
				}
			}
		
		// Otherwise
		#else
		
			// Check if requestor wont fit in the requestor line buffer with an ellipsis
			if(dataLength > sizeof(requestorLineBuffer) - sizeof((char)'\0') - (sizeof(ELLIPSIS) - sizeof((char)'\0'))) {
			
				// Check if requestor wont fit in the requestor line buffer without an ellipsis
				if(dataLength > sizeof(requestorLineBuffer) - sizeof((char)'\0')) {
			
					// Reduce requestor's length to fit in the requestor line buffer
					dataLength = sizeof(requestorLineBuffer) - sizeof((char)'\0');
					
					// Change end of requestor to be an ellipsis
					memcpy(&requestor[dataLength - (sizeof(ELLIPSIS) - sizeof((char)'\0'))], ELLIPSIS, sizeof(ELLIPSIS) - sizeof((char)'\0'));
				}
			}
		#endif
		
		// Copy requestor into the requestor line buffer
		memcpy(requestorLineBuffer, requestor, dataLength);
		requestorLineBuffer[dataLength] = '\0';
		
		// Show export root public key menu
		showMenu(EXPORT_ROOT_PUBLIC_KEY_MENU);
		
		// Set response flags to send response later
		*responseFlags |= IO_ASYNCH_REPLY;
	}
	
	// Otherwise
	else {
	
		// Process get root public key user interaction
		processGetRootPublicKeyUserInteraction(responseLength);
	}
}

// Process get root public key user interaction
void processGetRootPublicKeyUserInteraction(unsigned short *responseLength) {

	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Initialize root public key
	volatile uint8_t rootPublicKey[COMPRESSED_PUBLIC_KEY_SIZE];

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Get private key
			getPrivateKeyAndChainCode(&privateKey, NULL);
			
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
	
	// Check if response with the root public key will overflow
	if(willResponseOverflow(*responseLength, sizeof(rootPublicKey))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append root public key to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)rootPublicKey, sizeof(rootPublicKey));
	
	*responseLength += sizeof(rootPublicKey);

	// Throw success
	THROW(SWO_SUCCESS);
}
