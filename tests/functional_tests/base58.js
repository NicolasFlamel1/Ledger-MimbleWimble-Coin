// Use strict
"use strict";


// Requires
const sha256 = require("./js-sha256-0.10.0.js");
const Common = require("./common.js");


// Classes

// Base58 class
class Base58 {

	// Public
		
		// Encode
		static encode(byteArray) {
		
			// Go through all leading zeros in the byte array
			var numberOfLeadingZeros = 0;
			while(numberOfLeadingZeros < byteArray["length"] && byteArray[numberOfLeadingZeros] === 0) {
			
				// Increment number of leading zeros
				++numberOfLeadingZeros;
			}
			
			// Get buffer size
			var bufferSize = Math.ceil((byteArray["length"] - numberOfLeadingZeros) * Base58.BYTES_PER_LENGTH_IN_NEW_BASE);
			
			// Create buffer
			var buffer = (new Uint8Array(bufferSize)).fill(0);
			
			// Go through all bytes in the byte array after the leading zeros
			var length = 0;
			for(var i = numberOfLeadingZeros; i < byteArray["length"]; ++i) {
			
				// Get byte
				var byte = byteArray[i];
				
				// Go through all base 58 components of the byte
				for(var j = 0, k = bufferSize - 1; (byte !== 0 || j < length) && k >= 0; ++j, --k) {
				
					// Include the current buffer value in the byte
					byte += (Common.BYTE_MAX_VALUE + 1) * buffer[k];
					
					// Set value in the buffer
					buffer[k] = byte % Base58.NUMBER_BASE;
					
					// Update the byte
					byte = Math.floor(byte / Base58.NUMBER_BASE);
				}
				
				// Update length
				length = j;
			}
			
			// Go through all leading zeros in the buffer
			var bufferIndex = bufferSize - length;
			while(bufferIndex < buffer["length"] && buffer[bufferIndex] === 0) {
			
				// Increment buffer index
				++bufferIndex;
			}
			
			// Set result to start with the number of leading zeros in base58
			var result = Base58.CHARACTERS[0].repeat(numberOfLeadingZeros);
			
			// Go through all bytes in the buffer after the leading zeros
			for(; bufferIndex < buffer["length"]; ++bufferIndex) {
			
				// Append buffer's value in base58 to the result
				result += Base58.CHARACTERS[buffer[bufferIndex]];
			}
			
			// Return result
			return result;
		}
		
		// Encode with checksum
		static encodeWithChecksum(byteArray) {
		
			// Get the checksum of the byte array
			var checksum = Base58.getChecksum(byteArray);
			
			// Return encoding the byte array with the checksum
			return Base58.encode(Common.mergeArrays([
					
				// Byte array
				byteArray,
				
				// Checksum
				checksum
			]));
		}
		
		// Decode
		static decode(base58String) {
		
			// Go through all leading zeros in base58 in the string
			var numberOfLeadingZeros = 0;
			while(numberOfLeadingZeros < base58String["length"] && base58String[numberOfLeadingZeros] === Base58.CHARACTERS[0]) {
			
				// Increment number of leading zeros
				++numberOfLeadingZeros;
			}
			
			// Get buffer size
			var bufferSize = Math.ceil((base58String["length"] - numberOfLeadingZeros) * Base58.BYTES_PER_LENGTH_IN_OLD_BASE);
			
			// Crete buffer
			var buffer = (new Uint8Array(bufferSize)).fill(0);
			
			// Go through all characters in the string after the leading zeros in base58
			var length = 0;
			for(var i = numberOfLeadingZeros; i < base58String["length"]; ++i) {
			
				// Get character as byte
				var byte = Base58.CHARACTERS.indexOf(base58String[i]);
				
				// Check if byte is invalid
				if(byte === Common.INDEX_NOT_FOUND) {
				
					// Throw error
					throw "Invalid base58 string.";
				}
				
				// Go through all base 58 components of the byte
				for(var j = 0, k = bufferSize - 1; (byte !== 0 || j < length) && k >= 0; ++j, --k) {
				
					// Include the current buffer value in the byte
					byte += Base58.NUMBER_BASE * buffer[k];
					
					// Set value in the buffer
					buffer[k] = byte % (Common.BYTE_MAX_VALUE + 1);
					
					// Update the byte
					byte = Math.floor(byte / (Common.BYTE_MAX_VALUE + 1));
				}
				
				// Update length
				length = j;
			}
			
			// Go through all leading zeros in the buffer
			var bufferIndex = bufferSize - length;
			while(bufferIndex < buffer["length"] && buffer[bufferIndex] === 0) {
			
				// Increment buffer index
				++bufferIndex;
			}
			
			// Set result to start with the number of leading zeros
			var result = (new Uint8Array(numberOfLeadingZeros + bufferSize - bufferIndex)).fill(0);
			
			// Go through all bytes in the buffer after the leading zeros
			for(var i = 0; bufferIndex < buffer["length"]; ++i, ++bufferIndex) {
			
				// Append buffer's value to the result
				result[i + numberOfLeadingZeros] += buffer[bufferIndex];
			}
			
			// Return result
			return result;
		}
		
		// Decode with checksum
		static decodeWithChecksum(base58String) {
		
			// Try
			try {
		
				// Decode the string
				var byteArray = Base58.decode(base58String);
			}
			
			// Catch errors
			catch(error) {
			
				// Throw error
				throw error;
			}
			
			// Check if the byte array doesn't include a checksum
			if(byteArray["length"] < Base58.CHECKSUM_LENGTH) {
			
				// Throw error
				throw "No checksum exists.";
			}
			
			// Otherwise
			else {
			
				// Get the checksum of the byte array without its checksum
				var checksum = Base58.getChecksum(byteArray.subarray(0, byteArray["length"] - Base58.CHECKSUM_LENGTH));
				
				// Get the provided checksum from the byte array
				var providedChecksum = byteArray.subarray(byteArray["length"] - Base58.CHECKSUM_LENGTH);
				
				// Check if checksums don't match
				if(Common.arraysAreEqual(checksum, providedChecksum) === false) {
				
					// Throw error
					throw "Invalid checksum.";
				}
				
				// Otherwise
				else {
				
					// Return byte array without the checksum
					return byteArray.subarray(0, byteArray["length"] - Base58.CHECKSUM_LENGTH);
				}
			}
		}
	
	// Private
	
		// Get checksum
		static getChecksum(byteArray) {
		
			// Get a hash of the hash of the byte array
			var hash = new Uint8Array(sha256.arrayBuffer(new Uint8Array(sha256.arrayBuffer(byteArray))));
			
			// Get the checksum from the hash
			var checksum = hash.subarray(0, Base58.CHECKSUM_LENGTH);
			
			// Return checksum
			return checksum;
		}
		
		// Characters
		static get CHARACTERS() {
		
			// Return characters
			return "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
		}
		
		// Number base
		static get NUMBER_BASE() {
		
			// Return number base
			return 58;
		}
		
		// Bytes per length in new base
		static get BYTES_PER_LENGTH_IN_NEW_BASE() {
		
			// Return bytes per length in new base
			return Math.log(Common.BYTE_MAX_VALUE + 1) / Math.log(Base58.NUMBER_BASE);
		}
		
		// Bytes per length in old base
		static get BYTES_PER_LENGTH_IN_OLD_BASE() {
		
			// Return bytes per length in old base
			return Math.log(Base58.NUMBER_BASE) / Math.log(Common.BYTE_MAX_VALUE + 1);
		}
		
		// Checksum length
		static get CHECKSUM_LENGTH() {
		
			// Return checksum length
			return 4;
		}
}


// Main function

// Set global object's base58
globalThis["Base58"] = Base58;

// Export base58
module["exports"] = Base58;
