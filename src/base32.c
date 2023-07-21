// Header files
#include <string.h>
#include "base32.h"
#include "common.h"


// Definitions

// Bits per character
#define BITS_PER_CHARACTER 5

// Padding character
#define PADDING_CHARACTER '='


// Constants

// Characters
static const char CHARACTERS[] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '2', '3', '4', '5', '6', '7'};


// Function prototypes

// Get number of padding characters
static size_t getNumberOfPaddingCharacters(const size_t length);


// Supporting function implementation

// Get base32 encoded length
size_t getBase32EncodedLength(const size_t length) {

	// Return base32 encoded length
	return length * BITS_IN_A_BYTE / BITS_PER_CHARACTER + ((length % BITS_PER_CHARACTER) ? 1 : 0) + getNumberOfPaddingCharacters(length);
}

// Base32 encode
void base32Encode(char *result, const uint8_t *data, const size_t length) {

	// Get number of padding characters
	const size_t numberOfPaddingCharacters = getNumberOfPaddingCharacters(length);

	// Get number of characters
	const size_t numberOfCharacters = getBase32EncodedLength(length) - numberOfPaddingCharacters;

	// Go through all characters
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
		result[index] = CHARACTERS[quantum];
	}

	// Go through all padding characters
	for(size_t i = 0; i < numberOfPaddingCharacters; ++i) {

		// Append padding character to the result
		result[index + i] = PADDING_CHARACTER;
	}
}

// Get base32 decoded length
size_t getBase32DecodedLength(const char *data, const size_t length) {

	// Get start of padding in the data
	const char *startOfPadding = memchr(data, PADDING_CHARACTER, length);

	// Go through all padding
	for(const char *i = startOfPadding; i && i != data + length; ++i) {

		// Check if padding isn't a padding character
		if(*i != PADDING_CHARACTER) {

			// Return invalid base32 size
			return INVALID_BASE32_SIZE;
		}
	}

	// Get number of bytes
	const size_t numberOfBytes = (startOfPadding ? startOfPadding - data : length) * BITS_PER_CHARACTER / BITS_IN_A_BYTE;

	// Check if the number of padding characters is invalid
	const size_t numberOfPaddingCharacters = getNumberOfPaddingCharacters(numberOfBytes);
	if(numberOfPaddingCharacters != (size_t)(startOfPadding ? data + length - startOfPadding : 0)) {

		// Return invalid base32 size
		return INVALID_BASE32_SIZE;
	}

	// Go through all non-padding characters
	for(size_t i = 0; i < length - numberOfPaddingCharacters; ++i) {

		// Check if character isn't a valid character
		if(!memchr(CHARACTERS, data[i], sizeof(CHARACTERS))) {

			// Return invalid base32 size
			return INVALID_BASE32_SIZE;
		}
	}

	// Return number of bytes
	return numberOfBytes;
}

// Base32 decode
void base32Decode(uint8_t *result, const char *data, const size_t length) {

	// Get number of bytes
	const size_t numberOfBytes = getBase32DecodedLength(data, length);

	// Go through all bytes
	for(size_t i = 0; i < numberOfBytes; ++i) {

		// Get position in the data
		const size_t position = i * BITS_IN_A_BYTE / BITS_PER_CHARACTER;

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

// Get number of padding characters
size_t getNumberOfPaddingCharacters(const size_t length) {

	// Check how many bits the final quantum represents
	switch(length % BITS_PER_CHARACTER) {

		// One
		case 1:

			// Return number of padding characters
			return 6;

			// Break
			break;

		// Two
		case 2:

			// Return number of padding characters
			return 4;

			// Break
			break;

		// Three
		case 3:

			// Return number of padding characters
			return 3;

			// Break
			break;

		// Four
		case 4:

			// Return number of padding characters
			return 1;

			// Break
			break;

		// Default
		default:

			// Return number of padding characters
			return 0;

			// Break
			break;
	}
}
