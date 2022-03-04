// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "base32.h"


// Constants

// Input
static const uint8_t INPUT[] = {0x00, 0x14, 0x75, 0x1e, 0x76, 0xe8, 0x19, 0x91, 0x96, 0xd4, 0x54, 0x94, 0x1c, 0x45, 0xd1, 0xb3, 0xa3, 0x23, 0xf1, 0x43, 0x3b, 0xd6};

// Output
static const char OUTPUT[] = "aakhkhtw5amzdfwukskbyrorworsh4kdhpla====";


// Function prototypes

// Test encode
static void testEncode(void **state);

// Test decode
static void testDecode(void **state);


// Main function
int main(void) {

	// Initialize tests
	const struct CMUnitTest tests[] = {
	
		// Test encode
		cmocka_unit_test(testEncode),
		
		// Test decode
		cmocka_unit_test(testDecode)
	};
	
	// Return performing tests
	return cmocka_run_group_tests(tests, NULL, NULL);
}


// Supporting function implementation

// Test Encode
void testEncode(void **state) {

	// Get output length
	const size_t outputLength = getBase32EncodedLength(sizeof(INPUT));
	
	// Assert output length is correct
	assert_int_equal(outputLength, sizeof(OUTPUT) - sizeof((char)'\0'));
	
	// Get output by encoding input
	char output[outputLength + sizeof((char)'\0')];
	base32Encode(output, INPUT, sizeof(INPUT));
	output[outputLength] = '\0';
	
	// Assert output is correct
	assert_string_equal(output, OUTPUT);
}

// Test Decode
void testDecode(void **state) {

	// Get input length
	const size_t inputLength = getBase32DecodedLength(OUTPUT, sizeof(OUTPUT) - sizeof((char)'\0'));
	
	// Assert input length is correct
	assert_int_equal(inputLength, sizeof(INPUT));
	
	// Get input by decoding output
	uint8_t input[inputLength];
	base32Decode(input, OUTPUT, sizeof(OUTPUT) - sizeof((char)'\0'));
	
	// Assert input is correct
	assert_memory_equal(input, INPUT, sizeof(INPUT));
}
