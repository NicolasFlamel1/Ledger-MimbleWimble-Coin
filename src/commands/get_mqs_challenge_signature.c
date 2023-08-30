// Header files
#include <stdlib.h>
#include <os_io_seproxyhal.h>
#include <string.h>
#include "../common.h"
#include "../crypto.h"
#include "get_mqs_challenge_signature.h"
#include "../menus.h"
#include "../time.h"
#include "../mqs.h"


// Supporting function implementation

// Process get MQS challenge signature request
void processGetMqsChallengeSignatureRequest(__attribute__((unused)) const unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];

	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];

	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || (dataLength != sizeof(uint32_t) + sizeof(uint32_t) && dataLength != sizeof(uint32_t) + sizeof(uint32_t) + sizeof(uint64_t) + sizeof(int16_t))) {

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

	// Check if a timestamp is provided
	if(dataLength == sizeof(account) + sizeof(uint32_t) + sizeof(uint64_t) + sizeof(int16_t)) {

		// Get timestamp from data
		uint64_t timestamp;
		memcpy(&timestamp, &data[sizeof(account) + sizeof(uint32_t)], sizeof(timestamp));

		// Convert timestamp from milliseconds to seconds
		timestamp /= MILLISECONDS_IN_A_SECOND;

		// Check if timestamp is invalid
		if(timestamp > MAXIMUM_EPOCH) {

			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}

		// Get time zone offset from data
		int16_t timeZoneOffset;
		memcpy(&timeZoneOffset, &data[sizeof(account) + sizeof(uint32_t) + sizeof(timestamp)], sizeof(timeZoneOffset));

		// Check if time zone offset is invalid
		if(timeZoneOffset <= MINIMUM_TIME_ZONE_OFFSET || timeZoneOffset >= MAXIMUM_TIME_ZONE_OFFSET) {

			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
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
	}

	// Otherwise
	else {

		// Clear the time line buffer
		explicit_bzero(timeLineBuffer, sizeof(timeLineBuffer));
	}

	// Copy account into account the index line buffer
	explicit_bzero(accountIndexLineBuffer, sizeof(accountIndexLineBuffer));
	toString(accountIndexLineBuffer, account, 0);

// Check if has BAGL
#ifdef HAVE_BAGL

	// Set sign challenge line buffer
	explicit_bzero(signChallengeLineBuffer, sizeof(signChallengeLineBuffer));
	strncpy(signChallengeLineBuffer, "Sign MQS", sizeof(signChallengeLineBuffer) - sizeof((char)'\0'));

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

	// Set sign challenge line buffer
	explicit_bzero(signChallengeLineBuffer, sizeof(signChallengeLineBuffer));
	strncpy(signChallengeLineBuffer, "Sign MQS\nchallenge?", sizeof(signChallengeLineBuffer) - sizeof((char)'\0'));

	// Set succeeded line buffer
	explicit_bzero(succeededLineBuffer, sizeof(succeededLineBuffer));
	strncpy(succeededLineBuffer, "MQS CHALLENGE\nSIGNED", sizeof(succeededLineBuffer) - sizeof((char)'\0'));

	// Set failed line buffer
	explicit_bzero(failedLineBuffer, sizeof(failedLineBuffer));
	strncpy(failedLineBuffer, "Signing MQS challenge\nfailed", sizeof(failedLineBuffer) - sizeof((char)'\0'));

	// Set canceled line buffer
	explicit_bzero(canceledLineBuffer, sizeof(canceledLineBuffer));
	strncpy(canceledLineBuffer, "Signing MQS challenge\ndenied", sizeof(canceledLineBuffer) - sizeof((char)'\0'));

	// Set cancel prompt line buffer
	explicit_bzero(cancelPromptLineBuffer, sizeof(cancelPromptLineBuffer));
	strncpy(cancelPromptLineBuffer, "Deny signing MQS\nchallenge?", sizeof(cancelPromptLineBuffer) - sizeof((char)'\0'));

	// Set warning line buffer
	explicit_bzero(warningLineBuffer, sizeof(warningLineBuffer));
	strncpy(warningLineBuffer, "*The host will be able to listen\nfor the account's MQS\ntransactions", sizeof(warningLineBuffer) - sizeof((char)'\0'));
#endif

	// Show sign MQS challenge menu
	showMenu(SIGN_MQS_CHALLENGE_MENU);

	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process get MQS challenge signature user interaction
void processGetMqsChallengeSignatureUserInteraction(unsigned short *responseLength) {

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

	// Initialize hash
	uint8_t hash[CX_SHA256_SIZE];

	// Check if a timestamp is provided
	if(dataLength == sizeof(account) + sizeof(index) + sizeof(uint64_t) + sizeof(int16_t)) {

		// Get timestamp from data
		uint64_t timestamp;
		memcpy(&timestamp, &data[sizeof(account) + sizeof(index)], sizeof(timestamp));

		// Get timestamp string length
		const size_t timestampStringLength = getStringLength(timestamp);

		// Get timestamp as a string
		char *timestampString = alloca(timestampStringLength);
		toString(timestampString, timestamp, 0);

		// Get hash of the timestamp
		cx_hash_sha256((uint8_t *)timestampString, timestampStringLength, hash, sizeof(hash));
	}

	// Otherwise
	else {

		// Get hash of the default MQS challenge
		cx_hash_sha256((uint8_t *)DEFAULT_MQS_CHALLENGE, sizeof(DEFAULT_MQS_CHALLENGE) - sizeof((char)'\0'), hash, sizeof(hash));
	}

	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;

	// Initialize signature
	volatile uint8_t signature[MAXIMUM_DER_SIGNATURE_SIZE];

	// Initialize signature length
	volatile size_t signatureLength = sizeof(signature);

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get address private key
			getAddressPrivateKey(&addressPrivateKey, account, index, CX_CURVE_SECP256K1);

			// Get signature of the hash and throw error if it fails
			CX_THROW(cx_ecdsa_sign_no_throw((cx_ecfp_private_key_t *)&addressPrivateKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, hash, sizeof(hash), (uint8_t *)signature, (size_t *)&signatureLength, NULL));
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
	if(willResponseOverflow(*responseLength, signatureLength)) {

		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)signature, signatureLength);

	*responseLength += signatureLength;

	// Throw success
	THROW(SWO_SUCCESS);
}
