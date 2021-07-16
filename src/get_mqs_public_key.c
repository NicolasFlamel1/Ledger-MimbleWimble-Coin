// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "get_mqs_public_key.h"
#include "menus.h"
#include "mqs.h"
#include "settings.h"


// Supporting function implementation

// Process get MQS public key request
void processGetMqsPublicKeyRequest(unsigned short *responseLength, unsigned char *responseFlags) {

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
		
		// Show export MQS public key menu
		showMenu(EXPORT_MQS_PUBLIC_KEY_MENU);
		
		// Set response flags to send response later
		*responseFlags |= IO_ASYNCH_REPLY;
	}
	
	// Otherwise
	else {
	
		// Process get MQS public key user interaction
		processGetMqsPublicKeyUserInteraction(responseLength);
	}
}

// Process get MQS public key user interaction
void processGetMqsPublicKeyUserInteraction(unsigned short *responseLength) {

	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;
	
	// Initialize address public key
	volatile uint8_t addressPublicKey[COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get address private key at the MQS address private key index
			getAddressPrivateKey(&addressPrivateKey, MQS_ADDRESS_PRIVATE_KEY_INDEX, CX_CURVE_SECP256K1);
			
			// Get address public key from the address private key
			getPublicKeyFromPrivateKey((uint8_t *)addressPublicKey, (cx_ecfp_private_key_t *)&addressPrivateKey);
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
	if(willResponseOverflow(*responseLength, sizeof(addressPublicKey))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append address public key to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)addressPublicKey, sizeof(addressPublicKey));
	
	*responseLength += sizeof(addressPublicKey);
	
	// Throw success
	THROW(SWO_SUCCESS);
}
