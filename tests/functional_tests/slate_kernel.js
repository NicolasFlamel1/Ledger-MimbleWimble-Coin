// Use strict
"use strict";


// Requires
const BigNumber = require("./bignumber.js-9.1.1.js");
const Common = require("./common.js");
const Crypto = require("./crypto.js");
const Consensus = require("./consensus.js");
const Slate = require("./slate.js");


// Classes

// Slate kernel class
class SlateKernel {

	// Public
	
		// Constructor
		constructor(serializedSlateKernelOrFeatures, slateOrFee, lockHeightOrIsMainnet, relativeHeight = Slate.NO_RELATIVE_HEIGHT, excess = SlateKernel.ZERO_EXCESS, excessSignature = SlateKernel.ZERO_EXCESS_SIGNATURE) {
		
			// Reset
			this.reset();
			
			// Check if a binary serialized slate kernel is provided
			if(serializedSlateKernelOrFeatures instanceof BitReader === true) {
			
				// Get serialized slate kernel
				var serializedSlateKernel = serializedSlateKernelOrFeatures;
				
				// Get slate
				var slate = slateOrFee;
				
				// Get is mainnet
				var isMainnet = lockHeightOrIsMainnet;
			
				// Unserialize the serialized slate kernel
				this.unserialize(serializedSlateKernel, slate, isMainnet);
			}
			
			// Otherwise check if a serialized slate kernel is provided
			else if(Object.isObject(serializedSlateKernelOrFeatures) === true) {
			
				// Get serialized slate kernel
				var serializedSlateKernel = serializedSlateKernelOrFeatures;
				
				// Get slate
				var slate = slateOrFee;
				
				// Get is mainnet
				var isMainnet = lockHeightOrIsMainnet;
			
				// Unserialize the serialized slate kernel
				this.unserialize(serializedSlateKernel, slate, isMainnet);
			}
			
			// Otherwise check if arguments are provided
			else if(typeof serializedSlateKernelOrFeatures === "number") {
			
				// Get features
				var features = serializedSlateKernelOrFeatures;
				
				// Get fee
				var fee = slateOrFee;
				
				// Get lock height
				var lockHeight = lockHeightOrIsMainnet;
				
				// Set features to provided features
				this.features = features;
				
				// Set fee to provided fee
				this.fee = fee;
				
				// Set lock height to provided lock height
				this.lockHeight = lockHeight;
				
				// Set relative height to provided relative height
				this.relativeHeight = relativeHeight;
				
				// Set excess to provided excess
				this.excess = excess;
				
				// Set excess signature to provided excess signature
				this.excessSignature = excessSignature;
				
				// Check if complete
				if(this.isComplete() === true) {
				
					// Check if excess signature failed to be verified
					if(this.verifyExcessSignature() === false) {
					
						// Throw error
						throw "Unsupported kernel.";
					}
				}
			}
			
			// Otherwise
			else {
			
				// Throw error
				throw "Unsupported kernel.";
			}
		}
		
		// Serialize
		serialize(slateOrVersion, bitWriter) {
		
			// Get slate version
			var slateVersion = (slateOrVersion instanceof Slate === true) ? slateOrVersion.getVersion() : slateOrVersion;
		
			// Check slate's version
			switch((slateVersion instanceof BigNumber === true) ? slateVersion.toFixed() : slateVersion) {
			
				// Version two and three
				case Slate.VERSION_TWO.toFixed():
				case Slate.VERSION_THREE.toFixed():
		
					// Create serialized slate kernel
					var serializedSlateKernel = {
					
						// Features
						"features": SlateKernel.featuresToText(this.getFeatures()),
						
						// Excess signature
						"excess_sig": Common.toHexString(this.getExcessSignature()),
						
						// Excess
						"excess": Common.toHexString(this.getExcess())
					};
					
					// Check features
					switch(this.getFeatures()) {
					
						// Coinbase features
						case SlateKernel.COINBASE_FEATURES:
						
							// Set serialized slate kernel's fee to zero
							serializedSlateKernel["fee"] = (new BigNumber(0)).toFixed();
							
							// Set serialized slate kernel's lock height to no lock height
							serializedSlateKernel["lock_height"] = Slate.NO_LOCK_HEIGHT.toFixed();
						
							// Break
							break;
					
						// Plain features
						case SlateKernel.PLAIN_FEATURES:
					
							// Set serialized slate kernel's fee to fee
							serializedSlateKernel["fee"] = this.getFee().toFixed();
							
							// Set serialized slate kernel's lock height to no lock height
							serializedSlateKernel["lock_height"] = Slate.NO_LOCK_HEIGHT.toFixed();
							
							// Break
							break;
						
						// Height locked features
						case SlateKernel.HEIGHT_LOCKED_FEATURES:
						
							// Set serialized slate kernel's fee to fee
							serializedSlateKernel["fee"] = this.getFee().toFixed();
							
							// Set serialized slate kernel's lock height to lock height
							serializedSlateKernel["lock_height"] = this.getLockHeight().toFixed();
							
							// Break
							break;
						
						// No recent duplicate features
						case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
						
							// Set serialized slate kernel's fee to fee
							serializedSlateKernel["fee"] = this.getFee().toFixed();
							
							// Set serialized slate kernel's relative height to relative height
							serializedSlateKernel["relative_height"] = this.getRelativeHeight().toFixed();
							
							// Break
							break;
					}
					
					// Return serialized slate kernel
					return serializedSlateKernel;
				
				// Version Slatepack
				case Slate.VERSION_SLATEPACK:
				
					// Try
					try {
				
						// Check features
						switch(this.getFeatures()) {
						
							// Plain features
							case SlateKernel.PLAIN_FEATURES:
							
								// Write fee
								Slate.compactUint64(this.getFee(), true, bitWriter);
							
								// Break
								break;
							
							// Default
							default:
							
								// Throw error
								throw "Unsupported features.";
						}
						
						// Write excess
						bitWriter.setBytes(this.getExcess());
						
						// Write excess signature
						bitWriter.setBytes(this.getExcessSignature());
					}
					
					// Catch errors
					catch(error) {
					
						// Throw error
						throw "Unsupported kernel.";
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
		
			// Create transaction
			var transaction = {
			
				// Excess signature
				"excess_sig": Common.toHexString(this.getExcessSignature()),
				
				// Excess
				"excess": Common.toHexString(this.getExcess())
			};
			
			// Check features
			switch(this.getFeatures()) {
			
				// Coinbase features
				case SlateKernel.COINBASE_FEATURES:
				
					// Set transaction's features
					transaction["features"] = {
					
						// Feature
						[SlateKernel.featuresToText(this.getFeatures())]: {}
					};
				
					// Break
					break;
			
				// Plain features
				case SlateKernel.PLAIN_FEATURES:
				
					// Set transaction's features
					transaction["features"] = {
					
						// Feature
						[SlateKernel.featuresToText(this.getFeatures())]: {
						
							// Fee
							"fee": this.getFee()
						}
					};
			
					// Break
					break;
				
				// Height locked features
				case SlateKernel.HEIGHT_LOCKED_FEATURES:
				
					// Set transaction's features
					transaction["features"] = {
					
						// Feature
						[SlateKernel.featuresToText(this.getFeatures())]: {
						
							// Fee
							"fee": this.getFee(),
							
							// Lock height
							"lock_height": this.getLockHeight()
						}
					};
				
					// Break
					break;
				
				// No recent duplicate features
				case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
				
					// Set transaction's features
					transaction["features"] = {
					
						// Feature
						[SlateKernel.featuresToText(this.getFeatures())]: {
						
							// Fee
							"fee": this.getFee(),
							
							// Relative height
							"relative_height": this.getRelativeHeight()
						}
					};
					
					// Break
					break;
			}
			
			// Return transaction
			return transaction;
		}
		
		// Get features
		getFeatures() {
		
			// Return features
			return this.features;
		}
		
		// Get fee
		getFee() {
		
			// Return fee
			return this.fee;
		}
		
		// Get lock height
		getLockHeight() {
		
			// Return lock height
			return this.lockHeight;
		}
		
		// Relative height
		getRelativeHeight() {
		
			// Return relative height
			return this.relativeHeight;
		}
		
		// Get excess signature
		getExcessSignature() {
		
			// Return excess signature
			return this.excessSignature;
		}
		
		// Set excess signature
		setExcessSignature(excessSignature) {
		
			// Set excess signature
			this.excessSignature = excessSignature;
			
			// Check if complete
			if(this.isComplete() === true) {
			
				// Check if excess signature failed to be verified
				if(this.verifyExcessSignature() === false) {
				
					// Return false
					return false;
				}
			}
			
			// Return true
			return true;
		}
		
		// Get excess
		getExcess() {
		
			// Return excess
			return this.excess;
		}
		
		// Set excess
		setExcess(excess) {
		
			// Set excess
			this.excess = excess;
		}
		
		// Is plain
		isPlain() {
		
			// Return if features is plain
			return this.getFeatures() === SlateKernel.PLAIN_FEATURES;
		}
		
		// Is coinbase
		isCoinbase() {
		
			// Return if features is coinbase
			return this.getFeatures() === SlateKernel.COINBASE_FEATURES;
		}
		
		// Is height locked
		isHeightLocked() {
		
			// Return if features is height locked
			return this.getFeatures() === SlateKernel.HEIGHT_LOCKED_FEATURES;
		}
		
		// Is no recent duplicate
		isNoRecentDuplicate() {
		
			// Return if features is no recent duplicate
			return this.getFeatures() === SlateKernel.NO_RECENT_DUPLICATE_FEATURES;
		}
		
		// Get hash
		getHash() {
		
			// Check features
			switch(this.getFeatures()) {
			
				// Coinbase features
				case SlateKernel.COINBASE_FEATURES:
				
					// Return hash
					return new Hash([
					
						// Features
						new Uint8Array([this.getFeatures()]),
						
						// Zero fee
						(new BigNumber(0)).toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// No lock height
						Slate.NO_LOCK_HEIGHT.toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// Excess
						this.getExcess(),
						
						// Excess signature
						this.getExcessSignature()
					]);
				
				// Plain features
				case SlateKernel.PLAIN_FEATURES:
				
					// Return hash
					return new Hash([
					
						// Features
						new Uint8Array([this.getFeatures()]),
						
						// Fee
						this.getFee().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// No lock height
						Slate.NO_LOCK_HEIGHT.toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// Excess
						this.getExcess(),
						
						// Excess signature
						this.getExcessSignature()
					]);
				
				// Height locked features
				case SlateKernel.HEIGHT_LOCKED_FEATURES:
				
					// Return hash
					return new Hash([
					
						// Features
						new Uint8Array([this.getFeatures()]),
						
						// Fee
						this.getFee().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// Lock height
						this.getLockHeight().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// Excess
						this.getExcess(),
						
						// Excess signature
						this.getExcessSignature()
					]);
				
				// No recent duplicate features
				case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
				
					// Return hash
					return new Hash([
					
						// Features
						new Uint8Array([this.getFeatures()]),
						
						// Fee
						this.getFee().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// Relative height
						this.getRelativeHeight().toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// Excess
						this.getExcess(),
						
						// Excess signature
						this.getExcessSignature()
					]);
			}
		}
		
		// Is equal to
		isEqualTo(slateKernel) {
		
			// Check if features aren't equal
			if(this.getFeatures() !== slateKernel.getFeatures())
			
				// Return false
				return false;
			
			// Check if feed aren't equal
			if(this.getFee().isEqualTo(slateKernel.getFee()) === false)
			
				// Return false
				return false;
			
			// Check if lock heights aren't equal
			if(this.getLockHeight().isEqualTo(slateKernel.getLockHeight()) === false)
			
				// Return false
				return false;
			
			// Check if relative heights aren't equal
			if((this.getRelativeHeight() === Slate.NO_RELATIVE_HEIGHT && slateKernel.getRelativeHeight() !== Slate.NO_RELATIVE_HEIGHT) || (this.getRelativeHeight() !== Slate.NO_RELATIVE_HEIGHT && slateKernel.getRelativeHeight() === Slate.NO_RELATIVE_HEIGHT) || (this.getRelativeHeight() !== Slate.NO_RELATIVE_HEIGHT && this.getRelativeHeight().isEqualTo(slateKernel.getRelativeHeight()) === false))
			
				// Return false
				return false;
			
			// Check if excess signatures aren't equal
			if(Common.arraysAreEqual(this.getExcessSignature(), slateKernel.getExcessSignature()) === false)
			
				// Return false
				return false;
			
			// Check if excesses aren't equal
			if(Common.arraysAreEqual(this.getExcess(), slateKernel.getExcess()) === false)
			
				// Return false
				return false;
			
			// Return true
			return true;
		}
		
		// Is complete
		isComplete() {
		
			// Return if excess signature exists exists
			return Common.arraysAreEqual(this.getExcessSignature(), SlateKernel.ZERO_EXCESS_SIGNATURE) === false;
		}
		
		// Signature message
		static signatureMessage(features, fee = new BigNumber(0), lockHeight = Slate.NO_LOCK_HEIGHT, relativeHeight = Slate.NO_RELATIVE_HEIGHT) {
		
			// Check features
			switch(features) {
			
				// Coinbase features
				case SlateKernel.COINBASE_FEATURES:
				
					// Set data to features
					var data = new Uint8Array([features]);
				
					// Break
					break;
				
				// Plain features
				case SlateKernel.PLAIN_FEATURES:
				
					// Set data to features followed by the fee
					var data = Common.mergeArrays([
					
						// Features
						new Uint8Array([features]),
						
						// Fee
						fee.toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64)
					]);
				
					// Break
					break;
				
				// Height locked features
				case SlateKernel.HEIGHT_LOCKED_FEATURES:
				
					// Set data to features followed by the fee followed by the lock height
					var data = Common.mergeArrays([
					
						// Features
						new Uint8Array([features]),
						
						// Fee
						fee.toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// Lock height
						lockHeight.toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64)
					]);
				
					// Break
					break;
				
				// No recent duplicate features
				case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
				
					// Set data to features followed by the fee followed by the relative height
					var data = Common.mergeArrays([
					
						// Features
						new Uint8Array([features]),
						
						// Fee
						fee.toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT64),
						
						// Relative height
						relativeHeight.toBytes(BigNumber.BIG_ENDIAN, Common.BYTES_IN_A_UINT16)
					]);
				
					// Break
					break;
			}
			
			// Return creating a signature message from the data
			return Crypto.signatureMessage(data);
		}
		
		// Features to text
		static featuresToText(features) {
		
			// Check features
			switch(features) {
			
				// Plain features
				case SlateKernel.PLAIN_FEATURES:
				
					// Return plain text
					return "Plain";
				
				// Coinbase features
				case SlateKernel.COINBASE_FEATURES:
				
					// Return coinbase text
					return "Coinbase";
				
				// Height locked features
				case SlateKernel.HEIGHT_LOCKED_FEATURES:
				
					// Return height locked text
					return "HeightLocked";
				
				// No recent duplicate features
				case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
				
					// Return no recent duplicate text
					return "NoRecentDuplicate";
				
				// Default
				default:
				
					// Return unsupported features
					return SlateKernel.UNSUPPORTED_FEATURES;
			}
		}
		
		// Plain features
		static get PLAIN_FEATURES() {
		
			// Return plain features
			return 0;
		}
		
		// Coinbase features
		static get COINBASE_FEATURES() {
		
			// Return coinbase features
			return SlateKernel.PLAIN_FEATURES + 1;
		}
		
		// Height locked features
		static get HEIGHT_LOCKED_FEATURES() {
		
			// Return height locked features
			return SlateKernel.COINBASE_FEATURES + 1;
		}
		
		// No recent duplicate features
		static get NO_RECENT_DUPLICATE_FEATURES() {
		
			// Return height locked features
			return SlateKernel.HEIGHT_LOCKED_FEATURES + 1;
		}
		
		// Zero excess
		static get ZERO_EXCESS() {
		
			// No zero excess
			return (new Uint8Array(Crypto.COMMIT_LENGTH)).fill(0);
		}
		
		// Zero excess signature
		static get ZERO_EXCESS_SIGNATURE() {
		
			// No zero excess signature
			return (new Uint8Array(Crypto.SINGLE_SIGNER_SIGNATURE_LENGTH)).fill(0);
		}
		
		// Transaction features length
		static get TRANSACTION_FEATURES_LENGTH() {
		
			// Return transaction features length
			return 1;
		}
	
	// Private
	
		// Reset
		reset() {
		
			// Set features to plain features
			this.features = SlateKernel.PLAIN_FEATURES;
			
			// Set fee to minimum fee
			this.fee = new BigNumber(Slate.MINIMUM_FEE);
			
			// Set lock height to no lock height
			this.lockHeight = Slate.NO_LOCK_HEIGHT;
			
			// Set relative height to no relative height
			this.relativeHeight = Slate.NO_RELATIVE_HEIGHT;
			
			// Set excess signature to zero signature
			this.excessSignature = SlateKernel.ZERO_EXCESS_SIGNATURE;
			
			// Set excess to zero excess
			this.excess = SlateKernel.ZERO_EXCESS;
		}
		
		// Unserialize
		unserialize(serializedSlateKernel, slate, isMainnet) {
		
			// Check slate's version
			switch((slate.getVersion() instanceof BigNumber === true) ? slate.getVersion().toFixed() : slate.getVersion()) {
			
				// Version two and three
				case Slate.VERSION_TWO.toFixed():
				case Slate.VERSION_THREE.toFixed():
		
					// Check if serialized slate kernel's features isn't supported
					if("features" in serializedSlateKernel === false || SlateKernel.textToFeatures(serializedSlateKernel["features"]) === SlateKernel.UNSUPPORTED_FEATURES || SlateKernel.textToFeatures(serializedSlateKernel["features"]) === SlateKernel.COINBASE_FEATURES) {
					
						// Throw error
						throw "Unsupported kernel.";
					}
					
					// Set features to serialized slate kernel's features
					this.features = SlateKernel.textToFeatures(serializedSlateKernel["features"]);
					
					// Check features
					switch(this.getFeatures()) {
					
						// Plain features
						case SlateKernel.PLAIN_FEATURES:
						
							// Check if serialized slate kernel's fee isn't supported
							if("fee" in serializedSlateKernel === false || (Common.isNumberString(serializedSlateKernel["fee"]) === false && serializedSlateKernel["fee"] instanceof BigNumber === false) || (new BigNumber(serializedSlateKernel["fee"])).isInteger() === false || (new BigNumber(serializedSlateKernel["fee"])).isLessThan(Slate.MINIMUM_FEE) === true) {
							
								// Throw error
								throw "Unsupported kernel.";
							}
							
							// Set fee to serialized slate kernel's fee
							this.fee = new BigNumber(serializedSlateKernel["fee"]);
						
							// Break
							break;
						
						// Height locked features
						case SlateKernel.HEIGHT_LOCKED_FEATURES:
						
							// Check if serialized slate kernel's fee isn't supported
							if("fee" in serializedSlateKernel === false || (Common.isNumberString(serializedSlateKernel["fee"]) === false && serializedSlateKernel["fee"] instanceof BigNumber === false) || (new BigNumber(serializedSlateKernel["fee"])).isInteger() === false || (new BigNumber(serializedSlateKernel["fee"])).isLessThan(Slate.MINIMUM_FEE) === true) {
							
								// Throw error
								throw "Unsupported kernel.";
							}
							
							// Set fee to serialized slate kernel's fee
							this.fee = new BigNumber(serializedSlateKernel["fee"]);
							
							// Check if serialized slate kernel's lock height isn't supported
							if("lock_height" in serializedSlateKernel === false || (Common.isNumberString(serializedSlateKernel["lock_height"]) === false && serializedSlateKernel["lock_height"] instanceof BigNumber === false) || (new BigNumber(serializedSlateKernel["lock_height"])).isInteger() === false || (new BigNumber(serializedSlateKernel["lock_height"])).isLessThan(Slate.NO_LOCK_HEIGHT) === true) {
							
								// Throw error
								throw "Unsupported kernel.";
							}
							
							// Set lock height to serialized slate kernel's lock height
							this.lockHeight = new BigNumber(serializedSlateKernel["lock_height"]);
						
							// Break
							break;
						
						// No recent duplicate features
						case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
						
							// Check if no recent duplicate kernels isn't enabled
							if(Consensus.isNoRecentDuplicateKernelsEnabled(isMainnet) === false) {
							
								// Throw error
								throw "Unsupported kernel.";
							}
						
							// Check if serialized slate kernel's fee isn't supported
							if("fee" in serializedSlateKernel === false || (Common.isNumberString(serializedSlateKernel["fee"]) === false && serializedSlateKernel["fee"] instanceof BigNumber === false) || (new BigNumber(serializedSlateKernel["fee"])).isInteger() === false || (new BigNumber(serializedSlateKernel["fee"])).isLessThan(Slate.MINIMUM_FEE) === true) {
							
								// Throw error
								throw "Unsupported kernel.";
							}
							
							// Set fee to serialized slate kernel's fee
							this.fee = new BigNumber(serializedSlateKernel["fee"]);
							
							// Check if serialized slate kernel's relative height isn't supported
							if("relative_height" in serializedSlateKernel === false || (Common.isNumberString(serializedSlateKernel["relative_height"]) === false && serializedSlateKernel["relative_height"] instanceof BigNumber === false) || (new BigNumber(serializedSlateKernel["relative_height"])).isInteger() === false || (new BigNumber(serializedSlateKernel["relative_height"])).isLessThan(SlateKernel.MINIMUM_RECENT_HEIGHT) === true || (new BigNumber(serializedSlateKernel["relative_height"])).isGreaterThan(SlateKernel.MAXIMUM_RECENT_HEIGHT) === true) {
							
								// Throw error
								throw "Unsupported kernel.";
							}
							
							// Set relative height to serialized slate kernel's relative height
							this.relativeHeight = new BigNumber(serializedSlateKernel["relative_height"]);
						
							// Break
							break;
					}
					
					// Check if serialized slate kernel's excess signature isn't supported
					if("excess_sig" in serializedSlateKernel === false || Common.isHexString(serializedSlateKernel["excess_sig"]) === false || Secp256k1Zkp.isValidSingleSignerSignature(Common.fromHexString(serializedSlateKernel["excess_sig"])) !== true) {
					
						// Throw error
						throw "Unsupported kernel.";
					}
					
					// Set excess signature to serialized slate kernel's excess signature
					this.excessSignature = Secp256k1Zkp.singleSignerSignatureFromData(Common.fromHexString(serializedSlateKernel["excess_sig"]));
					
					// Check if excess signature isn't a valid signature
					if(this.getExcessSignature() === Secp256k1Zkp.OPERATION_FAILED) {
					
						// Throw error
						throw "Unsupported kernel.";
					}
					
					// Check if serialized slate kernel's excess isn't supported
					if("excess" in serializedSlateKernel === false || Common.isHexString(serializedSlateKernel["excess"]) === false || Common.hexStringLength(serializedSlateKernel["excess"]) !== Crypto.COMMIT_LENGTH || (Common.arraysAreEqual(Common.fromHexString(serializedSlateKernel["excess"]), SlateKernel.ZERO_EXCESS) === false && Secp256k1Zkp.isValidCommit(Common.fromHexString(serializedSlateKernel["excess"])) !== true)) {
					
						// Throw error
						throw "Unsupported kernel.";
					}
					
					// Set excess to serialized slate kernel's excess
					this.excess = Common.fromHexString(serializedSlateKernel["excess"]);
					
					// Break
					break;
				
				// Version Slatepack
				case Slate.VERSION_SLATEPACK:
				
					// Get bit reader
					var bitReader = serializedSlateKernel;
					
					// Try
					try {
					
						// Set fee to serialized slate kernel's fee
						this.fee = Slate.uncompactUint64(bitReader, true);
						
						// Check if serialized slate kernel's fee isn't supported
						if(this.getFee().isLessThan(Slate.MINIMUM_FEE) === true) {
						
							// Throw error
							throw "Unsupported kernel.";
						}
						
						// Set excess to serialized slate kernel's excess
						this.excess = bitReader.getBytes(Crypto.COMMIT_LENGTH);
						
						// Check if excess is invalid
						if(Common.arraysAreEqual(this.excess, SlateKernel.ZERO_EXCESS) === false && Secp256k1Zkp.isValidCommit(this.excess) !== true) {
						
							// Throw error
							throw "Unsupported kernel.";
						}
						
						// Check if serialized slate kernel's excess signature is invalid
						var excessSignature = bitReader.getBytes(Crypto.SINGLE_SIGNER_SIGNATURE_LENGTH);
						if(Secp256k1Zkp.isValidSingleSignerSignature(excessSignature) !== true) {
						
							// Throw error
							throw "Unsupported kernel.";
						}
						
						// Set excess signature to serialized slate kernel's excess signature
						this.excessSignature = Secp256k1Zkp.singleSignerSignatureFromData(excessSignature);
						
						// Check if excess signature isn't a valid signature
						if(this.getExcessSignature() === Secp256k1Zkp.OPERATION_FAILED) {
						
							// Throw error
							throw "Unsupported kernel.";
						}
					}
					
					// Catch errors
					catch(error) {
					
						// Throw error
						throw "Unsupported kernel.";
					}
					
					// Break
					break;
				
				// Default
				default:
				
					// Throw error
					throw "Unsupported kernel.";
			}
			
			// Check if complete
			if(this.isComplete() === true) {
			
				// Check if excess signature failed to be verified
				if(this.verifyExcessSignature() === false) {
				
					// Throw error
					throw "Unsupported kernel.";
				}
			}
		}
		
		// Verify excess signature
		verifyExcessSignature() {
		
			// Try
			try {
			
				// Get message to sign
				var messageToSign = SlateKernel.signatureMessage(this.getFeatures(), this.getFee(), this.getLockHeight(), this.getRelativeHeight());
			}
			
			// Catch errors
			catch(error) {
			
				// Return false
				return false;
			}
		
			// Create a public key from the excess
			var publicKey = Secp256k1Zkp.pedersenCommitToPublicKey(this.getExcess());
			
			// Check if the public key isn't a valid public key
			if(publicKey === Secp256k1Zkp.OPERATION_FAILED) {
			
				// Return false
				return false;
			}
			
			// Check if partial signature doesn't verify the excess
			if(Secp256k1Zkp.verifySingleSignerSignature(this.getExcessSignature(), messageToSign, Secp256k1Zkp.NO_PUBLIC_NONCE, publicKey, publicKey, false) !== true) {
			
				// Return false
				return false;
			}
			
			// Return true
			return true;
		}
		
		// Text to feature
		static textToFeatures(text) {
		
			// Check text
			switch(text) {
			
				// Plain text
				case "Plain":
				
					// Return plain features
					return SlateKernel.PLAIN_FEATURES;
				
				// Coinbase text
				case "Coinbase":
				
					// Return coinbase features
					return SlateKernel.COINBASE_FEATURES;
				
				// Height locked text
				case "HeightLocked":
				
					// Return height locked features
					return SlateKernel.HEIGHT_LOCKED_FEATURES;
				
				// No recent duplicate text
				case "NoRecentDuplicate":
				
					// Return no recent duplicate features
					return SlateKernel.NO_RECENT_DUPLICATE_FEATURES;
				
				// Default
				default:
				
					// Return unsupported features
					return SlateKernel.UNSUPPORTED_FEATURES;
			}
		}
		
		// Unsupported features
		static get UNSUPPORTED_FEATURES() {
		
			// Return unsupported features
			return SlateKernel.NO_RECENT_DUPLICATE_FEATURES + 1;
		}
		
		// Minimum recent height
		static get MINIMUM_RECENT_HEIGHT() {
		
			// Return minimum recent height
			return 1;
		}
		
		// Maximum recent height
		static get MAXIMUM_RECENT_HEIGHT() {
		
			// Return maximum recent height
			return Consensus.BLOCK_HEIGHT_WEEK;
		}
}


// Main function

// Set global object's slate kernel
globalThis["SlateKernel"] = SlateKernel;

// Export slate kernel
module["exports"] = SlateKernel;
