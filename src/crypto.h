// Header guard
#ifndef CRYPTO_H
#define CRYPTO_H


// Header files
#include "device.h"


// Definitions

// Blinding factor size
#define BLINDING_FACTOR_SIZE 32

// Ed25519 public key size
#define ED25519_PUBLIC_KEY_SIZE 32

// Compressed public key size
#define COMPRESSED_PUBLIC_KEY_SIZE 33

// Public key prefix size
#define PUBLIC_KEY_PREFIX_SIZE 1

// Proof message size
#define PROOF_MESSAGE_SIZE 20

// Uncompressed public key size
#define UNCOMPRESSED_PUBLIC_KEY_SIZE 65

// Public key component size
#define PUBLIC_KEY_COMPONENT_SIZE 32

// Nonce size
#define NONCE_SIZE 32

// Commitment size
#define COMMITMENT_SIZE 33

// Identifier maximum depth
#define IDENTIFIER_MAXIMUM_DEPTH 4

// Identifier size
#define IDENTIFIER_SIZE (sizeof(uint8_t) + IDENTIFIER_MAXIMUM_DEPTH * sizeof(uint32_t))

// Single-signer compact signature size
#define SINGLE_SIGNER_COMPACT_SIGNATURE_SIZE 64

// Single-signer message size
#define SINGLE_SIGNER_MESSAGE_SIZE 32

// Maximum DER signature size
#define MAXIMUM_DER_SIGNATURE_SIZE 72

// Even compressed public key prefix
#define EVEN_COMPRESSED_PUBLIC_KEY_PREFIX 0x02

// Odd compressed public key prefix
#define ODD_COMPRESSED_PUBLIC_KEY_PREFIX 0x03

// Ed25519 compressed public key prefix
#define ED25519_COMPRESSED_PUBLIC_KEY_PREFIX 0x02

// Ed25519 signature size
#define ED25519_SIGNATURE_SIZE 64

// Hardened path mask
#define HARDENED_PATH_MASK 0x80000000

// Maximum account
#define MAXIMUM_ACCOUNT (HARDENED_PATH_MASK - 1)

// X25519 public key size
#define X25519_PUBLIC_KEY_SIZE 32

// X25519 compressed public key prefix
#define X25519_COMPRESSED_PUBLIC_KEY_PREFIX 0x02


// Constants

// Switch type
enum SwitchType {

	// No switch type
	NO_SWITCH_TYPE,

	// Regular switch type
	REGULAR_SWITCH_TYPE
};


// Function prototypes

// Get private key and chain code
void getPrivateKeyAndChainCode(volatile cx_ecfp_private_key_t *privateKey, volatile uint8_t *chainCode, const uint32_t account);

// Get public key from private key
void getPublicKeyFromPrivateKey(volatile uint8_t *publicKey, const cx_ecfp_private_key_t *privateKey);

// Derive blinding factor
void deriveBlindingFactor(volatile uint8_t *blindingFactor, const uint32_t account, const uint64_t value, const uint32_t *path, const size_t pathLength, const enum SwitchType switchType);

// Commit value
void commitValue(volatile uint8_t *commitment, const uint64_t value, const uint8_t *blindingFactor, const bool compress);

// Get rewind nonce
void getRewindNonce(volatile uint8_t *rewindNonce, const uint32_t account, const uint8_t *commitment);

// Get private nonce
void getPrivateNonce(volatile uint8_t *privateNonce, const uint32_t account, const uint8_t *commitment);

// Get address private key
void getAddressPrivateKey(volatile cx_ecfp_private_key_t *addressPrivateKey, const uint32_t account, const uint32_t index, const cx_curve_t curve);

// Update blinding factor sum
void updateBlindingFactorSum(uint8_t *blindingFactorSum, const uint8_t *blindingFactor, const bool blindingFactorIsPositive);

// Create single-signer nonces
void createSingleSignerNonces(uint8_t *secretNonce, uint8_t *publicNonce);

// Create single-signer signature
void createSingleSignerSignature(volatile uint8_t *signature, const uint8_t *message, const uint8_t *blindingFactor, const uint8_t *secretNonce, const uint8_t *publicNonce, const uint8_t *publicKey);

// Get encrypted data length
size_t getEncryptedDataLength(const size_t dataLength);

// Encrypt data
void encryptData(volatile uint8_t *result, const uint8_t *data, const size_t dataLength, const uint8_t *key, const size_t keyLength);

// Decrypt data
size_t decryptData(volatile uint8_t *result, const uint8_t *data, const size_t dataLength, const uint8_t *key, const size_t keyLength);

// Get X25519 private key from Ed25519 private key
void getX25519PrivateKeyFromEd25519PrivateKey(volatile cx_ecfp_private_key_t *x25519PrivateKey, const cx_ecfp_private_key_t *ed25519PrivateKey);

// Get X25519 public key from Ed25519 public key
void getX25519PublicKeyFromEd25519PublicKey(uint8_t *x25519PublicKey, const uint8_t *ed25519PublicKey);

// Get payment proof message length
size_t getPaymentProofMessageLength(const uint64_t value, const size_t senderAddressLength);

// Get payment proof message
void getPaymentProofMessage(uint8_t *message, const uint64_t value, const uint8_t *kernelCommitment, const char *senderAddress, const size_t senderAddressLength);

// Verify payment proof message
bool verifyPaymentProofMessage(const uint8_t *message, const size_t messageLength, const char *receiverAddress, const size_t receiverAddressLength, const uint8_t *signature, const size_t signatureLength);

// Is valid commitment
bool isValidCommitment(uint8_t *commitment);

// Is valid Ed25519 private key
bool isValidEd25519PrivateKey(const uint8_t *privateKey, const size_t length);

// Is valid Ed25519 public key
bool isValidEd25519PublicKey(const uint8_t *publicKey, const size_t length);

// Is valid X25519 private key
bool isValidX25519PrivateKey(const uint8_t *privateKey, const size_t length);

// Is valid X25519 public key
bool isValidX25519PublicKey(const uint8_t *publicKey, const size_t length);

// Is valid secp256k1 private key
bool isValidSecp256k1PrivateKey(const uint8_t *privateKey, const size_t length);

// Is valid secp256k1 public key
bool isValidSecp256k1PublicKey(const uint8_t *publicKey, const size_t length);

// Uncompress secp256k1 public key
void uncompressSecp256k1PublicKey(uint8_t *publicKey);

// Get Ed25519 public key
void getEd25519PublicKey(uint8_t *ed25519PublicKey, const uint32_t account, const uint32_t index);

// Calculate bulletproof components
void calculateBulletproofComponents(volatile uint8_t *tauX, volatile uint8_t *tOne, volatile uint8_t *tTwo, const uint64_t value, const uint8_t *blindingFactor, const uint8_t *commitment, const uint8_t *rewindNonce, const uint8_t *privateNonce, const uint8_t *proofMessage);

// Get login private key
void getLoginPrivateKey(volatile cx_ecfp_private_key_t *loginPrivateKey, const uint32_t account);

// Generator double point scalar multiply
void generatorDoublePointScalarMultiply(uint8_t *result, const size_t index, const uint8_t *scalarOne, const uint8_t *scalarTwo);


#endif
