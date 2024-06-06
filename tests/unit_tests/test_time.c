// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "time.h"
#include "common.h"


// Constants

// Epoch
static const uint64_t EPOCH = 15461882261883;

// Time
static const struct Time TIME = {

	// Second
	.second = 3,
	
	// Minute
	.minute = 58,
	
	// Hour
	.hour = 14,
	
	// Day
	.day = 18,
	
	// Month
	.month = 7,
	
	// Year
	.year = 491937
};


// Function prototypes

// Test epoch to time
static void testEpochToTime(void **state);


// Main function
int main(void) {

	// Initialize tests
	const struct CMUnitTest tests[] = {
	
		// Test epoch to time
		cmocka_unit_test(testEpochToTime)
	};
	
	// Return performing tests
	return cmocka_run_group_tests(tests, NULL, NULL);
}


// Supporting function implementation

// Test epoch to time
void testEpochToTime(void **state) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get time by converting epoch to time
			struct Time time;
			epochToTime(&time, EPOCH);
			
			// Assert time is correct
			assert_int_equal(time.second, TIME.second);
			assert_int_equal(time.minute, TIME.minute);
			assert_int_equal(time.hour, TIME.hour);
			assert_int_equal(time.day, TIME.day);
			assert_int_equal(time.month, TIME.month);
			assert_int_equal(time.year, TIME.year);
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
