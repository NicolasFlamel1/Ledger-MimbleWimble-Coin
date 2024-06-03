// Header guard
#ifndef CHACHA20_POLY1305_H
#define CHACHA20_POLY1305_H


// Header files
#include <stddef.h>
#include <stdint.h>
#include "device.h"


// Definitions

// ChaCha20 block size
#define CHACHA20_BLOCK_SIZE 64

// Poly1305 number size
#define POLY1305_NUMBER_SIZE 17

// ChaCha20 nonce size
#define CHACHA20_NONCE_SIZE 12

// Poly1305 tag size
#define POLY1305_TAG_SIZE 16

// ChaCha20 state size
#define CHACHA20_STATE_SIZE 16


// Structures

// Check if using SDK's version of ChaCha20 Poly1305
#ifdef HAVE_CHACHA_POLY

// ChaCha20 Poly1305 state
typedef cx_chachapoly_context_t ChaCha20Poly1305State;

// Otherwise
#else

// ChaCha20 Poly1305 state
typedef struct {

	// ChaCha20 original state
	uint32_t chaCha20OriginalState[CHACHA20_STATE_SIZE];

	// Poly1305 r
	uint8_t poly1305R[POLY1305_NUMBER_SIZE];

	// Poly1305 s
	uint8_t poly1305S[POLY1305_NUMBER_SIZE];

	// Poly1305 accumulator
	uint8_t poly1305Accumulator[POLY1305_NUMBER_SIZE];

	// Additional authenticated data length
	uint64_t additionalAuthenticatedDataLength;

	// Data length
	uint64_t dataLength;

} ChaCha20Poly1305State;

#endif


// Function prototypes

// Initialize ChaCha20 Poly1305
void initializeChaCha20Poly1305(volatile ChaCha20Poly1305State *chaCha20Poly1305State, const uint8_t *key, const uint8_t *nonce, const uint8_t *additionalAuthenticatedData, const size_t additionalAuthenticatedDataLength, const uint32_t counter, uint32_t *chaCha20ResultingState);

// Encrypt ChaCha20 Poly1305 data
void encryptChaCha20Poly1305Data(ChaCha20Poly1305State *chaCha20Poly1305State, volatile uint8_t *encryptedDataBlock, const uint8_t *dataBlock, const size_t dataBlockLength);

// Decrypt ChaCha20 Poly1305 data
void decryptChaCha20Poly1305Data(ChaCha20Poly1305State *chaCha20Poly1305State, volatile uint8_t *decryptedDataBlock, const uint8_t *dataBlock, const size_t dataBlockLength);

// Get ChaCha20 Poly1305 tag
void getChaCha20Poly1305Tag(const ChaCha20Poly1305State *chaCha20Poly1305State, volatile uint8_t *tag);


#endif
