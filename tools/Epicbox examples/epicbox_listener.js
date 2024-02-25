// Install dependencies: npm i @ledgerhq/hw-transport-node-hid ws
// Run: node epicbox_listener.js

// Use strict
"use strict";


// Requires
const WebSocket = require("ws");
const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid")["default"];
const BigNumber = require("../../tests/functional_tests/bignumber.js-9.1.1.js");
const Common = require("../../tests/functional_tests/common.js");


// Constants

// Epicbox server
const EPICBOX_SERVER = "wss://epicbox.epicnet.us:443";

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
	console.log("Getting Epicbox address from hardware wallet");
	
	// Get the Epicbox address from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_ADDRESS_INSTRUCTION, MQS_ADDRESS_TYPE, NO_PARAMETER, Buffer.concat([
	
		// Account
		Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Index
		Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32))
	]));
	
	// Remove response code from the response
	const epicboxAddress = (new TextDecoder()).decode(response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH));
	
	// Display message
	console.log("Epicbox address is " + epicboxAddress);
	
	// Display message
	console.log("Connecting to server");
	
	// Connect to the server
	const connection = new WebSocket(EPICBOX_SERVER);
	
	// Connection on message
	connection.on("message", async function(data) {
	
		// Parse data
		const message = JSON.parse(data);
		
		// Check message's type
		switch(message["type"]) {
		
			// Challenge
			case "Challenge":
			
				// Display message
				console.log("Connected to server");
				
				// Display message
				console.log("Getting default challenge signature from hardware wallet");
			
				// Get the default challenge signature from the hardware wallet
				response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
							
					// Account
					Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
					
					// Index
					Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32))
				]));
				
				// Remove response code from the response
				const signature = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
				
				// Display message
				console.log("Default challenge signature is " + Common.toHexString(signature));
				
				// Display message
				console.log("Waiting for messages server");
				
				// Send subscription request to the server
				connection.send(JSON.stringify({
					"type": "Subscribe",
					"address": epicboxAddress,
					"signature": Common.toHexString(signature)
				}));
				
				// Break
				break;
			
			// Slate
			case "Slate":
			
				// // Display message
				console.log("Message received");
				
				// Display message
				console.log(message);
				
				// Close connection
				connection.close();
			
				// Break
				break;
		}
	});
})();
