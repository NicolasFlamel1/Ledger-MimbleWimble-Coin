// Header guard
#ifndef BLAKE2B_H
#define BLAKE2B_H


// Header files
#include <stddef.h>
#include <stdint.h>


// Function prototypes

// Get BLAKE2b
void getBlake2b(volatile uint8_t *output, const size_t outputLength, const uint8_t *input, const size_t inputLength, const uint8_t *key, const size_t keyLength);


#endif
