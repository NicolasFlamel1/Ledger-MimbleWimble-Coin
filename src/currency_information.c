// Header files
#include <string.h>
#include "currency_information.h"


// Global variables

// Currency information
struct CurrencyInformation currencyInformation;


// Supporting function implementation

// Get currency information
void getCurrencyInformation(struct CurrencyInformation *currencyInformation) {

	// Set currency information's BIP44 coin type
	currencyInformation->bip44CoinType = CURRENCY_BIP44_COIN_TYPE;
	
	// Set currency information's fractional digits
	currencyInformation->fractionalDigits = CURRENCY_FRACTIONAL_DIGITS;
	
	// Check if enable MQS address
	#ifdef CURRENCY_ENABLE_MQS_ADDRESS
	
		// Set currency information's enable MQS address
		currencyInformation->enableMqsAddress = true;
	
	// Otherwise
	#else
	
		// Set currency information's enable MQS address
		currencyInformation->enableMqsAddress = false;
	#endif
	
	// Check if enable TOR address
	#ifdef CURRENCY_ENABLE_TOR_ADDRESS
	
		// Set currency information's enable Tor address
		currencyInformation->enableTorAddress = true;
	
	// Otherwise
	#else
	
		// Set currency information's enable Tor address
		currencyInformation->enableTorAddress = false;
	#endif
	
	// Check if enable Slatepack address
	#ifdef CURRENCY_ENABLE_Slatepack_ADDRESS
	
		// Set currency information's enable Slatepack address
		currencyInformation->enableSlatepackAddress = true;
	
	// Otherwise
	#else
	
		// Set currency information's enable Slatepack address
		currencyInformation->enableSlatepackAddress = false;
	#endif
	
	// Check if MQS version exists
	#ifdef CURRENCY_MQS_VERSION
	
		// Set currency information's MQS version
		memcpy(currencyInformation->mqsVersion, (uint8_t [])CURRENCY_MQS_VERSION, sizeof(currencyInformation->mqsVersion));
	#endif
	
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
	
	// Check if Slatepack address human-readable part exists
	#ifdef CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART
	
		// Set currency information's Slatepack address human readable part
		strcpy(currencyInformation->slatepackAddressHumanReadablePart, CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART);
	#endif
}
