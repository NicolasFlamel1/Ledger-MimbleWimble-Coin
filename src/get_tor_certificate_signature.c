// Header files
#include <os_io_seproxyhal.h>
#include <stdio.h>
#include <string.h>
#include <time.h>
#include "common.h"
#include "crypto.h"
#include "get_tor_certificate_signature.h"
#include "menus.h"
#include "time.h"
#include "tor.h"


// Constants

// Signed certificate type
static const uint8_t SIGNED_CERTIFICATE_TYPE = 4;

// Signing public key extension type
static const uint8_t SIGNING_PUBLIC_KEY_EXTENSION_TYPE = 4;

// Certificate time to Epoch time scalar
static const uint16_t CERTIFICATE_TIME_TO_EPOCH_TIME_SCALAR = 60 * 60;


// Supporting function implementation

// Process get Tor certificate signature request
void processGetTorCertificateSignatureRequest(__attribute__((unused)) unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength < sizeof(uint32_t) + sizeof(uint8_t) + sizeof(uint8_t) + sizeof(uint32_t) + sizeof(uint8_t) + ED25519_PUBLIC_KEY_SIZE + sizeof(uint8_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get account from data
	const uint32_t *account = (uint32_t *)data;
	
	// Check if account is invalid
	if(*account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get certificate from data
	const uint8_t *certificate = &data[sizeof(*account)];
	
	// Get certificate length
	const size_t certificateLength = dataLength - sizeof(*account);
	
	// Check if certificate type is invalid
	if(certificate[sizeof(uint8_t)] != SIGNED_CERTIFICATE_TYPE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get certificate expiration
	uint32_t certificateExpiration = *(uint32_t *)&certificate[sizeof(uint8_t) + sizeof(uint8_t)];
	
	// Convert certificate expiration big endian to little endian
	certificateExpiration = os_swap_u32(certificateExpiration);
	
	// Get signed public key
	const uint8_t *signedPublicKey = &certificate[sizeof(uint8_t) + sizeof(uint8_t) + sizeof(uint32_t) + sizeof(uint8_t)];
	
	// Check if signed public key is invalid
	if(!isValidEd25519PublicKey(signedPublicKey, ED25519_PUBLIC_KEY_SIZE)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get number of certificate extensions
	const uint8_t numberOfCertificateExtensions = certificate[sizeof(uint8_t) + sizeof(uint8_t) + sizeof(uint32_t) + sizeof(uint8_t) + ED25519_PUBLIC_KEY_SIZE];
	
	// Initialize current extension index
	size_t currentExtensionIndex = sizeof(uint8_t) + sizeof(uint8_t) + sizeof(uint32_t) + sizeof(uint8_t) + ED25519_PUBLIC_KEY_SIZE + sizeof(uint8_t);
	
	// Initialize signing public key
	const uint8_t *signingPublicKey = NULL;
	
	// Go through all certificate extensions
	for(uint8_t i = 0; i < numberOfCertificateExtensions; ++i) {
	
		// Check if extension is invalid
		if(certificateLength < currentExtensionIndex + sizeof(uint16_t) + sizeof(uint8_t) + sizeof(uint8_t)) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	
		// Get extension length
		uint16_t extensionLength = *(uint16_t *)&certificate[currentExtensionIndex];
		
		// Convert extension length big endian to little endian
		extensionLength = os_swap_u16(extensionLength);
		
		// Get extension type
		const uint8_t extensionType = certificate[currentExtensionIndex + sizeof(uint16_t)];
		
		// Check if extension type is signing public key
		if(extensionType == SIGNING_PUBLIC_KEY_EXTENSION_TYPE) {
		
			// Check if signing public key alreay exists or the extension is invalid
			if(signingPublicKey || extensionLength != ED25519_PUBLIC_KEY_SIZE || certificateLength < currentExtensionIndex + sizeof(uint16_t) + sizeof(uint8_t) + sizeof(uint8_t) + ED25519_PUBLIC_KEY_SIZE) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Get signing public key from the extension
			signingPublicKey = &certificate[currentExtensionIndex + sizeof(uint16_t) + sizeof(uint8_t) + sizeof(uint8_t)];
		}
		
		// Update current extension index
		currentExtensionIndex += sizeof(uint16_t) + sizeof(uint8_t) + sizeof(uint8_t) + extensionLength;
	}
	
	// Check if certificate is invalid
	if(currentExtensionIndex != certificateLength) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if signing public key doesn't exist
	if(!signingPublicKey) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get Ed25519 public key
	uint8_t ed25519PublicKey[ED25519_PUBLIC_KEY_SIZE];
	getEd25519PublicKey(ed25519PublicKey, *account);
	
	// Check if the signing public key isn't the Ed25519 public key
	if(memcmp(signingPublicKey, ed25519PublicKey, sizeof(ed25519PublicKey))) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Convert certificate expiration to time
	struct Time time;
	epochToTime(&time, (uint64_t)certificateExpiration * CERTIFICATE_TIME_TO_EPOCH_TIME_SCALAR);
	
	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Copy time into the time line buffer
		SPRINTF(timeLineBuffer, "%02d:%02d:%02d on\n%d-%02d-%02d UTC", time.hour, time.minute, time.second, time.year, time.month, time.day);
	
	// Otherwise
	#else
	
		// Copy time into the time line buffer
		SPRINTF(timeLineBuffer, "%02d:%02d:%02d on %d-%02d-%02d UTC", time.hour, time.minute, time.second, time.year, time.month, time.day);
	#endif
	
	// Copy signed public key into the public key line buffer
	toHexString(publicKeyLineBuffer, signedPublicKey, ED25519_PUBLIC_KEY_SIZE);
	publicKeyLineBuffer[ED25519_PUBLIC_KEY_SIZE * HEXADECIMAL_CHARACTER_SIZE] = '\0';
	
	// Show sign Tor certificate menu
	showMenu(SIGN_TOR_CERTIFICATE_MENU);
	
	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process get Tor certificate signature user interaction
void processGetTorCertificateSignatureUserInteraction(unsigned short *responseLength) {

	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];
	
	// Get account from data
	const uint32_t *account = (uint32_t *)data;
	
	// Get certificate from data
	const uint8_t *certificate = &data[sizeof(*account)];
	
	// Get certificate length
	const size_t certificateLength = dataLength - sizeof(*account);
	
	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;
	
	// Initialize signature
	volatile uint8_t signature[ED25519_SIGNATURE_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get address private key at the Tor address private key index
			getAddressPrivateKey(&addressPrivateKey, *account, TOR_ADDRESS_PRIVATE_KEY_INDEX, CX_CURVE_Ed25519);
			
			// Get signature of the certificate
			cx_eddsa_sign((cx_ecfp_private_key_t *)&addressPrivateKey, CX_LAST, CX_SHA512, certificate, certificateLength, NULL, 0, (uint8_t *)signature, sizeof(signature), NULL);
		}
		
		// Finally
		FINALLY {
		
			// Clear the address private key
			explicit_bzero((cx_ecfp_private_key_t *)&addressPrivateKey, sizeof(addressPrivateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the signature will overflow
	if(willResponseOverflow(*responseLength, sizeof(signature))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)signature, sizeof(signature));
	
	*responseLength += sizeof(signature);
	
	// Throw success
	THROW(SWO_SUCCESS);
}
