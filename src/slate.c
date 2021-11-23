// Header files
#include <string.h>
#include "common.h"
#include "slate.h"


// Global variables

// Slate
struct Slate slate;


// Supporting function implementation

// Reset slate
void resetSlate(void) {

	// Clear the slate
	explicit_bzero(&slate, sizeof(slate));
}
