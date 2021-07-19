// Header files
#include <string.h>
#include "base32.h"
#include "common.h"
#include "crypto.h"
#include "device.h"
#include "tor.h"


// Constants

// Tor address private key index
const uint32_t TOR_ADDRESS_PRIVATE_KEY_INDEX = 0;

// Ed25519 signature size
const size_t ED25519_SIGNATURE_SIZE = 64;

// Address checksum length
static const size_t ADDRESS_CHECKSUM_LENGTH = 2;

// Address version
static const uint8_t ADDRESS_VERSION = 3;

// Address checksum seed
static const uint8_t ADDRESS_CHECKSUM_SEED[] = {'.', 'o', 'n', 'i', 'o', 'n', ' ', 'c', 'h', 'e', 'c', 'k', 's', 'u', 'm'};


// Supporting function implementation

// Get Tor public key
void getTorPublicKey(cx_ecfp_public_key_t *publicKey, cx_ecfp_private_key_t *privateKey) {

	// Get public key from private key
	cx_ecfp_generate_pair(CX_CURVE_Ed25519, publicKey, privateKey, KEEP_PRIVATE_KEY);
	
	// Compress the public key
	cx_edwards_compress_point(CX_CURVE_Ed25519, publicKey->W, publicKey->W_len);
}

// Get public key from Tor address
bool getPublicKeyFromTorAddress(cx_ecfp_public_key_t *publicKey, const uint8_t *torAddress, size_t length) {

	// Check if length is invalid
	if(length != TOR_ADDRESS_LENGTH) {
	
		// Return false
		return false;
	}

	// Get decoded Tor address length
	const size_t decodedTorAddressLength = getBase32DecodedLength(torAddress, length);
	
	// Check if decoded Tor address length is invalid
	if(decodedTorAddressLength != ED25519_PUBLIC_KEY_SIZE + ADDRESS_CHECKSUM_LENGTH + sizeof(ADDRESS_VERSION)) {
	
		// Return false
		return false;
	}
	
	// Decode Tor address
	uint8_t decodedTorAddress[decodedTorAddressLength];
	base32Decode(decodedTorAddress, torAddress, length);
	
	// Check if decoded Tor address's version is invalid
	if(decodedTorAddress[ED25519_PUBLIC_KEY_SIZE + ADDRESS_CHECKSUM_LENGTH] != ADDRESS_VERSION) {
	
		// Return false
		return false;
	}
	
	// Create checksum data
	uint8_t checksumData[sizeof(ADDRESS_CHECKSUM_SEED) + ED25519_PUBLIC_KEY_SIZE + sizeof(ADDRESS_VERSION)];
	memcpy(checksumData, ADDRESS_CHECKSUM_SEED, sizeof(ADDRESS_CHECKSUM_SEED));
	memcpy(&checksumData[sizeof(ADDRESS_CHECKSUM_SEED)], decodedTorAddress, ED25519_PUBLIC_KEY_SIZE);
	checksumData[sizeof(ADDRESS_CHECKSUM_SEED) + ED25519_PUBLIC_KEY_SIZE] = ADDRESS_VERSION;
	
	// Get checksum as a hash of the checksum data
	cx_sha3_t hash;
	cx_sha3_init(&hash, CX_SHA256_SIZE * BITS_IN_A_BYTE);
	
	uint8_t checksum[CX_SHA256_SIZE];
	cx_hash(&hash.header, CX_LAST, checksumData, sizeof(checksumData), checksum, sizeof(checksum));
	
	// Check if decoded Tor address's checksum is invalid
	if(memcmp(&decodedTorAddress[ED25519_PUBLIC_KEY_SIZE], checksum, ADDRESS_CHECKSUM_LENGTH)) {
	
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
	
		// Uncompress the decoded Tor address to an Ed25519 public key
		uint8_t uncompressedPublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
		uncompressedPublicKey[0] = EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
		memcpy(&uncompressedPublicKey[PUBLIC_KEY_PREFIX_SIZE], decodedTorAddress, ED25519_PUBLIC_KEY_SIZE);
		
		cx_edwards_decompress_point(CX_CURVE_Ed25519, uncompressedPublicKey, sizeof(uncompressedPublicKey));
		
		// Initialize the public key with the uncompressed public key
		cx_ecfp_init_public_key(CX_CURVE_Ed25519, uncompressedPublicKey, sizeof(uncompressedPublicKey), publicKey);
	}
	
	// Return true
	return true;
}
