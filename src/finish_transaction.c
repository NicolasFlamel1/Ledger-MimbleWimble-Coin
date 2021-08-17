// Header files
#include <alloca.h>
#include <string.h>
#include "blake2b.h"
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "finish_transaction.h"
#include "menus.h"
#include "mqs.h"
#include "transaction.h"
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

// Address type
enum AddressType {

	// Tor address type
	TOR_ADDRESS_TYPE,
	
	// MQS address type
	MQS_ADDRESS_TYPE
};


// Supporting function implementation

// Process finish transaction request
void processFinishTransactionRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];
	
	// Check if parameters or data are invalid
	if(firstParameter > TESTNET_NETWORK_TYPE || dataLength < NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get network type from first parameter
	const enum NetworkType networkType = firstParameter;
	
	// Get address type from second parameter
	const enum AddressType addressType = secondParameter;
	
	// Check currency information ID
	switch(currencyInformation.id) {
	
		// MimbleWimble Coin ID
		case MIMBLEWIMBLE_COIN_ID:
		
			// Check address type
			switch(addressType) {
			
				// MQS address type or Tor address type
				case MQS_ADDRESS_TYPE:
				case TOR_ADDRESS_TYPE:
				
					// Break
					break;
				
				// Default
				default:
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Break
			break;
		
		// Grin ID
		case GRIN_ID:
		
			// Check address type
			switch(addressType) {
			
				// Tor address type
				case TOR_ADDRESS_TYPE:
		
					// Break
					break;
				
				// Default
				default:
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Break
			break;
	}
	
	// Get public nonce from data
	const uint8_t *publicNonce = &data[NONCE_SIZE];
	
	// Check if public nonce is used
	if(!isZeroArray(publicNonce, COMPRESSED_PUBLIC_KEY_SIZE)) {
	
		// Check if public nonce is invalid
		bool zeroArray;
		if(!isValidSecp256k1PublicKey(publicNonce, COMPRESSED_PUBLIC_KEY_SIZE, &zeroArray)) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
		
		// Check if public nonce as a public key is a zero array
		if(zeroArray) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	}
	
	// Get public key from data
	const uint8_t *publicKey = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Check if public key is invalid
	if(!isValidSecp256k1PublicKey(publicKey, COMPRESSED_PUBLIC_KEY_SIZE, NULL)) {
	
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
	
	// Check if transaction includes input
	if(transaction.input) {
	
		// Check if data is invalid
		if(dataLength < NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
		
		// Check if a payment proof information is provided
		if(dataLength != NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength) {
		
			// Check if data is invalid
			if(dataLength < NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE + sizeof(uint8_t)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Get commitment from data
			const uint8_t *commitment = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength];
			
			// Check if commitment is invalid
			if(!commitmentIsValid(commitment)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Get receiver address type from data
			const enum AddressType receiverAddressType = data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE];
			
			// Check currency information ID
			size_t receiverAddressLength;
			switch(currencyInformation.id) {
			
				// MimbleWimble Coin ID
				case MIMBLEWIMBLE_COIN_ID:
			
					// Check receiver address type
					switch(receiverAddressType) {
					
						// MQS address type
						case MQS_ADDRESS_TYPE:
						
							// Set receiver address
							receiverAddressLength = MQS_ADDRESS_SIZE;
						
							// Break
							break;
						
						// Tor address type
						case TOR_ADDRESS_TYPE:
						
							// Set receiver address
							receiverAddressLength = TOR_ADDRESS_SIZE;
						
							// Break
							break;
						
						// Default
						default:
						
							// Throw invalid parameters error
							THROW(INVALID_PARAMETERS_ERROR);
					}
				
				// Grin ID
				case GRIN_ID:
				
					// Check receiver address type
					switch(receiverAddressType) {
					
						// Tor address type
						case TOR_ADDRESS_TYPE:
						
							// Set receiver address
							receiverAddressLength = ED25519_PUBLIC_KEY_SIZE;
						
							// Break
							break;
						
						// Default
						default:
						
							// Throw invalid parameters error
							THROW(INVALID_PARAMETERS_ERROR);
					}
				
				// Default
				default:
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Check if data is invalid
			if(dataLength <= NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE + sizeof(uint8_t) + receiverAddressLength) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Get receiver address from data
			const uint8_t *receiverAddress = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE + sizeof(uint8_t)];
			
			// Get signature from data
			uint8_t *signature = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE + sizeof(uint8_t) + receiverAddressLength];
			
			// Get signature length
			const size_t signatureLength = dataLength - (NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength + COMMITMENT_SIZE + sizeof(uint8_t) + receiverAddressLength);
			
			// Check currency information ID
			size_t addressLength;
			uint8_t *address;
			switch(currencyInformation.id) {
			
				// MimbleWimble Coin ID
				case MIMBLEWIMBLE_COIN_ID:
				
					// Check address type
					switch(addressType) {
					
						// MQS address type
						case MQS_ADDRESS_TYPE:
						
							// Set address length
							addressLength = MQS_ADDRESS_SIZE;
							
							// Allocate memory for the address
							address = alloca(addressLength);
							
							// Get MQS address
							getMqsAddress(address, transaction.account, networkType);
						
							// Break
							break;
						
						// Tor address type
						case TOR_ADDRESS_TYPE:
						
							// Set address length
							addressLength = TOR_ADDRESS_SIZE;
							
							// Allocate memory for the address
							address = alloca(addressLength);
							
							// Get Tor address
							getTorAddress(address, transaction.account);
						
							// Break
							break;
					}
					
					// Break
					break;
				
				// Grin ID
				case GRIN_ID:
				
					// Check address type
					switch(addressType) {
					
						// Tor address type
						case TOR_ADDRESS_TYPE:
				
							// Set address length
							addressLength = ED25519_PUBLIC_KEY_SIZE;
							
							// Allocate memory for the address
							address = alloca(addressLength);
							
							// Get Ed25519 public key
							getEd25519PublicKey(address, transaction.account);
						
							// Break
							break;
					}
					
					// Break
					break;
			}
			
			// Get payment proof message
			uint8_t paymentProofMessage[getPaymentProofMessageLength(transaction.input, addressLength)];
			getPaymentProofMessage(paymentProofMessage, transaction.input, commitment, address, addressLength, networkType);
			
			// Check if verifying payment proof failed
			if(!verifyPaymentProofMessage(paymentProofMessage, sizeof(paymentProofMessage), receiverAddress, receiverAddressLength, networkType, signature, signatureLength)) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Check currency information ID
			switch(currencyInformation.id) {
			
				// MimbleWimble Coin ID
				case MIMBLEWIMBLE_COIN_ID:
			
					// Copy receiver address into the receiver line buffer
					explicit_bzero(receiverLineBuffer, sizeof(receiverLineBuffer));
					memcpy(receiverLineBuffer, receiverAddress, receiverAddressLength);
					
					// Break
					break;
				
				// Grin ID
				case GRIN_ID:
				
					// Copy receiver address into the receiver line buffer
					explicit_bzero(receiverLineBuffer, sizeof(receiverLineBuffer));
					toHexString(receiverLineBuffer, receiverAddress, receiverAddressLength);
					
					// Break
					break;
			}
		}
		
		// Otherwise
		else {
			
			// Clear receiver line buffer
			explicit_bzero(receiverLineBuffer, sizeof(receiverLineBuffer));
		}
		
		// Check if transaction offset wasn't applied
		if(!transaction.offsetApplied) {
		
			// Throw invalid state error
			THROW(INVALID_STATE_ERROR);
		}
	
		// Copy transaction's input into the amount line buffer
		explicit_bzero(amountLineBuffer, sizeof(amountLineBuffer));
		toString(amountLineBuffer, transaction.input, currencyInformation.fractionalDigits);
		
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
	
		// Check if data is invalid
		if(dataLength != NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + kernelFeaturesLength) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	
		// Process finish transaction user interaction
		processFinishTransactionUserInteraction(responseLength);
	}
}

// Process finish transaction user interaction
void processFinishTransactionUserInteraction(unsigned short *responseLength) {

	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];
	
	// Get secret nonce from data
	const uint8_t *secretNonce = data;
	
	// Get public nonce from data
	const uint8_t *publicNonce = &data[NONCE_SIZE];
	
	// Get public key from data
	const uint8_t *publicKey = &data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Get kernel features from data
	const enum KernelFeatures kernelFeatures = data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Initialize kernel data
	uint8_t *kernelData;
	
	// Initialize kernel data length
	size_t kernelDataLength;
	
	// Check kernel features
	switch(kernelFeatures) {
	
		// Plain features
		case PLAIN_FEATURES:
		
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
				uint64_t *lockHeight = (uint64_t *)&data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)];
				
				// Convert lock height to big endian
				swapEndianness((uint8_t *)lockHeight, sizeof(*lockHeight));
				
				// Append lock height to the kernel data
				memcpy(&kernelData[sizeof(kernelData[0]) + sizeof(transaction.fee)], lockHeight, sizeof(*lockHeight));
			}
			
			// Break
			break;
		
		// No recent duplicate features
		case NO_RECENT_DUPLICATE_FEATURES:
		
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
				uint64_t *relativeHeight = (uint64_t *)&data[NONCE_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)];
				
				// Convert relative height to big endian
				swapEndianness((uint8_t *)relativeHeight, sizeof(*relativeHeight));
				
				// Append relative height to the kernel data
				memcpy(&kernelData[sizeof(kernelData[0]) + sizeof(transaction.fee)], relativeHeight, sizeof(*relativeHeight));
			}
			
			// Break
			break;
	};

	// Get message from the kernel data
	uint8_t message[SINGLE_SIGNER_MESSAGE_SIZE];
	getBlake2b(message, sizeof(message), kernelData, kernelDataLength, NULL, 0);
	
	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;

	// Initialize signature
	volatile uint8_t signature[SINGLE_SIGNER_COMPACT_SIGNATURE_SIZE];

	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Get private key from the transaction's blinding factor
			cx_ecfp_init_private_key(CX_CURVE_SECP256K1, (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor), (cx_ecfp_private_key_t *)&privateKey);
			
			// Create single-signer signature from the message, private key, secret nonce, public nonce if used, and public key
			createSingleSignerSignature(signature, message, (cx_ecfp_private_key_t *)&privateKey, secretNonce, isZeroArray(publicNonce, COMPRESSED_PUBLIC_KEY_SIZE) ? NULL : publicNonce, publicKey);
		}
		
		// Finally
		FINALLY {
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the signature will overflow
	if(willResponseOverflow(*responseLength, sizeof(signature))) {
	
		// Throw length error
		THROW(ERR_APD_LEN);
	}
	
	// Append signature to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)signature, sizeof(signature));
	
	*responseLength += sizeof(signature);
	
	// Reset the transaction
	resetTransaction();

	// Throw success
	THROW(SWO_SUCCESS);
}
