// Header guard
#ifndef BECH32_H
#define BECH32_H


// Header files
#include <stdint.h>


// Definitions

// Invalid Bech32 size
#define INVALID_BECH32_SIZE SIZE_MAX


// Function prototypes

// Get Bech32 encoded length
size_t getBech32EncodedLength(size_t length, const char *humanReadablePart);

// Bech32 encode
void bech32Encode(char *result, const uint8_t *data, size_t length, const char *humanReadablePart);

// Get Bech32 decoded length
size_t getBech32DecodedLength(const char *data, size_t length);

// Bech32 decode
void bech32Decode(uint8_t *result, const char *data, size_t length);


#endif
