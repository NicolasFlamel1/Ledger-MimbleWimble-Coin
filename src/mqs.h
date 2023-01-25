// Header guard
#ifndef MQS_H
#define MQS_H


// Header files
#include "common.h"


// Definitions

// MQS address size
#define MQS_ADDRESS_SIZE 52

// MQS shared private key salt size
#define MQS_SHARED_PRIVATE_KEY_SALT_SIZE 8

// MQS shared private key size
#define MQS_SHARED_PRIVATE_KEY_SIZE 32


// Function prototypes

// Create MQS shared private key
void createMqsSharedPrivateKey(volatile uint8_t *sharedPrivateKey, const uint32_t account, const uint32_t index, const char *address, const uint8_t *salt);

// Get public key from MQS address
bool getPublicKeyFromMqsAddress(cx_ecfp_public_key_t *publicKey, const char *mqsAddress, const size_t length);

// Get MQS address from public key
void getMqsAddressFromPublicKey(char *mqsAddress, const uint8_t *publicKey);

// Get MQS address
void getMqsAddress(char *mqsAddress, const uint32_t account, const uint32_t index);


#endif
