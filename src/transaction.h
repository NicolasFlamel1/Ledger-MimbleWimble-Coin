// Header guard
#ifndef TRANSACTION_H
#define TRANSACTION_H


// Header files
#include <stdbool.h>
#include "crypto.h"


// Structures

// Transaction
struct Transaction {

	// Started
	bool started;
	
	// Offset applied
	bool offsetApplied;
	
	// Account
	uint32_t account;
	
	// Set input
	uint64_t input;
	
	// Set fee
	uint64_t fee;
	
	// Remaining output
	uint64_t remainingOutput;
	
	// Remaining input
	uint64_t remainingInput;
	
	// Blinding factor
	volatile uint8_t blindingFactor[BLINDING_FACTOR_SIZE];
};


// Global variables

// Transaction
extern struct Transaction transaction;


// Function prototypes

// Reset transaction
void resetTransaction(void);


#endif
