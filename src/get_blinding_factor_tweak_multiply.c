// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "get_blinding_factor_tweak_multiply.h"


// Constants

// Scalar size
static const size_t SCALAR_SIZE = 32;


// Supporting function implementation

// Process get blinding factor tweak multiply request
void processGetBlindingFactorTweakMultiplyRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter > TESTNET_NETWORK_TYPE || secondParameter || dataLength != sizeof(uint32_t) + IDENTIFIER_SIZE + sizeof(uint64_t) + sizeof(uint8_t) + SCALAR_SIZE) {
	
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
	
	// Get scalar from data
	const uint8_t *scalar = &data[sizeof(*account) + IDENTIFIER_SIZE + sizeof(uint64_t) + sizeof(uint8_t)];
	
	// Check if scalar is zero or is overflowed
	if(cx_math_is_zero(scalar, SCALAR_SIZE) || cx_math_cmp(scalar, SECP256K1_CURVE_ORDER, SCALAR_SIZE) >= 0) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Initialize blinding factor
	volatile uint8_t blindingFactor[BLINDING_FACTOR_SIZE];
	
	// Initialize result
	volatile uint8_t result[SCALAR_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Derive blinding factor
			deriveBlindingFactor(blindingFactor, *account, *value, identifierPath, identifierDepth, switchType);
			
			// Multiply the scalar by the blinding factor
			cx_math_multm((uint8_t *)result, scalar, (uint8_t *)blindingFactor, SECP256K1_CURVE_ORDER, sizeof(result));
			
			// Check if the result is zero or the result is the blinding factor
			if(cx_math_is_zero((uint8_t *)result, sizeof(result)) || !cx_math_cmp((uint8_t *)result, (uint8_t *)blindingFactor, sizeof(result))) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		}
		
		// Catch other errors
		CATCH_OTHER(error) {
		
			// Clear the result
			explicit_bzero((uint8_t *)result, sizeof(result));
			
			// Throw error
			THROW(error);
		}
		
		// Finally
		FINALLY {
		
			// Clear the blinding factor
			explicit_bzero((uint8_t *)blindingFactor, sizeof(blindingFactor));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with result will overflow
	if(willResponseOverflow(*responseLength, sizeof(result))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append result to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)result, sizeof(result));
	
	*responseLength += sizeof(result);
	
	// Throw success
	THROW(SWO_SUCCESS);
}
