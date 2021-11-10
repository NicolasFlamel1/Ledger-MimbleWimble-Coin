// Header guard
#ifndef FIELD_LEDGER_IMPL_H
#define FIELD_LEDGER_IMPL_H


// Header files
#include <string.h>
#include "crypto.h"
#include "field.h"


// Supporting function implementation

// Secp256k1 field element normalize
static void secp256k1_fe_normalize(secp256k1_fe *fieldElement) {

	// Reduce the field element by the curve primt
	cx_math_modm(fieldElement->data, sizeof(fieldElement->data), SECP256K1_CURVE_PRIME, sizeof(fieldElement->data));
}

// Secp256k1 field element normalize weak
static void secp256k1_fe_normalize_weak(secp256k1_fe *fieldElement) {

	// Normalize the field element
	secp256k1_fe_normalize(fieldElement);
}

// Secp256k1 field element normalize variable time
static void secp256k1_fe_normalize_var(secp256k1_fe *fieldElement) {

	// Normalize the field element
	secp256k1_fe_normalize(fieldElement);
}

// Secp256k1 field element normalizes to zero
static int secp256k1_fe_normalizes_to_zero(secp256k1_fe *fieldElement) {

	// Return if the field element is zero
	return secp256k1_fe_is_zero(fieldElement);
}

// Secp256k1 field element normalizes to zero variable time
static int secp256k1_fe_normalizes_to_zero_var(secp256k1_fe *fieldElement) {

	// Return if the field element normalizes to zero
	return secp256k1_fe_normalizes_to_zero(fieldElement);
}

// Secp256k1 field element set int
static void secp256k1_fe_set_int(secp256k1_fe *fieldElement, int value) {

	// Clear field element
	secp256k1_fe_clear(fieldElement);
	
	// Set field element to the value
	U4BE_ENCODE(fieldElement->data, sizeof(fieldElement->data) - sizeof(uint32_t), value);
}

// Secp256k1 field element is zero
static int secp256k1_fe_is_zero(const secp256k1_fe *fieldElement) {

	// Return if the field element is zero
	return cx_math_is_zero(fieldElement->data, sizeof(fieldElement->data));
}

// Secp256k1 field element is odd
static int secp256k1_fe_is_odd(const secp256k1_fe *fieldElement) {

	// Return if the field element is odd
	return fieldElement->data[sizeof(fieldElement->data) - 1] & 1;
}

// Secp256k1 field element clear
static void secp256k1_fe_clear(secp256k1_fe *fieldElement) {

	// Clear the field element
	explicit_bzero(fieldElement->data, sizeof(fieldElement->data));
}

// Secp256k1 field element set bytes
static int secp256k1_fe_set_b32(secp256k1_fe *fieldElement, const unsigned char *bytes) {

	// Copy bytes to the field element
	memcpy(fieldElement->data, bytes, sizeof(fieldElement->data));
	
	// Return if the field element hasn't overflowed
	return cx_math_cmp(fieldElement->data, SECP256K1_CURVE_PRIME, sizeof(fieldElement->data)) < 0;
}

// Secp256k1 field element get bytes
static void secp256k1_fe_get_b32(unsigned char *bytes, const secp256k1_fe *fieldElement) {

	// Copy field element to bytes
	memcpy(bytes, fieldElement->data, sizeof(fieldElement->data));
}

// Secp256k1 field element negate
static void secp256k1_fe_negate(secp256k1_fe *result, const secp256k1_fe *fieldElement, __attribute__((unused)) int magnitude) {

	// Check if field element is zero
	if(secp256k1_fe_is_zero(fieldElement)) {
	
		// Clear the result
		secp256k1_fe_clear(result);
	}
	
	// Otherwise
	else {
	
		// Set the result to the curve prime minus the field element
		cx_math_sub(result->data, SECP256K1_CURVE_PRIME, fieldElement->data, sizeof(result->data));
	}
}

// Secp256k1 field element multiply int
static void secp256k1_fe_mul_int(secp256k1_fe *fieldElement, int value) {

	// Set field element to the product of the field element and value modulo the curve  prime
	uint8_t temp[sizeof(fieldElement->data)] = {};
	U4BE_ENCODE(temp, sizeof(temp) - sizeof(uint32_t), value);
	
	cx_math_multm(fieldElement->data, fieldElement->data, temp, SECP256K1_CURVE_PRIME, sizeof(fieldElement->data));
}

// Secp256k1 field element add
static void secp256k1_fe_add(secp256k1_fe *result, const secp256k1_fe *fieldElement) {

	// Set result to the sum of the two field elements modulo the curve prime
	cx_math_addm(result->data, result->data, fieldElement->data, SECP256K1_CURVE_PRIME, sizeof(result->data));
}

// Secp256k1 field element multiply
static void secp256k1_fe_mul(secp256k1_fe *result, const secp256k1_fe *firstFieldElement, const secp256k1_fe *secondFieldElement) {

	// Set result to the product of the two field elements modulo the curve prime
	cx_math_multm(result->data, firstFieldElement->data, secondFieldElement->data, SECP256K1_CURVE_PRIME, sizeof(result->data));
}

// Secp256k1 field element square
static void secp256k1_fe_sqr(secp256k1_fe *result, const secp256k1_fe *fieldElement) {

	// Set result to the field element square
	const uint8_t two[] = {2};
	cx_math_powm(result->data, fieldElement->data, two, sizeof(two), SECP256K1_CURVE_PRIME, sizeof(result->data));
}

// Secp256k1 field element conditional move
static void secp256k1_fe_cmov(secp256k1_fe *result, const secp256k1_fe *fieldElement, int flag) {

	// Check if flag
	if(flag) {
	
		// Copy field element to the result
		memcpy(result->data, fieldElement->data, sizeof(result->data));
	}
}

// Secp256k1 field element storage conditional move
static void secp256k1_fe_storage_cmov(secp256k1_fe_storage *result, const secp256k1_fe_storage *storage, int flag) {

	// Check if flag
	if(flag) {
	
		// Copy storage to the result
		memcpy(result->data, storage->data, sizeof(result->data));
	}
}

// Secp256k1 field element to storage
static void secp256k1_fe_to_storage(secp256k1_fe_storage *storage, const secp256k1_fe *fieldElement) {

	// Copy field element to storage
	memcpy(storage->data, fieldElement->data, sizeof(storage->data));
}

// Secp256k1 field element from storage
static void secp256k1_fe_from_storage(secp256k1_fe *fieldElement, const secp256k1_fe_storage *storage) {

	// Copy storage to the field element
	memcpy(fieldElement->data, storage->data, sizeof(fieldElement->data));
}

// Secp256k1 field element equal
static int secp256k1_fe_equal(const secp256k1_fe *firstFieldElement, const secp256k1_fe *secondFieldElement) {

	// Return if field elements are equal
	return !memcmp(firstFieldElement->data, secondFieldElement->data, sizeof(firstFieldElement->data));
}

// Secp256k1 field element equal variable time
static int secp256k1_fe_equal_var(const secp256k1_fe *firstFieldElement, const secp256k1_fe *secondFieldElement) {

	// Return if field elements are equal
	return secp256k1_fe_equal(firstFieldElement, secondFieldElement);
}

// Secp256k1 field element inverse
static void secp256k1_fe_inv(secp256k1_fe *result, const secp256k1_fe *fieldElement) {

	// Set result to the inverse of the field element modulo the curve prime
	cx_math_invprimem(result->data, fieldElement->data, SECP256K1_CURVE_PRIME, sizeof(result->data));
}

// Secp256k1 field element square root
static int secp256k1_fe_sqrt(secp256k1_fe *result, const secp256k1_fe *fieldElement) {

	// Set result to the square root of the field element modulo the curve prime
	cx_math_powm(result->data, fieldElement->data, SECP256K1_CURVE_SQUARE_ROOT_EXPONENT, sizeof(SECP256K1_CURVE_SQUARE_ROOT_EXPONENT), SECP256K1_CURVE_PRIME, sizeof(result->data));
	
	// Get the square of the result
	secp256k1_fe square;
	secp256k1_fe_sqr(&square, result);
	
	// Return if the field element has a square root
	return secp256k1_fe_equal(&square, fieldElement);
}


#endif
