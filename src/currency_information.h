// Header guard
#ifndef CURRENCY_INFORMATION_H
#define CURRENCY_INFORMATION_H


// Header files
#include <ux.h>
#include <stdbool.h>


// Definitions

// Currency MQS version size
#define CURRENCY_MQS_VERSION_SIZE sizeof(uint16_t)

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
	
	// ID
	uint8_t id;
	
	// MQS version
	uint8_t mqsVersion[CURRENCY_MQS_VERSION_SIZE];
	
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
	GRIN_TESTNET
};


// Global variables

// Currency information
extern struct CurrencyInformation *currencyInformation;


// Function prototypes

// Get currency information
void getCurrencyInformation(struct CurrencyInformation *currencyInformation);


#endif
