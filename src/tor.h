// Header guard
#ifndef TOR_H
#define TOR_H


// Header files
#include <os.h>
#include <stddef.h>
#include <stdint.h>


// Definitions

// Tor address size
#define TOR_ADDRESS_SIZE 56


// Constants

// Tor address private key index
extern const uint32_t TOR_ADDRESS_PRIVATE_KEY_INDEX;


// Function prototypes

// Get public key from Tor address
bool getPublicKeyFromTorAddress(cx_ecfp_public_key_t *publicKey, const uint8_t *torAddress, size_t length);

// Get Tor address from public key
void getTorAddressFromPublicKey(uint8_t *torAddress, const uint8_t *publicKey);

// Get Tor address
void getTorAddress(uint8_t *torAddress, uint32_t account);


#endif
