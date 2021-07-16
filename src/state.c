// Header files
#include "slatepack.h"
#include "state.h"
#include "transaction.h"
#include "mqs.h"


// Supporting function implementation

// Reset state
void resetState(void) {

	// Reset transaction
	resetTransaction();
	
	// Reset MQS data
	resetMqsData();
	
	// Reset Slatepack data
	resetSlatepackData();
}

// Reset unrelated state
void resetUnrelatedState(enum Instruction instruction) {

	// Check instruction
	switch(instruction) {
	
		// Transaction related instruction
		case START_TRANSACTION_INSTRUCTION:
		case CONTINUE_TRANSACTION_INCLUDE_OUTPUT_INSTRUCTION:
		case CONTINUE_TRANSACTION_INCLUDE_INPUT_INSTRUCTION:
		case FINISH_TRANSACTION_GET_PUBLIC_KEY_INSTRUCTION:
		case FINISH_TRANSACTION_GET_SIGNATURE_INSTRUCTION:
		
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
	
		// MQS data related instruction
		case START_ENCRYPTING_MQS_DATA_INSTRUCTION:
		case CONTINUE_ENCRYPTING_MQS_DATA_INSTRUCTION:
		case FINISH_ENCRYPTING_MQS_DATA_INSTRUCTION:
		case START_DECRYPTING_MQS_DATA_INSTRUCTION:
		case CONTINUE_DECRYPTING_MQS_DATA_INSTRUCTION:
		case FINISH_DECRYPTING_MQS_DATA_INSTRUCTION:
		
			// Break
			break;
		
		// Default
		default:
		
			// Reset MQS data
			resetMqsData();
			
			// Break
			break;
	}
	
	// Check instruction
	switch(instruction) {
	
		// Slatepack data related instruction
		case START_ENCRYPTING_SLATEPACK_DATA_INSTRUCTION:
		case CONTINUE_ENCRYPTING_SLATEPACK_DATA_INSTRUCTION:
		case FINISH_ENCRYPTING_SLATEPACK_DATA_INSTRUCTION:
		case START_DECRYPTING_SLATEPACK_DATA_INSTRUCTION:
		case CONTINUE_DECRYPTING_SLATEPACK_DATA_INSTRUCTION:
		case FINISH_DECRYPTING_SLATEPACK_DATA_INSTRUCTION:
		
			// Break
			break;
		
		// Default
		default:
		
			// Reset Slatepack data
			resetSlatepackData();
			
			// Break
			break;
	}
}
