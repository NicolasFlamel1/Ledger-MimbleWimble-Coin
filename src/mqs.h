// Header guard
#ifndef MQS_H
#define MQS_H


// Header files
#include <stdint.h>
#include "chacha20_poly1305.h"
#include "crypto.h"


// Definitions

// MQS data session key size
#define MQS_DATA_SESSION_KEY_SIZE 32

// MQS address size
#define MQS_ADDRESS_SIZE 52

// MQS shared private key salt size
#define MQS_SHARED_PRIVATE_KEY_SALT_SIZE 8


// Constants

// MQS address private key index
extern const uint32_t MQS_ADDRESS_PRIVATE_KEY_INDEX;

// MQS shared private key size
extern const size_t MQS_SHARED_PRIVATE_KEY_SIZE;

// MQS shared private key number of iterations
extern const unsigned int MQS_SHARED_PRIVATE_KEY_NUMBER_OF_ITERATIONS;

// MQS data state
enum MqsDataState {

	// Inactive MQS data state
	INACTIVE_MQS_DATA_STATE,
	
	// Ready MQS data state
	READY_MQS_DATA_STATE,
	
	// Active MQS data state
	ACTIVE_MQS_DATA_STATE,
	
	// Complete MQS data state
	COMPLETE_MQS_DATA_STATE
};


// Structures

// MQS data
struct MqsData {

	// Encrypting state
	enum MqsDataState encryptingState;
	
	// Decrypting state
	enum MqsDataState decryptingState;

	// Session key
	uint8_t sessionKey[MQS_DATA_SESSION_KEY_SIZE];
	
	// ChaCha20 Poly1305 state
	struct ChaCha20Poly1305State chaCha20Poly1305State;
};


// Global variables

// MQS data
extern struct MqsData mqsData;


// Function prototypes

// Reset MQS data
void resetMqsData(void);

// Create MQS shared private key
void createMqsSharedPrivateKey(volatile uint8_t *sharedPrivateKey, uint32_t account, const uint8_t *publicKey, uint8_t *salt);

// Get public key from MQS address
bool getPublicKeyFromMqsAddress(cx_ecfp_public_key_t *publicKey, const uint8_t *mqsAddress, size_t length);

// Get MQS address from public key
void getMqsAddressFromPublicKey(uint8_t *mqsAddress, const uint8_t *publicKey);

// Get Mqs address
void getMqsAddress(uint8_t *mqsAddress, uint32_t account);


#endif
