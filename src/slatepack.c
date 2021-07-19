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
		
			// Get ED25519 private key
			getAddressPrivateKey(&ed25519PrivateKey, account, TOR_ADDRESS_PRIVATE_KEY_INDEX, CX_CURVE_Ed25519);
			
			// Get X25519 private key from the Ed25519 private key
			getX25519PrivateKeyFromEd25519PrivateKey(&x25519PrivateKey, (cx_ecfp_private_key_t *)&ed25519PrivateKey);
			
			// Uncompress the public key
			uint8_t uncompressedPublicKey[UNCOMPRESSED_PUBLIC_KEY_SIZE];
			uncompressedPublicKey[0] = EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
			memcpy(&uncompressedPublicKey[PUBLIC_KEY_PREFIX_SIZE], publicKey, COMPRESSED_PUBLIC_KEY_SIZE - PUBLIC_KEY_PREFIX_SIZE);
			
			cx_edwards_decompress_point(CX_CURVE_Curve25519, uncompressedPublicKey, sizeof(uncompressedPublicKey));
			
			// Create a shared private key from the X25519 private key and uncompressed public key
			cx_ecdh((cx_ecfp_private_key_t *)&x25519PrivateKey, CX_ECDH_X, uncompressedPublicKey, sizeof(uncompressedPublicKey), (uint8_t *)sharedPrivateKey, SLATEPACK_SHARED_PRIVATE_KEY_SIZE);
			
			// Swap shared private key's endianness
			swapEndianness((uint8_t *)sharedPrivateKey, SLATEPACK_SHARED_PRIVATE_KEY_SIZE);
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
