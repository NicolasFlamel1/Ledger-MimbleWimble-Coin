// Use strict
"use strict";


// Requires
const crypto = require("crypto")["webcrypto"];
const Blake2b = require("./BLAKE2b-0.0.2.js");
const Secp256k1Zkp = require("./secp256k1-zkp-0.0.29.js");
const BigNumber = require("./bignumber.js-9.1.1.js");
const Common = require("./common.js");
const Identifier = require("./identifier.js");


// Classes

// Crypto class
class Crypto {

	// Public
	
		// Derive child key
		static deriveChildKey(extendedPrivateKey, paths, useBip39 = false) {
			
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Get secret key and chain code from extended private key
				var secretKey = extendedPrivateKey.subarray(0, Crypto.SECP256K1_SECRET_KEY_LENGTH);
				var chainCode = extendedPrivateKey.subarray(Crypto.CHAIN_CODE_LENGTH);
				
				// Set update values
				var updateValues = new Promise(function(resolve, reject) {
				
					// Resolve secret key and chain code
					resolve([
					
						// Copy secret key
						new Uint8Array(secretKey),
						
						// Copy chain code
						new Uint8Array(chainCode)
					]);
				});
				
				// Initialize updating values
				var updatingValues = [updateValues];
			
				// Go through all of the paths
				for(let i = 0; i < paths["length"]; ++i) {
				
					// Set update to run after the previous update
					updateValues = updateValues.then(function(values) {
					
						// Return promise
						return new Promise(function(resolve, reject) {
					
							// Get updated secret key and chain code
							var updatedSecretKey = values[Crypto.SECRET_KEY_INDEX];
							var updatedChainCode = values[Crypto.CHAIN_CODE_INDEX];
							
							// Return deriving the next secret key and chain code using the path
							return Crypto.deriveSecretKeyAndChainCode(updatedSecretKey, updatedChainCode, paths[i], useBip39).then(function(updatedValues) {
							
								// Securely clear updated secret key and chain code
								updatedSecretKey.fill(0);
								updatedChainCode.fill(0);
							
								// Resolve updated values
								resolve(updatedValues);
							
							// Catch errors
							}).catch(function(error) {
							
								// Securely clear secret key and chain code
								updatedSecretKey.fill(0);
								updatedChainCode.fill(0);
							
								// Reject error
								reject(error);
							});
						});
					
					// Catch errors
					}).catch(function(error) {
					
						// Return Promise
						return new Promise(function(resolve, reject) {
					
							// Reject error
							reject(error);
						});
					});
					
					// Append updating value to list
					updatingValues.push(updateValues);
				}
				
				// Return updating all values
				return Promise.all(updatingValues).then(function(values) {
				
					// Get updated secret key and chain code
					var updatedSecretKey = values[values["length"] - 1][Crypto.SECRET_KEY_INDEX];
					var updatedChainCode = values[values["length"] - 1][Crypto.CHAIN_CODE_INDEX];
					
					// Initialize new extended private key
					var newExtendedPrivateKey = Common.mergeArrays([
					
						// Updated secret key
						updatedSecretKey,
						
						// Chain code
						updatedChainCode
					]);
					
					// Securely clear updated secret key and chain code
					updatedSecretKey.fill(0);
					updatedChainCode.fill(0);
					
					// Check if new extended private key's secret key is a valid secret key
					if(Secp256k1Zkp.isValidSecretKey(newExtendedPrivateKey.subarray(0, Crypto.SECP256K1_SECRET_KEY_LENGTH)) === true) {
					
						// Resolve new extended private key
						resolve(newExtendedPrivateKey);
					}
					
					// Otherwise
					else {
					
						// Securely clear new extended private key
						newExtendedPrivateKey.fill(0);
					
						// Reject error
						reject("Invalid extended private key.");
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
	
		// Commit
		static commit(extendedPrivateKey, amount, identifier, switchType) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Return deriving secret key from extended private key, amount, identifier, and switch type
				return Crypto.deriveSecretKey(extendedPrivateKey, amount, identifier, switchType).then(function(secretKey) {
				
					// Check if performing Pedersen commit with the secret key and amount was successful
					var commit = Secp256k1Zkp.pedersenCommit(secretKey, amount.toFixed());
					
					if(commit !== Secp256k1Zkp.OPERATION_FAILED) {
					
						// Resolve commit
						resolve(commit);
					}
					
					// Otherwise
					else {
					
						// Securely clear secret key
						secretKey.fill(0);
					
						// Reject error
						reject("Performing Pedersen commit failed.");
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Commit amount
		static commitAmount(amount) {
		
			// Check if performing Pedersen commit with zero blinding factor and amount was successful
			var commit = Secp256k1Zkp.pedersenCommit(Crypto.ZERO_BLINDING_FACTOR, amount.toFixed());
			
			if(commit !== Secp256k1Zkp.OPERATION_FAILED) {
			
				// Return commit
				return commit;
			}
			
			// Otherwise
			else {
			
				// Throw error
				throw "Performing Pedersen commit failed.";
			}
		}
		
		// Proof
		static proof(extendedPrivateKey, amount, identifier, switchType, proofBuilder) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Return getting commit from extended private key, amount, identifier, and switch type
				return Crypto.commit(extendedPrivateKey, amount, identifier, switchType).then(function(commit) {
				
					// Return deriving secret key from extended private key, amount, identifier, and switch type
					return Crypto.deriveSecretKey(extendedPrivateKey, amount, identifier, switchType).then(function(secretKey) {
					
						// Return getting rewind nonce from the commit
						return proofBuilder.rewindNonce(commit).then(function(rewindNonce) {
						
							// Return getting private nonce from the commit
							return proofBuilder.privateNonce(commit).then(function(privateNonce) {
							
								// Try
								try {
							
									// Get proof message from identifier and switch type
									var message = proofBuilder.proofMessage(identifier, switchType);
								}
								
								// Catch errors
								catch(error) {
								
									// Securely clear secret key
									secretKey.fill(0);
								
									// Securely clear rewind nonce
									rewindNonce.fill(0);
								
									// Securely clear private nonce
									privateNonce.fill(0);
								
									// Reject error
									reject("Getting proof message failed.");
									
									// Return
									return;
								}
								
								// Check if creating bulletproof with the secret key, amount, rewind nonce, private nonce, and message was successful
								var bulletproof = Secp256k1Zkp.createBulletproof(secretKey, amount.toFixed(), rewindNonce, privateNonce, new Uint8Array([]), message);
								
								if(bulletproof !== Secp256k1Zkp.OPERATION_FAILED) {
								
									// Securely clear secret key
									secretKey.fill(0);
									
									// Securely clear rewind nonce
									rewindNonce.fill(0);
								
									// Securely clear private nonce
									privateNonce.fill(0);
								
									// Resolve bulletproof
									resolve(bulletproof);
								}
								
								// Otherwise
								else {
								
									// Securely clear secret key
									secretKey.fill(0);
								
									// Securely clear rewind nonce
									rewindNonce.fill(0);
								
									// Securely clear private nonce
									privateNonce.fill(0);
								
									// Reject error
									reject("Getting bulletproof failed.");
								}
								
							// Catch errors
							}).catch(function(error) {
							
								// Securely clear secret key
								secretKey.fill(0);
							
								// Securely clear rewind nonce
								rewindNonce.fill(0);
							
								// Reject error
								reject(error);
							});
						
						// Catch errors
						}).catch(function(error) {
						
							// Securely clear secret key
							secretKey.fill(0);
						
							// Reject error
							reject(error);
						});
					
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Derive secret key
		static deriveSecretKey(extendedPrivateKey, amount, identifier, switchType) {
			
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Initialize paths
				var paths = new Uint32Array(identifier.getDepth());
				
				// Go through all the identifier's paths
				for(var i = 0; i < identifier.getDepth(); ++i) {
				
					// Set path to identifier's path
					paths[i] = identifier.getPaths()[i];
				}
				
				// Return deriving the child key at the path from the extended private key
				return Crypto.deriveChildKey(extendedPrivateKey, paths).then(function(childKey) {
				
					// Get secret key from the child key
					var secretKey = new Uint8Array(childKey.subarray(0, Crypto.SECP256K1_SECRET_KEY_LENGTH));
					
					// Securely clear child key
					childKey.fill(0);
					
					// Check if switch type is none
					if(switchType === Crypto.SWITCH_TYPE_NONE)
					
						// Resolve secret key
						resolve(secretKey);
					
					// Otherwise check if switch type is regular
					else if(switchType === Crypto.SWITCH_TYPE_REGULAR) {
					
						// Check if getting blind switch of secret key and amount failed
						var blindSwitch = Secp256k1Zkp.blindSwitch(secretKey, amount.toFixed());
						
						if(blindSwitch === Secp256k1Zkp.OPERATION_FAILED) {
						
							// Securely clear secret key
							secretKey.fill(0);
						
							// Reject error
							reject("Performing blind switch failed.");
							
							// Return
							return;
						}
						
						// Securely clear secret key
						secretKey.fill(0);
						
						// Check if blind switch is a valid secret key
						if(Secp256k1Zkp.isValidSecretKey(blindSwitch) === true) {
					
							// Resolve blind switch
							resolve(blindSwitch);
						}
						
						// Otherwise
						else {
						
							// Securely clear blind switch
							blindSwitch.fill(0);
						
							// Reject error
							reject("Blind switch isn't a valid secret key.");
						}
					}
					
					// Otherwise
					else {
					
						// Securely clear secret key
						secretKey.fill(0);
					
						// Reject error
						reject("Invalid switch type.");
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Signature message
		static signatureMessage(data) {
		
			// Check if creating message was successful
			var message = Blake2b.compute(Crypto.SINGLE_SIGNER_MESSAGE_LENGTH, data, new Uint8Array([]));
			
			if(message !== Blake2b.OPERATION_FAILED) {
			
				// Return message
				return message;
			}
			
			// Otherwise
			else {
			
				// Throw error
				throw "Creating signature message failed.";
			}
		}
		
		// Root public key
		static rootPublicKey(extendedPrivateKey) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Get secret key from extended private key
				var secretKey = extendedPrivateKey.subarray(0, Crypto.SECP256K1_SECRET_KEY_LENGTH);
				
				// Check if getting public key from secret key was successful
				var publicKey = Secp256k1Zkp.publicKeyFromSecretKey(secretKey);
				
				if(publicKey !== Secp256k1Zkp.OPERATION_FAILED) {
				
					// Resolve public key
					resolve(publicKey);
				}
				
				// Otherwise
				else {
				
					// Reject error
					reject("Getting public key failed.");
				}
			});
		}
		
		// Address key
		static addressKey(extendedPrivateKey, index) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Check wallet type
				switch(Consensus.getWalletType()) {
				
					// MWC wallet
					case Consensus.MWC_WALLET_TYPE:
			
						// Return deriving root key from extended private key, address key amount, root identifier, and regular switch type
						return Crypto.deriveSecretKey(extendedPrivateKey, Crypto.ADDRESS_KEY_AMOUNT, new Identifier(Identifier.ROOT_SERIALIZED_IDENTIFIER), Crypto.SWITCH_TYPE_REGULAR).then(function(rootKey) {
						
							// Return creating crypto key from address key seed
							return crypto["subtle"].importKey("raw", (new TextEncoder()).encode(Crypto.ADDRESS_KEY_SEED), {
							
								// Name
								"name": Crypto.ADDRESS_KEY_ENCRYPTION_ALGORITHM,
								
								// Hash
								"hash": {
								
									// Name
									"name": Crypto.ADDRESS_KEY_DIGEST_ALGORITHM
								}
							}, false, [
							
								// Sign
								"sign"
							
							]).then(function(cryptoKey) {
							
								// Return creating address extended private key from signing the root key
								return crypto["subtle"].sign(Crypto.ADDRESS_KEY_ENCRYPTION_ALGORITHM, cryptoKey, rootKey).then(function(addressExtendedPrivateKey) {
								
									// Securely clear root key
									rootKey.fill(0);
								
									// Get address extended private key in correct format
									addressExtendedPrivateKey = new Uint8Array(addressExtendedPrivateKey);
									
									// Get secret key and chain code from address extended private key
									var secretKey = addressExtendedPrivateKey.subarray(0, Crypto.SECP256K1_SECRET_KEY_LENGTH);
									var chainCode = addressExtendedPrivateKey.subarray(Crypto.CHAIN_CODE_LENGTH);
									
									// Check if secret key is a valid secret key
									if(Secp256k1Zkp.isValidSecretKey(secretKey) === true) {
									
										// Return updating the next secret key and chain code using the index
										return Crypto.deriveSecretKeyAndChainCode(secretKey, chainCode, index).then(function(value) {
										
											// Securely clear address extended private key
											addressExtendedPrivateKey.fill(0);
											
											// Securely clear the chain code
											value[Crypto.CHAIN_CODE_INDEX].fill(0);
										
											// Resolve the secret key
											resolve(value[Crypto.SECRET_KEY_INDEX]);
										
										// Catch errors
										}).catch(function(error) {
										
											// Securely clear address extended private key
											addressExtendedPrivateKey.fill(0);
										
											// Reject error
											reject(error);
										});
									}
									
									// Otherwise
									else {
									
										// Securely clear address extended private key
										addressExtendedPrivateKey.fill(0);
									
										// Reject error
										reject("Secret key is not a valid secret key.");
									}
								
								// Catch errors
								}).catch(function(error) {
								
									// Securely clear root key
									rootKey.fill(0);
								
									// Reject error
									reject(error);
								});
							
							// Catch errors
							}).catch(function(error) {
							
								// Securely clear root key
								rootKey.fill(0);
							
								// Reject error
								reject(error);
							});
						
						// Catch errors
						}).catch(function(error) {
						
							// Reject error
							reject(error);
						});
					
					// GRIN or EPIC wallet
					case Consensus.GRIN_WALLET_TYPE:
					case Consensus.EPIC_WALLET_TYPE:
					
						// Create child identifier
						var childIdentifier = new Identifier().getChild();
						childIdentifier.getPaths()[1] = 1;
						childIdentifier.getPaths()[childIdentifier.getDepth() - 1] = index;
						
						// Return deriving root key from extended private key, child identifier, and no switch type
						return Crypto.deriveSecretKey(extendedPrivateKey, new BigNumber(0), childIdentifier, Crypto.SWITCH_TYPE_NONE).then(function(rootKey) {
						
							// Check if getting secret key from root key was successful
							var secretKey = Blake2b.compute(Crypto.SECP256K1_SECRET_KEY_LENGTH, rootKey, new Uint8Array([]));
							
							if(secretKey !== Blake2b.OPERATION_FAILED) {
							
								// Securely clear root key
								rootKey.fill(0);
							
								// Check if secret key is a valid secret key
								if(Secp256k1Zkp.isValidSecretKey(secretKey) === true) {
							
									// Resolve the secret key
									resolve(secretKey);
								}
								
								// Otherwise
								else {
								
									// Securely clear secret key
									secretKey.fill(0);
									
									// Reject error
									reject("Secret key is not a valid secret key.");
								}
							}
							
							// Otherwise
							else {
							
								// Securely clear root key
								rootKey.fill(0);
							
								// Reject error
								reject("Getting secret key from root key failed.");
							}
						
						// Catch errors
						}).catch(function(error) {
						
							// Reject error
							reject(error);
						});
				}
			});
		}
		
		// Login key
		static loginKey(extendedPrivateKey) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Create child identifier
				var childIdentifier = new Identifier().getChild();
				childIdentifier.getPaths()[1] = 2;
				
				// Return deriving root key from extended private key, child identifier, and no switch type
				return Crypto.deriveSecretKey(extendedPrivateKey, new BigNumber(0), childIdentifier, Crypto.SWITCH_TYPE_NONE).then(function(rootKey) {
				
					// Check if getting secret key from root key was successful
					var secretKey = Blake2b.compute(Crypto.SECP256K1_SECRET_KEY_LENGTH, rootKey, new Uint8Array([]));
					
					if(secretKey !== Blake2b.OPERATION_FAILED) {
					
						// Securely clear root key
						rootKey.fill(0);
					
						// Check if secret key is a valid secret key
						if(Secp256k1Zkp.isValidSecretKey(secretKey) === true) {
					
							// Resolve the secret key
							resolve(secretKey);
						}
						
						// Otherwise
						else {
						
							// Securely clear secret key
							secretKey.fill(0);
							
							// Reject error
							reject("Secret key is not a valid secret key.");
						}
					}
					
					// Otherwise
					else {
					
						// Securely clear root key
						rootKey.fill(0);
					
						// Reject error
						reject("Getting secret key from root key failed.");
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// AES decrypt
		static aesDecrypt(encryptedData, key) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Return importing the key
				return crypto["subtle"].importKey("raw", key, {
				
					// Name
					"name": Crypto.AES_ALGORITHM
				
				}, false, [
				
					// Decrypt
					"decrypt"
				
				]).then(function(cryptoKey) {
				
					// Return decrypting the encrypted data using the AES key
					return crypto["subtle"].decrypt({
					
						// Name
						"name": Crypto.AES_ALGORITHM,
						
						// Initialization vector
						"iv": (new Uint8Array(Crypto.AES_INITIALIZATION_VECTOR_SIZE)).fill(0)
						
					}, cryptoKey, encryptedData).then(function(decryptedData) {
					
						// TODO Securely clear cryptoKey
					
						// Resolve decrypted data
						resolve(new Uint8Array(decryptedData));
						
					// Catch errors
					}).catch(function(error) {
					
						// TODO Securely clear cryptoKey
					
						// Reject error
						reject(error);
					});
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Switch type none
		static get SWITCH_TYPE_NONE() {
		
			// Return switch type none
			return 0;
		}

		// Switch type regular
		static get SWITCH_TYPE_REGULAR() {
		
			// Return switch type regular
			return Crypto.SWITCH_TYPE_NONE + 1;
		}
		
		// Secp256k1 secret key length
		static get SECP256K1_SECRET_KEY_LENGTH() {
		
			// Return secp256k1 secret key length
			return 32;
		}
		
		// Secp256k1 public key length
		static get SECP256K1_PUBLIC_KEY_LENGTH() {
		
			// Return secp256k1 public key length
			return 33;
		}
		
		// Blinding factor length
		static get BLINDING_FACTOR_LENGTH() {
		
			// Return blinding factor length
			return 32;
		}
		
		// Commit length
		static get COMMIT_LENGTH() {
		
			// Return commit length
			return 33;
		}
		
		// Single-signer signature length
		static get SINGLE_SIGNER_SIGNATURE_LENGTH() {
		
			// Return single-signer signature length
			return 64;
		}
		
		// Single-signer message length
		static get SINGLE_SIGNER_MESSAGE_LENGTH() {
		
			// Return single-signer message length
			return 32;
		}
		
		// Proof length
		static get PROOF_LENGTH() {
		
			// Return proof length
			return 675;
		}
		
		// Zero blinding factor
		static get ZERO_BLINDING_FACTOR() {
		
			// No zero blinding factor
			return (new Uint8Array(Crypto.BLINDING_FACTOR_LENGTH)).fill(0);
		}
		
		// Zero secret key
		static get ZERO_SECRET_KEY() {
		
			// No zero blinding factor
			return (new Uint8Array(Crypto.SECP256K1_SECRET_KEY_LENGTH)).fill(0);
		}
		
		// Ed25519 secret key length
		static get ED25519_SECRET_KEY_LENGTH() {
		
			// Return Ed25519 secret key length
			return 32;
		}
		
		// Ed25519 public key length
		static get ED25519_PUBLIC_KEY_LENGTH() {
		
			// Return Ed25519 public key length
			return 32;
		}
		
		// X25519 secret key length
		static get X25519_SECRET_KEY_LENGTH() {
		
			// Return X25519 secret key length
			return 32;
		}
		
		// X25519 public key length
		static get X25519_PUBLIC_KEY_LENGTH() {
		
			// Return X25519 public key length
			return 32;
		}
		
		// Ed25519 signature length
		static get ED25519_SIGNATURE_LENGTH() {
		
			// Return Ed25519 signature length
			return 64;
		}
		
		// Maximum message hash signature length
		static get MAXIMUM_MESSAGE_HASH_SIGNATURE_LENGTH() {
		
			// Return maximum message hash signature length
			return 72;
		}
		
		// Nonce length
		static get NONCE_LENGTH() {
		
			// Return nonce length
			return 32;
		}
		
		// Tau x length
		static get TAU_X_LENGTH() {
		
			// Return tau x length
			return 32;
		}
		
		// AES key length
		static get AES_KEY_LENGTH() {
		
			// Return AES key length
			return 32;
		}
		
	// Private

		// Derive secret key and chain code
		static deriveSecretKeyAndChainCode(secretKey, chainCode, path, useBip39 = false) {
		
			// Return promise
			return new Promise(function(resolve, reject) {

				// Return creating crypto key from chain code
				return crypto["subtle"].importKey("raw", chainCode, {
				
					// Name
					"name": Crypto.CHAIN_CODE_ENCRYPTION_ALGORITHM,
					
					// Hash
					"hash": {
					
						// Name
						"name": Crypto.CHAIN_CODE_DIGEST_ALGORITHM
					}
				}, false, [
				
					// Sign
					"sign"
				
				]).then(function(cryptoKey) {
				
					// Check if path is hardened
					if(Identifier.isPathHardened(path) === true) {
					
						// Get hash value from secret key
						var hashValue = Common.mergeArrays([
						
							// Zero
							new Uint8Array([0]),
							
							// Secret key
							secretKey
						]);
					}
					
					// Otherwise
					else {
					
						// Check if getting hash value as public key from secret key failed
						var hashValue = Secp256k1Zkp.publicKeyFromSecretKey(secretKey);
						
						if(hashValue === Secp256k1Zkp.OPERATION_FAILED) {
						
							// TODO Securely clear cryptoKey
						
							// Reject error
							reject("Getting public key from secret key failed.");
							
							// Return
							return;
						}
					}
					
					// Create secret key and chain code
					var createSecretKeyAndChainCode = function(hashValueCandidate) {
					
						// Return promise
						return new Promise(function(resolve, reject) {
					
							// Append path to hash value candidate
							var pathBuffer = new ArrayBuffer(Uint32Array["BYTES_PER_ELEMENT"]);
							
							var pathBufferView = new DataView(pathBuffer);
							pathBufferView.setUint32(0, path, false);
							
							var newHashValue = Common.mergeArrays([
							
								// Hash value candidate
								hashValueCandidate,
								
								// Path
								new Uint8Array(pathBuffer)
							]);
							
							// Securely clear hash value candidate
							hashValueCandidate.fill(0);
							
							// Return creating new extended private key from signing the new hash value
							return crypto["subtle"].sign(Crypto.CHAIN_CODE_ENCRYPTION_ALGORITHM, cryptoKey, newHashValue).then(function(extendedPrivateKey) {
							
								// Securely clear new hash value
								newHashValue.fill(0);
							
								// Get extended private key in correct format
								extendedPrivateKey = new Uint8Array(extendedPrivateKey);
								
								// Get new secret key from the extended private key
								var newSecretKey = extendedPrivateKey.subarray(0, Crypto.SECP256K1_SECRET_KEY_LENGTH);
								
								// Check if new secret key is a valid secret key or using BIP39 and new secret key is zero
								if(Secp256k1Zkp.isValidSecretKey(newSecretKey) === true || (useBip39 === true && Common.arraysAreEqualTimingSafe(newSecretKey, Crypto.ZERO_SECRET_KEY) === true)) {
								
									// Check if adding old secret key to the new secret key was successful
									var updatedSecretKey = Secp256k1Zkp.secretKeyTweakAdd(newSecretKey, secretKey);
									
									if(updatedSecretKey !== Secp256k1Zkp.OPERATION_FAILED) {
									
										// Get updated chain code from the extended private key
										var updatedChainCode = new Uint8Array(extendedPrivateKey.subarray(Crypto.SECP256K1_SECRET_KEY_LENGTH));
										
										// Securely clear extended private key
										extendedPrivateKey.fill(0);
										
										// Resolve new extended private key
										resolve([
										
											// Updated secret key
											updatedSecretKey,
											
											// Updated chain code
											updatedChainCode
										]);
									}
									
									// Otherwise
									else {
									
										// Check if using BIP39
										if(useBip39 === true) {
										
											// Set next hash value candidate
											var nextHashValueCandidate = Common.mergeArrays([
											
												// One
												new Uint8Array([1]),
												
												// New chain code
												extendedPrivateKey.subarray(Crypto.SECP256K1_SECRET_KEY_LENGTH)
											]);
											
											// Securely clear extended private key
											extendedPrivateKey.fill(0);
											
											// Return creating secret key and chain code
											return createSecretKeyAndChainCode(nextHashValueCandidate).then(function(secretKeyAndChainCode) {
											
												// Resolve secret key and chain code
												resolve(secretKeyAndChainCode);
											
											// Catch error
											}).catch(function(error) {
											
												// Reject error
												reject(error);
											});
										}
										
										// Otherwise
										else {
									
											// Securely clear extended private key
											extendedPrivateKey.fill(0);
										
											// Reject error
											reject("Performing secret key tweak add failed.");
										}
									}
								}
						
								// Otherwise
								else {
								
									// Check if using BIP39
									if(useBip39 === true) {
									
										// Set next hash value candidate
										var nextHashValueCandidate = Common.mergeArrays([
										
											// One
											new Uint8Array([1]),
											
											// New chain code
											extendedPrivateKey.subarray(Crypto.SECP256K1_SECRET_KEY_LENGTH)
										]);
										
										// Securely clear extended private key
										extendedPrivateKey.fill(0);
										
										// Return creating secret key and chain code
										return createSecretKeyAndChainCode(nextHashValueCandidate).then(function(secretKeyAndChainCode) {
										
											// Resolve secret key and chain code
											resolve(secretKeyAndChainCode);
										
										// Catch error
										}).catch(function(error) {
										
											// Reject error
											reject(error);
										});
									}
									
									// Otherwise
									else {
									
										// Securely clear extended private key
										extendedPrivateKey.fill(0);
									
										// Reject error
										reject("New secret key isn't a valid secret key or using BIP39 and new secret key isn't zero.");
									}
								}
							
							// Catch errors
							}).catch(function(error) {
							
								// Securely clear new hash value
								newHashValue.fill(0);
							
								// Reject error
								reject("Creating new extended private key failed.");
							});
						});
					};
					
					// Return creating secret key and chain code
					return createSecretKeyAndChainCode(hashValue).then(function(secretKeyAndChainCode) {
					
						// TODO Securely clear cryptoKey
					
						// Resolve secret key and chain code
						resolve(secretKeyAndChainCode);
						
					// Catch errors
					}).catch(function(error) {
					
						// TODO Securely clear cryptoKey
					
						// Reject error
						reject(error);
					});
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject("Creating crypto key failed.");
				});
			});
		}
		
		// Chain code length
		static get CHAIN_CODE_LENGTH() {
		
			// Return chain code length
			return 32;
		}
		
		// Secret key index
		static get SECRET_KEY_INDEX() {
		
			// Return secret key index
			return 0;
		}

		// Chain code index
		static get CHAIN_CODE_INDEX() {
		
			// Return chain code index
			return Crypto.SECRET_KEY_INDEX + 1;
		}
		
		// Chain code encryption algorithm
		static get CHAIN_CODE_ENCRYPTION_ALGORITHM() {
		
			// Return chain code encryption algorithm
			return "HMAC";
		}

		// Chain code digest algorithm
		static get CHAIN_CODE_DIGEST_ALGORITHM() {
		
			// Return chain code digest algorithm
			return "SHA-512";
		}
		
		// Address key amount
		static get ADDRESS_KEY_AMOUNT() {
		
			// Return address key amount
			return new BigNumber(713);
		}
		
		// Address key seed
		static get ADDRESS_KEY_SEED() {
		
			// Return address key seed
			return "Grinbox_seed";
		}
		
		// Address key encryption algorithm
		static get ADDRESS_KEY_ENCRYPTION_ALGORITHM() {
		
			// Return address key encryption algorithm
			return "HMAC";
		}

		// Address key digest algorithm
		static get ADDRESS_KEY_DIGEST_ALGORITHM() {
		
			// Return address key digest algorithm
			return "SHA-512";
		}
		
		// AES algorithm
		static get AES_ALGORITHM() {
		
			// Return AES algorithm
			return "AES-CBC";
		}
		
		// AES initialization vector size
		static get AES_INITIALIZATION_VECTOR_SIZE() {
		
			// Return AES initialization vector size
			return 16;
		}
}


// Main function

// Set global object's crypto
globalThis["Crypto"] = Crypto;

// Export crypto
module["exports"] = Crypto;
