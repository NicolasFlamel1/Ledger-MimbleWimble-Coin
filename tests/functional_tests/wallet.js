// Use strict
"use strict";


// Classes

// Wallet class
class Wallet {

	// Public
	
		// Initialize
		static initialize() {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Get the saved password pepper
				var currentPasswordPepper = localStorage.getItem(Wallet.PASSWORD_PEPPER_LOCAL_STORAGE_NAME);
				
				// Check if password pepper doesn't exist or isn't valid
				if(currentPasswordPepper === Common.INVALID_LOCAL_STORAGE_ITEM || Common.isHexString(currentPasswordPepper) === false) {
			
					// Create password pepper
					var passwordPepper = new Uint8Array(Wallet.PASSWORD_PEPPER_LENGTH);
					
					// Fill password pepper with random values
					crypto.getRandomValues(passwordPepper);
				
					// Try
					try {
					
						// Save password pepper
						localStorage.setItem(Wallet.PASSWORD_PEPPER_LOCAL_STORAGE_NAME, Common.toHexString(passwordPepper));
					}
					
					// Catch errors
					catch(error) {
					
						// Reject
						reject();
						
						// Return
						return;
					}
				}
				
				// Resolve
				resolve();
			});
		}
		
		// Constructor
		constructor(name, color, salt, initializationVector, numberOfIterations, encryptedSeed, addressSuffix, order, syncedHeight, spentAmount, unspentAmount, unconfirmedAmount, lockedAmount, pendingAmount, expiredAmount, walletType, networkType, lastIdentifier, hardwareType, encryptedRootPublicKey, useBip39, encryptedBip39Salt, accountNumber, paymentProofIndex, keyPath) {
		
			// Set performing address suffix operation
			this.setPerformingAddressSuffixOperation(false);
			
			// Set address suffix verified
			this.setAddressSuffixVerified(false);
			
			// Set syncing status to syncing
			this.setSyncingStatus(Wallet.STATUS_SYNCING);
			
			// Set last sync index
			this.setLastSyncIndex(Wallet.NO_SYNC_INDEX);
			
			// Set starting sync height
			this.setStartingSyncHeight(Wallet.CURRENT_HEIGHT);
			
			// Set seed to no seed
			this.seed = Wallet.NO_SEED;
			
			// Set root public key to no root public key
			this.rootPublicKey = Wallet.NO_ROOT_PUBLIC_KEY;
			
			// Set extended private key to no extended private key
			this.extendedPrivateKey = Wallet.NO_EXTENDED_PRIVATE_KEY;
			
			// Set hardware wallet to no hardware wallet
			this.hardwareWallet = Wallet.NO_HARDWARE_WALLET;
			
			// Set BIP39 salt to no BIP39 salt
			this.bip39Salt = Wallet.NO_BIP39_SALT;
			
			// Set percent synced
			this.setPercentSynced(new BigNumber(Wallets.MINIMUM_PERCENT));
			
			// Check if parameters are provided
			if(typeof name !== "undefined") {
			
				// Set name
				this.setName(name);
				
				// Set color
				this.setColor(color);
				
				// Set salt
				this.setSalt(salt);
				
				// Set initialization vector
				this.setInitializationVector(initializationVector);
				
				// Set number of iterations
				this.setNumberOfIterations(numberOfIterations);
				
				// Set encrypted seed
				this.setEncryptedSeed(encryptedSeed);
				
				// Set address sv
				this.setAddressSuffix(addressSuffix);
				
				// Set order
				this.setOrder(order);
				
				// Set synced height
				this.setSyncedHeight(syncedHeight);
				
				// Set spent amount
				this.setSpentAmount(spentAmount);
				
				// Set unspent amount
				this.setUnspentAmount(unspentAmount);
				
				// Set unconfirmed amount
				this.setUnconfirmedAmount(unconfirmedAmount);
				
				// Set locked amount
				this.setLockedAmount(lockedAmount);
				
				// Set pending amount
				this.setPendingAmount(pendingAmount);
				
				// Set expired amount
				this.setExpiredAmount(expiredAmount);
				
				// Set wallet type
				this.setWalletType(walletType);
				
				// Set network type
				this.setNetworkType(networkType);
				
				// Set last identifier
				this.setLastIdentifier(lastIdentifier);
				
				// Set hardware type
				this.setHardwareType(hardwareType);
				
				// Set encrypted root public key
				this.setEncryptedRootPublicKey(encryptedRootPublicKey);
				
				// Set use BIP39
				this.setUseBip39(useBip39);
				
				// Set encrypted BIP39 salt
				this.setEncryptedBip39Salt(encryptedBip39Salt);
				
				// Set account number
				this.setAccountNumber(accountNumber);
				
				// Set payment proof index
				this.setPaymentProofIndex(paymentProofIndex);
				
				// Set key path
				this.setKeyPath(keyPath);
				
				// Set starting sync height
				this.setStartingSyncHeight(syncedHeight);
			}
		}
		
		// Initialize
		initialize(name, password, walletType, networkType, syncedHeight, syncingStatus, hardwareWallet, passphrase, useBip39, bip39Salt, existingWallets = []) {
		
			// Set name
			this.setName(name);
			
			// Set color to random color
			this.setColor(Wallet.getRandomColor());
			
			// Set salt to a random salt
			this.setSalt(crypto.getRandomValues(new Uint8Array(Wallet.SALT_LENGTH)));
			
			// Set initialization vector to a random initialization vector
			this.setInitializationVector(crypto.getRandomValues(new Uint8Array(Wallet.INITIALIZATION_VECTOR_LENGTH)));
			
			// Set number of iterations
			this.setNumberOfIterations(Wallet.DEFAULT_NUMBER_OF_ITERATIONS);
			
			// Set address suffix
			this.setAddressSuffix(Wallet.NO_ADDRESS_SUFFIX);
			
			// Set order
			this.setOrder(Wallet.NO_ORDER);
			
			// Set synced height
			this.setSyncedHeight(syncedHeight);
			
			// Set spent amount
			this.setSpentAmount(new BigNumber(0));
			
			// Set unspent amount
			this.setUnspentAmount(new BigNumber(0));
			
			// Set unconfirmed amount
			this.setUnconfirmedAmount(new BigNumber(0));
			
			// Set locked amount
			this.setLockedAmount(new BigNumber(0));
			
			// Set pending amount
			this.setPendingAmount(new BigNumber(0));
			
			// Set expired amount
			this.setExpiredAmount(new BigNumber(0));
			
			// Set wallet type
			this.setWalletType(walletType);
			
			// Set network type
			this.setNetworkType(networkType);
			
			// Set last identifier
			this.setLastIdentifier(Wallet.NO_LAST_IDENTIFIER);
			
			// Set hardware type
			this.setHardwareType((hardwareWallet !== Wallet.NO_HARDWARE_WALLET) ? hardwareWallet.getHardwareType() : Wallet.NO_HARDWARE_TYPE);
			
			// Set account number
			this.setAccountNumber(0);
			
			// Set payment proof index
			this.setPaymentProofIndex(0);
			
			// Set key path to no key path
			this.setKeyPath(Wallet.NO_KEY_PATH);
			
			// Set starting sync height
			this.setStartingSyncHeight(syncedHeight);
			
			// Set syncing status
			this.setSyncingStatus(syncingStatus);
			
			// Set hardware wallet
			this.hardwareWallet = hardwareWallet;
			
			// Set use BIP39
			this.setUseBip39(useBip39);
			
			// Check if hardware wallet exists
			if(hardwareWallet !== Wallet.NO_HARDWARE_WALLET) {
			
				// Set hardware wallet's wallet key path
				hardwareWallet.setWalletKeyPath(Wallet.NO_KEY_PATH);
			}
			
			// Set self
			var self = this;
			
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Check if wallet isn't a hardware wallet
				if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
				
					// Set seed to a new seed
					self.seed = new Seed();
			
					// Return initializing seed
					return self.seed.initialize((passphrase !== Wallet.NO_PASSPHRASE) ? passphrase : Seed.DEFAULT_SEED_LENGTH, (passphrase !== Wallet.NO_PASSPHRASE) ? [] : existingWallets.map(function(existingWallet) {
					
						// Check if existing wallet isn't a hardware wallet and doesn't use BIP39
						if(existingWallet.getHardwareType() === Wallet.NO_HARDWARE_TYPE && existingWallet.getUseBip39() === false) {
						
							// Return existing wallet's seed
							return existingWallet.seed;
						}
						
						// Otherwise
						else {
						
							// Return new seed
							return new Seed();
						}
						
					})).then(function() {
					
						// Set BIP39 salt
						self.bip39Salt = bip39Salt;
					
						// Return encrypting seed and BIP39 salt
						return self.encryptSeedAndBip39Salt(password, self.getSalt(), self.getNumberOfIterations(), self.getInitializationVector()).then(function(encryptedSeedAndBip39Salt) {
					
							// Set encrypted seed to the encrypted seed
							self.setEncryptedSeed(encryptedSeedAndBip39Salt[Wallet.ENCRYPT_SEED_AND_BIP39_SALT_ENCRYPTED_SEED_INDEX]);
							
							// Set encrypted root public key to no encrypted root public key
							self.setEncryptedRootPublicKey(Wallet.NO_ENCRYPTED_ROOT_PUBLIC_KEY);
							
							// Set encrypted BIP39 salt to the encrypted BIP39 salt
							self.setEncryptedBip39Salt(encryptedSeedAndBip39Salt[Wallet.ENCRYPT_SEED_AND_BIP39_SALT_ENCRYPTED_BIP39_SALT_INDEX]);
							
							// Return getting extended private key from seed
							return self.seed.getExtendedPrivateKey(Wallet.SEED_KEY, self.getUseBip39(), self.bip39Salt).then(function(extendedPrivateKey) {
							
								// Set extended private key
								self.extendedPrivateKey = extendedPrivateKey;
								
								// Return getting root public key
								return self.getRootPublicKey().then(function(rootPublicKey) {
								
									// Initialize get existing root public keys
									var getExistingRootPublicKeys = [];
									
									// Initialize existing root public key
									var existingRootPublicKeys = [];
									
									// Go through all existing wallets
									for(var i = 0; i < existingWallets["length"]; ++i) {
									
										// Get existing wallet
										let existingWallet = existingWallets[i];
										
										// Append getting existing wallet's root public key to list
										getExistingRootPublicKeys.push(new Promise(function(resolve, reject) {
										
											// Return getting existing wallet's root public key
											return existingWallet.getRootPublicKey().then(function(existingRootPublicKey) {
											
												// Append existing root public key to list
												existingRootPublicKeys.push(existingRootPublicKey);
											
												// Resolve
												resolve();
											
											// Catch errors
											}).catch(function(error) {
											
												// Reject error
												reject(error);
											});
										}));
									}
									
									// Return getting all existing root public keys
									return Promise.all(getExistingRootPublicKeys).then(function() {
									
										// Go through all existing root public keys
										for(var i = 0; i < existingRootPublicKeys["length"]; ++i) {
										
											// Check if root public key already exists
											if(Common.arraysAreEqualTimingSafe(rootPublicKey, existingRootPublicKeys[i]) === true) {
											
												// Go through all remaining existing root public keys
												for(var j = i; j < existingRootPublicKeys["length"]; ++j) {
												
													// Securely clear existing root public key
													existingRootPublicKeys[j].fill(0);
												}
											
												// Securely clear the root public key
												rootPublicKey.fill(0);
											
												// Close
												self.close();
											
												// Reject error
												reject(Language.getDefaultTranslation('A wallet with the same passphrase already exists in your list of wallets.'));
												
												// Return
												return;
											}
											
											// Securely clear existing root public key
											existingRootPublicKeys[i].fill(0);
										}
										
										// Securely clear the root public key
										rootPublicKey.fill(0);
										
										// Resolve
										resolve();
										
									// Catch errors
									}).catch(function(error) {
									
										// Go through all existing root public keys
										for(var i = 0; i < existingRootPublicKeys["length"]; ++i) {
										
											// Securely clear existing root public key
											existingRootPublicKeys[i].fill(0);
										}
									
										// Securely clear the root public key
										rootPublicKey.fill(0);
									
										// Close
										self.close();
									
										// Reject error
										reject(Language.getDefaultTranslation('Creating wallet failed.'));
									});
									
								// Catch errors
								}).catch(function(error) {
								
									// Close
									self.close();
									
									// Reject error
									reject(Language.getDefaultTranslation('Creating wallet failed.'));
								});
							
							// Catch errors
							}).catch(function(error) {
							
								// Close
								self.close();
								
								// Reject error
								reject(Language.getDefaultTranslation('Creating wallet failed.'));
							});
							
						// Catch errors
						}).catch(function(error) {
						
							// Close
							self.close();
						
							// Reject error
							reject(Language.getDefaultTranslation('Creating wallet failed.'));
						});
						
					// Catch errors
					}).catch(function(error) {
					
						// Close
						self.close();
						
						// Check if a passphrase was used
						if(passphrase !== Wallet.NO_PASSPHRASE) {
						
							// Reject error
							reject(Language.getDefaultTranslation('Invalid passphrase.'));
						}
						
						// Otherwise
						else {
			
							// Reject error
							reject(Language.getDefaultTranslation('Creating wallet failed.'));
						}
					});
				}
				
				// Otherwise
				else {
				
					// Check if hardware is connected
					if(self.isHardwareConnected() === true) {
					
						// Set that hardware wallet is in use
						self.getHardwareWallet().setInUse(true);
						
						// Hardware wallet on hardware disconnect event
						$(self.getHardwareWallet()).one(HardwareWallet.DISCONNECT_EVENT, function() {
						
							// Check if hardware wallet exists
							if(self.getHardwareWallet() !== Wallet.NO_HARDWARE_WALLET) {
						
								// Close hardware wallet
								self.getHardwareWallet().close();
							
								// Set hardware wallet to no hardware wallet
								self.hardwareWallet = Wallet.NO_HARDWARE_WALLET;
							}
							
							// Check if key path exists
							if(self.getKeyPath() !== Wallet.NO_KEY_PATH) {
							
								// Trigger wallet disconnect event
								$(document).trigger(Wallet.DISCONNECT_EVENT, [
								
									// Key path
									self.getKeyPath()
								]);
							}
						});
					}
					
					// Otherwise
					else {
					
						// Check if hardware wallet exists
						if(self.getHardwareWallet() !== Wallet.NO_HARDWARE_WALLET) {
					
							// Close hardware wallet
							self.getHardwareWallet().close();
						
							// Set hardware wallet to no hardware wallet
							self.hardwareWallet = Wallet.NO_HARDWARE_WALLET;
						}
					}
					
					// Initialize root public key candidate
					var rootPublicKeyCandidate = hardwareWallet.getRootPublicKey();
					
					// Initialize get existing root public keys
					var getExistingRootPublicKeys = [];
					
					// Initialize existing root public key
					var existingRootPublicKeys = [];
					
					// Go through all existing wallets
					for(var i = 0; i < existingWallets["length"]; ++i) {
					
						// Get existing wallet
						let existingWallet = existingWallets[i];
						
						// Append getting existing wallet's root public key to list
						getExistingRootPublicKeys.push(new Promise(function(resolve, reject) {
						
							// Return getting existing wallet's root public key
							return existingWallet.getRootPublicKey().then(function(existingRootPublicKey) {
							
								// Append existing root public key to list
								existingRootPublicKeys.push(existingRootPublicKey);
							
								// Resolve
								resolve();
							
							// Catch errors
							}).catch(function(error) {
							
								// Reject error
								reject(error);
							});
						}));
					}
					
					// Return getting all existing root public keys
					return Promise.all(getExistingRootPublicKeys).then(function() {
					
						// Go through all existing root public keys
						for(var i = 0; i < existingRootPublicKeys["length"]; ++i) {
						
							// Check if root public key already exists
							if(Common.arraysAreEqualTimingSafe(rootPublicKeyCandidate, existingRootPublicKeys[i]) === true) {
							
								// Go through all remaining existing root public keys
								for(var j = i; j < existingRootPublicKeys["length"]; ++j) {
								
									// Securely clear existing root public key
									existingRootPublicKeys[j].fill(0);
								}
							
								// Securely clear the root public key candidate
								rootPublicKeyCandidate.fill(0);
							
								// Close
								self.close();
							
								// Reject error
								reject(Language.getDefaultTranslation('A wallet with the same root public key already exists in your list of wallets.'));
								
								// Return
								return;
							}
							
							// Securely clear existing root public key
							existingRootPublicKeys[i].fill(0);
						}
						
						// Set root public key
						self.rootPublicKey = rootPublicKeyCandidate;
						
						// Return encrypting root public key
						return self.encryptRootPublicKey(password, self.getSalt(), self.getNumberOfIterations(), self.getInitializationVector()).then(function(encryptedRootPublicKey) {
					
							// Set encrypted seed to no encrypted seed
							self.setEncryptedSeed(Wallet.NO_ENCRYPTED_SEED);
							
							// Set encrypted root public key to encrypted root public key
							self.setEncryptedRootPublicKey(encryptedRootPublicKey);
							
							// Set encrypted BIP39 salt to no encrypted BIP39 salt
							self.setEncryptedBip39Salt(Wallet.NO_ENCRYPTED_BIP39_SALT);
							
							// Resolve
							resolve();
							
						// Catch errors
						}).catch(function(error) {
						
							// Close
							self.close();
						
							// Reject error
							reject(Language.getDefaultTranslation('Creating wallet failed.'));
						});
					
					// Catch errors
					}).catch(function(error) {
					
						// Go through all existing root public keys
						for(var i = 0; i < existingRootPublicKeys["length"]; ++i) {
						
							// Securely clear existing root public key
							existingRootPublicKeys[i].fill(0);
						}
					
						// Securely clear the root public key candidate
						rootPublicKeyCandidate.fill(0);
					
						// Close
						self.close();
					
						// Reject error
						reject(Language.getDefaultTranslation('Creating wallet failed.'));
					});
				}
			});
		}
		
		// Open
		open(password) {
		
			// Set self
			var self = this;
			
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Check if wallet isn't a hardware wallet
				if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
			
					// Return decrypting seed and BIP39 salt
					return self.decryptSeedAndBip39Salt(password, self.getSalt(), self.getNumberOfIterations(), self.getInitializationVector()).then(function(decryptedSeedAndBip39Salt) {
					
						// Check if seed exists
						if(self.seed !== Wallet.NO_SEED) {
						
							// Uninitialize seed
							self.seed.uninitialize();
						}
			
						// Create seed
						self.seed = new Seed();
						
						// Check if BIP39 salt exists
						if(self.bip39Salt !== Wallet.NO_BIP39_SALT) {
						
							// Securely clear the BIP39 salt
							self.bip39Salt.fill(0);
						}
						
						// Set BIP39 salt
						self.bip39Salt = decryptedSeedAndBip39Salt[Wallet.DECRYPT_SEED_AND_BIP39_SALT_DECRYPTED_BIP39_SALT_INDEX];
						
						// Return initializing seed
						return self.seed.initialize(decryptedSeedAndBip39Salt[Wallet.DECRYPT_SEED_AND_BIP39_SALT_DECRYPTED_SEED_INDEX]).then(function() {
						
							// Return getting extended private key from seed
							return self.seed.getExtendedPrivateKey(Wallet.SEED_KEY, self.getUseBip39(), self.bip39Salt).then(function(extendedPrivateKey) {
							
								// Check if extended private key exists
								if(self.extendedPrivateKey !== Wallet.NO_EXTENDED_PRIVATE_KEY) {
								
									// Securely clear the extended private key
									self.extendedPrivateKey.fill(0);
								}
						
								// Set extended private key
								self.extendedPrivateKey = extendedPrivateKey;
								
								// Resolve
								resolve();
							
							// Catch errors
							}).catch(function(error) {
							
								// Close
								self.close();
								
								// Reject error
								reject(Language.getDefaultTranslation('Invalid wallet.'));
							});
							
						// Catch errors
						}).catch(function(error) {
						
							// Securely clear decrypted seed
							decryptedSeedAndBip39Salt[Wallet.DECRYPT_SEED_AND_BIP39_SALT_DECRYPTED_SEED_INDEX].fill(0);
							
							// Securely clear decrypted BIP39 salt
							decryptedSeedAndBip39Salt[Wallet.DECRYPT_SEED_AND_BIP39_SALT_DECRYPTED_BIP39_SALT_INDEX].fill(0);
						
							// Close
							self.close();
							
							// Reject error
							reject(Language.getDefaultTranslation('Invalid wallet.'));
						});
						
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(Language.getDefaultTranslation('Incorrect password.'));
					});
				}
				
				// Otherwise
				else {
				
					// Return decrypting root public key
					return self.decryptRootPublicKey(password, self.getSalt(), self.getNumberOfIterations(), self.getInitializationVector()).then(function(decryptedRootPublicKey) {
					
						// Check if root public key exists
						if(self.rootPublicKey !== Wallet.NO_ROOT_PUBLIC_KEY) {
						
							// Securely clear the root public key
							self.rootPublicKey.fill(0);
						}
						
						// Set root public key to decrypted root public key
						self.rootPublicKey = decryptedRootPublicKey;
						
						// Resolve
						resolve();
					
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(Language.getDefaultTranslation('Incorrect password.'));
					});
				}
			});
		}
		
		// Is open
		isOpen() {
		
			// Return if seed or root public key exist
			return this.seed !== Wallet.NO_SEED || this.rootPublicKey !== Wallet.NO_ROOT_PUBLIC_KEY;
		}
		
		// Close
		close() {
		
			// Check if seed exists
			if(this.seed !== Wallet.NO_SEED) {
			
				// Uninitialize seed
				this.seed.uninitialize();
		
				// Set seed to no seed
				this.seed = Wallet.NO_SEED;
			}
			
			// Check if root public key exists
			if(this.rootPublicKey !== Wallet.NO_ROOT_PUBLIC_KEY) {
			
				// Securely clear the root public key
				this.rootPublicKey.fill(0);
			
				// Set root public key to no root public key
				this.rootPublicKey = Wallet.NO_ROOT_PUBLIC_KEY;
			}
			
			// Check if extended private key exists
			if(this.extendedPrivateKey !== Wallet.NO_EXTENDED_PRIVATE_KEY) {
			
				// Securely clear the extended private key
				this.extendedPrivateKey.fill(0);
			
				// Set extended private key to no extended private key
				this.extendedPrivateKey = Wallet.NO_EXTENDED_PRIVATE_KEY;
			}
			
			// Check if hardware wallet exists
			if(this.getHardwareWallet() !== Wallet.NO_HARDWARE_WALLET) {
			
				// Close the hardware wallet
				this.getHardwareWallet().close();
			
				// Set hardware wallet to no hardware wallet
				this.hardwareWallet = Wallet.NO_HARDWARE_WALLET;
			}
			
			// Check if BIP39 salt exists
			if(this.bip39Salt !== Wallet.NO_BIP39_SALT) {
			
				// Securely clear the BIP39 salt
				this.bip39Salt.fill(0);
			
				// Set BIP39 salt to no BIP39 salt
				this.bip39Salt = Wallet.NO_BIP39_SALT;
			}
		}
		
		// Get passphrase
		getPassphrase() {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject(Language.getDefaultTranslation('The wallet is closed.'));
				}
				
				// Otherwise check if wallet is a hardware wallet
				else if(self.getHardwareType() !== Wallet.NO_HARDWARE_TYPE) {
				
					// Reject error
					reject(Language.getDefaultTranslation('Passphrases can\'t be retrieved from hardware wallets.'));
				}
				
				// Otherwise
				else {
				
					// Return getting seed's mnemonic
					return self.seed.getMnemonic().then(function(mnemonic) {
					
						// Check if BIP39 salt exists
						if(self.bip39Salt !== Wallet.NO_BIP39_SALT) {
						
							// Try
							try {
						
								// Resolve mnemonic with BIP39 salt
								resolve(mnemonic + " " + (new TextDecoder("utf-8", {"fatal": true})).decode(self.bip39Salt));
							}
							
							// Catch errors
							catch(error) {
							
								// Reject error
								reject(Language.getDefaultTranslation('Invalid wallet.'));
							}
						}
						
						// Otherwise
						else {
					
							// Resolve mnemonic
							resolve(mnemonic);
						}
					
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(Language.getDefaultTranslation('Invalid wallet.'));
					});
				}
			});
		}
		
		// Get root public key
		getRootPublicKey() {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
				
				// Otherwise check if wallet isn't a hardware wallet
				else if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
				
					// Return getting root public key
					return Crypto.rootPublicKey(self.extendedPrivateKey).then(function(rootPublicKey) {
					
						// Resolve root public key
						resolve(rootPublicKey);
					
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject("Invalid wallet.");
					});
				}
				
				// Otherwise
				else {
				
					// Resolve copy of root public key
					resolve(new Uint8Array(self.rootPublicKey));
				}
			});
		}
		
		// Get address key
		getAddressKey(index) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
				
				// Otherwise check if wallet is a hardware wallet
				else if(self.getHardwareType() !== Wallet.NO_HARDWARE_TYPE) {
				
					// Reject error
					reject("Address key can't be retrieved from a hardware wallet.");
				}
				
				// Otherwise
				else {
				
					// Return getting address key
					return Crypto.addressKey(self.extendedPrivateKey, index).then(function(addressKey) {
					
						// Resolve address key
						resolve(addressKey);
					
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject("Invalid wallet.");
					});
				}
			});
		}
		
		// Get Tor proof address
		getTorProofAddress(hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
				
				// Otherwise
				else {
				
					// Check if wallet isn't a hardware wallet
					if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
					
						// Return getting address private key at payment proof Tor address index
						return self.getAddressKey(Wallet.PAYMENT_PROOF_TOR_ADDRESS_KEY_INDEX).then(function(addressSecretKey) {
						
							// Check if getting address public key from the address private key failed
							var addressPublicKey = Ed25519.publicKeyFromSecretKey(addressSecretKey);
						
							if(addressPublicKey === Ed25519.OPERATION_FAILED) {
							
								// Securely clear address private key
								addressSecretKey.fill(0);
							
								// Reject error
								reject("Getting address public key from the address private key failed.");
							}
							
							// Otherwise
							else {
							
								// Securely clear address private key
								addressSecretKey.fill(0);
							
								// Set Tor proof address to the Tor address of the addres public key
								var torProofAddress = Tor.publicKeyToTorAddress(addressPublicKey);
								
								// Resolve Tor proof address
								resolve(torProofAddress);
							}
							
						// Catch errors
						}).catch(function(error) {
						
							// Reject error
							reject(error);
						});
					}
					
					// Otherwise
					else {
					
						// Check if hardware wallet is connected
						if(self.isHardwareConnected() === true) {
					
							// Return getting Tor address with the hardware wallet
							return self.getHardwareWallet().getTorAddress(Wallet.PAYMENT_PROOF_TOR_ADDRESS_KEY_INDEX, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(torProofAddress) {
							
								// Resolve Tor proof address
								resolve(torProofAddress);
							
							// Catch errors
							}).catch(function(error) {
							
								// Reject error
								reject(error);
							});
						}
						
						// Otherwise
						else {
						
							// Reject hardware disconnected error
							reject(HardwareWallet.DISCONNECTED_ERROR);
						}
					}
				}
			});
		}
		
		// Get MQS proof address
		getMqsProofAddress(hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
				
				// Otherwise
				else {
				
					// Check if wallet isn't a hardware wallet
					if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
					
						// Return getting address private key at payment proof MQS address index
						return self.getAddressKey(Wallet.PAYMENT_PROOF_MQS_ADDRESS_KEY_INDEX).then(function(addressSecretKey) {
						
							// Check if getting address public key from the address private key failed
							var addressPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(addressSecretKey);
							
							if(addressPublicKey === Secp256k1Zkp.OPERATION_FAILED) {
							
								// Securely clear address private key
								addressSecretKey.fill(0);
							
								// Reject error
								reject("Getting address public key from the address private key failed.");
							}
							
							// Otherwise
							else {
							
								// Securely clear address private key
								addressSecretKey.fill(0);
							
								// Set MQS proof address to the MQS address of the address public key
								var mqsProofAddress = Mqs.publicKeyToMqsAddress(addressPublicKey, self.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE);
							
								// Resolve MQS proof address
								resolve(mqsProofAddress);
							}
							
						// Catch errors
						}).catch(function(error) {
						
							// Reject error
							reject(error);
						});
					}
					
					// Otherwise
					else {
					
						// Check if hardware wallet is connected
						if(self.isHardwareConnected() === true) {
					
							// Return getting MQS address with the hardware wallet
							return self.getHardwareWallet().getMqsAddress(Wallet.PAYMENT_PROOF_MQS_ADDRESS_KEY_INDEX, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(mqsProofAddress) {
							
								// Resolve MQS proof address
								resolve(mqsProofAddress);
							
							// Catch errors
							}).catch(function(error) {
							
								// Reject error
								reject(error);
							});
						}
						
						// Otherwise
						else {
						
							// Reject hardware disconnected error
							reject(HardwareWallet.DISCONNECTED_ERROR);
						}
					}
				}
			});
		}
		
		// Get Slatepack proof address
		getSlatepackProofAddress(hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
				
				// Otherwise
				else {
				
					// Check if wallet isn't a hardware wallet
					if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
					
						// Return getting address private key at payment proof Slatepack address index
						return self.getAddressKey(Wallet.PAYMENT_PROOF_SLATEPACK_ADDRESS_KEY_INDEX).then(function(addressSecretKey) {
						
							// Check if getting address public key from the address private key failed
							var addressPublicKey = Ed25519.publicKeyFromSecretKey(addressSecretKey);
						
							if(addressPublicKey === Ed25519.OPERATION_FAILED) {
							
								// Securely clear address private key
								addressSecretKey.fill(0);
							
								// Reject error
								reject("Getting address public key from the address private key failed.");
							}
							
							// Otherwise
							else {
							
								// Securely clear address private key
								addressSecretKey.fill(0);
							
								// Set Slatepack proof address to the Slatepack address of the addres public key
								var slatepackProofAddress = Slatepack.publicKeyToSlatepackAddress(addressPublicKey);
								
								// Resolve Slatepack proof address
								resolve(slatepackProofAddress);
							}
							
						// Catch errors
						}).catch(function(error) {
						
							// Reject error
							reject(error);
						});
					}
					
					// Otherwise
					else {
					
						// Check if hardware wallet is connected
						if(self.isHardwareConnected() === true) {
					
							// Return getting Slatepack address with the hardware wallet
							return self.getHardwareWallet().getSlatepackAddress(Wallet.PAYMENT_PROOF_SLATEPACK_ADDRESS_KEY_INDEX, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(slatepackProofAddress) {
							
								// Resolve Slatepack proof address
								resolve(slatepackProofAddress);
							
							// Catch errors
							}).catch(function(error) {
							
								// Reject error
								reject(error);
							});
						}
						
						// Otherwise
						else {
						
							// Reject hardware disconnected error
							reject(HardwareWallet.DISCONNECTED_ERROR);
						}
					}
				}
			});
		}
		
		// Get coinbase proof
		getCoinbaseProof(fees, height, identifier, hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false)
				
					// Reject error
					reject("Wallet closed.");
				
				// Otherwise
				else {
				
					// Check if no last identifier exists
					if(self.getLastIdentifier() === Wallet.NO_LAST_IDENTIFIER) {
					
						// Get default identifier
						var defaultIdentifier = new Identifier();
						
						// Set the current identifier to the default identifier's child identifier
						var currentIdentifier = defaultIdentifier.getChild();
					}
					
					// Otherwise check if an identifier is provided and it was previously used
					else if(identifier !== Identifier.NO_IDENTIFIER && self.getLastIdentifier().includesValue(identifier) === true)
					
						// Set current identifier to the identifier
						var currentIdentifier = identifier;
					
					// Otherwise
					else {
					
						// Set the current identifier to the last identifier's next identifier
						var currentIdentifier = self.getLastIdentifier().getNext();
					}
					
					// Get reward from fees and height
					var reward = Consensus.getReward(self.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE, fees, height);
					
					// Set switch type
					var switchType = Crypto.SWITCH_TYPE_REGULAR;
					
					// Check if wallet isn't a hardware wallet
					if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
					
						// Return initializing new proof builder
						var proofBuilder = new NewProofBuilder();
						
						return proofBuilder.initialize(self.extendedPrivateKey).then(function() {
						
							// Return creating proof from extended private key, reward, current identifier, switch type, and proof builder
							return Crypto.proof(self.extendedPrivateKey, reward, currentIdentifier, switchType, proofBuilder).then(function(proof) {
							
								// Uninitialize proof builder
								proofBuilder.uninitialize();
						
								// Resolve proof
								resolve(proof);
							
							// Catch errors
							}).catch(function(error) {
							
								// Uninitialize proof builder
								proofBuilder.uninitialize();
							
								// Reject error
								reject(error);
							});
						
						// Catch errors
						}).catch(function(error) {
						
							// Reject error
							reject(error);
						});
					}
					
					// Otherwise
					else {
					
						// Return initializing view proof builder
						var proofBuilder = new ViewProofBuilder();
						
						return proofBuilder.initialize(self.rootPublicKey).then(function() {
						
							// Check if hardware wallet is connected
							if(self.isHardwareConnected() === true) {
						
								// Return getting proof from reward, current identifier, switch type, and proof builder with the hardware wallet
								return self.getHardwareWallet().getProof(reward, currentIdentifier, switchType, HardwareWallet.CREATING_COINBASE_MESSAGE, proofBuilder, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(proof) {
							
									// Uninitialize proof builder
									proofBuilder.uninitialize();
									
									// Resolve proof
									resolve(proof);
								
								// Catch errors
								}).catch(function(error) {
								
									// Uninitialize proof builder
									proofBuilder.uninitialize();
								
									// Reject error
									reject(error);
								});
							}
					
							// Otherwise
							else {
							
								// Uninitialize proof builder
								proofBuilder.uninitialize();
							
								// Reject hardware disconnected error
								reject(HardwareWallet.DISCONNECTED_ERROR);
							}
						
						// Catch errors
						}).catch(function(error) {
						
							// Reject error
							reject(error);
						});
					}
				}
			});
		}
		
		// Build coinbase
		buildCoinbase(fees, height, identifier, proof = Wallet.NO_PROOF, hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false)
				
					// Reject error
					reject("Wallet closed.");
				
				// Otherwise
				else {
				
					// Check if no last identifier exists
					if(self.getLastIdentifier() === Wallet.NO_LAST_IDENTIFIER) {
					
						// Get default identifier
						var defaultIdentifier = new Identifier();
						
						// Set the current identifier to the default identifier's child identifier
						var currentIdentifier = defaultIdentifier.getChild();
						
						// Set last identifier to the current identifier without the extras
						self.setLastIdentifier(currentIdentifier);
					}
					
					// Otherwise check if an identifier is provided and it was previously used
					else if(identifier !== Identifier.NO_IDENTIFIER && self.getLastIdentifier().includesValue(identifier) === true)
					
						// Set current identifier to the identifier
						var currentIdentifier = identifier;
					
					// Otherwise
					else {
					
						// Set the current identifier to the last identifier's next identifier
						var currentIdentifier = self.getLastIdentifier().getNext();
						
						// Set last identifier to the current identifier without the extras
						self.setLastIdentifier(currentIdentifier);
					}
					
					// Get reward from fees and height
					var reward = Consensus.getReward(self.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE, fees, height);
					
					// Set switch type
					var switchType = Crypto.SWITCH_TYPE_REGULAR;
					
					// Get commit
					var getCommit = function() {
					
						// Return promise
						return new Promise(function(resolve, reject) {
					
							// Check if wallet isn't a hardware wallet
							if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
							
								// Return creating commit from extended private key, reward, current identifier, and switch type
								return Crypto.commit(self.extendedPrivateKey, reward, currentIdentifier, switchType).then(function(commit) {
								
									// Resolve commit
									resolve(commit);
								
								// Catch errors
								}).catch(function(error) {
								
									// Reject error
									reject(error);
								});
							}
							
							// Otherwise
							else {
							
								// Check if hardware wallet is connected
								if(self.isHardwareConnected() === true) {
							
									// Return getting commit from reward, current identifier, and switch type with the hardware wallet
									return self.getHardwareWallet().getCommit(reward, currentIdentifier, switchType, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(commit) {
									
										// Resolve commit
										resolve(commit);
									
									// Catch errors
									}).catch(function(error) {
									
										// Reject error
										reject(error);
									});
								}
								
								// Otherwise
								else {
								
									// Reject hardware disconnected error
									reject(HardwareWallet.DISCONNECTED_ERROR);
								}
							}
						});
					};
					
					// Return getting commit
					return getCommit().then(function(commit) {
					
						// Get proof
						var getProof = function() {
						
							// Return promise
							return new Promise(function(resolve, reject) {
							
								// Check if a proof is provided
								if(proof !== Wallet.NO_PROOF) {
								
									// Resolve proof
									resolve(proof);
								}
						
								// Otherwise check if wallet isn't a hardware wallet
								else if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
								
									// Return initializing new proof builder
									var proofBuilder = new NewProofBuilder();
									
									return proofBuilder.initialize(self.extendedPrivateKey).then(function() {
									
										// Return creating proof from extended private key, reward, current identifier, switch type, and proof builder
										return Crypto.proof(self.extendedPrivateKey, reward, currentIdentifier, switchType, proofBuilder).then(function(proof) {
										
											// Uninitialize proof builder
											proofBuilder.uninitialize();
									
											// Resolve proof
											resolve(proof);
										
										// Catch errors
										}).catch(function(error) {
										
											// Uninitialize proof builder
											proofBuilder.uninitialize();
										
											// Reject error
											reject(error);
										});
									
									// Catch errors
									}).catch(function(error) {
									
										// Reject error
										reject(error);
									});
								}
								
								// Otherwise
								else {
								
									// Return initializing view proof builder
									var proofBuilder = new ViewProofBuilder();
									
									return proofBuilder.initialize(self.rootPublicKey).then(function() {
									
										// Check if hardware wallet is connected
										if(self.isHardwareConnected() === true) {
									
											// Return getting proof from reward, current identifier, switch type, and proof builder with the hardware wallet
											return self.getHardwareWallet().getProof(reward, currentIdentifier, switchType, HardwareWallet.CREATING_COINBASE_MESSAGE, proofBuilder, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(proof) {
										
												// Uninitialize proof builder
												proofBuilder.uninitialize();
												
												// Resolve proof
												resolve(proof);
											
											// Catch errors
											}).catch(function(error) {
											
												// Uninitialize proof builder
												proofBuilder.uninitialize();
											
												// Reject error
												reject(error);
											});
										}
								
										// Otherwise
										else {
										
											// Uninitialize proof builder
											proofBuilder.uninitialize();
										
											// Reject hardware disconnected error
											reject(HardwareWallet.DISCONNECTED_ERROR);
										}
									
									// Catch errors
									}).catch(function(error) {
									
										// Reject error
										reject(error);
									});
								}
							});
						};
						
						// Return getting proof
						return getProof().then(function(proof) {
						
							// Try
							try {
						
								// Get over commit from reward
								var overCommit = Crypto.commitAmount(reward);
							}
							
							// Catch errors
							catch(error) {
							
								// Reject error
								reject(error);
								
								// Return
								return;
							}
							
							// Check if getting excess from commit and over commit was successful
							var excess = Secp256k1Zkp.pedersenCommitSum([
							
								// Commit
								commit
							], [
							
								// Over commit
								overCommit
							]);
							
							if(excess !== Secp256k1Zkp.OPERATION_FAILED) {
							
								// Check if creating public key from excess was successful
								var publicKey = Secp256k1Zkp.pedersenCommitToPublicKey(excess);
								
								if(publicKey !== Secp256k1Zkp.OPERATION_FAILED) {
							
									// Get excess signature
									var getExcessSignature = function() {
									
										// Return promise
										return new Promise(function(resolve, reject) {
									
											// Check if wallet isn't a hardware wallet
											if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
											
												// Try
												try {
											
													// Create kernel coinbase signature message
													var message = SlateKernel.signatureMessage(SlateKernel.COINBASE_FEATURES);
												}
												
												// Catch errors
												catch(error) {
												
													// Reject error
													reject(error);
													
													// Return
													return;
												}
												
												// Return getting secret key from coinbase output
												return self.getSum([
												
													// Output
													[
												
														// Amount
														reward,
														
														// Identifier
														currentIdentifier,
														
														// Switch type
														switchType
													]
												
												], []).then(function(secretKey) {
												
													// Check if creating single-signer signature from the message, secret key, and public key was successful
													var excessSignature = Secp256k1Zkp.createSingleSignerSignature(message, secretKey, Secp256k1Zkp.NO_SECRET_NONCE, publicKey, Secp256k1Zkp.NO_PUBLIC_NONCE, Secp256k1Zkp.NO_PUBLIC_NONCE_TOTAL);
													
													if(excessSignature !== Secp256k1Zkp.OPERATION_FAILED) {
													
														// Securely clear secret key
														secretKey.fill(0);
													
														// Resolve excess signature
														resolve(excessSignature);
													}
												
													// Otherwise
													else {
													
														// Securely clear secret key
														secretKey.fill(0);
													
														// Reject error
														reject("Creating single-signer signature failed.");
													}
												
												// Catch errors
												}).catch(function(error) {
												
													// Reject error
													reject(error);
												});
											}
											
											// Otherwise
											else {
											
												// Check if hardware wallet is connected
												if(self.isHardwareConnected() === true) {
											
													// Return starting transaction for the reward amount with the hardware wallet
													return self.getHardwareWallet().startTransaction(Wallet.PAYMENT_PROOF_TOR_ADDRESS_KEY_INDEX, reward, new BigNumber(0), new BigNumber(0), HardwareWallet.NO_SECRET_NONCE_INDEX, HardwareWallet.NO_ADDRESS, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function() {
													
														// Check if hardware wallet is connected
														if(self.isHardwareConnected() === true) {
													
															// Return including output in the transaction with the hardware wallet
															return self.getHardwareWallet().includeOutputInTransaction(reward, currentIdentifier, switchType, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function() {
															
																// Check if hardware wallet is connected
																if(self.isHardwareConnected() === true) {
															
																	// Return getting transaction public nonce with the hardware wallet
																	return self.getHardwareWallet().getTransactionPublicNonce(hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(publicNonce) {
																	
																		// Check if hardware wallet is connected
																		if(self.isHardwareConnected() === true) {
																
																			// Return getting transaction information with the public nonce, public key, and kernel features with the hardware wallet
																			return self.getHardwareWallet().getTransactionInformation(publicNonce, publicKey, SlateKernel.COINBASE_FEATURES, Slate.NO_LOCK_HEIGHT, Slate.NO_RELATIVE_HEIGHT, HardwareWallet.NO_KERNEL_COMMIT, HardwareWallet.NO_ADDRESS, Slate.NO_RECEIVER_SIGNATURE, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(transactionInformation) {
																			
																				// Check if hardware wallet is connected
																				if(self.isHardwareConnected() === true) {
																				
																					// Return completing transaction with the hardware wallet
																					return self.getHardwareWallet().completeTransaction().then(function() {
																					
																						// Resolve excess signature
																						resolve(transactionInformation[HardwareWallet.TRANSACTION_INFORMATION_SIGNATURE_INDEX]);
																						
																					// Catch errors
																					}).catch(function(error) {
																					
																						// Reject error
																						reject(error);
																					});
																				}
																				
																				// Otherwise
																				else {
																				
																					// Reject hardware disconnected error
																					reject(HardwareWallet.DISCONNECTED_ERROR);
																				}
																		
																			// Catch errors
																			}).catch(function(error) {
																			
																				// Check if hardware wallet is connected
																				if(self.isHardwareConnected() === true) {
																			
																					// Return canceling transaction with the hardware wallet and catch errors
																					return self.getHardwareWallet().cancelTransaction().catch(function(error) {
																					
																					// Finally
																					}).finally(function() {
																					
																						// Reject error
																						reject(error);
																					});
																				}
																				
																				// Otherwise
																				else {
																				
																					// Reject hardware disconnected error
																					reject(HardwareWallet.DISCONNECTED_ERROR);
																				}
																			});
																		}
													
																		// Otherwise
																		else {
																		
																			// Reject hardware disconnected error
																			reject(HardwareWallet.DISCONNECTED_ERROR);
																		}
																		
																	// Catch errors
																	}).catch(function(error) {
																	
																		// Check if hardware wallet is connected
																		if(self.isHardwareConnected() === true) {
																	
																			// Return canceling transaction with the hardware wallet and catch errors
																			return self.getHardwareWallet().cancelTransaction().catch(function(error) {
																			
																			// Finally
																			}).finally(function() {
																			
																				// Reject error
																				reject(error);
																			});
																		}
																		
																		// Otherwise
																		else {
																		
																			// Reject hardware disconnected error
																			reject(HardwareWallet.DISCONNECTED_ERROR);
																		}
																	});
																}
														
																// Otherwise
																else {
																
																	// Reject hardware disconnected error
																	reject(HardwareWallet.DISCONNECTED_ERROR);
																}
																
															// Catch errors
															}).catch(function(error) {
															
																// Check if hardware wallet is connected
																if(self.isHardwareConnected() === true) {
															
																	// Return canceling transaction with the hardware wallet and catch errors
																	return self.getHardwareWallet().cancelTransaction().catch(function(error) {
																	
																	// Finally
																	}).finally(function() {
																	
																		// Reject error
																		reject(error);
																	});
																}
																			
																// Otherwise
																else {
																
																	// Reject hardware disconnected error
																	reject(HardwareWallet.DISCONNECTED_ERROR);
																}
															});
														}
														
														// Otherwise
														else {
														
															// Reject hardware disconnected error
															reject(HardwareWallet.DISCONNECTED_ERROR);
														}
														
													// Catch errors
													}).catch(function(error) {
													
														// Reject error
														reject(error);
													});
												}
								
												// Otherwise
												else {
												
													// Reject hardware disconnected error
													reject(HardwareWallet.DISCONNECTED_ERROR);
												}
											}
										});
									};
									
									// Return getting excess signature
									return getExcessSignature().then(function(excessSignature) {
								
										// Resolve
										resolve([
										
											// Identifier
											currentIdentifier,
										
											// Commit
											commit,
											
											// Proof
											proof,
											
											// Excess
											excess,
											
											// Excess signature
											excessSignature
										]);
									
									// Catch errors
									}).catch(function(error) {
									
										// Reject error
										reject(error);
									});
								}
								
								// Otherwise
								else {
								
									// Reject error
									reject("Getting public key from Pedersen commit failed.");
								}
							}
							
							// Otherwise
							else {
							
								// Reject error
								reject("Performing Pedersen commit sum failed.");
							}
								
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
				}
			});
		}
		
		// Get sum
		getSum(outputs, inputs) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
					
				// Otherwise check if wallet is a hardware wallet
				else if(self.getHardwareType() !== Wallet.NO_HARDWARE_TYPE) {
				
					// Reject error
					reject("Sum can't be retrieved from a hardware wallet.");
				}
				
				// Otherwise
				else {
				
					// Go through all outputs
					var deriveOutputKeys = [];
					var outputKeys = [];
					for(var i = 0; i < outputs["length"]; ++i) {
					
						// Get output
						let output = outputs[i];
						
						// Append to derive output keys
						deriveOutputKeys.push(new Promise(function(resolve, reject) {
				
							// Return deriving output key from extended private key and output
							return Crypto.deriveSecretKey(self.extendedPrivateKey, output[Wallet.OUTPUT_AMOUNT_INDEX], output[Wallet.OUTPUT_IDENTIFIER_INDEX], output[Wallet.OUTPUT_SWITCH_TYPE_INDEX]).then(function(outputKey) {
							
								// Append output key to list
								outputKeys.push(outputKey);
								
								// Resolve
								resolve();
							
							// Catch errors
							}).catch(function(error) {
							
								// Reject error
								reject(error);
							});
						}));
					}
					
					// Go through all inputs
					var deriveInputKeys = [];
					var inputKeys = [];
					for(var i = 0; i < inputs["length"]; ++i) {
					
						// Get input
						let input = inputs[i];
						
						// Append to derive input keys
						deriveInputKeys.push(new Promise(function(resolve, reject) {
				
							// Return deriving input key from extended private key and input
							return Crypto.deriveSecretKey(self.extendedPrivateKey, input[Wallet.INPUT_AMOUNT_INDEX], input[Wallet.INPUT_IDENTIFIER_INDEX], input[Wallet.INPUT_SWITCH_TYPE_INDEX]).then(function(inputKey) {
							
								// Append input key to list
								inputKeys.push(inputKey);
								
								// Resolve
								resolve();
							
							// Catch errors
							}).catch(function(error) {
							
								// Reject error
								reject(error);
							});
						}));
					}
					
					// Wait for all output keys to be derived
					Promise.all(deriveOutputKeys).then(function() {
					
						// Wait for all input keys to be derived
						Promise.all(deriveInputKeys).then(function() {
						
							// Check if getting sum from derived keys failed
							var sum = Secp256k1Zkp.blindSum(outputKeys, inputKeys);
							
							if(sum === Secp256k1Zkp.OPERATION_FAILED) {
							
								// Go through all output keys
								for(var i = 0; i < outputKeys["length"]; ++i) {
								
									// Securely clear output key
									outputKeys[i].fill(0);
								}
								
								// Go through all input keys
								for(var i = 0; i < inputKeys["length"]; ++i) {
								
									// Securely clear input key
									inputKeys[i].fill(0);
								}
							
								// Reject error
								reject("Getting sum from derived keys failed.");
							}
							
							// Otherwise
							else {
							
								// Go through all output keys
								for(var i = 0; i < outputKeys["length"]; ++i) {
								
									// Securely clear output key
									outputKeys[i].fill(0);
								}
								
								// Go through all input keys
								for(var i = 0; i < inputKeys["length"]; ++i) {
								
									// Securely clear input key
									inputKeys[i].fill(0);
								}
							
								// Check if sum isn't a valid secret key
								if(Secp256k1Zkp.isValidSecretKey(sum) !== true) {
								
									// Securely clear sum
									sum.fill(0);
								
									// Reject error
									reject("Sum isn't a valid secret key.");
								}
								
								// Otherwise
								else {
							
									// Resolve sum
									resolve(sum);
								}
							}
						
						// Catch errors
						}).catch(function(error) {
						
							// Go through all output keys
							for(var i = 0; i < outputKeys["length"]; ++i) {
							
								// Securely clear output key
								outputKeys[i].fill(0);
							}
							
							// Go through all input keys
							for(var i = 0; i < inputKeys["length"]; ++i) {
							
								// Securely clear input key
								inputKeys[i].fill(0);
							}
						
							// Reject error
							reject(error);
						});
					
					// Catch errors
					}).catch(function(error) {
					
						// Go through all output keys
						for(var i = 0; i < outputKeys["length"]; ++i) {
						
							// Securely clear output key
							outputKeys[i].fill(0);
						}
						
						// Go through all input keys
						for(var i = 0; i < inputKeys["length"]; ++i) {
						
							// Securely clear input key
							inputKeys[i].fill(0);
						}
					
						// Reject error
						reject(error);
					});
				}
			});
		}
		
		// Build output
		buildOutput(amount, height = Identifier.NO_HEIGHT, message = HardwareWallet.SENDING_TRANSACTION_MESSAGE, hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false)
				
					// Reject error
					reject("Wallet closed.");
				
				// Otherwise
				else {
		
					// Check if no last identifier exists
					if(self.getLastIdentifier() === Wallet.NO_LAST_IDENTIFIER) {
					
						// Get default identifier
						var defaultIdentifier = new Identifier();
						
						// Set the current identifier to the default identifier's child identifier
						var currentIdentifier = defaultIdentifier.getChild(height);
						
						// Set last identifier to the current identifier without the extras
						self.setLastIdentifier(currentIdentifier.removeExtras());
					}
					
					// Otherwise
					else {
					
						// Set the current identifier to the last identifier's next identifier
						var currentIdentifier = self.getLastIdentifier().getNext(height);
						
						// Set last identifier to the current identifier without the extras
						self.setLastIdentifier(currentIdentifier.removeExtras());
					}
					
					// Set switch type
					var switchType = Crypto.SWITCH_TYPE_REGULAR;
					
					// Get commit
					var getCommit = function() {
					
						// Return promise
						return new Promise(function(resolve, reject) {
					
							// Check if wallet isn't a hardware wallet
							if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
							
								// Return creating commit from extended private key, amount, current identifier, and switch type
								return Crypto.commit(self.extendedPrivateKey, amount, currentIdentifier, switchType).then(function(commit) {
								
									// Resolve commit
									resolve(commit);
								
								// Catch errors
								}).catch(function(error) {
								
									// Reject error
									reject(error);
								});
							}
							
							// Otherwise
							else {
							
								// Check if hardware wallet is connected
								if(self.isHardwareConnected() === true) {
							
									// Return getting commit from amount, current identifier, and switch type with the hardware wallet
									return self.getHardwareWallet().getCommit(amount, currentIdentifier, switchType, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(commit) {
									
										// Resolve commit
										resolve(commit);
									
									// Catch errors
									}).catch(function(error) {
									
										// Reject error
										reject(error);
									});
								}
								
								// Otherwise
								else {
								
									// Reject hardware disconnected error
									reject(HardwareWallet.DISCONNECTED_ERROR);
								}
							}
						});
					};
					
					// Return getting commit
					return getCommit().then(function(commit) {
					
						// Get proof
						var getProof = function() {
						
							// Return promise
							return new Promise(function(resolve, reject) {
						
								// Check if wallet isn't a hardware wallet
								if(self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) {
								
									// Return initializing new proof builder
									var proofBuilder = new NewProofBuilder();
									
									return proofBuilder.initialize(self.extendedPrivateKey).then(function() {
									
										// Return creating proof from extended private key, amount, current identifier, switch type, and proof builder
										return Crypto.proof(self.extendedPrivateKey, amount, currentIdentifier, switchType, proofBuilder).then(function(proof) {
										
											// Uninitialize proof builder
											proofBuilder.uninitialize();
									
											// Resolve proof
											resolve(proof);
										
										// Catch errors
										}).catch(function(error) {
										
											// Uninitialize proof builder
											proofBuilder.uninitialize();
										
											// Reject error
											reject(error);
										});
									
									// Catch errors
									}).catch(function(error) {
									
										// Reject error
										reject(error);
									});
								}
								
								// Otherwise
								else {
								
									// Return initializing view proof builder
									var proofBuilder = new ViewProofBuilder();
									
									return proofBuilder.initialize(self.rootPublicKey).then(function() {
									
										// Check if hardware wallet is connected
										if(self.isHardwareConnected() === true) {
									
											// Return getting proof from amount, current identifier, switch type, and proof builder with the hardware wallet
											return self.getHardwareWallet().getProof(amount, currentIdentifier, switchType, message, proofBuilder, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(proof) {
										
												// Uninitialize proof builder
												proofBuilder.uninitialize();
												
												// Resolve proof
												resolve(proof);
											
											// Catch errors
											}).catch(function(error) {
											
												// Uninitialize proof builder
												proofBuilder.uninitialize();
												
												// Reject error
												reject(error);
											});
										}
								
										// Otherwise
										else {
										
											// Uninitialize proof builder
											proofBuilder.uninitialize();
										
											// Reject hardware disconnected error
											reject(HardwareWallet.DISCONNECTED_ERROR);
										}
									
									// Catch errors
									}).catch(function(error) {
									
										// Reject error
										reject(error);
									});
								}
							});
						};
						
						// Return getting proof
						return getProof().then(function(proof) {
						
							// Resolve
							resolve([
							
								// Amount
								amount,
								
								// Identifier
								currentIdentifier,
								
								// Switch type
								switchType,
							
								// Features
								SlateOutput.PLAIN_FEATURES,
									
								// Commit
								commit,
									
								// Proof
								proof
							]);
						
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
				}
			});
		}
		
		// Build Tor payment proof
		buildTorPaymentProof(amount, commit, senderAddress) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
				
				// Otherwise check if wallet is a hardware wallet
				else if(self.getHardwareType() !== Wallet.NO_HARDWARE_TYPE) {
				
					// Reject error
					reject("Payment proof can't be retrieved from a hardware wallet.");
				}
				
				// Otherwise
				else {
				
					// Try
					try {
					
						// Get message from amount, commit, and sender address
						var message = Slate.getPaymentProofMessage(amount, commit, senderAddress);
					}
					
					// Catch errors
					catch(error) {
					
						// Reject error
						reject(error);
						
						// Return
						return;
					}
					
					// Return getting address private key at payment proof Tor address index
					return self.getAddressKey(Wallet.PAYMENT_PROOF_TOR_ADDRESS_KEY_INDEX).then(function(addressSecretKey) {
					
						// Check if signing message with address private key failed
						var torPaymentProof = Ed25519.sign(message, addressSecretKey);
						
						if(torPaymentProof === Ed25519.OPERATION_FAILED) {
						
							// Securely clear address private key
							addressSecretKey.fill(0);
						
							// Reject error
							reject("Signing message with address key failed.");
						}
						
						// Otherwise
						else {
						
							// Securely clear address private key
							addressSecretKey.fill(0);
						
							// Resolve Tor payment proof
							resolve(torPaymentProof);
						}
						
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				}
			});
		}
		
		// Build MQS payment proof
		buildMqsPaymentProof(amount, commit, senderAddress) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
				
				// Otherwise check if wallet is a hardware wallet
				else if(self.getHardwareType() !== Wallet.NO_HARDWARE_TYPE) {
				
					// Reject error
					reject("Payment proof can't be retrieved from a hardware wallet.");
				}
				
				// Otherwise
				else {
				
					// Try
					try {
					
						// Get message from amount, commit, and sender address
						var message = Slate.getPaymentProofMessage(amount, commit, senderAddress);
					}
					
					// Catch errors
					catch(error) {
					
						// Reject error
						reject(error);
						
						// Return
						return;
					}
					
					// Return getting address private key at payment proof MQS address index
					return self.getAddressKey(Wallet.PAYMENT_PROOF_MQS_ADDRESS_KEY_INDEX).then(function(addressSecretKey) {
					
						// Get message hash
						var messageHash = new Uint8Array(sha256.arrayBuffer(message));
						
						// Check if signing message with address private key failed
						var mqsPaymentProof = Secp256k1Zkp.createMessageHashSignature(messageHash, addressSecretKey);
						
						if(mqsPaymentProof === Secp256k1Zkp.OPERATION_FAILED) {
						
							// Securely clear address private key
							addressSecretKey.fill(0);
						
							// Reject error
							reject("Signing message with address key failed.");
						}
						
						// Otherwise
						else {
						
							// Securely clear address private key
							addressSecretKey.fill(0);
						
							// Resolve MQS payment proof
							resolve(mqsPaymentProof);
						}
						
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				}
			});
		}
		
		// Build Slatepack payment proof
		buildSlatepackPaymentProof(amount, commit, senderAddress) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
				
				// Otherwise check if wallet is a hardware wallet
				else if(self.getHardwareType() !== Wallet.NO_HARDWARE_TYPE) {
				
					// Reject error
					reject("Payment proof can't be retrieved from a hardware wallet.");
				}
				
				// Otherwise
				else {
				
					// Try
					try {
					
						// Get message from amount, commit, and sender address
						var message = Slate.getPaymentProofMessage(amount, commit, senderAddress);
					}
					
					// Catch errors
					catch(error) {
					
						// Reject error
						reject(error);
						
						// Return
						return;
					}
					
					// Return getting address private key at payment proof Slatepack address index
					return self.getAddressKey(Wallet.PAYMENT_PROOF_SLATEPACK_ADDRESS_KEY_INDEX).then(function(addressSecretKey) {
					
						// Check if signing message with address private key failed
						var slatepackPaymentProof = Ed25519.sign(message, addressSecretKey);
						
						if(slatepackPaymentProof === Ed25519.OPERATION_FAILED) {
						
							// Securely clear address private key
							addressSecretKey.fill(0);
						
							// Reject error
							reject("Signing message with address key failed.");
						}
						
						// Otherwise
						else {
						
							// Securely clear address private key
							addressSecretKey.fill(0);
						
							// Resolve Slatepack payment proof
							resolve(slatepackPaymentProof);
						}
						
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				}
			});
		}
		
		// Get name
		getName() {
		
			// Return name
			return this.name;
		}
		
		// Set name
		setName(name) {
		
			// Set name
			this.name = name;
		}
		
		// Get color
		getColor() {
		
			// Return color
			return this.color;
		}
		
		// Set color
		setColor(color) {
		
			// Check if color is valid
			if(Wallet.COLOR_PATTERN.test(color) === true)
		
				// Set color
				this.color = color;
			
			// Otherwise
			else
			
				// Set color to random color
				this.color = Wallet.getRandomColor();
		}
		
		// Get salt
		getSalt() {
		
			// Return salt
			return this.salt;
		}
		
		// Set salt
		setSalt(salt) {
		
			// Set salt
			this.salt = salt;
		}
		
		// Get initialization vector
		getInitializationVector() {
		
			// Return initialization vector
			return this.initializationVector;
		}
		
		// Set initialization vector
		setInitializationVector(initializationVector) {
		
			// Set initialization vector
			this.initializationVector = initializationVector;
		}
		
		// Get number of iterations
		getNumberOfIterations() {
		
			// Return number of iterations
			return this.numberOfIterations;
		}
		
		// Set number of iterations
		setNumberOfIterations(numberOfIterations) {
		
			// Set number of iterations
			this.numberOfIterations = numberOfIterations;
		}
		
		// Get encrypted seed
		getEncryptedSeed() {
		
			// Return encrypted seed
			return this.encryptedSeed;
		}
		
		// Set encrypted seed
		setEncryptedSeed(encryptedSeed) {
		
			// Set encrypted seed
			this.encryptedSeed = encryptedSeed;
		}
		
		// Get address suffix
		getAddressSuffix() {
		
			// Return address suffix
			return this.addressSuffix;
		}
		
		// Set address suffix
		setAddressSuffix(addressSuffix) {
		
			// Set address suffix
			this.addressSuffix = addressSuffix;
		}
		
		// Get order
		getOrder() {
		
			// Return order
			return this.order;
		}
		
		// Set order
		setOrder(order) {
		
			// Set order
			this.order = order;
		}
		
		// Get synced height
		getSyncedHeight() {
		
			// Return synced height
			return this.syncedHeight;
		}
		
		// Set synced height
		setSyncedHeight(syncedHeight) {
		
			// Set synced height
			this.syncedHeight = syncedHeight;
		}
		
		// Get spent amount
		getSpentAmount() {
		
			// Return spent amount
			return this.spentAmount;
		}
		
		// Set spent amount
		setSpentAmount(spentAmount) {
		
			// Set spent amount
			this.spentAmount = spentAmount;
		}
		
		// Get unspent amount
		getUnspentAmount() {
		
			// Return unspent amount
			return this.unspentAmount;
		}
		
		// Set unspent amount
		setUnspentAmount(unspentAmount) {
		
			// Set unspent amount
			this.unspentAmount = unspentAmount;
		}
		
		// Get unconfirmed amount
		getUnconfirmedAmount() {
		
			// Return unconfirmed amount
			return this.unconfirmedAmount;
		}
		
		// Set unconfirmed amount
		setUnconfirmedAmount(unconfirmedAmount) {
		
			// Set unconfirmed amount
			this.unconfirmedAmount = unconfirmedAmount;
		}
		
		// Get locked amount
		getLockedAmount() {
		
			// Return locked amount
			return this.lockedAmount;
		}
		
		// Set locked amount
		setLockedAmount(lockedAmount) {
		
			// Set locked amount
			this.lockedAmount = lockedAmount;
		}
		
		// Get pending amount
		getPendingAmount() {
		
			// Return pending amount
			return this.pendingAmount;
		}
		
		// Set pending amount
		setPendingAmount(pendingAmount) {
		
			// Set pending amount
			this.pendingAmount = pendingAmount;
		}
		
		// Get expired amount
		getExpiredAmount() {
		
			// Return expired amount
			return this.expiredAmount;
		}
		
		// Set expired amount
		setExpiredAmount(expiredAmount) {
		
			// Set expired amount
			this.expiredAmount = expiredAmount;
		}
		
		// Get wallet type
		getWalletType() {
		
			// Return wallet type
			return this.walletType;
		}
		
		// Set wallet type
		setWalletType(walletType) {
		
			// Set wallet type
			this.walletType = walletType;
		}
		
		// Get network type
		getNetworkType() {
		
			// Return network type
			return this.networkType;
		}
		
		// Set network type
		setNetworkType(networkType) {
		
			// Check if network type is valid
			if(networkType === Consensus.MAINNET_NETWORK_TYPE || networkType === Consensus.TESTNET_NETWORK_TYPE)
		
				// Set network type
				this.networkType = networkType;
			
			// Otherwise
			else
			
				// Set network type
				this.networkType = Consensus.getNetworkType();
		}
		
		// Get last identifier
		getLastIdentifier() {
		
			// Return last identifier
			return this.lastIdentifier;
		}
		
		// Set last identifier
		setLastIdentifier(lastIdentifier) {
		
			// Set last identifier
			this.lastIdentifier = lastIdentifier;
		}
		
		// Get hardware type
		getHardwareType() {
		
			// Return hardware type
			return this.hardwareType;
		}
		
		// Set hardware type
		setHardwareType(hardwareType) {
		
			// Set hardware type
			this.hardwareType = hardwareType;
		}
		
		// Get encrypted root public key
		getEncryptedRootPublicKey() {
		
			// Return encrypted root public key
			return this.encryptedRootPublicKey;
		}
		
		// Set encrypted root public key
		setEncryptedRootPublicKey(encryptedRootPublicKey) {
		
			// Set encrypted root public key
			this.encryptedRootPublicKey = encryptedRootPublicKey;
		}
		
		// Get use BIP39
		getUseBip39() {
		
			// Return use BIP39
			return this.useBip39;
		}
		
		// Set use BIP39
		setUseBip39(useBip39) {
		
			// Set use BIP39
			this.useBip39 = useBip39;
		}
		
		// Get encrypted BIP39 salt
		getEncryptedBip39Salt() {
		
			// Return encrypted BIP39 salt
			return this.encryptedBip39Salt;
		}
		
		// Set encrypted BIP39 salt
		setEncryptedBip39Salt(encryptedBip39Salt) {
		
			// Set encrypted BIP39 salt
			this.encryptedBip39Salt = encryptedBip39Salt;
		}
		
		// Get account number
		getAccountNumber() {
		
			// Return account number
			return this.accountNumber;
		}
		
		// Set account number
		setAccountNumber(accountNumber) {
		
			// Set account number
			this.accountNumber = accountNumber;
		}
		
		// Get payment proof index
		getPaymentProofIndex() {
		
			// Return payment proof index
			return this.paymentProofIndex;
		}
		
		// Set payment proof index
		setPaymentProofIndex(paymentProofIndex) {
		
			// Set payment proof index
			this.paymentProofIndex = paymentProofIndex;
		}
		
		// Get key path
		getKeyPath() {
		
			// Return key path
			return this.keyPath;
		}
		
		// Set key path
		setKeyPath(keyPath) {
		
			// Set keyPath
			this.keyPath = keyPath;
			
			// Check if hardware wallet exists
			if(this.getHardwareWallet() !== Wallet.NO_HARDWARE_WALLET) {
			
				// Set hardware wallet's wallet key path
				this.getHardwareWallet().setWalletKeyPath(keyPath);
			}
		}
		
		// Get starting sync height
		getStartingSyncHeight() {
		
			// Return starting sync height
			return this.startingSyncHeight;
		}
		
		// Set starting sync height
		setStartingSyncHeight(startingSyncHeight) {
		
			// Set starting sync height
			this.startingSyncHeight = startingSyncHeight;
		}
		
		// Get sync complete value
		getSyncCompleteValue(syncCompleteValue) {
		
			// Return sync complete value
			return this.syncCompleteValue;
		}
		
		// Set sync complete value
		setSyncCompleteValue(syncCompleteValue) {
		
			// Set sync complete value
			this.syncCompleteValue = syncCompleteValue;
		}
		
		// Get performing address suffix operation
		getPerformingAddressSuffixOperation() {
		
			// Return performing address suffix operation
			return this.performingAddressSuffixOperation;
		}
		
		// Set performing address suffix operation
		setPerformingAddressSuffixOperation(performingAddressSuffixOperation) {
		
			// Set performing address suffix operation
			this.performingAddressSuffixOperation = performingAddressSuffixOperation;
		}
		
		// Get address suffix verified
		getAddressSuffixVerified() {
		
			// Return address suffix verified
			return this.addressSuffixVerified;
		}
		
		// Set address suffix verified
		setAddressSuffixVerified(addressSuffixVerified) {
		
			// Set address suffix verified
			this.addressSuffixVerified = addressSuffixVerified;
		}
		
		// Get syncing status
		getSyncingStatus() {
		
			// Return syncing status
			return this.syncingStatus;
		}
		
		// Set syncing status
		setSyncingStatus(syncingStatus) {
		
			// Set syncing status
			this.syncingStatus = syncingStatus;
		}
		
		// Get last sync index
		getLastSyncIndex() {
		
			// Return last sync index
			return this.lastSyncIndex;
		}
		
		// Set last sync index
		setLastSyncIndex(lastSyncIndex) {
		
			// Set last sync index
			this.lastSyncIndex = lastSyncIndex;
		}
		
		// Get percent synced
		getPercentSynced() {
		
			// Return percent synced
			return this.percentSynced;
		}
		
		// Set percent synced
		setPercentSynced(percentSynced) {
		
			// Set percent synced
			this.percentSynced = percentSynced;
		}
		
		// Get address
		getAddress(type) {
		
			// Check if doesn't have an address suffix
			if(this.getAddressSuffix() === Wallet.NO_ADDRESS_SUFFIX)
			
				// Return empty string
				return "";
			
			// Otherwise
			else {
			
				// Try
				try {
				
					// Parse address suffix as a URL
					new URL(this.getAddressSuffix());
					
					// Return address suffix
					return this.getAddressSuffix();
				}
				
				// Catch errors
				catch(error) {
			
					// Check type
					switch(type) {
					
						// HTTP address type
						case Wallet.HTTP_ADDRESS_TYPE:
						
							// Return HTTP address
							return this.getHttpAddress();
						
						// Tor address type
						case Wallet.TOR_ADDRESS_TYPE:
						
							// Return Tor address
							return this.getTorAddress();
						
						// Match connection address type
						case Wallet.MATCH_CONNECTION_ADDRESS_TYPE:
						
							// Return address that matches connection
							return (Tor.isOnionService() === true) ? this.getTorAddress() : this.getHttpAddress();
					}
				}
			}
		}
		
		// Owns output
		ownsOutput(output) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Return getting output's information
				return output.getInformation((self.getHardwareType() === Wallet.NO_HARDWARE_TYPE) ? self.extendedPrivateKey : self.rootPublicKey, self.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE).then(function(outputInformation) {
				
					// Resolve output information
					resolve(outputInformation);
					
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Is syncing
		isSyncing() {
		
			// Return is syncing status is syncing or resyning
			return this.getSyncingStatus() === Wallet.STATUS_SYNCING || this.getSyncingStatus() === Wallet.STATUS_RESYNCING;
		}
		
		// Is synced
		isSynced() {
		
			// Return if syncing status is synced
			return this.getSyncingStatus() === Wallet.STATUS_SYNCED;
		}
		
		// Connect to applicable hardware
		connectToApplicableHardware(hardwareWallets) {
		
			// Set self
			var self = this;
			
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if open, is a hardware wallet, and hardware isn't connected
				if(self.isOpen() === true && self.getHardwareType() !== Wallet.NO_HARDWARE_TYPE && self.isHardwareConnected() === false) {
				
					// Return getting the seed cookie from the root public key
					return crypto["subtle"].digest(Wallet.SEED_COOKIE_DIGEST_ALGORITHM, self.rootPublicKey).then(function(seedCookie) {
					
						// Get seed cookie in the correct format
						seedCookie = new Uint8Array(seedCookie);
						
						// Check if open, is a hardware wallet, and hardware isn't connected
						if(self.isOpen() === true && self.getHardwareType() !== Wallet.NO_HARDWARE_TYPE && self.isHardwareConnected() === false) {
						
							// Go through all hardware wallets
							for(var i = 0; i < hardwareWallets["length"]; ++i) {
							
								// Get hardware wallet
								var hardwareWallet = hardwareWallets[i];
								
								// Check if hardware wallet isn't in use
								if(hardwareWallet.getInUse() === false) {
								
									// Check if the hardware wallet's seed cookie matches the wallet's
									if(Common.arraysAreEqual(seedCookie, hardwareWallet.getSeedCookie()) === true) {
									
										// Set hardware wallet to the hardware wallet
										self.hardwareWallet = hardwareWallet;
										
										// Check if hardware types differ
										if(self.getHardwareType() !== self.hardwareWallet.getHardwareType()) {
										
											// Trigger wallet hardware type change event
											$(document).trigger(Wallet.HARDWARE_TYPE_CHANGE_EVENT, [
											
												// Key path
												self.getKeyPath(),
												
												// New hardware type
												self.hardwareWallet.getHardwareType()
											]);
										}
										
										// Set hardware wallet's wallet key path
										hardwareWallet.setWalletKeyPath(self.getKeyPath());
										
										// Break
										break;
									}
								}
							}
							
							// Check if hardware is connected
							if(self.isHardwareConnected() === true) {
							
								// Set that hardware wallet is in use
								self.getHardwareWallet().setInUse(true);
							
								// Trigger wallet connect event
								$(document).trigger(Wallet.CONNECT_EVENT, [
								
									// Key path
									self.getKeyPath(),
									
									// Connection type
									self.getHardwareWallet().getConnectionType()
								]);
							
								// Hardware wallet on hardware disconnect event
								$(self.getHardwareWallet()).one(HardwareWallet.DISCONNECT_EVENT, function() {
								
									// Check if hardware wallet exists
									if(self.getHardwareWallet() !== Wallet.NO_HARDWARE_WALLET) {
									
										// Close hardware wallet
										self.getHardwareWallet().close();
									
										// Set hardware wallet to no hardware wallet
										self.hardwareWallet = Wallet.NO_HARDWARE_WALLET;
									}
									
									// Check if key path exists
									if(self.getKeyPath() !== Wallet.NO_KEY_PATH) {
									
										// Trigger wallet disconnect event
										$(document).trigger(Wallet.DISCONNECT_EVENT, [
										
											// Key path
											self.getKeyPath()
										]);
									}
								});
							}
							
							// Otherwise
							else {
							
								// Check if hardware wallet exists
								if(self.getHardwareWallet() !== Wallet.NO_HARDWARE_WALLET) {
							
									// Close hardware wallet
									self.getHardwareWallet().close();
								
									// Set hardware wallet to no hardware wallet
									self.hardwareWallet = Wallet.NO_HARDWARE_WALLET;
								}
							}
						}
						
						// Resolve
						resolve();
					
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				}
				
				// Otherwise
				else {
				
					// Resolve
					resolve();
				}
			});
		}
		
		// Is hardware connected
		isHardwareConnected() {
		
			// Return is hardware wallet is connected
			return this.getHardwareWallet() !== Wallet.NO_HARDWARE_WALLET && this.getHardwareWallet().isConnected() === true;
		}
		
		// Get hardware wallet
		getHardwareWallet() {
		
			// Return hardware wallet
			return this.hardwareWallet;
		}
		
		// No key path
		static get NO_KEY_PATH() {
		
			// Return no key path
			return null;
		}
		
		// No name
		static get NO_NAME() {
		
			// Return no name
			return null;
		}
		
		// No encrypted seed
		static get NO_ENCRYPTED_SEED() {
		
			// Return no encrypted seed
			return null;
		}
		
		// No address suffix
		static get NO_ADDRESS_SUFFIX() {
		
			// Return no address suffix
			return null;
		}
		
		// No order
		static get NO_ORDER() {
		
			// Return no order
			return null;
		}
		
		// Unknown order
		static get UNKNOWN_ORDER() {
		
			// Return unknown order
			return undefined;
		}
		
		// No last identifier
		static get NO_LAST_IDENTIFIER() {
		
			// Return no last identifier
			return null;
		}
		
		// No hardware type
		static get NO_HARDWARE_TYPE() {
		
			// Return no hardware type
			return null;
		}
		
		// No encrypted root public key
		static get NO_ENCRYPTED_ROOT_PUBLIC_KEY() {
		
			// Return no encrypted seed
			return null;
		}
		
		// No encrypted BIP39 salt
		static get NO_ENCRYPTED_BIP39_SALT() {
		
			// Return no encrypted seed
			return null;
		}
		
		// Current height
		static get CURRENT_HEIGHT() {
		
			// Return current height
			return null;
		}
		
		// Status syncing
		static get STATUS_SYNCING() {
		
			// Return status syncing
			return 0;
		}
		
		// Status resyncing
		static get STATUS_RESYNCING() {
		
			// Return status resyncing
			return Wallet.STATUS_SYNCING + 1;
		}
		
		// Status synced
		static get STATUS_SYNCED() {
		
			// Return status synced
			return Wallet.STATUS_RESYNCING + 1;
		}
		
		// Status error
		static get STATUS_ERROR() {
		
			// Return status error
			return Wallet.STATUS_SYNCED + 1;
		}
		
		// No sync index
		static get NO_SYNC_INDEX() {
		
			// Return no sync index
			return null;
		}
		
		// Last sync index start index index
		static get LAST_SYNC_INDEX_START_INDEX_INDEX() {
		
			// Return last sync index start index index
			return 0;
		}
		
		// Last sync index last retrieved index index
		static get LAST_SYNC_INDEX_LAST_RETRIEVED_INDEX_INDEX() {
		
			// Return last sync index last retrieved index index
			return Wallet.LAST_SYNC_INDEX_START_INDEX_INDEX + 1;
		}
		
		// Coinbase identifier index
		static get COINBASE_IDENTIFIER_INDEX() {
		
			// Return coinbase identifier index
			return 0;
		}
		
		// Coinbase commit index
		static get COINBASE_COMMIT_INDEX() {
		
			// Return coinbase commit index
			return Wallet.COINBASE_IDENTIFIER_INDEX + 1;
		}
		
		// Coinbase proof index
		static get COINBASE_PROOF_INDEX() {
		
			// Return coinbase proof index
			return Wallet.COINBASE_COMMIT_INDEX + 1;
		}
		
		// Coinbase excess index
		static get COINBASE_EXCESS_INDEX() {
		
			// Return coinbase excess index
			return Wallet.COINBASE_PROOF_INDEX + 1;
		}
		
		// Coinbase excess signature index
		static get COINBASE_EXCESS_SIGNATURE_INDEX() {
		
			// Return coinbase excess signature index
			return Wallet.COINBASE_EXCESS_INDEX + 1;
		}
		
		// Output amount index
		static get OUTPUT_AMOUNT_INDEX() {
		
			// Return output amount index
			return 0;
		}
		
		// Output identifier index
		static get OUTPUT_IDENTIFIER_INDEX() {
		
			// Return output identifier index
			return Wallet.OUTPUT_AMOUNT_INDEX + 1;
		}
		
		// Output switch type index
		static get OUTPUT_SWITCH_TYPE_INDEX() {
		
			// Return output switch type index
			return Wallet.OUTPUT_IDENTIFIER_INDEX + 1;
		}
		
		// Output features index
		static get OUTPUT_FEATURES_INDEX() {
		
			// Return output features index
			return Wallet.OUTPUT_SWITCH_TYPE_INDEX + 1;
		}
		
		// Output commit index
		static get OUTPUT_COMMIT_INDEX() {
		
			// Return output commit index
			return Wallet.OUTPUT_FEATURES_INDEX + 1;
		}
		
		// Output proof index
		static get OUTPUT_PROOF_INDEX() {
		
			// Return output proof index
			return Wallet.OUTPUT_COMMIT_INDEX + 1;
		}
		
		// Input amount index
		static get INPUT_AMOUNT_INDEX() {
		
			// Return input amount index
			return 0;
		}
		
		// Input identifier index
		static get INPUT_IDENTIFIER_INDEX() {
		
			// Return input identifier index
			return Wallet.INPUT_AMOUNT_INDEX + 1;
		}
		
		// Input switch type index
		static get INPUT_SWITCH_TYPE_INDEX() {
		
			// Return input switch type index
			return Wallet.INPUT_IDENTIFIER_INDEX + 1;
		}
		
		// Input features index
		static get INPUT_FEATURES_INDEX() {
		
			// Return input features index
			return Wallet.INPUT_SWITCH_TYPE_INDEX + 1;
		}
		
		// Input commit index
		static get INPUT_COMMIT_INDEX() {
		
			// Return input commit index
			return Wallet.INPUT_FEATURES_INDEX + 1;
		}
		
		// Input key path index
		static get INPUT_KEY_PATH_INDEX() {
		
			// Return input key path index
			return Wallet.INPUT_COMMIT_INDEX + 1;
		}
		
		// HTTP address type
		static get HTTP_ADDRESS_TYPE() {
		
			// Return HTTP address type
			return "HTTP";
		}
		
		// Tor address type
		static get TOR_ADDRESS_TYPE() {
		
			// Return Tor address type
			return "Tor";
		}
		
		// Match connection address type
		static get MATCH_CONNECTION_ADDRESS_TYPE() {
		
			// Return match connection address type
			return "Match Connection";
		}
		
		// Disconnect event
		static get DISCONNECT_EVENT() {
		
			// Return disconnect event
			return "WalletDisconnectEvent";
		}
		
		// Connect event
		static get CONNECT_EVENT() {
		
			// Return disconnect event
			return "WalletConnectEvent";
		}
		
		// Hardware type change event
		static get HARDWARE_TYPE_CHANGE_EVENT() {
		
			// Return hardware type change event
			return "WalletHardwareTypeChangeEvent";
		}
		
		// Encrypt seed and BIP39 salt encrypted seed index
		static get ENCRYPT_SEED_AND_BIP39_SALT_ENCRYPTED_SEED_INDEX() {
		
			// Return encrypt seed and BIP39 salt encrypted seed index
			return 0;
		}
		
		// Encrypt seed and BIP39 salt encrypted BIP39 salt index
		static get ENCRYPT_SEED_AND_BIP39_SALT_ENCRYPTED_BIP39_SALT_INDEX() {
		
			// Return encrypt seed and BIP39 salt encrypted BIP39 salt index
			return Wallet.ENCRYPT_SEED_AND_BIP39_SALT_ENCRYPTED_SEED_INDEX + 1;
		}
		
		// Decrypt seed and BIP39 salt decrypted seed index
		static get DECRYPT_SEED_AND_BIP39_SALT_DECRYPTED_SEED_INDEX() {
		
			// Return decrypt seed and BIP39 salt decrypted seed index
			return 0;
		}
		
		// Decrypt seed and BIP39 salt decrypted BIP39 salt index
		static get DECRYPT_SEED_AND_BIP39_SALT_DECRYPTED_BIP39_SALT_INDEX() {
		
			// Return decrypt seed and BIP39 salt decrypted BIP39 salt index
			return Wallet.DECRYPT_SEED_AND_BIP39_SALT_DECRYPTED_SEED_INDEX + 1;
		}
		
		// No proof
		static get NO_PROOF() {
		
			// Return no proof
			return null;
		}
	
	// Private
		
		// Get HTTP address
		getHttpAddress() {
		
			// Return HTTP address
			return HTTPS_SERVER_ADDRESS + "/wallet/" + this.getAddressSuffix();
		}
		
		// Get Tor address
		getTorAddress() {
		
			// Return Tor address
			return TOR_SERVER_ADDRESS + "/wallet/" + this.getAddressSuffix();
		}
		
		// Encrypt seed and BIP39 salt
		encryptSeedAndBip39Salt(password, salt, numberOfIterations, initializationVector) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
				
				// Otherwise
				else {
			
					// Return getting key
					return Wallet.getKey(password, salt, numberOfIterations).then(function(key) {
			
						// Return encrypting the seed using key and initialization vector
						return crypto["subtle"].encrypt({
						
							// Name
							"name": Wallet.ENCRYPTION_ALGORITHM,
							
							// Initialization vector
							"iv": initializationVector
							
						}, key, self.seed.getSeed()).then(function(encryptedSeed) {
						
							// Get encrypted seed in the correct format
							encryptedSeed = new Uint8Array(encryptedSeed);
						
							// Check if BIP39 salt exists
							if(self.bip39Salt !== Wallet.NO_BIP39_SALT) {
						
								// Return encrypting the BIP39 salt using key and initialization vector
								return crypto["subtle"].encrypt({
								
									// Name
									"name": Wallet.ENCRYPTION_ALGORITHM,
									
									// Initialization vector
									"iv": initializationVector
									
								}, key, self.bip39Salt).then(function(encryptedBip39Salt) {
							
									// TODO Securely clear key
									
									// Get encrypted BIP39 salt in the correct format
									encryptedBip39Salt = new Uint8Array(encryptedBip39Salt);
								
									// Resolve
									resolve([
									
										// Encrypted seed
										encryptedSeed,
										
										// Encrypted BIP39 salt
										encryptedBip39Salt
									]);
								
								// Catch errors
								}).catch(function(error) {
								
									// Securely clear encrypted seed
									encryptedSeed.fill(0);
								
									// TODO Securely clear key
								
									// Reject error
									reject(error);
								});
							}
							
							// Otherwise
							else {
							
								// TODO Securely clear key
							
								// Resolve
								resolve([
								
									// Encrypted seed
									encryptedSeed,
									
									// No encrypted BIP39 salt
									Wallet.NO_ENCRYPTED_BIP39_SALT
								]);
							}
						
						// Catch errors
						}).catch(function(error) {
						
							// TODO Securely clear key
						
							// Reject error
							reject(error);
						});
						
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				}
			});
		}
		
		// Decrypt seed and BIP39 salt
		decryptSeedAndBip39Salt(password, salt, numberOfIterations, initializationVector) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Return getting key
				return Wallet.getKey(password, salt, numberOfIterations).then(function(key) {
				
					// Return decrypting the encrypted seed using key and initialization vector
					return crypto["subtle"].decrypt({
					
						// Name
						"name": Wallet.ENCRYPTION_ALGORITHM,
						
						// Initialization vector
						"iv": initializationVector
						
					}, key, self.getEncryptedSeed()).then(function(decryptedSeed) {
					
						// Get decrypted seed in correct format
						decryptedSeed = new Uint8Array(decryptedSeed);
					
						// Check if encrypted BIP39 salt exists
						if(self.getEncryptedBip39Salt() !== Wallet.NO_ENCRYPTED_BIP39_SALT) {
						
							// Return decrypting the encrypted BIP39 salt using key and initialization vector
							return crypto["subtle"].decrypt({
							
								// Name
								"name": Wallet.ENCRYPTION_ALGORITHM,
								
								// Initialization vector
								"iv": initializationVector
								
							}, key, self.getEncryptedBip39Salt()).then(function(decryptedBip39Salt) {
							
								// Get decrypted BIP39 salt in correct format
								decryptedBip39Salt = new Uint8Array(decryptedBip39Salt);
								
								// TODO Securely clear key
						
								// Resolve
								resolve([
								
									// Decrypted seed
									decryptedSeed,
									
									// Decrypted BIP39 salt
									decryptedBip39Salt
								]);
							
							// Catch errors
							}).catch(function(error) {
							
								// Securely clear decrypted seed
								decryptedSeed.fill(0);
							
								// TODO Securely clear key
							
								// Reject error
								reject(error);
							});
						}
						
						// Otherwise
						else {
					
							// TODO Securely clear key
						
							// Resolve
							resolve([
							
								// Decrypted seed
								decryptedSeed,
								
								// No BIP39 salt
								Wallet.NO_BIP39_SALT
							]);
						}
					
					// Catch errors
					}).catch(function(error) {
					
						// TODO Securely clear key
					
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
		
		// Encrypt root public key
		encryptRootPublicKey(password, salt, numberOfIterations, initializationVector) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Check if wallet isn't open
				if(self.isOpen() === false) {
				
					// Reject error
					reject("Wallet closed.");
				}
				
				// Otherwise
				else {
			
					// Return getting key
					return Wallet.getKey(password, salt, numberOfIterations).then(function(key) {
			
						// Return encrypting the root public key using key and initialization vector
						return crypto["subtle"].encrypt({
						
							// Name
							"name": Wallet.ENCRYPTION_ALGORITHM,
							
							// Initialization vector
							"iv": initializationVector
							
						}, key, self.rootPublicKey).then(function(encryptedRootPublicKey) {
						
							// TODO Securely clear key
						
							// Resolve encrypted root public key
							resolve(new Uint8Array(encryptedRootPublicKey));
						
						// Catch errors
						}).catch(function(error) {
						
							// TODO Securely clear key
						
							// Reject error
							reject(error);
						});
						
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				}
			});
		}
		
		// Decrypt root public key
		decryptRootPublicKey(password, salt, numberOfIterations, initializationVector) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Return getting key
				return Wallet.getKey(password, salt, numberOfIterations).then(function(key) {
				
					// Return decrypting the encrypted root public key using key and initialization vector
					return crypto["subtle"].decrypt({
					
						// Name
						"name": Wallet.ENCRYPTION_ALGORITHM,
						
						// Initialization vector
						"iv": initializationVector
						
					}, key, self.getEncryptedRootPublicKey()).then(function(decryptedRootPublicKey) {
					
						// TODO Securely clear key
					
						// Resolve decrypted root public key
						resolve(new Uint8Array(decryptedRootPublicKey));
					
					// Catch errors
					}).catch(function(error) {
					
						// TODO Securely clear key
					
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
		
		// Get key
		static getKey(password, salt, numberOfIterations) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Get the saved password pepper
				var passwordPepper = localStorage.getItem(Wallet.PASSWORD_PEPPER_LOCAL_STORAGE_NAME);
				
				// Check if password pepper exists and is valid
				if(passwordPepper !== Common.INVALID_LOCAL_STORAGE_ITEM && Common.isHexString(passwordPepper) === true) {
				
					// Initialize combined password
					var combinedPassword = Common.mergeArrays([
					
						// Password
						password,
						
						// Password pepper
						Common.fromHexString(passwordPepper)
					]);
				
					// Return creating base key from password and password pepper
					return crypto["subtle"].importKey("raw", combinedPassword, {
					
						// Name
						"name": Wallet.IMPORT_ALGORITHM
					
					}, false, [
					
						// Derive key
						"deriveKey"
						
					]).then(function(baseKey) {
					
						// Securely clear combined password
						combinedPassword.fill(0);
					
						// Return deriving key from base key, salt, and number of iterations
						return crypto["subtle"].deriveKey({
						
							// Name
							"name": Wallet.IMPORT_ALGORITHM,
							
							// Salt
							"salt": salt,
							
							// Iterations
							"iterations": numberOfIterations,
							
							// Hash
							"hash": Wallet.DIGEST_ALGORITHM
							
						}, baseKey, {
						
							// Name
							"name": Wallet.ENCRYPTION_ALGORITHM,
							
							// Length
							"length": Wallet.ENCRYPTION_KEY_LENGTH
							
						}, false, [
						
							// Encrypt
							"encrypt",
							
							// Decrypt
							"decrypt"
						
						]).then(function(derivedKey) {
						
							// TODO Securely clear baseKey
						
							// Resolve derived key
							resolve(derivedKey);
						
						// Catch errors
						}).catch(function(error) {
						
							// TODO Securely clear baseKey
						
							// Reject error
							reject(error);
						});
				
					// Catch errors
					}).catch(function(error) {
					
						// Securely clear combined password
						combinedPassword.fill(0);
					
						// Reject error
						reject(error);
					});
				}
				
				// Otherwise
				else {
				
					// Reject
					reject();
				}
			});
		}
		
		// To linear color space
		static toLinearColorSpace(color) {
		
			// Normalize color
			var normalizedColor = color / Common.BYTE_MAX_VALUE;
			
			// Return color in linear color space
			return (normalizedColor <= 0.03928) ? normalizedColor / 12.92 : Math.pow(((normalizedColor + 0.055) / 1.055), 2.4);
		}
		
		// Get luminance
		static getLuminance(red, green, blue) {
		
			// Return luminance of colors in linear color space
			return 0.2126 * Wallet.toLinearColorSpace(red) + 0.7152 * Wallet.toLinearColorSpace(green) + 0.0722 * Wallet.toLinearColorSpace(blue);
		}
		
		// Get random color
		static getRandomColor() {
		
			// Loop forever
			while(true) {
			
				// Get random red, green, and blue values
				var red = Common.randomNumber(0, Common.BYTE_MAX_VALUE);
				var green = Common.randomNumber(0, Common.BYTE_MAX_VALUE);
				var blue = Common.randomNumber(0, Common.BYTE_MAX_VALUE);
				
				// Get luminance of combined colors
				var luminance = Wallet.getLuminance(red, green, blue);
				
				// Check if luminance isn't too bright or too dark
				if((luminance + 0.05) / (0 + 0.05) <= (1 + 0.05) / (luminance + 0.05) && luminance > 0.02)
					
					// Return combined color
					return "#" + Math.floor(red).toString(Common.HEX_NUMBER_BASE).padStart(Common.HEX_NUMBER_LENGTH, Common.HEX_NUMBER_PADDING) + Math.floor(green).toString(Common.HEX_NUMBER_BASE).padStart(Common.HEX_NUMBER_LENGTH, Common.HEX_NUMBER_PADDING) + Math.floor(blue).toString(Common.HEX_NUMBER_BASE).padStart(Common.HEX_NUMBER_LENGTH, Common.HEX_NUMBER_PADDING);
			}
		}
		
		// No seed
		static get NO_SEED() {
		
			// Return no seed
			return null;
		}
		
		// No root public key
		static get NO_ROOT_PUBLIC_KEY() {
		
			// Return no root public key
			return null;
		}
		
		// No extended private key
		static get NO_EXTENDED_PRIVATE_KEY() {
		
			// Return no extended private key
			return null;
		}
		
		// No hardware wallet
		static get NO_HARDWARE_WALLET() {
		
			// Return no hardware wallet
			return null;
		}
		
		// No passphrase
		static get NO_PASSPHRASE() {
		
			// Return no passphrase
			return null;
		}
		
		// No BIP39 salt
		static get NO_BIP39_SALT() {
		
			// Return no BIP39 salt
			return null;
		}
		
		// Salt length
		static get SALT_LENGTH() {
		
			// Return salt length
			return 32;
		}
		
		// Initialization vector length
		static get INITIALIZATION_VECTOR_LENGTH() {
		
			// Return initialization vector length
			return 32;
		}
		
		// Default number of iterations
		static get DEFAULT_NUMBER_OF_ITERATIONS() {
		
			// Return default number of iterations
			return 200000;
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
		
		// Color pattern
		static get COLOR_PATTERN() {
		
			// Return whitespace pattern
			return /^#[0-9A-F]{6}$/iu;
		}
		
		// Seed key
		static get SEED_KEY() {
		
			// Return seed key
			return "IamVoldemort";
		}
		
		// Password pepper local storage name
		static get PASSWORD_PEPPER_LOCAL_STORAGE_NAME() {
		
			// Return password pepper local storage name
			return "Password Pepper";
		}
		
		// Password pepper length
		static get PASSWORD_PEPPER_LENGTH() {
		
			// Return password peper length
			return 32;
		}
		
		// Payment proof address Tor key index
		static get PAYMENT_PROOF_TOR_ADDRESS_KEY_INDEX() {
		
			// Return payment proof Tor address key index
			return 0;
		}
		
		// Payment proof MQS address key index
		static get PAYMENT_PROOF_MQS_ADDRESS_KEY_INDEX() {
		
			// Return payment proof MQS address key index
			return 0;
		}
		
		// Payment proof address Slatepack key index
		static get PAYMENT_PROOF_SLATEPACK_ADDRESS_KEY_INDEX() {
		
			// Return payment proof Slatepack address key index
			return 0;
		}
		
		// Seed cookie digest algorithm
		static get SEED_COOKIE_DIGEST_ALGORITHM() {
		
			// Return seed cookie digest algorithm
			return "SHA-512";
		}
}


// Main function

// Set global object's wallet
globalThis["Wallet"] = Wallet;

// Export wallet
module["exports"] = Wallet;
