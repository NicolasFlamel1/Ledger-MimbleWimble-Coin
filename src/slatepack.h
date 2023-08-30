// Header guard
#ifndef SLATEPACK_H
#define SLATEPACK_H


// Header files
#include <stdint.h>


// Definitions

// Slatepack shared private key size
#define SLATEPACK_SHARED_PRIVATE_KEY_SIZE 32


// Function prototypes

// Create Slatepack shared private key
void createSlatepackSharedPrivateKey(volatile uint8_t *sharedPrivateKey, const uint32_t account, const uint32_t index, const char *address, const size_t addressLength);


#endif
