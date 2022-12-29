// Header guard
#ifndef FINISH_TRANSACTION_H
#define FINISH_TRANSACTION_H


// Function prototypes

// Process finish transaction request
void processFinishTransactionRequest(unsigned short *responseLength, unsigned char *responseFlags);

// Process finish transaction user interaction
void processFinishTransactionUserInteraction(unsigned short *responseLength);


#endif
