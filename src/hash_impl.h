// Header guard
#ifndef HASH_IMPL_H
#define HASH_IMPL_H


// Header files
#include "hash.h"


// Supporting function implementation

// Secp256k1 SHA256 initialize
static void secp256k1_sha256_initialize(secp256k1_sha256 *hash) {

	// Initialize the hash
	cx_sha256_init(hash);
}

// Secp256k1 SHA256 write
static void secp256k1_sha256_write(secp256k1_sha256 *hash, const unsigned char *data, size_t length) {

	// Include data in the hash
	cx_hash((cx_hash_t *)hash, 0, data, length, NULL, 0);
}

// Secp256k1 SHA256 finalize
static void secp256k1_sha256_finalize(secp256k1_sha256 *hash, unsigned char *out) {

	// Get the resulting hash
	cx_hash((cx_hash_t *)hash, CX_LAST, NULL, 0, out, CX_SHA256_SIZE);
}

// Secp256k1 HMAC SHA256 initialize
static void secp256k1_hmac_sha256_initialize(secp256k1_hmac_sha256 *hash, const unsigned char *key, size_t length) {

	// Initialize the hash
	cx_hmac_sha256_init(hash, key, length);
}

// Secp256k1 HMAC SHA256 write
static void secp256k1_hmac_sha256_write(secp256k1_hmac_sha256 *hash, const unsigned char *data, size_t length) {

	// Include data in the hash
	cx_hmac((cx_hmac_t *)hash, 0, data, length, NULL, 0);
}

// Secp256k1 HMAC SHA256 finalize
static void secp256k1_hmac_sha256_finalize(secp256k1_hmac_sha256 *hash, unsigned char *out) {

	// Get the resulting hash
	cx_hmac((cx_hmac_t *)hash, CX_LAST | CX_NO_REINIT, NULL, 0, out, CX_SHA256_SIZE);
}

// Secp256k1 RFC6979 HMAC SHA256 initialize
static void secp256k1_rfc6979_hmac_sha256_initialize(secp256k1_rfc6979_hmac_sha256 *state, const unsigned char *key, size_t length) {

	// Based on code from libsecp256k1-zkp (https://github.com/mimblewimble/secp256k1-zkp/blob/master/src/hash_impl.h)
	
	// Initialize state
	explicit_bzero(state, sizeof(*state));
	memset(state->v, 0x01, sizeof(state->v));
	
	secp256k1_hmac_sha256 hmac;
	secp256k1_hmac_sha256_initialize(&hmac, state->k, sizeof(state->k));
	secp256k1_hmac_sha256_write(&hmac, state->v, sizeof(state->v));
	secp256k1_hmac_sha256_write(&hmac, (uint8_t []){0}, 1);
	secp256k1_hmac_sha256_write(&hmac, key, length);
	secp256k1_hmac_sha256_finalize(&hmac, state->k);
	secp256k1_hmac_sha256_initialize(&hmac, state->k, sizeof(state->k));
	secp256k1_hmac_sha256_write(&hmac, state->v, sizeof(state->v));
	secp256k1_hmac_sha256_finalize(&hmac, state->v);
	
	secp256k1_hmac_sha256_initialize(&hmac, state->k, sizeof(state->k));
	secp256k1_hmac_sha256_write(&hmac, state->v, sizeof(state->v));
	secp256k1_hmac_sha256_write(&hmac, (uint8_t []){1}, 1);
	secp256k1_hmac_sha256_write(&hmac, key, length);
	secp256k1_hmac_sha256_finalize(&hmac, state->k);
	secp256k1_hmac_sha256_initialize(&hmac, state->k, sizeof(state->k));
	secp256k1_hmac_sha256_write(&hmac, state->v, sizeof(state->v));
	secp256k1_hmac_sha256_finalize(&hmac, state->v);
}

// Secp256k1 RFC6979 HMAC SHA256 generate
static void secp256k1_rfc6979_hmac_sha256_generate(secp256k1_rfc6979_hmac_sha256 *state, unsigned char *out, size_t length) {

	// Based on code from libsecp256k1-zkp (https://github.com/mimblewimble/secp256k1-zkp/blob/master/src/hash_impl.h)

	// Check if retry
	if(state->retry) {
	
		// Update state
		secp256k1_hmac_sha256 hmac;
		secp256k1_hmac_sha256_initialize(&hmac, state->k, sizeof(state->k));
		secp256k1_hmac_sha256_write(&hmac, state->v, sizeof(state->v));
		secp256k1_hmac_sha256_write(&hmac, (uint8_t []){0}, 1);
		secp256k1_hmac_sha256_finalize(&hmac, state->k);
		secp256k1_hmac_sha256_initialize(&hmac, state->k, sizeof(state->k));
		secp256k1_hmac_sha256_write(&hmac, state->v, sizeof(state->v));
		secp256k1_hmac_sha256_finalize(&hmac, state->v);
	}
	
	// Loop while output is requested
	while(length) {
	
		// Update state
		secp256k1_hmac_sha256 hmac;
		secp256k1_hmac_sha256_initialize(&hmac, state->k, sizeof(state->k));
		secp256k1_hmac_sha256_write(&hmac, state->v, sizeof(state->v));
		secp256k1_hmac_sha256_finalize(&hmac, state->v);
		
		// Get part length
		const size_t partLength = MIN(length, sizeof(state->v));
		
		// Copy state to output
		memcpy(out, state->v, partLength);
		
		// Update remaining length
		out += partLength;
		length -= partLength;
	}
	
	// Set retry
	state->retry = true;
}

// Secp256k1 RFC6979 HMAC SHA256 finalize
static void secp256k1_rfc6979_hmac_sha256_finalize(secp256k1_rfc6979_hmac_sha256 *state) {

	// Clear state
	explicit_bzero(state, sizeof(*state));
}


#endif
