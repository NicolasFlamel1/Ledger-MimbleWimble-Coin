// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "tor.h"


// Constants

// Public key
static const uint8_t PUBLIC_KEY[] = {0x02, 0x5d, 0x80, 0xae, 0xdd, 0x9d, 0x8a, 0x6d, 0x83, 0xfb, 0xbc, 0xd8, 0x10, 0x7e, 0x0a, 0x4e, 0x55, 0x55, 0x7f, 0xf8, 0x1c, 0xbc, 0x21, 0x4d, 0xa4, 0x7b, 0x80, 0x25, 0xfc, 0x1d, 0xd0, 0x73, 0x6b};

// Address
static const char ADDRESS[] = "ajoyblw5twfg3a73xtmba7qkjzkvk77yds6cctnepoacl7a52bzrfcqd";


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

	// TODO
}
