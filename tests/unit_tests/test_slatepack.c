// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "currency_information.h"
#include "slatepack.h"


// Constants

// Public key
static const uint8_t PUBLIC_KEY[] = {0x02, 0x5d, 0x80, 0xae, 0xdd, 0x9d, 0x8a, 0x6d, 0x83, 0xfb, 0xbc, 0xd8, 0x10, 0x7e, 0x0a, 0x4e, 0x55, 0x55, 0x7f, 0xf8, 0x1c, 0xbc, 0x21, 0x4d, 0xa4, 0x7b, 0x80, 0x25, 0xfc, 0x1d, 0xd0, 0x73, 0x6b};

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
	char address[SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart) + sizeof((char)'\0')];
	getSlatepackAddressFromPublicKey(address, PUBLIC_KEY);
	address[SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart)] = '\0';
	
	// Assert address is correct
	assert_string_equal(address, ADDRESS);
}
