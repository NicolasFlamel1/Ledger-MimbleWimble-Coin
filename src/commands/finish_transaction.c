// Header files
#define _GNU_SOURCE
#include <string.h>
#undef _GNU_SOURCE
#include <alloca.h>
#include "../blake2b.h"
#include "../common.h"
#include "../crypto.h"
#include "../currency.h"
#include "finish_transaction.h"
#include "../menus.h"
#include "../mqs.h"
#include "../transaction.h"
#include "../time.h"
#include "../tor.h"


// Definitions

// Maximum relative height
#define MAXIMUM_RELATIVE_HEIGHT (DAYS_IN_A_WEEK * HOURS_IN_A_DAY * MINUTES_IN_AN_HOUR)

// Number of fractional digits
#define NUMBER_OF_FRACTIONAL_DIGITS 9


// Constants

// Kernel features
enum KernelFeatures {

	// Plain features
	PLAIN_FEATURES,

	// Coinbase features
	COINBASE_FEATURES,

	// Height locked features
	HEIGHT_LOCKED_FEATURES,

	// No recent duplicate features
	NO_RECENT_DUPLICATE_FEATURES
};


// Supporting function implementation

// Process finish transaction request
void processFinishTransactionRequest(__attribute__((unused)) const unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];

	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];

	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];

	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(secondParameter || dataLength < COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Get address type from first parameter
	const enum AddressType addressType = firstParameter;

	// Check if address type is invalid
	if(addressType > TOR_ADDRESS_TYPE) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Get public nonce from data
	const uint8_t *publicNonce = data;

	// Check if public nonce is invalid
	if(!isValidSecp256k1PublicKey(publicNonce, COMPRESSED_PUBLIC_KEY_SIZE)) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Get public key from data
	const uint8_t *publicKey = &data[COMPRESSED_PUBLIC_KEY_SIZE];

	// Check if public key is invalid
	if(!isValidSecp256k1PublicKey(publicKey, COMPRESSED_PUBLIC_KEY_SIZE)) {

		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}

	// Get kernel features from data
	const enum KernelFeatures kernelFeatures = data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];

	// Check if transaction hasn't been started
	if(!transaction.started) {

		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}

	// Check if transaction has remaining output or input
	if(transaction.remainingOutput || transaction.remainingInput) {

		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}

	// Check kernel features
	size_t kernelFeaturesLength;
	switch(kernelFeatures) {

		// Plain features
		case PLAIN_FEATURES:

			// Set kernel features length
			kernelFeaturesLength = sizeof(uint8_t);

			// Break
			break;

		// Coinbase features
		case COINBASE_FEATURES:

			// Check if transaction is sending
			if(transaction.send) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Check if a transaction address exists
			if(transaction.addressLength) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Set kernel features length
			kernelFeaturesLength = sizeof(uint8_t);

			// Break
			break;

		// Height locked features
		case HEIGHT_LOCKED_FEATURES:

			// Set kernel features length
			kernelFeaturesLength = sizeof(uint8_t) + sizeof(uint64_t);

			// Break
			break;

		// No recent duplicate features
		case NO_RECENT_DUPLICATE_FEATURES:

			// Set kernel features length
			kernelFeaturesLength = sizeof(uint8_t) + sizeof(uint16_t);

			// Check if data is invalid
			if(dataLength < COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Get relative height from data
			uint16_t relativeHeight;
			memcpy(&relativeHeight, &data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)], sizeof(relativeHeight));

			// Check if relative height is invalid
			if(!relativeHeight || relativeHeight > MAXIMUM_RELATIVE_HEIGHT) {

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
	};

	// Check if transaction is sending
	if(transaction.send) {

		// Check if data is invalid
		if(dataLength < COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength) {

			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}

		// Check if a payment proof information is provided
		if(dataLength != COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength) {

			// Check if data is invalid
			if(dataLength <= COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Get kernel commitment from data
			uint8_t *kernelCommitment = &data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength];

			// Check if kernel commitment is invalid
			if(!isValidCommitment(kernelCommitment)) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Get signature from data
			const uint8_t *signature = &data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE];

			// Get signature length
			const size_t signatureLength = dataLength - (COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE);

			// Check address type
			size_t addressLength;
			char *address;
			switch(addressType) {

				// MQS address type
				case MQS_ADDRESS_TYPE:

					// Set address length
					addressLength = MQS_ADDRESS_SIZE;

					// Allocate memory for the address
					address = alloca(addressLength);

					// Get MQS address
					getMqsAddress(address, transaction.account, transaction.index);

					// Break
					break;

				// Tor address type
				case TOR_ADDRESS_TYPE:

					// Set address length
					addressLength = TOR_ADDRESS_SIZE;

					// Allocate memory for the address
					address = alloca(addressLength);

					// Get Tor address
					getTorAddress(address, transaction.account, transaction.index);

					// Break
					break;
			}

			// Get payment proof message length
			const size_t paymentProofMessageLength = getPaymentProofMessageLength(transaction.send, addressLength);

			// Get payment proof message
			uint8_t *paymentProofMessage = alloca(paymentProofMessageLength);
			getPaymentProofMessage(paymentProofMessage, transaction.send, kernelCommitment, address, addressLength);

			// Check if verifying payment proof failed
			if(!verifyPaymentProofMessage(paymentProofMessage, paymentProofMessageLength, transaction.address, transaction.addressLength, signature, signatureLength)) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Check if transaction offset wasn't applied
			if(!transaction.offsetApplied) {

				// Throw invalid state error
				THROW(INVALID_STATE_ERROR);
			}

			// Copy address into the address line buffer
			explicit_bzero(addressLineBuffer, sizeof(addressLineBuffer));
			memcpy(addressLineBuffer, transaction.address, transaction.addressLength);
		}

		// Otherwise
		else {

			// Check if transaction offset wasn't applied
			if(!transaction.offsetApplied) {

				// Throw invalid state error
				THROW(INVALID_STATE_ERROR);
			}

			// Clear the address line buffer
			explicit_bzero(addressLineBuffer, sizeof(addressLineBuffer));
		}

// Check if has BAGL
#ifdef HAVE_BAGL

		// Set approve transaction line buffer
		explicit_bzero(approveTransactionLineBuffer, sizeof(approveTransactionLineBuffer));
		strncpy(approveTransactionLineBuffer, "Send", sizeof(approveTransactionLineBuffer) - sizeof((char)'\0'));

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

		// Set approve transaction line buffer
		explicit_bzero(approveTransactionLineBuffer, sizeof(approveTransactionLineBuffer));
		strncpy(approveTransactionLineBuffer, "Send transaction?", sizeof(approveTransactionLineBuffer) - sizeof((char)'\0'));

		// Set succeeded line buffer
		explicit_bzero(succeededLineBuffer, sizeof(succeededLineBuffer));
		strncpy(succeededLineBuffer, "TRANSACTION\nSENT", sizeof(succeededLineBuffer) - sizeof((char)'\0'));

		// Set failed line buffer
		explicit_bzero(failedLineBuffer, sizeof(failedLineBuffer));
		strncpy(failedLineBuffer, "Sending transaction\nfailed", sizeof(failedLineBuffer) - sizeof((char)'\0'));

		// Set canceled line buffer
		explicit_bzero(canceledLineBuffer, sizeof(canceledLineBuffer));
		strncpy(canceledLineBuffer, "Sending transaction\ndenied", sizeof(canceledLineBuffer) - sizeof((char)'\0'));

		// Set cancel prompt line buffer
		explicit_bzero(cancelPromptLineBuffer, sizeof(cancelPromptLineBuffer));
		strncpy(cancelPromptLineBuffer, "Deny sending\ntransaction?", sizeof(cancelPromptLineBuffer) - sizeof((char)'\0'));

		// Set approve button line buffer
		explicit_bzero(approveButtonLineBuffer, sizeof(approveButtonLineBuffer));
		strncpy(approveButtonLineBuffer, "Hold to send", sizeof(approveButtonLineBuffer) - sizeof((char)'\0'));
#endif

		// Copy transaction's input into the amount line buffer
		explicit_bzero(amountLineBuffer, sizeof(amountLineBuffer));
		toString(amountLineBuffer, transaction.send, NUMBER_OF_FRACTIONAL_DIGITS);
	}

	// Otherwise
	else {

		// Check if a kernel commitment is provided
		if(dataLength == COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE) {

			// Check if a transaction address doesn't exist
			if(!transaction.addressLength) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Get kernel commitment from data
			uint8_t *kernelCommitment = &data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength];

			// Check if kernel commitment is invalid
			if(!isValidCommitment(kernelCommitment)) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Copy address into the address line buffer
			explicit_bzero(addressLineBuffer, sizeof(addressLineBuffer));
			memcpy(addressLineBuffer, transaction.address, transaction.addressLength);
		}

		// Otherwise
		else {

			// Check if data is invalid
			if(dataLength != COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength) {

				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}

			// Clear the address line buffer
			explicit_bzero(addressLineBuffer, sizeof(addressLineBuffer));
		}

// Check if has BAGL
#ifdef HAVE_BAGL

		// Set approve transaction line buffer
		explicit_bzero(approveTransactionLineBuffer, sizeof(approveTransactionLineBuffer));
		strncpy(approveTransactionLineBuffer, "Receive", sizeof(approveTransactionLineBuffer) - sizeof((char)'\0'));

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

		// Set approve transaction line buffer
		explicit_bzero(approveTransactionLineBuffer, sizeof(approveTransactionLineBuffer));
		strncpy(approveTransactionLineBuffer, "Receive transaction?", sizeof(approveTransactionLineBuffer) - sizeof((char)'\0'));

		// Set succeeded line buffer
		explicit_bzero(succeededLineBuffer, sizeof(succeededLineBuffer));
		strncpy(succeededLineBuffer, "TRANSACTION\nRECEIVED", sizeof(succeededLineBuffer) - sizeof((char)'\0'));

		// Set failed line buffer
		explicit_bzero(failedLineBuffer, sizeof(failedLineBuffer));
		strncpy(failedLineBuffer, "Receiving transaction\nfailed", sizeof(failedLineBuffer) - sizeof((char)'\0'));

		// Set canceled line buffer
		explicit_bzero(canceledLineBuffer, sizeof(canceledLineBuffer));
		strncpy(canceledLineBuffer, "Receiving transaction\ndenied", sizeof(canceledLineBuffer) - sizeof((char)'\0'));

		// Set cancel prompt line buffer
		explicit_bzero(cancelPromptLineBuffer, sizeof(cancelPromptLineBuffer));
		strncpy(cancelPromptLineBuffer, "Deny receiving\ntransaction?", sizeof(cancelPromptLineBuffer) - sizeof((char)'\0'));

		// Set approve button line buffer
		explicit_bzero(approveButtonLineBuffer, sizeof(approveButtonLineBuffer));
		strncpy(approveButtonLineBuffer, "Hold to receive", sizeof(approveButtonLineBuffer) - sizeof((char)'\0'));
#endif

		// Copy transaction's output into the amount line buffer
		explicit_bzero(amountLineBuffer, sizeof(amountLineBuffer));
		toString(amountLineBuffer, transaction.receive, NUMBER_OF_FRACTIONAL_DIGITS);
	}

	// Append currency abbreviation to amount line buffer
	strncat(amountLineBuffer, " ", sizeof(amountLineBuffer) - strlen(amountLineBuffer) - sizeof((char)'\0'));
	strncat(amountLineBuffer, CURRENCY_ABBREVIATION, sizeof(amountLineBuffer) - strlen(amountLineBuffer) - sizeof((char)'\0'));

	// Copy transaction's fee into the fee line buffer
	explicit_bzero(feeLineBuffer, sizeof(feeLineBuffer));
	toString(feeLineBuffer, transaction.fee, NUMBER_OF_FRACTIONAL_DIGITS);

	strncat(feeLineBuffer, " ", sizeof(feeLineBuffer) - strlen(feeLineBuffer) - sizeof((char)'\0'));
	strncat(feeLineBuffer, CURRENCY_ABBREVIATION, sizeof(feeLineBuffer) - strlen(feeLineBuffer) - sizeof((char)'\0'));

	// Copy transaction's account into the account index line buffer
	explicit_bzero(accountIndexLineBuffer, sizeof(accountIndexLineBuffer));
	toString(accountIndexLineBuffer, transaction.account, 0);

	// Check kernel features
	switch(kernelFeatures) {

		// Plain features
		case PLAIN_FEATURES:

			// Set kernel features line buffer
			explicit_bzero(kernelFeaturesLineBuffer, sizeof(kernelFeaturesLineBuffer));
			strncpy(kernelFeaturesLineBuffer, "Plain", sizeof(kernelFeaturesLineBuffer) - sizeof((char)'\0'));

			// Clear the kernel features details title line buffer
			explicit_bzero(kernelFeaturesDetailsTitleLineBuffer, sizeof(kernelFeaturesDetailsTitleLineBuffer));

			// Break
			break;

		// Coinbase features
		case COINBASE_FEATURES:

			// Set kernel features line buffer
			explicit_bzero(kernelFeaturesLineBuffer, sizeof(kernelFeaturesLineBuffer));
			strncpy(kernelFeaturesLineBuffer, "Coinbase", sizeof(kernelFeaturesLineBuffer) - sizeof((char)'\0'));

			// Clear the kernel features details title line buffer
			explicit_bzero(kernelFeaturesDetailsTitleLineBuffer, sizeof(kernelFeaturesDetailsTitleLineBuffer));

			// Break
			break;

		// Height locked features
		case HEIGHT_LOCKED_FEATURES:

			// Set kernel features line buffer
			explicit_bzero(kernelFeaturesLineBuffer, sizeof(kernelFeaturesLineBuffer));
			strncpy(kernelFeaturesLineBuffer, "Height Locked", sizeof(kernelFeaturesLineBuffer) - sizeof((char)'\0'));

			// Set kernel features details title line buffer
			explicit_bzero(kernelFeaturesDetailsTitleLineBuffer, sizeof(kernelFeaturesDetailsTitleLineBuffer));
			strncpy(kernelFeaturesDetailsTitleLineBuffer, "Lock Height", sizeof(kernelFeaturesDetailsTitleLineBuffer) - sizeof((char)'\0'));

			// Get lock height from data
			uint64_t lockHeight;
			memcpy(&lockHeight, &data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)], sizeof(lockHeight));

			// Copy lock height into the kernel features details text line buffer
			explicit_bzero(kernelFeaturesDetailsTextLineBuffer, sizeof(kernelFeaturesDetailsTextLineBuffer));
			toString(kernelFeaturesDetailsTextLineBuffer, lockHeight, 0);

			// Break
			break;

		// No recent duplicate features or default
		case NO_RECENT_DUPLICATE_FEATURES:
		default:

			// Set kernel features line buffer
			explicit_bzero(kernelFeaturesLineBuffer, sizeof(kernelFeaturesLineBuffer));
			strncpy(kernelFeaturesLineBuffer, "No Recent Duplicate", sizeof(kernelFeaturesLineBuffer) - sizeof((char)'\0'));

			// Set kernel features details title line buffer
			explicit_bzero(kernelFeaturesDetailsTitleLineBuffer, sizeof(kernelFeaturesDetailsTitleLineBuffer));
			strncpy(kernelFeaturesDetailsTitleLineBuffer, "Relative Height", sizeof(kernelFeaturesDetailsTitleLineBuffer) - sizeof((char)'\0'));

			// Get relative height from data
			uint16_t relativeHeight;
			memcpy(&relativeHeight, &data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)], sizeof(relativeHeight));

			// Copy relative height into the kernel features details text line buffer
			explicit_bzero(kernelFeaturesDetailsTextLineBuffer, sizeof(kernelFeaturesDetailsTextLineBuffer));
			toString(kernelFeaturesDetailsTextLineBuffer, relativeHeight, 0);

			// Break
			break;
	}

	// Show approve transaction menu
	showMenu(APPROVE_TRANSACTION_MENU);

	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process finish transaction user interaction
void processFinishTransactionUserInteraction(unsigned short *responseLength) {

	// Check if transaction is sending
	if(transaction.send) {

		// Clear transaction secret nonce
		clearTransactionSecretNonce();
	}

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];

	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];

	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Get address type from first parameter
	const enum AddressType addressType = firstParameter;

	// Get public nonce from data
	const uint8_t *publicNonce = data;

	// Get public key from data
	const uint8_t *publicKey = &data[COMPRESSED_PUBLIC_KEY_SIZE];

	// Get kernel features from data
	const enum KernelFeatures kernelFeatures = data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];

	// Initialize kernel features length
	size_t kernelFeaturesLength;

	// Initialize kernel data
	uint8_t *kernelData;

	// Initialize kernel data length
	size_t kernelDataLength;

	// Check kernel features
	switch(kernelFeatures) {

		// Plain features
		case PLAIN_FEATURES:

			// Set kernel features length
			kernelFeaturesLength = sizeof(uint8_t);

			// Set kernel data length
			kernelDataLength = sizeof(uint8_t) + sizeof(uint64_t);

			// Allocate memory for kernel data
			kernelData = alloca(kernelDataLength);

			// Set kernel features in the kernel data
			kernelData[0] = kernelFeatures;

			// Convert fee to big endian
			swapEndianness((uint8_t *)&transaction.fee, sizeof(transaction.fee));

			// Append fee to the kernel data
			memcpy(&kernelData[sizeof(kernelData[0])], &transaction.fee, sizeof(transaction.fee));

			// Break
			break;

		// Coinbase features
		case COINBASE_FEATURES:

			// Set kernel features length
			kernelFeaturesLength = sizeof(uint8_t);

			// Set kernel data length
			kernelDataLength = sizeof(uint8_t);

			// Allocate memory for kernel data
			kernelData = alloca(kernelDataLength);

			// Set kernel features in the kernel data
			kernelData[0] = kernelFeatures;

			// Break
			break;

		// Height locked features
		case HEIGHT_LOCKED_FEATURES:

			// Set kernel features length
			kernelFeaturesLength = sizeof(uint8_t) + sizeof(uint64_t);

			// Set kernel data length
			kernelDataLength = sizeof(uint8_t) + sizeof(uint64_t) + sizeof(uint64_t);

			// Allocate memory for kernel data
			kernelData = alloca(kernelDataLength);

			// Set kernel features in the kernel data
			kernelData[0] = kernelFeatures;

			// Convert fee to big endian
			swapEndianness((uint8_t *)&transaction.fee, sizeof(transaction.fee));

			// Append fee to the kernel data
			memcpy(&kernelData[sizeof(kernelData[0])], &transaction.fee, sizeof(transaction.fee));

			{
				// Get lock height from data
				uint8_t *lockHeight = &data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)];

				// Convert lock height to big endian
				swapEndianness(lockHeight, sizeof(uint64_t));

				// Append lock height to the kernel data
				memcpy(&kernelData[sizeof(kernelData[0]) + sizeof(transaction.fee)], lockHeight, sizeof(uint64_t));
			}

			// Break
			break;

		// No recent duplicate features
		case NO_RECENT_DUPLICATE_FEATURES:

			// Set kernel features length
			kernelFeaturesLength = sizeof(uint8_t) + sizeof(uint16_t);

			// Set kernel data length
			kernelDataLength = sizeof(uint8_t) + sizeof(uint64_t) + sizeof(uint16_t);

			// Allocate memory for kernel data
			kernelData = alloca(kernelDataLength);

			// Set kernel features in the kernel data
			kernelData[0] = kernelFeatures;

			// Convert fee to big endian
			swapEndianness((uint8_t *)&transaction.fee, sizeof(transaction.fee));

			// Append fee to the kernel data
			memcpy(&kernelData[sizeof(kernelData[0])], &transaction.fee, sizeof(transaction.fee));

			{

				// Get relative height from data
				uint8_t *relativeHeight = &data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)];

				// Convert relative height to big endian
				swapEndianness(relativeHeight, sizeof(uint16_t));

				// Append relative height to the kernel data
				memcpy(&kernelData[sizeof(kernelData[0]) + sizeof(transaction.fee)], relativeHeight, sizeof(uint16_t));
			}

			// Break
			break;
	};

	// Get message from the kernel data
	uint8_t message[SINGLE_SIGNER_MESSAGE_SIZE];
	getBlake2b(message, sizeof(message), kernelData, kernelDataLength, NULL, 0);

	// Initialize signature
	uint8_t signature[SINGLE_SIGNER_COMPACT_SIGNATURE_SIZE];

	// Create single-signer signature from the message, transaction's blinding factor, transaction's secret nonce, public nonce, and public key
	createSingleSignerSignature(signature, message, (uint8_t *)transaction.blindingFactor, (uint8_t *)transaction.secretNonce, publicNonce, publicKey);

	// Initialize payment proof
	volatile uint8_t *paymentProof;

	// Initialize payment proof length
	volatile size_t paymentProofLength = 0;

	// Check if transaction is receiving and a kernel commitment is provided
	if(transaction.receive && dataLength == COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE) {

		// Get kernel commitment from data
		const uint8_t *kernelCommitment = &data[COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength];

		// Get payment proof message length
		const size_t paymentProofMessageLength = getPaymentProofMessageLength(transaction.receive, transaction.addressLength);

		// Get payment proof message
		uint8_t *paymentProofMessage = alloca(paymentProofMessageLength);

		getPaymentProofMessage(paymentProofMessage, transaction.receive, kernelCommitment, transaction.address, transaction.addressLength);

		// Initialize address private key
		volatile cx_ecfp_private_key_t addressPrivateKey;

		// Begin try
		BEGIN_TRY {

			// Try
			TRY {

				// Check address type
				switch(addressType) {

					// MQS address type
					case MQS_ADDRESS_TYPE:

						// Get address private key
						getAddressPrivateKey(&addressPrivateKey, transaction.account, transaction.index, CX_CURVE_SECP256K1);

						{
							// Get address public key from the address private key and throw error if it fails
							cx_ecfp_public_key_t addressPublicKey;
							CX_THROW(cx_ecfp_generate_pair_no_throw(CX_CURVE_SECP256K1, &addressPublicKey, (cx_ecfp_private_key_t *)&addressPrivateKey, true));

							// Check if the address public key is in the payment proof message
							if(memmem(paymentProofMessage, paymentProofMessageLength, addressPublicKey.W, addressPublicKey.W_len)) {

								// Throw internal error error
								THROW(INTERNAL_ERROR_ERROR);
							}

							// Compress the address public key
							addressPublicKey.W[0] = (addressPublicKey.W[addressPublicKey.W_len - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;

							// Check if the compressed address public key is in the payment proof message
							if(memmem(paymentProofMessage, paymentProofMessageLength, addressPublicKey.W, COMPRESSED_PUBLIC_KEY_SIZE)) {

								// Throw internal error error
								THROW(INTERNAL_ERROR_ERROR);
							}
						}

						// Set payment proof length
						paymentProofLength = MAXIMUM_DER_SIGNATURE_SIZE;

						// Allocate memory for the payment proof
						paymentProof = alloca(paymentProofLength);

						// Get hash of the payment proof message
						uint8_t hash[CX_SHA256_SIZE];
						cx_hash_sha256(paymentProofMessage, paymentProofMessageLength, hash, sizeof(hash));

						// Get signature of the hash and throw error if it fails
						CX_THROW(cx_ecdsa_sign_no_throw((cx_ecfp_private_key_t *)&addressPrivateKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, hash, sizeof(hash), (uint8_t *)paymentProof, (size_t *)&paymentProofLength, NULL));

						// Break
						break;

					// Tor address type
					case TOR_ADDRESS_TYPE:

						// Get address private key
						getAddressPrivateKey(&addressPrivateKey, transaction.account, transaction.index, CX_CURVE_Ed25519);

						{
							// Get address public key from address private key and throw error if it fails
							cx_ecfp_public_key_t addressPublicKey;
							CX_THROW(cx_ecfp_generate_pair_no_throw(CX_CURVE_Ed25519, &addressPublicKey, (cx_ecfp_private_key_t *)&addressPrivateKey, true));

							// Compress the address public key and throw error if it fails
							CX_THROW(cx_edwards_compress_point_no_throw(CX_CURVE_Ed25519, addressPublicKey.W, addressPublicKey.W_len));

							// Check if the address public key is in the payment proof message
							if(memmem(paymentProofMessage, paymentProofMessageLength, &addressPublicKey.W[PUBLIC_KEY_PREFIX_SIZE], ED25519_PUBLIC_KEY_SIZE)) {

								// Throw internal error error
								THROW(INTERNAL_ERROR_ERROR);
							}
						}

						// Set payment proof length
						paymentProofLength = ED25519_SIGNATURE_SIZE;

						// Allocate memory for the payment proof
						paymentProof = alloca(paymentProofLength);

						// Get signature of the payment proof message and throw error if it fails
						CX_THROW(cx_eddsa_sign_no_throw((cx_ecfp_private_key_t *)&addressPrivateKey, CX_SHA512, paymentProofMessage, paymentProofMessageLength, (uint8_t *)paymentProof, paymentProofLength));

						// Break
						break;
				}
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

	// Check if response with the signature and payment proof will overflow
	if(willResponseOverflow(*responseLength, sizeof(signature) + paymentProofLength)) {

		// Throw length error
		THROW(ERR_APD_LEN);
	}

	// Append signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], signature, sizeof(signature));

	*responseLength += sizeof(signature);

	// Check if payment proof exists
	if(paymentProofLength) {

		// Append payment proof to response
		memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)paymentProof, paymentProofLength);

		*responseLength += paymentProofLength;
	}

	// Reset the transaction
	resetTransaction();

	// Throw success
	THROW(SWO_SUCCESS);
}
