// Header guard
#ifndef SLATEPACK_H
#define SLATEPACK_H


// Header files
#include <os.h>
#include <stdint.h>


// Definitions

// Slatepack address without human-readable part size 
#define SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE 59


// Constants

// Slatepack shared private key size
extern const size_t SLATEPACK_SHARED_PRIVATE_KEY_SIZE;


// Function prototypes

// Create Slatepack shared private key
void createSlatepackSharedPrivateKey(volatile uint8_t *sharedPrivateKey, uint32_t account, uint32_t index, const char *address, size_t addressLength);

// Get public key from Slatepack address
bool getPublicKeyFromSlatepackAddress(cx_ecfp_public_key_t *publicKey, const char *slatepackAddress, size_t length);

// Get Slatepack address from public key
void getSlatepackAddressFromPublicKey(char *slatepackAddress, const uint8_t *publicKey);

// Get Slatepack address
void getSlatepackAddress(char *slatepackAddress, uint32_t account, uint32_t index);


#endif
