// Use strict
"use strict";


// Requires
const crypto = require("crypto")["webcrypto"];
const Secp256k1Zkp = require("./secp256k1-zkp-0.0.29.js");
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
		
			// Check it public key isn't the correct length
			if(publicKey["length"] !== Crypto.SECP256K1_PUBLIC_KEY_LENGTH) {
			
				// Throw error
				throw "Invalid public key.";
			}
			
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
		
			// Check it MQS address isn't the correct length
			if(mqsAddress["length"] !== Mqs.ADDRESS_LENGTH) {
			
				// Throw error
				throw "Invalid MQS address.";
			}
			
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
		
		// Is valid address with host
		static isValidAddressWithHost(url, isMainnet) {
		
			// Check if URL doesn't contain a host separator
			if(url.indexOf(Mqs.ADDRESS_HOST_SEPARATOR) !== Mqs.ADDRESS_LENGTH) {
			
				// Return false
				return false;
			}
			
			// Try
			try {
			
				// Parse beginning of the URL as an MQS address
				Mqs.mqsAddressToPublicKey(url.substring(0, Mqs.ADDRESS_LENGTH), isMainnet);
			}
			
			// Catch errors
			catch(error) {
			
				// Return false
				return false;
			}
			
			// Check if the end of the URL isn't a valid host
			if(Mqs.ADDRESS_HOST_PATTERN.test(url.substring(Mqs.ADDRESS_LENGTH + Mqs.ADDRESS_HOST_SEPARATOR["length"])) === false || Common.isValidUrl(url.substring(Mqs.ADDRESS_LENGTH + Mqs.ADDRESS_HOST_SEPARATOR["length"])) === false) {
			
				// Return false
				return false;
			}
			
			// Return true
			return true;
		}
		
		// Send request
		static sendRequest(url, slate, secretKey, isMainnet, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Check if cancel didn't occur
				if(cancelOccurred === Common.NO_CANCEL_OCCURRED || cancelOccurred() === false) {
				
					// Check if getting sender address from the secret key failed
					var senderPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(secretKey);
					
					if(senderPublicKey === Secp256k1Zkp.OPERATION_FAILED) {
					
						// Reject error
						reject(Message.createText(Language.getDefaultTranslation('Creating slate failed.')));
					}
					
					// Otherwise
					else {
					
						// Get sender address from sender public key
						var senderAddress = Mqs.publicKeyToMqsAddress(senderPublicKey, isMainnet);
			
						// Get receiver address from URL
						var receiverAddress = url.substring(0, Mqs.ADDRESS_LENGTH);
						
						// Get host from URL
						var host = url.substring(Mqs.ADDRESS_LENGTH + Mqs.ADDRESS_HOST_SEPARATOR["length"]);
						
						// Check if host contains a port
						var portIndex = host.indexOf(Mqs.HOST_PORT_SEPARATOR);
						
						if(portIndex !== Common.INDEX_NOT_FOUND) {
						
							// Get port from the host
							var port = parseInt(host.substring(portIndex + Mqs.HOST_PORT_SEPARATOR["length"]), Common.DECIMAL_NUMBER_BASE);
						}
						
						// Otherwise
						else {
						
							// Set port to no port
							var port = Mqs.NO_PORT;
						}
						
						// Initialize connection attempts
						var connectionAttempts = 0;
						
						// Initialize slate posted
						var slatePosted = false;
						
						// Connect to host
						var connectToHost = function() {
						
							// Initialize connected
							var connected = false;
							
							// Initialize reconnect
							var reconnect = true;
							
							// Initialize subscription requested
							var subscriptionRequested = false;
							
							// Initialize post slate requested
							var postSlateRequested = false;
							
							// Create connection
							var connection = new WebSocket(((port === Common.DEFAULT_HTTP_PORT) ? Common.WEBSOCKET_PROTOCOL : Common.WEBSOCKET_SECURE_PROTOCOL) + "//" + ((portIndex !== Common.INDEX_NOT_FOUND) ? host.substring(0, portIndex) : host));
							
							// Disconnect and reject
							var disconnectAndReject = function(messageOrError) {
							
								// Set reconnect to false
								reconnect = false;
							
								// Check if check if canceled interval exists
								if(checkIfCanceledInterval !== Mqs.NO_CHECK_IF_CANCELED_INTERVAL) {
								
									// Clear check if canceled internal
									clearInterval(checkIfCanceledInterval);
									
									// Set check if canceled interval to no interval
									checkIfCanceledInterval = Mqs.NO_CHECK_IF_CANCELED_INTERVAL;
								}
							
								// Try
								try {
							
									// Close connection
									connection.close();
								}
								
								// Catch errors
								catch(error) {
								
								}
								
								// Reject message or error
								reject(messageOrError);
							};
							
							// Set check if canceled interval
							var checkIfCanceledInterval = setInterval(function() {
							
								// Check if cancel occurred
								if(cancelOccurred !== Common.NO_CANCEL_OCCURRED && cancelOccurred() === true) {
								
									// Disconnect and reject
									disconnectAndReject(Common.CANCELED_ERROR);
								}
								
							}, Mqs.CHECK_IF_CANCELED_INTERVAL_MILLISECONDS);
							
							// Connection open event
							$(connection).on("open", function() {
							
								// Check if cancel didn't occur
								if(cancelOccurred === Common.NO_CANCEL_OCCURRED || cancelOccurred() === false) {
							
									// Set connected
									connected = true;
									
									// Reset connection attempts
									connectionAttempts = 0;
								}
								
								// Otherwise
								else {
								
									// Disconnect and reject
									disconnectAndReject(Common.CANCELED_ERROR);
								}
								
							// Connection error event
							}).on("error", function() {
							
								// Check if cancel didn't occur
								if(cancelOccurred === Common.NO_CANCEL_OCCURRED || cancelOccurred() === false) {
							
									// Check if check if canceled interval exists
									if(checkIfCanceledInterval !== Mqs.NO_CHECK_IF_CANCELED_INTERVAL) {
									
										// Clear check if canceled internal
										clearInterval(checkIfCanceledInterval);
										
										// Set check if canceled interval to no interval
										checkIfCanceledInterval = Mqs.NO_CHECK_IF_CANCELED_INTERVAL;
									}
								
									// Try
									try {
								
										// Close connection
										connection.close();
									}
									
									// Catch errors
									catch(error) {
									
									}
								}
								
								// Otherwise
								else {
								
									// Disconnect and reject
									disconnectAndReject(Common.CANCELED_ERROR);
								}
								
							// Connection close event
							}).on("close", function() {
							
								// Check if check if canceled interval exists
								if(checkIfCanceledInterval !== Mqs.NO_CHECK_IF_CANCELED_INTERVAL) {
								
									// Clear check if canceled internal
									clearInterval(checkIfCanceledInterval);
									
									// Set check if canceled interval to no interval
									checkIfCanceledInterval = Mqs.NO_CHECK_IF_CANCELED_INTERVAL;
								}
								
								// Check if cancel didn't occur
								if(cancelOccurred === Common.NO_CANCEL_OCCURRED || cancelOccurred() === false) {
								
									// Check if reconnecting
									if(reconnect === true) {
							
										// Check if not connected and too many unsuccessful connections have been attempted
										if(connected === false && ++connectionAttempts >= Mqs.CONNECTION_ATTEMPTS_THRESHOLD) {
										
											// Reject error
											reject(Message.createText(Language.getDefaultTranslation('Connecting to the host failed.')));
										}
										
										// Otherwise
										else {
										
											// Clear connected
											connected = false;
									
											// Set timeout
											setTimeout(function() {
											
												// Check if cancel didn't occur
												if(cancelOccurred === Common.NO_CANCEL_OCCURRED || cancelOccurred() === false) {
												
													// Check if still reconnecting
													if(reconnect === true) {
											
														// Connect to host
														connectToHost();
													}
												}
												
												// Otherwise
												else {
												
													// Reject canceled error
													reject(Common.CANCELED_ERROR);
												}
												
											}, Mqs.BEFORE_RECONNECT_DELAY_MILLISECONDS);
										}
									}
									
									// Otherwise
									else {
									
										// Clear connected
										connected = false;
									}
								}
								
								// Otherwise
								else {
								
									// Clear connected
									connected = false;
								
									// Reject canceled error
									reject(Common.CANCELED_ERROR);
								}
							
							// Connection message event
							}).on("message", function(event) {
							
								// Check if cancel didn't occur
								if(cancelOccurred === Common.NO_CANCEL_OCCURRED || cancelOccurred() === false) {
							
									// Try
									try {
									
										// Parse message as JSON
										var message = JSON.parse(event["originalEvent"]["data"]);
									}
									
									// Catch errors
									catch(error) {
									
										// Disconnect and reject
										disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid message from the host.')));
										
										// Return
										return;
									}
									
									// Check if message is invalid
									if(Object.isObject(message) === false || "type" in message === false) {
									
										// Disconnect and reject
										disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid message from the host.')));
									}
									
									// Otherwise
									else {
									
										// Check message's type
										switch(message["type"]) {
										
											// Challenge
											case "Challenge":
											
												// Check if message is invalid
												if("str" in message === false || typeof message["str"] !== "string") {
												
													// Disconnect and reject
													disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid message from the host.')));
												}
												
												// Otherwise
												else {
												
													// Get challenge hash
													var challengeHash = new Uint8Array(sha256.arrayBuffer((new TextEncoder()).encode(message["str"])));
													
													// Check if signing challenge with secret key failed
													var challengeSignature = Secp256k1Zkp.createMessageHashSignature(challengeHash, secretKey);
													
													if(challengeSignature === Secp256k1Zkp.OPERATION_FAILED) {
													
														// Disconnect and reject
														disconnectAndReject(Message.createText(Language.getDefaultTranslation('Creating slate failed.')));
													}
													
													// Otherwise
													else {
													
														// Send subscribe request to the host
														connection.send(JSON.stringify({
														
															// Type
															"type": "Subscribe",
															
															// Address
															"address": senderAddress,
															
															// Signature
															"signature": Common.toHexString(challengeSignature)
														}));
														
														// Securely clear challenge signature
														challengeSignature.fill(0);
														
														// Set scription requested
														subscriptionRequested = true;
													}
												}
											
												// Break
												break;
											
											// Ok
											case "Ok":
											
												// Check if subscription was requested
												if(subscriptionRequested === true) {
												
													// Clear subscription request
													subscriptionRequested = false;
													
													// Check if slate hasn't been posted yet
													if(slatePosted === false) {
													
														// Encrypt slate
														Mqs.encrypt(secretKey, Mqs.mqsAddressToPublicKey(receiverAddress, isMainnet), (new TextEncoder()).encode(JSONBigNumber.stringify(slate))).then(function(encryptedData) {
														
															// Check if cancel didn't occur
															if(cancelOccurred === Common.NO_CANCEL_OCCURRED || cancelOccurred() === false) {
															
																// Check if still connected
																if(connected === true) {
														
																	// Create payload
																	var payload = JSON.stringify({
																	
																		// Destination
																		"destination": {
																		
																			// Public key
																			"public_key": receiverAddress,
																			
																			// Domain
																			"domain": (portIndex !== Common.INDEX_NOT_FOUND) ? host.substring(0, portIndex) : host,
																			
																			// Port
																			"port": port
																		},
																		
																		// Nonce
																		"nonce": Common.toHexString(encryptedData[Mqs.ENCRYPTED_DATA_NONCE_INDEX]),
																		
																		// Salt
																		"salt": Common.toHexString(encryptedData[Mqs.ENCRYPTED_DATA_SALT_INDEX]),
																		
																		// Encrypted message
																		"encrypted_message": Common.toHexString(encryptedData[Mqs.ENCRYPTED_DATA_DATA_INDEX])
																	});
																	
																	// Get payload hash
																	var payloadHash = new Uint8Array(sha256.arrayBuffer((new TextEncoder()).encode(payload)));
																	
																	// Check if signing payload with secret key failed
																	var payloadSignature = Secp256k1Zkp.createMessageHashSignature(payloadHash, secretKey);
																	
																	if(payloadSignature === Secp256k1Zkp.OPERATION_FAILED) {
																	
																		// Disconnect and reject
																		disconnectAndReject(Message.createText(Language.getDefaultTranslation('Creating slate failed.')));
																	}
																	
																	// Otherwise
																	else {
																	
																		// Send post slate request to the host
																		connection.send(JSON.stringify({
																		
																			// Type
																			"type": "PostSlate",
																			
																			// From
																			"from": senderAddress,
																			
																			// To
																			"to": receiverAddress,
																			
																			// String
																			"str": payload,
																			
																			// Signature
																			"signature": Common.toHexString(payloadSignature)
																		}));
																		
																		// Set post slate request
																		postSlateRequested = true;
																	}
																}
															}
															
															// Otherwise
															else {
															
																// Disconnect and reject
																disconnectAndReject(Common.CANCELED_ERROR);
															}
														
														// Catch errors
														}).catch(function(error) {
														
															// Check if cancel didn't occur
															if(cancelOccurred === Common.NO_CANCEL_OCCURRED || cancelOccurred() === false) {
														
																// Disconnect and reject
																disconnectAndReject(Message.createText(Language.getDefaultTranslation('Creating slate failed.')));
															}
															
															// Otherwise
															else {
															
																// Disconnect and reject
																disconnectAndReject(Common.CANCELED_ERROR);
															}
														});
													}
												}
												
												// Otherwise check if post slate was request
												else if(postSlateRequested === true) {
												
													// Clear post slate request
													postSlateRequested = false;
													
													// Set slate posted
													slatePosted = true;
												}
												
												// Otherwise
												else {
												
													// Disconnect and reject
													disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid message from the host.')));
												}
											
												// Break
												break;
											
											// Slate
											case "Slate":
											
												// Check if slate was posted
												if(slatePosted === true) {
												
													// Set reconnect to false
													reconnect = false;
												
													// Check if check if canceled interval exists
													if(checkIfCanceledInterval !== Mqs.NO_CHECK_IF_CANCELED_INTERVAL) {
													
														// Clear check if canceled internal
														clearInterval(checkIfCanceledInterval);
														
														// Set check if canceled interval to no interval
														checkIfCanceledInterval = Mqs.NO_CHECK_IF_CANCELED_INTERVAL;
													}
												
													// Try
													try {
												
														// Close connection
														connection.close();
													}
													
													// Catch errors
													catch(error) {
													
													}
											
													// Check if message is invalid
													if("from" in message === false || message["from"] !== receiverAddress || "signature" in message === false || Common.isHexString(message["signature"]) === false || "str" in message === false || typeof message["str"] !== "string") {
													
														// Disconnect and reject
														disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid message from the host.')));
													}
													
													// Otherwise
													else {
													
														// Try
														try {
														
															// Get receiver public key
															var receiverPublicKey = Mqs.mqsAddressToPublicKey(message["from"], isMainnet);
														}
														
														// Catch errors
														catch(error) {
														
															// Disconnect and reject
															disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid message from the host.')));
															
															// Return
															return;
														}
													
														// Get payload hash
														var payloadHash = new Uint8Array(sha256.arrayBuffer((new TextEncoder()).encode(message["str"])));
														
														// Check if payload signature doesn't verify the payload
														if(Secp256k1Zkp.verifyMessageHashSignature(Common.fromHexString(message["signature"]), payloadHash, receiverPublicKey) !== true) {
														
															// Disconnect and reject
															disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid message from the host.')));
														}
														
														// Otherwise
														else {
														
															// Try
															try {
															
																// Parse payload as JSON
																var payload = JSON.parse(message["str"]);
															}
															
															// Catch errors
															catch(error) {
															
																// Disconnect and reject
																disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid response from the recipient.')));
																
																// Return
																return;
															}
															
															// Check if payload's destination is invalid
															if(Object.isObject(payload) === false || "destination" in payload === false || Object.isObject(payload["destination"]) === false || "public_key" in payload["destination"] === false || payload["destination"]["public_key"] !== senderAddress) {
															
																// Disconnect and reject
																disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid response from the recipient.')));
															}
															
															// Otherwise check if payload's nonce is invalid
															else if("nonce" in payload === false || Common.isHexString(payload["nonce"]) === false || Common.hexStringLength(payload["nonce"]) !== Mqs.NONCE_LENGTH) {
															
																// Disconnect and reject
																disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid response from the recipient.')));
															}
															
															// Otherwise check if payload's salt is invalid
															else if("salt" in payload === false || Common.isHexString(payload["salt"]) === false || Common.hexStringLength(payload["salt"]) !== Mqs.SALT_LENGTH) {
															
																// Disconnect and reject
																disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid response from the recipient.')));
															}
															
															// Otherwise check if payload's encrypted message is invalid
															else if("encrypted_message" in payload === false || Common.isHexString(payload["encrypted_message"]) === false) {
															
																// Disconnect and reject
																disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid response from the recipient.')));
															}
															
															// Otherwise
															else {
															
																// Decrypt slate response
																Mqs.decrypt(secretKey, receiverPublicKey, Common.fromHexString(payload["encrypted_message"]), Common.fromHexString(payload["salt"]), Common.fromHexString(payload["nonce"])).then(function(data) {
																
																	// Check if cancel didn't occur
																	if(cancelOccurred === Common.NO_CANCEL_OCCURRED || cancelOccurred() === false) {
																
																		// Try
																		try {
																		
																			// Parse slate response as JSON
																			var slateResponse = JSONBigNumber.parse((new TextDecoder("utf-8", {"fatal": true})).decode(data));
																		}
																		
																		// Catch errors
																		catch(error) {
																		
																			// Disconnect and reject
																			disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid response from the recipient.')));
																			
																			// Return
																			return;
																		}
																		
																		// Resolve slate response
																		resolve(slateResponse);
																	}
																	
																	// Otherwise
																	else {
																	
																		// Disconnect and reject
																		disconnectAndReject(Common.CANCELED_ERROR);
																	}
																
																// Catch errors
																}).catch(function(error) {
																
																	// Check if cancel didn't occur
																	if(cancelOccurred === Common.NO_CANCEL_OCCURRED || cancelOccurred() === false) {
																
																		// Disconnect and reject
																		disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid response from the recipient.')));
																	}
																	
																	// Otherwise
																	else {
																	
																		// Disconnect and reject
																		disconnectAndReject(Common.CANCELED_ERROR);
																	}
																});
															}
														}
													}
												}
												
												// Otherwise
												else {
												
													// Disconnect and reject
													disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid message from the host.')));
												}
											
												// Break
												break;
											
											// Default
											default:
											
												// Disconnect and reject
												disconnectAndReject(Message.createText(Language.getDefaultTranslation('Invalid message from the host.')));
												
												// Break
												break;
										}
									}
								}
								
								// Otherwise
								else {
								
									// Disconnect and reject
									disconnectAndReject(Common.CANCELED_ERROR);
								}
							});
						};
						
						// Connect to host
						connectToHost();
					}
				}
				
				// Otherwise
				else {
				
					// Reject canceled error
					reject(Common.CANCELED_ERROR);
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
		
		// Default challenge
		static get DEFAULT_CHALLENGE() {
		
			// Return default challenge
			return "7WUDtkSaKyGRUnQ22rE3QUXChV8DmA6NnunDYP4vheTpc";
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
				
				// EPIC wallet
				case Consensus.EPIC_WALLET_TYPE:
		
					// Check if mainnet
					if(isMainnet === true) {
					
						// Return address version
						return new Uint8Array([1, 0]);
					}
					
					// Otherwise
					else {
					
						// Return address version
						return new Uint8Array([1, 136]);
					}
					
					// Break
					break;
			}
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
					if(Common.arraysAreEqualTimingSafe(sharedSecretKey, (new Uint8Array(sharedSecretKey["length"])).fill(0)) === false) {
				
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
					if(Common.arraysAreEqualTimingSafe(sharedSecretKey, (new Uint8Array(sharedSecretKey["length"])).fill(0)) === false) {
				
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
		
		// Address host separator
		static get ADDRESS_HOST_SEPARATOR() {
		
			// Return address host separator
			return "@";
		}
		
		// Address host patterm
		static get ADDRESS_HOST_PATTERN() {
		
			// Return address host pattern
			return /^[a-z0-9](?:[a-z0-9\.]*[a-z0-9])*(?::[1-9]\d*)?$/ui;
		}
		
		// Host port separator
		static get HOST_PORT_SEPARATOR() {
		
			// Return host port separator
			return ":";
		}
		
		// No port
		static get NO_PORT() {
		
			// Return no port
			return null;
		}
		
		// No check if canceled interval
		static get NO_CHECK_IF_CANCELED_INTERVAL() {
		
			// Return no check if canceled interval
			return null;
		}
		
		// Check if canceled interval milliseconds
		static get CHECK_IF_CANCELED_INTERVAL_MILLISECONDS() {
		
			// Return check if canceled interval milliseconds
			return 50;
		}
		
		// Connection attempts threshold
		static get CONNECTION_ATTEMPTS_THRESHOLD() {
		
			// Return connection attempts threshold
			return 5;
		}
		
		// Before reconnect delay milliseconds
		static get BEFORE_RECONNECT_DELAY_MILLISECONDS() {
		
			// Return before reconnect delay milliseconds
			return 250;
		}
}


// Main function

// Set global object's MQS
globalThis["Mqs"] = Mqs;

// Export MQS
module["exports"] = Mqs;
