// Header files
#include "common.h"
#include "storage.h"


// Constants

// Persistent storage
const struct PersistentStorage N_PERSISTENTSTORAGE[TOTAL_NUMBER_OF_SUPPORTED_CURRENCIES];


// Supporting function implementation

// Initialize storage
void initializeStorage(void) {

	// Check if current transaction secret nonce index is invalid
	if(storage.currentTransactionSecretNonceIndex >= NUMBER_OF_TRANSACTION_SECRET_NONCES) {
	
		// Set current transaction secret nonce index to zero
		const uint8_t zero = 0;
		nvm_write((void *)&storage.currentTransactionSecretNonceIndex, (void *)&zero, sizeof(zero));
	}
}
