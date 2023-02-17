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

	// Assert that currency BIP44 coin type is valid
	_Static_assert(CURRENCY_BIP44_COIN_TYPE >= 0 && CURRENCY_BIP44_COIN_TYPE <= UINT32_MAX, "Invalid currency BIP44 coin type");
	
	// Set current currency information's BIP44 coin type
	currentCurrencyInformation->bip44CoinType = CURRENCY_BIP44_COIN_TYPE;
	
	// Assert that currency fractional digits is valid
	_Static_assert(CURRENCY_FRACTIONAL_DIGITS >= 0 && CURRENCY_FRACTIONAL_DIGITS <= UINT8_MAX, "Invalid currency fractional digits");
	
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
	
		// Assert that currency maximum fee is valid
		_Static_assert(CCURRENCY_MAXIMUM_FEE >= 0 && CURRENCY_MAXIMUM_FEE <= UINT64_MAX, "Invalid currency maximum fee");
	
		// Set current currency information's maximum fee
		currentCurrencyInformation->maximumFee = CURRENCY_MAXIMUM_FEE;
	
	// Otherwise
	#else
	
		// Set current currency information's maximum fee
		currentCurrencyInformation->maximumFee = UINT64_MAX;
	#endif
	
	// Assert that currency ID is valid
	_Static_assert(CURRENCY_ID >= 0 && CURRENCY_ID < TOTAL_NUMBER_OF_SUPPORTED_CURRENCIES, "Invalid currency ID");
	
	// Set current currency information's ID
	currentCurrencyInformation->id = CURRENCY_ID;
	
	// Check if MQS version exists
	#ifdef CURRENCY_MQS_VERSION
	
		// Assert that that currency MQS version is valid
		_Static_assert(sizeof((uint8_t [])CURRENCY_MQS_VERSION) == sizeof(currentCurrencyInformation->mqsVersion), "Invalid currency MQS version");
	
		// Set current currency information's MQS version
		memcpy(currentCurrencyInformation->mqsVersion, (uint8_t [])CURRENCY_MQS_VERSION, sizeof((uint8_t [])CURRENCY_MQS_VERSION));
	#endif
	
	// Set current currency information's name
	strncpy(currentCurrencyInformation->name, CURRENCY_NAME, sizeof(currentCurrencyInformation->name) - sizeof((char)'\0'));
	
	// Set current currency information's abbreviation
	strncpy(currentCurrencyInformation->abbreviation, CURRENCY_ABBREVIATION, sizeof(currentCurrencyInformation->abbreviation) - sizeof((char)'\0'));
	
	// Set current currency information's version
	strncpy(currentCurrencyInformation->version, CURRENCY_VERSION, sizeof(currentCurrencyInformation->version) - sizeof((char)'\0'));
	
	// Assert that that currency icon details is valid
	_Static_assert(sizeof(CURRENCY_ICON_DETAILS) == sizeof(currentCurrencyInformation->iconDetails), "Invalid currency icon details");
	
	// Set current currency information's icon details
	memcpy(&currentCurrencyInformation->iconDetails, &CURRENCY_ICON_DETAILS, sizeof(CURRENCY_ICON_DETAILS));
	
	// Check if has BAGL
	#ifdef HAVE_BAGL
	
		// Set current currency information's icon details
		currentCurrencyInformation->iconDetails.colors = currentCurrencyInformation->iconColors;
		currentCurrencyInformation->iconDetails.bitmap = currentCurrencyInformation->iconBitmap;
		
		// Set current currency information's icon colors
		memcpy(&currentCurrencyInformation->iconColors, &CURRENCY_ICON_COLORS, sizeof(currentCurrencyInformation->iconColors));
		
		// Assert that that currency icon bitmap is valid
		_Static_assert(sizeof(CURRENCY_ICON_BITMAP) <= sizeof(currentCurrencyInformation->iconBitmap), "Invalid currency icon bitmap");
		
		// Set current currency information's icon bitmap
		memcpy(&currentCurrencyInformation->iconBitmap, &CURRENCY_ICON_BITMAP, sizeof(CURRENCY_ICON_BITMAP));
	
	// Otherwise check if has NBGL
	#elif defined HAVE_NBGL
	
		// Set current currency information's icon details
		currentCurrencyInformation->iconDetails.bitmap = currentCurrencyInformation->iconBitmap;
		
		// Assert that that currency icon bitmap is valid
		_Static_assert(sizeof(CURRENCY_ICON_BITMAP) <= sizeof(currentCurrencyInformation->iconBitmap), "Invalid currency icon bitmap");
		
		// Set current currency information's icon bitmap
		memcpy(&currentCurrencyInformation->iconBitmap, &CURRENCY_ICON_BITMAP, sizeof(CURRENCY_ICON_BITMAP));
	#endif
	
	// Check if Slatepack address human-readable part exists
	#ifdef CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART
	
		// Set current currency information's Slatepack address human readable part
		strncpy(currentCurrencyInformation->slatepackAddressHumanReadablePart, CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART, sizeof(currentCurrencyInformation->slatepackAddressHumanReadablePart) - sizeof((char)'\0'));
	#endif
}
