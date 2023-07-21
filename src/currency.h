// Header guard
#ifndef CURRENCY_H
#define CURRENCY_H


// Header files
#include <stdbool.h>
#include "common.h"


// Definitions

// Check if currency BIP44 coin type isn't defined
#ifndef CURRENCY_BIP44_COIN_TYPE

	// Cause error
	#error "Invalid currency BIP44 coin type"
#endif

// Check if currency fractional digits isn't defined
#ifndef CURRENCY_FRACTIONAL_DIGITS

	// Cause error
	#error "Invalid currency fractional digits"
#endif

// Check if currency enable MQS address isn't defined
#ifndef CURRENCY_ENABLE_MQS_ADDRESS

	// Define default currency enable MQS address
	#define CURRENCY_ENABLE_MQS_ADDRESS false
#endif

// Check if currency enable Tor address isn't defined
#ifndef CURRENCY_ENABLE_TOR_ADDRESS

	// Define default currency enable Tor address
	#define CURRENCY_ENABLE_TOR_ADDRESS false
#endif

// Check if currency enable Slatepack address isn't defined
#ifndef CURRENCY_ENABLE_SLATEPACK_ADDRESS

	// Define default currency enable Slatepack address
	#define CURRENCY_ENABLE_SLATEPACK_ADDRESS false
#endif

// Check if currency enable no recent duplicate kernels isn't defined
#ifndef CURRENCY_ENABLE_NO_RECENT_DUPLICATE_KERNELS

	// Define default currency enable no recent duplicate kernels
	#define CURRENCY_ENABLE_NO_RECENT_DUPLICATE_KERNELS false
#endif

// Check if currency MQS version isn't defined
#ifndef CURRENCY_MQS_VERSION

	// Define default currency MQS version
	#define CURRENCY_MQS_VERSION \
		{ 0, 0 }
#endif

// Check if currency Slatepack address human readable part isn't defined
#ifndef CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART

	// Define default currency Slatepack address human readable part
	#define CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART ""
#endif

// Check if currency max fee isn't defined
#ifndef CURRENCY_MAXIMUM_FEE

	// Define default currency max fee
	#define CURRENCY_MAXIMUM_FEE UINT64_MAX
#endif

// Check if currency address derivation type isn't defined
#ifndef CURRENCY_ADDRESS_DERIVATION_TYPE

	// Cause error
	#error "Invalid currency address derivation type"
#endif

// Check if currency payment proof message type isn't defined
#ifndef CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE

	// Cause error
	#error "Invalid currency payment proof message type"
#endif

// Check if currency payment proof address types isn't defined
#ifndef CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES

	// Cause error
	#error "Invalid currency payment proof address types"
#endif

// Check if currency slate encryption types isn't defined
#ifndef CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES

	// Cause error
	#error "Invalid currency slate encryption types"
#endif

// Check if currency MQS name isn't defined
#ifndef CURRENCY_MQS_NAME

	// Define default currency MQS name
	#define CURRENCY_MQS_NAME ""
#endif

// Check if currency name isn't defined
#ifndef CURRENCY_NAME

	// Cause error
	#error "Invalid currency name"
#endif

// Check if currency abbreviation isn't defined
#ifndef CURRENCY_ABBREVIATION

	// Cause error
	#error "Invalid currency abbreviation"
#endif


// Constants

// Address derivation types
enum AddressDerivationTypes {

	// MWC address derivation
	MWC_ADDRESS_DERIVATION,

	// GRIN address derivation
	GRIN_ADDRESS_DERIVATION
};

// Payment proof message types
enum PaymentProofMessageTypes {

	// ASCII payment proof message
	ASCII_PAYMENT_PROOF_MESSAGE,

	// Binary payment proof message
	BINARY_PAYMENT_PROOF_MESSAGE
};

// Payment proof address types
enum PaymentProofAddressTypes {

	// MQS payment proof address
	MQS_PAYMENT_PROOF_ADDRESS = 1 << 0,

	// Tor payment proof address
	TOR_PAYMENT_PROOF_ADDRESS = 1 << 1,

	// Slatepack payment proof address
	SLATEPACK_PAYMENT_PROOF_ADDRESS = 1 << 2
};

// Slate encryption types
enum SlateEncryptionTypes {

	// MQS slate encryption
	MQS_SLATE_ENCRYPTION = 1 << 0,

	// Tor slate encryption
	TOR_SLATE_ENCRYPTION = 1 << 1,

	// Slatepack slate encryption
	SLATEPACK_SLATE_ENCRYPTION = 1 << 2
};


// Assertions

// Assert that currency BIP44 coin type is valid
_Static_assert(CURRENCY_BIP44_COIN_TYPE >= 0 && CURRENCY_BIP44_COIN_TYPE <= UINT32_MAX, "Invalid currency BIP44 coin type");

// Assert that currency fractional digits is valid
_Static_assert(CURRENCY_FRACTIONAL_DIGITS >= 0 && CURRENCY_FRACTIONAL_DIGITS <= UINT64_BUFFER_SIZE, "Invalid currency fractional digits");

// Assert that currency MQS version is valid
_Static_assert(sizeof((uint8_t[])CURRENCY_MQS_VERSION) == sizeof(uint16_t), "Invalid currency MQS version");

// Assert that currency maximum fee is valid
_Static_assert(CURRENCY_MAXIMUM_FEE >= 0 && CURRENCY_MAXIMUM_FEE <= UINT64_MAX, "Invalid currency maximum fee");

// Assert that currency address derivation type is valid
_Static_assert(CURRENCY_ADDRESS_DERIVATION_TYPE >= MWC_ADDRESS_DERIVATION && CURRENCY_ADDRESS_DERIVATION_TYPE <= GRIN_ADDRESS_DERIVATION, "Invalid currency address derivation type");

// Assert that currency payment proof message type is valid
_Static_assert(CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE >= ASCII_PAYMENT_PROOF_MESSAGE && CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE <= BINARY_PAYMENT_PROOF_MESSAGE, "Invalid currency payment proof message type");

// Assert that currency supported payment proof address types is valid
_Static_assert(CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES >= 0, "Invalid currency supported payment proof address types");

// Assert that currency supported slate encryption types is valid
_Static_assert(CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES >= 0, "Invalid currency supported slate encryption types");


#endif
