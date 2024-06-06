// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "chacha20_poly1305.h"
#include "common.h"


// Constants

// Key
static const uint8_t KEY[] = {0xF7, 0x83, 0xCD, 0xC5, 0xCC, 0x08, 0xFD, 0xBF, 0x35, 0x78, 0x07, 0x31, 0x8B, 0xAC, 0x50, 0xAE, 0xA2, 0x09, 0x8E, 0x22, 0x19, 0xA1, 0xB4, 0xA4, 0xFE, 0xA2, 0x20, 0x72, 0x6A, 0x16, 0x2B, 0xB3};

// Nonce
static const uint8_t NONCE[] = {0x01, 0x2E, 0x85, 0xE1, 0x6B, 0x30, 0x8D, 0xDA, 0x67, 0x90, 0x3D, 0x53};

// Additional authenticated data
static const uint8_t ADDITIONAL_AUTHENTICATED_DATA[] = {0x05, 0xF6, 0x8E};

// Counter
static const uint32_t COUNTER = 2;

// Data
static const uint8_t DATA[] = {0xC1, 0x24, 0xF0, 0xC2, 0x1E, 0x68, 0xBD, 0x63, 0x7A, 0x71, 0x5B, 0xF0, 0xF4, 0x34, 0x6D, 0x43, 0x30, 0x82, 0x83, 0xB1, 0xDE, 0x99, 0x43, 0x10, 0x50, 0x78, 0xF6, 0x04, 0x4A, 0x28, 0x96, 0x12, 0x1F, 0x6B, 0xDA, 0xF1, 0x0E, 0xA3, 0x14, 0xB9, 0x9B, 0x2F, 0xDB, 0xE7, 0xB7, 0x72, 0xE2, 0xF6, 0xB1, 0x04, 0x1C, 0xE6, 0xB1, 0x82, 0x08, 0x62, 0xAB, 0x2E, 0xC7, 0xF4, 0x8C, 0xFF, 0x80};

// Encrypted data
static const uint8_t ENCRYPTED_DATA[] = {0xB2, 0xFC, 0xF4, 0xBB, 0xC0, 0x68, 0x01, 0xC8, 0x48, 0x2E, 0x5A, 0x26, 0x6E, 0xE5, 0xAC, 0x4C, 0xC1, 0x0C, 0xBF, 0xBB, 0xBF, 0x58, 0xD0, 0xFD, 0x53, 0xEB, 0x71, 0x62, 0x15, 0x80, 0x03, 0x59, 0xF7, 0x2B, 0x6F, 0x01, 0x28, 0x5F, 0x92, 0xBE, 0xA4, 0x3F, 0x81, 0x47, 0x48, 0x20, 0xEB, 0xA5, 0x4E, 0x3E, 0x40, 0x6E, 0x4A, 0x9F, 0xEC, 0x24, 0xF5, 0x36, 0x8D, 0xA8, 0x0E, 0x08, 0x32};

// Tag
static const uint8_t TAG[] = {0xE1, 0x4E, 0x5B, 0x71, 0x8D, 0xBF, 0x28, 0x27, 0x99, 0x2F, 0xF1, 0xB8, 0x7B, 0x82, 0x8B, 0x99};

// Resulting state
static const uint32_t RESULTING_STATE[] = {0xF21449CE, 0x56DB77AB, 0x8E746008, 0x3A5E31C2, 0xC20FDB13, 0x6D1966A2, 0x153D274D, 0xC910399F, 0x4A46A8CF, 0xA57954F9, 0x5AC28FC, 0xC2682DE6, 0xB4850F1D, 0xE7F9EF29, 0x40EA2006, 0xDFAC72F2};

// Function prototypes

// Test encrypt
static void testEncrypt(void **state);

// Test decrypt
static void testDecrypt(void **state);

// Test resulting state
static void testResultingState(void **state);


// Main function
int main(void) {

	// Initialize tests
	const struct CMUnitTest tests[] = {
	
		// Test encrypt
		cmocka_unit_test(testEncrypt),
		
		// Test decrypt
		cmocka_unit_test(testDecrypt),
		
		// Test resulting state
		cmocka_unit_test(testResultingState)
	};
	
	// Return performing tests
	return cmocka_run_group_tests(tests, NULL, NULL);
}


// Supporting function implementation

// Test encrypt
void testEncrypt(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Initialize ChaCha20 Poly1305 state
			ChaCha20Poly1305State chaCha20Poly1305State;
			initializeChaCha20Poly1305(&chaCha20Poly1305State, KEY, NONCE, ADDITIONAL_AUTHENTICATED_DATA, sizeof(ADDITIONAL_AUTHENTICATED_DATA), COUNTER, NULL);
			
			// Encrypt the data
			uint8_t encryptedData[sizeof(DATA)];
			encryptChaCha20Poly1305Data(&chaCha20Poly1305State, encryptedData, DATA, sizeof(DATA));
			
			// Assert encrypted data is correct
			assert_memory_equal(encryptedData, ENCRYPTED_DATA, sizeof(ENCRYPTED_DATA));
			
			// Get tag
			uint8_t tag[POLY1305_TAG_SIZE];
			getChaCha20Poly1305Tag(&chaCha20Poly1305State, tag);
			
			// Assert tag is correct
			assert_memory_equal(tag, TAG, sizeof(TAG));
		}

		// Catch all errors
		CATCH_ALL {

			// Close try
			CLOSE_TRY;

			// Fail test
			assert_true(false);
		}

		// Finally
		FINALLY {
		}
	}

	// End try
	END_TRY;
}

// Test decrypt
void testDecrypt(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Initialize ChaCha20 Poly1305 state
			ChaCha20Poly1305State chaCha20Poly1305State;
			initializeChaCha20Poly1305(&chaCha20Poly1305State, KEY, NONCE, ADDITIONAL_AUTHENTICATED_DATA, sizeof(ADDITIONAL_AUTHENTICATED_DATA), COUNTER, NULL);
			
			// Decrypt the encrypted data
			uint8_t data[sizeof(ENCRYPTED_DATA)];
			decryptChaCha20Poly1305Data(&chaCha20Poly1305State, data, ENCRYPTED_DATA, sizeof(ENCRYPTED_DATA));
			
			// Assert data is correct
			assert_memory_equal(data, DATA, sizeof(DATA));
			
			// Get tag
			uint8_t tag[POLY1305_TAG_SIZE];
			getChaCha20Poly1305Tag(&chaCha20Poly1305State, tag);
			
			// Assert tag is correct
			assert_memory_equal(tag, TAG, sizeof(TAG));
		}

		// Catch all errors
		CATCH_ALL {

			// Close try
			CLOSE_TRY;

			// Fail test
			assert_true(false);
		}

		// Finally
		FINALLY {
		}
	}

	// End try
	END_TRY;
}

// Test resulting state
void testResultingState(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Initialize ChaCha20 Poly1305 state
			ChaCha20Poly1305State chaCha20Poly1305State;
			uint32_t resultingState[CHACHA20_STATE_SIZE];
			initializeChaCha20Poly1305(&chaCha20Poly1305State, KEY, NONCE, ADDITIONAL_AUTHENTICATED_DATA, sizeof(ADDITIONAL_AUTHENTICATED_DATA), COUNTER, resultingState);
			
			// Assert resulting state is correct
			assert_memory_equal(resultingState, RESULTING_STATE, sizeof(RESULTING_STATE));
		}

		// Catch all errors
		CATCH_ALL {

			// Close try
			CLOSE_TRY;

			// Fail test
			assert_true(false);
		}

		// Finally
		FINALLY {
		}
	}

	// End try
	END_TRY;
}
