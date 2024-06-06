// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "base58.h"
#include "common.h"


// Constants

// Input
static const uint8_t INPUT[] = {0x00, 0x14, 0x75, 0x1E, 0x76, 0xE8, 0x19, 0x91, 0x96, 0xD4, 0x54, 0x94, 0x1C, 0x45, 0xD1, 0xB3, 0xA3, 0x23, 0xF1, 0x43, 0x3B, 0xD6};

// Output
static const char OUTPUT[] = "12FxnjQTEntrwaJWMQz295hzRDGuvm";

// Output with checksum
static const char OUTPUT_WITH_CHECKSUM[] = "19ESLFKrNZg8HVyyiiAmhXMriiCbREoNCY3";

// Checksum
static const uint8_t CHECKSUM[] = {0x51, 0xE7, 0x8A, 0xDC};


// Function prototypes

// Test encode
static void testEncode(void **state);

// Test decode
static void testDecode(void **state);

// Test encode with checksum
static void testEncodeWithChecksum(void **state);

// Test decode with checksum
static void testDecodeWithChecksum(void **state);


// Main function
int main(void) {

	// Initialize tests
	const struct CMUnitTest tests[] = {
	
		// Test encode
		cmocka_unit_test(testEncode),
		
		// Test decode
		cmocka_unit_test(testDecode),
		
		// Test encode with checksum
		cmocka_unit_test(testEncodeWithChecksum),
		
		// Test decode with checksum
		cmocka_unit_test(testDecodeWithChecksum)
	};
	
	// Return performing tests
	return cmocka_run_group_tests(tests, NULL, NULL);
}


// Supporting function implementation

// Test encode
void testEncode(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get output length
			const size_t outputLength = getBase58EncodedLength(INPUT, sizeof(INPUT));
			
			// Assert output length is correct
			assert_int_equal(outputLength, sizeof(OUTPUT) - sizeof((char)'\0'));
			
			// Get output by encoding input
			char output[outputLength + sizeof((char)'\0')];
			base58Encode(output, INPUT, sizeof(INPUT));
			output[outputLength] = '\0';
			
			// Assert output is correct
			assert_string_equal(output, OUTPUT);
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

// Test decode
void testDecode(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get input length
			const size_t inputLength = getBase58DecodedLength(OUTPUT, sizeof(OUTPUT) - sizeof((char)'\0'));
			
			// Assert input length is correct
			assert_int_equal(inputLength, sizeof(INPUT));
			
			// Get input by decoding output
			uint8_t input[inputLength];
			base58Decode(input, OUTPUT, sizeof(OUTPUT) - sizeof((char)'\0'));
			
			// Assert input is correct
			assert_memory_equal(input, INPUT, sizeof(INPUT));
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

// Test encode with checksum
void testEncodeWithChecksum(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get output length
			uint8_t temp[sizeof(INPUT) + BASE58_CHECKSUM_SIZE];
			memcpy(temp, INPUT, sizeof(INPUT));
			const size_t outputLength = getBase58EncodedLengthWithChecksum(temp, sizeof(INPUT));
			
			// Assert output length is correct
			assert_int_equal(outputLength, sizeof(OUTPUT_WITH_CHECKSUM) - sizeof((char)'\0'));
			
			// Get output by encoding input
			char output[outputLength + sizeof((char)'\0')];
			base58EncodeWithChecksum(output, temp, sizeof(temp));
			output[outputLength] = '\0';
			
			// Assert output is correct
			assert_string_equal(output, OUTPUT_WITH_CHECKSUM);
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

// Test decode with checksum
void testDecodeWithChecksum(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get input length
			const size_t inputLength = getBase58DecodedLengthWithChecksum(OUTPUT_WITH_CHECKSUM, sizeof(OUTPUT_WITH_CHECKSUM) - sizeof((char)'\0'));
			
			// Assert input length is correct
			assert_int_equal(inputLength - BASE58_CHECKSUM_SIZE, sizeof(INPUT));
			
			// Get input by decoding output
			uint8_t input[inputLength];
			base58DecodeWithChecksum(input, OUTPUT_WITH_CHECKSUM, sizeof(OUTPUT_WITH_CHECKSUM) - sizeof((char)'\0'));
			
			// Assert input is correct
			assert_memory_equal(input, INPUT, sizeof(INPUT));
			
			// Assert input's checksum is correct
			assert_memory_equal(&input[inputLength - BASE58_CHECKSUM_SIZE], CHECKSUM, sizeof(CHECKSUM));
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
