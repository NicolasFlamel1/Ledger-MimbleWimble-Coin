// Header files
#include <alloca.h>
#include <string.h>
#include "base58.h"
#include "common.h"


// Definitions

// Number base
#define NUMBER_BASE 58

// Size percent increase
#define SIZE_PERCENT_INCREASE 138

// Size percent decrease
#define SIZE_PERCENT_DECREASE 733


// Constants

// Characters
static const char CHARACTERS[] = {'1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};


// Function prototypes

// Base58 encode get length
static size_t base58EncodeGetLength(char *result, const uint8_t *data, const size_t length);

// Base58 decode get length
static size_t base58DecodeGetLength(uint8_t *result, const char *data, const size_t length);

// Get checksum
static void getChecksum(uint8_t *checksum, const uint8_t *data, const size_t length);


// Supporting function implementation

// Get base58 encoded length
size_t getBase58EncodedLength(const uint8_t *data, const size_t length) {

	// Return base58 encoded length
	return base58EncodeGetLength(NULL, data, length);
}

// Base58 encode
void base58Encode(char *result, const uint8_t *data, const size_t length) {

	// Get base58 encoding of the data
	base58EncodeGetLength(result, data, length);
}

// Get base58 encoded length with checksum
size_t getBase58EncodedLengthWithChecksum(const uint8_t *data, const size_t length) {

	// Return base58 encoded length with checksum
	return base58EncodeGetLength(NULL, data, length + BASE58_CHECKSUM_SIZE);
}

// Base58 encode with checksum
void base58EncodeWithChecksum(char *result, uint8_t *data, const size_t length) {

	// Append checksum to the data
	getChecksum(&data[length - BASE58_CHECKSUM_SIZE], data, length - BASE58_CHECKSUM_SIZE);

	// Get base58 encoding of the data
	base58EncodeGetLength(result, data, length);
}

// Get base58 decoded length
size_t getBase58DecodedLength(const char *data, const size_t length) {

	// Return base58 decoded length
	return base58DecodeGetLength(NULL, data, length);
}

// Base58 decode
void base58Decode(uint8_t *result, const char *data, const size_t length) {

	// Get base58 decoding of the data
	base58DecodeGetLength(result, data, length);
}

// Get base58 decoded length with checksum
size_t getBase58DecodedLengthWithChecksum(const char *data, const size_t length) {

	// Get base58 decoded length
	const size_t resultLength = base58DecodeGetLength(NULL, data, length);

	// Return base58 decoded length with checksum if valid
	return (resultLength >= BASE58_CHECKSUM_SIZE) ? resultLength : INVALID_BASE58_SIZE;
}

// Base58 decode with checksum
bool base58DecodeWithChecksum(uint8_t *result, const char *data, const size_t length) {

	// Get base58 decoding of the data
	const size_t resultLength = base58DecodeGetLength(result, data, length);

	// Get checksum of the result
	uint8_t checksum[BASE58_CHECKSUM_SIZE];
	getChecksum(checksum, result, resultLength - BASE58_CHECKSUM_SIZE);

	// Return if the checksum matches the expected result
	return !memcmp(&result[resultLength - BASE58_CHECKSUM_SIZE], checksum, sizeof(checksum));
}

// Base58 encode get length
size_t base58EncodeGetLength(char *result, const uint8_t *data, const size_t length) {

	// Go through all leading zeros in the data
	size_t numberOfLeadingZeros = 0;
	while(numberOfLeadingZeros < length && !data[numberOfLeadingZeros]) {

		// Increment number of leading zeros
		++numberOfLeadingZeros;
	}

	// Get buffer size
	const size_t bufferSize = (length - numberOfLeadingZeros) * SIZE_PERCENT_INCREASE / 100 + 1;

	// Create buffer
	uint8_t *buffer = alloca(bufferSize);
	explicit_bzero(buffer, bufferSize);

	// Go through all bytes in the byte array after the leading zeros
	size_t currentLength = 0;
	for(size_t i = numberOfLeadingZeros; i < length; ++i) {

		// Get byte
		uint8_t byte = data[i];

		// Go through all base 58 components of the byte
		size_t j = 0;
		for(size_t k = bufferSize - 1; byte || j < currentLength; --k) {

			// Include the current buffer value in the byte
			const uint16_t value = byte + (UINT8_MAX + 1) * buffer[k];

			// Set value in the buffer
			buffer[k] = value % NUMBER_BASE;

			// Update the byte
			byte = value / NUMBER_BASE;

			// Increment j
			++j;

			// Check if at the last component
			if(!k) {

				// Break
				break;
			}
		}

		// Update current length
		currentLength = j;
	}

	// Go through all leading zeros in the buffer
	size_t bufferIndex = bufferSize - currentLength;
	while(bufferIndex < bufferSize && !buffer[bufferIndex]) {

		// Increment buffer index
		++bufferIndex;
	}

	// Get result size
	const size_t resultSize = bufferSize - bufferIndex + numberOfLeadingZeros;

	// Check if getting result
	if(result) {

		// Set result to start with the number of leading zeros in base58
		memset(result, CHARACTERS[0], numberOfLeadingZeros);

		// Go through all bytes in the buffer after the leading zeros
		for(size_t i = 0; bufferIndex < bufferSize; ++i, ++bufferIndex) {

			// Append buffer's value in base58 to the result
			result[i + numberOfLeadingZeros] = CHARACTERS[buffer[bufferIndex]];
		}
	}

	// Return result size
	return resultSize;
}

// Base58 decode get length
size_t base58DecodeGetLength(uint8_t *result, const char *data, const size_t length) {

	// Go through all leading zeros in base58 in the string
	size_t numberOfLeadingZeros = 0;
	while(numberOfLeadingZeros < length && data[numberOfLeadingZeros] == CHARACTERS[0]) {

		// Increment number of leading zeros
		++numberOfLeadingZeros;
	}

	// Get buffer size
	const size_t bufferSize = (length - numberOfLeadingZeros) * SIZE_PERCENT_DECREASE / 1000 + 1;

	// Create buffer
	uint8_t *buffer = alloca(bufferSize);
	explicit_bzero(buffer, bufferSize);

	// Go through all characters in the string after the leading zeros in base58
	size_t currentLength = 0;
	for(size_t i = numberOfLeadingZeros; i < length; ++i) {

		// Get position of character in the characters
		const char *characterOffset = (char *)memchr(CHARACTERS, data[i], sizeof(CHARACTERS));

		// Check if character is invalid
		if(!characterOffset) {

			// Return invalid base58 size
			return INVALID_BASE58_SIZE;
		}

		// Get character as byte
		uint8_t byte = characterOffset - CHARACTERS;

		// Go through all base 58 components of the byte
		size_t j = 0;
		for(size_t k = bufferSize - 1; byte || j < currentLength; --k) {

			// Include the current buffer value in the byte
			const uint16_t value = byte + NUMBER_BASE * buffer[k];

			// Set value in the buffer
			buffer[k] = value % (UINT8_MAX + 1);

			// Update the byte
			byte = value / (UINT8_MAX + 1);

			// Increment j
			++j;

			// Check if at the last component
			if(!k) {

				// Break
				break;
			}
		}

		// Update current length
		currentLength = j;
	}

	// Go through all leading zeros in the buffer
	size_t bufferIndex = bufferSize - currentLength;
	while(bufferIndex < bufferSize && !buffer[bufferIndex]) {

		// Increment buffer index
		++bufferIndex;
	}

	// Get result size
	const size_t resultSize = bufferSize - bufferIndex + numberOfLeadingZeros;

	// Check if getting result
	if(result) {

		// Set result to start with the number of leading zeros
		explicit_bzero(result, numberOfLeadingZeros);

		// Go through all bytes in the buffer after the leading zeros
		for(size_t i = 0; bufferIndex < bufferSize; ++i, ++bufferIndex) {

			// Append buffer's value to the result
			result[i + numberOfLeadingZeros] = buffer[bufferIndex];
		}
	}

	// Return result size
	return resultSize;
}

// Get checksum
void getChecksum(uint8_t *checksum, const uint8_t *data, const size_t length) {

	// Get hash of data
	uint8_t hash[CX_SHA256_SIZE];
	cx_hash_sha256(data, length, hash, sizeof(hash));

	// Get hash of hash
	cx_hash_sha256(hash, sizeof(hash), hash, sizeof(hash));

	// Set checksum to hash
	memcpy(checksum, hash, BASE58_CHECKSUM_SIZE);
}
