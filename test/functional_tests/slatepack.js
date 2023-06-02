// Use strict
"use strict";


// Requires
const crypto = require("crypto")["webcrypto"];
const X25519 = require("./X25519-0.0.23.js");
const bech32 = require("./bech32-2.0.0.js");
const chacha = require("./ChaCha-2.1.0.js");
const Common = require("./common.js");
const Crypto = require("./crypto.js");
const Consensus = require("./consensus.js");


// Classes

// Slatepack class
class Slatepack {

	// Public
	
		// Public key to Slatepack address
		static publicKeyToSlatepackAddress(publicKey) {
		
			// Check it public key isn't the correct length
			if(publicKey["length"] !== Crypto.ED25519_PUBLIC_KEY_LENGTH) {
			
				// Throw error
				throw "Invalid public key.";
			}
		
			// Return getting Slatepack address from address public key and human-readable part
			return bech32.encode(Consensus.SLATEPACK_ADDRESS_HUMAN_READABLE_PART, bech32.toWords(publicKey));
		}
		
		// Slatepack address to public key
		static slatepackAddressToPublicKey(slatepackAddress) {
		
			// Check it Slatepack address isn't the correct length
			if(slatepackAddress["length"] !== Slatepack.ADDRESS_WITHOUT_HUMAN_READABLE_PART_LENGTH + Consensus.SLATEPACK_ADDRESS_HUMAN_READABLE_PART["length"]) {
			
				// Throw error
				throw "Invalid Slatepack address.";
			}
			
			// Try
			try {
			
				// Decode Slatepack address
				var decodedAddress = bech32.decode(slatepackAddress);
			}
			
			// Catch errors
			catch(error) {
			
				// Throw error
				throw "Invalid Slatepack address.";
			}
			
			// Check if decoded address's length is invalid
			var bytes = bech32.fromWords(decodedAddress["words"]);
			if(bytes["length"] !== Crypto.ED25519_PUBLIC_KEY_LENGTH) {
			
				// Throw error
				throw "Invalid Slatepack address.";
			}
			
			// Check if human-readable part is invalid
			if(decodedAddress["prefix"] !== Consensus.SLATEPACK_ADDRESS_HUMAN_READABLE_PART) {
			
				// Throw error
				throw "Invalid Slatepack address.";
			}
			
			// Return decoded address
			return new Uint8Array(bytes);
		}
		
		// Is encrypted Slatepack
		static isEncryptedSlatepack(slatepack) {
		
			// Get offset of Slatepack's header delimiter
			var headerDelimiter = slatepack.indexOf(Slatepack.COMPONENT_SEPARATOR);
			
			// Check if header delmiter doesn't exist
			if(headerDelimiter === Common.INDEX_NOT_FOUND) {
			
				// Return false
				return false;
			}
			
			// Return if Slatepack's header is an encrypted header
			return Slatepack.ENCRYPTED_HEADER_PATTERN.test(slatepack.substring(0, headerDelimiter)) === true;
		}
		
		// Get Slatepack sender public key
		static getSlatepackSenderPublicKey(slatepack) {
		
			// Get offset of Slatepack's header delimiter
			var headerDelimiter = slatepack.indexOf(Slatepack.COMPONENT_SEPARATOR);
			
			// Check if header delmiter doesn't exist
			if(headerDelimiter === Common.INDEX_NOT_FOUND) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Check if Slatepack's header isn't an encrypted header
			if(Slatepack.ENCRYPTED_HEADER_PATTERN.test(slatepack.substring(0, headerDelimiter)) === false) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Get offset of Slatepack's payload delimiter
			var payloadDelimiter = slatepack.indexOf(Slatepack.COMPONENT_SEPARATOR, headerDelimiter + Slatepack.COMPONENT_SEPARATOR["length"]);
			
			// Check if payload delmiter doesn't exist
			if(payloadDelimiter === Common.INDEX_NOT_FOUND) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Get offset of Slatepack's footer delimiter
			var footerDelimiter = slatepack.indexOf(Slatepack.COMPONENT_SEPARATOR, payloadDelimiter + Slatepack.COMPONENT_SEPARATOR["length"]);
			
			// Check if footer delmiter doesn't exist
			if(footerDelimiter === Common.INDEX_NOT_FOUND) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Check if Slatepack's footer isn't an encrypted footer
			if(Slatepack.ENCRYPTED_FOOTER_PATTERN.test(slatepack.substring(payloadDelimiter + Slatepack.COMPONENT_SEPARATOR["length"], footerDelimiter)) === false) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Get Slatepack's payload without whitespace
			var payload = slatepack.substring(headerDelimiter + Slatepack.COMPONENT_SEPARATOR["length"], payloadDelimiter).replace(Slatepack.WHITESPACE_PATTERN, "");
			
			// Try
			try {
			
				// Decode payload
				var decodedPayload = Base58.decode(payload);
			}
			
			// Catch errors
			catch(error) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Check if decoded payload is too short
			if(decodedPayload["length"] < Base58.CHECKSUM_LENGTH + Uint8Array["BYTES_PER_ELEMENT"]) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Get checksum and data from the decoded payload
			var checksum = decodedPayload.subarray(0, Base58.CHECKSUM_LENGTH);
			
			var data = decodedPayload.subarray(Base58.CHECKSUM_LENGTH);
			
			// Check if checksum is invalid
			if(Common.arraysAreEqual(checksum, Base58.getChecksum(data)) === false) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Get version from data
			var version = data[0];
			
			// Check if version isn't supported
			if(version > Slatepack.VERSION) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Check if data's length is too short
			if(data["length"] < data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH + Slatepack.NONCE_LENGTH + Uint16Array["BYTES_PER_ELEMENT"]) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
		
			// Get sender public key from data
			var senderPublicKey = data.subarray(data["BYTES_PER_ELEMENT"], data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH);
			
			// Try
			try {
			
				// Get Tor address from the sender public key
				Tor.publicKeyToTorAddress(senderPublicKey);
			}
			
			// Catch errors
			catch(error) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Return sender public key
			return senderPublicKey;
		}
		
		// Get Slatepack receiver public key
		static getSlatepackReceiverPublicKey(slatepack) {
		
			// Get offset of Slatepack's header delimiter
			var headerDelimiter = slatepack.indexOf(Slatepack.COMPONENT_SEPARATOR);
			
			// Check if header delmiter doesn't exist
			if(headerDelimiter === Common.INDEX_NOT_FOUND) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Check if Slatepack's header isn't an encrypted header
			if(Slatepack.ENCRYPTED_HEADER_PATTERN.test(slatepack.substring(0, headerDelimiter)) === false) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Get offset of Slatepack's payload delimiter
			var payloadDelimiter = slatepack.indexOf(Slatepack.COMPONENT_SEPARATOR, headerDelimiter + Slatepack.COMPONENT_SEPARATOR["length"]);
			
			// Check if payload delmiter doesn't exist
			if(payloadDelimiter === Common.INDEX_NOT_FOUND) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Get offset of Slatepack's footer delimiter
			var footerDelimiter = slatepack.indexOf(Slatepack.COMPONENT_SEPARATOR, payloadDelimiter + Slatepack.COMPONENT_SEPARATOR["length"]);
			
			// Check if footer delmiter doesn't exist
			if(footerDelimiter === Common.INDEX_NOT_FOUND) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Check if Slatepack's footer isn't an encrypted footer
			if(Slatepack.ENCRYPTED_FOOTER_PATTERN.test(slatepack.substring(payloadDelimiter + Slatepack.COMPONENT_SEPARATOR["length"], footerDelimiter)) === false) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Get Slatepack's payload without whitespace
			var payload = slatepack.substring(headerDelimiter + Slatepack.COMPONENT_SEPARATOR["length"], payloadDelimiter).replace(Slatepack.WHITESPACE_PATTERN, "");
			
			// Try
			try {
			
				// Decode payload
				var decodedPayload = Base58.decode(payload);
			}
			
			// Catch errors
			catch(error) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Check if decoded payload is too short
			if(decodedPayload["length"] < Base58.CHECKSUM_LENGTH + Uint8Array["BYTES_PER_ELEMENT"]) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Get checksum and data from the decoded payload
			var checksum = decodedPayload.subarray(0, Base58.CHECKSUM_LENGTH);
			
			var data = decodedPayload.subarray(Base58.CHECKSUM_LENGTH);
			
			// Check if checksum is invalid
			if(Common.arraysAreEqual(checksum, Base58.getChecksum(data)) === false) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Get version from data
			var version = data[0];
			
			// Check if version isn't supported
			if(version > Slatepack.VERSION) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Check if data's length is too short
			if(data["length"] < data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH + Slatepack.NONCE_LENGTH + Uint16Array["BYTES_PER_ELEMENT"]) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
		
			// Get receiver public key from data
			var receiverPublicKey = data.subarray(data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH, data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH);
			
			// Try
			try {
			
				// Get Tor address from the receiver public key
				Tor.publicKeyToTorAddress(receiverPublicKey);
			}
			
			// Catch errors
			catch(error) {
			
				// Return no public key
				return Slatepack.NO_PUBLIC_KEY;
			}
			
			// Return receiver public key
			return receiverPublicKey;
		}
		
		// Decode Slatepack
		static decodeSlatepack(slatepack, secretKeyOrHardwareWallet = Slatepack.NO_SECRET_KEY, hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Get offset of Slatepack's header delimiter
				var headerDelimiter = slatepack.indexOf(Slatepack.COMPONENT_SEPARATOR);
				
				// Check if header delmiter doesn't exist
				if(headerDelimiter === Common.INDEX_NOT_FOUND) {
				
					// Reject error
					reject("Unsupported slatepack.");
					
					// Return
					return;
				}
				
				// Check if Slatepack's header isn't an encrypted header
				if(Slatepack.ENCRYPTED_HEADER_PATTERN.test(slatepack.substring(0, headerDelimiter)) === false) {
				
					// Check if Slatepack's header isn't a binary header
					if(Slatepack.BINARY_HEADER_PATTERN.test(slatepack.substring(0, headerDelimiter)) === false) {
					
						// Reject error
						reject("Unsupported slatepack.");
						
						// Return
						return;
					}
					
					// Otherwise
					else {
					
						// Clear encrypted
						var encrypted = false;
					}
				}
				
				// Otherwise
				else {
				
					// Set encrypted
					var encrypted = true;
				}
				
				// Get offset of Slatepack's payload delimiter
				var payloadDelimiter = slatepack.indexOf(Slatepack.COMPONENT_SEPARATOR, headerDelimiter + Slatepack.COMPONENT_SEPARATOR["length"]);
				
				// Check if payload delmiter doesn't exist
				if(payloadDelimiter === Common.INDEX_NOT_FOUND) {
				
					// Reject error
					reject("Unsupported slate.");
					
					// Return
					return;
				}
				
				// Get offset of Slatepack's footer delimiter
				var footerDelimiter = slatepack.indexOf(Slatepack.COMPONENT_SEPARATOR, payloadDelimiter + Slatepack.COMPONENT_SEPARATOR["length"]);
				
				// Check if footer delmiter doesn't exist
				if(footerDelimiter === Common.INDEX_NOT_FOUND) {
				
					// Reject error
					reject("Unsupported slatepack.");
					
					// Return
					return;
				}
				
				// Check if encrypted slatepack's footer isn't an encrypted footer
				if(encrypted === true && Slatepack.ENCRYPTED_FOOTER_PATTERN.test(slatepack.substring(payloadDelimiter + Slatepack.COMPONENT_SEPARATOR["length"], footerDelimiter)) === false) {
				
					// Reject error
					reject("Unsupported slatepack.");
					
					// Return
					return;
				}
				
				// Otherwise check if not encrypted slatepack's footer isn't a binary footer
				else if(encrypted === false && Slatepack.BINARY_FOOTER_PATTERN.test(slatepack.substring(payloadDelimiter + Slatepack.COMPONENT_SEPARATOR["length"], footerDelimiter)) === false) {
				
					// Reject error
					reject("Unsupported slatepack.");
					
					// Return
					return;
				}
				
				// Get Slatepack's payload without whitespace
				var payload = slatepack.substring(headerDelimiter + Slatepack.COMPONENT_SEPARATOR["length"], payloadDelimiter).replace(Slatepack.WHITESPACE_PATTERN, "");
				
				// Try
				try {
				
					// Decode payload
					var decodedPayload = Base58.decode(payload);
				}
				
				// Catch errors
				catch(error) {
				
					// Reject error
					reject("Unsupported slatepack.");
					
					// Return
					return;
				}
				
				// Check if decoded payload is too short
				if(decodedPayload["length"] < Base58.CHECKSUM_LENGTH + Uint8Array["BYTES_PER_ELEMENT"]) {
				
					// Reject error
					reject("Unsupported slatepack.");
					
					// Return
					return;
				}
				
				// Get checksum and data from the decoded payload
				var checksum = decodedPayload.subarray(0, Base58.CHECKSUM_LENGTH);
				
				var data = decodedPayload.subarray(Base58.CHECKSUM_LENGTH);
				
				// Check if checksum is invalid
				if(Common.arraysAreEqual(checksum, Base58.getChecksum(data)) === false) {
				
					// Reject error
					reject("Unsupported slatepack.");
					
					// Return
					return;
				}
				
				// Get version from data
				var version = data[0];
				
				// Check if version isn't supported
				if(version > Slatepack.VERSION) {
				
					// Reject error
					reject("Unsupported slatepack.");
					
					// Return
					return;
				}
				
				// Check if encrypted
				if(encrypted === true) {
				
					// Check if secret key or hardware wallet don't exist
					if(secretKeyOrHardwareWallet === Slatepack.NO_SECRET_KEY) {
					
						// Reject error
						reject("Decrypting Slatepack failed.");
						
						// Return
						return;
					}
				
					// Check if data's length is too short
					if(data["length"] < data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH + Slatepack.NONCE_LENGTH + Uint16Array["BYTES_PER_ELEMENT"]) {
					
						// Reject error
						reject("Unsupported slatepack.");
						
						// Return
						return;
					}
				
					// Get sender public key from data
					var senderPublicKey = data.subarray(data["BYTES_PER_ELEMENT"], data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH);
					
					// Try
					try {
					
						// Get Tor address from the sender public key
						Tor.publicKeyToTorAddress(senderPublicKey);
					}
					
					// Catch errors
					catch(error) {
					
						// Reject error
						reject("Invalid sender public key.");
					
						// Return
						return;
					}
					
					// Get receiver public key from data
					var receiverPublicKey = data.subarray(data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH, data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH);
					
					// Try
					try {
					
						// Get Tor address from the receiver public key
						Tor.publicKeyToTorAddress(receiverPublicKey);
					}
					
					// Catch errors
					catch(error) {
					
						// Reject error
						reject("Invalid receiver public key.");
					
						// Return
						return;
					}
					
					// Get expected receiver public key
					var getExpectedReceiverPublicKey = function() {
					
						// Return promise
						return new Promise(function(resolve, reject) {
				
							// Check if a secret key is provided
							if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
							
								// Get secret key
								var secretKey = secretKeyOrHardwareWallet;
						
								// Check if getting expected receiver public key from secret key failed
								var expectedReceiverPublicKey = Ed25519.publicKeyFromSecretKey(secretKey);
								
								if(expectedReceiverPublicKey === Ed25519.OPERATION_FAILED) {
								
									// Reject error
									reject("Getting expected receiver public key from secret key failed.");
									
									// Return
									return;
								}
								
								// Resolve expected receiver public key
								resolve(expectedReceiverPublicKey);
							}
							
							// Otherwise
							else {
							
								// Get hardware wallet
								var hardwareWallet = secretKeyOrHardwareWallet;
								
								// Return getting Tor address from the hardware wallet
								return hardwareWallet.getTorAddress(Wallet.PAYMENT_PROOF_TOR_ADDRESS_KEY_INDEX, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(torAddress) {
								
									// Try
									try {
									
										// Get expected receiver public key from the Tor address
										var expectedReceiverPublicKey = Tor.torAddressToPublicKey(torAddress);
									}
									
									// Catch errors
									catch(error) {
									
										// Reject error
										reject(error);
										
										// Return
										return;
									}
									
									// Resolve expected receiver public key
									resolve(expectedReceiverPublicKey);
									
								// Catch errors
								}).catch(function(error) {
								
									// Reject error
									reject(error);
								});
							}
						});
					};
					
					// Return getting expected receiver public key
					return getExpectedReceiverPublicKey().then(function(expectedReceiverPublicKey) {
					
						// Check if receiver public key doesn't match the expected receiver public key
						if(Common.arraysAreEqual(receiverPublicKey, expectedReceiverPublicKey) === false) {
						
							// Reject error
							reject("Invalid receiver public key.");
						}
						
						// Otherwise
						else {
					
							// Get nonce form data
							var nonce = data.subarray(data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH, data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH + Slatepack.NONCE_LENGTH);
							
							// Get length from data
							var length = (new BigNumber(Common.HEX_PREFIX + Common.toHexString(data.subarray(data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH + Slatepack.NONCE_LENGTH, data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH + Slatepack.NONCE_LENGTH + Uint16Array["BYTES_PER_ELEMENT"])))).toNumber();
							
							// Check if length isn't supported
							if(length === 0 || length !== data["length"] - (data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH + Slatepack.NONCE_LENGTH + Uint16Array["BYTES_PER_ELEMENT"])) {
							
								// Reject error
								reject("Unsupported slatepack.");
								
								// Return
								return;
							}
							
							// Get encrypted slate from data
							var encryptedSlate = data.subarray(data["BYTES_PER_ELEMENT"] + Crypto.ED25519_PUBLIC_KEY_LENGTH + Crypto.ED25519_PUBLIC_KEY_LENGTH + Slatepack.NONCE_LENGTH + Uint16Array["BYTES_PER_ELEMENT"]);
							
							// Check if a secret key is provided
							if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
							
								// Get secret key
								var secretKey = secretKeyOrHardwareWallet;
							
								// Return decrypting the encrypted slate
								return Slatepack.decrypt(secretKey, senderPublicKey, encryptedSlate, nonce).then(function(slate) {
								
									// Check if slate's length isn't supported
									if(slate["length"] <= Uint32Array["BYTES_PER_ELEMENT"]) {
									
										// Reject error
										reject("Unsupported slatepack.");
										
										// Return
										return;
									}
									
									// Get expected checksum from slate
									var expectedChecksum = (new BigNumber(Common.HEX_PREFIX + Common.toHexString(slate.subarray(slate["length"] - Uint32Array["BYTES_PER_ELEMENT"])))).toNumber();
									
									// Remove expected checksum from slate
									slate = slate.subarray(0, slate["length"] - Uint32Array["BYTES_PER_ELEMENT"]);
									
									// Calculate checksum
									var checksum = CRC32.buf(Common.mergeArrays([
									
										// Version
										new Uint8Array([version]),
										
										// Sender public key
										senderPublicKey,
										
										// Receiver public key
										receiverPublicKey,
										
										// Slate
										slate
									]));
									
									// Check if checksum doesn't match the expected checksum
									if((new Uint32Array([checksum]))[0] !== expectedChecksum) {
									
										// Reject error
										reject("Unsupported slatepack.");
										
										// Return
										return;
									}
									
									// Resolve slate
									resolve(slate);
								
								// Catch errors
								}).catch(function(error) {
								
									// Reject error
									reject(error);
								});
							}
							
							// Otherwise
							else {
							
								// Get hardware wallet
								var hardwareWallet = secretKeyOrHardwareWallet;
								
								// Return decrypting the slate with the hardware wallet
								return hardwareWallet.decryptSlate(Wallet.PAYMENT_PROOF_TOR_ADDRESS_KEY_INDEX, encryptedSlate, Tor.publicKeyToTorAddress(senderPublicKey), nonce, HardwareWallet.NO_SALT, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(slate) {
								
									// Check if slate's length isn't supported
									if(slate["length"] <= Uint32Array["BYTES_PER_ELEMENT"]) {
									
										// Reject error
										reject("Unsupported slatepack.");
										
										// Return
										return;
									}
									
									// Get expected checksum from slate
									var expectedChecksum = (new BigNumber(Common.HEX_PREFIX + Common.toHexString(slate.subarray(slate["length"] - Uint32Array["BYTES_PER_ELEMENT"])))).toNumber();
									
									// Remove expected checksum from slate
									slate = slate.subarray(0, slate["length"] - Uint32Array["BYTES_PER_ELEMENT"]);
									
									// Calculate checksum
									var checksum = CRC32.buf(Common.mergeArrays([
									
										// Version
										new Uint8Array([version]),
										
										// Sender public key
										senderPublicKey,
										
										// Receiver public key
										receiverPublicKey,
										
										// Slate
										slate
									]));
									
									// Check if checksum doesn't match the expected checksum
									if((new Uint32Array([checksum]))[0] !== expectedChecksum) {
									
										// Reject error
										reject("Unsupported slatepack.");
										
										// Return
										return;
									}
									
									// Resolve slate
									resolve(slate);
								
								// Catch errors
								}).catch(function(error) {
								
									// Reject error
									reject(error);
								});
							}
						}
						
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				}
				
				// Otherwise
				else {
				
					// Check if data's length is too short
					if(data["length"] < data["BYTES_PER_ELEMENT"] + Uint16Array["BYTES_PER_ELEMENT"]) {
					
						// Reject error
						reject("Unsupported slatepack.");
						
						// Return
						return;
					}
				
					// Get length from data
					var length = (new BigNumber(Common.HEX_PREFIX + Common.toHexString(data.subarray(data["BYTES_PER_ELEMENT"], data["BYTES_PER_ELEMENT"] + Uint16Array["BYTES_PER_ELEMENT"])))).toNumber();
					
					// Check if length isn't supported
					if(length === 0 || length !== data["length"] - (data["BYTES_PER_ELEMENT"] + Uint16Array["BYTES_PER_ELEMENT"])) {
					
						// Reject error
						reject("Unsupported slatepack.");
						
						// Return
						return;
					}
					
					// Get slate from data
					var slate = data.subarray(data["BYTES_PER_ELEMENT"] + Uint16Array["BYTES_PER_ELEMENT"]);
					
					// Resolve slate
					resolve(slate);
				}
			});
		}
		
		// Encode Slatepack
		static encodeSlatepack(slate, secretKeyOrHardwareWallet = Slatepack.NO_SECRET_KEY, publicKey = Slatepack.NO_PUBLIC_KEY, hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if encrypting slate
				if(secretKeyOrHardwareWallet !== Slatepack.NO_SECRET_KEY && publicKey !== Slatepack.NO_PUBLIC_KEY) {
				
					// Get sender public key
					var getSenderPublicKey = function() {
					
						// Return promise
						return new Promise(function(resolve, reject) {
				
							// Check if a secret key is provided
							if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
							
								// Get secret key
								var secretKey = secretKeyOrHardwareWallet;
						
								// Check if getting sender public key from secret key failed
								var senderPublicKey = Ed25519.publicKeyFromSecretKey(secretKey);
								
								if(senderPublicKey === Ed25519.OPERATION_FAILED) {
								
									// Reject error
									reject("Getting sender public key from secret key failed.");
									
									// Return
									return;
								}
								
								// Resolve sender public key
								resolve(senderPublicKey);
							}
							
							// Otherwise
							else {
							
								// Get hardware wallet
								var hardwareWallet = secretKeyOrHardwareWallet;
								
								// Return getting Tor address from the hardware wallet
								return hardwareWallet.getTorAddress(Wallet.PAYMENT_PROOF_TOR_ADDRESS_KEY_INDEX, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(torAddress) {
								
									// Try
									try {
									
										// Get sender public key from the Tor address
										var senderPublicKey = Tor.torAddressToPublicKey(torAddress);
									}
									
									// Catch errors
									catch(error) {
									
										// Reject error
										reject(error);
										
										// Return
										return;
									}
									
									// Resolve sender public key
									resolve(senderPublicKey);
									
								// Catch errors
								}).catch(function(error) {
								
									// Reject error
									reject(error);
								});
							}
						});
					};
					
					// Return getting sender public key
					return getSenderPublicKey().then(function(senderPublicKey) {
					
						// Calculate checksum
						var checksum = CRC32.buf(Common.mergeArrays([
						
							// Version
							new Uint8Array([Slatepack.VERSION]),
							
							// Sender public key
							senderPublicKey,
							
							// Receiver public key
							publicKey,
							
							// Slate
							slate
						]));
						
						// Check if a secret key is provided
						if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
						
							// Get secret key
							var secretKey = secretKeyOrHardwareWallet;
					
							// Return encrypting the slate and checksum
							return Slatepack.encrypt(secretKey, publicKey, Common.mergeArrays([
							
								// Slate
								slate,
								
								// Checksum
								(new BigNumber((new Uint32Array([checksum]))[0])).toBytes(BigNumber.BIG_ENDIAN, Uint32Array["BYTES_PER_ELEMENT"])
							
							])).then(function(encryptedSlate) {
							
								// Check if encrypted slate is too long
								if(encryptedSlate[Slatepack.ENCRYPTED_DATA_DATA_INDEX]["length"] > Common.UINT16_MAX_VALUE) {
								
									// Reject error
									reject("Encrypted slate is too long.");
									
									// Return
									return;
								}
							
								// Create payload
								var payload = Common.mergeArrays([
								
									// Version
									new Uint8Array([Slatepack.VERSION]),
									
									// Sender public key
									senderPublicKey,
									
									// Receiver public key
									publicKey,
									
									// Nonce
									encryptedSlate[Slatepack.ENCRYPTED_DATA_NONCE_INDEX],
									
									// Encrypted slate length
									(new BigNumber(encryptedSlate[Slatepack.ENCRYPTED_DATA_DATA_INDEX]["length"])).toBytes(BigNumber.BIG_ENDIAN, Uint16Array["BYTES_PER_ELEMENT"]),
									
									// Encrypted slate
									encryptedSlate[Slatepack.ENCRYPTED_DATA_DATA_INDEX]
								]);
							
								// Encode the payload
								var encodedPayload = Base58.encode(Common.mergeArrays([
								
									// Checksum
									Base58.getChecksum(payload),
									
									// Payload
									payload
								]));
								
								// Format the encoded payload
								encodedPayload = Slatepack.format(encodedPayload);
								
								// Add encrypted header and footer to the encoded payload
								encodedPayload = Slatepack.ENCRYPTED_HEADER + encodedPayload + Slatepack.ENCRYPTED_FOOTER;
								
								// Resolve encoded payload
								resolve(encodedPayload);
							
							// Catch errors
							}).catch(function(error) {
							
								// Reject error
								reject(error);
							});
						}
						
						// Otherwise
						else {
						
							// Get hardware wallet
							var hardwareWallet = secretKeyOrHardwareWallet;
							
							// Return encrypting the slate and checksum with the hardware wallet
							return hardwareWallet.encryptSlate(Wallet.PAYMENT_PROOF_TOR_ADDRESS_KEY_INDEX, Common.mergeArrays([
							
								// Slate
								slate,
								
								// Checksum
								(new BigNumber((new Uint32Array([checksum]))[0])).toBytes(BigNumber.BIG_ENDIAN, Uint32Array["BYTES_PER_ELEMENT"])
							
							]), Tor.publicKeyToTorAddress(publicKey), hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(encryptedSlate) {
							
								// Check if encrypted slate is too long
								if(encryptedSlate[HardwareWallet.ENCRYPTED_SLATE_DATA_INDEX]["length"] > Common.UINT16_MAX_VALUE) {
								
									// Reject error
									reject("Encrypted slate is too long.");
									
									// Return
									return;
								}
							
								// Create payload
								var payload = Common.mergeArrays([
								
									// Version
									new Uint8Array([Slatepack.VERSION]),
									
									// Sender public key
									senderPublicKey,
									
									// Receiver public key
									publicKey,
									
									// Nonce
									encryptedSlate[HardwareWallet.ENCRYPTED_SLATE_NONCE_INDEX],
									
									// Encrypted slate length
									(new BigNumber(encryptedSlate[HardwareWallet.ENCRYPTED_SLATE_DATA_INDEX]["length"])).toBytes(BigNumber.BIG_ENDIAN, Uint16Array["BYTES_PER_ELEMENT"]),
									
									// Encrypted slate
									encryptedSlate[HardwareWallet.ENCRYPTED_SLATE_DATA_INDEX]
								]);
							
								// Encode the payload
								var encodedPayload = Base58.encode(Common.mergeArrays([
								
									// Checksum
									Base58.getChecksum(payload),
									
									// Payload
									payload
								]));
								
								// Format the encoded payload
								encodedPayload = Slatepack.format(encodedPayload);
								
								// Add encrypted header and footer to the encoded payload
								encodedPayload = Slatepack.ENCRYPTED_HEADER + encodedPayload + Slatepack.ENCRYPTED_FOOTER;
								
								// Resolve encoded payload
								resolve(encodedPayload);
								
							// Catch errors
							}).catch(function(error) {
							
								// Reject error
								reject(error);
							});
						}
						
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				}
				
				// Otherwise
				else {
				
					// Check if slate is too long
					if(slate["length"] > Common.UINT16_MAX_VALUE) {
					
						// Reject error
						reject("Slate is too long.");
					}
			
					// Create payload
					var payload = Common.mergeArrays([
					
						// Version
						new Uint8Array([Slatepack.VERSION]),
						
						// Length
						(new BigNumber(slate["length"])).toBytes(BigNumber.BIG_ENDIAN, Uint16Array["BYTES_PER_ELEMENT"]),
						
						// Slate
						slate
					]);
				
					// Encode the payload
					var encodedPayload = Base58.encode(Common.mergeArrays([
					
						// Checksum
						Base58.getChecksum(payload),
						
						// Payload
						payload
					]));
					
					// Format the encoded payload
					encodedPayload = Slatepack.format(encodedPayload);
					
					// Add binary header and footer to the encoded payload
					encodedPayload = Slatepack.BINARY_HEADER + encodedPayload + Slatepack.BINARY_FOOTER;
					
					// Resolve encoded payload
					resolve(encodedPayload);
				}
			});
		}
		
		// Encrypted data nonce index
		static get ENCRYPTED_DATA_NONCE_INDEX() {
		
			// Return encrypted data nonce index
			return 0;
		}
		
		// Encrypted data data index
		static get ENCRYPTED_DATA_DATA_INDEX() {
		
			// Return encrypted data data index
			return Slatepack.ENCRYPTED_DATA_NONCE_INDEX + 1;
		}
		
		// No secret key
		static get NO_SECRET_KEY() {
		
			// Return no secret key
			return null;
		}
		
		// Address length
		static get ADDRESS_LENGTH() {
		
			// Return address length
			return Slatepack.ADDRESS_WITHOUT_HUMAN_READABLE_PART_LENGTH + Consensus.SLATEPACK_ADDRESS_HUMAN_READABLE_PART["length"];
		}
	
	// Private
	
		// Encrypt
		static encrypt(secretKey, publicKey, data) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Check if getting X25519 secret key from the secret key failed
				var x25519SecretKey = X25519.secretKeyFromEd25519SecretKey(secretKey);
				
				if(x25519SecretKey === X25519.OPERATION_FAILED) {
				
					// Reject error
					reject("Invalid secret key.");
					
					// Return
					return;
				}
				
				// Check if getting X25519 public key from the public key failed
				var x25519PublicKey = X25519.publicKeyFromEd25519PublicKey(publicKey);
				
				if(x25519PublicKey === X25519.OPERATION_FAILED) {
				
					// Securely clear X25519 secret key
					x25519SecretKey.fill(0);
				
					// Reject error
					reject("Invalid public key.");
					
					// Return
					return;
				}
		
				// Check if creating shared secret key failed
				var sharedSecretKey = X25519.sharedSecretKeyFromSecretKeyAndPublicKey(x25519SecretKey, x25519PublicKey);
				
				if(sharedSecretKey === X25519.OPERATION_FAILED) {
				
					// Securely clear X25519 secret key
					x25519SecretKey.fill(0);
				
					// Reject error
					reject("Creating shared secret key failed.");
				}
				
				// Otherwise
				else {
				
					// Securely clear X25519 secret key
					x25519SecretKey.fill(0);
					
					// Check if shared secret key isn't zero
					if(Common.arraysAreEqualTimingSafe(sharedSecretKey, (new Uint8Array(sharedSecretKey["length"])).fill(0)) === false) {
				
						// Check if data is valid
						if(data["length"] !== 0) {
					
							// Create random nonce
							var nonce = new Uint8Array(Slatepack.NONCE_LENGTH);
							
							crypto.getRandomValues(nonce);
							
							// Try
							try {
							
								// Create cipher from shared secret key and nonce
								var cipher = chacha.createCipher(sharedSecretKey, nonce);
								
								// Set cipher's AAD
								cipher.setAAD(Slatepack.AAD_VALUE);
								
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
							
								// Securely clear shared secret key
								sharedSecretKey.fill(0);
							
								// Reject error
								reject("Encrypting data failed.");
								
								// Return
								return;
							}
							
							// Securely clear shared secret key
							sharedSecretKey.fill(0);
						
							// Resolve
							resolve([
							
								// Nonce
								nonce,
								
								// Encrypted data
								encryptedData
							]);
						}
						
						// Otherwise
						else {
						
							// Securely clear shared secret key
							sharedSecretKey.fill(0);
						
							// Reject error
							reject("Invalid data.");
						}
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
		static decrypt(secretKey, publicKey, encryptedData, nonce) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if getting X25519 secret key from the secret key failed
				var x25519SecretKey = X25519.secretKeyFromEd25519SecretKey(secretKey);
				
				if(x25519SecretKey === X25519.OPERATION_FAILED) {
				
					// Reject error
					reject("Invalid secret key.");
					
					// Return
					return;
				}
				
				// Check if getting X25519 public key from the public key failed
				var x25519PublicKey = X25519.publicKeyFromEd25519PublicKey(publicKey);
				
				if(x25519PublicKey === X25519.OPERATION_FAILED) {
				
					// Securely clear X25519 secret key
					x25519SecretKey.fill(0);
				
					// Reject error
					reject("Invalid public key.");
					
					// Return
					return;
				}
		
				// Check if creating shared secret key failed
				var sharedSecretKey = X25519.sharedSecretKeyFromSecretKeyAndPublicKey(x25519SecretKey, x25519PublicKey);
				
				if(sharedSecretKey === X25519.OPERATION_FAILED) {
				
					// Securely clear X25519 secret key
					x25519SecretKey.fill(0);
				
					// Reject error
					reject("Creating shared secret key failed.");
				}
				
				// Otherwise
				else {
				
					// Securely clear X25519 secret key
					x25519SecretKey.fill(0);
					
					// Check if shared secret key isn't zero
					if(Common.arraysAreEqualTimingSafe(sharedSecretKey, (new Uint8Array(sharedSecretKey["length"])).fill(0)) === false) {
				
						// Check if encrypted data is valid
						if(encryptedData["length"] > Slatepack.TAG_LENGTH) {
					
							// Try
							try {
							
								// Create decipher from shared secret key and nonce
								var decipher = chacha.createDecipher(sharedSecretKey, nonce);
								
								// Set decipher's AAD
								decipher.setAAD(Slatepack.AAD_VALUE);
								
								// Set decipher's tag
								decipher.setAuthTag(encryptedData.subarray(encryptedData["length"] - Slatepack.TAG_LENGTH));
								
								// Decrypt encrypted data with the decipher
								var decryptedData = decipher.update(encryptedData.subarray(0, encryptedData["length"] - Slatepack.TAG_LENGTH));
								
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
							
								// Securely clear shared secret key
								sharedSecretKey.fill(0);
							
								// Reject error
								reject("Decrypting data failed.");
								
								// Return
								return;
							}
							
							// Securely clear shared secret key
							sharedSecretKey.fill(0);
							
							// Resolve decrypted data
							resolve(decryptedData);
						}
						
						// Otherwise
						else {
						
							// Securely clear shared secret key
							sharedSecretKey.fill(0);
						
							// Reject error
							reject("Invalid encrypted data.");
						}
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
		
		// Format
		static format(slatepack) {
		
			// Initialize result
			var result = "";
			
			// Go through all characters in the Slatepack
			for(var i = 0; i < slatepack["length"]; ++i) {
			
				// Check if at a word break
				if(i !== 0 && i % Slatepack.WORD_LENGTH === 0) {
				
					// check if at a line break
					if(i % (Slatepack.WORD_LENGTH * Slatepack.WORDS_PER_LINE) === 0) {
					
						// Append new line to result
						result += "\n";
					}
					
					// Otherwise
					else {
					
						// Append space to result
						result += " ";
					}
				}
				
				// Append character to result
				result += slatepack[i];
			}
			
			// Return result
			return result;
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
		
		// Word length
		static get WORD_LENGTH() {
		
			// Return word length
			return 15;
		}
		
		// Words per line
		static get WORDS_PER_LINE() {
		
			// Return words per line
			return 200;
		}
		
		// Version
		static get VERSION() {
		
			// Return version
			return 0;
		}
		
		// Component delimiter
		static get COMPONENT_SEPARATOR() {
		
			// Return component separator
			return ".";
		}
		
		// Encrypted header
		static get ENCRYPTED_HEADER() {
		
			// Return encrypted header
			return "BEGINSLATEPACK" + Slatepack.COMPONENT_SEPARATOR + " ";
		}
		
		// Encrypted footer
		static get ENCRYPTED_FOOTER() {
		
			// Return encrypted header
			return Slatepack.COMPONENT_SEPARATOR + " ENDSLATEPACK" + Slatepack.COMPONENT_SEPARATOR;
		}
		
		// Binary header
		static get BINARY_HEADER() {
		
			// Return binary header
			return "BEGINSLATE_BIN" + Slatepack.COMPONENT_SEPARATOR + " ";
		}
		
		// Binary footer
		static get BINARY_FOOTER() {
		
			// Return binary footer
			return Slatepack.COMPONENT_SEPARATOR + " ENDSLATE_BIN" + Slatepack.COMPONENT_SEPARATOR;
		}
		
		// Encrypted header pattern
		static get ENCRYPTED_HEADER_PATTERN() {
		
			// Return encrypted header pattern
			return /^[>\n\r\t ]*BEGINSLATEPACK[>\n\r\t ]*$/u;
		}
		
		// Encrypted footer pattern
		static get ENCRYPTED_FOOTER_PATTERN() {
		
			// Return encrypted footer pattern
			return /^[>\n\r\t ]*ENDSLATEPACK[>\n\r\t ]*$/u;
		}
		
		// Binary header pattern
		static get BINARY_HEADER_PATTERN() {
		
			// Return binary header pattern
			return /^[>\n\r\t ]*BEGINSLATE_BIN[>\n\r\t ]*$/u;
		}
		
		// Binary footer pattern
		static get BINARY_FOOTER_PATTERN() {
		
			// Return binary footer pattern
			return /^[>\n\r\t ]*ENDSLATE_BIN[>\n\r\t ]*$/u;
		}
		
		// Whitespace pattern
		static get WHITESPACE_PATTERN() {
		
			// Return whitespace pattern
			return /[>\n\r\t ]/gu;
		}
		
		// No public key
		static get NO_PUBLIC_KEY() {
		
			// Return no public key
			return null;
		}
		
		// Address without human-readable part length
		static get ADDRESS_WITHOUT_HUMAN_READABLE_PART_LENGTH() {
		
			// Return address without human-readable part length
			return 59;
		}
}


// Main function

// Set global object's Slatepack
globalThis["Slatepack"] = Slatepack;

// Export Slatepack
module["exports"] = Slatepack;
