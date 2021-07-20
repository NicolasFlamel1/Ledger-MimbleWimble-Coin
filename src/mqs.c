// Header files
#include <string.h>
#include "base58.h"
#include "common.h"
#include "currency_information.h"
#include "mqs.h"


// Global variables

// MQS data
struct MqsData mqsData;


// Constants

// MQS address private key index
const uint32_t MQS_ADDRESS_PRIVATE_KEY_INDEX = 0;

// MQS shared private key size
const size_t MQS_SHARED_PRIVATE_KEY_SIZE = 32;

// MQS shared private key salt size
const size_t MQS_SHARED_PRIVATE_KEY_SALT_SIZE = 8;

// MQS shared private key number of iterations
const unsigned int MQS_SHARED_PRIVATE_KEY_NUMBER_OF_ITERATIONS = 100;

// Version length
static const size_t VERSION_LENGTH = sizeof(uint16_t);


// Function prototypes

// Get version
uint16_t getVersion(enum Network network);


// Supporting function implementation

// Reset MQS data
void resetMqsData(void) {

	// Clear the MQS data
	explicit_bzero(&mqsData, sizeof(mqsData));
}

// Create MQS shared private key
void createMqsSharedPrivateKey(volatile uint8_t *sharedPrivateKey, uint32_t account, uint8_t *publicKey, uint8_t *salt) {

	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Get private key at the MQS address private key index
			getAddressPrivateKey(&privateKey, account, MQS_ADDRESS_PRIVATE_KEY_INDEX, CX_CURVE_SECP256K1);
			
			// Multiply the public key by the private key
			cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, publicKey, UNCOMPRESSED_PUBLIC_KEY_SIZE, (uint8_t *)privateKey.d, privateKey.d_len);
			
			// Check if target isn't the Nano X
			#ifndef TARGET_NANOX
			
				// Get shared private key from the tweaked public key and salt
				cx_pbkdf2_sha512(&publicKey[PUBLIC_KEY_PREFIX_SIZE], COMPRESSED_PUBLIC_KEY_SIZE - PUBLIC_KEY_PREFIX_SIZE, salt, MQS_SHARED_PRIVATE_KEY_SALT_SIZE, MQS_SHARED_PRIVATE_KEY_NUMBER_OF_ITERATIONS, (uint8_t *)sharedPrivateKey, MQS_SHARED_PRIVATE_KEY_SIZE);
			
			// Otherwise
			#else
			
				// TODO test this on real hardware to see if the extra four zero bytes are necessary
				
				// Get shared private key from the tweaked public key and salt
				uint8_t temp[MQS_SHARED_PRIVATE_KEY_SALT_SIZE + sizeof("\x00\x00\x00\x00") - sizeof((char)'\0')];
				memcpy(temp, salt, MQS_SHARED_PRIVATE_KEY_SALT_SIZE);
				explicit_bzero(&temp[MQS_SHARED_PRIVATE_KEY_SALT_SIZE], sizeof("\x00\x00\x00\x00") - sizeof((char)'\0'));
				
				cx_pbkdf2_sha512(&publicKey[PUBLIC_KEY_PREFIX_SIZE], COMPRESSED_PUBLIC_KEY_SIZE - PUBLIC_KEY_PREFIX_SIZE, temp, sizeof(temp), MQS_SHARED_PRIVATE_KEY_NUMBER_OF_ITERATIONS, (uint8_t *)sharedPrivateKey, MQS_SHARED_PRIVATE_KEY_SIZE);
			#endif
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
bool getPublicKeyFromMqsAddress(cx_ecfp_public_key_t *publicKey, const uint8_t *mqsAddress, size_t length, enum Network network) {

	// Check if length is invalid
	if(length != MQS_ADDRESS_LENGTH) {
	
		// Return false
		return false;
	}
	
	// Check if network is invalid
	if(network > TESTNET) {
	
		// Return false
		return false;
	}

	// Get decoded MQS address length
	const size_t decodedMqsAddressLength = getBase58DecodedLengthWithChecksum(mqsAddress, length);
	
	// Check if decoded MQS address length is invalid
	if(decodedMqsAddressLength != VERSION_LENGTH + COMPRESSED_PUBLIC_KEY_SIZE + BASE58_CHECKSUM_SIZE) {
	
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
	if(getVersion(network) != *(uint16_t *)decodedMqsAddress || !isValidSecp256k1PublicKey(&decodedMqsAddress[VERSION_LENGTH], COMPRESSED_PUBLIC_KEY_SIZE)) {
	
		// Return false
		return false;
	}
	
	// Check if getting the public key
	if(publicKey) {
	
		// Uncompress the decoded MQS address to an secp256k1 public key
		uint8_t uncompressedPublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
		memcpy(uncompressedPublicKey, &decodedMqsAddress[VERSION_LENGTH], COMPRESSED_PUBLIC_KEY_SIZE);
		
		uncompressSecp256k1PublicKey(uncompressedPublicKey, sizeof(uncompressedPublicKey));
		
		// Initialize the public key with the uncompressed public key
		cx_ecfp_init_public_key(CX_CURVE_SECP256K1, uncompressedPublicKey, sizeof(uncompressedPublicKey), publicKey);
	}

	// Return true
	return true;
}

// Get version
uint16_t getVersion(enum Network network) {

	// Initialize version
	uint8_t version[VERSION_LENGTH];

	// Check currency information ID
	switch(currencyInformation.id) {
	
		// MimbleWimble Coin ID
		case MIMBLEWIMBLE_COIN_ID:
		
			// Check network
			switch(network) {
			
				// Mainnet
				case MAINNET:
				
					// Set version
					version[0] = 1;
					version[1] = 69;
				
					// Break
					break;
				
				// Testnet
				case TESTNET:
				
					// Set version
					version[0] = 1;
					version[1] = 121;
				
					// Break
					break;
				
				// Default
				default:
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
			}
			
		// Grin ID
		case GRIN_ID:
		
			// Check network
			switch(network) {
			
				// Mainnet
				case MAINNET:
				
					// Set version
					version[0] = 1;
					version[1] = 11;
				
					// Break
					break;
				
				// Testnet
				case TESTNET:
				
					// Set version
					version[0] = 1;
					version[1] = 120;
				
					// Break
					break;
				
				// Default
				default:
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
			}
		
		// Default
		default:
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
	}
		
	// Return version
	return *(uint16_t *)version;
}
