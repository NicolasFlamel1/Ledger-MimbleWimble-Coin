// Header files
#include <string.h>
#include <ux.h>
#include "common.h"
#include "currency_information.h"
#include "menus.h"
#include "process_requests.h"


// Global variables

// Time or processing message line buffer
char timeOrProcessingMessageLineBuffer[TIME_OR_PROCESSING_MESSAGE_LINE_BUFFER_SIZE];

// Public key or address line buffer
char publicKeyOrAddressLineBuffer[PUBLIC_KEY_OR_ADDRESS_LINE_BUFFER_SIZE];

// Verify address line buffer
char verifyAddressLineBuffer[VERIFY_ADDRESS_LINE_BUFFER_SIZE];

// Address type line buffer
char addressTypeLineBuffer[ADDRESS_TYPE_LINE_BUFFER_SIZE];

// Amount line buffer
char amountLineBuffer[AMOUNT_LINE_BUFFER_SIZE];

// Fee line buffer
char feeLineBuffer[FEE_LINE_BUFFER_SIZE];

// Kernel features line buffer
char kernelFeaturesLineBuffer[KERNEL_FEATURES_LINE_BUFFER_SIZE];

// Kernel features details title line buffer
char kernelFeaturesDetailsTitleLineBuffer[KERNEL_FEATURES_DETAILS_TITLE_LINE_BUFFER_SIZE];

// Kernel features details text or account index line buffer
char kernelFeaturesDetailsTextOrAccountIndexLineBuffer[KERNEL_FEATURES_DETAILS_TEXT_OR_ACCOUNT_INDEX_LINE_BUFFER_SIZE];


// Constants

// Check if target is not the Nano S
#ifndef TARGET_NANOS

	// Main menu currency name ready screen
	static UX_STEP_NOCB(mainMenuCurrencyNameReadyScreen, pnn, {
			
		// Picture
		&currencyInformation.iconDetails,
		
		// First line
		currencyInformation.name,
		
		// Second line
		"is ready"
	});
#endif

// Main menu ready screen
static UX_STEP_NOCB(mainMenuReadyScreen, pnn, {

	// Picture
	&currencyInformation.iconDetails,
	
	// First line
	"Application",
	
	// Second line
	"is ready"
});

// Main menu currency screen
static UX_STEP_NOCB(mainMenuCurrencyScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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
	.text = currencyInformation.name
});

// Check if target is not the Nano S
#ifndef TARGET_NANOS

	// Main menu version single line screen
	static UX_STEP_NOCB(mainMenuVersionSingleLineScreen, bn, {
			
		// Bold first line
		"Version",
		
		// Second line
		currencyInformation.version
	});
#endif

// Main menu version multiline screen
static UX_STEP_NOCB(mainMenuVersionMultilineScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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
	.text = currencyInformation.version
});

// Main menu exit screen
static UX_STEP_VALID(mainMenuExitScreen, pb, exitApplication(), {

	// Picture
	&C_icon_back,
	
	// Bold line
	"Back to dashboard"
});

// Check if target is the Nano S
#ifdef TARGET_NANOS

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

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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
	.text = publicKeyOrAddressLineBuffer
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
	verifyAddressLineBuffer,
	
	// Second line
	"address"
});

// Verify address menu address screen
static UX_STEP_NOCB(verifyAddressMenuAddressScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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
	.text = publicKeyOrAddressLineBuffer
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

// Sign MQS timestamp menu time and date screen
static UX_STEP_NOCB(signMqsTimestampMenuTimeAndDateScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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
	.text = timeOrProcessingMessageLineBuffer
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
	
	// Sign MQS timestamp menu time and date screen
	&signMqsTimestampMenuTimeAndDateScreen,
	
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

// Sign Tor certificate menu expiration screen
static UX_STEP_NOCB(signTorCertificateMenuExpirationScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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
	.text = timeOrProcessingMessageLineBuffer
});

// Sign Tor certificate menu address screen
static UX_STEP_NOCB(signTorCertificateMenuAddressScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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
	.text = publicKeyOrAddressLineBuffer
});

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
	
	// Sign Tor certificate menu expiration screen
	&signTorCertificateMenuExpirationScreen,
	
	// Sign Tor certificate menu address screen
	&signTorCertificateMenuAddressScreen,

	// Sign Tor certificate menu approve screen
	&signTorCertificateMenuApproveScreen,
	
	// Sign Tor certificate menu deny screen
	&signTorCertificateMenuDenyScreen
);

// Finalize transaction menu notify screen
static UX_STEP_NOCB(finalizeTransactionMenuNotifyScreen, pnn, {

	// Picture
	&C_icon_view,

	// First line
	"Finalize sending",
	
	// Second line
	"transaction?"
});

// Check if target is not the Nano S
#ifndef TARGET_NANOS

	// Finalize transaction menu amount single line screen
	static UX_STEP_NOCB(finalizeTransactionMenuAmountSingleLineScreen, bn, {
			
		// Bold first line
		"Amount",
		
		// Second line
		amountLineBuffer
	});
#endif

// Finalize transaction menu amount multiline screen
static UX_STEP_NOCB(finalizeTransactionMenuAmountMultilineScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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

// Check if target is not the Nano S
#ifndef TARGET_NANOS

	// Finalize transaction menu fee single line screen
	static UX_STEP_NOCB(finalizeTransactionMenuFeeSingleLineScreen, bn, {
			
		// Bold first line
		"Fee",
		
		// Second line
		feeLineBuffer
	});
#endif

// Finalize transaction menu fee multiline screen
static UX_STEP_NOCB(finalizeTransactionMenuFeeMultilineScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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

// Finalize transaction menu kernel features screen
static UX_STEP_NOCB(finalizeTransactionMenuKernelFeaturesScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
		// Layout
		nb_paging,
		
		{

			// Title
			.title = "Kernel Features",
			
			// Text
			.text = kernelFeaturesLineBuffer
		}
	
	// Otherwise
	#else
	
		// Layout
		bn,
		
		{
		
			// Bold first line
			"Kernel Features",
			
			// Second line
			kernelFeaturesLineBuffer
		}
	#endif
);

// Check if target is not the Nano S
#ifndef TARGET_NANOS

	// Finalize transaction menu kernel features details single line screen
	static UX_STEP_NOCB(finalizeTransactionMenuKernelFeaturesDetailsSingleLineScreen, bn, {
			
		// Bold first line
		kernelFeaturesDetailsTitleLineBuffer,
		
		// Second line
		kernelFeaturesDetailsTextOrAccountIndexLineBuffer
	});
#endif

// Finalize transaction menu kernel features details multiline screen
static UX_STEP_NOCB(finalizeTransactionMenuKernelFeaturesDetailsMultilineScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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

// Finalize transaction menu proof address screen
static UX_STEP_NOCB(finalizeTransactionMenuProofAddressScreen,

	// Check if target is the Nano S
	#ifdef TARGET_NANOS
	
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
	.text = publicKeyOrAddressLineBuffer
});

// Finalize transaction menu no payment proof screen
static UX_STEP_NOCB(finalizeTransactionMenuNoPaymentProofScreen, pnn, {

	// Picture
	&C_icon_warning,
	
	// First line
	"No payment",
	
	// Second line
	"proof"
});

// Finalize transaction menu approve screen
static UX_STEP_CB(finalizeTransactionMenuApproveScreen, pb, processUserInteraction(FINISH_TRANSACTION_INSTRUCTION, true, true), {

	// Picture
	&C_icon_approve,
	
	// Bold line
	"Approve"
});

// Finalize transaction menu deny screen
static UX_STEP_CB(finalizeTransactionMenuDenyScreen, pb, processUserInteraction(FINISH_TRANSACTION_INSTRUCTION, false, false), {

	// Picture
	&C_icon_reject,
	
	// Bold line
	"Deny"
});

// Finalize transaction menu
static const ux_flow_step_t *finalizeTransactionMenu[9];

// Processing menu message screen
static UX_STEP_NOCB(processingMenuMessageScreen, pb, {

	// Picture
	&C_icon_processing,
	
	// Bold line
	timeOrProcessingMessageLineBuffer
});

// Processing menu
static UX_FLOW(processingMenu,

	// Processing menu message screen
	&processingMenuMessageScreen
);


// Supporting function implementation

// Clear menu buffers
void clearMenuBuffers(void) {
	
	// Clear the time or processing message line buffer
	explicit_bzero(timeOrProcessingMessageLineBuffer, sizeof(timeOrProcessingMessageLineBuffer));
	
	// Clear the public key or address line buffer
	explicit_bzero(publicKeyOrAddressLineBuffer, sizeof(publicKeyOrAddressLineBuffer));
	
	// Clear the verify address line buffer
	explicit_bzero(verifyAddressLineBuffer, sizeof(verifyAddressLineBuffer));
	
	// Clear the address type line buffer
	explicit_bzero(addressTypeLineBuffer, sizeof(addressTypeLineBuffer));
	
	// Clear the amount line buffer
	explicit_bzero(amountLineBuffer, sizeof(amountLineBuffer));
	
	// Clear the fee line buffer
	explicit_bzero(feeLineBuffer, sizeof(feeLineBuffer));
	
	// Clear the kernel features line buffer
	explicit_bzero(kernelFeaturesLineBuffer, sizeof(kernelFeaturesLineBuffer));
	
	// Clear the kernel features details title line buffer
	explicit_bzero(kernelFeaturesDetailsTitleLineBuffer, sizeof(kernelFeaturesDetailsTitleLineBuffer));
	
	// Clear the kernel features details text or account index line buffer
	explicit_bzero(kernelFeaturesDetailsTextOrAccountIndexLineBuffer, sizeof(kernelFeaturesDetailsTextOrAccountIndexLineBuffer));
}

// Show main menu
void showMainMenu() {

	// Check if UX stack doesn't exist
	if(!G_ux.stack_count) {
	
		// Create UX stack
		ux_stack_push();
	}
	
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
		
			// Check if target is not the Nano S
			#ifndef TARGET_NANOS
		
				{
			
					// Initialize index
					size_t index = 0;
					
					// Check if target is not the Nano S
					#ifndef TARGET_NANOS
					
						// Check if currency information name can fit on one line
						if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, currencyInformation.name, strlen(currencyInformation.name), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
						
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
					
					// Check if target is not the Nano S
					#ifndef TARGET_NANOS
					
						// Check if currency information version can fit on one line
						if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, currencyInformation.version, strlen(currencyInformation.version), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
						
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
					
					// End finalize transaction menu
					mainMenu[index++] = FLOW_LOOP;
					
					// End finalize transaction menu
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
		
		// Finalize transaction menu
		case FINALIZE_TRANSACTION_MENU:
		
			{
			
				// Initialize index
				size_t index = 0;
			
				// Set finalize transaction menu to use notify screen
				finalizeTransactionMenu[index++] = &finalizeTransactionMenuNotifyScreen;
				
				// Check if target is not the Nano S
				#ifndef TARGET_NANOS
				
					// Check if amount can fit on one line
					if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, amountLineBuffer, strlen(amountLineBuffer), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
					
						// Set finalize transaction menu to use amount single line screen
						finalizeTransactionMenu[index++] = &finalizeTransactionMenuAmountSingleLineScreen;
					}
					else
				#endif
				{
					
					// Set finalize transaction menu to use amount multiline screen
					finalizeTransactionMenu[index++] = &finalizeTransactionMenuAmountMultilineScreen;
				}
				
				// Check if target is not the Nano S
				#ifndef TARGET_NANOS
				
					// Check if fee can fit on one line
					if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, feeLineBuffer, strlen(feeLineBuffer), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
					
						// Set finalize transaction menu to use fee single line screen
						finalizeTransactionMenu[index++] = &finalizeTransactionMenuFeeSingleLineScreen;
					}
					else
				#endif
				{
					
					// Set finalize transaction menu to use fee multiline screen
					finalizeTransactionMenu[index++] = &finalizeTransactionMenuFeeMultilineScreen;
				}
				
				// Set finalize transaction menu to use kernel features screen
				finalizeTransactionMenu[index++] = &finalizeTransactionMenuKernelFeaturesScreen;
				
				// Check if kernel features details title line buffer isn't empty
				if(strlen(kernelFeaturesDetailsTitleLineBuffer)) {
				
					// Check if target is not the Nano S
					#ifndef TARGET_NANOS
					
						// Check if kernel features details text can fit on one line
						if(bagl_compute_line_width(BAGL_FONT_OPEN_SANS_REGULAR_11px, 0, kernelFeaturesDetailsTextOrAccountIndexLineBuffer, strlen(kernelFeaturesDetailsTextOrAccountIndexLineBuffer), BAGL_ENCODING_LATIN1) <= PIXEL_PER_LINE) {
						
							// Set finalize transaction menu to use kernel features details single line screen
							finalizeTransactionMenu[index++] = &finalizeTransactionMenuKernelFeaturesDetailsSingleLineScreen;
						}
						else
					#endif
					{
				
						// Set finalize transaction menu to use kernel features details multiline screen
						finalizeTransactionMenu[index++] = &finalizeTransactionMenuKernelFeaturesDetailsMultilineScreen;
					}
				}
				
				// Check if public key or address line buffer isn't empty
				if(strlen(publicKeyOrAddressLineBuffer)) {
				
					// Set finalize transaction menu to use proof address screen
					finalizeTransactionMenu[index++] = &finalizeTransactionMenuProofAddressScreen;
				}
				
				// Otherwise
				else {
				
					// Set finalize transaction menu to use no payment proof screen
					finalizeTransactionMenu[index++] = &finalizeTransactionMenuNoPaymentProofScreen;
				}
				
				// Set finalize transaction menu to use approve screen
				finalizeTransactionMenu[index++] = &finalizeTransactionMenuApproveScreen;
				
				// Set finalize transaction menu to use deny screen
				finalizeTransactionMenu[index++] = &finalizeTransactionMenuDenyScreen;
				
				// End finalize transaction menu
				finalizeTransactionMenu[index++] = FLOW_END_STEP;
				
				// Set menu steps to finalize transaction menu
				menuSteps = finalizeTransactionMenu;
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
