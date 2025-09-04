// Use strict
"use strict";


// Requires
const BigNumber = require("./bignumber.js-9.1.1.js");
const Common = require("./common.js");
const Slatepack = require("./slatepack.js");
const Consensus = require("./consensus.js");


// Classes

// Slate class
class Slate {

	// Public
	
		// Initialize
		static initialize() {
		
			// Initialize request index
			Slate.requestIndex = 0;
		
			// Create worker
			Slate.worker = new Worker(Slate.WORKER_FILE_LOCATION);
			
			// Window before unload event
			$(window).on("beforeunload", function() {
			
				// Get current request index
				var currentRequestIndex = Slate.requestIndex++;
				
				// Check if current request index is at the max safe integer
				if(currentRequestIndex === Number.MAX_SAFE_INTEGER)
				
					// Reset request index
					Slate.requestIndex = 0;
				
				// Send worker an uninitialize request
				Slate.worker.postMessage([
				
					// Request index
					currentRequestIndex,
				
					// Type
					Slate.UNINITIALIZE_REQUEST_TYPE
				]);
			
				// Terminate worker
				Slate.worker.terminate();
			});
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Worker on error
				Slate.worker["onerror"] = function() {

					// Reject error
					reject("Failed to create slate worker.");
				};
				
				// Worker on message
				Slate.worker["onmessage"] = function(event) {
				
					// Get message
					var message = event["data"];
					
					// Get message's request index
					var requestIndex = message[Slate.MESSAGE_REQUEST_INDEX_OFFSET];
					
					// Check message's type
					switch(message[Slate.MESSAGE_TYPE_OFFSET]) {
					
						// Initialize request type
						case Slate.INITIALIZE_REQUEST_TYPE:
						
							// Get message's status
							var status = message[Slate.MESSAGE_STATUS_OFFSET];
						
							// Check if worker initialized successfully
							if(status === Slate.STATUS_SUCCESS_VALUE)
						
								// Resolve
								resolve();
							
							// Otherwise
							else
							
								// Reject error
								reject("Failed to initialize slate worker.");
						
							// Break
							break;
						
						// Default
						default:
						
							// Get message's response
							var response = message[Slate.MESSAGE_RESPONSE_OFFSET];
							
							// Trigger response request index event
							$(document).trigger(Slate.RESPONSE_EVENT + requestIndex.toFixed(), [
								
								// Response
								response
							]);
							
							// Break
							break;
					}
				};
				
				// Get current request index
				var currentRequestIndex = Slate.requestIndex++;
				
				// Check if current request index is at the max safe integer
				if(currentRequestIndex === Number.MAX_SAFE_INTEGER)
				
					// Reset request index
					Slate.requestIndex = 0;
				
				// Send worker an initialize request
				Slate.worker.postMessage([
				
					// Request index
					currentRequestIndex,
				
					// Type
					Slate.INITIALIZE_REQUEST_TYPE,
					
					// URL query string
					Common.URL_QUERY_STRING_SEPARATOR + encodeURIComponent(Consensus.OVERRIDE_WALLET_TYPE_URL_PARAMETER_NAME).replace(/%20/ug, "+") + Common.URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(Consensus.walletTypeToText(Consensus.getWalletType())).replace(/%20/ug, "+") + Common.URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent(Consensus.OVERRIDE_NETWORK_TYPE_URL_PARAMETER_NAME).replace(/%20/ug, "+") + Common.URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent(Consensus.networkTypeToText(Consensus.getNetworkType())).replace(/%20/ug, "+")
				]);
			});
		}
	
		// Constructor
		constructor(serializedSlateOrAmount, isMainnet, purposeOrFee, initialSendSlateOrheight, lockHeight = Slate.NO_LOCK_HEIGHT, relativeHeight = Slate.NO_RELATIVE_HEIGHT, timeToLiveCutOffHeight = Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT, senderAddress = Slate.NO_SENDER_ADDRESS, receiverAddress = Slate.NO_RECEIVER_ADDRESS, preferredVersions = []) {
		
			// Reset
			this.reset();
			
			// Check if a binary serialize slate is provided
			if(serializedSlateOrAmount instanceof Uint8Array === true) {
			
				// Get serialized slate
				var serializedSlate = serializedSlateOrAmount;
				
				// Get purpose
				var purpose = purposeOrFee;
				
				// Get initial send slate
				var initialSendSlate = initialSendSlateOrheight;
			
				// Unserialize the serialized slate
				this.unserialize(serializedSlate, isMainnet, purpose, initialSendSlate);
			}
			
			// Otherwise check if a serialized slate is provided
			else if(Object.isObject(serializedSlateOrAmount) === true) {
			
				// Get serialized slate
				var serializedSlate = serializedSlateOrAmount;
				
				// Get purpose
				var purpose = purposeOrFee;
				
				// Get initial send slate
				var initialSendSlate = initialSendSlateOrheight;
			
				// Unserialize the serialized slate
				this.unserialize(serializedSlate, isMainnet, purpose, initialSendSlate);
			}
			
			// Otherwise check if arguments are provided
			else if(serializedSlateOrAmount instanceof BigNumber === true) {
			
				// Get amount
				var amount = serializedSlateOrAmount;
				
				// Get fee
				var fee = purposeOrFee;
				
				// Get height
				var height = initialSendSlateOrheight;
			
				// Set amount to provided amount
				this.amount = amount;
				
				// Set fee to provided fee
				this.fee = fee;
				
				// Set height to provided height
				this.height = height;
				
				// Set lock height to provided lock height
				this.lockHeight = lockHeight;
				
				// Set relative height to provided relative height
				this.relativeHeight = relativeHeight;
				
				// Set time to live cut off height to provided time to live cut off height
				this.timeToLiveCutOffHeight = timeToLiveCutOffHeight;
				
				// Set sender address to provided sender address
				this.senderAddress = senderAddress;
				
				// Set receiver address to provided receiver address
				this.receiverAddress = receiverAddress;
				
				// Create kernel
				this.kernels.push(new SlateKernel(this.getKernelFeatures(), this.getFee(), this.getLockHeight(), this.getRelativeHeight()));
				
				// Set block header version to header version at the height
				this.blockHeaderVersion = Consensus.getHeaderVersion(isMainnet, this.getHeight());
				
				// Set version to the minimum compatible version
				this.version = this.minimumCompatibleVersion(preferredVersions);
				
				// Set original version to version
				this.originalVersion = this.getVersion();
			}
			
			// Otherwise
			else {
			
				// Throw error
				throw "Unsupported slate.";
			}
		}
		
		// Serialize
		serialize(isMainnet, purpose, preferBinary = false) {
			
			// Check version
			switch((this.getVersion() instanceof BigNumber === true) ? this.getVersion().toFixed() : this.getVersion()) {
			
				// Version two and three
				case Slate.VERSION_TWO.toFixed():
				case Slate.VERSION_THREE.toFixed():
				
					// Set self
					var self = this;
		
					// Create serialized slate
					var serializedSlate = {
					
						// Amount
						"amount": this.getAmount().toFixed(),
						
						// Fee
						"fee": this.getFee().toFixed(),
						
						// Height
						"height": this.getHeight().toFixed(),
						
						// ID
						"id": this.getId().serialize(),
						
						// Lock height
						"lock_height": this.getLockHeight().toFixed(),
						
						// Number of participants
						"num_participants": this.getNumberOfParticipants(),
						
						// Participant data
						"participant_data": this.getParticipants().map(function(participant) {
						
							// Return serialized participant
							return participant.serialize(self);
						}),
						
						// Transaction
						"tx": {
						
							// Body
							"body": {
							
								// Inputs
								"inputs": this.getInputs().map(function(input) {
								
									// Return serialized input
									return input.serialize(self);
								}),
								
								// Kernels
								"kernels": this.getKernels().map(function(kernel) {
								
									// Return serialized kernel
									return kernel.serialize(self);
								}),
								
								// Outputs
								"outputs": this.getOutputs().map(function(output) {
								
									// Return serialized output
									return output.serialize(self);
								})
							},
							
							// Offset
							"offset": Common.toHexString(this.getOffset())
						},
						
						// Version info
						"version_info": {
						
							// Block header version
							"block_header_version": this.getBlockHeaderVersion(),
							
							// Original version
							"orig_version": this.getOriginalVersion(),
							
							// Version
							"version": this.getVersion()
						}
					};
					
					// Check if slate's version is at least version three
					if(this.getVersion().isGreaterThanOrEqualTo(Slate.VERSION_THREE) === true) {
					
						// Set serialized slate's time to live cut off height
						serializedSlate["ttl_cutoff_height"] = (this.getTimeToLiveCutOffHeight() !== Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT) ? this.getTimeToLiveCutOffHeight().toFixed() : Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT;
						
						// Check wallet type
						switch(Consensus.getWalletType()) {
						
							// MWC wallet
							case Consensus.MWC_WALLET_TYPE:
							
								// Set serialized slate's payment proof
								serializedSlate["payment_proof"] = (this.hasPaymentProof() === true) ? {
								
									// Receiver address
									"receiver_address": this.getReceiverAddress(),
									
									// Receiver signature
									"receiver_signature": (this.getReceiverSignature() !== Slate.NO_RECEIVER_SIGNATURE) ? Common.toHexString(this.getReceiverSignature()) : null,
									
									// Sender address
									"sender_address": this.getSenderAddress()
								
								} : Slate.NO_PAYMENT_PROOF;
						
								// Set serialized slate's coin type
								serializedSlate["coin_type"] = Slate.COIN_TYPE;
								
								// Set serialized slate's network type
								serializedSlate["network_type"] = Slate.getNetworkType(isMainnet);
								
								// Break
								break;
							
							// EPIC wallet
							case Consensus.EPIC_WALLET_TYPE:
							
								// Set serialized slate's payment proof
								serializedSlate["payment_proof"] = (this.hasPaymentProof() === true) ? {
								
									// Receiver address
									"receiver_address": Common.toHexString(Tor.torAddressToPublicKey(this.getReceiverAddress())),
									
									// Receiver signature
									"receiver_signature": (this.getReceiverSignature() !== Slate.NO_RECEIVER_SIGNATURE) ? Common.toHexString(this.getReceiverSignature()) : null,
									
									// Sender address
									"sender_address": Common.toHexString(Tor.torAddressToPublicKey(this.getSenderAddress()))
								
								} : Slate.NO_PAYMENT_PROOF;
						
								// Break
								break;
						}
					}
					
					// Return serialized slate
					return serializedSlate;
				
				// Version Slatepack
				case Slate.VERSION_SLATEPACK:
				
					// Initialize bit writer
					var bitWriter = new BitWriter();
					
					// Try
					try {
					
						// Write purpose
						bitWriter.setBits(purpose, Slate.COMPACT_SLATE_PURPOSE_LENGTH);
						
						// Write ID
						bitWriter.setBytes(this.getId().getData());
						
						// Write mainnet
						bitWriter.setBits(isMainnet ? Slate.COMPACT_BOOLEAN_TRUE : Slate.COMPACT_BOOLEAN_FALSE, Slate.COMPACT_BOOLEAN_LENGTH);
						
						// Check if purpose is send initial
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) {
						
							// Write amount
							Slate.compactUint64(this.getAmount(), true, bitWriter);
							
							// Write fee
							Slate.compactUint64(this.getFee(), true, bitWriter);
						}
						
						// Write height
						Slate.compactUint64(this.getHeight(), false, bitWriter);
						
						// Write lock height
						Slate.compactUint64(this.getLockHeight(), false, bitWriter);
						
						// Check if time to live cut off height exists
						if(this.getTimeToLiveCutOffHeight() !== Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT) {
						
							// Write time to live cut off height exists
							bitWriter.setBits(Slate.COMPACT_BOOLEAN_TRUE, Slate.COMPACT_BOOLEAN_LENGTH);
							
							// Write time to live cut off height
							Slate.compactUint64(this.getTimeToLiveCutOffHeight(), false, bitWriter);
						}
						
						// Otherwise
						else {
						
							// Write time to live cut off height doesn't exist
							bitWriter.setBits(Slate.COMPACT_BOOLEAN_FALSE, Slate.COMPACT_BOOLEAN_LENGTH);
						}
						
						// Check if purpose is send initial
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) {
						
							// Write participant
							this.getParticipant(SlateParticipant.SENDER_ID).serialize(this, bitWriter);
							
							// Check if has payment proof
							if(this.hasPaymentProof() === true) {
							
								// Write payment proof exists
								bitWriter.setBits(Slate.COMPACT_BOOLEAN_TRUE, Slate.COMPACT_BOOLEAN_LENGTH);
								
								// Write sender address
								Slate.compactProofAddress(this.getSenderAddress(), isMainnet, bitWriter);
								
								// Write receiver address
								Slate.compactProofAddress(this.getReceiverAddress(), isMainnet, bitWriter);
							}
							
							// Otherwise
							else {
							
								// Write payment proof doesn't exist
								bitWriter.setBits(Slate.COMPACT_BOOLEAN_FALSE, Slate.COMPACT_BOOLEAN_LENGTH);
							}
						}
						
						// Check if purpose is send response
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_RESPONSE) {
						
							// Write offset
							bitWriter.setBytes(this.getOffset());
						
							// Go through all outputs
							for(var i = 0; i < this.getOutputs()["length"]; ++i) {
							
								// Get output
								var output = this.getOutputs()[i];
								
								// Write output
								output.serialize(this, bitWriter);
								
								// Check if not at the last output
								if(i !== this.getOutputs()["length"] - 1) {
								
									// Write continue to next output
									bitWriter.setBits(Slate.COMPACT_BOOLEAN_TRUE, Slate.COMPACT_BOOLEAN_LENGTH);
								}
								
								// Otherwise
								else {
								
									// Write no more outputs
									bitWriter.setBits(Slate.COMPACT_BOOLEAN_FALSE, Slate.COMPACT_BOOLEAN_LENGTH);
								}
							}
							
							// Go through all kernels
							for(var i = 0; i < this.getKernels()["length"]; ++i) {
							
								// Get kernel
								var kernel = this.getKernels()[i];
								
								// Write kernel
								kernel.serialize(this, bitWriter);
								
								// Check if not at the last kernel
								if(i !== this.getKernels()["length"] - 1) {
								
									// Write continue to next kernel
									bitWriter.setBits(Slate.COMPACT_BOOLEAN_TRUE, Slate.COMPACT_BOOLEAN_LENGTH);
								}
								
								// Otherwise
								else {
								
									// Write no more kernels
									bitWriter.setBits(Slate.COMPACT_BOOLEAN_FALSE, Slate.COMPACT_BOOLEAN_LENGTH);
								}
							}
						
							// Write participant
							this.getParticipant(SlateParticipant.SENDER_ID.plus(1)).serialize(this, bitWriter);
							
							// Check if has payment proof
							if(this.hasPaymentProof() === true) {
							
								// Write payment proof exists
								bitWriter.setBits(Slate.COMPACT_BOOLEAN_TRUE, Slate.COMPACT_BOOLEAN_LENGTH);
								
								// Write sender address
								Slate.compactProofAddress(this.getSenderAddress(), isMainnet, bitWriter);
								
								// Write receiver address
								Slate.compactProofAddress(this.getReceiverAddress(), isMainnet, bitWriter);
								
								// Check if receiver signature exists
								if(this.getReceiverSignature() !== Slate.NO_RECEIVER_SIGNATURE) {
								
									// Write receiver signature exists
									bitWriter.setBits(Slate.COMPACT_BOOLEAN_TRUE, Slate.COMPACT_BOOLEAN_LENGTH);
									
									// Check if receiver signature is too short or too long
									if(this.getReceiverSignature()["length"] < Crypto.ED25519_SIGNATURE_LENGTH || this.getReceiverSignature()["length"] - Crypto.ED25519_SIGNATURE_LENGTH >= Math.pow(2, Slate.COMPACT_PROOF_SIGNATURE_LENGTH_LENGTH)) {
									
										// Throw error
										throw "Receiver signature is too short or too long.";
									}
									
									// Write receiver signature length
									bitWriter.setBits(this.getReceiverSignature()["length"] - Crypto.ED25519_SIGNATURE_LENGTH, Slate.COMPACT_PROOF_SIGNATURE_LENGTH_LENGTH);
									
									// Write receiver signature
									bitWriter.setBytes(this.getReceiverSignature());
								}
								
								// Otherwise
								else {
								
									// Write receiver signature doesn't exist
									bitWriter.setBits(Slate.COMPACT_BOOLEAN_FALSE, Slate.COMPACT_BOOLEAN_LENGTH);
								}
							}
							
							// Otherwise
							else {
							
								// Write payment proof doesn't exist
								bitWriter.setBits(Slate.COMPACT_BOOLEAN_FALSE, Slate.COMPACT_BOOLEAN_LENGTH);
								
								// Write receiver signature doesn't exist
								bitWriter.setBits(Slate.COMPACT_BOOLEAN_FALSE, Slate.COMPACT_BOOLEAN_LENGTH);
							}
						}
						
						// Return serialized slate
						return bitWriter.getBytes();
					}
					
					// Catch errors
					catch(error) {
					
						// Throw error
						throw "Compacting slate failed.";
					}
					
					// Break
					break;
				
				// Version four
				case Slate.VERSION_FOUR.toFixed():
				
					// Check if prefer binary
					if(preferBinary === true) {
					
						// Initialize bit writer
						var bitWriter = new BitWriter();
						
						// Try
						try {
						
							// Write version
							bitWriter.setBytes(this.getVersion().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT16));
							
							// Write block header version
							bitWriter.setBytes(this.getBlockHeaderVersion().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT16));
							
							// Write ID
							bitWriter.setBytes(this.getId().getData());
							
							// Write purpose
							bitWriter.setBytes([purpose + 1]);
							
							// Write offset
							bitWriter.setBytes((purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) ? Slate.ZERO_OFFSET : this.getOffset());
							
							// Initialize optional fields
							var optionalFields = 0;
							
							// Check if number of participants isn't the default
							if(this.getNumberOfParticipants().isEqualTo(Slate.DEFAULT_NUMBER_OF_PARTICIPANTS) === false) {
							
								// Set that optional fields includes number of participants
								optionalFields |= 0b00000001;
							}
							
							// Check if purpose is send initial
							if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) {
							
								// Check if amount isn't zero
								if(this.getAmount().isZero() === false) {
								
									// Set that optional fields includes amount
									optionalFields |= 0b00000010;
								}
								
								// Check if fee isn't zero
								if(this.getFee().isZero() === false) {
								
									// Set that optional fields includes fee
									optionalFields |= 0b00000100;
								}
							}
							
							// Check if kernel features isn't plain
							if(this.getKernelFeatures() !== SlateKernel.PLAIN_FEATURES) {
							
								// Set that optional fields includes features
								optionalFields |= 0b00001000;
							}
							
							// Check if time to live cut off height exists
							if(this.getTimeToLiveCutOffHeight() !== Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT) {
							
								// Set that optional fields includes time to live cut off height
								optionalFields |= 0b00010000;
							}
							
							// Write optional fields
							bitWriter.setBytes([optionalFields]);
							
							// Check if optional fields includes number of participants
							if((optionalFields & 0b00000001) !== 0) {
							
								// Write number of participants
								bitWriter.setBytes(this.getNumberOfParticipants().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT8));
							}
							
							// Check if optional fields includes amount
							if((optionalFields & 0b00000010) !== 0) {
							
								// Write amount
								bitWriter.setBytes(this.getAmount().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64));
							}
							
							// Check if optional fields includes fee
							if((optionalFields & 0b00000100) !== 0) {
							
								// Write fee
								bitWriter.setBytes(this.getFee().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64));
							}
							
							// Check if optional fields includes features
							if((optionalFields & 0b00001000) !== 0) {
							
								// Write features
								bitWriter.setBytes([this.getKernelFeatures()]);
							}
							
							// Check if optional fields includes time to live cut off height
							if((optionalFields & 0b00010000) !== 0) {
							
								// Write time to live cut off height
								bitWriter.setBytes(this.getTimeToLiveCutOffHeight().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64));
							}
							
							// Write participants length
							bitWriter.setBytes([1]);
							
							// Check if purpose is send initial
							if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) {
							
								// Write sender participant
								this.getParticipant(SlateParticipant.SENDER_ID).serialize(this, bitWriter);
							}
							
							// Otherwise
							else {
							
								// Write receiver participant
								this.getParticipant(SlateParticipant.SENDER_ID.plus(1)).serialize(this, bitWriter);
							}
							
							// Initialize component fields
							var componentFields = 0;
							
							// Check if purpose is send response
							if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_RESPONSE) {
							
								// Check if inputs or outputs exists
								if(this.getInputs()["length"] + this.getOutputs()["length"] !== 0) {
								
									// Set that component fields includes inputs and outputs
									componentFields |= 0b00000001;
								}
							}
							
							// Check if has payment proof
							if(this.hasPaymentProof() === true) {
							
								// Set that component fields includes payment proof
								componentFields |= 0b00000010;
							}
							
							// Write component fields
							bitWriter.setBytes([componentFields]);
							
							// Check if component fields includes inputs and outputs
							if((componentFields & 0b00000001) !== 0) {
							
								// Write inputs and outputs length
								bitWriter.setBytes((new BigNumber(this.getInputs()["length"] + this.getOutputs()["length"])).toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT16));
								
								// Go through all inputs
								for(var i = 0; i < this.getInputs()["length"]; ++i) {
								
									// Get input
									var input = this.getInputs()[i];
									
									// Write input or output is input
									bitWriter.setBytes([0]);
									
									// Write input
									input.serialize(this, bitWriter);
								}
								
								// Go through all outputs
								for(var i = 0; i < this.getOutputs()["length"]; ++i) {
								
									// Get output
									var output = this.getOutputs()[i];
									
									// Write input or output is output
									bitWriter.setBytes([1]);
									
									// Write output
									output.serialize(this, bitWriter);
								}
							}
							
							// Check if component fields includes payment proof
							if((componentFields & 0b00000010) !== 0) {
							
								// Write sender address
								bitWriter.setBytes(Slatepack.slatepackAddressToPublicKey(this.getSenderAddress()));
								
								// Write receiver address
								bitWriter.setBytes(Slatepack.slatepackAddressToPublicKey(this.getReceiverAddress()));
								
								// Check if receiver signature exists
								if(this.getReceiverSignature() !== Slate.NO_RECEIVER_SIGNATURE) {
								
									// Write receiver signature exists
									bitWriter.setBytes([1]);
									
									// Write receiver signature
									bitWriter.setBytes(this.getReceiverSignature());
								}
								
								// Otherwise
								else {
								
									// Write receiver signature doesn't exists
									bitWriter.setBytes([0]);
								}
							}
							
							// Check kernel features
							switch(this.getKernelFeatures()) {
							
								// Plain features
								case SlateKernel.PLAIN_FEATURES:
								
									// Break
									break;
								
								// Height locked features
								case SlateKernel.HEIGHT_LOCKED_FEATURES:
								
									// Write lock height
									bitWriter.setBytes(this.getLockHeight().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64));
								
									// Break
									break;
									
								// Default
								default:
								
									// Throw error
									throw "Unsupported features.";
							}
							
							// Return serialized slate
							return bitWriter.getBytes();
						}
						
						// Catch errors
						catch(error) {
						
							// Throw error
							throw "Compacting slate failed.";
						}
					}
					
					// Otherwise
					else {
				
						// Create serialized slate
						var serializedSlate = {
						
							// ID
							"id": this.getId().serialize(),
							
							// Purpose
							"sta": Slate.purposeToText(purpose),
							
							// Version
							"ver": this.getVersion().toFixed() + Slate.VERSION_SEPARATOR + this.getBlockHeaderVersion().toFixed()
						};
						
						// Check if number of participants isn't the default
						if(this.getNumberOfParticipants().isEqualTo(Slate.DEFAULT_NUMBER_OF_PARTICIPANTS) === false) {
						
							// Set serialized slate's number of participants
							serializedSlate["num_parts"] = this.getNumberOfParticipants();
						}
						
						// Check if time to live cut off height exists
						if(this.getTimeToLiveCutOffHeight() !== Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT) {
						
							// Set serialized slate's time to live cut off height
							serializedSlate["ttl"] = this.getTimeToLiveCutOffHeight().toFixed();
						}
						
						// Check kernel features
						switch(this.getKernelFeatures()) {
						
							// Plain features
							case SlateKernel.PLAIN_FEATURES:
							
								// Break
								break;
							
							// Height locked features
							case SlateKernel.HEIGHT_LOCKED_FEATURES:
							
								// Set serialized slate's features
								serializedSlate["feat"] = this.getKernelFeatures();
								
								// Set serialized slate's features arguments
								serializedSlate["feat_args"] = {
								
									// Lock height
									"lock_hgt": this.getLockHeight().toFixed()
								};
							
								// Break
								break;
								
							// Default
							default:
							
								// Throw error
								throw "Unsupported features.";
						}
						
						// Check if has payment proof
						if(this.hasPaymentProof() === true) {
						
							// Set serialized slate's payment proof
							serializedSlate["proof"] = {
						
								// Receiver address
								"raddr": Common.toHexString(Slatepack.slatepackAddressToPublicKey(this.getReceiverAddress())),
							
								// Sender address
								"saddr": Common.toHexString(Slatepack.slatepackAddressToPublicKey(this.getSenderAddress()))
							};
							
							// Check if receiver signature exists
							if(this.getReceiverSignature() !== Slate.NO_RECEIVER_SIGNATURE) {
							
								// Set payment proof's receiver signature
								serializedSlate["proof"]["rsig"] = Common.toHexString(this.getReceiverSignature());
							}
						}
						
						// Check if purpose is send initial
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) {
						
							// Set serialized slate's amount
							serializedSlate["amt"] = this.getAmount().toFixed();
							
							// Set serialized slate's fee
							serializedSlate["fee"] = this.getFee().toFixed();
							
							// Set serialized slate's participants
							serializedSlate["sigs"] = [this.getParticipant(SlateParticipant.SENDER_ID).serialize(this)];
						}
						
						// Check if purpose is send response
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_RESPONSE) {
						
							// Set serialized slate's offset
							serializedSlate["off"] = Common.toHexString(this.getOffset());
							
							// Set serialized slate's participants
							serializedSlate["sigs"] = [this.getParticipant(SlateParticipant.SENDER_ID.plus(1)).serialize(this)];
							
							// Set serialized slate's inputs and outputs
							serializedSlate["coms"] = [];
							
							// Go through all inputs
							for(var i = 0; i < this.getInputs()["length"]; ++i) {
							
								// Get input
								var input = this.getInputs()[i];
									
								// Add serialized input to the serialized slate's inputs and outputs
								serializedSlate["coms"].push(input.serialize(this));
							}
							
							// Go through all outputs
							for(var i = 0; i < this.getOutputs()["length"]; ++i) {
							
								// Get output
								var output = this.getOutputs()[i];
									
								// Add serialized output to the serialized slate's inputs and outputs
								serializedSlate["coms"].push(output.serialize(this));
							}
						}
						
						// Return serialzied slate
						return serializedSlate;
					}
					
					// Break
					break;
				
				// Default
				default:
				
					// Throw error
					throw "Unsupported slate version.";
			}
		}
		
		// Get transaction
		getTransaction() {
		
			// Return transaction
			return {
		
				// Body
				"body": {
				
					// Inputs
					"inputs": this.getInputs().map(function(input) {
					
						// Return input's transaction
						return input.getTransaction();
					}),
					
					// Kernels
					"kernels": this.getKernels().map(function(kernel) {
					
						// Return kernel's transaction
						return kernel.getTransaction();
					}),
					
					// Outputs
					"outputs": this.getOutputs().map(function(output) {
					
						// Return output's transaction
						return output.getTransaction();
					})
				},
				
				// Offset
				"offset": Common.toHexString(this.getOffset())
			};
		}
		
		// Get number of participants
		getNumberOfParticipants() {
		
			// Return number of participants
			return this.numberOfParticipants;
		}
		
		// Get ID
		getId() {
		
			// Return ID
			return this.id;
		}
		
		// Change ID
		changeId() {
		
			// Set ID to a random UUID
			this.id = new Uuid(Uuid.randomSerializedUuid());
		}
		
		// Get offset
		getOffset() {
		
			// Return offset
			return this.offset;
		}
		
		// Get inputs
		getInputs() {
		
			// Return inputs
			return this.inputs;
		}
		
		// Get outputs
		getOutputs() {
		
			// Return outputs
			return this.outputs;
		}
		
		// Get kernels
		getKernels() {
		
			// Return kernels
			return this.kernels;
		}
		
		// Get amount
		getAmount() {
		
			// Return amount
			return this.amount;
		}
		
		// Get fee
		getFee() {
		
			// Return fee
			return this.fee;
		}
		
		// Get height
		getHeight() {
		
			// Return height
			return this.height;
		}
		
		// Get lock height
		getLockHeight() {
		
			// Return lock height
			return this.lockHeight;
		}
		
		// Get relative height
		getRelativeHeight() {
		
			// Return relative height
			return this.relativeHeight;
		}
		
		// Get time to live cut off height
		getTimeToLiveCutOffHeight() {
		
			// Return time to live cut off height
			return this.timeToLiveCutOffHeight;
		}
		
		// Get participants
		getParticipants() {
		
			// Return participants
			return this.participants;
		}
		
		// Get version
		getVersion() {
		
			// Return version
			return this.version;
		}
		
		// Get original version
		getOriginalVersion() {
		
			// Return original version
			return this.originalVersion;
		}
		
		// Get block header version
		getBlockHeaderVersion() {
		
			// Return block header version
			return this.blockHeaderVersion;
		}
		
		// Get receiver address
		getReceiverAddress() {
		
			// Return receiver address
			return this.receiverAddress;
		}
		
		// Get receiver signature
		getReceiverSignature() {
		
			// Return receiver signature
			return this.receiverSignature;
		}
		
		// Set receiver address
		setReceiverAddress(receiverAddress) {
		
			// Set receiver address
			this.receiverAddress = receiverAddress;
		}
		
		// Set receiver signature
		setReceiverSignature(receiverSignature, isMainnet) {
		
			// Set receiver signature
			this.receiverSignature = receiverSignature;
			
			// Check if receiver signature failed to be verified
			if(this.verifyReceiverSignature(isMainnet) === false) {
			
				// Return false
				return false;
			}
			
			// Return true
			return true;
		}
		
		// Get sender address
		getSenderAddress() {
		
			// Return sender address
			return this.senderAddress;
		}
		
		// Get participant
		getParticipant(participantId) {
		
			// Go through all participants
			for(var i = 0; i < this.getParticipants()["length"]; ++i) {
			
				// Get participant
				var participant = this.getParticipants()[i];
				
				// Check if participant has the specified participant ID
				if(participant.getId().isEqualTo(participantId) === true) {
				
					// Return participant
					return participant;
				}
			}
			
			// Return no participant
			return Slate.NO_PARTICIPANT;
		}
		
		// Add outputs
		addOutputs(outputs, updateKernel = true) {
		
			// Check if updating kernel
			if(updateKernel === true) {
		
				// Update kernel
				this.updateKernel();
			}
			
			// Go through all outputs
			for(var i = 0; i < outputs["length"]; ++i) {
			
				// Get output
				var output = outputs[i];
			
				// Append output to list
				this.outputs.push(output);
			}
			
			// Check if sorting failed
			if(this.sort() === false) {
			
				// Return false
				return false;
			}
			
			// Check if verifying weight failed
			if(this.verifyWeight() === false) {
			
				// Return false
				return false;
			}
			
			// Check if verifying sorted and unique failed
			if(this.verifySortedAndUnique() === false) {
			
				// Return false
				return false;
			}
			
			// Check if verifying no cut through failed
			if(this.verifyNoCutThrough() === false) {
			
				// Return false
				return false;
			}
			
			// Return true
			return true;
		}
		
		// Add inputs
		addInputs(inputs, updateKernel = true, expectedNumberOfOutputs = 0) {
		
			// Check if updating kernel
			if(updateKernel === true) {
		
				// Update kernel
				this.updateKernel();
			}
			
			// Go through all inputs
			for(var i = 0; i < inputs["length"]; ++i) {
			
				// Get input
				var input = inputs[i];
			
				// Append input to list
				this.inputs.push(input);
			}
			
			// Check if sorting failed
			if(this.sort() === false) {
			
				// Return false
				return false;
			}
			
			// Check if verifying weight failed
			if(this.verifyWeight(expectedNumberOfOutputs) === false) {
			
				// Return false
				return false;
			}
			
			// Check if verifying sorted and unique failed
			if(this.verifySortedAndUnique() === false) {
			
				// Return false
				return false;
			}
			
			// Check if verifying no cut through failed
			if(this.verifyNoCutThrough() === false) {
			
				// Return false
				return false;
			}
			
			// Return true
			return true;
		}
		
		// Create offset
		createOffset() {
		
			// While offset isn't a valid secret key
			do {
			
				// Fill offset with random values
				crypto.getRandomValues(this.offset);
				
			} while(Secp256k1Zkp.isValidSecretKey(this.getOffset()) !== true);
		}
		
		// Apply offset
		applyOffset(secretKeyOrHardwareWallet, hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Set self
			var self = this;
			
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Check if a secret key is provided
				if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
				
					// Get secret key
					var secretKey = secretKeyOrHardwareWallet;
				
					// Check if secret key isn't a valid secret key
					if(Secp256k1Zkp.isValidSecretKey(secretKey) !== true) {
					
						// Reject error
						reject("Secret key isn't a valid secret key.");
					}
					
					// Otherwise
					else {
					
						// Check if getting blind offset from secret key and offset failed
						var blindOffset = Secp256k1Zkp.blindSum([
						
							// Secret key
							secretKey
							
						], [
						
							// Offset
							self.getOffset()
						]);
						
						if(blindOffset === Secp256k1Zkp.OPERATION_FAILED) {
						
							// Reject error
							reject("Getting blind offset from secret key and offset failed.");
						}
						
						// Otherwise check if blind offset isn't a valid secret key
						else if(Secp256k1Zkp.isValidSecretKey(blindOffset) !== true) {
						
							// Securely clear blind offset
							blindOffset.fill(0);
						
							// Reject error
							reject("Blind offset isn't a valid secret key.");
						}
						
						// Otherwise
						else {
						
							// Resolve blind offset
							resolve(blindOffset);
						}
					}
				}
				
				// Otherwise
				else {
				
					// Get hardware wallet
					var hardwareWallet = secretKeyOrHardwareWallet;
					
					// Return applying offset to the transaction with the hardware wallet
					return hardwareWallet.applyOffsetToTransaction(self.getOffset(), hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(secretNonceIndex) {
					
						// Resolve secret nonce index
						resolve(secretNonceIndex);
					
					// Catch errors
					}).catch(function(error) {
					
						// Reject error
						reject(error);
					});
				}
			});
		}
		
		// Combine offsets
		combineOffsets(offset) {
		
			// Check if updating offset with the offset failed
			this.offset = Secp256k1Zkp.blindSum([
							
				// Offset
				this.getOffset(),
				
				// Offset
				offset
			], []);
			
			if(this.getOffset() === Secp256k1Zkp.OPERATION_FAILED) {
							
				// Return false
				return false;
			}
			
			// Otherwise check if the result isn't a valid secret key
			else if(Secp256k1Zkp.isValidSecretKey(this.getOffset()) !== true) {
			
				// Return false
				return false;
			}
			
			// Otherwise
			else {
			
				// Return true
				return true;
			}
		}
		
		// Add participant
		addParticipant(secretKeyOrHardwareWallet, secretNonce, message, isMainnet, hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Set self
			var self = this;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Set participant ID to the sender ID
				var participantId = SlateParticipant.SENDER_ID;
				
				// While participant ID exists
				while(self.getParticipant(participantId) !== Slate.NO_PARTICIPANT) {
				
					// Increment participant ID
					participantId = participantId.plus(1);
				}
				
				// Get public blind excess
				var getPublicBlindExcess = function() {
				
					// Return promise
					return new Promise(function(resolve, reject) {
				
						// Check if a secret key is provided
						if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
						
							// Get secret key
							var secretKey = secretKeyOrHardwareWallet;
						
							// Check if getting public blind excess from secret key failed
							var publicBlindExcess = Secp256k1Zkp.publicKeyFromSecretKey(secretKey);
							
							if(publicBlindExcess === Secp256k1Zkp.OPERATION_FAILED) {
							
								// Reject error
								reject("Getting public blind excess failed.");
							}
							
							// Otherwise
							else {
							
								// Resolve public blind excess
								resolve(publicBlindExcess);
							}
						}
						
						// Otherwise
						else {
						
							// Get hardware wallet
							var hardwareWallet = secretKeyOrHardwareWallet;
							
							// Return getting the transaction public key with the hardware wallet
							return hardwareWallet.getTransactionPublicKey(hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(publicBlindExcess) {
							
								// Resolve public blind excess
								resolve(publicBlindExcess);
							
							// Catch errors
							}).catch(function(error) {
							
								// Reject error
								reject(error);
							});
						}
					});
				};
				
				// Return getting public blind excess
				return getPublicBlindExcess().then(function(publicBlindExcess) {
				
					// Get message signature
					var getMessageSignature = function() {
					
						// Return promise
						return new Promise(function(resolve, reject) {
				
							// Check if a message exists
							if(message !== SlateParticipant.NO_MESSAGE) {
							
								// Check if a secret key is provided
								if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
								
									// Get secret key
									var secretKey = secretKeyOrHardwareWallet;
									
									// Get message's hash
									var messageHash = Blake2b.compute(Crypto.SINGLE_SIGNER_MESSAGE_LENGTH, (new TextEncoder()).encode(message), new Uint8Array());
									
									// Check if getting message's hash failed
									if(messageHash === Blake2b.OPERATION_FAILED) {
									
										// Reject error
										reject("Getting message's hash failed.");
										
										// Return
										return;
									}
								
									// Check if creating message signature from the message hash, secret key, and public blind excess failed
									var messageSignature = Secp256k1Zkp.createSingleSignerSignature(messageHash, secretKey, Secp256k1Zkp.NO_SECRET_NONCE, publicBlindExcess, Secp256k1Zkp.NO_PUBLIC_NONCE, Secp256k1Zkp.NO_PUBLIC_NONCE_TOTAL);
									
									if(messageSignature === Secp256k1Zkp.OPERATION_FAILED) {
									
										// Reject error
										reject("Creating message signature.");
										
										// Return
										return;
									}
									
									// Resolve message signature
									resolve(messageSignature);
								}
								
								// Otherwise
								else {
								
									// Get hardware wallet
									var hardwareWallet = secretKeyOrHardwareWallet;
									
									// Return getting the transaction message signature with the hardware wallet
									return hardwareWallet.getTransactionMessageSignature(message, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(messageSignature) {
									
										// Resolve message signature
										resolve(messageSignature);
									
									// Catch errors
									}).catch(function(error) {
									
										// Reject error
										reject(error);
									});
								}
							}
							
							// Otherwise
							else {
							
								// Resolve no message signature
								resolve(SlateParticipant.NO_MESSAGE_SIGNATURE);
							}
						});
					};
					
					// Return getting message signature
					return getMessageSignature().then(function(messageSignature) {
					
						// Get public nonce
						var getPublicNonce = function() {
						
							// Return promise
							return new Promise(function(resolve, reject) {
							
								// Check if a secret key is provided
								if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
								
									// Check if getting a public nonce from secret nonce failed
									var publicNonce = Secp256k1Zkp.publicKeyFromSecretKey(secretNonce);
									
									if(publicNonce === Secp256k1Zkp.OPERATION_FAILED) {
									
										// Reject error
										reject("Getting a public nonce failed.");
									}
									
									// Otherwise
									else {
									
										// Resolve public nonce
										resolve(publicNonce);
									}
								}
								
								// Otherwise
								else {
								
									// Get hardware wallet
									var hardwareWallet = secretKeyOrHardwareWallet;
									
									// Return getting the transaction public nonce with the hardware wallet
									return hardwareWallet.getTransactionPublicNonce(hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(publicNonce) {
									
										// Resolve public nonce
										resolve(publicNonce);
									
									// Catch errors
									}).catch(function(error) {
									
										// Reject error
										reject(error);
									});
								}
							});
						};
						
						// Return getting public nonce
						return getPublicNonce().then(function(publicNonce) {
				
							// Save receiver signature
							var oldReceiverSignature = self.getReceiverSignature();
						
							// Get partial signature
							var getPartialSignature = function() {
							
								// Return promise
								return new Promise(function(resolve, reject) {
						
									// Check if participant ID is the sender ID
									if(participantId.isEqualTo(SlateParticipant.SENDER_ID) === true) {
									
										// Set no partial signature
										resolve(SlateParticipant.NO_PARTIAL_SIGNATURE);
									}
									
									// Otherwise
									else {
									
										// Return creating partial signature
										return self.createPartialSignature(secretKeyOrHardwareWallet, secretNonce, true, isMainnet, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(partialSignature) {
										
											// Resolve partial signature
											resolve(partialSignature);
										
										// Catch errors
										}).catch(function(error) {
										
											// Reject error
											reject(error);
										});
									}
								});
							};
							
							// Return getting partial signature
							return getPartialSignature().then(function(partialSignature) {
							
								// Try
								try {
								
									// Create participant
									var participant = new SlateParticipant(participantId, publicBlindExcess, publicNonce, partialSignature, message, messageSignature);
								}
								
								// Catch errors
								catch(error) {
								
									// Restore old receiver signature
									self.setReceiverSignature(oldReceiverSignature);
								
									// Reject error
									reject("Creating participant failed.");
									
									// Return
									return;
								}
								
								// Add participant to list
								self.getParticipants().push(participant);
								
								// Check if partial signatures failed to be verified
								if(self.verifyPartialSignatures() === false) {
								
									// Remove participant from list
									self.getParticipants().pop();
									
									// Restore old receiver signature
									self.setReceiverSignature(oldReceiverSignature);
								
									// Reject error
									reject("Verifying partial signature failed.");
								}
								
								// Otherwise
								else {
								
									// Resolve
									resolve();
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
		
		// Finalize
		finalize(secretKeyOrHardwareWallet, secretNonce, baseFee, isMainnet, verifyAsynchronous = false, hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Set self
			var self = this;
			
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Return creating partial signature
				return self.createPartialSignature(secretKeyOrHardwareWallet, secretNonce, false, isMainnet, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(partialSignature) {
				
					// Get sender participant
					var senderParticipant = self.getParticipant(SlateParticipant.SENDER_ID);
					
					// Save sender participant's partial signature
					var oldPartialSignature = senderParticipant.getPartialSignature();
					
					// Set sender participant's partial signature
					senderParticipant.setPartialSignature(partialSignature);
					
					// Check if partial signatures failed to be verified
					if(self.verifyPartialSignatures() === false) {
					
						// Restore sender participant's old partial signature
						senderParticipant.setPartialSignature(oldPartialSignature);
					
						// Reject error
						reject("Verifying partial signature failed.");
					}
					
					// Otherwise
					else {
				
						// Initialize partial signatures
						var partialSignatures = [];
						
						// Go through all participants
						for(var i = 0; i < self.getParticipants()["length"]; ++i) {
						
							// Get participant
							var participant = self.getParticipants()[i];
							
							// Check if participant is complete
							if(participant.isComplete() === true) {
							
								// Add participant's partial signature to list
								partialSignatures.push(participant.getPartialSignature());
							}
							
							// Otherwise
							else {
							
								// Restore sender participant's old partial signature
								senderParticipant.setPartialSignature(oldPartialSignature);
							
								// Reject error
								reject("Participant isn't complete.");
								
								// Return
								return;
							}
						}
					
						// Get public nonce sum from combining participant's public nonces
						var publicNonceSum = Secp256k1Zkp.combinePublicKeys(self.getParticipants().map(function(participant) {
						
							// Return participant's public nonce
							return participant.getPublicNonce();
						}));
						
						// Check if getting public nonce sum failed
						if(publicNonceSum === Secp256k1Zkp.OPERATION_FAILED) {
						
							// Restore sender participant's old partial signature
							senderParticipant.setPartialSignature(oldPartialSignature);
						
							// Reject error
							reject("Getting public nonce sum failed.");
						}
						
						// Otherwise
						else {
						
							// Get public blind excess sum from combining participant's public blind excesses
							var publicBlindExcessSum = Secp256k1Zkp.combinePublicKeys(self.getParticipants().map(function(participant) {
							
								// Return participant's public blind excess
								return participant.getPublicBlindExcess();
							}));
							
							// Check if getting public blind excess sum failed
							if(publicBlindExcessSum === Secp256k1Zkp.OPERATION_FAILED) {
							
								// Restore sender participant's old partial signature
								senderParticipant.setPartialSignature(oldPartialSignature);
							
								// Reject error
								reject("Getting public blind excess sum failed.");
							}
							
							// Otherwise
							else {
							
								// Get final signature from adding partial signatures and inclusing the public nonce sum
								var finalSignature = Secp256k1Zkp.addSingleSignerSignatures(partialSignatures, publicNonceSum);
								
								// Check if getting final signature failed
								if(finalSignature === Secp256k1Zkp.OPERATION_FAILED) {
								
									// Restore sender participant's old partial signature
									senderParticipant.setPartialSignature(oldPartialSignature);
								
									// Reject error
									reject("Getting final signature failed.");
								}
								
								// Otherwise
								else {
								
									// Try
									try {
									
										// Get message to sign
										var messageToSign = SlateKernel.signatureMessage(self.getKernelFeatures(), self.getFee(), self.getLockHeight(), self.getRelativeHeight());
									}
									
									// Catch errors
									catch(error) {
									
										// Restore sender participant's old partial signature
										senderParticipant.setPartialSignature(oldPartialSignature);
									
										// Reject error
										reject("Getting message to sign failed.");
										
										// Return
										return;
									}
									
									// Check if final signature doesn't verify the slate
									if(Secp256k1Zkp.verifySingleSignerSignature(finalSignature, messageToSign, Secp256k1Zkp.NO_PUBLIC_NONCE, publicBlindExcessSum, publicBlindExcessSum, false) !== true) {
									
										// Restore sender participant's old partial signature
										senderParticipant.setPartialSignature(oldPartialSignature);
									
										// Reject error
										reject("Verifying final signature failed.");
									}
									
									// Otherwise check if only one kernel doesn't exist
									else if(self.getKernels()["length"] !== 1) {
									
										// Restore sender participant's old partial signature
										senderParticipant.setPartialSignature(oldPartialSignature);
									
										// Reject error
										reject("Only one kernel doesn't exist.");
									}
									
									// Otherwise check if kernel is already complete
									else if(self.getKernels()[0].isComplete() === true) {
									
										// Restore sender participant's old partial signature
										senderParticipant.setPartialSignature(oldPartialSignature);
									
										// Reject error
										reject("Kernel is already complete.");
									}
										
									// Otherwise
									else {
									
										// Save kernel's excess
										var oldExcess = self.getKernels()[0].getExcess();
									
										// Set kernel's excess
										self.getKernels()[0].setExcess(self.getExcess());
										
										// Save kernel's excess signature
										var oldExcessSignature = self.getKernels()[0].getExcessSignature();
										
										// Check if setting kernel's excess signature failed
										if(self.getKernels()[0].setExcessSignature(finalSignature) === false) {
										
											// Restore kernel's old excess and excess signature
											self.getKernels()[0].setExcess(oldExcess);
											self.getKernels()[0].setExcessSignature(oldExcessSignature);
										
											// Restore sender participant's old partial signature
											senderParticipant.setPartialSignature(oldPartialSignature);
										
											// Reject error
											reject("Setting kernel's excess signature failed.");
										}
										
										// Otherwise
										else {
										
											// Check if verify asynchronous
											if(verifyAsynchronous === true) {
											
												// Return verifying after finalize asynchronous
												return Slate.verifyAfterFinalizeAsynchronous(self, baseFee, isMainnet).then(function() {
												
													// Resolve
													resolve();
												
												// Catch errors
												}).catch(function(error) {
												
													// Restore kernel's old excess and excess signature
													self.getKernels()[0].setExcess(oldExcess);
													self.getKernels()[0].setExcessSignature(oldExcessSignature);
												
													// Restore sender participant's old partial signature
													senderParticipant.setPartialSignature(oldPartialSignature);
												
													// Reject error
													reject("Verifying after finalize failed.");
												});
											}
											
											// Otherwise
											else {
										
												// Check if verifying after finalize failed
												if(self.verifyAfterFinalize(baseFee, isMainnet) === false) {
												
													// Restore kernel's old excess and excess signature
													self.getKernels()[0].setExcess(oldExcess);
													self.getKernels()[0].setExcessSignature(oldExcessSignature);
												
													// Restore sender participant's old partial signature
													senderParticipant.setPartialSignature(oldPartialSignature);
												
													// Reject error
													reject("Verifying after finalize failed.");
												}
												
												// Otherwise
												else {
												
													// Resolve
													resolve();
												}
											}
										}
									}
								}
							}
						}
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Get offset excess
		getOffsetExcess() {
		
			// Check if performing Pedersen commit with the offset and zero failed
			var offsetExcess = Secp256k1Zkp.pedersenCommit(this.getOffset(), (new BigNumber(0)).toFixed());
			
			if(offsetExcess === Secp256k1Zkp.OPERATION_FAILED) {
			
				// Throw error
				throw "Performing Pedersen commit with the offset and zero failed.";
			}
			
			// Return offset excess
			return offsetExcess;
		}
		
		// Get excess
		getExcess(publicBlindExcess = Slate.NO_PUBLIC_BLIND_EXCESS) {
		
			// Check if compact
			if(this.isCompact() === true) {
			
				// Get participants public blind excesses
				var publicBlindExcesses = this.getParticipants().map(function(participant) {
				
					// Return participant's public blind excess
					return participant.getPublicBlindExcess();
				});
				
				// Check if a public blind excess is provided
				if(publicBlindExcess !== Slate.NO_PUBLIC_BLIND_EXCESS) {
				
					// Append public blind excess to list
					publicBlindExcesses.push(publicBlindExcess);
				}
				
				// Get public blind excess sum from combining participant's public blind excesses
				var publicBlindExcessSum = Secp256k1Zkp.combinePublicKeys(publicBlindExcesses);
				
				// Check if getting public blind excess sum failed
				if(publicBlindExcessSum === Secp256k1Zkp.OPERATION_FAILED) {
				
					// Throw error
					throw "Getting public blind excess sum failed.";
				}
				
				// Check if getting excess from public blind excess sum failed
				var excess = Secp256k1Zkp.publicKeyToPedersenCommit(publicBlindExcessSum);
				
				if(excess === Secp256k1Zkp.OPERATION_FAILED) {
				
					// Throw error
					throw "Getting excess from public blind excess sum failed.";
				}
				
				// Return excess
				return excess;
			}
			
			// Otherwise
			else {
		
				// Try
				try {
				
					// Get offset excess
					var offsetExcess = this.getOffsetExcess();
				}
				
				// Catch errors
				catch(error) {
				
					// Throw error
					throw error;
				}
				
				// Check if getting transaction excess from commits sum failed
				var transactionExcess = this.getCommitsSum();
				
				if(transactionExcess === false) {
				
					// Throw error
					throw "Getting transaction excess from commits sum failed.";
				}
				
				// Check if getting excess from transaction excess and offset excess failed
				var excess = Secp256k1Zkp.pedersenCommitSum([
				
					// Transaction excess
					transactionExcess
					
				], [
				
					// Offset excess
					offsetExcess
				]);
				
				if(excess === Secp256k1Zkp.OPERATION_FAILED) {
				
					// Throw error
					throw "Getting excess from transaction excess and offset excess failed.";
				}
				
				// Return excess
				return excess;
			}
		}
		
		// Is equal to
		isEqualTo(slate) {
		
			// Check if ID aren't equal
			if(Common.arraysAreEqual(this.getId().getData(), slate.getId().getData()) === false)
			
				// Return false
				return false;
			
			// Check if amounts aren't equal
			if(this.getAmount().isEqualTo(slate.getAmount()) === false)
			
				// Return false
				return false;
			
			// Check if fees aren't equal
			if(this.getFee().isEqualTo(slate.getFee()) === false)
			
				// Return false
				return false;
			
			// Check if lock heights aren't equal
			if(this.getLockHeight().isEqualTo(slate.getLockHeight()) === false)
			
				// Return false
				return false;
			
			// Check if relative heights aren't equal
			if((this.getRelativeHeight() === Slate.NO_RELATIVE_HEIGHT && slate.getRelativeHeight() !== Slate.NO_RELATIVE_HEIGHT) || (this.getRelativeHeight() !== Slate.NO_RELATIVE_HEIGHT && slate.getRelativeHeight() === Slate.NO_RELATIVE_HEIGHT) || (this.getRelativeHeight() !== Slate.NO_RELATIVE_HEIGHT && this.getRelativeHeight().isEqualTo(slate.getRelativeHeight()) === false))
			
				// Return false
				return false;
			
			// Check if heights aren't equal
			if((this.getHeight() === Slate.UNKNOWN_HEIGHT && slate.getHeight() !== Slate.UNKNOWN_HEIGHT) || (this.getHeight() !== Slate.UNKNOWN_HEIGHT && slate.getHeight() === Slate.UNKNOWN_HEIGHT) || (this.getHeight() !== Slate.UNKNOWN_HEIGHT && this.getHeight().isEqualTo(slate.getHeight()) === false))
			
				// Return false
				return false;
			
			// Check if time to live cutoff heights aren't equal
			if((this.getTimeToLiveCutOffHeight() === Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT && slate.getTimeToLiveCutOffHeight() !== Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT) || (this.getTimeToLiveCutOffHeight() !== Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT && slate.getTimeToLiveCutOffHeight() === Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT) || (this.getTimeToLiveCutOffHeight() !== Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT && this.getTimeToLiveCutOffHeight().isEqualTo(slate.getTimeToLiveCutOffHeight()) === false))
			
				// Return false
				return false;
			
			// Check if number of participants aren't equal
			if(this.getNumberOfParticipants().isEqualTo(slate.getNumberOfParticipants()) === false)
			
				// Return false
				return false;
			
			// Check if not compact
			if(this.isCompact() === false) {
			
				// Check if offsets aren't equal
				if(Common.arraysAreEqual(this.getOffset(), slate.getOffset()) === false)
				
					// Return false
					return false;
			}
			
			// Otherwise
			else {
			
				// Check if offsets are equal
				if(Common.arraysAreEqual(this.getOffset(), slate.getOffset()) === true)
				
					// Return false
					return false;
			}
			
			// Check if block header versions aren't equal
			if(this.getBlockHeaderVersion().isEqualTo(slate.getBlockHeaderVersion()) === false)
			
				// Return false
				return false;
			
			// Check if original versions aren't equal
			if((this.getOriginalVersion() instanceof BigNumber === true && (slate.getOriginalVersion() instanceof BigNumber === false || this.getOriginalVersion().isEqualTo(slate.getOriginalVersion()) === false)) || (typeof this.getOriginalVersion() === "string" && (typeof slate.getOriginalVersion() !== "string" || this.getOriginalVersion() !== slate.getOriginalVersion()))) {
			
				// Check if orignal version difference isn't allowed
				if(this.getOriginalVersion() instanceof BigNumber === false || slate.getOriginalVersion() instanceof BigNumber === false || this.getOriginalVersion().isEqualTo(Slate.VERSION_TWO) === false || slate.getOriginalVersion().isEqualTo(Slate.VERSION_THREE) === false) {
				
					// Return false
					return false;
				}
			}
			
			// Check if versions aren't compatible
			if((this.getVersion() instanceof BigNumber === true && (slate.getVersion() instanceof BigNumber === false || this.getVersion().isLessThan(slate.getVersion()) === true)) || (typeof this.getVersion() === "string" && (typeof slate.getVersion() !== "string" || this.getVersion() !== slate.getVersion())))
			
				// Return false
				return false;
			
			// Check if receiver addresses aren't equal
			if(this.getReceiverAddress() !== slate.getReceiverAddress())
			
				// Return false
				return false;
			
			// Check if sender addresses aren't equal
			if(this.getSenderAddress() !== slate.getSenderAddress())
			
				// Return false
				return false;
			
			// Check if number of inputs changed
			if(this.getInputs()["length"] !== slate.getInputs()["length"])
			
				// Return false
				return false;
			
			// Go through all inputs
			for(var i = 0; i < this.getInputs()["length"]; ++i) {
			
				// Check if inputs aren't equal
				if(this.getInputs()[i].isEqualTo(slate.getInputs()[i]) === false)
				
					// Return false
					return false;
			}
			
			// Check if number of kernels changed
			if(this.getKernels()["length"] !== slate.getKernels()["length"])
			
				// Return false
				return false;
			
			// Go through all kernels
			for(var i = 0; i < this.getKernels()["length"]; ++i) {
			
				// Check if kernels aren't equal
				if(this.getKernels()[i].isEqualTo(slate.getKernels()[i]) === false)
				
					// Return false
					return false;
			}
			
			// Go through all outputs
			for(var i = 0; i < this.getOutputs()["length"]; ++i) {
			
				// Set output found to false
				var outputFound = false;
			
				// Go through all slate's outputs
				for(var j = 0; j < slate.getOutputs()["length"]; ++j) {
			
					// Check if outputs are equal
					if(this.getOutputs()[i].isEqualTo(slate.getOutputs()[j]) === true) {
					
						// Set output found
						outputFound = true;
						
						// Break
						break;
					}
				}
				
				// Check if output wasn't found
				if(outputFound === false)
				
					// Return falswe
					return false;
			}
			
			// Go through all participants
			for(var i = 0; i < this.getParticipants()["length"]; ++i) {
			
				// Set participant found to false
				var participantFound = false;
			
				// Go through all slate's participants
				for(var j = 0; j < slate.getParticipants()["length"]; ++j) {
			
					// Check if participants are equal
					if(this.getParticipants()[i].isEqualTo(slate.getParticipants()[j]) === true) {
					
						// Set participant found
						participantFound = true;
						
						// Break
						break;
					}
				}
				
				// Check if participant wasn't found
				if(participantFound === false)
				
					// Return falswe
					return false;
			}
			
			// Return true
			return true;
		}
		
		// Is compact
		isCompact() {
		
			// Return if version is Slatepack version or version four
			return this.getVersion() === Slate.VERSION_SLATEPACK || (this.getVersion() instanceof BigNumber === true && this.getVersion().isGreaterThanOrEqualTo(Slate.VERSION_FOUR) === true);
		}
		
		// Get display kernel features
		getDisplayKernelFeatures() {
		
			// Check kernel features
			switch(this.getKernelFeatures()) {
			
				// Plain features
				case SlateKernel.PLAIN_FEATURES:
				
					// Return display kernel features
					return Language.getDefaultTranslation('plain');
				
				// Coinbase features
				case SlateKernel.COINBASE_FEATURES:
				
					// Return display kernel features
					return Language.getDefaultTranslation('coinbase');
				
				// Height locked features
				case SlateKernel.HEIGHT_LOCKED_FEATURES:
				
					// Return display kernel features
					return Language.getDefaultTranslation('height locked');
				
				// No recent duplicate features
				case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
				
					// Return display kernel features
					return Language.getDefaultTranslation('no recent duplicate');
			}
		}
		
		// Get payment proof message
		static getPaymentProofMessage(amount, commit, senderAddress) {
		
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// MWC wallet
				case Consensus.MWC_WALLET_TYPE:
				
					// Return creating message from commit, sender address, and amount
					return (new TextEncoder()).encode(Common.toHexString(commit) + senderAddress + amount.toFixed());
				
				// GRIN wallet
				case Consensus.GRIN_WALLET_TYPE:
		
					// Return creating message from amount, commit, and sender address
					return Common.mergeArrays([
					
						// Amount
						amount.toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// Commit
						commit,
						
						// Sender address
						Slatepack.slatepackAddressToPublicKey(senderAddress)
					]);
				
				// EPIC wallet
				case Consensus.EPIC_WALLET_TYPE:
		
					// Return creating message from amount, commit, and sender address
					return Common.mergeArrays([
					
						// Amount
						amount.toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// Commit
						commit,
						
						// Sender address
						Tor.torAddressToPublicKey(senderAddress)
					]);
			}
		}
		
		// Supported versions
		static get SUPPORTED_VERSIONS() {
		
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// MWC wallet
				case Consensus.MWC_WALLET_TYPE:
		
					// Return supported versions
					return [
					
						// Version Slatepack
						Slate.VERSION_SLATEPACK,
						
						// Version three B
						"V" + Slate.VERSION_THREE.toFixed() + "B",
						
						// Version three
						"V" + Slate.VERSION_THREE.toFixed(),
											
						// Version two
						"V" + Slate.VERSION_TWO.toFixed()
					];
				
				// GRIN wallet
				case Consensus.GRIN_WALLET_TYPE:
		
					// Return supported versions
					return [
					
						// Version four
						"V" + Slate.VERSION_FOUR.toFixed()
					];
				
				// EPIC wallet
				case Consensus.EPIC_WALLET_TYPE:
		
					// Return supported versions
					return [
					
						// Version three
						"V" + Slate.VERSION_THREE.toFixed(),
											
						// Version two
						"V" + Slate.VERSION_TWO.toFixed()
					];
			}
		}
		
		// Get required fee
		static getRequiredFee(numberOfInputs, numberOfOutputs, numberOfKernels, baseFee) {
		
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// MWC or EPIC wallet
				case Consensus.MWC_WALLET_TYPE:
				case Consensus.EPIC_WALLET_TYPE:
				
					// Get body weight from the number of inputs, outputs, and kernels
					var bodyWeight = new BigNumber(numberOfOutputs).multipliedBy(Slate.BODY_WEIGHT_OUTPUT_FACTOR).plus(Math.max(numberOfKernels, 1)).minus(numberOfInputs);
					
					// Check if body weight is less than the minimum body weight
					if(bodyWeight.isLessThan(Slate.MINIMUM_BODY_WEIGHT) === true)
					
						// Set body weight to the minimum body weight
						bodyWeight = new BigNumber(Slate.MINIMUM_BODY_WEIGHT);
					
					// Break
					break;
				
				// GRIN wallet
				case Consensus.GRIN_WALLET_TYPE:
				
					// Get body weight from the number of inputs, outputs, and kernels
					var bodyWeight = Slate.getWeight(numberOfInputs, numberOfOutputs, numberOfKernels);
				
					// Break
					break;
			}
			
			// Get transaction fee from body weight and the base fee
			var transactionFee = bodyWeight.multipliedBy(baseFee);
			
			// Return transaction fee
			return transactionFee;
		}
		
		// Uncompact uint64
		static uncompactUint64(bitReader, hasHundreds) {
		
			// Check if has hundreds
			if(hasHundreds === true) {
		
				// Get number of hundreds
				var numberOfhundreds = bitReader.getBits(Slate.COMPACT_NUMBER_OF_HUNDREDS_LENGTH);
			}
			
			// Get number of digits
			var numberOfDigits = bitReader.getBits(Slate.COMPACT_NUMBER_OF_DIGITS_LENGTH) + 1;
			
			// Initialize digit bytes
			var digitBytes = new Uint8Array(1 + Math.floor((numberOfDigits - 1) / Common.BITS_IN_A_BYTE));
			
			// Go through all digits
			for(var i = 0, j = numberOfDigits; j > 0; ++i, j -= Common.BITS_IN_A_BYTE) {
			
				// Get digit byte
				digitBytes[i] = bitReader.getBits(Math.min(j, Common.BITS_IN_A_BYTE));
			}
			
			// Check if number of digits isn't an exact number of bytes
			if(numberOfDigits > Common.BITS_IN_A_BYTE && numberOfDigits % Common.BITS_IN_A_BYTE !== 0) {
			
				// Go through all digit bytes backwards
				for(var i = digitBytes["length"] - 1; i >= 0; --i) {
				
					// Check if byte isn't the last byte
					if(i !== digitBytes["length"] - 1) {
					
						// Shift bits in the byte right
						digitBytes[i] >>>= Common.BITS_IN_A_BYTE - numberOfDigits % Common.BITS_IN_A_BYTE;
					}
					
					// Check if byte isn't the first byte
					if(i !== 0) {
					
						// Update byte with shifted bits from the next byte
						digitBytes[i] |= digitBytes[i - 1] << (numberOfDigits % Common.BITS_IN_A_BYTE);
					}
				}
			}
			
			// Get result of digit bytes
			var result = new BigNumber(Common.HEX_PREFIX + Common.toHexString(digitBytes));
			
			// Check if has hundreds
			if(hasHundreds === true) {
			
				// Go through all hundreds
				for(var i = 0; i < numberOfhundreds; ++i) {
				
					// Update result
					result = result.multipliedBy(Slate.COMPACT_HUNDREDS_SCALING_FACTOR);
				}
			}
			
			// Return result
			return result;
		}
		
		// Compact uint64
		static compactUint64(value, hasHundreds, bitWriter) {
		
			// Check if has hundreds
			if(hasHundreds === true) {
			
				// Initialize number of hundreds
				var numberOfhundreds = 0;
				
				// Go through all hundreds in the value
				while(value.modulo(Slate.COMPACT_HUNDREDS_SCALING_FACTOR).isZero() === true && numberOfhundreds < Math.pow(2, Slate.COMPACT_NUMBER_OF_HUNDREDS_LENGTH) - 1) {
				
					// Remove hundred from the value
					value = value.dividedToIntegerBy(Slate.COMPACT_HUNDREDS_SCALING_FACTOR);
					
					// Increment number of hundreds
					++numberOfhundreds;
				}
			}
			
			// Initialize number of digits
			var numberOfDigits = 1;
			
			// Go through all digits in the value
			for(var i = new BigNumber(1); numberOfDigits < Math.pow(2, Slate.COMPACT_NUMBER_OF_DIGITS_LENGTH) && i.isLessThan(value) === true; i = i.multipliedBy(2)) {
			
				// Increment number of digits
				++numberOfDigits;
			}
			
			// Check if has hundreds
			if(hasHundreds === true) {
			
				// Write number of hundreds
				bitWriter.setBits(numberOfhundreds, Slate.COMPACT_NUMBER_OF_HUNDREDS_LENGTH);
			}
			
			// Write number of digits
			bitWriter.setBits(numberOfDigits - 1, Slate.COMPACT_NUMBER_OF_DIGITS_LENGTH);
			
			// Write value
			var bytes = value.toBytes(BigNumber.BIG_ENDIAN, Math.ceil(numberOfDigits / Common.BITS_IN_A_BYTE));
			
			// Go through all bytes
			for(var i = 0; i < bytes["length"]; ++i) {
			
				// Check if there isn't an exact number of bytes
				if(numberOfDigits % Common.BITS_IN_A_BYTE !== 0) {
				
					// Check if not the last byte
					if(i !== bytes["length"] - 1) {
					
						// Remove upper bits
						bytes[i] <<= Common.BITS_IN_A_BYTE - numberOfDigits % Common.BITS_IN_A_BYTE;
					
						// Include lower bits from next byte
						bytes[i] |= bytes[i + 1] >>> (numberOfDigits % Common.BITS_IN_A_BYTE);
						
						// Write byte
						bitWriter.setBits(bytes[i], Common.BITS_IN_A_BYTE);
					}
					
					// Otherwise
					else {
					
						// Write byte
						bitWriter.setBits(bytes[i], numberOfDigits % Common.BITS_IN_A_BYTE);
					}
				}
				
				// Otherwise
				else {
				
					// Write byte
					bitWriter.setBits(bytes[i], Common.BITS_IN_A_BYTE);
				}
			}
		}
		
		// Uncompact public key
		static uncompactPublicKey(bitReader) {
		
			// Get number of bytes
			var numberOfBytes = bitReader.getBits(Slate.COMPACT_PUBLIC_KEY_LENGTH_LENGTH);
			
			// Return public key
			return bitReader.getBytes(numberOfBytes);
		}
		
		// Compact public key
		static compactPublicKey(publicKey, bitWriter) {
		
			// Check if public key is too long
			if(publicKey["length"] >= Math.pow(2, Slate.COMPACT_PUBLIC_KEY_LENGTH_LENGTH)) {
			
				// Throw error
				throw "Public key is too long.";
			}
		
			// Write number of bytes
			bitWriter.setBits(publicKey["length"], Slate.COMPACT_PUBLIC_KEY_LENGTH_LENGTH);
			
			// Write public key
			bitWriter.setBytes(publicKey);
		}
		
		// Parse slate asynchronous
		static parseSlateAsynchronous(serializedSlate, isMainnet, purpose, initialSendSlate) {
		
			// Check if serialized slate is binary
			if(serializedSlate instanceof Uint8Array === true) {
		
				// Get serialized slate data
				var serializedSlateData = serializedSlate.slice()["buffer"];
			}
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Return sending parse slate request
				return Slate.sendRequest([
				
					// Type
					Slate.PARSE_SLATE_REQUEST_TYPE,
					
					// Serialized slate
					(serializedSlate instanceof Uint8Array === true) ? serializedSlateData : Common.serializeObject(serializedSlate),
					
					// Is mainnet
					isMainnet,
					
					// Purpose
					purpose,
					
					// Initial send slate
					Common.serializeObject(initialSendSlate)
				
				], (serializedSlate instanceof Uint8Array === true) ? [
				
					// Serialized slate data
					serializedSlateData
				
				] : []).then(function(response) {
				
					// Check if response is valid
					if(response !== Slate.STATUS_FAILED_VALUE) {
					
						// Resolve response
						resolve(Common.unserializeObject(response));
					}
					
					// Otherwise
					else {
					
						// Reject
						reject();
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Add outputs asynchronous
		static addOutputsAsynchronous(slate, outputs, updateKernel = true) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Return sending add outputs request
				return Slate.sendRequest([
				
					// Type
					Slate.ADD_OUTPUTS_REQUEST_TYPE,
					
					// Slate
					Common.serializeObject(slate),
					
					// Outputs
					Common.serializeObject(outputs),
					
					// Update kernel
					updateKernel
				
				]).then(function(response) {
				
					// Check if response is valid
					if(response !== Slate.STATUS_FAILED_VALUE) {
					
						// Resolve response
						resolve(Common.unserializeObject(response));
					}
					
					// Otherwise
					else {
					
						// Reject
						reject();
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Add inputs asynchronous
		static addInputsAsynchronous(slate, inputs, updateKernel = true, expectedNumberOfOutputs = 0) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Return sending add inputs request
				return Slate.sendRequest([
				
					// Type
					Slate.ADD_INPUTS_REQUEST_TYPE,
					
					// Slate
					Common.serializeObject(slate),
					
					// Inputs
					Common.serializeObject(inputs),
					
					// Update kernel
					updateKernel,
					
					// Expected number of outputs
					expectedNumberOfOutputs
				
				]).then(function(response) {
				
					// Check if response is valid
					if(response !== Slate.STATUS_FAILED_VALUE) {
					
						// Resolve response
						resolve(Common.unserializeObject(response));
					}
					
					// Otherwise
					else {
					
						// Reject
						reject();
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Verify after finalize asynchronous
		static verifyAfterFinalizeAsynchronous(slate, baseFee, isMainnet) {
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Return sending verify after finalize request
				return Slate.sendRequest([
				
					// Type
					Slate.VERIFY_AFTER_FINALIZE_REQUEST_TYPE,
					
					// Slate
					Common.serializeObject(slate),
					
					// Base fee
					Common.serializeObject(baseFee),
					
					// Is mainnet
					isMainnet
				
				]).then(function(response) {
				
					// Check if response is valid
					if(response !== Slate.STATUS_FAILED_VALUE) {
					
						// Resolve
						resolve();
					}
					
					// Otherwise
					else {
					
						// Reject
						reject();
					}
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// No time to live cut off height
		static get NO_TIME_TO_LIVE_CUT_OFF_HEIGHT() {
		
			// Return no time to live cut off height
			return null;
		}
		
		// No payment proof
		static get NO_PAYMENT_PROOF() {
		
			// Return payment proof
			return null;
		}
		
		// Newest version
		static get NEWEST_VERSION() {
		
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// MWC wallet
				case Consensus.MWC_WALLET_TYPE:
		
					// Return newest version
					return Slate.VERSION_SLATEPACK;
				
				// GRIN wallet
				case Consensus.GRIN_WALLET_TYPE:
				
					// Return newest version
					return Slate.VERSION_FOUR;
				
				// EPIC wallet
				case Consensus.EPIC_WALLET_TYPE:
				
					// Return newest version
					return Slate.VERSION_THREE;
			}
		}
		
		// No secret nonce
		static get NO_SECRET_NONCE() {
		
			// Return no secret nonce
			return null;
		}
		
		// Unknown height
		static get UNKNOWN_HEIGHT() {
		
			// Return unknown height
			return null;
		}
		
		// Minimum fee
		static get MINIMUM_FEE() {
		
			// Return minimum fee
			return 1;
		}
		
		// Maximum fee
		static get MAXIMUM_FEE() {
		
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// EPIC wallet
				case Consensus.EPIC_WALLET_TYPE:
		
					// Return maximum fee
					return Number.POSITIVE_INFINITY;
				
				// MWC or GRIN wallet
				case Consensus.MWC_WALLET_TYPE:
				case Consensus.GRIN_WALLET_TYPE:
				
					// Return maximum fee
					return Math.pow(2, 40) - 1;
			}
		}
		
		// Initialize request type
		static get INITIALIZE_REQUEST_TYPE() {
		
			// Return initialize request type
			return 0;
		}
		
		// Uninitialize request type
		static get UNINITIALIZE_REQUEST_TYPE() {
		
			// Return uninitialize request type
			return Slate.INITIALIZE_REQUEST_TYPE + 1;
		}
		
		// Parse slate request type
		static get PARSE_SLATE_REQUEST_TYPE() {
		
			// Return parse slate request type
			return Slate.UNINITIALIZE_REQUEST_TYPE + 1;
		}
		
		// Add outputs request type
		static get ADD_OUTPUTS_REQUEST_TYPE() {
		
			// Return add outputs request type
			return Slate.PARSE_SLATE_REQUEST_TYPE + 1;
		}
		
		// Add inputs request type
		static get ADD_INPUTS_REQUEST_TYPE() {
		
			// Return add inputs request type
			return Slate.ADD_OUTPUTS_REQUEST_TYPE + 1;
		}
		
		// Verify after finalize request type
		static get VERIFY_AFTER_FINALIZE_REQUEST_TYPE() {
		
			// Return verify after finalize request type
			return Slate.ADD_INPUTS_REQUEST_TYPE + 1;
		}
		
		// Message request index offset
		static get MESSAGE_REQUEST_INDEX_OFFSET() {
		
			// Return message request index offset
			return 0;
		}
		
		// Message type offset
		static get MESSAGE_TYPE_OFFSET() {
		
			// Return message type offset
			return Slate.MESSAGE_REQUEST_INDEX_OFFSET + 1;
		}
		
		// Message initialize URL query string offset
		static get MESSAGE_INITIALIZE_URL_QUERY_STRING_OFFSET() {
		
			// Return message initialize URL query string offset
			return Slate.MESSAGE_TYPE_OFFSET + 1;
		}
		
		// Message parse slate serialized slate offset
		static get MESSAGE_PARSE_SLATE_SERIALIZED_SLATE_OFFSET() {
		
			// Return message parse slate serialized slate offset
			return Slate.MESSAGE_TYPE_OFFSET + 1;
		}
		
		// Message parse slate is mainnet offset
		static get MESSAGE_PARSE_SLATE_IS_MAINNET_OFFSET() {
		
			// Return message parse slate is mainnet offset
			return Slate.MESSAGE_PARSE_SLATE_SERIALIZED_SLATE_OFFSET + 1;
		}
		
		// Message parse slate purpose offset
		static get MESSAGE_PARSE_SLATE_PURPOSE_OFFSET() {
		
			// Return message parse slate purpose offset
			return Slate.MESSAGE_PARSE_SLATE_IS_MAINNET_OFFSET + 1;
		}
		
		// Message parse slate initial send slate offset
		static get MESSAGE_PARSE_SLATE_INITIAL_SEND_SLATE_OFFSET() {
		
			// Return message parse slate initial send slate offset
			return Slate.MESSAGE_PARSE_SLATE_PURPOSE_OFFSET + 1;
		}
		
		// Message add outputs slate offset
		static get MESSAGE_ADD_OUTPUTS_SLATE_OFFSET() {
		
			// Return message add outputs slate offset
			return Slate.MESSAGE_TYPE_OFFSET + 1;
		}
		
		// Message add outputs outputs offset
		static get MESSAGE_ADD_OUTPUTS_OUTPUTS_OFFSET() {
		
			// Return message add outputs outputs offset
			return Slate.MESSAGE_ADD_OUTPUTS_SLATE_OFFSET + 1;
		}
		
		// Message add outputs update kernel offset
		static get MESSAGE_ADD_OUTPUTS_UPDATE_KERNEL_OFFSET() {
		
			// Return message add outputs update kernel offset
			return Slate.MESSAGE_ADD_OUTPUTS_OUTPUTS_OFFSET + 1;
		}
		
		// Message add inputs slate offset
		static get MESSAGE_ADD_INPUTS_SLATE_OFFSET() {
		
			// Return message add inputs slate offset
			return Slate.MESSAGE_TYPE_OFFSET + 1;
		}
		
		// Message add inputs inputs offset
		static get MESSAGE_ADD_INPUTS_INPUTS_OFFSET() {
		
			// Return message add inputs inputs offset
			return Slate.MESSAGE_ADD_INPUTS_SLATE_OFFSET + 1;
		}
		
		// Message add inputs update kernel offset
		static get MESSAGE_ADD_INPUTS_UPDATE_KERNEL_OFFSET() {
		
			// Return message add inputs update kernel offset
			return Slate.MESSAGE_ADD_INPUTS_INPUTS_OFFSET + 1;
		}
		
		// Message add inputs expected number of outputs offset
		static get MESSAGE_ADD_INPUTS_EXPECTED_NUMBER_OF_OUTPUTS_OFFSET() {
		
			// Return message add inputs expected number of outputs offset
			return Slate.MESSAGE_ADD_INPUTS_UPDATE_KERNEL_OFFSET + 1;
		}
		
		// Message verify after finalize slate offset
		static get MESSAGE_VERIFY_AFTER_FINALIZE_SLATE_OFFSET() {
		
			// Return message verify after finalize slate offset
			return Slate.MESSAGE_TYPE_OFFSET + 1;
		}
		
		// Message verify after finalize base fee offset
		static get MESSAGE_VERIFY_AFTER_FINALIZE_BASE_FEE_OFFSET() {
		
			// Return message verify after finalize base fee offset
			return Slate.MESSAGE_VERIFY_AFTER_FINALIZE_SLATE_OFFSET + 1;
		}
		
		// Message verify after finalize is mainnet offset
		static get MESSAGE_VERIFY_AFTER_FINALIZE_IS_MAINNET_OFFSET() {
		
			// Return message verify after finalize is mainnet offset
			return Slate.MESSAGE_VERIFY_AFTER_FINALIZE_BASE_FEE_OFFSET + 1;
		}
		
		// Status success value
		static get STATUS_SUCCESS_VALUE() {
		
			// Return status success value
			return true;
		}
		
		// Status failed value
		static get STATUS_FAILED_VALUE() {
		
			// Return status failed value
			return false;
		}
	
	// Private
	
		// Reset
		reset() {
		
			// Set version to newest version
			this.version = Slate.NEWEST_VERSION;
			
			// Set original version to version
			this.originalVersion = this.getVersion();
			
			// Set block header version to the first header version
			this.blockHeaderVersion = Consensus.LEGACY_HEADER_VERSION;
		
			// Set number of participants to the default number of participants
			this.numberOfParticipants = Slate.DEFAULT_NUMBER_OF_PARTICIPANTS;
			
			// Set offset to zero offset
			this.offset = Slate.ZERO_OFFSET;
			
			// Set inputs to nothing
			this.inputs = [];
			
			// Set outputs to nothing
			this.outputs = [];
			
			// Set kernels to nothing
			this.kernels = [];
			
			// Set amount to minimum amount
			this.amount = new BigNumber(Slate.MINIMUM_AMOUNT);
			
			// Set fee to minimum fee
			this.fee = new BigNumber(Slate.MINIMUM_FEE);
			
			// Set height to unknown height
			this.height = Slate.UNKNOWN_HEIGHT;
			
			// Set lock height to no lock height
			this.lockHeight = Slate.NO_LOCK_HEIGHT;
			
			// Set relative height to no relative height
			this.relativeHeight = Slate.NO_RELATIVE_HEIGHT;
			
			// Set time to live cutoff height to no time to live cut off height
			this.timeToLiveCutOffHeight = Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT;
			
			// Set participants to nothing
			this.participants = [];
			
			// Set receiver address to no receiver address
			this.receiverAddress = Slate.NO_RECEIVER_ADDRESS;
			
			// Set receiver signature to no receiver signature
			this.receiverSignature = Slate.NO_RECEIVER_SIGNATURE;
			
			// Set sender address to no sender address
			this.senderAddress = Slate.NO_SENDER_ADDRESS;
			
			// Change ID
			this.changeId();
		}
		
		// Unserialize
		unserialize(serializedSlate, isMainnet, purpose, initialSendSlate) {
		
			// Detect slate's version
			var detectedVersion = Slate.detectVersion(serializedSlate, isMainnet);
			
			// Check if version is unknown or not supported
			if(detectedVersion === Slate.UNKNOWN_VERSION || Slate.SUPPORTED_VERSIONS.indexOf((detectedVersion instanceof BigNumber === true) ? "V" + detectedVersion.toFixed() : detectedVersion) === Common.INDEX_NOT_FOUND) {
			
				// Throw error
				throw "Unsupported slate.";
			}
			
			// Check slate's version
			switch((detectedVersion instanceof BigNumber === true) ? detectedVersion.toFixed() : detectedVersion) {
			
				// Version two and three
				case Slate.VERSION_TWO.toFixed():
				case Slate.VERSION_THREE.toFixed():
				
					// Check if serialized slate's version info isn't supported
					if("version_info" in serializedSlate === false || Object.isObject(serializedSlate["version_info"]) === false) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Check if version info's version isn't supported
					if("version" in serializedSlate["version_info"] === false || (Common.isNumberString(serializedSlate["version_info"]["version"]) === false && serializedSlate["version_info"]["version"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["version_info"]["version"])).isInteger() === false || (new BigNumber(serializedSlate["version_info"]["version"])).isLessThan(Slate.VERSION_ONE) === true) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Set version to serialized slate's version
					this.version = new BigNumber(serializedSlate["version_info"]["version"]);
					
					// Check if serialized slate's number of participants isn't supported
					if("num_participants" in serializedSlate === false || (Common.isNumberString(serializedSlate["num_participants"]) === false && serializedSlate["num_participants"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["num_participants"])).isInteger() === false || (new BigNumber(serializedSlate["num_participants"])).isLessThan(Slate.MINIMUM_NUMBER_OF_PARTICIPANTS) === true) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Set number of participants to serialized slate's number of participants
					this.numberOfParticipants = new BigNumber(serializedSlate["num_participants"]);
					
					// Check if serialized slate's amount isn't supported
					if("amount" in serializedSlate === false || (Common.isNumberString(serializedSlate["amount"]) === false && serializedSlate["amount"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["amount"])).isInteger() === false || (new BigNumber(serializedSlate["amount"])).isLessThan(Slate.MINIMUM_AMOUNT) === true) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Set amount to serialized slate's amount
					this.amount = new BigNumber(serializedSlate["amount"]);
					
					// Check if serialized slate's fee isn't supported
					if("fee" in serializedSlate === false || (Common.isNumberString(serializedSlate["fee"]) === false && serializedSlate["fee"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["fee"])).isInteger() === false || (new BigNumber(serializedSlate["fee"])).isLessThan(Slate.MINIMUM_FEE) === true) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Set fee to serialized slate's fee
					this.fee = new BigNumber(serializedSlate["fee"]);
					
					// Check if serialized slate's height isn't supported
					if("height" in serializedSlate === false || (Common.isNumberString(serializedSlate["height"]) === false && serializedSlate["height"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["height"])).isInteger() === false || (new BigNumber(serializedSlate["height"])).isLessThan(Consensus.FIRST_BLOCK_HEIGHT) === true) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Set height to serialized slate's height
					this.height = new BigNumber(serializedSlate["height"]);
					
					// Check if serialized slate's lock height isn't supported
					if("lock_height" in serializedSlate === false || (Common.isNumberString(serializedSlate["lock_height"]) === false && serializedSlate["lock_height"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["lock_height"])).isInteger() === false || (new BigNumber(serializedSlate["lock_height"])).isLessThan(Slate.NO_LOCK_HEIGHT) === true) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Set lock height to serialized slate's lock height
					this.lockHeight = new BigNumber(serializedSlate["lock_height"]);
					
					// Check if version info's original version isn't supported
					if("orig_version" in serializedSlate["version_info"] === false || (Common.isNumberString(serializedSlate["version_info"]["orig_version"]) === false && serializedSlate["version_info"]["orig_version"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["version_info"]["orig_version"])).isInteger() === false || (new BigNumber(serializedSlate["version_info"]["orig_version"])).isLessThan(Slate.VERSION_ONE) === true) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Set original version to serialized slate's original version
					this.originalVersion = new BigNumber(serializedSlate["version_info"]["orig_version"]);
					
					// Check if version info's block header version isn't supported
					if("block_header_version" in serializedSlate["version_info"] === false || (Common.isNumberString(serializedSlate["version_info"]["block_header_version"]) === false && serializedSlate["version_info"]["block_header_version"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["version_info"]["block_header_version"])).isInteger() === false || Consensus.isValidHeaderVersion(isMainnet, this.getHeight(), new BigNumber(serializedSlate["version_info"]["block_header_version"])) === false) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Set block header version to serialized slate's block header version
					this.blockHeaderVersion = new BigNumber(serializedSlate["version_info"]["block_header_version"]);
					
					// Check if version is at least version three
					if(this.getVersion().isGreaterThanOrEqualTo(Slate.VERSION_THREE) === true) {
					
						// Check if serialized slate's time to live cut off height isn't supported
						if("ttl_cutoff_height" in serializedSlate === false || (serializedSlate["ttl_cutoff_height"] !== null && ((Common.isNumberString(serializedSlate["ttl_cutoff_height"]) === false && serializedSlate["ttl_cutoff_height"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["ttl_cutoff_height"])).isInteger() === false || (new BigNumber(serializedSlate["ttl_cutoff_height"])).isLessThanOrEqualTo(this.getHeight()) === true || (new BigNumber(serializedSlate["ttl_cutoff_height"])).isLessThan(this.getLockHeight()) === true))) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Set time to live cut off height to serialized slate's time to live cut off height
						this.timeToLiveCutOffHeight = (serializedSlate["ttl_cutoff_height"] !== null) ? new BigNumber(serializedSlate["ttl_cutoff_height"]) : Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT;
						
						// Check if serialized slate's payment proof isn't supported
						if("payment_proof" in serializedSlate === false || (serializedSlate["payment_proof"] !== null && Object.isObject(serializedSlate["payment_proof"]) === false)) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Check if payment proof's receiver address isn't supported
						if(serializedSlate["payment_proof"] !== null && ("receiver_address" in serializedSlate["payment_proof"] === false || typeof serializedSlate["payment_proof"]["receiver_address"] !== "string")) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Check if serialized slate provided a payment proof
						if(serializedSlate["payment_proof"] !== null) {
						
							// Check wallet type
							switch(Consensus.getWalletType()) {
							
								// MWC wallet
								case Consensus.MWC_WALLET_TYPE:
						
									// Check receiver address's length
									switch(serializedSlate["payment_proof"]["receiver_address"]["length"]) {
									
										// MQS address length
										case Mqs.ADDRESS_LENGTH:
										
											// Try
											try {
											
												// Get public key from receiver's MQS address
												Mqs.mqsAddressToPublicKey(serializedSlate["payment_proof"]["receiver_address"], isMainnet);
											}
											
											// Catch errors
											catch(error) {
											
												// Throw error
												throw "Unsupported slate.";
											}
											
											// Break
											break;
										
										// Tor address length
										case Tor.ADDRESS_LENGTH:
										
											// Try
											try {
											
												// Get public key from receiver's Tor address
												Tor.torAddressToPublicKey(serializedSlate["payment_proof"]["receiver_address"]);
											}
											
											// Catch errors
											catch(error) {
											
												// Throw error
												throw "Unsupported slate.";
											}
										
											// Break
											break;
										
										// Default
										default:
										
											// Throw error
											throw "Unsupported slate.";
									}
									
									// Set receiver address to serialized slate's receiver address
									this.receiverAddress = serializedSlate["payment_proof"]["receiver_address"];
									
									// Break
									break;
								
								// EPIC wallet
								case Consensus.EPIC_WALLET_TYPE:
						
									// Check if payment proof's receiver address isn't supported
									if(Common.isHexString(serializedSlate["payment_proof"]["receiver_address"]) === false || Common.hexStringLength(serializedSlate["payment_proof"]["receiver_address"]) !== Crypto.ED25519_PUBLIC_KEY_LENGTH) {
									
										// Throw error
										throw "Unsupported slate.";
									}
									
									// Try
									try {
									
										// Set receiver address to the Tor address created from the receiver's public key
										this.receiverAddress = Tor.publicKeyToTorAddress(Common.fromHexString(serializedSlate["payment_proof"]["receiver_address"]));
									}
										
									// Catch errors
									catch(error) {
									
										// Throw error
										throw "Unsupported slate.";
									}
									
									// Break
									break;
							}
						}
						
						// Otherwise
						else {
						
							// Set receiver address to no receiver address
							this.receiverAddress = Slate.NO_RECEIVER_ADDRESS;
						}
						
						// Check if payment proof's receiver signature isn't supported
						if(serializedSlate["payment_proof"] !== null && ("receiver_signature" in serializedSlate["payment_proof"] === false || (serializedSlate["payment_proof"]["receiver_signature"] !== null && Common.isHexString(serializedSlate["payment_proof"]["receiver_signature"]) === false))) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Check if serialized slate provided a payment proof and a serialized signature
						if(serializedSlate["payment_proof"] !== null && serializedSlate["payment_proof"]["receiver_signature"] !== null) {
						
							// Check wallet type
							switch(Consensus.getWalletType()) {
							
								// MWC wallet
								case Consensus.MWC_WALLET_TYPE:
								
									// Check if payment proof's receiver signature isn't supported
									if(Common.hexStringLength(serializedSlate["payment_proof"]["receiver_signature"]) > Crypto.MAXIMUM_MESSAGE_HASH_SIGNATURE_LENGTH && Common.hexStringLength(serializedSlate["payment_proof"]["receiver_signature"]) !== Crypto.ED25519_SIGNATURE_LENGTH) {
									
										// Throw error
										throw "Unsupported slate.";
									}
									
									// Break
									break;
								
								// EPIC wallet
								case Consensus.EPIC_WALLET_TYPE:
								
									// Check if payment proof's receiver signature isn't supported
									if(Common.hexStringLength(serializedSlate["payment_proof"]["receiver_signature"]) !== Crypto.ED25519_SIGNATURE_LENGTH) {
									
										// Throw error
										throw "Unsupported slate.";
									}
									
									// Break
									break;
							}
						}
						
						// Set receiver signature to serialized slate's receiver signature
						this.receiverSignature = (serializedSlate["payment_proof"] !== null && serializedSlate["payment_proof"]["receiver_signature"] !== null) ? Common.fromHexString(serializedSlate["payment_proof"]["receiver_signature"]) : Slate.NO_RECEIVER_SIGNATURE;
						
						// Check if payment proof's sender address isn't supported
						if(serializedSlate["payment_proof"] !== null && ("sender_address" in serializedSlate["payment_proof"] === false || typeof serializedSlate["payment_proof"]["sender_address"] !== "string")) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Check if serialized slate provided a payment proof
						if(serializedSlate["payment_proof"] !== null) {
						
							// Check wallet type
							switch(Consensus.getWalletType()) {
							
								// MWC wallet
								case Consensus.MWC_WALLET_TYPE:
						
									// Check sender address's length
									switch(serializedSlate["payment_proof"]["sender_address"]["length"]) {
									
										// MQS address length
										case Mqs.ADDRESS_LENGTH:
										
											// Try
											try {
											
												// Get public key from sender's MQS address
												Mqs.mqsAddressToPublicKey(serializedSlate["payment_proof"]["sender_address"], isMainnet);
											}
											
											// Catch errors
											catch(error) {
											
												// Throw error
												throw "Unsupported slate.";
											}
											
											// Break
											break;
										
										// Tor address length
										case Tor.ADDRESS_LENGTH:
										
											// Try
											try {
											
												// Get public key from sender's Tor address
												Tor.torAddressToPublicKey(serializedSlate["payment_proof"]["sender_address"]);
											}
											
											// Catch errors
											catch(error) {
											
												// Throw error
												throw "Unsupported slate.";
											}
										
											// Break
											break;
										
										// Default
										default:
										
											// Throw error
											throw "Unsupported slate.";
									}
									
									// Set sender address to serialized slate's sender address
									this.senderAddress = serializedSlate["payment_proof"]["sender_address"];
									
									// Break
									break;
								
								// EPIC wallet
								case Consensus.EPIC_WALLET_TYPE:
						
									// Check if payment proof's sender address isn't supported
									if(Common.isHexString(serializedSlate["payment_proof"]["sender_address"]) === false || Common.hexStringLength(serializedSlate["payment_proof"]["sender_address"]) !== Crypto.ED25519_PUBLIC_KEY_LENGTH) {
									
										// Throw error
										throw "Unsupported slate.";
									}
									
									// Try
									try {
									
										// Set sender address to the Tor address created from the sender's public key
										this.senderAddress = Tor.publicKeyToTorAddress(Common.fromHexString(serializedSlate["payment_proof"]["sender_address"]));
									}
										
									// Catch errors
									catch(error) {
									
										// Throw error
										throw "Unsupported slate.";
									}
									
									// Break
									break;
							}
						}
						
						// Otherwise
						else {
						
							// Set sender address to no sender address
							this.senderAddress = Slate.NO_SENDER_ADDRESS;
						}
					}
					
					// Check if serialized slate's ID isn't supported
					if("id" in serializedSlate === false || typeof serializedSlate["id"] !== "string") {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Try
					try {
					
						// Set ID to serialized slate's ID
						this.id = new Uuid(serializedSlate["id"]);
					
						// Check if ID isn't a random UUID
						if(this.getId().isRandom() === false) {
						
							// Throw error
							throw "Unsupported slate.";
						}
					}
					
					// Catch errors
					catch(error) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Check if serialized slate's transaction isn't supported
					if("tx" in serializedSlate === false || Object.isObject(serializedSlate["tx"]) === false) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Check if transaction's body isn't supported
					if("body" in serializedSlate["tx"] === false || Object.isObject(serializedSlate["tx"]["body"]) === false) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Check if body's inputs are invalid
					if("inputs" in serializedSlate["tx"]["body"] === false || Array.isArray(serializedSlate["tx"]["body"]["inputs"]) === false) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Try
					try {
					
						// Set self
						var self = this;
					
						// Set inputs to serialized slate's inputs
						this.inputs = serializedSlate["tx"]["body"]["inputs"].map(function(input) {
						
							// Check if input isn't supported
							if(Object.isObject(input) === false) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						
							// Return slate input
							return new SlateInput(input, self);
						});
					}
					
					// Catch errors
					catch(error) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Check if no inputs exist
					if(this.getInputs()["length"] === 0) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Check if body's outputs are invalid
					if("outputs" in serializedSlate["tx"]["body"] === false || Array.isArray(serializedSlate["tx"]["body"]["outputs"]) === false) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Try
					try {
					
						// Set outputs to serialized slate's outputs
						this.outputs = serializedSlate["tx"]["body"]["outputs"].map(function(output) {
						
							// Check if output isn't supported
							if(Object.isObject(output) === false) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						
							// Return slate output
							return new SlateOutput(output, self);
						});
					}
					
					// Catch errors
					catch(error) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Check if body's kernels are invalid
					if("kernels" in serializedSlate["tx"]["body"] === false || Array.isArray(serializedSlate["tx"]["body"]["kernels"]) === false) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Try
					try {
					
						// Set kernels to serialized slate's kernels
						this.kernels = serializedSlate["tx"]["body"]["kernels"].map(function(kernel) {
						
							// Check if kernel isn't supported
							if(Object.isObject(kernel) === false) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						
							// Return slate kernel
							return new SlateKernel(kernel, self, isMainnet);
						});
					}
					
					// Catch errors
					catch(error) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Check if transaction's offset isn't supported
					if("offset" in serializedSlate["tx"] === false || Common.isHexString(serializedSlate["tx"]["offset"]) === false || Common.hexStringLength(serializedSlate["tx"]["offset"]) !== Crypto.BLINDING_FACTOR_LENGTH || Secp256k1Zkp.isValidSecretKey(Common.fromHexString(serializedSlate["tx"]["offset"])) !== true) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Set offset to serialized slate's offset
					this.offset = Common.fromHexString(serializedSlate["tx"]["offset"]);
					
					// Check if serialized slate's participant data isn't supported
					if("participant_data" in serializedSlate === false || Array.isArray(serializedSlate["participant_data"]) === false || this.getNumberOfParticipants().isLessThan(serializedSlate["participant_data"]["length"]) === true) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Try
					try {
					
						// Set participants to serialized slate's participant data
						this.participants = serializedSlate["participant_data"].map(function(participant) {
						
							// Check if participant isn't supported
							if(Object.isObject(participant) === false) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						
							// Return slate participant
							return new SlateParticipant(participant, self);
						});
					}
					
					// Catch errors
					catch(error) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Break
					break;
				
				// Version Slatepack
				case Slate.VERSION_SLATEPACK:
				
					// Initialize bit reader for the serialized slate
					var bitReader = new BitReader(serializedSlate);
					
					// Try
					try {
					
						// Set version to detected version
						this.version = detectedVersion;
						
						// Set original version to version
						this.originalVersion = this.getVersion();
					
						// Check if serialized slate's purpose isn't correct
						if(bitReader.getBits(Slate.COMPACT_SLATE_PURPOSE_LENGTH) !== purpose) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Set ID to serialized slate's ID
						this.id = new Uuid(Uuid.serializeData(bitReader.getBytes(Uuid.BYTE_LENGTH)));
					
						// Check if ID isn't a random UUID
						if(this.getId().isRandom() === false) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Get serialized slate's mainnet
						var mainnet = bitReader.getBits(Slate.COMPACT_BOOLEAN_LENGTH) === Slate.COMPACT_BOOLEAN_TRUE;
						
						// Check if network isn't supported
						if(mainnet !== isMainnet) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Check if purpose is send initial
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) {
						
							// Set amount to serialized slate's amount
							this.amount = Slate.uncompactUint64(bitReader, true);
							
							// Check if serialized slate's amount isn't supported
							if(this.getAmount().isLessThan(Slate.MINIMUM_AMOUNT) === true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set fee to serialized slate's fee
							this.fee = Slate.uncompactUint64(bitReader, true);
							
							// Check if serialized slate's fee isn't supported
							if(this.getFee().isLessThan(Slate.MINIMUM_FEE) === true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						}
						
						// Set height to serialized slate's height
						this.height = Slate.uncompactUint64(bitReader, false);
						
						// Check if serialized slate's height isn't supported
						if(this.getHeight().isLessThan(Consensus.FIRST_BLOCK_HEIGHT) === true) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Set block header version to header version at the height
						this.blockHeaderVersion = Consensus.getHeaderVersion(isMainnet, this.getHeight());
						
						// Set lock height to serialized slate's lock height
						this.lockHeight = Slate.uncompactUint64(bitReader, false);
						
						// Check if serialized slate's lock height isn't supported
						if(this.getLockHeight().isLessThan(Slate.NO_LOCK_HEIGHT) === true) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Check if serialized slate contains a time to live cut off height
						if(bitReader.getBits(Slate.COMPACT_BOOLEAN_LENGTH) === Slate.COMPACT_BOOLEAN_TRUE) {
						
							// Set time to live cut off height to serialized slate's time to live cut off height
							this.timeToLiveCutOffHeight = Slate.uncompactUint64(bitReader, false);
							
							// Check if serialized slate's time to live cut off height isn't supported
							if(this.getTimeToLiveCutOffHeight().isLessThanOrEqualTo(this.getHeight()) === true || this.getTimeToLiveCutOffHeight().isLessThan(this.getLockHeight()) === true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						}
						
						// Otherwise
						else {
						
							// Set time to live cut off height to serialized slate's time to live cut off height
							this.timeToLiveCutOffHeight = Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT;
						}
						
						// Check if purpose is send initial
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) {
						
							// Add serialized slate's participant to the participants
							this.participants.push(new SlateParticipant(bitReader, this));
						
							// Check if serialized slate contains proof addresses
							if(bitReader.getBits(Slate.COMPACT_BOOLEAN_LENGTH) === Slate.COMPACT_BOOLEAN_TRUE) {
							
								// Set sender address to serialized slate's sender address
								this.senderAddress = Slate.uncompactProofAddress(bitReader, isMainnet);
								
								// Check sender address's length
								switch(this.getSenderAddress()["length"]) {
								
									// MQS address length
									case Mqs.ADDRESS_LENGTH:
									
										// Try
										try {
										
											// Get public key from sender's MQS address
											Mqs.mqsAddressToPublicKey(this.getSenderAddress(), isMainnet);
										}
										
										// Catch errors
										catch(error) {
										
											// Throw error
											throw "Unsupported slate.";
										}
										
										// Break
										break;
									
									// Tor address length
									case Tor.ADDRESS_LENGTH:
									
										// Try
										try {
										
											// Get public key from sender's Tor address
											Tor.torAddressToPublicKey(this.getSenderAddress());
										}
										
										// Catch errors
										catch(error) {
										
											// Throw error
											throw "Unsupported slate.";
										}
									
										// Break
										break;
									
									// Default
									default:
									
										// Throw error
										throw "Unsupported slate.";
								}
								
								// Set receiver address to serialized slate's receiver address
								this.receiverAddress = Slate.uncompactProofAddress(bitReader, isMainnet);
								
								// Check receiver address's length
								switch(this.getReceiverAddress()["length"]) {
								
									// MQS address length
									case Mqs.ADDRESS_LENGTH:
									
										// Try
										try {
										
											// Get public key from receiver's MQS address
											Mqs.mqsAddressToPublicKey(this.getReceiverAddress(), isMainnet);
										}
										
										// Catch errors
										catch(error) {
										
											// Throw error
											throw "Unsupported slate.";
										}
										
										// Break
										break;
									
									// Tor address length
									case Tor.ADDRESS_LENGTH:
									
										// Try
										try {
										
											// Get public key from receiver's Tor address
											Tor.torAddressToPublicKey(this.getReceiverAddress());
										}
										
										// Catch errors
										catch(error) {
										
											// Throw error
											throw "Unsupported slate.";
										}
									
										// Break
										break;
									
									// Default
									default:
									
										// Throw error
										throw "Unsupported slate.";
								}
							}
							
							// Otherwise
							else {
							
								// Set receiver address to serialized slate's receiver address
								this.receiverAddress = Slate.NO_RECEIVER_ADDRESS;
								
								// Set sender address to serialized slate's sender address
								this.senderAddress = Slate.NO_SENDER_ADDRESS;
							}
							
							// Set kernels to serialized slate's kernels
							this.kernels.push(new SlateKernel(this.getKernelFeatures(), this.getFee(), this.getLockHeight(), this.getRelativeHeight()));
						}
						
						// Check if purpose is send response
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_RESPONSE) {
						
							// Set number of participants to the initial send slate's number of participants
							this.numberOfParticipants = initialSendSlate.getNumberOfParticipants();
						
							// Set amount to inital send slate's amount
							this.amount = initialSendSlate.getAmount();
							
							// Set fee to inital send slate's fee
							this.fee = initialSendSlate.getFee();
							
							// Set inputs to initial send slate's inputs
							this.inputs = initialSendSlate.getInputs().map(function(input) {
							
								// Return input
								return new SlateInput(input.getFeatures(), input.getCommit());
							});
							
							// Set outputs to initial send slate's outputs
							this.outputs = initialSendSlate.getOutputs().map(function(output) {
							
								// Return output
								return new SlateOutput(output.getFeatures(), output.getCommit(), output.getProof());
							});
							
							// Set participants to initial send slate's participants
							this.participants = initialSendSlate.getParticipants().map(function(participant) {
							
								// Return participant
								return new SlateParticipant(participant.getId(), participant.getPublicBlindExcess(), participant.getPublicNonce(), participant.getPartialSignature(), participant.getMessage(), participant.getMessageSignature());
							});
						
							// Set offset to serialized slate's offset
							this.offset = bitReader.getBytes(Crypto.BLINDING_FACTOR_LENGTH);
							
							// Check if serialized slate's offset isn't supported
							if(Secp256k1Zkp.isValidSecretKey(this.getOffset()) !== true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Go through all serialized slate's outputs
							var outputs = [];
							do {
							
								// Append serialized slate's output to outputs
								outputs.push(new SlateOutput(bitReader, this));
							
							} while(bitReader.getBits(Slate.COMPACT_BOOLEAN_LENGTH) === Slate.COMPACT_BOOLEAN_TRUE);
							
							// Add outputs
							this.addOutputs(outputs, false);
							
							// Go through all serialized slate's kernels
							do {
							
								// Append serialized slate's kernel to kernels
								this.kernels.push(new SlateKernel(bitReader, this, isMainnet));
							
							} while(bitReader.getBits(Slate.COMPACT_BOOLEAN_LENGTH) === Slate.COMPACT_BOOLEAN_TRUE);
							
							// Add serialized slate's participant to the participants
							this.participants.push(new SlateParticipant(bitReader, this));
							
							// Check if serialized slate contains proof addresses
							if(bitReader.getBits(Slate.COMPACT_BOOLEAN_LENGTH) === Slate.COMPACT_BOOLEAN_TRUE) {
							
								// Set sender address to serialized slate's sender address
								this.senderAddress = Slate.uncompactProofAddress(bitReader, isMainnet);
								
								// Check sender address's length
								switch(this.getSenderAddress()["length"]) {
								
									// MQS address length
									case Mqs.ADDRESS_LENGTH:
									
										// Try
										try {
										
											// Get public key from sender's MQS address
											Mqs.mqsAddressToPublicKey(this.getSenderAddress(), isMainnet);
										}
										
										// Catch errors
										catch(error) {
										
											// Throw error
											throw "Unsupported slate.";
										}
										
										// Break
										break;
									
									// Tor address length
									case Tor.ADDRESS_LENGTH:
									
										// Try
										try {
										
											// Get public key from sender's Tor address
											Tor.torAddressToPublicKey(this.getSenderAddress());
										}
										
										// Catch errors
										catch(error) {
										
											// Throw error
											throw "Unsupported slate.";
										}
									
										// Break
										break;
									
									// Default
									default:
									
										// Throw error
										throw "Unsupported slate.";
								}
								
								// Set receiver address to serialized slate's receiver address
								this.receiverAddress = Slate.uncompactProofAddress(bitReader, isMainnet);
								
								// Check receiver address's length
								switch(this.getReceiverAddress()["length"]) {
								
									// MQS address length
									case Mqs.ADDRESS_LENGTH:
									
										// Try
										try {
										
											// Get public key from receiver's MQS address
											Mqs.mqsAddressToPublicKey(this.getReceiverAddress(), isMainnet);
										}
										
										// Catch errors
										catch(error) {
										
											// Throw error
											throw "Unsupported slate.";
										}
										
										// Break
										break;
									
									// Tor address length
									case Tor.ADDRESS_LENGTH:
									
										// Try
										try {
										
											// Get public key from receiver's Tor address
											Tor.torAddressToPublicKey(this.getReceiverAddress());
										}
										
										// Catch errors
										catch(error) {
										
											// Throw error
											throw "Unsupported slate.";
										}
									
										// Break
										break;
									
									// Default
									default:
									
										// Throw error
										throw "Unsupported slate.";
								}
							}
							
							// Otherwise
							else {
							
								// Set receiver address to serialized slate's receiver address
								this.receiverAddress = Slate.NO_RECEIVER_ADDRESS;
								
								// Set sender address to serialized slate's sender address
								this.senderAddress = Slate.NO_SENDER_ADDRESS;
							}
							
							// Check if serialized slate contains a proof signature
							if(bitReader.getBits(Slate.COMPACT_BOOLEAN_LENGTH) === Slate.COMPACT_BOOLEAN_TRUE) {
							
								// Check if doesn't have a payment proof
								if(this.hasPaymentProof() === false) {
								
									// Throw error
									throw "Unsupported slate.";
								}
							
								// Get serialized slate's receiver signature length
								var receiverSignatureLength = bitReader.getBits(Slate.COMPACT_PROOF_SIGNATURE_LENGTH_LENGTH) + Crypto.ED25519_SIGNATURE_LENGTH;
								
								// Check if serialized slate's receiver signature length isn't supported
								if(receiverSignatureLength > Crypto.MAXIMUM_MESSAGE_HASH_SIGNATURE_LENGTH && receiverSignatureLength !== Crypto.ED25519_SIGNATURE_LENGTH) {
								
									// Throw error
									throw "Unsupported slate.";
								}
								
								// Set receiver signature to serialized slate's receiver signature
								this.receiverSignature = bitReader.getBytes(receiverSignatureLength);
							}
							
							// Otherwise
							else {
							
								// Set receiver signature to serialized slate's receiver signature
								this.receiverSignature = Slate.NO_RECEIVER_SIGNATURE;
							}
						}
					}
					
					// Catch errors
					catch(error) {
					
						// Throw error
						throw "Unsupported slate.";
					}
					
					// Break
					break;
				
				// Version four
				case Slate.VERSION_FOUR.toFixed():
				
					// Set version to detected version
					this.version = detectedVersion;
					
					// Set original version to version
					this.originalVersion = this.getVersion();
					
					// Check if serialized slate is binary
					if(serializedSlate instanceof Uint8Array === true) {
					
						// Initialize bit reader for the serialized slate
						var bitReader = new BitReader(serializedSlate);
						
						// Try
						try {
						
							// Skip serialized slate's version
							bitReader.getBytes(Common.BYTES_IN_A_UINT16);
							
							// Set block header version to serialized slate's block header version
							this.blockHeaderVersion = new BigNumber(Common.HEX_PREFIX + Common.toHexString(bitReader.getBytes(Common.BYTES_IN_A_UINT16)));
							
							// Set ID to serialized slate's ID
							this.id = new Uuid(Uuid.serializeData(bitReader.getBytes(Uuid.BYTE_LENGTH)));
							
							// Check if ID isn't a random UUID
							if(this.getId().isRandom() === false) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Check if serialized slate's purpose isn't correct
							if(bitReader.getBytes(1)[0] !== purpose + 1) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set offset to serialized slate's offset
							this.offset = bitReader.getBytes(Crypto.BLINDING_FACTOR_LENGTH);
							
							// Check if serialized slate's offset isn't supported
							if((purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL && Common.arraysAreEqual(this.getOffset(), Slate.ZERO_OFFSET) === false && Secp256k1Zkp.isValidSecretKey(this.getOffset()) !== true) || (purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_RESPONSE && Secp256k1Zkp.isValidSecretKey(this.getOffset()) !== true)) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Get serialized slate's optional fields
							var optionalFields = bitReader.getBytes(1)[0];
							
							// Set number of participants to serialized slate's number of participants if it includes it
							this.numberOfParticipants = ((optionalFields & 0b00000001) !== 0) ? new BigNumber(bitReader.getBytes(1)[0]) : Slate.DEFAULT_NUMBER_OF_PARTICIPANTS;
							
							// Check if serialized slate's number of participants isn't supported
							if(this.getNumberOfParticipants().isLessThan(Slate.MINIMUM_NUMBER_OF_PARTICIPANTS) === true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set amount to serialized slate's amount if it includes it
							this.amount = ((optionalFields & 0b00000010) !== 0) ? new BigNumber(Common.HEX_PREFIX + Common.toHexString(bitReader.getBytes(Common.BYTES_IN_A_UINT64))) : ((purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) ? new BigNumber(0) : initialSendSlate.getAmount());
							
							// Check if serialized slate's amount isn't supported
							if(this.getAmount().isLessThan(Slate.MINIMUM_AMOUNT) === true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set fee to serialized slate's fee if it includes it
							this.fee = ((optionalFields & 0b00000100) !== 0) ? new BigNumber(Common.HEX_PREFIX + Common.toHexString(bitReader.getBytes(Common.BYTES_IN_A_UINT64))) : ((purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) ? new BigNumber(0) : initialSendSlate.getFee());
							
							// Check if serialized slate's fee isn't supported
							if(this.getFee().isLessThan(Slate.MINIMUM_FEE) === true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Get serialized slate's features if it includes it
							var features = ((optionalFields & 0b00001000) !== 0) ? bitReader.getBytes(1)[0] : SlateKernel.PLAIN_FEATURES;
							
							// Set time to live cut off height to serialized slate's time to live cut off height if it includes it
							this.timeToLiveCutOffHeight = ((optionalFields & 0b00010000) !== 0) ? new BigNumber(Common.HEX_PREFIX + Common.toHexString(bitReader.getBytes(Common.BYTES_IN_A_UINT64))) : Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT;
							
							// Get serialized sate's participants length
							var participantsLength = bitReader.getBytes(1)[0];
							
							// Check if purpose is send response
							if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_RESPONSE) {
							
								// Set height to initial send slate's height
								this.height = initialSendSlate.getHeight();
								
								// Set inputs to initial send slate's inputs
								this.inputs = initialSendSlate.getInputs().map(function(input) {
								
									// Return input
									return new SlateInput(input.getFeatures(), input.getCommit());
								});
								
								// Set outputs to initial send slate's outputs
								this.outputs = initialSendSlate.getOutputs().map(function(output) {
								
									// Return output
									return new SlateOutput(output.getFeatures(), output.getCommit(), output.getProof());
								});
								
								// Set participants to initial send slate's participants
								this.participants = initialSendSlate.getParticipants().map(function(participant) {
								
									// Return participant
									return new SlateParticipant(participant.getId(), participant.getPublicBlindExcess(), participant.getPublicNonce(), participant.getPartialSignature(), participant.getMessage(), participant.getMessageSignature());
								});
							}
							
							// Check if serialized slate's participants isn't supported
							if(this.getNumberOfParticipants().isLessThan(participantsLength + this.getParticipants()["length"]) === true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Go through all of the serialized slate's participants
							for(var i = 0; i < participantsLength; ++i) {
							
								// Add serialized slate's participant to the participants
								this.participants.push(new SlateParticipant(bitReader, this));
							}
							
							// Get serialized slate's component fields
							var componentFields = bitReader.getBytes(1)[0];
							
							// Check if serialized slate includes inputs and outputs
							if((componentFields & 0b00000001) !== 0) {
							
								// Get serialized slate's inputs and outputs length
								var inputsAndOutputsLength = (new BigNumber(Common.HEX_PREFIX + Common.toHexString(bitReader.getBytes(Common.BYTES_IN_A_UINT16)))).toNumber();
								
								// Go through all of the serialized slate's inputs and outputs
								var inputs = [];
								var outputs = [];
								for(var i = 0; i < inputsAndOutputsLength; ++i) {
								
									// Check if input or output is an input
									if(bitReader.getBytes(1)[0] === 0) {
									
										// Append serialized slate's input to inputs
										inputs.push(new SlateInput(bitReader, this));
									}
									
									// Otherwise
									else {
									
										// Append serialized slate's output to outputs
										outputs.push(new SlateOutput(bitReader, this));
									}
								}
								
								// Check if purpose is send response
								if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_RESPONSE) {
								
									// Add inputs
									this.addInputs(inputs, false, outputs["length"]);
									
									// Add outputs
									this.addOutputs(outputs, false);
								}
							}
							
							// Check if serialized slate includes payment proof
							if((componentFields & 0b00000010) !== 0) {
							
								// Set sender address to the Slatepack address created from the serialized slate's sender public key
								this.senderAddress = Slatepack.publicKeyToSlatepackAddress(bitReader.getBytes(Crypto.ED25519_PUBLIC_KEY_LENGTH));
								
								// Set receiver address to the Slatepack address created from the serialized slate's receiver public key
								this.receiverAddress = Slatepack.publicKeyToSlatepackAddress(bitReader.getBytes(Crypto.ED25519_PUBLIC_KEY_LENGTH));
								
								// Check if serialized slate includes a payment proof's receiver signature
								if(bitReader.getBytes(1)[0] !== 0) {
								
									// Set receiver signature to serialized slate's receiver signature
									this.receiverSignature = bitReader.getBytes(Crypto.ED25519_SIGNATURE_LENGTH);
								}
							}
							
							// Check serialized slate's features
							switch(features) {
							
								// Plain features
								case SlateKernel.PLAIN_FEATURES:
								
									// Break
									break;
								
								// Height locked features
								case SlateKernel.HEIGHT_LOCKED_FEATURES:
								
									// Set lock height to serialized slate's lock height
									this.lockHeight = new BigNumber(Common.HEX_PREFIX + Common.toHexString(bitReader.getBytes(Common.BYTES_IN_A_UINT64)));
									
									// Check if serialized slate's lock height isn't supported
									if(this.getLockHeight().isLessThan(Slate.NO_LOCK_HEIGHT) === true) {
									
										// Throw error
										throw "Unsupported slate.";
									}
								
									// Break
									break;
							
								// Default
								default:
								
									// Throw error
									throw "Unsupported slate.";
							}
							
							// Check if serialized slate's time to live cut off height isn't supported
							if(this.getTimeToLiveCutOffHeight() !== Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT && (this.getTimeToLiveCutOffHeight().isLessThan(Consensus.FIRST_BLOCK_HEIGHT) === true || (this.getLockHeight().isEqualTo(Slate.NO_LOCK_HEIGHT) === false && this.getTimeToLiveCutOffHeight().isLessThan(this.getLockHeight()) === true))) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set kernels to serialized slate's kernels
							this.kernels.push(new SlateKernel(this.getKernelFeatures(), this.getFee(), this.getLockHeight(), this.getRelativeHeight()));
						}
					
						// Catch errors
						catch(error) {
						
							// Throw error
							throw "Unsupported slate.";
						}
					}
					
					// Otherwise
					else {
					
						// Check if serialized slate's purpose isn't correct
						if("sta" in serializedSlate === false || typeof serializedSlate["sta"] !== "string" || serializedSlate["sta"] !== Slate.purposeToText(purpose)) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Check if serialized slate's number of participants isn't supported
						if("num_parts" in serializedSlate === true && ((Common.isNumberString(serializedSlate["num_parts"]) === false && serializedSlate["num_parts"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["num_parts"])).isInteger() === false || (new BigNumber(serializedSlate["num_parts"])).isLessThan(Slate.MINIMUM_NUMBER_OF_PARTICIPANTS) === true)) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Set number of participants to serialized slate's number of participants
						this.numberOfParticipants = ("num_parts" in serializedSlate === true) ? new BigNumber(serializedSlate["num_parts"]) : Slate.DEFAULT_NUMBER_OF_PARTICIPANTS;
						
						// Check if serialized slate's ID isn't supported
						if("id" in serializedSlate === false || typeof serializedSlate["id"] !== "string") {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Try
						try {
						
							// Set ID to serialized slate's ID
							this.id = new Uuid(serializedSlate["id"]);
						
							// Check if ID isn't a random UUID
							if(this.getId().isRandom() === false) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						}
						
						// Catch errors
						catch(error) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Check if serialized slate's block header version isn't supported
						if("ver" in serializedSlate === false || typeof serializedSlate["ver"] !== "string" || Slate.VERSION_PATTERN.test(serializedSlate["ver"]) === false) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Set block header version to serialized slate's block header version
						this.blockHeaderVersion = new BigNumber(serializedSlate["ver"].split(Slate.VERSION_SEPARATOR)[1]);
						
						// Check if serialzed slate contains features
						if("feat" in serializedSlate === true) {
						
							// Check if serialized slate's features isn't supported
							if((Common.isNumberString(serializedSlate["feat"]) === false && serializedSlate["feat"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["feat"])).isGreaterThan(Number.MAX_SAFE_INTEGER) === true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						
							// Check serialized slate's features
							switch((new BigNumber(serializedSlate["feat"])).toNumber()) {
							
								// Plain features
								case SlateKernel.PLAIN_FEATURES:
								
									// Break
									break;
								
								// Height locked features
								case SlateKernel.HEIGHT_LOCKED_FEATURES:
								
									// Check if serialized slate's lock height isn't supported
									if("feat_args" in serializedSlate === false || serializedSlate["feat_args"] === null || Object.isObject(serializedSlate["feat_args"]) === false || "lock_hgt" in serializedSlate["feat_args"] === false || (Common.isNumberString(serializedSlate["feat_args"]["lock_hgt"]) === false && serializedSlate["feat_args"]["lock_hgt"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["feat_args"]["lock_hgt"])).isInteger() === false || (new BigNumber(serializedSlate["feat_args"]["lock_hgt"])).isLessThan(Slate.NO_LOCK_HEIGHT) === true) {
									
										// Throw error
										throw "Unsupported slate.";
									}
									
									// Set lock height to serialized slate's lock height
									this.lockHeight = new BigNumber(serializedSlate["feat_args"]["lock_hgt"]);
								
									// Break
									break;
							
								// Default
								default:
								
									// Throw error
									throw "Unsupported slate.";
							}
						}
						
						// Otherwise
						else {
						
							// Check if serialized slate's features arguments isn't supported
							if("feat_args" in serializedSlate === true && serializedSlate["feat_args"] !== null) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						}
					
						// Check if serialized slate's time to live cut off height isn't supported
						if("ttl" in serializedSlate === true && serializedSlate["ttl"] !== null && ((Common.isNumberString(serializedSlate["ttl"]) === false && serializedSlate["ttl"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["ttl"])).isInteger() === false || (new BigNumber(serializedSlate["ttl"])).isLessThan(Consensus.FIRST_BLOCK_HEIGHT) === true || (this.getLockHeight().isEqualTo(Slate.NO_LOCK_HEIGHT) === false && (new BigNumber(serializedSlate["ttl"])).isLessThan(this.getLockHeight()) === true))) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Set time to live cut off height to serialized slate's time to live cut off height
						this.timeToLiveCutOffHeight = ("ttl" in serializedSlate === true && serializedSlate["ttl"] !== null) ? new BigNumber(serializedSlate["ttl"]) : Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT;
						
						// Check if purpose is send response
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_RESPONSE) {
						
							// Set participants to initial send slate's participants
							this.participants = initialSendSlate.getParticipants().map(function(participant) {
							
								// Return participant
								return new SlateParticipant(participant.getId(), participant.getPublicBlindExcess(), participant.getPublicNonce(), participant.getPartialSignature(), participant.getMessage(), participant.getMessageSignature());
							});
						}
						
						// Check if serialized slate's participants isn't supported
						if("sigs" in serializedSlate === false || Array.isArray(serializedSlate["sigs"]) === false || this.getNumberOfParticipants().isLessThan(serializedSlate["sigs"]["length"] + this.getParticipants()["length"]) === true) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Try
						try {
						
							// Go through all of the serialized slate's participants
							for(var i = 0; i < serializedSlate["sigs"]["length"]; ++i) {
							
								// Get participant
								var participant = serializedSlate["sigs"][i];
								
								// Check if participant isn't supported
								if(Object.isObject(participant) === false) {
								
									// Throw error
									throw "Unsupported slate.";
								}
							
								// Append slate participant to participants
								this.participants.push(new SlateParticipant(participant, this));
							}
						}
						
						// Catch errors
						catch(error) {
						
							// Throw error
							throw "Unsupported slate.";
						}
						
						// Check if serialized slate contains a payment proof
						if("proof" in serializedSlate === true && serializedSlate["proof"] !== null) {
						
							// Check if serialized slate's proof isn't supported
							if(Object.isObject(serializedSlate["proof"]) === false) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Check if payment proof's receiver address isn't supported
							if("raddr" in serializedSlate["proof"] === false || Common.isHexString(serializedSlate["proof"]["raddr"]) === false || Common.hexStringLength(serializedSlate["proof"]["raddr"]) !== Crypto.ED25519_PUBLIC_KEY_LENGTH) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Try
							try {
							
								// Set receiver address to the Slatepack address created from the receiver's public key
								this.receiverAddress = Slatepack.publicKeyToSlatepackAddress(Common.fromHexString(serializedSlate["proof"]["raddr"]));
							}
							
							// Catch errors
							catch(error) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Check if payment proof's receiver signature isn't supported
							if("rsig" in serializedSlate["proof"] === true && serializedSlate["proof"]["rsig"] !== null && (Common.isHexString(serializedSlate["proof"]["rsig"]) === false || Common.hexStringLength(serializedSlate["proof"]["rsig"]) !== Crypto.ED25519_SIGNATURE_LENGTH)) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set receiver signature to serialized slate's receiver signature
							this.receiverSignature = ("rsig" in serializedSlate["proof"] === true && serializedSlate["proof"]["rsig"] !== null) ? Common.fromHexString(serializedSlate["proof"]["rsig"]) : Slate.NO_RECEIVER_SIGNATURE;
							
							// Check if payment proof's sender address isn't supported
							if("saddr" in serializedSlate["proof"] === false || Common.isHexString(serializedSlate["proof"]["saddr"]) === false || Common.hexStringLength(serializedSlate["proof"]["saddr"]) !== Crypto.ED25519_PUBLIC_KEY_LENGTH) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Try
							try {
							
								// Set sender address to the Slatepack address created from the sender's public key
								this.senderAddress = Slatepack.publicKeyToSlatepackAddress(Common.fromHexString(serializedSlate["proof"]["saddr"]));
							}
							
							// Catch errors
							catch(error) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						}
						
						// Check if purpose is send initial
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL) {
						
							// Check if serialized slate contains inputs and outputs isn't supported
							if("coms" in serializedSlate === true && serializedSlate["coms"] !== null) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						
							// Check if serialized slate's amount isn't supported
							if("amt" in serializedSlate === false || (Common.isNumberString(serializedSlate["amt"]) === false && serializedSlate["amt"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["amt"])).isInteger() === false || (new BigNumber(serializedSlate["amt"])).isLessThan(Slate.MINIMUM_AMOUNT) === true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set amount to serialized slate's amount
							this.amount = new BigNumber(serializedSlate["amt"]);
							
							// Check if serialized slate's fee isn't supported
							if("fee" in serializedSlate === false || (Common.isNumberString(serializedSlate["fee"]) === false && serializedSlate["fee"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["fee"])).isInteger() === false || (new BigNumber(serializedSlate["fee"])).isLessThan(Slate.MINIMUM_FEE) === true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set fee to serialized slate's fee
							this.fee = new BigNumber(serializedSlate["fee"]);
						
							// Check if serialized slate's offset isn't supported
							if("off" in serializedSlate === true && (Common.isHexString(serializedSlate["off"]) === false || Common.arraysAreEqual(Common.fromHexString(serializedSlate["off"]), Slate.ZERO_OFFSET) === false)) {
							
								// Throw error
								throw "Unsupported slate.";
							}
						}
						
						// Check if purpose is send response
						if(purpose === Slate.COMPACT_SLATE_PURPOSE_SEND_RESPONSE) {
						
							// Set height to initial send slate's height
							this.height = initialSendSlate.getHeight();
						
							// Set inputs to initial send slate's inputs
							this.inputs = initialSendSlate.getInputs().map(function(input) {
							
								// Return input
								return new SlateInput(input.getFeatures(), input.getCommit());
							});
							
							// Set outputs to initial send slate's outputs
							this.outputs = initialSendSlate.getOutputs().map(function(output) {
							
								// Return output
								return new SlateOutput(output.getFeatures(), output.getCommit(), output.getProof());
							});
							
							// Check if serialized slate contains inputs and outputs isn't supported
							if("coms" in serializedSlate === false || serializedSlate["coms"] === null || Array.isArray(serializedSlate["coms"]) === false) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Initialize inputs and outputs
							var inputs = [];
							var outputs = [];
							
							// Try
							try {
							
								// Go through all serialized slate's input and outputs
								for(var i = 0; i < serializedSlate["coms"]["length"]; ++i) {
								
									// Get serialize slate's value
									var value = serializedSlate["coms"][i];
									
									// Check if value isn't supported
									if(Object.isObject(value) === false) {
									
										// Throw error
										throw "Unsupported slate.";
									}
									
									// Check if value is an output
									if("p" in value === true && value["p"] !== null) {
									
										// Add value to list of outputs
										outputs.push(new SlateOutput(value, this));
									}
									
									// Otherwise
									else {
									
										// Add value to list of inputs
										inputs.push(new SlateInput(value, this));
									}
								}
							}
							
							// Catch errors
							catch(error) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Add inputs
							this.addInputs(inputs, false, outputs["length"]);
							
							// Add outputs
							this.addOutputs(outputs, false);
						
							// Check if serialized slate's amount isn't supported
							if("amt" in serializedSlate === true && ((Common.isNumberString(serializedSlate["amt"]) === false && serializedSlate["amt"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["amt"])).isInteger() === false || (new BigNumber(serializedSlate["amt"])).isLessThan(Slate.MINIMUM_AMOUNT) === true)) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set amount to serialized slate's amount
							this.amount = ("amt" in serializedSlate === true) ? new BigNumber(serializedSlate["amt"]) : initialSendSlate.getAmount();
							
							// Check if serialized slate's fee isn't supported
							if("fee" in serializedSlate === true && ((Common.isNumberString(serializedSlate["fee"]) === false && serializedSlate["fee"] instanceof BigNumber === false) || (new BigNumber(serializedSlate["fee"])).isInteger() === false || (new BigNumber(serializedSlate["fee"])).isLessThan(Slate.MINIMUM_FEE) === true)) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set fee to serialized slate's fee
							this.fee = ("fee" in serializedSlate === true) ? new BigNumber(serializedSlate["fee"]) : initialSendSlate.getFee();
						
							// Check if serialized slate's offset isn't supported
							if("off" in serializedSlate === false || Common.isHexString(serializedSlate["off"]) === false || Common.hexStringLength(serializedSlate["off"]) !== Crypto.BLINDING_FACTOR_LENGTH || Secp256k1Zkp.isValidSecretKey(Common.fromHexString(serializedSlate["off"])) !== true) {
							
								// Throw error
								throw "Unsupported slate.";
							}
							
							// Set offset to serialized slate's offset
							this.offset = Common.fromHexString(serializedSlate["off"]);
						}
						
						// Set kernels to serialized slate's kernels
						this.kernels.push(new SlateKernel(this.getKernelFeatures(), this.getFee(), this.getLockHeight(), this.getRelativeHeight()));
					}
					
					// Break
					break;
				
				// Default
				default:
				
					// Throw error
					throw "Unsupported slate.";
			}
			
			// Set participant IDs
			var participantIds = [];
			
			// Set sender participant exists
			var senderParticipantExists = false;
			
			// Go through all participants
			for(var i = 0; i < this.getParticipants()["length"]; ++i) {
			
				// Get participant
				var participant = this.getParticipants()[i];
				
				// Check if participant's ID already exists
				if(participantIds.indexOf(participant.getId().toFixed()) !== Common.INDEX_NOT_FOUND) {
				
					// Throw error
					throw "Unsupported slate.";
				}
				
				// Append participant's ID to list
				participantIds.push(participant.getId().toFixed());
				
				// Check if participant is a sender
				if(participant.isSender() === true) {
				
					// Set sender participant exists
					senderParticipantExists = true;
				}
			}
			
			// Check if a sender participant doesn't exist
			if(senderParticipantExists === false) {
			
				// Throw error
				throw "Unsupported slate.";
			}
			
			// Check if partial signatures failed to be verified
			if(this.verifyPartialSignatures() === false) {
			
				// Throw error
				throw "Unsupported slate.";
			}
			
			// Check if receiver signature failed to be verified
			if(this.verifyReceiverSignature(isMainnet) === false) {
			
				// Throw error
				throw "Unsupported slate.";
			}
			
			// Check if verifying weight failed
			if(this.verifyWeight() === false) {
			
				// Throw error
				throw "Unsupported slate.";
			}
			
			// Check if verifying no recent duplicate kernels failed
			if(this.verifyNoRecentDuplicateKernels(isMainnet) === false) {
			
				// Throw error
				throw "Unsupported slate.";
			}
			
			// Check if verifying sorted and unique failed
			if(this.verifySortedAndUnique() === false) {
			
				// Throw error
				throw "Unsupported slate.";
			}
			
			// Check if verifying no cut through failed
			if(this.verifyNoCutThrough() === false) {
			
				// Throw error
				throw "Unsupported slate.";
			}
			
			// Check if no kernels exist
			if(this.getKernels()["length"] === 0) {
			
				// Throw error
				throw "Unsupported slate.";
			}
			
			// Check if kernel's features differ from the slate's
			if(this.getKernelFeatures() !== this.getKernels()[0].getFeatures()) {
			
				// Throw error
				throw "Unsupported slate.";
			}
			
			// Check if kernel is complete
			if(this.getKernels()[0].isComplete() === true) {
			
				// Check if verifying kernel sums failed
				if(this.verifyKernelSums() === false) {
				
					// Throw error
					throw "Unsupported slate.";
				}
			}
		}
		
		// Minimum compatible version
		minimumCompatibleVersion(preferredVersions) {
		
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// MWC wallet
				case Consensus.MWC_WALLET_TYPE:
		
					// Check if version Slatepack is preferred and kernel features are plain
					if(preferredVersions.indexOf(Slate.VERSION_SLATEPACK) !== Common.INDEX_NOT_FOUND && this.getKernelFeatures() === SlateKernel.PLAIN_FEATURES) {
					
						// Return version Slatepack
						return Slate.VERSION_SLATEPACK;
					}
				
					// Otherwise check if time to live cut off height or payment proof is used
					else if(this.getTimeToLiveCutOffHeight() !== Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT || this.hasPaymentProof() === true) {
					
						// Return version three
						return Slate.VERSION_THREE;
					}
					
					// Otherwise
					else {
					
						// Check if version two isn't preferred
						if(preferredVersions["length"] !== 0 && preferredVersions.indexOf("V" + Slate.VERSION_TWO.toFixed()) === Common.INDEX_NOT_FOUND) {
						
							// Return version three
							return Slate.VERSION_THREE;
						}
						
						// Otherwise
						else {
					
							// Return version two
							return Slate.VERSION_TWO;
						}
					}
					
					// Break
					break;
				
				// GRIN wallet
				case Consensus.GRIN_WALLET_TYPE:
				
					// Return version four
					return Slate.VERSION_FOUR;
				
				// EPIC wallet
				case Consensus.EPIC_WALLET_TYPE:
		
					// Check if time to live cut off height or payment proof is used
					if(this.getTimeToLiveCutOffHeight() !== Slate.NO_TIME_TO_LIVE_CUT_OFF_HEIGHT || this.hasPaymentProof() === true) {
					
						// Return version three
						return Slate.VERSION_THREE;
					}
					
					// Otherwise
					else {
					
						// Check if version two isn't preferred
						if(preferredVersions["length"] !== 0 && preferredVersions.indexOf("V" + Slate.VERSION_TWO.toFixed()) === Common.INDEX_NOT_FOUND) {
						
							// Return version three
							return Slate.VERSION_THREE;
						}
						
						// Otherwise
						else {
					
							// Return version two
							return Slate.VERSION_TWO;
						}
					}
					
					// Break
					break;
			}
		}
		
		// Verify partial signatures
		verifyPartialSignatures() {
		
			// Try
			try {
			
				// Get message to sign
				var messageToSign = SlateKernel.signatureMessage(this.getKernelFeatures(), this.getFee(), this.getLockHeight(), this.getRelativeHeight());
			}
			
			// Catch errors
			catch(error) {
			
				// Return false
				return false;
			}
			
			// Get public nonce sum from combining participant's public nonces
			var publicNonceSum = Secp256k1Zkp.combinePublicKeys(this.getParticipants().map(function(participant) {
			
				// Return participant's public nonce
				return participant.getPublicNonce();
			}));
			
			// Check if getting public nonce sum failed
			if(publicNonceSum === Secp256k1Zkp.OPERATION_FAILED) {
			
				// Return false
				return false;
			}
			
			// Get public blind excess sum from combining participant's public blind excesses
			var publicBlindExcessSum = Secp256k1Zkp.combinePublicKeys(this.getParticipants().map(function(participant) {
			
				// Return participant's public blind excess
				return participant.getPublicBlindExcess();
			}));
			
			// Check if getting public blind excess sum failed
			if(publicBlindExcessSum === Secp256k1Zkp.OPERATION_FAILED) {
			
				// Return false
				return false;
			}
			
			// Go through all participants
			for(var i = 0; i < this.getParticipants()["length"]; ++i) {
			
				// Get participant
				var participant = this.getParticipants()[i];
				
				// Check if participant is complete
				if(participant.isComplete() === true) {
				
					// Check if partial signature doesn't verify the message
					if(Secp256k1Zkp.verifySingleSignerSignature(participant.getPartialSignature(), messageToSign, publicNonceSum, participant.getPublicBlindExcess(), publicBlindExcessSum, true) !== true) {
					
						// Return false
						return false;
					}
				}
			}
			
			// Return true
			return true;
		}
		
		// Verify receiver signature
		verifyReceiverSignature(isMainnet) {
		
			// Check if receiver signature exists
			if(this.getReceiverSignature() !== Slate.NO_RECEIVER_SIGNATURE) {
			
				// Try
				try {
				
					// Get excess
					var excess = this.getExcess();
				}
				
				// Catch errors
				catch(error) {
				
					// Return false
					return false;
				}
				
				// Try
				try {
				
					// Get message from amount, excess, and sender address
					var message = Slate.getPaymentProofMessage(this.getAmount(), excess, this.getSenderAddress());
					
					// Check wallet type
					switch(Consensus.getWalletType()) {
					
						// MWC wallet
						case Consensus.MWC_WALLET_TYPE:
					
							// Check receiver address's length
							switch(this.getReceiverAddress()["length"]) {
							
								// MQS address length
								case Mqs.ADDRESS_LENGTH:
								
									// Get message hash
									var messageHash = new Uint8Array(sha256.arrayBuffer(message));
								
									// Get receiver address's public key
									var receiverAddressPublicKey = Mqs.mqsAddressToPublicKey(this.getReceiverAddress(), isMainnet);
									
									// Check if receiver signature doesn't verify the message hash
									if(Secp256k1Zkp.verifyMessageHashSignature(this.getReceiverSignature(), messageHash, receiverAddressPublicKey) !== true) {
									
										// Return false
										return false;
									}
									
									// Break
									break;
								
								// Tor address length
								case Tor.ADDRESS_LENGTH:
									
									// Get receiver address's public key
									var receiverAddressPublicKey = Tor.torAddressToPublicKey(this.getReceiverAddress());
								
									// Check if receiver signature doesn't verify the message
									if(Ed25519.verify(message, this.getReceiverSignature(), receiverAddressPublicKey) !== true) {
									
										// Return false
										return false;
									}
									
									// Break
									break;
							}
							
							// Break
							break;
						
						// GRIN wallet
						case Consensus.GRIN_WALLET_TYPE:
						
							// Check receiver address's length
							switch(this.getReceiverAddress()["length"]) {
						
								// Slatepack address length
								case Slatepack.ADDRESS_LENGTH:
								
									// Get receiver address's public key
									var receiverAddressPublicKey = Slatepack.slatepackAddressToPublicKey(this.getReceiverAddress());
								
									// Check if receiver signature doesn't verify the message
									if(Ed25519.verify(message, this.getReceiverSignature(), receiverAddressPublicKey) !== true) {
									
										// Return false
										return false;
									}
									
									// Break
									break;
							}
							
							// Break
							break;
						
						// EPIC wallet
						case Consensus.EPIC_WALLET_TYPE:
					
							// Check receiver address's length
							switch(this.getReceiverAddress()["length"]) {
							
								// Tor address length
								case Tor.ADDRESS_LENGTH:
									
									// Get receiver address's public key
									var receiverAddressPublicKey = Tor.torAddressToPublicKey(this.getReceiverAddress());
								
									// Check if receiver signature doesn't verify the message
									if(Ed25519.verify(message, this.getReceiverSignature(), receiverAddressPublicKey) !== true) {
									
										// Return false
										return false;
									}
									
									// Break
									break;
							}
							
							// Break
							break;
					}
				}
				
				// Catch errors
				catch(error) {
				
					// Return false
					return false;
				}
			}
			
			// Return tru
			return true;
		}
		
		// Verify weight
		verifyWeight(expectedNumberOfOutputs = 0) {
		
			// Get coinbase weight
			var coinbaseWeight = Consensus.BLOCK_OUTPUT_WEIGHT + Consensus.BLOCK_KERNEL_WEIGHT;
			
			// Get maximum transaction weight while leaving room for a coinbase
			var maximumTransactionWeight = Math.max(Consensus.MAXIMUM_BLOCK_WEIGHT - coinbaseWeight, 0);
			
			// Check if weight is too heavy
			if(Slate.getWeight(this.getInputs()["length"], this.getOutputs()["length"] + expectedNumberOfOutputs, this.getKernels()["length"]).isGreaterThan(maximumTransactionWeight) === true)
			
				// Return false
				return false;
			
			// Return true
			return true;
		}
		
		// Verify no recent duplicate kernels
		verifyNoRecentDuplicateKernels(isMainnet) {
		
			// Check if no recent duplicate kernels is enabled
			if(Consensus.isNoRecentDuplicateKernelsEnabled(isMainnet) === true) {
			
				// Initialize no recent duplicate kernels excesses
				var noRecentDuplicateKernelsExcesses = [];
			
				// Go through all kernels
				for(var i = 0; i < this.getKernels()["length"]; ++i) {
				
					// Get kernel
					var kernel = this.getKernels()[i];
					
					// Check if kernel is no recent duplicate
					if(kernel.isNoRecentDuplicate() === true) {
					
						// Check if kernel's excess already exists in the list
						if(noRecentDuplicateKernelsExcesses.indexOf(Common.toHexString(kernel.getExcess())) !== Common.INDEX_NOT_FOUND) {
						
							// Return false
							return false;
						}
					
						// Append kernel's excess to list
						noRecentDuplicateKernelsExcesses.push(Common.toHexString(kernel.getExcess()));
					}
				}
			}
			
			// Return true
			return true;
		}
		
		// Verify sorted and unique
		verifySortedAndUnique() {
		
			// Check if inputs aren't sorted and unique
			if(Slate.isSortedAndUnique(this.getInputs().map(function(input) {
			
				// Return input's hash
				return input.getHash();
				
			})) === false) {
			
				// Return false
				return false;
			}
			
			// Check if outputs aren't sorted and unique
			if(Slate.isSortedAndUnique(this.getOutputs().map(function(output) {
			
				// Return output's hash
				return output.getHash();
				
			})) === false) {
			
				// Return false
				return false;
			}
			
			// Try
			try {
			
				// Check if kernels aren't sorted and unique
				if(Slate.isSortedAndUnique(this.getKernels().map(function(kernel) {
				
					// Return kernel's hash
					return kernel.getHash();
					
				})) === false) {
				
					// Return false
					return false;
				}
			}
			
			// Catch errors
			catch(error) {
			
				// Return false
				return false;
			}
			
			// Return true
			return true;
		}
		
		// Verify no cut through
		verifyNoCutThrough() {
		
			// Initialize serialized hashes
			var serializedHashes = [];
			
			// Go through all inputs
			for(var i = 0; i < this.getInputs()["length"]; ++i) {
			
				// Get input's serialized hash
				var serializedHash = this.getInputs()[i].getHash().serialize();
				
				// Check if serialized hash already exists in the list
				if(serializedHashes.indexOf(serializedHash) !== Common.INDEX_NOT_FOUND) {
				
					// Return false
					return false;
				}
				
				// Append serialized hash to list
				serializedHashes.push(serializedHash);
			}
			
			// Go through all outputs
			for(var i = 0; i < this.getOutputs()["length"]; ++i) {
			
				// Get input's serialized hash
				var serializedHash = this.getOutputs()[i].getHash().serialize();
				
				// Check if serialized hash already exists in the list
				if(serializedHashes.indexOf(serializedHash) !== Common.INDEX_NOT_FOUND) {
				
					// Return false
					return false;
				}
				
				// Append serialized hash to list
				serializedHashes.push(serializedHash);
			}
			
			// Return true
			return true;
		}
		
		// Verify fees
		verifyFees(baseFee) {
		
			// Get the required transaction fee
			var transactionFee = Slate.getRequiredFee(this.getInputs()["length"], this.getOutputs()["length"], this.getKernels()["length"], baseFee);
			
			// Check if transaction fee is greater than the overage
			if(transactionFee.isGreaterThan(this.getOverage()) === true) {
			
				// Return false
				return false;
			}
			
			// Check if transaction fee is greater than the received amount
			if(transactionFee.isGreaterThan(this.getAmount().plus(this.getFee())) === true) {
			
				// Return false
				return false;
			}
			
			// Check if transaction fee is less than the minimum fee
			if(transactionFee.isLessThan(Slate.MINIMUM_FEE) === true) {
			
				// Return false
				return false;
			}
		
			return true;
		}
		
		// Verify kernel sums
		verifyKernelSums() {
		
			// Set kernel excesses to all kernel's excesses
			var kernelExcesses = this.getKernels().map(function(kernel) {
			
				// Return kernel's excess
				return kernel.getExcess();
			});
			
			// Go through all kernel excesses
			for(var i = 0; i < kernelExcesses["length"]; ++i) {
			
				// Get kernel excess
				var kernelExcess = kernelExcesses[i];
				
				// Check if kernel excess is a zero commit
				if(Common.arraysAreEqual(kernelExcess, Slate.ZERO_COMMIT) === true) {
				
					// Remove kernel excess from list
					kernelExcesses.splice(i--, 1);
				}
			}
			
			// Check if getting kernels sum from kernel excesses failed
			var kernelsSum = Secp256k1Zkp.pedersenCommitSum(kernelExcesses, []);
			
			if(kernelsSum === Secp256k1Zkp.OPERATION_FAILED) {
			
				// Return false
				return false;
			}
			
			// Initialize kernel commits
			var kernelCommits = [
			
				// Kernels sum
				kernelsSum
			];
			
			// Try
			try {
			
				// Get offset excess
				var offsetExcess = this.getOffsetExcess();
			}
			
			// Catch errors
			catch(error) {
			
				// Return false
				return false;
			}
			
			// Append offset excess to kernel commits
			kernelCommits.push(offsetExcess);
			
			// Check if getting kernels sum with offset from kernel commits failed
			var kernelsSumWithOffset = Secp256k1Zkp.pedersenCommitSum(kernelCommits, []);
			
			if(kernelsSumWithOffset === Secp256k1Zkp.OPERATION_FAILED) {
			
				// Return false
				return false;
			}
			
			// Check if getting commits sum failed
			var commitsSum = this.getCommitsSum();
			
			if(commitsSum === false) {
			
				// Return false
				return false;
			}
			
			// Check if commits sum isn't equal to the kernels sum with offset
			if(Common.arraysAreEqual(commitsSum, kernelsSumWithOffset) === false) {
			
				// Return false
				return false;
			}
			
			// Return true
			return true;
		}
		
		// Get kernel features
		getKernelFeatures() {
		
			// Check if lock height exists
			if(this.getLockHeight().isEqualTo(Slate.NO_LOCK_HEIGHT) === false) {
			
				// Return height locked kernel features
				return SlateKernel.HEIGHT_LOCKED_FEATURES;
			}
			
			// Check if relative height exists
			else if(this.getRelativeHeight() !== Slate.NO_RELATIVE_HEIGHT) {
			
				// Return no recent duplicate kernel features
				return SlateKernel.NO_RECENT_DUPLICATE_FEATURES;
			}
			
			// Otherwise
			else {
			
				// Return plain kernel features
				return SlateKernel.PLAIN_FEATURES;
			}
		}
		
		// Get overage
		getOverage() {
		
			// Initialize overage
			var overage = new BigNumber(0);
		
			// Go through all kernels
			for(var i = 0; i < this.getKernels()["length"]; ++i) {
			
				// Get kernel
				var kernel = this.getKernels()[i];
				
				// Check kernel's features
				switch(kernel.getFeatures()) {
				
					// Plain, height locked, or no recent duplicate features
					case SlateKernel.PLAIN_FEATURES:
					case SlateKernel.HEIGHT_LOCKED_FEATURES:
					case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
					
						// Add kernel's fee to overage
						overage = overage.plus(kernel.getFee());
						
						// Break
						break;
				}
			}
			
			// Return overage
			return overage;
		}
		
		// Get commits sum
		getCommitsSum() {
		
			// Set input commits to all input's commits
			var inputCommits = this.getInputs().map(function(input) {
			
				// Return input's commit
				return input.getCommit();
			});
			
			// Set output commits to all output's commits
			var outputCommits = this.getOutputs().map(function(output) {
			
				// Return output's commit
				return output.getCommit();
			});
		
			// Get overage
			var overage = this.getOverage();
			
			// Check if overage isn't zero
			if(overage.isZero() === false) {
			
				// Try
				try {
			
					// Get over commit from the overage's absolute value
					var overCommit = Crypto.commitAmount(overage.absoluteValue());
				}
				
				// Catch errors
				catch(error) {
				
					// Return false
					return false;
				}
				
				// Check if overage is negative
				if(overage.isNegative() === true) {
				
					// Append over commit to input commits
					inputCommits.push(overCommit);
				}
				
				// Otherwise
				else {
				
					// Append over commit to output commits
					outputCommits.push(overCommit);
				}
			}
			
			// Go through all input commits
			for(var i = 0; i < inputCommits["length"]; ++i) {
			
				// Get input commit
				var inputCommit = inputCommits[i];
				
				// Check if input commit is a zero commit
				if(Common.arraysAreEqual(inputCommit, Slate.ZERO_COMMIT) === true) {
				
					// Remove input commit from list
					inputCommits.splice(i--, 1);
				}
			}
			
			// Go through all output commits
			for(var i = 0; i < outputCommits["length"]; ++i) {
			
				// Get output commit
				var outputCommit = outputCommits[i];
				
				// Check if output commit is a zero commit
				if(Common.arraysAreEqual(outputCommit, Slate.ZERO_COMMIT) === true) {
				
					// Remove output commit from list
					outputCommits.splice(i--, 1);
				}
			}
			
			// Check if getting commits sum from output commits and input commits failed
			var commitsSum = Secp256k1Zkp.pedersenCommitSum(outputCommits, inputCommits);
			
			if(commitsSum === Secp256k1Zkp.OPERATION_FAILED) {
			
				// Return false
				return false;
			}
			
			// Return commits sum
			return commitsSum;
		}
		
		// Update kernel
		updateKernel() {
		
			// Remove all kernels
			this.kernels = [];
			
			// Check kernel features
			switch(this.getKernelFeatures()) {
			
				// Plain features
				case SlateKernel.PLAIN_FEATURES:
				
					// Set kernel fee to fee
					var kernelFee = this.getFee();
					
					// Set kernel lock height to no lock height
					var kernelLockHeight = Slate.NO_LOCK_HEIGHT;
					
					// Set kernel relative height to no relative height
					var kernelRelativeHeight = Slate.NO_RELATIVE_HEIGHT;
				
					// Break
					break;
				
				// Height locked features
				case SlateKernel.HEIGHT_LOCKED_FEATURES:
				
					// Set kernel fee to fee
					var kernelFee = this.getFee();
					
					// Set kernel lock height to lock height
					var kernelLockHeight = this.getLockHeight();
					
					// Set kernel relative height to no relative height
					var kernelRelativeHeight = Slate.NO_RELATIVE_HEIGHT;
				
					// Break
					break;
				
				// No recent duplpicate features
				case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
				
					// Set kernel fee to fee
					var kernelFee = this.getFee();
					
					// Set kernel lock height to no lock height
					var kernelLockHeight = Slate.NO_LOCK_HEIGHT;
					
					// Set kernel relative height to relative height
					var kernelRelativeHeight = this.getRelativeHeight();
				
					// Break
					break;
			}
			
			// Create kernel with kernel features, kernel fee, and kernel lock height
			var kernel = new SlateKernel(this.getKernelFeatures(), kernelFee, kernelLockHeight, kernelRelativeHeight);
			
			// Append kernel to list
			this.kernels.push(kernel);
		}
		
		// Sort
		sort() {
		
			// Sort the inputs
			this.inputs.sort(function(inputOne, inputTwo) {
			
				// Return the result of comparing the input's hashes
				return inputOne.getHash().compare(inputTwo.getHash());
			});
			
			// Sort the outputs
			this.outputs.sort(function(outputOne, outputTwo) {
			
				// Return the result of comparing the output's hashes
				return outputOne.getHash().compare(outputTwo.getHash());
			});
			
			// Try
			try {
			
				// Sort the kernels
				this.kernels.sort(function(kernelOne, kernelTwo) {
				
					// Return the result of comparing the kernel's hashes
					return kernelOne.getHash().compare(kernelTwo.getHash());
				});
			}
			
			// Catch errors
			catch(error) {
			
				// Return false
				return false;
			}
			
			// Return true
			return true;
		}
		
		// Has payment proof
		hasPaymentProof() {
		
			// Return if receiver address and sender address exist
			return this.getReceiverAddress() !== Slate.NO_RECEIVER_ADDRESS && this.getSenderAddress() !== Slate.NO_SENDER_ADDRESS;
		}
		
		// Create partial signature
		createPartialSignature(secretKeyOrHardwareWallet, secretNonce, isNewParticipant, isMainnet, hardwareWalletLockedText = HardwareWallet.NO_TEXT, hardwareWalletLockedTextArguments = [], allowUnlock = false, preventMessages = false, cancelOccurred = Common.NO_CANCEL_OCCURRED) {
		
			// Set self
			var self = this;
			
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Get public blind excess
				var getPublicBlindExcess = function() {
				
					// Return promise
					return new Promise(function(resolve, reject) {
				
						// Check if a secret key is provided
						if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
						
							// Get secret key
							var secretKey = secretKeyOrHardwareWallet;
						
							// Check if getting public blind excess from secret key failed
							var publicBlindExcess = Secp256k1Zkp.publicKeyFromSecretKey(secretKey);
							
							if(publicBlindExcess === Secp256k1Zkp.OPERATION_FAILED) {
							
								// Reject error
								reject("Getting public blind excess failed.");
							}
							
							// Otherwise
							else {
							
								// Resolve public blind excess
								resolve(publicBlindExcess);
							}
						}
						
						// Otherwise
						else {
						
							// Get hardware wallet
							var hardwareWallet = secretKeyOrHardwareWallet;
							
							// Return getting the transaction public key with the hardware wallet
							return hardwareWallet.getTransactionPublicKey(hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(publicBlindExcess) {
							
								// Resolve public blind excess
								resolve(publicBlindExcess);
							
							// Catch errors
							}).catch(function(error) {
							
								// Reject error
								reject(error);
							});
						}
					});
				};
				
				// Return getting public blind excess
				return getPublicBlindExcess().then(function(publicBlindExcess) {
				
					// Get public nonce
					var getPublicNonce = function() {
					
						// Return promise
						return new Promise(function(resolve, reject) {
						
							// Check if a secret key is provided
							if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
							
								// Check if getting a public nonce from secret nonce failed
								var publicNonce = Secp256k1Zkp.publicKeyFromSecretKey(secretNonce);
								
								if(publicNonce === Secp256k1Zkp.OPERATION_FAILED) {
								
									// Reject error
									reject("Getting a public nonce failed.");
								}
								
								// Otherwise
								else {
								
									// Resolve public nonce
									resolve(publicNonce);
								}
							}
							
							// Otherwise
							else {
							
								// Get hardware wallet
								var hardwareWallet = secretKeyOrHardwareWallet;
								
								// Return getting the transaction public nonce with the hardware wallet
								return hardwareWallet.getTransactionPublicNonce(hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(publicNonce) {
								
									// Resolve public nonce
									resolve(publicNonce);
								
								// Catch errors
								}).catch(function(error) {
								
									// Reject error
									reject(error);
								});
							}
						});
					};
					
					// Return getting public nonce
					return getPublicNonce().then(function(publicNonce) {
				
						// Try
						try {
						
							// Get message to sign
							var messageToSign = SlateKernel.signatureMessage(self.getKernelFeatures(), self.getFee(), self.getLockHeight(), self.getRelativeHeight());
						}
						
						// Catch errors
						catch(error) {
						
							// Reject error
							reject("Getting message to sign failed.");
							
							// Return
							return;
						}
						
						// Get participants public nonces
						var publicNonces = self.getParticipants().map(function(participant) {
						
							// Return participant's public nonce
							return participant.getPublicNonce();
						});
						
						// Check if is new participant
						if(isNewParticipant === true) {
						
							// Append public nonce to list
							publicNonces.push(publicNonce);
						}
						
						// Get public nonce sum from combining participant's public nonces
						var publicNonceSum = Secp256k1Zkp.combinePublicKeys(publicNonces);
						
						// Check if getting public nonce sum failed
						if(publicNonceSum === Secp256k1Zkp.OPERATION_FAILED) {
						
							// Reject error
							reject("Getting public nonce sum failed.");
						}
						
						// Otherwise
						else {
						
							// Get participants public blind excesses
							var publicBlindExcesses = self.getParticipants().map(function(participant) {
							
								// Return participant's public blind excess
								return participant.getPublicBlindExcess();
							});
							
							// Check if is new participant
							if(isNewParticipant === true) {
							
								// Append public blind excess to list
								publicBlindExcesses.push(publicBlindExcess);
							}
							
							// Get public blind excess sum from combining participant's public blind excesses
							var publicBlindExcessSum = Secp256k1Zkp.combinePublicKeys(publicBlindExcesses);
							
							// Check if getting public blind excess sum failed
							if(publicBlindExcessSum === Secp256k1Zkp.OPERATION_FAILED) {
							
								// Reject error
								reject("Getting public blind excess sum failed.");
							}
							
							// Otherwise
							else {
							
								// Get partial signature
								var getPartialSignature = function() {
								
									// Return promise
									return new Promise(function(resolve, reject) {
									
										// Check if a secret key is provided
										if(secretKeyOrHardwareWallet instanceof Uint8Array === true) {
										
											// Get secret key
											var secretKey = secretKeyOrHardwareWallet;
											
											// Check if creating partial signature from the message to sign, secret key, secret nonce, public blind excess sum, and public nonce sum failed
											var partialSignature = Secp256k1Zkp.createSingleSignerSignature(messageToSign, secretKey, secretNonce, publicBlindExcessSum, publicNonceSum, publicNonceSum);
											
											if(partialSignature === Secp256k1Zkp.OPERATION_FAILED) {
											
												// Reject error
												reject("Creating partial signature failed.");
											}
											
											// Otherwise
											else {
											
												// Resolve partial signature
												resolve(partialSignature);
											}
										}
										
										// Otherwise
										else {
										
											// Get hardware wallet
											var hardwareWallet = secretKeyOrHardwareWallet;
											
											// Try
											try {
											
												// Get excess
												var excess = self.getExcess((isNewParticipant === true) ? publicBlindExcess : Slate.NO_PUBLIC_BLIND_EXCESS);
											}
											
											// Catch errors
											catch(error) {
											
												// Reject error
												reject(error);
												
												// Return
												return;
											}
											
											// Check if not a new participant
											if(isNewParticipant === false) {
												
												// Return getting transaction information with the public nonce sum, public blind excess sum, kernel information, and payment proof information with the hardware wallet
												return hardwareWallet.getTransactionInformation(publicNonceSum, publicBlindExcessSum, self.getKernelFeatures(), self.getLockHeight(), self.getRelativeHeight(), (self.getSenderAddress() !== Slate.NO_SENDER_ADDRESS) ? excess : HardwareWallet.NO_KERNEL_COMMIT, self.getSenderAddress(), self.getReceiverSignature(), hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(transactionInformation) {
												
													// Resolve partial signature
													resolve(transactionInformation[HardwareWallet.TRANSACTION_INFORMATION_SIGNATURE_INDEX]);
												
												// Catch errors
												}).catch(function(error) {
												
													// Reject error
													reject(error);
												});
											}
											
											// Otherwise
											else {
											
												// Return getting transaction information with the public nonce sum, public blind excess sum, and kernel information with the hardware wallet
												return hardwareWallet.getTransactionInformation(publicNonceSum, publicBlindExcessSum, self.getKernelFeatures(), self.getLockHeight(), self.getRelativeHeight(), (self.getSenderAddress() !== Slate.NO_SENDER_ADDRESS) ? excess : HardwareWallet.NO_KERNEL_COMMIT, self.getReceiverAddress(), Slate.NO_RECEIVER_SIGNATURE, hardwareWalletLockedText, hardwareWalletLockedTextArguments, allowUnlock, preventMessages, cancelOccurred).then(function(transactionInformation) {
												
													// Check if transaction information contains a payment proof
													if(transactionInformation[HardwareWallet.TRANSACTION_INFORMATION_PAYMENT_PROOF_INDEX] !== HardwareWallet.NO_PAYMENT_PROOF) {
													
														// Set receiver signature
														self.setReceiverSignature(transactionInformation[HardwareWallet.TRANSACTION_INFORMATION_PAYMENT_PROOF_INDEX]);
														
														// Resolve partial signature
														resolve(transactionInformation[HardwareWallet.TRANSACTION_INFORMATION_SIGNATURE_INDEX]);
													}
													
													// Otherwise
													else {
												
														// Resolve partial signature
														resolve(transactionInformation[HardwareWallet.TRANSACTION_INFORMATION_SIGNATURE_INDEX]);
													}
												
												// Catch errors
												}).catch(function(error) {
												
													// Reject error
													reject(error);
												});
											}
										}
									});
								};
								
								// Return getting the partial signature
								return getPartialSignature().then(function(partialSignature) {
								
									// Resolve partial signature
									resolve(partialSignature);
								
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
				
				// Catch errors
				}).catch(function(error) {
				
					// Reject error
					reject(error);
				});
			});
		}
		
		// Verify after finalize
		verifyAfterFinalize(baseFee, isMainnet) {
		
			// Check if sorting failed
			if(this.sort() === false) {
			
				// Return false
				return false;
			}
			
			// Otherwise check if verifying weight failed
			else if(this.verifyWeight() === false) {
			
				// Return false
				return false;
			}
			
			// Otherwise check if verifying sorted and unique failed
			else if(this.verifySortedAndUnique() === false) {
			
				// Return false
				return false;
			}
			
			// Otherwise check if verifying no cut through failed
			else if(this.verifyNoCutThrough() === false) {
			
				// Return false
				return false;
			}
			
			// Otherwise check if verifying fees failed
			else if(this.verifyFees(baseFee) === false) {
			
				// Return false
				return false;
			}
			
			// Otherwise check if kernel isn't complete
			else if(this.getKernels()[0].isComplete() === false) {
			
				// Return false
				return false;
			}
			
			// Otherwise check if verifying kernel sums failed
			else if(this.verifyKernelSums() === false) {
			
				// Return false
				return false;
			}
			
			// Otherwise check if has payment proof and the receiver signature doesn't exist
			else if(this.hasPaymentProof() === true && this.getReceiverSignature() === Slate.NO_RECEIVER_SIGNATURE) {
			
				// Return false
				return false;
			}
			
			// Otherwise check if receiver signature failed to be verified
			else if(this.verifyReceiverSignature(isMainnet) === false) {
			
				// Return false
				return false;
			}
			
			// Otherwise check if verifying no recent duplicate kernels failed
			else if(this.verifyNoRecentDuplicateKernels(isMainnet) === false) {
			
				// Return false
				return false;
			}
			
			// Otherwise
			else {
			
				// Return true
				return true;
			}
		}
		
		// Get weight
		static getWeight(numberOfInputs, numberOfOutputs, numberOfKernels) {
		
			// Get inputs weight
			var inputsWeight = (new BigNumber(numberOfInputs)).multipliedBy(Consensus.BLOCK_INPUT_WEIGHT);
			
			// Get outputs weight
			var outputsWeight = (new BigNumber(numberOfOutputs)).multipliedBy(Consensus.BLOCK_OUTPUT_WEIGHT);
			
			// Get kernels weight
			var kernelsWeight = (new BigNumber(Math.max(numberOfKernels, 1))).multipliedBy(Consensus.BLOCK_KERNEL_WEIGHT);
			
			// Return sum of weights
			return inputsWeight.plus(outputsWeight).plus(kernelsWeight);
		}
		
		// Detect version
		static detectVersion(serializedSlate, isMainnet) {
		
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// MWC wallet
				case Consensus.MWC_WALLET_TYPE:
		
					// Check if a binary serialized slate is provided
					if(serializedSlate instanceof Uint8Array === true) {
					
						// Return version Slatepack
						return Slate.VERSION_SLATEPACK;
					}
					
					// Otherwise check if serialized slate is an object
					else if(Object.isObject(serializedSlate) === true) {
					
						// Check if serialized slate contains an invalid coin type
						if("coin_type" in serializedSlate === true && serializedSlate["coin_type"] !== Slate.COIN_TYPE) {
						
							// Return unknown version
							return Slate.UNKNOWN_VERSION;
						}
						
						// Otherwise check if serialized slate contains an invalid network type
						else if("network_type" in serializedSlate === true && serializedSlate["network_type"] !== Slate.getNetworkType(isMainnet)) {
						
							// Return unknown version
							return Slate.UNKNOWN_VERSION;
						}
					
						// Otherwise check if serialized slate contains a version info structure
						else if("version_info" in serializedSlate === true && Object.isObject(serializedSlate["version_info"]) === true && "version" in serializedSlate["version_info"] === true && (Common.isNumberString(serializedSlate["version_info"]["version"]) === true || serializedSlate["version_info"]["version"] instanceof BigNumber === true) && (new BigNumber(serializedSlate["version_info"]["version"])).isInteger() === true && (new BigNumber(serializedSlate["version_info"]["version"])).isPositive() === true) {
						
							// Return version info structure's version
							return new BigNumber(serializedSlate["version_info"]["version"]);
						}
						
						// Otherwise check if serialized slate contains a version
						else if("version" in serializedSlate === true && (Common.isNumberString(serializedSlate["version"]) === true || serializedSlate["version"] instanceof BigNumber === true) && (new BigNumber(serializedSlate["version"])).isInteger() === true && (new BigNumber(serializedSlate["version"])).isPositive() === true) {
						
							// Return version one
							return Slate.VERSION_ONE;
						}
						
						// Otherwise
						else {
						
							// Return unknown version
							return Slate.UNKNOWN_VERSION;
						}
					}
					
					// Otherwise
					else {
					
						// Return unknown version
						return Slate.UNKNOWN_VERSION;
					}
					
					// Break
					break;
				
				// GRIN wallet
				case Consensus.GRIN_WALLET_TYPE:
				
					// Check if serialized slate is an object
					if(Object.isObject(serializedSlate) === true) {
				
						// Check if serialized slate contains a version
						if("ver" in serializedSlate === true && typeof serializedSlate["ver"] === "string" && Slate.VERSION_PATTERN.test(serializedSlate["ver"]) === true) {
						
							// Return serialized slate's version
							return new BigNumber(serializedSlate["ver"].split(Slate.VERSION_SEPARATOR)[0]);
						}
							
						// Otherwise
						else {
						
							// Return unknown version
							return Slate.UNKNOWN_VERSION;
						}
					}
					
					// Otherwise check if a binary serialized slate is provided
					else if(serializedSlate instanceof Uint8Array === true) {
					
						// Check if serialized slate contains a version
						if(serializedSlate["length"] >= Common.BYTES_IN_A_UINT16) {
						
							// Return serialized slate's version
							return new BigNumber(Common.HEX_PREFIX + Common.toHexString(serializedSlate.subarray(0, Common.BYTES_IN_A_UINT16)));
						}
						
						// Otherwise
						else {
						
							// Return unknown version
							return Slate.UNKNOWN_VERSION;
						}
					}
						
					// Otherwise
					else {
					
						// Return unknown version
						return Slate.UNKNOWN_VERSION;
					}
					
					// Break
					break;
				
				// EPIC wallet
				case Consensus.EPIC_WALLET_TYPE:
				
					// Check if serialized slate is an object
					if(Object.isObject(serializedSlate) === true) {
		
						// Check if serialized slate contains a version info structure
						if("version_info" in serializedSlate === true && Object.isObject(serializedSlate["version_info"]) === true && "version" in serializedSlate["version_info"] === true && (Common.isNumberString(serializedSlate["version_info"]["version"]) === true || serializedSlate["version_info"]["version"] instanceof BigNumber === true) && (new BigNumber(serializedSlate["version_info"]["version"])).isInteger() === true && (new BigNumber(serializedSlate["version_info"]["version"])).isPositive() === true) {
						
							// Return version info structure's version
							return new BigNumber(serializedSlate["version_info"]["version"]);
						}
						
						// Otherwise check if serialized slate contains a version
						else if("version" in serializedSlate === true && (Common.isNumberString(serializedSlate["version"]) === true || serializedSlate["version"] instanceof BigNumber === true) && (new BigNumber(serializedSlate["version"])).isInteger() === true && (new BigNumber(serializedSlate["version"])).isPositive() === true) {
						
							// Return version one
							return Slate.VERSION_ONE;
						}
						
						// Otherwise
						else {
						
							// Return unknown version
							return Slate.UNKNOWN_VERSION;
						}
					}
						
					// Otherwise
					else {
					
						// Return unknown version
						return Slate.UNKNOWN_VERSION;
					}
					
					// Break
					break;
			}
		}
		
		// Is sorted and unique
		static isSortedAndUnique(hashes) {
		
			// Go through all hashes
			for(var i = 1; i < hashes["length"]; ++i) {
			
				// Get last hash
				var lastHash = hashes[i - 1];
				
				// Get current hash
				var currentHash = hashes[i];
				
				// Get result of comparing the hashes
				var compareResult = currentHash.compare(lastHash);
				
				// Check if current hash is less than or equal to the last hash
				if(compareResult === Common.SORT_LESS_THAN || compareResult === Common.SORT_EQUAL)
				
					// Return false
					return false;
			}
		
			// Return true
			return true;
		}
		
		// Get network type
		static getNetworkType(isMainnet) {
		
			// Check if is mainnet
			if(isMainnet === true) {
			
				// Return network type
				return "mainnet";
			}
			
			// Otherwise
			else {
			
				// Return network type
				return "floonet";
			}
		}
		
		
		
		// Uncompact proof address
		static uncompactProofAddress(bitReader, isMainnet) {
		
			// Check if proof address is MQS proof address
			if(bitReader.getBits(Slate.COMPACT_BOOLEAN_LENGTH) === Slate.COMPACT_BOOLEAN_TRUE) {
			
				// Get proof address
				var proofAddress = Mqs.publicKeyToMqsAddress(Slate.uncompactPublicKey(bitReader), isMainnet);
			}
			
			// Otherwise
			else {
			
				// Get proof address
				var proofAddress = Tor.publicKeyToTorAddress(bitReader.getBytes(Crypto.ED25519_PUBLIC_KEY_LENGTH));
			}
			
			// Return proof address
			return proofAddress;
		}
		
		// Compact proof address
		static compactProofAddress(proofAddress, isMainnet, bitWriter) {
		
			// Check proof address's length
			switch(proofAddress["length"]) {
			
				// MQS address length
				case Mqs.ADDRESS_LENGTH:
				
					// Write that proof address is an MQS proof address
					bitWriter.setBits(Slate.COMPACT_BOOLEAN_TRUE, Slate.COMPACT_BOOLEAN_LENGTH);
					
					// Write proof address
					Slate.compactPublicKey(Mqs.mqsAddressToPublicKey(proofAddress, isMainnet), bitWriter);
					
					// Break
					break;
			
				// Tor address length
				case Tor.ADDRESS_LENGTH:
				
					// Write that proof address is a Tor proof address
					bitWriter.setBits(Slate.COMPACT_BOOLEAN_FALSE, Slate.COMPACT_BOOLEAN_LENGTH);
					
					// Write proof address
					bitWriter.setBytes(Tor.torAddressToPublicKey(proofAddress));
				
					// Break
					break;
			}
		}
		
		// Purpose to text
		static purposeToText(purpose) {
		
			// Check purpose
			switch(purpose) {
			
				// Send initial purpose
				case Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL:
				
					// Return purpose as text
					return "S1";
				
				// Send response purpose
				case Slate.COMPACT_SLATE_PURPOSE_SEND_RESPONSE:
				
					// Return purpose as text
					return "S2";
			}
		}
		
		// Send request
		static sendRequest(request, transfer) {
		
			// Get current request index
			var currentRequestIndex = Slate.requestIndex++;
			
			// Check if current request index is at the max safe integer
			if(currentRequestIndex === Number.MAX_SAFE_INTEGER)
			
				// Reset request index
				Slate.requestIndex = 0;
			
			// Add current request index to request
			request.unshift(currentRequestIndex);
			
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Response current request index event
				$(document).one(Slate.RESPONSE_EVENT + currentRequestIndex.toFixed(), function(event, response) {
				
					// Resolve response
					resolve(response);
				});
			
				// Send worker the request
				Slate.worker.postMessage(request, transfer);
			});
		}
		
		// Version one
		static get VERSION_ONE() {
		
			// Return version one
			return new BigNumber(1);
		}
		
		// Version two
		static get VERSION_TWO() {
		
			// Return version two
			return new BigNumber(2);
		}
		
		// Version three
		static get VERSION_THREE() {
		
			// Return version three
			return new BigNumber(3);
		}
		
		// Version four
		static get VERSION_FOUR() {
		
			// Return version four
			return new BigNumber(4);
		}
		
		// Version Slatepack
		static get VERSION_SLATEPACK() {
		
			// Return version Slatepack
			return "SP";
		}
		
		// Unknown version
		static get UNKNOWN_VERSION() {
		
			// Return unknown version
			return null;
		}
		
		// No lock height
		static get NO_LOCK_HEIGHT() {
		
			// Return no lock height
			return new BigNumber(0);
		}
		
		// No relative height
		static get NO_RELATIVE_HEIGHT() {
		
			// Return no relative height
			return null;
		}
		
		// Minimum number of participants
		static get MINIMUM_NUMBER_OF_PARTICIPANTS() {
		
			// Return minimum number of participants
			return 2;
		}
		
		// Zero offset
		static get ZERO_OFFSET() {
		
			// No zero offset
			return Crypto.ZERO_BLINDING_FACTOR;
		}
		
		// No participant
		static get NO_PARTICIPANT() {
		
			// Return no participant
			return null;
		}
		
		// No receiver address
		static get NO_RECEIVER_ADDRESS() {
		
			// Return no receiver address
			return null;
		}
		
		// No receiver signature
		static get NO_RECEIVER_SIGNATURE() {
		
			// Return no receiver signature
			return null;
		}
		
		// No sender address
		static get NO_SENDER_ADDRESS() {
		
			// Return no sender address
			return null;
		}
		
		// Zero commit
		static get ZERO_COMMIT() {
		
			// Return zero commit
			return (new Uint8Array(Crypto.COMMIT_LENGTH)).fill(0);
		}
		
		// Body weight output factor
		static get BODY_WEIGHT_OUTPUT_FACTOR() {
		
			// Return body weight output factor
			return 4;
		}
		
		// Minimum body weight
		static get MINIMUM_BODY_WEIGHT() {
		
			// Return minimum body weight
			return 1;
		}
		
		// Default number of participants
		static get DEFAULT_NUMBER_OF_PARTICIPANTS() {
		
			// Return default number of participants
			return new BigNumber(2);
		}
		
		// Coin type
		static get COIN_TYPE() {
		
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// MWC wallet
				case Consensus.MWC_WALLET_TYPE:
				
					// Return coin type
					return "mwc";
			}
		}
		
		// Compact boolean length
		static get COMPACT_BOOLEAN_LENGTH() {
		
			// Return compact boolean length
			return 1;
		}
		
		// Compact boolean false
		static get COMPACT_BOOLEAN_FALSE() {
		
			// Return compact boolean false
			return 0;
		}
		
		// Compact boolean true
		static get COMPACT_BOOLEAN_TRUE() {
		
			// Return compact boolean true
			return Slate.COMPACT_BOOLEAN_FALSE + 1;
		}
		
		// Compact slate purpose length
		static get COMPACT_SLATE_PURPOSE_LENGTH() {
		
			// Return compact slate purpose length
			return 3;
		}
		
		// Compact slate purpose send initial
		static get COMPACT_SLATE_PURPOSE_SEND_INITIAL() {
		
			// Return compact slate purpose send initial
			return 0;
		}
		
		// Compact slate purpose send response
		static get COMPACT_SLATE_PURPOSE_SEND_RESPONSE() {
		
			// Return compact slate purpose send response
			return Slate.COMPACT_SLATE_PURPOSE_SEND_INITIAL + 1;
		}
		
		// Compact proof signature length length
		static get COMPACT_PROOF_SIGNATURE_LENGTH_LENGTH() {
		
			// Return compact proof signature length length
			return 4;
		}
		
		// Compact number of hundreds length
		static get COMPACT_NUMBER_OF_HUNDREDS_LENGTH() {
		
			// Return compact number of hundreds length
			return 3;
		}
		
		// Compact number of digits length
		static get COMPACT_NUMBER_OF_DIGITS_LENGTH() {
		
			// Return compact number of digits length
			return 6;
		}
		
		// Compact hundreds scaling factor
		static get COMPACT_HUNDREDS_SCALING_FACTOR() {
		
			// Return compact hundreds scaling factor
			return 100;
		}
		
		// Compact public key length length
		static get COMPACT_PUBLIC_KEY_LENGTH_LENGTH() {
		
			// Return compact public key length length
			return 7;
		}
		
		// No public blind excess
		static get NO_PUBLIC_BLIND_EXCESS() {
		
			// Return no public blind excess
			return null;
		}
		
		// Version pattern
		static get VERSION_PATTERN() {
		
			// Return version pattern
			return /^(?:0|[1-9]\d*):(?:0|[1-9]\d*)$/u;
		}
		
		// Version separator
		static get VERSION_SEPARATOR() {
		
			// Return version separator
			return ":";
		}
		
		// Minimum amount
		static get MINIMUM_AMOUNT() {
		
			// Return minimum amount
			return 1;
		}
		
		// Message status offset
		static get MESSAGE_STATUS_OFFSET() {
		
			// Return message status offset
			return Slate.MESSAGE_TYPE_OFFSET + 1;
		}
		
		// Message response offset
		static get MESSAGE_RESPONSE_OFFSET() {
		
			// Return message response offset
			return Slate.MESSAGE_TYPE_OFFSET + 1;
		}
		
		// Response event
		static get RESPONSE_EVENT() {
		
			// Return response event
			return "SlateResponseEvent";
		}
		
		// Worker file location
		static get WORKER_FILE_LOCATION() {
		
			// Return worker file location
			return "." + getResource("./scripts/slate_worker.js");
		}
}


// Main function

// Set global object's slate
globalThis["Slate"] = Slate;

// Export slate
module["exports"] = Slate;
