// Header guard
#ifndef TIME_H
#define TIME_H


// Header files
#include <stdint.h>


// Definitions

// Milliseconds in a second
#define MILLISECONDS_IN_A_SECOND 1000

// Seconds in a minute
#define SECONDS_IN_A_MINUTE 60

// Minutes in an hour
#define MINUTES_IN_AN_HOUR 60

// Hours in a day
#define HOURS_IN_A_DAY 24

// Days in a week
#define DAYS_IN_A_WEEK 7

// Maximum epoch
#define MAXIMUM_EPOCH ((uint64_t)UINT32_MAX * MINUTES_IN_AN_HOUR * SECONDS_IN_A_MINUTE)

// Minimum time zone offset
#define MINIMUM_TIME_ZONE_OFFSET (-13 * MINUTES_IN_AN_HOUR)

// Maximum time zone offset
#define MAXIMUM_TIME_ZONE_OFFSET (15 * MINUTES_IN_AN_HOUR)


// Structures

// Time
struct Time {

	// Second
	uint8_t second;

	// Minute
	uint8_t minute;

	// Hour
	uint8_t hour;

	// Day
	uint16_t day;

	// Month
	uint8_t month;

	// Year
	uint32_t year;
};


// Function prototypes

// Epoch to time
void epochToTime(struct Time *time, const uint64_t epoch);


#endif
