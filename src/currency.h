// Header guard
#ifndef CURRENCY_H
#define CURRENCY_H


// Header files
#include "common.h"


// Definitions

// Check if currency BIP44 coin type isn't defined
#ifndef CURRENCY_BIP44_COIN_TYPE

	// Cause error
	#error "Invalid currency BIP44 coin type"
#endif

// Check if currency MQS version isn't defined
#ifndef CURRENCY_MQS_VERSION

	// Cause error
	#error "Invalid currency MQS version"
#endif

// Check if currency name isn't defined
#ifndef CURRENCY_NAME

	// Cause error
	#error "Invalid currency name"
#endif

// Check if currency abbreviation isn't defined
#ifndef CURRENCY_ABBREVIATION

	// Cause error
	#error "Invalid currency abbreviation"
#endif


// Assertions

// Assert that currency BIP44 coin type is valid
_Static_assert(CURRENCY_BIP44_COIN_TYPE >= 0 && CURRENCY_BIP44_COIN_TYPE <= UINT32_MAX, "Invalid currency BIP44 coin type");

// Assert that currency MQS version is valid
_Static_assert(sizeof((uint8_t[])CURRENCY_MQS_VERSION) == sizeof(uint16_t), "Invalid currency MQS version");


#endif
