// Header files
#include <string.h>
#include "common.h"
#include "transaction.h"
#include "storage.h"


// Global variables

// Transaction
struct Transaction transaction;


// Supporting function implementation

// Reset transaction
void resetTransaction(void) {

	// Clear the transaction
	explicit_bzero(&transaction, sizeof(transaction));
}

// Create and save transaction secret nonce
void createAndSaveTransactionSecretNonce(void) {

	// Create transaction's secret nonce
	createSingleSignerNonces((uint8_t *)transaction.secretNonce, NULL);

	// Encrypt the transaction's secret nonce with the transaction's blinding factor
	uint8_t encryptedSecretNonce[sizeof(storage.transactionSecretNonces[storage.currentTransactionSecretNonceIndex])];
	encryptData(encryptedSecretNonce, (uint8_t *)transaction.secretNonce, sizeof(transaction.secretNonce), (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor));

	// Check if encrypted secret nonce is invalid
	if(isZeroArraySecure(encryptedSecretNonce, sizeof(encryptedSecretNonce))) {

		// Throw internal error error
		THROW(INTERNAL_ERROR_ERROR);
	}

	// Store encrypted secret nonce in storage at the current transaction secret nonce index
	nvm_write((void *)storage.transactionSecretNonces[storage.currentTransactionSecretNonceIndex], (void *)encryptedSecretNonce, sizeof(encryptedSecretNonce));

	// Set transaction's secret nonce index
	transaction.secretNonceIndex = storage.currentTransactionSecretNonceIndex + 1;

	// Increment current transaction secret nonce index in storage
	const uint8_t nextTransactionSecretNonceIndex = (storage.currentTransactionSecretNonceIndex + 1) % NUMBER_OF_TRANSACTION_SECRET_NONCES;
	nvm_write((void *)&storage.currentTransactionSecretNonceIndex, (void *)&nextTransactionSecretNonceIndex, sizeof(nextTransactionSecretNonceIndex));
}

// Restore transaction secret nonce
void restoreTransactionSecretNonce(void) {

	// Initialize secret nonce
	volatile uint8_t secretNonce[sizeof(storage.transactionSecretNonces[transaction.secretNonceIndex - 1])];

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Decrypt the secret nonce in storage at the transaction's secret nonce index with the transaction's blinding factor
			const size_t secretNonceLength = decryptData(secretNonce, (uint8_t *)storage.transactionSecretNonces[transaction.secretNonceIndex - 1], sizeof(storage.transactionSecretNonces[transaction.secretNonceIndex - 1]), (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor));

			// Check if secret nonce length is invalid
			if(secretNonceLength != sizeof(transaction.secretNonce)) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}

			// Set transaction's secret nonce
			memcpy((uint8_t *)transaction.secretNonce, (uint8_t *)secretNonce, secretNonceLength);
		}

		// Finally
		FINALLY {

			// Clear the secret nonce
			explicit_bzero((uint8_t *)secretNonce, sizeof(secretNonce));
		}
	}

	// End try
	END_TRY;
}

// Clear transaction secret nonce
void clearTransactionSecretNonce(void) {

	// Clear encrypted secret nonce in storage at the transaction's secret nonce index
	nvm_write((void *)storage.transactionSecretNonces[transaction.secretNonceIndex - 1], NULL, sizeof(storage.transactionSecretNonces[transaction.secretNonceIndex - 1]));
}
