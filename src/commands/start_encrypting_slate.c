// Header files
#include <alloca.h>
#include <string.h>
#include "../chacha20_poly1305.h"
#include "../common.h"
#include "../crypto.h"
#include "../currency.h"
#include "../mqs.h"
#include "../slate.h"
#include "../slatepack.h"
#include "start_encrypting_slate.h"
#include "../tor.h"


// Supporting function implementation

// Process start encrypting slate request
void processStartEncryptingSlateRequest(unsigned short *responseLength, __attribute__((unused)) const unsigned char *responseFlags) {

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
	if(firstParameter || secondParameter || dataLength <= sizeof(uint32_t) + sizeof(uint32_t)) {

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

	// Get address from data
	const char *address = (char *)&data[sizeof(account) + sizeof(index)];

	// Get address length
	const size_t addressLength = dataLength - (sizeof(account) + sizeof(index));

	// Get address domain
	const char *addressDomain = memchr(address, '@', addressLength);

	// Check address length
	size_t sharedPrivateKeyLength;
	size_t saltLength = 0;
	uint8_t *salt;
	switch(addressDomain ? addressDomain - address : addressLength) {

		// MQS address size
		case MQS_ADDRESS_SIZE:

			// Check if address has a domain
			if(addressDomain) {

				// Check if domain is invalid
				if(!isValidAddress(&addressDomain[sizeof((char)'@')], addressLength - (addressDomain - address + sizeof((char)'@')))) {

					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
			}

			// Set shared private key length
			sharedPrivateKeyLength = MQS_SHARED_PRIVATE_KEY_SIZE;

			// Set salt length
			saltLength = MQS_SHARED_PRIVATE_KEY_SALT_SIZE;

			// Allocate memory for the salt
			salt = alloca(saltLength);

			// Create random salt
			cx_rng(salt, saltLength);

			// Break
			break;

		// Tor address size
		case TOR_ADDRESS_SIZE:

			// Check if address has a domain
			if(addressDomain) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

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

	// Initialize nonce
	uint8_t nonce[CHACHA20_NONCE_SIZE];

	// Create random nonce
	cx_rng(nonce, sizeof(nonce));

	// Initialize shared private key
	volatile uint8_t *sharedPrivateKey = alloca(sharedPrivateKeyLength);

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Check address length
			switch(addressDomain ? addressDomain - address : addressLength) {

				// MQS address size
				case MQS_ADDRESS_SIZE:

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

	// Check if encrypting for MQS
	if((addressDomain ? addressDomain - address : addressLength) == MQS_ADDRESS_SIZE) {

		// Initialize message hash state
		cx_sha256_init(&slate.messageHashState);

		// Add MQS message part one to the message hash state and throw error if it fails
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)MQS_MESSAGE_PART_ONE, sizeof(MQS_MESSAGE_PART_ONE), NULL, 0));

		// Add address to the message hash state and throw error if it fails
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)address, addressDomain ? addressDomain - address : addressLength, NULL, 0));

		// Add MQS message part two to the message hash state and throw error if it fails
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)MQS_MESSAGE_PART_TWO, sizeof(MQS_MESSAGE_PART_TWO), NULL, 0));

		// Check if address has a domain
		if(addressDomain) {

			// Get address port
			const char *addressPort = memchr(addressDomain, ':', addressLength - (addressDomain - address));

			// Check if address has a port
			if(addressPort) {

				// Add address domain to the message hash state and throw error if it fails
				CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)&addressDomain[sizeof((char)'@')], addressPort - addressDomain - sizeof((char)'@'), NULL, 0));

				// Add MQS message part three to the message hash state and throw error if it fails
				CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)MQS_MESSAGE_PART_THREE, sizeof(MQS_MESSAGE_PART_THREE), NULL, 0));

				// Add address port to the message hash state and throw error if it fails
				CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)&addressPort[sizeof((char)':')], addressLength - (addressPort - address + sizeof((char)':')), NULL, 0));
			}

			// Otherwise
			else {

				// Add address domain to the message hash state and throw error if it fails
				CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)&addressDomain[sizeof((char)'@')], addressLength - (addressDomain - address + sizeof((char)'@')), NULL, 0));

				// Add MQS message part three to the message hash state and throw error if it fails
				CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)MQS_MESSAGE_PART_THREE, sizeof(MQS_MESSAGE_PART_THREE), NULL, 0));

				// Add MQS message no port to the message hash state and throw error if it fails
				CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)MQS_MESSAGE_NO_PORT, sizeof(MQS_MESSAGE_NO_PORT), NULL, 0));
			}
		}

		// Otherwise
		else {

			// Add MQS message part three to the message hash state and throw error if it fails
			CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)MQS_MESSAGE_PART_THREE, sizeof(MQS_MESSAGE_PART_THREE), NULL, 0));

			// Add MQS message no port to the message hash state and throw error if it fails
			CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)MQS_MESSAGE_NO_PORT, sizeof(MQS_MESSAGE_NO_PORT), NULL, 0));
		}

		// Add MQS message part four to the message hash state and throw error if it fails
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)MQS_MESSAGE_PART_FOUR, sizeof(MQS_MESSAGE_PART_FOUR), NULL, 0));

		// Get nonce as a string
		char nonceString[sizeof(nonce) * HEXADECIMAL_CHARACTER_SIZE];
		toHexString(nonceString, nonce, sizeof(nonce));

		// Add nonce string to the message hash state and throw error if it fails
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)nonceString, sizeof(nonceString), NULL, 0));

		// Add MQS message part five to the message hash state and throw error if it fails
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)MQS_MESSAGE_PART_FIVE, sizeof(MQS_MESSAGE_PART_FIVE), NULL, 0));

		// Get salt as a string
		const size_t saltStringLength = saltLength * HEXADECIMAL_CHARACTER_SIZE;
		char *saltString = alloca(saltStringLength);
		toHexString(saltString, salt, saltLength);

		// Add salt string to the message hash state and throw error if it fails
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)saltString, saltStringLength, NULL, 0));

		// Add MQS message part six to the message hash state and throw error if it fails
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)MQS_MESSAGE_PART_SIX, sizeof(MQS_MESSAGE_PART_SIX), NULL, 0));
	}

	// Check if response with the nonce and salt will overflow
	if(willResponseOverflow(*responseLength, sizeof(nonce) + saltLength)) {

		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append nonce to response
	memcpy(&G_io_apdu_buffer[*responseLength], nonce, sizeof(nonce));

	*responseLength += sizeof(nonce);

	// Check if salt exists
	if(saltLength) {

		// Append salt to response
		memcpy(&G_io_apdu_buffer[*responseLength], salt, saltLength);

		*responseLength += saltLength;
	}

	// Set slate's account
	slate.account = account;

	// Set slate's index
	slate.index = index;

	// Set that slate encrypting state is ready
	slate.encryptingState = READY_SLATE_STATE;

	// Throw success
	THROW(SWO_SUCCESS);
}
