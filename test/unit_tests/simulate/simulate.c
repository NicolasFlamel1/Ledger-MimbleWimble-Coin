// Header files
#include <sys/time.h>
#include <openssl/evp.h>
#include <libcxng.h>
#include <cmocka.h>
#include "currency_information.h"


// Global variables

// Currency information
struct CurrencyInformation CURRENCY_INFORMATION = {

	// MQS version
	.mqsVersion = {1, 69},
	
	// Slatepack human-readable part
	.slatepackAddressHumanReadablePart = "grin"
};

struct CurrencyInformation *currencyInformation = &CURRENCY_INFORMATION;


// Supporting function implementation

// OS long jump
void os_longjmp(unsigned int exception) {

}

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
}

// CX SHA3 init no throw
cx_err_t cx_sha3_init_no_throw(cx_sha3_t *hash, size_t size) {

}

// CX hash get size
size_t cx_hash_get_size(const cx_hash_t *ctx) {

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
}

// CX math mult no throw
cx_err_t cx_math_multm_no_throw(uint8_t *r, const uint8_t *a, const uint8_t *b, const uint8_t *m, size_t len) {

	// Convert arguments to big numbers
	BIGNUM *first = BN_bin2bn(a, len, NULL);
	BIGNUM *second = BN_bin2bn(b, len, NULL);
	BIGNUM *modulo = BN_bin2bn(m, len, NULL);
	
	// Multiply and modulo the arguments and store the result
	BIGNUM *result = BN_new();
	BN_CTX *context = BN_CTX_new();
	BN_mod_mul(result, first, second, modulo, context);
	BN_bn2binpad(result, r, len);
	
	// Free memory
	BN_free(first);
	BN_free(second);
	BN_free(modulo);
	BN_free(result);
	BN_CTX_free(context);
}

// CX math add no throw
cx_err_t cx_math_add_no_throw(uint8_t *r, const uint8_t *a, const uint8_t *b, size_t len) {

	// Convert arguments to big numbers
	BIGNUM *first = BN_bin2bn(a, len, NULL);
	BIGNUM *second = BN_bin2bn(b, len, NULL);
	
	// Add arguments and store the result
	BIGNUM *result = BN_new();
	BN_add(result, first, second);
	BN_bn2binpad(result, r, len);
	
	// Free memory
	BN_free(first);
	BN_free(second);
	BN_free(result);
}

// OS schedule exit
void os_sched_exit(bolos_task_status_t exit_code) {

	// Fail test
	assert_true(false);
}

// Try context set
try_context_t *try_context_set(try_context_t *context) {

	// Fail test
	assert_true(false);
}

// Try context get
try_context_t *try_context_get(void) {

	// Fail test
	assert_true(false);
}

// CX ECFP scalar mult no throw
cx_err_t cx_ecfp_scalar_mult_no_throw(cx_curve_t curve, uint8_t *P, const uint8_t *k, size_t k_len) {

	// Fail test
	assert_true(false);
}

// CX EC domain paremeters length
cx_err_t cx_ecdomain_parameters_length(cx_curve_t cv, size_t *length) {

	// Fail test
	assert_true(false);
}

// CX ECFP init public key no throw
cx_err_t cx_ecfp_init_public_key_no_throw(cx_curve_t curve, const uint8_t *rawkey, size_t key_len, cx_ecfp_public_key_t *key) {

	// Fail test
	assert_true(false);
}

// CX Edwards compress point no throw
cx_err_t cx_edwards_compress_point_no_throw(cx_curve_t curve, uint8_t *p, size_t p_len) {

	// Fail test
	assert_true(false);
}

// CX Edwards decompress point no throw
cx_err_t cx_edwards_decompress_point_no_throw(cx_curve_t curve, uint8_t *p, size_t p_len) {

	// Fail test
	assert_true(false);
}

// CX ECDH no throw
cx_err_t cx_ecdh_no_throw(const cx_ecfp_private_key_t *pvkey, uint32_t mode, const uint8_t * P, size_t P_len, uint8_t *secret, size_t secret_len) {

	// Fail test
	assert_true(false);
}

// CX PBKDF2 no throw
cx_err_t cx_pbkdf2_no_throw(cx_md_t md_type, const uint8_t *password, size_t passwordlen, uint8_t *salt, size_t saltlen, uint32_t iterations, uint8_t *out, size_t outLength) {

	// Fail test
	assert_true(false);
}

// ECDSA sign
int cx_ecdsa_sign(const cx_ecfp_private_key_t *pvkey, int mode, cx_md_t hashID, const unsigned char *hash, unsigned int hash_len, unsigned char *sig, unsigned int sig_len, unsigned int *info) {

	// Fail test
	assert_true(false);
}

// ECDSA verify
bool cx_ecdsa_verify(const cx_ecfp_public_key_t *pukey, int mode, cx_md_t hashID, const unsigned char *hash, unsigned int hash_len, const unsigned char *sig, unsigned int sig_len) {

	// Fail test
	assert_true(false);
}

// NVM write
void nvm_write(void *dst_adr PLENGTH(src_len), void *src_adr PLENGTH(src_len), unsigned int src_len) {

	// Fail test
	assert_true(false);
}

// PIC
void *pic(void *linked_address) {

	// Fail test
	assert_true(false);
}

// Init private key no throw
cx_err_t cx_ecfp_init_private_key_no_throw(cx_curve_t curve, const uint8_t *rawkey, size_t key_len, cx_ecfp_private_key_t *pvkey) {

	// Fail test
	assert_true(false);
}

// Generate pair no throw
cx_err_t cx_ecfp_generate_pair_no_throw(cx_curve_t curve, cx_ecfp_public_key_t *pubkey, cx_ecfp_private_key_t *privkey, bool keepprivate) {

	// Fail test
	assert_true(false);
}

// Clear menu buffers
void clearMenuBuffers(void) {

	// Fail test
	assert_true(false);
}

// Get public key from private key
void getPublicKeyFromPrivateKey(volatile uint8_t *publicKey, const cx_ecfp_private_key_t *privateKey) {

	// Fail test
	assert_true(false);
}

// Get address private key
void getAddressPrivateKey(volatile cx_ecfp_private_key_t *addressPrivateKey, const uint32_t account, const uint32_t index, const cx_curve_t curve) {

	// Fail test
	assert_true(false);
}

// Uncompress secp256k1 public key
void uncompressSecp256k1PublicKey(uint8_t *publicKey) {

	// Fail test
	assert_true(false);
}

// Is valid secp256k1 public key
bool isValidSecp256k1PublicKey(const uint8_t *publicKey, const size_t length) {

	// Fail test
	assert_true(false);
}

// Get Ed25519 public key
void getEd25519PublicKey(uint8_t *ed25519PublicKey, const uint32_t account, const uint32_t index) {

	// Fail test
	assert_true(false);
}

// Is valid Ed25519 public key
bool isValidEd25519PublicKey(const uint8_t *publicKey, const size_t length) {

	// Fail test
	assert_true(false);
}

// Get X25519 public key from Ed25519 public key
void getX25519PublicKeyFromEd25519PublicKey(uint8_t *x25519PublicKey, const uint8_t *ed25519PublicKey) {

	// Fail test
	assert_true(false);
}

// Get X25519 private key from Ed25519 private key
void getX25519PrivateKeyFromEd25519PrivateKey(volatile cx_ecfp_private_key_t *x25519PrivateKey, const cx_ecfp_private_key_t *ed25519PrivateKey) {

	// Fail test
	assert_true(false);
}

// Get encrypted data length
size_t getEncryptedDataLength(const size_t dataLength) {

	// Fail test
	assert_true(false);
}

// Encrypt data
void encryptData(volatile uint8_t *result, const uint8_t *data, const size_t dataLength, const uint8_t *key, const size_t keyLength) {

	// Fail test
	assert_true(false);
}

// Decrypt data
size_t decryptData(volatile uint8_t *result, const uint8_t *data, const size_t dataLength, const uint8_t *key, const size_t keyLength) {

	// Fail test
	assert_true(false);
}

// Create single-signer nonces
void createSingleSignerNonces(uint8_t *secretNonce, uint8_t *publicNonce) {

	// Fail test
	assert_true(false);
}
