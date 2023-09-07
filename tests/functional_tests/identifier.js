// Use strict
"use strict";


// Requires
const Common = require("./common.js");
const Consensus = require("./consensus.js");


// Classes

// Identifier class
class Identifier {

	// Public
	
		// Constructor
		constructor(serializedIdentifier = Identifier.DEFAULT_SERIALIZED_IDENTIFIER) {
		
			// Set depth
			this.depth = 0;
			
			// Set paths
			this.paths = new Uint32Array(Identifier.MAX_DEPTH);
			
			// Set value to serialized identifier
			this.setValue(serializedIdentifier);
		}
		
		// Get depth
		getDepth() {
		
			// Return depth
			return this.depth;
		}
		
		// Get paths
		getPaths() {
		
			// Return paths
			return this.paths;
		}
		
		// Set value
		setValue(serializedIdentifierOrDepth, firstValue, secondValue, thirdValue, fourthValue) {
		
			// Check if value is provided in a serialized format
			if(typeof serializedIdentifierOrDepth === "string") {
			
				// Get serialized identifier
				var serializedIdentifier = serializedIdentifierOrDepth;
			
				// Check if serialized identifier ia a hex string
				if(Common.isHexString(serializedIdentifier) === true) {
			
					// Get serialized value
					var serializedValue = Common.fromHexString(serializedIdentifier);
					
					// Check if serialized value is valid
					if(serializedValue["length"] === Identifier.LENGTH) {
					
						// Set depth
						this.depth = Math.min(serializedValue[Identifier.DEPTH_INDEX], Identifier.MAX_DEPTH);
						
						// Go through all paths
						var serializedValueDataView = new DataView(serializedValue["buffer"]);
						
						for(var i = 0; i < this.getPaths()["length"]; ++i)
						
							// Set path
							this.paths[i] = serializedValueDataView.getUint32(Identifier.PATHS_INDEX + i * Uint32Array["BYTES_PER_ELEMENT"], false);
					}
					
					// Otherwise
					else {
					
						// Throw error
						throw "Invalid identifier.";
					}
				}
					
				// Otherwise
				else {
				
					// Throw error
					throw "Invalid identifier.";
				}
			}
			
			// Otherwise
			else {
			
				// Get depth
				var depth = serializedIdentifierOrDepth;
			
				// Check if depth is valid
				if(depth <= Identifier.MAX_DEPTH) {
		
					// Set depth
					this.depth = depth;
					
					// Check if paths are provided as an array
					if(firstValue instanceof Uint32Array === true) {
					
						// Get paths
						var paths = firstValue;
						
						// Check if paths are valid
						if(paths["length"] === this.getPaths()["length"]) {
					
							// Go through all paths
							for(var i = 0; i < this.getPaths()["length"]; ++i) {
							
								// Set path to path
								this.paths[i] = paths[i];
							}
						}
						
						// Otherwise
						else {
						
							// Throw error
							throw "Invalid identifier.";
						}
					}
					
					// Otherwise
					else {
						
						// Set paths
						this.paths[0] = firstValue;
						this.paths[1] = secondValue;
						this.paths[2] = thirdValue;
						this.paths[3] = fourthValue;
					}
				}
				
				// Otherwise
				else {
				
					// Throw error
					throw "Invalid identifier.";
				}
			}
		}
		
		// Get value
		getValue() {
		
			// Initialize buffer
			var buffer = new Uint8Array(Identifier.LENGTH);
			
			// Set buffer's depth
			buffer[Identifier.DEPTH_INDEX] = this.getDepth();
			
			// Go through all paths
			var bufferView = new DataView(buffer["buffer"]);
			
			for(var i = 0; i < this.getPaths()["length"]; ++i)
			
				// Set buffer's path
				bufferView.setUint32(Identifier.PATHS_INDEX + i * Uint32Array["BYTES_PER_ELEMENT"], this.getPaths()[i], false);
			
			// Return buffer
			return buffer;
		}
		
		// Equals value
		equalsValue(identifier) {
		
			// Check if depths differ
			if(this.getDepth() !== identifier.getDepth())
			
				// Return false
				return false;
			
			// Return if paths are equal
			return Common.arraysAreEqual(this.getPaths(), identifier.getPaths() === true);
		}
		
		// Includes value
		includesValue(identifier) {
		
			// Check if depths differ
			if(this.getDepth() !== identifier.getDepth())
			
				// Return false
				return false;
			
			// Return if last path is greater than or equal to the value's last path
			return this.getLastPath() >= identifier.getLastPath();
		}
		
		// Get last path index
		getLastPath() {
		
			// Return last path
			return (this.getDepth() === 0) ? 0 : this.getPaths()[this.getDepth() - 1];
		}
		
		// Get next
		getNext(height = Identifier.NO_HEIGHT) {
		
			// Create next as a clone of self
			var next = this.clone();
			
			// Increment next's last path to value
			++next.paths[next.getDepth() - 1];
			
			// Check if height exists
			if(height !== Identifier.NO_HEIGHT) {
			
				// Check wallet type
				switch(Consensus.getWalletType()) {
				
					// MWC wallet
					case Consensus.MWC_WALLET_TYPE:
				
						// Set next's height path as the height limited by its maximum value
						next.paths[Identifier.HEIGHT_PATH_INDEX] = Math.max(height.modulo(Identifier.MAXIMUM_HEIGHT + 1).toNumber(), 1);
						
						// Break
						break;
				}
			}
			
			// Return next
			return next;
		}
		
		// Get parent
		getParent() {
		
			// Create parent as a clone of self
			var parent = this.clone();
			
			// Check if previous depth exists
			if(this.getDepth() > 0) {
			
				// Clear parent's last path
				parent.paths[parent.getDepth() - 1] = 0;
				
				// Decrement parent's depth
				--parent.depth;
			}
			
			// Return parent
			return parent;
		}
		
		// Get child
		getChild(height = Identifier.NO_HEIGHT) {
		
			// Create child as a clone of self
			var child = this.clone();
			
			// Check if next depth exists
			if(this.getDepth() < Identifier.MAX_DEPTH) {
			
				// Increment child's depth
				++child.depth;
			}
			
			// Check if height exists
			if(height !== Identifier.NO_HEIGHT) {
			
				// Check wallet type
				switch(Consensus.getWalletType()) {
				
					// MWC wallet
					case Consensus.MWC_WALLET_TYPE:
			
						// Set child's height path as the height limited by its maximum value
						child.paths[Identifier.HEIGHT_PATH_INDEX] = Math.max(height.modulo(Identifier.MAXIMUM_HEIGHT + 1).toNumber(), 1);
						
						// Break
						break;
				}
			}
			
			// Return child
			return child;
		}
		
		// Get height
		getHeight() {
		
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// MWC wallet
				case Consensus.MWC_WALLET_TYPE:
		
					// Get height from height path
					var height = this.getPaths()[Identifier.HEIGHT_PATH_INDEX];
					
					// Check if height exists
					if(height !== Consensus.FIRST_BLOCK_HEIGHT) {
					
						// Return height
						return new BigNumber(height);
					}
					
					// Otherwise
					else {
					
						// Return no height
						return Identifier.NO_HEIGHT;
					}
			}
			
			// Return no height
			return Identifier.NO_HEIGHT;
		}
		
		// Remove extras
		removeExtras() {
		
			// Create copy as a clone of self
			var copy = this.clone();
			
			// Check wallet type
			switch(Consensus.getWalletType()) {
			
				// MWC wallet
				case Consensus.MWC_WALLET_TYPE:
			
					// Set copy's height path to not exist
					copy.paths[Identifier.HEIGHT_PATH_INDEX] = Consensus.FIRST_BLOCK_HEIGHT;
					
					// Break
					break;
			}
			
			// Return copy
			return copy;
		}
		
		// Is path hardened
		static isPathHardened(path) {
		
			// Return if path is hardened
			return (path & Identifier.PATH_HARDENED_MASK) !== 0;
		}
		
		// Length
		static get LENGTH() {
		
			// Return length
			return 1 * Uint8Array["BYTES_PER_ELEMENT"] + Identifier.MAX_DEPTH * Uint32Array["BYTES_PER_ELEMENT"];
		}
		
		// Max depth
		static get MAX_DEPTH() {
		
			// Return max depth
			return 4;
		}
		
		// Root serialized identifier
		static get ROOT_SERIALIZED_IDENTIFIER() {
		
			// Return root serialized identifier
			return "0000000000000000000000000000000000";
		}
		
		// Paths index
		static get PATHS_INDEX() {
		
			// Return paths index
			return Identifier.DEPTH_INDEX + 1;
		}
		
		// No identifier
		static get NO_IDENTIFIER() {
		
			// Return no identifier
			return null;
		}
		
		// No heights
		static get NO_HEIGHT() {
		
			// Return no height
			return null;
		}
		
		// Maximum height
		static get MAXIMUM_HEIGHT() {
		
			// Return maximum height
			return Common.UINT32_MAX_VALUE;
		}
	
	// Private
	
		// Clone
		clone() {
		
			// Create a copy of self
			var copy = new Identifier();
			
			copy.setValue(this.getDepth(), this.getPaths());
			
			// Return copy
			return copy;
		}
		
		// Default serialized identifier
		static get DEFAULT_SERIALIZED_IDENTIFIER() {
		
			// Return default serialized identifier
			return "0200000000000000000000000000000000";
		}
		
		// Depth index
		static get DEPTH_INDEX() {
		
			// Return depth index
			return 0;
		}
		
		// Path hardened mask
		static get PATH_HARDENED_MASK() {
		
			// Return path hardened mask
			return 0x80000000;
		}
		
		// Height path index
		static get HEIGHT_PATH_INDEX() {
		
			// Return height path index
			return Identifier.MAX_DEPTH - 1;
		}
}


// Main function

// Set global object's identifier
globalThis["Identifier"] = Identifier;

// Export identifier
module["exports"] = Identifier;
