// Header files
#include <os_io_seproxyhal.h>
#include <string.h>
#include <ux.h>
#include "common.h"
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
#if defined BAGL_HEIGHT && BAGL_HEIGHT < 64

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

// Time line buffer
char timeLineBuffer[TIME_LINE_BUFFER_SIZE];

// Progress bar message line buffer
char progressBarMessageLineBuffer[PROGRESS_BAR_MESSAGE_LINE_BUFFER_SIZE];

// Public key line buffer
volatile char publicKeyLineBuffer[PUBLIC_KEY_LINE_BUFFER_SIZE];

// Address line buffer
char addressLineBuffer[ADDRESS_LINE_BUFFER_SIZE];

// Verify address line buffer
char verifyAddressLineBuffer[VERIFY_ADDRESS_LINE_BUFFER_SIZE];

// Approve transaction line buffer
char approveTransactionLineBuffer[APPROVE_TRANSACTION_LINE_BUFFER_SIZE];

// Sign challenge line buffer
char signChallengeLineBuffer[SIGN_CHALLENGE_LINE_BUFFER_SIZE];

// Amount line buffer
char amountLineBuffer[AMOUNT_LINE_BUFFER_SIZE];

// Address type line buffer
char addressTypeLineBuffer[ADDRESS_TYPE_LINE_BUFFER_SIZE];

// Fee line buffer
char feeLineBuffer[FEE_LINE_BUFFER_SIZE];

// Kernel features line buffer
char kernelFeaturesLineBuffer[KERNEL_FEATURES_LINE_BUFFER_SIZE];

// Kernel features details title line buffer
char kernelFeaturesDetailsTitleLineBuffer[KERNEL_FEATURES_DETAILS_TITLE_LINE_BUFFER_SIZE];

// Kernel features details text line buffer
char kernelFeaturesDetailsTextLineBuffer[KERNEL_FEATURES_DETAILS_TEXT_LINE_BUFFER_SIZE];

// Account index line buffer
char accountIndexLineBuffer[ACCOUNT_INDEX_LINE_BUFFER_SIZE];

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

// Sign login challenge menu tag value pairs
static nbgl_layoutTagValue_t signLoginChallengeMenuTagValuePairs[3];

// Sign login challenge menu tag value list
static nbgl_layoutTagValueList_t signLoginChallengeMenuTagValueList;

// Sign login challenge menu info long press
static nbgl_pageInfoLongPress_t signLoginChallengeMenuInfoLongPress;

// Sign approve transaction menu tag value pairs
static nbgl_layoutTagValue_t approveTransactionMenuTagValuePairs[6];

// Sign approve transaction menu tag value list
static nbgl_layoutTagValueList_t approveTransactionMenuTagValueList;

// Sign approve transaction menu info long press
static nbgl_pageInfoLongPress_t approveTransactionMenuInfoLongPress;

#endif


// Constants

// Check if has BAGL
#ifdef HAVE_BAGL

// Main menu currency name ready screen
static UX_STEP_NOCB(mainMenuCurrencyNameReadyScreen, pnn, {&CURRENCY_ICON_DETAILS, CURRENCY_NAME, "is ready"});

// Main menu ready screen
static UX_STEP_NOCB(mainMenuReadyScreen, pnn, {&CURRENCY_ICON_DETAILS, "Application", "is ready"});

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Main menu currency screen
static UX_STEP_NOCB(mainMenuCurrencyScreen, nb_paging, {.title = "Currency", .text = CURRENCY_NAME});

	// Otherwise
	#else

// Main menu currency screen
static UX_STEP_NOCB(mainMenuCurrencyScreen, bnnn_paging, {.title = "Currency", .text = CURRENCY_NAME});

	#endif

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

// Main menu version single line screen
static UX_STEP_NOCB(mainMenuVersionSingleLineScreen, bn, {"Version", APPVERSION});

	#endif

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Main menu version multiline screen
static UX_STEP_NOCB(mainMenuVersionMultilineScreen, nb_paging, {.title = "Version", .text = APPVERSION});

	// Otherwise
	#else

// Main menu version multiline screen
static UX_STEP_NOCB(mainMenuVersionMultilineScreen, bnnn_paging, {.title = "Version", .text = APPVERSION});

	#endif

// Main menu exit screen
static UX_STEP_VALID(mainMenuExitScreen, pb, exitApplication(), {&C_icon_back_x, "Back to dashboard"});

// Main menu
static const ux_flow_step_t *mainMenu[6];

// Export root public key menu notify screen
static UX_STEP_NOCB(exportRootPublicKeyMenuNotifyScreen, pnn, {&C_icon_eye, "Export root", "public key?"});

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Export root public key menu account index screen
static UX_STEP_NOCB(exportRootPublicKeyMenuAccountIndexScreen, nb_paging, {.title = "Account Index", .text = accountIndexLineBuffer});

	// Otherwise
	#else

// Export root public key menu account index screen
static UX_STEP_NOCB(exportRootPublicKeyMenuAccountIndexScreen, bn, {"Account Index", accountIndexLineBuffer});

	#endif

// Export root public key menu warning screen one
static UX_STEP_NOCB(exportRootPublicKeyMenuWarningScreenOne, pnn, {&C_icon_warning, "The host will", "be able to view"});

// Export root public key menu warning screen two
static UX_STEP_NOCB(exportRootPublicKeyMenuWarningScreenTwo, pnn, {&C_icon_warning, "the account's", "transactions"});

// Export root public key menu approve screen
static UX_STEP_CB(exportRootPublicKeyMenuApproveScreen, pb, processUserInteraction(GET_ROOT_PUBLIC_KEY_INSTRUCTION, true, true), {&C_icon_validate_14, "Approve"});

// Export root public key menu deny screen
static UX_STEP_CB(exportRootPublicKeyMenuDenyScreen, pb, processUserInteraction(GET_ROOT_PUBLIC_KEY_INSTRUCTION, false, false), {&C_icon_crossmark, "Deny"});

// Export root public key menu
static UX_FLOW(exportRootPublicKeyMenu, &exportRootPublicKeyMenuNotifyScreen, &exportRootPublicKeyMenuAccountIndexScreen, &exportRootPublicKeyMenuWarningScreenOne, &exportRootPublicKeyMenuWarningScreenTwo, &exportRootPublicKeyMenuApproveScreen, &exportRootPublicKeyMenuDenyScreen);

// Verify root public key menu notify screen
static UX_STEP_NOCB(verifyRootPublicKeyMenuNotifyScreen, pnn, {&C_icon_eye, "Verify root", "public key"});

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Verify root public key menu public key screen
static UX_STEP_NOCB(verifyRootPublicKeyMenuPublicKeyScreen, nb_paging, {.title = "Root Public Key", .text = (char *)publicKeyLineBuffer});

	// Otherwise
	#else

// Verify root public key menu public key screen
static UX_STEP_NOCB(verifyRootPublicKeyMenuPublicKeyScreen, bnnn_paging, {.title = "Root Public Key", .text = (char *)publicKeyLineBuffer});

	#endif

// Verify root public key menu valid screen
static UX_STEP_CB(verifyRootPublicKeyMenuValidScreen, pb, processUserInteraction(VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION, true, false), {&C_icon_validate_14, "Valid"});

// Verify root public key menu invalid screen
static UX_STEP_CB(verifyRootPublicKeyMenuInvalidScreen, pb, processUserInteraction(VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION, false, false), {&C_icon_crossmark, "Invalid"});

// Verify root public key menu
static UX_FLOW(verifyRootPublicKeyMenu, &verifyRootPublicKeyMenuNotifyScreen, &verifyRootPublicKeyMenuPublicKeyScreen, &verifyRootPublicKeyMenuValidScreen, &verifyRootPublicKeyMenuInvalidScreen);

// Verify address menu notify screen
static UX_STEP_NOCB(verifyAddressMenuNotifyScreen, pnn, {&C_icon_eye, verifyAddressLineBuffer, "address"});

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Verify address menu address screen
static UX_STEP_NOCB(verifyAddressMenuAddressScreen, nb_paging, {.title = addressTypeLineBuffer, .text = addressLineBuffer});

	// Otherwise
	#else

// Verify address menu address screen
static UX_STEP_NOCB(verifyAddressMenuAddressScreen, bnnn_paging, {.title = addressTypeLineBuffer, .text = addressLineBuffer});

	#endif

// Verify address menu valid screen
static UX_STEP_CB(verifyAddressMenuValidScreen, pb, processUserInteraction(VERIFY_ADDRESS_INSTRUCTION, true, false), {&C_icon_validate_14, "Valid"});

// Verify address menu invalid screen
static UX_STEP_CB(verifyAddressMenuInvalidScreen, pb, processUserInteraction(VERIFY_ADDRESS_INSTRUCTION, false, false), {&C_icon_crossmark, "Invalid"});

// Verify address menu
static UX_FLOW(verifyAddressMenu, &verifyAddressMenuNotifyScreen, &verifyAddressMenuAddressScreen, &verifyAddressMenuValidScreen, &verifyAddressMenuInvalidScreen);

// Sign MQS challenge menu notify screen
static UX_STEP_NOCB(signMqsChallengeMenuNotifyScreen, pnn, {&C_icon_eye, signChallengeLineBuffer, "challenge?"});

	// Sign MQS challenge menu account index screen
	#define signMqsChallengeMenuAccountIndexScreen exportRootPublicKeyMenuAccountIndexScreen

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Sign MQS challenge menu time and date screen
static UX_STEP_NOCB(signMqsChallengeMenuTimeAndDateScreen, nb_paging, {.title = "Time And Date", .text = timeLineBuffer});

	// Otherwise
	#else

// Sign MQS challenge menu time and date screen
static UX_STEP_NOCB(signMqsChallengeMenuTimeAndDateScreen, bnnn_paging, {.title = "Time And Date", .text = timeLineBuffer});

	#endif

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Sign MQS challenge menu default challenge screen
static UX_STEP_NOCB(signMqsChallengeMenuDefaultChallengeScreen, nb_paging, {.title = "Default Challenge", .text = DEFAULT_MQS_CHALLENGE});

	// Otherwise
	#else

// Sign MQS challenge menu default challenge screen
static UX_STEP_NOCB(signMqsChallengeMenuDefaultChallengeScreen, bnnn_paging, {.title = "Default Challenge", .text = DEFAULT_MQS_CHALLENGE});

	#endif

// Sign MQS challenge menu warning screen one
static UX_STEP_NOCB(signMqsChallengeMenuWarningScreenOne, pnn, {&C_icon_warning, "The host will", "be able to"});

// Sign MQS challenge menu warning screen two
static UX_STEP_NOCB(signMqsChallengeMenuWarningScreenTwo, pnn, {&C_icon_warning, "listen for the", "account's"});

// Sign MQS challenge menu warning screen three
static UX_STEP_NOCB(signMqsChallengeMenuWarningScreenThree, pnn, {&C_icon_warning, "MQS", "transactions"});

// Sign MQS challenge menu approve screen
static UX_STEP_CB(signMqsChallengeMenuApproveScreen, pb, processUserInteraction(GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION, true, true), {&C_icon_validate_14, "Approve"});

// Sign MQS challenge menu deny screen
static UX_STEP_CB(signMqsChallengeMenuDenyScreen, pb, processUserInteraction(GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION, false, false), {&C_icon_crossmark, "Deny"});

// Sign MQS challenge menu
static const ux_flow_step_t *signMqsChallengeMenu[9];

// Sign login challenge menu notify screen
static UX_STEP_NOCB(signLoginChallengeMenuNotifyScreen, pnn, {&C_icon_eye, "Login with", "wallet?"});

	// Sign login challenge menu account index screen
	#define signLoginChallengeMenuAccountIndexScreen exportRootPublicKeyMenuAccountIndexScreen

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

// Sign login challenge menu identifier single line screen
static UX_STEP_NOCB(signLoginChallengeMenuIdentifierSingleLineScreen, bn, {"Identifier", (char *)publicKeyLineBuffer});

	#endif

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Sign login challenge menu identifier  multiline screen
static UX_STEP_NOCB(signLoginChallengeMenuIdentifierMultilineScreen, nb_paging, {.title = "Identifier", .text = (char *)publicKeyLineBuffer});

	// Otherwise
	#else

// Sign login challenge menu identifier  multiline screen
static UX_STEP_NOCB(signLoginChallengeMenuIdentifierMultilineScreen, bnnn_paging, {.title = "Identifier", .text = (char *)publicKeyLineBuffer});

	#endif

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Sign login challenge menu time and date screen
static UX_STEP_NOCB(signLoginChallengeMenuTimeAndDateScreen, nb_paging, {.title = "Time And Date", .text = timeLineBuffer});

	// Otherwise
	#else

// Sign login challenge menu time and date screen
static UX_STEP_NOCB(signLoginChallengeMenuTimeAndDateScreen, bnnn_paging, {.title = "Time And Date", .text = timeLineBuffer});

	#endif

// Sign login challenge menu approve screen
static UX_STEP_CB(signLoginChallengeMenuApproveScreen, pb, processUserInteraction(GET_LOGIN_CHALLENGE_SIGNATURE_INSTRUCTION, true, true), {&C_icon_validate_14, "Approve"});

// Sign login challenge menu deny screen
static UX_STEP_CB(signLoginChallengeMenuDenyScreen, pb, processUserInteraction(GET_LOGIN_CHALLENGE_SIGNATURE_INSTRUCTION, false, false), {&C_icon_crossmark, "Deny"});

// Sign login challenge menu
static const ux_flow_step_t *signLoginChallengeMenu[7];

// Approve transaction menu notify screen
static UX_STEP_NOCB(approveTransactionMenuNotifyScreen, pnn, {&C_icon_eye, approveTransactionLineBuffer, "transaction?"});

	// Approve transaction menu account index screen
	#define approveTransactionMenuAccountIndexScreen exportRootPublicKeyMenuAccountIndexScreen

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

// Approve transaction menu amount single line screen
static UX_STEP_NOCB(approveTransactionMenuAmountSingleLineScreen, bn, {"Amount", amountLineBuffer});

	#endif

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Approve transaction menu amount multiline screen
static UX_STEP_NOCB(approveTransactionMenuAmountMultilineScreen, nb_paging, {.title = "Amount", .text = amountLineBuffer});

	// Otherwise
	#else

// Approve transaction menu amount multiline screen
static UX_STEP_NOCB(approveTransactionMenuAmountMultilineScreen, bnnn_paging, {.title = "Amount", .text = amountLineBuffer});

	#endif

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

// Approve transaction menu fee single line screen
static UX_STEP_NOCB(approveTransactionMenuFeeSingleLineScreen, bn, {"Fee", feeLineBuffer});

	#endif

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Approve transaction menu fee multiline screen
static UX_STEP_NOCB(approveTransactionMenuFeeMultilineScreen, nb_paging, {.title = "Fee", .text = feeLineBuffer});

	// Otherwise
	#else

// Approve transaction menu fee multiline screen
static UX_STEP_NOCB(approveTransactionMenuFeeMultilineScreen, bnnn_paging, {.title = "Fee", .text = feeLineBuffer});

	#endif

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Approve transaction menu kernel features screen
static UX_STEP_NOCB(approveTransactionMenuKernelFeaturesScreen, nb_paging, {.title = "Kernel Features", .text = kernelFeaturesLineBuffer});

	// Otherwise
	#else

// Approve transaction menu kernel features screen
static UX_STEP_NOCB(approveTransactionMenuKernelFeaturesScreen, bn, {"Kernel Features", kernelFeaturesLineBuffer});

	#endif

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

// Approve transaction menu kernel features details single line screen
static UX_STEP_NOCB(approveTransactionMenuKernelFeaturesDetailsSingleLineScreen, bn, {kernelFeaturesDetailsTitleLineBuffer, kernelFeaturesDetailsTextLineBuffer});

	#endif

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Approve transaction menu kernel features details multiline screen
static UX_STEP_NOCB(approveTransactionMenuKernelFeaturesDetailsMultilineScreen, nb_paging, {.title = kernelFeaturesDetailsTitleLineBuffer, .text = kernelFeaturesDetailsTextLineBuffer});

	// Otherwise
	#else

// Approve transaction menu kernel features details multiline screen
static UX_STEP_NOCB(approveTransactionMenuKernelFeaturesDetailsMultilineScreen, bnnn_paging, {.title = kernelFeaturesDetailsTitleLineBuffer, .text = kernelFeaturesDetailsTextLineBuffer});

	#endif

	// Check if device has low height
	#if BAGL_HEIGHT < 64

// Approve transaction menu proof address screen
static UX_STEP_NOCB(approveTransactionMenuProofAddressScreen, nb_paging, {.title = "Proof Address", .text = addressLineBuffer});

	// Otherwise
	#else

// Approve transaction menu proof address screen
static UX_STEP_NOCB(approveTransactionMenuProofAddressScreen, bnnn_paging, {.title = "Proof Address", .text = addressLineBuffer});

	#endif

// Approve transaction menu no payment proof screen
static UX_STEP_NOCB(approveTransactionMenuNoPaymentProofScreen, pnn, {&C_icon_warning, "No payment", "proof"});

// Approve transaction menu approve screen
static UX_STEP_CB(approveTransactionMenuApproveScreen, pb, processUserInteraction(FINISH_TRANSACTION_INSTRUCTION, true, true), {&C_icon_validate_14, "Approve"});

// Approve transaction menu deny screen
static UX_STEP_CB(approveTransactionMenuDenyScreen, pb, processUserInteraction(FINISH_TRANSACTION_INSTRUCTION, false, false), {&C_icon_crossmark, "Deny"});

// Approve transaction menu
static const ux_flow_step_t *approveTransactionMenu[10];

// Processing menu message screen
static UX_STEP_NOCB(processingMenuMessageScreen, pb, {&C_icon_processing, "Processing"});

// Processing menu
static UX_FLOW(processingMenu, &processingMenuMessageScreen);

// Progress bar
static const bagl_element_t PROGRESS_BAR[] = {

	// Clear
	{{BAGL_RECTANGLE, 0x00, 0, 0, BAGL_WIDTH, BAGL_HEIGHT, 0, 0, BAGL_FILL, 0x000000, 0xFFFFFF, 0, 0}, NULL},

	// Text
	{{BAGL_LABELINE, 0x0, 0, (BAGL_HEIGHT / 2) - 3, BAGL_WIDTH, BAGL_HEIGHT, 0, 0, 0, 0xFFFFFF, 0x000000, BAGL_FONT_OPEN_SANS_EXTRABOLD_11px | BAGL_FONT_ALIGNMENT_CENTER, 0}, progressBarMessageLineBuffer},

	// Outline
	{{BAGL_RECTANGLE, 0x00, PROGRESS_BAR_PADDING, (BAGL_HEIGHT / 2) + 5, BAGL_WIDTH - (PROGRESS_BAR_PADDING * 2), PROGRESS_BAR_HEIGHT, 1, 3, BAGL_OUTLINE, 0xFFFFFF, 0x000000, 0, 0}, NULL},
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


// Global variables

// Check if has BAGL
#ifdef HAVE_BAGL

// Progress bar
static bagl_element_t progressBar[ARRAYLEN(PROGRESS_BAR) + 1];

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

// Sign login challenge menu continue callback
static void signLoginChallengeMenuContinueCallback(void);

// Sign login challenge menu choice callback
static void signLoginChallengeMenuChoiceCallback(const bool confirm);

// Sign login challenge menu confirm reject callback
static void signLoginChallengeMenuConfirmRejectCallback(void);

// Sign login challenge menu reject callback
static void signLoginChallengeMenuRejectCallback(void);

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

	// Clear the time line buffer
	explicit_bzero(timeLineBuffer, sizeof(timeLineBuffer));

	// Clear the progress bar message line buffer
	explicit_bzero(progressBarMessageLineBuffer, sizeof(progressBarMessageLineBuffer));

	// Clear the public key line buffer
	explicit_bzero((char *)publicKeyLineBuffer, sizeof(publicKeyLineBuffer));

	// Clear the address line buffer
	explicit_bzero(addressLineBuffer, sizeof(addressLineBuffer));

	// Clear the verify address line buffer
	explicit_bzero(verifyAddressLineBuffer, sizeof(verifyAddressLineBuffer));

	// Clear the approve transaction line buffer
	explicit_bzero(approveTransactionLineBuffer, sizeof(approveTransactionLineBuffer));

	// Clear the sign challenge line buffer
	explicit_bzero(signChallengeLineBuffer, sizeof(signChallengeLineBuffer));

	// Clear the amount line buffer
	explicit_bzero(amountLineBuffer, sizeof(amountLineBuffer));

	// Clear the address type line buffer
	explicit_bzero(addressTypeLineBuffer, sizeof(addressTypeLineBuffer));

	// Clear the fee line buffer
	explicit_bzero(feeLineBuffer, sizeof(feeLineBuffer));

	// Clear the kernel features line buffer
	explicit_bzero(kernelFeaturesLineBuffer, sizeof(kernelFeaturesLineBuffer));

	// Clear the kernel features details title line buffer
	explicit_bzero(kernelFeaturesDetailsTitleLineBuffer, sizeof(kernelFeaturesDetailsTitleLineBuffer));

	// Clear the kernel features details text line buffer
	explicit_bzero(kernelFeaturesDetailsTextLineBuffer, sizeof(kernelFeaturesDetailsTextLineBuffer));

	// Clear the account index line buffer
	explicit_bzero(accountIndexLineBuffer, sizeof(accountIndexLineBuffer));

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
		case MAIN_MENU: {

			// Initialize index
			size_t index = 0;

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

			// Check if currency information name can fit on one line
			if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, CURRENCY_NAME, sizeof(CURRENCY_NAME) - sizeof((char)'\0'), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {

				// Set main menu to use currency name ready screen
				mainMenu[index++] = &mainMenuCurrencyNameReadyScreen;

			} else

	// Otherwise
	#else

			// Check if currency information name can fit
			if(sizeof(CURRENCY_NAME) - sizeof((char)'\0') <= (BAGL_WIDTH - START_OF_TEXT_NEXT_TO_PICTURE) / AVERAGE_CHARACTER_WIDTH) {

				// Set main menu to use currency name ready screen
				mainMenu[index++] = &mainMenuCurrencyNameReadyScreen;

			} else
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

			} else
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

			// Set menu steps to main menu
			menuSteps = mainMenu;

			// Break
			break;
		}

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

			// Set sign MQS challenge menu to use notify screen
			signMqsChallengeMenu[0] = &signMqsChallengeMenuNotifyScreen;

			// Set sign MQS challenge menu to use account index screen
			signMqsChallengeMenu[1] = &signMqsChallengeMenuAccountIndexScreen;

			// Check if time is provided
			if(strlen(timeLineBuffer)) {

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

			// Break
			break;

		// Sign login challenge menu
		case SIGN_LOGIN_CHALLENGE_MENU: {

			// Initialize index
			size_t index = 0;

			// Set sign login challenge menu to use notify screen
			signLoginChallengeMenu[index++] = &signLoginChallengeMenuNotifyScreen;

			// Set sign login challenge menu to use account index screen
			signLoginChallengeMenu[index++] = &signLoginChallengeMenuAccountIndexScreen;

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

			// Check if identifier can fit on one line
			if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, (char *)publicKeyLineBuffer, strlen((char *)publicKeyLineBuffer), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {

				// Set sign login challenge menu to use identifier single line screen
				signLoginChallengeMenu[index++] = &signLoginChallengeMenuIdentifierSingleLineScreen;

			} else
	#endif
			{

				// Set sign login challenge menu to use identifier multiline screen
				signLoginChallengeMenu[index++] = &signLoginChallengeMenuIdentifierMultilineScreen;
			}

			// Set sign login challenge menu to use time and date screen
			signLoginChallengeMenu[index++] = &signLoginChallengeMenuTimeAndDateScreen;

			// Set sign login challenge menu to use approve screen
			signLoginChallengeMenu[index++] = &signLoginChallengeMenuApproveScreen;

			// Set sign login challenge menu to use deny screen
			signLoginChallengeMenu[index++] = &signLoginChallengeMenuDenyScreen;

			// End sign login challenge menu
			signLoginChallengeMenu[index++] = FLOW_END_STEP;

			// Set menu steps to sign login challenge menu
			menuSteps = signLoginChallengeMenu;

			// Break
			break;
		}

		// Approve transaction menu
		case APPROVE_TRANSACTION_MENU: {

			// Initialize index
			size_t index = 0;

			// Set approve transaction menu to use notify screen
			approveTransactionMenu[index++] = &approveTransactionMenuNotifyScreen;

			// Set approve transaction menu to use account index screen
			approveTransactionMenu[index++] = &approveTransactionMenuAccountIndexScreen;

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

			// Check if amount can fit on one line
			if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, amountLineBuffer, strlen(amountLineBuffer), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {

				// Set approve transaction menu to use amount single line screen
				approveTransactionMenu[index++] = &approveTransactionMenuAmountSingleLineScreen;

			} else
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

			} else
	#endif
			{

				// Set approve transaction menu to use fee multiline screen
				approveTransactionMenu[index++] = &approveTransactionMenuFeeMultilineScreen;
			}

			// Set approve transaction menu to use kernel features screen
			approveTransactionMenu[index++] = &approveTransactionMenuKernelFeaturesScreen;

			// Check if kernel features details are provided
			if(strlen(kernelFeaturesDetailsTitleLineBuffer)) {

	// Check if device doesn't have low height
	#if BAGL_HEIGHT >= 64

				// Check if kernel features details text can fit on one line
				if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, kernelFeaturesDetailsTextLineBuffer, strlen(kernelFeaturesDetailsTextLineBuffer), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {

					// Set approve transaction menu to use kernel features details single line screen
					approveTransactionMenu[index++] = &approveTransactionMenuKernelFeaturesDetailsSingleLineScreen;

				} else
	#endif
				{

					// Set approve transaction menu to use kernel features details multiline screen
					approveTransactionMenu[index++] = &approveTransactionMenuKernelFeaturesDetailsMultilineScreen;
				}
			}

			// Check if address is provided
			if(strlen(addressLineBuffer)) {

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

			// Break
			break;
		}

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

			// Show main menu
			nbgl_useCaseHome(CURRENCY_NAME, &CURRENCY_ICON_DETAILS, "Application is ready", false, showAboutMenu, exitApplication);

			// Break
			break;

		// Export root public key menu
		case EXPORT_ROOT_PUBLIC_KEY_MENU:

			// Show export root public key menu
			nbgl_useCaseReviewStart(&CURRENCY_ICON_DETAILS, "Export root public\nkey?", NULL, "Deny", exportRootPublicKeyMenuContinueCallback, exportRootPublicKeyMenuConfirmRejectCallback);

			// Break
			break;

		// Verify root public key menu
		case VERIFY_ROOT_PUBLIC_KEY_MENU:

			// Show verify root public key menu
			nbgl_useCaseReviewStart(&CURRENCY_ICON_DETAILS, "Verify root public\nkey", NULL, "Cancel", verifyRootPublicKeyMenuContinueCallback, verifyRootPublicKeyMenuRejectCallback);

			// Break
			break;

		// Verify address menu
		case VERIFY_ADDRESS_MENU:

			// Show verify address menu
			nbgl_useCaseReviewStart(&CURRENCY_ICON_DETAILS, verifyAddressLineBuffer, NULL, "Cancel", verifyAddressMenuContinueCallback, verifyAddressMenuRejectCallback);

			// Break
			break;

		// Sign MQS challenge menu
		case SIGN_MQS_CHALLENGE_MENU:

			// Show sign MQS challenge menu
			nbgl_useCaseReviewStart(&CURRENCY_ICON_DETAILS, signChallengeLineBuffer, NULL, "Deny", signMqsChallengeMenuContinueCallback, signMqsChallengeMenuConfirmRejectCallback);

			// Break
			break;

		// Sign login challenge menu
		case SIGN_LOGIN_CHALLENGE_MENU:

			// Show sign login challenge menu
			nbgl_useCaseReviewStart(&CURRENCY_ICON_DETAILS, "Login with\nwallet?", NULL, "Deny", signLoginChallengeMenuContinueCallback, signLoginChallengeMenuConfirmRejectCallback);

			// Break
			break;

		// Approve transaction menu
		case APPROVE_TRANSACTION_MENU:

			// Show approve transaction menu
			nbgl_useCaseReviewStart(&CURRENCY_ICON_DETAILS, approveTransactionLineBuffer, NULL, "Deny", approveTransactionMenuContinueCallback, approveTransactionMenuConfirmRejectCallback);

			// Break
			break;

		// Processing menu
		case PROCESSING_MENU:

			// Show processing
			nbgl_useCaseSpinner("Processing");

			// Break
			break;
	}
#endif
}

// Check if has BAGL
#ifdef HAVE_BAGL

// Show progress bar
void showProgressBar(const uint8_t percent) {

	// Clear the progress bar
	explicit_bzero(progressBar, sizeof(progressBar));

	// Include progress bar outline and text in the progress bar
	memcpy(progressBar, PROGRESS_BAR, sizeof(PROGRESS_BAR));

	// Get percent width
	const short percentWidth = (BAGL_WIDTH - ((PROGRESS_BAR_PADDING + 1) * 2)) * percent / MAXIMUM_PROGRESS_BAR_PERCENT;

	// Check if percent width exists
	if(percentWidth) {

		// Include progress bar percent in the progress bar
		bagl_element_t progressBarPercent = {{BAGL_RECTANGLE, 0x00, PROGRESS_BAR_PADDING + 1, (BAGL_HEIGHT / 2) + 5 + ((percentWidth == 1) ? 1 : 0), percentWidth, PROGRESS_BAR_HEIGHT - ((percentWidth == 1) ? 2 : 0), 0, 1, BAGL_FILL, 0xFFFFFF, 0x000000, 0, 0}, NULL};
		memcpy(&progressBar[ARRAYLEN(PROGRESS_BAR)], &progressBarPercent, sizeof(progressBarPercent));
	}

	// Display the progress bar
	UX_DISPLAY(progressBar, NULL);

	// Wait for display to update
	UX_WAIT_DISPLAYED();
}

// Otherwise
#else

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
	nbgl_useCaseSettings(CURRENCY_NAME, 0, 1, false, showMainMenu, aboutMenuDisplayCallback, NULL);
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
	exportRootPublicKeyMenuTagValuePairs[0].value = accountIndexLineBuffer;

	exportRootPublicKeyMenuTagValuePairs[1].item = "*The host will be able to view\nthe account's transactions";
	exportRootPublicKeyMenuTagValuePairs[1].value = "";

	// Set export root public key menu tag value list
	exportRootPublicKeyMenuTagValueList.nbPairs = ARRAYLEN(exportRootPublicKeyMenuTagValuePairs);
	exportRootPublicKeyMenuTagValueList.pairs = exportRootPublicKeyMenuTagValuePairs;
	exportRootPublicKeyMenuTagValueList.wrapping = true;

	// Set export root public key menu info long press
	exportRootPublicKeyMenuInfoLongPress.icon = &CURRENCY_ICON_DETAILS;
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
	verifyRootPublicKeyMenuTagValuePairs[0].value = (char *)publicKeyLineBuffer;

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
	verifyAddressMenuTagValuePairs[0].value = addressLineBuffer;

	// Set verify address menu content
	verifyAddressMenuContent.type = TAG_VALUE_CONFIRM;
	verifyAddressMenuContent.tagValueConfirm.detailsButtonIcon = &QRCODE_ICON;
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
			.onActionCallback = &verifyAddressMenuModalExitCallback,
		};

		// Set verify address menu modal layout
		verifyAddressMenuModalLayout = nbgl_layoutGet(&layoutDescription);

		// Create QR code
		nbgl_layoutQRCode_t qrCode = {

			// URL
			.url = addressLineBuffer,

			// Text 2
			.text2 = addressLineBuffer,
		};

		// Add QR code to verify address menu modal layout
		nbgl_layoutAddQRCode(verifyAddressMenuModalLayout, &qrCode);

		// Add bottom button to verify address menu modal layout
		nbgl_layoutAddBottomButton(verifyAddressMenuModalLayout, &CLOSE_ICON, 0, true, TUNE_TAP_CASUAL);

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
	signMqsChallengeMenuTagValuePairs[0].value = accountIndexLineBuffer;

	// Check if time is provided
	if(strlen(timeLineBuffer)) {

		// Set sign MQS challenge menu tag value pairs
		signMqsChallengeMenuTagValuePairs[1].item = "Time And Date";
		signMqsChallengeMenuTagValuePairs[1].value = timeLineBuffer;
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
	signMqsChallengeMenuInfoLongPress.icon = &CURRENCY_ICON_DETAILS;
	signMqsChallengeMenuInfoLongPress.text = signChallengeLineBuffer;
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

// Sign login challenge menu continue callback
void signLoginChallengeMenuContinueCallback(void) {

	// Set sign login challenge menu tag value pairs
	signLoginChallengeMenuTagValuePairs[0].item = "Account Index";
	signLoginChallengeMenuTagValuePairs[0].value = accountIndexLineBuffer;

	// Set sign login challenge menu tag value pairs
	signLoginChallengeMenuTagValuePairs[1].item = "Identifier";
	signLoginChallengeMenuTagValuePairs[1].value = (char *)publicKeyLineBuffer;

	// Set sign login challenge menu tag value pairs
	signLoginChallengeMenuTagValuePairs[2].item = "Time And Date";
	signLoginChallengeMenuTagValuePairs[2].value = timeLineBuffer;

	// Set sign login challenge menu tag value list
	signLoginChallengeMenuTagValueList.nbPairs = ARRAYLEN(signLoginChallengeMenuTagValuePairs);
	signLoginChallengeMenuTagValueList.pairs = signLoginChallengeMenuTagValuePairs;
	signLoginChallengeMenuTagValueList.wrapping = true;

	// Set sign login challenge menu info long press
	signLoginChallengeMenuInfoLongPress.icon = &CURRENCY_ICON_DETAILS;
	signLoginChallengeMenuInfoLongPress.text = "Login with\nwallet?";
	signLoginChallengeMenuInfoLongPress.longPressText = "Hold to login";

	// Show static review
	nbgl_useCaseStaticReview(&signLoginChallengeMenuTagValueList, &signLoginChallengeMenuInfoLongPress, "Deny", signLoginChallengeMenuChoiceCallback);
}

// Sign login challenge menu choice callback
void signLoginChallengeMenuChoiceCallback(const bool confirm) {

	// Check if confirmed
	if(confirm) {

		// Check if processing user interaction was successful
		if(processUserInteraction(GET_LOGIN_CHALLENGE_SIGNATURE_INSTRUCTION, true, true)) {

			// Show status
			nbgl_useCaseStatus("LOGGED IN\nWITH WALLET", true, showMainMenu);
		}

		// Otherwise
		else {

			// Show status
			nbgl_useCaseStatus("Logging in with\nwallet failed", false, showMainMenu);
		}
	}

	// Otherwise
	else {

		// Sign login challenge menu confirm reject callback
		signLoginChallengeMenuConfirmRejectCallback();
	}
}

// Sign login challenge menu confirm reject callback
void signLoginChallengeMenuConfirmRejectCallback(void) {

	// Show confirm
	nbgl_useCaseConfirm("Deny logging in\nwith wallet?", NULL, "Yes, deny", "Go back", signLoginChallengeMenuRejectCallback);
}

// Sign login challenge menu reject callback
void signLoginChallengeMenuRejectCallback(void) {

	// Process user interaction
	processUserInteraction(GET_LOGIN_CHALLENGE_SIGNATURE_INSTRUCTION, false, false);

	// Show status
	nbgl_useCaseStatus("Logging in with\nwallet denied", false, showMainMenu);
}

// Sign approve transaction menu continue callback
void approveTransactionMenuContinueCallback(void) {

	// Set approve transaction menu tag value pairs
	approveTransactionMenuTagValuePairs[0].item = "Account Index";
	approveTransactionMenuTagValuePairs[0].value = accountIndexLineBuffer;

	approveTransactionMenuTagValuePairs[1].item = "Amount";
	approveTransactionMenuTagValuePairs[1].value = amountLineBuffer;

	approveTransactionMenuTagValuePairs[2].item = "Fee";
	approveTransactionMenuTagValuePairs[2].value = feeLineBuffer;

	approveTransactionMenuTagValuePairs[3].item = "Kernel Features";
	approveTransactionMenuTagValuePairs[3].value = kernelFeaturesLineBuffer;

	// Initialize index
	size_t index = 4;

	// Check if kernel features details are provided
	if(strlen(kernelFeaturesDetailsTitleLineBuffer)) {

		// Set approve transaction menu tag value pairs
		approveTransactionMenuTagValuePairs[index].item = kernelFeaturesDetailsTitleLineBuffer;
		approveTransactionMenuTagValuePairs[index++].value = kernelFeaturesDetailsTextLineBuffer;
	}

	// Check if address is provided
	if(strlen(addressLineBuffer)) {

		// Set approve transaction menu tag value pairs
		approveTransactionMenuTagValuePairs[index].item = "Proof Address";
		approveTransactionMenuTagValuePairs[index++].value = addressLineBuffer;
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
	approveTransactionMenuInfoLongPress.icon = &CURRENCY_ICON_DETAILS;
	approveTransactionMenuInfoLongPress.text = approveTransactionLineBuffer;
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
