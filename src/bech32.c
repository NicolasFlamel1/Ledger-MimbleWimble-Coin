// Header files
#include <string.h>
#include "bech32.h"
#include "common.h"


// Constants

// Characters
static const uint8_t CHARACTER[] = {'q', 'p', 'z', 'r', 'y', '9', 'x', '8', 'g', 'f', '2', 't', 'v', 'd', 'w', '0', 's', '3', 'j', 'n', '5', '4', 'k', 'h', 'c', 'e', '6', 'm', 'u', 'a', '7', 'l'};

// Bits per character
static const size_t BITS_PER_CHARACTER = 5;

// Checksum size
static const size_t CHECKSUM_SIZE = 6;

// Separator
static const char SEPARATOR = '1';

// Checksum final constant
static const uint32_t CHECKSUM_FINAL_CONSTANT = 1;

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
size_t getBech32EncodedLength(size_t length, const char *humanReadablePart) {

	// Return Bech32 encoded length
	return strlen(humanReadablePart) + sizeof(SEPARATOR) + length * BITS_IN_A_BYTE / BITS_PER_CHARACTER + ((length % BITS_PER_CHARACTER) ? 1 : 0) + CHECKSUM_SIZE;
}

// Bech32 encode
void bech32Encode(uint8_t *result, const uint8_t *data, size_t length, const char *humanReadablePart) {

	// Get human-readable part length
	const size_t humanReadablePartLength = strlen(humanReadablePart);
	
	// Append human-readable part in the result
	memcpy(result, humanReadablePart, strlen(humanReadablePart));
	
	// Append separator to the result
	result[humanReadablePartLength] = SEPARATOR;
	
	// Initialize checksum
	uint32_t checksum = 1;
	
	// Go through all characters in the human-readable part
	for(size_t i = 0; i < humanReadablePartLength; ++i) {
	
		// Upddate checksum with the character's high bits
		checksum = updateChecksum(checksum) ^ (humanReadablePart[i] >> BITS_PER_CHARACTER);
	}
	
	// Update the checksum
	checksum = updateChecksum(checksum);
	
	// Go through all characters in the human-readable part
	for(size_t i = 0; i < humanReadablePartLength; ++i) {
	
		// Upddate checksum with the character's low bits
		checksum = updateChecksum(checksum) ^ (humanReadablePart[i] & 0b11111);
	}

	// Get number of character bytes
	const size_t numberOfCharacterBytes = getBech32EncodedLength(length, humanReadablePart) - humanReadablePartLength - sizeof(SEPARATOR) - CHECKSUM_SIZE;
	
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
		result[index + humanReadablePartLength + sizeof(SEPARATOR)] = CHARACTER[quantum];
		
		// Upddate checksum with the quantum
		checksum = updateChecksum(checksum) ^ quantum;
	}
	
	// Go through all checksum bytes
	for(size_t i = 0; i < CHECKSUM_SIZE; ++i) {
	
		// Update the checksum
		checksum = updateChecksum(checksum);
	}
	
	// Update the checksum with the final constant 
	checksum ^= CHECKSUM_FINAL_CONSTANT;
	
	// Go through all checksum bytes
	for(size_t i = 0; i < CHECKSUM_SIZE; ++i) {
	
		// Append checksum character to the result
		result[index + humanReadablePartLength + sizeof(SEPARATOR) + i] = CHARACTER[(checksum >> ((BITS_PER_CHARACTER - i) * BITS_PER_CHARACTER)) & 0b11111];
	}
}

// Update checksum
uint32_t updateChecksum(uint32_t checksum) {

	// Check checksum's high bits
	const uint8_t highBits = checksum >> 25;
	
	// Remove high bits from checksum
	checksum = (checksum & 0b1111111111111111111111111) << BITS_PER_CHARACTER;
	
	// Go through number of bits removed
	for(size_t i = 0; i < BITS_PER_CHARACTER; ++i) {
	
		// Check if bit is one
		if((highBits >> i) & 1) {
		
			// Update the checksum with the generator
			checksum ^= GENERATORS[i];
		}
	}
	
	// Return checksum
	return checksum;
}
