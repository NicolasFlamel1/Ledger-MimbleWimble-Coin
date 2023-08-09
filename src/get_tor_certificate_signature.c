// Header files
#include <stdlib.h>
#include <os_io_seproxyhal.h>
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "get_tor_certificate_signature.h"
#include "menus.h"
#include "slatepack.h"
#include "time.h"
#include "tor.h"


// Definitions

// Signed certificate type
#define SIGNED_CERTIFICATE_TYPE 4

// Signing public key extension type
#define SIGNING_PUBLIC_KEY_EXTENSION_TYPE 4

// Certificate time to Epoch time scalar
#define CERTIFICATE_TIME_TO_EPOCH_TIME_SCALAR (MINUTES_IN_AN_HOUR * SECONDS_IN_A_MINUTE)


// Supporting function implementation

// Process get Tor certificate signature request
void processGetTorCertificateSignatureRequest(__attribute__((unused)) unsigned short *responseLength, unsigned char *responseFlags) {

	// Check currency doesn't allow Tor and Slatepack addresses
	if(!currencyInformation.enableTorAddress && !currencyInformation.enableSlatepackAddress) {
	
		// Throw unknown instruction error
		THROW(UNKNOWN_INSTRUCTION_ERROR);
	}
	
	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength < sizeof(uint32_t) + sizeof(uint32_t) + sizeof(uint8_t) + sizeof(uint8_t) + sizeof(uint32_t) + sizeof(uint8_t) + ED25519_PUBLIC_KEY_SIZE + sizeof(uint8_t) + sizeof(int16_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get account from data
	uint32_t account;
	memcpy(&account, data, sizeof(account));
	
	// Check if account is invalid
	if(account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get index from data
	uint32_t index;
	memcpy(&index, &data[sizeof(account)], sizeof(index));
	
	// Get certificate from data
	const uint8_t *certificate = &data[sizeof(account) + sizeof(index)];
	
	// Get certificate length
	const size_t certificateLength = dataLength - (sizeof(account) + sizeof(index) + sizeof(int16_t));
	
	// Check if certificate type is invalid
	if(certificate[sizeof(uint8_t)] != SIGNED_CERTIFICATE_TYPE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get certificate expiration
	uint32_t certificateExpiration;
	memcpy(&certificateExpiration, &certificate[sizeof(uint8_t) + sizeof(uint8_t)], sizeof(certificateExpiration));
	
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
		uint16_t extensionLength;
		memcpy(&extensionLength, &certificate[currentExtensionIndex], sizeof(extensionLength));
		
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
	getEd25519PublicKey(ed25519PublicKey, account, index);
	
	// Check if the signing public key isn't the Ed25519 public key
	if(memcmp(signingPublicKey, ed25519PublicKey, sizeof(ed25519PublicKey))) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get time zone offset from data
	int16_t timeZoneOffset;
	memcpy(&timeZoneOffset, &data[sizeof(account) + sizeof(index) + certificateLength], sizeof(timeZoneOffset));
	
	// Check if time zone offset is invalid
	if(timeZoneOffset <= MINIMUM_TIME_ZONE_OFFSET || timeZoneOffset >= MAXIMUM_TIME_ZONE_OFFSET) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if time zone offset will underflow the certificate expiration
	if(timeZoneOffset * SECONDS_IN_A_MINUTE > (int64_t)certificateExpiration * CERTIFICATE_TIME_TO_EPOCH_TIME_SCALAR) {
	
		// Don't use a time zone offset
		timeZoneOffset = 0;
	}
	
	// Convert certificate expiration adjusted by the time zone offset to time
	struct Time time;
	epochToTime(&time, (uint64_t)certificateExpiration * CERTIFICATE_TIME_TO_EPOCH_TIME_SCALAR - timeZoneOffset * SECONDS_IN_A_MINUTE);
	
	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
		// Copy time into the time or processing message line buffer
		SPRINTF(timeOrProcessingMessageLineBuffer, "%02d:%02d:%02d on %d-%02d-%02d UTC%c%02d:%02d", time.hour, time.minute, time.second, time.year, time.month, time.day, (timeZoneOffset > 0) ? '-' : '+', abs(timeZoneOffset) / MINUTES_IN_AN_HOUR, abs(timeZoneOffset) % MINUTES_IN_AN_HOUR);
	
	// Otherwise
	#else
	
		// Copy time into the time or processing message line buffer
		SPRINTF(timeOrProcessingMessageLineBuffer, "%02d:%02d:%02d on\n%d-%02d-%02d\nUTC%c%02d:%02d", time.hour, time.minute, time.second, time.year, time.month, time.day, (timeZoneOffset > 0) ? '-' : '+', abs(timeZoneOffset) / MINUTES_IN_AN_HOUR, abs(timeZoneOffset) % MINUTES_IN_AN_HOUR);
	#endif
	
	// Check currency allows Tor addresses
	if(currencyInformation.enableTorAddress) {
	
		// Get Tor address from the signed public key
		char torAddress[TOR_ADDRESS_SIZE];
		getTorAddressFromPublicKey(torAddress, signedPublicKey);
		
		// Copy Tor address into the public key or address line buffer
		memcpy(publicKeyOrAddressLineBuffer, torAddress, sizeof(torAddress));
		publicKeyOrAddressLineBuffer[sizeof(torAddress)] = '\0';
		
		// Set address type line buffer
		strcpy(addressTypeLineBuffer, "Tor Address");
	}
	
	// Check currency allows Slatepack addresses
	else if(currencyInformation.enableSlatepackAddress) {
	
		// Get Slatepack address from the signed public key
		char slatepackAddress[SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart)];
		getSlatepackAddressFromPublicKey(slatepackAddress, signedPublicKey);
		
		// Copy Slatepack address into the public key or address line buffer
		memcpy(publicKeyOrAddressLineBuffer, slatepackAddress, sizeof(slatepackAddress));
		publicKeyOrAddressLineBuffer[sizeof(slatepackAddress)] = '\0';
		
		// Set address type line buffer
		strcpy(addressTypeLineBuffer, "Slatepack Address");
	}
	
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
	uint32_t account;
	memcpy(&account, data, sizeof(account));
	
	// Get index from data
	uint32_t index;
	memcpy(&index, &data[sizeof(account)], sizeof(index));
	
	// Get certificate from data
	const uint8_t *certificate = &data[sizeof(account) + sizeof(index)];
	
	// Get certificate length
	const size_t certificateLength = dataLength - (sizeof(account) + sizeof(index) + sizeof(int16_t));
	
	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;
	
	// Initialize signature
	volatile uint8_t signature[ED25519_SIGNATURE_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get address private key
			getAddressPrivateKey(&addressPrivateKey, account, index, CX_CURVE_Ed25519);
			
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
		THROW(LENGTH_ERROR);
	}
	
	// Append signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)signature, sizeof(signature));
	
	*responseLength += sizeof(signature);
	
	// Throw success
	THROW(SWO_SUCCESS);
}
