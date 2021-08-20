// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "get_tor_public_key.h"
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
	
	// Get Ed25519 public key
	uint8_t ed25519PublicKey[ED25519_PUBLIC_KEY_SIZE];
	getEd25519PublicKey(ed25519PublicKey, *account);
	
	// TODO convert Ed25519 public key to Tor address
	
	// Check if response with the Ed25519 public key will overflow
	if(willResponseOverflow(*responseLength, sizeof(ed25519PublicKey))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append address public key to response
	memcpy(&G_io_apdu_buffer[*responseLength], ed25519PublicKey, sizeof(ed25519PublicKey));
	
	*responseLength += sizeof(ed25519PublicKey);
	
	// Throw success
	THROW(SWO_SUCCESS);
}
