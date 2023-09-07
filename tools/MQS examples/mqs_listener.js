// Install dependencies: npm i @ledgerhq/hw-transport-node-hid
// Run: node mqs_listener.js

// Use strict
"use strict";


// Requires
const https = require("https");
const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid")["default"];
const BigNumber = require("../../tests/functional_tests/bignumber.js-9.1.1.js");
const Common = require("../../tests/functional_tests/common.js");


// Constants

// MQS server
const MQS_SERVER = "https://mqs.mwc.mw:443";

// Request class
const REQUEST_CLASS = 0xC7;

// Request get address instruction
const REQUEST_GET_ADDRESS_INSTRUCTION = 0x01;

// Request get MQS challenge signature instruction
const REQUEST_GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION = 0x15;

// Response delimiter length
const RESPONSE_DELIMITER_LENGTH = (new Uint8Array([0x00, 0x00]))["length"];

// MQS address type
const MQS_ADDRESS_TYPE = 0;

// No parameter
const NO_PARAMETER = 0;

// Account
const ACCOUNT = new BigNumber(0);

// Index
const INDEX = new BigNumber(0);


// Main fucntion
(async function() {

	// Display message
	console.log("Connecting to hardware wallet");

	// Connect to the hardware wallet using USB
	const hardwareWallet = await TransportNodeHid.open();
	
	// Display message
	console.log("Getting MQS address from hardware wallet");
	
	// Get the MQS address from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_ADDRESS_INSTRUCTION, MQS_ADDRESS_TYPE, NO_PARAMETER, Buffer.concat([
	
		// Account
		Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Index
		Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32))
	]));
	
	// Remove response code from the response
	const mqsAddress = (new TextDecoder()).decode(response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH));
	
	// Display message
	console.log("MQS address is " + mqsAddress);
	
	// Display message
	console.log("Getting timestamp from server");
	
	// Get timestamp from the server
	const timestamp = await sendGetRequest(MQS_SERVER  + "/timenow?address=" + mqsAddress);
	
	// Display message
	console.log("Timestamp is " + timestamp);
	
	// Get time zone offset
	const timeZoneOffset = (new Date()).getTimezoneOffset();
	
	// Convert time zone offset to the correct format
	const timeZoneOffsetBuffer = new ArrayBuffer(Uint16Array["BYTES_PER_ELEMENT"]);
	const timeZoneOffsetBufferView = new DataView(timeZoneOffsetBuffer);
	timeZoneOffsetBufferView.setUint16(0, timeZoneOffset, true);
	
	// Display message
	console.log("Getting challenge signature from hardware wallet");
	
	// Get the challenge signature from the hardware wallet
	response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
				
		// Account
		Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Index
		Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Timestamp
		Buffer.from((new BigNumber(timestamp)).toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
		
		// Time zone offset
		Buffer.from(new Uint8Array(timeZoneOffsetBuffer))
	]));
	
	// Remove response code from the response
	const signature = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Display message
	console.log("Challenge signature is " + Common.toHexString(signature));
	
	// Display message
	console.log("Waiting for messages from server");
	
	// Get messages from the server
	const messages = await sendGetRequest(MQS_SERVER  + "/listener?address=" + mqsAddress + "&signature=" + Common.toHexString(signature) + "&time_now=" + timestamp + "&delTo=nil&first=true");
	
	// Display message
	console.log("Message received");
	
	// Display message
	console.log(messages);
})();


// Supporting function implementation

// Send GET request
function sendGetRequest(url) {

	// Return promise
	return new Promise(function(resolve, reject) {
	
		// Initialize data
		let data = "";
	
		// Create request
		const request = https.request(url, function(response) {
		
			// Response data event
			response.on("data", function(chunk) {
			
				// Append chunk to data
				data += chunk.toString();
			});
		
			// Response end event
			response.on("end", function() {
			
				// Resolve data
				resolve(data);
			});
		
		// Request error event
		}).on("error", function(error) {
		
			// Reject
			reject();
		});
		
		// Send request
		request.end();
	});
}
