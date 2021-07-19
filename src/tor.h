// Header guard
#ifndef TOR_H
#define TOR_H


// Header files
#include <os.h>
#include <stddef.h>
#include <stdint.h>


// Definitions

// Tor address length
#define TOR_ADDRESS_LENGTH 56

// Ed25519 public key size
#define ED25519_PUBLIC_KEY_SIZE 32


// Constants

// Tor address private key index
extern const uint32_t TOR_ADDRESS_PRIVATE_KEY_INDEX;

// Ed25519 signature size
extern const size_t ED25519_SIGNATURE_SIZE;


// Function prototypes

// Get Tor public key
void getTorPublicKey(cx_ecfp_public_key_t *publicKey, cx_ecfp_private_key_t *privateKey);

// Get public key from Tor address
bool getPublicKeyFromTorAddress(cx_ecfp_public_key_t *publicKey, const uint8_t *torAddress, size_t length);


#endif
