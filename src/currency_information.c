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
	
	// Check if enable no recent duplicate kernels
	#ifdef CURRENCY_ENABLE_NO_RECENT_DUPLICATE_KERNELS
	
		// Set current currency information's enable no recent duplicate kernels
		currentCurrencyInformation->enableNoRecentDuplicateKernels = true;
	#endif
	
	// Check if maximum fee exists
	#ifdef CURRENCY_MAXIMUM_FEE
	
		// Assert that currency maximum fee is valid
		_Static_assert(CURRENCY_MAXIMUM_FEE >= 0 && CURRENCY_MAXIMUM_FEE <= UINT64_MAX, "Invalid currency maximum fee");
	
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
	
	// Assert that currency address derivation type is valid
	_Static_assert(CURRENCY_ADDRESS_DERIVATION_TYPE >= MWC_ADDRESS_DERIVATION && CURRENCY_ADDRESS_DERIVATION_TYPE <= GRIN_ADDRESS_DERIVATION, "Invalid currency address derivation type");
	
	// Set current currency information's address derivation type
	currentCurrencyInformation->addressDerivationType = CURRENCY_ADDRESS_DERIVATION_TYPE;
	
	// Assert that currency payment proof message type is valid
	_Static_assert(CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE >= ASCII_PAYMENT_PROOF_MESSAGE && CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE <= BINARY_PAYMENT_PROOF_MESSAGE, "Invalid currency payment proof message type");
	
	// Set current currency information's payment proof message type
	currentCurrencyInformation->paymentProofMessageType = CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE;
	
	// Assert that currency supported payment proof address types is valid
	_Static_assert(CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES >= 0 && CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES <= UINT8_MAX, "Invalid currency supported payment proof address types");
	
	// Set current currency information's supported payment proof address types
	currentCurrencyInformation->supportedPaymentProofAddressTypes = CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES;
	
	// Assert that currency supported slate encryption types is valid
	_Static_assert(CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES >= 0 && CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES <= UINT8_MAX, "Invalid currency supported slate encryption types");
	
	// Set current currency information's supported slate encryption types
	currentCurrencyInformation->supportedSlateEncryptionTypes = CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES;
	
	// Check if MQS name exists
	#ifdef CURRENCY_MQS_NAME
	
		// Set current currency information's MQS name
		strncpy(currentCurrencyInformation->mqsName, CURRENCY_MQS_NAME, sizeof(currentCurrencyInformation->mqsName) - sizeof((char)'\0'));
	#endif
	
	// Set current currency information's name
	strncpy(currentCurrencyInformation->name, CURRENCY_NAME, sizeof(currentCurrencyInformation->name) - sizeof((char)'\0'));
	
	// Set current currency information's abbreviation
	strncpy(currentCurrencyInformation->abbreviation, CURRENCY_ABBREVIATION, sizeof(currentCurrencyInformation->abbreviation) - sizeof((char)'\0'));
	
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
