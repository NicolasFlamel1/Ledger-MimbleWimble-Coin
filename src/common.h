// Header guard
#ifndef COMMON_H
#define COMMON_H


// Header files
#include <stdbool.h>
#include "device.h"


// Definitions

// Hexadecimal character size
#define HEXADECIMAL_CHARACTER_SIZE (sizeof("FF") - sizeof((char)'\0'))

// Bits in a byte
#define BITS_IN_A_BYTE 8

// Uint64 buffer size
#define UINT64_BUFFER_SIZE (sizeof("18446744073709551615") - sizeof((char)'\0'))

// Error type mask
#define ERROR_TYPE_MASK 0xF000


// Constants

// Error
enum Error {
	// Length error
	LENGTH_ERROR = 0x6700,

	// Unknown class error
	UNKNOWN_CLASS_ERROR = ERR_APP_RANGE_01 + ERR_GEN_SUB_01,
	
	// Unknown instruction error
	UNKNOWN_INSTRUCTION_ERROR,
	
	// Malformed request error
	MALFORMED_REQUEST_ERROR,
	
	// User rejected error
	USER_REJECTED_ERROR,
	
	// Internal error error
	INTERNAL_ERROR_ERROR,
	
	// Invalid parameters error
	INVALID_PARAMETERS_ERROR = ERR_APP_RANGE_03 + ERR_GEN_SUB_01,
	
	// Invalid state error
	INVALID_STATE_ERROR,
	
	// Device locked error
	DEVICE_LOCKED_ERROR
};

// Address type
enum AddressType {

	// MQS address type
	MQS_ADDRESS_TYPE,
	
	// Tor ddress type
	TOR_ADDRESS_TYPE,
	
	// Slatepack address type
	SLATEPACK_ADDRESS_TYPE
};


// Function prototypes

// Exit application
void exitApplication(void);

// Will response overflow
bool willResponseOverflow(unsigned short currentLength, size_t change);

// Swap endianness
void swapEndianness(uint8_t *value, size_t length);

// To hex string
void toHexString(char *result, const uint8_t *value, size_t length);

// Get string length
size_t getStringLength(uint64_t value);

// To string
void toString(char *result, uint64_t value, uint8_t fractionalDigits);

// Is valid UTF-8 string
bool isValidUtf8String(const char *text, size_t length);


#endif
