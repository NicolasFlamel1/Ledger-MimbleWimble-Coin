// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "get_bulletproof_tau_x.h"


// Definitions

// Proof message size
#define PROOF_MESSAGE_SIZE 20


// Constants

// Proof message switch type index
static const size_t PROOF_MESSAGE_SWITCH_TYPE_INDEX = 2;

// Proof message identifier index
static const size_t PROOF_MESSAGE_IDENTIFIER_INDEX = 3;

// Tau x size
static const size_t TAU_X_SIZE = 32;


// Supporting function implementation

// Process get bulletproof tau x request
void processGetBulletproofTauXRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength != sizeof(uint32_t) + IDENTIFIER_SIZE + sizeof(uint64_t) + sizeof(uint8_t)) {
	
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
	
	// Get identifer depth from data
	const uint8_t identifierDepth = data[sizeof(account)];
	
	// Check if identifier depth is invalid
	if(identifierDepth > IDENTIFIER_MAXIMUM_DEPTH) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get value from data
	uint64_t value;
	memcpy(&value, &data[sizeof(account) + IDENTIFIER_SIZE], sizeof(value));
	
	// Check if value is invalid
	if(!value) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get switch type from data
	const enum SwitchType switchType = data[sizeof(account) + IDENTIFIER_SIZE + sizeof(uint64_t)];
	
	// Check if switch type is invalid
	if(switchType > REGULAR_SWITCH_TYPE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Initialize proof message
	uint8_t proofMessage[PROOF_MESSAGE_SIZE] = {};
	
	// Set proof message's value
	proofMessage[PROOF_MESSAGE_SWITCH_TYPE_INDEX] = switchType;
	proofMessage[PROOF_MESSAGE_IDENTIFIER_INDEX] = identifierDepth;
	memcpy(&proofMessage[PROOF_MESSAGE_IDENTIFIER_INDEX + sizeof(identifierDepth)], &data[sizeof(account) + sizeof(identifierDepth)], IDENTIFIER_SIZE - sizeof(identifierDepth));
	
	// Get identifier path from data
	uint32_t identifierPath[identifierDepth];
	memcpy(identifierPath, &data[sizeof(account) + sizeof(identifierDepth)], sizeof(identifierPath));
	
	// Go through all parts in the identifier path
	for(size_t i = 0; i < IDENTIFIER_MAXIMUM_DEPTH; ++i) {
	
		// Convert part from big endian to little endian
		identifierPath[i] = os_swap_u32(identifierPath[i]);
	}
	
	// Initialize blinding factor
	volatile uint8_t blindingFactor[BLINDING_FACTOR_SIZE];
	
	// Initialize private nonce
	volatile uint8_t privateNonce[NONCE_SIZE];
	
	// Initialize bulletproof tau x
	volatile uint8_t bulletproofTauX[TAU_X_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Derive blinding factor
			deriveBlindingFactor(blindingFactor, account, value, identifierPath, identifierDepth, switchType);
			
			// Commit value with the blinding factor
			uint8_t commitment[COMMITMENT_SIZE];
			commitValue(commitment, value, (uint8_t *)blindingFactor);
			
			// Get rewind nonce
			uint8_t rewindNonce[NONCE_SIZE];
			getRewindNonce(rewindNonce, account, commitment);
			
			// Get private nonce
			getPrivateNonce(privateNonce, account, commitment);
			
			// Calculate bulletproof tau x
			calculateBulletproofTauX(bulletproofTauX, value, (uint8_t *)blindingFactor, rewindNonce, (uint8_t *)privateNonce, proofMessage);
		}
		
		// Finally
		FINALLY {
		
			// Clear the blinding factor
			explicit_bzero((uint8_t *)blindingFactor, sizeof(blindingFactor));
			
			// Clear the private nonce
			explicit_bzero((uint8_t *)privateNonce, sizeof(privateNonce));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the bulletproof tau x will overflow
	if(willResponseOverflow(*responseLength, sizeof(bulletproofTauX))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append bulletproof tau x to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)bulletproofTauX, sizeof(bulletproofTauX));
	
	*responseLength += sizeof(bulletproofTauX);
	
	// Throw success
	THROW(SWO_SUCCESS);
}
