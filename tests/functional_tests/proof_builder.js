// Use strict
"use strict";


// Classes

// Proof builder class
class ProofBuilder {

	// Public
	
		// Initialize
		initialize(extendedPrivateKey) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Reject error
				reject("Not implemented.");
			});
		}
		
		// Uninitialize
		uninitialize() {
		
			// Throw error
			throw "Not implemented.";
		}
	
		// Rewind nonce
		rewindNonce(commit) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Reject error
				reject("Not implemented.");
			});
		}
		
		// Private nonce
		privateNonce(commit) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Reject error
				reject("Not implemented.");
			});
		}
		
		// Proof message
		proofMessage(identifier, switchType) {
		
			// Throw error
			throw "Not implemented.";
		}
		
		// Get output
		getOutput(extendedPrivateKey, amount, commit, message) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Reject error
				reject("Not implemented.");
			});
		}
		
		// Output identifier index
		static get OUTPUT_IDENTIFIER_INDEX() {
		
			// Return output identifier index
			return 0;
		}
		
		// Output switch type index
		static get OUTPUT_SWITCH_TYPE_INDEX() {
		
			// Return output switch type index
			return ProofBuilder.OUTPUT_IDENTIFIER_INDEX + 1;
		}
}


// Main function

// Set global object's proof builder
globalThis["ProofBuilder"] = ProofBuilder;

// Export proof builder
module["exports"] = ProofBuilder;
