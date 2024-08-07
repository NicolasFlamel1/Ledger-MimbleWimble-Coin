// Header files
#include <stdio.h>
#include "common.h"
#include "crypto.h"
#include "mqs.h"
#include "storage.h"


// Main function
int main(void) {

	{
		// Display message
		printf("Testing try_context_get, try_context_set, and os_longjmp\n");
		
		// Begin try
		volatile int result = 0;
		BEGIN_TRY {

			// Try
			TRY {
			
				// Update result
				result |= 0b00000001;
				
				// Throw error
				THROW(INTERNAL_ERROR_ERROR);
				
				// Update result
				result |= 0b00000010;
			}

			// Catch all errors
			CATCH_ALL {
			
				// Update result
				result |= 0b00000100;
			}

			// Finally
			FINALLY {
			
				// Update result
				result |= 0b00001000;
			}
		}

		// End try
		END_TRY;
		
		// Check if test was successful
		if(result == 0b00001101) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	// Check if fuzzing
	#ifdef FUZZING
	
		{
			// Display message
			printf("Testing pic and nvm_write\n");
			
			// Set storage to invalid value
			storage.currentTransactionSecretNonceIndex = NUMBER_OF_TRANSACTION_SECRET_NONCES;
			
			// Initialize storage to reset it
			initializeStorage();
			
			// Check if test was successful
			if(!storage.currentTransactionSecretNonceIndex) {
			
				// Display message
				printf("Test succeeded\n");
			}
			
			// Otherwise
			else {
			
				// Display message
				printf("Test failed\n");
				
				// Return failure
				return 1;
			}
		}
	#endif
	
	{
	
		// Display message
		printf("Testing cx_sha256_init_no_throw and cx_hash_no_throw\n");
		
		// Hash values
		cx_sha256_t hash;
		cx_sha256_init(&hash);
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, 0, (uint8_t[]){0x01, 0x02, 0x03, 0x04, 0x05}, 5, NULL, 0));
		uint8_t output[CX_SHA256_SIZE];
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, CX_LAST, (uint8_t[]){0x06, 0x07, 0x08, 0x09, 0x0A}, 5, output, sizeof(output)));
		
		// Check if test was successful
		if(!memcmp(output, (uint8_t[]){0xC8, 0x48, 0xE1, 0x01, 0x3F, 0x9F, 0x04, 0xA9, 0xD6, 0x3F, 0xA4, 0x3C, 0xE7, 0xFD, 0x4A, 0xF0, 0x35, 0x15, 0x2C, 0x7C, 0x66, 0x9A, 0x4A, 0x40, 0x4B, 0x67, 0x10, 0x7C, 0xEE, 0x5F, 0x2E, 0x4E}, sizeof(output))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_sha3_init_no_throw\n");
		
		// Hash values
		cx_sha3_t hash;
		CX_THROW(cx_sha3_init_no_throw(&hash, CX_SHA256_SIZE * BITS_IN_A_BYTE));
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, 0, (uint8_t[]){0x01, 0x02, 0x03, 0x04, 0x05}, 5, NULL, 0));
		uint8_t output[CX_SHA256_SIZE];
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, CX_LAST, (uint8_t[]){0x06, 0x07, 0x08, 0x09, 0x0A}, 5, output, sizeof(output)));
		
		// Check if test was successful
		if(!memcmp(output, (uint8_t[]){0x32, 0xBC, 0xD1, 0xAC, 0x22, 0x44, 0x8A, 0x51, 0xC8, 0xD8, 0x92, 0xC4, 0xE0, 0xA6, 0x2F, 0xDF, 0x43, 0x9D, 0x25, 0xAE, 0x72, 0xEE, 0x7E, 0xEC, 0x1E, 0x3B, 0x24, 0xF1, 0x8D, 0x6E, 0x50, 0xDF}, sizeof(output))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_hash_sha256\n");
		
		// Hash values
		uint8_t output[CX_SHA256_SIZE];
		cx_hash_sha256((uint8_t[]){0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A}, 10, output, sizeof(output));
		
		// Check if test was successful
		if(!memcmp(output, (uint8_t[]){0xC8, 0x48, 0xE1, 0x01, 0x3F, 0x9F, 0x04, 0xA9, 0xD6, 0x3F, 0xA4, 0x3C, 0xE7, 0xFD, 0x4A, 0xF0, 0x35, 0x15, 0x2C, 0x7C, 0x66, 0x9A, 0x4A, 0x40, 0x4B, 0x67, 0x10, 0x7C, 0xEE, 0x5F, 0x2E, 0x4E}, sizeof(output))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_hash_sha512\n");
		
		// Hash values
		uint8_t output[CX_SHA512_SIZE];
		cx_hash_sha512((uint8_t[]){0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A}, 10, output, sizeof(output));
		
		// Check if test was successful
		if(!memcmp(output, (uint8_t[]){0xF5, 0xA5, 0x68, 0x21, 0xF7, 0x7A, 0xC3, 0xA3, 0xA4, 0x9B, 0x7D, 0x39, 0x46, 0x3F, 0x2E, 0xE1, 0x91, 0xC4, 0x33, 0xF6, 0x89, 0x0D, 0xBF, 0x59, 0x0B, 0xE3, 0x73, 0xC0, 0x5D, 0x80, 0x60, 0x56, 0xFA, 0xD5, 0x19, 0x6B, 0x3B, 0xEE, 0x17, 0x75, 0x8C, 0x63, 0xE6, 0xC8, 0x4F, 0xED, 0x97, 0x56, 0x4A, 0x23, 0xE6, 0xD0, 0xA0, 0x03, 0x81, 0x1A, 0xE8, 0xE2, 0xF6, 0xC6, 0xB0, 0xEB, 0x49, 0x0A}, sizeof(output))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_math_add_no_throw\n");
		
		// Add values
		uint8_t value[PUBLIC_KEY_COMPONENT_SIZE] = {0x01, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};
		CX_THROW(cx_math_add_no_throw(value, value, (uint8_t[]){0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07}, sizeof(value)));
		
		// Check if test was successful
		if(!memcmp(value, (uint8_t[]){0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06}, sizeof(value))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_math_addm_no_throw\n");
		
		// Add values and modulo the result
		uint8_t value[PUBLIC_KEY_COMPONENT_SIZE] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x40};
		CX_THROW(cx_math_addm_no_throw(value, value, (uint8_t[]){0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07}, (uint8_t[]){0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x41}, sizeof(value)));
		
		// Check if test was successful
		if(!memcmp(value, (uint8_t[]){0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06}, sizeof(value))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_math_subm_no_throw\n");
		
		// Subtract values and modulo the result
		uint8_t value[PUBLIC_KEY_COMPONENT_SIZE] = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07};
		CX_THROW(cx_math_subm_no_throw(value, value, (uint8_t[]){0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x40}, (uint8_t[]){0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x41}, sizeof(value)));
		
		// Check if test was successful
		if(!memcmp(value, (uint8_t[]){0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08}, sizeof(value))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_math_multm_no_throw\n");
		
		// Multiply values and modulo the result
		uint8_t value[PUBLIC_KEY_COMPONENT_SIZE] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x40};
		CX_THROW(cx_math_multm_no_throw(value, value, (uint8_t[]){0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x40}, (uint8_t[]){0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x41}, sizeof(value)));
		
		// Check if test was successful
		if(!memcmp(value, (uint8_t[]){0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01}, sizeof(value))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_math_powm_no_throw\n");
		
		// Exponent values and modulo the result
		uint8_t value[PUBLIC_KEY_COMPONENT_SIZE] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x40};
		CX_THROW(cx_math_powm_no_throw(value, value, (uint8_t[]){0x02}, 1, (uint8_t[]){0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x41}, sizeof(value)));
		
		// Check if test was successful
		if(!memcmp(value, (uint8_t[]){0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01}, sizeof(value))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_math_invprimem_no_throw\n");
		
		// Invert value and modulo the result
		uint8_t value[PUBLIC_KEY_COMPONENT_SIZE] = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07};
		CX_THROW(cx_math_invprimem_no_throw(value, value, (uint8_t[]){0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x41}, sizeof(value)));
		
		// Check if test was successful
		if(!memcmp(value, (uint8_t[]){0x49, 0x24, 0x92, 0x49, 0x24, 0x92, 0x49, 0x24, 0x92, 0x49, 0x24, 0x92, 0x49, 0x24, 0x92, 0x48, 0xC7, 0x9F, 0xAC, 0xD4, 0x32, 0x14, 0xC0, 0x11, 0x12, 0x3C, 0x1B, 0x03, 0xA9, 0x34, 0x12, 0xA5}, sizeof(value))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_math_modm_no_throw\n");
		
		// Modulo value
		uint8_t value[PUBLIC_KEY_COMPONENT_SIZE] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x43};
		CX_THROW(cx_math_modm_no_throw(value, sizeof(value), (uint8_t[]){0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x41}, sizeof(value)));
		
		// Check if test was successful
		if(!memcmp(value, (uint8_t[]){0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02}, sizeof(value))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_math_cmp_no_throw\n");
		
		// Compare values
		int result;
		CX_THROW(cx_math_cmp_no_throw((uint8_t[]){0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x42}, (uint8_t[]){0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x41}, PUBLIC_KEY_COMPONENT_SIZE, &result));
		
		// Check if test was successful
		if(result > 0) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_ecfp_scalar_mult_no_throw and cx_ecfp_add_point_no_throw\n");
		
		// Commit value
		uint8_t commitment[COMMITMENT_SIZE];
		commitValue(commitment, 123456, (uint8_t[]){0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01}, false);
		
		// Check if test was successful
		if(!memcmp(commitment, (uint8_t[]){0x09, 0x06, 0x45, 0x13, 0x29, 0xCD, 0x03, 0x21, 0x23, 0x64, 0x49, 0x95, 0x50, 0xFC, 0x0D, 0xFE, 0xBF, 0x0A, 0xA1, 0xB8, 0xD2, 0x41, 0xBD, 0xF4, 0x85, 0x98, 0x74, 0xC7, 0xB2, 0xFB, 0x72, 0x3B, 0xB2}, sizeof(commitment))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_ecfp_init_public_key_no_throw\n");
		
		// Check if getting public key from MQS address failed
		cx_ecfp_public_key_t publicKey;
		if(!getPublicKeyFromMqsAddress(&publicKey, "q5XXVCnRD1z47iRorB3F2aiZ546PedVTNZCgDdk4zjZ33KAt9XnC", MQS_ADDRESS_SIZE)) {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
		
		// Check if test was successful
		if(publicKey.curve == CX_CURVE_SECP256K1 && publicKey.W_len == sizeof(publicKey.W) && !memcmp(publicKey.W, (uint8_t[]){0x04, 0x5D, 0x80, 0xAE, 0xDD, 0x9D, 0x8A, 0x6D, 0x83, 0xFB, 0xBC, 0xD8, 0x10, 0x7E, 0x0A, 0x4E, 0x55, 0x55, 0x7F, 0xF8, 0x1C, 0xBC, 0x21, 0x4D, 0xA4, 0x7B, 0x80, 0x25, 0xFC, 0x1D, 0xD0, 0x73, 0x6B, 0xE1, 0x1C, 0xAD, 0xBB, 0xA2, 0x32, 0xC2, 0x4A, 0x02, 0x17, 0x74, 0x92, 0xF6, 0xDC, 0x86, 0x39, 0x26, 0x7C, 0xDB, 0x00, 0x88, 0xF4, 0x20, 0x86, 0x99, 0xD6, 0xB8, 0xB6, 0xC8, 0xC5, 0x2E, 0xA8}, publicKey.W_len)) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_ecfp_generate_pair_no_throw\n");
		
		// Get public key
		cx_ecfp_private_key_t privateKey;
		getPrivateKeyAndChainCode(&privateKey, NULL, 0);
		uint8_t publicKey[COMPRESSED_PUBLIC_KEY_SIZE];
		getPublicKeyFromPrivateKey(publicKey, &privateKey);
		
		// Check if test was successful
		if(!memcmp(publicKey, (uint8_t[]){0x03, 0x7E, 0xD6, 0xCE, 0x5A, 0x1C, 0x46, 0xC5, 0xF7, 0x4F, 0x73, 0xCC, 0xDC, 0x23, 0xC7, 0xB9, 0x0C, 0x1B, 0xF7, 0xDD, 0xD9, 0xEC, 0x8F, 0xBA, 0xD6, 0xD4, 0xE1, 0x85, 0x16, 0x34, 0x75, 0x4F, 0x43}, sizeof(publicKey))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_pbkdf2_no_throw\n");
		
		// Perform PBKDF2
		uint8_t result[MQS_SHARED_PRIVATE_KEY_SIZE];
		CX_THROW(cx_pbkdf2_no_throw(CX_SHA512, (uint8_t[]){0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01}, 32, (uint8_t[]){0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08}, MQS_SHARED_PRIVATE_KEY_SALT_SIZE, 100, result, sizeof(result)));
		
		// Check if test was successful
		if(!memcmp(result, (uint8_t[]){0xA8, 0x9A, 0x28, 0xCE, 0x32, 0xDF, 0xFC, 0x4A, 0xBC, 0x85, 0x58, 0xDD, 0x40, 0xFA, 0xA5, 0x7C, 0xC9, 0x79, 0x75, 0x6C, 0xF5, 0x6D, 0x5D, 0x84, 0x8F, 0xEB, 0x1E, 0xD2, 0x7B, 0xC8, 0xC4, 0x9D}, sizeof(result))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_ecfp_init_private_key_no_throw\n");
		
		// Get private key
		cx_ecfp_private_key_t privateKey;
		getPrivateKeyAndChainCode(&privateKey, NULL, 0);
		
		// Check if test was successful
		if(privateKey.curve == CX_CURVE_SECP256K1 && privateKey.d_len == sizeof(privateKey.d) && !memcmp(privateKey.d, (uint8_t[]){0x50, 0x75, 0x8B, 0x15, 0x3D, 0xE0, 0xA7, 0x2E, 0xDC, 0x0F, 0x0E, 0xE0, 0x4E, 0xC9, 0x7B, 0x84, 0xAF, 0xBD, 0x87, 0x06, 0x84, 0xB5, 0xCF, 0x58, 0x8B, 0xD0, 0xE6, 0x29, 0x56, 0x8D, 0x0D, 0xDA}, privateKey.d_len)) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_bn_lock, cx_bn_unlock, cx_ecpoint_alloc, cx_ecpoint_destroy, cx_ecpoint_init, cx_ecpoint_double_scalarmul, and cx_ecpoint_export\n");
		
		// Perform double scalar multiply
		uint8_t result[UNCOMPRESSED_PUBLIC_KEY_SIZE] = {};
		generatorDoublePointScalarMultiply(result, 0, (uint8_t[]){0xB3, 0x4D, 0x5F, 0xA6, 0xB8, 0xF3, 0xD1, 0x38, 0x49, 0xCE, 0x51, 0x91, 0xB7, 0xF6, 0x76, 0x18, 0xFE, 0x5B, 0xD1, 0x2A, 0x88, 0xB2, 0x0E, 0xAC, 0x33, 0x89, 0x45, 0x66, 0x7F, 0xB3, 0x30, 0x56}, (uint8_t[]){0x45, 0x76, 0x4C, 0x51, 0x27, 0xBA, 0xDE, 0xE8, 0xBE, 0x74, 0xC8, 0x8F, 0x9B, 0x55, 0xFC, 0xDD, 0x46, 0x69, 0x47, 0x21, 0x7F, 0x99, 0x85, 0xA8, 0x9E, 0x33, 0xD4, 0x92, 0xD3, 0x31, 0x02, 0x6E});
		
		// Check if test was successful
		if(!memcmp(result, (uint8_t[]){0x00, 0x1D, 0x3C, 0xB8, 0xB5, 0x3B, 0x9B, 0x19, 0x9B, 0xD3, 0xAB, 0xBB, 0x07, 0x08, 0xE3, 0x42, 0x20, 0x50, 0xAB, 0xDE, 0x33, 0xB9, 0x2D, 0x56, 0x7E, 0x3C, 0xEE, 0xE9, 0xA1, 0x71, 0x37, 0x47, 0x72, 0xD5, 0x20, 0x20, 0x2D, 0xE6, 0xC9, 0x07, 0x23, 0x54, 0x3D, 0xEF, 0xEE, 0xE0, 0xC1, 0x9F, 0x08, 0x6C, 0x84, 0x06, 0xC0, 0x4A, 0xAB, 0xD3, 0xE7, 0xD9, 0x8E, 0xAE, 0xBA, 0xAB, 0x6A, 0x09, 0x27}, sizeof(result))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_aes_init_key_no_throw and cx_aes_no_throw\n");
		
		// Encrypt value
		const uint8_t key[] = {0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01};
		const uint8_t data[] = {0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A};
		uint8_t encryptedData[getEncryptedDataLength(sizeof(data))];
		encryptData(encryptedData, data, sizeof(data), key, sizeof(key));
		
		// Decrypt encrypted data
		uint8_t decryptedData[sizeof(encryptedData)];
		const size_t decryptedDataSize = decryptData(decryptedData, encryptedData, sizeof(encryptedData), key, sizeof(key));
		
		// Check if test was successful
		if(!memcmp(encryptedData, (uint8_t[]){0x5F, 0x1B, 0xA4, 0xB5, 0x8F, 0xA1, 0xBD, 0x42, 0xE2, 0xEE, 0xF4, 0x39, 0x28, 0x96, 0x62, 0x95}, sizeof(encryptedData)) && !memcmp(decryptedData, data, decryptedDataSize)) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing cx_hmac_sha512\n");
		
		// MAC values
		uint8_t output[CX_SHA512_SIZE];
		cx_hmac_sha512((uint8_t[]){0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01}, 32, (uint8_t[]){0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A}, 10, output, sizeof(output));
		
		// Check if test was successful
		if(!memcmp(output, (uint8_t[]){0x50, 0xCD, 0x31, 0xAC, 0x70, 0xD4, 0xB5, 0xFD, 0xCC, 0x80, 0x2F, 0x71, 0xEF, 0x99, 0x1E, 0x36, 0x14, 0x76, 0x81, 0x7F, 0xE0, 0x4E, 0x42, 0xE2, 0xFB, 0x32, 0x5D, 0x9C, 0xC1, 0x03, 0xC5, 0x38, 0x0C, 0xC9, 0xEF, 0x45, 0x1C, 0xB8, 0x82, 0x6F, 0xA9, 0x2F, 0xC8, 0x3C, 0x44, 0x89, 0x3B, 0x43, 0x6B, 0x4D, 0xB4, 0xBA, 0x59, 0xFA, 0xB2, 0xB5, 0xA3, 0x16, 0xC9, 0xA9, 0xEB, 0x27, 0xCE, 0x3F}, sizeof(output))) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	// Check if fuzzing
	#ifdef FUZZING
	
		{
		
			// Display message
			printf("Testing cx_rng_no_throw\n");
			
			// Get random value
			uint8_t output[10];
			cx_rng(output, sizeof(output));
			
			// Check if test was successful
			if(!memcmp(output, (uint8_t[]){0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09}, sizeof(output))) {
			
				// Display message
				printf("Test succeeded\n");
			}
			
			// Otherwise
			else {
			
				// Display message
				printf("Test failed\n");
				
				// Return failure
				return 1;
			}
		}
	#endif
	
	// Check if fuzzing
	#ifdef FUZZING
	
		{
		
			// Display message
			printf("Testing os_perso_derive_node_with_seed_key\n");
			
			// Get private key and chain code
			uint8_t privateKey[64];
			uint8_t chainCode[32];
			CX_THROW(os_derive_bip32_with_seed_no_throw(HDW_NORMAL, CX_CURVE_SECP256K1, NULL, 0, privateKey, chainCode, NULL, 0));
			
			// Check if test was successful
			if(!memcmp(privateKey, (uint8_t[]){0x50, 0x75, 0x8B, 0x15, 0x3D, 0xE0, 0xA7, 0x2E, 0xDC, 0x0F, 0x0E, 0xE0, 0x4E, 0xC9, 0x7B, 0x84, 0xAF, 0xBD, 0x87, 0x06, 0x84, 0xB5, 0xCF, 0x58, 0x8B, 0xD0, 0xE6, 0x29, 0x56, 0x8D, 0x0D, 0xDA, 0x81, 0x83, 0x00, 0x60, 0x10, 0x13, 0x00, 0x20, 0x4A, 0x03, 0x00, 0x20, 0x58, 0x03, 0x00, 0x20, 0x50, 0x03, 0x00, 0x20, 0x4C, 0x03, 0x00, 0x20, 0x01, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x20}, sizeof(privateKey)) && !memcmp(chainCode, (uint8_t[]){0xC0, 0x49, 0x72, 0xDC, 0x22, 0xCB, 0xF4, 0x2F, 0x7E, 0x5D, 0x71, 0x8E, 0x43, 0xC7, 0x12, 0xF9, 0x54, 0x12, 0xCB, 0xA3, 0x0C, 0x38, 0xDE, 0xBB, 0x18, 0xF9, 0x85, 0x34, 0x74, 0x99, 0xA9, 0xB7}, sizeof(chainCode))) {
			
				// Display message
				printf("Test succeeded\n");
			}
			
			// Otherwise
			else {
			
				// Display message
				printf("Test failed\n");
				
				// Return failure
				return 1;
			}
		}
	#endif
	
	{
	
		// Display message
		printf("Testing os_secure_memcmp\n");
		
		// Check if test was successful
		if(!os_secure_memcmp((uint8_t[]){0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A}, (uint8_t[]){0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A}, 10)) {
		
			// Display message
			printf("Test succeeded\n");
		}
		
		// Otherwise
		else {
		
			// Display message
			printf("Test failed\n");
			
			// Return failure
			return 1;
		}
	}
	
	{
	
		// Display message
		printf("Testing os_sched_exit (this should crash the program to succeed)\n");
		
		// Exit application
		exitApplication();
		
		// Display message
		printf("Test failed\n");
		
		// Return failure
		return 1;
	}
	
	// Return success
	return 0;
}
