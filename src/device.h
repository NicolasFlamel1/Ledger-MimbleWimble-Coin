// Header guard
#ifndef DEVICE_H
#define DEVICE_H


// Header files

// Check if compiling unit tests
#ifdef UNIT_TESTS

	// Header files
	#include <errors.h>
	#include <os_utils.h>
	#include <libcxng.h>

// Otherwise
#else

	// Header files
	#include <os.h>
	#include <os_apdu.h>
	#include <libcxng.h>
#endif


#endif
