// Header guard
#ifndef HASH_H
#define HASH_H


// Header files
#include <stdbool.h>
#include "device.h"


// Definitions

// RFC6979 V size
#define RFC6979_V_SIZE 32

// RFC6979 K size
#define RFC6979_K_SIZE 32

// Secp256k1 SHA256
typedef cx_sha256_t secp256k1_sha256;

// Secp256k1 HMAC SHA256
typedef cx_hmac_sha256_t secp256k1_hmac_sha256;


// Structures

// Secp256k1 RFC6979 HMAC SHA256
typedef struct {

	// V
	uint8_t v[RFC6979_V_SIZE];
	
	// K
	uint8_t k[RFC6979_K_SIZE];
	
	// Retry
	bool retry;
	
} secp256k1_rfc6979_hmac_sha256;


// Function prototypes

// Secp256k1 SHA256 initialize
static void secp256k1_sha256_initialize(secp256k1_sha256 *hash);

// Secp256k1 SHA256 write
static void secp256k1_sha256_write(secp256k1_sha256 *hash, const unsigned char *data, size_t length);

// Secp256k1 SHA256 finalize
static void secp256k1_sha256_finalize(secp256k1_sha256 *hash, unsigned char *out);

// Secp256k1 HMAC SHA256 initialize
static void secp256k1_hmac_sha256_initialize(secp256k1_hmac_sha256 *hash, const unsigned char *key, size_t length);

// Secp256k1 HMAC SHA256 write
static void secp256k1_hmac_sha256_write(secp256k1_hmac_sha256 *hash, const unsigned char *data, size_t length);

// Secp256k1 HMAC SHA256 finalize
static void secp256k1_hmac_sha256_finalize(secp256k1_hmac_sha256 *hash, unsigned char *out);

// Secp256k1 RFC6979 HMAC SHA256 initialize
static void secp256k1_rfc6979_hmac_sha256_initialize(secp256k1_rfc6979_hmac_sha256 *state, const unsigned char *key, size_t length);

// Secp256k1 RFC6979 HMAC SHA256 generate
static void secp256k1_rfc6979_hmac_sha256_generate(secp256k1_rfc6979_hmac_sha256 *state, unsigned char *out, size_t length);

// Secp256k1 RFC6979 HMAC SHA256 finalize
static void secp256k1_rfc6979_hmac_sha256_finalize(secp256k1_rfc6979_hmac_sha256 *state);


#endif
