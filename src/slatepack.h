// Header guard
#ifndef SLATEPACK_H
#define SLATEPACK_H


// Header files
#include <os.h>
#include <stdint.h>
#include "currency.h"


// Definitions

// Slatepack address size
#define SLATEPACK_ADDRESS_SIZE (59 + sizeof(CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART) - sizeof((char)'\0'))

// Slatepack shared private key size
#define SLATEPACK_SHARED_PRIVATE_KEY_SIZE 32


// Function prototypes

// Create Slatepack shared private key
void createSlatepackSharedPrivateKey(volatile uint8_t *sharedPrivateKey, const uint32_t account, const uint32_t index, const char *address, const size_t addressLength);

// Get public key from Slatepack address
bool getPublicKeyFromSlatepackAddress(cx_ecfp_public_key_t *publicKey, const char *slatepackAddress, const size_t length);

// Get Slatepack address from public key
void getSlatepackAddressFromPublicKey(char *slatepackAddress, const uint8_t *publicKey);

// Get Slatepack address
void getSlatepackAddress(char *slatepackAddress, const uint32_t account, const uint32_t index);


#endif
