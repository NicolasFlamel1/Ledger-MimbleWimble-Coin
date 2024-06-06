// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "mqs.h"
#include "common.h"


// Constants

// Public key
static const uint8_t PUBLIC_KEY[] = {0x02, 0x5D, 0x80, 0xAE, 0xDD, 0x9D, 0x8A, 0x6D, 0x83, 0xFB, 0xBC, 0xD8, 0x10, 0x7E, 0x0A, 0x4E, 0x55, 0x55, 0x7F, 0xF8, 0x1C, 0xBC, 0x21, 0x4D, 0xA4, 0x7B, 0x80, 0x25, 0xFC, 0x1D, 0xD0, 0x73, 0x6B};

// Address
static const char ADDRESS[] = "q5XXVCnRD1z47iRorB3F2aiZ546PedVTNZCgDdk4zjZ33KAt9XnC";


// Function prototypes

// Test get MQS address from public key
static void testGetMqsAddressFromPublicKey(void **state);


// Main function
int main(void) {

	// Initialize tests
	const struct CMUnitTest tests[] = {
	
		// Test get MQS address from public key
		cmocka_unit_test(testGetMqsAddressFromPublicKey)
	};
	
	// Return performing tests
	return cmocka_run_group_tests(tests, NULL, NULL);
}


// Supporting function implementation

// Test get MQS address from public key
void testGetMqsAddressFromPublicKey(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get address from the public key
			char address[MQS_ADDRESS_SIZE + sizeof((char)'\0')];
			getMqsAddressFromPublicKey(address, PUBLIC_KEY);
			address[MQS_ADDRESS_SIZE] = '\0';
			
			// Assert address is correct
			assert_string_equal(address, ADDRESS);
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
