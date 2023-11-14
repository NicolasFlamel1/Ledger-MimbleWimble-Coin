// Header files
#include <os_io_seproxyhal.h>
#include <string.h>
#include <ux.h>
#include "common.h"
#include "commands/continue_decrypting_slate.h"
#include "commands/continue_encrypting_slate.h"
#include "commands/continue_transaction_apply_offset.h"
#include "commands/continue_transaction_get_public_key.h"
#include "commands/continue_transaction_get_public_nonce.h"
#include "commands/continue_transaction_get_message_signature.h"
#include "commands/continue_transaction_include_input.h"
#include "commands/continue_transaction_include_output.h"
#include "commands/finish_decrypting_slate.h"
#include "commands/finish_encrypting_slate.h"
#include "commands/finish_transaction.h"
#include "commands/get_address.h"
#include "commands/get_commitment.h"
#include "commands/get_bulletproof_components.h"
#include "commands/get_login_challenge_signature.h"
#include "commands/get_mqs_challenge_signature.h"
#include "commands/get_root_public_key.h"
#include "commands/get_seed_cookie.h"
#include "menus.h"
#include "process_requests.h"
#include "commands/start_decrypting_slate.h"
#include "commands/start_encrypting_slate.h"
#include "commands/start_transaction.h"
#include "state.h"
#include "commands/verify_address.h"
#include "commands/verify_root_public_key.h"


// Supporting function implementation

// Process request
void processRequest(const unsigned short requestLength, volatile unsigned short *responseLength, volatile unsigned char *responseFlags) {

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Check if request is malformed
			if(requestLength < APDU_OFF_DATA || requestLength - APDU_OFF_DATA != G_io_apdu_buffer[APDU_OFF_LC]) {

				// Throw malformed request error
				THROW(MALFORMED_REQUEST_ERROR);
			}

			// Get request's class
			const uint8_t class = G_io_apdu_buffer[APDU_OFF_CLA];

			// Check if request's class is unknown
			if(class != REQUEST_CLASS) {

				// Throw unknown class error
				THROW(UNKNOWN_CLASS_ERROR);
			}

			// Get request's instruction
			const enum Instruction instruction = G_io_apdu_buffer[APDU_OFF_INS];

			// Reset unrelated state
			resetUnrelatedState(instruction);

			// Check request's instruction
			switch(instruction) {

				// Get root public key instruction
				case GET_ROOT_PUBLIC_KEY_INSTRUCTION:

					// Process get root public key request
					processGetRootPublicKeyRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Get address instruction
				case GET_ADDRESS_INSTRUCTION:

					// Process get address request
					processGetAddressRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Get seed cookie instruction
				case GET_SEED_COOKIE_INSTRUCTION:

					// Process get seed cookie request
					processGetSeedCookieRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Get commitment instruction
				case GET_COMMITMENT_INSTRUCTION:

					// Process get commitment request
					processGetCommitmentRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Get bulletproof components instruction
				case GET_BULLETPROOF_COMPONENTS_INSTRUCTION:

					// Process get bulletproof components request
					processGetBulletproofComponentsRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Verify root public key instruction
				case VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION:

					// Process verify root public key request
					processVerifyRootPublicKeyRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Verify address instruction
				case VERIFY_ADDRESS_INSTRUCTION:

					// Process verify address request
					processVerifyAddressRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Start encrypting slate instruction
				case START_ENCRYPTING_SLATE_INSTRUCTION:

					// Process start encrypting slate request
					processStartEncryptingSlateRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Continue encrypting slate instruction
				case CONTINUE_ENCRYPTING_SLATE_INSTRUCTION:

					// Process continue encrypting slate request
					processContinueEncryptingSlateRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Finish encrypting slate instruction
				case FINISH_ENCRYPTING_SLATE_INSTRUCTION:

					// Process finish encrypting slate request
					processFinishEncryptingSlateRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Start decrypting slate instruction
				case START_DECRYPTING_SLATE_INSTRUCTION:

					// Process start decrypting slate request
					processStartDecryptingSlateRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Continue decrypting slate instruction
				case CONTINUE_DECRYPTING_SLATE_INSTRUCTION:

					// Process continue decrypting slate request
					processContinueDecryptingSlateRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Finish decrypting slate instruction
				case FINISH_DECRYPTING_SLATE_INSTRUCTION:

					// Process finish decrypting slate request
					processFinishDecryptingSlateRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Start transaction instruction
				case START_TRANSACTION_INSTRUCTION:

					// Process start transaction request
					processStartTransactionRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Continue transaction include output instruction
				case CONTINUE_TRANSACTION_INCLUDE_OUTPUT_INSTRUCTION:

					// Process continue transaction include output request
					processContinueTransactionIncludeOutputRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Continue transaction include input instruction
				case CONTINUE_TRANSACTION_INCLUDE_INPUT_INSTRUCTION:

					// Process continue transaction include input request
					processContinueTransactionIncludeInputRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Continue transaction apply offset instruction
				case CONTINUE_TRANSACTION_APPLY_OFFSET_INSTRUCTION:

					// Process continue transaction apply offset request
					processContinueTransactionApplyOffsetRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Continue transaction get public key instruction
				case CONTINUE_TRANSACTION_GET_PUBLIC_KEY_INSTRUCTION:

					// Process continue transaction get public key request
					processContinueTransactionGetPublicKeyRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Continue transaction get public nonce instruction
				case CONTINUE_TRANSACTION_GET_PUBLIC_NONCE_INSTRUCTION:

					// Process continue transaction get public nonce request
					processContinueTransactionGetPublicNonceRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Continue transaction get message signature instruction
				case CONTINUE_TRANSACTION_GET_MESSAGE_SIGNATURE_INSTRUCTION:

					// Process continue transaction get message signature request
					processContinueTransactionGetMessageSignatureRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// break
					break;

				// Finish transaction instruction
				case FINISH_TRANSACTION_INSTRUCTION:

					// Process finish transaction request
					processFinishTransactionRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// Break
					break;

				// Get MQS challenge signature instruction
				case GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION:

					// Process get MQS challenge signature request
					processGetMqsChallengeSignatureRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// break
					break;

				// Get login challenge signature instruction
				case GET_LOGIN_CHALLENGE_SIGNATURE_INSTRUCTION:

					// Process get login challenge signature request
					processGetLoginChallengeSignatureRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);

					// break
					break;

				// Default
				default:

					// Throw unknown instruction error
					THROW(UNKNOWN_INSTRUCTION_ERROR);

					// Break
					break;
			}
		}

		// Catch IO reset error
		CATCH(EXCEPTION_IO_RESET) {

			// Close try
			CLOSE_TRY;

			// Throw IO reset error
			THROW(EXCEPTION_IO_RESET);
		}

		// Catch length error
		CATCH(ERR_APD_LEN) {

			// Close try
			CLOSE_TRY;

			// Throw length error
			THROW(ERR_APD_LEN);
		}

		// Catch other errors
		CATCH_OTHER(error) {

			// Close try
			CLOSE_TRY;

			// Check error type
			switch(error & ERROR_TYPE_MASK) {

				// Application errors or success
				case ERR_APP_RANGE_01:
				case ERR_APP_RANGE_02:
				case ERR_APP_RANGE_03:
				case ERR_APP_RANGE_04:
				case SWO_SUCCESS:

					// Throw error
					THROW(error);

					// Break
					break;

				// Default
				default:

					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);

					// Break
					break;
			}
		}

		// Finally
		FINALLY {
		}
	}

	// End try
	END_TRY;
}

// Process user interaction
bool processUserInteraction(const enum Instruction instruction, const bool isApprovedResult, const bool showProcessing) {

	// Initialize response length
	volatile unsigned short responseLength = 0;

	// Initialize operation failed
	volatile bool operationFailed = false;

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Check if user approved the interaction
			if(isApprovedResult) {

				// Check if showing processing
				if(showProcessing) {

// Check if has BAGL
#ifdef HAVE_BAGL

					// Show processing menu
					showMenu(PROCESSING_MENU);

					// Wait for display to update
					UX_WAIT_DISPLAYED();
#endif
				}

				// Check instruction
				switch(instruction) {

					// Get root public key instruction
					case GET_ROOT_PUBLIC_KEY_INSTRUCTION:

						// Process get root public key user interaction
						processGetRootPublicKeyUserInteraction(&responseLength);

						// Break
						break;

					// Verify root public key instruction
					case VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION:

						// Process verify root public key user interaction
						processVerifyRootPublicKeyUserInteraction((unsigned short *)&responseLength);

						// Break
						break;

					// Verify address instruction
					case VERIFY_ADDRESS_INSTRUCTION:

						// Process verify address user interaction
						processVerifyAddressUserInteraction((unsigned short *)&responseLength);

						// Break
						break;

					// Finish transaction instruction
					case FINISH_TRANSACTION_INSTRUCTION:

						// Process finish transaction user interaction
						processFinishTransactionUserInteraction((unsigned short *)&responseLength);

						// Break
						break;

					// Get MQS challenge signature instruction
					case GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION:

						// Process get MQS challenge signature user interaction
						processGetMqsChallengeSignatureUserInteraction((unsigned short *)&responseLength);

						// break
						break;

					// Get login challenge signature instruction
					case GET_LOGIN_CHALLENGE_SIGNATURE_INSTRUCTION:

						// Process get login challenge signature user interaction
						processGetLoginChallengeSignatureUserInteraction((unsigned short *)&responseLength);

						// break
						break;

					// Default
					default:

						// Throw unknown instruction error
						THROW(UNKNOWN_INSTRUCTION_ERROR);

						// Break
						break;
				}
			}

			// Otherwise
			else {

				// Throw user rejected error
				THROW(USER_REJECTED_ERROR);
			}
		}

		// Catch IO reset error
		CATCH(EXCEPTION_IO_RESET) {

			// Close try
			CLOSE_TRY;

			// Throw IO reset error
			THROW(EXCEPTION_IO_RESET);
		}

		// Catch length error
		CATCH(ERR_APD_LEN) {

			// Close try
			CLOSE_TRY;

			// Throw length error
			THROW(ERR_APD_LEN);
		}

		// Catch other errors
		CATCH_OTHER(error) {

			// Check error type
			switch(error & ERROR_TYPE_MASK) {

				// Higher application errors or default
				case ERR_APP_RANGE_03:
				case ERR_APP_RANGE_04:
				default:

					// Set error to internal error error
					error = INTERNAL_ERROR_ERROR;

					// Fall through
					__attribute__((fallthrough));

				// Lower application errors
				case ERR_APP_RANGE_01:
				case ERR_APP_RANGE_02:

					// Reset state
					resetState();

					// Set operation failed
					operationFailed = true;

					// Fall through
					__attribute__((fallthrough));

				// Success
				case SWO_SUCCESS:

					// Check if response with the error will overflow
					if(willResponseOverflow(responseLength, sizeof(uint16_t))) {

						// Close try
						CLOSE_TRY;

						// Throw length error
						THROW(ERR_APD_LEN);
					}

					// Otherwise
					else {

						// Append error to response
						U2BE_ENCODE(G_io_apdu_buffer, responseLength, error);

						responseLength += sizeof(uint16_t);

						// Send response
						io_exchange(CHANNEL_APDU | IO_RETURN_AFTER_TX, responseLength);
					}

					// Break
					break;
			}
		}

		// Finally
		FINALLY {

// Check if has BAGL
#ifdef HAVE_BAGL

			// Show main menu
			showMainMenu();
#endif
		}
	}

	// End try
	END_TRY;

	// Return if operation didn't fail
	return !operationFailed;
}
