// Header files
#define _GNU_SOURCE
#include <string.h>
#undef _GNU_SOURCE
#include <alloca.h>
#include "blake2b.h"
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "finish_transaction.h"
#include "menus.h"
#include "mqs.h"
#include "transaction.h"
#include "slatepack.h"
#include "tor.h"


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
void processFinishTransactionRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];
	
	// Check if parameters or data are invalid
	if(secondParameter || dataLength < NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get address type from first parameter
	const enum AddressType addressType = firstParameter;
	
	// Check address type
	switch(addressType) {
	
		// MQS address type
		case MQS_ADDRESS_TYPE:
		
			// Check currency doesn't allow MQS addresses
			if(!currencyInformation.enableMqsAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Break
			break;
		
		// Tor address type
		case TOR_ADDRESS_TYPE:
		
			// Check currency doesn't allow Tor addresses
			if(!currencyInformation.enableTorAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Break
			break;
		
		// Slatepack address type
		case SLATEPACK_ADDRESS_TYPE:
		
			// Check currency doesn't allow Slatepack addresses
			if(!currencyInformation.enableSlatepackAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Break
			break;
		
		// Default
		default:
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get secret nonce from data
	const uint8_t *secretNonce = data;
	
	// Check if secret nonce is invalid
	if(cx_math_is_zero(secretNonce, NONCE_SIZE)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get public nonce from data
	const uint8_t *publicNonce = &data[NONCE_SIZE];
	
	// Check if public nonce is invalid
	if(!isValidSecp256k1PublicKey(publicNonce, COMPRESSED_PUBLIC_KEY_SIZE)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get public key from data
	const uint8_t *publicKey = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Check if public key is invalid
	if(!isValidSecp256k1PublicKey(publicKey, COMPRESSED_PUBLIC_KEY_SIZE)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get kernel features from data
	const enum KernelFeatures kernelFeatures = data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Check kernel features
	size_t kernelFeaturesLength;
	switch(kernelFeatures) {
	
		// Plain and coinbase features
		case PLAIN_FEATURES:
		case COINBASE_FEATURES:
		
			// Set kernel features length
			kernelFeaturesLength = sizeof(uint8_t);
		
			// Break
			break;
		
		// Height locked and no recent duplicate features
		case HEIGHT_LOCKED_FEATURES:
		case NO_RECENT_DUPLICATE_FEATURES:
		
			// Set kernel features length
			kernelFeaturesLength = sizeof(uint8_t) + sizeof(uint64_t);
			
			// Break
			break;
		
		// Default
		default:
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
	};
	
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
	
	// Check if transaction is sending
	if(transaction.send) {
	
		// Check if data is invalid
		if(dataLength < NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
		
		// Check if a payment proof information is provided
		if(dataLength != NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength) {
		
			// Check if data is invalid
			if(dataLength <= NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Get kernel commitment from data
			uint8_t *kernelCommitment = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength];
			
			// Check if kernel commitment is invalid
			if(!isValidCommitment(kernelCommitment)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Get signature from data
			uint8_t *signature = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE];
			
			// Get signature length
			const size_t signatureLength = dataLength - (NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE);
			
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
				
				// Slatepack address type
				case SLATEPACK_ADDRESS_TYPE:
				
					// Set address length
					addressLength = SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart);
					
					// Allocate memory for the address
					address = alloca(addressLength);
					
					// Get Slatepack public key
					getSlatepackAddress(address, transaction.account, transaction.index);
				
					// Break
					break;
			}
			
			// Get payment proof message
			uint8_t paymentProofMessage[getPaymentProofMessageLength(transaction.send, addressLength)];
			getPaymentProofMessage(paymentProofMessage, transaction.send, kernelCommitment, address, addressLength);
			
			// Check if verifying payment proof failed
			if(!verifyPaymentProofMessage(paymentProofMessage, sizeof(paymentProofMessage), transaction.address, transaction.addressLength, signature, signatureLength)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Copy address into the public key or address line buffer
			explicit_bzero(publicKeyOrAddressLineBuffer, sizeof(publicKeyOrAddressLineBuffer));
			memcpy(publicKeyOrAddressLineBuffer, transaction.address, transaction.addressLength);
			
			// Check transaction's address length
			switch(transaction.addressLength) {
			
				// MQS address size
				case MQS_ADDRESS_SIZE:
				
					// Set address type line buffer
					strcpy(addressTypeLineBuffer, "To MQS Address");
					
					// Break
					break;
				
				// Tor address size
				case TOR_ADDRESS_SIZE:
				
					// Set address type line buffer
					strcpy(addressTypeLineBuffer, "To Tor Address");
					
					// Break
					break;
				
				// Default
				default:
				
					// Check if transaction's address length is a Slatepack address length
					if(transaction.addressLength == SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart)) {
					
						// Set address type line buffer
						strcpy(addressTypeLineBuffer, "To Slatepack Address");
					}
				
					// Break
					break;
			}
		}
		
		// Otherwise
		else {
			
			// Clear the public key or address line buffer
			explicit_bzero(publicKeyOrAddressLineBuffer, sizeof(publicKeyOrAddressLineBuffer));
		}
		
		// Check if transaction offset wasn't applied
		if(!transaction.offsetApplied) {
		
			// Throw invalid state error
			THROW(INVALID_STATE_ERROR);
		}
	
		// Copy transaction's input into the amount line buffer
		explicit_bzero(amountLineBuffer, sizeof(amountLineBuffer));
		toString(amountLineBuffer, transaction.send, currencyInformation.fractionalDigits);
		
		strcat(amountLineBuffer, " ");
		strcat(amountLineBuffer, currencyInformation.abbreviation);
		
		// Copy transaction's fee into the fee line buffer
		explicit_bzero(feeLineBuffer, sizeof(feeLineBuffer));
		toString(feeLineBuffer, transaction.fee, currencyInformation.fractionalDigits);
		
		strcat(feeLineBuffer, " ");
		strcat(feeLineBuffer, currencyInformation.abbreviation);

		// Show finalize transaction menu
		showMenu(FINALIZE_TRANSACTION_MENU);
		
		// Set response flags to send response later
		*responseFlags |= IO_ASYNCH_REPLY;
	}
	
	// Otherwise
	else {
	
		// Check if a kernel commitment is provided
		if(dataLength == NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE) {
		
			// Check if a transaction address doesn't exist
			if(!transaction.addressLength) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Get kernel commitment from data
			uint8_t *kernelCommitment = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength];
			
			// Check if kernel commitment is invalid
			if(!isValidCommitment(kernelCommitment)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		}
	
		// Otherwise check if data is invalid
		else if(dataLength != NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	
		// Process finish transaction user interaction
		processFinishTransactionUserInteraction(responseLength);
	}
}

// Process finish transaction user interaction
void processFinishTransactionUserInteraction(unsigned short *responseLength) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];
	
	// Get address type from first parameter
	const enum AddressType addressType = firstParameter;
	
	// Get secret nonce from data
	uint8_t *secretNonce = data;
	
	// Get public nonce from data
	const uint8_t *publicNonce = &data[NONCE_SIZE];
	
	// Get public key from data
	const uint8_t *publicKey = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Get kernel features from data
	const enum KernelFeatures kernelFeatures = data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];
	
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
				uint8_t *lockHeight = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)];
				
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
				
				// Get relative height from data
				uint8_t *relativeHeight = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)];
				
				// Convert relative height to big endian
				swapEndianness(relativeHeight, sizeof(uint64_t));
				
				// Append relative height to the kernel data
				memcpy(&kernelData[sizeof(kernelData[0]) + sizeof(transaction.fee)], relativeHeight, sizeof(uint64_t));
			}
			
			// Break
			break;
	};

	// Get message from the kernel data
	uint8_t message[SINGLE_SIGNER_MESSAGE_SIZE];
	getBlake2b(message, sizeof(message), kernelData, kernelDataLength, NULL, 0);
	
	// Initialize signature
	uint8_t signature[SINGLE_SIGNER_COMPACT_SIGNATURE_SIZE];

	// Create single-signer signature from the message, private key, secret nonce, public nonce if used, and public key
	createSingleSignerSignature(signature, message, (uint8_t *)transaction.blindingFactor, secretNonce, publicNonce, publicKey);
	
	// Initialize payment proof
	volatile uint8_t *paymentProof;
	
	// Initialize payment proof length
	volatile size_t paymentProofLength = 0;
	
	// Check if transaction is receiving and a kernel commitment is provided
	if(transaction.receive && dataLength == NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE) {
	
		// Get kernel commitment from data
		const uint8_t *kernelCommitment = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength];
		
		// Get payment proof message
		uint8_t paymentProofMessage[getPaymentProofMessageLength(transaction.receive, transaction.addressLength)];
		
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
							// Get address public key from the address private key
							cx_ecfp_public_key_t addressPublicKey;
							cx_ecfp_generate_pair(CX_CURVE_SECP256K1, &addressPublicKey, (cx_ecfp_private_key_t *)&addressPrivateKey, KEEP_PRIVATE_KEY);
							
							// Check if the address public key is in the payment proof message
							if(memmem(paymentProofMessage, sizeof(paymentProofMessage), addressPublicKey.W, addressPublicKey.W_len)) {
							
								// Throw internal error error
								THROW(INTERNAL_ERROR_ERROR);
							}
							
							// Compress the address public key
							addressPublicKey.W[0] = (addressPublicKey.W[addressPublicKey.W_len - 1] & 1) ? ODD_COMPRESSED_PUBLIC_KEY_PREFIX : EVEN_COMPRESSED_PUBLIC_KEY_PREFIX;
							
							// Check if the compressed address public key is in the payment proof message
							if(memmem(paymentProofMessage, sizeof(paymentProofMessage), addressPublicKey.W, COMPRESSED_PUBLIC_KEY_SIZE)) {
							
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
						cx_hash_sha256(paymentProofMessage, sizeof(paymentProofMessage), hash, sizeof(hash));
				
						// Get signature of the hash
						paymentProofLength = cx_ecdsa_sign((cx_ecfp_private_key_t *)&addressPrivateKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, hash, sizeof(hash), (uint8_t *)paymentProof, paymentProofLength, NULL);
					
						// Break
						break;
					
					// Tor or Slatepack address type
					case TOR_ADDRESS_TYPE:
					case SLATEPACK_ADDRESS_TYPE:
					
						// Get address private key
						getAddressPrivateKey(&addressPrivateKey, transaction.account, transaction.index, CX_CURVE_Ed25519);
						
						{
							// Get address public key from address private key
							cx_ecfp_public_key_t addressPublicKey;
							cx_ecfp_generate_pair(CX_CURVE_Ed25519, &addressPublicKey, (cx_ecfp_private_key_t *)&addressPrivateKey, KEEP_PRIVATE_KEY);
							
							// Compress the address public key
							cx_edwards_compress_point(CX_CURVE_Ed25519, addressPublicKey.W, addressPublicKey.W_len);
							
							// Check if the address public key is in the payment proof message
							if(memmem(paymentProofMessage, sizeof(paymentProofMessage), &addressPublicKey.W[PUBLIC_KEY_PREFIX_SIZE], ED25519_PUBLIC_KEY_SIZE)) {
							
								// Throw internal error error
								THROW(INTERNAL_ERROR_ERROR);
							}
						}
						
						// Set payment proof length
						paymentProofLength = ED25519_SIGNATURE_SIZE;
						
						// Allocate memory for the payment proof
						paymentProof = alloca(paymentProofLength);
					
						// Get signature of the payment proof message
						cx_eddsa_sign((cx_ecfp_private_key_t *)&addressPrivateKey, CX_LAST, CX_SHA512, paymentProofMessage, sizeof(paymentProofMessage), NULL, 0, (uint8_t *)paymentProof, paymentProofLength, NULL);
					
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
	
	// Append signature and payment proof to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)signature, sizeof(signature));
	
	*responseLength += sizeof(signature);
	
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)paymentProof, paymentProofLength);
	
	*responseLength += paymentProofLength;
	
	// Reset the transaction
	resetTransaction();

	// Throw success
	THROW(SWO_SUCCESS);
}
