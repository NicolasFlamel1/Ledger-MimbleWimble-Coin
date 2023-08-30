// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "slatepack.h"
#include "tor.h"


// Supporting function implementation

// Create Slatepack shared private key
void createSlatepackSharedPrivateKey(volatile uint8_t *sharedPrivateKey, const uint32_t account, const uint32_t index, const char *address, const size_t addressLength) {

	// Check address length
	cx_ecfp_public_key_t publicKey;
	switch(addressLength) {

		// Tor address size
		case TOR_ADDRESS_SIZE:

			// Check if getting public key from address failed
			if(!getPublicKeyFromTorAddress(&publicKey, address, addressLength)) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
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

	// Compress the public key and throw error if it fails
	CX_THROW(cx_edwards_compress_point_no_throw(CX_CURVE_Ed25519, publicKey.W, publicKey.W_len));

	// Initialize Ed25519 private key
	volatile cx_ecfp_private_key_t ed25519PrivateKey;

	// Initialize X25519 private key
	volatile cx_ecfp_private_key_t x25519PrivateKey;

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Get Ed25519 private key
			getAddressPrivateKey(&ed25519PrivateKey, account, index, CX_CURVE_Ed25519);

			// Get X25519 private key from the Ed25519 private key
			getX25519PrivateKeyFromEd25519PrivateKey(&x25519PrivateKey, (cx_ecfp_private_key_t *)&ed25519PrivateKey);

			// Get X25519 public key from the public key
			uint8_t x25519PublicKey[X25519_PUBLIC_KEY_SIZE];
			getX25519PublicKeyFromEd25519PublicKey(x25519PublicKey, &publicKey.W[PUBLIC_KEY_PREFIX_SIZE]);

			// Uncompress the X25519 public key and throw error if it fails
			uint8_t uncompressedX25519PublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
			uncompressedX25519PublicKey[0] = X25519_COMPRESSED_PUBLIC_KEY_PREFIX;
			memcpy(&uncompressedX25519PublicKey[PUBLIC_KEY_PREFIX_SIZE], x25519PublicKey, sizeof(x25519PublicKey));

			CX_THROW(cx_edwards_decompress_point_no_throw(CX_CURVE_Curve25519, uncompressedX25519PublicKey, sizeof(uncompressedX25519PublicKey)));

			// Create a shared private key from the X25519 private key and uncompressed X25519 public key and throw error if it fails
			CX_THROW(cx_ecdh_no_throw((cx_ecfp_private_key_t *)&x25519PrivateKey, CX_ECDH_X, uncompressedX25519PublicKey, sizeof(uncompressedX25519PublicKey), (uint8_t *)sharedPrivateKey, SLATEPACK_SHARED_PRIVATE_KEY_SIZE));

			// Swap shared private key's endianness
			swapEndianness((uint8_t *)sharedPrivateKey, SLATEPACK_SHARED_PRIVATE_KEY_SIZE);

			// Check if shared private key is zero
			if(isZeroArraySecure((uint8_t *)sharedPrivateKey, SLATEPACK_SHARED_PRIVATE_KEY_SIZE)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
		}

		// Finally
		FINALLY {

			// Clear the Ed25519 private key
			explicit_bzero((cx_ecfp_private_key_t *)&ed25519PrivateKey, sizeof(ed25519PrivateKey));

			// Clear the X25519 private key
			explicit_bzero((cx_ecfp_private_key_t *)&x25519PrivateKey, sizeof(x25519PrivateKey));
		}
	}

	// End try
	END_TRY;
}
