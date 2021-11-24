// Header guard
#ifndef TIME_H
#define TIME_H


// Header files
#include <stdint.h>


// Constants

// Seconds in a minute
extern const uint8_t SECONDS_IN_A_MINUTE;

// Minutes in an hour
extern const uint8_t MINUTES_IN_AN_HOUR;

// Maximum epoch
extern const uint64_t MAXIMUM_EPOCH;

// Minimum time zone offset
extern const int64_t MINIMUM_TIME_ZONE_OFFSET;

// Maximum time zone offset
extern const int64_t MAXIMUM_TIME_ZONE_OFFSET;


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
