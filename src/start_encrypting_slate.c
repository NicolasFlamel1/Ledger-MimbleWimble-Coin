// Header files
#include <alloca.h>
#include <string.h>
#include "chacha20_poly1305.h"
#include "common.h"
#include "crypto.h"
#include "currency_information.h"
#include "mqs.h"
#include "slate.h"
#include "slatepack.h"
#include "start_encrypting_slate.h"
#include "tor.h"


// Supporting function implementation

// Process start encrypting slate request
void processStartEncryptingSlateRequest(unsigned short *responseLength, __attribute__((unused)) unsigned char *responseFlags) {
	
	// Reset the slate
	resetSlate();
	
	// Get request's first parameter
	const uint8_t firstParameter = G_io_apdu_buffer[APDU_OFF_P1];
	
	// Get request's second parameter
	const uint8_t secondParameter = G_io_apdu_buffer[APDU_OFF_P2];
	
	// Get request's data length
	const size_t dataLength = G_io_apdu_buffer[APDU_OFF_LC];
	
	// Get request's data
	const uint8_t *data = &G_io_apdu_buffer[APDU_OFF_DATA];

	// Check if parameters or data are invalid
	if(firstParameter || secondParameter || dataLength <= sizeof(uint32_t) + sizeof(uint32_t)) {
	
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
	
	// Get index from data
	uint32_t index;
	memcpy(&index, &data[sizeof(account)], sizeof(index));
	
	// Get address from data
	const char *address = (char *)&data[sizeof(account) + sizeof(index)];
	
	// Get address length
	const size_t addressLength = dataLength - (sizeof(account) + sizeof(index));
	
	// Check address length
	size_t sharedPrivateKeyLength;
	size_t saltLength = 0;
	uint8_t *salt;
	switch(addressLength) {
	
		// MQS address size
		case MQS_ADDRESS_SIZE:
		
			// Check currency doesn't allow MQS addresses
			if(!currencyInformation.enableMqsAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set shared private key length
			sharedPrivateKeyLength = MQS_SHARED_PRIVATE_KEY_SIZE;
			
			// Set salt length
			saltLength = MQS_SHARED_PRIVATE_KEY_SALT_SIZE;
			
			// Allocate memory for the salt
			salt = alloca(saltLength);
			
			// Create random salt
			cx_rng(salt, saltLength);
		
			// Break
			break;
		
		// Tor address size
		case TOR_ADDRESS_SIZE:
		
			// Check currency doesn't allow Tor addresses
			if(!currencyInformation.enableTorAddress) {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
			
			// Set shared private key length
			sharedPrivateKeyLength = SLATEPACK_SHARED_PRIVATE_KEY_SIZE;
		
			// Break
			break;
		
		// Default
		default:
		
			// Check if address length is a Slatepack address length
			if(addressLength == SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart)) {
			
				// Check currency doesn't allow Slatepack addresses
				if(!currencyInformation.enableSlatepackAddress) {
				
					// Throw invalid parameters error
					THROW(INVALID_PARAMETERS_ERROR);
				}
				
				// Set shared private key length
				sharedPrivateKeyLength = SLATEPACK_SHARED_PRIVATE_KEY_SIZE;
			}
			
			// Otherwise
			else {
			
				// Throw invalid parameters error
				THROW(INVALID_PARAMETERS_ERROR);
			}
		
			// Break
			break;
	}
	
	// Initialize nonce
	uint8_t nonce[CHACHA20_NONCE_SIZE];
	
	// Create random nonce
	cx_rng(nonce, sizeof(nonce));
	
	// Initialize shared private key
	volatile uint8_t sharedPrivateKey[sharedPrivateKeyLength];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
	
			// Check address length
			switch(addressLength) {
			
				// MQS address size
				case MQS_ADDRESS_SIZE:
				
					// Create MQS shared private key
					createMqsSharedPrivateKey(sharedPrivateKey, account, index, address, salt);
					
					// Break
					break;
				
				// Tor address size
				case TOR_ADDRESS_SIZE:
				
					// Create Slatepack shared private key
					createSlatepackSharedPrivateKey(sharedPrivateKey, account, index, address, addressLength);
				
					// Break
					break;
				
				// Default
				default:
				
					// Check if address length is a Slatepack address length
					if(addressLength == SLATEPACK_ADDRESS_WITHOUT_HUMAN_READABLE_PART_SIZE + strlen(currencyInformation.slatepackAddressHumanReadablePart)) {
					
						// Create Slatepack shared private key
						createSlatepackSharedPrivateKey(sharedPrivateKey, account, index, address, addressLength);
					}
				
					// Break
					break;
			}
			
			// Initialize ChaCha20 Poly1305 with the shared private key and nonce
			initializeChaCha20Poly1305((ChaCha20Poly1305State *)&slate.chaCha20Poly1305State, (uint8_t *)sharedPrivateKey, nonce, NULL, 0, 0);
		}
		
		// Finally
		FINALLY {
			
			// Clear the shared private key
			explicit_bzero((uint8_t *)sharedPrivateKey, sizeof(sharedPrivateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Check if response with the nonce and salt will overflow
	if(willResponseOverflow(*responseLength, sizeof(nonce) + saltLength)) {
	
		// Throw length error
		THROW(LENGTH_ERROR);
	}
	
	// Append nonce to response	
	memcpy(&G_io_apdu_buffer[*responseLength], nonce, sizeof(nonce));
	
	*responseLength += sizeof(nonce);
	
	// Check if salt exists
	if(saltLength) {
	
		// Append salt to response	
		memcpy(&G_io_apdu_buffer[*responseLength], salt, saltLength);
		
		*responseLength += saltLength;
	}
	
	// Set that slate encrypting state is ready
	slate.encryptingState = READY_SLATE_STATE;
	
	// Throw success
	THROW(SWO_SUCCESS);
}
