// Header files
#include <os.h>
#include <string.h>
#include "blake2b.h"
#include "crypto.h"
#include "currency_information.h"
#include "mqs.h"
#include "secp256k1_bulletproofs.h"
#include "secp256k1_preallocated.h"
#include "tor.h"


// Constants

// Nonce size
const size_t NONCE_SIZE = 32;

// Commitment size
const size_t COMMITMENT_SIZE = 33;

// Uncompressed public key size
const size_t UNCOMPRESSED_PUBLIC_KEY_SIZE = 65;

// Identifier maximum depth
const size_t IDENTIFIER_MAXIMUM_DEPTH = 4;

// Identifier size
const size_t IDENTIFIER_SIZE = sizeof(uint8_t) + IDENTIFIER_MAXIMUM_DEPTH * sizeof(uint32_t);

// Single-signer compact signature size
const size_t SINGLE_SIGNER_COMPACT_SIGNATURE_SIZE = 64;

// Single-signer message size
const size_t SINGLE_SIGNER_MESSAGE_SIZE = 32;

// Maximum DER signature size
const size_t MAXIMUM_DER_SIGNATURE_SIZE = 72;

// Keep private
const int KEEP_PRIVATE_KEY = 1;

// Even compressed public key prefix
const uint8_t EVEN_COMPRESSED_PUBLIC_KEY_PREFIX = 0x02;

// Odd compressed public key prefix
const uint8_t ODD_COMPRESSED_PUBLIC_KEY_PREFIX = 0x03;

// Uncompressed public key prefix
const uint8_t UNCOMPRESSED_PUBLIC_KEY_PREFIX = 0x04;

// Ed25519 compressed public key prefix
const uint8_t ED25519_COMPRESSED_PUBLIC_KEY_PREFIX = 0x02;

// Ed25519 signature size
const size_t ED25519_SIGNATURE_SIZE = 64;

// Secp256k1 curve order
const uint8_t SECP256K1_CURVE_ORDER[CURVE_ORDER_SIZE] = {
	0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x41
};

// Secp256k1 curve order half
const uint8_t SECP256k1_CURVE_ORDER_HALF[CURVE_ORDER_SIZE] = {
	0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x5D, 0x57, 0x6E, 0x73, 0x57, 0xA4, 0x50, 0x1D, 0xDF, 0xE9, 0x2F, 0x46, 0x68, 0x1B, 0x20, 0xA0
};

// Secp256k1 curve prime
const uint8_t SECP256K1_CURVE_PRIME[CURVE_ORDER_SIZE] = {
	0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xFF, 0xFF, 0xFC, 0x2F
};

// Secp256k1 curve square root exponent
const uint8_t SECP256K1_CURVE_SQUARE_ROOT_EXPONENT[CURVE_ORDER_SIZE] = {
	0x3F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xBF, 0xFF, 0xFF, 0x0C
};

// Ed25519 curve order
static const uint8_t ED25519_CURVE_ORDER[] = {
	0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xED
};

// Hardened path mask
static const uint32_t HARDENED_PATH_MASK = 0x80000000;

// Maximum account
const uint32_t MAXIMUM_ACCOUNT = HARDENED_PATH_MASK - 1;

// X25519 public key size
const size_t X25519_PUBLIC_KEY_SIZE = 32;

// X25519 compressed public key prefix
const uint8_t X25519_COMPRESSED_PUBLIC_KEY_PREFIX = 0x02;

// Generator G
const secp256k1_generator GENERATOR_G = {
	{
		0x79, 0xBE, 0x66, 0x7E, 0xF9, 0xDC, 0xBB, 0xAC, 0x55, 0xA0, 0x62, 0x95, 0xCE, 0x87, 0x0B, 0x07, 0x02, 0x9B, 0xFC, 0xDB, 0x2D, 0xCE, 0x28, 0xD9, 0x59, 0xF2, 0x81, 0x5B, 0x16, 0xF8, 0x17, 0x98, 0x48, 0x3A, 0xDA, 0x77, 0x26, 0xA3, 0xC4, 0x65, 0x5D, 0xA4, 0xFB, 0xFC, 0x0E, 0x11, 0x08, 0xA8, 0xFD, 0x17, 0xB4, 0x48, 0xA6, 0x85, 0x54, 0x19, 0x9C, 0x47, 0xD0, 0x8F, 0xFB, 0x10, 0xD4, 0xB8
	}
};

// Generator H
static const secp256k1_generator GENERATOR_H = {
	{
		0x50, 0x92, 0x9B, 0x74, 0xC1, 0xA0, 0x49, 0x54, 0xB7, 0x8B, 0x4B, 0x60, 0x35, 0xE9, 0x7A, 0x5E, 0x07, 0x8A, 0x5A, 0x0F, 0x28, 0xEC, 0x96, 0xD5, 0x47, 0xBF, 0xEE, 0x9A, 0xCE, 0x80, 0x3A, 0xC0, 0x31, 0xD3, 0xC6, 0x86, 0x39, 0x73, 0x92, 0x6E, 0x04, 0x9E, 0x63, 0x7C, 0xB1, 0xB5, 0xF4, 0x0A, 0x36, 0xDA, 0xC2, 0x8A, 0xF1, 0x76, 0x69, 0x68, 0xC3, 0x0C, 0x23, 0x13, 0xF3, 0xA3, 0x89, 0x04
	}
};

// Node size
static const size_t NODE_SIZE = 64;

// Chain code size
static const size_t CHAIN_CODE_SIZE = 32;

// BIP32 path without coin type and account
static const uint32_t BIP32_PATH_WITHOUT_COIN_TYPE_AND_ACCOUNT[] = {

	// Purpose
	44 | HARDENED_PATH_MASK,
	
	// Coin type
	HARDENED_PATH_MASK,
	
	// Account
	HARDENED_PATH_MASK,
	
	// Change
	0,
	
	// Address index
	0
};

// BIP32 path coin type index
static const size_t BIP32_PATH_COIN_TYPE_INDEX = 1;

// BIP32 path account index
static const size_t BIP32_PATH_ACCOUNT_INDEX = 2;

// Seed key
static const char SEED_KEY[] = "IamVoldemort";

// Generator J public
static const secp256k1_pubkey GENERATOR_J_PUBLIC = {
	{
		0x5F, 0x15, 0x21, 0x36, 0x93, 0x93, 0x01, 0x2A, 0x8D, 0x8B, 0x39, 0x7E, 0x9B, 0xF4, 0x54, 0x29, 0x2F, 0x5A, 0x1B, 0x3D, 0x38, 0x85, 0x16, 0xC2, 0xF3, 0x03, 0xFC, 0x95, 0x67, 0xF5, 0x60, 0xB8, 0x3A, 0xC4, 0xC5, 0xA6, 0xDC, 0xA2, 0x01, 0x59, 0xFC, 0x56, 0xCF, 0x74, 0x9A, 0xA6, 0xA5, 0x65, 0x31, 0x6A, 0xA5, 0x03, 0x74, 0x42, 0x3F, 0x42, 0x53, 0x8F, 0xAA, 0x2C, 0xD3, 0x09, 0x3F, 0xA4
	}
};

// Address private key blinding factor value
static uint64_t ADDRESS_PRIVATE_KEY_BLINDING_FACTOR_VALUE = 713;

// Address private key hash key
static const char ADDRESS_PRIVATE_KEY_HASH_KEY[] = "Grinbox_seed";

// Secp256k1 private key size
static const size_t SECP256k1_PRIVATE_KEY_SIZE = 32;

// Bits proven per range
static const size_t BITS_PROVEN_PER_RANGE = sizeof(uint64_t) * BITS_IN_A_BYTE;

// Number of generators tau x
static const size_t NUMBER_OF_GENERATORS_TAU_X = 256;

// Number of generators t one and t two
static const size_t NUMBER_OF_GENERATORS_T_ONE_AND_T_TWO = 128;

// Scratch space size
static const size_t SCRATCH_SPACE_SIZE = 116;

// Commitment even prefix
static const uint8_t COMMITMENT_EVEN_PREFIX = 8;

// Commitment odd prefix
static const uint8_t COMMITMENT_ODD_PREFIX = 9;


// Supporting function implementation

// Get private key and chain code
void getPrivateKeyAndChainCode(volatile cx_ecfp_private_key_t *privateKey, volatile uint8_t *chainCode, uint32_t account) {

	// Copy BIP32 path without coin type and account
	uint32_t bip32Path[ARRAYLEN(BIP32_PATH_WITHOUT_COIN_TYPE_AND_ACCOUNT)];
	memcpy(bip32Path, BIP32_PATH_WITHOUT_COIN_TYPE_AND_ACCOUNT, sizeof(BIP32_PATH_WITHOUT_COIN_TYPE_AND_ACCOUNT));
	
	// Set BIP32 path's coin type
	bip32Path[BIP32_PATH_COIN_TYPE_INDEX] |= currencyInformation.bip44CoinType;
	
	// Set BIP32 path's account
	bip32Path[BIP32_PATH_ACCOUNT_INDEX] |= account;

	// Initialize node
	volatile uint8_t node[NODE_SIZE];

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Derive node and chain code from path and seed key
			os_perso_derive_node_with_seed_key(HDW_NORMAL, CX_CURVE_SECP256K1, bip32Path, ARRAYLEN(bip32Path), (uint8_t *)node, (uint8_t *)chainCode, (unsigned char *)SEED_KEY, sizeof(SEED_KEY) - sizeof((char)'\0'));
			
			// Get private key from node
			cx_ecfp_init_private_key(CX_CURVE_SECP256K1, (uint8_t *)node, sizeof(privateKey->d), (cx_ecfp_private_key_t *)privateKey);
			
			// Check if private key isn't a valid secret key
			if(!isValidSecp256k1PrivateKey((uint8_t *)privateKey->d, privateKey->d_len)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
		}
		
		// Finally
		FINALLY {
		
			// Clear the node
			explicit_bzero((uint8_t *)node, sizeof(node));
		}
	}
	
	// End try
	END_TRY;
}

// Get public key from private key
void getPublicKeyFromPrivateKey(uint8_t *publicKey, const cx_ecfp_private_key_t *privateKey) {
	
	// Get uncompressed public key from the private key
	cx_ecfp_public_key_t uncompressedPublicKey;
	cx_ecfp_generate_pair(CX_CURVE_SECP256K1, &uncompressedPublicKey, (cx_ecfp_private_key_t *)privateKey, KEEP_PRIVATE_KEY);
	
	// Set prefix in the public key
	publicKey[0] = (uncompressedPublicKey.W[uncompressedPublicKey.W_len - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
	
	// Set x component in the public key
	memcpy(&publicKey[PUBLIC_KEY_PREFIX_SIZE], &uncompressedPublicKey.W[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE);
}

// Derive child key
void deriveChildKey(volatile cx_ecfp_private_key_t *privateKey, volatile uint8_t *chainCode, uint32_t account, const uint32_t *path, size_t pathLength, bool useProvidedPrivateKeyAndChainCode) {

	// Check if not using the provided private key and chain code
	if(!useProvidedPrivateKeyAndChainCode) {

		// Get private key and chain code
		getPrivateKeyAndChainCode(privateKey, chainCode, account);
	}
	
	// Go through the path
	for(size_t i = 0; i < pathLength; ++i) {
	
		// Initialize data
		volatile uint8_t data[COMPRESSED_PUBLIC_KEY_SIZE + sizeof(path[i])];
		
		// Initialize node
		volatile uint8_t node[NODE_SIZE];
		
		// Initialize new private key
		volatile cx_ecfp_private_key_t newPrivateKey;
		
		// Begin try
		BEGIN_TRY {
		
			// Try
			TRY {
			
				// Check if path is hardened
				if(path[i] & HARDENED_PATH_MASK) {
				
					// Set the first part of data to zero
					data[0] = 0;
					
					// Append private key to the data
					memcpy((uint8_t *)&data[sizeof(data[0])], (uint8_t *)privateKey->d, privateKey->d_len);
				}
				
				// Otherwise
				else {
				
					// Change the private key's curve
					cx_curve_t curve = privateKey->curve;
					privateKey->curve = CX_CURVE_SECP256K1;
				
					// Get compressed public key from the private key set it in the data
					getPublicKeyFromPrivateKey((uint8_t *)data, (cx_ecfp_private_key_t *)privateKey);
					
					// Restore the private key's curve
					privateKey->curve = curve;
				}
				
				// Append the path to the data
				U4BE_ENCODE((uint8_t *)data, COMPRESSED_PUBLIC_KEY_SIZE, path[i]);
				
				// Get the path's node as the HMAC-SHA512 of the data with the chain code as the key
				cx_hmac_sha512((uint8_t *)chainCode, CHAIN_CODE_SIZE, (uint8_t *)data, sizeof(data), (uint8_t *)node, sizeof(node));
				
				// Get new private key from node
				cx_ecfp_init_private_key(privateKey->curve, (uint8_t *)node, sizeof(newPrivateKey.d), (cx_ecfp_private_key_t *)&newPrivateKey);
				
				// Check if new private key isn't a valid private key
				if(!isValidSecp256k1PrivateKey((uint8_t *)newPrivateKey.d, newPrivateKey.d_len)) {
				
					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}
				
				// Add private key to the new private key
				cx_math_addm((uint8_t *)newPrivateKey.d, (uint8_t *)newPrivateKey.d, (uint8_t *)privateKey->d, SECP256K1_CURVE_ORDER, newPrivateKey.d_len);
				
				// Check if new private key isn't a valid private key
				if(!isValidSecp256k1PrivateKey((uint8_t *)newPrivateKey.d, newPrivateKey.d_len)) {
				
					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}
				
				// Get chain code from the node
				memcpy((uint8_t *)chainCode, (uint8_t *)&node[sizeof(newPrivateKey.d)], CHAIN_CODE_SIZE);
				
				// Set private key to the new private key
				memcpy((cx_ecfp_private_key_t *)privateKey, (cx_ecfp_private_key_t *)&newPrivateKey, sizeof(newPrivateKey));
			}
		
			// Finally
			FINALLY {
			
				// Clear the data
				explicit_bzero((uint8_t *)data, sizeof(data));
				
				// Clear the node
				explicit_bzero((uint8_t *)node, sizeof(node));
				
				// Clear the new private key
				explicit_bzero((cx_ecfp_private_key_t *)&newPrivateKey, sizeof(newPrivateKey));
			}
		}
		
		// End try
		END_TRY;
	}
}

// Derive blinding factor
void deriveBlindingFactor(volatile uint8_t *blindingFactor, uint32_t account, uint64_t value, const uint32_t *path, size_t pathLength, enum SwitchType switchType) {

	// Initialize child private key and chain code
	volatile cx_ecfp_private_key_t childPrivateKey;
	volatile uint8_t childChainCode[CHAIN_CODE_SIZE];
	
	// Initialize hash
	volatile cx_sha256_t hash;
	
	// Initialize publicKeyGenerator
	volatile uint8_t publicKeyGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_J_PUBLIC)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Derive child's private key and chain code at path
			deriveChildKey(&childPrivateKey, childChainCode, account, path, pathLength, false);
			
			// Check switch type
			switch(switchType) {
			
				// No switch type
				case NO_SWITCH_TYPE:
				
					// Set blinding factor to the child's private key
					memcpy((uint8_t *)blindingFactor, (uint8_t *)childPrivateKey.d, childPrivateKey.d_len);
				
					// Break
					break;
				
				// Regular switch type
				case REGULAR_SWITCH_TYPE:
				
					{
					
						// Get commitment from value and child's private key
						uint8_t commitment[COMMITMENT_SIZE];
						commitValue(commitment, value, (uint8_t *)childPrivateKey.d);
						
						// Add commitment to the hash
						cx_sha256_init((cx_sha256_t *)&hash);
						cx_hash((cx_hash_t *)&hash, 0, commitment, sizeof(commitment), NULL, 0);
						
						// Get product of the generator public key and the child's private key
						memcpy((uint8_t *)&publicKeyGenerator[PUBLIC_KEY_PREFIX_SIZE], &GENERATOR_J_PUBLIC, sizeof(GENERATOR_J_PUBLIC));
						volatile uint8_t *x = &publicKeyGenerator[PUBLIC_KEY_PREFIX_SIZE];
						swapEndianness((uint8_t *)x, PUBLIC_KEY_COMPONENT_SIZE);
						volatile uint8_t *y = &publicKeyGenerator[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
						swapEndianness((uint8_t *)y, PUBLIC_KEY_COMPONENT_SIZE);
						
						// Check if the result is infinity or its x component is zero
						if(!cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, (uint8_t *)publicKeyGenerator, sizeof(publicKeyGenerator), (uint8_t *)childPrivateKey.d, BLINDING_FACTOR_SIZE) || cx_math_is_zero((uint8_t *)x, PUBLIC_KEY_COMPONENT_SIZE)) {
						
							// Throw internal error error
							THROW(INTERNAL_ERROR_ERROR);
						}
						
						// Compress the result
						publicKeyGenerator[0] = (publicKeyGenerator[sizeof(publicKeyGenerator) - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
						
						// Add result to the hash and get the blinding factor
						cx_hash((cx_hash_t *)&hash, CX_LAST, (uint8_t *)publicKeyGenerator, COMPRESSED_PUBLIC_KEY_SIZE, (uint8_t *)blindingFactor, BLINDING_FACTOR_SIZE);
						
						// Check if the blinding factor overflows
						if(cx_math_cmp((uint8_t *)blindingFactor, SECP256K1_CURVE_ORDER, BLINDING_FACTOR_SIZE) >= 0) {
						
							// Throw internal error error
							THROW(INTERNAL_ERROR_ERROR);
						}
						
						// Add the child's private key to the blinding factor
						cx_math_addm((uint8_t *)blindingFactor, (uint8_t *)blindingFactor, (uint8_t *)childPrivateKey.d, SECP256K1_CURVE_ORDER, BLINDING_FACTOR_SIZE);
						
						// Check if blinding factor isn't a valid secret key
						if(!isValidSecp256k1PrivateKey((uint8_t *)blindingFactor, BLINDING_FACTOR_SIZE)) {
						
							// Throw internal error error
							THROW(INTERNAL_ERROR_ERROR);
						}
					}
				
					// Break
					break;
			}
		}
		
		// Finally
		FINALLY {
		
			// Clear the public key generator
			explicit_bzero((uint8_t *)publicKeyGenerator, sizeof(publicKeyGenerator));
		
			// Clear the hash
			explicit_bzero((cx_sha256_t *)&hash, sizeof(hash));
		
			// Clear the child private key and chain code
			explicit_bzero((cx_ecfp_private_key_t *)&childPrivateKey, sizeof(childPrivateKey));
			explicit_bzero((uint8_t *)childChainCode, sizeof(childChainCode));
		}
	}
	
	// End try
	END_TRY;
}

// Commit value
void commitValue(uint8_t *commitment, uint64_t value, const uint8_t *blindingFactor) {

	// Check if value isn't zero
	uint8_t valueGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_H)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	bool isInfinity = true;
	if(value) {

		// Get product of the value and its generator
		memcpy(&valueGenerator[PUBLIC_KEY_PREFIX_SIZE], &GENERATOR_H, sizeof(GENERATOR_H));
		uint8_t temp[BLINDING_FACTOR_SIZE] = {};
		U4BE_ENCODE(temp, sizeof(temp) - sizeof(uint32_t), value);
		U4BE_ENCODE(temp, sizeof(temp) - sizeof(uint64_t), value >> (sizeof(uint32_t) * BITS_IN_A_BYTE));
		
		isInfinity = !cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, valueGenerator, sizeof(valueGenerator), temp, sizeof(temp));
	}
	
	// Get product of the blind and its generator
	uint8_t blindGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	memcpy(&blindGenerator[PUBLIC_KEY_PREFIX_SIZE], &GENERATOR_G, sizeof(GENERATOR_G));
	
	// Check if the result isn't infinity
	if(!cx_math_is_zero(blindingFactor, BLINDING_FACTOR_SIZE) && cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, blindGenerator, sizeof(blindGenerator), blindingFactor, BLINDING_FACTOR_SIZE)) {
	
		// Check if product of value and its generator isn't infinity or its x component is zero
		if(!isInfinity && !cx_math_is_zero(&valueGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
	
			// Get sum of products
			isInfinity = !cx_ecfp_add_point(CX_CURVE_SECP256K1, valueGenerator, valueGenerator, blindGenerator, sizeof(valueGenerator));
		}
		
		// Otherwise
		else {
		
			// Get sum of products
			memcpy(valueGenerator, blindGenerator, sizeof(valueGenerator));
			
			// Set that result isn't infinity
			isInfinity = false;
		}
	}
	
	// Check if result is infinity or its x component is zero
	if(isInfinity || cx_math_is_zero(&valueGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
	
		// Throw internal error error
		THROW(INTERNAL_ERROR_ERROR);
	}
	
	// Copy x component to the commitment
	uint8_t *x = &valueGenerator[PUBLIC_KEY_PREFIX_SIZE];
	memcpy(&commitment[PUBLIC_KEY_PREFIX_SIZE], x, PUBLIC_KEY_COMPONENT_SIZE);
	
	// Get the square of the result's y component's square root
	uint8_t *squareRootSquared = x;
	uint8_t *y = &valueGenerator[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
	cx_math_powm(squareRootSquared, y, SECP256K1_CURVE_SQUARE_ROOT_EXPONENT, sizeof(SECP256K1_CURVE_SQUARE_ROOT_EXPONENT), SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE);
	
	const uint8_t two[] = {2};
	cx_math_powm(squareRootSquared, squareRootSquared, two, sizeof(two), SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE);
	
	// Set commitment's prefix
	commitment[0] = COMMITMENT_ODD_PREFIX ^ !memcmp(squareRootSquared, y, PUBLIC_KEY_COMPONENT_SIZE);
}

// Get rewind nonce
void getRewindNonce(volatile uint8_t *rewindNonce, uint32_t account, const uint8_t *commitment) {

	// Initialize child private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Get private key
			getPrivateKeyAndChainCode(&privateKey, NULL, account);

			// Get public key from the private key
			uint8_t publicKey[COMPRESSED_PUBLIC_KEY_SIZE];
			getPublicKeyFromPrivateKey(publicKey, (cx_ecfp_private_key_t *)&privateKey);
			
			// Get rewind hash from the public key
			uint8_t rewindHash[NONCE_SIZE];
			getBlake2b(rewindHash, sizeof(rewindHash), publicKey, sizeof(publicKey), NULL, 0);
			
			// Get rewind nonce from the rewind hash and the commitment
			getBlake2b((uint8_t *)rewindNonce, NONCE_SIZE, rewindHash, sizeof(rewindHash), commitment, COMMITMENT_SIZE);
			
			// Check if rewind nonce isn't a valid secret key
			if(!isValidSecp256k1PrivateKey((uint8_t *)rewindNonce, NONCE_SIZE)) {
			
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

// Get private nonce
void getPrivateNonce(volatile uint8_t *privateNonce, uint32_t account, const uint8_t *commitment) {

	// Initialize child private key and chain code
	volatile cx_ecfp_private_key_t childPrivateKey;
	volatile uint8_t childChainCode[CHAIN_CODE_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Derive child's private key and chain code at root path
			deriveChildKey(&childPrivateKey, childChainCode, account, NULL, 0, false);
			
			// Get private hash from the child's private key
			uint8_t privateHash[NONCE_SIZE];
			getBlake2b(privateHash, sizeof(privateHash), (uint8_t *)childPrivateKey.d, childPrivateKey.d_len, NULL, 0);
			
			// Get private nonce from the private hash and the commitment
			getBlake2b((uint8_t *)privateNonce, NONCE_SIZE, privateHash, sizeof(privateHash), commitment, COMMITMENT_SIZE);
			
			// Check if private nonce isn't a valid secret key
			if(!isValidSecp256k1PrivateKey((uint8_t *)privateNonce, NONCE_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
		}
		
		// Finally
		FINALLY {
		
			// Clear the child private key and chain code
			explicit_bzero((cx_ecfp_private_key_t *)&childPrivateKey, sizeof(childPrivateKey));
			explicit_bzero((uint8_t *)childChainCode, sizeof(childChainCode));
		}
	}
	
	// End try
	END_TRY;
}

// Get address private key
void getAddressPrivateKey(volatile cx_ecfp_private_key_t *addressPrivateKey, uint32_t account, uint32_t index, cx_curve_t curve) {

	// Initialize blinding factor
	volatile uint8_t blindingFactor[BLINDING_FACTOR_SIZE];
	
	// Initialize node
	volatile uint8_t node[NODE_SIZE];
	
	// Initialize chain code
	volatile uint8_t chainCode[CHAIN_CODE_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Derive blinding factor from the address private key blinding factor value and the root path
			deriveBlindingFactor(blindingFactor, account, ADDRESS_PRIVATE_KEY_BLINDING_FACTOR_VALUE, NULL, 0, REGULAR_SWITCH_TYPE);
			
			// Get the node as the HMAC-SHA512 of the blinding factor with the addres private key hash key as the key
			cx_hmac_sha512((uint8_t *)ADDRESS_PRIVATE_KEY_HASH_KEY, sizeof(ADDRESS_PRIVATE_KEY_HASH_KEY), (uint8_t *)blindingFactor, sizeof(blindingFactor), (uint8_t *)node, sizeof(node));
			
			// Get address private key from node
			cx_ecfp_init_private_key(curve, (uint8_t *)node, sizeof(addressPrivateKey->d), (cx_ecfp_private_key_t *)addressPrivateKey);
			
			// Check if address private key isn't a valid private key
			if(!isValidSecp256k1PrivateKey((uint8_t *)addressPrivateKey->d, addressPrivateKey->d_len)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Get chain code from the node
			memcpy((uint8_t *)chainCode, (uint8_t *)&node[sizeof(addressPrivateKey->d)], CHAIN_CODE_SIZE);
			
			// Derive child key from the address private key and chain code at the index
			deriveChildKey(addressPrivateKey, chainCode, account, &index, 1, true);
		}
		
		// Finally
		FINALLY {
		
			// Clear the blinding factor
			explicit_bzero((uint8_t *)blindingFactor, sizeof(blindingFactor));
			
			// Clear the node
			explicit_bzero((uint8_t *)node, sizeof(node));
			
			// Clear the chain code
			explicit_bzero((uint8_t *)chainCode, sizeof(chainCode));
		}
	}
	
	// End try
	END_TRY;
}

// Update blinding factor sum
void updateBlindingFactorSum(uint8_t *blindingFactorSum, uint8_t *blindingFactor, bool blindingFactorIsPositive) {

	// Check if blinding factor isn't positive
	if(!blindingFactorIsPositive) {
	
		// Negate the blinding factor
		cx_math_subm(blindingFactor, SECP256K1_CURVE_ORDER, blindingFactor, SECP256K1_CURVE_ORDER, BLINDING_FACTOR_SIZE);
	}
	
	// Add blinding factor to the blinding factor sum
	cx_math_addm(blindingFactorSum, blindingFactorSum, blindingFactor, SECP256K1_CURVE_ORDER, BLINDING_FACTOR_SIZE);
	
	// Check if blinding factor sum is invalid
	if(!isValidSecp256k1PrivateKey(blindingFactorSum, BLINDING_FACTOR_SIZE)) {
	
		// Throw internal error error
		THROW(INTERNAL_ERROR_ERROR);
	}
}

// Create single-signer signature
void createSingleSignerSignature(uint8_t *signature, const uint8_t *message, const uint8_t *blindingFactor, uint8_t *secretNonce, const uint8_t *publicNonce, const uint8_t *publicKey) {

	// Normalize the secret nonce
	cx_math_modm(secretNonce, NONCE_SIZE, SECP256K1_CURVE_ORDER, sizeof(SECP256K1_CURVE_ORDER));

	// Get the product of the secret nonce and its generator
	uint8_t generator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	memcpy(&generator[PUBLIC_KEY_PREFIX_SIZE], &GENERATOR_G, sizeof(GENERATOR_G));
	
	// Check if the result is infinity or its x component is zero
	if(!cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, generator, sizeof(generator), secretNonce, NONCE_SIZE) || cx_math_is_zero(&generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
	
		// Throw internal error error
		THROW(INTERNAL_ERROR_ERROR);
	}
	
	// Uncompress public nonce
	uint8_t uncompressedPublicNonce[UNCOMPRESSED_PUBLIC_KEY_SIZE];
	memcpy(uncompressedPublicNonce, publicNonce, COMPRESSED_PUBLIC_KEY_SIZE);
	uncompressSecp256k1PublicKey(uncompressedPublicNonce);
	
	// Get the square root of the uncompressed public nonce's y component squared
	uint8_t squareRootSquared[PUBLIC_KEY_COMPONENT_SIZE];
	const uint8_t *y = &uncompressedPublicNonce[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
	cx_math_powm(squareRootSquared, y, SECP256K1_CURVE_SQUARE_ROOT_EXPONENT, sizeof(SECP256K1_CURVE_SQUARE_ROOT_EXPONENT), SECP256K1_CURVE_PRIME, sizeof(squareRootSquared));
	
	const uint8_t two[] = {2};
	cx_math_powm(squareRootSquared, squareRootSquared, two, sizeof(two), SECP256K1_CURVE_PRIME, sizeof(squareRootSquared));
	
	// Check if the uncompressed public nonce's y component isn't a quadratic residue
	if(memcmp(y, squareRootSquared, PUBLIC_KEY_COMPONENT_SIZE)) {
	
		// Negate the secret nonce
		cx_math_subm(secretNonce, SECP256K1_CURVE_ORDER, secretNonce, SECP256K1_CURVE_ORDER, NONCE_SIZE);
	}
	
	// Get signature hash from the public nonce's x component, public key, and message
	cx_sha256_t hash;
	cx_sha256_init(&hash);
	cx_hash((cx_hash_t *)&hash, 0, &publicNonce[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE, NULL, 0);
	cx_hash((cx_hash_t *)&hash, 0, publicKey, COMPRESSED_PUBLIC_KEY_SIZE, NULL, 0);
	uint8_t signatureHash[CX_SHA256_SIZE];
	cx_hash((cx_hash_t *)&hash, CX_LAST, message, SINGLE_SIGNER_MESSAGE_SIZE, signatureHash, sizeof(signatureHash));
	
	// Normalize the signature hash
	cx_math_modm(signatureHash, sizeof(signatureHash), SECP256K1_CURVE_ORDER, sizeof(SECP256K1_CURVE_ORDER));
	
	// Set signature's r component
	uint8_t *r = signature;
	memcpy(r, &generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE);
	swapEndianness(r, PUBLIC_KEY_COMPONENT_SIZE);
	
	// Calculate the signature's s component
	uint8_t *s = &signature[PUBLIC_KEY_COMPONENT_SIZE];
	cx_math_multm(s, blindingFactor, signatureHash, SECP256K1_CURVE_ORDER, PUBLIC_KEY_COMPONENT_SIZE);
	cx_math_addm(s, s, secretNonce, SECP256K1_CURVE_ORDER, PUBLIC_KEY_COMPONENT_SIZE);
	swapEndianness(s, PUBLIC_KEY_COMPONENT_SIZE);
}

// Get encrypted data length
size_t getEncryptedDataLength(size_t dataLength) {

	// Return encrypted data length
	return dataLength + ((dataLength % CX_AES_BLOCK_SIZE) ? (CX_AES_BLOCK_SIZE - dataLength % CX_AES_BLOCK_SIZE) : CX_AES_BLOCK_SIZE);
}

// Encrypt data
void encryptData(volatile uint8_t *result, const uint8_t *data, size_t dataLength, const uint8_t *key, size_t keyLength) {

	// Pad the data
	uint8_t paddedData[getEncryptedDataLength(dataLength)];
	memcpy(paddedData, data, dataLength);
	memset(&paddedData[dataLength], sizeof(paddedData) - dataLength, sizeof(paddedData) - dataLength);
	
	// Initialize encryption key
	volatile cx_aes_key_t encryptionKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Initialize the encryption key with the key
			cx_aes_init_key(key, keyLength, (cx_aes_key_t *)&encryptionKey);
			
			// Encrypt the padded data with the encryption key
			cx_aes((cx_aes_key_t *)&encryptionKey, CX_ENCRYPT | CX_PAD_NONE | CX_CHAIN_CBC | CX_LAST, paddedData, sizeof(paddedData), (uint8_t *)result, sizeof(paddedData));
		}
		
		// Finally
		FINALLY {
		
			// Clear the encryption key
			explicit_bzero((cx_aes_key_t *)&encryptionKey, sizeof(encryptionKey));
		}
	}
	
	// End try
	END_TRY;
}

// Get X25519 private key from Ed25519 private key
void getX25519PrivateKeyFromEd25519PrivateKey(volatile cx_ecfp_private_key_t *x25519PrivateKey, const cx_ecfp_private_key_t *ed25519PrivateKey) {

	// Initialize hash
	volatile uint8_t hash[CX_SHA512_SIZE];

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Get hash of the Ed25519 private key
			cx_hash_sha512(ed25519PrivateKey->d, ed25519PrivateKey->d_len, (uint8_t *)hash, sizeof(hash));
			
			// Clamp the hash
			hash[0] &= 0b11111000;
			hash[31] &= 0b01111111;
			hash[31] |= 0b01000000;
			
			// Swap the hash's endianness
			swapEndianness((uint8_t *)hash, sizeof(x25519PrivateKey->d));
			
			// Get X25519 private key from the hash
			cx_ecfp_init_private_key(CX_CURVE_Curve25519, (uint8_t *)hash, sizeof(x25519PrivateKey->d), (cx_ecfp_private_key_t *)x25519PrivateKey);
		}
		
		// Finally
		FINALLY {
		
			// Clear the hash
			explicit_bzero((uint8_t *)hash, sizeof(hash));
		}
	}
	
	// End try
	END_TRY;
}

// Get X25519 public key from Ed25519 public key
void getX25519PublicKeyFromEd25519PublicKey(uint8_t *x25519PublicKey, const uint8_t *ed25519PublicKey) {

	// Uncompress the Ed25519 public key
	uint8_t uncompressedEd25519PublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
	uncompressedEd25519PublicKey[0] = ED25519_COMPRESSED_PUBLIC_KEY_PREFIX;
	memcpy(&uncompressedEd25519PublicKey[PUBLIC_KEY_PREFIX_SIZE], ed25519PublicKey, ED25519_PUBLIC_KEY_SIZE);
	
	cx_edwards_decompress_point(CX_CURVE_Ed25519, uncompressedEd25519PublicKey, sizeof(uncompressedEd25519PublicKey));
	
	// Get uncompressed Ed25519 public key's y value
	uint8_t *y = &uncompressedEd25519PublicKey[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];

	// Compute the X25519 public key as the sum of one and y divided by the difference of one and y
	uint8_t one[PUBLIC_KEY_COMPONENT_SIZE] = {};
	one[sizeof(one) - 1] = 1;
	
	cx_math_addm(x25519PublicKey, one, y, ED25519_CURVE_ORDER, PUBLIC_KEY_COMPONENT_SIZE);
	cx_math_subm(y, one, y, ED25519_CURVE_ORDER, PUBLIC_KEY_COMPONENT_SIZE);
	
	cx_math_invprimem(y, y, ED25519_CURVE_ORDER, PUBLIC_KEY_COMPONENT_SIZE);
	cx_math_multm(x25519PublicKey, x25519PublicKey, y, ED25519_CURVE_ORDER, PUBLIC_KEY_COMPONENT_SIZE);
	
	// Swap the X25519 public key's endianness
	swapEndianness(x25519PublicKey, X25519_PUBLIC_KEY_SIZE);
}

// Get payment proof message length
size_t getPaymentProofMessageLength(uint64_t value, size_t senderAddressLength) {

	// Check sender address length
	switch(senderAddressLength) {
	
		// MQS address size
		case MQS_ADDRESS_SIZE:
		
			// Check currency doesn't allow MQS addresses
			if(!currencyInformation.mqsAddressPaymentProofAllowed) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Return payment proof message length
			return COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE + senderAddressLength + getStringLength(value);
		
		// Tor address size
		case TOR_ADDRESS_SIZE:
		
			// Check currency doesn't allow TOR addresses
			if(!currencyInformation.torAddressPaymentProofAllowed) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Return payment proof message length
			return COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE + senderAddressLength + getStringLength(value);
		
		// Ed25519 address size
		case ED25519_PUBLIC_KEY_SIZE:
		
			// TODO test Grin
		
			// Check currency doesn't allow Ed25519 addresses
			if(!currencyInformation.ed25519AddressPaymentProofAllowed) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Return payment proof message length
			return sizeof(value) + COMMITMENT_SIZE + senderAddressLength;
		
		// Default
		default:
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
	}
}

// Get payment proof message
void getPaymentProofMessage(uint8_t *message, uint64_t value, const uint8_t *commitment, const uint8_t *senderAddress, size_t senderAddressLength) {

	// Check sender address length
	switch(senderAddressLength) {
	
		// MQS address size
		case MQS_ADDRESS_SIZE:
		
			// Check currency doesn't allow MQS addresses
			if(!currencyInformation.mqsAddressPaymentProofAllowed) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Check if sender address isn't a valid MQS address
			if(!getPublicKeyFromMqsAddress(NULL, senderAddress, senderAddressLength)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Append commitment as a hex string to the message
			toHexString((char *)message, commitment, COMMITMENT_SIZE);
			
			// Append sender address to the message
			memcpy(&message[COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE], senderAddress, senderAddressLength);
			
			// Append value as a string to the message
			toString((char *)&message[COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE + senderAddressLength], value, 0);
			
			// Break
			break;
		
		// Tor address size
		case TOR_ADDRESS_SIZE:
		
			// Check currency doesn't allow TOR addresses
			if(!currencyInformation.torAddressPaymentProofAllowed) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Check if sender address isn't a valid Tor address
			if(!getPublicKeyFromTorAddress(NULL, senderAddress, senderAddressLength)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Append commitment as a hex string to the message
			toHexString((char *)message, commitment, COMMITMENT_SIZE);
			
			// Append sender address to the message
			memcpy(&message[COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE], senderAddress, senderAddressLength);
			
			// Append value as a string to the message
			toString((char *)&message[COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE + senderAddressLength], value, 0);
			
			// Break
			break;
		
		// Ed25519 address size
		case ED25519_PUBLIC_KEY_SIZE:
		
			// TODO test Grin
			
			// Check currency doesn't allow Ed25519 addresses
			if(!currencyInformation.ed25519AddressPaymentProofAllowed) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Check if the sender address isn't a valid Ed25519 public key
			if(!isValidEd25519PublicKey(senderAddress, senderAddressLength)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Convert value to big endian
			swapEndianness((uint8_t *)&value, sizeof(value));
			
			// Append value to the message
			memcpy(message, &value, sizeof(value));
			
			// Append commitment to the message
			memcpy(&message[sizeof(value)], commitment, COMMITMENT_SIZE);
			
			// Append sender address to the message
			memcpy(&message[sizeof(value) + COMMITMENT_SIZE], senderAddress, senderAddressLength);
			
			// Break
			break;
	}
}

// Verify payment proof message
bool verifyPaymentProofMessage(const uint8_t *message, size_t messageLength, const uint8_t *receiverAddress, size_t receiverAddressLength, uint8_t *signature, size_t signatureLength) {

	// Check receiver address length
	switch(receiverAddressLength) {
	
		// MQS address size
		case MQS_ADDRESS_SIZE:
		
			// Check currency doesn't allow MQS addresses
			if(!currencyInformation.mqsAddressPaymentProofAllowed) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Check if signature length is invalid
			if(signatureLength > MAXIMUM_DER_SIGNATURE_SIZE) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			{
				// Check if getting receiver public key from receiver's MQS address failed
				cx_ecfp_public_key_t receiverPublicKey;
				if(!getPublicKeyFromMqsAddress(&receiverPublicKey, receiverAddress, receiverAddressLength)) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
			
				// Get hash of the message
				uint8_t hash[CX_SHA256_SIZE];
				cx_hash_sha256(message, messageLength, hash, sizeof(hash));
				
				// Check if verifying the hash with the receiver public key and signature failed
				if(!cx_ecdsa_verify(&receiverPublicKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, hash, sizeof(hash), signature, signatureLength)) {
				
					// Return false
					return false;
				}
			}
			
			// Break
			break;
		
		// Tor address size
		case TOR_ADDRESS_SIZE:
		
			// Check currency doesn't allow Tor addresses
			if(!currencyInformation.torAddressPaymentProofAllowed) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Check if signature length is invalid
			if(signatureLength != ED25519_SIGNATURE_SIZE) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			{
				// Check if getting receiver public key from receiver's Tor address failed
				cx_ecfp_public_key_t receiverPublicKey;
				if(!getPublicKeyFromTorAddress(&receiverPublicKey, receiverAddress, receiverAddressLength)) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
				
				// Check if verifying the message with the receiver public key and signature failed
				if(!cx_eddsa_verify(&receiverPublicKey, CX_LAST, CX_SHA512, message, messageLength, NULL, 0, signature, signatureLength)) {
				
					// Return false
					return false;
				}
			}
			
			// Break
			break;
		
		// Ed25519 address size
		case ED25519_PUBLIC_KEY_SIZE:
		
			// TODO test Grin
		
			// Check currency doesn't allow Ed25519 addresses
			if(!currencyInformation.ed25519AddressPaymentProofAllowed) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Check if signature length is invalid
			if(signatureLength != ED25519_SIGNATURE_SIZE) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Check if the receiver address isn't a valid Ed25519 public key
			if(!isValidEd25519PublicKey(receiverAddress, receiverAddressLength)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			{
				// Uncompress the receiver address to a public key
				uint8_t uncompressedPublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
				uncompressedPublicKey[0] = ED25519_COMPRESSED_PUBLIC_KEY_PREFIX;
				memcpy(&uncompressedPublicKey[PUBLIC_KEY_PREFIX_SIZE], receiverAddress, receiverAddressLength);
				
				cx_edwards_decompress_point(CX_CURVE_Ed25519, uncompressedPublicKey, sizeof(uncompressedPublicKey));
				
				// Initialize the receiver public key with the uncompressed public key
				cx_ecfp_public_key_t receiverPublicKey;
				cx_ecfp_init_public_key(CX_CURVE_Ed25519, uncompressedPublicKey, sizeof(uncompressedPublicKey), &receiverPublicKey);
			
				// Check if verifying the message with the receiver public key and signature failed
				if(!cx_eddsa_verify(&receiverPublicKey, CX_LAST, CX_SHA512, message, messageLength, NULL, 0, signature, signatureLength)) {
				
					// Return false
					return false;
				}
			}
			
			// Break
			break;
		
		// Default
		default:
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Return true
	return true;
}

// Is valid commitment
bool isValidCommitment(const uint8_t *commitment) {

	// Get commitment's x component
	const uint8_t *x = &commitment[PUBLIC_KEY_PREFIX_SIZE];

	// Check if commitment's prefix is invalid or its x component overflows
	if((commitment[0] != COMMITMENT_EVEN_PREFIX && commitment[0] != COMMITMENT_ODD_PREFIX) || cx_math_cmp(x, SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE) >= 0) {
	
		// Return false
		return false;
	}
	
	// Get y squared as x cubed plus seven
	uint8_t ySquared[PUBLIC_KEY_COMPONENT_SIZE];
	const uint8_t three[] = {3};
	cx_math_powm(ySquared, x, three, sizeof(three), SECP256K1_CURVE_PRIME, sizeof(ySquared));
	
	uint8_t seven[PUBLIC_KEY_COMPONENT_SIZE] = {};
	seven[sizeof(seven) - 1] = 7;
	cx_math_addm(ySquared, ySquared, seven, SECP256K1_CURVE_PRIME, sizeof(ySquared));
	
	// Get the square root of y squared
	uint8_t squareRootSquared[PUBLIC_KEY_COMPONENT_SIZE];
	cx_math_powm(squareRootSquared, ySquared, SECP256K1_CURVE_SQUARE_ROOT_EXPONENT, sizeof(SECP256K1_CURVE_SQUARE_ROOT_EXPONENT), SECP256K1_CURVE_PRIME, sizeof(squareRootSquared));
	
	const uint8_t two[] = {2};
	cx_math_powm(squareRootSquared, squareRootSquared, two, sizeof(two), SECP256K1_CURVE_PRIME, sizeof(squareRootSquared));
	
	// Return if the calculated y exists for the x component
	return !memcmp(squareRootSquared, ySquared, sizeof(squareRootSquared));
}

// Is valid Ed25519 public key
bool isValidEd25519PublicKey(const uint8_t *publicKey, size_t length) {

	// Check if length is invalid
	if(length != ED25519_PUBLIC_KEY_SIZE) {
	
		// Return false
		return false;
	}

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Uncompress the public key
			uint8_t uncompressedPublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
			uncompressedPublicKey[0] = ED25519_COMPRESSED_PUBLIC_KEY_PREFIX;
			memcpy(&uncompressedPublicKey[PUBLIC_KEY_PREFIX_SIZE], publicKey, length);
			
			cx_edwards_decompress_point(CX_CURVE_Ed25519, uncompressedPublicKey, sizeof(uncompressedPublicKey));
		}
		
		// Catch all errors
		CATCH_ALL {
			
			// Return false
			return false;
		}
		
		// Finally
		FINALLY {
		
		}
	}
	
	// End try
	END_TRY;
	
	// Return true
	return true;
}

// Is valid secp256k1 private key
bool isValidSecp256k1PrivateKey(const uint8_t *privateKey, size_t length) {

	// Check if length is invalid
	if(length != SECP256k1_PRIVATE_KEY_SIZE) {
	
		// Return false
		return false;
	}
	
	// Return if the private key doesn't overflow and isn't zero
	return cx_math_cmp(privateKey, SECP256K1_CURVE_ORDER, length) < 0 && !cx_math_is_zero(privateKey, length);
}

// Is valid secp256k1 public key
bool isValidSecp256k1PublicKey(const uint8_t *publicKey, size_t length) {

	// Check if length is invalid
	if(length != COMPRESSED_PUBLIC_KEY_SIZE) {
	
		// Return false
		return false;
	}
	
	// Get public key's x component
	const uint8_t *x = &publicKey[PUBLIC_KEY_PREFIX_SIZE];

	// Check if public key's prefix is invalid or its x component overflows
	if((publicKey[0] != EVEN_COMPRESSED_PUBLIC_KEY_PREFIX && publicKey[0] != ODD_COMPRESSED_PUBLIC_KEY_PREFIX) || cx_math_cmp(x, SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE) >= 0) {
	
		// Return false
		return false;
	}
	
	// Get y squared as x cubed plus seven
	uint8_t ySquared[PUBLIC_KEY_COMPONENT_SIZE];
	const uint8_t three[] = {3};
	cx_math_powm(ySquared, x, three, sizeof(three), SECP256K1_CURVE_PRIME, sizeof(ySquared));
	
	uint8_t seven[PUBLIC_KEY_COMPONENT_SIZE] = {};
	seven[sizeof(seven) - 1] = 7;
	cx_math_addm(ySquared, ySquared, seven, SECP256K1_CURVE_PRIME, sizeof(ySquared));
	
	// Get the square root of y squared
	uint8_t squareRootSquared[PUBLIC_KEY_COMPONENT_SIZE];
	cx_math_powm(squareRootSquared, ySquared, SECP256K1_CURVE_SQUARE_ROOT_EXPONENT, sizeof(SECP256K1_CURVE_SQUARE_ROOT_EXPONENT), SECP256K1_CURVE_PRIME, sizeof(squareRootSquared));
	
	const uint8_t two[] = {2};
	cx_math_powm(squareRootSquared, squareRootSquared, two, sizeof(two), SECP256K1_CURVE_PRIME, sizeof(squareRootSquared));
	
	// Return if the calculated y exists for the x component
	return !memcmp(squareRootSquared, ySquared, sizeof(squareRootSquared));
}

// Uncompress secp256k1 public key
void uncompressSecp256k1PublicKey(uint8_t *publicKey) {

	// Get public key's x component
	uint8_t *x = &publicKey[PUBLIC_KEY_PREFIX_SIZE];

	// Check if public key's prefix is invalid or its x component overflows
	if((publicKey[0] != EVEN_COMPRESSED_PUBLIC_KEY_PREFIX && publicKey[0] != ODD_COMPRESSED_PUBLIC_KEY_PREFIX) || cx_math_cmp(x, SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE) >= 0) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get y squared as x cubed plus seven
	uint8_t ySquared[PUBLIC_KEY_COMPONENT_SIZE];
	const uint8_t three[] = {3};
	cx_math_powm(ySquared, x, three, sizeof(three), SECP256K1_CURVE_PRIME, sizeof(ySquared));
	
	uint8_t seven[PUBLIC_KEY_COMPONENT_SIZE] = {};
	seven[sizeof(seven) - 1] = 7;
	cx_math_addm(ySquared, ySquared, seven, SECP256K1_CURVE_PRIME, sizeof(ySquared));
	
	// Get the square root of y squared
	uint8_t *y = &publicKey[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
	cx_math_powm(y, ySquared, SECP256K1_CURVE_SQUARE_ROOT_EXPONENT, sizeof(SECP256K1_CURVE_SQUARE_ROOT_EXPONENT), SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE);
	
	uint8_t squareRootSquared[PUBLIC_KEY_COMPONENT_SIZE];
	const uint8_t two[] = {2};
	cx_math_powm(squareRootSquared, y, two, sizeof(two), SECP256K1_CURVE_PRIME, sizeof(squareRootSquared));
	
	// Return if the calculated y doesn't exist for the x component
	if(memcmp(squareRootSquared, ySquared, sizeof(squareRootSquared))) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if the y component's oddness doesn't match the expected oddness
	if((y[PUBLIC_KEY_COMPONENT_SIZE - 1] & 1) != (publicKey[0] == ODD_COMPRESSED_PUBLIC_KEY_PREFIX)) {
	
		// Check if the y component isn't zero
		if(!cx_math_is_zero(y, PUBLIC_KEY_COMPONENT_SIZE)) {
		
			// Negate the y component
			cx_math_subm(y, SECP256K1_CURVE_PRIME, y, SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE);
		}
	}
	
	// Set public key's prefix to be uncompressed
	publicKey[0] = UNCOMPRESSED_PUBLIC_KEY_PREFIX;
}

// Get Ed25519 public key
void getEd25519PublicKey(uint8_t *ed25519PublicKey, uint32_t account) {

	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;
	
	// Initialize address public key
	volatile cx_ecfp_public_key_t addressPublicKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get address private key at the Tor address private key index
			getAddressPrivateKey(&addressPrivateKey, account, TOR_ADDRESS_PRIVATE_KEY_INDEX, CX_CURVE_Ed25519);
			
			// Get address public key from address private key
			cx_ecfp_generate_pair(CX_CURVE_Ed25519, (cx_ecfp_public_key_t *)&addressPublicKey, (cx_ecfp_private_key_t *)&addressPrivateKey, KEEP_PRIVATE_KEY);
			
			// Compress the address public key
			cx_edwards_compress_point(CX_CURVE_Ed25519, (uint8_t *)addressPublicKey.W, addressPublicKey.W_len);
		}
		
		// Finally
		FINALLY {
		
			// Clear the address private key
			explicit_bzero((cx_ecfp_private_key_t *)&addressPrivateKey, sizeof(addressPrivateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Get Ed25519 public key from the address public key
	memcpy(ed25519PublicKey, (uint8_t *)&addressPublicKey.W[PUBLIC_KEY_PREFIX_SIZE], ED25519_PUBLIC_KEY_SIZE);
}

// Calculate bulletproof tau x
void calculateBulletproofTauX(volatile uint8_t *bulletproofTauX, uint64_t value, const uint8_t *blindingFactor, const uint8_t *rewindNonce, const uint8_t *privateNonce, const uint8_t *proofMessage) {

	// Create context
	volatile uint8_t contextBuffer[secp256k1_context_preallocated_size(SECP256K1_CONTEXT_VERIFY)];
	volatile secp256k1_context *context = secp256k1_context_preallocated_create((uint8_t *)contextBuffer, SECP256K1_CONTEXT_VERIFY);
	
	// Create scratch space
	volatile uint8_t scratchSpaceBuffer[SCRATCH_SPACE_SIZE];
	volatile secp256k1_scratch_space *scratchSpace = secp256k1_scratch_space_preallocated_create((secp256k1_context *)context, (uint8_t *)scratchSpaceBuffer, SCRATCH_SPACE_SIZE);
	
	// Create generators
	volatile uint8_t generatorsBuffer[secp256k1_bulletproof_generators_preallocated_size(NUMBER_OF_GENERATORS_TAU_X)];
	volatile secp256k1_bulletproof_generators *generators = secp256k1_bulletproof_generators_preallocated_create((secp256k1_context *)context, (uint8_t *)generatorsBuffer, &GENERATOR_G, NUMBER_OF_GENERATORS_TAU_X);
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Check if creating bulletproof tau x failed
			if(!secp256k1_bulletproof_rangeproof_preallocated_prove((secp256k1_context *)context, (secp256k1_scratch_space *)scratchSpace, (secp256k1_bulletproof_generators *)generators, NULL, NULL, (uint8_t *)bulletproofTauX, NULL, NULL, &value, NULL, &blindingFactor, NULL, 1, &GENERATOR_H, BITS_PROVEN_PER_RANGE, rewindNonce, (uint8_t *)privateNonce, NULL, 0, proofMessage)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
		}
		
		// Finally
		FINALLY {
		
			// Destroy generators
			secp256k1_bulletproof_generators_preallocated_destroy((secp256k1_context *)context, (secp256k1_bulletproof_generators *)generators);
			explicit_bzero((uint8_t *)generatorsBuffer, sizeof(generatorsBuffer));
			
			// Destroy scratch space
			secp256k1_scratch_space_preallocated_destroy((secp256k1_scratch_space *)scratchSpace);
			explicit_bzero((uint8_t *)scratchSpaceBuffer, sizeof(scratchSpaceBuffer));
			
			// Destroy context
			secp256k1_context_preallocated_destroy((secp256k1_context *)context);
			explicit_bzero((uint8_t *)contextBuffer, sizeof(contextBuffer));
		}
	}
	
	// End try
	END_TRY;
}

// Calculate bulletproof t one and t two
void calculateBulletproofTOneAndTTwo(volatile uint8_t *tOne, volatile uint8_t *tTwo, uint64_t value, const uint8_t *blindingFactor, const uint8_t *rewindNonce, const uint8_t *privateNonce) {

	// Create context
	volatile uint8_t contextBuffer[secp256k1_context_preallocated_size(SECP256K1_CONTEXT_VERIFY)];
	volatile secp256k1_context *context = secp256k1_context_preallocated_create((uint8_t *)contextBuffer, SECP256K1_CONTEXT_VERIFY);
	
	// Create scratch space
	volatile uint8_t scratchSpaceBuffer[SCRATCH_SPACE_SIZE];
	volatile secp256k1_scratch_space *scratchSpace = secp256k1_scratch_space_preallocated_create((secp256k1_context *)context, (uint8_t *)scratchSpaceBuffer, SCRATCH_SPACE_SIZE);
	
	// Create generators
	volatile uint8_t generatorsBuffer[secp256k1_bulletproof_generators_preallocated_size(NUMBER_OF_GENERATORS_T_ONE_AND_T_TWO)];
	volatile secp256k1_bulletproof_generators *generators = secp256k1_bulletproof_generators_preallocated_create((secp256k1_context *)context, (uint8_t *)generatorsBuffer, &GENERATOR_G, NUMBER_OF_GENERATORS_T_ONE_AND_T_TWO);
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Check if creating bulletproof t one and t two failed
			secp256k1_pubkey tOneData;
			secp256k1_pubkey tTwoData;
			if(!secp256k1_bulletproof_rangeproof_preallocated_prove((secp256k1_context *)context, (secp256k1_scratch_space *)scratchSpace, (secp256k1_bulletproof_generators *)generators, NULL, NULL, NULL, &tOneData, &tTwoData, &value, NULL, &blindingFactor, NULL, 1, &GENERATOR_H, BITS_PROVEN_PER_RANGE, rewindNonce, (uint8_t *)privateNonce, NULL, 0, NULL)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Check if serializing t one failed
			size_t publicKeySize = COMPRESSED_PUBLIC_KEY_SIZE;
			if(!secp256k1_ec_pubkey_serialize((secp256k1_context *)context, (uint8_t *)tOne, &publicKeySize, &tOneData, SECP256K1_EC_COMPRESSED)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Check if serializing ttwo failed
			publicKeySize = COMPRESSED_PUBLIC_KEY_SIZE;
			if(!secp256k1_ec_pubkey_serialize((secp256k1_context *)context, (uint8_t *)tTwo, &publicKeySize, &tTwoData, SECP256K1_EC_COMPRESSED)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
		}
		
		// Finally
		FINALLY {
		
			// Destroy generators
			secp256k1_bulletproof_generators_preallocated_destroy((secp256k1_context *)context, (secp256k1_bulletproof_generators *)generators);
			explicit_bzero((uint8_t *)generatorsBuffer, sizeof(generatorsBuffer));
			
			// Destroy scratch space
			secp256k1_scratch_space_preallocated_destroy((secp256k1_scratch_space *)scratchSpace);
			explicit_bzero((uint8_t *)scratchSpaceBuffer, sizeof(scratchSpaceBuffer));
			
			// Destroy context
			secp256k1_context_preallocated_destroy((secp256k1_context *)context);
			explicit_bzero((uint8_t *)contextBuffer, sizeof(contextBuffer));
		}
	}
	
	// End try
	END_TRY;
}
