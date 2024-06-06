// This file is used by the unit tests and fuzzers to provide replacement functions for those accessed by syscalls to the hardware wallet's operating system

// Header files
#include <sys/time.h>
#include <openssl/ec.h>
#include <openssl/evp.h>
#include <openssl/kdf.h>
#include <openssl/hmac.h>
#include "common.h"
#include "crypto.h"

// Check if using OpenSSL 3 or newer
#if OPENSSL_VERSION_MAJOR >= 3

	// Header files
	#include <openssl/core_names.h>
#endif


// Global variables

// IO APDU buffer
unsigned char G_io_apdu_buffer[IO_APDU_BUFFER_SIZE];

// Try context
static try_context_t *tryContext = NULL;

// Digest context
static EVP_MD_CTX *digestContext = NULL;

//  EC points
static EC_POINT *ecPointOne = NULL;
static EC_POINT *ecPointTwo = NULL;


// Supporting function implementation

// PIC
void *pic(void *linked_address) {

	// Return linked address
	return linked_address;
}

// OS boot
void os_boot(void) {

	// Reset try context
	tryContext = NULL;
	
	// Check if digest context exists
	if(digestContext) {
	
		// Free digest context
		EVP_MD_CTX_free(digestContext);
		digestContext = NULL;
	}
	
	// Check if EC point one exists
	if(ecPointOne) {
	
		// Free EC point one
		EC_POINT_free(ecPointOne);
		ecPointOne = NULL;
	}
	
	// Check if EC point two exists
	if(ecPointTwo) {
	
		// Free EC point two
		EC_POINT_free(ecPointTwo);
		ecPointTwo = NULL;
	}
}

// Try context get
try_context_t *try_context_get(void) {

	// Return try context
	return tryContext;
}

// Try context set
try_context_t *try_context_set(try_context_t *context) {

	// Get previous context
	try_context_t *previousContext = tryContext;
	
	// Set try context to the context
	tryContext = context;
	
	// Return previous context
	return previousContext;
}

// OS long jump
void os_longjmp(unsigned int exception) {

	// Long jump to end of current context
	longjmp(try_context_get()->jmp_buf, exception);
}

// OS schedule exit
void os_sched_exit(bolos_task_status_t exit_code) {

	// Check if digest context exists
	if(digestContext) {
	
		// Free digest context
		EVP_MD_CTX_free(digestContext);
		digestContext = NULL;
	}
	
	// Check if EC point one exists
	if(ecPointOne) {
	
		// Free EC point one
		EC_POINT_free(ecPointOne);
		ecPointOne = NULL;
	}
	
	// Check if EC point two exists
	if(ecPointTwo) {
	
		// Free EC point two
		EC_POINT_free(ecPointTwo);
		ecPointTwo = NULL;
	}
	
	// Exit abnormally
	__builtin_trap();
}

// NVM write
void nvm_write(void *dst_adr PLENGTH(src_len), void *src_adr PLENGTH(src_len), unsigned int src_len) {

	// Check if source address exists
	if(src_adr) {
	
		// Copy source to destination
		memcpy(dst_adr, src_adr, src_len);
	}
	
	// Otherwise
	else {
	
		// Clear destination
		memset(dst_adr, 0, src_len);
	}
}

// CX SHA-256 init no throw
cx_err_t cx_sha256_init_no_throw(cx_sha256_t *hash) {

	// Check if digest context exists
	if(digestContext) {
	
		// Free digest context
		EVP_MD_CTX_free(digestContext);
	}
	
	// Check if creating digest context failed
	digestContext = EVP_MD_CTX_new();
	if(!digestContext) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if initializing digest context to perform SHA-256
	if(!EVP_DigestInit_ex(digestContext, EVP_sha256(), NULL)) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Return ok
	return CX_OK;
}

// CX hash SHA-256
size_t cx_hash_sha256(const uint8_t *in, size_t len, uint8_t *out, size_t out_len) {

	// Check if creating context failed
	EVP_MD_CTX *context = EVP_MD_CTX_new();
	if(!context) {
	
		// Return zero
		return 0;
	}
	
	// Check if initializing context to perform SHA-256 failed
	if(!EVP_DigestInit_ex(context, EVP_sha256(), NULL)) {
	
		// Free context
		EVP_MD_CTX_free(context);
		
		// Return zero
		return 0;
	}
	
	// Check if including in to the hash failed
	if(!EVP_DigestUpdate(context, in, len)) {
	
		// Free context
		EVP_MD_CTX_free(context);
		
		// Return zero
		return 0;
	}
	
	// Check if setting out to the result failed
	if(!EVP_DigestFinal_ex(context, out, NULL)) {
	
		// Free context
		EVP_MD_CTX_free(context);
		
		// Return zero
		return 0;
	}
	
	// Free context
	EVP_MD_CTX_free(context);
	
	// Return hash size
	return CX_SHA256_SIZE;
}

// CX hash SHA-512
size_t cx_hash_sha512(const uint8_t *in, size_t in_len, uint8_t *out, size_t out_len) {

	// Check if creating context failed
	EVP_MD_CTX *context = EVP_MD_CTX_new();
	if(!context) {
	
		// Return zero
		return 0;
	}
	
	// Check if initializing context to perform SHA-512 failed
	if(!EVP_DigestInit_ex(context, EVP_sha512(), NULL)) {
	
		// Free context
		EVP_MD_CTX_free(context);
		
		// Return zero
		return 0;
	}
	
	// Check if including in to the hash failed
	if(!EVP_DigestUpdate(context, in, in_len)) {
	
		// Free context
		EVP_MD_CTX_free(context);
		
		// Return zero
		return 0;
	}
	
	// Check if setting out to the result failed
	if(!EVP_DigestFinal_ex(context, out, NULL)) {
	
		// Free context
		EVP_MD_CTX_free(context);
		
		// Return zero
		return 0;
	}
	
	// Free context
	EVP_MD_CTX_free(context);
	
	// Return hash size
	return CX_SHA512_SIZE;
}

// CX math add no throw
cx_err_t cx_math_add_no_throw(uint8_t *r, const uint8_t *a, const uint8_t *b, size_t len) {

	// Check if converting first argument to a big number failed
	BIGNUM *first = BN_bin2bn(a, len, NULL);
	if(!first) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting second argument to a big number failed
	BIGNUM *second = BN_bin2bn(b, len, NULL);
	if(!second) {
	
		// Free memory
		BN_free(first);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if adding the arguments failed
	if(!BN_add(first, first, second)) {
	
		// Free memory
		BN_free(first);
		BN_free(second);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting the result failed
	if(BN_bn2binpad(first, r, len) == -1) {
	
		// Free memory
		BN_free(first);
		BN_free(second);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_free(first);
	BN_free(second);
	
	// Return ok
	return CX_OK;
}

// CX math addm no throw
cx_err_t cx_math_addm_no_throw(uint8_t *r, const uint8_t *a, const uint8_t *b, const uint8_t *m, size_t len) {

	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting first argument to a big number failed
	BIGNUM *first = BN_bin2bn(a, len, NULL);
	if(!first) {
	
		// Free memory
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting second argument to a big number failed
	BIGNUM *second = BN_bin2bn(b, len, NULL);
	if(!second) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting modulo argument to a big number failed
	BIGNUM *modulo = BN_bin2bn(m, len, NULL);
	if(!modulo) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if adding and moduloing the arguments failed
	if(!BN_mod_add(first, first, second, modulo, context)) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting the result failed
	if(BN_bn2binpad(first, r, len) == -1) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_CTX_free(context);
	BN_free(first);
	BN_free(second);
	BN_free(modulo);
	
	// Return ok
	return CX_OK;
}

// CX math subm no throw
cx_err_t cx_math_subm_no_throw(uint8_t *r, const uint8_t *a, const uint8_t *b, const uint8_t *m, size_t len) {

	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting first argument to a big number failed
	BIGNUM *first = BN_bin2bn(a, len, NULL);
	if(!first) {
	
		// Free memory
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting second argument to a big number failed
	BIGNUM *second = BN_bin2bn(b, len, NULL);
	if(!second) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting modulo argument to a big number failed
	BIGNUM *modulo = BN_bin2bn(m, len, NULL);
	if(!modulo) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if subtracting and moduloing the arguments failed
	if(!BN_mod_sub(first, first, second, modulo, context)) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting the result failed
	if(BN_bn2binpad(first, r, len) == -1) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_CTX_free(context);
	BN_free(first);
	BN_free(second);
	BN_free(modulo);
	
	// Return ok
	return CX_OK;
}

// CX math multm no throw
cx_err_t cx_math_multm_no_throw(uint8_t *r, const uint8_t *a, const uint8_t *b, const uint8_t *m, size_t len) {

	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting first argument to a big number failed
	BIGNUM *first = BN_bin2bn(a, len, NULL);
	if(!first) {
	
		// Free memory
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting second argument to a big number failed
	BIGNUM *second = BN_bin2bn(b, len, NULL);
	if(!second) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting modulo argument to a big number failed
	BIGNUM *modulo = BN_bin2bn(m, len, NULL);
	if(!modulo) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if multiplying and moduloing the arguments failed
	if(!BN_mod_mul(first, first, second, modulo, context)) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting the result failed
	if(BN_bn2binpad(first, r, len) == -1) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_CTX_free(context);
	BN_free(first);
	BN_free(second);
	BN_free(modulo);
	
	// Return ok
	return CX_OK;
}

// CX math powm no throw
cx_err_t cx_math_powm_no_throw(uint8_t *r, const uint8_t *a, const uint8_t *e, size_t len_e, const uint8_t *m, size_t len) {

	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting first argument to a big number failed
	BIGNUM *first = BN_bin2bn(a, len, NULL);
	if(!first) {
	
		// Free memory
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting second argument to a big number failed
	BIGNUM *second = BN_bin2bn(e, len_e, NULL);
	if(!second) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting modulo argument to a big number failed
	BIGNUM *modulo = BN_bin2bn(m, len, NULL);
	if(!modulo) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if exponenting and moduloing the arguments failed
	if(!BN_mod_exp(first, first, second, modulo, context)) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting the result failed
	if(BN_bn2binpad(first, r, len) == -1) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(second);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_CTX_free(context);
	BN_free(first);
	BN_free(second);
	BN_free(modulo);
	
	// Return ok
	return CX_OK;
}

// CX math invert primem no throw
cx_err_t cx_math_invprimem_no_throw(uint8_t *r, const uint8_t *a, const uint8_t *m, size_t len) {

	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting first argument to a big number failed
	BIGNUM *first = BN_bin2bn(a, len, NULL);
	if(!first) {
	
		// Free memory
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting modulo argument to a big number failed
	BIGNUM *modulo = BN_bin2bn(m, len, NULL);
	if(!modulo) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if inverting and moduloing the arguments failed
	if(!BN_mod_inverse(first, first, modulo, context)) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting the result failed
	if(BN_bn2binpad(first, r, len) == -1) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_CTX_free(context);
	BN_free(first);
	BN_free(modulo);
	
	// Return ok
	return CX_OK;
}

// CX math modm no throw
cx_err_t cx_math_modm_no_throw(uint8_t *v, size_t len_v, const uint8_t *m, size_t len_m) {

	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting first argument to a big number failed
	BIGNUM *first = BN_bin2bn(v, len_v, NULL);
	if(!first) {
	
		// Free memory
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if converting modulo argument to a big number failed
	BIGNUM *modulo = BN_bin2bn(m, len_m, NULL);
	if(!modulo) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if moduloing the arguments failed
	if(!BN_mod(first, first, modulo, context)) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting the result failed
	if(BN_bn2binpad(first, v, len_v) == -1) {
	
		// Free memory
		BN_CTX_free(context);
		BN_free(first);
		BN_free(modulo);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_CTX_free(context);
	BN_free(first);
	BN_free(modulo);
	
	// Return ok
	return CX_OK;
}

// CX math compare no throw
cx_err_t cx_math_cmp_no_throw(const uint8_t *a, const uint8_t *b, size_t length, int *diff) {

	// Set diff to the comparison result
	*diff = memcmp(a, b, length);
	
	// Return ok
	return CX_OK;
}

// CX ECFP scalar mult no throw
cx_err_t cx_ecfp_scalar_mult_no_throw(cx_curve_t curve, uint8_t *P, const uint8_t *k, size_t k_len) {

	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating group failed
	EC_GROUP *group = EC_GROUP_new_by_curve_name(NID_secp256k1);
	if(!group) {
	
		// Free memory
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating EC point for p failed
	EC_POINT *pPoint = EC_POINT_new(group);
	if(!pPoint) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting point from p failed
	if(!EC_POINT_oct2point(group, pPoint, P, UNCOMPRESSED_PUBLIC_KEY_SIZE, context)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if loading k as a big number failed
	BIGNUM *kBigNumber = BN_bin2bn(k, k_len, NULL);
	if(!kBigNumber) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if multiplying values failed
	if(!EC_POINT_mul(group, pPoint, NULL, pPoint, kBigNumber, context)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		BN_free(kBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if the result is infinity
	if(EC_POINT_is_at_infinity(group, pPoint)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		BN_free(kBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if setting p to the result failed
	if(!EC_POINT_point2oct(group, pPoint, POINT_CONVERSION_UNCOMPRESSED, P, UNCOMPRESSED_PUBLIC_KEY_SIZE, context)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		BN_free(kBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_CTX_free(context);
	EC_GROUP_free(group);
	EC_POINT_free(pPoint);
	BN_free(kBigNumber);
	
	// Return ok
	return CX_OK;
}

// CX ECFP add point no throw
cx_err_t cx_ecfp_add_point_no_throw(cx_curve_t curve, uint8_t *R, const uint8_t *P, const uint8_t *Q) {

	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating group failed
	EC_GROUP *group = EC_GROUP_new_by_curve_name(NID_secp256k1);
	if(!group) {
	
		// Free memory
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating EC point for p failed
	EC_POINT *pPoint = EC_POINT_new(group);
	if(!pPoint) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting point from p failed
	if(!EC_POINT_oct2point(group, pPoint, P, UNCOMPRESSED_PUBLIC_KEY_SIZE, context)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating EC point for q failed
	EC_POINT *qPoint = EC_POINT_new(group);
	if(!qPoint) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting point from q failed
	if(!EC_POINT_oct2point(group, qPoint, Q, UNCOMPRESSED_PUBLIC_KEY_SIZE, context)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		EC_POINT_free(qPoint);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if adding points failed
	if(!EC_POINT_add(group, pPoint, pPoint, qPoint, context)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		EC_POINT_free(qPoint);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if the result is infinity
	if(EC_POINT_is_at_infinity(group, pPoint)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		EC_POINT_free(qPoint);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if setting r to the result failed
	if(!EC_POINT_point2oct(group, pPoint, POINT_CONVERSION_UNCOMPRESSED, R, UNCOMPRESSED_PUBLIC_KEY_SIZE, context)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(pPoint);
		EC_POINT_free(qPoint);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_CTX_free(context);
	EC_GROUP_free(group);
	EC_POINT_free(pPoint);
	EC_POINT_free(qPoint);
	
	// Return ok
	return CX_OK;
}

// CX ECFP init public key no throw
cx_err_t cx_ecfp_init_public_key_no_throw(cx_curve_t curve, const uint8_t *rawkey, size_t key_len, cx_ecfp_public_key_t *key) {

	// Check if curve isn't secp256k1
	// TODO
	if(curve != CX_CURVE_SECP256K1) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Set key to raw key
	key->curve = curve;
	key->W_len = key_len;
	memcpy(key->W, rawkey, key_len);
	
	// Return ok
	return CX_OK;
}

// CX ECFP generate pair no throw
cx_err_t cx_ecfp_generate_pair_no_throw(cx_curve_t curve, cx_ecfp_public_key_t *pubkey, cx_ecfp_private_key_t *privkey, bool keepprivate) {

	// Check if curve isn't secp256k1
	// TODO
	if(curve != CX_CURVE_SECP256K1) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating group failed
	EC_GROUP *group = EC_GROUP_new_by_curve_name(NID_secp256k1);
	if(!group) {
	
		// Free memory
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating EC point failed
	EC_POINT *point = EC_POINT_new(group);
	if(!point) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if loading private key as a big number failed
	BIGNUM *privateKeyBigNumber = BN_bin2bn(privkey->d, privkey->d_len, NULL);
	if(!privateKeyBigNumber) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(point);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if multiplying generator by the private key failed
	if(!EC_POINT_mul(group, point, privateKeyBigNumber, NULL, NULL, context)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(point);
		BN_free(privateKeyBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if the result is infinity
	if(EC_POINT_is_at_infinity(group, point)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(point);
		BN_free(privateKeyBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if setting public key to the result failed
	pubkey->curve = curve;
	pubkey->W_len = sizeof(pubkey->W);
	if(!EC_POINT_point2oct(group, point, POINT_CONVERSION_UNCOMPRESSED, pubkey->W, pubkey->W_len, context)) {
	
		// Free memory
		BN_CTX_free(context);
		EC_GROUP_free(group);
		EC_POINT_free(point);
		BN_free(privateKeyBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_CTX_free(context);
	EC_GROUP_free(group);
	EC_POINT_free(point);
	BN_free(privateKeyBigNumber);
	
	// Return ok
	return CX_OK;
}

// CX PBKDF2 no throw
cx_err_t cx_pbkdf2_no_throw(cx_md_t md_type, const uint8_t *password, size_t passwordlen, uint8_t *salt, size_t saltlen, uint32_t iterations, uint8_t *out, size_t outLength) {

	// Check if using OpenSSL 3 or newer
	#if OPENSSL_VERSION_MAJOR >= 3
	
		// Check if creating key derivation failed
		EVP_KDF *keyDerivation = EVP_KDF_fetch(NULL, "PBKDF2", NULL);
		if(!keyDerivation) {
		
			// Return not ok
			return !CX_OK;	
		}
		
		// Check if creating context failed
		EVP_KDF_CTX *context = EVP_KDF_CTX_new(keyDerivation);
		if(!context) {
		
			// Free memory
			EVP_KDF_free(keyDerivation);
			
			// Return not ok
			return !CX_OK;	
		}
		
		// Check if deriving out failed
		unsigned int iterationsInteger = iterations;
		const OSSL_PARAM parameters[] = {
			OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_PASSWORD, (uint8_t *)password, passwordlen),
			OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SALT, salt, saltlen),
			OSSL_PARAM_construct_uint(OSSL_KDF_PARAM_ITER, &iterationsInteger),
			OSSL_PARAM_utf8_string(OSSL_KDF_PARAM_DIGEST, "SHA-512", 0),
			OSSL_PARAM_END
		};
		if(!EVP_KDF_derive(context, out, outLength, parameters)) {
		
			// Free memory
			EVP_KDF_free(keyDerivation);
			EVP_KDF_CTX_free(context);
			
			// Return not ok
			return !CX_OK;
		}
		
		// Free memory
		EVP_KDF_free(keyDerivation);
		EVP_KDF_CTX_free(context);
		
		// Return ok
		return CX_OK;
	
	// Otherwise
	#else
	
		// Check if deriving out failed
		if(!PKCS5_PBKDF2_HMAC((const char *)password, passwordlen, salt, saltlen, iterations, EVP_sha512(), outLength, out)) {
		
			// Return not ok
			return !CX_OK;
		}
		
		// Return ok
		return CX_OK;
	#endif
}

// CX Edwards compress point no throw
cx_err_t cx_edwards_compress_point_no_throw(cx_curve_t curve, uint8_t *p, size_t p_len) {

	// Return not ok
	// TODO
	return !CX_OK;
}

// CX Edwards decompress point no throw
cx_err_t cx_edwards_decompress_point_no_throw(cx_curve_t curve, uint8_t *p, size_t p_len) {

	// Return not ok
	// TODO
	return !CX_OK;
}

// CX ECDH no throw
cx_err_t cx_ecdh_no_throw(const cx_ecfp_private_key_t *pvkey, uint32_t mode, const uint8_t *P, size_t P_len, uint8_t *secret, size_t secret_len) {

	// Return not ok
	// TODO
	return !CX_OK;
}

// CX SHA3 init no throw
cx_err_t cx_sha3_init_no_throw(cx_sha3_t *hash, size_t size) {

	// Check if digest context exists
	if(digestContext) {
	
		// Free digest context
		EVP_MD_CTX_free(digestContext);
	}
	
	// Check if creating digest context failed
	digestContext = EVP_MD_CTX_new();
	if(!digestContext) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if initializing digest context to perform SHA3-256 failed
	if(!EVP_DigestInit_ex(digestContext, EVP_sha3_256(), NULL)) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Return ok
	return CX_OK;
}

// CX hash no throw
cx_err_t cx_hash_no_throw(cx_hash_t *hash, uint32_t mode, const uint8_t *in, size_t len, uint8_t *out, size_t out_len) {
	
	// Check if including in to the hash failed
	if(!EVP_DigestUpdate(digestContext, in, len)) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting the result
	if(mode & CX_LAST) {
	
		// Check if setting out to the result
		if(!EVP_DigestFinal_ex(digestContext, out, NULL)) {
		
			// Return not ok
			return !CX_OK;
		}
		
		// Free digest context
		EVP_MD_CTX_free(digestContext);
		digestContext = NULL;
	}
	
	// Return ok
	return CX_OK;
}

// CX ECFP init private key no throw
cx_err_t cx_ecfp_init_private_key_no_throw(cx_curve_t curve, const uint8_t *rawkey, size_t key_len, cx_ecfp_private_key_t *pvkey) {

	// Check if curve isn't secp256k1
	// TODO
	if(curve != CX_CURVE_SECP256K1) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Set private key to raw key
	pvkey->curve = curve;
	pvkey->d_len = key_len;
	memcpy(pvkey->d, rawkey, key_len);
	
	// Return ok
	return CX_OK;
}

// CX BN lock
cx_err_t cx_bn_lock(size_t word_nbytes, uint32_t flags) {

	// Return ok
	return CX_OK;
}

// CX BN unlock
uint32_t cx_bn_unlock(void) {

	// Return ok
	return CX_OK;
}

// CX ecpoint alloc
cx_err_t cx_ecpoint_alloc(cx_ecpoint_t *P PLENGTH(sizeof(cx_ecpoint_t)), cx_curve_t cv) {

	// Return ok
	return CX_OK;
}

// CX ecpoint destroy
cx_err_t cx_ecpoint_destroy(cx_ecpoint_t *P PLENGTH(sizeof(cx_ecpoint_t))) {

	// Check if EC point one exists
	if(ecPointOne) {
	
		// Free EC point one
		EC_POINT_free(ecPointOne);
		ecPointOne = NULL;
	}
	
	// Check if EC point two exists
	if(ecPointTwo) {
	
		// Free EC point two
		EC_POINT_free(ecPointTwo);
		ecPointTwo = NULL;
	}
	
	// Return ok
	return CX_OK;
}

// CX ecpoint init
cx_err_t cx_ecpoint_init(cx_ecpoint_t *P  PLENGTH(sizeof(cx_ecpoint_t)), const uint8_t *x PLENGTH(x_len), size_t x_len, const uint8_t *y PLENGTH(y_len), size_t y_len) {

	// Check if loading x as a big number failed
	BIGNUM *xBigNumber = BN_bin2bn(x, x_len, NULL);
	if(!xBigNumber) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if loading y as a big number failed
	BIGNUM *yBigNumber = BN_bin2bn(y, y_len, NULL);
	if(!yBigNumber) {
	
		// Free memory
		BN_free(xBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Free memory
		BN_free(xBigNumber);
		BN_free(yBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating group failed
	EC_GROUP *group = EC_GROUP_new_by_curve_name(NID_secp256k1);
	if(!group) {
	
		// Free memory
		BN_free(xBigNumber);
		BN_free(yBigNumber);
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if EC point one doesn't exist
	if(!ecPointOne) {
	
		// Check if creating EC point one failed
		ecPointOne = EC_POINT_new(group);
		if(!ecPointOne) {
		
			// Free memory
			BN_free(xBigNumber);
			BN_free(yBigNumber);
			BN_CTX_free(context);
			EC_GROUP_free(group);
			
			// Return not ok
			return !CX_OK;
		}
		
		// Check if setting EC point one to the x and y coordinates failed
		if(!EC_POINT_set_affine_coordinates(group, ecPointOne, xBigNumber, yBigNumber, context)) {
		
			// Free memory
			BN_free(xBigNumber);
			BN_free(yBigNumber);
			BN_CTX_free(context);
			EC_GROUP_free(group);
			
			// Return not ok
			return !CX_OK;
		}
	}
	
	// Otherwise check if EC point two doesn't exist
	else if(!ecPointTwo) {
	
		// Check if creating EC point two failed
		ecPointTwo = EC_POINT_new(group);
		if(!ecPointTwo) {
		
			// Free memory
			BN_free(xBigNumber);
			BN_free(yBigNumber);
			BN_CTX_free(context);
			EC_GROUP_free(group);
			
			// Return not ok
			return !CX_OK;
		}
		
		// Check if setting EC point two to the x and y coordinates failed
		if(!EC_POINT_set_affine_coordinates(group, ecPointTwo, xBigNumber, yBigNumber, context)) {
		
			// Free memory
			BN_free(xBigNumber);
			BN_free(yBigNumber);
			BN_CTX_free(context);
			EC_GROUP_free(group);
			
			// Return not ok
			return !CX_OK;
		}
	}
	
	// Free memory
	BN_free(xBigNumber);
	BN_free(yBigNumber);
	BN_CTX_free(context);
	EC_GROUP_free(group);
	
	// Return ok
	return CX_OK;
}

// CX ecpoint double scalar multiply
cx_err_t cx_ecpoint_double_scalarmul(cx_ecpoint_t *R  PLENGTH(sizeof(cx_ecpoint_t)), cx_ecpoint_t *P PLENGTH(sizeof(cx_ecpoint_t)), cx_ecpoint_t *Q PLENGTH(sizeof(cx_ecpoint_t)), const uint8_t *k PLENGTH(k_len), size_t k_len, const uint8_t *r PLENGTH(r_len), size_t r_len) {

	// Check if loading k as a big number failed
	BIGNUM *kBigNumber = BN_bin2bn(k, k_len, NULL);
	if(!kBigNumber) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if loading r as a big number failed
	BIGNUM *rBigNumber = BN_bin2bn(r, r_len, NULL);
	if(!rBigNumber) {
	
		// Free memory
		BN_free(kBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Free memory
		BN_free(kBigNumber);
		BN_free(rBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating group failed
	EC_GROUP *group = EC_GROUP_new_by_curve_name(NID_secp256k1);
	if(!group) {
	
		// Free memory
		BN_free(kBigNumber);
		BN_free(rBigNumber);
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if multiplying EC point one by k and EC point two by r failed
	if(!EC_POINT_mul(group, ecPointOne, NULL, ecPointOne, kBigNumber, context) || !EC_POINT_mul(group, ecPointTwo, NULL, ecPointTwo, rBigNumber, context)) {
	
		// Free memory
		BN_free(kBigNumber);
		BN_free(rBigNumber);
		BN_CTX_free(context);
		EC_GROUP_free(group);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if either result is infinity
	if(EC_POINT_is_at_infinity(group, ecPointOne) || EC_POINT_is_at_infinity(group, ecPointTwo)) {
	
		// Free memory
		BN_free(kBigNumber);
		BN_free(rBigNumber);
		BN_CTX_free(context);
		EC_GROUP_free(group);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if adding results failed
	if(!EC_POINT_add(group, ecPointOne, ecPointOne, ecPointTwo, context)) {
	
		// Free memory
		BN_free(kBigNumber);
		BN_free(rBigNumber);
		BN_CTX_free(context);
		EC_GROUP_free(group);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if the result is infinity
	if(EC_POINT_is_at_infinity(group, ecPointOne)) {
	
		// Free memory
		BN_free(kBigNumber);
		BN_free(rBigNumber);
		BN_CTX_free(context);
		EC_GROUP_free(group);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_free(kBigNumber);
	BN_free(rBigNumber);
	BN_CTX_free(context);
	EC_GROUP_free(group);
	
	// Return ok
	return CX_OK;
}

// EC point export
cx_err_t cx_ecpoint_export(const cx_ecpoint_t *P PLENGTH(sizeof(cx_ecpoint_t)), uint8_t *x PLENGTH(x_len), size_t x_len, uint8_t *y PLENGTH(y_len), size_t y_len) {

	// Check if creating x big number failed
	BIGNUM *xBigNumber = BN_new();
	if(!xBigNumber) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating y big number failed
	BIGNUM *yBigNumber = BN_new();
	if(!yBigNumber) {
	
		// Free memory
		BN_free(xBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating context failed
	BN_CTX *context = BN_CTX_new();
	if(!context) {
	
		// Free memory
		BN_free(xBigNumber);
		BN_free(yBigNumber);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if creating group failed
	EC_GROUP *group = EC_GROUP_new_by_curve_name(NID_secp256k1);
	if(!group) {
	
		// Free memory
		BN_free(xBigNumber);
		BN_free(yBigNumber);
		BN_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if getting EC point one's x and y coordinates failed
	if(!EC_POINT_get_affine_coordinates(group, ecPointOne, xBigNumber, yBigNumber, context)) {
	
		// Free memory
		BN_free(xBigNumber);
		BN_free(yBigNumber);
		BN_CTX_free(context);
		EC_GROUP_free(group);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Check if setting x and y from big numbers failed
	if(BN_bn2binpad(xBigNumber, x, x_len) == -1 || BN_bn2binpad(yBigNumber, y, y_len) == -1) {
	
		// Free memory
		BN_free(xBigNumber);
		BN_free(yBigNumber);
		BN_CTX_free(context);
		EC_GROUP_free(group);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Free memory
	BN_free(xBigNumber);
	BN_free(yBigNumber);
	BN_CTX_free(context);
	EC_GROUP_free(group);
	
	// Return ok
	return CX_OK;
}

// CX ECDSA verify no throw
bool cx_ecdsa_verify_no_throw(const cx_ecfp_public_key_t *pukey, const uint8_t *hash, size_t hash_len, const uint8_t *sig, size_t sig_len) {

	// TODO
	// Return false
	return false;
}

// CX ECDSA sign no throw
cx_err_t cx_ecdsa_sign_no_throw(const cx_ecfp_private_key_t *pvkey, uint32_t mode, cx_md_t hashID, const uint8_t *hash, size_t hash_len, uint8_t *sig, size_t *sig_len, uint32_t *info) {

	// Return not ok
	// TODO
	return !CX_OK;
}

// CX EDDSA verify no throw
bool cx_eddsa_verify_no_throw(const cx_ecfp_public_key_t *pukey, cx_md_t hashID, const uint8_t *hash, size_t hash_len, const uint8_t *sig, size_t sig_len) {

	// Return false
	// TODO
	return false;
}

// CX EDDSA sign no throw
cx_err_t cx_eddsa_sign_no_throw(const cx_ecfp_private_key_t *pvkey, cx_md_t hashID, const uint8_t *hash, size_t hash_len, uint8_t *sig, size_t sig_len) {

	// Return not ok
	// TODO
	return !CX_OK;
}

// CX AES init key no throw
cx_err_t cx_aes_init_key_no_throw(const uint8_t *rawkey, size_t key_len, cx_aes_key_t *key) {

	// Set key to raw key
	memcpy(key->keys, rawkey, key_len);
	
	// Return ok
	return CX_OK;
}

// CX AES no throw
cx_err_t cx_aes_no_throw(const cx_aes_key_t *key, uint32_t mode, const uint8_t *in, size_t in_len, uint8_t *out, size_t *out_len) {

	// Check if creating context failed
	EVP_CIPHER_CTX *context = EVP_CIPHER_CTX_new();
	if(!context) {
	
		// Return not ok
		return !CX_OK;
	}
	
	// Check if initializing context failed
	if(!EVP_CipherInit(context, EVP_aes_256_cbc(), key->keys, NULL, (mode & CX_ENCRYPT) ? 1 : 0)) {
	
		// Free context
		EVP_CIPHER_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Disable padding
	EVP_CIPHER_CTX_set_padding(context, 0);
	
	// Check if encrypting or decrypting the in failed
	int length;
	if(!EVP_CipherUpdate(context, out, &length, in, in_len)) {
	
		// Free context
		EVP_CIPHER_CTX_free(context);
		
		// Return not ok
		return !CX_OK;
	}
	
	// Set out length to length
	*out_len = length;
	
	// Free context
	EVP_CIPHER_CTX_free(context);
	
	// Return ok
	return CX_OK;
}

// CX HMAC SHA-512
size_t cx_hmac_sha512(const uint8_t *key, size_t key_len, const uint8_t *in, size_t len, uint8_t *mac, size_t mac_len) {

	// Check if using OpenSSL 3 or newer
	#if OPENSSL_VERSION_MAJOR >= 3
	
		// Check if creating MAC provider failed
		EVP_MAC *macProvider = EVP_MAC_fetch(NULL, "HMAC", NULL);
		if(!macProvider) {
		
			// Return zero
			return 0;
		}
		
		// Check if creating MAC context failed
		EVP_MAC_CTX *macContext = EVP_MAC_CTX_new(macProvider);
		if(!macContext) {
		
			// Free memory
			EVP_MAC_free(macProvider);
			
			// Return zero
			return 0;
		}
		
		// Check if configuring MAC to use SHA-512 failed
		const OSSL_PARAM macParameters[] = {
			OSSL_PARAM_utf8_string(OSSL_MAC_PARAM_DIGEST, "SHA-512", 0),
			OSSL_PARAM_END
		};
		if(!EVP_MAC_init(macContext, key, key_len, macParameters)) {
		
			// Free memory
			EVP_MAC_CTX_free(macContext);
			EVP_MAC_free(macProvider);
			
			// Return zero
			return 0;
		}
		
		// Check if including in to the MAC failed
		if(!EVP_MAC_update(macContext, in, len)) {
		
			// Free memory
			EVP_MAC_CTX_free(macContext);
			EVP_MAC_free(macProvider);
			
			// Return zero
			return 0;
		}
		
		// Check if setting MAC to the result failed
		if(!EVP_MAC_final(macContext, mac, NULL, CX_SHA512_SIZE)) {
		
			// Free memory
			EVP_MAC_CTX_free(macContext);
			EVP_MAC_free(macProvider);
			
			// Return zero
			return 0;
		}
		
		// Free MAC context
		EVP_MAC_CTX_free(macContext);
		EVP_MAC_free(macProvider);
		
		// Return length
		return CX_SHA512_SIZE;
	
	// Otherwise
	#else
	
		// Check if creating context failed
		HMAC_CTX *context = HMAC_CTX_new();
		if(!context) {
		
			// Return zero
			return 0;
		}
		
		// Check if initializing context to use SHA-512 failed
		if(!HMAC_Init_ex(context, key, key_len, EVP_sha512(), NULL)) {
		
			// Free memory
			HMAC_CTX_free(context);
			
			// Return zero
			return 0;
		}
		
		// Check if including in to the MAC failed
		if(!HMAC_Update(context, in, len)) {
		
			// Free memory
			HMAC_CTX_free(context);
			
			// Return zero
			return 0;
		}
		
		// Check if setting MAC to the result failed
		if(!HMAC_Final(context, mac, NULL)) {
		
			// Free memory
			HMAC_CTX_free(context);
			
			// Return zero
			return 0;
		}
		
		// Free memory
		HMAC_CTX_free(context);
		
		// Return length
		return CX_SHA512_SIZE;
	#endif
}

// CX RNG no throw
void cx_rng_no_throw(uint8_t *buffer, size_t len) {

	// Go through all bytes in the buffer
	for(size_t i = 0; i < len; ++i) {
	
		// Set byte to value
		buffer[i] = i;
	}
}

// OS perso derive node with seed key
void os_perso_derive_node_with_seed_key(unsigned int mode, cx_curve_t curve, const unsigned int *path PLENGTH(4 * (pathLength & 0x0FFFFFFFu)), unsigned int pathLength, unsigned char *privateKey PLENGTH(64), unsigned char *chain PLENGTH(32), unsigned char *seed_key PLENGTH(seed_key_length), unsigned int seed_key_length) {

	// Set private key
	memcpy(privateKey, (unsigned char[]){0x50, 0x75, 0x8B, 0x15, 0x3D, 0xE0, 0xA7, 0x2E, 0xDC, 0x0F, 0x0E, 0xE0, 0x4E, 0xC9, 0x7B, 0x84, 0xAF, 0xBD, 0x87, 0x06, 0x84, 0xB5, 0xCF, 0x58, 0x8B, 0xD0, 0xE6, 0x29, 0x56, 0x8D, 0x0D, 0xDA, 0x81, 0x83, 0x00, 0x60, 0x10, 0x13, 0x00, 0x20, 0x4A, 0x03, 0x00, 0x20, 0x58, 0x03, 0x00, 0x20, 0x50, 0x03, 0x00, 0x20, 0x4C, 0x03, 0x00, 0x20, 0x01, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x20}, 64);
	
	// Check if getting chain code
	if(chain) {
	
		// Set chain code
		memcpy(chain, (unsigned char[]){0xC0, 0x49, 0x72, 0xDC, 0x22, 0xCB, 0xF4, 0x2F, 0x7E, 0x5D, 0x71, 0x8E, 0x43, 0xC7, 0x12, 0xF9, 0x54, 0x12, 0xCB, 0xA3, 0x0C, 0x38, 0xDE, 0xBB, 0x18, 0xF9, 0x85, 0x34, 0x74, 0x99, 0xA9, 0xB7}, 32);
	}
}

// OS secure memcmp
char os_secure_memcmp(void *src1, void *src2, unsigned int length) {

	// Return comparing sources
	return memcmp(src1, src2, length);
}
