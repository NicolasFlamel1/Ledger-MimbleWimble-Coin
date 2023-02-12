// Header files
#include <string.h>
#include "currency_information.h"


// Global variables

// Currency information
struct CurrencyInformation *currencyInformation;


// Supporting function implementation

// Get currency information
void getCurrencyInformation(struct CurrencyInformation *currentCurrencyInformation) {

	// Clear current currency information
	explicit_bzero(currentCurrencyInformation, sizeof(*currentCurrencyInformation));

	// Set current currency information's BIP44 coin type
	currentCurrencyInformation->bip44CoinType = CURRENCY_BIP44_COIN_TYPE;
	
	// Set current currency information's fractional digits
	currentCurrencyInformation->fractionalDigits = CURRENCY_FRACTIONAL_DIGITS;
	
	// Check if enable MQS address
	#ifdef CURRENCY_ENABLE_MQS_ADDRESS
	
		// Set current currency information's enable MQS address
		currentCurrencyInformation->enableMqsAddress = true;
	#endif
	
	// Check if enable TOR address
	#ifdef CURRENCY_ENABLE_TOR_ADDRESS
	
		// Set current currency information's enable Tor address
		currentCurrencyInformation->enableTorAddress = true;
	#endif
	
	// Check if enable Slatepack address
	#ifdef CURRENCY_ENABLE_SLATEPACK_ADDRESS
	
		// Set current currency information's enable Slatepack address
		currentCurrencyInformation->enableSlatepackAddress = true;
	#endif
	
	// Check if maximum fee exists
	#ifdef CURRENCY_MAXIMUM_FEE
	
		// Set current currency information's maximum fee
		currentCurrencyInformation->maximumFee = CURRENCY_MAXIMUM_FEE;
	
	// Otherwise
	#else
	
		// Set current currency information's maximum fee
		currentCurrencyInformation->maximumFee = UINT64_MAX;
	#endif
	
	// Set current currency information's ID
	currentCurrencyInformation->id = CURRENCY_ID;
	
	// Check if MQS version exists
	#ifdef CURRENCY_MQS_VERSION
	
		// Set current currency information's MQS version
		memcpy(currentCurrencyInformation->mqsVersion, (uint8_t [])CURRENCY_MQS_VERSION, sizeof(currentCurrencyInformation->mqsVersion));
	#endif
	
	// Set current currency information's name
	strncpy(currentCurrencyInformation->name, CURRENCY_NAME, sizeof(currentCurrencyInformation->name) - sizeof((char)'\0'));
	
	// Set current currency information's abbreviation
	strncpy(currentCurrencyInformation->abbreviation, CURRENCY_ABBREVIATION, sizeof(currentCurrencyInformation->abbreviation) - sizeof((char)'\0'));
	
	// Set current currency information's version
	strncpy(currentCurrencyInformation->version, CURRENCY_VERSION, sizeof(currentCurrencyInformation->version) - sizeof((char)'\0'));
	
	// Set current currency information's icon details
	memcpy(&currentCurrencyInformation->iconDetails, &CURRENCY_ICON_DETAILS, sizeof(CURRENCY_ICON_DETAILS));
	
	// Check if has BAGL
	#ifdef HAVE_BAGL
	
		// Set current currency information's icon details
		currentCurrencyInformation->iconDetails.colors = currentCurrencyInformation->iconColors;
		currentCurrencyInformation->iconDetails.bitmap = currentCurrencyInformation->iconBitmap;
		
		// Set current currency information's icon colors
		memcpy(&currentCurrencyInformation->iconColors, &CURRENCY_ICON_COLORS, sizeof(CURRENCY_ICON_COLORS));
		
		// Set current currency information's icon bitmap
		memcpy(&currentCurrencyInformation->iconBitmap, &CURRENCY_ICON_BITMAP, sizeof(CURRENCY_ICON_BITMAP));
	
	// Otherwise check if has NBGL
	#elif defined HAVE_NBGL
	
		// Set current currency information's icon details
		currentCurrencyInformation->iconDetails.bitmap = currentCurrencyInformation->iconBitmap;
		
		// Set current currency information's icon bitmap
		memcpy(&currentCurrencyInformation->iconBitmap, &CURRENCY_ICON_BITMAP, sizeof(CURRENCY_ICON_BITMAP));
	#endif
	
	// Check if Slatepack address human-readable part exists
	#ifdef CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART
	
		// Set current currency information's Slatepack address human readable part
		strncpy(currentCurrencyInformation->slatepackAddressHumanReadablePart, CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART, sizeof(currentCurrencyInformation->slatepackAddressHumanReadablePart) - sizeof((char)'\0'));
	#endif
}
