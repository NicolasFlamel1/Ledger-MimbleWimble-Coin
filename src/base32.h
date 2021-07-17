// Header guard
#ifndef BASE32_H
#define BASE32_H


// Header files
#include <stddef.h>
#include <stdint.h>


// Constants

// Invalid base32 length
extern const size_t INVALID_BASE32_LENGTH;


// Function prototypes

// Get base32 encoded length
size_t getBase32EncodedLength(size_t length);

// Base32 encode
void base32Encode(uint8_t *result, const uint8_t *data, size_t length);

// Get base32 decoded length
size_t getBase32DecodedLength(const uint8_t *data, size_t length);

// Base32 decode
void base32Decode(uint8_t *result, const uint8_t *data, size_t length);


#endif
