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


// Function prototypes

// Get public key from Tor address
bool getPublicKeyFromTorAddress(cx_ecfp_public_key_t *publicKey, const char *torAddress, size_t length);

// Get Tor address from public key
void getTorAddressFromPublicKey(char *torAddress, const uint8_t *publicKey);

// Get Tor address
void getTorAddress(char *torAddress, uint32_t account, uint32_t index);


#endif
