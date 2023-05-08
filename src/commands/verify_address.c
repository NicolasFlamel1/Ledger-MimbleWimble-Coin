// Header files
#include <alloca.h>
#include <string.h>
#include "../common.h"
#include "../currency_information.h"
#include "../menus.h"
#include "../mqs.h"
#include "../slatepack.h"
#include "../tor.h"
#include "verify_address.h"


// Supporting function implementation

// Process verify address request
void processVerifyAddressRequest(__attribute__((unused)) const unsigned short *responseLength, unsigned char *responseFlags) {

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
		
			// Check if currency doesn't allow MQS addresses
			if(!currencyInformation->enableMqsAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Check if has BAGL
			#ifdef HAVE_BAGL
			
				// Set verify address, approve transaction, or sign challenge line buffer
				explicit_bzero(verifyAddressApproveTransactionOrSignChallengeLineBuffer, sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer));
				strncpy(verifyAddressApproveTransactionOrSignChallengeLineBuffer, "Verify ", sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - sizeof((char)'\0'));
				strncat(verifyAddressApproveTransactionOrSignChallengeLineBuffer, currencyInformation->mqsName, sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - strlen(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - sizeof((char)'\0'));
			
			// Otherwise check if has NBGL
			#elif defined HAVE_NBGL
			
				// Set verify address, approve transaction, or sign challenge line buffer
				explicit_bzero(verifyAddressApproveTransactionOrSignChallengeLineBuffer, sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer));
				strncpy(verifyAddressApproveTransactionOrSignChallengeLineBuffer, "Verify ", sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - sizeof((char)'\0'));
				strncat(verifyAddressApproveTransactionOrSignChallengeLineBuffer, currencyInformation->mqsName, sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - strlen(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - sizeof((char)'\0'));
				strncat(verifyAddressApproveTransactionOrSignChallengeLineBuffer, "\naddress", sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - strlen(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - sizeof((char)'\0'));
				
				// Set succeeded line buffer
				explicit_bzero(succeededLineBuffer, sizeof(succeededLineBuffer));
				strncpy(succeededLineBuffer, currencyInformation->mqsName, sizeof(succeededLineBuffer) - sizeof((char)'\0'));
				strncat(succeededLineBuffer, " ADDRESS\nVERIFIED", sizeof(succeededLineBuffer) - strlen(succeededLineBuffer) - sizeof((char)'\0'));
				
				upperCaseText(succeededLineBuffer, strlen(succeededLineBuffer));
				
				// Set failed line buffer
				explicit_bzero(failedLineBuffer, sizeof(failedLineBuffer));
				strncpy(failedLineBuffer, "Verifying ", sizeof(failedLineBuffer) - sizeof((char)'\0'));
				strncat(failedLineBuffer, currencyInformation->mqsName, sizeof(failedLineBuffer) - strlen(failedLineBuffer) - sizeof((char)'\0'));
				strncat(failedLineBuffer, "\naddress failed", sizeof(failedLineBuffer) - strlen(failedLineBuffer) - sizeof((char)'\0'));
				
				// Set canceled line buffer
				explicit_bzero(canceledLineBuffer, sizeof(canceledLineBuffer));
				strncpy(canceledLineBuffer, "Verifying ", sizeof(canceledLineBuffer) - sizeof((char)'\0'));
				strncat(canceledLineBuffer, currencyInformation->mqsName, sizeof(canceledLineBuffer) - strlen(canceledLineBuffer) - sizeof((char)'\0'));
				strncat(canceledLineBuffer, "\naddress canceled", sizeof(canceledLineBuffer) - strlen(canceledLineBuffer) - sizeof((char)'\0'));
			#endif
			
			// Set amount or address type line buffer
			explicit_bzero(amountOrAddressTypeLineBuffer, sizeof(amountOrAddressTypeLineBuffer));
			strncpy(amountOrAddressTypeLineBuffer, currencyInformation->mqsName, sizeof(amountOrAddressTypeLineBuffer) - sizeof((char)'\0'));
			strncat(amountOrAddressTypeLineBuffer, " Address", sizeof(amountOrAddressTypeLineBuffer) - strlen(amountOrAddressTypeLineBuffer) - sizeof((char)'\0'));
			
			// Get MQS address
			char mqsAddress[MQS_ADDRESS_SIZE];
			getMqsAddress(mqsAddress, account, index);
			
			// Copy MQS address into the public key or address line buffer
			memcpy((char *)publicKeyOrAddressLineBuffer, mqsAddress, sizeof(mqsAddress));
			publicKeyOrAddressLineBuffer[sizeof(mqsAddress)] = '\0';
		
			// Break
			break;
		
		// Tor address type
		case TOR_ADDRESS_TYPE:
		
			// Check if currency doesn't allow Tor addresses
			if(!currencyInformation->enableTorAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Check if has BAGL
			#ifdef HAVE_BAGL
		
				// Set verify address, approve transaction, or sign challenge line buffer
				explicit_bzero(verifyAddressApproveTransactionOrSignChallengeLineBuffer, sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer));
				strncpy(verifyAddressApproveTransactionOrSignChallengeLineBuffer, "Verify Tor", sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - sizeof((char)'\0'));
			
			// Otherwise check if has NBGL
			#elif defined HAVE_NBGL
			
				// Set verify address, approve transaction, or sign challenge line buffer
				explicit_bzero(verifyAddressApproveTransactionOrSignChallengeLineBuffer, sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer));
				strncpy(verifyAddressApproveTransactionOrSignChallengeLineBuffer, "Verify Tor\naddress", sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - sizeof((char)'\0'));
				
				// Set succeeded line buffer
				explicit_bzero(succeededLineBuffer, sizeof(succeededLineBuffer));
				strncpy(succeededLineBuffer, "TOR ADDRESS\nVERIFIED", sizeof(succeededLineBuffer) - sizeof((char)'\0'));
				
				// Set failed line buffer
				explicit_bzero(failedLineBuffer, sizeof(failedLineBuffer));
				strncpy(failedLineBuffer, "Verifying Tor address\nfailed", sizeof(failedLineBuffer) - sizeof((char)'\0'));
				
				// Set canceled line buffer
				explicit_bzero(canceledLineBuffer, sizeof(canceledLineBuffer));
				strncpy(canceledLineBuffer, "Verifying Tor address\ncanceled", sizeof(canceledLineBuffer) - sizeof((char)'\0'));
			#endif
			
			// Set amount or address type line buffer
			explicit_bzero(amountOrAddressTypeLineBuffer, sizeof(amountOrAddressTypeLineBuffer));
			strncpy(amountOrAddressTypeLineBuffer, "Tor Address", sizeof(amountOrAddressTypeLineBuffer) - sizeof((char)'\0'));
			
			// Get Tor address
			char torAddress[TOR_ADDRESS_SIZE];
			getTorAddress(torAddress, account, index);
			
			// Copy Tor address into the public key or address line buffer
			memcpy((char *)publicKeyOrAddressLineBuffer, torAddress, sizeof(torAddress));
			publicKeyOrAddressLineBuffer[sizeof(torAddress)] = '\0';
			
			// Break
			break;
		
		// Slatepack address type
		case SLATEPACK_ADDRESS_TYPE:
		
			// Check if currency doesn't allow Slatepack addresses
			if(!currencyInformation->enableSlatepackAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Check if has BAGL
			#ifdef HAVE_BAGL
			
				// Set verify address, approve transaction, or sign challenge line buffer
				explicit_bzero(verifyAddressApproveTransactionOrSignChallengeLineBuffer, sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer));
				strncpy(verifyAddressApproveTransactionOrSignChallengeLineBuffer, "Verify Slatepack", sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - sizeof((char)'\0'));
			
			// Otherwise check if has NBGL
			#elif defined HAVE_NBGL
			
				// Set verify address, approve transaction, or sign challenge line buffer
				explicit_bzero(verifyAddressApproveTransactionOrSignChallengeLineBuffer, sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer));
				strncpy(verifyAddressApproveTransactionOrSignChallengeLineBuffer, "Verify Slatepack\naddress", sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer) - sizeof((char)'\0'));
				
				// Set succeeded line buffer
				explicit_bzero(succeededLineBuffer, sizeof(succeededLineBuffer));
				strncpy(succeededLineBuffer, "SLATEPACK\nADDRESS VERIFIED", sizeof(succeededLineBuffer) - sizeof((char)'\0'));
				
				// Set failed line buffer
				explicit_bzero(failedLineBuffer, sizeof(failedLineBuffer));
				strncpy(failedLineBuffer, "Verifying Slatepack\naddress failed", sizeof(failedLineBuffer) - sizeof((char)'\0'));
				
				// Set canceled line buffer
				explicit_bzero(canceledLineBuffer, sizeof(canceledLineBuffer));
				strncpy(canceledLineBuffer, "Verifying Slatepack\naddress canceled", sizeof(canceledLineBuffer) - sizeof((char)'\0'));
			#endif
			
			// Set amount or address type line buffer
			explicit_bzero(amountOrAddressTypeLineBuffer, sizeof(amountOrAddressTypeLineBuffer));
			strncpy(amountOrAddressTypeLineBuffer, "Slatepack Address", sizeof(amountOrAddressTypeLineBuffer) - sizeof((char)'\0'));
			
			{
				// Get Slatepack address length
				const size_t slatepackAddressLength = SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation->slatepackAddressHumanReadablePart);
				
				// Get Slatepack address
				char *slatepackAddress = alloca(slatepackAddressLength);
				getSlatepackAddress(slatepackAddress, account, index);
				
				// Copy Slatepack address into the public key or address line buffer
				memcpy((char *)publicKeyOrAddressLineBuffer, slatepackAddress, slatepackAddressLength);
				publicKeyOrAddressLineBuffer[slatepackAddressLength] = '\0';
			}
			
			// Break
			break;
		
		// Default
		default:
		
			// Throw invalid parameters error
			THROW(INVALID_PARAMETERS_ERROR);
			
			// Break
			break;
	}
	
	// Show verify address menu
	showMenu(VERIFY_ADDRESS_MENU);
	
	// Set response flags to send response later
	*responseFlags |= IO_ASYNCH_REPLY;
}

// Process verify address user interaction
void processVerifyAddressUserInteraction(__attribute__((unused)) const unsigned short *responseLength) {

	// Throw success
	THROW(SWO_SUCCESS);
}
