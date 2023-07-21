// Header files
#include <os.h>
#include <string.h>
#include "blake2b.h"
#include "common.h"


// Definitions

// Parameter reserved size
#define PARAMETER_RESERVED_SIZE 14

// Bits size
#define BITS_SIZE (32 * BITS_IN_A_BYTE)

// Parameter fanout value
#define PARAMETER_FANOUT_VALUE 1

// Parameter depth value
#define PARAMETER_DEPTH_VALUE 1


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

// Initialization vector
static const uint64_t INITIALIZATION_VECTOR[] = {
	0x6A09E667F3BCC908,
	0xBB67AE8584CAA73B,
	0x3C6EF372FE94F82B,
	0xA54FF53A5F1D36F1,
	0x510E527FADE682D1,
	0x9B05688C2B3E6C1F,
	0x1F83D9ABFB41BD6B,
	0x5BE0CD19137E2179,
};


// Supporting function implementation

// Get BLAKE2b
void getBlake2b(volatile uint8_t *output, const size_t outputLength, const uint8_t *input, const size_t inputLength, const uint8_t *key, const size_t keyLength) {

	// Initialize hash and throw error if it fails
	volatile cx_blake2b_t hash;
	CX_THROW(cx_blake2b_init_no_throw((cx_blake2b_t *)&hash, BITS_SIZE));

	// Initialize parameter
	struct Parameter parameter = {

		// Digest length
		.digestLength = hash.ctx.outlen,

		// Key length
		.keyLength = key ? keyLength : 0,

		// Fan out
		.fanout = PARAMETER_FANOUT_VALUE,

		// Depth
		.depth = PARAMETER_DEPTH_VALUE,
	};

	// Set hash to the initialization vector XORed with the parameter
	os_xor((uint64_t *)hash.ctx.h, (void *)INITIALIZATION_VECTOR, &parameter, sizeof(hash.ctx.h));

	// Initialize key block
	volatile uint8_t keyBlock[BLAKE2B_BLOCKBYTES] = {0};

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Check if a key is provided
			if(key) {

				// Set key at the start of the key block
				memcpy((uint8_t *)keyBlock, key, keyLength);

				// Update the hash with the block and throw error if it fails
				CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash.header, 0, (uint8_t *)keyBlock, sizeof(keyBlock), NULL, 0));
			}

			// Get hash and throw error if it fails
			CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash.header, CX_LAST, input, inputLength, (uint8_t *)output, outputLength));
		}

		// Finally
		FINALLY {

			// Clear the key block
			explicit_bzero((uint8_t *)keyBlock, sizeof(keyBlock));

			// Clear the hash
			explicit_bzero((cx_blake2b_t *)&hash, sizeof(hash));
		}
	}

	// End try
	END_TRY;
}
