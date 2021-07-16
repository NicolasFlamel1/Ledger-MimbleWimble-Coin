// Header guard
#ifndef START_TRANSACTION_H
#define START_TRANSACTION_H


// Function prototypes

// Process start transaction request
void processStartTransactionRequest(unsigned short *responseLength, unsigned char *responseFlags);

// Process start transaction user interaction
void processStartTransactionUserInteraction(unsigned short *responseLength);


#endif
