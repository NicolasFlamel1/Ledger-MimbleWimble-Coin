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


// Constants

// Error type mask
extern const uint16_t ERROR_TYPE_MASK;

// Check if target isn't the Nano X
#ifndef TARGET_NANOX

	// Ellipsis
	extern const char ELLIPSIS[sizeof("...")];
#endif

// Error
enum Error {

	// Unknown class error
	UNKNOWN_CLASS_ERROR = ERR_APP_RANGE_01 + ERR_GEN_SUB_01,
	
	// Unknown instruction error
	UNKNOWN_INSTRUCTION_ERROR,
	
	// Device locked error
	DEVICE_LOCKED_ERROR,
	
	// Malformed request error
	MALFORMED_REQUEST_ERROR,
	
	// User rejected error
	USER_REJECTED_ERROR,
	
	// Invalid parameters error
	INVALID_PARAMETERS_ERROR,
	
	// Invalid state error
	INVALID_STATE_ERROR = ERR_APP_RANGE_03 + ERR_GEN_SUB_01,
	
	// Internal error error
	INTERNAL_ERROR_ERROR
};


// Function prototypes

// Exit application
void exitApplication(void);

// Will response overflow
bool willResponseOverflow(unsigned short currentLength, size_t change);

// Is printable character
bool isPrintableCharacter(char character);

// To uppercase
char toUppercase(char character);

// Is zero array
bool isZeroArray(const uint8_t *array, size_t length);

// Swap endianness
void swapEndianness(uint8_t *value, size_t length);

// To hex string
void toHexString(char *result, const uint8_t *value, size_t length);

// Get string length
size_t getStringLength(uint64_t value);

// To string
void toString(char *result, uint64_t value, uint8_t fractionalDigits);


#endif
