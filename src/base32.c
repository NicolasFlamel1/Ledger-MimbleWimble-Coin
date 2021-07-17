// Header files
#include <string.h>
#include "base32.h"
#include "common.h"


// Constants

// Invalid base32 length
const size_t INVALID_BASE32_LENGTH = SIZE_MAX;

// Characters
static const uint8_t CHARACTER[] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '2', '3', '4', '5', '6', '7'};

// Bits per character
static const size_t BITS_PER_CHARACTER = 5;

// Padding character
static const uint8_t PADDING_CHARACTER = '=';


// Function prototypes

// Get number of padding bytes
static size_t getNumberOfPaddingBytes(size_t length);


// Supporting function implementation

// Get base32 encoded length
size_t getBase32EncodedLength(size_t length) {

	// Return base32 encoded length
	return length * BITS_IN_A_BYTE / BITS_PER_CHARACTER + ((length % BITS_PER_CHARACTER) ? 1 : 0) + getNumberOfPaddingBytes(length);
}

// Base32 encode
void base32Encode(uint8_t *result, const uint8_t *data, size_t length) {

	// Get number of padding bytes
	const size_t numberOfPaddingBytes = getNumberOfPaddingBytes(length);
	
	// Get number of character bytes
	const size_t numberOfCharacterBytes = getBase32EncodedLength(length) - numberOfPaddingBytes;
	
	// Go through all character bytes
	size_t index;
	for(index = 0; index < numberOfCharacterBytes; ++index) {
	
		// Get position in the data
		const size_t position = index * BITS_PER_CHARACTER / BITS_IN_A_BYTE;
		
		// Get first byte
		const uint8_t firstByte = data[position];
		
		// Get second byte
		const uint8_t secondByte = (position + 1 < length) ? data[position + 1] : 0;
		
		// Check byte position in group
		uint8_t quantum;
		switch(index % BITS_IN_A_BYTE) {
		
			// Zero
			case 0:
			
				// Set quantum
				quantum = (firstByte & 0b11111000) >> 3;
			
				// Break
				break;
			
			// One
			case 1:
			
				// Set quantum
				quantum = ((firstByte & 0b00000111) << 2) | ((secondByte & 0b11000000) >> 6);
			
				// Break
				break;
			
			// Two
			case 2:
			
				// Set quantum
				quantum = (firstByte & 0b00111110) >> 1;
			
				// Break
				break;
			
			// Three
			case 3:
			
				// Set quantum
				quantum = ((firstByte & 0b00000001) << 4) | ((secondByte & 0b11110000) >> 4);
			
				// Break
				break;
			
			// Four
			case 4:
			
				// Set quantum
				quantum = ((firstByte & 0b00001111) << 1) | ((secondByte & 0b10000000) >> 7);
			
				// Break
				break;
			
			// Five
			case 5:
			
				// Set quantum
				quantum = (firstByte & 0b01111100) >> 2;
			
				// Break
				break;
			
			// Six
			case 6:
			
				// Set quantum
				quantum = ((firstByte & 0b00000011) << 3) | ((secondByte & 0b11100000) >> 5);
			
				// Break
				break;
			
			// Seven
			case 7:
			
				// Set quantum
				quantum = firstByte & 0b00011111;
			
				// Break
				break;
		}
		
		// Append quantum as a character to the result
		result[index] = CHARACTER[quantum];
	}
	
	// Go through all padding bytes
	for(size_t i = 0; i < numberOfPaddingBytes; ++i) {
	
		// Append padding character to the result
		result[index + i] = PADDING_CHARACTER;
	}
}

// Get base32 decoded length
size_t getBase32DecodedLength(const uint8_t *data, size_t length) {

	// Get start of padding in the data
	const uint8_t *startOfPadding = memchr(data, PADDING_CHARACTER, length);
	
	// Go through all padding
	for(const uint8_t *i = startOfPadding; i && i != data + length; ++i) {
	
		// Check if padding isn't a padding character
		if(*i != PADDING_CHARACTER) {
		
			// Return invalid base32 length
			return INVALID_BASE32_LENGTH;
		}
	}
	
	// Get number of bytes
	const size_t numberOfBytes = (startOfPadding ? startOfPadding - data : length) * BITS_PER_CHARACTER / BITS_IN_A_BYTE;
	
	// Check if the number of padding bytes is invalid
	if(getNumberOfPaddingBytes(numberOfBytes) != (size_t)(startOfPadding ? data + length - startOfPadding : 0)) {
	
		// Return invalid base32 length
		return INVALID_BASE32_LENGTH;
	}
	
	// Go through all non-padding bytes
	for(size_t i = 0; i < numberOfBytes; ++i) {
	
		// Check if byte isn't a valid character
		if(!memchr(CHARACTER, toUppercase(data[i]), sizeof(CHARACTER))) {
		
			// Return invalid base32 length
			return INVALID_BASE32_LENGTH;
		}
	}
	
	// Return base32 decoded length
	return numberOfBytes;
}

// Base32 decode
void base32Decode(uint8_t *result, const uint8_t *data, size_t length) {

	// Get number of bytes
	const size_t numberOfBytes = getBase32DecodedLength(data, length);
	
	// Go through all bytes
	for(size_t i = 0; i < numberOfBytes; ++i) {
	
		// Get position in the data
		size_t position = i * BITS_IN_A_BYTE / BITS_PER_CHARACTER;
		
		// Get first quantum
		const uint8_t firstQuantum = (uint8_t *)memchr(CHARACTER, toUppercase(data[position]), sizeof(CHARACTER)) - CHARACTER;
		
		// Get second quantum
		const uint8_t secondQuantum = (position + 1 < length) ? (uint8_t *)memchr(CHARACTER, toUppercase(data[position + 1]), sizeof(CHARACTER)) - CHARACTER : 0;
		
		// Get third quantum
		const uint8_t thirdQuantum = (position + 2 < length) ? (uint8_t *)memchr(CHARACTER, toUppercase(data[position + 2]), sizeof(CHARACTER)) - CHARACTER : 0;
		
		// Check quantum position in group
		uint8_t byte;
		switch(i % BITS_PER_CHARACTER) {
		
			// Zero
			case 0:
			
				// Set byte
				byte = ((firstQuantum & 0b11111) << 3) | ((secondQuantum & 0b11100) >> 2);
				
				// Break
				break;
			
			// One
			case 1:
			
				// Set byte
				byte = ((firstQuantum & 0b00011) << 6) | ((secondQuantum & 0b11111) << 1) | ((thirdQuantum & 0b10000) >> 4);
				
				// Break
				break;
			
			// Two
			case 2:
			
				// Set byte
				byte = ((firstQuantum & 0b01111) << 4) | ((secondQuantum & 0b11110) >> 1);
				
				// Break
				break;
			
			// Three
			case 3:
			
				// Set byte
				byte = ((firstQuantum & 0b00001) << 7) | ((secondQuantum & 0b11111) << 2) | ((thirdQuantum & 0b11000) >> 3);
				
				// Break
				break;
			
			// Four
			case 4:
			
				// Set byte
				byte = ((firstQuantum & 0b00111) << 5) | (secondQuantum & 0b11111);
				
				// Break
				break;
		}
		
		// Append byte to the result
		result[i] = byte;
	}
}

// Get number of padding bytes
size_t getNumberOfPaddingBytes(size_t length) {

	// Check how many bits the final quantum represents
	switch(length % BITS_PER_CHARACTER) {
		
		// One
		case 1:
		
			// Return number of padding bytes
			return 6;
		
		// Two
		case 2:
		
			// Return number of padding bytes
			return 4;
		
		// Three
		case 3:
		
			// Return number of padding bytes
			return 3;
		
		// Four
		case 4:
		
			// Return number of padding bytes
			return 1;
		
		// Default
		default:
		
			// Return number of padding bytes
			return 0;
	}
}
