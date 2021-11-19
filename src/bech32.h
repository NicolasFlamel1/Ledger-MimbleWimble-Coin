// Header guard
#ifndef BECH32_H
#define BECH32_H


// Header files
#include <stdint.h>


// Function prototypes

// Get Bech32 encoded length
size_t getBech32EncodedLength(size_t length, const char *humanReadablePart);

// Bech32 encode
void bech32Encode(uint8_t *result, const uint8_t *data, size_t length, const char *humanReadablePart);


#endif
