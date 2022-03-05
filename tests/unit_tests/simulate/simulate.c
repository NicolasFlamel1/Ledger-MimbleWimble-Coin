// Header files
#include <exceptions.h>
#include <openssl/sha.h>
#include <os_task.h>
#include <libcxng.h>
#include <stdlib.h>
#include "currency_information.h"


// Global variables

// Currency information
struct CurrencyInformation currencyInformation = {

	// MQS version
	.mqsVersion = {1, 69},
	
	// Slatepack human-readable part
	.slatepackAddressHumanReadablePart = "grin"
};


// Supporting function implementation

// CX hash SHA-256
size_t cx_hash_sha256(const uint8_t *in, size_t len, uint8_t *out, size_t out_len) {

	// Initialize SHA-256
	SHA256_CTX sha256;
	SHA256_Init(&sha256);
	
	// Include input in SHA-256
	SHA256_Update(&sha256, in, len);
	
	// Set output to the SHA-256
	SHA256_Final(out, &sha256);
	
	// Return success
	return EXIT_SUCCESS;
}

// OS schedule exit
void os_sched_exit(bolos_task_status_t exit_code) {

}

// Clear menu buffers
void clearMenuBuffers(void) {

}

// OS long jump
void os_longjmp(unsigned int exception) {

}

// Try context set
try_context_t *try_context_set(try_context_t *context) {

}

// Try context get
try_context_t *try_context_get(void) {

}

// Get public key from private key
void getPublicKeyFromPrivateKey(volatile uint8_t *publicKey, const cx_ecfp_private_key_t *privateKey) {

}

// Get address private key
void getAddressPrivateKey(volatile cx_ecfp_private_key_t *addressPrivateKey, uint32_t account, uint32_t index, cx_curve_t curve) {

}

// Get currency information
void getCurrencyInformation(struct CurrencyInformation *currencyInformation) {

}

// Uncompress secp256k1 public key
void uncompressSecp256k1PublicKey(uint8_t *publicKey) {

}

// Is valid secp256k1 public key
bool isValidSecp256k1PublicKey(const uint8_t *publicKey, size_t length) {

}

bool cx_math_is_zero(const uint8_t *a, size_t len) {

}

cx_err_t cx_ecfp_scalar_mult_no_throw(cx_curve_t curve, uint8_t *P, const uint8_t *k, size_t k_len) {

}

cx_err_t cx_ecdomain_parameters_length(cx_curve_t cv, size_t *length) {

}

cx_err_t cx_ecfp_init_public_key_no_throw(cx_curve_t curve, const uint8_t *rawkey, size_t key_len, cx_ecfp_public_key_t *key) {

}

void cx_pbkdf2_sha512(const unsigned char * password, unsigned short passwordlen, unsigned char * salt, unsigned short saltlen, unsigned int iterations, unsigned char * out, unsigned int outLength) {

}

cx_err_t cx_edwards_compress_point_no_throw(cx_curve_t curve, uint8_t *p, size_t p_len) {

}

// Get Ed25519 public key
void getEd25519PublicKey(uint8_t *ed25519PublicKey, uint32_t account, uint32_t index) {

}

// Is valid Ed25519 public key
bool isValidEd25519PublicKey(const uint8_t *publicKey, size_t length) {

}

// Get X25519 public key from Ed25519 public key
void getX25519PublicKeyFromEd25519PublicKey(uint8_t *x25519PublicKey, const uint8_t *ed25519PublicKey) {

}

// Get X25519 private key from Ed25519 private key
void getX25519PrivateKeyFromEd25519PrivateKey(volatile cx_ecfp_private_key_t *x25519PrivateKey, const cx_ecfp_private_key_t *ed25519PrivateKey) {

}

cx_err_t cx_edwards_decompress_point_no_throw(cx_curve_t curve, uint8_t *p, size_t p_len) {

}

int cx_ecdh(const cx_ecfp_private_key_t * pvkey, int mode, const unsigned char * P, unsigned int P_len, unsigned char * secret, unsigned int secret_len) {

}

cx_err_t cx_sha3_init_no_throw(cx_sha3_t *hash, size_t size) {

}

size_t cx_hash_get_size(const cx_hash_t *ctx) {

}

cx_err_t cx_hash_no_throw(cx_hash_t *hash, uint32_t mode, const uint8_t *in, size_t len, uint8_t *out, size_t out_len) {

}
