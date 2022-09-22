// Header files
#include <string.h>
#include "common.h"
#include "currency_information.h"
#include "menus.h"
#include "mqs.h"
#include "slatepack.h"
#include "tor.h"
#include "verify_address.h"


// Supporting function implementation

// Process verify address request
void processVerifyAddressRequest(__attribute__((unused)) unsigned short *responseLength, unsigned char *responseFlags) {

	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(secondParameter || dataLength != sizeof(uint32_t) + sizeof(uint32_t)) {
	
		// Throw invalid parameters error
		THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Get address type from first parameter
	const enum AddressType addressType = firstParameter;
	
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
	
	// Check address type
	switch(addressType) {
		
		// MQS address type
		case MQS_ADDRESS_TYPE:
		
			// Check currency doesn't allow MQS addresses
			if(!currencyInformation.enableMqsAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set verify address or approve transaction line buffer
			strcpy(verifyAddressOrApproveTransactionLineBuffer, "Verify MQS");
			
			// Set address type line buffer
			strcpy(addressTypeLineBuffer, "MQS Address");
			
			// Get MQS address
			char mqsAddress[MQS_ADDRESS_SIZE];
			getMqsAddress(mqsAddress, account, index);
			
			// Copy MQS address into the public key or address line buffer
			memcpy(publicKeyOrAddressLineBuffer, mqsAddress, sizeof(mqsAddress));
			publicKeyOrAddressLineBuffer[sizeof(mqsAddress)] = '\0';
		
			// Break
			break;
		
		// Tor address type
		case TOR_ADDRESS_TYPE:
		
			// Check currency doesn't allow Tor addresses
			if(!currencyInformation.enableTorAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Set verify address or approve transaction line buffer
			strcpy(verifyAddressOrApproveTransactionLineBuffer, "Verify Tor");
			
			// Set address type line buffer
			strcpy(addressTypeLineBuffer, "Tor Address");
			
			// Get Tor address
			char torAddress[TOR_ADDRESS_SIZE];
			getTorAddress(torAddress, account, index);
			
			// Copy Tor address into the public key or address line buffer
			memcpy(publicKeyOrAddressLineBuffer, torAddress, sizeof(torAddress));
			publicKeyOrAddressLineBuffer[sizeof(torAddress)] = '\0';
			
			// Break
			break;
		
		// Slatepack address type
		case SLATEPACK_ADDRESS_TYPE:
		
			// Check currency doesn't allow Slatepack addresses
			if(!currencyInformation.enableSlatepackAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set verify address or approve transaction line buffer
			strcpy(verifyAddressOrApproveTransactionLineBuffer, "Verify Slatepack");
			
			// Set address type line buffer
			strcpy(addressTypeLineBuffer, "Slatepack Address");
			
			{
				// Get Slatepack address
				char slatepackAddress[SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart)];
				getSlatepackAddress(slatepackAddress, account, index);
				
				// Copy Slatepack address into the public key or address line buffer
				memcpy(publicKeyOrAddressLineBuffer, slatepackAddress, sizeof(slatepackAddress));
				publicKeyOrAddressLineBuffer[sizeof(slatepackAddress)] = '\0';
			}
			
			// Break
			break;
		
		// Default
		default:
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
	}
	
	// Show verify address menu
	showMenu(VERIFY_ADDRESS_MENU);
	
	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process verify address user interaction
void processVerifyAddressUserInteraction(__attribute__((unused)) unsigned short *responseLength) {

	// Throw success
	THROW(SWO_SUCCESS);
}
