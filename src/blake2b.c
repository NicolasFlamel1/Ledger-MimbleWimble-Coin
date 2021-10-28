// Header files
#include <os.h>
#include <string.h>
#include "blake2b.h"
#include "common.h"


// Definitions

// Parameter reserved size
#define PARAMETER_RESERVED_SIZE 14


// Structures

// Parameter
struct Parameter {

	// Digest length
	uint8_t digestLength;
	
	// Key length
	uint8_t keyLength;
	
	// Fanout
	uint8_t fanout;
	
	// Depth
	uint8_t depth;
	
	// Leaf length
	uint32_t leafLength;
	
	// Node offset
	uint32_t nodeOffset;
	
	// XOF length
	uint32_t xofLength;
	
	// Node depth
	uint8_t nodeDepth;
	
	// Inner length
	uint8_t innerLength;
	
	// Reserved
	uint8_t reserved[PARAMETER_RESERVED_SIZE];
	
	// Salt
	uint8_t salt[BLAKE2B_SALTBYTES];
	
	// Personal
	uint8_t personal[BLAKE2B_PERSONALBYTES];
};


// Constants

// Bits size
static const size_t BITS_SIZE = 32 * BITS_IN_A_BYTE;

// Initialization vector
static const uint64_t INITIALIZATION_VECTOR[] = {
	0x6A09E667F3BCC908,
	0xBB67AE8584CAA73B,
	0x3C6EF372FE94F82B,
	0xA54FF53A5F1D36F1,
	0x510E527FADE682D1,
	0x9B05688C2B3E6C1F,
	0x1F83D9ABFB41BD6B,
	0x5BE0CD19137E2179
};

// Parameter fanout value
static const uint8_t PARAMETER_FANOUT_VALUE = 1;

// Parameter depth value
static const uint8_t PARAMETER_DEPTH_VALUE = 1;


// Supporting function implementation

// Get BLAKE2b
void getBlake2b(uint8_t *output, size_t outputLength, const uint8_t *input, size_t inputLength, const uint8_t *key, size_t keyLength) {

	// Initialize hash
	cx_blake2b_t hash;
	cx_blake2b_init(&hash, BITS_SIZE);
	
	// Initialize parameter
	struct Parameter parameter;
	
	// Set parameter's values
	explicit_bzero(&parameter, sizeof(parameter));
	parameter.digestLength = hash.ctx.outlen;
	parameter.keyLength = key ? keyLength : 0;
	parameter.fanout = PARAMETER_FANOUT_VALUE;
	parameter.depth = PARAMETER_DEPTH_VALUE;
	
	// Set hash to the initialization vector XORed with the parameter
	os_xor(hash.ctx.h, (void *)INITIALIZATION_VECTOR, &parameter, sizeof(hash.ctx.h));
	
	// Check if a key is provided
	if(key) {
	
		// Initialize key block
		volatile uint8_t keyBlock[BLAKE2B_BLOCKBYTES] = {};
		
		// Begin try
		BEGIN_TRY {
		
			// Try
			TRY {
			
				// Set key at the start of the key block
				memcpy((uint8_t *)keyBlock, key, keyLength);
				
				// Update the hash with the block
				cx_hash(&hash.header, 0, (uint8_t *)keyBlock, sizeof(keyBlock), NULL, 0);
			}
		
			// Finally
			FINALLY {
			
				// Clear the key block
				explicit_bzero((uint8_t *)keyBlock, sizeof(keyBlock));
			}
		}
		
		// End try
		END_TRY;
	}
	
	// Get hash
	cx_hash(&hash.header, CX_LAST, input, inputLength, output, outputLength);
}
