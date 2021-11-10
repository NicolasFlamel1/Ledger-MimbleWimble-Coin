// Header guard
#ifndef SCALAR_LEDGER_IMPL_H
#define SCALAR_LEDGER_IMPL_H


// Header files
#include <os_io_seproxyhal.h>
#include "chacha20_poly1305.h"


// Definitions

// Scalar negated
#define SCALAR_NEGATED -1

// Scalar not negated
#define SCALAR_NOT_NEGATED 1


// Supporting function implementation

// Secp256k1 scalar inverse
static void secp256k1_scalar_inverse(secp256k1_scalar *result, const secp256k1_scalar *scalar) {

	// Set result to the inverse of the scalar modulo the curve order
	cx_math_invprimem(result->data, scalar->data, SECP256K1_CURVE_ORDER, sizeof(scalar->data));
}

// Secp256k1 scalar is even
static int secp256k1_scalar_is_even(const secp256k1_scalar *scalar) {

	// Return if the scalar is even
	return !(scalar->data[sizeof(scalar->data) - 1] & 1);
}

// Secp256k1 scalar clear
static void secp256k1_scalar_clear(secp256k1_scalar *scalar) {

	// Clear scalar
	explicit_bzero(scalar->data, sizeof(scalar->data));
}

// Secp256k1 scalar set int
static void secp256k1_scalar_set_int(secp256k1_scalar *scalar, unsigned int value) {

	// Clear scalar
	secp256k1_scalar_clear(scalar);
	
	// Set scalar to the value
	U4BE_ENCODE(scalar->data, sizeof(scalar->data) - sizeof(uint32_t), value);
}

// Secp256k1 scalar set uint64
static void secp256k1_scalar_set_u64(secp256k1_scalar *scalar, uint64_t value) {

	// Set scalar to the value
	secp256k1_scalar_set_int(scalar, value);
	
	U4BE_ENCODE(scalar->data, sizeof(scalar->data) - sizeof(uint64_t), value >> (sizeof(uint32_t) * BITS_IN_A_BYTE));
}

// Secp256k1 scalar get bits
static unsigned int secp256k1_scalar_get_bits(const secp256k1_scalar *scalar, unsigned int offset, unsigned int count) {

	// Return bits
	return (U4BE(scalar->data, MAX((int8_t)(sizeof(scalar->data) - sizeof(uint32_t) - offset / BITS_IN_A_BYTE), 0)) >> (offset % BITS_IN_A_BYTE + MAX((int8_t)(sizeof(uint32_t) + offset / BITS_IN_A_BYTE - sizeof(scalar->data)), 0) * BITS_IN_A_BYTE)) & (((uint64_t)1 << count) - 1);
}

// Secp256k1 scalar get bits variable time
static unsigned int secp256k1_scalar_get_bits_var(const secp256k1_scalar *scalar, unsigned int offset, unsigned int count) {

	// Return bits
	return secp256k1_scalar_get_bits(scalar, offset, count);
}

// Secp256k1 scalar check overflow
static int secp256k1_scalar_check_overflow(const secp256k1_scalar *scalar) {

	// Return if the scalar is greater than or equal to the curve order
	return cx_math_cmp(scalar->data, SECP256K1_CURVE_ORDER, sizeof(scalar->data)) >= 0;
}

// Secp256k1 scalar add
static int secp256k1_scalar_add(secp256k1_scalar *result, const secp256k1_scalar *firstScalar, const secp256k1_scalar *secondScalar) {

	// Set result to the sum of the two scalars modulo the curve order
	cx_math_addm(result->data, firstScalar->data, secondScalar->data, SECP256K1_CURVE_ORDER, sizeof(result->data));
	
	// Return if the result overflowed
	return cx_math_cmp(result->data, secondScalar->data, sizeof(result->data)) < 0;
}

// Secp256k1 scalar conditional add bit
static void secp256k1_scalar_cadd_bit(secp256k1_scalar *scalar, unsigned int bit, int flag) {

	// Check if flag is set
	if(flag) {
	
		// Initialize value to have the specified bit set
		uint8_t value[sizeof(scalar->data)] = {};
		value[sizeof(value) - 1 - bit / BITS_IN_A_BYTE] = 1 << (bit % BITS_IN_A_BYTE);
		
		// Add value to the scalar
		cx_math_add(scalar->data, scalar->data, value, sizeof(scalar->data));
	}
}

// Secp256k1 scalar set bytes
static void secp256k1_scalar_set_b32(secp256k1_scalar *scalar, const unsigned char *bytes, int *overflow) {

	// Set scalar to the bytes
	memcpy(scalar->data, bytes, sizeof(scalar->data));
	
	// Check if overflow is requested
	if(overflow) {
	
		// Set overflow to if the scalar overflows
		*overflow = secp256k1_scalar_check_overflow(scalar);
	}
	
	// Reduce the scalar by the curve order
	cx_math_modm(scalar->data, sizeof(scalar->data), SECP256K1_CURVE_ORDER, sizeof(SECP256K1_CURVE_ORDER));
}

// Secp256k1 scalar get bytes
static void secp256k1_scalar_get_b32(unsigned char *bytes, const secp256k1_scalar *scalar) {

	// Set bytes to the scalar
	memcpy(bytes, scalar->data, sizeof(scalar->data));
}

// Secp256k1 scalar is zero
static int secp256k1_scalar_is_zero(const secp256k1_scalar *scalar) {

	// Return if scalar is zero
	return cx_math_is_zero(scalar->data, sizeof(scalar->data));
}

// Secp256k1 scalar negate
static void secp256k1_scalar_negate(secp256k1_scalar *result, const secp256k1_scalar *scalar) {

	// Check if scalar is zero
	if(secp256k1_scalar_is_zero(scalar)) {
	
		// Clear the result
		secp256k1_scalar_clear(result);
	}
	
	// Otherwise
	else {
	
		// Set result to the curve order minus the scalar
		cx_math_sub(result->data, SECP256K1_CURVE_ORDER, scalar->data, sizeof(scalar->data));
	}
}

// Secp256k1 scalar is one
static int secp256k1_scalar_is_one(const secp256k1_scalar *scalar) {

	// Initialize one
	uint8_t one[sizeof(scalar->data)] = {};
	one[sizeof(one) - 1] = 1;
	
	// Return if scalar is equal to one
	return !memcmp(scalar->data, one, sizeof(scalar->data));
}

// Secp256k1 scalar is high
static int secp256k1_scalar_is_high(const secp256k1_scalar *scalar) {

	// Return if scalar is greater than half the curve order
	return cx_math_cmp(scalar->data, SECP256k1_CURVE_ORDER_HALF, sizeof(scalar->data)) > 0;
}

// Secp256k1 scalar conditional negate
static int secp256k1_scalar_cond_negate(secp256k1_scalar *scalar, int flag) {

	// Check if flag is set
	if(flag) {
	
		// Negate the scalar
		secp256k1_scalar_negate(scalar, scalar);
	}
	
	// Return if flag was set
	return flag ? SCALAR_NEGATED : SCALAR_NOT_NEGATED;
}

// Secp256k1 scalar multiply
static void secp256k1_scalar_mul(secp256k1_scalar *result, const secp256k1_scalar *firstScalar, const secp256k1_scalar *secondScalar) {

	// Set result to the product of the two scalars modulo the curve order
	cx_math_multm(result->data, firstScalar->data, secondScalar->data, SECP256K1_CURVE_ORDER, sizeof(result->data));
}

// Secp256k1 scalar shift right
static int secp256k1_scalar_shr_int(secp256k1_scalar *scalar, int bits) {

	// Get value of shifted bits
	int shiftedValue = U2BE(scalar->data, sizeof(scalar->data) - sizeof(uint16_t)) & ((1 << bits) - 1);
	
	// Go through all bytes in the scalar
	for(size_t i = 1; i <= sizeof(scalar->data); ++i) {
	
		// Shift byte by specified number of bits
		scalar->data[sizeof(scalar->data) - i] = (scalar->data[sizeof(scalar->data) - i] >> bits) | ((i < sizeof(scalar->data) && bits <= BITS_IN_A_BYTE) ? (scalar->data[sizeof(scalar->data) - i - 1] << (BITS_IN_A_BYTE - bits)) : 0) | ((i < sizeof(scalar->data) - 1 && bits > BITS_IN_A_BYTE) ? (scalar->data[sizeof(scalar->data) - i - 2] << (BITS_IN_A_BYTE * 2 - bits)) : 0);
	}
	
	// Return shifted value
	return shiftedValue;
}

// Secp256k1 scalar square
static void secp256k1_scalar_sqr(secp256k1_scalar *result, const secp256k1_scalar *scalar) {

	// Set result to the scalar square
	const uint8_t two[] = {2};
	cx_math_powm(result->data, scalar->data, two, sizeof(two), SECP256K1_CURVE_ORDER, sizeof(scalar->data));
}

// Secp256k1 scalar ChaCha20
static void secp256k1_scalar_chacha20(secp256k1_scalar *firstScalar, secp256k1_scalar *secondScalar, const unsigned char *seed, uint64_t index) {

	// Go through counter values
	for(uint32_t counter = 0;; ++counter) {
	
		// Initiaize ChaCha20 state
		struct ChaCha20Poly1305State chaCha20Poly1305State;
		
		const uint32_t nonce[] = {
			index >> (sizeof(uint32_t) * BITS_IN_A_BYTE),
			0,
			counter
		};
		
		initializeChaCha20Poly1305(&chaCha20Poly1305State, seed, (uint8_t *)nonce, NULL, 0, index);

		// Get ChaCha20 current state
		uint32_t chaCha20CurrentState[ARRAYLEN(chaCha20Poly1305State.chaCha20OriginalState)];
		initializeChaCha20CurrentState(&chaCha20Poly1305State, chaCha20CurrentState);
		
		// Set scalars to the ChaCha20 current state
		memcpy(firstScalar->data, chaCha20CurrentState, sizeof(firstScalar->data));
		memcpy(secondScalar->data, &chaCha20CurrentState[ARRAYLEN(chaCha20CurrentState) / 2], sizeof(secondScalar->data));
		
		// Check if scalars don't overflow
		if(!secp256k1_scalar_check_overflow(firstScalar) && !secp256k1_scalar_check_overflow(secondScalar)) {

			// Break
			break;
		}
	}
}


#endif
