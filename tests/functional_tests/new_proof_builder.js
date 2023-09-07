// Use strict
"use strict";


// Requires
const Blake2b = require("./BLAKE2b-0.0.2.js");
const Secp256k1Zkp = require("./secp256k1-zkp-0.0.29.js");
const BigNumber = require("./bignumber.js-9.1.1.js");
const Common = require("./common.js");
const Identifier = require("./identifier.js");
const Crypto = require("./crypto.js");
const ProofBuilder = require("./proof_builder.js");


// Classes

// New proof builder class
class NewProofBuilder extends ProofBuilder {

	// Public
	
		// Initialize
		initialize(extendedPrivateKey) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Return deriving secret key from extended private key and root identifier
				return Crypto.deriveSecretKey(extendedPrivateKey, new BigNumber(0), new Identifier(Identifier.ROOT_SERIALIZED_IDENTIFIER), Crypto.SWITCH_TYPE_NONE).then(function(secretKey) {
				
					// Check if getting private hash from secret key was successful
					self.privateHash = Blake2b.compute(Crypto.NONCE_LENGTH, secretKey, new Uint8Array([]));
					
					if(self.privateHash !== Blake2b.OPERATION_FAILED) {
					
						// Securely clear secret key
						secretKey.fill(0);
					
						// Return getting root public key from extended private key
						return Crypto.rootPublicKey(extendedPrivateKey).then(function(publicKey) {
						
							// Check if getting rewind hash from public key was successful
							self.rewindHash = Blake2b.compute(Crypto.NONCE_LENGTH, publicKey, new Uint8Array([]));
							
							if(self.rewindHash !== Blake2b.OPERATION_FAILED) {
							
								// Securely clear public key
								publicKey.fill(0);
							
								// Resolve
								resolve();
							}
							
							// Otherwise
							else {
							
								// Securely clear private hash
								self.privateHash.fill(0);
								
								// Securely clear public key
								publicKey.fill(0);
							
								// Reject error
								reject("Getting Rewind hash failed.");
							}
						
						// Catch errors
						}).catch(function(error) {
						
							// Securely clear private hash
							self.privateHash.fill(0);
						
							// Reject error
							reject(error);
						});
					}
					
					// Otherwise
					else {
					
						// Securely clear secret key
						secretKey.fill(0);
					
						// Reject error
						reject("Getting private hash failed.");
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Uninitialize
		uninitialize() {
		
			// Securely clear private hash
			this.privateHash.fill(0);
			
			// Securely clear rewind hash
			this.rewindHash.fill(0);
		}
	
		// Rewind nonce
		rewindNonce(commit) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if getting nonce from rewind hash and commit was successful
				var nonce = Blake2b.compute(Crypto.NONCE_LENGTH, self.rewindHash, commit);
				
				if(nonce !== Blake2b.OPERATION_FAILED) {
				
					// Check if nonce is a valid secret key
					if(Secp256k1Zkp.isValidSecretKey(nonce) === true) {
					
						// Resolve nonce
						resolve(nonce);
					}
					
					// Otherwise
					else {
					
						// Securely clear nonce
						nonce.fill(0);
					
						// Reject error
						reject("Nonce is not a valid secret key.");
					}
				}
				
				// Otherwise
				else {
				
					// Reject error
					reject("Getting nonce failed.");
				}
			});
		}
		
		// Private nonce
		privateNonce(commit) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if getting nonce from private hash and commit was successful
				var nonce = Blake2b.compute(Crypto.NONCE_LENGTH, self.privateHash, commit);
				
				if(nonce !== Blake2b.OPERATION_FAILED) {
				
					// Check if nonce is a valid secret key
					if(Secp256k1Zkp.isValidSecretKey(nonce) === true) {
					
						// Resolve nonce
						resolve(nonce);
					}
					
					// Otherwise
					else {
					
						// Securely clear nonce
						nonce.fill(0);
					
						// Reject error
						reject("Nonce is not a valid secret key.");
					}
				}
				
				// Otherwise
				else {
				
					// Reject error
					reject("Getting nonce failed.");
				}
			});
		}
		
		// Proof message
		proofMessage(identifier, switchType) {
		
			// Create message
			var message = new Uint8Array(NewProofBuilder.MESSAGE_LENGTH).fill(0);
			
			// Set message's switch type
			message[NewProofBuilder.MESSAGE_SWITCH_TYPE_INDEX] = switchType;
			
			// Set everything after message's switch type to the identifier's value
			message = Common.mergeArrays([
			
				// Message switch type
				message.subarray(0, NewProofBuilder.MESSAGE_SWITCH_TYPE_INDEX + 1),
				
				// Identifier's value
				identifier.getValue().subarray(0, NewProofBuilder.MESSAGE_LENGTH - (NewProofBuilder.MESSAGE_SWITCH_TYPE_INDEX + 1))
			]);
			
			// Return message
			return message;
		}
		
		// Get output
		getOutput(extendedPrivateKey, amount, commit, message) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if message is valid
				if(message["length"] === NewProofBuilder.MESSAGE_LENGTH && Common.arraysAreEqual(message.subarray(0, NewProofBuilder.MESSAGE_HEADER_START["length"]), NewProofBuilder.MESSAGE_HEADER_START) === true) {
								
					// Get switch type from message
					var switchType = message[NewProofBuilder.MESSAGE_SWITCH_TYPE_INDEX];
					
					// Check if switch type is valid
					if(switchType === Crypto.SWITCH_TYPE_NONE || switchType === Crypto.SWITCH_TYPE_REGULAR) {
					
						// Get depth from message
						var depth = message[NewProofBuilder.MESSAGE_DEPTH_INDEX];
						
						// Try
						try {
						
							// Create identifier from depth and message
							var identifier = new Identifier(depth.toString(Common.HEX_NUMBER_BASE).padStart(Common.HEX_NUMBER_LENGTH, Common.HEX_NUMBER_PADDING) + Common.toHexString(message.subarray(NewProofBuilder.MESSAGE_HEADER_LENGTH)));
						}
						
						// Catch errors
						catch(error) {
						
							// Reject error
							reject("Identifier isn't valid.");
							
							// Return
							return;
						}
						
						// Return getting commit from extended private key, amount, identifier, and switch type
						return Crypto.commit(extendedPrivateKey, amount, identifier, switchType).then(function(computedCommit) {
						
							// Check if commit matches the computed commit
							if(Common.arraysAreEqual(commit, computedCommit) === true) {
							
								// Resolve output
								resolve([
								
									// Identifier
									identifier,
									
									// Switch type
									switchType
								]);
							}
							
							// Otherwise
							else {
							
								// Reject error
								reject("Output isn't valid.");
							}
						
						// Catch errors
						}).catch(function(error) {
						
							// Reject error
							reject(error);
						});
					}
					
					// Otherwise
					else {
					
						// Reject error
						reject("Switch type isn't valid.");
					}
				}
				
				// Otherwise
				else {
				
					// Reject error
					reject("Message isn't valid.");
				}
			});
		}
	
	// Private
	
		// Message header start
		static get MESSAGE_HEADER_START() {
		
			// Return message header start
			return new Uint8Array([0, 0]);
		}

		// Message switch type index
		static get MESSAGE_SWITCH_TYPE_INDEX() {
		
			// Return message switch type index
			return NewProofBuilder.MESSAGE_HEADER_START["length"];
		}

		// Message depth index
		static get MESSAGE_DEPTH_INDEX() {
		
			// Return message depth index
			return NewProofBuilder.MESSAGE_SWITCH_TYPE_INDEX + 1;
		}

		// Message header length
		static get MESSAGE_HEADER_LENGTH() {
		
			// Return message header length
			return NewProofBuilder.MESSAGE_DEPTH_INDEX + 1;
		}

		// Message length
		static get MESSAGE_LENGTH() {
		
			// Return message length
			return NewProofBuilder.MESSAGE_HEADER_LENGTH + Identifier.MAX_DEPTH * Uint32Array["BYTES_PER_ELEMENT"];
		}
}


// Main function

// Set global object's new proof builder
globalThis["NewProofBuilder"] = NewProofBuilder;

// Export new proof builder
module["exports"] = NewProofBuilder;
