// Header files
#include <limits.h>
#include <os_io_seproxyhal.h>
#include <string.h>
#include "common.h"
#include "menus.h"
#include "state.h"


// Constants

// Hexadecimal characters
static const char HEXADECIMAL_CHARACTERS[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};


// Supporting function implementation

// Exit application
void exitApplication(void) {

	// Reset state
	resetState();
	
	// Clear menu buffers
	clearMenuBuffers();

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
	char buffer[UINT64_BUFFER_SIZE + sizeof((char)'.')];
	
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

// Is valid UTF-8 string
bool isValidUtf8String(const char *text, size_t length) {

	// Go through all UTF-8 code points in the text
	for(size_t i = 0; i < length;) {
	
		// Check if UTF-8 code point is a printable ASCII character
		if(text[i] == '\t' || text[i] == '\n' || text[i] == '\r' || (text[i] >= ' ' && text[i] <= '~')) {
		
			// Go to next UTF-8 code point
			++i;
		}
		
		// Otherwise check if UTF-8 code point is a non-overlong two byte character
		else if(length >= 1 && i < length - 1 && text[i] >= 0xC2 && text[i] <= 0xDF && text[i + 1] <= 0x80 && text[i + 1] <= 0xBF) {
		
			// Go to next UTF-8 code point
			i += 2;
		}
		
		// Otherwise check if UTF-8 code point is an excluding overlongs character
		else if(length >= 2 && i < length - 2 && text[i] == 0xE0 && text[i + 1] >= 0xA0 && text[i + 1] <= 0xBF && text[i + 2] >= 0x80 && text[i + 2] <= 0xBF) {
		
			// Go to next UTF-8 code point
			i += 3;
		}
		
		// Otherwise check if UTF-8 code point is a straight three byte character
		else if(length >= 2 && i < length - 2 && ((text[i] >= 0xE1 && text[i] <= 0xEC) || text[i] == 0xEE || text[i] == 0xEF) && text[i + 1] >= 0x80 && text[i + 1] <= 0xBF && text[i + 2] >= 0x80 && text[i + 2] <= 0xBF) {
		
			// Go to next UTF-8 code point
			i += 3;
		}
		
		// Otherwise check if UTF-8 code point is an excluding surrogates character
		else if(length >= 2 && i < length - 2 && text[i] == 0xED && text[i + 1] >= 0x80 && text[i + 1] <= 0x9F && text[i + 2] >= 0x80 && text[i + 2] <= 0xBF) {
		
			// Go to next UTF-8 code point
			i += 3;
		}
		
		// Otherwise check if UTF-8 code point is a planes one to three character
		else if(length >= 3 && i < length - 3 && text[i] == 0xF0 && text[i + 1] >= 0x90 && text[i + 1] <= 0xBF && text[i + 2] >= 0x80 && text[i + 2] <= 0xBF && text[i + 3] >= 0x80 && text[i + 3] <= 0xBF) {
		
			// Go to next UTF-8 code point
			i += 4;
		}
		
		// Otherwise check if UTF-8 code point is a planes four to fifteen character
		else if(length >= 3 && i < length - 3 && text[i] >= 0xF1 && text[i] <= 0xF3 && text[i + 1] >= 0x80 && text[i + 1] <= 0xBF && text[i + 2] >= 0x80 && text[i + 2] <= 0xBF && text[i + 3] >= 0x80 && text[i + 3] <= 0xBF) {
		
			// Go to next UTF-8 code point
			i += 4;
		}
		
		// Otherwise check if UTF-8 code point is a plane sixteen character
		else if(length >= 3 && i < length - 3 && text[i] == 0xF4 && text[i + 1] >= 0x80 && text[i + 1] <= 0xBF && text[i + 2] >= 0x80 && text[i + 2] <= 0xBF && text[i + 3] >= 0x80 && text[i + 3] <= 0xBF) {
		
			// Go to next UTF-8 code point
			i += 4;
		}
		
		// Otherwise
		else {
		
			// Return false
			return false;
		}
	}
	
	// Return true
	return true;
}

// Map
uint8_t map(uint8_t value, uint8_t from, uint8_t to, uint8_t newFrom, uint8_t newTo) {

	// Return value mapped to new range
	return (newTo - newFrom) * (value - from) / (to - from) + newFrom;
}

// Is zero array secure
bool isZeroArraySecure(const uint8_t *value, size_t length) {

	// Initialize result
	uint8_t result = 0;
	
	// Go through all bytes in the value
	for(size_t i = 0; i < length; ++i) {
	
		// Or byte with the result
		result |= (bool)value[i];
	}
	
	// Return if result is zero
	return !result;
}
