// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "get_mqs_public_key.h"
#include "mqs.h"


// Supporting function implementation

// Process get MQS public key request
void processGetMqsPublicKeyRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Check currency information ID
	switch(currencyInformation.id) {
	
		// Grin ID
		case GRIN_ID:
	
			// Throw unknown instruction error
			THROW(UNKNOWN_INSTRUCTION_ERROR);
	}
	
	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter > TESTNET_NETWORK_TYPE || secondParameter || dataLength != sizeof(uint32_t)) {
	
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

	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;
	
	// Initialize address public key
	volatile uint8_t addressPublicKey[COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get address private key at the MQS address private key index
			getAddressPrivateKey(&addressPrivateKey, *account, MQS_ADDRESS_PRIVATE_KEY_INDEX, CX_CURVE_SECP256K1);
			
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
