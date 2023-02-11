// Header files
#include <os_io_seproxyhal.h>
#include <string.h>
#include <ux.h>
#include "common.h"
#include "currency_information.h"
#include "menus.h"
#include "process_requests.h"

// Check if has NBGL
#ifdef HAVE_NBGL

	// Header files
	#include <nbgl_use_case.h>
#endif


// Definitions

// Progress bar padding
#define PROGRESS_BAR_PADDING 6

// Check if device has low height
#if BAGL_HEIGHT < 64

	// Progress bar height
	#define PROGRESS_BAR_HEIGHT 10
	
	// Start of text next to picture
	#define START_OF_TEXT_NEXT_TO_PICTURE 41
	
	// Largest character width
	#define LARGEST_CHARACTER_WIDTH 10

// Otherwise
#else

	// Progress bar height
	#define PROGRESS_BAR_HEIGHT 12
#endif


// Global variables

// Time, processing message, progress bar message, or currency name line buffer
volatile char timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer[TIME_PROCESSING_MESSAGE_PROGRESS_BAR_MESSAGE_OR_CURRENCY_NAME_LINE_BUFFER_SIZE];

// Public key or address line buffer
volatile char publicKeyOrAddressLineBuffer[PUBLIC_KEY_OR_ADDRESS_LINE_BUFFER_SIZE];

// Verify address, approve transaction, or currency version line buffer
char verifyAddressApproveTransactionOrCurrencyVersionLineBuffer[VERIFY_ADDRESS_APPROVE_TRANSACTION_OR_CURRENCY_VERSION_LINE_BUFFER_SIZE];

// Address type line buffer
char addressTypeLineBuffer[ADDRESS_TYPE_LINE_BUFFER_SIZE];

// Amount line buffer
char amountLineBuffer[AMOUNT_LINE_BUFFER_SIZE];

// Fee line buffer
char feeLineBuffer[FEE_LINE_BUFFER_SIZE];

// Kernel features or transaction type line buffer
char kernelFeaturesOrTransactionTypeLineBuffer[KERNEL_FEATURES_OR_TRANSACTION_TYPE_LINE_BUFFER_SIZE];

// Kernel features details title line buffer
char kernelFeaturesDetailsTitleLineBuffer[KERNEL_FEATURES_DETAILS_TITLE_LINE_BUFFER_SIZE];

// Kernel features details text or account index line buffer
char kernelFeaturesDetailsTextOrAccountIndexLineBuffer[KERNEL_FEATURES_DETAILS_TEXT_OR_ACCOUNT_INDEX_LINE_BUFFER_SIZE];

// Check if has BAGL
#ifdef HAVE_BAGL

	// Currency icon buffer
	static bagl_icon_details_t currencyIconBuffer;

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

	// Currency icon buffer
	static nbgl_icon_details_t currencyIconBuffer;
	
	// Export root public key menu tag value pairs
	static nbgl_layoutTagValue_t exportRootPublicKeyMenuTagValuePairs[3];
	
	// Export root public key menu tag value list
	static nbgl_layoutTagValueList_t exportRootPublicKeyMenuTagValueList;
	
	// Export root public key menu info long press
	static nbgl_pageInfoLongPress_t exportRootPublicKeyMenuInfoLongPress;
	
	// Verify root public key menu tag value pairs
	static nbgl_layoutTagValue_t verifyRootPublicKeyMenuTagValuePairs[1];
	
	// Verify root public key menu content
	static nbgl_pageContent_t verifyRootPublicKeyMenuContent;
	
	// Verify root public key menu navigation info
	static nbgl_pageNavigationInfo_t verifyRootPublicKeyMenuNavigationInfo;
	
	// Verify address menu tag value pairs
	static nbgl_layoutTagValue_t verifyAddressMenuTagValuePairs[1];
	
	// Verify address menu content
	static nbgl_pageContent_t verifyAddressMenuContent;
	
	// Verify address menu modal layout
	static nbgl_layout_t verifyAddressMenuModalLayout;
	
	// Verify address navigation info
	static nbgl_pageNavigationInfo_t verifyAddressMenuNavigationInfo;
	
	// Sign MQS timestamp menu tag value pairs
	static nbgl_layoutTagValue_t signMqsTimestampMenuTagValuePairs[3];
	
	// Sign MQS timestamp menu tag value list
	static nbgl_layoutTagValueList_t signMqsTimestampMenuTagValueList;
	
	// Sign MQS timestamp menu info long press
	static nbgl_pageInfoLongPress_t signMqsTimestampMenuInfoLongPress;
	
	// Sign Tor certificate menu tag value pairs
	static nbgl_layoutTagValue_t signTorCertificateMenuTagValuePairs[4];
	
	// Sign Tor certificate menu tag value list
	static nbgl_layoutTagValueList_t signTorCertificateMenuTagValueList;
	
	// Sign Tor certificate menu info long press
	static nbgl_pageInfoLongPress_t signTorCertificateMenuInfoLongPress;
#endif


// Constants

// Check if has BAGL
#ifdef HAVE_BAGL

	// Main menu currency name ready screen
	static UX_STEP_NOCB(mainMenuCurrencyNameReadyScreen, pnn, {
			
		// Picture
		&currencyIconBuffer,
		
		// First line
		(char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer,
		
		// Second line
		"is ready"
	});

	// Main menu ready screen
	static UX_STEP_NOCB(mainMenuReadyScreen, pnn, {

		// Picture
		&currencyIconBuffer,
		
		// First line
		"Application",
		
		// Second line
		"is ready"
	});

	// Main menu currency screen
	static UX_STEP_NOCB(mainMenuCurrencyScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = "Currency",
		
		// Text
		.text = (char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer
	});

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

		// Main menu version single line screen
		static UX_STEP_NOCB(mainMenuVersionSingleLineScreen, bn, {
				
			// Bold first line
			"Version",
			
			// Second line
			verifyAddressApproveTransactionOrCurrencyVersionLineBuffer
		});
	#endif

	// Main menu version multiline screen
	static UX_STEP_NOCB(mainMenuVersionMultilineScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = "Version",
		
		// Text
		.text = verifyAddressApproveTransactionOrCurrencyVersionLineBuffer
	});

	// Main menu exit screen
	static UX_STEP_VALID(mainMenuExitScreen, pb, exitApplication(), {

		// Picture
		&C_icon_back,
		
		// Bold line
		"Back to dashboard"
	});

	// Main menu
	static const ux_flow_step_t *mainMenu[6];

	// Export root public key menu notify screen
	static UX_STEP_NOCB(exportRootPublicKeyMenuNotifyScreen, pnn, {

		// Picture
		&C_icon_view,

		// First line
		"Export root",
		
		// Second line
		"public key?"
	});

	// Export root public key menu account index screen
	static UX_STEP_NOCB(exportRootPublicKeyMenuAccountIndexScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
			
			{

				// Title
				.title = "Account Index",
				
				// Text
				.text = kernelFeaturesDetailsTextOrAccountIndexLineBuffer
			}
		
		// Otherwise
		#else
		
			// Layout
			bn,
			
			{
			
				// Bold first line
				"Account Index",
				
				// Second line
				kernelFeaturesDetailsTextOrAccountIndexLineBuffer
			}
		#endif
	);

	// Export root public key menu warning screen one
	static UX_STEP_NOCB(exportRootPublicKeyMenuWarningScreenOne, pnn, {

		// Picture
		&C_icon_warning,
		
		// First line
		"The host will",
		
		// Second line
		"be able to view"
	});

	// Export root public key menu warning screen two
	static UX_STEP_NOCB(exportRootPublicKeyMenuWarningScreenTwo, pnn, {

		// Picture
		&C_icon_warning,
		
		// First line
		"the account's",
		
		// Second line
		"transactions"
	});

	// Export root public key menu approve screen
	static UX_STEP_CB(exportRootPublicKeyMenuApproveScreen, pb, processUserInteraction(GET_ROOT_PUBLIC_KEY_INSTRUCTION, true, true), {

		// Picture
		&C_icon_approve,
		
		// Bold line
		"Approve"
	});

	// Export root public key menu deny screen
	static UX_STEP_CB(exportRootPublicKeyMenuDenyScreen, pb, processUserInteraction(GET_ROOT_PUBLIC_KEY_INSTRUCTION, false, false), {

		// Picture
		&C_icon_reject,
		
		// Bold line
		"Deny"
	});

	// Export root public key menu
	static UX_FLOW(exportRootPublicKeyMenu,

		// Export root public key menu notify screen
		&exportRootPublicKeyMenuNotifyScreen,
		
		// Export root public key menu account index screen
		&exportRootPublicKeyMenuAccountIndexScreen,
		
		// Export root public key menu warning screen one
		&exportRootPublicKeyMenuWarningScreenOne,
		
		// Export root public key menu warning screen two
		&exportRootPublicKeyMenuWarningScreenTwo,

		// Export root public key menu approve screen
		&exportRootPublicKeyMenuApproveScreen,
		
		// Export root public key menu deny screen
		&exportRootPublicKeyMenuDenyScreen
	);

	// Verify root public key menu notify screen
	static UX_STEP_NOCB(verifyRootPublicKeyMenuNotifyScreen, pnn, {

		// Picture
		&C_icon_view,

		// First line
		"Verify root",
		
		// Second line
		"public key"
	});

	// Verify root public key menu public key screen
	static UX_STEP_NOCB(verifyRootPublicKeyMenuPublicKeyScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = "Root Public Key",
		
		// Text
		.text = (char *)publicKeyOrAddressLineBuffer
	});

	// Verify root public key menu valid screen
	static UX_STEP_CB(verifyRootPublicKeyMenuValidScreen, pb, processUserInteraction(VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION, true, false), {

		// Picture
		&C_icon_approve,
		
		// Bold line
		"Valid"
	});

	// Verify root public key menu invalid screen
	static UX_STEP_CB(verifyRootPublicKeyMenuInvalidScreen, pb, processUserInteraction(VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION, false, false), {

		// Picture
		&C_icon_reject,
		
		// Bold line
		"Invalid"
	});

	// Verify root public key menu
	static UX_FLOW(verifyRootPublicKeyMenu,

		// Verify root public key menu notify screen
		&verifyRootPublicKeyMenuNotifyScreen,
		
		// Verify root public key menu public key screen
		&verifyRootPublicKeyMenuPublicKeyScreen,

		// Verify root public key menu approve screen
		&verifyRootPublicKeyMenuValidScreen,
		
		// Verify root public key menu deny screen
		&verifyRootPublicKeyMenuInvalidScreen
	);

	// Verify address menu notify screen
	static UX_STEP_NOCB(verifyAddressMenuNotifyScreen, pnn, {

		// Picture
		&C_icon_view,

		// First line
		verifyAddressApproveTransactionOrCurrencyVersionLineBuffer,
		
		// Second line
		"address"
	});

	// Verify address menu address screen
	static UX_STEP_NOCB(verifyAddressMenuAddressScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = addressTypeLineBuffer,
		
		// Text
		.text = (char *)publicKeyOrAddressLineBuffer
	});

	// Verify address menu valid screen
	static UX_STEP_CB(verifyAddressMenuValidScreen, pb, processUserInteraction(VERIFY_ADDRESS_INSTRUCTION, true, false), {

		// Picture
		&C_icon_approve,
		
		// Bold line
		"Valid"
	});

	// Verify address menu invalid screen
	static UX_STEP_CB(verifyAddressMenuInvalidScreen, pb, processUserInteraction(VERIFY_ADDRESS_INSTRUCTION, false, false), {

		// Picture
		&C_icon_reject,
		
		// Bold line
		"Invalid"
	});

	// Verify address menu
	static UX_FLOW(verifyAddressMenu,

		// Verify address menu notify screen
		&verifyAddressMenuNotifyScreen,
		
		// Verify address menu public key screen
		&verifyAddressMenuAddressScreen,

		// Verify address menu approve screen
		&verifyAddressMenuValidScreen,
		
		// Verify address menu deny screen
		&verifyAddressMenuInvalidScreen
	);

	// Sign MQS timestamp menu notify screen
	static UX_STEP_NOCB(signMqsTimestampMenuNotifyScreen, pnn, {

		// Picture
		&C_icon_view,

		// First line
		"Sign MQS",
		
		// Second line
		"timestamp?"
	});

	// Sign MQS timestamp menu account index screen
	#define signMqsTimestampMenuAccountIndexScreen exportRootPublicKeyMenuAccountIndexScreen

	// Sign MQS timestamp menu time and date screen
	static UX_STEP_NOCB(signMqsTimestampMenuTimeAndDateScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = "Time And Date",
		
		// Text
		.text = (char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer
	});

	// Sign MQS timestamp menu warning screen one
	static UX_STEP_NOCB(signMqsTimestampMenuWarningScreenOne, pnn, {

		// Picture
		&C_icon_warning,
		
		// First line
		"The host will",
		
		// Second line
		"be able to"
	});

	// Sign MQS timestamp menu warning screen two
	static UX_STEP_NOCB(signMqsTimestampMenuWarningScreenTwo, pnn, {

		// Picture
		&C_icon_warning,
		
		// First line
		"listen for the",
		
		// Second line
		"account's"
	});

	// Sign MQS timestamp menu warning screen three
	static UX_STEP_NOCB(signMqsTimestampMenuWarningScreenThree, pnn, {

		// Picture
		&C_icon_warning,
		
		// First line
		kernelFeaturesOrTransactionTypeLineBuffer,
		
		// Second line
		"transactions"
	});

	// Sign MQS timestamp menu approve screen
	static UX_STEP_CB(signMqsTimestampMenuApproveScreen, pb, processUserInteraction(GET_MQS_TIMESTAMP_SIGNATURE_INSTRUCTION, true, true), {

		// Picture
		&C_icon_approve,
		
		// Bold line
		"Approve"
	});

	// Sign MQS timestamp menu deny screen
	static UX_STEP_CB(signMqsTimestampMenuDenyScreen, pb, processUserInteraction(GET_MQS_TIMESTAMP_SIGNATURE_INSTRUCTION, false, false), {

		// Picture
		&C_icon_reject,
		
		// Bold line
		"Deny"
	});

	// Sign MQS timestamp menu
	static UX_FLOW(signMqsTimestampMenu,

		// Sign MQS timestamp menu notify screen
		&signMqsTimestampMenuNotifyScreen,
		
		// Sign MQS timestamp menu account index screen
		&signMqsTimestampMenuAccountIndexScreen,
		
		// Sign MQS timestamp menu time and date screen
		&signMqsTimestampMenuTimeAndDateScreen,
		
		// Sign MQS timestamp menu warning screen one
		&signMqsTimestampMenuWarningScreenOne,
		
		// Sign MQS timestamp menu warning screen two
		&signMqsTimestampMenuWarningScreenTwo,
		
		// Sign MQS timestamp menu warning screen three
		&signMqsTimestampMenuWarningScreenThree,
		
		// Sign MQS timestamp menu approve screen
		&signMqsTimestampMenuApproveScreen,
		
		// Sign MQS timestamp menu deny screen
		&signMqsTimestampMenuDenyScreen
	);

	// Sign Tor certificate menu notify screen
	static UX_STEP_NOCB(signTorCertificateMenuNotifyScreen, pnn, {

		// Picture
		&C_icon_view,

		// First line
		"Sign Tor",
		
		// Second line
		"certificate?"
	});

	// Sign Tor certificate menu account index screen
	#define signTorCertificateMenuAccountIndexScreen exportRootPublicKeyMenuAccountIndexScreen

	// Sign Tor certificate menu expiration screen
	static UX_STEP_NOCB(signTorCertificateMenuExpirationScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = "Expires",
		
		// Text
		.text = (char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer
	});

	// Sign Tor certificate menu address screen
	static UX_STEP_NOCB(signTorCertificateMenuAddressScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = addressTypeLineBuffer,
		
		// Text
		.text = (char *)publicKeyOrAddressLineBuffer
	});

	// Sign Tor certificate menu warning screen one
	#define signTorCertificateMenuWarningScreenOne signMqsTimestampMenuWarningScreenOne

	// Sign Tor certificate menu warning screen two
	#define signTorCertificateMenuWarningScreenTwo signMqsTimestampMenuWarningScreenTwo

	// Sign Tor certificate menu warning screen three
	#define signTorCertificateMenuWarningScreenThree signMqsTimestampMenuWarningScreenThree

	// Sign Tor certificate menu approve screen
	static UX_STEP_CB(signTorCertificateMenuApproveScreen, pb, processUserInteraction(GET_TOR_CERTIFICATE_SIGNATURE_INSTRUCTION, true, true), {

		// Picture
		&C_icon_approve,
		
		// Bold line
		"Approve"
	});

	// Sign Tor certificate menu deny screen
	static UX_STEP_CB(signTorCertificateMenuDenyScreen, pb, processUserInteraction(GET_TOR_CERTIFICATE_SIGNATURE_INSTRUCTION, false, false), {

		// Picture
		&C_icon_reject,
		
		// Bold line
		"Deny"
	});

	// Sign Tor certificate menu
	static UX_FLOW(signTorCertificateMenu,

		// Sign Tor certificate menu notify screen
		&signTorCertificateMenuNotifyScreen,
		
		// Sign Tor certificate menu account index screen
		&signTorCertificateMenuAccountIndexScreen,
		
		// Sign Tor certificate menu expiration screen
		&signTorCertificateMenuExpirationScreen,
		
		// Sign Tor certificate menu address screen
		&signTorCertificateMenuAddressScreen,
		
		// Sign Tor certificate menu warning screen one
		&signTorCertificateMenuWarningScreenOne,
		
		// Sign Tor certificate menu warning screen two
		&signTorCertificateMenuWarningScreenTwo,
		
		// Sign Tor certificate menu warning screen three
		&signTorCertificateMenuWarningScreenThree,

		// Sign Tor certificate menu approve screen
		&signTorCertificateMenuApproveScreen,
		
		// Sign Tor certificate menu deny screen
		&signTorCertificateMenuDenyScreen
	);

	// Approve transaction menu notify screen
	static UX_STEP_NOCB(approveTransactionMenuNotifyScreen, pnn, {

		// Picture
		&C_icon_view,

		// First line
		verifyAddressApproveTransactionOrCurrencyVersionLineBuffer,
		
		// Second line
		"transaction?"
	});

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

		// Approve transaction menu amount single line screen
		static UX_STEP_NOCB(approveTransactionMenuAmountSingleLineScreen, bn, {
				
			// Bold first line
			"Amount",
			
			// Second line
			amountLineBuffer
		});
	#endif

	// Approve transaction menu amount multiline screen
	static UX_STEP_NOCB(approveTransactionMenuAmountMultilineScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = "Amount",
		
		// Text
		.text = amountLineBuffer
	});

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

		// Approve transaction menu fee single line screen
		static UX_STEP_NOCB(approveTransactionMenuFeeSingleLineScreen, bn, {
				
			// Bold first line
			"Fee",
			
			// Second line
			feeLineBuffer
		});
	#endif

	// Approve transaction menu fee multiline screen
	static UX_STEP_NOCB(approveTransactionMenuFeeMultilineScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = "Fee",
		
		// Text
		.text = feeLineBuffer
	});

	// Approve transaction menu kernel features screen
	static UX_STEP_NOCB(approveTransactionMenuKernelFeaturesScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
			
			{

				// Title
				.title = "Kernel Features",
				
				// Text
				.text = kernelFeaturesOrTransactionTypeLineBuffer
			}
		
		// Otherwise
		#else
		
			// Layout
			bn,
			
			{
			
				// Bold first line
				"Kernel Features",
				
				// Second line
				kernelFeaturesOrTransactionTypeLineBuffer
			}
		#endif
	);

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

		// Approve transaction menu kernel features details single line screen
		static UX_STEP_NOCB(approveTransactionMenuKernelFeaturesDetailsSingleLineScreen, bn, {
				
			// Bold first line
			kernelFeaturesDetailsTitleLineBuffer,
			
			// Second line
			kernelFeaturesDetailsTextOrAccountIndexLineBuffer
		});
	#endif

	// Approve transaction menu kernel features details multiline screen
	static UX_STEP_NOCB(approveTransactionMenuKernelFeaturesDetailsMultilineScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = kernelFeaturesDetailsTitleLineBuffer,
		
		// Text
		.text = kernelFeaturesDetailsTextOrAccountIndexLineBuffer
	});

	// Approve transaction menu proof address screen
	static UX_STEP_NOCB(approveTransactionMenuProofAddressScreen,

		// Check if device has low height
		#if BAGL_HEIGHT < 64
		
			// Layout
			nb_paging,
		
		// Otherwise
		#else
		
			// Layout
			bnnn_paging,
		#endif
	{

		// Title
		.title = "Proof Address",
		
		// Text
		.text = (char *)publicKeyOrAddressLineBuffer
	});

	// Approve transaction menu no payment proof screen
	static UX_STEP_NOCB(approveTransactionMenuNoPaymentProofScreen, pnn, {

		// Picture
		&C_icon_warning,
		
		// First line
		"No payment",
		
		// Second line
		"proof"
	});

	// Approve transaction menu approve screen
	static UX_STEP_CB(approveTransactionMenuApproveScreen, pb, processUserInteraction(FINISH_TRANSACTION_INSTRUCTION, true, true), {

		// Picture
		&C_icon_approve,
		
		// Bold line
		"Approve"
	});

	// Approve transaction menu deny screen
	static UX_STEP_CB(approveTransactionMenuDenyScreen, pb, processUserInteraction(FINISH_TRANSACTION_INSTRUCTION, false, false), {

		// Picture
		&C_icon_reject,
		
		// Bold line
		"Deny"
	});

	// Approve transaction menu
	static const ux_flow_step_t *approveTransactionMenu[9];

	// Processing menu message screen
	static UX_STEP_NOCB(processingMenuMessageScreen, pb, {

		// Picture
		&C_icon_processing,
		
		// Bold line
		(char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer
	});

	// Processing menu
	static UX_FLOW(processingMenu,

		// Processing menu message screen
		&processingMenuMessageScreen
	);

	// Progress bar
	static const bagl_element_t PROGRESS_BAR[] = {

		// Clear
		{{BAGL_RECTANGLE, 0x00, 0, 0, BAGL_WIDTH, BAGL_HEIGHT, 0, 0, BAGL_FILL, 0x000000, 0xFFFFFF, 0, 0}, NULL},
		
		// Text
		{{BAGL_LABELINE, 0x0, 0, (BAGL_HEIGHT / 2) - 3, BAGL_WIDTH, BAGL_HEIGHT, 0, 0, 0, 0xFFFFFF, 0x000000, BAGL_FONT_OPEN_SANS_EXTRABOLD_11px | BAGL_FONT_ALIGNMENT_CENTER, 0}, (char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer},
		
		// Outline
		{{BAGL_RECTANGLE, 0x00, PROGRESS_BAR_PADDING, (BAGL_HEIGHT / 2) + 5, BAGL_WIDTH - (PROGRESS_BAR_PADDING * 2), PROGRESS_BAR_HEIGHT, 1, 3, BAGL_OUTLINE, 0xFFFFFF, 0x000000, 0, 0}, NULL}
	};

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

	// About menu info types
	static const char *const ABOUT_MENU_INFO_TYPES[] = {"Version"};
	
	// About menu info contents
	static const char *const ABOUT_MENU_INFO_CONTENTS[] = {verifyAddressApproveTransactionOrCurrencyVersionLineBuffer};
	
	// Result tokens
	enum ResultTokens {
	
		// Confirm token
		CONFIRM_TOKEN,
		
		// Reject token
		REJECT_TOKEN,
		
		// Show QR token
		SHOW_QR_TOKEN
	};
#endif


// Function prototypes

// Check if has BAGL
#ifdef HAVE_BAGL

	// Progress bar button
	static unsigned int progressBar_button(const unsigned int buttonMask, const unsigned int buttonMaskCounter);

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

	// Show about menu
	static void showAboutMenu(void);
	
	// About menu display callback
	static bool aboutMenuDisplayCallback(const uint8_t page, nbgl_pageContent_t *content);
	
	// Export root public key menu continue callback
	static void exportRootPublicKeyMenuContinueCallback(void);
	
	// Export root public key menu choice callback
	static void exportRootPublicKeyMenuChoiceCallback(const bool confirm);
	
	// Export root public key menu confirm reject callback
	static void exportRootPublicKeyMenuConfirmRejectCallback(void);
	
	// Export root public key menu reject callback
	static void exportRootPublicKeyMenuRejectCallback(void);
	
	// Verify root public key menu continue callback
	static void verifyRootPublicKeyMenuContinueCallback(void);
	
	// Verify root public key menu choice callback
	static void verifyRootPublicKeyMenuChoiceCallback(const int token, const uint8_t index);
	
	// Verify root public key menu reject callback
	static void verifyRootPublicKeyMenuRejectCallback(void);
	
	// Verify address menu continue callback
	static void verifyAddressMenuContinueCallback(void);
	
	// Verify address menu choice callback
	static void verifyAddressMenuChoiceCallback(const int token, const uint8_t index);
	
	// Verify address menu modal exit callback
	static void verifyAddressMenuModalExitCallback(const int token, const uint8_t index);
	
	// Verify address menu reject callback
	static void verifyAddressMenuRejectCallback(void);
	
	// Sign MQS timestamp menu continue callback
	static void signMqsTimestampMenuContinueCallback(void);
	
	// Sign MQS timestamp menu choice callback
	static void signMqsTimestampMenuChoiceCallback(const bool confirm);
	
	// Sign MQS timestamp menu confirm reject callback
	static void signMqsTimestampMenuConfirmRejectCallback(void);
	
	// Sign MQS timestamp menu reject callback
	static void signMqsTimestampMenuRejectCallback(void);
	
	// Sign Tor certificate menu continue callback
	static void signTorCertificateMenuContinueCallback(void);
	
	// Sign Tor certificate menu choice callback
	static void signTorCertificateMenuChoiceCallback(const bool confirm);
	
	// Sign Tor certificate menu confirm reject callback
	static void signTorCertificateMenuConfirmRejectCallback(void);
	
	// Sign Tor certificate menu reject callback
	static void signTorCertificateMenuRejectCallback(void);
#endif


// Supporting function implementation

// Clear menu buffers
void clearMenuBuffers(void) {
	
	// Clear the time, processing message, progress bar message, or currency name line buffer
	explicit_bzero((char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer, sizeof(timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer));
	
	// Clear the public key or address line buffer
	explicit_bzero((char *)publicKeyOrAddressLineBuffer, sizeof(publicKeyOrAddressLineBuffer));
	
	// Clear the verify address, approve transaction, or currency version line buffer
	explicit_bzero(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer, sizeof(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer));
	
	// Clear the address type line buffer
	explicit_bzero(addressTypeLineBuffer, sizeof(addressTypeLineBuffer));
	
	// Clear the amount line buffer
	explicit_bzero(amountLineBuffer, sizeof(amountLineBuffer));
	
	// Clear the fee line buffer
	explicit_bzero(feeLineBuffer, sizeof(feeLineBuffer));
	
	// Clear the kernel features or transaction type line buffer
	explicit_bzero(kernelFeaturesOrTransactionTypeLineBuffer, sizeof(kernelFeaturesOrTransactionTypeLineBuffer));
	
	// Clear the kernel features details title line buffer
	explicit_bzero(kernelFeaturesDetailsTitleLineBuffer, sizeof(kernelFeaturesDetailsTitleLineBuffer));
	
	// Clear the kernel features details text or account index line buffer
	explicit_bzero(kernelFeaturesDetailsTextOrAccountIndexLineBuffer, sizeof(kernelFeaturesDetailsTextOrAccountIndexLineBuffer));
	
	// Copy currency information to buffers
	memcpy((char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer, currencyInformation->name, sizeof(currencyInformation->name));
	memcpy(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer, currencyInformation->version, sizeof(currencyInformation->version));
	memcpy(&currencyIconBuffer, &currencyInformation->iconDetails, sizeof(currencyInformation->iconDetails));
}

// Show main menu
void showMainMenu(void) {

	// Check if has BAGL
	#ifdef HAVE_BAGL
	
		// Check if UX stack doesn't exist
		if(!G_ux.stack_count) {
		
			// Create UX stack
			ux_stack_push();
		}
	#endif
	
	// Clear menu buffers
	clearMenuBuffers();
	
	// Show main menu
	showMenu(MAIN_MENU);
}

// Show menu
void showMenu(enum Menu menu) {

	// Check if has BAGL
	#ifdef HAVE_BAGL
	
		// Initialize menu steps
		const ux_flow_step_t *const *menuSteps;
		
		// Check menu
		switch(menu) {
		
			// Main menu
			case MAIN_MENU:
			
				{
			
					// Initialize index
					size_t index = 0;
					
					// Check if device doesn't have low height
					#if BAGL_HEIGHT >= 64
					
						// Check if currency information name can fit on one line
						if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, currencyInformation->name, strlen(currencyInformation->name), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
						
							// Set main menu to use currency name ready screen
							mainMenu[index++] = &mainMenuCurrencyNameReadyScreen;
						}
						else
					
					// Otherwise
					#else
					
						// Check if currency information name can fit
						if(strlen(currencyInformation->name) <= (BAGL_WIDTH - START_OF_TEXT_NEXT_TO_PICTURE) / LARGEST_CHARACTER_WIDTH) {
						
							// Set main menu to use currency name ready screen
							mainMenu[index++] = &mainMenuCurrencyNameReadyScreen;
						}
						else
					#endif
					{
				
						// Set main menu to use ready screen
						mainMenu[index++] = &mainMenuReadyScreen;
						
						// Set main menu to use currency screen
						mainMenu[index++] = &mainMenuCurrencyScreen;
					}
					
					// Check if device doesn't have low height
					#if BAGL_HEIGHT >= 64
					
						// Check if currency information version can fit on one line
						if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, currencyInformation->version, strlen(currencyInformation->version), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
						
							// Set main menu to use version single line screen
							mainMenu[index++] = &mainMenuVersionSingleLineScreen;
						}
						else
					#endif
					{
					
						// Set main menu to use version multiline screen
						mainMenu[index++] = &mainMenuVersionMultilineScreen;
					}
					
					// Set main menu to use exit screen
					mainMenu[index++] = &mainMenuExitScreen;
					
					// End main menu
					mainMenu[index++] = FLOW_LOOP;
					
					// End main menu
					mainMenu[index++] = FLOW_END_STEP;
				}
				
				// Set menu steps to main menu
				menuSteps = mainMenu;
				
				// Break
				break;
			
			// Export root public key menu
			case EXPORT_ROOT_PUBLIC_KEY_MENU:
			
				// Set menu steps to export root public key menu
				menuSteps = exportRootPublicKeyMenu;
				
				// Break
				break;
			
			// Verify root public key menu
			case VERIFY_ROOT_PUBLIC_KEY_MENU:
			
				// Set menu steps to verify root public key menu
				menuSteps = verifyRootPublicKeyMenu;
			
				// Break
				break;
			
			// Verify address menu
			case VERIFY_ADDRESS_MENU:
			
				// Set menu steps to verify address menu
				menuSteps = verifyAddressMenu;
			
				// Break
				break;
			
			// Sign MQS timestamp menu
			case SIGN_MQS_TIMESTAMP_MENU:
			
				// Set menu steps to sign MQS timestamp menu
				menuSteps = signMqsTimestampMenu;
				
				// Break
				break;
			
			// Sign Tor certificate menu
			case SIGN_TOR_CERTIFICATE_MENU:
			
				// Set menu steps to sign Tor certificate menu
				menuSteps = signTorCertificateMenu;
				
				// Break
				break;
			
			// Approve transaction menu
			case APPROVE_TRANSACTION_MENU:
			
				{
				
					// Initialize index
					size_t index = 0;
				
					// Set approve transaction menu to use notify screen
					approveTransactionMenu[index++] = &approveTransactionMenuNotifyScreen;
					
					// Check if device doesn't have low height
					#if BAGL_HEIGHT >= 64
					
						// Check if amount can fit on one line
						if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, amountLineBuffer, strlen(amountLineBuffer), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
						
							// Set approve transaction menu to use amount single line screen
							approveTransactionMenu[index++] = &approveTransactionMenuAmountSingleLineScreen;
						}
						else
					#endif
					{
						
						// Set approve transaction menu to use amount multiline screen
						approveTransactionMenu[index++] = &approveTransactionMenuAmountMultilineScreen;
					}
					
					// Check if device doesn't have low height
					#if BAGL_HEIGHT >= 64
					
						// Check if fee can fit on one line
						if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, feeLineBuffer, strlen(feeLineBuffer), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
						
							// Set approve transaction menu to use fee single line screen
							approveTransactionMenu[index++] = &approveTransactionMenuFeeSingleLineScreen;
						}
						else
					#endif
					{
						
						// Set approve transaction menu to use fee multiline screen
						approveTransactionMenu[index++] = &approveTransactionMenuFeeMultilineScreen;
					}
					
					// Set approve transaction menu to use kernel features screen
					approveTransactionMenu[index++] = &approveTransactionMenuKernelFeaturesScreen;
					
					// Check if kernel features details title line buffer isn't empty
					if(strlen(kernelFeaturesDetailsTitleLineBuffer)) {
					
						// Check if device doesn't have low height
						#if BAGL_HEIGHT >= 64
						
							// Check if kernel features details text can fit on one line
							if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, kernelFeaturesDetailsTextOrAccountIndexLineBuffer, strlen(kernelFeaturesDetailsTextOrAccountIndexLineBuffer), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
							
								// Set approve transaction menu to use kernel features details single line screen
								approveTransactionMenu[index++] = &approveTransactionMenuKernelFeaturesDetailsSingleLineScreen;
							}
							else
						#endif
						{
					
							// Set approve transaction menu to use kernel features details multiline screen
							approveTransactionMenu[index++] = &approveTransactionMenuKernelFeaturesDetailsMultilineScreen;
						}
					}
					
					// Check if public key or address line buffer isn't empty
					if(strlen((char *)publicKeyOrAddressLineBuffer)) {
					
						// Set approve transaction menu to use proof address screen
						approveTransactionMenu[index++] = &approveTransactionMenuProofAddressScreen;
					}
					
					// Otherwise
					else {
					
						// Set approve transaction menu to use no payment proof screen
						approveTransactionMenu[index++] = &approveTransactionMenuNoPaymentProofScreen;
					}
					
					// Set approve transaction menu to use approve screen
					approveTransactionMenu[index++] = &approveTransactionMenuApproveScreen;
					
					// Set approve transaction menu to use deny screen
					approveTransactionMenu[index++] = &approveTransactionMenuDenyScreen;
					
					// End approve transaction menu
					approveTransactionMenu[index++] = FLOW_END_STEP;
					
					// Set menu steps to approve transaction menu
					menuSteps = approveTransactionMenu;
				}
				
				// Break
				break;
			
			// Processing menu
			case PROCESSING_MENU:
			
				// Set menu steps to processing menu
				menuSteps = processingMenu;
				
				// Break
				break;
		}
		
		// Show menu steps
		ux_flow_init(0, menuSteps, NULL);
	
	// Otherwise check if has NBGL
	#elif defined HAVE_NBGL
	
		// Check menu
		switch(menu) {
		
			// Main menu
			case MAIN_MENU:
			
				// Check currency ID
				switch(currencyInformation->id) {
				
					// MimbleWimble Coin floonet
					case MIMBLEWIMBLE_COIN_FLOONET:
					
						// Show main menu
						nbgl_useCaseHome("MimbleWimble Coin\nFloonet", &currencyIconBuffer, "Application is ready", false, showAboutMenu, exitApplication);
						
						// Break
						break;
				
					// Default
					default:
					
						// Show main menu
						nbgl_useCaseHome((char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer, &currencyIconBuffer, "Application is ready", false, showAboutMenu, exitApplication);
						
						// Break
						break;
				}
			
				// Break
				break;
			
			// Export root public key menu
			case EXPORT_ROOT_PUBLIC_KEY_MENU:
			
				// Show export root public key menu
				nbgl_useCaseReviewStart(&currencyIconBuffer, "Export root public key?", NULL, "Deny", exportRootPublicKeyMenuContinueCallback, exportRootPublicKeyMenuConfirmRejectCallback);
				
				// Break
				break;
			
			// Verify root public key menu
			case VERIFY_ROOT_PUBLIC_KEY_MENU:
			
				// Show verify root public key menu
				nbgl_useCaseReviewStart(&currencyIconBuffer, "Verify root public key", NULL, "Cancel", verifyRootPublicKeyMenuContinueCallback, verifyRootPublicKeyMenuRejectCallback);
			
				// Break
				break;
			
			// Verify address menu
			case VERIFY_ADDRESS_MENU:
			
				// Check if MQS address is being verified
				if(!strncmp(addressTypeLineBuffer, "MQS Address", sizeof(addressTypeLineBuffer))) {
				
					// Append text to verify address, approve transaction, or currency version line buffer
					strncat(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer, " address", sizeof(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer) - strlen(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer) - sizeof((char)'\0'));
				}
				
				// Otherwise check if a Tor address is being verified
				else if(!strncmp(addressTypeLineBuffer, "Tor Address", sizeof(addressTypeLineBuffer))) {
				
					// Append text to verify address, approve transaction, or currency version line buffer
					strncat(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer, " address", sizeof(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer) - strlen(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer) - sizeof((char)'\0'));
				}
				
				// Otherwise check if a Slatepack address is being verified
				else if(!strncmp(addressTypeLineBuffer, "Slatepack Address", sizeof(addressTypeLineBuffer))) {
				
					// Append text to verify address, approve transaction, or currency version line buffer
					strncat(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer, "\naddress", sizeof(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer) - strlen(verifyAddressApproveTransactionOrCurrencyVersionLineBuffer) - sizeof((char)'\0'));
				}
			
				// Show verify address menu
				nbgl_useCaseReviewStart(&currencyIconBuffer, verifyAddressApproveTransactionOrCurrencyVersionLineBuffer, NULL, "Cancel", verifyAddressMenuContinueCallback, verifyAddressMenuRejectCallback);
			
				// Break
				break;
			
			// Sign MQS timestamp menu
			case SIGN_MQS_TIMESTAMP_MENU:
			
				// Show sign MQS timestamp menu
				nbgl_useCaseReviewStart(&currencyIconBuffer, "Sign MQS timestamp?", NULL, "Deny", signMqsTimestampMenuContinueCallback, signMqsTimestampMenuConfirmRejectCallback);
				
				// Break
				break;
			
			// Sign Tor certificate menu
			case SIGN_TOR_CERTIFICATE_MENU:
			
				// Show sign Tor certificate menu
				nbgl_useCaseReviewStart(&currencyIconBuffer, "Sign Tor certificate?", NULL, "Deny", signTorCertificateMenuContinueCallback, signTorCertificateMenuConfirmRejectCallback);
				
				// Break
				break;
			
			// Approve transaction menu
			case APPROVE_TRANSACTION_MENU:
			
				// TODO
				
				// Break
				break;
			
			// Processing menu
			case PROCESSING_MENU:
			
				// Show processing
				nbgl_useCaseSpinner((char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer);
				
				// Break
				break;
		}
	#endif
}

// Check if has BAGL
#ifdef HAVE_BAGL

	// Show progress bar
	void showProgressBar(const uint8_t percent) {

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

	// Show progress bar
	void showProgressBar(__attribute__((unused)) const uint8_t percent) {
#endif

	// Check if has BAGL
	#ifdef HAVE_BAGL
	
		// Get percent width
		const short percentWidth = (BAGL_WIDTH - ((PROGRESS_BAR_PADDING + 1) * 2)) * percent / MAXIMUM_PROGRESS_BAR_PERCENT;
		
		// Check if percent width exists
		if(percentWidth) {
		
			// Create progress bar with percent
			bagl_element_t progressBar[ARRAYLEN(PROGRESS_BAR) + 1];
			memcpy(progressBar, PROGRESS_BAR, sizeof(PROGRESS_BAR));
			bagl_element_t progressBarPercent = {{BAGL_RECTANGLE, 0x00, PROGRESS_BAR_PADDING + 1, (BAGL_HEIGHT / 2) + 5 + ((percentWidth == 1) ? 1 : 0), percentWidth, PROGRESS_BAR_HEIGHT - ((percentWidth == 1) ? 2 : 0), 0, 1, BAGL_FILL, 0xFFFFFF, 0x000000, 0, 0}, NULL};
			memcpy(&progressBar[ARRAYLEN(PROGRESS_BAR)], &progressBarPercent, sizeof(progressBarPercent));
			
			// Display progress bar
			UX_DISPLAY(progressBar, NULL);
		}
		
		// Otherwise
		else {
		
			// Display progress bar
			bagl_element_t progressBar[ARRAYLEN(PROGRESS_BAR)];
			memcpy(progressBar, PROGRESS_BAR, sizeof(PROGRESS_BAR));
			
			// Display progress bar
			UX_DISPLAY(progressBar, NULL);
		}
		
		// Wait for display to update
		UX_WAIT_DISPLAYED();
	#endif
}

// Check if has BAGL
#ifdef HAVE_BAGL

	// Progress bar button
	unsigned int progressBar_button(__attribute__((unused)) const unsigned int buttonMask, __attribute__((unused)) const unsigned int buttonMaskCounter) {

		// Return zero
		return 0;
	}

// Otherwise check if has NBGL
#elif defined HAVE_NBGL
	
	// Show about menu
	void showAboutMenu(void) {
	
		// Show about menu
		nbgl_useCaseSettings((char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer, 0, 1, false, showMainMenu, aboutMenuDisplayCallback, NULL);
	}
	
	// About menu display callback
	bool aboutMenuDisplayCallback(__attribute__((unused)) const uint8_t page, nbgl_pageContent_t *content) {
	
		// Set content to use about menu info
		content->type = INFOS_LIST;
		content->infosList.nbInfos = ARRAYLEN(ABOUT_MENU_INFO_TYPES);
		content->infosList.infoTypes = (const char **)ABOUT_MENU_INFO_TYPES;
		content->infosList.infoContents = (const char **)ABOUT_MENU_INFO_CONTENTS;
		
		// Return true
		return true;
	}
	
	// Export root public key menu continue callback
	void exportRootPublicKeyMenuContinueCallback(void) {
	
		// Set export root public key menu tag value pairs
		exportRootPublicKeyMenuTagValuePairs[0].item = "Account Index";
		exportRootPublicKeyMenuTagValuePairs[0].value = kernelFeaturesDetailsTextOrAccountIndexLineBuffer;
		
		exportRootPublicKeyMenuTagValuePairs[1].item = "" ;
		exportRootPublicKeyMenuTagValuePairs[1].value = "";
		
		exportRootPublicKeyMenuTagValuePairs[2].item = "*The host will be able to view\nthe account's transactions";
		exportRootPublicKeyMenuTagValuePairs[2].value = "";
		
		// Set export root public key menu tag value list
		exportRootPublicKeyMenuTagValueList.nbPairs = ARRAYLEN(exportRootPublicKeyMenuTagValuePairs);
		exportRootPublicKeyMenuTagValueList.pairs = exportRootPublicKeyMenuTagValuePairs;
		
		// Set export root public key menu info long press
		exportRootPublicKeyMenuInfoLongPress.icon = &currencyIconBuffer;
		exportRootPublicKeyMenuInfoLongPress.text = "Export root public key";
		exportRootPublicKeyMenuInfoLongPress.longPressText = "Hold to export";
		
		// Show static review
		nbgl_useCaseStaticReview(&exportRootPublicKeyMenuTagValueList, &exportRootPublicKeyMenuInfoLongPress, "Deny", exportRootPublicKeyMenuChoiceCallback);
	}
	
	// Export root public key menu choice callback
	void exportRootPublicKeyMenuChoiceCallback(const bool confirm) {
	
		// Check if confirmed
		if(confirm) {
		
			// Check if processing user interaction was successful
			if(processUserInteraction(GET_ROOT_PUBLIC_KEY_INSTRUCTION, true, true)) {
			
				// Show status
				nbgl_useCaseStatus("ROOT PUBLIC\nKEY EXPORTED", true, showMainMenu);
			}
			
			// Otherwise
			else {
			
				// Show status
				nbgl_useCaseStatus("Exporting root public\nkey failed", false, showMainMenu);
			}
		}
		
		// Otherwise
		else {
		
			// Export root public key menu confirm reject callback
			exportRootPublicKeyMenuConfirmRejectCallback();
		}
	}
	
	// Export root public key menu confirm reject callback
	void exportRootPublicKeyMenuConfirmRejectCallback(void) {
	
		// Show confirm
		nbgl_useCaseConfirm("Deny exporting root\npublic key?", NULL, "Yes, deny", "Go back", exportRootPublicKeyMenuRejectCallback);
	}
	
	// Export root public key menu reject callback
	void exportRootPublicKeyMenuRejectCallback(void) {
	
		// Process user interaction
		processUserInteraction(GET_ROOT_PUBLIC_KEY_INSTRUCTION, false, false);
		
		// Show status
		nbgl_useCaseStatus("Exporting root public\nkey denied", false, showMainMenu);
	}
	
	// Verify root public key menu continue callback
	void verifyRootPublicKeyMenuContinueCallback(void) {
	
		// Set verify root public key menu tag value pairs
		verifyRootPublicKeyMenuTagValuePairs[0].item = "Root Public Key";
		verifyRootPublicKeyMenuTagValuePairs[0].value = (char *)publicKeyOrAddressLineBuffer;
		
		// Set verify root public key menu content
		verifyRootPublicKeyMenuContent.type = TAG_VALUE_CONFIRM;
		verifyRootPublicKeyMenuContent.tagValueConfirm.tuneId = TUNE_TAP_CASUAL;
		verifyRootPublicKeyMenuContent.tagValueConfirm.tagValueList.nbPairs = ARRAYLEN(verifyRootPublicKeyMenuTagValuePairs);
		verifyRootPublicKeyMenuContent.tagValueConfirm.tagValueList.pairs = verifyRootPublicKeyMenuTagValuePairs;
		verifyRootPublicKeyMenuContent.tagValueConfirm.confirmationText = "Confirm";
		verifyRootPublicKeyMenuContent.tagValueConfirm.confirmationToken = CONFIRM_TOKEN;
		
		// Set verify root public key menu navigation info
		verifyRootPublicKeyMenuNavigationInfo.navType = NAV_WITH_TAP;
		verifyRootPublicKeyMenuNavigationInfo.progressIndicator = true;
		verifyRootPublicKeyMenuNavigationInfo.tuneId = TUNE_TAP_CASUAL;
		verifyRootPublicKeyMenuNavigationInfo.navWithTap.quitText = "Cancel";
		verifyRootPublicKeyMenuNavigationInfo.quitToken = REJECT_TOKEN;
		
		// Show public key confirmation
		nbgl_pageDrawGenericContent(&verifyRootPublicKeyMenuChoiceCallback, &verifyRootPublicKeyMenuNavigationInfo, &verifyRootPublicKeyMenuContent);
		nbgl_refresh();
	}
	
	// Verify root public key menu choice callback
	void verifyRootPublicKeyMenuChoiceCallback(const int token, __attribute__((unused)) const uint8_t index) {
	
		// Check if confirmed
		if(token == CONFIRM_TOKEN) {
		
			// Check if processing user interaction was successful
			if(processUserInteraction(VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION, true, false)) {
			
				// Show status
				nbgl_useCaseStatus("ROOT PUBLIC\nKEY VERIFIED", true, showMainMenu);
			}
			
			// Otherwise
			else {
			
				// Show status
				nbgl_useCaseStatus("Verifying root public\nkey failed", false, showMainMenu);
			}
		}
		
		// Otherwise
		else {
		
			// Verify root public key menu reject callback
			verifyRootPublicKeyMenuRejectCallback();
		}
	}
	
	// Verify root public key menu reject callback
	void verifyRootPublicKeyMenuRejectCallback(void) {
	
		// Process user interaction
		processUserInteraction(VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION, false, false);
		
		// Show status
		nbgl_useCaseStatus("Verifying root public\nkey canceled", false, showMainMenu);
	}
	
	// Verify address menu continue callback
	void verifyAddressMenuContinueCallback(void) {
	
		// Set verify address menu tag value pairs
		verifyAddressMenuTagValuePairs[0].item = addressTypeLineBuffer;
		verifyAddressMenuTagValuePairs[0].value = (char *)publicKeyOrAddressLineBuffer;
		
		// Set verify address menu content
		verifyAddressMenuContent.type = TAG_VALUE_CONFIRM;
		verifyAddressMenuContent.tagValueConfirm.detailsButtonIcon = &C_QRcode32px;
		verifyAddressMenuContent.tagValueConfirm.detailsButtonText = "Show as QR";
		verifyAddressMenuContent.tagValueConfirm.detailsButtonToken = SHOW_QR_TOKEN;
		verifyAddressMenuContent.tagValueConfirm.tuneId = TUNE_TAP_CASUAL;
		verifyAddressMenuContent.tagValueConfirm.tagValueList.nbPairs = ARRAYLEN(verifyAddressMenuTagValuePairs);
		verifyAddressMenuContent.tagValueConfirm.tagValueList.pairs = verifyAddressMenuTagValuePairs;
		verifyAddressMenuContent.tagValueConfirm.confirmationText = "Confirm";
		verifyAddressMenuContent.tagValueConfirm.confirmationToken = CONFIRM_TOKEN;
		
		// Set verify address menu navigation info
		verifyAddressMenuNavigationInfo.navType = NAV_WITH_TAP;
		verifyAddressMenuNavigationInfo.progressIndicator = true;
		verifyAddressMenuNavigationInfo.tuneId = TUNE_TAP_CASUAL;
		verifyAddressMenuNavigationInfo.navWithTap.quitText = "Cancel";
		verifyAddressMenuNavigationInfo.quitToken = REJECT_TOKEN;
		
		// Show address confirmation
		nbgl_pageDrawGenericContent(&verifyAddressMenuChoiceCallback, &verifyAddressMenuNavigationInfo, &verifyAddressMenuContent);
		nbgl_refresh();
	}
	
	// Verify address menu choice callback
	void verifyAddressMenuChoiceCallback(const int token, __attribute__((unused)) const uint8_t index) {
	
		// Check if confirmed
		if(token == CONFIRM_TOKEN) {
		
			// Check if processing user interaction was successful
			if(processUserInteraction(VERIFY_ADDRESS_INSTRUCTION, true, false)) {
			
				// Check if MQS address is being verified
				if(!strncmp(addressTypeLineBuffer, "MQS Address", sizeof(addressTypeLineBuffer))) {
				
					// Show status
					nbgl_useCaseStatus("MQS ADDRESS\nVERIFIED", true, showMainMenu);
				}
				
				// Otherwise check if a Tor address is being verified
				else if(!strncmp(addressTypeLineBuffer, "Tor Address", sizeof(addressTypeLineBuffer))) {
				
					// Show status
					nbgl_useCaseStatus("TOR ADDRESS\nVERIFIED", true, showMainMenu);
				}
				
				// Otherwise check if a Slatepack address is being verified
				else if(!strncmp(addressTypeLineBuffer, "Slatepack Address", sizeof(addressTypeLineBuffer))) {
				
					// Show status
					nbgl_useCaseStatus("SLATEPACK\nADDRESS VERIFIED", true, showMainMenu);
				}
			}
			
			// Otherwise
			else {
				
				// Check if MQS address is being verified
				if(!strncmp(addressTypeLineBuffer, "MQS Address", sizeof(addressTypeLineBuffer))) {
				
					// Show status
					nbgl_useCaseStatus("Verifying MQS address\nfailed", false, showMainMenu);
				}
				
				// Otherwise check if a Tor address is being verified
				else if(!strncmp(addressTypeLineBuffer, "Tor Address", sizeof(addressTypeLineBuffer))) {
				
					// Show status
					nbgl_useCaseStatus("Verifying Tor address\nfailed", false, showMainMenu);
				}
				
				// Otherwise check if a Slatepack address is being verified
				else if(!strncmp(addressTypeLineBuffer, "Slatepack Address", sizeof(addressTypeLineBuffer))) {
				
					// Show status
					nbgl_useCaseStatus("Verifying Slatepack\naddress failed", false, showMainMenu);
				}
			}
		}
		
		// Otherwise check if show QR
		else if(token == SHOW_QR_TOKEN) {
		
			// Create layout description
			nbgl_layoutDescription_t layoutDescription = {
			
				// Modal
				.modal = true,
				
				// With left border
				.withLeftBorder = true,
				
				// On action callback
				.onActionCallback = &verifyAddressMenuModalExitCallback
			};
			
			// Set verify address menu modal layout
			verifyAddressMenuModalLayout = nbgl_layoutGet(&layoutDescription);
			
			// Create QR code
			nbgl_layoutQRCode_t qrCode = {
			
				// URL
				.url = (char *)publicKeyOrAddressLineBuffer,
				
				// Text 2
				.text2 = (char *)publicKeyOrAddressLineBuffer
			};
			
			// Add QR code to verify address menu modal layout
			nbgl_layoutAddQRCode(verifyAddressMenuModalLayout, &qrCode);
			
			// Add bottom button to verify address menu modal layout
			nbgl_layoutAddBottomButton(verifyAddressMenuModalLayout, &C_cross32px, 0, true, TUNE_TAP_CASUAL);
			
			// Show verify address menu modal
			nbgl_layoutDraw(verifyAddressMenuModalLayout);
			nbgl_refresh();
		}
		
		// Otherwise
		else {
		
			// Verify address menu reject callback
			verifyAddressMenuRejectCallback();
		}
	}
	
	// Verify address menu modal exit callback
	void verifyAddressMenuModalExitCallback(__attribute__((unused)) const int token, __attribute__((unused)) const uint8_t index) {
	
		// Release verify address menu modal layout
		nbgl_layoutRelease(verifyAddressMenuModalLayout);
		
		// Hide verify address menu modal
		nbgl_screenRedraw();
		nbgl_refresh();
	}
	
	// Verify address menu reject callback
	void verifyAddressMenuRejectCallback(void) {
	
		// Process user interaction
		processUserInteraction(VERIFY_ADDRESS_INSTRUCTION, false, false);
		
		// Check if MQS address is being verified
		if(!strncmp(addressTypeLineBuffer, "MQS Address", sizeof(addressTypeLineBuffer))) {
		
			// Show status
			nbgl_useCaseStatus("Verifying MQS address\ncanceled", false, showMainMenu);
		}
		
		// Otherwise check if a Tor address is being verified
		else if(!strncmp(addressTypeLineBuffer, "Tor Address", sizeof(addressTypeLineBuffer))) {
		
			// Show status
			nbgl_useCaseStatus("Verifying Tor address\ncanceled", false, showMainMenu);
		}
		
		// Otherwise check if a Slatepack address is being verified
		else if(!strncmp(addressTypeLineBuffer, "Slatepack Address", sizeof(addressTypeLineBuffer))) {
		
			// Show status
			nbgl_useCaseStatus("Verifying Slatepack\naddress canceled", false, showMainMenu);
		}
	}
	
	// Sign MQS timestamp menu continue callback
	void signMqsTimestampMenuContinueCallback(void) {
	
		// Set sign MQS timestamp menu tag value pairs
		signMqsTimestampMenuTagValuePairs[0].item = "Time And Date";
		signMqsTimestampMenuTagValuePairs[0].value = (char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer;
		
		signMqsTimestampMenuTagValuePairs[1].item = "";
		signMqsTimestampMenuTagValuePairs[1].value = "";
		
		signMqsTimestampMenuTagValuePairs[2].item = "*The host will be able to listen\nfor the account's MQS\ntransactions";
		signMqsTimestampMenuTagValuePairs[2].value = "";
		
		// Set sign MQS timestamp menu tag value list
		signMqsTimestampMenuTagValueList.nbPairs = ARRAYLEN(signMqsTimestampMenuTagValuePairs);
		signMqsTimestampMenuTagValueList.pairs = signMqsTimestampMenuTagValuePairs;
		
		// Set sign MQS timestamp menu info long press
		signMqsTimestampMenuInfoLongPress.icon = &currencyIconBuffer;
		signMqsTimestampMenuInfoLongPress.text = "Sign MQS timestamp";
		signMqsTimestampMenuInfoLongPress.longPressText = "Hold to sign";
		
		// Show static review
		nbgl_useCaseStaticReview(&signMqsTimestampMenuTagValueList, &signMqsTimestampMenuInfoLongPress, "Deny", signMqsTimestampMenuChoiceCallback);
	}
	
	// Sign MQS timestamp menu choice callback
	void signMqsTimestampMenuChoiceCallback(const bool confirm) {
	
		// Check if confirmed
		if(confirm) {
		
			// Check if processing user interaction was successful
			if(processUserInteraction(GET_MQS_TIMESTAMP_SIGNATURE_INSTRUCTION, true, true)) {
			
				// Show status
				nbgl_useCaseStatus("MQS TIMESTAMP\nSIGNED", true, showMainMenu);
			}
			
			// Otherwise
			else {
			
				// Show status
				nbgl_useCaseStatus("Signing MQS\ntimestamp failed", false, showMainMenu);
			}
		}
		
		// Otherwise
		else {
		
			// Sign MQS timestamp menu confirm reject callback
			signMqsTimestampMenuConfirmRejectCallback();
		}
	}
	
	// Sign MQS timestamp menu confirm reject callback
	void signMqsTimestampMenuConfirmRejectCallback(void) {
	
		// Show confirm
		nbgl_useCaseConfirm("Deny signing MQS\ntimestamp?", NULL, "Yes, deny", "Go back", signMqsTimestampMenuRejectCallback);
	}
	
	// Sign MQS timestamp menu reject callback
	void signMqsTimestampMenuRejectCallback(void) {
	
		// Process user interaction
		processUserInteraction(GET_MQS_TIMESTAMP_SIGNATURE_INSTRUCTION, false, false);
		
		// Show status
		nbgl_useCaseStatus("Signing MQS\ntimestamp denied", false, showMainMenu);
	}
	
	// Sign Tor certificate menu continue callback
	void signTorCertificateMenuContinueCallback(void) {
	
		// Set sign Tor certificat menu tag value pairs
		signTorCertificateMenuTagValuePairs[0].item = "Expires";
		signTorCertificateMenuTagValuePairs[0].value = (char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer;
		
		signTorCertificateMenuTagValuePairs[1].item = addressTypeLineBuffer;
		signTorCertificateMenuTagValuePairs[1].value = (char *)publicKeyOrAddressLineBuffer;
		
		signTorCertificateMenuTagValuePairs[2].item = "";
		signTorCertificateMenuTagValuePairs[2].value = "";
		
		// Check if currency allows Tor addresses
		if(currencyInformation->enableTorAddress) {
		
			// Set sign Tor certificat menu tag value pairs
			signTorCertificateMenuTagValuePairs[3].item = "*The host will be able to listen\nfor the account's Tor\transactions";
			signTorCertificateMenuTagValuePairs[3].value = "";
		}
		
		// Otherwise if check currency allows Slatepack addresses
		else if(currencyInformation->enableSlatepackAddress) {
		
			// Set sign Tor certificat menu tag value pairs
			signTorCertificateMenuTagValuePairs[3].item = "*The host will be able to listen\nfor the account's Slatepack\ntransactions";
			signTorCertificateMenuTagValuePairs[3].value = "";
		}
		
		// Set sign Tor certificat menu tag value list
		signTorCertificateMenuTagValueList.nbPairs = ARRAYLEN(signTorCertificateMenuTagValuePairs);
		signTorCertificateMenuTagValueList.pairs = signTorCertificateMenuTagValuePairs;
		
		// Set sign Tor certificat menu info long press
		signTorCertificateMenuInfoLongPress.icon = &currencyIconBuffer;
		signTorCertificateMenuInfoLongPress.text = "Sign Tor certificate";
		signTorCertificateMenuInfoLongPress.longPressText = "Hold to sign";
		
		// Show static review
		nbgl_useCaseStaticReview(&signTorCertificateMenuTagValueList, &signTorCertificateMenuInfoLongPress, "Deny", signTorCertificateMenuChoiceCallback);
	}
	
	// Sign Tor certificate menu choice callback
	void signTorCertificateMenuChoiceCallback(const bool confirm) {
	
		// Check if confirmed
		if(confirm) {
		
			// Check if processing user interaction was successful
			if(processUserInteraction(GET_TOR_CERTIFICATE_SIGNATURE_INSTRUCTION, true, true)) {
			
				// Show status
				nbgl_useCaseStatus("TOR CERTIFICATE\nSIGNED", true, showMainMenu);
			}
			
			// Otherwise
			else {
			
				// Show status
				nbgl_useCaseStatus("Signing Tor certificate\nfailed", false, showMainMenu);
			}
		}
		
		// Otherwise
		else {
		
			// Sign Tor certificat menu confirm reject callback
			signTorCertificateMenuConfirmRejectCallback();
		}
	}
	
	// Sign Tor certificate menu confirm reject callback
	void signTorCertificateMenuConfirmRejectCallback(void) {
	
		// Show confirm
		nbgl_useCaseConfirm("Deny signing Tor\ncertificate?", NULL, "Yes, deny", "Go back", signTorCertificateMenuRejectCallback);
	}
	
	// Sign Tor certificate menu reject callback
	void signTorCertificateMenuRejectCallback(void) {
	
		// Process user interaction
		processUserInteraction(GET_TOR_CERTIFICATE_SIGNATURE_INSTRUCTION, false, false);
		
		// Show status
		nbgl_useCaseStatus("Signing Tor certificate\ndenied", false, showMainMenu);
	}
#endif
