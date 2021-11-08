// Header guard
#ifndef SCALAR_LEDGER_H
#define SCALAR_LEDGER_H


// Definitions

// Scalar data size
#define SCALAR_DATA_SIZE 32


// Structures

// Secp256k1 scalar
typedef struct {

	// Data
	uint8_t data[SCALAR_DATA_SIZE];
	
} secp256k1_scalar;


#endif
