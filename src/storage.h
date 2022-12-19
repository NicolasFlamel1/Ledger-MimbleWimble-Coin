// Header guard
#ifndef STORAGE_H
#define STORAGE_H


// Header files
#include "currency_information.h"
#include "transaction.h"


// Definitions

// Storage
#define storage (*(volatile struct PersistentStorage *)PIC(&N_PERSISTENTSTORAGE[currencyInformation->id]))

// Number of transaction secret nonces
#define NUMBER_OF_TRANSACTION_SECRET_NONCES 20


// Structures

// Persistent storage
struct PersistentStorage {

	// Transaction secret nonces
	uint8_t transactionSecretNonces[NUMBER_OF_TRANSACTION_SECRET_NONCES][sizeof(transaction.secretNonce) + MAXIMUM_DER_SIGNATURE_SIZE + CX_AES_BLOCK_SIZE - (sizeof(transaction.secretNonce) + MAXIMUM_DER_SIGNATURE_SIZE) % CX_AES_BLOCK_SIZE];
	
	// Current transaction secret nonce index
	uint8_t currentTransactionSecretNonceIndex;
};


// Constants

// Persistent storage
extern const struct PersistentStorage N_PERSISTENTSTORAGE[TOTAL_NUMBER_OF_SUPPORTED_CURRENCIES];


// Function prototypes

// Initialize storage
void initializeStorage(void);


#endif
