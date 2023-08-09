// Header files
#include <stdlib.h>
#include <os_io_seproxyhal.h>
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "get_mqs_timestamp_signature.h"
#include "menus.h"
#include "time.h"
#include "mqs.h"


// Supporting function implementation

// Process get MQS timestamp signature request
void processGetMqsTimestampSignatureRequest(__attribute__((unused)) unsigned short *responseLength, unsigned char *responseFlags) {

	// Check currency doesn't allow MQS addresses
	if(!currencyInformation.enableMqsAddress) {
	
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
	if(firstParameter || secondParameter || dataLength != sizeof(uint32_t) + sizeof(uint32_t) + sizeof(uint64_t) + sizeof(int16_t)) {
	
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
	memcpy(&timestamp, &data[sizeof(account) + sizeof(uint32_t)], sizeof(timestamp));
	
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
	
	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
		// Copy time into the time or processing message line buffer
		SPRINTF(timeOrProcessingMessageLineBuffer, "%02d:%02d:%02d on %d-%02d-%02d UTC%c%02d:%02d", time.hour, time.minute, time.second, time.year, time.month, time.day, (timeZoneOffset > 0) ? '-' : '+', abs(timeZoneOffset) / MINUTES_IN_AN_HOUR, abs(timeZoneOffset) % MINUTES_IN_AN_HOUR);
	
	// Otherwise
	#else
	
		// Copy time into the time or processing message line buffer
		SPRINTF(timeOrProcessingMessageLineBuffer, "%02d:%02d:%02d on\n%d-%02d-%02d\nUTC%c%02d:%02d", time.hour, time.minute, time.second, time.year, time.month, time.day, (timeZoneOffset > 0) ? '-' : '+', abs(timeZoneOffset) / MINUTES_IN_AN_HOUR, abs(timeZoneOffset) % MINUTES_IN_AN_HOUR);
	#endif
	
	// Show sign MQS timestamp menu
	showMenu(SIGN_MQS_TIMESTAMP_MENU);
	
	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process get MQS timestamp signature user interaction
void processGetMqsTimestampSignatureUserInteraction(unsigned short *responseLength) {

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];
	
	// Get account from data
	uint32_t account;
	memcpy(&account, data, sizeof(account));
	
	// Get index from data
	uint32_t index;
	memcpy(&index, &data[sizeof(account)], sizeof(index));
	
	// Get timestamp from data
	uint64_t timestamp;
	memcpy(&timestamp, &data[sizeof(account) + sizeof(index)], sizeof(timestamp));
	
	// Get timestamp as a string
	char timestampString[getStringLength(timestamp)];
	toString(timestampString, timestamp, 0);
	
	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;
	
	// Initialize signature
	volatile uint8_t signature[MAXIMUM_DER_SIGNATURE_SIZE];
	
	// Initialize signature length
	volatile size_t signatureLength;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get address private key
			getAddressPrivateKey(&addressPrivateKey, account, index, CX_CURVE_SECP256K1);
			
			// Get hash of the timestamp
			uint8_t hash[CX_SHA256_SIZE];
			cx_hash_sha256((uint8_t *)timestampString, sizeof(timestampString), hash, sizeof(hash));
			
			// Get signature of the hash
			signatureLength = cx_ecdsa_sign((cx_ecfp_private_key_t *)&addressPrivateKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, hash, sizeof(hash), (uint8_t *)signature, sizeof(signature), NULL);
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
		THROW(LENGTH_ERROR);
	}
	
	// Append signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)signature, signatureLength);
	
	*responseLength += signatureLength;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
