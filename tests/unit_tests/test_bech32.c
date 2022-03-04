// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "bech32.h"


// Function prototypes

// Test Bech32
static void testBech32(void **state);


// Main function
int main(void) {

	// Initialize tests
	const struct CMUnitTest tests[] = {
	
		// Test Bech32
		cmocka_unit_test(testBech32)
	};
	
	// Return performing tests
	return cmocka_run_group_tests(tests, NULL, NULL);
}


// Supporting function implementation

// Test Bech32
void testBech32(void **state) {

	// Constants
	const uint8_t INPUT[] = {0x00, 0x14, 0x75, 0x1e, 0x76, 0xe8, 0x19, 0x91, 0x96, 0xd4, 0x54, 0x94, 0x1c, 0x45, 0xd1, 0xb3, 0xa3, 0x23, 0xf1, 0x43, 0x3b, 0xd6};
	const char *HUMAN_READABLE_PART = "hrp";
	const char OUTPUT[] = "hrp1qq2828nkaqver9k52j2pc3w3kw3j8u2r80tqyrjeaq";
	
	// Get output length
	const size_t outputLength = getBech32EncodedLength(sizeof(INPUT), HUMAN_READABLE_PART);
	
	// Assert output length is valid
	assert_int_equal(outputLength, sizeof(OUTPUT) - sizeof((char)'\0'));
	
	// Get output
	char output[outputLength + sizeof((char)'\0')];
	bech32Encode(output, INPUT, sizeof(INPUT), HUMAN_READABLE_PART);
	output[outputLength] = '\0';
	
	// Assert output is valid
	assert_string_equal(output, OUTPUT);
	
	// Get input length
	const size_t inputLength = getBech32DecodedLength(OUTPUT, sizeof(OUTPUT) - sizeof((char)'\0'));
	
	// Assert input length is valid
	assert_int_equal(inputLength, sizeof(INPUT));
	
	// Get input
	uint8_t input[inputLength];
	bech32Decode(input, OUTPUT, sizeof(OUTPUT) - sizeof((char)'\0'));
	
	// Assert input is valid
	assert_memory_equal(input, INPUT, sizeof(INPUT));
}
