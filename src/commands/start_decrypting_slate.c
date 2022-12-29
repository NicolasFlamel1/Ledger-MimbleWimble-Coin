// Header files
#include <string.h>
#include "../age.h"
#include "../common.h"
#include "../crypto.h"
#include "../currency_information.h"
#include "../mqs.h"
#include "../slate.h"
#include "../slatepack.h"
#include "start_decrypting_slate.h"
#include "../tor.h"


// Supporting function implementation

// Process start decrypting slate request
void processStartDecryptingSlateRequest(__attribute__((unused)) unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Reset the slate
	resetSlate();
	
	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength <= sizeof(uint32_t) + sizeof(uint32_t) + CHACHA20_NONCE_SIZE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get account from data
	uint32_t account;
	memcpy(&account, data, sizeof(account));
	
	// Check if account is invalid
	if(account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get index from data
	uint32_t index;
	memcpy(&index, &data[sizeof(account)], sizeof(index));
	
	// Get nonce from data
	uint8_t nonce[CHACHA20_NONCE_SIZE];
	memcpy(nonce, &data[sizeof(account) + sizeof(index)], sizeof(nonce));
	
	// Get address from data
	const char *address = (char *)&data[sizeof(account) + sizeof(index) + sizeof(nonce)];
	
	// Get address length
	size_t addressLength = dataLength - (sizeof(account) + sizeof(index) + sizeof(nonce));
	
	// Check address length
	size_t sharedPrivateKeyLength;
	uint8_t *salt = NULL;
	uint8_t *ephemeralX25519PublicKey = NULL;
	uint8_t *encryptedFileKey = NULL;
	uint8_t *payloadNonce = NULL;
	switch(addressLength) {
	
		// MQS address size
		case MQS_ADDRESS_SIZE + MQS_SHARED_PRIVATE_KEY_SALT_SIZE:
		
			// Check currency doesn't allow MQS addresses
			if(!currencyInformation->enableMqsAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set shared private key length
			sharedPrivateKeyLength = MQS_SHARED_PRIVATE_KEY_SIZE;
			
			// Get salt from data
			salt = &data[sizeof(account) + sizeof(index) + sizeof(nonce) + MQS_ADDRESS_SIZE];
		
			// Break
			break;
		
		// Tor address size
		case TOR_ADDRESS_SIZE:
		
			// Check currency doesn't allow Tor addresses
			if(!currencyInformation->enableTorAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set shared private key length
			sharedPrivateKeyLength = SLATEPACK_SHARED_PRIVATE_KEY_SIZE;
		
			// Break
			break;
		
		// Slatepack address size
		case X25519_PUBLIC_KEY_SIZE + AGE_ENCRYPTED_FILE_KEY_SIZE + AGE_PAYLOAD_NONCE_SIZE:
		
			// Check currency doesn't allow Slatepack addresses
			if(!currencyInformation->enableSlatepackAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set shared private key length
			sharedPrivateKeyLength = AGE_PAYLOAD_KEY_SIZE;
			
			// Get ephemeral X25519 public key from data
			ephemeralX25519PublicKey = &data[sizeof(account) + sizeof(index) + sizeof(nonce)];
			
			// Check if ephemeral X25519 public key is invalid
			if(cx_math_is_zero(ephemeralX25519PublicKey, X25519_PUBLIC_KEY_SIZE)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Get encrypted file key from data
			encryptedFileKey = &data[sizeof(account) + sizeof(index) + sizeof(nonce) + X25519_PUBLIC_KEY_SIZE];
			
			// Get payload nonce from data
			payloadNonce = &data[sizeof(account) + sizeof(index) + sizeof(nonce) + X25519_PUBLIC_KEY_SIZE + AGE_ENCRYPTED_FILE_KEY_SIZE];
		
			// Break
			break;
		
		// Default
		default:
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Initialize shared private key
	volatile uint8_t sharedPrivateKey[sharedPrivateKeyLength];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Check address length
			switch(addressLength) {
			
				// MQS address size
				case MQS_ADDRESS_SIZE + MQS_SHARED_PRIVATE_KEY_SALT_SIZE:
					
					// Create MQS shared private key
					createMqsSharedPrivateKey(sharedPrivateKey, account, index, address, salt);
				
					// Break
					break;
				
				// Tor address size
				case TOR_ADDRESS_SIZE:
				
					// Create Slatepack shared private key
					createSlatepackSharedPrivateKey(sharedPrivateKey, account, index, address, addressLength);
				
					// Break
					break;
				
				// Slatepack address size
				case X25519_PUBLIC_KEY_SIZE + AGE_ENCRYPTED_FILE_KEY_SIZE + AGE_PAYLOAD_NONCE_SIZE:
				
					// Get shared private key as the age payload key
					getAgePayloadKey(sharedPrivateKey, account, index, ephemeralX25519PublicKey, encryptedFileKey, payloadNonce);
				
					// Break
					break;
			}
			
			// Initialize ChaCha20 Poly1305 with the shared private key and nonce
			initializeChaCha20Poly1305((ChaCha20Poly1305State *)&slate.chaCha20Poly1305State, (uint8_t *)sharedPrivateKey, nonce, NULL, 0, 0, NULL);
		}
		
		// Finally
		FINALLY {
			
			// Clear the shared private key
			explicit_bzero((uint8_t *)sharedPrivateKey, sizeof(sharedPrivateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Create random slate session key
	cx_rng(slate.sessionKey, sizeof(slate.sessionKey));
	
	// Set that slate decrypting state is ready
	slate.decryptingState = READY_SLATE_STATE;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
