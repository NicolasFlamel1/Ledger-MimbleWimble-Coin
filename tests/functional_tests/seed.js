// Use strict
"use strict";


// Requires
const crypto = require("crypto")["webcrypto"];
const Secp256k1Zkp = require("./secp256k1-zkp-0.0.29.js");
const Common = require("./common.js");
const Identifier = require("./identifier.js");
const Crypto = require("./crypto.js");
const Consensus = require("./consensus.js");
const Wallet = require("./wallet.js");


// Classes

// Seed class
class Seed {

	// Public
	
		// Constructor
		constructor() {
		
			// Set seed to invalid
			this.seed = Seed.INVALID_SEED;
		}
		
		// Initialize
		initialize(seedOrMnemonicOrSeedLength = Seed.DEFAULT_SEED_LENGTH, existingSeeds = []) {
		
			// Uninitialize
			this.uninitialize();
		
			// Set self
			var self = this;
			
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Return generating seed from seed, mnemonic, or seed length
				return Seed.generateSeed(seedOrMnemonicOrSeedLength, existingSeeds).then(function(seed) {
				
					// Set seed
					self.seed = seed;
					
					// Resolve
					resolve();
					
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Uninitialize
		uninitialize() {
		
			// Check if seed exists
			if(this.seed !== Seed.INVALID_SEED)
			
				// Securely clear the seed
				this.seed.fill(0);
		
			// Set seed to invalid
			this.seed = Seed.INVALID_SEED;
		}
		
		// Get seed
		getSeed() {
		
			// Check if seed is invalid
			if(this.seed === Seed.INVALID_SEED)
			
				// Throw error
				throw "Invalid seed.";
		
			// Return seed
			return this.seed;
		}
		
		// Get mnemonic
		getMnemonic() {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if seed is invalid
				if(self.seed === Seed.INVALID_SEED) {
				
					// Reject error
					reject("Invalid seed.");
					
					// Return
					return;
				}
			
				// Check if seed's length is invalid
				if(Seed.VALID_SEED_LENGTHS.indexOf(self.seed["length"]) === Common.INDEX_NOT_FOUND) {
				
					// Reject error
					reject("Seed length is invalid.");
					
					// Return
					return;
				}
				
				// Get number of checksum bits
				var numberOfChecksumBits = Math.floor(self.seed["length"] / Seed.MNEMONIC_CHECKSUM_BITS_PER_LENGTH);
				
				// Get number of mnemonic words
				var numberOfMnemonicWords = Math.floor((self.seed["length"] * Seed.SEED_NUMBER_BASE + numberOfChecksumBits) / Seed.MNEMONIC_NUMBER_BASE);
				
				// Initialize mnemonic word's indices
				var mnemonicWordsIndices = (new Array(numberOfMnemonicWords)).fill(0);
				
				// Initialize index location
				var indexLocation = 0;
				
				// Go through all bytes in the seed
				for(var i = 0; i < self.seed["length"]; ++i) {
				
					// Get byte
					var byte = self.seed[i];
				
					// Go through all bits in the byte
					for(var j = Seed.SEED_NUMBER_BASE - 1; j >= 0; --j) {
					
						// Get bit
						var bit = ((byte & (1 << j)) !== 0) ? 1 : 0;
						
						// Update mnemonic word's indices at current location to be in the mnemonic number base
						mnemonicWordsIndices[Math.floor(indexLocation / Seed.MNEMONIC_NUMBER_BASE)] |= bit << ((Seed.MNEMONIC_NUMBER_BASE - 1) - (indexLocation % Seed.MNEMONIC_NUMBER_BASE));
						
						// Update index location
						++indexLocation;
					}
				}
				
				// Return getting hash of seed
				return crypto["subtle"].digest(Seed.CHECKSUM_HASH, self.seed).then(function(hash) {
				
					// Get hash in correct format
					hash = new Uint8Array(hash);
					
					// Calculate checksum from hash
					var checksumMask = ((1 << numberOfChecksumBits) - 1) & Common.BYTE_MAX_VALUE;
					var checksum = (hash[0] >>> (Seed.SEED_NUMBER_BASE - numberOfChecksumBits)) & checksumMask;
					
					// Go through all checksum bits
					for(var i = numberOfChecksumBits - 1; i >= 0; --i) {
					
						// Get bit
						var bit = ((checksum & (1 << i)) !== 0) ? 1 : 0;
						
						// Update mnemonic word's indices at current location to be in the mnemonic number base
						mnemonicWordsIndices[Math.floor(indexLocation / Seed.MNEMONIC_NUMBER_BASE)] |= bit << ((Seed.MNEMONIC_NUMBER_BASE - 1) - (indexLocation % Seed.MNEMONIC_NUMBER_BASE));
						
						// Update index location
						++indexLocation;
					}
					
					// Initialize mnemonic
					var mnemonic = [];
					
					// Go through all mnemonic word's indices
					for(var i = 0; i < mnemonicWordsIndices["length"]; ++i)
					
						// Append mnemonic word at index to mnemonic
						mnemonic.push(Seed.MNEMONIC_WORDS[mnemonicWordsIndices[i]]);
					
					// Set result to the mnemonic words separated by a space
					var result = mnemonic.join(" ");
					
					// TODO Securely clear mnemonicWordsIndices and mnemonic
					
					// Resolve result
					resolve(result);
				
				}).catch(function(error) {
				
					// TODO Securely clear mnemonicWordsIndices
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Get extended private key
		getExtendedPrivateKey(key, useBip39 = false, bip39Salt = Seed.DEFAULT_BIP39_SALT) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if seed is invalid
				if(self.seed === Seed.INVALID_SEED) {
				
					// Reject error
					reject("Invalid seed.");
					
					// Return
					return;
				}
				
				// Check if not using BIP39
				if(useBip39 === false) {
			
					// Return creating crypto key from provided key
					return crypto["subtle"].importKey("raw", (new TextEncoder()).encode(key), {
					
						// Name
						"name": Seed.ENCRYPTION_ALGORITHM,
						
						// Hash
						"hash": {
						
							// Name
							"name": Seed.DIGEST_ALGORITHM
						}
					}, false, [
					
						// Sign
						"sign"
					
					]).then(function(cryptoKey) {
					
						// Return creating extended private key from signing seed with crypto key
						return crypto["subtle"].sign(Seed.ENCRYPTION_ALGORITHM, cryptoKey, self.seed).then(function(extendedPrivateKey) {
						
							// Get extended private key in the correct format
							extendedPrivateKey = new Uint8Array(extendedPrivateKey);
							
							// Check if extended private key's secret key is a valid secret key
							if(Secp256k1Zkp.isValidSecretKey(extendedPrivateKey.subarray(0, Crypto.SECP256K1_SECRET_KEY_LENGTH)) === true) {
							
								// Resolve extended private key
								resolve(extendedPrivateKey);
							}
							
							// Otherwise
							else {
							
								// Securely clear extended private key
								extendedPrivateKey.fill(0);
							
								// Reject error
								reject("Invalid extended private key.");
							}
						
						// Catch errors
						}).catch(function(error) {
						
							// Reject error
							reject(error);
						});
					
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject("Invalid key.");
					});
				}
				
				// Otherwise
				else {
				
					// Return getting mnemonic
					return self.getMnemonic().then(function(mnemonic) {
					
						// Initialize mnemonic key
						var mnemonicKey = (new TextEncoder()).encode(mnemonic);
						
						// TODO Securely clear mnemonic
				
						// Return creating base key from mnemonic
						return crypto["subtle"].importKey("raw", mnemonicKey, {
						
							// Name
							"name": Seed.BIP39_IMPORT_ALGORITHM
						
						}, false, [
						
							// Derive key
							"deriveKey"
							
						]).then(function(baseKey) {
						
							// Securely clear mnemonic key
							mnemonicKey.fill(0);
							
							// Create salt
							var salt = Common.mergeArrays([
							
								// Mnemonic
								(new TextEncoder()).encode("mnemonic"),
								
								// BIP39 salt
								(bip39Salt !== Wallet.NO_BIP39_SALT) ? bip39Salt : Seed.DEFAULT_BIP39_SALT
							]);
						
							// Return deriving key from base key
							return crypto["subtle"].deriveKey({
							
								// Name
								"name": Seed.BIP39_IMPORT_ALGORITHM,
								
								// Salt
								"salt": salt,
								
								// Iterations
								"iterations": Seed.BIP39_DIGEST_NUMBER_OF_ITERATIONS,
								
								// Hash
								"hash": Seed.BIP39_DIGEST_ALGORITHM
								
							}, baseKey, {
							
								// Name
								"name": Seed.BIP39_ENCRYPTION_ALGORITHM,
								
								// Hash
								"hash": Seed.BIP39_ENCRYPTION_DIGEST_ALGORITHM,
								
								// Length
								"length": Seed.BIP39_ENCRYPTION_DIGEST_LENGTH
								
							}, true, [
							
								// Verify
								"verify"
							
							]).then(function(derivedKey) {
							
								// Securely clear salt
								salt.fill(0);
							
								// TODO Securely clear baseKey
							
								// Return exporting raw key
								return crypto["subtle"].exportKey("raw", derivedKey).then(function(rawKey) {
								
									// TODO Securely clear derivedKey
								
									// Get raw key in the correct format
									rawKey = new Uint8Array(rawKey);
									
									// Return creating crypto key from provided key
									return crypto["subtle"].importKey("raw", (new TextEncoder()).encode(key), {
									
										// Name
										"name": Seed.BIP39_ENCRYPTION_ALGORITHM,
										
										// Hash
										"hash": {
										
											// Name
											"name": Seed.BIP39_ENCRYPTION_DIGEST_ALGORITHM
										}
									}, false, [
									
										// Sign
										"sign"
									
									]).then(function(cryptoKey) {
									
										// Create extended private key
										var createExtendedPrivateKey = function(extendedPrivateKeyCandidate) {
										
											// Return promise
											return new Promise(function(resolve, reject) {
											
												// Return creating extended private key from signing extended private key candidate with crypto key
												return crypto["subtle"].sign(Seed.BIP39_ENCRYPTION_ALGORITHM, cryptoKey, extendedPrivateKeyCandidate).then(function(extendedPrivateKey) {
												
													// Get extended private key in the correct format
													extendedPrivateKey = new Uint8Array(extendedPrivateKey);
												
													// Check if extended private key's secret key is a valid secret key
													if(Secp256k1Zkp.isValidSecretKey(extendedPrivateKey.subarray(0, Crypto.SECP256K1_SECRET_KEY_LENGTH)) === true) {
													
														// Resolve extended private key
														resolve(extendedPrivateKey);
													}
													
													// Otherwise
													else {
													
														// Return creating extended private key
														return createExtendedPrivateKey(extendedPrivateKey).then(function(newExtendedPrivateKey) {
														
															// Securely clear extended private key
															extendedPrivateKey.fill(0);
															
															// Resolve new extended private key
															resolve(newExtendedPrivateKey);
															
														// Catch errors
														}).catch(function(error) {
														
															// Securely clear extended private key
															extendedPrivateKey.fill(0);
														
															// Reject error
															reject(error);
														});
													}
													
												// Catch errors
												}).catch(function(error) {
												
													// Reject error
													reject(error);
												});
											});
										};
									
										// Return creating extended private key from the raw key
										return createExtendedPrivateKey(rawKey).then(function(extendedPrivateKey) {
										
											// Securely clear raw key
											rawKey.fill(0);
											
											// Initialize path
											var path = new Uint32Array([
											
												// Purpose
												Seed.BIP44_PURPOSE | Identifier.PATH_HARDENED_MASK,
												
												// Coin type
												Consensus.BIP44_COIN_TYPE | Identifier.PATH_HARDENED_MASK,
												
												// Account
												Seed.BIP44_ACCOUNT | Identifier.PATH_HARDENED_MASK,
												
												// Change
												0,
												
												// Address index
												0
											]);
											
											// Return deriving child key at the path from the extended private key
											return Crypto.deriveChildKey(extendedPrivateKey, path, true).then(function(childKey) {
											
												// Securely clear extended private key
												extendedPrivateKey.fill(0);
												
												// Resolve child key
												resolve(childKey);
												
											// Catch errors
											}).catch(function(error) {
											
												// Securely clear extended private key
												extendedPrivateKey.fill(0);
											
												// Reject error
												reject(error);
											});
											
										// Catch errors
										}).catch(function(error) {
										
											// Securely clear raw key
											rawKey.fill(0);
										
											// Reject error
											reject(error);
										});
										
									// Catch errors
									}).catch(function(error) {
									
										// Securely clear raw key
										rawKey.fill(0);
									
										// Reject error
										reject(error);
									});
									
								// Catch errors
								}).catch(function(error) {
								
									// TODO Securely clear derivedKey
								
									// Reject error
									reject(error);
								});
								
							// Catch errors
							}).catch(function(error) {
							
								// Securely clear salt
								salt.fill(0);
							
								// TODO Securely clear baseKey
							
								// Reject error
								reject(error);
							});
							
						// Catch errors
						}).catch(function(error) {
						
							// Securely clear mnemonic key
							mnemonicKey.fill(0);
						
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
		
		// Default BIP39 salt
		static get DEFAULT_BIP39_SALT() {
		
			// Return default BIP39 salt
			return new Uint8Array([]);
		}
	
	// Private
	
		// Generate seed
		static generateSeed(seedOrMnemonicOrSeedLength, existingSeeds = []) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Check if a seed is provided
				if(seedOrMnemonicOrSeedLength instanceof Uint8Array === true) {
				
					// Get seed
					var seed = seedOrMnemonicOrSeedLength;
					
					// Check if seed's length is invalid
					if(Seed.VALID_SEED_LENGTHS.indexOf(seed["length"]) === Common.INDEX_NOT_FOUND) {
					
						// Reject error
						reject("Seed length is invalid.");
						
						// Return
						return;
					}
					
					// Resolve seed
					resolve(seed);
				}
				
				// Check if a seed is provided as an array
				else if(Array.isArray(seedOrMnemonicOrSeedLength) === true) {
				
					// Get seed
					var seed = seedOrMnemonicOrSeedLength;
					
					// Check if seed's length is invalid
					if(Seed.VALID_SEED_LENGTHS.indexOf(seed["length"]) === Common.INDEX_NOT_FOUND) {
					
						// Reject error
						reject("Seed length is invalid.");
						
						// Return
						return;
					}
					
					// Resolve seed
					resolve(new Uint8Array(seed));
				}
			
				// Otherwise check if a mnemonic is provided
				else if(typeof seedOrMnemonicOrSeedLength === "string") {
				
					// Get mnemonic
					var mnemonic = seedOrMnemonicOrSeedLength;
				
					// Split mnemonic into words
					var mnemonicWords = mnemonic.split(Seed.WHITESPACE_PATTERN).filter(function(value) {
					
						return value["length"] !== 0;
					});
					
					// Check if mnemonic words's length is invalid
					if(Seed.VALID_MNEMONIC_LENGTHS.indexOf(mnemonicWords["length"]) === Common.INDEX_NOT_FOUND) {
					
						// TODO Securely clear mnemonicWords
					
						// Reject error
						reject("Mnemonic word's length is invalid.");
						
						// Return
						return;
					}
					
					// Initialize mnemonic word's indices
					var mnemonicWordsIndices = [];
					
					// Go through all mnemonic words
					for(var i = 0; i < mnemonicWords["length"]; ++i) {
					
						// Check if mnemonic word is invalid
						var mnemonicWordsIndex = Seed.MNEMONIC_WORDS.indexOf(mnemonicWords[i].toLowerCase());
						
						if(mnemonicWordsIndex === Common.INDEX_NOT_FOUND) {
						
							// TODO Securely clear mnemonicWords and mnemonicWordsIndices
						
							// Reject error
							reject("Mnemonic word is invalid.");
							
							// Return
							return;
						}
					
						// Append mnemonic word's index to indices
						mnemonicWordsIndices.push(mnemonicWordsIndex);
					}
					
					// Get number of checksum bits
					var numberOfChecksumBits = Math.floor(mnemonicWords["length"] / Seed.SEED_CHECKSUM_BITS_PER_LENGTH);
					
					// Get checksum byte and remove it from the mnemonic word's indices
					var checksumByte = mnemonicWordsIndices.pop();
					
					// Get checksum
					var checksumMask = ((1 << numberOfChecksumBits) - 1) & Common.BYTE_MAX_VALUE;
					var checksum = (checksumByte & Common.BYTE_MAX_VALUE) & checksumMask;
					
					// Initialize seed
					var seedLength = Math.floor(((Seed.MNEMONIC_NUMBER_BASE * mnemonicWords["length"]) - numberOfChecksumBits) / Seed.SEED_NUMBER_BASE) - 1;
					var seed = new Uint8Array(seedLength + 1);
					
					// Set checksum byte in seed
					seed[seed["length"] - 1] = checksumByte >>> numberOfChecksumBits;
					
					// Initialize seed location
					var seedLocation = Seed.MNEMONIC_NUMBER_BASE - numberOfChecksumBits;
					
					// Go through all mnemonic word's indices
					for(var i = mnemonicWordsIndices["length"] - 1; i >= 0; --i) {
					
						// Get index
						var index = mnemonicWordsIndices[i];
						
						// Go through all bits in the index
						for(var j = 0; j < Seed.MNEMONIC_NUMBER_BASE; ++j) {
						
							// Get bit
							var bit = ((index & (1 << j)) !== 0) ? 1 : 0;
							
							// Update seed at current location to be in the seed number base
							seed[seedLength - Math.floor(seedLocation / Seed.SEED_NUMBER_BASE)] |= bit << (seedLocation % Seed.SEED_NUMBER_BASE);
							
							// Update seed location
							++seedLocation;
						}
					}
					
					// TODO Securely clear mnemonicWords and mnemonicWordsIndices
					
					// Return getting hash from seed
					return crypto["subtle"].digest(Seed.CHECKSUM_HASH, seed).then(function(hash) {
					
						// Get hash
						hash = new Uint8Array(hash);
						
						// Calculate expected checksum from hash
						var expectedChecksum = (hash[0] >>> (Seed.SEED_NUMBER_BASE - numberOfChecksumBits)) & checksumMask;
						
						// Check if checksum doesn't match the expected checksum
						if(checksum !== expectedChecksum) {
						
							// Securely clear seed
							seed.fill(0);
						
							// Reject error
							reject("Mnemonic checksum is invalid.");
							
							// Return
							return;
						}
						
						// Resolve seed
						resolve(seed);
					
					// Catch errors
					}).catch(function(error) {
					
						// Securely clear seed
						seed.fill(0);
					
						// Reject error
						reject(error);
					});
				}
				
				// Otherwise check if a seed length is provided
				else if(typeof seedOrMnemonicOrSeedLength === "number") {
				
					// Get seed length
					var seedLength = seedOrMnemonicOrSeedLength;
					
					// Check if seed length is invalid
					if(Seed.VALID_SEED_LENGTHS.indexOf(seedLength) === Common.INDEX_NOT_FOUND) {
					
						// Reject error
						reject("Seed length is invalid.");
						
						// Return
						return;
					}

					// Create seed with a length equal to the seed length
					var seed = new Uint8Array(seedLength);
					
					// Loop forever
					while(true) {
					
						// Fill seed with random values
						crypto.getRandomValues(seed);
						
						// Set seed already exists
						var seedAlreadyExists = false;
						
						// Go through all existing seeds
						for(var i = 0; i < existingSeeds["length"]; ++i) {
						
							// Check if existing seed exists
							if(existingSeeds[i].seed !== Seed.INVALID_SEED) {
							
								// Check if seed already exists
								if(Common.arraysAreEqualTimingSafe(seed, existingSeeds[i].seed) === true) {
								
									// Set seed already exists
									seedAlreadyExists = true;
									
									// Break
									break;
								}
							}
						}
						
						// Check if seed doesn't already exist
						if(seedAlreadyExists === false)
						
							// Break
							break;
					}
					
					// Resolve seed
					resolve(seed);
				}
				
				// Otherwise
				else
				
					// Reject error
					reject("Argument is invalid.");
			});
		}
		
		// Valid seed lengths
		static get VALID_SEED_LENGTHS() {
		
			// Return valid seed lengths
			return [
				4 * 4,
				4 * 5,
				4 * 6,
				4 * 7,
				4 * 8
			];
		}

		// Default seed length
		static get DEFAULT_SEED_LENGTH() {
		
			// Return default seed length
			return Seed.VALID_SEED_LENGTHS[Seed.VALID_SEED_LENGTHS["length"] - 1];
		}
		
		// Seed number base
		static get SEED_NUMBER_BASE() {
		
			// Return seed number base
			return Math.ceil(Math.log2(Common.BYTE_MAX_VALUE + 1));
		}

		// Seed checksum bits per length
		static get SEED_CHECKSUM_BITS_PER_LENGTH() {
		
			// Return seed checksum bits per length
			return Math.ceil(Math.log2(Seed.SEED_NUMBER_BASE));
		}

		// Valid mnemonic lengths
		static get VALID_MNEMONIC_LENGTHS() {
		
			// Return valid mnemonic lengths
			return Seed.VALID_SEED_LENGTHS.map(function(validSeedLength) {
			
				return Math.floor(validSeedLength * Seed.SEED_CHECKSUM_BITS_PER_LENGTH / Seed.MNEMONIC_CHECKSUM_BITS_PER_LENGTH);
			});
		}
		
		// Mnemonic words
		static get MNEMONIC_WORDS() {
		
			// Return mnemonic words
			return [
				"abandon",
				"ability",
				"able",
				"about",
				"above",
				"absent",
				"absorb",
				"abstract",
				"absurd",
				"abuse",
				"access",
				"accident",
				"account",
				"accuse",
				"achieve",
				"acid",
				"acoustic",
				"acquire",
				"across",
				"act",
				"action",
				"actor",
				"actress",
				"actual",
				"adapt",
				"add",
				"addict",
				"address",
				"adjust",
				"admit",
				"adult",
				"advance",
				"advice",
				"aerobic",
				"affair",
				"afford",
				"afraid",
				"again",
				"age",
				"agent",
				"agree",
				"ahead",
				"aim",
				"air",
				"airport",
				"aisle",
				"alarm",
				"album",
				"alcohol",
				"alert",
				"alien",
				"all",
				"alley",
				"allow",
				"almost",
				"alone",
				"alpha",
				"already",
				"also",
				"alter",
				"always",
				"amateur",
				"amazing",
				"among",
				"amount",
				"amused",
				"analyst",
				"anchor",
				"ancient",
				"anger",
				"angle",
				"angry",
				"animal",
				"ankle",
				"announce",
				"annual",
				"another",
				"answer",
				"antenna",
				"antique",
				"anxiety",
				"any",
				"apart",
				"apology",
				"appear",
				"apple",
				"approve",
				"april",
				"arch",
				"arctic",
				"area",
				"arena",
				"argue",
				"arm",
				"armed",
				"armor",
				"army",
				"around",
				"arrange",
				"arrest",
				"arrive",
				"arrow",
				"art",
				"artefact",
				"artist",
				"artwork",
				"ask",
				"aspect",
				"assault",
				"asset",
				"assist",
				"assume",
				"asthma",
				"athlete",
				"atom",
				"attack",
				"attend",
				"attitude",
				"attract",
				"auction",
				"audit",
				"august",
				"aunt",
				"author",
				"auto",
				"autumn",
				"average",
				"avocado",
				"avoid",
				"awake",
				"aware",
				"away",
				"awesome",
				"awful",
				"awkward",
				"axis",
				"baby",
				"bachelor",
				"bacon",
				"badge",
				"bag",
				"balance",
				"balcony",
				"ball",
				"bamboo",
				"banana",
				"banner",
				"bar",
				"barely",
				"bargain",
				"barrel",
				"base",
				"basic",
				"basket",
				"battle",
				"beach",
				"bean",
				"beauty",
				"because",
				"become",
				"beef",
				"before",
				"begin",
				"behave",
				"behind",
				"believe",
				"below",
				"belt",
				"bench",
				"benefit",
				"best",
				"betray",
				"better",
				"between",
				"beyond",
				"bicycle",
				"bid",
				"bike",
				"bind",
				"biology",
				"bird",
				"birth",
				"bitter",
				"black",
				"blade",
				"blame",
				"blanket",
				"blast",
				"bleak",
				"bless",
				"blind",
				"blood",
				"blossom",
				"blouse",
				"blue",
				"blur",
				"blush",
				"board",
				"boat",
				"body",
				"boil",
				"bomb",
				"bone",
				"bonus",
				"book",
				"boost",
				"border",
				"boring",
				"borrow",
				"boss",
				"bottom",
				"bounce",
				"box",
				"boy",
				"bracket",
				"brain",
				"brand",
				"brass",
				"brave",
				"bread",
				"breeze",
				"brick",
				"bridge",
				"brief",
				"bright",
				"bring",
				"brisk",
				"broccoli",
				"broken",
				"bronze",
				"broom",
				"brother",
				"brown",
				"brush",
				"bubble",
				"buddy",
				"budget",
				"buffalo",
				"build",
				"bulb",
				"bulk",
				"bullet",
				"bundle",
				"bunker",
				"burden",
				"burger",
				"burst",
				"bus",
				"business",
				"busy",
				"butter",
				"buyer",
				"buzz",
				"cabbage",
				"cabin",
				"cable",
				"cactus",
				"cage",
				"cake",
				"call",
				"calm",
				"camera",
				"camp",
				"can",
				"canal",
				"cancel",
				"candy",
				"cannon",
				"canoe",
				"canvas",
				"canyon",
				"capable",
				"capital",
				"captain",
				"car",
				"carbon",
				"card",
				"cargo",
				"carpet",
				"carry",
				"cart",
				"case",
				"cash",
				"casino",
				"castle",
				"casual",
				"cat",
				"catalog",
				"catch",
				"category",
				"cattle",
				"caught",
				"cause",
				"caution",
				"cave",
				"ceiling",
				"celery",
				"cement",
				"census",
				"century",
				"cereal",
				"certain",
				"chair",
				"chalk",
				"champion",
				"change",
				"chaos",
				"chapter",
				"charge",
				"chase",
				"chat",
				"cheap",
				"check",
				"cheese",
				"chef",
				"cherry",
				"chest",
				"chicken",
				"chief",
				"child",
				"chimney",
				"choice",
				"choose",
				"chronic",
				"chuckle",
				"chunk",
				"churn",
				"cigar",
				"cinnamon",
				"circle",
				"citizen",
				"city",
				"civil",
				"claim",
				"clap",
				"clarify",
				"claw",
				"clay",
				"clean",
				"clerk",
				"clever",
				"click",
				"client",
				"cliff",
				"climb",
				"clinic",
				"clip",
				"clock",
				"clog",
				"close",
				"cloth",
				"cloud",
				"clown",
				"club",
				"clump",
				"cluster",
				"clutch",
				"coach",
				"coast",
				"coconut",
				"code",
				"coffee",
				"coil",
				"coin",
				"collect",
				"color",
				"column",
				"combine",
				"come",
				"comfort",
				"comic",
				"common",
				"company",
				"concert",
				"conduct",
				"confirm",
				"congress",
				"connect",
				"consider",
				"control",
				"convince",
				"cook",
				"cool",
				"copper",
				"copy",
				"coral",
				"core",
				"corn",
				"correct",
				"cost",
				"cotton",
				"couch",
				"country",
				"couple",
				"course",
				"cousin",
				"cover",
				"coyote",
				"crack",
				"cradle",
				"craft",
				"cram",
				"crane",
				"crash",
				"crater",
				"crawl",
				"crazy",
				"cream",
				"credit",
				"creek",
				"crew",
				"cricket",
				"crime",
				"crisp",
				"critic",
				"crop",
				"cross",
				"crouch",
				"crowd",
				"crucial",
				"cruel",
				"cruise",
				"crumble",
				"crunch",
				"crush",
				"cry",
				"crystal",
				"cube",
				"culture",
				"cup",
				"cupboard",
				"curious",
				"current",
				"curtain",
				"curve",
				"cushion",
				"custom",
				"cute",
				"cycle",
				"dad",
				"damage",
				"damp",
				"dance",
				"danger",
				"daring",
				"dash",
				"daughter",
				"dawn",
				"day",
				"deal",
				"debate",
				"debris",
				"decade",
				"december",
				"decide",
				"decline",
				"decorate",
				"decrease",
				"deer",
				"defense",
				"define",
				"defy",
				"degree",
				"delay",
				"deliver",
				"demand",
				"demise",
				"denial",
				"dentist",
				"deny",
				"depart",
				"depend",
				"deposit",
				"depth",
				"deputy",
				"derive",
				"describe",
				"desert",
				"design",
				"desk",
				"despair",
				"destroy",
				"detail",
				"detect",
				"develop",
				"device",
				"devote",
				"diagram",
				"dial",
				"diamond",
				"diary",
				"dice",
				"diesel",
				"diet",
				"differ",
				"digital",
				"dignity",
				"dilemma",
				"dinner",
				"dinosaur",
				"direct",
				"dirt",
				"disagree",
				"discover",
				"disease",
				"dish",
				"dismiss",
				"disorder",
				"display",
				"distance",
				"divert",
				"divide",
				"divorce",
				"dizzy",
				"doctor",
				"document",
				"dog",
				"doll",
				"dolphin",
				"domain",
				"donate",
				"donkey",
				"donor",
				"door",
				"dose",
				"double",
				"dove",
				"draft",
				"dragon",
				"drama",
				"drastic",
				"draw",
				"dream",
				"dress",
				"drift",
				"drill",
				"drink",
				"drip",
				"drive",
				"drop",
				"drum",
				"dry",
				"duck",
				"dumb",
				"dune",
				"during",
				"dust",
				"dutch",
				"duty",
				"dwarf",
				"dynamic",
				"eager",
				"eagle",
				"early",
				"earn",
				"earth",
				"easily",
				"east",
				"easy",
				"echo",
				"ecology",
				"economy",
				"edge",
				"edit",
				"educate",
				"effort",
				"egg",
				"eight",
				"either",
				"elbow",
				"elder",
				"electric",
				"elegant",
				"element",
				"elephant",
				"elevator",
				"elite",
				"else",
				"embark",
				"embody",
				"embrace",
				"emerge",
				"emotion",
				"employ",
				"empower",
				"empty",
				"enable",
				"enact",
				"end",
				"endless",
				"endorse",
				"enemy",
				"energy",
				"enforce",
				"engage",
				"engine",
				"enhance",
				"enjoy",
				"enlist",
				"enough",
				"enrich",
				"enroll",
				"ensure",
				"enter",
				"entire",
				"entry",
				"envelope",
				"episode",
				"equal",
				"equip",
				"era",
				"erase",
				"erode",
				"erosion",
				"error",
				"erupt",
				"escape",
				"essay",
				"essence",
				"estate",
				"eternal",
				"ethics",
				"evidence",
				"evil",
				"evoke",
				"evolve",
				"exact",
				"example",
				"excess",
				"exchange",
				"excite",
				"exclude",
				"excuse",
				"execute",
				"exercise",
				"exhaust",
				"exhibit",
				"exile",
				"exist",
				"exit",
				"exotic",
				"expand",
				"expect",
				"expire",
				"explain",
				"expose",
				"express",
				"extend",
				"extra",
				"eye",
				"eyebrow",
				"fabric",
				"face",
				"faculty",
				"fade",
				"faint",
				"faith",
				"fall",
				"false",
				"fame",
				"family",
				"famous",
				"fan",
				"fancy",
				"fantasy",
				"farm",
				"fashion",
				"fat",
				"fatal",
				"father",
				"fatigue",
				"fault",
				"favorite",
				"feature",
				"february",
				"federal",
				"fee",
				"feed",
				"feel",
				"female",
				"fence",
				"festival",
				"fetch",
				"fever",
				"few",
				"fiber",
				"fiction",
				"field",
				"figure",
				"file",
				"film",
				"filter",
				"final",
				"find",
				"fine",
				"finger",
				"finish",
				"fire",
				"firm",
				"first",
				"fiscal",
				"fish",
				"fit",
				"fitness",
				"fix",
				"flag",
				"flame",
				"flash",
				"flat",
				"flavor",
				"flee",
				"flight",
				"flip",
				"float",
				"flock",
				"floor",
				"flower",
				"fluid",
				"flush",
				"fly",
				"foam",
				"focus",
				"fog",
				"foil",
				"fold",
				"follow",
				"food",
				"foot",
				"force",
				"forest",
				"forget",
				"fork",
				"fortune",
				"forum",
				"forward",
				"fossil",
				"foster",
				"found",
				"fox",
				"fragile",
				"frame",
				"frequent",
				"fresh",
				"friend",
				"fringe",
				"frog",
				"front",
				"frost",
				"frown",
				"frozen",
				"fruit",
				"fuel",
				"fun",
				"funny",
				"furnace",
				"fury",
				"future",
				"gadget",
				"gain",
				"galaxy",
				"gallery",
				"game",
				"gap",
				"garage",
				"garbage",
				"garden",
				"garlic",
				"garment",
				"gas",
				"gasp",
				"gate",
				"gather",
				"gauge",
				"gaze",
				"general",
				"genius",
				"genre",
				"gentle",
				"genuine",
				"gesture",
				"ghost",
				"giant",
				"gift",
				"giggle",
				"ginger",
				"giraffe",
				"girl",
				"give",
				"glad",
				"glance",
				"glare",
				"glass",
				"glide",
				"glimpse",
				"globe",
				"gloom",
				"glory",
				"glove",
				"glow",
				"glue",
				"goat",
				"goddess",
				"gold",
				"good",
				"goose",
				"gorilla",
				"gospel",
				"gossip",
				"govern",
				"gown",
				"grab",
				"grace",
				"grain",
				"grant",
				"grape",
				"grass",
				"gravity",
				"great",
				"green",
				"grid",
				"grief",
				"grit",
				"grocery",
				"group",
				"grow",
				"grunt",
				"guard",
				"guess",
				"guide",
				"guilt",
				"guitar",
				"gun",
				"gym",
				"habit",
				"hair",
				"half",
				"hammer",
				"hamster",
				"hand",
				"happy",
				"harbor",
				"hard",
				"harsh",
				"harvest",
				"hat",
				"have",
				"hawk",
				"hazard",
				"head",
				"health",
				"heart",
				"heavy",
				"hedgehog",
				"height",
				"hello",
				"helmet",
				"help",
				"hen",
				"hero",
				"hidden",
				"high",
				"hill",
				"hint",
				"hip",
				"hire",
				"history",
				"hobby",
				"hockey",
				"hold",
				"hole",
				"holiday",
				"hollow",
				"home",
				"honey",
				"hood",
				"hope",
				"horn",
				"horror",
				"horse",
				"hospital",
				"host",
				"hotel",
				"hour",
				"hover",
				"hub",
				"huge",
				"human",
				"humble",
				"humor",
				"hundred",
				"hungry",
				"hunt",
				"hurdle",
				"hurry",
				"hurt",
				"husband",
				"hybrid",
				"ice",
				"icon",
				"idea",
				"identify",
				"idle",
				"ignore",
				"ill",
				"illegal",
				"illness",
				"image",
				"imitate",
				"immense",
				"immune",
				"impact",
				"impose",
				"improve",
				"impulse",
				"inch",
				"include",
				"income",
				"increase",
				"index",
				"indicate",
				"indoor",
				"industry",
				"infant",
				"inflict",
				"inform",
				"inhale",
				"inherit",
				"initial",
				"inject",
				"injury",
				"inmate",
				"inner",
				"innocent",
				"input",
				"inquiry",
				"insane",
				"insect",
				"inside",
				"inspire",
				"install",
				"intact",
				"interest",
				"into",
				"invest",
				"invite",
				"involve",
				"iron",
				"island",
				"isolate",
				"issue",
				"item",
				"ivory",
				"jacket",
				"jaguar",
				"jar",
				"jazz",
				"jealous",
				"jeans",
				"jelly",
				"jewel",
				"job",
				"join",
				"joke",
				"journey",
				"joy",
				"judge",
				"juice",
				"jump",
				"jungle",
				"junior",
				"junk",
				"just",
				"kangaroo",
				"keen",
				"keep",
				"ketchup",
				"key",
				"kick",
				"kid",
				"kidney",
				"kind",
				"kingdom",
				"kiss",
				"kit",
				"kitchen",
				"kite",
				"kitten",
				"kiwi",
				"knee",
				"knife",
				"knock",
				"know",
				"lab",
				"label",
				"labor",
				"ladder",
				"lady",
				"lake",
				"lamp",
				"language",
				"laptop",
				"large",
				"later",
				"latin",
				"laugh",
				"laundry",
				"lava",
				"law",
				"lawn",
				"lawsuit",
				"layer",
				"lazy",
				"leader",
				"leaf",
				"learn",
				"leave",
				"lecture",
				"left",
				"leg",
				"legal",
				"legend",
				"leisure",
				"lemon",
				"lend",
				"length",
				"lens",
				"leopard",
				"lesson",
				"letter",
				"level",
				"liar",
				"liberty",
				"library",
				"license",
				"life",
				"lift",
				"light",
				"like",
				"limb",
				"limit",
				"link",
				"lion",
				"liquid",
				"list",
				"little",
				"live",
				"lizard",
				"load",
				"loan",
				"lobster",
				"local",
				"lock",
				"logic",
				"lonely",
				"long",
				"loop",
				"lottery",
				"loud",
				"lounge",
				"love",
				"loyal",
				"lucky",
				"luggage",
				"lumber",
				"lunar",
				"lunch",
				"luxury",
				"lyrics",
				"machine",
				"mad",
				"magic",
				"magnet",
				"maid",
				"mail",
				"main",
				"major",
				"make",
				"mammal",
				"man",
				"manage",
				"mandate",
				"mango",
				"mansion",
				"manual",
				"maple",
				"marble",
				"march",
				"margin",
				"marine",
				"market",
				"marriage",
				"mask",
				"mass",
				"master",
				"match",
				"material",
				"math",
				"matrix",
				"matter",
				"maximum",
				"maze",
				"meadow",
				"mean",
				"measure",
				"meat",
				"mechanic",
				"medal",
				"media",
				"melody",
				"melt",
				"member",
				"memory",
				"mention",
				"menu",
				"mercy",
				"merge",
				"merit",
				"merry",
				"mesh",
				"message",
				"metal",
				"method",
				"middle",
				"midnight",
				"milk",
				"million",
				"mimic",
				"mind",
				"minimum",
				"minor",
				"minute",
				"miracle",
				"mirror",
				"misery",
				"miss",
				"mistake",
				"mix",
				"mixed",
				"mixture",
				"mobile",
				"model",
				"modify",
				"mom",
				"moment",
				"monitor",
				"monkey",
				"monster",
				"month",
				"moon",
				"moral",
				"more",
				"morning",
				"mosquito",
				"mother",
				"motion",
				"motor",
				"mountain",
				"mouse",
				"move",
				"movie",
				"much",
				"muffin",
				"mule",
				"multiply",
				"muscle",
				"museum",
				"mushroom",
				"music",
				"must",
				"mutual",
				"myself",
				"mystery",
				"myth",
				"naive",
				"name",
				"napkin",
				"narrow",
				"nasty",
				"nation",
				"nature",
				"near",
				"neck",
				"need",
				"negative",
				"neglect",
				"neither",
				"nephew",
				"nerve",
				"nest",
				"net",
				"network",
				"neutral",
				"never",
				"news",
				"next",
				"nice",
				"night",
				"noble",
				"noise",
				"nominee",
				"noodle",
				"normal",
				"north",
				"nose",
				"notable",
				"note",
				"nothing",
				"notice",
				"novel",
				"now",
				"nuclear",
				"number",
				"nurse",
				"nut",
				"oak",
				"obey",
				"object",
				"oblige",
				"obscure",
				"observe",
				"obtain",
				"obvious",
				"occur",
				"ocean",
				"october",
				"odor",
				"off",
				"offer",
				"office",
				"often",
				"oil",
				"okay",
				"old",
				"olive",
				"olympic",
				"omit",
				"once",
				"one",
				"onion",
				"online",
				"only",
				"open",
				"opera",
				"opinion",
				"oppose",
				"option",
				"orange",
				"orbit",
				"orchard",
				"order",
				"ordinary",
				"organ",
				"orient",
				"original",
				"orphan",
				"ostrich",
				"other",
				"outdoor",
				"outer",
				"output",
				"outside",
				"oval",
				"oven",
				"over",
				"own",
				"owner",
				"oxygen",
				"oyster",
				"ozone",
				"pact",
				"paddle",
				"page",
				"pair",
				"palace",
				"palm",
				"panda",
				"panel",
				"panic",
				"panther",
				"paper",
				"parade",
				"parent",
				"park",
				"parrot",
				"party",
				"pass",
				"patch",
				"path",
				"patient",
				"patrol",
				"pattern",
				"pause",
				"pave",
				"payment",
				"peace",
				"peanut",
				"pear",
				"peasant",
				"pelican",
				"pen",
				"penalty",
				"pencil",
				"people",
				"pepper",
				"perfect",
				"permit",
				"person",
				"pet",
				"phone",
				"photo",
				"phrase",
				"physical",
				"piano",
				"picnic",
				"picture",
				"piece",
				"pig",
				"pigeon",
				"pill",
				"pilot",
				"pink",
				"pioneer",
				"pipe",
				"pistol",
				"pitch",
				"pizza",
				"place",
				"planet",
				"plastic",
				"plate",
				"play",
				"please",
				"pledge",
				"pluck",
				"plug",
				"plunge",
				"poem",
				"poet",
				"point",
				"polar",
				"pole",
				"police",
				"pond",
				"pony",
				"pool",
				"popular",
				"portion",
				"position",
				"possible",
				"post",
				"potato",
				"pottery",
				"poverty",
				"powder",
				"power",
				"practice",
				"praise",
				"predict",
				"prefer",
				"prepare",
				"present",
				"pretty",
				"prevent",
				"price",
				"pride",
				"primary",
				"print",
				"priority",
				"prison",
				"private",
				"prize",
				"problem",
				"process",
				"produce",
				"profit",
				"program",
				"project",
				"promote",
				"proof",
				"property",
				"prosper",
				"protect",
				"proud",
				"provide",
				"public",
				"pudding",
				"pull",
				"pulp",
				"pulse",
				"pumpkin",
				"punch",
				"pupil",
				"puppy",
				"purchase",
				"purity",
				"purpose",
				"purse",
				"push",
				"put",
				"puzzle",
				"pyramid",
				"quality",
				"quantum",
				"quarter",
				"question",
				"quick",
				"quit",
				"quiz",
				"quote",
				"rabbit",
				"raccoon",
				"race",
				"rack",
				"radar",
				"radio",
				"rail",
				"rain",
				"raise",
				"rally",
				"ramp",
				"ranch",
				"random",
				"range",
				"rapid",
				"rare",
				"rate",
				"rather",
				"raven",
				"raw",
				"razor",
				"ready",
				"real",
				"reason",
				"rebel",
				"rebuild",
				"recall",
				"receive",
				"recipe",
				"record",
				"recycle",
				"reduce",
				"reflect",
				"reform",
				"refuse",
				"region",
				"regret",
				"regular",
				"reject",
				"relax",
				"release",
				"relief",
				"rely",
				"remain",
				"remember",
				"remind",
				"remove",
				"render",
				"renew",
				"rent",
				"reopen",
				"repair",
				"repeat",
				"replace",
				"report",
				"require",
				"rescue",
				"resemble",
				"resist",
				"resource",
				"response",
				"result",
				"retire",
				"retreat",
				"return",
				"reunion",
				"reveal",
				"review",
				"reward",
				"rhythm",
				"rib",
				"ribbon",
				"rice",
				"rich",
				"ride",
				"ridge",
				"rifle",
				"right",
				"rigid",
				"ring",
				"riot",
				"ripple",
				"risk",
				"ritual",
				"rival",
				"river",
				"road",
				"roast",
				"robot",
				"robust",
				"rocket",
				"romance",
				"roof",
				"rookie",
				"room",
				"rose",
				"rotate",
				"rough",
				"round",
				"route",
				"royal",
				"rubber",
				"rude",
				"rug",
				"rule",
				"run",
				"runway",
				"rural",
				"sad",
				"saddle",
				"sadness",
				"safe",
				"sail",
				"salad",
				"salmon",
				"salon",
				"salt",
				"salute",
				"same",
				"sample",
				"sand",
				"satisfy",
				"satoshi",
				"sauce",
				"sausage",
				"save",
				"say",
				"scale",
				"scan",
				"scare",
				"scatter",
				"scene",
				"scheme",
				"school",
				"science",
				"scissors",
				"scorpion",
				"scout",
				"scrap",
				"screen",
				"script",
				"scrub",
				"sea",
				"search",
				"season",
				"seat",
				"second",
				"secret",
				"section",
				"security",
				"seed",
				"seek",
				"segment",
				"select",
				"sell",
				"seminar",
				"senior",
				"sense",
				"sentence",
				"series",
				"service",
				"session",
				"settle",
				"setup",
				"seven",
				"shadow",
				"shaft",
				"shallow",
				"share",
				"shed",
				"shell",
				"sheriff",
				"shield",
				"shift",
				"shine",
				"ship",
				"shiver",
				"shock",
				"shoe",
				"shoot",
				"shop",
				"short",
				"shoulder",
				"shove",
				"shrimp",
				"shrug",
				"shuffle",
				"shy",
				"sibling",
				"sick",
				"side",
				"siege",
				"sight",
				"sign",
				"silent",
				"silk",
				"silly",
				"silver",
				"similar",
				"simple",
				"since",
				"sing",
				"siren",
				"sister",
				"situate",
				"six",
				"size",
				"skate",
				"sketch",
				"ski",
				"skill",
				"skin",
				"skirt",
				"skull",
				"slab",
				"slam",
				"sleep",
				"slender",
				"slice",
				"slide",
				"slight",
				"slim",
				"slogan",
				"slot",
				"slow",
				"slush",
				"small",
				"smart",
				"smile",
				"smoke",
				"smooth",
				"snack",
				"snake",
				"snap",
				"sniff",
				"snow",
				"soap",
				"soccer",
				"social",
				"sock",
				"soda",
				"soft",
				"solar",
				"soldier",
				"solid",
				"solution",
				"solve",
				"someone",
				"song",
				"soon",
				"sorry",
				"sort",
				"soul",
				"sound",
				"soup",
				"source",
				"south",
				"space",
				"spare",
				"spatial",
				"spawn",
				"speak",
				"special",
				"speed",
				"spell",
				"spend",
				"sphere",
				"spice",
				"spider",
				"spike",
				"spin",
				"spirit",
				"split",
				"spoil",
				"sponsor",
				"spoon",
				"sport",
				"spot",
				"spray",
				"spread",
				"spring",
				"spy",
				"square",
				"squeeze",
				"squirrel",
				"stable",
				"stadium",
				"staff",
				"stage",
				"stairs",
				"stamp",
				"stand",
				"start",
				"state",
				"stay",
				"steak",
				"steel",
				"stem",
				"step",
				"stereo",
				"stick",
				"still",
				"sting",
				"stock",
				"stomach",
				"stone",
				"stool",
				"story",
				"stove",
				"strategy",
				"street",
				"strike",
				"strong",
				"struggle",
				"student",
				"stuff",
				"stumble",
				"style",
				"subject",
				"submit",
				"subway",
				"success",
				"such",
				"sudden",
				"suffer",
				"sugar",
				"suggest",
				"suit",
				"summer",
				"sun",
				"sunny",
				"sunset",
				"super",
				"supply",
				"supreme",
				"sure",
				"surface",
				"surge",
				"surprise",
				"surround",
				"survey",
				"suspect",
				"sustain",
				"swallow",
				"swamp",
				"swap",
				"swarm",
				"swear",
				"sweet",
				"swift",
				"swim",
				"swing",
				"switch",
				"sword",
				"symbol",
				"symptom",
				"syrup",
				"system",
				"table",
				"tackle",
				"tag",
				"tail",
				"talent",
				"talk",
				"tank",
				"tape",
				"target",
				"task",
				"taste",
				"tattoo",
				"taxi",
				"teach",
				"team",
				"tell",
				"ten",
				"tenant",
				"tennis",
				"tent",
				"term",
				"test",
				"text",
				"thank",
				"that",
				"theme",
				"then",
				"theory",
				"there",
				"they",
				"thing",
				"this",
				"thought",
				"three",
				"thrive",
				"throw",
				"thumb",
				"thunder",
				"ticket",
				"tide",
				"tiger",
				"tilt",
				"timber",
				"time",
				"tiny",
				"tip",
				"tired",
				"tissue",
				"title",
				"toast",
				"tobacco",
				"today",
				"toddler",
				"toe",
				"together",
				"toilet",
				"token",
				"tomato",
				"tomorrow",
				"tone",
				"tongue",
				"tonight",
				"tool",
				"tooth",
				"top",
				"topic",
				"topple",
				"torch",
				"tornado",
				"tortoise",
				"toss",
				"total",
				"tourist",
				"toward",
				"tower",
				"town",
				"toy",
				"track",
				"trade",
				"traffic",
				"tragic",
				"train",
				"transfer",
				"trap",
				"trash",
				"travel",
				"tray",
				"treat",
				"tree",
				"trend",
				"trial",
				"tribe",
				"trick",
				"trigger",
				"trim",
				"trip",
				"trophy",
				"trouble",
				"truck",
				"true",
				"truly",
				"trumpet",
				"trust",
				"truth",
				"try",
				"tube",
				"tuition",
				"tumble",
				"tuna",
				"tunnel",
				"turkey",
				"turn",
				"turtle",
				"twelve",
				"twenty",
				"twice",
				"twin",
				"twist",
				"two",
				"type",
				"typical",
				"ugly",
				"umbrella",
				"unable",
				"unaware",
				"uncle",
				"uncover",
				"under",
				"undo",
				"unfair",
				"unfold",
				"unhappy",
				"uniform",
				"unique",
				"unit",
				"universe",
				"unknown",
				"unlock",
				"until",
				"unusual",
				"unveil",
				"update",
				"upgrade",
				"uphold",
				"upon",
				"upper",
				"upset",
				"urban",
				"urge",
				"usage",
				"use",
				"used",
				"useful",
				"useless",
				"usual",
				"utility",
				"vacant",
				"vacuum",
				"vague",
				"valid",
				"valley",
				"valve",
				"van",
				"vanish",
				"vapor",
				"various",
				"vast",
				"vault",
				"vehicle",
				"velvet",
				"vendor",
				"venture",
				"venue",
				"verb",
				"verify",
				"version",
				"very",
				"vessel",
				"veteran",
				"viable",
				"vibrant",
				"vicious",
				"victory",
				"video",
				"view",
				"village",
				"vintage",
				"violin",
				"virtual",
				"virus",
				"visa",
				"visit",
				"visual",
				"vital",
				"vivid",
				"vocal",
				"voice",
				"void",
				"volcano",
				"volume",
				"vote",
				"voyage",
				"wage",
				"wagon",
				"wait",
				"walk",
				"wall",
				"walnut",
				"want",
				"warfare",
				"warm",
				"warrior",
				"wash",
				"wasp",
				"waste",
				"water",
				"wave",
				"way",
				"wealth",
				"weapon",
				"wear",
				"weasel",
				"weather",
				"web",
				"wedding",
				"weekend",
				"weird",
				"welcome",
				"west",
				"wet",
				"whale",
				"what",
				"wheat",
				"wheel",
				"when",
				"where",
				"whip",
				"whisper",
				"wide",
				"width",
				"wife",
				"wild",
				"will",
				"win",
				"window",
				"wine",
				"wing",
				"wink",
				"winner",
				"winter",
				"wire",
				"wisdom",
				"wise",
				"wish",
				"witness",
				"wolf",
				"woman",
				"wonder",
				"wood",
				"wool",
				"word",
				"work",
				"world",
				"worry",
				"worth",
				"wrap",
				"wreck",
				"wrestle",
				"wrist",
				"write",
				"wrong",
				"yard",
				"year",
				"yellow",
				"you",
				"young",
				"youth",
				"zebra",
				"zero",
				"zone",
				"zoo"
			];
		}
		
		// Mnemonic number base
		static get MNEMONIC_NUMBER_BASE() {
		
			// Return mnemonic number base
			return Math.ceil(Math.log2(Seed.MNEMONIC_WORDS["length"]));
		}
		
		// Mnemonic checksum bits per length
		static get MNEMONIC_CHECKSUM_BITS_PER_LENGTH() {
		
			// Return mnemonic checksum bits per length
			return Math.ceil(Math.log2(Seed.MNEMONIC_NUMBER_BASE));
		}
		
		// Invalid seed
		static get INVALID_SEED() {
		
			// Return invalid seed
			return null;
		}
		
		// Checksum hash
		static get CHECKSUM_HASH() {
		
			// Return checksum hash
			return "SHA-256";
		}
		
		// Encryption algorithm
		static get ENCRYPTION_ALGORITHM() {
		
			// Return encryption algorithm
			return "HMAC";
		}
		
		// Digest algorithm
		static get DIGEST_ALGORITHM() {
		
			// Return digest algorithm
			return "SHA-512";
		}
		
		// Whitespace pattern
		static get WHITESPACE_PATTERN() {
		
			// Return whitespace pattern
			return /\s+/gu;
		}
		
		// BIP39 import algorithm
		static get BIP39_IMPORT_ALGORITHM() {
		
			// Return BIP39 import algorithm
			return "PBKDF2";
		}
		
		// BIP39 digest number of iterations
		static get BIP39_DIGEST_NUMBER_OF_ITERATIONS() {
		
			// Return BIP39 digest number of iterations
			return 2048;
		}
		
		// BIP39 digest algorithm
		static get BIP39_DIGEST_ALGORITHM() {
		
			// Return BIP39 digest algorithm
			return "SHA-512";
		}
		
		// BIP39 encryption algorithm
		static get BIP39_ENCRYPTION_ALGORITHM() {
		
			// Return BIP39 encryption algorithm
			return "HMAC";
		}
		
		// BIP39 encryption digest algorithm
		static get BIP39_ENCRYPTION_DIGEST_ALGORITHM() {
		
			// Return BIP39 encryption digest algorithm
			return "SHA-512";
		}
		
		// BIP39 encryption digest length
		static get BIP39_ENCRYPTION_DIGEST_LENGTH() {
		
			// Return BIP39 encryption digest length
			return 512;
		}
		
		// BIP44 purpose
		static get BIP44_PURPOSE() {
		
			// Return BIP44 purpose
			return 44;
		}
		
		// BIP44 account
		static get BIP44_ACCOUNT() {
		
			// Return BIP44 account
			return 0;
		}
}


// Main function

// Set global object's seed
globalThis["Seed"] = Seed;

// Export seed
module["exports"] = Seed;
