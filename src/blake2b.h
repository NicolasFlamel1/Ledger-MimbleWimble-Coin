// Header guard
#ifndef BLAKE2B_H
#define BLAKE2B_H


// Header files
#include <stdint.h>


// Function prototypes

// Get BLAKE2b
void getBlake2b(uint8_t *output, size_t outputLength, const uint8_t *input, size_t inputLength, const uint8_t *key, size_t keyLength);


#endif
