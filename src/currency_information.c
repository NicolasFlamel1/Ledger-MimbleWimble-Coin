// Header files
#include <string.h>
#include "currency_information.h"


// Global variables

// Currency information
struct CurrencyInformation currencyInformation;


// Supporting function implementation

// Get currency information
void getCurrencyInformation(struct CurrencyInformation *currencyInformation) {

	// Set currency information's ID
	currencyInformation->id = CURRENCY_ID;

	// Set currency information's BIP44 coin type
	currencyInformation->bip44CoinType = CURRENCY_BIP44_COIN_TYPE;
	
	// Set currency information's fractional digits
	currencyInformation->fractionalDigits = CURRENCY_FRACTIONAL_DIGITS;
	
	// Set currency information's name
	strcpy(currencyInformation->name, CURRENCY_NAME);
	
	// Set currency information's abbreviation
	strcpy(currencyInformation->abbreviation, CURRENCY_ABBREVIATION);
	
	// Set currency information's version
	strcpy(currencyInformation->version, CURRENCY_VERSION);
	
	// Set currency information's icon details
	memcpy(&currencyInformation->iconDetails, &CURRENCY_ICON_DETAILS, sizeof(CURRENCY_ICON_DETAILS));
	
	currencyInformation->iconDetails.colors = currencyInformation->iconColors;
	currencyInformation->iconDetails.bitmap = currencyInformation->iconBitmap;
	
	// Set currency information's icon colors
	memcpy(&currencyInformation->iconColors, &CURRENCY_ICON_COLORS, sizeof(currencyInformation->iconColors));
	
	// Set currency information's icon bitmap
	memcpy(&currencyInformation->iconBitmap, &CURRENCY_ICON_BITMAP, sizeof(currencyInformation->iconBitmap));
}
