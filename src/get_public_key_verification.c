// Header files
#include <string.h>
#include "common.h"
#include "get_public_key_verification.h"
#include "menus.h"
#include "mqs.h"
#include "tor.h"


// Constants

// Public key type
enum PublicKeyType {

	// Root public key type
	ROOT_PUBLIC_KEY_TYPE,
	
	// Tor public key type
	TOR_PUBLIC_KEY_TYPE,
	
	// MQS public key type
	MQS_PUBLIC_KEY_TYPE
};


// Supporting function implementation

// Process get public key verification request
void processGetPublicKeyVerificationRequest(__attribute__((unused)) unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter > TESTNET_NETWORK_TYPE || secondParameter > MQS_PUBLIC_KEY_TYPE || dataLength != sizeof(uint32_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get network type from first parameter
	const enum NetworkType networkType = firstParameter;
	
	// Get public key type from second parameter
	const enum PublicKeyType publicKeyType = secondParameter;
	
	// Get account from data
	const uint32_t *account = (uint32_t *)data;
	
	// Check if account is invalid
	if(*account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check public key type
	switch(publicKeyType) {
	
		// Root public key type
		case ROOT_PUBLIC_KEY_TYPE:
		
			// Set public key type line buffer
			strcpy(publicKeyTypeLineBuffer, "Verify root");
			
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
			
			// Copy root public key into the public key line buffer
			toHexString(publicKeyLineBuffer, (uint8_t *)rootPublicKey, sizeof(rootPublicKey));
			publicKeyLineBuffer[sizeof(rootPublicKey) * HEXADECIMAL_CHARACTER_SIZE - 1] = '\0';
		
			// Break
			break;
		
		// Tor public key type
		case TOR_PUBLIC_KEY_TYPE:
		
			// Set public key type line buffer
			strcpy(publicKeyTypeLineBuffer, "Verify Tor");
			
			// Get Tor address
			uint8_t torAddress[TOR_ADDRESS_SIZE];
			getTorAddress(torAddress, *account);
			
			// Copy Tor address into the public key line buffer
			memcpy(publicKeyLineBuffer, torAddress, sizeof(torAddress));
			publicKeyLineBuffer[sizeof(torAddress) - 1] = '\0';
		
			// Break
			break;
		
		// MQS public key type
		case MQS_PUBLIC_KEY_TYPE:
		
			// Check currency information ID
			switch(currencyInformation.id) {
			
				// Grin ID
				case GRIN_ID:
			
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Set public key type line buffer
			strcpy(publicKeyTypeLineBuffer, "Verify MQS");
			
			// Get MQS address
			uint8_t mqsAddress[MQS_ADDRESS_SIZE];
			getMqsAddress(mqsAddress, *account, networkType);
			
			// Copy MQS address into the public key line buffer
			memcpy(publicKeyLineBuffer, mqsAddress, sizeof(mqsAddress));
			publicKeyLineBuffer[sizeof(mqsAddress) - 1] = '\0';
		
			// Break
			break;
	}
	
	// Show verify public key menu
	showMenu(VERIFY_PUBLIC_KEY_MENU);
	
	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process get public key user interaction
void processGetPublicKeyVerificationUserInteraction(__attribute__((unused)) unsigned short *responseLength) {

	// Throw success
	THROW(SWO_SUCCESS);
}
