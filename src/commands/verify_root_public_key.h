// Header guard
#ifndef VERIFY_ROOT_PUBLIC_KEY_H
#define VERIFY_ROOT_PUBLIC_KEY_H


// Function prototypes

// Process verify root public key request
void processVerifyRootPublicKeyRequest(const unsigned short *responseLength, unsigned char *responseFlags);

// Process verify root public key user interaction
void processVerifyRootPublicKeyUserInteraction(const unsigned short *responseLength);


#endif
