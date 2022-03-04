// Header files
#include <openssl/sha.h>
#include <stdlib.h>


// Supporting function implementation

// CX hash SHA-256
size_t cx_hash_sha256(const uint8_t *in, size_t len, uint8_t *out, size_t out_len) {

	// Initialize SHA-256
	SHA256_CTX sha256;
	SHA256_Init(&sha256);
	
	// Include input in SHA-256
	SHA256_Update(&sha256, in, len);
	
	// Set output to the SHA-256
	SHA256_Final(out, &sha256);
	
	// Return success
	return EXIT_SUCCESS;
}
