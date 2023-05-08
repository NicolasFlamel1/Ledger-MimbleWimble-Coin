// Header guard
#ifndef GET_MQS_CHALLENGE_SIGNATURE_H
#define GET_MQS_CHALLENGE_SIGNATURE_H


// Function prototypes

// Process get MQS challenge signature request
void processGetMqsChallengeSignatureRequest(const unsigned short *responseLength, unsigned char *responseFlags);

// Process get MQS challenge signature user interaction
void processGetMqsChallengeSignatureUserInteraction(unsigned short *responseLength);


#endif
