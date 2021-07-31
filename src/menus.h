// Header guard
#ifndef MENUS_H
#define MENUS_H


// Header files
#include "crypto.h"
#include "currency_information.h"


// Definitions

// Check if target is the Nano X
#ifdef TARGET_NANOX

	// Line character length
	#define LINE_CHARACTER_LENGTH 20

// Otherwise
#else

	// Line character length
	#define LINE_CHARACTER_LENGTH 14
#endif

// Requestor line buffer length
#define REQUESTOR_LINE_BUFFER_LENGTH (LINE_CHARACTER_LENGTH * 2 + sizeof((char)'\0'))

// Time line buffer length
#define TIME_LINE_BUFFER_LENGTH sizeof("HH:MM:SS on YYYYYY-mm-dd ZZZ")

// Tor public key line buffer length
#define TOR_PUBLIC_KEY_LINE_BUFFER_LENGTH (ED25519_PUBLIC_KEY_SIZE * HEXADECIMAL_CHARACTER_SIZE + sizeof((char)'\0'))

// Amount line buffer length
#define AMOUNT_LINE_BUFFER_LENGTH (sizeof("18446744073709551615") - sizeof((char)'\0') + sizeof('.') + sizeof(' ') + CURRENCY_INFORMATION_ABBREVIATION_LENGTH)

// Fee line buffer length
#define FEE_LINE_BUFFER_LENGTH (sizeof("18446744073709551615") - sizeof((char)'\0') + sizeof('.') + sizeof(' ') + CURRENCY_INFORMATION_ABBREVIATION_LENGTH)

// Receiver line buffer length
#define RECEIVER_LINE_BUFFER_LENGTH (ED25519_PUBLIC_KEY_SIZE * HEXADECIMAL_CHARACTER_SIZE + sizeof((char)'\0'))


// Constants

// Menu
enum Menu {

	// Main menu
	MAIN_MENU,
	
	// About menu
	ABOUT_MENU,
	
	// Export root public key menu
	EXPORT_ROOT_PUBLIC_KEY_MENU,
	
	// Export Tor public key menu
	EXPORT_TOR_PUBLIC_KEY_MENU,
	
	// Sign Tor certificate menu
	SIGN_TOR_CERTIFICATE_MENU,
	
	// Export MQS public key menu
	EXPORT_MQS_PUBLIC_KEY_MENU,
	
	// Finalize transaction menu
	FINALIZE_TRANSACTION_MENU,
	
	// Processing menu
	PROCESSING_MENU
};

// Main menu screen
enum MainMenuScreen {

	// Ready
	READY_SCREEN,
	
	// About screen
	ABOUT_SCREEN,
	
	// Exit screen
	EXIT_SCREEN
};


// Global variables

// Requestor line buffer
extern char requestorLineBuffer[REQUESTOR_LINE_BUFFER_LENGTH];

// Time line buffer
extern char timeLineBuffer[TIME_LINE_BUFFER_LENGTH];

// Tor public key line buffer
extern char torPublicKeyLineBuffer[TOR_PUBLIC_KEY_LINE_BUFFER_LENGTH];

// Amount line buffer
extern char amountLineBuffer[AMOUNT_LINE_BUFFER_LENGTH];

// Fee line buffer
extern char feeLineBuffer[FEE_LINE_BUFFER_LENGTH];

// Receiver line buffer
extern char receiverLineBuffer[RECEIVER_LINE_BUFFER_LENGTH];


// Function prototypes

// Clear menu buffers
void clearMenuBuffers(void);

// Show main menu
void showMainMenu(enum MainMenuScreen mainMenuScreen);

// Show menu
void showMenu(enum Menu menu);


#endif
