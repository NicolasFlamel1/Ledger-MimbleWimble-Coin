// Header guard
#ifndef STATE_H
#define STATE_H


// Header files
#include "process_requests.h"


// Function prototypes

// Reset state
void resetState(void);

// Reset unrelated state
void resetUnrelatedState(const enum Instruction instruction);


#endif
