// Header files
#include <os_io_seproxyhal.h>
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"


// Definitions

// ChaCha20 state block counter index
#define CHACHA20_STATE_BLOCK_COUNTER_INDEX 12

// Poly1305 block size size
#define POLY1305_BLOCK_SIZE 16

// ChaCha20 key size
#define CHACHA20_KEY_SIZE 32


// Constants

// Check if not using SDK's version of ChaCha20 Poly1305
#ifndef HAVE_CHACHA_POLY

// ChaCha20 state constant
static const char CHACHA20_STATE_CONSTANT[] = {'e', 'x', 'p', 'a', 'n', 'd', ' ', '3', '2', '-', 'b', 'y', 't', 'e', ' ', 'k'};

// Poly1305 p
static const uint8_t POLY1305_P[] = {0x03, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFB};

#endif


// Function prototypes

// Check if not using SDK's version of ChaCha20 Poly1305
#ifndef HAVE_CHACHA_POLY

// Quarter round
static void quarterRound(uint32_t *a, uint32_t *b, uint32_t *c, uint32_t *d);

// Rotate left
static void rotateLeft(uint32_t *value, const size_t bits);

// Initialize ChaCha20 current state
static void initializeChaCha20CurrentState(const ChaCha20Poly1305State *chaCha20Poly1305State, uint32_t *chaCha20CurrentState);

// Update Poly1305 accumulator
static void updatePoly1305Accumulator(ChaCha20Poly1305State *chaCha20Poly1305State, const uint8_t *value, const size_t valueLength);

#endif


// Supporting function implementation

// Initialize ChaCha20 Poly1305
void initializeChaCha20Poly1305(volatile ChaCha20Poly1305State *chaCha20Poly1305State, const uint8_t *key, const uint8_t *nonce, const uint8_t *additionalAuthenticatedData, const size_t additionalAuthenticatedDataLength, const uint32_t counter, uint32_t *chaCha20ResultingState) {

// Check if using SDK's version of ChaCha20 Poly1305
#ifdef HAVE_CHACHA_POLY

	// Initialize ChaCha20 Poly1305 state
	cx_chachapoly_init((ChaCha20Poly1305State *)chaCha20Poly1305State);

	// Set ChaCha20 Poly1305 state's key and throw error if it fails
	CX_THROW(cx_chachapoly_set_key((ChaCha20Poly1305State *)chaCha20Poly1305State, key, CHACHA20_KEY_SIZE));

	// Combine counter and nonce
	uint8_t counterAndNonce[sizeof(counter) + CHACHA20_NONCE_SIZE];
	memcpy(counterAndNonce, &counter, sizeof(counter));
	memcpy(&counterAndNonce[sizeof(counter)], nonce, CHACHA20_NONCE_SIZE);

	// Convert counter in counter and nonce to big endian
	swapEndianness(counterAndNonce, sizeof(counter));

	// Configure ChaCha20 Poly1305 state to use the counter and nonce and throw error if it fails
	CX_THROW(cx_chachapoly_start((ChaCha20Poly1305State *)chaCha20Poly1305State, CX_ENCRYPT, counterAndNonce, sizeof(counterAndNonce)));

	// Check if not exporting the ChaCha20 resulting state
	if(!chaCha20ResultingState) {

		// Update ChaCha20 Poly1305 state with the additional authenticated data and throw error if it fails
		CX_THROW(cx_chachapoly_update_aad((ChaCha20Poly1305State *)chaCha20Poly1305State, additionalAuthenticatedData, additionalAuthenticatedDataLength));
	}

	// Otherwise
	else {

		// Initialize resulting ChaCha20 current state with the ChaCha20 Poly1305 state
		memcpy(chaCha20ResultingState, (uint32_t *)&chaCha20Poly1305State->chacha20_ctx.block, sizeof(chaCha20Poly1305State->chacha20_ctx.block));
	}

// Otherwise
#else

	// Set additional authenticated data length
	chaCha20Poly1305State->additionalAuthenticatedDataLength = additionalAuthenticatedDataLength;

	// Set the data length to zero
	chaCha20Poly1305State->dataLength = 0;

	// Initialize ChaCha20 original state
	chaCha20Poly1305State->chaCha20OriginalState[0] = *(uint32_t *)CHACHA20_STATE_CONSTANT;
	chaCha20Poly1305State->chaCha20OriginalState[1] = *(uint32_t *)&CHACHA20_STATE_CONSTANT[sizeof(uint32_t) * 1];
	chaCha20Poly1305State->chaCha20OriginalState[2] = *(uint32_t *)&CHACHA20_STATE_CONSTANT[sizeof(uint32_t) * 2];
	chaCha20Poly1305State->chaCha20OriginalState[3] = *(uint32_t *)&CHACHA20_STATE_CONSTANT[sizeof(uint32_t) * 3];
	chaCha20Poly1305State->chaCha20OriginalState[4] = *(uint32_t *)key;
	chaCha20Poly1305State->chaCha20OriginalState[5] = *(uint32_t *)&key[sizeof(uint32_t) * 1];
	chaCha20Poly1305State->chaCha20OriginalState[6] = *(uint32_t *)&key[sizeof(uint32_t) * 2];
	chaCha20Poly1305State->chaCha20OriginalState[7] = *(uint32_t *)&key[sizeof(uint32_t) * 3];
	chaCha20Poly1305State->chaCha20OriginalState[8] = *(uint32_t *)&key[sizeof(uint32_t) * 4];
	chaCha20Poly1305State->chaCha20OriginalState[9] = *(uint32_t *)&key[sizeof(uint32_t) * 5];
	chaCha20Poly1305State->chaCha20OriginalState[10] = *(uint32_t *)&key[sizeof(uint32_t) * 6];
	chaCha20Poly1305State->chaCha20OriginalState[11] = *(uint32_t *)&key[sizeof(uint32_t) * 7];
	chaCha20Poly1305State->chaCha20OriginalState[12] = counter;
	chaCha20Poly1305State->chaCha20OriginalState[13] = *(uint32_t *)nonce;
	chaCha20Poly1305State->chaCha20OriginalState[14] = *(uint32_t *)&nonce[sizeof(uint32_t) * 1];
	chaCha20Poly1305State->chaCha20OriginalState[15] = *(uint32_t *)&nonce[sizeof(uint32_t) * 2];

	// Check if not exporting the ChaCha20 resulting state
	if(!chaCha20ResultingState) {

		// Initialize ChaCha20 current state
		volatile uint32_t chaCha20CurrentState[CHACHA20_STATE_SIZE];

		// Begin try
		BEGIN_TRY {

			// Try
			TRY {

				// Initialize ChaCha20 current state with the ChaCha20 Poly1305 state
				initializeChaCha20CurrentState((ChaCha20Poly1305State *)chaCha20Poly1305State, (uint32_t *)chaCha20CurrentState);

				// Get the Poly1305 key from the ChaCha20 current state
				const uint8_t *poly1305Key = (uint8_t *)chaCha20CurrentState;

				// Set Poly1305 r to the first part of the ChaCha20 current state
				memcpy((uint8_t *)chaCha20Poly1305State->poly1305R, poly1305Key, sizeof(chaCha20Poly1305State->poly1305R) - 1);
				chaCha20Poly1305State->poly1305R[sizeof(chaCha20Poly1305State->poly1305R) - 1] = 0;

				// Clamp Poly1305 r
				chaCha20Poly1305State->poly1305R[3] &= 15;
				chaCha20Poly1305State->poly1305R[7] &= 15;
				chaCha20Poly1305State->poly1305R[11] &= 15;
				chaCha20Poly1305State->poly1305R[15] &= 15;
				chaCha20Poly1305State->poly1305R[4] &= 252;
				chaCha20Poly1305State->poly1305R[8] &= 252;
				chaCha20Poly1305State->poly1305R[12] &= 252;

				// Convert Poly1305 r to big endian
				swapEndianness((uint8_t *)&chaCha20Poly1305State->poly1305R, sizeof(chaCha20Poly1305State->poly1305R));

				// Set Poly1305 s to the second part of the ChaCha20 current state
				memcpy((uint8_t *)chaCha20Poly1305State->poly1305S, &poly1305Key[sizeof(chaCha20Poly1305State->poly1305R) - 1], sizeof(chaCha20Poly1305State->poly1305S) - 1);
				chaCha20Poly1305State->poly1305S[sizeof(chaCha20Poly1305State->poly1305S) - 1] = 0;
			}

			// Finally
			FINALLY {

				// Clear the ChaCha20 current state
				explicit_bzero((uint32_t *)chaCha20CurrentState, sizeof(chaCha20CurrentState));
			}
		}

		// End try
		END_TRY;

		// Convert Poly1305 s to big endian
		swapEndianness((uint8_t *)&chaCha20Poly1305State->poly1305S, sizeof(chaCha20Poly1305State->poly1305S));

		// Set Poly1305 accumulator to zero
		explicit_bzero((uint8_t *)chaCha20Poly1305State->poly1305Accumulator, sizeof(chaCha20Poly1305State->poly1305Accumulator));

		// Update Poly1305 accumulator with the additional authenticated data
		updatePoly1305Accumulator((ChaCha20Poly1305State *)chaCha20Poly1305State, additionalAuthenticatedData, additionalAuthenticatedDataLength);
	}

	// Otherwise
	else {

		// Initialize resulting ChaCha20 current state with the ChaCha20 Poly1305 state
		initializeChaCha20CurrentState((ChaCha20Poly1305State *)chaCha20Poly1305State, chaCha20ResultingState);
	}
#endif
}

// Encrypt ChaCha20 Poly1305 data
void encryptChaCha20Poly1305Data(ChaCha20Poly1305State *chaCha20Poly1305State, volatile uint8_t *encryptedDataBlock, const uint8_t *dataBlock, const size_t dataBlockLength) {

// Check if using SDK's version of ChaCha20 Poly1305
#ifdef HAVE_CHACHA_POLY

	// Check if data length or block counter will overflow
	if(SIZE_MAX - chaCha20Poly1305State->ciphertext_len < dataBlockLength || chaCha20Poly1305State->chacha20_ctx.state[CHACHA20_STATE_BLOCK_COUNTER_INDEX] == UINT32_MAX) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Encrypt the data block with the ChaCha20 Poly1305 state and throw error if it fails
	chaCha20Poly1305State->mode = CX_ENCRYPT;
	CX_THROW(cx_chachapoly_update(chaCha20Poly1305State, dataBlock, (uint8_t *)encryptedDataBlock, dataBlockLength));

// Otherwise
#else

	// Check if data length or block counter will overflow
	if(UINT64_MAX - chaCha20Poly1305State->dataLength < dataBlockLength || chaCha20Poly1305State->chaCha20OriginalState[CHACHA20_STATE_BLOCK_COUNTER_INDEX] == UINT32_MAX) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Increment the ChaCha20 original state's block counter
	++chaCha20Poly1305State->chaCha20OriginalState[CHACHA20_STATE_BLOCK_COUNTER_INDEX];

	// Initialize ChaCha20 current state
	volatile uint32_t chaCha20CurrentState[CHACHA20_STATE_SIZE];

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Initialize ChaCha20 current state with the ChaCha20 Poly1305 state
			initializeChaCha20CurrentState(chaCha20Poly1305State, (uint32_t *)chaCha20CurrentState);

			// Go through all bytes in the data block
			for(size_t i = 0; i < dataBlockLength; ++i) {

				// Encrypt the byte with the ChaCha20 current state
				encryptedDataBlock[i] = dataBlock[i] ^ ((uint8_t *)chaCha20CurrentState)[i];
			}
		}

		// Finally
		FINALLY {

			// Clear the ChaCha20 current state
			explicit_bzero((uint32_t *)chaCha20CurrentState, sizeof(chaCha20CurrentState));
		}
	}

	// End try
	END_TRY;

	// Update Poly1305 accumulator with the encrypted data block
	updatePoly1305Accumulator(chaCha20Poly1305State, (uint8_t *)encryptedDataBlock, dataBlockLength);

	// Update the data length
	chaCha20Poly1305State->dataLength += dataBlockLength;
#endif
}

// Decrypt ChaCha20 Poly1305 data
void decryptChaCha20Poly1305Data(ChaCha20Poly1305State *chaCha20Poly1305State, volatile uint8_t *decryptedDataBlock, const uint8_t *dataBlock, const size_t dataBlockLength) {

// Check if using SDK's version of ChaCha20 Poly1305
#ifdef HAVE_CHACHA_POLY

	// Check if data length or block counter will overflow
	if(SIZE_MAX - chaCha20Poly1305State->ciphertext_len < dataBlockLength || chaCha20Poly1305State->chacha20_ctx.state[CHACHA20_STATE_BLOCK_COUNTER_INDEX] == UINT32_MAX) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Decrypt the data block with the ChaCha20 Poly1305 state and throw error if it fails
	chaCha20Poly1305State->mode = CX_DECRYPT;
	CX_THROW(cx_chachapoly_update(chaCha20Poly1305State, dataBlock, (uint8_t *)decryptedDataBlock, dataBlockLength));

// Otherwise
#else

	// Check if data length or block counter will overflow
	if(UINT64_MAX - chaCha20Poly1305State->dataLength < dataBlockLength || chaCha20Poly1305State->chaCha20OriginalState[CHACHA20_STATE_BLOCK_COUNTER_INDEX] == UINT32_MAX) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Increment the ChaCha20 original state's block counter
	++chaCha20Poly1305State->chaCha20OriginalState[CHACHA20_STATE_BLOCK_COUNTER_INDEX];

	// Initialize ChaCha20 current state
	volatile uint32_t chaCha20CurrentState[CHACHA20_STATE_SIZE];

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Initialize ChaCha20 current state with the ChaCha20 Poly1305 state
			initializeChaCha20CurrentState(chaCha20Poly1305State, (uint32_t *)chaCha20CurrentState);

			// Go through all bytes in the data block
			for(size_t i = 0; i < dataBlockLength; ++i) {

				// Decrypt the byte with the ChaCha20 current state
				decryptedDataBlock[i] = dataBlock[i] ^ ((uint8_t *)chaCha20CurrentState)[i];
			}
		}

		// Finally
		FINALLY {

			// Clear the ChaCha20 current state
			explicit_bzero((uint32_t *)chaCha20CurrentState, sizeof(chaCha20CurrentState));
		}
	}

	// End try
	END_TRY;

	// Update Poly1305 accumulator with the data block
	updatePoly1305Accumulator(chaCha20Poly1305State, dataBlock, dataBlockLength);

	// Update the data length
	chaCha20Poly1305State->dataLength += dataBlockLength;
#endif
}

// Get ChaCha20 Poly1305 tag
void getChaCha20Poly1305Tag(const ChaCha20Poly1305State *chaCha20Poly1305State, volatile uint8_t *tag) {

	// Initialize copy
	volatile ChaCha20Poly1305State copy;

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Copy the ChaCha20 Poly1305 state
			memcpy((ChaCha20Poly1305State *)&copy, chaCha20Poly1305State, sizeof(copy));

// Check if using SDK's version of ChaCha20 Poly1305
#ifdef HAVE_CHACHA_POLY

			// Get the ChaCha20 Poly1305 state's tag and throw error if it fails
			CX_THROW(cx_chachapoly_finish((ChaCha20Poly1305State *)&copy, (uint8_t *)tag, POLY1305_TAG_SIZE));

// Otherwise
#else

			// Append additional authenticated data length and encrypted data length
			uint8_t lengths[sizeof(copy.additionalAuthenticatedDataLength) + sizeof(copy.dataLength)];
			memcpy(lengths, (uint8_t *)&copy.additionalAuthenticatedDataLength, sizeof(copy.additionalAuthenticatedDataLength));
			memcpy(&lengths[sizeof(copy.additionalAuthenticatedDataLength)], (uint8_t *)&copy.dataLength, sizeof(copy.dataLength));

			// Update Poly1305 accumulator with the lengths
			updatePoly1305Accumulator((ChaCha20Poly1305State *)&copy, lengths, sizeof(lengths));

			// Add Poly1305 s to the Poly1305 accumulator
			cx_math_add((uint8_t *)copy.poly1305Accumulator, (uint8_t *)copy.poly1305Accumulator, (uint8_t *)copy.poly1305S, sizeof(copy.poly1305Accumulator));

			// Convert the Poly1305 accumulator to little endian
			swapEndianness((uint8_t *)copy.poly1305Accumulator, sizeof(copy.poly1305Accumulator));

			// Set tag to the Poly1305 accumulator
			memcpy((uint8_t *)tag, (uint8_t *)copy.poly1305Accumulator, POLY1305_TAG_SIZE);
#endif
		}

		// Finally
		FINALLY {

			// Clear the copy
			explicit_bzero((ChaCha20Poly1305State *)&copy, sizeof(copy));
		}
	}

	// End try
	END_TRY;
}

// Check if not using SDK's version of ChaCha20 Poly1305
#ifndef HAVE_CHACHA_POLY

// Quarter round
void quarterRound(uint32_t *a, uint32_t *b, uint32_t *c, uint32_t *d) {

	// Perform quarter round
	*a += *b;
	*d ^= *a;
	rotateLeft(d, 16);

	*c += *d;
	*b ^= *c;
	rotateLeft(b, 12);

	*a += *b;
	*d ^= *a;
	rotateLeft(d, 8);

	*c += *d;
	*b ^= *c;
	rotateLeft(b, 7);
}

// Rotate left
void rotateLeft(uint32_t *value, const size_t bits) {

	// Rotate value left by number of bits
	*value = (*value << bits) | (*value >> (sizeof(*value) * BITS_IN_A_BYTE - bits));
}

// Initialize ChaCha20 current state
void initializeChaCha20CurrentState(const ChaCha20Poly1305State *chaCha20Poly1305State, uint32_t *chaCha20CurrentState) {

	// Set ChaCha20 current state as the ChaCha20 original state
	memcpy(chaCha20CurrentState, chaCha20Poly1305State->chaCha20OriginalState, sizeof(chaCha20Poly1305State->chaCha20OriginalState));

	// Go through ten iterations
	for(uint_fast8_t i = 0; i < 10; ++i) {

		// Perform two rounds on the ChaCha20 current state
		quarterRound(&chaCha20CurrentState[0], &chaCha20CurrentState[4], &chaCha20CurrentState[8], &chaCha20CurrentState[12]);
		quarterRound(&chaCha20CurrentState[1], &chaCha20CurrentState[5], &chaCha20CurrentState[9], &chaCha20CurrentState[13]);
		quarterRound(&chaCha20CurrentState[2], &chaCha20CurrentState[6], &chaCha20CurrentState[10], &chaCha20CurrentState[14]);
		quarterRound(&chaCha20CurrentState[3], &chaCha20CurrentState[7], &chaCha20CurrentState[11], &chaCha20CurrentState[15]);
		quarterRound(&chaCha20CurrentState[0], &chaCha20CurrentState[5], &chaCha20CurrentState[10], &chaCha20CurrentState[15]);
		quarterRound(&chaCha20CurrentState[1], &chaCha20CurrentState[6], &chaCha20CurrentState[11], &chaCha20CurrentState[12]);
		quarterRound(&chaCha20CurrentState[2], &chaCha20CurrentState[7], &chaCha20CurrentState[8], &chaCha20CurrentState[13]);
		quarterRound(&chaCha20CurrentState[3], &chaCha20CurrentState[4], &chaCha20CurrentState[9], &chaCha20CurrentState[14]);
	}

	// Go through all parts of the ChaCha20 current state
	for(size_t i = 0; i < CHACHA20_STATE_SIZE; ++i) {

		// Add ChaCha20 original state part to the ChaCha20 current state part
		chaCha20CurrentState[i] += chaCha20Poly1305State->chaCha20OriginalState[i];
	}
}

// Update Poly1305 accumulator
void updatePoly1305Accumulator(ChaCha20Poly1305State *chaCha20Poly1305State, const uint8_t *value, const size_t valueLength) {

	// Go through all blocks in the value
	for(size_t i = 0; i <= valueLength / POLY1305_BLOCK_SIZE; ++i) {

		// Get current block size
		const size_t currentBlockSize = MIN(MAX((int8_t)valueLength - POLY1305_BLOCK_SIZE * i, 0), POLY1305_BLOCK_SIZE);

		// Check if the current block isn't empty
		if(currentBlockSize) {

			// Copy current block to block and set the highest byte to one
			uint8_t block[POLY1305_NUMBER_SIZE] = {
				[POLY1305_NUMBER_SIZE - 1] = 1,
			};

			memcpy(block, &value[i * POLY1305_BLOCK_SIZE], currentBlockSize);

			// Convert block to big endian
			swapEndianness(block, sizeof(block));

			// Add block to the Poly1305 accumulator
			cx_math_add(chaCha20Poly1305State->poly1305Accumulator, chaCha20Poly1305State->poly1305Accumulator, block, sizeof(chaCha20Poly1305State->poly1305Accumulator));

			// Multiply the Poly1305 accumulator by the Poly1305 r and modulo it by the Poly1305 p and throw error if it fails
			CX_THROW(cx_math_multm_no_throw(chaCha20Poly1305State->poly1305Accumulator, chaCha20Poly1305State->poly1305Accumulator, chaCha20Poly1305State->poly1305R, POLY1305_P, sizeof(chaCha20Poly1305State->poly1305Accumulator)));
		}
	}
}

#endif
