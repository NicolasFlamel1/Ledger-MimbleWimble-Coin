// Header guard
#ifndef SLATE_H
#define SLATE_H


// Header files
#include "chacha20_poly1305.h"
#include "common.h"


// Definitions

// Slate session key size
#define SLATE_SESSION_KEY_SIZE 32


// Constants

// Slate state
enum SlateState {

	// Inactive slate state
	INACTIVE_SLATE_STATE,

	// Ready slate state
	READY_SLATE_STATE,

	// Active slate state
	ACTIVE_SLATE_STATE,

	// Complete slate state
	COMPLETE_SLATE_STATE
};


// Structures

// Slate
struct Slate {

	// Account
	uint32_t account;

	// Index
	uint32_t index;

	// Encrypting state
	enum SlateState encryptingState;

	// Decrypting state
	enum SlateState decryptingState;

	// Session key
	uint8_t sessionKey[SLATE_SESSION_KEY_SIZE];

	// Message hash state
	cx_sha256_t messageHashState;

	// ChaCha20 Poly1305 state
	volatile ChaCha20Poly1305State chaCha20Poly1305State;
};


// Global variables

// Slate
extern struct Slate slate;


// Function prototypes

// Reset slate
void resetSlate(void);


#endif
