// Header guard
#ifndef VERIFY_ADDRESS_H
#define VERIFY_ADDRESS_H


// Function prototypes

// Process verify address request
void processVerifyAddressRequest(const unsigned short *responseLength, unsigned char *responseFlags);

// Process verify address user interaction
void processVerifyAddressUserInteraction(const unsigned short *responseLength);


#endif
