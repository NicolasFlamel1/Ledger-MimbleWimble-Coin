// Header guard
#ifndef MENUS_H
#define MENUS_H


// Header files
#include "crypto.h"
#include "currency_information.h"


// Definitions

// Time or processing message line buffer size
#define TIME_OR_PROCESSING_MESSAGE_LINE_BUFFER_SIZE sizeof("HH:MM:SS on YYYYYY-mm-dd UTC+00:00")

// Public key or address line buffer size
#define PUBLIC_KEY_OR_ADDRESS_LINE_BUFFER_SIZE (COMPRESSED_PUBLIC_KEY_SIZE * HEXADECIMAL_CHARACTER_SIZE + sizeof((char)'\0'))

// Verify address line buffer size
#define VERIFY_ADDRESS_LINE_BUFFER_SIZE sizeof("Verify Slatepack")

// Address type line buffer size
#define ADDRESS_TYPE_LINE_BUFFER_SIZE sizeof("Slatepack Address")

// Amount line buffer size
#define AMOUNT_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'.') + sizeof((char)' ') + CURRENCY_INFORMATION_ABBREVIATION_SIZE)

// Fee line buffer size
#define FEE_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'.') + sizeof((char)' ') + CURRENCY_INFORMATION_ABBREVIATION_SIZE)

// Kernel features line buffer size
#define KERNEL_FEATURES_LINE_BUFFER_SIZE sizeof("No Recent Duplicate")

// Kernel features details title line buffer size
#define KERNEL_FEATURES_DETAILS_TITLE_LINE_BUFFER_SIZE sizeof("Relative Height")

// Kernel features details text line buffer size
#define KERNEL_FEATURES_DETAILS_TEXT_LINE_BUFFER_SIZE (UINT64_BUFFER_SIZE + sizeof((char)'\0'))


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
	
	// Finalize transaction menu
	FINALIZE_TRANSACTION_MENU,
	
	// Processing menu
	PROCESSING_MENU
};


// Global variables

// Time or processing message line buffer
extern char timeOrProcessingMessageLineBuffer[TIME_OR_PROCESSING_MESSAGE_LINE_BUFFER_SIZE];

// Public key or address line buffer
extern char publicKeyOrAddressLineBuffer[PUBLIC_KEY_OR_ADDRESS_LINE_BUFFER_SIZE];

// Verify address line buffer
extern char verifyAddressLineBuffer[VERIFY_ADDRESS_LINE_BUFFER_SIZE];

// Address type line buffer
extern char addressTypeLineBuffer[ADDRESS_TYPE_LINE_BUFFER_SIZE];

// Amount line buffer
extern char amountLineBuffer[AMOUNT_LINE_BUFFER_SIZE];

// Fee line buffer
extern char feeLineBuffer[FEE_LINE_BUFFER_SIZE];

// Kernel features line buffer
extern char kernelFeaturesLineBuffer[KERNEL_FEATURES_LINE_BUFFER_SIZE];

// Kernel features details title line buffer
extern char kernelFeaturesDetailsTitleLineBuffer[KERNEL_FEATURES_DETAILS_TITLE_LINE_BUFFER_SIZE];

// Kernel features details text line buffer
extern char kernelFeaturesDetailsTextLineBuffer[KERNEL_FEATURES_DETAILS_TEXT_LINE_BUFFER_SIZE];


// Function prototypes

// Clear menu buffers
void clearMenuBuffers(void);

// Show main menu
void showMainMenu();

// Show menu
void showMenu(enum Menu menu);


#endif
