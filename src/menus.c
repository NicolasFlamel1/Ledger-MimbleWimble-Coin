// Header files
#include <os_io_seproxyhal.h>
#include <string.h>
#include <ux.h>
#include "common.h"
#include "currency_information.h"
#include "menus.h"
#include "mqs.h"
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
	
	// Average character width
	#define AVERAGE_CHARACTER_WIDTH 8

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

// Verify address, approve transaction, or sign challenge line buffer
char verifyAddressApproveTransactionOrSignChallengeLineBuffer[VERIFY_ADDRESS_APPROVE_TRANSACTION_OR_SIGN_CHALLENGE_LINE_BUFFER_SIZE];

// Amount or address type line buffer
char amountOrAddressTypeLineBuffer[AMOUNT_OR_ADDRESS_TYPE_LINE_BUFFER_SIZE];

// Fee line buffer
char feeLineBuffer[FEE_LINE_BUFFER_SIZE];

// Kernel features or transaction type line buffer
char kernelFeaturesOrTransactionTypeLineBuffer[KERNEL_FEATURES_OR_TRANSACTION_TYPE_LINE_BUFFER_SIZE];

// Kernel features details title or sign type line buffer
char kernelFeaturesDetailsTitleOrSignTypeLineBuffer[KERNEL_FEATURES_DETAILS_TITLE_OR_SIGN_TYPE_LINE_BUFFER_SIZE];

// Kernel features details text or account index line buffer
char kernelFeaturesDetailsTextOrAccountIndexLineBuffer[KERNEL_FEATURES_DETAILS_TEXT_OR_ACCOUNT_INDEX_LINE_BUFFER_SIZE];

// Check if has NBGL
#ifdef HAVE_NBGL

	// Succeeded line buffer
	char succeededLineBuffer[SUCCEEDED_LINE_BUFFER_SIZE];
	
	// Failed line buffer
	char failedLineBuffer[FAILED_LINE_BUFFER_SIZE];
	
	// Canceled line buffer
	char canceledLineBuffer[CANCELED_LINE_BUFFER_SIZE];
	
	// Cancel prompt line buffer
	char cancelPromptLineBuffer[CANCEL_PROMPT_LINE_BUFFER_SIZE];
	
	// Approve button line buffer
	char approveButtonLineBuffer[APPROVE_BUTTON_LINE_BUFFER_SIZE];
	
	// Warning line buffer
	char warningLineBuffer[WARNING_LINE_BUFFER];
#endif

// Check if has BAGL
#ifdef HAVE_BAGL

	// Currency icon buffer
	static bagl_icon_details_t currencyIconBuffer;

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

	// Currency icon buffer
	static nbgl_icon_details_t currencyIconBuffer;
	
	// Export root public key menu tag value pairs
	static nbgl_layoutTagValue_t exportRootPublicKeyMenuTagValuePairs[2];
	
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
	
	// Sign MQS challenge menu tag value pairs
	static nbgl_layoutTagValue_t signMqsChallengeMenuTagValuePairs[3];
	
	// Sign MQS challenge menu tag value list
	static nbgl_layoutTagValueList_t signMqsChallengeMenuTagValueList;
	
	// Sign MQS challenge menu info long press
	static nbgl_pageInfoLongPress_t signMqsChallengeMenuInfoLongPress;
	
	// Sign approve transaction menu tag value pairs
	static nbgl_layoutTagValue_t approveTransactionMenuTagValuePairs[5];
	
	// Sign approve transaction menu tag value list
	static nbgl_layoutTagValueList_t approveTransactionMenuTagValueList;
	
	// Sign approve transaction menu info long press
	static nbgl_pageInfoLongPress_t approveTransactionMenuInfoLongPress;
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
			APPVERSION
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
		.text = APPVERSION
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
		verifyAddressApproveTransactionOrSignChallengeLineBuffer,
		
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
		.title = amountOrAddressTypeLineBuffer,
		
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
		
		// Verify address menu address screen
		&verifyAddressMenuAddressScreen,

		// Verify address menu approve screen
		&verifyAddressMenuValidScreen,
		
		// Verify address menu deny screen
		&verifyAddressMenuInvalidScreen
	);

	// Sign MQS challenge menu notify screen
	static UX_STEP_NOCB(signMqsChallengeMenuNotifyScreen, pnn, {

		// Picture
		&C_icon_view,

		// First line
		kernelFeaturesDetailsTitleOrSignTypeLineBuffer,
		
		// Second line
		"challenge?"
	});

	// Sign MQS challenge menu account index screen
	#define signMqsChallengeMenuAccountIndexScreen exportRootPublicKeyMenuAccountIndexScreen

	// Sign MQS challenge menu time and date screen
	static UX_STEP_NOCB(signMqsChallengeMenuTimeAndDateScreen,

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
	
	// Sign MQS challenge menu default challenge screen
	static UX_STEP_NOCB(signMqsChallengeMenuDefaultChallengeScreen,

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
		.title = "Default Challenge",
		
		// Text
		.text = DEFAULT_MQS_CHALLENGE
	});

	// Sign MQS challenge menu warning screen one
	static UX_STEP_NOCB(signMqsChallengeMenuWarningScreenOne, pnn, {

		// Picture
		&C_icon_warning,
		
		// First line
		"The host will",
		
		// Second line
		"be able to"
	});

	// Sign MQS challenge menu warning screen two
	static UX_STEP_NOCB(signMqsChallengeMenuWarningScreenTwo, pnn, {

		// Picture
		&C_icon_warning,
		
		// First line
		"listen for the",
		
		// Second line
		"account's"
	});

	// Sign MQS challenge menu warning screen three
	static UX_STEP_NOCB(signMqsChallengeMenuWarningScreenThree, pnn, {

		// Picture
		&C_icon_warning,
		
		// First line
		kernelFeaturesOrTransactionTypeLineBuffer,
		
		// Second line
		"transactions"
	});

	// Sign MQS challenge menu approve screen
	static UX_STEP_CB(signMqsChallengeMenuApproveScreen, pb, processUserInteraction(GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION, true, true), {

		// Picture
		&C_icon_approve,
		
		// Bold line
		"Approve"
	});

	// Sign MQS challenge menu deny screen
	static UX_STEP_CB(signMqsChallengeMenuDenyScreen, pb, processUserInteraction(GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION, false, false), {

		// Picture
		&C_icon_reject,
		
		// Bold line
		"Deny"
	});
	
	// Sign MQS challenge menu
	static const ux_flow_step_t *signMqsChallengeMenu[9];

	// Approve transaction menu notify screen
	static UX_STEP_NOCB(approveTransactionMenuNotifyScreen, pnn, {

		// Picture
		&C_icon_view,

		// First line
		verifyAddressApproveTransactionOrSignChallengeLineBuffer,
		
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
			amountOrAddressTypeLineBuffer
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
		.text = amountOrAddressTypeLineBuffer
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
			kernelFeaturesDetailsTitleOrSignTypeLineBuffer,
			
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
		.title = kernelFeaturesDetailsTitleOrSignTypeLineBuffer,
		
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
	static const char *const ABOUT_MENU_INFO_CONTENTS[] = {APPVERSION};
	
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
	
	// Sign MQS challenge menu continue callback
	static void signMqsChallengeMenuContinueCallback(void);
	
	// Sign MQS challenge menu choice callback
	static void signMqsChallengeMenuChoiceCallback(const bool confirm);
	
	// Sign MQS challenge menu confirm reject callback
	static void signMqsChallengeMenuConfirmRejectCallback(void);
	
	// Sign MQS challenge menu reject callback
	static void signMqsChallengeMenuRejectCallback(void);
	
	// Sign approve transaction menu continue callback
	static void approveTransactionMenuContinueCallback(void);
	
	// Sign approve transaction menu choice callback
	static void approveTransactionMenuChoiceCallback(const bool confirm);
	
	// Sign approve transaction menu confirm reject callback
	static void approveTransactionMenuConfirmRejectCallback(void);
	
	// Sign approve transaction menu reject callback
	static void approveTransactionMenuRejectCallback(void);
#endif


// Supporting function implementation

// Clear menu buffers
void clearMenuBuffers(void) {
	
	// Clear the time, processing message, progress bar message, or currency name line buffer
	explicit_bzero((char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer, sizeof(timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer));
	
	// Clear the public key or address line buffer
	explicit_bzero((char *)publicKeyOrAddressLineBuffer, sizeof(publicKeyOrAddressLineBuffer));
	
	// Clear the verify address, approve transaction, or sign challenge line buffer
	explicit_bzero(verifyAddressApproveTransactionOrSignChallengeLineBuffer, sizeof(verifyAddressApproveTransactionOrSignChallengeLineBuffer));
	
	// Clear the amount or address type line buffer
	explicit_bzero(amountOrAddressTypeLineBuffer, sizeof(amountOrAddressTypeLineBuffer));
	
	// Clear the fee line buffer
	explicit_bzero(feeLineBuffer, sizeof(feeLineBuffer));
	
	// Clear the kernel features or transaction type line buffer
	explicit_bzero(kernelFeaturesOrTransactionTypeLineBuffer, sizeof(kernelFeaturesOrTransactionTypeLineBuffer));
	
	// Clear the kernel features details title or sign type line buffer
	explicit_bzero(kernelFeaturesDetailsTitleOrSignTypeLineBuffer, sizeof(kernelFeaturesDetailsTitleOrSignTypeLineBuffer));
	
	// Clear the kernel features details text or account index line buffer
	explicit_bzero(kernelFeaturesDetailsTextOrAccountIndexLineBuffer, sizeof(kernelFeaturesDetailsTextOrAccountIndexLineBuffer));
	
	// Check if has NBGL
	#ifdef HAVE_NBGL
	
		// Clear the succeeded line buffer
		explicit_bzero(succeededLineBuffer, sizeof(succeededLineBuffer));
		
		// Clear the failed line buffer
		explicit_bzero(failedLineBuffer, sizeof(failedLineBuffer));
		
		// Clear the canceled line buffer
		explicit_bzero(canceledLineBuffer, sizeof(canceledLineBuffer));
		
		// Clear the cancel prompt line buffer
		explicit_bzero(cancelPromptLineBuffer, sizeof(cancelPromptLineBuffer));
		
		// Clear the approve button line buffer
		explicit_bzero(approveButtonLineBuffer, sizeof(approveButtonLineBuffer));
		
		// Clear the warning line buffer
		explicit_bzero(warningLineBuffer, sizeof(warningLineBuffer));
	#endif
	
	// Copy currency information to buffers
	memcpy((char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer, currencyInformation->name, sizeof(currencyInformation->name));
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
						if(strlen(currencyInformation->name) <= (BAGL_WIDTH - START_OF_TEXT_NEXT_TO_PICTURE) / AVERAGE_CHARACTER_WIDTH) {
						
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
						if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, APPVERSION, sizeof(APPVERSION) - sizeof((char)'\0'), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
						
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
			
			// Sign MQS challenge menu
			case SIGN_MQS_CHALLENGE_MENU:
			
				{
				
					// Set sign MQS challenge menu to use notify screen
					signMqsChallengeMenu[0] = &signMqsChallengeMenuNotifyScreen;
					
					// Set sign MQS challenge menu to use account index screen
					signMqsChallengeMenu[1] = &signMqsChallengeMenuAccountIndexScreen;
					
					// Check if time, processing message, progress bar message, or currency name line buffer isn't empty
					if(strlen((char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer)) {
					
						// Set sign MQS challenge menu to use time and date screen
						signMqsChallengeMenu[2] = &signMqsChallengeMenuTimeAndDateScreen;
					}
					
					// Otherwise
					else {
					
						// Set sign MQS challenge menu to use default challenge screen
						signMqsChallengeMenu[2] = &signMqsChallengeMenuDefaultChallengeScreen;
					}
					
					// Set sign MQS challenge menu to use warning screen one
					signMqsChallengeMenu[3] = &signMqsChallengeMenuWarningScreenOne;
					
					// Set sign MQS challenge menu to use warning screen two
					signMqsChallengeMenu[4] = &signMqsChallengeMenuWarningScreenTwo;
					
					// Set sign MQS challenge menu to use warning screen three
					signMqsChallengeMenu[5] = &signMqsChallengeMenuWarningScreenThree;
					
					// Set sign MQS challenge menu to use warning approve screen
					signMqsChallengeMenu[6] = &signMqsChallengeMenuApproveScreen;
					
					// Set sign MQS challenge menu to use warning deny screen
					signMqsChallengeMenu[7] = &signMqsChallengeMenuDenyScreen;
					
					// End sign MQS challenge menu
					signMqsChallengeMenu[8] = FLOW_END_STEP;
					
					// Set menu steps to sign MQS challenge menu
					menuSteps = signMqsChallengeMenu;
				}
				
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
						if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, amountOrAddressTypeLineBuffer, strlen(amountOrAddressTypeLineBuffer), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
						
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
					
					// Check if kernel features details title or sign type line buffer isn't empty
					if(strlen(kernelFeaturesDetailsTitleOrSignTypeLineBuffer)) {
					
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
				nbgl_useCaseReviewStart(&currencyIconBuffer, "Export root public\nkey?", NULL, "Deny", exportRootPublicKeyMenuContinueCallback, exportRootPublicKeyMenuConfirmRejectCallback);
				
				// Break
				break;
			
			// Verify root public key menu
			case VERIFY_ROOT_PUBLIC_KEY_MENU:
			
				// Show verify root public key menu
				nbgl_useCaseReviewStart(&currencyIconBuffer, "Verify root public\nkey", NULL, "Cancel", verifyRootPublicKeyMenuContinueCallback, verifyRootPublicKeyMenuRejectCallback);
			
				// Break
				break;
			
			// Verify address menu
			case VERIFY_ADDRESS_MENU:
			
				// Show verify address menu
				nbgl_useCaseReviewStart(&currencyIconBuffer, verifyAddressApproveTransactionOrSignChallengeLineBuffer, NULL, "Cancel", verifyAddressMenuContinueCallback, verifyAddressMenuRejectCallback);
				
				// Break
				break;
			
			// Sign MQS challenge menu
			case SIGN_MQS_CHALLENGE_MENU:
			
				// Show sign MQS challenge menu
				nbgl_useCaseReviewStart(&currencyIconBuffer, verifyAddressApproveTransactionOrSignChallengeLineBuffer, NULL, "Deny", signMqsChallengeMenuContinueCallback, signMqsChallengeMenuConfirmRejectCallback);
				
				// Break
				break;
			
			// Approve transaction menu
			case APPROVE_TRANSACTION_MENU:
			
				// Show approve transaction menu
				nbgl_useCaseReviewStart(&currencyIconBuffer, verifyAddressApproveTransactionOrSignChallengeLineBuffer, NULL, "Deny", approveTransactionMenuContinueCallback, approveTransactionMenuConfirmRejectCallback);
				
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
	}
	
// Otherwise check if has NBGL
#elif defined HAVE_NBGL

	// Show progress bar
	void showProgressBar(__attribute__((unused)) const uint8_t percent) {
	
	}
#endif

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
		
		exportRootPublicKeyMenuTagValuePairs[1].item = "*The host will be able to view\nthe account's transactions";
		exportRootPublicKeyMenuTagValuePairs[1].value = "";
		
		// Set export root public key menu tag value list
		exportRootPublicKeyMenuTagValueList.nbPairs = ARRAYLEN(exportRootPublicKeyMenuTagValuePairs);
		exportRootPublicKeyMenuTagValueList.pairs = exportRootPublicKeyMenuTagValuePairs;
		exportRootPublicKeyMenuTagValueList.wrapping = true;
		
		// Set export root public key menu info long press
		exportRootPublicKeyMenuInfoLongPress.icon = &currencyIconBuffer;
		exportRootPublicKeyMenuInfoLongPress.text = "Export root public\nkey?";
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
		verifyAddressMenuTagValuePairs[0].item = amountOrAddressTypeLineBuffer;
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
			
				// Show status
				nbgl_useCaseStatus(succeededLineBuffer, true, showMainMenu);
			}
			
			// Otherwise
			else {
				
				// Show status
				nbgl_useCaseStatus(failedLineBuffer, false, showMainMenu);
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
		
		// Show status
		nbgl_useCaseStatus(canceledLineBuffer, false, showMainMenu);
	}
	
	// Sign MQS challenge menu continue callback
	void signMqsChallengeMenuContinueCallback(void) {
	
		// Set sign MQS challenge menu tag value pairs
		signMqsChallengeMenuTagValuePairs[0].item = "Account Index";
		signMqsChallengeMenuTagValuePairs[0].value = kernelFeaturesDetailsTextOrAccountIndexLineBuffer;
		
		// Check if time, processing message, progress bar message, or currency name line buffer isn't empty
		if(strlen((char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer)) {
		
			// Set sign MQS challenge menu tag value pairs
			signMqsChallengeMenuTagValuePairs[1].item = "Time And Date";
			signMqsChallengeMenuTagValuePairs[1].value = (char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer;
		}
		
		// Otherwise
		else {
		
			// Set sign MQS challenge menu tag value pairs
			signMqsChallengeMenuTagValuePairs[1].item = "Default Challenge";
			signMqsChallengeMenuTagValuePairs[1].value = DEFAULT_MQS_CHALLENGE;
		}
		
		// Set sign MQS challenge menu tag value pairs
		signMqsChallengeMenuTagValuePairs[2].item = warningLineBuffer;
		signMqsChallengeMenuTagValuePairs[2].value = "";
		
		// Set sign MQS challenge menu tag value list
		signMqsChallengeMenuTagValueList.nbPairs = ARRAYLEN(signMqsChallengeMenuTagValuePairs);
		signMqsChallengeMenuTagValueList.pairs = signMqsChallengeMenuTagValuePairs;
		signMqsChallengeMenuTagValueList.wrapping = true;
		
		// Set sign MQS challenge menu info long press
		signMqsChallengeMenuInfoLongPress.icon = &currencyIconBuffer;
		signMqsChallengeMenuInfoLongPress.text = verifyAddressApproveTransactionOrSignChallengeLineBuffer;
		signMqsChallengeMenuInfoLongPress.longPressText = "Hold to sign";
		
		// Show static review
		nbgl_useCaseStaticReview(&signMqsChallengeMenuTagValueList, &signMqsChallengeMenuInfoLongPress, "Deny", signMqsChallengeMenuChoiceCallback);
	}
	
	// Sign MQS challenge menu choice callback
	void signMqsChallengeMenuChoiceCallback(const bool confirm) {
	
		// Check if confirmed
		if(confirm) {
		
			// Check if processing user interaction was successful
			if(processUserInteraction(GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION, true, true)) {
			
				// Show status
				nbgl_useCaseStatus(succeededLineBuffer, true, showMainMenu);
			}
			
			// Otherwise
			else {
			
				// Show status
				nbgl_useCaseStatus(failedLineBuffer, false, showMainMenu);
			}
		}
		
		// Otherwise
		else {
		
			// Sign MQS challenge menu confirm reject callback
			signMqsChallengeMenuConfirmRejectCallback();
		}
	}
	
	// Sign MQS challenge menu confirm reject callback
	void signMqsChallengeMenuConfirmRejectCallback(void) {
	
		// Show confirm
		nbgl_useCaseConfirm(cancelPromptLineBuffer, NULL, "Yes, deny", "Go back", signMqsChallengeMenuRejectCallback);
	}
	
	// Sign MQS challenge menu reject callback
	void signMqsChallengeMenuRejectCallback(void) {
	
		// Process user interaction
		processUserInteraction(GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION, false, false);
		
		// Show status
		nbgl_useCaseStatus(canceledLineBuffer, false, showMainMenu);
	}
	
	// Sign approve transaction menu continue callback
	void approveTransactionMenuContinueCallback(void) {
	
		// Set approve transaction menu tag value pairs
		approveTransactionMenuTagValuePairs[0].item = "Amount";
		approveTransactionMenuTagValuePairs[0].value = amountOrAddressTypeLineBuffer;
		
		approveTransactionMenuTagValuePairs[1].item = "Fee";
		approveTransactionMenuTagValuePairs[1].value = feeLineBuffer;
		
		approveTransactionMenuTagValuePairs[2].item = "Kernel Features";
		approveTransactionMenuTagValuePairs[2].value = kernelFeaturesOrTransactionTypeLineBuffer;
		
		// Initialize index
		size_t index = 3;
		
		// Check if kernel features details title or sign type line buffer isn't empty
		if(strlen(kernelFeaturesDetailsTitleOrSignTypeLineBuffer)) {
		
			// Set approve transaction menu tag value pairs
			approveTransactionMenuTagValuePairs[index].item = kernelFeaturesDetailsTitleOrSignTypeLineBuffer;
			approveTransactionMenuTagValuePairs[index++].value = kernelFeaturesDetailsTextOrAccountIndexLineBuffer;
		}
		
		// Check if public key or address line buffer isn't empty
		if(strlen((char *)publicKeyOrAddressLineBuffer)) {
		
			// Set approve transaction menu tag value pairs
			approveTransactionMenuTagValuePairs[index].item = "Proof Address";
			approveTransactionMenuTagValuePairs[index++].value = (char *)publicKeyOrAddressLineBuffer;
		}
		
		// Otherwise
		else {
			
			// Set approve transaction menu tag value pairs
			approveTransactionMenuTagValuePairs[index].item = "*No payment proof";
			approveTransactionMenuTagValuePairs[index++].value = "";
		}
		
		// Set approve transaction menu tag value list
		approveTransactionMenuTagValueList.nbPairs = index;
		approveTransactionMenuTagValueList.pairs = approveTransactionMenuTagValuePairs;
		approveTransactionMenuTagValueList.wrapping = true;
		
		// Set approve transaction menu info long press
		approveTransactionMenuInfoLongPress.icon = &currencyIconBuffer;
		approveTransactionMenuInfoLongPress.text = verifyAddressApproveTransactionOrSignChallengeLineBuffer;
		approveTransactionMenuInfoLongPress.longPressText = approveButtonLineBuffer;
		
		// Show static review
		nbgl_useCaseStaticReview(&approveTransactionMenuTagValueList, &approveTransactionMenuInfoLongPress, "Deny", approveTransactionMenuChoiceCallback);
	}
	
	// Sign approve transaction menu choice callback
	void approveTransactionMenuChoiceCallback(const bool confirm) {
	
		// Check if confirmed
		if(confirm) {
		
			// Check if processing user interaction was successful
			if(processUserInteraction(FINISH_TRANSACTION_INSTRUCTION, true, true)) {
			
				// Show status
				nbgl_useCaseStatus(succeededLineBuffer, true, showMainMenu);
			}
			
			// Otherwise
			else {
			
				// Show status
				nbgl_useCaseStatus(failedLineBuffer, false, showMainMenu);
			}
		}
		
		// Otherwise
		else {
		
			// approve transaction menu confirm reject callback
			approveTransactionMenuConfirmRejectCallback();
		}
	}
	
	// Sign approve transaction menu confirm reject callback
	void approveTransactionMenuConfirmRejectCallback(void) {
	
		// Show confirm
		nbgl_useCaseConfirm(cancelPromptLineBuffer, NULL, "Yes, deny", "Go back", approveTransactionMenuRejectCallback);
	}
	
	// Sign approve transaction menu reject callback
	void approveTransactionMenuRejectCallback(void) {
	
		// Process user interaction
		processUserInteraction(FINISH_TRANSACTION_INSTRUCTION, false, false);
		
		// Show status
		nbgl_useCaseStatus(canceledLineBuffer, false, showMainMenu);
	}
#endif
