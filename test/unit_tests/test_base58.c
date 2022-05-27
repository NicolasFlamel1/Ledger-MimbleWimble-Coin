// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <string.h>
#include <cmocka.h>
#include "base58.h"


// Constants

// Input
static const uint8_t INPUT[] = {0x00, 0x14, 0x75, 0x1E, 0x76, 0xE8, 0x19, 0x91, 0x96, 0xD4, 0x54, 0x94, 0x1C, 0x45, 0xD1, 0xB3, 0xA3, 0x23, 0xF1, 0x43, 0x3B, 0xD6};

// Output
static const char OUTPUT[] = "19ESLFKrNZg8HVyyiiAmhXMriiCbREoNCY3";

// Checksum
static const uint8_t CHECKSUM[] = {0x51, 0xE7, 0x8A, 0xDC};


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
	uint8_t temp[sizeof(INPUT) + BASE58_CHECKSUM_SIZE];
	memcpy(temp, INPUT, sizeof(INPUT));
	const size_t outputLength = getBase58EncodedLengthWithChecksum(temp, sizeof(INPUT));
	
	// Assert output length is correct
	assert_int_equal(outputLength, sizeof(OUTPUT) - sizeof((char)'\0'));
	
	// Get output by encoding input
	char output[outputLength + sizeof((char)'\0')];
	base58EncodeWithChecksum(output, temp, sizeof(temp));
	output[outputLength] = '\0';
	
	// Assert output is correct
	assert_string_equal(output, OUTPUT);
}

// Test Decode
void testDecode(void **state) {

	// Get input length
	const size_t inputLength = getBase58DecodedLengthWithChecksum(OUTPUT, sizeof(OUTPUT) - sizeof((char)'\0'));
	
	// Assert input length is correct
	assert_int_equal(inputLength - BASE58_CHECKSUM_SIZE, sizeof(INPUT));
	
	// Get input by decoding output
	uint8_t input[inputLength];
	base58DecodeWithChecksum(input, OUTPUT, sizeof(OUTPUT) - sizeof((char)'\0'));
	
	// Assert input is correct
	assert_memory_equal(input, INPUT, sizeof(INPUT));
	
	// Assert input's checksum is correct
	assert_memory_equal(&input[inputLength - BASE58_CHECKSUM_SIZE], CHECKSUM, sizeof(CHECKSUM));
}
