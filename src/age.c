// Header files
#include <string.h>
#include "age.h"
#include "common.h"
#include "crypto.h"


// Definitions

// Shared private key size
#define SHARED_PRIVATE_KEY_SIZE 32


// Constants

// Wrap key info
static const char WRAP_KEY_INFO[] = {'a', 'g', 'e', '-', 'e', 'n', 'c', 'r', 'y', 'p', 't', 'i', 'o', 'n', '.', 'o', 'r', 'g', '/', 'v', '1', '/', 'X', '2', '5', '5', '1', '9'};

// Payload key info
static const char PAYLOAD_KEY_INFO[] = {'p', 'a', 'y', 'l', 'o', 'a', 'd'};



// Supporting function implementation

// Get age payload key
void getAgePayloadKey(volatile uint8_t *payloadKey, uint32_t account, uint32_t index, const uint8_t *ephemeralX25519PublicKey, const uint8_t *encryptedFileKey, const uint8_t *payloadNonce) {

	// Initialize Ed25519 private key
	volatile cx_ecfp_private_key_t ed25519PrivateKey;
	
	// Initialize X25519 private key
	volatile cx_ecfp_private_key_t x25519PrivateKey;
	
	// Initialize shared private key
	volatile uint8_t sharedPrivateKey[SHARED_PRIVATE_KEY_SIZE];
	
	// Initialize pseudorandom key
	volatile uint8_t pseudorandomKey[CX_SHA256_SIZE];
	
	// Initialize wrap key
	volatile uint8_t wrapKey[CX_SHA256_SIZE];
	
	// Initialize ChaCha20 Poly1305 state
	volatile struct ChaCha20Poly1305State chaCha20Poly1305State;
	
	// Initialize file key
	volatile uint8_t fileKey[AGE_FILE_KEY_SIZE];
	
	// Initialize tag
	volatile uint8_t tag[POLY1305_TAG_SIZE];

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get Ed25519 private key
			getAddressPrivateKey(&ed25519PrivateKey, account, index, CX_CURVE_Ed25519);
			
			// Get X25519 private key from the Ed25519 private key
			getX25519PrivateKeyFromEd25519PrivateKey(&x25519PrivateKey, (cx_ecfp_private_key_t *)&ed25519PrivateKey);
			
			// Get Ed25519 public key from the Ed25519 private key
			cx_ecfp_public_key_t ed25519PublicKey;
			cx_ecfp_generate_pair(CX_CURVE_Ed25519, &ed25519PublicKey, (cx_ecfp_private_key_t *)&ed25519PrivateKey, true);
			cx_edwards_compress_point(CX_CURVE_Ed25519, ed25519PublicKey.W, ed25519PublicKey.W_len);
			
			// Get X25519 public key from the Ed25519 public key
			uint8_t x25519PublicKey[X25519_PUBLIC_KEY_SIZE];
			getX25519PublicKeyFromEd25519PublicKey(x25519PublicKey, &ed25519PublicKey.W[PUBLIC_KEY_PREFIX_SIZE]);
			
			// Uncompress ephemeral X25519 public key
			uint8_t uncompressedEphemeralX25519PublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
			uncompressedEphemeralX25519PublicKey[0] = X25519_COMPRESSED_PUBLIC_KEY_PREFIX;
			memcpy(&uncompressedEphemeralX25519PublicKey[PUBLIC_KEY_PREFIX_SIZE], ephemeralX25519PublicKey, X25519_PUBLIC_KEY_SIZE);
			
			cx_edwards_decompress_point(CX_CURVE_Curve25519, uncompressedEphemeralX25519PublicKey, sizeof(uncompressedEphemeralX25519PublicKey));
			
			// Create a shared private key from the X25519 private key and uncompressed ephemeral X25519 public key
			cx_ecdh((cx_ecfp_private_key_t *)&x25519PrivateKey, CX_ECDH_X, uncompressedEphemeralX25519PublicKey, sizeof(uncompressedEphemeralX25519PublicKey), (uint8_t *)sharedPrivateKey, sizeof(sharedPrivateKey));
			
			// Swap shared private key's endianness
			swapEndianness((uint8_t *)sharedPrivateKey, sizeof(sharedPrivateKey));
			
			// Check if shared private key is zero
			if(isZeroArraySecure((uint8_t *)sharedPrivateKey, sizeof(sharedPrivateKey))) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Create salt from ephemeral X25519 public key and X25519 public key
			uint8_t salt[X25519_PUBLIC_KEY_SIZE + sizeof(x25519PublicKey)];
			memcpy(salt, ephemeralX25519PublicKey, X25519_PUBLIC_KEY_SIZE);
			memcpy(&salt[X25519_PUBLIC_KEY_SIZE], x25519PublicKey, sizeof(x25519PublicKey));
			
			// Create wrap key from shared private key and salt
			cx_hkdf_extract(CX_SHA256, (uint8_t *)sharedPrivateKey, sizeof(sharedPrivateKey), salt, sizeof(salt), (uint8_t *)pseudorandomKey);
			cx_hkdf_expand(CX_SHA256, (uint8_t *)pseudorandomKey, sizeof(pseudorandomKey), (uint8_t *)WRAP_KEY_INFO, sizeof(WRAP_KEY_INFO), (uint8_t *)wrapKey, sizeof(wrapKey));
			
			// Decrypt file key with the wrap key
			const uint8_t FILE_KEY_NONCE[CHACHA20_NONCE_SIZE] = {0};
			initializeChaCha20Poly1305(&chaCha20Poly1305State, (uint8_t *)wrapKey, FILE_KEY_NONCE, NULL, 0, 0, NULL);
			decryptChaCha20Poly1305Data((ChaCha20Poly1305State *)&chaCha20Poly1305State, fileKey, encryptedFileKey, AGE_FILE_KEY_SIZE);
			
			// Check if file key's tag isn't correct
			getChaCha20Poly1305Tag((ChaCha20Poly1305State *)&chaCha20Poly1305State, tag);
			if(os_secure_memcmp((uint8_t *)&encryptedFileKey[AGE_FILE_KEY_SIZE], (uint8_t *)tag, sizeof(tag))) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Create payload key from file key and payload nonce
			cx_hkdf_extract(CX_SHA256, (uint8_t *)fileKey, sizeof(fileKey), (uint8_t *)payloadNonce, AGE_PAYLOAD_NONCE_SIZE, (uint8_t *)pseudorandomKey);
			cx_hkdf_expand(CX_SHA256, (uint8_t *)pseudorandomKey, sizeof(pseudorandomKey), (uint8_t *)PAYLOAD_KEY_INFO, sizeof(PAYLOAD_KEY_INFO), (uint8_t *)payloadKey, AGE_PAYLOAD_KEY_SIZE);
		}
		
		// Finally
		FINALLY {
		
			// Clear the Ed25519 private key
			explicit_bzero((cx_ecfp_private_key_t *)&ed25519PrivateKey, sizeof(ed25519PrivateKey));
			
			// Clear the X25519 private key
			explicit_bzero((cx_ecfp_private_key_t *)&x25519PrivateKey, sizeof(x25519PrivateKey));
			
			// Clear the shared private key
			explicit_bzero((uint8_t *)sharedPrivateKey, sizeof(sharedPrivateKey));
			
			// Clear the pseudorandom key
			explicit_bzero((uint8_t *)pseudorandomKey, sizeof(pseudorandomKey));
			
			// Clear the wrap key
			explicit_bzero((uint8_t *)wrapKey, sizeof(wrapKey));
			
			// Clear the ChaCha20 Poly1305 state
			explicit_bzero((ChaCha20Poly1305State *)&chaCha20Poly1305State, sizeof(chaCha20Poly1305State));
			
			// Clear the file key
			explicit_bzero((uint8_t *)fileKey, sizeof(fileKey));
			
			// Clear the tag
			explicit_bzero((uint8_t *)tag, sizeof(tag));
		}
	}
	
	// End try
	END_TRY;
}
