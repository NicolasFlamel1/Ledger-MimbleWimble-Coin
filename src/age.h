// Header guard
#ifndef AGE_H
#define AGE_H


// Header files
#include "chacha20_poly1305.h"


// Definitions

// Age payload key size
#define AGE_PAYLOAD_KEY_SIZE 32

// Age file key size
#define AGE_FILE_KEY_SIZE 16

// Age encrypted file key size
#define AGE_ENCRYPTED_FILE_KEY_SIZE (AGE_FILE_KEY_SIZE + POLY1305_TAG_SIZE)

// Age payload nonce size
#define AGE_PAYLOAD_NONCE_SIZE 16


// Function prototypes

// Get age payload key
void getAgePayloadKey(volatile uint8_t *payloadKey, const uint32_t account, const uint32_t index, const uint8_t *ephemeralX25519PublicKey, const uint8_t *encryptedFileKey, const uint8_t *payloadNonce);


#endif
