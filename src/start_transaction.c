// Header files
#include <string.h>
#include "common.h"
#include "currency_information.h"
#include "mqs.h"
#include "start_transaction.h"
#include "transaction.h"


// Supporting function implementation

// Process start transaction request
void processStartTransactionRequest(__attribute__((unused)) unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

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
	if(firstParameter || secondParameter || dataLength < sizeof(uint32_t) + sizeof(uint64_t) + sizeof(uint64_t) + sizeof(uint64_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get transaction's account from data
	memcpy(&transaction.account, data, sizeof(transaction.account));
	
	// Check if account is invalid
	if(transaction.account > MAXIMUM_ACCOUNT) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get transaction's remaining output from data
	memcpy(&transaction.remainingOutput, &data[sizeof(transaction.account)], sizeof(transaction.remainingOutput));
	
	// Get input from data
	uint64_t input;
	memcpy(&input, &data[sizeof(transaction.account) + sizeof(transaction.remainingOutput)], sizeof(input));
	
	// Get transaction's fee from data
	memcpy(&transaction.fee, &data[sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(input)], sizeof(transaction.fee));
	
	// Check if an input exists
	if(input) {
	
		// Check if a receiver address is provided
		if(dataLength != sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(input) + sizeof(transaction.fee)) {
		
			// Get transaction's receiver address length
			transaction.receiverAddressLength = dataLength - (sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(input) + sizeof(transaction.fee));
			
			// Get receiver address from data
			const uint8_t *receiverAddress = &data[sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(input) + sizeof(transaction.fee)];
			
			// Check receiver address length
			switch(transaction.receiverAddressLength) {
			
				// MQS address size
				case MQS_ADDRESS_SIZE:
				
					// Check currency doesn't allow MQS addresses
					if(!currencyInformation.mqsAddressPaymentProofAllowed) {
					
						// Throw invalid parameters error
						THROW(INVALID_PARAMETERS_ERROR);
					}
				
					// Check if receiver address isn't a valid MQS address
					if(!getPublicKeyFromMqsAddress(NULL, receiverAddress, transaction.receiverAddressLength)) {
					
						// Throw invalid parameters error
						THROW(INVALID_PARAMETERS_ERROR);
					}
				
					// Break
					break;
				
				// Tor address size
				case TOR_ADDRESS_SIZE:
				
					// Check currency doesn't allow Tor addresses
					if(!currencyInformation.torAddressPaymentProofAllowed) {
					
						// Throw invalid parameters error
						THROW(INVALID_PARAMETERS_ERROR);
					}
				
					// Check if receiver address isn't a valid Tor address
					if(!getPublicKeyFromTorAddress(NULL, receiverAddress, transaction.receiverAddressLength)) {
					
						// Throw invalid parameters error
						THROW(INVALID_PARAMETERS_ERROR);
					}
				
					// Break
					break;
				
				// Ed25519 public key size
				case ED25519_PUBLIC_KEY_SIZE:
				
					// Check currency doesn't allow Ed25519 addresses
					if(!currencyInformation.ed25519AddressPaymentProofAllowed) {
					
						// Throw invalid parameters error
						THROW(INVALID_PARAMETERS_ERROR);
					}
				
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
			
			// Set transaction's receiver address
			memcpy(transaction.receiverAddress, receiverAddress, transaction.receiverAddressLength);
		}
	
		// Check if input is invalid
		if(input <= transaction.remainingOutput) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	
		// Check if fee is invalid or will overflow
		if(!transaction.fee || UINT64_MAX - input < transaction.fee) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
		
		// Set transaction's remaining input
		transaction.remainingInput = input + transaction.fee;
		
		// Set transaction's send
		transaction.send = input - transaction.remainingOutput;
	}
	
	// Otherwise
	else {
	
		// Check if data is invalid
		if(dataLength != sizeof(transaction.account) + sizeof(transaction.remainingOutput) + sizeof(input) + sizeof(transaction.fee)) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
		
		// Check if remaining output is invalid
		if(!transaction.remainingOutput) {
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
		}
	}
	
	// Set that transaction has been started
	transaction.started = true;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
