// Header guard
#ifndef GENERATORS_H
#define GENERATORS_H


// Header files
#include <stdint.h>


// Definitions

// Generator size
#define GENERATOR_SIZE 64

// Number of generators
#define NUMBER_OF_GENERATORS 128


// Constants

// Generators first half
extern const uint8_t GENERATORS_FIRST_HALF[NUMBER_OF_GENERATORS / 2][GENERATOR_SIZE];

// Generators second half
extern const uint8_t GENERATORS_SECOND_HALF[NUMBER_OF_GENERATORS / 2][GENERATOR_SIZE];


#endif
