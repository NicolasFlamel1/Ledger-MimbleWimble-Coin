// Header guard
#ifndef BASE58_H
#define BASE58_H


// Header files
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>


// Constants

// Invalid base58 size
extern const size_t INVALID_BASE58_SIZE;

// Base58 checksum size
extern const size_t BASE58_CHECKSUM_SIZE;


// Function prototypes

// Get base58 encoded length
size_t getBase58EncodedLength(const uint8_t *data, size_t length);

// Base58 encode
void base58Encode(char *result, const uint8_t *data, size_t length);

// Get base58 encoded length with checksum
size_t getBase58EncodedLengthWithChecksum(const uint8_t *data, size_t length);

// Base58 encode with checksum
void base58EncodeWithChecksum(char *result, uint8_t *data, size_t length);

// Get base58 decoded length
size_t getBase58DecodedLength(const char *data, size_t length);

// Base58 decode
void base58Decode(uint8_t *result, const char *data, size_t length);

// Get base58 decoded length with checksum
size_t getBase58DecodedLengthWithChecksum(const char *data, size_t length);

// Base58 decode with checksum
bool base58DecodeWithChecksum(uint8_t *result, const char *data, size_t length);


#endif
