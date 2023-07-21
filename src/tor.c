// Header files
#include <string.h>
#include "base32.h"
#include "common.h"
#include "crypto.h"
#include "device.h"
#include "tor.h"


// Definitions

// Address checksum size
#define ADDRESS_CHECKSUM_SIZE 2

// Address version size
#define ADDRESS_VERSION_SIZE 1

// Address version
#define ADDRESS_VERSION 3


// Constants

// Address checksum seed
static const char ADDRESS_CHECKSUM_SEED[] = {'.', 'o', 'n', 'i', 'o', 'n', ' ', 'c', 'h', 'e', 'c', 'k', 's', 'u', 'm'};


// Function prototypes

// Get checksum
void getChecksum(uint8_t *checksum, const uint8_t *data);


// Supporting function implementation

// Get public key from Tor address
bool getPublicKeyFromTorAddress(cx_ecfp_public_key_t *publicKey, const char *torAddress, const size_t length) {

	// Check if length is invalid
	if(length != TOR_ADDRESS_SIZE) {

		// Return false
		return false;
	}

	// Get decoded Tor address length
	const size_t decodedTorAddressLength = getBase32DecodedLength(torAddress, length);

	// Check if decoded Tor address length is invalid
	if(decodedTorAddressLength != ED25519_PUBLIC_KEY_SIZE + ADDRESS_CHECKSUM_SIZE + ADDRESS_VERSION_SIZE) {

		// Return false
		return false;
	}

	// Decode Tor address
	uint8_t decodedTorAddress[ED25519_PUBLIC_KEY_SIZE + ADDRESS_CHECKSUM_SIZE + ADDRESS_VERSION_SIZE];
	base32Decode(decodedTorAddress, torAddress, length);

	// Check if decoded Tor address's version is invalid
	if(decodedTorAddress[ED25519_PUBLIC_KEY_SIZE + ADDRESS_CHECKSUM_SIZE] != ADDRESS_VERSION) {

		// Return false
		return false;
	}

	// Get checksum from the decoded Tor address
	uint8_t checksum[ADDRESS_CHECKSUM_SIZE];
	getChecksum(checksum, decodedTorAddress);

	// Check if decoded Tor address's checksum is invalid
	if(memcmp(&decodedTorAddress[ED25519_PUBLIC_KEY_SIZE], checksum, sizeof(checksum))) {

		// Return false
		return false;
	}

	// Check if the decoded Tor address isn't a valid Ed25519 public key
	if(!isValidEd25519PublicKey(decodedTorAddress, ED25519_PUBLIC_KEY_SIZE)) {

		// Return false
		return false;
	}

	// Check if getting the public key
	if(publicKey) {

		// Uncompress the decoded Tor address to an Ed25519 public key and throw error if it fails
		uint8_t uncompressedPublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
		uncompressedPublicKey[0] = ED25519_COMPRESSED_PUBLIC_KEY_PREFIX;
		memcpy(&uncompressedPublicKey[PUBLIC_KEY_PREFIX_SIZE], decodedTorAddress, ED25519_PUBLIC_KEY_SIZE);

		CX_THROW(cx_edwards_decompress_point_no_throw(CX_CURVE_Ed25519, uncompressedPublicKey, sizeof(uncompressedPublicKey)));

		// Initialize the public key with the uncompressed public key and throw error if it fails
		CX_THROW(cx_ecfp_init_public_key_no_throw(CX_CURVE_Ed25519, uncompressedPublicKey, sizeof(uncompressedPublicKey), publicKey));
	}

	// Return true
	return true;
}

// Get Tor address from public key
void getTorAddressFromPublicKey(char *torAddress, const uint8_t *publicKey) {

	// Get checksum from the public key
	uint8_t checksum[ADDRESS_CHECKSUM_SIZE];
	getChecksum(checksum, publicKey);

	// Get address data from the public key and checksum
	uint8_t addressData[ED25519_PUBLIC_KEY_SIZE + sizeof(checksum) + ADDRESS_VERSION_SIZE];
	memcpy(addressData, publicKey, ED25519_PUBLIC_KEY_SIZE);
	memcpy(&addressData[ED25519_PUBLIC_KEY_SIZE], checksum, sizeof(checksum));
	addressData[ED25519_PUBLIC_KEY_SIZE + sizeof(checksum)] = ADDRESS_VERSION;

	// Encode the address data to get the Tor address
	base32Encode(torAddress, addressData, sizeof(addressData));
}

// Get Tor address
void getTorAddress(char *torAddress, const uint32_t account, const uint32_t index) {

	// Get Ed25519 public key
	uint8_t ed25519PublicKey[ED25519_PUBLIC_KEY_SIZE];
	getEd25519PublicKey(ed25519PublicKey, account, index);

	// Get Tor address from the Ed25519 public key
	getTorAddressFromPublicKey(torAddress, ed25519PublicKey);
}

// Get checksum
void getChecksum(uint8_t *checksum, const uint8_t *data) {

	// Create checksum data
	uint8_t checksumData[sizeof(ADDRESS_CHECKSUM_SEED) + ED25519_PUBLIC_KEY_SIZE + ADDRESS_VERSION_SIZE];
	memcpy(checksumData, ADDRESS_CHECKSUM_SEED, sizeof(ADDRESS_CHECKSUM_SEED));
	memcpy(&checksumData[sizeof(ADDRESS_CHECKSUM_SEED)], data, ED25519_PUBLIC_KEY_SIZE);
	checksumData[sizeof(ADDRESS_CHECKSUM_SEED) + ED25519_PUBLIC_KEY_SIZE] = ADDRESS_VERSION;

	// Get hash of the checksum data and throw error if it fails
	cx_sha3_t hash;
	CX_THROW(cx_sha3_init_no_throw(&hash, CX_SHA256_SIZE * BITS_IN_A_BYTE));

	uint8_t hashResult[CX_SHA256_SIZE];
	CX_THROW(cx_hash_no_throw(&hash.header, CX_LAST, checksumData, sizeof(checksumData), hashResult, sizeof(hashResult)));

	// Get checksum from the hash
	memcpy(checksum, hashResult, ADDRESS_CHECKSUM_SIZE);
}
