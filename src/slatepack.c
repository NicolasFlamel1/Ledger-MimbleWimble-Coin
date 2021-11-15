// Header files
#include <string.h>
#include "common.h"
#include "crypto.h"
#include "slatepack.h"
#include "tor.h"


// Global variables

// Slatepack data
struct SlatepackData slatepackData;


// Constants

// Slatepack shared private key size
const size_t SLATEPACK_SHARED_PRIVATE_KEY_SIZE = 32;


// Supporting function implementation

// Reset Slatepack data
void resetSlatepackData(void) {

	// Clear the Slatepack data
	explicit_bzero(&slatepackData, sizeof(slatepackData));
}

// Create Slatepack shared private key
void createSlatepackSharedPrivateKey(volatile uint8_t *sharedPrivateKey, uint32_t account, const uint8_t *publicKey) {

	// Initialize Ed25519 private key
	volatile cx_ecfp_private_key_t ed25519PrivateKey;
	
	// Initialize X25519 private key
	volatile cx_ecfp_private_key_t x25519PrivateKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get Ed25519 private key
			getAddressPrivateKey(&ed25519PrivateKey, account, TOR_ADDRESS_PRIVATE_KEY_INDEX, CX_CURVE_Ed25519);
			
			// Get X25519 private key from the Ed25519 private key
			getX25519PrivateKeyFromEd25519PrivateKey(&x25519PrivateKey, (cx_ecfp_private_key_t *)&ed25519PrivateKey);
			
			// Get X25519 public key from the public key
			uint8_t x25519PublicKey[X25519_PUBLIC_KEY_SIZE];
			getX25519PublicKeyFromEd25519PublicKey(x25519PublicKey, publicKey);
			
			// Uncompress the X25519 public key
			uint8_t uncompressedX25519PublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
			uncompressedX25519PublicKey[0] = X25519_COMPRESSED_PUBLIC_KEY_PREFIX;
			memcpy(&uncompressedX25519PublicKey[PUBLIC_KEY_PREFIX_SIZE], x25519PublicKey, sizeof(x25519PublicKey));
			
			cx_edwards_decompress_point(CX_CURVE_Curve25519, uncompressedX25519PublicKey, sizeof(uncompressedX25519PublicKey));
			
			// Create a shared private key from the X25519 private key and uncompressed X25519 public key
			cx_ecdh((cx_ecfp_private_key_t *)&x25519PrivateKey, CX_ECDH_X, uncompressedX25519PublicKey, sizeof(uncompressedX25519PublicKey), (uint8_t *)sharedPrivateKey, SLATEPACK_SHARED_PRIVATE_KEY_SIZE);
			
			// Swap shared private key's endianness
			swapEndianness((uint8_t *)sharedPrivateKey, SLATEPACK_SHARED_PRIVATE_KEY_SIZE);
			
			// Check if shared private key is zero
			if(cx_math_is_zero((uint8_t *)sharedPrivateKey, SLATEPACK_SHARED_PRIVATE_KEY_SIZE)) {
			
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
