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

// Check if has NBGL
#ifdef HAVE_NBGL

	// Verify address, approve transaction, or sign challenge line buffer size
	#define VERIFY_ADDRESS_APPROVE_TRANSACTION_OR_SIGN_CHALLENGE_LINE_BUFFER_SIZE sizeof("Verify Slatepack\naddress")

// Otherwise
#else

	// Verify address, approve transaction, or sign challenge line buffer size
	#define VERIFY_ADDRESS_APPROVE_TRANSACTION_OR_SIGN_CHALLENGE_LINE_BUFFER_SIZE sizeof("Verify Slatepack")
#endif

// Amount or address type line buffer size
#define AMOUNT_OR_ADDRESS_TYPE_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'.') + sizeof((char)' ') + CURRENCY_INFORMATION_ABBREVIATION_SIZE)

// Fee line buffer size
#define FEE_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'.') + sizeof((char)' ') + CURRENCY_INFORMATION_ABBREVIATION_SIZE)

// Kernel features or transaction type line buffer size
#define KERNEL_FEATURES_OR_TRANSACTION_TYPE_LINE_BUFFER_SIZE sizeof("No Recent Duplicate")

// Kernel features details title or sign type line buffer size
#define KERNEL_FEATURES_DETAILS_TITLE_OR_SIGN_TYPE_LINE_BUFFER_SIZE sizeof("Relative Height")

// Kernel features details text or account index line buffer size
#define KERNEL_FEATURES_DETAILS_TEXT_OR_ACCOUNT_INDEX_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'\0'))

// Maximum progress bar percent
#define MAXIMUM_PROGRESS_BAR_PERCENT UINT8_MAX

// Check if has NBGL
#ifdef HAVE_NBGL

	// Succeeded line buffer size
	#define SUCCEEDED_LINE_BUFFER_SIZE sizeof("SLATEPACK\nADDRESS VERIFIED")
	
	// Failed line buffer size
	#define FAILED_LINE_BUFFER_SIZE sizeof("Verifying Slatepack\naddress failed")
	
	// Canceled line buffer size
	#define CANCELED_LINE_BUFFER_SIZE sizeof("Verifying Slatepack\naddress canceled")
	
	// Cancel prompt line buffer size
	#define CANCEL_PROMPT_LINE_BUFFER_SIZE sizeof("Deny signing\nEpicbox challenge?")
	
	// Approve button line buffer
	#define APPROVE_BUTTON_LINE_BUFFER_SIZE sizeof("Hold to receive")
	
	// Warning line buffer
	#define WARNING_LINE_BUFFER sizeof("*The host will be able to listen\nfor the account's Epicbox\ntransactions")
#endif


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
	
	// Sign MQS challenge menu,
	SIGN_MQS_CHALLENGE_MENU,
	
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

// Verify address, approve transaction, or sign challenge line buffer
extern char verifyAddressApproveTransactionOrSignChallengeLineBuffer[VERIFY_ADDRESS_APPROVE_TRANSACTION_OR_SIGN_CHALLENGE_LINE_BUFFER_SIZE];

// Amount or address type line buffer
extern char amountOrAddressTypeLineBuffer[AMOUNT_OR_ADDRESS_TYPE_LINE_BUFFER_SIZE];

// Fee line buffer
extern char feeLineBuffer[FEE_LINE_BUFFER_SIZE];

// Kernel features or transaction type line buffer
extern char kernelFeaturesOrTransactionTypeLineBuffer[KERNEL_FEATURES_OR_TRANSACTION_TYPE_LINE_BUFFER_SIZE];

// Kernel features details title or sign type line buffer
extern char kernelFeaturesDetailsTitleOrSignTypeLineBuffer[KERNEL_FEATURES_DETAILS_TITLE_OR_SIGN_TYPE_LINE_BUFFER_SIZE];

// Kernel features details text or account index line buffer
extern char kernelFeaturesDetailsTextOrAccountIndexLineBuffer[KERNEL_FEATURES_DETAILS_TEXT_OR_ACCOUNT_INDEX_LINE_BUFFER_SIZE];

// Check if has NBGL
#ifdef HAVE_NBGL

	// Succeeded line buffer
	extern char succeededLineBuffer[SUCCEEDED_LINE_BUFFER_SIZE];
	
	// Failed line buffer
	extern char failedLineBuffer[FAILED_LINE_BUFFER_SIZE];
	
	// Canceled line buffer
	extern char canceledLineBuffer[CANCELED_LINE_BUFFER_SIZE];
	
	// Cancel prompt line buffer
	extern char cancelPromptLineBuffer[CANCEL_PROMPT_LINE_BUFFER_SIZE];
	
	// Approve button line buffer
	extern char approveButtonLineBuffer[APPROVE_BUTTON_LINE_BUFFER_SIZE];
	
	// Warning line buffer
	extern char warningLineBuffer[WARNING_LINE_BUFFER];
#endif


// Function prototypes

// Clear menu buffers
void clearMenuBuffers(void);

// Show main menu
void showMainMenu(void);

// Show menu
void showMenu(const enum Menu menu);

// Show progress bar
void showProgressBar(const uint8_t percent);


#endif
