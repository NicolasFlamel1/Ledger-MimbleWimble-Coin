// Header files
#include <alloca.h>
#include <string.h>
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
	switch(addressLength) {

		// MQS address size
		case MQS_ADDRESS_SIZE + MQS_SHARED_PRIVATE_KEY_SALT_SIZE:

			// Set shared private key length
			sharedPrivateKeyLength = MQS_SHARED_PRIVATE_KEY_SIZE;

			// Get salt from data
			salt = &data[sizeof(account) + sizeof(index) + sizeof(nonce) + MQS_ADDRESS_SIZE];

			// Break
			break;

		// Tor address size
		case TOR_ADDRESS_SIZE:

			// Set shared private key length
			sharedPrivateKeyLength = SLATEPACK_SHARED_PRIVATE_KEY_SIZE;

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
