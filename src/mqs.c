// Header files
#include <string.h>
#include "base58.h"
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "mqs.h"


// Definitions

// MQS shared private key number of iterations
#define MQS_SHARED_PRIVATE_KEY_NUMBER_OF_ITERATIONS 100


// Supporting function implementation

// Create MQS shared private key
void createMqsSharedPrivateKey(volatile uint8_t *sharedPrivateKey, uint32_t account, uint32_t index, const char *address, const uint8_t *salt) {

	// Check if getting public key from address failed
	cx_ecfp_public_key_t publicKey;
	if(!getPublicKeyFromMqsAddress(&publicKey, address, MQS_ADDRESS_SIZE)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Get private key
			getAddressPrivateKey(&privateKey, account, index, CX_CURVE_SECP256K1);
			
			// Check if the product of the public key by the private key has an x component of zero
			CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, publicKey.W, (uint8_t *)privateKey.d, privateKey.d_len));
			
			if(isZeroArraySecure(&publicKey.W[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Get shared private key from the tweaked public key and salt
			cx_pbkdf2_sha512(&publicKey.W[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE, (uint8_t *)salt, MQS_SHARED_PRIVATE_KEY_SALT_SIZE, MQS_SHARED_PRIVATE_KEY_NUMBER_OF_ITERATIONS, (uint8_t *)sharedPrivateKey, MQS_SHARED_PRIVATE_KEY_SIZE);
			
			// Check if shared private key is zero
			if(isZeroArraySecure((uint8_t *)sharedPrivateKey, MQS_SHARED_PRIVATE_KEY_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
		}
		
		// Finally
		FINALLY {
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}
	
	// End try
	END_TRY;
}

// Get public key from MQS address
bool getPublicKeyFromMqsAddress(cx_ecfp_public_key_t *publicKey, const char *mqsAddress, size_t length) {

	// Check if length is invalid
	if(length != MQS_ADDRESS_SIZE) {
	
		// Return false
		return false;
	}
	
	// Get decoded MQS address length
	const size_t decodedMqsAddressLength = getBase58DecodedLengthWithChecksum(mqsAddress, length);
	
	// Check if decoded MQS address length is invalid
	if(decodedMqsAddressLength != sizeof(currencyInformation->mqsVersion) + COMPRESSED_PUBLIC_KEY_SIZE + BASE58_CHECKSUM_SIZE) {
	
		// Return false
		return false;
	}
	
	// Check if decoding MQS address failed
	uint8_t decodedMqsAddress[decodedMqsAddressLength];
	if(!base58DecodeWithChecksum(decodedMqsAddress, mqsAddress, length)) {
	
		// Return false
		return false;
	}
	
	// Check if decoded MQS address is invalid
	if(memcmp(currencyInformation->mqsVersion, decodedMqsAddress, sizeof(currencyInformation->mqsVersion)) || !isValidSecp256k1PublicKey(&decodedMqsAddress[sizeof(currencyInformation->mqsVersion)], COMPRESSED_PUBLIC_KEY_SIZE)) {
	
		// Return false
		return false;
	}
	
	// Check if getting the public key
	if(publicKey) {
	
		// Uncompress the decoded MQS address to an secp256k1 public key
		uint8_t uncompressedPublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
		memcpy(uncompressedPublicKey, &decodedMqsAddress[sizeof(currencyInformation->mqsVersion)], COMPRESSED_PUBLIC_KEY_SIZE);
		uncompressSecp256k1PublicKey(uncompressedPublicKey);
		
		// Initialize the public key with the uncompressed public key
		cx_ecfp_init_public_key(CX_CURVE_SECP256K1, uncompressedPublicKey, sizeof(uncompressedPublicKey), publicKey);
	}

	// Return true
	return true;
}

// Get MQS address from public key
void getMqsAddressFromPublicKey(char *mqsAddress, const uint8_t *publicKey) {

	// Get address data from version and the public key
	uint8_t addressData[sizeof(currencyInformation->mqsVersion) + COMPRESSED_PUBLIC_KEY_SIZE + BASE58_CHECKSUM_SIZE];
	memcpy(addressData, currencyInformation->mqsVersion, sizeof(currencyInformation->mqsVersion));
	memcpy(&addressData[sizeof(currencyInformation->mqsVersion)], publicKey, COMPRESSED_PUBLIC_KEY_SIZE);
	
	// Encode the address data to get the MQS address
	base58EncodeWithChecksum(mqsAddress, addressData, sizeof(addressData));
}

// Get MQS address
void getMqsAddress(char *mqsAddress, uint32_t account, uint32_t index) {

	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;
	
	// Initialize address public key
	volatile uint8_t addressPublicKey[COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get address private key
			getAddressPrivateKey(&addressPrivateKey, account, index, CX_CURVE_SECP256K1);
			
			// Get address public key from the address private key
			getPublicKeyFromPrivateKey(addressPublicKey, (cx_ecfp_private_key_t *)&addressPrivateKey);
		}
		
		// Finally
		FINALLY {
		
			// Clear the address private key
			explicit_bzero((cx_ecfp_private_key_t *)&addressPrivateKey, sizeof(addressPrivateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Get MQS address from the address public key
	getMqsAddressFromPublicKey(mqsAddress, (uint8_t *)addressPublicKey);
}
