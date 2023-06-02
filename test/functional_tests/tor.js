// Use strict
"use strict";


// Requires
const sha3_256 = require("./js-sha3-0.8.0.js")["sha3_256"];
const base32 = require("./hi-base32-0.5.1.js");
const Common = require("./common.js");


// Classes

// Tor class
class Tor {

	// Public
	
		// Initialize
		static initialize() {
		
			// Set browser support Tor to true if is an Onion Service or unknown otherwise
			Tor.browserSupportsTor = (Tor.isOnionService() === true) ? true : Tor.SUPPORT_UNKNOWN;
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Return checking if browser supports Tor
				return Tor.checkIfBrowserSupportsTor().then(function() {
				
					// Check if browser's Tor support is unknown
					if(Tor.browserSupportsTor === Tor.SUPPORT_UNKNOWN) {
					
						// Window online event
						$(window).on("online", function() {
						
							// Check if browser supports Tor
							Tor.checkIfBrowserSupportsTor();
						});
					}
				
					// Resolve
					resolve();
				});
			});
		}
		
		// Is supported
		static isSupported() {
		
			// Return if browser supports Tor
			return Tor.browserSupportsTor === true;
		}
		
		// Is Tor URL
		static isTorUrl(url) {
		
			// Try
			try {
			
				// Parse URL
				var parsedUrl = new URL(url);
			}
			
			// Catch errors
			catch(error) {
			
				// Return false
				return false;
			}
			
			// Return if address is a Tor URL
			return Tor.URL_PATTERN.test(parsedUrl["protocol"] + "//" + parsedUrl["hostname"]) === true;
		}
		
		// Get Tor address from URL
		static getTorAddressFromUrl(url) {
		
			// Trim url
			url = url.trim();
		
			// Try
			try {
			
				// Parse URL with a protocol and top-level domain added if needed
				var parsedUrl = new URL(((Common.urlContainsProtocol(url) === false) ? Common.HTTP_PROTOCOL + "//" : "") + url + ((Common.urlContainsProtocol(url) === false && Common.urlContainsTopLevelDomain(url) === false) ? Tor.URL_TOP_LEVEL_DOMAIN : ""));
			}
			
			// Catch errors
			catch(error) {
			
				// Throw error
				throw "Invalid URL.";
			}
			
			// Check if parsed URL is a Tor URL
			if(Tor.URL_PATTERN.test(parsedUrl["protocol"] + "//" + parsedUrl["hostname"]) === false) {
			
				// Throw error
				throw "Invalid URL.";
			}
			
			// Set Tor address to the URL without its subdomain and top-level domain
			var torAddress = Common.removeTopLevelDomain(Common.removeSubdomain(parsedUrl["hostname"]));
			
			// Try
			try {
			
				// Get public key from the Tor address
				Tor.torAddressToPublicKey(torAddress);
			}
			
			// Catch errors
			catch(error) {
			
				// Throw error
				throw "Invalid URL.";
			}
			
			// Return Tor address
			return torAddress;
		}
		
		// Is Onion Service
		static isOnionService() {
		
			// Check if is extension or loading from file
			if(Common.isExtension() === true || location["protocol"] === Common.FILE_PROTOCOL) {
			
				// Return false
				return false;
			}
		
			// Return if site is an Onion Service
			return Tor.isTorUrl(location["protocol"] + "//" + location["hostname"]) === true;
		}
		
		// Public key to Tor address
		static publicKeyToTorAddress(publicKey) {
		
			// Check it public key isn't the correct length
			if(publicKey["length"] !== Crypto.ED25519_PUBLIC_KEY_LENGTH) {
			
				// Throw error
				throw "Invalid public key.";
			}
		
			// Get checksum of seed, address public key, and version
			var checksum = new Uint8Array(sha3_256.arrayBuffer(Common.mergeArrays([
						
				// Seed
				(new TextEncoder()).encode(Tor.ADDRESS_CHECKSUM_SEED),
				
				// Public key
				publicKey,
				
				// Version
				new Uint8Array([Tor.ADDRESS_VERSION])
			])));
			
			// Get Tor address from address public key, checksum, and version
			var torAddress = base32.encode(Common.mergeArrays([
			
				// Public key
				publicKey,
				
				// Checksum
				checksum.subarray(0, Tor.ADDRESS_CHECKSUM_LENGTH),
				
				// Version
				new Uint8Array([Tor.ADDRESS_VERSION])
			
			])).toLowerCase();
			
			// Return Tor address
			return torAddress;
		}
		
		// Tor address to public key
		static torAddressToPublicKey(torAddress) {
		
			// Check it Tor address isn't the correct length
			if(torAddress["length"] !== Tor.ADDRESS_LENGTH) {
			
				// Throw error
				throw "Invalid Tor address.";
			}
			
			// Check it Tor address isn't lower case
			if(Common.isLowercaseString(torAddress) === false) {
			
				// Throw error
				throw "Invalid Tor address.";
			}
		
			// Try
			try {
			
				// Decode Tor address
				var decodedAddress = new Uint8Array(base32.decode.asBytes(torAddress.toUpperCase()));
			}
			
			// Catch errors
			catch(error) {
			
				// Throw error
				throw "Invalid Tor address.";
			}
			
			// Check if decoded address's length is invalid
			if(decodedAddress["length"] !== Crypto.ED25519_PUBLIC_KEY_LENGTH + Tor.ADDRESS_CHECKSUM_LENGTH + [Tor.ADDRESS_VERSION]["length"]) {
			
				// Throw error
				throw "Invalid Tor address.";
			}
			
			// Get checksum of seed, decoded address, and version
			var checksum = new Uint8Array(sha3_256.arrayBuffer(Common.mergeArrays([
						
				// Seed
				(new TextEncoder()).encode(Tor.ADDRESS_CHECKSUM_SEED),
				
				// Decoded address
				decodedAddress.subarray(0, Crypto.ED25519_PUBLIC_KEY_LENGTH),
				
				// Version
				new Uint8Array([Tor.ADDRESS_VERSION])
			])));
			
			// Check if decoded address's checksum doesn't match the expected value
			if(Common.arraysAreEqual(checksum.subarray(0, Tor.ADDRESS_CHECKSUM_LENGTH), decodedAddress.subarray(Crypto.ED25519_PUBLIC_KEY_LENGTH, Crypto.ED25519_PUBLIC_KEY_LENGTH + Tor.ADDRESS_CHECKSUM_LENGTH)) === false) {
			
				// Throw error
				throw "Invalid Tor address.";
			}
			
			// Check if decoded address's version doesn't match the expected value
			if(decodedAddress[Crypto.ED25519_PUBLIC_KEY_LENGTH + Tor.ADDRESS_CHECKSUM_LENGTH] !== Tor.ADDRESS_VERSION) {
			
				// Throw error
				throw "Invalid Tor address.";
			}
			
			// Return decoded address without the checksum and version
			return decodedAddress.subarray(0, Crypto.ED25519_PUBLIC_KEY_LENGTH);
		}
		
		// Address length
		static get ADDRESS_LENGTH() {
		
			// Return address length
			return 56;
		}
		
		// URL top-level domain
		static get URL_TOP_LEVEL_DOMAIN() {
		
			// Return URL top-level domain
			return ".onion";
		}
	
	// Private
	
		// Check if browser supports Tor
		static checkIfBrowserSupportsTor() {
		
			// Return promise
			return new Promise(function(resolve, reject) {
			
				// Check if online and browser's Tor support is unknown
				if(navigator["onLine"] === true && Tor.browserSupportsTor === Tor.SUPPORT_UNKNOWN) {
			
					// Return getting testing connection to Tor site
					return $.get(TOR_SERVER_ADDRESS + Tor.CONNECTION_TEST_URL).then(function() {
					
						// Set browser supports Tor
						Tor.browserSupportsTor = true;
						
						// Resolve
						resolve();
					
					// Catch errors
					}).catch(function(error) {
					
						// Clear browser supports Tor
						Tor.browserSupportsTor = false;
						
						// Resolve
						resolve();
					});
				}
				
				// Otherwise
				else {
				
					// Resolve
					resolve();
				}
			});
		}
		
		// Support unknown
		static get SUPPORT_UNKNOWN() {
		
			// Return support unknown
			return null;
		}
		
		// Connection test URL
		static get CONNECTION_TEST_URL() {
		
			// Return connection test URL
			return getResource("./connection_test.html").substring("."["length"]);
		}
		
		// URL pattern
		static get URL_PATTERN() {
		
			// Return URL pattern
			return /^[^:]+:\/\/.+\.onion$/ui;
		}
		
		// Address checksum seed
		static get ADDRESS_CHECKSUM_SEED() {
		
			// Return address checksum seed
			return ".onion checksum";
		}
		
		// Address version
		static get ADDRESS_VERSION() {
		
			// Return address version
			return 3;
		}
		
		// Address checksum length
		static get ADDRESS_CHECKSUM_LENGTH() {
		
			// Return address checksum length
			return 2;
		}
}


// Main function

// Set global object's Tor
globalThis["Tor"] = Tor;

// Export Tor
module["exports"] = Tor;
