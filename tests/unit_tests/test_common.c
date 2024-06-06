// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "common.h"


// Constants

// Little endian value
static const uint8_t LITTLE_ENDIAN_VALUE[] = {0x00, 0xFF, 0x01, 0xFE, 0x02, 0xFD, 0x03, 0xFC};

// Big endian value
static const uint8_t BIG_ENDIAN_VALUE[] = {0xFC, 0x03, 0xFD, 0x02, 0xFE, 0x01, 0xFF, 0x00};

// Hex value
static const uint8_t HEX_VALUE[] = {0x00, 0x10, 0x02, 0x30, 0x04, 0x50, 0x06, 0x70, 0x08, 0x90, 0x0A, 0xB0, 0x0C, 0xD0, 0x0E, 0xF0};

// Hex string value
static const char HEX_STRING_VALUE[] = "001002300450067008900ab00cd00ef0";

// Number value
static const uint64_t NUMBER_VALUE = 18446744073709551615ULL;

// String value
static const char STRING_VALUE[] = "18446744073709551615";

// Valid UTF-8 string
static const char VALID_UTF8_STRING[] = "test";

// Invalid UTF-8 string
static const char INVALID_UTF8_STRING[] = "tes\x02t";

// Unmapped value
static const uint8_t UNMAPPED_VALUE = 50;

// Mapped value
static const uint8_t MAPPED_VALUE = 127;

// Zero array
static const uint8_t ZERO_ARRAY[] = {0, 0, 0, 0, 0};

// Not zero array
static const uint8_t NOT_ZERO_ARRAY[] = {0, 0, 0, 1, 0};

// Valid address
static const char VALID_ADDRESS[] = "example.com:80";

// Inalid address
static const char INVALID_ADDRESS[] = "example.:80";


// Function prototypes

// Test swap endianness
static void testSwapEndianness(void **state);

// Test to hex string
static void testToHexString(void **state);

// Test to string
static void testToString(void **state);

// Test is valid UTF-8 string
static void testIsValidUtf8String(void **state);

// Test map
static void testMap(void **state);

// Test is zero array secure
static void testIsZeroArraySecure(void **state);

// Test is valid address
static void testIsValidAddress(void **state);


// Main function
int main(void) {

	// Initialize tests
	const struct CMUnitTest tests[] = {
	
		// Test swap endianness
		cmocka_unit_test(testSwapEndianness),
		
		// Test to hex string
		cmocka_unit_test(testToHexString),
		
		// Test to string
		cmocka_unit_test(testToString),
		
		// Test is valid UTF-8 string
		cmocka_unit_test(testIsValidUtf8String),
		
		// Test map
		cmocka_unit_test(testMap),
		
		// Test is zero array secure
		cmocka_unit_test(testIsZeroArraySecure),
		
		// Test is valid address
		cmocka_unit_test(testIsValidAddress)
	};
	
	// Return performing tests
	return cmocka_run_group_tests(tests, NULL, NULL);
}


// Supporting function implementation

// Test swap endianness
void testSwapEndianness(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get big endian value by swapping little endian value
			uint8_t bigEndianValue[sizeof(LITTLE_ENDIAN_VALUE)];
			memcpy(bigEndianValue, LITTLE_ENDIAN_VALUE, sizeof(LITTLE_ENDIAN_VALUE));
			swapEndianness(bigEndianValue, sizeof(bigEndianValue));
			
			// Assert big endian value is correct
			assert_memory_equal(bigEndianValue, BIG_ENDIAN_VALUE, sizeof(BIG_ENDIAN_VALUE));
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

// Test to hex string
void testToHexString(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get hex string value by converting hex value to a string
			char hexStringValue[sizeof(HEX_VALUE) * HEXADECIMAL_CHARACTER_SIZE + sizeof((char)'\0')];
			toHexString(hexStringValue, HEX_VALUE, sizeof(HEX_VALUE));
			hexStringValue[sizeof(HEX_VALUE) * HEXADECIMAL_CHARACTER_SIZE] = '\0';
			
			// Assert hex string value is correct
			assert_string_equal(hexStringValue, HEX_STRING_VALUE);
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

// Test to string
void testToString(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get string length
			const size_t stringLength = getStringLength(NUMBER_VALUE);
			
			// Assert string length is correct
			assert_int_equal(stringLength, sizeof(STRING_VALUE) - sizeof((char)'\0'));

			// Get string value by converting number value to a string
			char stringValue[stringLength + sizeof((char)'\0')];
			toString(stringValue, NUMBER_VALUE, 0);
			stringValue[stringLength] = '\0';
			
			// Assert string value is correct
			assert_string_equal(stringValue, STRING_VALUE);
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

// Test is valid UTF-8 string
void testIsValidUtf8String(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get valid by checking if valid UTF-8 string is valid
			const bool valid = isValidUtf8String(VALID_UTF8_STRING, sizeof(VALID_UTF8_STRING) - sizeof((char)'\0'));
			
			// Assert valid is correct
			assert_true(valid);
			
			// Get invalid by checking if invalid UTF-8 string is valid
			const bool invalid = isValidUtf8String(INVALID_UTF8_STRING, sizeof(INVALID_UTF8_STRING) - sizeof((char)'\0'));
			
			// Assert invalid is correct
			assert_false(invalid);
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

// Test map
void testMap(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get mapped value
			const uint8_t mappedValue = map(UNMAPPED_VALUE, 0, UNMAPPED_VALUE * 2, 0, UINT8_MAX);
			
			// Assert mapped value is correct
			assert_int_equal(mappedValue, MAPPED_VALUE);
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

// Test is zero array secure
void testIsZeroArraySecure(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get is zero by checking if zero array is zero
			const bool isZero = isZeroArraySecure(ZERO_ARRAY, sizeof(ZERO_ARRAY));
			
			// Assert is zero is correct
			assert_true(isZero);
			
			// Get is not zero by checking if not zero array is zero
			const bool isNotZero = isZeroArraySecure(NOT_ZERO_ARRAY, sizeof(NOT_ZERO_ARRAY));
			
			// Assert is not zero is correct
			assert_false(isNotZero);
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

// Test is valid address
void testIsValidAddress(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get valid by checking if valid address is valid
			const bool valid = isValidAddress(VALID_ADDRESS, sizeof(VALID_ADDRESS) - sizeof((char)'\0'));
			
			// Assert valid is correct
			assert_true(valid);
			
			// Get invalid by checking if invalid address is valid
			const bool invalid = isValidAddress(INVALID_ADDRESS, sizeof(INVALID_ADDRESS) - sizeof((char)'\0'));
			
			// Assert invalid is correct
			assert_false(invalid);
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
