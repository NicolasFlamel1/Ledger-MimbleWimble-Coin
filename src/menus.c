// Header files
#include <string.h>
#include <ux.h>
#include "common.h"
#include "currency_information.h"
#include "menus.h"
#include "process_requests.h"


// Global variables

// Time line buffer
char timeLineBuffer[TIME_LINE_BUFFER_SIZE];

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


// Constants

// About menu version screen
static UX_STEP_NOCB(aboutMenuVersionScreen, 

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bn,
		
		{
		
			// Bold first line
			"Version",
			
			// Second line
			currencyInformation.version
		}
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
		
		{

			// Title
			.title = "Version",
			
			// Text
			.text = currencyInformation.version
		}
	#endif
);

// About menu currency screen
static UX_STEP_NOCB(aboutMenuCurrencyScreen, 

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bn,
		
		{
		
			// Bold first line
			"Currency",
			
			// Second line
			currencyInformation.name
		}
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
		
		{

			// Title
			.title = "Currency",
			
			// Text
			.text = currencyInformation.name
		}
	#endif
);

// About menu copyright screen
static UX_STEP_NOCB(aboutMenuCopyrightScreen, 

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bnnn_paging,
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
	#endif
{

	// Title
	.title = "Copyright",
	
	// Text
	.text = "(c) 2021-2022 Nicolas Flamel. All rights reserved."
});

// About menu back screen
static UX_STEP_CB(aboutMenuBackScreen, pb, showMainMenu(ABOUT_SCREEN), {

	// Picture
	&C_icon_back,
	
	// Bold line
	"Back"
});

// About menu
static UX_FLOW(aboutMenu,

	// About menu version screen
	&aboutMenuVersionScreen,
	
	// About menu currency screen
	&aboutMenuCurrencyScreen,
	
	// About menu copyright screen
	&aboutMenuCopyrightScreen,
	
	// About menu back screen
	&aboutMenuBackScreen,
	
	// Loop
	FLOW_LOOP
);

// Main menu ready screen
static UX_STEP_NOCB(mainMenuReadyScreen, pnn, {

	// Picture
	&currencyInformation.iconDetails,
	
	// First line
	"Application",
	
	// Second line
	"is ready"
});

// Main menu about screen
static UX_STEP_CB(mainMenuAboutScreen, pb, ux_flow_init(0, aboutMenu, NULL), {

	// Picture
	&C_icon_about,
	
	// Bold line
	"About"
});

// Main menu exit screen
static UX_STEP_VALID(mainMenuExitScreen, pb, exitApplication(), {

	// Picture
	&C_icon_back,
	
	// Bold line
	"Back to dashboard"
});

// Main menu
static UX_FLOW(mainMenu,

	// Main menu ready screen
	&mainMenuReadyScreen,
	
	// Main menu about screen
	&mainMenuAboutScreen,
	
	// Main menu exit screen
	&mainMenuExitScreen,
	
	// Loop
	FLOW_LOOP
);

// Export root public key menu notify screen
static UX_STEP_NOCB(exportRootPublicKeyMenuNotifyScreen, pnn, {

	// Picture
	&C_icon_view,

	// First line
	"Export root",
	
	// Second line
	"public key?"
});

// Export root public key menu approve screen
static UX_STEP_CB(exportRootPublicKeyMenuApproveScreen, pb, processUserInteraction(GET_ROOT_PUBLIC_KEY_INSTRUCTION, true), {

	// Picture
	&C_icon_approve,
	
	// Bold line
	"Approve"
});

// Export root public key menu deny screen
static UX_STEP_CB(exportRootPublicKeyMenuDenyScreen, pb, processUserInteraction(GET_ROOT_PUBLIC_KEY_INSTRUCTION, false), {

	// Picture
	&C_icon_reject,
	
	// Bold line
	"Deny"
});

// Export root public key menu
static UX_FLOW(exportRootPublicKeyMenu,

	// Export root public key menu notify screen
	&exportRootPublicKeyMenuNotifyScreen,

	// Export root public key menu approve screen
	&exportRootPublicKeyMenuApproveScreen,
	
	// Export root public key menu deny screen
	&exportRootPublicKeyMenuDenyScreen,
	
	// Loop
	FLOW_LOOP
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

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bnnn_paging,
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
	#endif
{

	// Title
	.title = "Root Public Key",
	
	// Text
	.text = publicKeyOrAddressLineBuffer
});

// Verify root public key menu valid screen
static UX_STEP_CB(verifyRootPublicKeyMenuValidScreen, pb, processUserInteraction(VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION, true), {

	// Picture
	&C_icon_approve,
	
	// Bold line
	"Valid"
});

// Verify root public key menu invalid screen
static UX_STEP_CB(verifyRootPublicKeyMenuInvalidScreen, pb, processUserInteraction(VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION, false), {

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
	&verifyRootPublicKeyMenuInvalidScreen,
	
	// Loop
	FLOW_LOOP
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

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bnnn_paging,
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
	#endif
{

	// Title
	.title = addressTypeLineBuffer,
	
	// Text
	.text = publicKeyOrAddressLineBuffer
});

// Verify address menu valid screen
static UX_STEP_CB(verifyAddressMenuValidScreen, pb, processUserInteraction(VERIFY_ADDRESS_INSTRUCTION, true), {

	// Picture
	&C_icon_approve,
	
	// Bold line
	"Valid"
});

// Verify address menu invalid screen
static UX_STEP_CB(verifyAddressMenuInvalidScreen, pb, processUserInteraction(VERIFY_ADDRESS_INSTRUCTION, false), {

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
	&verifyAddressMenuInvalidScreen,
	
	// Loop
	FLOW_LOOP
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

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bnnn_paging,
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
	#endif
{

	// Title
	.title = "Time And Date",
	
	// Text
	.text = timeLineBuffer
});

// Sign MQS timestamp menu approve screen
static UX_STEP_CB(signMqsTimestampMenuApproveScreen, pb, processUserInteraction(GET_MQS_TIMESTAMP_SIGNATURE_INSTRUCTION, true), {

	// Picture
	&C_icon_approve,
	
	// Bold line
	"Approve"
});

// Sign MQS timestamp menu deny screen
static UX_STEP_CB(signMqsTimestampMenuDenyScreen, pb, processUserInteraction(GET_MQS_TIMESTAMP_SIGNATURE_INSTRUCTION, false), {

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
	&signMqsTimestampMenuDenyScreen,
	
	// Loop
	FLOW_LOOP
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

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bnnn_paging,
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
	#endif
{

	// Title
	.title = "Expires",
	
	// Text
	.text = timeLineBuffer
});

// Sign Tor certificate menu address screen
static UX_STEP_NOCB(signTorCertificateMenuAddressScreen,

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bnnn_paging,
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
	#endif
{

	// Title
	.title = addressTypeLineBuffer,
	
	// Text
	.text = publicKeyOrAddressLineBuffer
});

// Sign Tor certificate menu approve screen
static UX_STEP_CB(signTorCertificateMenuApproveScreen, pb, processUserInteraction(GET_TOR_CERTIFICATE_SIGNATURE_INSTRUCTION, true), {

	// Picture
	&C_icon_approve,
	
	// Bold line
	"Approve"
});

// Sign Tor certificate menu deny screen
static UX_STEP_CB(signTorCertificateMenuDenyScreen, pb, processUserInteraction(GET_TOR_CERTIFICATE_SIGNATURE_INSTRUCTION, false), {

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
	&signTorCertificateMenuDenyScreen,
	
	// Loop
	FLOW_LOOP
);

// Finalize transaction menu notify screen
static UX_STEP_NOCB(finalizeTransactionMenuNotifyScreen, pnn, {

	// Picture
	&C_icon_view,

	// First line
	"Finalize",
	
	// Second line
	"transaction?"
});

// Finalize transaction menu amount screen
static UX_STEP_NOCB(finalizeTransactionMenuAmountScreen,

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bnnn_paging,
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
	#endif
{

	// Title
	.title = "Amount",
	
	// Text
	.text = amountLineBuffer
});

// Finalize transaction menu fee screen
static UX_STEP_NOCB(finalizeTransactionMenuFeeScreen,

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bnnn_paging,
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
	#endif
{

	// Title
	.title = "Fee",
	
	// Text
	.text = feeLineBuffer
});

// Finalize transaction menu proof address screen
static UX_STEP_NOCB(finalizeTransactionMenuProofAddressScreen,

	// Check if target is the Nano X
	#ifdef TARGET_NANOX
	
		// Layout
		bnnn_paging,
	
	// Otherwise
	#else
	
		// Layout
		nb_paging,
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
static UX_STEP_CB(finalizeTransactionMenuApproveScreen, pb, processUserInteraction(FINISH_TRANSACTION_INSTRUCTION, true), {

	// Picture
	&C_icon_approve,
	
	// Bold line
	"Approve"
});

// Finalize transaction menu deny screen
static UX_STEP_CB(finalizeTransactionMenuDenyScreen, pb, processUserInteraction(FINISH_TRANSACTION_INSTRUCTION, false), {

	// Picture
	&C_icon_reject,
	
	// Bold line
	"Deny"
});

// Finalize transaction receiver menu
static UX_FLOW(finalizeTransactionReceiverMenu,

	// Finalize transaction menu notify screen
	&finalizeTransactionMenuNotifyScreen,
	
	// Finalize transaction menu amount screen
	&finalizeTransactionMenuAmountScreen,
	
	// Finalize transaction menu fee screen
	&finalizeTransactionMenuFeeScreen,
	
	// Finalize transaction menu proof address screen
	&finalizeTransactionMenuProofAddressScreen,
	
	// Finalize transaction menu approve screen
	&finalizeTransactionMenuApproveScreen,
	
	// Finalize transaction menu deny screen
	&finalizeTransactionMenuDenyScreen,
	
	// Loop
	FLOW_LOOP
);

// Finalize transaction no payment proof menu
static UX_FLOW(finalizeTransactionNoPaymentProofMenu,

	// Finalize transaction menu notify screen
	&finalizeTransactionMenuNotifyScreen,
	
	// Finalize transaction menu amount screen
	&finalizeTransactionMenuAmountScreen,
	
	// Finalize transaction menu fee screen
	&finalizeTransactionMenuFeeScreen,
	
	// Finalize transaction menu no payment proof screen
	&finalizeTransactionMenuNoPaymentProofScreen,
	
	// Finalize transaction menu approve screen
	&finalizeTransactionMenuApproveScreen,
	
	// Finalize transaction menu deny screen
	&finalizeTransactionMenuDenyScreen,
	
	// Loop
	FLOW_LOOP
);

// Processing menu screen
static UX_STEP_NOCB(processingMenuScreen, pb, {

	// Picture
	&C_icon_processing,
	
	// Bold line
	"Processing"
});

// Processing menu
static UX_FLOW(processingMenu,

	// Processing menu screen
	&processingMenuScreen,
	
	// End
	FLOW_END_STEP
);


// Supporting function implementation

// Clear menu buffers
void clearMenuBuffers(void) {
	
	// Clear the time line buffer
	explicit_bzero(timeLineBuffer, sizeof(timeLineBuffer));
	
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
}

// Show main menu
void showMainMenu(enum MainMenuScreen mainMenuScreen) {

	// Check if UX stack doesn't exist
	if(!G_ux.stack_count) {
	
		// Create UX stack
		ux_stack_push();
	}
	
	// Show main menu
	ux_flow_init(0, mainMenu, NULL);
	
	// Go though all main menu screens until specified screen
	for(enum MainMenuScreen i = READY_SCREEN; i < mainMenuScreen; ++i) {
	
		// Go to next screen
		ux_flow_next();
	}
}

// Show menu
void showMenu(enum Menu menu) {

	// Initialize menu steps
	const ux_flow_step_t *const *menuSteps;
	
	// Check menu
	switch(menu) {
	
		// Main menu
		case MAIN_MENU:
		
			// Set menu steps to main menu
			menuSteps = mainMenu;
			
			// Break
			break;
		
		// About menu
		case ABOUT_MENU:
		
			// Set menu steps to about menu
			menuSteps = aboutMenu;
			
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
		
			// Check if public key or address line buffer isn't empty
			if(strlen(publicKeyOrAddressLineBuffer)) {
			
				// Set menu steps to finalize transaction receiver menu
				menuSteps = finalizeTransactionReceiverMenu;
			}
			
			// Otherwise
			else {
			
				// Set menu steps to finalize transaction no payment proof menu
				menuSteps = finalizeTransactionNoPaymentProofMenu;
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
