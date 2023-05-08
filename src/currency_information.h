// Header guard
#ifndef CURRENCY_INFORMATION_H
#define CURRENCY_INFORMATION_H


// Header files
#include <ux.h>
#include <stdbool.h>


// Definitions

// Currency MQS version size
#define CURRENCY_MQS_VERSION_SIZE sizeof(uint16_t)

// Currency MQS name size
#define CURRENCY_MQS_NAME_SIZE sizeof("Epicbox")

// Currency information name size
#define CURRENCY_INFORMATION_NAME_SIZE sizeof("MimbleWimble Coin Floonet")

// Currency information abbreviation size
#define CURRENCY_INFORMATION_ABBREVIATION_SIZE sizeof("Testnet GRIN")

// Check if has BAGL
#ifdef HAVE_BAGL

	// Currency information icon colors size
	#define CURRENCY_INFORMATION_ICON_COLORS_SIZE 2

	// Currency information icon bitmap size
	#define CURRENCY_INFORMATION_ICON_BITMAP_SIZE sizeof(C_icon_mimblewimble_coin_bitmap)

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

	// Currency information icon bitmap size
	#define CURRENCY_INFORMATION_ICON_BITMAP_SIZE sizeof(C_icon_grin_big_bitmap)
#endif

// Currency information Slatepack address human-readable part size
#define CURRENCY_INFORMATION_SLATEPACK_ADDRESS_HUMAN_READABLE_PART_SIZE sizeof("tgrin")


// Constants

// Currency IDs
enum CurrencyIds {

	// MimbleWimble Coin
	MIMBLEWIMBLE_COIN,
	
	// MimbleWimble Coin floonet
	MIMBLEWIMBLE_COIN_FLOONET,
	
	// Grin
	GRIN,
	
	// Grin testnet
	GRIN_TESTNET,
	
	// Epic Cash
	EPIC_CASH,
	
	// Epic Cash floonet
	EPIC_CASH_FLOONET
};

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


// Structures

// Currency information
struct CurrencyInformation {
	
	// BIP44 coin type
	uint32_t bip44CoinType;
	
	// Fractional digits
	uint8_t fractionalDigits;
	
	// Enable MQS address
	bool enableMqsAddress;
	
	// Enable Tor address
	bool enableTorAddress;
	
	// Enable Slatepack address
	bool enableSlatepackAddress;
	
	// Maximum fee
	uint64_t maximumFee;
	
	// Enable no recent duplicate kernels
	bool enableNoRecentDuplicateKernels;
	
	// Address derivation type
	enum AddressDerivationTypes addressDerivationType;
	
	// Payment proof message type
	enum PaymentProofMessageTypes paymentProofMessageType;
	
	// Supported payment proof address types
	enum PaymentProofAddressTypes supportedPaymentProofAddressTypes;
	
	// Supported slate encryption types
	enum SlateEncryptionTypes supportedSlateEncryptionTypes;
	
	// ID
	enum CurrencyIds id;
	
	// MQS version
	uint8_t mqsVersion[CURRENCY_MQS_VERSION_SIZE];
	
	// MQS name
	char mqsName[CURRENCY_MQS_NAME_SIZE];
	
	// Name
	char name[CURRENCY_INFORMATION_NAME_SIZE];
	
	// Abbreviation
	char abbreviation[CURRENCY_INFORMATION_ABBREVIATION_SIZE];
	
	// Check if has BAGL
	#ifdef HAVE_BAGL
	
		// Icon colors
		unsigned int iconColors[CURRENCY_INFORMATION_ICON_COLORS_SIZE];
		
		// Icon bitmap
		unsigned char iconBitmap[CURRENCY_INFORMATION_ICON_BITMAP_SIZE];
		
		// Icon details
		bagl_icon_details_t iconDetails;
		
	// Otherwise check if has NBGL
	#elif defined HAVE_NBGL
	
		// Icon bitmap
		unsigned char iconBitmap[CURRENCY_INFORMATION_ICON_BITMAP_SIZE];
		
		// Icon details
		nbgl_icon_details_t iconDetails;
	#endif
	
	// Slatepack human-readable part
	char slatepackAddressHumanReadablePart[CURRENCY_INFORMATION_SLATEPACK_ADDRESS_HUMAN_READABLE_PART_SIZE];
};


// Global variables

// Currency information
extern struct CurrencyInformation *currencyInformation;


// Function prototypes

// Get currency information
void getCurrencyInformation(struct CurrencyInformation *currencyInformation);


#endif
