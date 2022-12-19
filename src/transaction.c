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
	
	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Initialize secret nonce and signature
	volatile uint8_t secretNonceAndSignature[sizeof(transaction.secretNonce) + MAXIMUM_DER_SIGNATURE_SIZE];
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Get private key from the transaction's blinding factor
			cx_ecfp_init_private_key(CX_CURVE_SECP256K1, (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor), (cx_ecfp_private_key_t *)&privateKey);
			
			// Sign the transaction's secret nonce with the private key
			const size_t signatureLength = cx_ecdsa_sign((cx_ecfp_private_key_t *)&privateKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, (uint8_t *)transaction.secretNonce, sizeof(transaction.secretNonce), (uint8_t *)&secretNonceAndSignature[sizeof(transaction.secretNonce)], MAXIMUM_DER_SIGNATURE_SIZE, NULL);
			
			// Encrypt the transaction's secret nonce with the transaction's blinding factor
			memcpy((uint8_t *)secretNonceAndSignature, (uint8_t *)transaction.secretNonce, sizeof(transaction.secretNonce));
			uint8_t encryptedSecretNonceAndSignature[sizeof(storage.transactionSecretNonces[storage.currentTransactionSecretNonceIndex])] = {0};
			
			encryptData(encryptedSecretNonceAndSignature, (uint8_t *)secretNonceAndSignature, sizeof(transaction.secretNonce) + signatureLength, (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor));
			
			// Store encrypted secret nonce and signature in storage
			nvm_write((void *)storage.transactionSecretNonces[storage.currentTransactionSecretNonceIndex], (void *)encryptedSecretNonceAndSignature, sizeof(encryptedSecretNonceAndSignature));
		}
		
		// Finally
		FINALLY {
		
			// Clear the secret nonce and signature
			explicit_bzero((uint8_t *)secretNonceAndSignature, sizeof(secretNonceAndSignature));
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
		}
	}
	
	// End try
	END_TRY;
	
	// Set transaction's secret nonce index
	transaction.secretNonceIndex = storage.currentTransactionSecretNonceIndex + 1;
	
	// Increment current transaction secret nonce index in storage
	const uint8_t nextTransactionSecretNonceIndex = (storage.currentTransactionSecretNonceIndex + 1) % NUMBER_OF_TRANSACTION_SECRET_NONCES;
	nvm_write((void *)&storage.currentTransactionSecretNonceIndex, (void *)&nextTransactionSecretNonceIndex, sizeof(nextTransactionSecretNonceIndex));
}

// Restore transaction secret nonce
void restoreTransactionSecretNonce(void) {

	// Loop while delimiter in the secret nonce in storage at the transaction's secret nonce index is zero
	size_t encryptedSecretNonceAndSignatureSize = sizeof(storage.transactionSecretNonces[transaction.secretNonceIndex - 1]);
	while(!storage.transactionSecretNonces[transaction.secretNonceIndex - 1][encryptedSecretNonceAndSignatureSize - 1]) {
	
		// Decrement encrypted secret nonce and signature size
		--encryptedSecretNonceAndSignatureSize;
	}

	// Initialize secret nonce and signature
	volatile uint8_t secretNonceAndSignature[getEncryptedDataLength(sizeof(transaction.secretNonce) + MAXIMUM_DER_SIGNATURE_SIZE)];
	
	// Initialize private key
	volatile cx_ecfp_private_key_t privateKey;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Decrypt the secret nonce in storage at the transaction's secret nonce index with the transaction's blinding factor
			const size_t secretNonceAndSignatureLength = decryptData(secretNonceAndSignature, (uint8_t *)storage.transactionSecretNonces[transaction.secretNonceIndex - 1], encryptedSecretNonceAndSignatureSize, (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor));
			
			// Check if secret nonce and signature length is invalid
			if(secretNonceAndSignatureLength <= sizeof(transaction.secretNonce)) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Get secret nonce and signature from the secret nonce and signature
			const uint8_t *secretNonce = (uint8_t *)secretNonceAndSignature;
			const uint8_t *signature = (uint8_t *)&secretNonceAndSignature[sizeof(transaction.secretNonce)];
			
			// Get private key from the transaction's blinding factor
			cx_ecfp_init_private_key(CX_CURVE_SECP256K1, (uint8_t *)transaction.blindingFactor, sizeof(transaction.blindingFactor), (cx_ecfp_private_key_t *)&privateKey);
			
			// Get public key from private key
			cx_ecfp_public_key_t publicKey;
			cx_ecfp_generate_pair(CX_CURVE_SECP256K1, &publicKey, (cx_ecfp_private_key_t *)&privateKey, KEEP_PRIVATE_KEY);
			
			// Check if the public key and signature don't verify the secret nonce
			if(!cx_ecdsa_verify(&publicKey, CX_RND_RFC6979 | CX_LAST, CX_SHA256, secretNonce, sizeof(transaction.secretNonce), signature, secretNonceAndSignatureLength - sizeof(transaction.secretNonce))) {
			
				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
			
			// Set transaction's secret nonce
			memcpy((uint8_t *)transaction.secretNonce, secretNonce, sizeof(transaction.secretNonce));
		}
		
		// Finally
		FINALLY {
		
			// Clear the private key
			explicit_bzero((cx_ecfp_private_key_t *)&privateKey, sizeof(privateKey));
			
			// Clear the secret nonce and signature
			explicit_bzero((uint8_t *)secretNonceAndSignature, sizeof(secretNonceAndSignature));
		}
	}
	
	// End try
	END_TRY;
}

// Clear transaction secret nonce
void clearTransactionSecretNonce(void) {

	// Clear encrypted secret nonce and signature in storage at the transaction's secret nonce index
	const uint8_t zero[sizeof(storage.transactionSecretNonces[transaction.secretNonceIndex - 1])] = {0};
	nvm_write((void *)storage.transactionSecretNonces[transaction.secretNonceIndex - 1], (void *)zero, sizeof(zero));
}
