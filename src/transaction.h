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
	
	// Includes input
	bool includesInput;
	
	// Offset created
	bool offsetCreated;
	
	// Output value
	uint64_t outputValue;
	
	// Input value
	uint64_t inputValue;
	
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
