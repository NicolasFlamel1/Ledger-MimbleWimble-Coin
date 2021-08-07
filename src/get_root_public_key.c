// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "get_root_public_key.h"
#include "menus.h"


// Supporting function implementation

// Process get root public key request
void processGetRootPublicKeyRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter > TESTNET_NETWORK_TYPE || secondParameter || dataLength <= sizeof(uint32_t)) {
	
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
	const uint32_t *account = (uint32_t *)data;

	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Initialize root public key
	volatile uint8_t rootPublicKey[COMPRESSED_PUBLIC_KEY_SIZE];

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Get private key
			getPrivateKeyAndChainCode(&privateKey, NULL, *account);
			
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
