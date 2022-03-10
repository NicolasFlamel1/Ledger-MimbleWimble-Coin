// Header files
#include <os.h>
#include <string.h>
#include "blake2b.h"
#include "chacha20_poly1305.h"
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "generators.h"
#include "mqs.h"
#include "slatepack.h"
#include "tor.h"


// Definitions

// Scalar size
#define SCALAR_SIZE 32

// Uncompressed public key prefix
#define UNCOMPRESSED_PUBLIC_KEY_PREFIX 0x04

// Node size
#define NODE_SIZE 64

// Chain code size
#define CHAIN_CODE_SIZE 32

// BIP32 path coin type index
#define BIP32_PATH_COIN_TYPE_INDEX 1

// BIP32 path account index
#define BIP32_PATH_ACCOUNT_INDEX 2

// Address private key blinding factor value
#define ADDRESS_PRIVATE_KEY_BLINDING_FACTOR_VALUE 713

// Secp256k1 private key size
#define SECP256k1_PRIVATE_KEY_SIZE 32

// Commitment even prefix
#define COMMITMENT_EVEN_PREFIX 8

// Commitment odd prefix
#define COMMITMENT_ODD_PREFIX 9


// Constants

// Secp256k1 curve order
static const uint8_t SECP256K1_CURVE_ORDER[] = {
	0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x41
};

// Secp256k1 curve prime
static const uint8_t SECP256K1_CURVE_PRIME[] = {
	0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xFF, 0xFF, 0xFC, 0x2F
};

// Secp256k1 curve square root exponent
static const uint8_t SECP256K1_CURVE_SQUARE_ROOT_EXPONENT[] = {
	0x3F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xBF, 0xFF, 0xFF, 0x0C
};

// Ed25519 curve prime
static const uint8_t ED25519_CURVE_PRIME[] = {
	0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xED
};

// Generator G
static const uint8_t GENERATOR_G[] = {
	0x79, 0xBE, 0x66, 0x7E, 0xF9, 0xDC, 0xBB, 0xAC, 0x55, 0xA0, 0x62, 0x95, 0xCE, 0x87, 0x0B, 0x07, 0x02, 0x9B, 0xFC, 0xDB, 0x2D, 0xCE, 0x28, 0xD9, 0x59, 0xF2, 0x81, 0x5B, 0x16, 0xF8, 0x17, 0x98, 0x48, 0x3A, 0xDA, 0x77, 0x26, 0xA3, 0xC4, 0x65, 0x5D, 0xA4, 0xFB, 0xFC, 0x0E, 0x11, 0x08, 0xA8, 0xFD, 0x17, 0xB4, 0x48, 0xA6, 0x85, 0x54, 0x19, 0x9C, 0x47, 0xD0, 0x8F, 0xFB, 0x10, 0xD4, 0xB8
};

// Generator H
static const uint8_t GENERATOR_H[] = {
	0x50, 0x92, 0x9B, 0x74, 0xC1, 0xA0, 0x49, 0x54, 0xB7, 0x8B, 0x4B, 0x60, 0x35, 0xE9, 0x7A, 0x5E, 0x07, 0x8A, 0x5A, 0x0F, 0x28, 0xEC, 0x96, 0xD5, 0x47, 0xBF, 0xEE, 0x9A, 0xCE, 0x80, 0x3A, 0xC0, 0x31, 0xD3, 0xC6, 0x86, 0x39, 0x73, 0x92, 0x6E, 0x04, 0x9E, 0x63, 0x7C, 0xB1, 0xB5, 0xF4, 0x0A, 0x36, 0xDA, 0xC2, 0x8A, 0xF1, 0x76, 0x69, 0x68, 0xC3, 0x0C, 0x23, 0x13, 0xF3, 0xA3, 0x89, 0x04
};

// Generator J public
static const uint8_t GENERATOR_J_PUBLIC[] = {
	0x5F, 0x15, 0x21, 0x36, 0x93, 0x93, 0x01, 0x2A, 0x8D, 0x8B, 0x39, 0x7E, 0x9B, 0xF4, 0x54, 0x29, 0x2F, 0x5A, 0x1B, 0x3D, 0x38, 0x85, 0x16, 0xC2, 0xF3, 0x03, 0xFC, 0x95, 0x67, 0xF5, 0x60, 0xB8, 0x3A, 0xC4, 0xC5, 0xA6, 0xDC, 0xA2, 0x01, 0x59, 0xFC, 0x56, 0xCF, 0x74, 0x9A, 0xA6, 0xA5, 0x65, 0x31, 0x6A, 0xA5, 0x03, 0x74, 0x42, 0x3F, 0x42, 0x53, 0x8F, 0xAA, 0x2C, 0xD3, 0x09, 0x3F, 0xA4
};

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

// Seed key
static const char SEED_KEY[] = {'I', 'a', 'm', 'V', 'o', 'l', 'd', 'e', 'm', 'o', 'r', 't'};

// Address private key hash key
static const char ADDRESS_PRIVATE_KEY_HASH_KEY[] = {'G', 'r', 'i', 'n', 'b', 'o', 'x', '_', 's', 'e', 'e', 'd'};


// Function prototypes

// Bulletproof update commitment
static void bulletproofUpdateCommitment(volatile uint8_t *commitment, const uint8_t *leftPart, const uint8_t *rightPart);

// Create scalars from ChaCha20
static void createScalarsFromChaCha20(volatile uint8_t *firstScalar, volatile uint8_t *secondScalar, const uint8_t *seed, uint64_t index);

// Use LR generator
static void useLrGenerator(volatile uint8_t *result, const uint8_t *x, const uint8_t *y, const uint8_t *z, const uint8_t *nonce, uint64_t value);

// Conditional negate
static void conditionalNegate(volatile uint8_t *scalar, bool negate, const uint8_t *modulo);

// Is quadratic residue
static bool isQuadraticResidue(const uint8_t *component);


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
			os_perso_derive_node_with_seed_key(HDW_NORMAL, CX_CURVE_SECP256K1, bip32Path, ARRAYLEN(bip32Path), (uint8_t *)node, (uint8_t *)chainCode, (unsigned char *)SEED_KEY, sizeof(SEED_KEY));
			
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
void getPublicKeyFromPrivateKey(volatile uint8_t *publicKey, const cx_ecfp_private_key_t *privateKey) {

	// Initialize uncompressed public key
	volatile cx_ecfp_public_key_t uncompressedPublicKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Get uncompressed public key from the private key
			cx_ecfp_generate_pair(CX_CURVE_SECP256K1, (cx_ecfp_public_key_t *)&uncompressedPublicKey, (cx_ecfp_private_key_t *)privateKey, KEEP_PRIVATE_KEY);
			
			// Set prefix in the public key
			publicKey[0] = (uncompressedPublicKey.W[uncompressedPublicKey.W_len - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
			
			// Set x component in the public key
			memcpy((uint8_t *)&publicKey[PUBLIC_KEY_PREFIX_SIZE], (uint8_t *)&uncompressedPublicKey.W[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE);
		}
		
		// Finally
		FINALLY {
		
			// Clear the uncompressed public key
			explicit_bzero((cx_ecfp_public_key_t *)&uncompressedPublicKey, sizeof(uncompressedPublicKey));
		}
	}
	
	// End try
	END_TRY;
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
					getPublicKeyFromPrivateKey(data, (cx_ecfp_private_key_t *)privateKey);
					
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
						volatile uint8_t *commitment = &publicKeyGenerator[PUBLIC_KEY_PREFIX_SIZE];
						commitValue(commitment, value, (uint8_t *)childPrivateKey.d, true);
						
						// Add commitment to the hash
						cx_sha256_init((cx_sha256_t *)&hash);
						cx_hash((cx_hash_t *)&hash, 0, (uint8_t *)commitment, COMMITMENT_SIZE, NULL, 0);
						
						// Get product of the generator public key and the child's private key
						memcpy((uint8_t *)&publicKeyGenerator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_J_PUBLIC, sizeof(GENERATOR_J_PUBLIC));
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
void commitValue(volatile uint8_t *commitment, uint64_t value, const uint8_t *blindingFactor, bool compress) {

	// Initialize generators
	volatile uint8_t valueGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_H)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	volatile uint8_t blindGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Check if value isn't zero
			bool isInfinity = true;
			if(value) {

				// Get product of the value and its generator
				memcpy((uint8_t *)&valueGenerator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_H, sizeof(GENERATOR_H));
				uint8_t temp[BLINDING_FACTOR_SIZE] = {0};
				U4BE_ENCODE(temp, sizeof(temp) - sizeof(uint32_t), value);
				U4BE_ENCODE(temp, sizeof(temp) - sizeof(uint64_t), value >> (sizeof(uint32_t) * BITS_IN_A_BYTE));
				
				isInfinity = !cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, (uint8_t *)valueGenerator, sizeof(valueGenerator), temp, sizeof(temp));
			}
			
			// Get product of the blind and its generator
			memcpy((uint8_t *)&blindGenerator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));
			
			// Check if the result isn't infinity
			if(!cx_math_is_zero(blindingFactor, BLINDING_FACTOR_SIZE) && cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, (uint8_t *)blindGenerator, sizeof(blindGenerator), blindingFactor, BLINDING_FACTOR_SIZE)) {
			
				// Check if product of value and its generator isn't infinity or its x component is zero
				if(!isInfinity && !cx_math_is_zero((uint8_t *)&valueGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
					// Get sum of products
					isInfinity = !cx_ecfp_add_point(CX_CURVE_SECP256K1, (uint8_t *)valueGenerator, (uint8_t *)valueGenerator, (uint8_t *)blindGenerator, sizeof(valueGenerator));
				}
				
				// Otherwise
				else {
				
					// Get sum of products
					memcpy((uint8_t *)valueGenerator, (uint8_t *)blindGenerator, sizeof(valueGenerator));
					
					// Set that result isn't infinity
					isInfinity = false;
				}
			}
			
			// Check if result is infinity or its x component is zero
			if(isInfinity || cx_math_is_zero((uint8_t *)&valueGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Copy x component to the commitment
			volatile uint8_t *x = &valueGenerator[PUBLIC_KEY_PREFIX_SIZE];
			memcpy((uint8_t *)&commitment[PUBLIC_KEY_PREFIX_SIZE], (uint8_t *)x, PUBLIC_KEY_COMPONENT_SIZE);
			
			// Set commitment's prefix to if the y component is quadratic residue
			volatile uint8_t *y = &valueGenerator[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
			commitment[0] = isQuadraticResidue((uint8_t *)y) ? COMMITMENT_EVEN_PREFIX : COMMITMENT_ODD_PREFIX;
			
			// Check if not compressing the commitment
			if(!compress) {
			
				// Copy y component to the commitment
				memcpy((uint8_t *)&commitment[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE], (uint8_t *)y, PUBLIC_KEY_COMPONENT_SIZE);
			}
		}
		
		// Finally
		FINALLY {
		
			// Clear the generators
			explicit_bzero((uint8_t *)valueGenerator, sizeof(valueGenerator));
			explicit_bzero((uint8_t *)blindGenerator, sizeof(blindGenerator));
		}
	}
	
	// End try
	END_TRY;
}

// Get rewind nonce
void getRewindNonce(volatile uint8_t *rewindNonce, uint32_t account, const uint8_t *commitment) {

	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Initialize public key
	volatile uint8_t publicKey[COMPRESSED_PUBLIC_KEY_SIZE]; 
	
	// Initialize rewind hash
	volatile uint8_t rewindHash[NONCE_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Get private key
			getPrivateKeyAndChainCode(&privateKey, NULL, account);

			// Get public key from the private key
			getPublicKeyFromPrivateKey(publicKey, (cx_ecfp_private_key_t *)&privateKey);
			
			// Get rewind hash from the public key
			getBlake2b((uint8_t *)rewindHash, sizeof(rewindHash), (uint8_t *)publicKey, sizeof(publicKey), NULL, 0);
			
			// Get rewind nonce from the rewind hash and the commitment
			getBlake2b((uint8_t *)rewindNonce, NONCE_SIZE, (uint8_t *)rewindHash, sizeof(rewindHash), commitment, COMMITMENT_SIZE);
			
			// Check if rewind nonce isn't a valid secret key
			if(!isValidSecp256k1PrivateKey((uint8_t *)rewindNonce, NONCE_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
		}
		
		// Finally
		FINALLY {
		
			// Clear the rewind hash
			explicit_bzero((uint8_t *)rewindHash, sizeof(rewindHash));
		
			// Clear the public key
			explicit_bzero((uint8_t *)publicKey, sizeof(publicKey));
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}
	
	// End try
	END_TRY;
}

// Get private nonce
void getPrivateNonce(volatile uint8_t *privateNonce, uint32_t account, const uint8_t *commitment) {

	// Initialize private root key
	volatile uint8_t privateRootKey[SECP256k1_PRIVATE_KEY_SIZE];
	
	// Initialize private hash
	volatile uint8_t privateHash[NONCE_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Derive private root key
			deriveBlindingFactor(privateRootKey, account, 0, NULL, 0, NO_SWITCH_TYPE);
			
			// Get private hash from the private root key
			getBlake2b((uint8_t *)privateHash, sizeof(privateHash), (uint8_t *)privateRootKey, sizeof(privateRootKey), NULL, 0);
			
			// Get private nonce from the private hash and the commitment
			getBlake2b((uint8_t *)privateNonce, NONCE_SIZE, (uint8_t *)privateHash, sizeof(privateHash), commitment, COMMITMENT_SIZE);
			
			// Check if private nonce isn't a valid secret key
			if(!isValidSecp256k1PrivateKey((uint8_t *)privateNonce, NONCE_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
		}
		
		// Finally
		FINALLY {
		
			// Clear the private hash
			explicit_bzero((uint8_t *)privateHash, sizeof(privateHash));
		
			// Clear the private root key
			explicit_bzero((uint8_t *)privateRootKey, sizeof(privateRootKey));
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

	// Negate the blinding factor if it isn't positive
	conditionalNegate(blindingFactor, !blindingFactorIsPositive, SECP256K1_CURVE_ORDER);
	
	// Add blinding factor to the blinding factor sum
	cx_math_addm(blindingFactorSum, blindingFactorSum, blindingFactor, SECP256K1_CURVE_ORDER, BLINDING_FACTOR_SIZE);
	
	// Check if blinding factor sum is invalid
	if(!isValidSecp256k1PrivateKey(blindingFactorSum, BLINDING_FACTOR_SIZE)) {
	
		// Throw internal error error
		THROW(INTERNAL_ERROR_ERROR);
	}
}

// Create single-signer nonces
void createSingleSignerNonces(uint8_t *secretNonce, uint8_t *publicNonce) {

	// Loop while the secret nonce is zero
	do {
	
		// Create random secret nonce
		cx_rng(secretNonce, NONCE_SIZE);
		
		// Normalize the secret nonce
		cx_math_modm(secretNonce, NONCE_SIZE, SECP256K1_CURVE_ORDER, sizeof(SECP256K1_CURVE_ORDER));
		
	} while(cx_math_is_zero(secretNonce, NONCE_SIZE));
	
	// Get the product of the secret nonce and its generator
	uint8_t generator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	memcpy(&generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));
	
	// Check if the result is infinity or its x component is zero
	if(!cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, generator, sizeof(generator), secretNonce, NONCE_SIZE) || cx_math_is_zero(&generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
	
		// Throw internal error error
		THROW(INTERNAL_ERROR_ERROR);
	}

	// Negate the secret nonce and the result's y component if the result's y component isn't quadratic residue
	uint8_t *y = &generator[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
	bool negate = !isQuadraticResidue(y);
	
	conditionalNegate(secretNonce, negate, SECP256K1_CURVE_ORDER);
	conditionalNegate(y, negate, SECP256K1_CURVE_PRIME);
	
	// Check if creating public nonce
	if(publicNonce) {
	
		// Get the public nonce from the result
		publicNonce[0] = (generator[sizeof(generator) - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
		memcpy(&publicNonce[PUBLIC_KEY_PREFIX_SIZE], &generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE);
	}
}

// Create single-signer signature
void createSingleSignerSignature(volatile uint8_t *signature, const uint8_t *message, const uint8_t *blindingFactor, uint8_t *secretNonce, const uint8_t *publicNonce, const uint8_t *publicKey) {
	
	// Get the product of the secret nonce and its generator
	uint8_t generator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	memcpy(&generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));
	
	// Check if the result is infinity or its x component is zero
	if(!cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, generator, sizeof(generator), secretNonce, NONCE_SIZE) || cx_math_is_zero(&generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
	
		// Throw internal error error
		THROW(INTERNAL_ERROR_ERROR);
	}
	
	// Set signature's r component
	uint8_t *r = (uint8_t *)signature;
	memcpy(r, &generator[PUBLIC_KEY_PREFIX_SIZE], SCALAR_SIZE);
	swapEndianness(r, SCALAR_SIZE);
	
	// Uncompress public nonce
	uint8_t *uncompressedPublicNonce = generator;
	memcpy(uncompressedPublicNonce, publicNonce, COMPRESSED_PUBLIC_KEY_SIZE);
	uncompressSecp256k1PublicKey(uncompressedPublicNonce);
	
	// Negate the secret nonce if the uncompressed public nonce's y component isn't quadratic residue
	const uint8_t *y = &uncompressedPublicNonce[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
	conditionalNegate(secretNonce, !isQuadraticResidue(y), SECP256K1_CURVE_ORDER);
	
	// Get signature hash from the public nonce's x component, public key, and message
	cx_sha256_t hash;
	cx_sha256_init(&hash);
	cx_hash((cx_hash_t *)&hash, 0, &publicNonce[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE, NULL, 0);
	cx_hash((cx_hash_t *)&hash, 0, publicKey, COMPRESSED_PUBLIC_KEY_SIZE, NULL, 0);
	uint8_t signatureHash[CX_SHA256_SIZE];
	cx_hash((cx_hash_t *)&hash, CX_LAST, message, SINGLE_SIGNER_MESSAGE_SIZE, signatureHash, sizeof(signatureHash));
	
	// Normalize the signature hash
	cx_math_modm(signatureHash, sizeof(signatureHash), SECP256K1_CURVE_ORDER, sizeof(SECP256K1_CURVE_ORDER));
	
	// Initialize the s component
	volatile uint8_t s[SCALAR_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Calculate the s component
			cx_math_multm((uint8_t *)s, blindingFactor, signatureHash, SECP256K1_CURVE_ORDER, sizeof(s));
			cx_math_addm((uint8_t *)s, (uint8_t *)s, secretNonce, SECP256K1_CURVE_ORDER, sizeof(s));
			
			// Set signature's s component
			swapEndianness((uint8_t *)s, sizeof(s));
			memcpy((uint8_t *)&signature[SCALAR_SIZE], (uint8_t *)s, sizeof(s));
		}
		
		// Finally
		FINALLY {
		
			// Clear the s compinent
			explicit_bzero((uint8_t *)s, sizeof(s));
		}
	}
	
	// End try
	END_TRY;
}

// Get encrypted data length
size_t getEncryptedDataLength(size_t dataLength) {

	// Return encrypted data length
	return dataLength + ((dataLength % CX_AES_BLOCK_SIZE) ? CX_AES_BLOCK_SIZE - dataLength % CX_AES_BLOCK_SIZE : CX_AES_BLOCK_SIZE);
}

// Encrypt data
void encryptData(volatile uint8_t *result, const uint8_t *data, size_t dataLength, const uint8_t *key, size_t keyLength) {

	// Initialize padded data
	volatile uint8_t paddedData[getEncryptedDataLength(dataLength)];
	
	// Initialize encryption key
	volatile cx_aes_key_t encryptionKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Pad the data
			memcpy((uint8_t *)paddedData, data, dataLength);
			memset((uint8_t *)&paddedData[dataLength], sizeof(paddedData) - dataLength, sizeof(paddedData) - dataLength);
		
			// Initialize the encryption key with the key
			cx_aes_init_key(key, keyLength, (cx_aes_key_t *)&encryptionKey);
			
			// Encrypt the padded data with the encryption key
			cx_aes((cx_aes_key_t *)&encryptionKey, CX_ENCRYPT | CX_PAD_NONE | CX_CHAIN_CBC | CX_LAST, (uint8_t *)paddedData, sizeof(paddedData), (uint8_t *)result, sizeof(paddedData));
		}
		
		// Finally
		FINALLY {
		
			// Clear the encryption key
			explicit_bzero((cx_aes_key_t *)&encryptionKey, sizeof(encryptionKey));
			
			// Clear the padded data
			explicit_bzero((uint8_t *)paddedData, sizeof(paddedData));
		}
	}
	
	// End try
	END_TRY;
}

// Decrypt data
size_t decryptData(volatile uint8_t *result, const uint8_t *data, size_t dataLength, const uint8_t *key, size_t keyLength) {

	// Initialize decryption key
	volatile cx_aes_key_t decryptionKey;
	
	// Initialize decrypted data length
	volatile size_t decryptedDataLength;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Initialize the decryption key with the key
			cx_aes_init_key(key, keyLength, (cx_aes_key_t *)&decryptionKey);
			
			// Decrypt the data with the decryption key
			cx_aes((cx_aes_key_t *)&decryptionKey, CX_DECRYPT | CX_PAD_NONE | CX_CHAIN_CBC | CX_LAST, data, dataLength, (uint8_t *)result, dataLength);
			
			// Check if last padding byte is invalid
			if(!result[dataLength - 1] || result[dataLength - 1] > CX_AES_BLOCK_SIZE || result[dataLength - 1] > dataLength) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set decrypted data length
			decryptedDataLength = dataLength - result[dataLength - 1];
			
			// Initialize invalid padding
			bool invalidPadding = false;
			
			// Go through all decrypted bytes
			for(size_t i = 0; i < dataLength; ++i) {
			
				// Update invalid padding in a way that tries to mitigate timing attacks
				invalidPadding |= result[i] ^ ((i >= decryptedDataLength) ? result[dataLength - 1] : result[i]);
			}
			
			// Check if padding is invalid
			if(invalidPadding) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		}
		
		// Finally
		FINALLY {
		
			// Clear the decryption key
			explicit_bzero((cx_aes_key_t *)&decryptionKey, sizeof(decryptionKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Return decrypted data length
	return decryptedDataLength;
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
	uint8_t one[SCALAR_SIZE] = {0};
	one[sizeof(one) - 1] = 1;
	
	cx_math_addm(x25519PublicKey, one, y, ED25519_CURVE_PRIME, ED25519_PUBLIC_KEY_SIZE);
	cx_math_subm(y, one, y, ED25519_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE);
	
	cx_math_invprimem(y, y, ED25519_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE);
	cx_math_multm(x25519PublicKey, x25519PublicKey, y, ED25519_CURVE_PRIME, ED25519_PUBLIC_KEY_SIZE);
	
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
			if(!currencyInformation.enableMqsAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Return payment proof message length
			return COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE + senderAddressLength + getStringLength(value);
		
		// Tor address size
		case TOR_ADDRESS_SIZE:
		
			// Check currency doesn't allow Tor addresses
			if(!currencyInformation.enableTorAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Return payment proof message length
			return COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE + senderAddressLength + getStringLength(value);
		
		// Default
		default:
		
			// Check if sender address length is a Slatepack address's length
			if(senderAddressLength == SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart)) {
		
				// Check currency doesn't allow Slatepack addresses
				if(!currencyInformation.enableSlatepackAddress) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
				
				// Return payment proof message length
				return sizeof(value) + COMMITMENT_SIZE + ED25519_PUBLIC_KEY_SIZE;
			}
			
			// Otherwise
			else {
		
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Break
			break;
	}
}

// Get payment proof message
void getPaymentProofMessage(uint8_t *message, uint64_t value, const uint8_t *kernelCommitment, const char *senderAddress, size_t senderAddressLength) {

	// Check sender address length
	switch(senderAddressLength) {
	
		// MQS address size
		case MQS_ADDRESS_SIZE:
		
			// Check currency doesn't allow MQS addresses
			if(!currencyInformation.enableMqsAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Check if sender address isn't a valid MQS address
			if(!getPublicKeyFromMqsAddress(NULL, senderAddress, senderAddressLength)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Append kernel commitment as a hex string to the message
			toHexString((char *)message, kernelCommitment, COMMITMENT_SIZE);
			
			// Append sender address to the message
			memcpy(&message[COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE], senderAddress, senderAddressLength);
			
			// Append value as a string to the message
			toString((char *)&message[COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE + senderAddressLength], value, 0);
			
			// Break
			break;
		
		// Tor address size
		case TOR_ADDRESS_SIZE:
		
			// Check currency doesn't allow Tor addresses
			if(!currencyInformation.enableTorAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Check if sender address isn't a valid Tor address
			if(!getPublicKeyFromTorAddress(NULL, senderAddress, senderAddressLength)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Append kernel commitment as a hex string to the message
			toHexString((char *)message, kernelCommitment, COMMITMENT_SIZE);
			
			// Append sender address to the message
			memcpy(&message[COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE], senderAddress, senderAddressLength);
			
			// Append value as a string to the message
			toString((char *)&message[COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE + senderAddressLength], value, 0);
			
			// Break
			break;
		
		// Default
		default:
		
			// Check if sender address length is a Slatepack address's length
			if(senderAddressLength == SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart)) {
			
				// Check currency doesn't allow Slatepack addresses
				if(!currencyInformation.enableSlatepackAddress) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
			
				// Check if getting sender public key from sender address failed
				cx_ecfp_public_key_t senderPublicKey;
				if(!getPublicKeyFromSlatepackAddress(&senderPublicKey, senderAddress, senderAddressLength)) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
				
				// Compress the sender public key
				cx_edwards_compress_point(CX_CURVE_Ed25519, senderPublicKey.W, senderPublicKey.W_len);
				
				// Convert value to big endian
				swapEndianness((uint8_t *)&value, sizeof(value));
				
				// Append value to the message
				memcpy(message, &value, sizeof(value));
				
				// Append kernel commitment to the message
				memcpy(&message[sizeof(value)], kernelCommitment, COMMITMENT_SIZE);
				
				// Append sender address to the message
				memcpy(&message[sizeof(value) + COMMITMENT_SIZE], &senderPublicKey.W[PUBLIC_KEY_PREFIX_SIZE], ED25519_PUBLIC_KEY_SIZE);
			}
			
			// Otherwise
			else {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Break
			break;
	}
}

// Verify payment proof message
bool verifyPaymentProofMessage(const uint8_t *message, size_t messageLength, const char *receiverAddress, size_t receiverAddressLength, uint8_t *signature, size_t signatureLength) {

	// Check receiver address length
	switch(receiverAddressLength) {
	
		// MQS address size
		case MQS_ADDRESS_SIZE:
		
			// Check currency doesn't allow MQS addresses
			if(!currencyInformation.enableMqsAddress) {
			
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
			if(!currencyInformation.enableTorAddress) {
			
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
		
		// Default
		default:
		
			// Check if receiver address length is a Slatepack address's length
			if(receiverAddressLength == SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart)) {
		
				// Check currency doesn't allow Slatepack addresses
				if(!currencyInformation.enableSlatepackAddress) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
			
				// Check if signature length is invalid
				if(signatureLength != ED25519_SIGNATURE_SIZE) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
				
				// Check if getting receiver public key from receiver's Slatepack address failed
				cx_ecfp_public_key_t receiverPublicKey;
				if(!getPublicKeyFromSlatepackAddress(&receiverPublicKey, receiverAddress, receiverAddressLength)) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
				
				// Check if verifying the message with the receiver public key and signature failed
				if(!cx_eddsa_verify(&receiverPublicKey, CX_LAST, CX_SHA512, message, messageLength, NULL, 0, signature, signatureLength)) {
				
					// Return false
					return false;
				}
			}
			
			// Otherwise
			else {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Break
			break;
	}
	
	// Return true
	return true;
}

// Is valid commitment
bool isValidCommitment(uint8_t *commitment) {

	// Change commitment's prefix to its corresponding public key prefix
	commitment[0] -= COMMITMENT_EVEN_PREFIX - EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
	
	// Set result to if the commitment is valid
	bool result = isValidSecp256k1PublicKey(commitment, COMMITMENT_SIZE);
	
	// Revetn the commitment's prefix
	commitment[0] += COMMITMENT_EVEN_PREFIX - EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
	
	// Return the result
	return result;
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

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Uncompress the public key
			uint8_t uncompressedPublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
			memcpy(uncompressedPublicKey, publicKey, length);
			
			uncompressSecp256k1PublicKey(uncompressedPublicKey);
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
	const uint8_t three = 3;
	cx_math_powm(ySquared, x, &three, sizeof(three), SECP256K1_CURVE_PRIME, sizeof(ySquared));
	
	uint8_t seven[SCALAR_SIZE] = {0};
	seven[sizeof(seven) - 1] = 7;
	cx_math_addm(ySquared, ySquared, seven, SECP256K1_CURVE_PRIME, sizeof(ySquared));
	
	// Return if the y squared isn't quadratic residue
	if(!isQuadraticResidue(ySquared)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get the square root of y squared
	uint8_t *y = &publicKey[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
	cx_math_powm(y, ySquared, SECP256K1_CURVE_SQUARE_ROOT_EXPONENT, sizeof(SECP256K1_CURVE_SQUARE_ROOT_EXPONENT), SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE);
	
	// Check if the y component's oddness doesn't match the expected oddness
	if((y[PUBLIC_KEY_COMPONENT_SIZE - 1] & 1) != (publicKey[0] == ODD_COMPRESSED_PUBLIC_KEY_PREFIX)) {
	
		// Negate the y component
		conditionalNegate(y, true, SECP256K1_CURVE_PRIME);
	}
	
	// Set public key's prefix to be uncompressed
	publicKey[0] = UNCOMPRESSED_PUBLIC_KEY_PREFIX;
}

// Get Ed25519 public key
void getEd25519PublicKey(uint8_t *ed25519PublicKey, uint32_t account, uint32_t index) {

	// Initialize address private key
	volatile cx_ecfp_private_key_t addressPrivateKey;
	
	// Initialize address public key
	volatile cx_ecfp_public_key_t addressPublicKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get address private key
			getAddressPrivateKey(&addressPrivateKey, account, index, CX_CURVE_Ed25519);
			
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

// Calculate bulletproof components
void calculateBulletproofComponents(volatile uint8_t *tauX, volatile uint8_t *tOne, volatile uint8_t *tTwo, uint64_t value, const uint8_t *blindingFactor, const uint8_t *commitment, const uint8_t *rewindNonce, const uint8_t *privateNonce, const uint8_t *proofMessage) {

	// Initialize running commitment
	volatile uint8_t runningCommitment[CX_SHA256_SIZE] = {0};
	
	// Initialize alpha and rho
	volatile uint8_t alpha[SCALAR_SIZE];
	volatile uint8_t rho[SCALAR_SIZE];
	
	// Initialize alpha generator and rho generator
	volatile uint8_t alphaGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	volatile uint8_t rhoGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	
	// Initialize aterm;
	volatile uint8_t aterm[UNCOMPRESSED_PUBLIC_KEY_SIZE] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	
	// Initialize y, and z
	volatile uint8_t y[sizeof(runningCommitment)];
	volatile uint8_t z[sizeof(runningCommitment)];
	
	// Initialize t0, t1, and t2
	volatile uint8_t t0[SCALAR_SIZE] = {0};
	volatile uint8_t t1[SCALAR_SIZE] = {0};
	volatile uint8_t t2[SCALAR_SIZE] = {0};
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get running commitment from the commitment and generator
			bulletproofUpdateCommitment(runningCommitment, &commitment[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_H);

			// Set value in value bytes
			uint8_t valueBytes[SCALAR_SIZE] = {0};
			U4BE_ENCODE(valueBytes, sizeof(valueBytes) - sizeof(uint32_t), value);
			U4BE_ENCODE(valueBytes, sizeof(valueBytes) - sizeof(uint64_t), value >> (sizeof(uint32_t) * BITS_IN_A_BYTE));

			// Set proof message in value bytes
			memcpy(&valueBytes[sizeof(valueBytes) - sizeof(value) - PROOF_MESSAGE_SIZE], proofMessage, PROOF_MESSAGE_SIZE);

			// Negate the value bytes
			conditionalNegate(valueBytes, true, SECP256K1_CURVE_ORDER);
			
			// Create alpha and rho from the rewind nonce
			createScalarsFromChaCha20(alpha, rho, rewindNonce, 0);

			// Add value bytes to alpha
			cx_math_addm((uint8_t *)alpha, (uint8_t *)alpha, valueBytes, SECP256K1_CURVE_ORDER, sizeof(alpha));

			// Get the product of the alpha and its generator (Check for infinity and zero)
			memcpy((uint8_t *)&alphaGenerator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));
			
			// Check if the result is infinity or its x component is zero
			if(cx_math_is_zero((uint8_t *)alpha, sizeof(alpha)) || !cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, (uint8_t *)alphaGenerator, sizeof(alphaGenerator), (uint8_t *)alpha, sizeof(alpha)) || cx_math_is_zero((uint8_t *)&alphaGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get the product of the rho and its generator
			memcpy((uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));
			
			// Check if the result is infinity or its x component is zero
			if(cx_math_is_zero((uint8_t *)rho, sizeof(rho)) || !cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, (uint8_t *)rhoGenerator, sizeof(rhoGenerator), (uint8_t *)rho, sizeof(rho)) || cx_math_is_zero((uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Go through all bits to prove
			for(size_t i = 0; i < BITS_TO_PROVE; ++i) {
			
				// Get bit in the value
				const bool bit = (value >> i) & 1;

				// Set aterm to the generator
				memcpy((uint8_t *)&aterm[PUBLIC_KEY_PREFIX_SIZE], bit ? GENERATORS_FIRST_HALF[i] : GENERATORS_SECOND_HALF[i], sizeof(aterm) - PUBLIC_KEY_PREFIX_SIZE);
				
				// Negate the aterm's y component if the bit isn't set
				conditionalNegate(&aterm[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE], !bit, SECP256K1_CURVE_PRIME);
				
				// Check if adding aterm to the alpha generator is infinity or its x component is zero
				if(!cx_ecfp_add_point(CX_CURVE_SECP256K1, (uint8_t *)alphaGenerator, (uint8_t *)alphaGenerator, (uint8_t *)aterm, sizeof(alphaGenerator)) || cx_math_is_zero((uint8_t *)&alphaGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
				
					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}
				
				// Create sl and sr from rewind nonce
				uint8_t *sl = (uint8_t *)alpha;
				uint8_t *sr  = (uint8_t *)rho;
				createScalarsFromChaCha20(sl, sr, rewindNonce, i + 2);
				
				// Get the product of the generator and sl
				uint8_t *sterm = (uint8_t *)aterm;
				memcpy(&sterm[PUBLIC_KEY_PREFIX_SIZE], GENERATORS_FIRST_HALF[i], UNCOMPRESSED_PUBLIC_KEY_SIZE - PUBLIC_KEY_PREFIX_SIZE);
				
				// Check if the result is infinity or its x component is zero
				if(cx_math_is_zero(sl, SCALAR_SIZE) || !cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, sterm, UNCOMPRESSED_PUBLIC_KEY_SIZE, sl, SCALAR_SIZE) || cx_math_is_zero(&sterm[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
				
					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}
				
				// Check if adding sterm to the rho generator is infinity or its x component is zero
				if(!cx_ecfp_add_point(CX_CURVE_SECP256K1, (uint8_t *)rhoGenerator, (uint8_t *)rhoGenerator, sterm, sizeof(rhoGenerator)) || cx_math_is_zero((uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
				
					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}
				
				// Get the product of the generator and sr
				memcpy(&sterm[PUBLIC_KEY_PREFIX_SIZE], GENERATORS_SECOND_HALF[i], UNCOMPRESSED_PUBLIC_KEY_SIZE - PUBLIC_KEY_PREFIX_SIZE);
				
				// Check if the result is infinity or its x component is zero
				if(cx_math_is_zero(sr, SCALAR_SIZE) || !cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, sterm, UNCOMPRESSED_PUBLIC_KEY_SIZE, sr, SCALAR_SIZE) || cx_math_is_zero(&sterm[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
				
					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}
				
				// Check if adding sterm to the rho generator is infinity or its x component is zero
				if(!cx_ecfp_add_point(CX_CURVE_SECP256K1, (uint8_t *)rhoGenerator, (uint8_t *)rhoGenerator, sterm, sizeof(rhoGenerator)) || cx_math_is_zero((uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
				
					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}
			}
			
			// Update running commitment with the alpha generator and rho generator
			bulletproofUpdateCommitment(runningCommitment, (uint8_t *)&alphaGenerator[PUBLIC_KEY_PREFIX_SIZE], (uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE]);

			// Check if running commitment overflows or is zero
			if(cx_math_cmp((uint8_t *)runningCommitment, SECP256K1_CURVE_ORDER, sizeof(runningCommitment)) >= 0 || cx_math_is_zero((uint8_t *)runningCommitment, sizeof(runningCommitment))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get y from running commitment
			memcpy((uint8_t *)y, (uint8_t *)runningCommitment, sizeof(y));

			// Update running commitment with the alpha generator and rho generator
			bulletproofUpdateCommitment(runningCommitment, (uint8_t *)&alphaGenerator[PUBLIC_KEY_PREFIX_SIZE], (uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE]);

			// Check if running commitment overflows or is zero
			if(cx_math_cmp((uint8_t *)runningCommitment, SECP256K1_CURVE_ORDER, sizeof(runningCommitment)) >= 0 || cx_math_is_zero((uint8_t *)runningCommitment, sizeof(runningCommitment))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get z from running commitment
			memcpy((uint8_t *)z, (uint8_t *)runningCommitment, sizeof(z));
			
			// Create t0 with an LR generator
			const uint8_t zero[SCALAR_SIZE] = {0};
			useLrGenerator(t0, zero, (uint8_t *)y, (uint8_t *)z, rewindNonce, value);
			
			// Create t1 with an LR generator
			uint8_t one[SCALAR_SIZE] = {0};
			one[sizeof(one) - 1] = 1;
			useLrGenerator(t1, one, (uint8_t *)y, (uint8_t *)z, rewindNonce, value);
			
			// Create t2 with an LR generator
			cx_math_subm(one, SECP256K1_CURVE_ORDER, one, SECP256K1_CURVE_ORDER, sizeof(one));
			useLrGenerator(t2, one, (uint8_t *)y, (uint8_t *)z, rewindNonce, value);
			
			// Get the difference of t1 and t2
			conditionalNegate(t2, true, SECP256K1_CURVE_ORDER);

			cx_math_addm((uint8_t *)t1, (uint8_t *)t1, (uint8_t *)t2, SECP256K1_CURVE_ORDER, sizeof(t1));
			
			// Divide the difference by two
			uint8_t twoInverse[SCALAR_SIZE] = {0};
			twoInverse[sizeof(twoInverse) - 1] = 2;
			cx_math_invprimem(twoInverse, twoInverse, SECP256K1_CURVE_ORDER, sizeof(twoInverse));
			
			cx_math_multm((uint8_t *)t1, (uint8_t *)t1, twoInverse, SECP256K1_CURVE_ORDER, sizeof(t1));
			
			// Get the sum or t2 and t0
			cx_math_addm((uint8_t *)t2, (uint8_t *)t2, (uint8_t *)t0, SECP256K1_CURVE_ORDER, sizeof(t2));
			
			// Negate t2
			conditionalNegate(t2, true, SECP256K1_CURVE_ORDER);
			
			// Add t1 to t2
			cx_math_addm((uint8_t *)t2, (uint8_t *)t2, (uint8_t *)t1, SECP256K1_CURVE_ORDER, sizeof(t2));
			
			// Get the product of t1 and its generator
			uint8_t *t1Generator = (uint8_t *)alphaGenerator;
			memcpy(&t1Generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_H, sizeof(GENERATOR_H));
			
			// Check if the result is infinity or its x component is zero
			if(cx_math_is_zero((uint8_t *)t1, sizeof(t1)) || !cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, t1Generator, UNCOMPRESSED_PUBLIC_KEY_SIZE, (uint8_t *)t1, sizeof(t1)) || cx_math_is_zero(&t1Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Create tau1 and tau2 from the private nonce
			uint8_t *tau1 = (uint8_t *)alpha;
			uint8_t *tau2 = (uint8_t *)rho;
			createScalarsFromChaCha20(tau1, tau2, privateNonce, 1);
			
			// Get the product of tau1 and its generator
			uint8_t *tau1Generator = (uint8_t *)rhoGenerator;
			memcpy(&tau1Generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));
			
			// Check if the result is infinity or its x component is zero
			if(cx_math_is_zero(tau1, SCALAR_SIZE) || !cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, tau1Generator, UNCOMPRESSED_PUBLIC_KEY_SIZE, tau1, SCALAR_SIZE) || cx_math_is_zero(&tau1Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Set t one to the result
			memcpy((uint8_t *)&tOne[PUBLIC_KEY_PREFIX_SIZE], &tau1Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE);
			tOne[0] = (tau1Generator[UNCOMPRESSED_PUBLIC_KEY_SIZE - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
			
			// Check if adding tau1 generator to the t1 generator is infinity or its x component is zero
			if(!cx_ecfp_add_point(CX_CURVE_SECP256K1, t1Generator, tau1Generator, t1Generator, UNCOMPRESSED_PUBLIC_KEY_SIZE) || cx_math_is_zero(&t1Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Get the product of t2 and its generator
			uint8_t *t2Generator = (uint8_t *)rhoGenerator;
			memcpy(&t2Generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_H, sizeof(GENERATOR_H));
			
			// Check if the result is infinity or its x component is zero
			if(cx_math_is_zero((uint8_t *)t2, sizeof(t2)) || !cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, t2Generator, UNCOMPRESSED_PUBLIC_KEY_SIZE, (uint8_t *)t2, sizeof(t2)) || cx_math_is_zero(&t2Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Get the product of tau2 and its generator
			uint8_t *tau2Generator = (uint8_t *)aterm;
			memcpy(&tau2Generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));
			
			// Check if the result is infinity or its x component is zero
			if(cx_math_is_zero(tau2, SCALAR_SIZE) || !cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, tau2Generator, UNCOMPRESSED_PUBLIC_KEY_SIZE, tau2, SCALAR_SIZE) || cx_math_is_zero(&tau2Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Set t two to the result
			memcpy((uint8_t *)&tTwo[PUBLIC_KEY_PREFIX_SIZE], &tau2Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE);
			tTwo[0] = (tau2Generator[UNCOMPRESSED_PUBLIC_KEY_SIZE - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
			
			// Check if adding tau2 generator to the t2 generator is infinity or its x component is zero
			if(!cx_ecfp_add_point(CX_CURVE_SECP256K1, t2Generator, tau2Generator, t2Generator, UNCOMPRESSED_PUBLIC_KEY_SIZE) || cx_math_is_zero(&t2Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Update running commitment with the t1 generator and t2 generator
			bulletproofUpdateCommitment(runningCommitment, &t1Generator[PUBLIC_KEY_PREFIX_SIZE], &t2Generator[PUBLIC_KEY_PREFIX_SIZE]);
			
			// Check if running commitment overflows or is zero
			if(cx_math_cmp((uint8_t *)runningCommitment, SECP256K1_CURVE_ORDER, sizeof(runningCommitment)) >= 0 || cx_math_is_zero((uint8_t *)runningCommitment, sizeof(runningCommitment))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Get x from running commitment
			uint8_t *x = (uint8_t *)runningCommitment;
			
			// Get the product of tau1 and x
			uint8_t *tempOne = tau1;
			cx_math_multm(tempOne, tau1, x, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
			
			// Square x
			const uint8_t two[] = {2};
			cx_math_powm(x, x, two, sizeof(two), SECP256K1_CURVE_ORDER, SCALAR_SIZE);
			
			// Get the product of tau2 and x
			uint8_t *tempTwo = tau2;
			cx_math_multm(tempTwo, tau2, x, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
			
			// Add the result
			cx_math_addm(tempOne, tempOne, tempTwo, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
			
			// Multiply z squared by the blinding factor
			cx_math_powm((uint8_t *)z, (uint8_t *)z, two, sizeof(two), SECP256K1_CURVE_ORDER, sizeof(z));
			cx_math_multm(tempTwo, (uint8_t *)z, blindingFactor, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
			
			// Add the result to get tau x
			cx_math_addm((uint8_t *)tauX, tempOne, tempTwo, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
		}
		
		// Finally
		FINALLY {
		
			// Clear t0, t1, and t2
			explicit_bzero((uint8_t *)t0, sizeof(t0));
			explicit_bzero((uint8_t *)t1, sizeof(t1));
			explicit_bzero((uint8_t *)t2, sizeof(t2));
			
			// Clear y, and z
			explicit_bzero((uint8_t *)y, sizeof(y));
			explicit_bzero((uint8_t *)z, sizeof(z));
			
			// Clear aterm
			explicit_bzero((uint8_t *)aterm, sizeof(aterm));
			
			// Clear alpha generator and rho generator
			explicit_bzero((uint8_t *)alphaGenerator, sizeof(alphaGenerator));
			explicit_bzero((uint8_t *)rhoGenerator, sizeof(rhoGenerator));
			
			// Clear alpha and rho
			explicit_bzero((uint8_t *)alpha, sizeof(alpha));
			explicit_bzero((uint8_t *)rho, sizeof(rho));
			
			// Clear running commitment
			explicit_bzero((uint8_t *)runningCommitment, sizeof(runningCommitment));
		}
	}
	
	// End try
	END_TRY;
}

// Bulletproof update commitment
void bulletproofUpdateCommitment(volatile uint8_t *commitment, const uint8_t *leftPart, const uint8_t *rightPart) {

	// Initialzie the hash
	volatile cx_sha256_t hash;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Initialzie hash
			cx_sha256_init((cx_sha256_t *)&hash);
			
			// Add commitment to the hash
			cx_hash((cx_hash_t *)&hash, 0, (uint8_t *)commitment, CX_SHA256_SIZE, NULL, 0);
			
			// Set parity to if the left part's y component isn't quadratic residue
			const uint8_t *y = &leftPart[PUBLIC_KEY_COMPONENT_SIZE];
			uint8_t parity = (bool)!isQuadraticResidue(y) << 1;
			
			// Add to parity to if the right part's y component isn't quadratic residue
			y = &rightPart[PUBLIC_KEY_COMPONENT_SIZE];
			parity |= (bool)!isQuadraticResidue(y);
			
			// Add parity to the hash
			cx_hash((cx_hash_t *)&hash, 0, &parity, sizeof(parity), NULL, 0);
			
			// Add left part's x component to the hash
			cx_hash((cx_hash_t *)&hash, 0, leftPart, PUBLIC_KEY_COMPONENT_SIZE, NULL, 0);
			
			// Add right part's x component to the hash and set the commitment to the result
			cx_hash((cx_hash_t *)&hash, CX_LAST, rightPart, PUBLIC_KEY_COMPONENT_SIZE, (uint8_t *)commitment, CX_SHA256_SIZE);
		}
	
		// Finally
		FINALLY {
		
			// Clear the hash
			explicit_bzero((cx_sha256_t *)&hash, sizeof(hash));
		}
	}
	
	// End try
	END_TRY;
}

// Create scalars from ChaCha20
void createScalarsFromChaCha20(volatile uint8_t *firstScalar, volatile uint8_t *secondScalar, const uint8_t *seed, uint64_t index) {

	// Go through counter values
	for(uint32_t counter = 0;; ++counter) {
	
		// Initialize ChaCha20 Poly1305 state
		volatile struct ChaCha20Poly1305State chaCha20Poly1305State;
		
		// Initialize ChaCha20 current state
		volatile uint32_t chaCha20CurrentState[ARRAYLEN(chaCha20Poly1305State.chaCha20OriginalState)];
	
		// Begin try
		BEGIN_TRY {
		
			// Try
			TRY {
	
				// Initiaize ChaCha20 state with the seed, nonce, and index
				const uint32_t nonce[] = {
				
					// Index
					index >> (sizeof(uint32_t) * BITS_IN_A_BYTE),
					
					// Zero
					0,
					
					// Counter
					counter
				};
				
				initializeChaCha20Poly1305((ChaCha20Poly1305State *)&chaCha20Poly1305State, seed, (uint8_t *)nonce, NULL, 0, index);

				// Get ChaCha20 current state
				initializeChaCha20CurrentState((ChaCha20Poly1305State *)&chaCha20Poly1305State, (uint32_t *)chaCha20CurrentState);
				
				// Set scalars to the ChaCha20 current state
				memcpy((uint8_t *)firstScalar,  (uint32_t *)chaCha20CurrentState, SCALAR_SIZE);
				memcpy((uint8_t *)secondScalar,  (uint32_t *)&chaCha20CurrentState[ARRAYLEN(chaCha20CurrentState) / 2], SCALAR_SIZE);
			}
		
			// Finally
			FINALLY {
			
				// Clear the ChaCha20 current state
				explicit_bzero((uint32_t *)chaCha20CurrentState, sizeof(chaCha20CurrentState));
				
				// Clear the ChaCha20 Poly1305 state
				explicit_bzero((ChaCha20Poly1305State *)&chaCha20Poly1305State, sizeof(chaCha20Poly1305State));
			}
		}
		
		// End try
		END_TRY;
				
		// Check if scalars don't overflow
		if(cx_math_cmp((uint8_t *)firstScalar, SECP256K1_CURVE_ORDER, SCALAR_SIZE) < 0 && cx_math_cmp((uint8_t *)secondScalar, SECP256K1_CURVE_ORDER, SCALAR_SIZE) < 0) {

			// Break
			break;
		}
	}
}

// Use LR generator
void useLrGenerator(volatile uint8_t *result, const uint8_t *x, const uint8_t *y, const uint8_t *z, const uint8_t *nonce, uint64_t value) {

	// Initialize yn
	volatile uint8_t yn[SCALAR_SIZE] = {0};
	
	// Initialize z22n
	volatile uint8_t z22n[SCALAR_SIZE];
	
	// Initialize lout
	volatile uint8_t lout[SCALAR_SIZE];
	
	// Initialize neg z
	volatile uint8_t negz[SCALAR_SIZE];
	
	// Initialize sr
	volatile uint8_t sr[SCALAR_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Set yn to one
			yn[sizeof(yn) - 1] = 1;
			
			// Set z22n to z squared
			const uint8_t two[] = {2};
			cx_math_powm((uint8_t *)z22n, z, two, sizeof(two), SECP256K1_CURVE_ORDER, sizeof(z22n));

			// Go through all bits to prove
			for(size_t i = 0; i < BITS_TO_PROVE; ++i) {
			
				// Get bit in the value
				const bool bit = (value >> i) & 1;
				
				// Set bit in lout
				explicit_bzero((uint8_t *)lout, SCALAR_SIZE - 1);
				lout[SCALAR_SIZE - 1] = bit;
				
				// Get the negation of z
				memcpy((uint8_t *)negz, z, sizeof(negz));
				conditionalNegate(negz, true, SECP256K1_CURVE_ORDER);
				
				// Update lout
				cx_math_addm((uint8_t *)lout, (uint8_t *)lout, (uint8_t *)negz, SECP256K1_CURVE_ORDER, sizeof(negz));
				
				// Create sl and sr
				uint8_t *sl = (uint8_t *)negz;
				createScalarsFromChaCha20(sl, sr, nonce, i + 2);
				
				// Multiply sl and sr by x
				cx_math_multm(sl, sl, x, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
				cx_math_multm((uint8_t *)sr, (uint8_t *)sr, x, SECP256K1_CURVE_ORDER, sizeof(sr));
				
				// Update lout
				cx_math_addm((uint8_t *)lout, (uint8_t *)lout, sl, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
				
				// Set bit in rout
				uint8_t *rout = (uint8_t *)negz;
				explicit_bzero(rout, SCALAR_SIZE - 1);
				rout[SCALAR_SIZE - 1] = 1 - bit;
				
				// Negate rout
				conditionalNegate(rout, true, SECP256K1_CURVE_ORDER);
				
				// Update rout
				cx_math_addm(rout, rout, z, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
				cx_math_addm(rout, rout, (uint8_t *)sr, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
				cx_math_multm(rout, rout, (uint8_t *)yn, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
				cx_math_addm(rout, rout, (uint8_t *)z22n, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
				
				// Update yn and z22n generator
				cx_math_multm((uint8_t *)yn, (uint8_t *)yn, y, SECP256K1_CURVE_ORDER, sizeof(yn));
				cx_math_addm((uint8_t *)z22n, (uint8_t *)z22n, (uint8_t *)z22n, SECP256K1_CURVE_ORDER, sizeof(z22n));
				
				// Update result with lout and rout
				cx_math_multm((uint8_t *)lout, (uint8_t *)lout, rout, SECP256K1_CURVE_ORDER, sizeof(lout));
				cx_math_addm((uint8_t *)result, (uint8_t *)result, (uint8_t *)lout, SECP256K1_CURVE_ORDER, SCALAR_SIZE);
			}
		}
		
		// Finally
		FINALLY {
		
			// Clear sr
			explicit_bzero((uint8_t *)sr, sizeof(sr));
			
			// Clear neg z
			explicit_bzero((uint8_t *)negz, sizeof(negz));
			
			// Clear lout
			explicit_bzero((uint8_t *)lout, sizeof(lout));
			
			// Clear z22n
			explicit_bzero((uint8_t *)z22n, sizeof(z22n));
			
			// Clear yn
			explicit_bzero((uint8_t *)yn, sizeof(yn));
		}
	}
	
	// End try
	END_TRY;
}

// Conditional negate
void conditionalNegate(volatile uint8_t *scalar, bool negate, const uint8_t *modulo) {

	// Initialize temp
	volatile uint8_t temp[SCALAR_SIZE];

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Negate the scalar if it's not zero and negating in a way that tries to mitigate timing attacks
			cx_math_subm((cx_math_is_zero((uint8_t *)scalar, SCALAR_SIZE) || !negate) ? (uint8_t *)temp : (uint8_t *)scalar, modulo, (uint8_t *)scalar, modulo, SCALAR_SIZE);
		}
		
		// Finally
		FINALLY {
		
			// Clear temp
			explicit_bzero((uint8_t *)temp, sizeof(temp));
		}
	}
	
	// End try
	END_TRY;
}

// Is quadratic residue
bool isQuadraticResidue(const uint8_t *component) {

	// Initialize square root squared
	volatile uint8_t squareRootSquared[PUBLIC_KEY_COMPONENT_SIZE];
	
	// Initialize result
	volatile bool result;

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {

			// Get the square root of the component squared
			cx_math_powm((uint8_t *)squareRootSquared, component, SECP256K1_CURVE_SQUARE_ROOT_EXPONENT, sizeof(SECP256K1_CURVE_SQUARE_ROOT_EXPONENT), SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE);
			
			const uint8_t two[] = {2};
			cx_math_powm((uint8_t *)squareRootSquared, (uint8_t *)squareRootSquared, two, sizeof(two), SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE);
			
			// Set result to if the component is quadratic residue
			result = !cx_math_cmp(component, (uint8_t *)squareRootSquared, PUBLIC_KEY_COMPONENT_SIZE);
		}
		
		// Finally
		FINALLY {
		
			// Clear square root squared
			explicit_bzero((uint8_t *)squareRootSquared, sizeof(squareRootSquared));
		}
	}
	
	// End try
	END_TRY;
	
	// Return result
	return result;
}
