// Use strict
"use strict";


// Requires
const WebSocket = require("ws");
const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid")["default"];
const BigNumber = require("../../test/functional_tests/bignumber.js-9.1.1.js");
const Common = require("../../test/functional_tests/common.js");
const Mqs = require("../../test/functional_tests/mqs.js");


// Constants

// Destination
const DESTINATION = "esZ1P3crbc2XCHaGf7fQCGEcbnpgTBngPcZwciZZBbbdmPryFNEA@epicbox.epic.tech";

// Data
const DATA = "Hello, World!";

// Epicbox server
const EPICBOX_SERVER = "wss://epicbox.epic.tech:443";

// Request class
const REQUEST_CLASS = 0xC7;

// Request get address instruction
const REQUEST_GET_ADDRESS_INSTRUCTION = 0x01;

// Request start encrypting slate instruction
const REQUEST_START_ENCRYPTING_SLATE_INSTRUCTION = 0x07;

// Request continue encrypting slate instruction
const REQUEST_CONTINUE_ENCRYPTING_SLATE_INSTRUCTION = 0x08;

// Request finish encrypting slate instruction
const REQUEST_FINISH_ENCRYPTING_SLATE_INSTRUCTION = 0x09;

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
	connection.on("open", async function() {
	
		// Display message
		console.log("Connected to server");
		
		// Display message
		console.log("Getting encrypted data and signature from hardware wallet");
		
		// Start encrypting data on the hardware wallet
		response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_START_ENCRYPTING_SLATE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
					
			// Account
			Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
			
			// Index
			Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
			
			// Destination
			Buffer.from(DESTINATION)
		]));
		
		// Get nonce from response
		const nonce = response.subarray(0, Mqs.NONCE_LENGTH);
		
		// Get salt from response
		const salt = response.subarray(Mqs.NONCE_LENGTH, response["length"] - RESPONSE_DELIMITER_LENGTH);
		
		// Continue encrypting data on the hardware wallet
		response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_ENCRYPTING_SLATE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.from(DATA));
		
		// Get encrypted data from response
		let encryptedData = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
		
		// Finish encrypting data on the hardware wallet
		response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_FINISH_ENCRYPTING_SLATE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER);
		
		// Get tag from response
		const tag = response.subarray(0, Mqs.TAG_LENGTH);
		
		// Get signature from response
		const signature = response.subarray(Mqs.TAG_LENGTH, response["length"] - RESPONSE_DELIMITER_LENGTH);
		
		// Append tag to encrypted data
		encryptedData = Common.mergeArrays([encryptedData, tag]);
		
		// Display message
		console.log("Encrypted data is " + Common.toHexString(encryptedData));
		
		// Display message
		console.log("Signature is " + Common.toHexString(signature));
		
		// Create message
		const message = JSON.stringify({
			"destination": {
				"public_key": DESTINATION.split("@")[0],
				"domain": DESTINATION.split("@")[1],
				"port": null
			},
			"nonce": Common.toHexString(nonce),
			"salt": Common.toHexString(salt),
			"encrypted_message": Common.toHexString(encryptedData)	
		});
		
		// Display message
		console.log("Sending message to server");
		
		// Send message to the server
		connection.send(JSON.stringify({
			"type": "PostSlate",
			"from": epicboxAddress,
			"to": DESTINATION.split("@")[0],
			"str": message,
			"signature": Common.toHexString(signature)
		}));
		
		// Close connection
		connection.close();
	});
})();
