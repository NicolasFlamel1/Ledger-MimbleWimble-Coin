// Header guard
#ifndef SLATEPACK_H
#define SLATEPACK_H


// Header files
#include <stdint.h>
#include "chacha20_poly1305.h"


// Definitions

// Slatepack data session key size
#define SLATEPACK_DATA_SESSION_KEY_SIZE 32

// Slatepack address without human-readable part size 
#define SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE 59


// Constants

// Slatepack shared private key size
extern const size_t SLATEPACK_SHARED_PRIVATE_KEY_SIZE;

// Slatepack data state
enum SlatepackDataState {

	// Inactive Slatepack data state
	INACTIVE_SLATEPACK_DATA_STATE,
	
	// Ready Slatepack data state
	READY_SLATEPACK_DATA_STATE,
	
	// Active Slatepack data state
	ACTIVE_SLATEPACK_DATA_STATE,
	
	// Complete Slatepack data state
	COMPLETE_SLATEPACK_DATA_STATE
};


// Structures

// Slatepack data
struct SlatepackData {

	// Encrypting state
	enum SlatepackDataState encryptingState;
	
	// Decrypting state
	enum SlatepackDataState decryptingState;

	// Session key
	uint8_t sessionKey[SLATEPACK_DATA_SESSION_KEY_SIZE];
	
	// ChaCha20 Poly1305 state
	struct ChaCha20Poly1305State chaCha20Poly1305State;
};


// Global variables

// Slatepack data
extern struct SlatepackData slatepackData;


// Function prototypes

// Reset Slatepack data
void resetSlatepackData(void);

// Create Slatepack shared private key
void createSlatepackSharedPrivateKey(volatile uint8_t *sharedPrivateKey, uint32_t account, const uint8_t *publicKey);

// Get Slatepack address
void getSlatepackAddress(uint8_t *slatepackAddress, uint32_t account);


#endif
