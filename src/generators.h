// Header guard
#ifndef GENERATORS_H
#define GENERATORS_H


// Header files
#include "stdint.h"


// Definitions

// Number of generators
#define NUMBER_OF_GENERATORS 256

// Generator size
#define GENERATOR_SIZE 64


// Constants

// Generators
extern const uint8_t GENERATORS[NUMBER_OF_GENERATORS][GENERATOR_SIZE];


#endif
