// Use strict
"use strict";


// Requires
const BigNumber = require("./bignumber.js-9.1.1.js");


// Classes

// Common class
class Common {

	// Public

		// From hex string
		static fromHexString(hexString, useSharedArrayBuffer = false) {
		
			// Initialize result
			var result = new Uint8Array((useSharedArrayBuffer === true && crossOriginIsolated === true) ? new SharedArrayBuffer(Common.hexStringLength(hexString)) : Common.hexStringLength(hexString));

			// Go through all bytes in the result
			for(var i = 0; i < result["length"]; ++i) {
			
				// Set character as a byte in the result
				result[i] = (Common.HEX_CHARACTER_TO_VALUE[hexString[i * Common.HEX_NUMBER_LENGTH]] << (Common.BITS_IN_A_BYTE / 2)) | Common.HEX_CHARACTER_TO_VALUE[hexString[i * Common.HEX_NUMBER_LENGTH + 1]];
			}
			
			// Return result
			return result;
		}
		
		// To hex string
		static toHexString(byteArray) {

			// Initialize result
			var result = "";
			
			// Go through all bytes in the byte array
			for(var i = 0; i < byteArray["length"]; ++i) {
			
				// Get byte
				var byte = byteArray[i];
				
				// Append byte as characters to the result
				result = result.concat(Common.VALUE_TO_HEX_CHARACTER[byte >>> (Common.BITS_IN_A_BYTE / 2)], Common.VALUE_TO_HEX_CHARACTER[byte & 0x0F]);
			}
			
			// Return result
			return result;
		}
		
		// Is hex string
		static isHexString(string) {
		
			// Check if string isn't a string
			if(typeof string !== "string")
			
				// Return false
				return false;
			
			// Check if string's length is invalid
			if(string["length"] % Common.HEX_NUMBER_LENGTH !== 0) {
			
				// Return false
				return false;
			}
		
			// Return if string is a hex string
			return Common.HEX_STRING_PATTERN.test(string) === true;
		}
		
		// Hex string length
		static hexStringLength(string) {
		
			// Return hex string length
			return string["length"] / Common.HEX_NUMBER_LENGTH;
		}
		
		// Is number string
		static isNumberString(string) {
		
			// Check if string isn't a string
			if(typeof string !== "string")
			
				// Return false
				return false;
		
			// Return if string is a number string
			return Common.NUMBER_STRING_PATTERN.test(string) === true;
		}
		
		// Is RFC 3339 string
		static isRfc3339String(string) {
		
			// Check if string isn't a string
			if(typeof string !== "string")
			
				// Return false
				return false;
		
			// Check if string isn't an RFC 3339 string
			if(Common.RFC_3339_STRING_PATTERN.test(string) === false)
			
				// Return false
				return false;
			
			// Return if string could be converted from a RFC 3339 string to a timestamp
			return Number.isNaN(Common.rfc3339StringToTimestamp(string)) === false;
		}
		
		// Is lowercase string
		static isLowercaseString(string) {
		
			// Check if string isn't a string
			if(typeof string !== "string")
			
				// Return false
				return false;
		
			// Return if string is a a lowercase string
			return Common.LOWERCASE_STRING_PATTERN.test(string) === true;
		}
		
		// RFC 3339 string to timestamp
		static rfc3339StringToTimestamp(string) {
		
			// Return timestamp from string
			return Date.parse(string);
		}
		
		// Merge arrays
		static mergeArrays(arrays) {
		
			// Initialize result
			var result = new Uint8Array([]);
		
			// Go through all arrays
			for(var i = 0; i < arrays["length"]; ++i) {
			
				// Get array
				var array = arrays[i];
				
				// Set updated result to be the length of the current result and the array
				var updatedResult = new Uint8Array(result["length"] + array["length"]);
				
				// Set arrays in the updated result
				updatedResult.set(result);
				updatedResult.set(array, result["length"]);
				
				// Set result to the updated result
				result = updatedResult;
			}
		
			// Return result
			return result;
		}
		
		// Arrays are equal
		static arraysAreEqual(arrayOne, arrayTwo) {
		
			// Check if arrays have different lengths
			if(arrayOne["length"] !== arrayTwo["length"])
			
				// Return false
				return false;
			
			// Go through all values each array
			for(var i = 0; i < arrayOne["length"]; ++i)
			
				// Check if array values differ
				if(arrayOne[i] !== arrayTwo[i])
				
					// Return false
					return false;
			
			// Return true
			return true;
		}
		
		// Arrays are equal timing safe
		static arraysAreEqualTimingSafe(arrayOne, arrayTwo) {
		
			// Initialize results
			var result = (arrayOne["length"] === arrayTwo["length"]) ? 0 : 1;
		
			// Go through all values in the first array
			for(var i = 0; i < arrayOne["length"]; ++i) {
			
				// Get current value from each array
				var arrayOneValue = arrayOne[i];
				var arrayTwoValue = (i < arrayTwo["length"]) ? arrayTwo[i] : 0;
				
				// Update result to if current values are equal
				result |= (arrayOneValue === arrayTwoValue) ? 0 : 1;
			}
			
			// Return if arrays are equal
			return result === 0;
		}
		
		// Get current timestamp
		static getCurrentTimestamp() {
		
			// Return current timestamp
			return Math.floor(Date.now() / Common.MILLISECONDS_IN_A_SECOND);
		}
		
		// Is extension
		static isExtension() {
		
			// Return if extension
			return typeof location !== "undefined" && location["protocol"]["length"] > "-extension:"["length"] && location["protocol"].substring(location["protocol"]["length"] - "-extension:"["length"]) === "-extension:";
		}
		
		// Is popup
		static isPopup() {
		
			// Get URL parameters
			var urlParameters = Common.getUrlParameters();
			
			// Return if popup
			return Common.isExtension() === true && "Is Popup" in urlParameters === true && urlParameters["Is Popup"] === "True";
		}
		
		// Is app
		static isApp() {
		
			// Return if app
			return Common.isExtension() === false && ((typeof navigator === "object" && navigator !== null && "standalone" in navigator === true && navigator["standalone"] === true) || (typeof matchMedia === "function" && matchMedia("(display-mode: standalone)")["matches"] === true));
		}
		
		// HTML encode
		static htmlEncode(string) {

			// Return string with HTML entities encoded
			return $("<div>").text(string).html().replace(Common.DOUBLE_QUOTE_PATTERN, Common.DOUBLE_QUOTE_HTML_ENTITY).replace(Common.SINGLE_QUOTE_PATTERN, Common.SINGLE_QUOTE_HTML_ENTITY).replace(Common.GRAVE_ACCENT_PATTERN, Common.GRAVE_ACCENT_HTML_ENTITY);
		}
		
		// HTML decode
		static htmlDecode(htmlString) {

			// Return html string with HTML entities decoded
			return $("<div>").html(htmlString).text();
		}
		
		// Random number
		static randomNumber(minValue, maxValue) {
		
			// Return random number between values inclusively
			return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
		}
		
		// Escape regular expression
		static escapeRegularExpression(string) {

			// Return string with regular expression meta characters escaped
			return string.replace(/[.*+?^${}()|[\]\\]/ug, "\\$&");
		}
		
		// Map
		static map(value, inMin, inMax, outMin, outMax) {

			// Return value mapped to different range
			return (new BigNumber(outMax)).minus(outMin).multipliedBy((new BigNumber(value)).minus(inMin)).dividedBy((new BigNumber(inMax)).minus(inMin)).plus(outMin);
		}
		
		// Is valid URL
		static isValidUrl(url) {
		
			// Check if URL doesn't have a protocol
			if(Common.urlContainsProtocol(url) === false) {
			
				// Add protocol to URL
				url = Common.HTTP_PROTOCOL + "//" + url;
			}
		
			// Try
			try {
			
				// Parse URL as a URL
				new URL(url);
			}
			
			// Catch errors
			catch(error) {
			
				// Return false
				return false;
			}
			
			// Return true
			return true;
		}
		
		// Is iframe
		static isIframe() {
		
			// Try
			try {
			
				// Return if self isn't the top window
				return window["self"] !== window["top"];
			}
			
			// Catch errors
			catch(error) {
			
				// Return true
				return true;
			}
		}
		
		// On reduced data connection
		static onReducedDataConnection() {
		
			// Return if save data is enabled
			return typeof navigator === "object" && navigator !== null && "connection" in navigator === true && typeof navigator["connection"] === "object" && navigator["connection"] !== null && "saveData" in navigator["connection"] === true && navigator["connection"]["saveData"] === true;
		}
		
		// Is low memory device
		static isLowMemoryDevice() {
		
			// Return if device has low memory
			return typeof navigator === "object" && navigator !== null && "deviceMemory" in navigator === true && navigator["deviceMemory"] <= Common.LOW_MEMORY_THRESHOLD_GIGABYTES;
		}
		
		// Is high memory device
		static isHighMemoryDevice() {
		
			// Return if device has high memory
			return typeof navigator === "object" && navigator !== null && "deviceMemory" in navigator === true && navigator["deviceMemory"] >= Common.HIGH_MEMORY_THRESHOLD_GIGABYTES;
		}
		
		// Is mobile device
		static isMobileDevice() {
		
			// Return if device is a mobile device
			return typeof navigator === "object" && navigator !== null && "userAgentData" in navigator === true && "mobile" in navigator["userAgentData"] === true && navigator["userAgentData"]["mobile"] === true;
		}
		
		
		// Is using cellular network
		static isUsingCellularNetwork() {
		
			// Return if using cellular network
			return typeof navigator === "object" && navigator !== null && "connection" in navigator === true && "type" in navigator["connection"] === true && navigator["connection"]["type"] === "cellular";
		}
		
		// Upgrade applicable insecure URL
		static upgradeApplicableInsecureUrl(url) {
		
			// Try
			try {
		
				// Parse HTTPS server address as a URL
				var parsedHttpsServerUrl = new URL(HTTPS_SERVER_ADDRESS);
				
				// Parse Tor server address as a URL
				var parsedTorServerUrl = new URL(TOR_SERVER_ADDRESS);
				
				// Parse URL as a URL
				var parsedUrl = new URL(url);
			}
			
			// Catch errors
			catch(error) {
			
				// Return url
				return url;
			}
				
			// Check if URL's protocol is HTTP, the HTTPS server address's protocol is HTTPS, and the URL is the same site as the HTTPS server address
			if(parsedUrl["protocol"] === Common.HTTP_PROTOCOL && parsedHttpsServerUrl["protocol"] === Common.HTTPS_PROTOCOL && parsedUrl["hostname"] === parsedHttpsServerUrl["hostname"]) {
			
				// Create an HTTPS URL from the URL
				var httpsUrl = Common.HTTPS_PROTOCOL + Common.ltrim(url).substring(Common.HTTP_PROTOCOL["length"]);
				
				// Return HTTPS URL
				return httpsUrl;
			}
			
			// Otherwise check if URL's protocol is WebSocket, the HTTPS server address's protocol is HTTPS, and the URL is the same site as the HTTPS server address
			else if(parsedUrl["protocol"] === Common.WEBSOCKET_PROTOCOL && parsedHttpsServerUrl["protocol"] === Common.HTTPS_PROTOCOL && parsedUrl["hostname"] === parsedHttpsServerUrl["hostname"]) {
			
				// Create an WebSocket secure URL from the URL
				var wssUrl = Common.WEBSOCKET_SECURE_PROTOCOL + Common.ltrim(url).substring(Common.WEBSOCKET_PROTOCOL["length"]);
				
				// Return WebSocket secure URL
				return wssUrl;
			}
			
			// Otherwise check if URL's protocol is HTTPS, the Tor server address's protocol is HTTP, and the URL is the same site as the Tor server address
			else if(parsedUrl["protocol"] === Common.HTTPS_PROTOCOL && parsedTorServerUrl["protocol"] === Common.HTTP_PROTOCOL && parsedUrl["hostname"] === parsedTorServerUrl["hostname"]) {
			
				// Create an HTTP URL from the URL
				var httpUrl = Common.HTTP_PROTOCOL + Common.ltrim(url).substring(Common.HTTPS_PROTOCOL["length"]);
				
				// Return HTTP URL
				return httpUrl;
			}
			
			// Otherwise check if URL's protocol is WebSocket secure, the Tor server address's protocol is HTTP, and the URL is the same site as the Tor server address
			else if(parsedUrl["protocol"] === Common.WEBSOCKET_SECURE_PROTOCOL && parsedTorServerUrl["protocol"] === Common.HTTP_PROTOCOL && parsedUrl["hostname"] === parsedTorServerUrl["hostname"]) {
			
				// Create an WebSocket URL from the URL
				var wsUrl = Common.WEBSOCKET_PROTOCOL + Common.ltrim(url).substring(Common.WEBSOCKET_SECURE_PROTOCOL["length"]);
				
				// Return WebSocket URL
				return wsUrl;
			}
			
			// Otherwise
			else {
			
				// Return URL
				return url;
			}
		}
		
		// Get URL parmaters
		static getUrlParameters() {
			
			// Initialize result
			var result = {};
			
			// Check if URL query string exists
			if(typeof URL_QUERY_STRING !== "undefined") {
		
				// Get URL parameters from URL query string
				var urlParameters = URL_QUERY_STRING.substring(Common.URL_QUERY_STRING_SEPARATOR["length"]).split(Common.URL_QUERY_STRING_PARAMETER_SEPARATOR);
				
				// Go through all URL parameters
				for(var i = 0; i < urlParameters["length"]; ++i) {
				
					// Get URL parameter
					var urlParameter = urlParameters[i].split(Common.URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR);
					
					// Check if URL parameter is valid
					if(urlParameter["length"] === 2) {
					
						// Get URL parameter's key
						var key = decodeURIComponent(urlParameter[0].replace(/\+/ug, "%20"));
						
						// Check if key isn't already in the rersult
						if(key in result === false) {
					
							// Set URL parameter in the result
							result[key] = decodeURIComponent(urlParameter[1].replace(/\+/ug, "%20"));
						}
					}
				}
			}
			
			// Return result
			return result;
		}
		
		// URL contains protocol
		static urlContainsProtocol(url) {
		
			// Return if the URL contains protocol
			return Common.URL_PROTOCOL_PATTERN.test(url) === true;
		}
		
		// URL contains top-level domain
		static urlContainsTopLevelDomain(url) {
		
			// Return if the URL contains a top-level domain
			return Common.URL_TOP_LEVEL_DOMAIN_PATTERN.test(url) === true;
		}
		
		// Remove subdomain
		static removeSubdomain(url) {
		
			// Return URL's without its subdomain
			return url.match(Common.URL_DOMAIN_NAME_PATTERN)[0];
		}
		
		// Remove top-level domain
		static removeTopLevelDomain(url) {
		
			// Return URL without its top-level domain
			return url.match(Common.URL_WITHOUT_TOP_LEVEL_DOMAIN_PATTERN)[1];
		}
		
		// Remove trailing slashes
		static removeTrailingSlashes(text) {
		
			// Return text with its trailing slashes removed
			return Common.rtrim(text).replace(Common.TRAILING_SLASHES_PATTERN, "");
		}
		
		// Remove duplicate slashes
		static removeDuplicateSlashes(text) {
		
			// Return text with its duplicate slashes removed
			return text.replace(Common.DUPLICATE_SLASHES_PATTERN, "/");
		}
		
		// Split remaining
		static splitRemaining(text, separator, limit) {
		
			// Initialzie result
			var result = [];
			
			// Go through limit
			for(var i = 0; i < limit; ++i) {
			
				// Get last separator end
				var lastSeparatorEnd = separator["lastIndex"];
			
				// Get current separator start
				var currentSeparatorStart = separator.exec(text);
				
				// Check if separator start exists
				if(currentSeparatorStart !== Common.NO_MATCH_FOUND) {
			
					// Append part to result
					result.push(text.slice(lastSeparatorEnd, currentSeparatorStart["index"]));
				}
				
				// Otherwise
				else {
				
					// Get last part
					var lastPart = text.slice(lastSeparatorEnd);
				
					// Check if last part exists and isn't a separator
					if(lastPart["length"] !== 0 && separator.test(lastPart) === false) {
				
						// Append last part to result
						result.push(lastPart);
					}
				
					// Return result
					return result;
				}
			}
			
			// Get last part
			var lastPart = text.slice(separator["lastIndex"]);
			
			// Check if last part exists and isn't a separator
			if(lastPart["length"] !== 0 && separator.test(lastPart) === false) {
			
				// Append last part to result
				result.push(lastPart);
			}
			
			// Return result
			return result;
		}
		
		// Remove duplicate newlines
		static removeDuplicateNewlines(text) {
		
			// Return text with duplicate newlines and trailing newlines removed from it
			return text.replace(Common.DUPLICATE_NEWLINE_PATTERN, "\n").replace(Common.TRAILING_NEWLINE_PATTERN, "");
		}
		
		// Remove trailing zeros
		static removeTrailingZeros(text) {
		
			// Remove trailing zeros and ending decimal point from text
			text = text.replace(Common.TRAILING_ZEROS_PATTERN, "$1").replace(Common.ENDING_DECIMAL_POINT_PATTERN, "");
			
			// Check if text is invalid
			if(Number.isNaN(parseFloat(text)) === true) {
			
				// Return zero
				return "0";
			}
			
			// Otherwise
			else {
			
				// Return text
				return text;
			}
		}
		
		// Get number string precision
		static getNumberStringPrecision(text) {

			// Remove trailing zeros from text
			text = Common.removeTrailingZeros(text);

			// Check if text doesn't contains a fractional component
			var fractionIndex = text.indexOf(".");
			
			if(fractionIndex === Common.INDEX_NOT_FOUND) {
			
				// Return zero
				return 0;
			}
			
			// Otherwise
			else {
			
				// Return number of fractional digits
				return text["length"] - (fractionIndex + "."["length"]);
			}
		}
		
		// Serialize object
		static serializeObject(object) {
		
			// Check if object is an array
			if(Array.isArray(object) === true) {
			
				// Return serialized object
				return {
				
					// Value
					"Value": object.map(function(value) {
					
						// Return serialized value
						return Common.serializeObject(value);
					})
				};
			}
		
			// Otherwise check if object is an object
			else if(typeof object === "object" && object !== null) {
			
				// Check if object is a typed array
				if("buffer" in object === true && object["buffer"] instanceof ArrayBuffer === true) {
				
					// Get object's type
					var type = Object["prototype"]["toString"].call(object).match(Common.OBJECT_TYPE_PATTERN);
					
					// Return serialized object
					return {
					
						// Constructor
						"Constructor": (type !== Common.NO_MATCH_FOUND) ? type[1] : object["constructor"]["name"],
						
						// Value
						"Value": Array.from(object)
					};
				}
				
				// Otherwise
				else {
		
					// Return serialized object
					return {
					
						// Constructor
						"Constructor": (object instanceof BigNumber === true) ? "BigNumber" : object["constructor"]["name"],
						
						// Properties
						"Properties": Object.entries(object).map(function(property) {
						
							// Return serialized property
							return {
							
								// Name
								"Name": property[0],
								
								// Value
								"Value": Common.serializeObject(property[1])
							};
						})
					};
				}
			}
			
			// Otherwise
			else {
			
				// Return serialized object
				return {
				
					// Value
					"Value": object
				};
			}
		}
		
		// Unserialize object
		static unserializeObject(serializedObject) {
		
			// Check if serialized object contains a constructor
			if("Constructor" in serializedObject === true) {
			
				// Check if serialized object can be created
				if(serializedObject["Constructor"] in globalThis === true) {
			
					// Check if serialzed object is a typed array
					if("Value" in serializedObject === true) {
					
						// Create object
						var object = new globalThis[serializedObject["Constructor"]](serializedObject["Value"]);
						
						// Return object
						return object;
					}
					
					// Otherwise
					else {
					
						// Create object
						var object = Object.create(globalThis[serializedObject["Constructor"]]["prototype"]);
					
						// Go through all of the serialized object's properties
						for(var i = 0; i < serializedObject["Properties"]["length"]; ++i) {
						
							// Get property
							var property = serializedObject["Properties"][i];
							
							// Set property in the object
							object[property["Name"]] = Common.unserializeObject(property["Value"]);
						}
						
						// Return object
						return object;
					}
				}
				
				// Otherwise
				else {
				
					// Return undefined
					return undefined;
				}
			}
			
			// Otherwise check if serialzied object is an array
			else if(Array.isArray(serializedObject["Value"]) === true) {
			
				// Return serialized object's value
				return serializedObject["Value"].map(function(serializedValue) {
				
					// Return unserializing the serialized value
					return Common.unserializeObject(serializedValue);
				});
			}
			
			// Otherwise
			else {
		
				// Return serialized object's value
				return serializedObject["Value"];
			}
		}
		
		// Request animation frame or timeout
		static requestAnimationFrameOrTimeout(callback) {
		
			// Initialize animation frame
			var animationFrame;
			
			// Set timeout
			var timeout = setTimeout(function() {
			
				// Cancel animation frame
				cancelAnimationFrame(animationFrame);
				
				// Run callback
				callback(event);
				
			}, Common.REQUEST_ANIMATION_FRAME_TIMEOUT_MILLISECONDS);
			
			// Set animation frame
			animationFrame = requestAnimationFrame(function(event) {
			
				// Clear timeout
				clearTimeout(timeout);
				
				// Run callback
				callback(event);
			});
		}
		
		// Ltrim
		static ltrim(text) {
		
			// Return text with leading whitespace removed
			return text.replace(Common.LEADING_WHITESPACE_PATTERN, "");
		}
		
		// Rtrim
		static rtrim(text) {
		
			// Return text with trailing whitespace removed
			return text.replace(Common.TRAILING_WHITESPACE_PATTERN, "");
		}
		
		// Get preserved URL parameters
		static getPreservedUrlParameters() {
		
			// Check if is popup
			if(Common.isPopup() === true) {
			
				// Return preserved URL parameters
				return Common.URL_QUERY_STRING_PARAMETER_SEPARATOR + encodeURIComponent("Is Popup").replace(/%20/ug, "+") + Common.URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR + encodeURIComponent("True").replace(/%20/ug, "+");
			}
			
			// Otherwise
			else {
			
				// Return nothing
				return "";
			}
		}
		
		// Save file
		static saveFile(name, contents) {
		
			// Create anchor
			var anchor = $("<a></a>");
			
			// Create URL from contents
			var url = URL.createObjectURL(new Blob([
			
				// Contents
				contents
			], {
			
				// Type
				"type": "application/octet-stream"
			}));
			
			// Set anchor's href to URL
			anchor.attr("href", url);
			
			// Set anchor's download to name
			anchor.attr("download", name);
			
			// Click on anchor
			anchor.get(0).click();
			
			// Set timeout
			setTimeout(function() {
			
				// Revoke URL
				URL.revokeObjectURL(url);
			}, 0);
		}
		
		// Has whitespace
		static hasWhitespace(text) {
		
			// Return if text has whitespace
			return Common.HAS_WHITESPACE_PATTERN.test(text) === true;
		}
		
		// Remove whitespace
		static removeWhitespace(text) {
		
			// Return text with whitespace removed
			return text.replace(Common.HAS_WHITESPACE_PATTERN, "");
		}
		
		// Milliseconds in a second
		static get MILLISECONDS_IN_A_SECOND() {
		
			// Return milliseconds in a second
			return 1000;
		}
		
		// Seconds in a minute
		static get SECONDS_IN_A_MINUTE() {
		
			// Return minutes in a second
			return 60;
		}

		// Minutes in an hour
		static get MINUTES_IN_AN_HOUR() {
		
			// Return minutes in an hour
			return 60;
		}

		// Hours in a day
		static get HOURS_IN_A_DAY() {
		
			// Return hours in a day
			return 24;
		}

		// Days in a week
		static get DAYS_IN_A_WEEK() {
		
			// Return days in a week
			return 7;
		}

		// Weeks in a year
		static get WEEKS_IN_A_YEAR() {
		
			// Return weeks in a year
			return 52;
		}

		// Byte max value
		static get BYTE_MAX_VALUE() {
		
			// Return byte max value
			return Math.pow(2, Common.BITS_IN_A_BYTE) - 1;
		}
		
		// Uint16 max value
		static get UINT16_MAX_VALUE() {
		
			// Return uint16 max value
			return Math.pow(2, Common.BITS_IN_A_BYTE * Uint16Array["BYTES_PER_ELEMENT"]) - 1;
		}
		
		// Uint32 max value
		static get UINT32_MAX_VALUE() {
		
			// Return uint32 max value
			return Math.pow(2, Common.BITS_IN_A_BYTE * Uint32Array["BYTES_PER_ELEMENT"]) - 1;
		}
		
		// Int32 max value
		static get INT32_MAX_VALUE() {
		
			// Return int32 max value
			return Math.pow(2, Common.BITS_IN_A_BYTE * Int32Array["BYTES_PER_ELEMENT"] - 1) - 1;
		}
		
		// Bytes in a uint8
		static get BYTES_IN_A_UINT8() {
		
			// Return bytes in a uint8
			return 8 / Common.BITS_IN_A_BYTE;
		}
		
		// Bytes in a uint16
		static get BYTES_IN_A_UINT16() {
		
			// Return bytes in a uint16
			return 16 / Common.BITS_IN_A_BYTE;
		}
		
		// Bytes in a uint32
		static get BYTES_IN_A_UINT32() {
		
			// Return bytes in a uint32
			return 32 / Common.BITS_IN_A_BYTE;
		}
		
		// Bytes in a uint64
		static get BYTES_IN_A_UINT64() {
		
			// Return bytes in a uint64
			return 64 / Common.BITS_IN_A_BYTE;
		}
		
		// Invalid local storage item
		static get INVALID_LOCAL_STORAGE_ITEM() {
		
			// Return invalid local storage item
			return null;
		}
		
		// Index not found
		static get INDEX_NOT_FOUND() {
		
			// Return index not found
			return -1;
		}
		
		// No match found
		static get NO_MATCH_FOUND() {
		
			// Return no match found
			return null;
		}
		
		// No tab index
		static get NO_TAB_INDEX() {
		
			// Return no tab index
			return "-1";
		}
		
		// Decimal number base
		static get DECIMAL_NUMBER_BASE() {
		
			// Return decimal number base
			return 10;
		}
		
		// Hex number base
		static get HEX_NUMBER_BASE() {
		
			// Return hex number base
			return 16;
		}
		
		// Hex number length
		static get HEX_NUMBER_LENGTH() {
		
			// Return hex number length
			return "FF"["length"];
		}
		
		// Hex color length
		static get HEX_COLOR_LENGTH() {
		
			// Return hex color length
			return "FFFFFF"["length"];
		}
		
		// Hex number padding
		static get HEX_NUMBER_PADDING() {
		
			// Return hex number padding
			return "0";
		}
		
		// Focus change event
		static get FOCUS_CHANGE_EVENT() {
		
			// Return focus change event
			return "FocusChangeEvent";
		}
		
		// No attribute
		static get NO_ATTRIBUTE() {
		
			// Return no attribute
			return undefined;
		}
		
		// No argument
		static get NO_ARGUMENT() {
		
			// Return no argument
			return undefined;
		}
		
		// URL query string separator
		static get URL_QUERY_STRING_SEPARATOR() {
		
			// Return URL query string separator
			return "?";
		}
		
		// URL query string parameter separator
		static get URL_QUERY_STRING_PARAMETER_SEPARATOR() {
		
			// Return URL query string parameter separator
			return "&";
		}
		
		// URL query string parameter value separator
		static get URL_QUERY_STRING_PARAMETER_VALUE_SEPARATOR() {
		
			// Return URL query string parameter value separator
			return "=";
		}
		
		// Data attribute prefix
		static get DATA_ATTRIBUTE_PREFIX() {
		
			// Return data attribute prefix
			return "data-";
		}
		
		// First match result index
		static get FIRST_MATCH_RESULT_INDEX() {
		
			// Return first match result index
			return 1;
		}
		
		// JSON NULL value
		static get JSON_NULL_VALUE() {
		
			// Return JSON NULL value
			return null;
		}
		
		// HTTP protocol
		static get HTTP_PROTOCOL() {
		
			// Return HTTP protocol
			return "http:";
		}
		
		// HTTPS protocol
		static get HTTPS_PROTOCOL() {
		
			// Return HTTPS protocol
			return "https:";
		}
		
		// WebSocket protocol
		static get WEBSOCKET_PROTOCOL() {
		
			// Return WebSocket protocol
			return "ws:";
		}
		
		// WebSocket secure protocol
		static get WEBSOCKET_SECURE_PROTOCOL() {
		
			// Return WebSocket secure protocol
			return "wss:";
		}
		
		// File protocol
		static get FILE_PROTOCOL() {
		
			// Return file protocol
			return "file:";
		}
		
		// HTTP no response status
		static get HTTP_NO_RESPONSE_STATUS() {
		
			// Return HTTP no response status
			return 0;
		}
		
		// HTTP ok status
		static get HTTP_OK_STATUS() {
		
			// Return HTTP ok status
			return 200;
		}
		
		// HTTP bad request status
		static get HTTP_BAD_REQUEST_STATUS() {
		
			// Return HTTP bad request status
			return 400;
		}
		
		// HTTP unauthorized status
		static get HTTP_UNAUTHORIZED_STATUS() {
		
			// Return HTTP unauthorized status
			return 401;
		}
		
		// HTTP forbidden status
		static get HTTP_FORBIDDEN_STATUS() {
		
			// Return HTTP forbidden status
			return 403;
		}
		
		// HTTP not found status
		static get HTTP_NOT_FOUND_STATUS() {
		
			// Return HTTP not found status
			return 404;
		}
		
		// HTTP payload too large status
		static get HTTP_PAYLOAD_TOO_LARGE_STATUS() {
		
			// Return HTTP payload too large status
			return 413;
		}
		
		// HTTP unsupported media type status
		static get HTTP_UNSUPPORTED_MEDIA_TYPE_STATUS() {
		
			// Return HTTP unsupported media type status
			return 415;
		}
		
		// HTTP bad gateway status
		static get HTTP_BAD_GATEWAY_STATUS() {
		
			// Return HTTP bad gateway status
			return 502;
		}
		
		// HTTP gateway timeout status
		static get HTTP_GATEWAY_TIMEOUT_STATUS() {
		
			// Return HTTP gateway timeout status
			return 504;
		}
		
		// Double quote pattern
		static get DOUBLE_QUOTE_PATTERN() {
		
			// Return double quote pattern
			return /"/ug;
		}
		
		// Enable event
		static get ENABLE_EVENT() {
			
			// Return enable event
			return "CommonEnableEvent";
		}
		
		// Primary pointer button bitmask
		static get PRIMARY_POINTER_BUTTON_BITMASK() {
		
			// Return primary pointer button bitmask
			return 1;
		}
		
		// January month index
		static get JANUARY_MONTH_INDEX() {
		
			// Return january month index
			return 0;
		}
		
		// Sort equal to
		static get SORT_EQUAL() {
		
			// Return sort equal
			return 0;
		}
		
		// Sort greater than
		static get SORT_GREATER_THAN() {
		
			// Return sort greater than
			return Common.SORT_EQUAL + 1;
		}
		
		// Sort less than
		static get SORT_LESS_THAN() {
		
			// Return sort less than
			return Common.SORT_EQUAL - 1;
		}
		
		// Visibility state visible
		static get VISIBILITY_STATE_VISIBLE() {
		
			// Return visibility state visible
			return "visible";
		}
		
		// Visibility state hidden
		static get VISIBILITY_STATE_HIDDEN() {
		
			// Return visibility state hidden
			return "hidden";
		}
		
		// Canceled error
		static get CANCELED_ERROR() {
		
			// Return canceled error
			return "CommonCancelError";
		}
		
		// No cancel occurred
		static get NO_CANCEL_OCCURRED() {
		
			// Return no cancel occurred
			return null;
		}
		
		// Hex prefix
		static get HEX_PREFIX() {
		
			// Return hex prefix
			return "0x";
		}
		
		// Default HTTP port
		static get DEFAULT_HTTP_PORT() {
		
			// Return default HTTP port
			return 80;
		}
		
		// Default HTTPS port
		static get DEFAULT_HTTPS_PORT() {
		
			// Return default HTTPS port
			return 443;
		}
	
	// Private
		
		// Bits in a byte
		static get BITS_IN_A_BYTE() {
		
			// Return bits in a byte
			return 8;
		}
		
		// Number string pattern
		static get NUMBER_STRING_PATTERN() {
		
			// Return number string pattern
			return /^[+-]?(?:0(?:\.\d+)?|[1-9]\d*(?:\.\d+)?|\.\d+)$/u;
		}
		
		// Hex string pattern
		static get HEX_STRING_PATTERN() {
		
			// Return hex string pattern
			return /^(?:[0-9A-F])+$/iu;
		}
		
		// Hex character to value
		static get HEX_CHARACTER_TO_VALUE() {
		
			// Return hex character to value
			return {
			
				// Zero
				"0": 0x00,
				
				// One
				"1": 0x01,
				
				// Two
				"2": 0x02,
				
				// Three
				"3": 0x03,
				
				// Four
				"4": 0x04,
				
				// Five
				"5": 0x05,
				
				// Six
				"6": 0x06,
				
				// Seven
				"7": 0x07,
				
				// Eight
				"8": 0x08,
				
				// Nine
				"9": 0x09,
				
				// Uppercase a
				"A": 0x0A,
				
				// Uppercase b
				"B": 0x0B,
				
				// Uppercase c
				"C": 0x0C,
				
				// Uppercase d
				"D": 0x0D,
				
				// Uppercase e
				"E": 0x0E,
				
				// Uppercase f
				"F": 0x0F,
				
				// Lowercase a
				"a": 0x0A,
				
				// Lowercase b
				"b": 0x0B,
				
				// Lowercase c
				"c": 0x0C,
				
				// Lowercase d
				"d": 0x0D,
				
				// Lowercase e
				"e": 0x0E,
				
				// Lowercase f
				"f": 0x0F
			};
		}
		
		// Value to hex character
		static get VALUE_TO_HEX_CHARACTER() {
		
			// Return value to hex character
			return [
			
				// Zero
				"0",
				
				// One
				"1",
				
				// Two
				"2",
				
				// Three
				"3",
				
				// Four
				"4",
				
				// Five
				"5",
				
				// Six
				"6",
				
				// Seven
				"7",
				
				// Eight
				"8",
				
				// Nine
				"9",
				
				// A
				"a",
				
				// B
				"b",
				
				// C
				"c",
				
				// D
				"d",
				
				// E
				"e",
				
				// F
				"f"
			];
		}
		
		// RFC 3339 string pattern
		static get RFC_3339_STRING_PATTERN() {
		
			// Return RFC 3339 string pattern
			return /^(?:\d+)-(?:0[1-9]|1[012])-(?:0[1-9]|[12]\d|3[01])[Tt](?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d|60)(?:\.\d+)?(?:(?:[Zz])|(?:[\+|\-](?:[01]\d|2[0-3]):[0-5]\d))$/u;
		}
		
		// Lowercase string pattern
		static get LOWERCASE_STRING_PATTERN() {
		
			// Return lowercase string pattern
			return /^[a-z0-9]+$/u;
		}
		
		// Single quote HTML entity
		static get SINGLE_QUOTE_HTML_ENTITY() {
		
			// Return single quote HTML entity
			return "&#39;";
		}
		
		// Double quote HTML entity
		static get DOUBLE_QUOTE_HTML_ENTITY() {
		
			// Return double quote HTML entity
			return "&quot;";
		}
		
		// Grave accent HTML entity
		static get GRAVE_ACCENT_HTML_ENTITY() {
		
			// Return grave accent HTML entity
			return "&#96;";
		}
		
		// Single quote pattern
		static get SINGLE_QUOTE_PATTERN() {
		
			// Return single quote pattern
			return /'/ug;
		}
		
		// Grave accent pattern
		static get GRAVE_ACCENT_PATTERN() {
		
			// Return grave accent pattern
			return /`/ug;
		}
		
		// Return low memory threshold gigabytes
		static get LOW_MEMORY_THRESHOLD_GIGABYTES() {
		
			// Return low memory threshold gigabytes
			return 2;
		}
		
		// Return high memory threshold gigabytes
		static get HIGH_MEMORY_THRESHOLD_GIGABYTES() {
		
			// Return high memory threshold gigabytes
			return 8;
		}
		
		// URL protocol pattern
		static get URL_PROTOCOL_PATTERN() {
		
			// Return URL protocol pattern
			return /^[^:]+:\/\/.+/u;
		}
		
		// URL top-level domain pattern
		static get URL_TOP_LEVEL_DOMAIN_PATTERN() {
		
			// Return URL top-level domain pattern
			return /[^\.]+\.[^\/?:#\s]+(?:[\/?:#\s]|$)/u;
		}
		
		// URL domain name pattern
		static get URL_DOMAIN_NAME_PATTERN() {
		
			// Return URL domain name pattern
			return /[^\.]+\.[^\.]+$/u;
		}
		
		// URL without top-level domain pattern
		static get URL_WITHOUT_TOP_LEVEL_DOMAIN_PATTERN() {
		
			// Return URL without top-level domain pattern
			return /([^\.]+)\.[^\.]+$/u;
		}
		
		// Trailing slashes pattern
		static get TRAILING_SLASHES_PATTERN() {
		
			// Return trailing slashes pattern
			return /\/+$/u;
		}
		
		// Duplicate slashes pattern
		static get DUPLICATE_SLASHES_PATTERN() {
		
			// Return duplicate slashes pattern
			return /\/+/ug;
		}
		
		// Duplicate newline pattern
		static get DUPLICATE_NEWLINE_PATTERN() {
		
			// Return duplicate newline pattern
			return /\n+/ug;
		}
		
		// Trailing zeros pattern
		static get TRAILING_ZEROS_PATTERN() {
		
			// Return trailing zeros pattern
			return /(\.\d*?)0+$/u;
		}
		
		// Ending decimal point pattern
		static get ENDING_DECIMAL_POINT_PATTERN() {
		
			// Return ending decimal point pattern
			return /\.$/u;
		}
		
		// Trailing newline pattern
		static get TRAILING_NEWLINE_PATTERN() {
		
			// Return trailing newline pattern
			return /\n$/u;
		}
		
		// Object type pattern
		static get OBJECT_TYPE_PATTERN() {
		
			// Return object type pattern
			return /^\[object\s*(.*)\]$/u;
		}
		
		// Request animation frame timeout milliseconds
		static get REQUEST_ANIMATION_FRAME_TIMEOUT_MILLISECONDS() {
		
			// Return request animation frame timeout milliseconds
			return 100;
		}
		
		// Leading whitespace pattern
		static get LEADING_WHITESPACE_PATTERN() {
		
			// Return leading whitespace pattern
			return /^\s+/u;
		}
		
		// Trailing whitespace pattern
		static get TRAILING_WHITESPACE_PATTERN() {
		
			// Return leading whitespace pattern
			return /\s+$/u;
		}
		
		// Has whitespace pattern
		static get HAS_WHITESPACE_PATTERN() {
		
			// Return has whitespace pattern
			return /\s/ug;
		}
}


// Main function

// Set global object's common
globalThis["Common"] = Common;

// Export common
module["exports"] = Common;

// Check if jQuery exists
if(typeof jQuery === "function") {

	// Disable tab
	$["prototype"].disableTab = function() {

		// Go through each element
		this.each(function() {
		
			// Add no tab index to element
			$(this).attr("tabindex", Common.NO_TAB_INDEX);
		});
		
		// Return elements
		return this;
	};

	// Enable tab
	$["prototype"].enableTab = function() {

		// Go through each element
		this.each(function() {
		
			// Remove tab index from element
			$(this).removeAttr("tabindex");
		});
		
		// Return elements
		return this;
	};

	// Disable
	$["prototype"].disable = function() {

		// Go through each element
		this.each(function() {
		
			// Disable the element
			$(this).prop("disabled", true);
		});
		
		// Return elements
		return this;
	};

	// Enable
	$["prototype"].enable = function() {

		// Go through each element
		this.each(function() {
		
			// Enable the element and trigger an enable event on the element
			$(this).prop("disabled", false).trigger(Common.ENABLE_EVENT);
		});
		
		// Return elements
		return this;
	};

	// Outer Html
	$["prototype"].outerHtml = function() {

		// Return element's outer HTML
		return this.wrap("<div>").parent().html();
	};
	
	// Scroll idle duration milliseconds
	var SCROLL_IDLE_DURATION_MILLISECONDS = 250;
	
	// Scroll stopped
	$["fn"].scrollStopped = function(callback) {
	
		// Go through each element
		this.each(function() {
		
			// Set self
			var self = $(this);
			
			// Get index
			var index = (typeof self.data("scrollStoppedIndex") === "undefined") ? 0 : self.data("scrollStoppedIndex");
			
			// Self scroll scroll stopped index event
			self.on("scroll.scrollStopped" + index.toFixed(), function(event) {
			
				// Check if scroll stopped timeout index exists
				if(typeof self.data("scrollStoppedTimeout" + index.toFixed()) !== "undefined") {
			
					// Clear scroll stopped timeout index
					clearTimeout(self.data("scrollStoppedTimeout" + index.toFixed()));
				}
				
				// Set scroll stopped timeout index
				self.data("scrollStoppedTimeout" + index.toFixed(), setTimeout(function() {
				
					// Remove scroll stopped timeout index
					self.removeData("scrollStoppedTimeout" + index.toFixed());
					
					// Run callback
					callback.bind(self)(event);
					
				}, SCROLL_IDLE_DURATION_MILLISECONDS));
			});
			
			// Increment index
			self.data("scrollStoppedIndex", (index === Number.MAX_SAFE_INTEGER) ? 0 : index + 1);
		});
		
		// Return elements
		return this;
	};
	
	// Transition end timeout milliseconds
	var TRANSITION_END_TIMEOUT_MILLISECONDS = 100;
	
	// Transition end or timeout
	$["fn"].transitionEndOrTimeout = function(callback, property) {
	
		// Go through each element
		this.each(function() {
		
			// Set self
			var self = $(this);
			
			// Set timeout
			var timeout = TRANSITION_END_TIMEOUT_MILLISECONDS;
			
			// Go through all of the element's transition properties
			var properties = self.css("transition-property").split(",");
			for(var i = 0; i < properties["length"]; ++i) {
			
				// Check if property was found
				if(properties[i].trim() === property) {
				
					// Get transition's duration
					var duration = self.css("transition-duration").split(",")[i].trim();
					
					// Get transition's delay
					var delay = self.css("transition-delay").split(",")[i].trim();
					
					// Set timeout to the duration
					timeout = parseFloat(duration) * ((duration.indexOf("ms") !== Common.INDEX_NOT_FOUND) ? 1 : Common.MILLISECONDS_IN_A_SECOND) + parseFloat(delay) * ((delay.indexOf("ms") !== Common.INDEX_NOT_FOUND) ? 1 : Common.MILLISECONDS_IN_A_SECOND) + TRANSITION_END_TIMEOUT_MILLISECONDS;
					
					// Break
					break;
				}
			}
			
			// Get index
			var index = (typeof self.data("transitionEndOrTimeoutIndex") === "undefined") ? 0 : self.data("transitionEndOrTimeoutIndex");
			
			// Set transition end or timeout timeout index
			self.data("transitionEndOrTimeoutTimeout" + index.toFixed(), setTimeout(function() {
			
				// Turn off transition end transition end or timeout index event
				self.off("transitionend.transitionEndOrTimeout" + index.toFixed());
				
				// Remove transition end or timeout timeout index
				self.removeData("transitionEndOrTimeoutTimeout" + index.toFixed());
				
				// Run callback
				callback.bind(self)();
				
			}, timeout));
			
			// Self transition end transition end or timeout index event
			self.one("transitionend.transitionEndOrTimeout" + index.toFixed(), function(event) {
			
				// Clear transition end or timeout timeout index
				clearTimeout(self.data("transitionEndOrTimeoutTimeout" + index.toFixed()));
				
				// Remove transition end or timeout timeout index
				self.removeData("transitionEndOrTimeoutTimeout" + index.toFixed());
				
				// Run callback
				callback.bind(self)(event);
			});
			
			// Increment index
			self.data("transitionEndOrTimeoutIndex", (index === Number.MAX_SAFE_INTEGER) ? 0 : index + 1);
		});
		
		// Return elements
		return this;
	};
	
	// Off transition end or timeout
	$["fn"].offTransitionEndOrTimeout = function() {
	
		// Go through each element
		this.each(function() {
		
			// Set self
			var self = $(this);
			
			// Turn off transition end event
			self.off("transitionend");
			
			// Get data
			var data = self.data();
			
			// Go through all data
			for(var key in data) {
						
				if(data.hasOwnProperty(key) === true) {
				
					// Check if data is a transition end or timeout timeout index
					if(key.indexOf("transitionEndOrTimeoutTimeout") === 0) {
					
						// Clear transition end or timeout timeout index
						clearTimeout(self.data(key));
						
						// Remove transition end or timeout timeout index
						self.removeData(key);
					}
				}
			}
		});
		
		// Return elements
		return this;
	};
}

// Check if BigNumber exists
if(typeof BigNumber === "function") {

	// Big endian
	BigNumber.BIG_ENDIAN = 0;
	
	// Little endian
	BigNumber.LITTLE_ENDIAN = 1;
	
	// Any length
	BigNumber.ANY_LENGTH = -1;

	// To bytes
	BigNumber.prototype.toBytes = function(endianness = BigNumber.LITTLE_ENDIAN, length = BigNumber.ANY_LENGTH) {
	
		// Check if is number isn't supported
		if(this.isFinite() === false || this.isNaN() === true || this.isNegative() === true || this.isInteger() === false) {
		
			// Throw error
			throw "Unsupported number.";
		}
		
		// Otherwise
		else {
	
			// Create bytes
			var bytes = new Array((length === BigNumber.ANY_LENGTH) ? 1 : length).fill(0);
			
			// Make number a whole number
			var temp = this.dividedToIntegerBy(1);
			
			// Go through all bytes in the whole number
			for(var i = 0; temp.isGreaterThan(0); ++i) {
			
				// Get byte from the whole number
				var byte = temp.modulo(Common.BYTE_MAX_VALUE + 1).toNumber();
				
				// Remove byte from the whole number
				temp = temp.dividedToIntegerBy(Common.BYTE_MAX_VALUE + 1);
				
				// Check if space exists in bytes for the byte
				if(i < bytes["length"]) {
				
					// Set byte in bytes
					bytes[i] = byte;
				}
				
				// Otherwise check if length is Constrained
				else if(length !== BigNumber.ANY_LENGTH) {
				
					// Throw error
					throw "Insufficient length.";
				}
				
				// Otherwise
				else {
				
					// Append byte to bytes
					bytes.push(byte);
				}
			}
			
			// Check if endianness is big endian
			if(endianness === BigNumber.BIG_ENDIAN) {
			
				// Reverse bytes order
				bytes = bytes.reverse();
			}
			
			// Return bytes
			return new Uint8Array(bytes);
		}
	};
}

// Check if object exists
if(typeof Object === "function") {

	// Is object
	Object.isObject = function(variable) {
	
		// Try
		try {

			// Return if variable is an object
			return Object.getPrototypeOf(variable)["constructor"]["name"] === "Object";
		}
		
		// Catch errors
		catch(error) {
		
			// Return false
			return false;
		}
	};
}

// Check if Uint8Array exist
if(typeof Uint8Array === "function") {

	// Read uint32 little endian
	Uint8Array["prototype"].readUInt32LE = function(index) {
	
		// Return value at index as a uint32 in little endian
		return this[index] | (this[index + 1] << Common.BITS_IN_A_BYTE) | (this[index + 2] << (Common.BITS_IN_A_BYTE * 2)) | (this[index + 3] << (Common.BITS_IN_A_BYTE * 3));
	};
	
	// Read uint16 little endian
	Uint8Array["prototype"].readUInt16LE = function(index) {
	
		// Return value at index as a uint16 in little endian
		return this[index] | (this[index + 1] << Common.BITS_IN_A_BYTE);
	};
}

// Check if cross-origin isolated doesn't exist
if(typeof crossOriginIsolated === "undefined") {

	// Set cross-origin isolated to false
	var crossOriginIsolated = false;
}
