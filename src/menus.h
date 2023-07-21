// Header guard
#ifndef MENUS_H
#define MENUS_H


// Header files
#include "crypto.h"
#include "mqs.h"
#include "tor.h"
#include "slatepack.h"


// Definitions

// Time line buffer size
#define TIME_LINE_BUFFER_SIZE sizeof("HH:MM:SS on YYYYYY-mm-dd UTC+00:00")

// Progress bar message line buffer size
#define PROGRESS_BAR_MESSAGE_LINE_BUFFER_SIZE sizeof("Receiving Transaction")

// Public key line buffer size
#define PUBLIC_KEY_LINE_BUFFER_SIZE (COMPRESSED_PUBLIC_KEY_SIZE * HEXADECIMAL_CHARACTER_SIZE + sizeof((char)'\0'))

// Address line buffer size
#define ADDRESS_LINE_BUFFER_SIZE (SLATEPACK_ADDRESS_SIZE + sizeof((char)'\0'))

// Check if has NBGL
#ifdef HAVE_NBGL

	// Verify address line buffer size
	#define VERIFY_ADDRESS_LINE_BUFFER_SIZE MAX(sizeof("Verify Slatepack\naddress"), sizeof("Verify ") - sizeof((char)'\0') + sizeof(CURRENCY_MQS_NAME) + sizeof("\naddress") - sizeof((char)'\0'))

	// Approve transaction line buffer size
	#define APPROVE_TRANSACTION_LINE_BUFFER_SIZE sizeof("Receive transaction?")

	// Sign challenge line buffer size
	#define SIGN_CHALLENGE_LINE_BUFFER_SIZE (sizeof("Sign ") - sizeof((char)'\0') + sizeof(CURRENCY_MQS_NAME) + sizeof("\nchallenge?") - sizeof((char)'\0'))

// Otherwise
#else

	// Verify address line buffer size
	#define VERIFY_ADDRESS_LINE_BUFFER_SIZE MAX(sizeof("Verify Slatepack"), sizeof("Verify ") - sizeof((char)'\0') + sizeof(CURRENCY_MQS_NAME))

	// Approve transaction line buffer size
	#define APPROVE_TRANSACTION_LINE_BUFFER_SIZE sizeof("Receive")

	// Sign challenge line buffer size
	#define SIGN_CHALLENGE_LINE_BUFFER_SIZE (sizeof("Sign ") - sizeof((char)'\0') + sizeof(CURRENCY_MQS_NAME))
#endif

// Amount line buffer size
#define AMOUNT_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'.') + sizeof((char)' ') + sizeof(CURRENCY_ABBREVIATION))

// Address type line buffer size
#define ADDRESS_TYPE_LINE_BUFFER_SIZE MAX(sizeof("Slatepack Address"), sizeof(CURRENCY_MQS_NAME) + sizeof(" Address") - sizeof((char)'\0'))

// Fee line buffer size
#define FEE_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'.') + sizeof((char)' ') + sizeof(CURRENCY_ABBREVIATION))

// Kernel features line buffer size
#define KERNEL_FEATURES_LINE_BUFFER_SIZE sizeof("No Recent Duplicate")

// Kernel features details title line buffer size
#define KERNEL_FEATURES_DETAILS_TITLE_LINE_BUFFER_SIZE sizeof("Relative Height")

// Kernel features details text line buffer size
#define KERNEL_FEATURES_DETAILS_TEXT_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'\0'))

// Account index line buffer size
#define ACCOUNT_INDEX_LINE_BUFFER_SIZE (UINT32_BUFFER_SIZE + sizeof((char)'\0'))

// Maximum progress bar percent
#define MAXIMUM_PROGRESS_BAR_PERCENT UINT8_MAX

// Check if has NBGL
#ifdef HAVE_NBGL

	// Succeeded line buffer size
	#define SUCCEEDED_LINE_BUFFER_SIZE MAX(sizeof("SLATEPACK\nADDRESS VERIFIED"), sizeof(CURRENCY_MQS_NAME) + sizeof(" ADDRESS\nVERIFIED") - sizeof((char)'\0'))

	// Failed line buffer size
	#define FAILED_LINE_BUFFER_SIZE MAX(sizeof("Verifying Slatepack\naddress failed"), sizeof("Verifying ") - sizeof((char)'\0') + sizeof(CURRENCY_MQS_NAME) + sizeof("\naddress failed") - sizeof((char)'\0'))

	// Canceled line buffer size
	#define CANCELED_LINE_BUFFER_SIZE MAX(sizeof("Verifying Slatepack\naddress canceled"), sizeof("Verifying ") - sizeof((char)'\0') + sizeof(CURRENCY_MQS_NAME) + sizeof("\naddress canceled") - sizeof((char)'\0'))

	// Cancel prompt line buffer size
	#define CANCEL_PROMPT_LINE_BUFFER_SIZE MAX(sizeof("Deny receiving\ntransaction?"), sizeof("Deny signing\n") - sizeof((char)'\0') + sizeof(CURRENCY_MQS_NAME) + sizeof(" challenge?") - sizeof((char)'\0'))

	// Approve button line buffer
	#define APPROVE_BUTTON_LINE_BUFFER_SIZE sizeof("Hold to receive")

	// Warning line buffer
	#define WARNING_LINE_BUFFER (sizeof("*The host will be able to listen\nfor the account's ") - sizeof((char)'\0') + sizeof(CURRENCY_MQS_NAME) + sizeof("\ntransactions") - sizeof((char)'\0'))
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

// Time line buffer
extern char timeLineBuffer[TIME_LINE_BUFFER_SIZE];

// Progress bar message line buffer
extern char progressBarMessageLineBuffer[PROGRESS_BAR_MESSAGE_LINE_BUFFER_SIZE];

// Public key line buffer
extern volatile char publicKeyLineBuffer[PUBLIC_KEY_LINE_BUFFER_SIZE];

// Address line buffer
extern char addressLineBuffer[ADDRESS_LINE_BUFFER_SIZE];

// Verify address line buffer
extern char verifyAddressLineBuffer[VERIFY_ADDRESS_LINE_BUFFER_SIZE];

// Approve transaction line buffer
extern char approveTransactionLineBuffer[APPROVE_TRANSACTION_LINE_BUFFER_SIZE];

// Sign challenge line buffer
extern char signChallengeLineBuffer[SIGN_CHALLENGE_LINE_BUFFER_SIZE];

// Amount line buffer
extern char amountLineBuffer[AMOUNT_LINE_BUFFER_SIZE];

// Address type line buffer
extern char addressTypeLineBuffer[ADDRESS_TYPE_LINE_BUFFER_SIZE];

// Fee line buffer
extern char feeLineBuffer[FEE_LINE_BUFFER_SIZE];

// Kernel features line buffer
extern char kernelFeaturesLineBuffer[KERNEL_FEATURES_LINE_BUFFER_SIZE];

// Kernel features details title line buffer
extern char kernelFeaturesDetailsTitleLineBuffer[KERNEL_FEATURES_DETAILS_TITLE_LINE_BUFFER_SIZE];

// Kernel features details text line buffer
extern char kernelFeaturesDetailsTextLineBuffer[KERNEL_FEATURES_DETAILS_TEXT_LINE_BUFFER_SIZE];

// Account index line buffer
extern char accountIndexLineBuffer[ACCOUNT_INDEX_LINE_BUFFER_SIZE];

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
