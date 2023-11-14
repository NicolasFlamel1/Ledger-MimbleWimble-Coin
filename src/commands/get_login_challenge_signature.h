// Header guard
#ifndef GET_LOGIN_CHALLENGE_SIGNATURE_H
#define GET_LOGIN_CHALLENGE_SIGNATURE_H


// Function prototypes

// Process get login challenge signature request
void processGetLoginChallengeSignatureRequest(const unsigned short *responseLength, unsigned char *responseFlags);

// Process get login challenge signature user interaction
void processGetLoginChallengeSignatureUserInteraction(unsigned short *responseLength);


#endif
