// Header guard
#ifndef FIELD_LEDGER_H
#define FIELD_LEDGER_H


// Definitions

// Field element data size
#define FIELD_ELEMENT_DATA_SIZE 32

// Secp256k1 field element constant inner
#define SECP256K1_FE_CONST_INNER(d7, d6, d5, d4, d3, d2, d1, d0) { \
	(uint8_t)(((uint32_t)d7) >> 24), \
	(uint8_t)(((uint32_t)d7) >> 16), \
	(uint8_t)(((uint32_t)d7) >> 8), \
	(uint8_t)(((uint32_t)d7) >> 0), \
	(uint8_t)(((uint32_t)d6) >> 24), \
	(uint8_t)(((uint32_t)d6) >> 16), \
	(uint8_t)(((uint32_t)d6) >> 8), \
	(uint8_t)(((uint32_t)d6) >> 0), \
	(uint8_t)(((uint32_t)d5) >> 24), \
	(uint8_t)(((uint32_t)d5) >> 16), \
	(uint8_t)(((uint32_t)d5) >> 8), \
	(uint8_t)(((uint32_t)d5) >> 0), \
	(uint8_t)(((uint32_t)d4) >> 24), \
	(uint8_t)(((uint32_t)d4) >> 16), \
	(uint8_t)(((uint32_t)d4) >> 8), \
	(uint8_t)(((uint32_t)d4) >> 0), \
	(uint8_t)(((uint32_t)d3) >> 24), \
	(uint8_t)(((uint32_t)d3) >> 16), \
	(uint8_t)(((uint32_t)d3) >> 8), \
	(uint8_t)(((uint32_t)d3) >> 0), \
	(uint8_t)(((uint32_t)d2) >> 24), \
	(uint8_t)(((uint32_t)d2) >> 16), \
	(uint8_t)(((uint32_t)d2) >> 8), \
	(uint8_t)(((uint32_t)d2) >> 0), \
	(uint8_t)(((uint32_t)d1) >> 24), \
	(uint8_t)(((uint32_t)d1) >> 16), \
	(uint8_t)(((uint32_t)d1) >> 8), \
	(uint8_t)(((uint32_t)d1) >> 0), \
	(uint8_t)(((uint32_t)d0)  >> 24), \
	(uint8_t)(((uint32_t)d0)  >> 16), \
	(uint8_t)(((uint32_t)d0)  >> 8), \
	(uint8_t)(((uint32_t)d0)  >> 0) \
}

// Secp256k1 field element constant
#define SECP256K1_FE_CONST(d7, d6, d5, d4, d3, d2, d1, d0) {SECP256K1_FE_CONST_INNER((d7), (d6), (d5), (d4), (d3), (d2), (d1), (d0))}


// Structures

// Secp256k1 field element
typedef struct {

	// Data
	uint8_t data[FIELD_ELEMENT_DATA_SIZE];
	
} secp256k1_fe;

// Secp256k1 field element storage
typedef secp256k1_fe secp256k1_fe_storage;


#endif
