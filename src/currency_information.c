// Header files
#include <string.h>
#include "currency_information.h"


// Constants

// Check if MQS version doesn't exists
#ifndef CURRENCY_MQS_VERSION

	// No MQS version
	static const uint8_t NO_MQS_VERSION[] = {0, 0};
#endif


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
	
	// Check if MQS address payment proof is allowed
	#ifdef CURRENCY_MQS_ADDRESS_PAYMENT_PROOF_ALLOWED
	
		// Set currency information's MQS address payment proof allowed
		currencyInformation->mqsAddressPaymentProofAllowed = true;
	
	// Otherwise
	#else
	
		// Set currency information's MQS address payment proof allowed
		currencyInformation->mqsAddressPaymentProofAllowed = false;
	#endif
	
	// Check if Tor address payment proof is allowed
	#ifdef CURRENCY_TOR_ADDRESS_PAYMENT_PROOF_ALLOWED
	
		// Set currency information's Tor address payment proof allowed
		currencyInformation->torAddressPaymentProofAllowed = true;
	
	// Otherwise
	#else
	
		// Set currency information's Tor address payment proof allowed
		currencyInformation->torAddressPaymentProofAllowed = false;
	#endif
	
	// Check if Ed25519 address payment proof is allowed
	#ifdef CURRENCY_ED25519_ADDRESS_PAYMENT_PROOF_ALLOWED
	
		// Set currency information's Ed25519 address payment proof allowed
		currencyInformation->ed25519AddressPaymentProofAllowed = true;
	
	// Otherwise
	#else
	
		// Set currency information's Ed25519 address payment proof allowed
		currencyInformation->ed25519AddressPaymentProofAllowed = false;
	#endif
	
	// Check if MQS version exists
	#ifdef CURRENCY_MQS_VERSION
	
		// Set currency information's MQS version
		memcpy(currencyInformation->mqsVersion, (uint8_t [])CURRENCY_MQS_VERSION, sizeof(currencyInformation->mqsVersion));
	
	// Otherwise
	#else
	
		// Set currency information's MQS version
		memcpy(currencyInformation->mqsVersion, NO_MQS_VERSION, sizeof(currencyInformation->mqsVersion));
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
}
