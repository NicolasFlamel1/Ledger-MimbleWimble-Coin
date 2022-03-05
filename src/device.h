// Header guard
#ifndef DEVICE_H
#define DEVICE_H


// Header files
#include <libcxng.h>

// Check if performing unit tests
#ifdef UNIT_TESTS

	// Header files
	#include <os_utils.h>

// Otherwise
#else

	// Header files
	#include <os.h>
	#include <os_apdu.h>
#endif


#endif
