// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "get_bulletproof.h"


// Supporting function implementation

// Process get bulletproof request
void processGetBulletproofRequest(unsigned short *responseLength, unsigned char *responseFlags) {

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
	const uint32_t *account = (uint32_t *)data;
	
	// Check if account is invalid
	if(*account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get identifer depth from data
	const uint8_t identifierDepth = data[sizeof(*account)];
	
	// Check if identifier depth is invalid
	if(identifierDepth > IDENTIFIER_MAXIMUM_DEPTH) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get value from data
	const uint64_t *value = (uint64_t *)&data[sizeof(*account) + IDENTIFIER_SIZE];
	
	// Check if value is invalid
	if(!*value) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get switch type from data
	const enum SwitchType switchType = data[sizeof(*account) + IDENTIFIER_SIZE + sizeof(uint64_t)];
	
	// Check if switch type is invalid
	if(switchType > REGULAR_SWITCH_TYPE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Initialize proof message
	uint8_t proofMessage[PROOF_MESSAGE_SIZE];
	
	// Set proof message's value
	explicit_bzero(proofMessage, sizeof(proofMessage));
	proofMessage[PROOF_MESSAGE_SWITCH_TYPE_INDEX] = switchType;
	proofMessage[PROOF_MESSAGE_IDENTIFIER_INDEX] = identifierDepth;
	
	memcpy(&proofMessage[PROOF_MESSAGE_IDENTIFIER_INDEX + sizeof(identifierDepth)], &data[sizeof(*account) + sizeof(identifierDepth)], IDENTIFIER_SIZE - sizeof(identifierDepth));
	
	// Get identifier path from data
	uint32_t *identifierPath = (uint32_t *)&data[sizeof(*account) + sizeof(identifierDepth)];
	
	// Go through all parts in the identifier path
	for(size_t i = 0; i < IDENTIFIER_MAXIMUM_DEPTH; ++i) {
	
		// Convert part from big endian to little endian
		identifierPath[i] = os_swap_u32(identifierPath[i]);
	}
	
	// Initialize blinding factor
	volatile uint8_t blindingFactor[BLINDING_FACTOR_SIZE];
	
	// Initialize private nonce
	volatile uint8_t privateNonce[NONCE_SIZE];
	
	// Initialize bulletproof
	volatile uint8_t bulletproof[BULLETPROOF_SIZE];
	
	// Initialize bulletproof length
	volatile size_t bulletproofLength = sizeof(bulletproof);
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Derive blinding factor
			deriveBlindingFactor(blindingFactor, *account, *value, identifierPath, identifierDepth, switchType);
			
			// Commit value with the blinding factor
			uint8_t commitment[COMMITMENT_SIZE];
			commitValue(commitment, *value, (uint8_t *)blindingFactor);
			
			// Get rewind nonce
			uint8_t rewindNonce[NONCE_SIZE];
			getRewindNonce(rewindNonce, *account, commitment);
			
			// Get private nonce
			getPrivateNonce(privateNonce, *account, commitment);
			
			// Calculate bulletproof
			calculateBulletproof(bulletproof, &bulletproofLength, value, (uint8_t *)blindingFactor, rewindNonce, (uint8_t *)privateNonce, proofMessage);
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
	
	// TODO find good way to return a lot of data
	
	/*// Check if response with the bulletproof will overflow
	if(willResponseOverflow(*responseLength, bulletproofLength)) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append bulletproof to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)bulletproof, bulletproofLength);
	
	*responseLength += bulletproofLength;*/
	
	// Throw success
	THROW(SWO_SUCCESS);
}
