// Header guard
#ifndef GENERATORS_H
#define GENERATORS_H


// Header files
#include <stdint.h>


// Definitions

// Generator size
#define GENERATOR_SIZE 64

// Bits to prove
#define BITS_TO_PROVE (sizeof(uint64_t) * BITS_IN_A_BYTE)


// Constants

// Generators first half
extern const uint8_t GENERATORS_FIRST_HALF[BITS_TO_PROVE][GENERATOR_SIZE];

// Generators second half
extern const uint8_t GENERATORS_SECOND_HALF[BITS_TO_PROVE][GENERATOR_SIZE];


#endif
