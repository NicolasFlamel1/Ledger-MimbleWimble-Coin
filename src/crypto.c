// Header files
#include <alloca.h>
#include <os.h>
#include <os_io_seproxyhal.h>
#include <string.h>
#include "blake2b.h"
#include "chacha20_poly1305.h"
#include "common.h"
#include "crypto.h"
#include "currency.h"
#include "generators.h"
#include "menus.h"
#include "mqs.h"
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

// BIP44 path coin type index
#define BIP44_PATH_COIN_TYPE_INDEX 1

// BIP44 path account index
#define BIP44_PATH_ACCOUNT_INDEX 2

// Address private key blinding factor value
#define ADDRESS_PRIVATE_KEY_BLINDING_FACTOR_VALUE 713

// Ed25519 private key size
#define ED25519_PRIVATE_KEY_SIZE 32

// X25519 private key size
#define X25519_PRIVATE_KEY_SIZE 32

// Secp256k1 private key size
#define SECP256K1_PRIVATE_KEY_SIZE 32

// Commitment even prefix
#define COMMITMENT_EVEN_PREFIX 8

// Commitment odd prefix
#define COMMITMENT_ODD_PREFIX 9

// Bits to prove
#define BITS_TO_PROVE (sizeof(uint64_t) * BITS_IN_A_BYTE)


// Constants

// Secp256k1 curve order
static const uint8_t SECP256K1_CURVE_ORDER[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xBA, 0xAE, 0xDC, 0xE6, 0xAF, 0x48, 0xA0, 0x3B, 0xBF, 0xD2, 0x5E, 0x8C, 0xD0, 0x36, 0x41, 0x41};

// Secp256k1 curve prime
static const uint8_t SECP256K1_CURVE_PRIME[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xFF, 0xFF, 0xFC, 0x2F};

// Secp256k1 curve square root exponent
static const uint8_t SECP256K1_CURVE_SQUARE_ROOT_EXPONENT[] = {0x3F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xBF, 0xFF, 0xFF, 0x0C};

// Ed25519 curve prime
static const uint8_t ED25519_CURVE_PRIME[] = {0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xED};

// Generator G
static const uint8_t GENERATOR_G[] = {0x79, 0xBE, 0x66, 0x7E, 0xF9, 0xDC, 0xBB, 0xAC, 0x55, 0xA0, 0x62, 0x95, 0xCE, 0x87, 0x0B, 0x07, 0x02, 0x9B, 0xFC, 0xDB, 0x2D, 0xCE, 0x28, 0xD9, 0x59, 0xF2, 0x81, 0x5B, 0x16, 0xF8, 0x17, 0x98, 0x48, 0x3A, 0xDA, 0x77, 0x26, 0xA3, 0xC4, 0x65, 0x5D, 0xA4, 0xFB, 0xFC, 0x0E, 0x11, 0x08, 0xA8, 0xFD, 0x17, 0xB4, 0x48, 0xA6, 0x85, 0x54, 0x19, 0x9C, 0x47, 0xD0, 0x8F, 0xFB, 0x10, 0xD4, 0xB8};

// Generator H
static const uint8_t GENERATOR_H[] = {0x50, 0x92, 0x9B, 0x74, 0xC1, 0xA0, 0x49, 0x54, 0xB7, 0x8B, 0x4B, 0x60, 0x35, 0xE9, 0x7A, 0x5E, 0x07, 0x8A, 0x5A, 0x0F, 0x28, 0xEC, 0x96, 0xD5, 0x47, 0xBF, 0xEE, 0x9A, 0xCE, 0x80, 0x3A, 0xC0, 0x31, 0xD3, 0xC6, 0x86, 0x39, 0x73, 0x92, 0x6E, 0x04, 0x9E, 0x63, 0x7C, 0xB1, 0xB5, 0xF4, 0x0A, 0x36, 0xDA, 0xC2, 0x8A, 0xF1, 0x76, 0x69, 0x68, 0xC3, 0x0C, 0x23, 0x13, 0xF3, 0xA3, 0x89, 0x04};

// Generator J
static const uint8_t GENERATOR_J[] = {0xB8, 0x60, 0xF5, 0x67, 0x95, 0xFC, 0x03, 0xF3, 0xC2, 0x16, 0x85, 0x38, 0x3D, 0x1B, 0x5A, 0x2F, 0x29, 0x54, 0xF4, 0x9B, 0x7E, 0x39, 0x8B, 0x8D, 0x2A, 0x01, 0x93, 0x93, 0x36, 0x21, 0x15, 0x5F, 0xA4, 0x3F, 0x09, 0xD3, 0x2C, 0xAA, 0x8F, 0x53, 0x42, 0x3F, 0x42, 0x74, 0x03, 0xA5, 0x6A, 0x31, 0x65, 0xA5, 0xA6, 0x9A, 0x74, 0xCF, 0x56, 0xFC, 0x59, 0x01, 0xA2, 0xDC, 0xA6, 0xC5, 0xC4, 0x3A};

// BIP44 path without coin type and account
static const uint32_t BIP44_PATH_WITHOUT_COIN_TYPE_AND_ACCOUNT[] = {

	// Purpose
	44 | HARDENED_PATH_MASK,

	// Coin type
	HARDENED_PATH_MASK,

	// Account
	HARDENED_PATH_MASK,

	// Change
	0,

	// Address index
	0,
};

// Seed key
static const char SEED_KEY[] = {'I', 'a', 'm', 'V', 'o', 'l', 'd', 'e', 'm', 'o', 'r', 't'};

// Address private key hash key
static const char ADDRESS_PRIVATE_KEY_HASH_KEY[] = {'G', 'r', 'i', 'n', 'b', 'o', 'x', '_', 's', 'e', 'e', 'd'};


// Function prototypes

// Derive child key
static void deriveChildKey(volatile cx_ecfp_private_key_t *privateKey, volatile uint8_t *chainCode, const uint32_t account, const uint32_t *path, const size_t pathLength, const bool useProvidedPrivateKeyAndChainCode);

// Bulletproof update commitment
static void bulletproofUpdateCommitment(volatile uint8_t *commitment, const uint8_t *leftPart, const uint8_t *rightPart);

// Create scalars from ChaCha20
static void createScalarsFromChaCha20(volatile uint8_t *firstScalar, volatile uint8_t *secondScalar, const uint8_t *seed, const uint64_t index);

// Use LR generator
static void useLrGenerator(volatile uint8_t *t0, volatile uint8_t *t1, volatile uint8_t *t2, const uint8_t *y, const uint8_t *z, const uint8_t *nonce, const uint64_t value);

// Is quadratic residue
static bool isQuadraticResidue(const uint8_t *component);

// Compare big numbers
static int compareBigNumbers(const uint8_t *firstValue, const uint8_t *secondValue, const size_t valueLength);


// Supporting function implementation

// Get private key and chain code
void getPrivateKeyAndChainCode(volatile cx_ecfp_private_key_t *privateKey, volatile uint8_t *chainCode, const uint32_t account) {

	// Copy BIP44 path without coin type and account
	uint32_t bip44Path[ARRAYLEN(BIP44_PATH_WITHOUT_COIN_TYPE_AND_ACCOUNT)];
	memcpy(bip44Path, BIP44_PATH_WITHOUT_COIN_TYPE_AND_ACCOUNT, sizeof(BIP44_PATH_WITHOUT_COIN_TYPE_AND_ACCOUNT));

	// Set BIP44 path's coin type
	bip44Path[BIP44_PATH_COIN_TYPE_INDEX] |= CURRENCY_BIP44_COIN_TYPE;

	// Set BIP44 path's account
	bip44Path[BIP44_PATH_ACCOUNT_INDEX] |= account;

	// Initialize node
	volatile uint8_t node[NODE_SIZE];

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Derive node and chain code from path and seed key and throw error if it fails
			CX_THROW(os_derive_bip32_with_seed_no_throw(HDW_NORMAL, CX_CURVE_SECP256K1, bip44Path, ARRAYLEN(bip44Path), (uint8_t *)node, (uint8_t *)chainCode, (unsigned char *)SEED_KEY, sizeof(SEED_KEY)));

			// Check if node isn't a valid secret key
			if(!isValidSecp256k1PrivateKey((uint8_t *)node, sizeof(privateKey->d))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get private key from node and throw error if it fails
			CX_THROW(cx_ecfp_init_private_key_no_throw(CX_CURVE_SECP256K1, (uint8_t *)node, sizeof(privateKey->d), (cx_ecfp_private_key_t *)privateKey));
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

			// Get uncompressed public key from the private key and throw error if it fails
			CX_THROW(cx_ecfp_generate_pair_no_throw(CX_CURVE_SECP256K1, (cx_ecfp_public_key_t *)&uncompressedPublicKey, (cx_ecfp_private_key_t *)privateKey, true));

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

// Derive blinding factor
void deriveBlindingFactor(volatile uint8_t *blindingFactor, const uint32_t account, const uint64_t value, const uint32_t *path, const size_t pathLength, const enum SwitchType switchType) {

	// Initialize child private key and chain code
	volatile cx_ecfp_private_key_t childPrivateKey;
	volatile uint8_t childChainCode[CHAIN_CODE_SIZE];

	// Initialize hash
	volatile cx_sha256_t hash;

	// Initialize publicKeyGenerator
	volatile uint8_t publicKeyGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_J)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};

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
				case REGULAR_SWITCH_TYPE: {

					// Get commitment from value and child's private key
					uint8_t *commitment = (uint8_t *)&publicKeyGenerator[PUBLIC_KEY_PREFIX_SIZE];
					commitValue(commitment, value, (uint8_t *)childPrivateKey.d, true);

					// Add commitment to the hash and throw error if it fails
					cx_sha256_init((cx_sha256_t *)&hash);
					CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, 0, commitment, COMMITMENT_SIZE, NULL, 0));

					// Get product of the generator public key and the child's private key and throw error if it fails
					memcpy((uint8_t *)&publicKeyGenerator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_J, sizeof(GENERATOR_J));
					CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, (uint8_t *)publicKeyGenerator, (uint8_t *)childPrivateKey.d, BLINDING_FACTOR_SIZE));

					// Check if the result has an x component of zero
					if(isZeroArraySecure((uint8_t *)&publicKeyGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

						// Throw internal error error
						THROW(INTERNAL_ERROR_ERROR);
					}

					// Compress the result
					publicKeyGenerator[0] = (publicKeyGenerator[sizeof(publicKeyGenerator) - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;

					// Add result to the hash and get the blinding factor and throw error if it fails
					CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, CX_LAST, (uint8_t *)publicKeyGenerator, COMPRESSED_PUBLIC_KEY_SIZE, (uint8_t *)blindingFactor, BLINDING_FACTOR_SIZE));

					// Check if the blinding factor overflows
					if(compareBigNumbers((uint8_t *)blindingFactor, SECP256K1_CURVE_ORDER, BLINDING_FACTOR_SIZE) >= 0) {

						// Throw internal error error
						THROW(INTERNAL_ERROR_ERROR);
					}

					// Add the child's private key to the blinding factor and throw error if it fails
					CX_THROW(cx_math_addm_no_throw((uint8_t *)blindingFactor, (uint8_t *)blindingFactor, (uint8_t *)childPrivateKey.d, SECP256K1_CURVE_ORDER, BLINDING_FACTOR_SIZE));

					// Check if blinding factor isn't a valid secret key
					if(!isValidSecp256k1PrivateKey((uint8_t *)blindingFactor, BLINDING_FACTOR_SIZE)) {

						// Throw internal error error
						THROW(INTERNAL_ERROR_ERROR);
					}

					// Break
					break;
				}
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
void commitValue(volatile uint8_t *commitment, const uint64_t value, const uint8_t *blindingFactor, const bool compress) {

	// Initialize generators
	volatile uint8_t valueGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_H)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	volatile uint8_t blindGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get product of the value and its generator and throw error if it fails
			memcpy((uint8_t *)&valueGenerator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_H, sizeof(GENERATOR_H));
			uint8_t temp[BLINDING_FACTOR_SIZE] = {0};
			U4BE_ENCODE(temp, sizeof(temp) - sizeof(uint32_t), value);
			U4BE_ENCODE(temp, sizeof(temp) - sizeof(uint64_t), value >> (sizeof(uint32_t) * BITS_IN_A_BYTE));

			CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, (uint8_t *)valueGenerator, temp, sizeof(temp)));

			// Check if result has an x component of zero
			if(isZeroArraySecure((uint8_t *)&valueGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get product of the blind and its generator and throw error if it fails
			memcpy((uint8_t *)&blindGenerator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));

			CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, (uint8_t *)blindGenerator, blindingFactor, BLINDING_FACTOR_SIZE));

			// Check if result has an x component of zero
			if(isZeroArraySecure((uint8_t *)&blindGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get sum of products and throw error if it fails
			CX_THROW(cx_ecfp_add_point_no_throw(CX_CURVE_SECP256K1, (uint8_t *)valueGenerator, (uint8_t *)valueGenerator, (uint8_t *)blindGenerator));

			// Check if result has an x component of zero
			if(isZeroArraySecure((uint8_t *)&valueGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Copy x component to the commitment
			const uint8_t *x = (uint8_t *)&valueGenerator[PUBLIC_KEY_PREFIX_SIZE];
			memcpy((uint8_t *)&commitment[PUBLIC_KEY_PREFIX_SIZE], x, PUBLIC_KEY_COMPONENT_SIZE);

			// Set commitment's prefix to if the y component is quadratic residue
			const uint8_t *y = (uint8_t *)&valueGenerator[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
			commitment[0] = isQuadraticResidue(y) ? COMMITMENT_EVEN_PREFIX : COMMITMENT_ODD_PREFIX;

			// Check if not compressing the commitment
			if(!compress) {

				// Copy y component to the commitment
				memcpy((uint8_t *)&commitment[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE], y, PUBLIC_KEY_COMPONENT_SIZE);
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
void getRewindNonce(volatile uint8_t *rewindNonce, const uint32_t account, const uint8_t *commitment) {

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
			getBlake2b(rewindHash, sizeof(rewindHash), (uint8_t *)publicKey, sizeof(publicKey), NULL, 0);

			// Get rewind nonce from the rewind hash and the commitment
			getBlake2b(rewindNonce, NONCE_SIZE, (uint8_t *)rewindHash, sizeof(rewindHash), commitment, COMMITMENT_SIZE);

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
void getPrivateNonce(volatile uint8_t *privateNonce, const uint32_t account, const uint8_t *commitment) {

	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;

	// Initialize private hash
	volatile uint8_t privateHash[NONCE_SIZE];

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get private key
			getPrivateKeyAndChainCode(&privateKey, NULL, account);

			// Get private hash from the private key
			getBlake2b(privateHash, sizeof(privateHash), (uint8_t *)privateKey.d, privateKey.d_len, NULL, 0);

			// Get private nonce from the private hash and the commitment
			getBlake2b(privateNonce, NONCE_SIZE, (uint8_t *)privateHash, sizeof(privateHash), commitment, COMMITMENT_SIZE);

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

			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}

	// End try
	END_TRY;
}

// Get address private key
void getAddressPrivateKey(volatile cx_ecfp_private_key_t *addressPrivateKey, const uint32_t account, const uint32_t index, const cx_curve_t curve) {

	// Initialize blinding factor
	volatile uint8_t blindingFactor[BLINDING_FACTOR_SIZE];

	// Initialize node
	volatile uint8_t node[NODE_SIZE];

	// Private key
	volatile cx_ecfp_private_key_t privateKey;

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Derive blinding factor from the address private key blinding factor value and the root path
			deriveBlindingFactor(blindingFactor, account, ADDRESS_PRIVATE_KEY_BLINDING_FACTOR_VALUE, NULL, 0, REGULAR_SWITCH_TYPE);

			// Get the node as the HMAC-SHA512 of the blinding factor with the addres private key hash key as the key
			cx_hmac_sha512((uint8_t *)ADDRESS_PRIVATE_KEY_HASH_KEY, sizeof(ADDRESS_PRIVATE_KEY_HASH_KEY), (uint8_t *)blindingFactor, sizeof(blindingFactor), (uint8_t *)node, sizeof(node));

			// Check if node isn't a valid private key
			if(!isValidSecp256k1PrivateKey((uint8_t *)node, sizeof(privateKey.d))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get private key from node and throw error if it fails
			CX_THROW(cx_ecfp_init_private_key_no_throw(CX_CURVE_SECP256K1, (uint8_t *)node, sizeof(privateKey.d), (cx_ecfp_private_key_t *)&privateKey));

			// Get chain code from the node
			uint8_t *chainCode = (uint8_t *)&node[sizeof(privateKey.d)];

			// Derive child key from the private key and chain code at the index
			deriveChildKey(&privateKey, chainCode, account, &index, 1, true);

			// Check curve
			switch(curve) {

				// Secp256k1
				case CX_CURVE_SECP256K1:

					// Check if private key isn't a valid private key
					if(!isValidSecp256k1PrivateKey((uint8_t *)privateKey.d, privateKey.d_len)) {

						// Throw internal error error
						THROW(INTERNAL_ERROR_ERROR);
					}

					// Break
					break;

				// Ed25519
				case CX_CURVE_Ed25519:

					// Check if private key isn't a valid private key
					if(!isValidEd25519PrivateKey((uint8_t *)privateKey.d, privateKey.d_len)) {

						// Throw internal error error
						THROW(INTERNAL_ERROR_ERROR);
					}

					// Break
					break;

				// Default
				default:

					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);

					// Break
					break;
			}

			// Get address private key from the private key and throw error if it fails
			CX_THROW(cx_ecfp_init_private_key_no_throw(curve, (uint8_t *)privateKey.d, privateKey.d_len, (cx_ecfp_private_key_t *)addressPrivateKey));
		}

		// Finally
		FINALLY {

			// Clear the blinding factor
			explicit_bzero((uint8_t *)blindingFactor, sizeof(blindingFactor));

			// Clear the node
			explicit_bzero((uint8_t *)node, sizeof(node));

			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}

	// End try
	END_TRY;
}

// Update blinding factor sum
void updateBlindingFactorSum(uint8_t *blindingFactorSum, const uint8_t *blindingFactor, const bool blindingFactorIsPositive) {

	// Check if blinding factor isn't positive
	if(blindingFactorIsPositive) {

		// Add blinding factor to the blinding factor sum and throw error if it fails
		CX_THROW(cx_math_addm_no_throw(blindingFactorSum, blindingFactorSum, blindingFactor, SECP256K1_CURVE_ORDER, BLINDING_FACTOR_SIZE));
	}

	// Otherwise
	else {

		// Subtract blinding factor from the blinding factor sum and throw error if it fails
		CX_THROW(cx_math_subm_no_throw(blindingFactorSum, blindingFactorSum, blindingFactor, SECP256K1_CURVE_ORDER, BLINDING_FACTOR_SIZE));
	}

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

		// Normalize the secret nonce and throw error if it fails
		CX_THROW(cx_math_modm_no_throw(secretNonce, NONCE_SIZE, SECP256K1_CURVE_ORDER, sizeof(SECP256K1_CURVE_ORDER)));

	} while(isZeroArraySecure(secretNonce, NONCE_SIZE));

	// Get the product of the secret nonce and its generator and throw error if it fails
	uint8_t generator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	memcpy(&generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));

	CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, generator, secretNonce, NONCE_SIZE));

	// Check if the result has an x component of zero
	if(isZeroArraySecure(&generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

		// Throw internal error error
		THROW(INTERNAL_ERROR_ERROR);
	}

	// Check if the result's y component isn't quadratic residue
	uint8_t *y = &generator[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
	if(!isQuadraticResidue(y)) {

		// Negate the secret nonce and the result's y component and throw error if it fails
		CX_THROW(cx_math_subm_no_throw(secretNonce, SECP256K1_CURVE_ORDER, secretNonce, SECP256K1_CURVE_ORDER, NONCE_SIZE));
		CX_THROW(cx_math_subm_no_throw(y, SECP256K1_CURVE_PRIME, y, SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE));
	}

	// Check if creating public nonce
	if(publicNonce) {

		// Get the public nonce from the result
		publicNonce[0] = (generator[sizeof(generator) - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
		memcpy(&publicNonce[PUBLIC_KEY_PREFIX_SIZE], &generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE);
	}
}

// Create single-signer signature
void createSingleSignerSignature(volatile uint8_t *signature, const uint8_t *message, const uint8_t *blindingFactor, const uint8_t *secretNonce, const uint8_t *publicNonce, const uint8_t *publicKey) {

	// Get the product of the secret nonce and its generator and throw error if it fails
	uint8_t generator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	memcpy(&generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));

	CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, generator, secretNonce, NONCE_SIZE));

	// Check if the result has an x component of zero
	if(isZeroArraySecure(&generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

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

	// Get signature hash from the public nonce's x component, public key, and message and throw error if it fails
	cx_sha256_t hash;
	cx_sha256_init(&hash);
	CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, 0, &publicNonce[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE, NULL, 0));
	CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, 0, publicKey, COMPRESSED_PUBLIC_KEY_SIZE, NULL, 0));
	uint8_t signatureHash[CX_SHA256_SIZE];
	CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, CX_LAST, message, SINGLE_SIGNER_MESSAGE_SIZE, signatureHash, sizeof(signatureHash)));

	// Normalize the signature hash and throw error if it fails
	CX_THROW(cx_math_modm_no_throw(signatureHash, sizeof(signatureHash), SECP256K1_CURVE_ORDER, sizeof(SECP256K1_CURVE_ORDER)));

	// Initialize the s component
	volatile uint8_t s[SCALAR_SIZE];

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Multiply blinding factor by the signature hash and throw error if it fails
			CX_THROW(cx_math_multm_no_throw((uint8_t *)s, blindingFactor, signatureHash, SECP256K1_CURVE_ORDER, sizeof(s)));

			// Check if the uncompressed public nonce's y component is quadratic residue
			if(isQuadraticResidue(&uncompressedPublicNonce[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE])) {

				// Add secret nonce to the result and throw error if it fails
				CX_THROW(cx_math_addm_no_throw((uint8_t *)s, (uint8_t *)s, secretNonce, SECP256K1_CURVE_ORDER, sizeof(s)));
			}

			// Otherwise
			else {

				// Subtract secret nonce from the result and throw error if it fails
				CX_THROW(cx_math_subm_no_throw((uint8_t *)s, (uint8_t *)s, secretNonce, SECP256K1_CURVE_ORDER, sizeof(s)));
			}

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
size_t getEncryptedDataLength(const size_t dataLength) {

	// Return encrypted data length
	return dataLength + ((dataLength % CX_AES_BLOCK_SIZE) ? CX_AES_BLOCK_SIZE - dataLength % CX_AES_BLOCK_SIZE : CX_AES_BLOCK_SIZE);
}

// Encrypt data
void encryptData(volatile uint8_t *result, const uint8_t *data, const size_t dataLength, const uint8_t *key, const size_t keyLength) {

	// Get padded data length
	const size_t paddedDataLength = getEncryptedDataLength(dataLength);

	// Initialize padded data
	volatile uint8_t *paddedData = alloca(paddedDataLength);

	// Initialize encryption key
	volatile cx_aes_key_t encryptionKey;

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Pad the data
			memcpy((uint8_t *)paddedData, data, dataLength);
			memset((uint8_t *)&paddedData[dataLength], paddedDataLength - dataLength, paddedDataLength - dataLength);

			// Initialize the encryption key with the key and throw error if it fails
			CX_THROW(cx_aes_init_key_no_throw(key, keyLength, (cx_aes_key_t *)&encryptionKey));

			// Encrypt the padded data with the encryption key and throw error if it fails
			size_t length = paddedDataLength;
			CX_THROW(cx_aes_no_throw((cx_aes_key_t *)&encryptionKey, CX_ENCRYPT | CX_PAD_NONE | CX_CHAIN_CBC | CX_LAST, (uint8_t *)paddedData, paddedDataLength, (uint8_t *)result, &length));
		}

		// Finally
		FINALLY {

			// Clear the encryption key
			explicit_bzero((cx_aes_key_t *)&encryptionKey, sizeof(encryptionKey));

			// Clear the padded data
			explicit_bzero((uint8_t *)paddedData, paddedDataLength);
		}
	}

	// End try
	END_TRY;
}

// Decrypt data
size_t decryptData(volatile uint8_t *result, const uint8_t *data, const size_t dataLength, const uint8_t *key, const size_t keyLength) {

	// Initialize decryption key
	volatile cx_aes_key_t decryptionKey;

	// Initialize decrypted data length
	volatile size_t decryptedDataLength;

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Initialize the decryption key with the key and throw error if it fails
			CX_THROW(cx_aes_init_key_no_throw(key, keyLength, (cx_aes_key_t *)&decryptionKey));

			// Decrypt the data with the decryption key and throw error if it fails
			size_t length = dataLength;
			CX_THROW(cx_aes_no_throw((cx_aes_key_t *)&decryptionKey, CX_DECRYPT | CX_PAD_NONE | CX_CHAIN_CBC | CX_LAST, data, dataLength, (uint8_t *)result, &length));

			// Check if last padding byte is invalid
			if(!result[dataLength - 1] || result[dataLength - 1] > CX_AES_BLOCK_SIZE || result[dataLength - 1] > dataLength) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Set decrypted data length
			decryptedDataLength = dataLength - result[dataLength - 1];

			// Initialize invalid padding
			bool invalidPadding = false;

			// Go through all decrypted bytes
			for(size_t i = 0; i < dataLength; ++i) {

				// Update invalid padding
				const uint8_t mask = -(i >= decryptedDataLength);
				invalidPadding |= result[i] ^ ((result[dataLength - 1] & mask) | (result[i] & ~mask));
			}

			// Check if padding is invalid
			if(invalidPadding) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
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

			// Check if the hash isn't a valid private key
			if(!isValidX25519PrivateKey((uint8_t *)hash, sizeof(x25519PrivateKey->d))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get X25519 private key from the hash and throw error if it fails
			CX_THROW(cx_ecfp_init_private_key_no_throw(CX_CURVE_Curve25519, (uint8_t *)hash, sizeof(x25519PrivateKey->d), (cx_ecfp_private_key_t *)x25519PrivateKey));
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

	// Uncompress the Ed25519 public key and throw error if it fails
	uint8_t uncompressedEd25519PublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
	uncompressedEd25519PublicKey[0] = ED25519_COMPRESSED_PUBLIC_KEY_PREFIX;
	memcpy(&uncompressedEd25519PublicKey[PUBLIC_KEY_PREFIX_SIZE], ed25519PublicKey, ED25519_PUBLIC_KEY_SIZE);

	CX_THROW(cx_edwards_decompress_point_no_throw(CX_CURVE_Ed25519, uncompressedEd25519PublicKey, sizeof(uncompressedEd25519PublicKey)));

	// Get uncompressed Ed25519 public key's y value
	uint8_t *y = &uncompressedEd25519PublicKey[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];

	// Get the sum of one and y and the difference of one and y and throw error if it fails
	const uint8_t one[SCALAR_SIZE] = {
		[SCALAR_SIZE - 1] = 1,
	};

	CX_THROW(cx_math_addm_no_throw(x25519PublicKey, one, y, ED25519_CURVE_PRIME, X25519_PUBLIC_KEY_SIZE));
	CX_THROW(cx_math_subm_no_throw(y, one, y, ED25519_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE));

	// Check if the difference of one and y is zero
	if(isZeroArraySecure(y, PUBLIC_KEY_COMPONENT_SIZE)) {

		// Throw internal error error
		THROW(INTERNAL_ERROR_ERROR);
	}

	// Compute the X25519 public key as the sum of one and y divided by the difference of one and y and throw error if it fails
	CX_THROW(cx_math_invprimem_no_throw(y, y, ED25519_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE));
	CX_THROW(cx_math_multm_no_throw(x25519PublicKey, x25519PublicKey, y, ED25519_CURVE_PRIME, X25519_PUBLIC_KEY_SIZE));

	// Swap the X25519 public key's endianness
	swapEndianness(x25519PublicKey, X25519_PUBLIC_KEY_SIZE);

	// Check if the X25519 public key is invalid
	if(!isValidX25519PublicKey(x25519PublicKey, X25519_PUBLIC_KEY_SIZE)) {

		// Throw internal error error
		THROW(INTERNAL_ERROR_ERROR);
	}
}

// Get payment proof message length
size_t getPaymentProofMessageLength(const uint64_t value, const size_t senderAddressLength) {

	// Check sender address length
	switch(senderAddressLength) {

		// MQS address size
		case MQS_ADDRESS_SIZE:

			// Return payment proof message length
			return COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE + senderAddressLength + getStringLength(value);

			// Break
			break;

		// Tor address size
		case TOR_ADDRESS_SIZE:

			// Return payment proof message length
			return COMMITMENT_SIZE * HEXADECIMAL_CHARACTER_SIZE + senderAddressLength + getStringLength(value);

			// Break
			break;

		// Default
		default:

			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);

			// Break
			break;
	}
}

// Get payment proof message
void getPaymentProofMessage(uint8_t *message, const uint64_t value, const uint8_t *kernelCommitment, const char *senderAddress, const size_t senderAddressLength) {

	// Check sender address length
	switch(senderAddressLength) {

		// MQS address size
		case MQS_ADDRESS_SIZE:

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

			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);

			// Break
			break;
	}
}

// Verify payment proof message
bool verifyPaymentProofMessage(const uint8_t *message, const size_t messageLength, const char *receiverAddress, const size_t receiverAddressLength, const uint8_t *signature, const size_t signatureLength) {

	// Check receiver address length
	switch(receiverAddressLength) {

		// MQS address size
		case MQS_ADDRESS_SIZE:

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
				if(!cx_ecdsa_verify_no_throw(&receiverPublicKey, hash, sizeof(hash), signature, signatureLength)) {

					// Return false
					return false;
				}
			}

			// Break
			break;

		// Tor address size
		case TOR_ADDRESS_SIZE:

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

			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);

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
	const bool result = isValidSecp256k1PublicKey(commitment, COMMITMENT_SIZE);

	// Revert the commitment's prefix
	commitment[0] += COMMITMENT_EVEN_PREFIX - EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;

	// Return the result
	return result;
}

// Is valid Ed25519 private key
bool isValidEd25519PrivateKey(__attribute__((unused)) const uint8_t *privateKey, const size_t length) {

	// Check if length is invalid
	if(length != ED25519_PRIVATE_KEY_SIZE) {

		// Return false
		return false;
	}

	// Return true
	return true;
}

// Is valid Ed25519 public key
bool isValidEd25519PublicKey(const uint8_t *publicKey, const size_t length) {

	// Check if length is invalid
	if(length != ED25519_PUBLIC_KEY_SIZE) {

		// Return false
		return false;
	}

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Uncompress the public key and throw error if it fails
			uint8_t uncompressedPublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
			uncompressedPublicKey[0] = ED25519_COMPRESSED_PUBLIC_KEY_PREFIX;
			memcpy(&uncompressedPublicKey[PUBLIC_KEY_PREFIX_SIZE], publicKey, length);

			CX_THROW(cx_edwards_decompress_point_no_throw(CX_CURVE_Ed25519, uncompressedPublicKey, sizeof(uncompressedPublicKey)));
		}

		// Catch all errors
		CATCH_ALL {

			// Close try
			CLOSE_TRY;

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

// Is valid X25519 private key
bool isValidX25519PrivateKey(__attribute__((unused)) const uint8_t *privateKey, const size_t length) {

	// Check if length is invalid
	if(length != X25519_PRIVATE_KEY_SIZE) {

		// Return false
		return false;
	}

	// Return true
	return true;
}

// Is valid X25519 public key
bool isValidX25519PublicKey(const uint8_t *publicKey, const size_t length) {

	// Check if length is invalid
	if(length != X25519_PUBLIC_KEY_SIZE) {

		// Return false
		return false;
	}

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Uncompress the public key and throw error if it fails
			uint8_t uncompressedPublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
			uncompressedPublicKey[0] = X25519_COMPRESSED_PUBLIC_KEY_PREFIX;
			memcpy(&uncompressedPublicKey[PUBLIC_KEY_PREFIX_SIZE], publicKey, length);

			CX_THROW(cx_edwards_decompress_point_no_throw(CX_CURVE_Curve25519, uncompressedPublicKey, sizeof(uncompressedPublicKey)));
		}

		// Catch all errors
		CATCH_ALL {

			// Close try
			CLOSE_TRY;

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
bool isValidSecp256k1PrivateKey(const uint8_t *privateKey, const size_t length) {

	// Check if length is invalid
	if(length != SECP256K1_PRIVATE_KEY_SIZE) {

		// Return false
		return false;
	}

	// Return if the private key doesn't overflow and isn't zero
	return compareBigNumbers(privateKey, SECP256K1_CURVE_ORDER, length) < 0 && !isZeroArraySecure(privateKey, length);
}

// Is valid secp256k1 public key
bool isValidSecp256k1PublicKey(const uint8_t *publicKey, const size_t length) {

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

			// Close try
			CLOSE_TRY;

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
	const uint8_t *x = &publicKey[PUBLIC_KEY_PREFIX_SIZE];

	// Check if public key's prefix is invalid or its x component overflows
	if((publicKey[0] != EVEN_COMPRESSED_PUBLIC_KEY_PREFIX && publicKey[0] != ODD_COMPRESSED_PUBLIC_KEY_PREFIX) || compareBigNumbers(x, SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE) >= 0) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Get y squared as x cubed plus seven and throw error if it fails
	uint8_t ySquared[PUBLIC_KEY_COMPONENT_SIZE];
	const uint8_t three = 3;
	CX_THROW(cx_math_powm_no_throw(ySquared, x, &three, sizeof(three), SECP256K1_CURVE_PRIME, sizeof(ySquared)));

	const uint8_t seven[SCALAR_SIZE] = {
		[SCALAR_SIZE - 1] = 7,
	};
	CX_THROW(cx_math_addm_no_throw(ySquared, ySquared, seven, SECP256K1_CURVE_PRIME, sizeof(ySquared)));

	// Return if the y squared isn't quadratic residue
	if(!isQuadraticResidue(ySquared)) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Get the square root of y squared and throw error if it fails
	uint8_t *y = &publicKey[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
	CX_THROW(cx_math_powm_no_throw(y, ySquared, SECP256K1_CURVE_SQUARE_ROOT_EXPONENT, sizeof(SECP256K1_CURVE_SQUARE_ROOT_EXPONENT), SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE));

	// Check if the y component's oddness doesn't match the expected oddness
	if((y[PUBLIC_KEY_COMPONENT_SIZE - 1] & 1) != (publicKey[0] == ODD_COMPRESSED_PUBLIC_KEY_PREFIX)) {

		// Negate the y component and throw error if it fails
		CX_THROW(cx_math_subm_no_throw(y, SECP256K1_CURVE_PRIME, y, SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE));
	}

	// Set public key's prefix to be uncompressed
	publicKey[0] = UNCOMPRESSED_PUBLIC_KEY_PREFIX;
}

// Get Ed25519 public key
void getEd25519PublicKey(uint8_t *ed25519PublicKey, const uint32_t account, const uint32_t index) {

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

			// Get address public key from address private key and throw error if it fails
			CX_THROW(cx_ecfp_generate_pair_no_throw(CX_CURVE_Ed25519, (cx_ecfp_public_key_t *)&addressPublicKey, (cx_ecfp_private_key_t *)&addressPrivateKey, true));

			// Compress the address public key and throw error if it fails
			CX_THROW(cx_edwards_compress_point_no_throw(CX_CURVE_Ed25519, (uint8_t *)addressPublicKey.W, addressPublicKey.W_len));
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
void calculateBulletproofComponents(volatile uint8_t *tauX, volatile uint8_t *tOne, volatile uint8_t *tTwo, const uint64_t value, const uint8_t *blindingFactor, const uint8_t *commitment, const uint8_t *rewindNonce, const uint8_t *privateNonce, const uint8_t *proofMessage) {

	// Initialize running commitment
	volatile uint8_t runningCommitment[CX_SHA256_SIZE] = {0};

	// Initialize alpha and rho
	volatile uint8_t alpha[SCALAR_SIZE];
	volatile uint8_t rho[SCALAR_SIZE];

	// Initialize alpha generator and rho generator
	volatile uint8_t alphaGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};
	volatile uint8_t rhoGenerator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};

	// Initialize aterm
	volatile uint8_t aterm[UNCOMPRESSED_PUBLIC_KEY_SIZE] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};

	// Initialize z
	volatile uint8_t z[sizeof(runningCommitment)];

	// Initialize t1 and t2
	volatile uint8_t t1[SCALAR_SIZE] = {0};
	volatile uint8_t t2[SCALAR_SIZE] = {0};

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get running commitment from the commitment and generator
			bulletproofUpdateCommitment(runningCommitment, &commitment[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_H);

			// Set value in value bytes
			uint8_t *valueBytes = (uint8_t *)z;
			explicit_bzero(valueBytes, SCALAR_SIZE - sizeof(value));
			U4BE_ENCODE(valueBytes, SCALAR_SIZE - sizeof(uint32_t), value);
			U4BE_ENCODE(valueBytes, SCALAR_SIZE - sizeof(uint64_t), value >> (sizeof(uint32_t) * BITS_IN_A_BYTE));

			// Set proof message in value bytes
			memcpy(&valueBytes[SCALAR_SIZE - sizeof(value) - PROOF_MESSAGE_SIZE], proofMessage, PROOF_MESSAGE_SIZE);

			// Create alpha and rho from the rewind nonce
			createScalarsFromChaCha20(alpha, rho, rewindNonce, 0);

			// Subtract value bytes from alpha and throw error if it fails
			CX_THROW(cx_math_subm_no_throw((uint8_t *)alpha, (uint8_t *)alpha, valueBytes, SECP256K1_CURVE_ORDER, sizeof(alpha)));

			// Check if alpha or rho is zero
			if(isZeroArraySecure((uint8_t *)alpha, sizeof(alpha)) || isZeroArraySecure((uint8_t *)rho, sizeof(rho))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get the product of the alpha and its generator and throw error if it fails
			memcpy((uint8_t *)&alphaGenerator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));

			CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, (uint8_t *)alphaGenerator, (uint8_t *)alpha, sizeof(alpha)));

			// Check if the result has an x component of zero
			if(isZeroArraySecure((uint8_t *)&alphaGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get the product of the rho and its generator and throw error if it fails
			memcpy((uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));

			CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, (uint8_t *)rhoGenerator, (uint8_t *)rho, sizeof(rho)));

			// Check if the result has an x component of zero
			if(isZeroArraySecure((uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Go through all bits to prove
			for(uint_fast8_t i = 0; i < BITS_TO_PROVE; ++i) {

				// Get bit in the value
				const bool bit = (value >> i) & 1;

				// Set aterm to the generator
				memcpy((uint8_t *)&aterm[PUBLIC_KEY_PREFIX_SIZE], bit ? GENERATORS_FIRST_HALF[i] : GENERATORS_SECOND_HALF[i], sizeof(aterm) - PUBLIC_KEY_PREFIX_SIZE);

				// Check if bit isn't set
				if(!bit) {

					// Negate the aterm's y component and throw error if it fails
					uint8_t *atermY = (uint8_t *)&aterm[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE];
					CX_THROW(cx_math_subm_no_throw(atermY, SECP256K1_CURVE_PRIME, atermY, SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE));
				}

				// Check if the sum of aterm to the alpha generator has an x component of zero and throw error if it fails
				CX_THROW(cx_ecfp_add_point_no_throw(CX_CURVE_SECP256K1, (uint8_t *)alphaGenerator, (uint8_t *)alphaGenerator, (uint8_t *)aterm));

				if(isZeroArraySecure((uint8_t *)&alphaGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}

				// Create sl and sr from rewind nonce
				uint8_t *sl = (uint8_t *)alpha;
				uint8_t *sr = (uint8_t *)rho;
				createScalarsFromChaCha20(sl, sr, rewindNonce, i + 2);

				// Check if sl or sr is zero
				if(isZeroArraySecure(sl, SCALAR_SIZE) || isZeroArraySecure(sr, SCALAR_SIZE)) {

					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}

				// Get the sum of the product of the generator and sl and the product of the generator and sr
				uint8_t *sterm = (uint8_t *)aterm;
				generatorDoublePointScalarMultiply(sterm, i, sl, sr);

				// Check if the result has an x component of zero
				if(isZeroArraySecure(&sterm[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}

				// Check if the sum of result and the rho generator has an x component of zero and throw error if it fails
				CX_THROW(cx_ecfp_add_point_no_throw(CX_CURVE_SECP256K1, (uint8_t *)rhoGenerator, (uint8_t *)rhoGenerator, sterm));

				if(isZeroArraySecure((uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}

// Check if target is Nano S
#ifdef TARGET_NANOS

				// Check if time to update progress
				if(i % 4 == 4 - 1) {

					// Show progress bar
					showProgressBar(map(i, 0, BITS_TO_PROVE - 1, 0, MAXIMUM_PROGRESS_BAR_PERCENT * 16 / (16 + 16)));
				}

// Otherwise
#else

				// Check if time to update progress
				if(i % 4 == 4 - 1) {

					// Show progress bar
					showProgressBar(map(i, 0, BITS_TO_PROVE - 1, 0, MAXIMUM_PROGRESS_BAR_PERCENT * 16 / (16 + 8)));
				}
#endif

// Check if has NGBL
#ifdef HAVE_NBGL

				// Check if time to update display
				// TODO Fine tune this number on real Stax and Flex devices
				if(!(i % 1)) {

					// Process display events
					os_io_seph_recv_and_process(0);
				}
#endif
			}

// Check if has NGBL
#ifdef HAVE_NBGL

			// Process display events
			os_io_seph_recv_and_process(0);
#endif

			// Update running commitment with the alpha generator and rho generator
			bulletproofUpdateCommitment(runningCommitment, (uint8_t *)&alphaGenerator[PUBLIC_KEY_PREFIX_SIZE], (uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE]);

			// Check if running commitment overflows or is zero
			if(compareBigNumbers((uint8_t *)runningCommitment, SECP256K1_CURVE_ORDER, sizeof(runningCommitment)) >= 0 || isZeroArraySecure((uint8_t *)runningCommitment, sizeof(runningCommitment))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get y from running commitment
			uint8_t *y = (uint8_t *)alpha;
			memcpy(y, (uint8_t *)runningCommitment, sizeof(runningCommitment));

			// Update running commitment with the alpha generator and rho generator
			bulletproofUpdateCommitment(runningCommitment, (uint8_t *)&alphaGenerator[PUBLIC_KEY_PREFIX_SIZE], (uint8_t *)&rhoGenerator[PUBLIC_KEY_PREFIX_SIZE]);

			// Check if running commitment overflows or is zero
			if(compareBigNumbers((uint8_t *)runningCommitment, SECP256K1_CURVE_ORDER, sizeof(runningCommitment)) >= 0 || isZeroArraySecure((uint8_t *)runningCommitment, sizeof(runningCommitment))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get z from running commitment
			memcpy((uint8_t *)z, (uint8_t *)runningCommitment, sizeof(z));

			// Create t0, t1, and t2 with an LR generator
			uint8_t *t0 = (uint8_t *)rho;
			explicit_bzero(t0, SCALAR_SIZE);
			useLrGenerator(t0, t1, t2, y, (uint8_t *)z, rewindNonce, value);

			// Get the difference of t1 and t2 and throw error if it fails
			CX_THROW(cx_math_subm_no_throw((uint8_t *)t1, (uint8_t *)t1, (uint8_t *)t2, SECP256K1_CURVE_ORDER, sizeof(t1)));

			// Divide the difference by two and throw error if it fails
			uint8_t *twoInverse = (uint8_t *)alpha;
			explicit_bzero(twoInverse, SCALAR_SIZE - 1);
			twoInverse[SCALAR_SIZE - 1] = 2;

			CX_THROW(cx_math_invprimem_no_throw(twoInverse, twoInverse, SECP256K1_CURVE_ORDER, SCALAR_SIZE));

			CX_THROW(cx_math_multm_no_throw((uint8_t *)t1, (uint8_t *)t1, twoInverse, SECP256K1_CURVE_ORDER, sizeof(t1)));

			// Get the difference of t2 and t0 and throw error if it fails
			CX_THROW(cx_math_subm_no_throw((uint8_t *)t2, (uint8_t *)t2, t0, SECP256K1_CURVE_ORDER, sizeof(t2)));

			// Add t1 to the difference and throw error if it fails
			CX_THROW(cx_math_addm_no_throw((uint8_t *)t2, (uint8_t *)t2, (uint8_t *)t1, SECP256K1_CURVE_ORDER, sizeof(t2)));

			// Check if t1 or t2 is zero
			if(isZeroArraySecure((uint8_t *)t1, sizeof(t1)) || isZeroArraySecure((uint8_t *)t2, sizeof(t2))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get the product of t1 and its generator and throw error if it fails
			uint8_t *t1Generator = (uint8_t *)alphaGenerator;
			memcpy(&t1Generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_H, sizeof(GENERATOR_H));

			CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, t1Generator, (uint8_t *)t1, sizeof(t1)));

			// Check if the result has an x component of zero
			if(isZeroArraySecure(&t1Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

// Check if has NGBL
#ifdef HAVE_NBGL

			// Process display events
			os_io_seph_recv_and_process(0);
#endif

			// Create tau1 and tau2 from the private nonce
			uint8_t *tau1 = (uint8_t *)alpha;
			uint8_t *tau2 = (uint8_t *)rho;
			createScalarsFromChaCha20(tau1, tau2, privateNonce, 1);

			// Check if tau1 or tau2 is zero
			if(isZeroArraySecure(tau1, SCALAR_SIZE) || isZeroArraySecure(tau2, SCALAR_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get the product of tau1 and its generator and throw error if it fails
			uint8_t *tau1Generator = (uint8_t *)rhoGenerator;
			memcpy(&tau1Generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));

			CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, tau1Generator, tau1, SCALAR_SIZE));

			// Check if the result has an x component of zero
			if(isZeroArraySecure(&tau1Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

// Check if has NGBL
#ifdef HAVE_NBGL

			// Process display events
			os_io_seph_recv_and_process(0);
#endif

			// Set t one to the result
			memcpy((uint8_t *)&tOne[PUBLIC_KEY_PREFIX_SIZE], &tau1Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE);
			tOne[0] = (tau1Generator[UNCOMPRESSED_PUBLIC_KEY_SIZE - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;

			// Check if the sum of tau1 generator and the t1 generator has an x component of zero and throw error if it fails
			CX_THROW(cx_ecfp_add_point_no_throw(CX_CURVE_SECP256K1, t1Generator, tau1Generator, t1Generator));

			if(isZeroArraySecure(&t1Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get the product of t2 and its generator and throw error if it fails
			uint8_t *t2Generator = (uint8_t *)rhoGenerator;
			memcpy(&t2Generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_H, sizeof(GENERATOR_H));

			CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, t2Generator, (uint8_t *)t2, sizeof(t2)));

			// Check if the result is has an x component of zero
			if(isZeroArraySecure(&t2Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

// Check if has NGBL
#ifdef HAVE_NBGL

			// Process display events
			os_io_seph_recv_and_process(0);
#endif

			// Get the product of tau2 and its generator and throw error if it fails
			uint8_t *tau2Generator = (uint8_t *)aterm;
			memcpy(&tau2Generator[PUBLIC_KEY_PREFIX_SIZE], GENERATOR_G, sizeof(GENERATOR_G));

			CX_THROW(cx_ecfp_scalar_mult_no_throw(CX_CURVE_SECP256K1, tau2Generator, tau2, SCALAR_SIZE));

			// Check if the result has an x component of zero
			if(isZeroArraySecure(&tau2Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

// Check if has NGBL
#ifdef HAVE_NBGL

			// Process display events
			os_io_seph_recv_and_process(0);
#endif

			// Set t two to the result
			memcpy((uint8_t *)&tTwo[PUBLIC_KEY_PREFIX_SIZE], &tau2Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE);
			tTwo[0] = (tau2Generator[UNCOMPRESSED_PUBLIC_KEY_SIZE - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;

			// Check if the sum of tau2 generator and the t2 generator has an x component of zero and throw error if it fails
			CX_THROW(cx_ecfp_add_point_no_throw(CX_CURVE_SECP256K1, t2Generator, tau2Generator, t2Generator));

			if(isZeroArraySecure(&t2Generator[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Update running commitment with the t1 generator and t2 generator
			bulletproofUpdateCommitment(runningCommitment, &t1Generator[PUBLIC_KEY_PREFIX_SIZE], &t2Generator[PUBLIC_KEY_PREFIX_SIZE]);

			// Check if running commitment overflows or is zero
			if(compareBigNumbers((uint8_t *)runningCommitment, SECP256K1_CURVE_ORDER, sizeof(runningCommitment)) >= 0 || isZeroArraySecure((uint8_t *)runningCommitment, sizeof(runningCommitment))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get x from running commitment
			uint8_t *x = (uint8_t *)runningCommitment;

			// Get the product of tau1 and x and throw error if it fails
			uint8_t *tempOne = tau1;
			CX_THROW(cx_math_multm_no_throw(tempOne, tau1, x, SECP256K1_CURVE_ORDER, SCALAR_SIZE));

			// Square x and throw error if it fails
			const uint8_t two[] = {2};
			CX_THROW(cx_math_powm_no_throw(x, x, two, sizeof(two), SECP256K1_CURVE_ORDER, SCALAR_SIZE));

			// Get the product of tau2 and x and throw error if it fails
			uint8_t *tempTwo = tau2;
			CX_THROW(cx_math_multm_no_throw(tempTwo, tau2, x, SECP256K1_CURVE_ORDER, SCALAR_SIZE));

			// Add the result and throw error if it fails
			CX_THROW(cx_math_addm_no_throw(tempOne, tempOne, tempTwo, SECP256K1_CURVE_ORDER, SCALAR_SIZE));

			// Multiply z squared by the blinding factor and throw error if it fails
			CX_THROW(cx_math_powm_no_throw((uint8_t *)z, (uint8_t *)z, two, sizeof(two), SECP256K1_CURVE_ORDER, sizeof(z)));
			CX_THROW(cx_math_multm_no_throw(tempTwo, (uint8_t *)z, blindingFactor, SECP256K1_CURVE_ORDER, SCALAR_SIZE));

			// Add the result to get tau x and throw error if it fails
			CX_THROW(cx_math_addm_no_throw((uint8_t *)tauX, tempOne, tempTwo, SECP256K1_CURVE_ORDER, SCALAR_SIZE));
		}

		// Finally
		FINALLY {

			// Clear t1 and t2
			explicit_bzero((uint8_t *)t1, sizeof(t1));
			explicit_bzero((uint8_t *)t2, sizeof(t2));

			// Clear z
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

// Get login private key
void getLoginPrivateKey(volatile cx_ecfp_private_key_t *loginPrivateKey, const uint32_t account) {

	// Initialize child path
	const uint32_t childPath[] = {
		0,
		2,
		0,
	};

	// Initialize blinding factor
	volatile uint8_t blindingFactor[BLINDING_FACTOR_SIZE];

	// Initialize hash
	volatile uint8_t hash[SECP256K1_PRIVATE_KEY_SIZE];

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Derive blinding factor from the child path
			deriveBlindingFactor(blindingFactor, account, 0, childPath, ARRAYLEN(childPath), NO_SWITCH_TYPE);

			// Get hash from the blinding factor
			getBlake2b((uint8_t *)hash, sizeof(hash), (uint8_t *)blindingFactor, sizeof(blindingFactor), NULL, 0);

			// Check if hash isn't a valid private key
			if(!isValidSecp256k1PrivateKey((uint8_t *)hash, sizeof(hash))) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Get login private key from hash and throw error if it fails
			CX_THROW(cx_ecfp_init_private_key_no_throw(CX_CURVE_SECP256K1, (uint8_t *)hash, sizeof(hash), (cx_ecfp_private_key_t *)loginPrivateKey));
		}

		// Finally
		FINALLY {

			// Clear the blinding factor
			explicit_bzero((uint8_t *)blindingFactor, sizeof(blindingFactor));

			// Clear the hash
			explicit_bzero((uint8_t *)hash, sizeof(hash));
		}
	}

	// End try
	END_TRY;
}

// Derive child key
void deriveChildKey(volatile cx_ecfp_private_key_t *privateKey, volatile uint8_t *chainCode, const uint32_t account, const uint32_t *path, const size_t pathLength, const bool useProvidedPrivateKeyAndChainCode) {

	// Check if not using the provided private key and chain code
	if(!useProvidedPrivateKeyAndChainCode) {

		// Get private key and chain code
		getPrivateKeyAndChainCode(privateKey, chainCode, account);
	}

	// Initialize data
	volatile uint8_t data[COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint32_t)];

	// Initialize node
	volatile uint8_t node[NODE_SIZE];

	// Initialize new private key
	volatile cx_ecfp_private_key_t newPrivateKey;

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Go through the path
			for(size_t i = 0; i < pathLength; ++i) {

				// Check if path is hardened
				if(path[i] & HARDENED_PATH_MASK) {

					// Set the first part of data to zero
					data[0] = 0;

					// Append private key to the data
					memcpy((uint8_t *)&data[sizeof(data[0])], (uint8_t *)privateKey->d, privateKey->d_len);
				}

				// Otherwise
				else {

					// Get compressed public key from the private key set it in the data
					getPublicKeyFromPrivateKey(data, (cx_ecfp_private_key_t *)privateKey);
				}

				// Append the path to the data
				U4BE_ENCODE((uint8_t *)data, COMPRESSED_PUBLIC_KEY_SIZE, path[i]);

				// Get the path's node as the HMAC-SHA512 of the data with the chain code as the key
				cx_hmac_sha512((uint8_t *)chainCode, CHAIN_CODE_SIZE, (uint8_t *)data, sizeof(data), (uint8_t *)node, sizeof(node));

				// Check if the node isn't a valid private key
				if(!isValidSecp256k1PrivateKey((uint8_t *)node, sizeof(newPrivateKey.d))) {

					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}

				// Get new private key from the node and throw error if it fails
				CX_THROW(cx_ecfp_init_private_key_no_throw(CX_CURVE_SECP256K1, (uint8_t *)node, sizeof(newPrivateKey.d), (cx_ecfp_private_key_t *)&newPrivateKey));

				// Add private key to the new private key and throw error if it fails
				CX_THROW(cx_math_addm_no_throw((uint8_t *)newPrivateKey.d, (uint8_t *)newPrivateKey.d, (uint8_t *)privateKey->d, SECP256K1_CURVE_ORDER, newPrivateKey.d_len));

				// Check if new private key isn't a valid private key
				if(!isValidSecp256k1PrivateKey((uint8_t *)newPrivateKey.d, newPrivateKey.d_len)) {

					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}

				// Get private key from the new private key and throw error if it fails
				CX_THROW(cx_ecfp_init_private_key_no_throw(CX_CURVE_SECP256K1, (uint8_t *)newPrivateKey.d, newPrivateKey.d_len, (cx_ecfp_private_key_t *)privateKey));

				// Get chain code from the node
				memcpy((uint8_t *)chainCode, (uint8_t *)&node[sizeof(newPrivateKey.d)], CHAIN_CODE_SIZE);
			}
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

// Bulletproof update commitment
void bulletproofUpdateCommitment(volatile uint8_t *commitment, const uint8_t *leftPart, const uint8_t *rightPart) {

	// Initialize the hash
	volatile cx_sha256_t hash;

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Initialize hash
			cx_sha256_init((cx_sha256_t *)&hash);

			// Add commitment to the hash and throw error if it fails
			CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, 0, (uint8_t *)commitment, CX_SHA256_SIZE, NULL, 0));

			// Set parity to if the part's y components aren't quadratic residue
			const uint8_t parity = (isQuadraticResidue(&leftPart[PUBLIC_KEY_COMPONENT_SIZE]) ? 0b00000000 : 0b00000010) | (isQuadraticResidue(&rightPart[PUBLIC_KEY_COMPONENT_SIZE]) ? 0b00000000 : 0b00000001);

			// Add parity to the hash and throw error if it fails
			CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, 0, &parity, sizeof(parity), NULL, 0));

			// Add left part's x component to the hash and throw error if it fails
			CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, 0, leftPart, PUBLIC_KEY_COMPONENT_SIZE, NULL, 0));

			// Add right part's x component to the hash and set the commitment to the result and throw error if it fails
			CX_THROW(cx_hash_no_throw((cx_hash_t *)&hash, CX_LAST, rightPart, PUBLIC_KEY_COMPONENT_SIZE, (uint8_t *)commitment, CX_SHA256_SIZE));
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
void createScalarsFromChaCha20(volatile uint8_t *firstScalar, volatile uint8_t *secondScalar, const uint8_t *seed, const uint64_t index) {

	// Initialize nonce
	uint32_t nonce[3] = {

		// Index
		index >> (sizeof(uint32_t) * BITS_IN_A_BYTE),
	};

	// Initialize ChaCha20 Poly1305 state
	volatile ChaCha20Poly1305State chaCha20Poly1305State;

	// Initialize ChaCha20 current state
	volatile uint32_t chaCha20CurrentState[CHACHA20_STATE_SIZE];

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Loop while ChaCha20 current state as scalars overflows
			do {

				// Initialize ChaCha20 state with the seed, nonce, and index
				initializeChaCha20Poly1305(&chaCha20Poly1305State, seed, (uint8_t *)nonce, NULL, 0, index, (uint32_t *)chaCha20CurrentState);

				// Increment nonce's counter
				++nonce[2];

			} while(compareBigNumbers((uint8_t *)chaCha20CurrentState, SECP256K1_CURVE_ORDER, SCALAR_SIZE) >= 0 || compareBigNumbers((uint8_t *)&chaCha20CurrentState[ARRAYLEN(chaCha20CurrentState) / 2], SECP256K1_CURVE_ORDER, SCALAR_SIZE) >= 0);

			// Set scalars to the ChaCha20 current state
			memcpy((uint8_t *)firstScalar, (uint8_t *)chaCha20CurrentState, SCALAR_SIZE);
			memcpy((uint8_t *)secondScalar, (uint8_t *)&chaCha20CurrentState[ARRAYLEN(chaCha20CurrentState) / 2], SCALAR_SIZE);
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
}

// Use LR generator
void useLrGenerator(volatile uint8_t *t0, volatile uint8_t *t1, volatile uint8_t *t2, const uint8_t *y, const uint8_t *z, const uint8_t *nonce, const uint64_t value) {

	// Initialize yn
	volatile uint8_t yn[SCALAR_SIZE] = {
		[SCALAR_SIZE - 1] = 1,
	};

	// Initialize z22n
	volatile uint8_t z22n[SCALAR_SIZE];

	// Initialize lout
	volatile uint8_t lout[SCALAR_SIZE];

	// Initialize rout
	volatile uint8_t rout[SCALAR_SIZE];

	// Initialize sr
	volatile uint8_t sr[SCALAR_SIZE];

	// Initialize sl
	volatile uint8_t sl[SCALAR_SIZE];

	// Temp rout, lout, sl, and sr
	volatile uint8_t tempLout[SCALAR_SIZE];
	volatile uint8_t tempRout[SCALAR_SIZE];
	volatile uint8_t tempSl[SCALAR_SIZE];
	volatile uint8_t tempSr[SCALAR_SIZE];

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			{
				// Set z22n to z squared and throw error if it fails
				const uint8_t two[] = {2};
				CX_THROW(cx_math_powm_no_throw((uint8_t *)z22n, z, two, sizeof(two), SECP256K1_CURVE_ORDER, sizeof(z22n)));
			}

			// Create inputs and throw error if it fails
			uint8_t inputs[3][SCALAR_SIZE] = {
				[1] = {
					[SCALAR_SIZE - 1] = 1,
				},
			};
			CX_THROW(cx_math_subm_no_throw(inputs[2], SECP256K1_CURVE_ORDER, inputs[1], SECP256K1_CURVE_ORDER, sizeof(inputs[1])));

			// Create outputs
			uint8_t *outputs[3] = {(uint8_t *)t0, (uint8_t *)t1, (uint8_t *)t2};

			// Go through all bits to prove
			for(uint_fast8_t i = 0; i < BITS_TO_PROVE; ++i) {

				// Get bit in the value
				const bool bit = (value >> i) & 1;

				// Set bit in lout
				explicit_bzero((uint8_t *)lout, SCALAR_SIZE - 1);
				lout[SCALAR_SIZE - 1] = bit;

				// Update lout and throw error if it fails
				CX_THROW(cx_math_subm_no_throw((uint8_t *)lout, (uint8_t *)lout, z, SECP256K1_CURVE_ORDER, sizeof(lout)));

				// Set bit in rout
				explicit_bzero((uint8_t *)rout, SCALAR_SIZE - 1);
				rout[SCALAR_SIZE - 1] = 1 - bit;

				// Update rout and throw error if it fails
				CX_THROW(cx_math_subm_no_throw((uint8_t *)rout, z, (uint8_t *)rout, SECP256K1_CURVE_ORDER, sizeof(rout)));

				// Create sl and sr
				createScalarsFromChaCha20(sl, sr, nonce, i + 2);

				// Go through all outputs
				for(size_t j = 0; j < ARRAYLEN(outputs); ++j) {

					// Multiply sl and sr by input and throw error if it fails
					CX_THROW(cx_math_multm_no_throw((uint8_t *)tempSl, (uint8_t *)sl, inputs[j], SECP256K1_CURVE_ORDER, SCALAR_SIZE));
					CX_THROW(cx_math_multm_no_throw((uint8_t *)tempSr, (uint8_t *)sr, inputs[j], SECP256K1_CURVE_ORDER, SCALAR_SIZE));

					// Update lout and throw error if it fails
					CX_THROW(cx_math_addm_no_throw((uint8_t *)tempLout, (uint8_t *)lout, (uint8_t *)tempSl, SECP256K1_CURVE_ORDER, SCALAR_SIZE));

					// Update rout and throw error if it fails
					CX_THROW(cx_math_addm_no_throw((uint8_t *)tempRout, (uint8_t *)rout, (uint8_t *)tempSr, SECP256K1_CURVE_ORDER, SCALAR_SIZE));
					CX_THROW(cx_math_multm_no_throw((uint8_t *)tempRout, (uint8_t *)tempRout, (uint8_t *)yn, SECP256K1_CURVE_ORDER, SCALAR_SIZE));
					CX_THROW(cx_math_addm_no_throw((uint8_t *)tempRout, (uint8_t *)tempRout, (uint8_t *)z22n, SECP256K1_CURVE_ORDER, SCALAR_SIZE));

					// Update output with lout and rout and throw error if it fails
					CX_THROW(cx_math_multm_no_throw((uint8_t *)tempLout, (uint8_t *)tempLout, (uint8_t *)tempRout, SECP256K1_CURVE_ORDER, sizeof(tempLout)));
					CX_THROW(cx_math_addm_no_throw(outputs[j], outputs[j], (uint8_t *)tempLout, SECP256K1_CURVE_ORDER, SCALAR_SIZE));
				}

				// Update yn and z22n generator and throw error if it fails
				CX_THROW(cx_math_multm_no_throw((uint8_t *)yn, (uint8_t *)yn, y, SECP256K1_CURVE_ORDER, sizeof(yn)));
				CX_THROW(cx_math_addm_no_throw((uint8_t *)z22n, (uint8_t *)z22n, (uint8_t *)z22n, SECP256K1_CURVE_ORDER, sizeof(z22n)));

// Check if target is Nano S
#ifdef TARGET_NANOS

				// Check if time to update progress
				if(i % 4 == 4 - 1) {

					// Show progress bar
					showProgressBar(map(i, 0, BITS_TO_PROVE - 1, MAXIMUM_PROGRESS_BAR_PERCENT * 16 / (16 + 16), MAXIMUM_PROGRESS_BAR_PERCENT));
				}

// Otherwise
#else

				// Check if time to update progress
				if(i % 8 == 8 - 1) {

					// Show progress bar
					showProgressBar(map(i, 0, BITS_TO_PROVE - 1, MAXIMUM_PROGRESS_BAR_PERCENT * 16 / (16 + 8), MAXIMUM_PROGRESS_BAR_PERCENT));
				}
#endif

// Check if has NGBL
#ifdef HAVE_NBGL

				// Check if time to update display
				// TODO Fine tune this number on real Stax and Flex devices
				if(!(i % 4)) {

					// Process display events
					os_io_seph_recv_and_process(0);
				}
#endif
			}

// Check if has NGBL
#ifdef HAVE_NBGL

			// Process display events
			os_io_seph_recv_and_process(0);
#endif
		}

		// Finally
		FINALLY {

			// Clear temp rout, lout, sl, and sr
			explicit_bzero((uint8_t *)tempSr, sizeof(tempSr));
			explicit_bzero((uint8_t *)tempSl, sizeof(tempSl));
			explicit_bzero((uint8_t *)tempRout, sizeof(tempRout));
			explicit_bzero((uint8_t *)tempLout, sizeof(tempLout));

			// Clear sl
			explicit_bzero((uint8_t *)sl, sizeof(sl));

			// Clear sr
			explicit_bzero((uint8_t *)sr, sizeof(sr));

			// Clear rout
			explicit_bzero((uint8_t *)rout, sizeof(rout));

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

			// Get the square root of the component squared and throw error if it fails
			CX_THROW(cx_math_powm_no_throw((uint8_t *)squareRootSquared, component, SECP256K1_CURVE_SQUARE_ROOT_EXPONENT, sizeof(SECP256K1_CURVE_SQUARE_ROOT_EXPONENT), SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE));

			const uint8_t two[] = {2};
			CX_THROW(cx_math_powm_no_throw((uint8_t *)squareRootSquared, (uint8_t *)squareRootSquared, two, sizeof(two), SECP256K1_CURVE_PRIME, PUBLIC_KEY_COMPONENT_SIZE));

			// Set result to if the component is quadratic residue
			result = !compareBigNumbers(component, (uint8_t *)squareRootSquared, PUBLIC_KEY_COMPONENT_SIZE);
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

// Generator double point scalar multiply
void generatorDoublePointScalarMultiply(uint8_t *result, const size_t index, const uint8_t *scalarOne, const uint8_t *scalarTwo) {

	// Lock big number processor and throw error if it fails
	CX_THROW(cx_bn_lock(CX_BN_WORD_ALIGNEMENT, 0));

	// Initialize values
	cx_err_t error;
	cx_ecpoint_t generatorPointOne;
	cx_ecpoint_t generatorPointTwo;
	cx_ecpoint_t resultPoint;
	cx_err_t allocatingGeneratorPointTwoError = !CX_OK;
	cx_err_t allocatingResultPointError = !CX_OK;

	// Check if allocating memory for generator point one was successful
	const cx_err_t allocatingGeneratorPointOneError = cx_ecpoint_alloc(&generatorPointOne, CX_CURVE_SECP256K1);

	if(!allocatingGeneratorPointOneError) {

		// Check if allocating memory for generator point two was successful
		allocatingGeneratorPointTwoError = cx_ecpoint_alloc(&generatorPointTwo, CX_CURVE_SECP256K1);

		if(!allocatingGeneratorPointTwoError) {

			// Check if allocating memory for result point was successful
			allocatingResultPointError = cx_ecpoint_alloc(&resultPoint, CX_CURVE_SECP256K1);

			if(!allocatingResultPointError) {

				// Set generator point one and check if it fails
				CX_CHECK(cx_ecpoint_init(&generatorPointOne, GENERATORS_FIRST_HALF[index], PUBLIC_KEY_COMPONENT_SIZE, &GENERATORS_FIRST_HALF[index][PUBLIC_KEY_COMPONENT_SIZE], PUBLIC_KEY_COMPONENT_SIZE));

				// Set generator point two and check if it fails
				CX_CHECK(cx_ecpoint_init(&generatorPointTwo, GENERATORS_SECOND_HALF[index], PUBLIC_KEY_COMPONENT_SIZE, &GENERATORS_SECOND_HALF[index][PUBLIC_KEY_COMPONENT_SIZE], PUBLIC_KEY_COMPONENT_SIZE));

				// Perform double point scalar multiplication and check if it fails
				CX_CHECK(cx_ecpoint_double_scalarmul(&resultPoint, &generatorPointOne, &generatorPointTwo, scalarOne, SCALAR_SIZE, scalarTwo, SCALAR_SIZE));

				// Set result and check if it fails
				CX_CHECK(cx_ecpoint_export(&resultPoint, &result[PUBLIC_KEY_PREFIX_SIZE], PUBLIC_KEY_COMPONENT_SIZE, &result[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE], PUBLIC_KEY_COMPONENT_SIZE));
			}

			// Otherwise
			else {

				// Set error
				error = allocatingResultPointError;
			}
		}

		// Otherwise
		else {

			// Set error
			error = allocatingGeneratorPointTwoError;
		}
	}

	// Otherwise
	else {

		// Set error
		error = allocatingGeneratorPointOneError;
	}

// End
end:

	// Check if memory was allocated for generator point one
	if(!allocatingGeneratorPointOneError) {

		// Free memory and set error to if it fails
		error = MAX(cx_ecpoint_destroy(&generatorPointOne), error);
	}

	// Check if memory was allocated for generator point two
	if(!allocatingGeneratorPointTwoError) {

		// Free memory and set error to if it fails
		error = MAX(cx_ecpoint_destroy(&generatorPointTwo), error);
	}

	// Check if memory was allocated for result point
	if(!allocatingResultPointError) {

		// Free memory and set error to if it fails
		error = MAX(cx_ecpoint_destroy(&resultPoint), error);
	}

	// Unlock big number processor and set error to if it fails
	error = MAX(cx_bn_unlock(), error);

	// Check if error occurred
	if(error) {

		// Throw error
		THROW(error);
	}
}

// Compare big numbers
int compareBigNumbers(const uint8_t *firstValue, const uint8_t *secondValue, const size_t valueLength) {

	// Initialize result
	int result;

	// Compare values and throw error if it fails
	CX_THROW(cx_math_cmp_no_throw(firstValue, secondValue, valueLength, &result));

	// Return result
	return result;
}
