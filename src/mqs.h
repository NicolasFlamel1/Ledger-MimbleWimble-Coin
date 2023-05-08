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


// Constants

// MQS message part one
static const char MQS_MESSAGE_PART_ONE[] = {'{', '"', 'd', 'e', 's', 't', 'i', 'n', 'a', 't', 'i', 'o', 'n', '"', ':', '{', '"', 'p', 'u', 'b', 'l', 'i', 'c', '_', 'k', 'e', 'y', '"', ':', '"'};

// MQS message part two
static const char MQS_MESSAGE_PART_TWO[] = {'"', ',', '"', 'd', 'o', 'm', 'a', 'i', 'n', '"', ':', '"'};

// MQS message part three
static const char MQS_MESSAGE_PART_THREE[] = {'"', ',', '"', 'p', 'o', 'r', 't', '"', ':'};

// MQS message part four
static const char MQS_MESSAGE_PART_FOUR[] = {'}', ',', '"', 'n', 'o', 'n', 'c', 'e', '"', ':', '"'};

// MQS message part five
static const char MQS_MESSAGE_PART_FIVE[] = {'"', ',', '"', 's', 'a', 'l', 't', '"', ':', '"'};

// MQS message part six
static const char MQS_MESSAGE_PART_SIX[] = {'"', ',', '"', 'e', 'n', 'c', 'r', 'y', 'p', 't', 'e', 'd', '_', 'm', 'e', 's', 's', 'a', 'g', 'e', '"', ':', '"'};

// MQS message part seven
static const char MQS_MESSAGE_PART_SEVEN[] = {'"', '}'};

// MQS message no port
static const char MQS_MESSAGE_NO_PORT[] = {'n', 'u', 'l', 'l'};

// Default MQS challenge
static const char DEFAULT_MQS_CHALLENGE[] = "7WUDtkSaKyGRUnQ22rE3QUXChV8DmA6NnunDYP4vheTpc";


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
