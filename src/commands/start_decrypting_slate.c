// Header files
#include <alloca.h>
#include <string.h>
#include "../age.h"
#include "../common.h"
#include "../crypto.h"
#include "../currency.h"
#include "../mqs.h"
#include "../slate.h"
#include "../slatepack.h"
#include "start_decrypting_slate.h"
#include "../tor.h"


// Supporting function implementation

// Process start decrypting slate request
void processStartDecryptingSlateRequest(__attribute__((unused)) const unsigned short *responseLength, __attribute__((unused)) const unsigned char *responseFlags) {

	// Reset the slate
	resetSlate();

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];

	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];

	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

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
	const size_t addressLength = dataLength - (sizeof(account) + sizeof(index) + sizeof(nonce));

	// Check address length
	size_t sharedPrivateKeyLength;
	const uint8_t *salt = NULL;
	const uint8_t *ephemeralX25519PublicKey = NULL;
	const uint8_t *encryptedFileKey = NULL;
	const uint8_t *payloadNonce = NULL;
	switch(addressLength) {

		// MQS address size
		case MQS_ADDRESS_SIZE + MQS_SHARED_PRIVATE_KEY_SALT_SIZE:

			// Check if currency doesn't allow MQS addresses or doesn't support MQS slate encryption
			if(!CURRENCY_ENABLE_MQS_ADDRESS || !(CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES & MQS_SLATE_ENCRYPTION)) {

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

			// Check if currency doesn't allow Tor addresses or doesn't support Tor slate encryption
			if(!CURRENCY_ENABLE_TOR_ADDRESS || !(CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES & TOR_SLATE_ENCRYPTION)) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Set shared private key length
			sharedPrivateKeyLength = SLATEPACK_SHARED_PRIVATE_KEY_SIZE;

			// Break
			break;

		// Slatepack address size
		case X25519_PUBLIC_KEY_SIZE + AGE_ENCRYPTED_FILE_KEY_SIZE + AGE_PAYLOAD_NONCE_SIZE:

			// Check if currency doesn't allow Slatepack addresses or doesn't support Slatepack slate encryption
			if(!CURRENCY_ENABLE_SLATEPACK_ADDRESS || !(CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES & SLATEPACK_SLATE_ENCRYPTION)) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Set shared private key length
			sharedPrivateKeyLength = AGE_PAYLOAD_KEY_SIZE;

			// Get ephemeral X25519 public key from data
			ephemeralX25519PublicKey = &data[sizeof(account) + sizeof(index) + sizeof(nonce)];

			// Check if ephemeral X25519 public key is invalid
			if(!isValidX25519PublicKey(ephemeralX25519PublicKey, X25519_PUBLIC_KEY_SIZE)) {

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

			// Break
			break;
	}

	// Initialize shared private key
	volatile uint8_t *sharedPrivateKey = alloca(sharedPrivateKeyLength);

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
			initializeChaCha20Poly1305(&slate.chaCha20Poly1305State, (uint8_t *)sharedPrivateKey, nonce, NULL, 0, 0, NULL);
		}

		// Finally
		FINALLY {

			// Clear the shared private key
			explicit_bzero((uint8_t *)sharedPrivateKey, sharedPrivateKeyLength);
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
