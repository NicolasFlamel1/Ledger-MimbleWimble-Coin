// Header files
#include <string.h>
#include "../chacha20_poly1305.h"
#include "../common.h"
#include "../crypto.h"
#include "finish_encrypting_slate.h"
#include "../mqs.h"
#include "../slate.h"


// Supporting function implementation

// Process finish encrypting slate request
void processFinishEncryptingSlateRequest(unsigned short *responseLength, __attribute__((unused)) const unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];

	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];

	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Check if slate encrypting state isn't active or complete
	if(slate.encryptingState != ACTIVE_SLATE_STATE && slate.encryptingState != COMPLETE_SLATE_STATE) {

		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}

	// Get ChaCha20 Poly1305 tag
	uint8_t tag[POLY1305_TAG_SIZE];
	getChaCha20Poly1305Tag((ChaCha20Poly1305State *)&slate.chaCha20Poly1305State, tag);

	// Initialize signature
	volatile uint8_t signature[MAXIMUM_DER_SIGNATURE_SIZE];

	// Initialize signature length
	volatile size_t signatureLength = 0;

	// Check if creating message hash
	if(slate.messageHashState.header.info) {

		// Set signature length
		signatureLength = sizeof(signature);

		// Get tag as a string
		char tagString[sizeof(tag) * HEXADECIMAL_CHARACTER_SIZE];
		toHexString(tagString, tag, sizeof(tag));

		// Add tag string to the message hash state and throw error if it fails
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, 0, (uint8_t *)tagString, sizeof(tagString), NULL, 0));

		// Add MQS message part seven to the message hash and get the message hash and throw error if it fails
		uint8_t messageHash[CX_SHA256_SIZE];
		CX_THROW(cx_hash_no_throw((cx_hash_t *)&slate.messageHashState, CX_LAST, (uint8_t *)MQS_MESSAGE_PART_SEVEN, sizeof(MQS_MESSAGE_PART_SEVEN), messageHash, sizeof(messageHash)));

		// Initialize address private key
		volatile cx_ecfp_private_key_t addressPrivateKey;

		// Begin try
		BEGIN_TRY {

			// Try
			TRY {

				// Get address private key
				getAddressPrivateKey(&addressPrivateKey, slate.account, slate.index, CX_CURVE_SECP256K1);

				// Get signature of the message hash and throw error if it fails
				CX_THROW(cx_ecdsa_sign_no_throw((cx_ecfp_private_key_t *)&addressPrivateKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, messageHash, sizeof(messageHash), (uint8_t *)signature, (size_t *)&signatureLength, NULL));
			}

			// Finally
			FINALLY {

				// Clear the address private key
				explicit_bzero((cx_ecfp_private_key_t *)&addressPrivateKey, sizeof(addressPrivateKey));
			}
		}

		// End try
		END_TRY;
	}

	// Check if response with the tag and signature will overflow
	if(willResponseOverflow(*responseLength, sizeof(tag) + signatureLength)) {

		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append tag to response
	memcpy(&G_io_apdu_buffer[*responseLength], tag, sizeof(tag));

	*responseLength += sizeof(tag);

	// Check if signature exists
	if(signatureLength) {

		// Append signature to response
		memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)signature, signatureLength);

		*responseLength += signatureLength;
	}

	// Reset the slate
	resetSlate();

	// Throw success
	THROW(SWO_SUCCESS);
}
