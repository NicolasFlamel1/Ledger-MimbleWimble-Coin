// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "get_commitment.h"


// Supporting function implementation

// Process get commitment request
void processGetCommitmentRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter > TESTNET_NETWORK_TYPE || secondParameter || dataLength != sizeof(uint32_t) + IDENTIFIER_SIZE + sizeof(uint64_t) + sizeof(uint8_t)) {
	
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
	
	// Get identifier path from data
	uint32_t *identifierPath = (uint32_t *)&data[sizeof(*account) + sizeof(identifierDepth)];
	
	// Go through all parts in the identifier path
	for(size_t i = 0; i < IDENTIFIER_MAXIMUM_DEPTH; ++i) {
	
		// Convert part from big endian to little endian
		identifierPath[i] = os_swap_u32(identifierPath[i]);
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
	
	// Initialize blinding factor
	volatile uint8_t blindingFactor[BLINDING_FACTOR_SIZE];
	
	// Initialize commit
	volatile uint8_t commitment[COMMITMENT_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Derive blinding factor
			deriveBlindingFactor(blindingFactor, *account, *value, identifierPath, identifierDepth, switchType);
			
			// Commit value with the blinding factor
			commitValue(commitment, *value, (uint8_t *)blindingFactor);
		}
		
		// Finally
		FINALLY {
		
			// Clear the blinding factor
			explicit_bzero((uint8_t *)blindingFactor, sizeof(blindingFactor));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the commitment will overflow
	if(willResponseOverflow(*responseLength, sizeof(commitment))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append commitment to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)commitment, sizeof(commitment));
	
	*responseLength += sizeof(commitment);
	
	// Throw success
	THROW(SWO_SUCCESS);
}