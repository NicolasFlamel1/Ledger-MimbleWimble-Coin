// Use strict
"use strict";


// Requires
const crypto = require("crypto");
const Secp256k1Zkp = require("./secp256k1-zkp-0.0.4.js");
const chacha = require("./ChaCha-2.1.0.js");
const Common = require("./common.js");
const Consensus = require("./consensus.js");
const Base58 = require("./base58.js");


// Classes

// MQS class
class Mqs {

	// Public
		
		// Public key to MQS address
		static publicKeyToMqsAddress(publicKey, isMainnet) {
		
			// Get version
			var version = Mqs.getAddressVersion(isMainnet);
		
			// Get MQS address from the version and public key
			var mqsAddress = Base58.encodeWithChecksum(Common.mergeArrays([
			
				// Version
				version,
				
				// Public key
				publicKey
			]));
			
			// Return MQS address
			return mqsAddress;
		}
		
		// MQS address to public key
		static mqsAddressToPublicKey(mqsAddress, isMainnet) {
		
			// Try
			try {
			
				// Decode MQS address
				var decodedAddress = Base58.decodeWithChecksum(mqsAddress);
			}
			
			// Catch errors
			catch(error) {
			
				// Throw error
				throw "Invalid MQS address.";
			}
			
			// Get version
			var version = Mqs.getAddressVersion(isMainnet);
			
			// Check if decoded address's length is invalid
			if(decodedAddress["length"] !== version["length"] + Crypto.SECP256K1_PUBLIC_KEY_LENGTH) {
			
				// Throw error
				throw "Invalid MQS address.";
			}
			
			// Check if decoded address's version doesn't match the expected version
			if(Common.arraysAreEqual(decodedAddress.subarray(0, version["length"]), version) === false) {
			
				// Throw error
				throw "Invalid MQS address.";
			}
			
			// Check if decoded address isn't a valid public key
			if(Secp256k1Zkp.isValidPublicKey(decodedAddress.subarray(version["length"])) !== true) {
			
				// Throw error
				throw "Invalid MQS address.";
			}
			
			// Return decoded address without the version
			return decodedAddress.subarray(version["length"]);
		}
		
		// Encrypt
		static encrypt(secretKey, publicKey, data) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if creating shared secret key failed
				var sharedSecretKey = Secp256k1Zkp.publicKeyTweakMultiply(publicKey, secretKey);
				
				if(sharedSecretKey === Secp256k1Zkp.OPERATION_FAILED) {
				
					// Reject error
					reject("Creating shared secret key failed.");
				}
				
				// Otherwise
				else {
				
					// Check if shared secret key isn't zero
					if(Common.arraysAreEqual(sharedSecretKey, (new Uint8Array(sharedSecretKey["length"])).fill(0)) === false) {
				
						// Return creating base key from shared secret key
						return crypto["subtle"].importKey("raw", sharedSecretKey.subarray(1), {
						
							// Name
							"name": Mqs.IMPORT_ALGORITHM
						
						}, false, [
						
							// Derive key
							"deriveKey"
							
						]).then(function(baseKey) {
						
							// Securely clear shared secret key
							sharedSecretKey.fill(0);
						
							// Create random salt
							var salt = new Uint8Array(Mqs.SALT_LENGTH);
							
							crypto.getRandomValues(salt);
							
							// Return deriving key from base key
							return crypto["subtle"].deriveKey({
							
								// Name
								"name": Mqs.IMPORT_ALGORITHM,
								
								// Salt
								"salt": salt,
								
								// Iterations
								"iterations": Mqs.DIGEST_NUMBER_OF_ITERATIONS,
								
								// Hash
								"hash": Mqs.DIGEST_ALGORITHM
								
							}, baseKey, {
							
								// Name
								"name": Mqs.ENCRYPTION_ALGORITHM,
								
								// Length
								"length": Mqs.ENCRYPTION_KEY_LENGTH
								
							}, true, [
							
								// Encrypt
								"encrypt",
								
								// Decrypt
								"decrypt"
							
							]).then(function(derivedKey) {
							
								// TODO Securely clear baseKey
							
								// Return exporting the raw key
								return crypto["subtle"].exportKey("raw", derivedKey).then(function(rawKey) {
								
									// TODO Securely clear derivedKey
									
									// Get raw key in the correct format
									rawKey = new Uint8Array(rawKey);
								
									// Check if data is valid
									if(data["length"] !== 0) {
								
										// Create random nonce
										var nonce = new Uint8Array(Mqs.NONCE_LENGTH);
										
										crypto.getRandomValues(nonce);
										
										// Try
										try {
										
											// Create cipher from raw key and nonce
											var cipher = chacha.createCipher(rawKey, nonce);
											
											// Set cipher's AAD
											cipher.setAAD(Mqs.AAD_VALUE);
											
											// Encrypt data with the cipher
											var encryptedData = cipher.update(data);
											
											// Finish encrypting data
											encryptedData = Common.mergeArrays([
											
												// Encrypted data
												encryptedData,
												
												// Finish encrypting data
												cipher.final()
											]);
											
											// Get tag from the cipher
											var tag = cipher.getAuthTag();
											
											// Append tag to the encrypted data
											encryptedData = Common.mergeArrays([
											
												// Encrypted data
												encryptedData,
												
												// Tag
												tag
											]);
										}
										
										// Catch errors
										catch(error) {
										
											// Securely clear raw key
											rawKey.fill(0);
										
											// Reject error
											reject("Encrypting data failed.");
											
											// Return
											return;
										}
										
										// Securely clear raw key
										rawKey.fill(0);
									
										// Resolve
										resolve([
										
											// Salt
											salt,
											
											// Nonce
											nonce,
											
											// Encrypted data
											encryptedData
										]);
									}
									
									// Otherwise
									else {
									
										// Securely clear raw key
										rawKey.fill(0);
									
										// Reject error
										reject("Invalid data.");
									}
									
								// Catch errors
								}).catch(function(error) {
								
									// TODO Securely clear derivedKey
								
									// Reject error
									reject(error);
								});			
							
							// Catch errors
							}).catch(function(error) {
							
								// TODO Securely clear baseKey
							
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
					}
					
					// Otherwise
					else {
					
						// Securely clear shared secret key
						sharedSecretKey.fill(0);
					
						// Reject error
						reject("Invalid shared secret key");
					}
				}
			});				
		}
		
		// Decrypt
		static decrypt(secretKey, publicKey, encryptedData, salt, nonce) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if creating shared secret key failed
				var sharedSecretKey = Secp256k1Zkp.publicKeyTweakMultiply(publicKey, secretKey);
				
				if(sharedSecretKey === Secp256k1Zkp.OPERATION_FAILED) {
				
					// Reject error
					reject("Creating shared secret key failed.");
				}
				
				// Otherwise
				else {
				
					// Check if shared secret key isn't zero
					if(Common.arraysAreEqual(sharedSecretKey, (new Uint8Array(sharedSecretKey["length"])).fill(0)) === false) {
				
						// Return creating base key from shared secret key
						return crypto["subtle"].importKey("raw", sharedSecretKey.subarray(1), {
						
							// Name
							"name": Mqs.IMPORT_ALGORITHM
						
						}, false, [
						
							// Derive key
							"deriveKey"
							
						]).then(function(baseKey) {
						
							// Securely clear shared secret key
							sharedSecretKey.fill(0);
						
							// Return deriving key from base key
							return crypto["subtle"].deriveKey({
							
								// Name
								"name": Mqs.IMPORT_ALGORITHM,
								
								// Salt
								"salt": salt,
								
								// Iterations
								"iterations": Mqs.DIGEST_NUMBER_OF_ITERATIONS,
								
								// Hash
								"hash": Mqs.DIGEST_ALGORITHM
								
							}, baseKey, {
							
								// Name
								"name": Mqs.ENCRYPTION_ALGORITHM,
								
								// Length
								"length": Mqs.ENCRYPTION_KEY_LENGTH
								
							}, true, [
							
								// Encrypt
								"encrypt",
								
								// Decrypt
								"decrypt"
							
							]).then(function(derivedKey) {
							
								// TODO Securely clear baseKey
							
								// Return exporting the raw key
								return crypto["subtle"].exportKey("raw", derivedKey).then(function(rawKey) {
								
									// TODO Securely clear derivedKey
									
									// Get raw key in the correct format
									rawKey = new Uint8Array(rawKey);
								
									// Check if encrypted data is valid
									if(encryptedData["length"] > Mqs.TAG_LENGTH) {
								
										// Try
										try {
										
											// Create decipher from raw key and nonce
											var decipher = chacha.createDecipher(rawKey, nonce);
											
											// Set decipher's AAD
											decipher.setAAD(Mqs.AAD_VALUE);
											
											// Set decipher's tag
											decipher.setAuthTag(encryptedData.subarray(encryptedData["length"] - Mqs.TAG_LENGTH));
											
											// Decrypt encrypted data with the decipher
											var decryptedData = decipher.update(encryptedData.subarray(0, encryptedData["length"] - Mqs.TAG_LENGTH));
											
											// Finish decrypting data
											decryptedData = Common.mergeArrays([
											
												// Decrypted data
												decryptedData,
												
												// Finish decrypting data
												decipher.final()
											]);
										}
										
										// Catch errors
										catch(error) {
										
											// Securely clear raw key
											rawKey.fill(0);
										
											// Reject error
											reject("Decrypting data failed.");
											
											// Return
											return;
										}
										
										// Securely clear raw key
										rawKey.fill(0);
										
										// Resolve decrypted data
										resolve(decryptedData);
									}
									
									// Otherwise
									else {
									
										// Securely clear raw key
										rawKey.fill(0);
									
										// Reject error
										reject("Invalid encrypted data.");
									}
									
								// Catch errors
								}).catch(function(error) {
								
									// TODO Securely clear derivedKey
								
									// Reject error
									reject(error);
								});			
							
							// Catch errors
							}).catch(function(error) {
							
								// TODO Securely clear baseKey
							
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
					}
					
					// Otherwise
					else {
					
						// Securely clear shared secret key
						sharedSecretKey.fill(0);
					
						// Reject error
						reject("Invalid shared secret key");
					}
				}
			});
		}
		
		// Address length
		static get ADDRESS_LENGTH() {
		
			// Return address length
			return 52;
		}
		
		// Encrypted data salt index
		static get ENCRYPTED_DATA_SALT_INDEX() {
		
			// Return encrypted data salt index
			return 0;
		}
		
		// Encrypted data nonce index
		static get ENCRYPTED_DATA_NONCE_INDEX() {
		
			// Return encrypted data nonce index
			return Mqs.ENCRYPTED_DATA_SALT_INDEX + 1;
		}
		
		// Encrypted data data index
		static get ENCRYPTED_DATA_DATA_INDEX() {
		
			// Return encrypted data data index
			return Mqs.ENCRYPTED_DATA_NONCE_INDEX + 1;
		}
		
	// Private
	
		// Get address version
		static getAddressVersion(isMainnet) {
		
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// MWC wallet
				case Consensus.MWC_WALLET_TYPE:
		
					// Check if mainnet
					if(isMainnet === true) {
					
						// Return address version
						return new Uint8Array([1, 69]);
					}
					
					// Otherwise
					else {
					
						// Return address version
						return new Uint8Array([1, 121]);
					}
					
					// Break
					break;
			}
		}
		
		// Import algorithm
		static get IMPORT_ALGORITHM() {
		
			// Return import algorithm
			return "PBKDF2";
		}
		
		// Encryption algorithm
		static get ENCRYPTION_ALGORITHM() {
		
			// Return encryption algorithm
			return "AES-GCM";
		}
		
		// Encryption key length
		static get ENCRYPTION_KEY_LENGTH() {
		
			// Return encryption key length
			return 256;
		}
		
		// Digest algorithm
		static get DIGEST_ALGORITHM() {
		
			// Return digest algorithm
			return "SHA-512";
		}
		
		// Digest number of iterations
		static get DIGEST_NUMBER_OF_ITERATIONS() {
		
			// Return digest number of iterations
			return 100;
		}
		
		// Salt length
		static get SALT_LENGTH() {
		
			// Return salt length
			return 8;
		}
		
		// Nonce length
		static get NONCE_LENGTH() {
		
			// Return nonce length
			return 12;
		}
		
		// Tag length
		static get TAG_LENGTH() {
		
			// Return tag length
			return 16;
		}
		
		// AAD value
		static get AAD_VALUE() {
		
			// Return AAD value
			return new Uint8Array([]);
		}
}


// Main function

// Set global object's MQS
globalThis["Mqs"] = Mqs;

// Export MQS
module["exports"] = Mqs;
