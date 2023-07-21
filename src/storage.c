// Header files
#include "common.h"
#include "storage.h"


// Constants

// Persistent storage
const struct PersistentStorage N_PERSISTENTSTORAGE;


// Supporting function implementation

// Initialize storage
void initializeStorage(void) {

	// Check if current transaction secret nonce index is invalid
	if(storage.currentTransactionSecretNonceIndex >= NUMBER_OF_TRANSACTION_SECRET_NONCES) {

		// Clear current transaction secret nonce index
		nvm_write((void *)&storage.currentTransactionSecretNonceIndex, NULL, sizeof(storage.currentTransactionSecretNonceIndex));
	}
}
