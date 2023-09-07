// Use strict
"use strict";


// Requires
const Common = require("./common.js");
const crypto = require("crypto")["webcrypto"];
const Ed25519 = require("./Ed25519-0.0.22.js");
const X25519 = require("./X25519-0.0.23.js");
const chacha = require("./ChaCha-2.1.0.js");


// Classes

// Age class
class Age {

	// Public
	
		// Encrypt
		static encrypt(receiverEd25519PublicKey, data) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if getting receiver X25519 public key from receiver Ed25519 public key failed
				var receiverX25519PublicKey = X25519.publicKeyFromEd25519PublicKey(receiverEd25519PublicKey);
				if(receiverX25519PublicKey === X25519.OPERATION_FAILED) {
				
					// Reject error
					reject("Invalid receiver Ed25519 public key.");
					
					// Return
					return;
				}
				
				// Check if receiver X25519 public key is invalid
				if(Common.arraysAreEqual(receiverX25519PublicKey, (new Uint8Array(Crypto.X25519_PUBLIC_KEY_LENGTH)).fill(0))) {
				
					// Reject error
					reject("Invalid receiver X25519 public key.");
					
					// Return
					return;
				}
				
				// Loop forever
				while(true) {
				
					// Create random ephemeral Ed25519 secret key
					var ephemeralEd25519SecretKey = crypto.getRandomValues(new Uint8Array(Crypto.ED25519_SECRET_KEY_LENGTH));
					
					// Check if getting ephemeral X25519 secret key from the ephemeral Ed25519 secret key failed
					var ephemeralX25519SecretKey = X25519.secretKeyFromEd25519SecretKey(ephemeralEd25519SecretKey);
					if(ephemeralX25519SecretKey === X25519.OPERATION_FAILED) {
					
						// Continue
						continue;
					}
					
					// Check if getting ephemeral Ed25519 public key from the ephemeral Ed25519 secret key failed
					var ephemeralEd25519PublicKey = Ed25519.publicKeyFromSecretKey(ephemeralEd25519SecretKey);
					if(ephemeralEd25519PublicKey === Ed25519.OPERATION_FAILED) {
					
						// Continue
						continue;
					}
					
					// Check if getting ephemeral X25519 public key from the ephemeral Ed25519 public key failed
					var ephemeralX25519PublicKey = X25519.publicKeyFromEd25519PublicKey(ephemeralEd25519PublicKey);
					if(ephemeralX25519PublicKey === X25519.OPERATION_FAILED) {
					
						// Continue
						continue;
					}
					
					// Check if creating shared secret key from the ephemeral X25519 secret key and receiver X25519 public key failed
					var sharedSecretKey = X25519.sharedSecretKeyFromSecretKeyAndPublicKey(ephemeralX25519SecretKey, receiverX25519PublicKey);
					if(sharedSecretKey === X25519.OPERATION_FAILED) {
					
						// Continue
						continue;
					}
					
					// Check if shared secret key is invalid
					if(Common.arraysAreEqualTimingSafe(sharedSecretKey, (new Uint8Array(Crypto.X25519_SECRET_KEY_LENGTH)).fill(0))) {
					
						// Continue
						continue;
					}
					
					// Securely clear ephemeral Ed25519 secret key
					ephemeralEd25519SecretKey.fill(0);
					
					// Securely clear ephemeral X25519 secret key
					ephemeralX25519SecretKey.fill(0);
					
					// Break
					break;
				}
				
				// Return getting shared secret base key
				return crypto["subtle"].importKey("raw", sharedSecretKey, {
				
					// Name
					name: "HKDF"
				
				}, false, [
				
					// Derive bits
					"deriveBits"
				
				]).then(function(sharedSecretBaseKey) {
				
					// Securely clear shared secret key
					sharedSecretKey.fill(0);
					
					// Return getting wrap key
					return crypto["subtle"].deriveBits({
					
						// Name
						name: "HKDF",
						
						// Hash
						hash: "SHA-256",
						
						// Salt
						salt: Common.mergeArrays([ephemeralX25519PublicKey, receiverX25519PublicKey]),
						
						// info
						info: (new TextEncoder()).encode("age-encryption.org/v1/X25519")
					
					}, sharedSecretBaseKey, 256).then(function(wrapKey) {
					
						// TODO Securely clear sharedSecretBaseKey
									
						// Get wrap key in the correct format
						wrapKey = new Uint8Array(wrapKey);
						
						// Create cipher
						var cipher = chacha.createCipher(wrapKey, (new Uint8Array(Age.FILE_KEY_NONCE_LENGTH)).fill(0));
						
						// Create random file key
						var fileKey = crypto.getRandomValues(new Uint8Array(Age.FILE_KEY_LENGTH));
						
						// Try
						try {
						
							// Encrypt file key
							var encryptedFileKey = cipher.update(fileKey);
							encryptedFileKey = Common.mergeArrays([encryptedFileKey, cipher.final()]);
							encryptedFileKey = Common.mergeArrays([encryptedFileKey, cipher.getAuthTag()]);
						}
						
						// Catch errors
						catch(error) {
						
							// Securely clear file key
							fileKey.fill(0);
						
							// Securely clear wrap key
							wrapKey.fill(0);
						
							// Reject error
							reject("Encrypting file key failed.");
							
							// Return
							return;
						}
						
						// Securely clear wrap key
						wrapKey.fill(0);
						
						// Return getting file base key
						return crypto["subtle"].importKey("raw", fileKey, {
						
							// Name
							name: "HKDF"
						
						}, false, [
						
							// Derive bits
							"deriveBits"
						
						]).then(function(fileBaseKey) {
						
							// Securely clear file key
							fileKey.fill(0);
							
							// Create ranomd payload nonce
							var payloadNonce = crypto.getRandomValues(new Uint8Array(Age.PAYLOAD_NONCE_LENGTH));
							
							// Return creating payload key
							return crypto["subtle"].deriveBits({
							
								// Name
								name: "HKDF",
								
								// Hash
								hash: "SHA-256",
								
								// Salt
								salt: payloadNonce,
								
								// Info
								info: (new TextEncoder()).encode("payload")
							
							}, fileBaseKey, 256).then(function(payloadKey) {
							
								// TODO Securely clear fileBaseKey
								
								// Get payload key in the correct format
								payloadKey = new Uint8Array(payloadKey);
								
								// Go through all data chunks
								var encryptedData = new Uint8Array([]);
								for(var i = 0; i < Math.max(Math.ceil(data["length"] / Age.MAXIMUM_PAYLOAD_CHUNK_LENGTH), 1); ++i) {
								
									// Check if counter is too high
									if(i > 0) {
									
										// Securely clear payload key
										payloadKey.fill(0);
										
										// Reject error
										reject("Encrypting data failed.");
										
										// Return
										return;
									}
								
									// Get chunk
									var chunk = data.subarray(i * Age.MAXIMUM_PAYLOAD_CHUNK_LENGTH, (i + 1) * Age.MAXIMUM_PAYLOAD_CHUNK_LENGTH);
									
									// Create cipher
									var cipher = chacha.createCipher(payloadKey, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, i, (i === Math.max(Math.ceil(data["length"] / Age.MAXIMUM_PAYLOAD_CHUNK_LENGTH), 1) - 1) ? 0x01 : 0x00]));
									
									// Try
									try {
									
										// Check if chunk has data
										if(chunk["length"] !== 0) {
										
											// Encrypt the chunk
											encryptedData = Common.mergeArrays([encryptedData, cipher.update(chunk)]);
										}
										
										// Encrypt the chunk
										encryptedData = Common.mergeArrays([encryptedData, cipher.final()]);
										encryptedData = Common.mergeArrays([encryptedData, cipher.getAuthTag()]);
									}
									
									// Catch errors
									catch(error) {
									
										// Securely clear payload key
										payloadKey.fill(0);
										
										// Reject error
										reject("Encrypting data failed.");
										
										// Return
										return;
									}
								}
								
								// Securely clear payload key
								payloadKey.fill(0);
								
								// Resolve
								resolve([
								
									// Ephemeral X25519 public key
									ephemeralX25519PublicKey,
									
									// Encrypted file key
									encryptedFileKey,
									
									// Payload nonce
									payloadNonce,
									
									// Encrypted data
									encryptedData
								]);
							
							// Catch errors
							}).catch(function(error) {
							
								// TODO Securely clear fileBaseKey
							
								// Reject error
								reject(error);
							});
						
						// Catch errors
						}).catch(function(error) {
						
							// Securely clear file key
							fileKey.fill(0);
						
							// Reject error
							reject(error);
						});
					
					// Catch errors
					}).catch(function(error) {
					
						// TODO Securely clear sharedSecretBaseKey
					
						// Reject error
						reject(error);
					});
				
				// Catch errors
				}).catch(function(error) {
				
					// Securely clear shared secret key
					sharedSecretKey.fill(0);
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Encrypted data ephemeral X25519 public key index
		static get ENCRYPTED_DATA_EPHEMERAL_X25519_PUBLIC_KEY_INDEX() {
		
			// Return encrypted data ephemeral X25519 public key index
			return 0;
		}
		
		// Encrypted data encrypted file key index
		static get ENCRYPTED_DATA_ENCRYPTED_FILE_KEY_INDEX() {
		
			// Return encrypted data encrypted file key index
			return Age.ENCRYPTED_DATA_EPHEMERAL_X25519_PUBLIC_KEY_INDEX + 1;
		}
		
		// Encrypted data payload nonce index
		static get ENCRYPTED_DATA_PAYLOAD_NONCE_INDEX() {
		
			// Return encrypted data encrypted file key index
			return Age.ENCRYPTED_DATA_ENCRYPTED_FILE_KEY_INDEX + 1;
		}
		
		// Encrypted data data index
		static get ENCRYPTED_DATA_DATA_INDEX() {
		
			// Return encrypted data encrypted file key index
			return Age.ENCRYPTED_DATA_PAYLOAD_NONCE_INDEX + 1;
		}
	
	// Private
	
		// File key nonce length
		static get FILE_KEY_NONCE_LENGTH() {
		
			// Return file key nonce length
			return 12;
		}
		
		// File key length
		static get FILE_KEY_LENGTH() {
		
			// Return file key length
			return 16;
		}
		
		// Payload nonce length
		static get PAYLOAD_NONCE_LENGTH() {
		
			// Return payload nonce length
			return 16;
		}
		
		// Maximum payload chunk length
		static get MAXIMUM_PAYLOAD_CHUNK_LENGTH() {
		
			// Return maximum payload chunk length
			return Math.pow(2, 16);
		}
}


// Main function

// Set global object's age
globalThis["Age"] = Age;

// Export age
module["exports"] = Age;
