// Header guard
#ifndef DEVICE_H
#define DEVICE_H


// Header files
#include <libcxng.h>

// Check if performing unit tests or fuzzing
#if defined UNIT_TESTS || defined FUZZING

	// Header files
	#include <os_utils.h>
	#include <os_apdu.h>

	// Disable exception handling macros
	#undef BEGIN_TRY
	#define BEGIN_TRY
	#undef TRY
	#define TRY
	#undef FINALLY
	#define FINALLY
	#undef END_TRY
	#define END_TRY
	#undef CATCH_OTHER
	#define CATCH_OTHER(e) exception_t e;

// Otherwise
#else

	// Header files
	#include <os.h>
	#include <os_apdu.h>
#endif


#endif
