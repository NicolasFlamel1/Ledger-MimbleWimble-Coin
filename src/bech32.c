// Header files
#define _GNU_SOURCE
#include <string.h>
#undef _GNU_SOURCE
#include "bech32.h"
#include "common.h"


// Definitions

// Bits per character
#define BITS_PER_CHARACTER 5

// Checksum size
#define CHECKSUM_SIZE 6

// Separator size
#define SEPARATOR_SIZE 1

// Separator
#define SEPARATOR '1'

// Checksum final constant
#define CHECKSUM_FINAL_CONSTANT 1


// Constants

// Characters
static const char CHARACTERS[] = {'q', 'p', 'z', 'r', 'y', '9', 'x', '8', 'g', 'f', '2', 't', 'v', 'd', 'w', '0', 's', '3', 'j', 'n', '5', '4', 'k', 'h', 'c', 'e', '6', 'm', 'u', 'a', '7', 'l'};

// Generators
static const uint32_t GENERATORS[] = {
	0x3b6a57b2,
	0x26508e6d,
	0x1ea119fa,
	0x3d4233dd,
	0x2a1462b3
};


// Function prototypes

// Update checksum
static uint32_t updateChecksum(uint32_t checksum);


// Supporting function implementation

// Get Bech32 encoded length
size_t getBech32EncodedLength(const size_t length, const char *humanReadablePart) {

	// Return Bech32 encoded length
	return strlen(humanReadablePart) + SEPARATOR_SIZE + length * BITS_IN_A_BYTE / BITS_PER_CHARACTER + ((length % BITS_PER_CHARACTER) ? 1 : 0) + CHECKSUM_SIZE;
}

// Bech32 encode
void bech32Encode(char *result, const uint8_t *data, const size_t length, const char *humanReadablePart) {

	// Get human-readable part length
	const size_t humanReadablePartLength = strlen(humanReadablePart);
	
	// Append human-readable part in the result
	memcpy(result, humanReadablePart, humanReadablePartLength);
	
	// Append separator to the result
	result[humanReadablePartLength] = SEPARATOR;
	
	// Initialize checksum
	uint32_t checksum = 1;
	
	// Go through all characters in the human-readable part
	for(size_t i = 0; i < humanReadablePartLength; ++i) {
	
		// Update checksum with the character's high bits
		checksum = updateChecksum(checksum) ^ (humanReadablePart[i] >> BITS_PER_CHARACTER);
	}
	
	// Update the checksum
	checksum = updateChecksum(checksum);
	
	// Go through all characters in the human-readable part
	for(size_t i = 0; i < humanReadablePartLength; ++i) {
	
		// Update checksum with the character's low bits
		checksum = updateChecksum(checksum) ^ (humanReadablePart[i] & 0b11111);
	}

	// Get number of characters
	const size_t numberOfCharacters = getBech32EncodedLength(length, humanReadablePart) - humanReadablePartLength - SEPARATOR_SIZE - CHECKSUM_SIZE;
	
	// Go through all character
	size_t index;
	for(index = 0; index < numberOfCharacters; ++index) {
	
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
		result[index + humanReadablePartLength + SEPARATOR_SIZE] = CHARACTERS[quantum];
		
		// Update checksum with the quantum
		checksum = updateChecksum(checksum) ^ quantum;
	}
	
	// Go through all checksum characters
	for(uint_fast8_t i = 0; i < CHECKSUM_SIZE; ++i) {
	
		// Update the checksum
		checksum = updateChecksum(checksum);
	}
	
	// Update the checksum with the final constant
	checksum ^= CHECKSUM_FINAL_CONSTANT;
	
	// Go through all checksum characters
	for(uint_fast8_t i = 0; i < CHECKSUM_SIZE; ++i) {
	
		// Append checksum character to the result
		result[index + humanReadablePartLength + SEPARATOR_SIZE + i] = CHARACTERS[(checksum >> ((BITS_PER_CHARACTER - i) * BITS_PER_CHARACTER)) & 0b11111];
	}
}

// Get Bech32 decoded length
size_t getBech32DecodedLength(const char *data, const size_t length) {

	// Get separator index
	const char *separatorIndex = (char *)memrchr(data, SEPARATOR, length);
	
	// Check if separator is invalid
	if(!separatorIndex) {
	
		// Return invalid Bech32 size
		return INVALID_BECH32_SIZE;
	}
	
	// Check if data is invalid
	if(length - (separatorIndex - data) < CHECKSUM_SIZE) {
	
		// Return invalid Bech32 size
		return INVALID_BECH32_SIZE;
	}
	
	// Initialize checksum
	uint32_t checksum = 1;
	
	// Get human-readable part length
	const size_t humanReadablePartLength = separatorIndex - data;
	
	// Go through all characters in the human-readable part
	for(size_t i = 0; i < humanReadablePartLength; ++i) {
	
		// Update checksum with the character's high bits
		checksum = updateChecksum(checksum) ^ (data[i] >> BITS_PER_CHARACTER);
	}
	
	// Update the checksum
	checksum = updateChecksum(checksum);
	
	// Go through all characters in the human-readable part
	for(size_t i = 0; i < humanReadablePartLength; ++i) {
	
		// Update checksum with the character's low bits
		checksum = updateChecksum(checksum) ^ (data[i] & 0b11111);
	}
	
	// Go through all characters after the separator
	for(size_t i = separatorIndex - data + SEPARATOR_SIZE; i < length; ++i) {
	
		// Check if character isn't a valid character
		const char *characterIndex = (char *)memchr(CHARACTERS, data[i], sizeof(CHARACTERS));
		if(!characterIndex) {
		
			// Return invalid Bech32 size
			return INVALID_BECH32_SIZE;
		}
		
		// Check if character isn't part of the checksum
		if(length - i > CHECKSUM_SIZE) {
		
			// Update checksum with the quantum
			checksum = updateChecksum(checksum) ^ (characterIndex - CHARACTERS);
		}
	}
	
	// Go through all checksum characters
	for(uint_fast8_t i = 0; i < CHECKSUM_SIZE; ++i) {
	
		// Update the checksum
		checksum = updateChecksum(checksum);
	}
	
	// Update the checksum with the final constant
	checksum ^= CHECKSUM_FINAL_CONSTANT;
	
	// Go through all checksum characters
	for(uint_fast8_t i = 0; i < CHECKSUM_SIZE; ++i) {
	
		// Check if checksum character is invalid
		if(data[length - CHECKSUM_SIZE + i] != CHARACTERS[(checksum >> ((BITS_PER_CHARACTER - i) * BITS_PER_CHARACTER)) & 0b11111]) {
		
			// Return invalid Bech32 size
			return INVALID_BECH32_SIZE;
		}
	}
	
	// Return number of bytes
	return (length - (separatorIndex - data) - SEPARATOR_SIZE - CHECKSUM_SIZE) * BITS_PER_CHARACTER / BITS_IN_A_BYTE;
}

// Bech32 decode
void bech32Decode(uint8_t *result, const char *data, const size_t length) {

	// Get number of bytes
	const size_t numberOfBytes = getBech32DecodedLength(data, length);
	
	// Get start of data
	const size_t startOfData = (char *)memrchr(data, SEPARATOR, length) - data + SEPARATOR_SIZE;
	
	// Go through all bytes
	for(size_t i = 0; i < numberOfBytes; ++i) {
	
		// Get position in the data
		const size_t position = i * BITS_IN_A_BYTE / BITS_PER_CHARACTER + startOfData;
		
		// Get first quantum
		const char firstQuantum = (char *)memchr(CHARACTERS, data[position], sizeof(CHARACTERS)) - CHARACTERS;
		
		// Get second quantum
		const char secondQuantum = (position + 1 < length) ? (char *)memchr(CHARACTERS, data[position + 1], sizeof(CHARACTERS)) - CHARACTERS : 0;
		
		// Get third quantum
		const char thirdQuantum = (position + 2 < length) ? (char *)memchr(CHARACTERS, data[position + 2], sizeof(CHARACTERS)) - CHARACTERS : 0;
		
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

// Update checksum
uint32_t updateChecksum(uint32_t checksum) {

	// Get checksum's high bits
	const uint8_t highBits = checksum >> 25;
	
	// Remove high bits from checksum
	checksum = (checksum & 0b1111111111111111111111111) << BITS_PER_CHARACTER;
	
	// Go through number of bits removed
	for(size_t i = 0; i < ARRAYLEN(GENERATORS); ++i) {
	
		// Check if bit is one
		if((highBits >> i) & 1) {
		
			// Update the checksum with the generator
			checksum ^= GENERATORS[i];
		}
	}
	
	// Return checksum
	return checksum;
}
