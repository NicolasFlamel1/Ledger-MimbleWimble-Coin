// Header guard
#ifndef GET_TOR_CERTIFICATE_SIGNATURE_H
#define GET_TOR_CERTIFICATE_SIGNATURE_H


// Function prototypes

// Process get Tor certificate signature request
void processGetTorCertificateSignatureRequest(const unsigned short *responseLength, unsigned char *responseFlags);

// Process get Tor certificate signature user interaction
void processGetTorCertificateSignatureUserInteraction(unsigned short *responseLength);


#endif
