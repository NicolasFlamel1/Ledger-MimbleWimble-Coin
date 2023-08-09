// Header files
#include <os_io_seproxyhal.h>
#include <string.h>
#include <ux.h>
#include "common.h"
#include "continue_decrypting_slate.h"
#include "continue_encrypting_slate.h"
#include "continue_transaction_apply_offset.h"
#include "continue_transaction_get_encrypted_secret_nonce.h"
#include "continue_transaction_get_public_key.h"
#include "continue_transaction_get_public_nonce.h"
#include "continue_transaction_get_message_signature.h"
#include "continue_transaction_include_input.h"
#include "continue_transaction_include_output.h"
#include "continue_transaction_set_encrypted_secret_nonce.h"
#include "finish_decrypting_slate.h"
#include "finish_encrypting_slate.h"
#include "finish_transaction.h"
#include "get_address.h"
#include "get_commitment.h"
#include "get_bulletproof_components.h"
#include "get_mqs_timestamp_signature.h"
#include "get_root_public_key.h"
#include "get_seed_cookie.h"
#include "get_tor_certificate_signature.h"
#include "menus.h"
#include "process_requests.h"
#include "start_decrypting_slate.h"
#include "start_encrypting_slate.h"
#include "start_transaction.h"
#include "state.h"
#include "verify_address.h"
#include "verify_root_public_key.h"


// Definitions

// Request class
#define REQUEST_CLASS 0xC7


// Supporting function implementation

// Process request
void processRequest(unsigned short requestLength, volatile unsigned short *responseLength, volatile unsigned char *responseFlags) {

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
				
				// Continue transaction get encrypted secret nonce instruction
				case CONTINUE_TRANSACTION_GET_ENCRYPTED_SECRET_NONCE_INSTRUCTION:
				
					// Process continue transaction get encrypted secret nonce request
					processContinueTransactionGetEncryptedSecretNonceRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);
					
					// Break
					break;
				
				// Continue transaction set encrypted secret nonce instruction
				case CONTINUE_TRANSACTION_SET_ENCRYPTED_SECRET_NONCE_INSTRUCTION:
				
					// Process continue transaction set encrypted secret nonce request
					processContinueTransactionSetEncryptedSecretNonceRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);
					
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
				
				// Get MQS timestamp signature instruction
				case GET_MQS_TIMESTAMP_SIGNATURE_INSTRUCTION:
				
					// Process get MQS timestamp signature request
					processGetMqsTimestampSignatureRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);
				
					// break
					break;
				
				// Get Tor certificate signature instruction
				case GET_TOR_CERTIFICATE_SIGNATURE_INSTRUCTION:
				
					// Process get Tor certificate signature request
					processGetTorCertificateSignatureRequest((unsigned short *)responseLength, (unsigned char *)responseFlags);
				
					// break
					break;

				// Default
				default:
				
					// Throw unknown instruction error
					THROW(UNKNOWN_INSTRUCTION_ERROR);
			}
		}
		
		// Catch IO reset error
		CATCH(EXCEPTION_IO_RESET) {
		
			// Throw IO reset error
			THROW(EXCEPTION_IO_RESET);
		}
		
		// Catch length error
		CATCH(LENGTH_ERROR) {
		
			// Throw length error
			THROW(LENGTH_ERROR);
		}
		
		// Catch other errors
		CATCH_OTHER(error) {
		
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
				
				// Default
				default:
		
					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
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
void processUserInteraction(size_t instruction, bool isApprovedResult, bool showProcessing) {
	
	// Clear menu buffers
	clearMenuBuffers();

	// Initialize response length
	volatile unsigned short responseLength = 0;
	
	// Begin try
	BEGIN_TRY {
	
		// Try
		TRY {
		
			// Check if user approved the interaction
			if(isApprovedResult) {
			
				// Check if showing processing
				if(showProcessing) {
				
					// Set time or processing menu line buffer
					strcpy(timeOrProcessingMessageLineBuffer, "Processing");
			
					// Show processing menu
					showMenu(PROCESSING_MENU);
					
					// Wait for display to update
					UX_WAIT_DISPLAYED();
				}
			
				// Check instruction
				switch(instruction) {
				
					// Get root public key instruction
					case GET_ROOT_PUBLIC_KEY_INSTRUCTION:
					
						// Process get root public key user interaction
						processGetRootPublicKeyUserInteraction((unsigned short *)&responseLength);
						
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
					
					// Get MQS timestamp signature instruction
					case GET_MQS_TIMESTAMP_SIGNATURE_INSTRUCTION:
					
						// Process get MQS timestamp signature user interaction
						processGetMqsTimestampSignatureUserInteraction((unsigned short *)&responseLength);
					
						// break
						break;
					
					// Get Tor certificate signature instruction
					case GET_TOR_CERTIFICATE_SIGNATURE_INSTRUCTION:
					
						// Process get Tor certificate signature user interaction
						processGetTorCertificateSignatureUserInteraction((unsigned short *)&responseLength);
					
						// break
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
		
			// Throw IO reset error
			THROW(EXCEPTION_IO_RESET);
		}
		
		// Catch length error
		CATCH(LENGTH_ERROR) {
		
			// Throw length error
			THROW(LENGTH_ERROR);
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
				
				// Lower application errors
				case ERR_APP_RANGE_01:
				case ERR_APP_RANGE_02:
				
					// Reset state
					resetState();
				
				// Success
				case SWO_SUCCESS:
				
					// Check if response with the error will overflow
					if(willResponseOverflow(responseLength, sizeof(uint16_t))) {
				
						// Throw length error
						THROW(LENGTH_ERROR);
					}
					
					// Otherwise
					else {
				
						// Append error to response
						U2BE_ENCODE(G_io_apdu_buffer, responseLength, error);
						
						responseLength += sizeof(uint16_t);
						
						// Send response
						io_exchange(CHANNEL_APDU | IO_RETURN_AFTER_TX, responseLength);
						
						// Break
						break;
					}
			}
		}
		
		// Finally
		FINALLY {
		
			// Show main menu
			showMainMenu();
		}
	}
	
	// End try
	END_TRY;
}
