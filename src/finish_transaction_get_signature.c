// Header files
#include <alloca.h>
#include <string.h>
#include "blake2b.h"
#include "common.h"
#include "crypto.h"
#include "finish_transaction_get_signature.h"
#include "transaction.h"


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

// Process finish transaction get signature request
void processFinishTransactionGetSignatureRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength < COMPRESSED_PUBLIC_KEY_SIZE + sizeof(uint8_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get public key from data
	const uint8_t *publicKey = data;
	
	// Get kernel features from data
	const enum KernelFeatures kernelFeatures = data[COMPRESSED_PUBLIC_KEY_SIZE];
	
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
			
			// Check if data is invalid
			if(dataLength != COMPRESSED_PUBLIC_KEY_SIZE + kernelDataLength) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Allocate memory for kernel data
			kernelData = alloca(kernelDataLength);
			
			// Set kernel features in the kernel data
			kernelData[0] = kernelFeatures;
			
			{
				// Get fee from data
				uint64_t *fee = (uint64_t *)&data[sizeof(uint8_t)];
				
				// Convert fee to big endian
				swapEndianness((uint8_t *)fee, sizeof(*fee));
				
				// Append fee to the kernel data
				memcpy(&kernelData[sizeof(kernelData[0])], fee, sizeof(*fee));
			}
		
			// Break
			break;
		
		// Coinbase features
		case COINBASE_FEATURES:
		
			// Set kernel data length
			kernelDataLength = sizeof(uint8_t);
			
			// Check if data is invalid
			if(dataLength != COMPRESSED_PUBLIC_KEY_SIZE + kernelDataLength) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
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
			
			// Check if data is invalid
			if(dataLength != COMPRESSED_PUBLIC_KEY_SIZE + kernelDataLength) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Allocate memory for kernel data
			kernelData = alloca(kernelDataLength);
			
			// Set kernel features in the kernel data
			kernelData[0] = kernelFeatures;
			
			{
				// Get fee from data
				uint64_t *fee = (uint64_t *)&data[sizeof(uint8_t)];
				
				// Convert fee to big endian
				swapEndianness((uint8_t *)fee, sizeof(*fee));
				
				// Append fee to the kernel data
				memcpy(&kernelData[sizeof(kernelData[0])], fee, sizeof(*fee));
				
				// Get lock height from data
				uint64_t *lockHeight = (uint64_t *)&data[sizeof(uint8_t) + sizeof(*fee)];
				
				// Convert lock height to big endian
				swapEndianness((uint8_t *)lockHeight, sizeof(*lockHeight));
				
				// Append lock height to the kernel data
				memcpy(&kernelData[sizeof(kernelData[0]) + sizeof(*fee)], lockHeight, sizeof(*lockHeight));
			}
			
			// Break
			break;
		
		// No recent duplicate features
		case NO_RECENT_DUPLICATE_FEATURES:
		
			// Set kernel data length
			kernelDataLength = sizeof(uint8_t) + sizeof(uint64_t) + sizeof(uint64_t);
			
			// Check if data is invalid
			if(dataLength != COMPRESSED_PUBLIC_KEY_SIZE + kernelDataLength) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Allocate memory for kernel data
			kernelData = alloca(kernelDataLength);
			
			// Set kernel features in the kernel data
			kernelData[0] = kernelFeatures;
			
			{
				// Get fee from data
				uint64_t *fee = (uint64_t *)&data[sizeof(uint8_t)];
				
				// Convert fee to big endian
				swapEndianness((uint8_t *)fee, sizeof(*fee));
				
				// Append fee to the kernel data
				memcpy(&kernelData[sizeof(kernelData[0])], fee, sizeof(*fee));
				
				// Get relative height from data
				uint64_t *relativeHeight = (uint64_t *)&data[sizeof(uint8_t) + sizeof(*fee)];
				
				// Convert relative height to big endian
				swapEndianness((uint8_t *)relativeHeight, sizeof(*relativeHeight));
				
				// Append relative height to the kernel data
				memcpy(&kernelData[sizeof(kernelData[0]) + sizeof(*fee)], relativeHeight, sizeof(*relativeHeight));
			}
			
			// Break
			break;
		
		// Default
		default:
		
			// Throw invalid state error
			THROW(INVALID_STATE_ERROR);
	};
	
	// Check if transaction hasn't been started
	if(!transaction.started) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
	// Check if transaction isn't finished
	if(transaction.outputValue || transaction.inputValue) {
	
		// Throw invalid state error
		THROW(INVALID_STATE_ERROR);
	}
	
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
			
			// Create single-signer signature from the message, private key, and public key
			createSingleSignerSignature(signature, message, (cx_ecfp_private_key_t *)&privateKey, publicKey);
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
