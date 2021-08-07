// Header guard
#ifndef CURRENCY_INFORMATION_H
#define CURRENCY_INFORMATION_H


// Header files
#include <ux.h>

// Definitions

// Currency information name size
#define CURRENCY_INFORMATION_NAME_SIZE sizeof("MimbleWimble Coin")

// Currency information abbreviation size
#define CURRENCY_INFORMATION_ABBREVIATION_SIZE sizeof("GRIN")

// Currency information version size
#define CURRENCY_INFORMATION_VERSION_SIZE sizeof("0.0.1")

// Currency information icon colors size
#define CURRENCY_INFORMATION_ICON_COLORS_SIZE 2

// Currency information icon bitmap size
#define CURRENCY_INFORMATION_ICON_BITMAP_SIZE 32


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
	char name[CURRENCY_INFORMATION_NAME_SIZE];
	
	// Abbreviation
	char abbreviation[CURRENCY_INFORMATION_ABBREVIATION_SIZE];
	
	// Version
	char version[CURRENCY_INFORMATION_VERSION_SIZE];
	
	// Icon colors
	unsigned int iconColors[CURRENCY_INFORMATION_ICON_COLORS_SIZE];
	
	// Icon bitmap
	unsigned char iconBitmap[CURRENCY_INFORMATION_ICON_BITMAP_SIZE];
	
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
