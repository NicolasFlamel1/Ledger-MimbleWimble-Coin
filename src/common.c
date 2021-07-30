// Header files
#include <limits.h>
#include <os_io_seproxyhal.h>
#include <string.h>
#include "common.h"
#include "state.h"


// Constants

// Error type mask
const uint16_t ERROR_TYPE_MASK = 0xF000;

// Ellipsis
const char ELLIPSIS[] = "...";

// First printable character
static const char FIRST_PRINTABLE_CHARACTER = ' ';

// Last printable character
static const char LAST_PRINTABLE_CHARACTER = '~';

// Hexadecimal characters
static const char HEXADECIMAL_CHARACTERS[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};

// Uint64 buffer size
static const size_t UINT64_BUFFER_SIZE = sizeof("18446744073709551615") - sizeof((char)'\0');


// Supporting function implementation

// Exit application
void exitApplication(void) {

	// Reset state
	resetState();

	// Begin try
	BEGIN_TRY_L(exit) {
	
		// Try
		TRY_L(exit) {
		
			// Exit OS
			os_sched_exit(-1);
		}
		
		// Finally
		FINALLY_L(exit) {
		
		}
	}
	
	// End try
	END_TRY_L(exit);
}

// Will response overflow
bool willResponseOverflow(unsigned short currentLength, size_t lengthChange) {
					
	// Return if response's length with the change will overflow
	return USHRT_MAX - currentLength < lengthChange || currentLength + lengthChange >= sizeof(G_io_apdu_buffer);
}

// Is printable character
bool isPrintableCharacter(char character) {

	// Return if character is printable
	return character >= FIRST_PRINTABLE_CHARACTER && character <= LAST_PRINTABLE_CHARACTER;
}

// To uppercase
char toUppercase(char character) {

	// Check if character is lowercase
	if(character >= 'a' && character <= 'z') {
	
		// Return character as uppercase
		return character -= 'a' - 'A';
	}
	
	// Otherwise
	else {
	
		// Return character
		return character;
	}
}

// To lowercase
char toLowercase(char character) {

	// Check if character is uppercase
	if(character >= 'A' && character <= 'Z') {
	
		// Return character as lowercase
		return character += 'a' - 'A';
	}
	
	// Otherwise
	else {
	
		// Return character
		return character;
	}
}

// Is zero array
bool isZeroArray(const uint8_t *array, size_t length) {

	// Go through all values in the array
	for(size_t i = 0; i < length; ++i) {
	
		// Check if value isn't zero
		if(array[i]) {
		
			// Return false
			return false;
		}
	}
	
	// Return true
	return true;
}

// Swap endianness
void swapEndianness(uint8_t *value, size_t length) {

	// Go through all byte pairs in the value
	for(size_t i = 0; i < length / 2; ++i) {
	
		// Swap byte pair
		SWAP(value[i], value[length - 1 - i]);
	}
}

// To hex string
void toHexString(char *result, const uint8_t *value, size_t length) {

	// Go through all bytes in the value
	for(size_t i = 0; i < length; ++i) {
	
		// Append byte as a string to the result
		result[i * HEXADECIMAL_CHARACTER_SIZE] = HEXADECIMAL_CHARACTERS[(value[i] & 0xF0) >> 4];
		result[i * HEXADECIMAL_CHARACTER_SIZE + sizeof(result[i * HEXADECIMAL_CHARACTER_SIZE])] = HEXADECIMAL_CHARACTERS[value[i] & 0x0F];
	}
}

// Get string length
size_t getStringLength(uint64_t value) {

	// Initialize length
	size_t length = 0;
	
	// Go through all digits in the value
	do {

		// Remove digit from the value
		value /= 10;
		
		// Increment length
		++length;
		
	} while(value);
	
	// Return length
	return length;
}

// To string
void toString(char *result, uint64_t value, uint8_t fractionalDigits) {

	// Initialize buffer
	char buffer[UINT64_BUFFER_SIZE + sizeof('.')];
	
	// Initialize length
	size_t length = sizeof(buffer);
	
	// Check if fractional digits exist
	if(fractionalDigits) {
	
		// Go through all zero fractional digits
		while(value % 10 == 0) {
		
			// Remove digit from value
			value /= 10;
			
			// Decrement fractional digits
			--fractionalDigits;
			
			// Check if no more fractional digits exist
			if(!fractionalDigits) {
			
				// Break
				break;
			}
		}
	}
	
	// Go through all digits in the value
	do {

		// Set digit in buffer
		buffer[--length] = value % 10 + '0';
		
		// Remove digit from the value
		value /= 10;
		
		// Check if fractional digits exist
		if(fractionalDigits) {
		
			// Decrement fractional digits
			--fractionalDigits;
			
			// Check if no more fractional digits exist
			if(!fractionalDigits) {
			
				// Set decimal point in buffer
				buffer[--length] = '.';
				
				// Check if there are no more digits in the value
				if(!value) {
				
					// Set zero in buffer
					buffer[--length] = '0';
				}
			}
		}	
	} while(value || fractionalDigits);
	
	// Copy used buffer to the result
	memcpy(result, &buffer[length], sizeof(buffer) - length);
}
