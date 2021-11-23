// Header files
#include <os.h>
#include <stdbool.h>
#include "time.h"


// Definitions

// Months in a year
#define MONTHS_IN_A_YEAR 12


// Constants

// Maximum epoch
const uint64_t MAXIMUM_EPOCH = (uint64_t)UINT32_MAX * 60 * 60;

// Days since January first
static const uint32_t DAYS_SINCE_JANUARY_FIRST[2][MONTHS_IN_A_YEAR + 1] = {

	// 365 days non-leap
	{0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365},
	
	// 366 days leap
	{0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366}
};

// Rebase year
static const uint16_t REBEASE_YEAR = 1601;

// Seconds from 1601 to 1970
static const uint64_t SECONDS_FROM_1601_TO_1970 = 11644473600;

// Seconds in a quadricentennial
static const uint64_t SECONDS_IN_A_QUADRICENTENNIAL = 12622780800;

// Seconds in a centennial
static const uint32_t SECONDS_IN_A_CENTENNIAL = 3155673600;

// Seconds in a quadrennial
static const uint32_t SECONDS_IN_A_QUADRENNIAL = 126230400;

// Seconds in an annual
static const uint32_t SECONDS_IN_AN_ANNUAL = 31536000;

// Seconds in a day
static const uint32_t SECONDS_IN_A_DAY = 86400;

// Seconds in an hour
static const uint16_t SECONDS_IN_AN_HOUR = 3600;

// Seconds in a minute
static const uint8_t SECONDS_IN_A_MINUTE = 60;

// Maximum centennials
static const uint8_t MAXIMUM_CENTENNIALS = 3;

// Maximum quadrennials
static const uint8_t MAXIMUM_QUADRENNIALS = 24;

// Maximum annuals
static const uint8_t MAXIMUM_ANNUALS = 3;

// Years in a quadricentennial
static const uint16_t YEARS_IN_A_QUADRICENTENNIAL = 400;

// Years in a centennial
static const uint8_t YEARS_IN_A_CENTENNIAL = 100;

// Years in a quadrennial
static const uint8_t YEARS_IN_A_QUADRENNIAL = 4;


// Function prototypes

// Is leap year
static bool isLeapYear(uint32_t year);


// Supporting function implementation

// Epoch to time
void epochToTime(struct Time *time, uint64_t epoch) {

	// Based on code by Alexey Frunze and Andre Kampling (https://stackoverflow.com/a/11197532)

	// Get seconds from 1601 to epoch
	uint64_t seconds = epoch + SECONDS_FROM_1601_TO_1970;
	
	// Remove quadricentennials from seconds
	const uint16_t quadricentennials = seconds / SECONDS_IN_A_QUADRICENTENNIAL;
	seconds %= SECONDS_IN_A_QUADRICENTENNIAL;
	
	// Remove centennials from seconds
	const uint8_t centennials = MIN(seconds / SECONDS_IN_A_CENTENNIAL, MAXIMUM_CENTENNIALS);
	seconds -= (uint64_t)centennials * SECONDS_IN_A_CENTENNIAL;
	
	// Remove quadrennials from seconds
	const uint8_t quadrennials = MIN(seconds / SECONDS_IN_A_QUADRENNIAL, MAXIMUM_QUADRENNIALS);
	seconds -= quadrennials * SECONDS_IN_A_QUADRENNIAL;
	
	// Remove annuals from seconds
	const uint8_t annuals = MIN(seconds / SECONDS_IN_AN_ANNUAL, MAXIMUM_ANNUALS);
	seconds -= annuals * SECONDS_IN_AN_ANNUAL;
	
	// Remove year day from seconds
	const uint16_t yearDay = seconds / SECONDS_IN_A_DAY;
	seconds %= SECONDS_IN_A_DAY;
	
	// Set time's hour
	time->hour = seconds / SECONDS_IN_AN_HOUR;
	
	// Remove hour from seconds
	seconds %= SECONDS_IN_AN_HOUR;
	
	// Set time's minute
	time->minute = seconds / SECONDS_IN_A_MINUTE;
	
	// Remove minute from seconds
	seconds %= SECONDS_IN_A_MINUTE;
	
	// Set time's second
	time->second = seconds;
	
	// Set time's year
	time->year = REBEASE_YEAR + quadricentennials * YEARS_IN_A_QUADRICENTENNIAL + centennials * YEARS_IN_A_CENTENNIAL + quadrennials * YEARS_IN_A_QUADRENNIAL + annuals;
	
	// Get if year is a leap year
	const bool leapYear = isLeapYear(time->year);
	
	// Go through all months
	for(time->day = time->month = 1; time->month <= MONTHS_IN_A_YEAR; ++time->month) {
	
		// Check if year day is in the month
		if(yearDay < DAYS_SINCE_JANUARY_FIRST[leapYear ? 1 : 0][time->month]) {
		
			// Update time's day
			time->day += yearDay - DAYS_SINCE_JANUARY_FIRST[leapYear ? 1 : 0][time->month - 1];
			
			// Break
			break;
		}
	}
}

// Is leap year
bool isLeapYear(uint32_t year) {

	// Return if year is a leap year
	return !(year % 4) && (year % 100 || !(year % 400));
}
