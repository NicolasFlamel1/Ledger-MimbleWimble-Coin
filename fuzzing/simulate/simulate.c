// Header files
#include <sys/time.h>
#include <openssl/evp.h>
#include <libcxng.h>
#include <os_io.h>
#include <os_task.h>


// Global variables

// IO APDU buffer
unsigned char G_io_apdu_buffer[IO_APDU_BUFFER_SIZE];


// Supporting function implementation

// CX hash SHA-256
size_t cx_hash_sha256(const uint8_t *in, size_t len, uint8_t *out, size_t out_len) {

	// Create context
	EVP_MD_CTX *context = EVP_MD_CTX_new();
	
	// Initialize context to perform SHA-256
	EVP_DigestInit_ex(context, EVP_sha256(), NULL);
	
	// Include in to the hash
	EVP_DigestUpdate(context, in, len);
	
	// Set out to the result
	EVP_DigestFinal_ex(context, out, NULL);
	
	// Free context
	EVP_MD_CTX_free(context);
	
	// Return hash size
	return CX_SHA256_SIZE;
}

// CX SHA3 init no throw
cx_err_t cx_sha3_init_no_throw(cx_sha3_t *hash, size_t size) {

	// Return ok
	return CX_OK;
}

// CX hash no throw
cx_err_t cx_hash_no_throw(cx_hash_t *hash, uint32_t mode, const uint8_t *in, size_t len, uint8_t *out, size_t out_len) {

	// Create context
	EVP_MD_CTX *context = EVP_MD_CTX_new();
	
	// Initialize context to perform SHA3-256
	EVP_DigestInit_ex(context, EVP_sha3_256(), NULL);
	
	// Include in to the hash
	EVP_DigestUpdate(context, in, len);
	
	// Set out to the result
	EVP_DigestFinal_ex(context, out, NULL);
	
	// Free context
	EVP_MD_CTX_free(context);
	
	// Return ok
	return CX_OK;
}

// PIC
void *pic(void *linked_address) {

	// Return linked address
	return linked_address;
}

// Create single-signer nonces
void createSingleSignerNonces(uint8_t *secretNonce, uint8_t *publicNonce) {

}

// Is valid secp256k1 public key
bool isValidSecp256k1PublicKey(const uint8_t *publicKey, const size_t length) {

	// Return false
	return false;
}

// Is valid Ed25519 public key
bool isValidEd25519PublicKey(const uint8_t *publicKey, const size_t length) {

	// Return false
	return false;
}

// CX ECFP scalar mult no throw
cx_err_t cx_ecfp_scalar_mult_no_throw(cx_curve_t curve, uint8_t *P, const uint8_t *k, size_t k_len) {

	// Return not ok
	return !CX_OK;
}

// CX ECFP init public key no throw
cx_err_t cx_ecfp_init_public_key_no_throw(cx_curve_t curve, const uint8_t *rawkey, size_t key_len, cx_ecfp_public_key_t *key) {

	// Return not ok
	return !CX_OK;
}

// CX Edwards decompress point no throw
cx_err_t cx_edwards_decompress_point_no_throw(cx_curve_t curve, uint8_t *p, size_t p_len) {

	// Return not ok
	return !CX_OK;
}

// CX PBKDF2 no throw
cx_err_t cx_pbkdf2_no_throw(cx_md_t md_type, const uint8_t *password, size_t passwordlen, uint8_t *salt, size_t saltlen, uint32_t iterations, uint8_t *out, size_t outLength) {

	// Return not ok
	return !CX_OK;
}

// OS long jump
void os_longjmp(unsigned int exception) {

	// Exit abnormally
	__builtin_trap();
}

// OS schedule exit
void os_sched_exit(bolos_task_status_t exit_code) {

	// Exit abnormally
	__builtin_trap();
}

// NVM write
void nvm_write(void *dst_adr PLENGTH(src_len), void *src_adr PLENGTH(src_len), unsigned int src_len) {

	// Exit abnormally
	__builtin_trap();
}

// Clear menu buffers
void clearMenuBuffers(void) {

	// Exit abnormally
	__builtin_trap();
}

// Get public key from private key
void getPublicKeyFromPrivateKey(volatile uint8_t *publicKey, const cx_ecfp_private_key_t *privateKey) {

	// Exit abnormally
	__builtin_trap();
}

// Get address private key
void getAddressPrivateKey(volatile cx_ecfp_private_key_t *addressPrivateKey, const uint32_t account, const uint32_t index, const cx_curve_t curve) {

	// Exit abnormally
	__builtin_trap();
}

// Uncompress secp256k1 public key
void uncompressSecp256k1PublicKey(uint8_t *publicKey) {

	// Exit abnormally
	__builtin_trap();
}

// Get Ed25519 public key
void getEd25519PublicKey(uint8_t *ed25519PublicKey, const uint32_t account, const uint32_t index) {

	// Exit abnormally
	__builtin_trap();
}

// Encrypt data
void encryptData(volatile uint8_t *result, const uint8_t *data, const size_t dataLength, const uint8_t *key, const size_t keyLength) {

	// Exit abnormally
	__builtin_trap();
}

// Decrypt data
size_t decryptData(volatile uint8_t *result, const uint8_t *data, const size_t dataLength, const uint8_t *key, const size_t keyLength) {

	// Exit abnormally
	__builtin_trap();
}
