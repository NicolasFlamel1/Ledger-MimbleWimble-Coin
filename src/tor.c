// Header files
#include "device.h"
#include "crypto.h"
#include "tor.h"


// Constants

// Tor address private key index
const uint32_t TOR_ADDRESS_PRIVATE_KEY_INDEX = 0;

// Ed25519 signature size
const size_t ED25519_SIGNATURE_SIZE = 64;


// Supporting function implementation

// Get Tor public key
void getTorPublicKey(cx_ecfp_public_key_t *publicKey, cx_ecfp_private_key_t *privateKey) {

	// Get public key from private key
	cx_ecfp_generate_pair(CX_CURVE_Ed25519, publicKey, privateKey, KEEP_PRIVATE_KEY);
	
	// Compress the public key
	cx_edwards_compress_point(CX_CURVE_Ed25519, publicKey->W, publicKey->W_len);
}
