// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "tor.h"
#include "common.h"


// Constants

// Public key
static const uint8_t PUBLIC_KEY[] = {0xD4, 0x45, 0x40, 0x6B, 0xDA, 0xA3, 0x39, 0x80, 0x19, 0x39, 0xFF, 0x3B, 0x4D, 0x24, 0x2E, 0x53, 0x34, 0x59, 0x86, 0x40, 0xBC, 0xC0, 0x85, 0xA9, 0xAB, 0x52, 0x05, 0x9B, 0x4D, 0x48, 0xEF, 0x7E};

// Address
static const char ADDRESS[] = "2rcua262um4yagjz745u2jbokm2ftbsaxtailknlkiczwtki557nfcad";


// Function prototypes

// Test get Tor address from public key
static void testGetTorAddressFromPublicKey(void **state);


// Main function
int main(void) {

	// Initialize tests
	const struct CMUnitTest tests[] = {
	
		// Test get Tor address from public key
		cmocka_unit_test(testGetTorAddressFromPublicKey)
	};
	
	// Return performing tests
	return cmocka_run_group_tests(tests, NULL, NULL);
}


// Supporting function implementation

// Test get Tor address from public key
void testGetTorAddressFromPublicKey(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get address from the public key
			char address[TOR_ADDRESS_SIZE + sizeof((char)'\0')];
			getTorAddressFromPublicKey(address, PUBLIC_KEY);
			address[TOR_ADDRESS_SIZE] = '\0';
			
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
