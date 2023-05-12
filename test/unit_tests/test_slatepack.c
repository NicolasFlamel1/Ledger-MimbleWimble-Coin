// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "slatepack.h"


// Constants

// Public key
static const uint8_t PUBLIC_KEY[] = {0x02, 0x5D, 0x80, 0xAE, 0xDD, 0x9D, 0x8A, 0x6D, 0x83, 0xFB, 0xBC, 0xD8, 0x10, 0x7E, 0x0A, 0x4E, 0x55, 0x55, 0x7F, 0xF8, 0x1C, 0xBC, 0x21, 0x4D, 0xA4, 0x7B, 0x80, 0x25, 0xFC, 0x1D, 0xD0, 0x73, 0x6B};

// Address
static const char ADDRESS[] = "grin1qfwcptkank9xmqlmhnvpqls2fe242llcrj7zzndy0wqztlqa6pesjxw5uq";


// Function prototypes

// Test get Slatepack address from public key
static void testGetSlatepackAddressFromPublicKey(void **state);


// Main function
int main(void) {

	// Initialize tests
	const struct CMUnitTest tests[] = {
	
		// Test get Slatepack address from public key
		cmocka_unit_test(testGetSlatepackAddressFromPublicKey)
	};
	
	// Return performing tests
	return cmocka_run_group_tests(tests, NULL, NULL);
}


// Supporting function implementation

// Test get Slatepack address from public key
void testGetSlatepackAddressFromPublicKey(void **state) {

	// Get address from the public key
	char address[SLATEPACK_ADDRESS_SIZE + sizeof((char)'\0')];
	getSlatepackAddressFromPublicKey(address, PUBLIC_KEY);
	address[SLATEPACK_ADDRESS_SIZE] = '\0';
	
	// Assert address is correct
	assert_string_equal(address, ADDRESS);
}
