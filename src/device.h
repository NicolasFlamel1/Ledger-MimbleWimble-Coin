// Header guard
#ifndef DEVICE_H
#define DEVICE_H


// Header files
#include <libcxng.h>
#include <../src/cx_hkdf.h>

// Check if performing unit tests
#ifdef UNIT_TESTS

	// Header files
	#include <os_utils.h>
	
	// Disable exception handling macros
	#undef BEGIN_TRY
	#define BEGIN_TRY
	#undef TRY
	#define TRY
	#undef FINALLY
	#define FINALLY
	#undef END_TRY
	#define END_TRY

// Otherwise
#else

	// Header files
	#include <os.h>
	#include <os_apdu.h>
#endif


#endif
