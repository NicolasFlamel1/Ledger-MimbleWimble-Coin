// Header guard
#ifndef MQS_H
#define MQS_H


// Header files
#include <stdint.h>
#include "chacha20_poly1305.h"


// Definitions

// MQS data session key size
#define MQS_DATA_SESSION_KEY_SIZE 16

// MQS address length
#define MQS_ADDRESS_LENGTH 52


// Constants

// MQS address private key index
extern const uint32_t MQS_ADDRESS_PRIVATE_KEY_INDEX;

// MQS shared private key size
extern const size_t MQS_SHARED_PRIVATE_KEY_SIZE;

// MQS shared private key salt size
extern const size_t MQS_SHARED_PRIVATE_KEY_SALT_SIZE;

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
	
	// Chacha20 Poly1305 state
	struct ChaCha20Poly1305State chaCha20Poly1305State;
};


// Global variables

// MQS data
extern struct MqsData mqsData;


// Function prototypes

// Reset MQS data
void resetMqsData(void);

// Create MQS shared private key
void createMqsSharedPrivateKey(volatile uint8_t *sharedPrivateKey, uint8_t *publicKey, uint8_t *salt);


#endif
