// Header files
#include "slate.h"
#include "state.h"
#include "transaction.h"


// Supporting function implementation

// Reset state
void resetState(void) {

	// Reset transaction
	resetTransaction();

	// Reset slate
	resetSlate();
}

// Reset unrelated state
void resetUnrelatedState(const enum Instruction instruction) {

	// Check instruction
	switch(instruction) {

		// Transaction related instruction
		case START_TRANSACTION_INSTRUCTION:
		case CONTINUE_TRANSACTION_INCLUDE_OUTPUT_INSTRUCTION:
		case CONTINUE_TRANSACTION_INCLUDE_INPUT_INSTRUCTION:
		case CONTINUE_TRANSACTION_APPLY_OFFSET_INSTRUCTION:
		case CONTINUE_TRANSACTION_GET_PUBLIC_KEY_INSTRUCTION:
		case CONTINUE_TRANSACTION_GET_PUBLIC_NONCE_INSTRUCTION:
		case CONTINUE_TRANSACTION_GET_MESSAGE_SIGNATURE_INSTRUCTION:
		case FINISH_TRANSACTION_INSTRUCTION:

			// Break
			break;

		// Default
		default:

			// Reset transaction
			resetTransaction();

			// Break
			break;
	}

	// Check instruction
	switch(instruction) {

		// Slate related instruction
		case START_ENCRYPTING_SLATE_INSTRUCTION:
		case CONTINUE_ENCRYPTING_SLATE_INSTRUCTION:
		case FINISH_ENCRYPTING_SLATE_INSTRUCTION:
		case START_DECRYPTING_SLATE_INSTRUCTION:
		case CONTINUE_DECRYPTING_SLATE_INSTRUCTION:
		case FINISH_DECRYPTING_SLATE_INSTRUCTION:

			// Break
			break;

		// Default
		default:

			// Reset slate
			resetSlate();

			// Break
			break;
	}
}
