// Header guard
#ifndef TIME_H
#define TIME_H


// Header files
#include <stdint.h>


// Definitions

// Seconds in a minute
#define SECONDS_IN_A_MINUTE 60

// Minutes in an hour
#define MINUTES_IN_AN_HOUR 60

// Maximum epoch
#define MAXIMUM_EPOCH ((uint64_t)UINT32_MAX * 60 * 60)

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
void epochToTime(struct Time *time, uint64_t epoch);


#endif
