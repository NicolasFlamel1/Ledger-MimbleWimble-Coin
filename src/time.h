// Header guard
#ifndef TIME_H
#define TIME_H


// Header files
#include <stdint.h>


// Constants

// Maximum epoch
extern const uint64_t MAXIMUM_EPOCH;


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
