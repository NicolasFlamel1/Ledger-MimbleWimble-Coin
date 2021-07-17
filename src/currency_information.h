// Header guard
#ifndef CURRENCY_INFORMATION_H
#define CURRENCY_INFORMATION_H


// Header files
#include <ux.h>

// Definitions

// Currency information name length
#define CURRENCY_INFORMATION_NAME_LENGTH sizeof("MimbleWimble Coin")

// Currency information abbreviation length
#define CURRENCY_INFORMATION_ABBREVIATION_LENGTH sizeof("GRIN")

// Currency information version length
#define CURRENCY_INFORMATION_VERSION_LENGTH sizeof("0.0.1")

// Currency information icon colors length
#define CURRENCY_INFORMATION_ICON_COLORS_LENGTH 2

// Currency information icon bitmap length
#define CURRENCY_INFORMATION_ICON_BITMAP_LENGTH 32


// Structures

// Currency information
struct CurrencyInformation {

	// ID
	size_t id;

	// BIP44 coin type
	uint32_t bip44CoinType;
	
	// Fractional digits
	uint8_t fractionalDigits;
	
	// Name
	char name[CURRENCY_INFORMATION_NAME_LENGTH];
	
	// Abbreviation
	char abbreviation[CURRENCY_INFORMATION_ABBREVIATION_LENGTH];
	
	// Version
	char version[CURRENCY_INFORMATION_VERSION_LENGTH];
	
	// Icon colors
	unsigned int iconColors[CURRENCY_INFORMATION_ICON_COLORS_LENGTH];
	
	// Icon bitmap
	unsigned char iconBitmap[CURRENCY_INFORMATION_ICON_BITMAP_LENGTH];
	
	// Icon details
	bagl_icon_details_t iconDetails;
};


// Constants

// Currency ID
enum CurrencyId {

	// MimbleWimble Coin ID
	MIMBLEWIMBLE_COIN_ID,
	
	// Grin ID
	GRIN_ID
};


// Global variables

// Currency information
extern struct CurrencyInformation currencyInformation;


// Function prototypes

// Get currency information
void getCurrencyInformation(struct CurrencyInformation *currencyInformation);


#endif
