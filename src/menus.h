// Header guard
#ifndef MENUS_H
#define MENUS_H


// Header files
#include "crypto.h"
#include "currency_information.h"


// Definitions

// Time, processing message, progress bar message, or currency name line buffer size
#define TIME_PROCESSING_MESSAGE_PROGRESS_BAR_MESSAGE_OR_CURRENCY_NAME_LINE_BUFFER_SIZE sizeof("HH:MM:SS on YYYYYY-mm-dd UTC+00:00")

// Public key or address line buffer size
#define PUBLIC_KEY_OR_ADDRESS_LINE_BUFFER_SIZE (COMPRESSED_PUBLIC_KEY_SIZE * HEXADECIMAL_CHARACTER_SIZE + sizeof((char)'\0'))

// Verify address, approve transaction, or currency version line buffer size
#define VERIFY_ADDRESS_APPROVE_TRANSACTION_OR_CURRENCY_VERSION_LINE_BUFFER_SIZE sizeof("Verify Slatepack")

// Address type line buffer size
#define ADDRESS_TYPE_LINE_BUFFER_SIZE sizeof("Slatepack Address")

// Amount line buffer size
#define AMOUNT_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'.') + sizeof((char)' ') + CURRENCY_INFORMATION_ABBREVIATION_SIZE)

// Fee line buffer size
#define FEE_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'.') + sizeof((char)' ') + CURRENCY_INFORMATION_ABBREVIATION_SIZE)

// Kernel features or transaction type line buffer size
#define KERNEL_FEATURES_OR_TRANSACTION_TYPE_LINE_BUFFER_SIZE sizeof("No Recent Duplicate")

// Kernel features details title line buffer size
#define KERNEL_FEATURES_DETAILS_TITLE_LINE_BUFFER_SIZE sizeof("Relative Height")

// Kernel features details text or account index line buffer size
#define KERNEL_FEATURES_DETAILS_TEXT_OR_ACCOUNT_INDEX_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'\0'))

// Maximum progress bar percent
#define MAXIMUM_PROGRESS_BAR_PERCENT UINT8_MAX


// Constants

// Menu
enum Menu {

	// Main menu
	MAIN_MENU,
	
	// Export root public key menu
	EXPORT_ROOT_PUBLIC_KEY_MENU,
	
	// Verify root public key menu
	VERIFY_ROOT_PUBLIC_KEY_MENU,
	
	// Verify address menu
	VERIFY_ADDRESS_MENU,
	
	// Sign MQS timestamp menu,
	SIGN_MQS_TIMESTAMP_MENU,
	
	// Sign Tor certificate menu
	SIGN_TOR_CERTIFICATE_MENU,
	
	// Approve transaction menu
	APPROVE_TRANSACTION_MENU,
	
	// Processing menu
	PROCESSING_MENU
};


// Global variables

// Time, processing message, progress bar message, or currency name line buffer
extern volatile char timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer[TIME_PROCESSING_MESSAGE_PROGRESS_BAR_MESSAGE_OR_CURRENCY_NAME_LINE_BUFFER_SIZE];

// Public key or address line buffer
extern volatile char publicKeyOrAddressLineBuffer[PUBLIC_KEY_OR_ADDRESS_LINE_BUFFER_SIZE];

// Verify address, approve transaction, or currency version line buffer
extern char verifyAddressApproveTransactionOrCurrencyVersionLineBuffer[VERIFY_ADDRESS_APPROVE_TRANSACTION_OR_CURRENCY_VERSION_LINE_BUFFER_SIZE];

// Address type line buffer
extern char addressTypeLineBuffer[ADDRESS_TYPE_LINE_BUFFER_SIZE];

// Amount line buffer
extern char amountLineBuffer[AMOUNT_LINE_BUFFER_SIZE];

// Fee line buffer
extern char feeLineBuffer[FEE_LINE_BUFFER_SIZE];

// Kernel features or transaction type line buffer
extern char kernelFeaturesOrTransactionTypeLineBuffer[KERNEL_FEATURES_OR_TRANSACTION_TYPE_LINE_BUFFER_SIZE];

// Kernel features details title line buffer
extern char kernelFeaturesDetailsTitleLineBuffer[KERNEL_FEATURES_DETAILS_TITLE_LINE_BUFFER_SIZE];

// Kernel features details text or account index line buffer
extern char kernelFeaturesDetailsTextOrAccountIndexLineBuffer[KERNEL_FEATURES_DETAILS_TEXT_OR_ACCOUNT_INDEX_LINE_BUFFER_SIZE];

// Currency icon buffer
extern bagl_icon_details_t currencyIconBuffer;


// Function prototypes

// Clear menu buffers
void clearMenuBuffers(void);

// Show main menu
void showMainMenu(void);

// Show menu
void showMenu(enum Menu menu);

// Show progress bar
void showProgressBar(uint8_t percent);


#endif
