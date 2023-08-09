// Header files
#include <string.h>
#include <os_io_seproxyhal.h>
#include "common.h"
#include "crypto.h"
#include "get_bulletproof_components.h"
#include "menus.h"


// Definitions

// Proof message switch type index
#define PROOF_MESSAGE_SWITCH_TYPE_INDEX 2

// Proof message identifier index
#define PROOF_MESSAGE_IDENTIFIER_INDEX 3

// Tau x size
#define TAU_X_SIZE 32


// Constants

// Message type
enum MessageType {

	// Sending transaction message type
	SENDING_TRANSACTION_MESSAGE_TYPE,
	
	// Receiving transaction message type
	RECEIVING_TRANSACTION_MESSAGE_TYPE,
	
	// Creating coinbase message type
	CREATING_COINBASE_MESSAGE_TYPE
};


// Supporting function implementation

// Process get bulletproof components request
void processGetBulletproofComponentsRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(secondParameter || dataLength != sizeof(uint32_t) + IDENTIFIER_SIZE + sizeof(uint64_t) + sizeof(uint8_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get message type from first parameter
	const enum MessageType messageType = firstParameter;
	
	// Check message type
	switch(messageType) {
	
		// Sending transaction message type
		case SENDING_TRANSACTION_MESSAGE_TYPE:
		
			// Set time or processing menu line buffer
			strcpy(timeOrProcessingMessageLineBuffer, "Sending Transaction");
			
			// Break
			break;
		
		// Receiving transaction message type
		case RECEIVING_TRANSACTION_MESSAGE_TYPE:
		
			// Set time or processing menu line buffer
			strcpy(timeOrProcessingMessageLineBuffer, "Receiving Transaction");
			
			// Break
			break;
		
		// Creating coinbase message type
		case CREATING_COINBASE_MESSAGE_TYPE:
		
			// Set time or processing menu line buffer
			strcpy(timeOrProcessingMessageLineBuffer, "Creating Coinbase");
			
			// Break
			break;
		
		// Default
		default:
		
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
	
	// Get identifer depth from data
	const uint8_t identifierDepth = data[sizeof(account)];
	
	// Check if identifier depth is invalid
	if(identifierDepth > IDENTIFIER_MAXIMUM_DEPTH) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get identifier path from data
	uint32_t identifierPath[IDENTIFIER_MAXIMUM_DEPTH];
	memcpy(identifierPath, &data[sizeof(account) + sizeof(identifierDepth)], sizeof(identifierPath));
	
	// Go through all parts in the identifier path
	for(size_t i = 0; i < ARRAYLEN(identifierPath); ++i) {
	
		// Convert part from big endian to little endian
		identifierPath[i] = os_swap_u32(identifierPath[i]);
	}
	
	// Get value from data
	uint64_t value;
	memcpy(&value, &data[sizeof(account) + IDENTIFIER_SIZE], sizeof(value));
	
	// Check if value is invalid
	if(!value) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get switch type from data
	const enum SwitchType switchType = data[sizeof(account) + IDENTIFIER_SIZE + sizeof(uint64_t)];
	
	// Check if switch type is invalid
	if(switchType > REGULAR_SWITCH_TYPE) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Initialize proof message
	uint8_t proofMessage[PROOF_MESSAGE_SIZE] = {
	
		// Switch type
		[PROOF_MESSAGE_SWITCH_TYPE_INDEX] = switchType,
		
		// Identifier depth
		[PROOF_MESSAGE_IDENTIFIER_INDEX] = identifierDepth
	};
	
	// Set proof message's identifier value
	memcpy(&proofMessage[PROOF_MESSAGE_IDENTIFIER_INDEX + sizeof(identifierDepth)], &data[sizeof(account) + sizeof(identifierDepth)], IDENTIFIER_SIZE - sizeof(identifierDepth));
	
	// Initialize blinding factor
	volatile uint8_t blindingFactor[BLINDING_FACTOR_SIZE];
	
	// Initialize private nonce
	volatile uint8_t privateNonce[NONCE_SIZE];
	
	// Initialize rewind nonce
	volatile uint8_t rewindNonce[NONCE_SIZE];
	
	// Initialize bulletproof tau x
	volatile uint8_t bulletproofTauX[TAU_X_SIZE];
	
	// Initialize bulletproof t one and t two
	volatile uint8_t bulletproofTOne[COMPRESSED_PUBLIC_KEY_SIZE];
	volatile uint8_t bulletproofTTwo[COMPRESSED_PUBLIC_KEY_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Show processing menu
			showMenu(PROCESSING_MENU);
			
			// Wait for display to update
			UX_WAIT_DISPLAYED();
	
			// Derive blinding factor
			deriveBlindingFactor(blindingFactor, account, value, identifierPath, identifierDepth, switchType);
			
			// Commit value with the blinding factor
			uint8_t commitment[UNCOMPRESSED_PUBLIC_KEY_SIZE];
			commitValue(commitment, value, (uint8_t *)blindingFactor, false);
			
			// Get rewind nonce
			getRewindNonce(rewindNonce, account, commitment);
			
			// Get private nonce
			getPrivateNonce(privateNonce, account, commitment);
			
			// Calculate bulletproof components
			calculateBulletproofComponents(bulletproofTauX, bulletproofTOne, bulletproofTTwo, value, (uint8_t *)blindingFactor, commitment, (uint8_t *)rewindNonce, (uint8_t *)privateNonce, proofMessage);
		}
		
		// Finally
		FINALLY {
		
			// Show main menu
			showMainMenu();
		
			// Clear the blinding factor
			explicit_bzero((uint8_t *)blindingFactor, sizeof(blindingFactor));
			
			// Clear the private nonce
			explicit_bzero((uint8_t *)rewindNonce, sizeof(rewindNonce));
			
			// Clear the private nonce
			explicit_bzero((uint8_t *)privateNonce, sizeof(privateNonce));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the bulletproof tau x, t one, and t two will overflow
	if(willResponseOverflow(*responseLength, sizeof(bulletproofTauX) + sizeof(bulletproofTOne) + sizeof(bulletproofTTwo))) {
	
		// Throw length error
		THROW(LENGTH_ERROR);
	}

	// Append bulletproof tau x, t one, and t two to response
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)bulletproofTauX, sizeof(bulletproofTauX));
	
	*responseLength += sizeof(bulletproofTauX);
	
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)bulletproofTOne, sizeof(bulletproofTOne));
	
	*responseLength += sizeof(bulletproofTOne);
	
	memcpy(&G_io_apdu_buffer[*responseLength], (uint8_t *)bulletproofTTwo, sizeof(bulletproofTTwo));
	
	*responseLength += sizeof(bulletproofTTwo);
	
	// Throw success
	THROW(SWO_SUCCESS);
}

