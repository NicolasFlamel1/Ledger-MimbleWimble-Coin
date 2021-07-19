// Header guard
#ifndef PROCESS_REQUESTS_H
#define PROCESS_REQUESTS_H


// Header files
#include <stdbool.h>
#include <stddef.h>


// Constants

// Instruction
enum Instruction {

	// Get application information instruction
	GET_APPLICATION_INFORMATION_INSTRUCTION,
	
	// Get root public key instruction
	GET_ROOT_PUBLIC_KEY_INSTRUCTION,
	
	// Get seed cookie instruction
	GET_SEED_COOKIE_INSTRUCTION,
	
	// Get commitment instruction
	GET_COMMITMENT_INSTRUCTION,
	
	// Get bulletproof instruction
	GET_BULLETPROOF_INSTRUCTION,
	
	// Get Tor public key instruction
	GET_TOR_PUBLIC_KEY_INSTRUCTION,
	
	// Get Tor transaction signature instruction
	GET_TOR_TRANSACTION_SIGNATURE_INSTRUCTION,
	
	// Get Tor certificate signature instruction
	GET_TOR_CERTIFICATE_SIGNATURE_INSTRUCTION,
	
	// Start encrypting Slatepack data instruction
	START_ENCRYPTING_SLATEPACK_DATA_INSTRUCTION,
	
	// Continue encrypting Slatepack data instruction
	CONTINUE_ENCRYPTING_SLATEPACK_DATA_INSTRUCTION,
	
	// Finish encrypting Slatepack data instruction
	FINISH_ENCRYPTING_SLATEPACK_DATA_INSTRUCTION,
	
	// Start decrypting Slatepack data instruction
	START_DECRYPTING_SLATEPACK_DATA_INSTRUCTION,
	
	// Continue decrypting Slatepack data instruction
	CONTINUE_DECRYPTING_SLATEPACK_DATA_INSTRUCTION,
	
	// Finish decrypting Slatepack data instruction
	FINISH_DECRYPTING_SLATEPACK_DATA_INSTRUCTION,
	
	// Get MQS public key instruction
	GET_MQS_PUBLIC_KEY_INSTRUCTION,
	
	// Get MQS transaction signature instruction
	GET_MQS_TRANSACTION_SIGNATURE_INSTRUCTION,
	
	// Start encrypting MQS data instruction
	START_ENCRYPTING_MQS_DATA_INSTRUCTION,
	
	// Continue encrypting MQS data instruction
	CONTINUE_ENCRYPTING_MQS_DATA_INSTRUCTION,
	
	// Finish encrypting MQS data instruction
	FINISH_ENCRYPTING_MQS_DATA_INSTRUCTION,
	
	// Start decrypting MQS data instruction
	START_DECRYPTING_MQS_DATA_INSTRUCTION,
	
	// Continue decrypting MQS data instruction
	CONTINUE_DECRYPTING_MQS_DATA_INSTRUCTION,
	
	// Finish decrypting MQS data instruction
	FINISH_DECRYPTING_MQS_DATA_INSTRUCTION,
	
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
	
	// Finish transaction get signature instruction
	FINISH_TRANSACTION_GET_SIGNATURE_INSTRUCTION
};


// Function prototypes

// Process request
void processRequest(unsigned short requestLength, volatile unsigned short *responseLength, volatile unsigned char *responseFlags);

// Process user interaction
void processUserInteraction(size_t instruction, bool isApprovedResult);


#endif
