// Header guard
#ifndef MQS_H
#define MQS_H


// Definitions

// MQS address size
#define MQS_ADDRESS_SIZE 52

// MQS shared private key salt size
#define MQS_SHARED_PRIVATE_KEY_SALT_SIZE 8


// Constants

// MQS shared private key size
extern const size_t MQS_SHARED_PRIVATE_KEY_SIZE;

// MQS shared private key number of iterations
extern const unsigned int MQS_SHARED_PRIVATE_KEY_NUMBER_OF_ITERATIONS;


// Function prototypes

// Create MQS shared private key
void createMqsSharedPrivateKey(volatile uint8_t *sharedPrivateKey, uint32_t account, uint32_t index, const char *address, uint8_t *salt);

// Get public key from MQS address
bool getPublicKeyFromMqsAddress(cx_ecfp_public_key_t *publicKey, const char *mqsAddress, size_t length);

// Get MQS address from public key
void getMqsAddressFromPublicKey(char *mqsAddress, const uint8_t *publicKey);

// Get Mqs address
void getMqsAddress(char *mqsAddress, uint32_t account, uint32_t index);


#endif
