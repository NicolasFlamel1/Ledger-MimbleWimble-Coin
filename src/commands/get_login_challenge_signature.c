// Header files
#include <stdlib.h>
#include <os_io_seproxyhal.h>
#include <string.h>
#include "../common.h"
#include "../crypto.h"
#include "get_login_challenge_signature.h"
#include "../menus.h"
#include "../time.h"


// Definitions

// Maximum identifier size
#define MAXIMUM_IDENTIFIER_SIZE 64


// Supporting function implementation

// Process get login challenge signature request
void processGetLoginChallengeSignatureRequest(__attribute__((unused)) const unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];

	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];

	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength <= sizeof(uint32_t) + sizeof(uint64_t) + sizeof(int16_t) || dataLength > sizeof(uint32_t) + sizeof(uint64_t) + sizeof(int16_t) + MAXIMUM_IDENTIFIER_SIZE) {

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

	// Get timestamp from data
	uint64_t timestamp;
	memcpy(&timestamp, &data[sizeof(account)], sizeof(timestamp));

	// Convert timestamp from milliseconds to seconds
	timestamp /= MILLISECONDS_IN_A_SECOND;

	// Check if timestamp is invalid
	if(timestamp > MAXIMUM_EPOCH) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Get time zone offset from data
	int16_t timeZoneOffset;
	memcpy(&timeZoneOffset, &data[sizeof(account) + sizeof(timestamp)], sizeof(timeZoneOffset));

	// Check if time zone offset is invalid
	if(timeZoneOffset <= MINIMUM_TIME_ZONE_OFFSET || timeZoneOffset >= MAXIMUM_TIME_ZONE_OFFSET) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Get identifier from data
	const char *identifier = (char *)&data[sizeof(account) + sizeof(timestamp) + sizeof(timeZoneOffset)];

	// Get identifier length
	const size_t identifierLength = dataLength - (sizeof(account) + sizeof(timestamp) + sizeof(timeZoneOffset));

	// Go through all characters in the identifier
	for(size_t i = 0; i < identifierLength; ++i) {

		// Check if character isn't a printable ASCII character
		if(identifier[i] < ' ' || identifier[i] > '~') {

			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	}

	// Check if time zone offset will underflow the timestamp
	if(timeZoneOffset * SECONDS_IN_A_MINUTE > (int64_t)timestamp) {

		// Don't use a time zone offset
		timeZoneOffset = 0;
	}

	// Convert timestamp adjusted by the time zone offset to time
	struct Time time;
	epochToTime(&time, timestamp - timeZoneOffset * SECONDS_IN_A_MINUTE);

// Check if device has low height
#if defined BAGL_HEIGHT && BAGL_HEIGHT < 64

	// Copy time into the time line buffer
	snprintf(timeLineBuffer, sizeof(timeLineBuffer), "%02d:%02d:%02d on %d-%02d-%02d UTC%c%02d:%02d", time.hour, time.minute, time.second, time.year, time.month, time.day, (timeZoneOffset > 0) ? '-' : '+', abs(timeZoneOffset) / MINUTES_IN_AN_HOUR, abs(timeZoneOffset) % MINUTES_IN_AN_HOUR);

// Otherwise
#else

	// Copy time into the time line buffer
	snprintf(timeLineBuffer, sizeof(timeLineBuffer), "%02d:%02d:%02d on\n%d-%02d-%02d\nUTC%c%02d:%02d", time.hour, time.minute, time.second, time.year, time.month, time.day, (timeZoneOffset > 0) ? '-' : '+', abs(timeZoneOffset) / MINUTES_IN_AN_HOUR, abs(timeZoneOffset) % MINUTES_IN_AN_HOUR);
#endif

	// Copy account into account the index line buffer
	explicit_bzero(accountIndexLineBuffer, sizeof(accountIndexLineBuffer));
	toString(accountIndexLineBuffer, account, 0);

	// Copy identifier into the public keu line buffer
	explicit_bzero((char *)publicKeyLineBuffer, sizeof(publicKeyLineBuffer));
	memcpy((char *)publicKeyLineBuffer, identifier, identifierLength);

	// Show sign login challenge menu
	showMenu(SIGN_LOGIN_CHALLENGE_MENU);

	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process get login challenge signature user interaction
void processGetLoginChallengeSignatureUserInteraction(unsigned short *responseLength) {

	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Get account from data
	uint32_t account;
	memcpy(&account, data, sizeof(account));

	// Get timestamp from data
	uint64_t timestamp;
	memcpy(&timestamp, &data[sizeof(account)], sizeof(timestamp));

	// Get identifier from data
	const char *identifier = (char *)&data[sizeof(account) + sizeof(timestamp) + sizeof(int16_t)];

	// Get identifier length
	const size_t identifierLength = dataLength - (sizeof(account) + sizeof(timestamp) + sizeof(int16_t));

	// Get timestamp string length
	const size_t timestampStringLength = getStringLength(timestamp);

	// Get timestamp as a string
	char *timestampString = alloca(timestampStringLength);
	toString(timestampString, timestamp, 0);

	// Get hash of the timestamp and identifier
	cx_sha256_t hashContext;
	cx_sha256_init(&hashContext);
	CX_THROW(cx_hash_no_throw((cx_hash_t *)&hashContext, 0, (uint8_t *)timestampString, timestampStringLength, NULL, 0));
	CX_THROW(cx_hash_no_throw((cx_hash_t *)&hashContext, 0, (const uint8_t *)" ", sizeof(" ") - sizeof((char)'\0'), NULL, 0));
	uint8_t hash[CX_SHA256_SIZE];
	CX_THROW(cx_hash_no_throw((cx_hash_t *)&hashContext, CX_LAST, (const uint8_t *)identifier, identifierLength, hash, sizeof(hash)));

	// Initialize login private key
	volatile cx_ecfp_private_key_t loginPrivateKey;

	// Initialize login public key
	volatile uint8_t loginPublicKey[COMPRESSED_PUBLIC_KEY_SIZE];

	// Initialize signature
	volatile uint8_t signature[MAXIMUM_DER_SIGNATURE_SIZE];

	// Initialize signature length
	volatile size_t signatureLength = sizeof(signature);

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get login private key
			getLoginPrivateKey(&loginPrivateKey, account);

			// Get signature of the hash and throw error if it fails
			CX_THROW(cx_ecdsa_sign_no_throw((cx_ecfp_private_key_t *)&loginPrivateKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, hash, sizeof(hash), (uint8_t *)signature, (size_t *)&signatureLength, NULL));

			// Get login private key's public key
			getPublicKeyFromPrivateKey(loginPublicKey, (cx_ecfp_private_key_t *)&loginPrivateKey);
		}

		// Finally
		FINALLY {

			// Clear the login private key
			explicit_bzero((cx_ecfp_private_key_t *)&loginPrivateKey, sizeof(loginPrivateKey));
		}
	}

	// End try
	END_TRY;

	// Check if response with the login public key and signature will overflow
	if(willResponseOverflow(*responseLength, sizeof(loginPublicKey) + signatureLength)) {

		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append login public key and signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)loginPublicKey, sizeof(loginPublicKey));

	*responseLength += sizeof(loginPublicKey);

	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)signature, signatureLength);

	*responseLength += signatureLength;

	// Throw success
	THROW(SWO_SUCCESS);
}
