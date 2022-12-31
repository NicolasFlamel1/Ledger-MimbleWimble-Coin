// Header guard
#ifndef GET_ROOT_PUBLIC_KEY_H
#define GET_ROOT_PUBLIC_KEY_H


// Function prototypes

// Process get root public key request
void processGetRootPublicKeyRequest(unsigned short *responseLength, unsigned char *responseFlags);

// Process get root public key user interaction
void processGetRootPublicKeyUserInteraction(volatile unsigned short *responseLength);


#endif
