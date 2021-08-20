// Header files
#include <string.h>
#include "common.h"
#include "currency_information.h"
#include "mqs.h"
#include "start_transaction.h"
#include "transaction.h"


// Supporting function implementation

// Process start transaction request
void processStartTransactionRequest(unsigned short *responseLength, unsigned char *responseFlags) {

	// Reset the transaction
	resetTransaction();

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter > TESTNET_NETWORK_TYPE || secondParameter || dataLength < sizeof(uint32_t) + sizeof(uint64_t) + sizeof(uint64_t) + sizeof(uint64_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get network type from first parameter
	const enum NetworkType networkType = firstParameter;
	
	// Get transaction's account from data
	transaction.account = *(uint32_t *)data;
	
	// Check if account is invalid
	if(transaction.account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get transaction's remaining output from data
	transaction.remainingOutput = *(uint64_t *)&data[sizeof(transaction.account)];
	
	// Get input from data
	const uint64_t *input = (uint64_t *)&data[sizeof(transaction.account) + sizeof(transaction.remainingOutput)];
	
	// Get transaction's fee from data
	transaction.fee = *(uint64_t *)&data[sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(*input)];
	
	// Check if remaining output and input are invalid
	if(!transaction.remainingOutput && !*input) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Check if an input exists
	if(*input) {
	
		// Check if a receiver address is provided
		if(dataLength != sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(*input) + sizeof(transaction.fee)) {
		
			// Get transaction's receiver address length
			transaction.receiverAddressLength = dataLength - (sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(*input) + sizeof(transaction.fee));
			
			// Get receiver address from data
			const uint8_t *receiverAddress = &data[sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(*input) + sizeof(transaction.fee)];
			
			// Check currency information ID
			switch(currencyInformation.id) {
			
				// MimbleWimble Coin ID
				case MIMBLEWIMBLE_COIN_ID:
			
					// Check receiver address length
					switch(transaction.receiverAddressLength) {
					
						// MQS address size
						case MQS_ADDRESS_SIZE:
						
							// Check if receiver address isn't a valid MQS address
							if(!getPublicKeyFromMqsAddress(NULL, receiverAddress, transaction.receiverAddressLength, networkType)) {
							
								// Throw invalid parameters error
								THROW(INVALID_PARAMETERS_ERROR);
							}
						
							// Break
							break;
						
						// Tor address size
						case TOR_ADDRESS_SIZE:
						
							// Check if receiver address isn't a valid Tor address
							if(!getPublicKeyFromTorAddress(NULL, receiverAddress, transaction.receiverAddressLength)) {
							
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
					
					// Break
					break;
				
				// Grin ID
				case GRIN_ID:
				
					// Check receiver address length
					switch(transaction.receiverAddressLength) {
					
						// Ed25519 public key size
						case ED25519_PUBLIC_KEY_SIZE:
						
							// Check if the receiver address isn't a valid Ed25519 public key
							if(!isValidEd25519PublicKey(receiverAddress, transaction.receiverAddressLength)) {
							
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
					
					// Break
					break;
				
				// Default
				default:
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set transaction's receiver address
			memcpy(transaction.receiverAddress, &data[sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(*input) + sizeof(transaction.fee)], transaction.receiverAddressLength);
		}
	
		// Check if input is invalid
		if(*input <= transaction.remainingOutput) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	
		// Check if fee is invalid or will overflow
		if(!transaction.fee || UINT64_MAX - *input < transaction.fee) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
		
		// Set transaction's remaining input
		transaction.remainingInput = *input + transaction.fee;
		
		// Set transaction's send
		transaction.send = *input - transaction.remainingOutput;
	}
	
	// Otherwise check if data is invalid
	else if(dataLength != sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(*input) + sizeof(transaction.fee)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Set that transaction has been started
	transaction.started = true;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
