// Header guard
#ifndef PROCESS_REQUESTS_H
#define PROCESS_REQUESTS_H


// Header files
#include <stdbool.h>
#include <stddef.h>


// Definitions

// Request class
#define REQUEST_CLASS 0xC7


// Constants

// Instruction
enum Instruction {

	// Get root public key instruction
	GET_ROOT_PUBLIC_KEY_INSTRUCTION,

	// Get address instruction
	GET_ADDRESS_INSTRUCTION,

	// Get seed cookie instruction
	GET_SEED_COOKIE_INSTRUCTION,

	// Get commitment instruction
	GET_COMMITMENT_INSTRUCTION,

	// Get bulletproof components instruction
	GET_BULLETPROOF_COMPONENTS_INSTRUCTION,

	// Verify root public key instruction
	VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION,

	// Verify address instruction
	VERIFY_ADDRESS_INSTRUCTION,

	// Start encrypting slate instruction
	START_ENCRYPTING_SLATE_INSTRUCTION,

	// Continue encrypting slate instruction
	CONTINUE_ENCRYPTING_SLATE_INSTRUCTION,

	// Finish encrypting slate instruction
	FINISH_ENCRYPTING_SLATE_INSTRUCTION,

	// Start decrypting slate instruction
	START_DECRYPTING_SLATE_INSTRUCTION,

	// Continue decrypting slate instruction
	CONTINUE_DECRYPTING_SLATE_INSTRUCTION,

	// Finish decrypting slate instruction
	FINISH_DECRYPTING_SLATE_INSTRUCTION,

	// Start transaction instruction
	START_TRANSACTION_INSTRUCTION,

	// Continue transaction include output instruction
	CONTINUE_TRANSACTION_INCLUDE_OUTPUT_INSTRUCTION,

	// Continue transaction include input instruction
	CONTINUE_TRANSACTION_INCLUDE_INPUT_INSTRUCTION,

	// Continue transaction apply offset instruction
	CONTINUE_TRANSACTION_APPLY_OFFSET_INSTRUCTION,

	// Continue transaction get public key instruction
	CONTINUE_TRANSACTION_GET_PUBLIC_KEY_INSTRUCTION,

	// Continue transaction get public nonce instruction
	CONTINUE_TRANSACTION_GET_PUBLIC_NONCE_INSTRUCTION,

	// Continue transaction get message signature instruction
	CONTINUE_TRANSACTION_GET_MESSAGE_SIGNATURE_INSTRUCTION,

	// Finish transaction instruction
	FINISH_TRANSACTION_INSTRUCTION,

	// Get MQS challenge signature instruction
	GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION,

	// Get login challenge signature instruction
	GET_LOGIN_CHALLENGE_SIGNATURE_INSTRUCTION
};


// Function prototypes

// Process request
void processRequest(const unsigned short requestLength, volatile unsigned short *responseLength, volatile unsigned char *responseFlags);

// Process user interaction
bool processUserInteraction(const enum Instruction instruction, const bool isApprovedResult, const bool showProcessing);


#endif
