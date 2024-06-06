// Header guard
#ifndef STORAGE_H
#define STORAGE_H


// Header files
#include "transaction.h"


// Definitions

// Storage
#define storage (*(volatile struct PersistentStorage *)PIC(&N_PERSISTENTSTORAGE))

// Number of transaction secret nonces
#define NUMBER_OF_TRANSACTION_SECRET_NONCES 20


// Structures

// Persistent storage
struct PersistentStorage {

	// Transaction secret nonces
	uint8_t transactionSecretNonces[NUMBER_OF_TRANSACTION_SECRET_NONCES][sizeof(transaction.secretNonce) + ((sizeof(transaction.secretNonce) % CX_AES_BLOCK_SIZE) ? CX_AES_BLOCK_SIZE - sizeof(transaction.secretNonce) % CX_AES_BLOCK_SIZE : CX_AES_BLOCK_SIZE)];

	// Current transaction secret nonce index
	uint8_t currentTransactionSecretNonceIndex;
};


// Constants

// Check if fuzzing
#ifdef FUZZING

// Persistent storage
extern struct PersistentStorage N_PERSISTENTSTORAGE;

// Otherwise
#else

// Persistent storage
extern const struct PersistentStorage N_PERSISTENTSTORAGE;

#endif


// Function prototypes

// Initialize storage
void initializeStorage(void);


#endif
