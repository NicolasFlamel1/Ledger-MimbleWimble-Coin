// Header guard
#ifndef TRANSACTION_H
#define TRANSACTION_H


// Header files
#include <stdbool.h>
#include "crypto.h"
#include "slatepack.h"


// Structures

// Transaction
struct Transaction {
	
	// Account
	uint32_t account;
	
	// Index
	uint32_t index;
	
	// Send
	uint64_t send;
	
	// receive
	uint64_t receive;
	
	// Fee
	uint64_t fee;
	
	// Remaining output
	uint64_t remainingOutput;
	
	// Remaining input
	uint64_t remainingInput;
	
	// Blinding factor
	volatile uint8_t blindingFactor[BLINDING_FACTOR_SIZE];
	
	// Secret nonce
	uint8_t secretNonce[NONCE_SIZE];
	
	// Address length
	size_t addressLength;
	
	// Started
	bool started;
	
	// Offset applied
	bool offsetApplied;
	
	// Message signed
	bool messageSigned;
	
	// Address
	char address[sizeof("tgrin") - sizeof((char)'\0') + SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE];
};


// Global variables

// Transaction
extern struct Transaction transaction;


// Function prototypes

// Reset transaction
void resetTransaction(void);


#endif
