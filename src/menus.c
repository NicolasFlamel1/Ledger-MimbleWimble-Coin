// Header files
#include <os_io_seproxyhal.h>
#include <string.h>
#include <ux.h>
#include "common.h"
#include "currency_information.h"
#include "menus.h"
#include "process_requests.h"


// Definitions

// Progress bar padding
#define PROGRESS_BAR_PADDING 6

// Check if device has low height
#if BAGL_HEIGHT < 64

	// Progress bar height
	#define PROGRESS_BAR_HEIGHT 10

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

// Currency icon buffer
bagl_icon_details_t currencyIconBuffer;


// Constants

// Check if device doesn't have low height
#if BAGL_HEIGHT >= 64

	// Main menu currency name ready screen
	static UX_STEP_NOCB(mainMenuCurrencyNameReadyScreen, pnn, {
			
		// Picture
		&currencyIconBuffer,
		
		// First line
		(char *)timeProcessingMessageProgressBarMessageOrCurrencyNameLineBuffer,
		
		// Second line
		"is ready"
	});
#endif

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

// Check if device has low height
#if BAGL_HEIGHT < 64

	// Main menu
	static UX_FLOW(mainMenu,

		// Main menu ready screen
		&mainMenuReadyScreen,
		
		// Main menu currency screen
		&mainMenuCurrencyScreen,
		
		// Main menu version multiline screen
		&mainMenuVersionMultilineScreen,
		
		// Main menu exit screen
		&mainMenuExitScreen,
		
		// Loop
		FLOW_LOOP
	);

// Otherwise
#else

	// Main menu
	static const ux_flow_step_t *mainMenu[6];
#endif

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


// Function prototypes

// Progress bar button
static unsigned int progressBar_button(unsigned int buttonMask, unsigned int buttonMaskCounter);


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

	// Check if UX stack doesn't exist
	if(!G_ux.stack_count) {
	
		// Create UX stack
		ux_stack_push();
	}
	
	// Clear menu buffers
	clearMenuBuffers();
	
	// Show main menu
	showMenu(MAIN_MENU);
}

// Show menu
void showMenu(enum Menu menu) {

	// Initialize menu steps
	const ux_flow_step_t *const *menuSteps;
	
	// Check menu
	switch(menu) {
	
		// Main menu
		case MAIN_MENU:
		
			// Check if device doesn't have low height
			#if BAGL_HEIGHT >= 64
		
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
			#endif
			
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
}

// Show progress bar
void showProgressBar(uint8_t percent) {
	
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

// Progress bar button
unsigned int progressBar_button(__attribute__((unused)) unsigned int buttonMask, __attribute__((unused)) unsigned int buttonMaskCounter) {

	// Return zero
	return 0;
}
