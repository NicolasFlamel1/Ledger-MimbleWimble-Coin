// Install dependencies: npm i @ledgerhq/hw-transport-node-speculos @ledgerhq/hw-transport-node-hid
// Run: node main.js mimblewimble_coin speculos nanos

// Use strict
"use strict";


// Requires
const SpeculosTransport = require("@ledgerhq/hw-transport-node-speculos")["default"];
const http = require("http");
const crypto = require("crypto")["webcrypto"];
const Blake2b = require("./BLAKE2b-0.0.2.js");
const Ed25519 = require("./Ed25519-0.0.22.js");
const X25519 = require("./X25519-0.0.23.js");
const Secp256k1Zkp = require("./secp256k1-zkp-0.0.29.js");
const BigNumber = require("./bignumber.js-9.1.1.js");
const sha256 = require("./js-sha256-0.10.0.js");
const Common = require("./common.js");
const Identifier = require("./identifier.js");
const Crypto = require("./crypto.js");
const Seed = require("./seed.js");
const Tor = require("./tor.js");
const Mqs = require("./mqs.js");
const Slatepack = require("./slatepack.js");
const Consensus = require("./consensus.js");
const NewProofBuilder = require("./new_proof_builder.js");
const Slate = require("./slate.js");
const SlateKernel = require("./slate_kernel.js");


// Constants
		
// Request class
const REQUEST_CLASS = 0xC7;

// Request get root public key instruction
const REQUEST_GET_ROOT_PUBLIC_KEY_INSTRUCTION = 0;

// Request get address instruction
const REQUEST_GET_ADDRESS_INSTRUCTION = REQUEST_GET_ROOT_PUBLIC_KEY_INSTRUCTION + 1;

// Request get seed cookie instruction
const REQUEST_GET_SEED_COOKIE_INSTRUCTION = REQUEST_GET_ADDRESS_INSTRUCTION + 1;

// Request get commitment instruction
const REQUEST_GET_COMMITMENT_INSTRUCTION = REQUEST_GET_SEED_COOKIE_INSTRUCTION + 1;

// Request get bulletproof components instruction
const REQUEST_GET_BULLETPROOF_COMPONENTS_INSTRUCTION = REQUEST_GET_COMMITMENT_INSTRUCTION + 1;

// Request verify root public key instruction
const REQUEST_VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION = REQUEST_GET_BULLETPROOF_COMPONENTS_INSTRUCTION + 1;

// Request verify address instruction
const REQUEST_VERIFY_ADDRESS_INSTRUCTION = REQUEST_VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION + 1;

// Request start encrypting slate instruction
const REQUEST_START_ENCRYPTING_SLATE_INSTRUCTION = REQUEST_VERIFY_ADDRESS_INSTRUCTION + 1;

// Request continue encrypting slate data instruction
const REQUEST_CONTINUE_ENCRYPTING_SLATE_INSTRUCTION = REQUEST_START_ENCRYPTING_SLATE_INSTRUCTION + 1;

// Request finish encrypting slate data instruction
const REQUEST_FINISH_ENCRYPTING_SLATE_INSTRUCTION = REQUEST_CONTINUE_ENCRYPTING_SLATE_INSTRUCTION + 1;

// Request start decrypting slate data instruction
const REQUEST_START_DECRYPTING_SLATE_INSTRUCTION = REQUEST_FINISH_ENCRYPTING_SLATE_INSTRUCTION + 1;

// Request continue decrypting slate data instruction
const REQUEST_CONTINUE_DECRYPTING_SLATE_INSTRUCTION = REQUEST_START_DECRYPTING_SLATE_INSTRUCTION + 1;

// Request finish decrypting slate data instruction
const REQUEST_FINISH_DECRYPTING_SLATE_INSTRUCTION = REQUEST_CONTINUE_DECRYPTING_SLATE_INSTRUCTION + 1;

// Request start transaction instruction
const REQUEST_START_TRANSACTION_INSTRUCTION = REQUEST_FINISH_DECRYPTING_SLATE_INSTRUCTION + 1;

// Request continue transaction include output instruction
const REQUEST_CONTINUE_TRANSACTION_INCLUDE_OUTPUT_INSTRUCTION = REQUEST_START_TRANSACTION_INSTRUCTION + 1;

// Request continue transaction include input instruction
const REQUEST_CONTINUE_TRANSACTION_INCLUDE_INPUT_INSTRUCTION = REQUEST_CONTINUE_TRANSACTION_INCLUDE_OUTPUT_INSTRUCTION + 1;

// Request continue transaction apply offset instruction
const REQUEST_CONTINUE_TRANSACTION_APPLY_OFFSET_INSTRUCTION = REQUEST_CONTINUE_TRANSACTION_INCLUDE_INPUT_INSTRUCTION + 1;

// Request continue transaction get public key instruction
const REQUEST_CONTINUE_TRANSACTION_GET_PUBLIC_KEY_INSTRUCTION = REQUEST_CONTINUE_TRANSACTION_APPLY_OFFSET_INSTRUCTION + 1;

// Request continue transaction get public nonce instruction
const REQUEST_CONTINUE_TRANSACTION_GET_PUBLIC_NONCE_INSTRUCTION = REQUEST_CONTINUE_TRANSACTION_GET_PUBLIC_KEY_INSTRUCTION + 1;

// Request continue transaction get message signature instruction
const REQUEST_CONTINUE_TRANSACTION_GET_MESSAGE_SIGNATURE_INSTRUCTION = REQUEST_CONTINUE_TRANSACTION_GET_PUBLIC_NONCE_INSTRUCTION + 1;

// Request finish transaction instruction
const REQUEST_FINISH_TRANSACTION_INSTRUCTION = REQUEST_CONTINUE_TRANSACTION_GET_MESSAGE_SIGNATURE_INSTRUCTION + 1;

// Request get MQS challenge signature instruction
const REQUEST_GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION = REQUEST_FINISH_TRANSACTION_INSTRUCTION + 1;

// Request get login challenge signature instruction
const REQUEST_GET_LOGIN_CHALLENGE_SIGNATURE_INSTRUCTION = REQUEST_GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION + 1;

// No parameter
const NO_PARAMETER = 0;

// Mnemonic
const MNEMONIC = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

// Seed key
const SEED_KEY = "IamVoldemort";

// Account
const ACCOUNT = new BigNumber(0);

// Index
const INDEX = new BigNumber(0);

// Response delimiter length
const RESPONSE_DELIMITER_LENGTH = (new Uint8Array([0x00, 0x00]))["length"];

// No payment proof type
const NO_PAYMENT_PROOF_TYPE = 0;

// MQS payment proof type
const MQS_PAYMENT_PROOF_TYPE = NO_PAYMENT_PROOF_TYPE + 1;

// Tor payment proof type
const TOR_PAYMENT_PROOF_TYPE = MQS_PAYMENT_PROOF_TYPE + 1;

// MQS address type
const MQS_ADDRESS_TYPE = 0;

// Tor address type
const TOR_ADDRESS_TYPE = MQS_ADDRESS_TYPE + 1;

// Sending transaction message type
const SENDING_TRANSACTION_MESSAGE_TYPE = 0;

// Receiving transaction message type
const RECEIVING_TRANSACTION_MESSAGE_TYPE = SENDING_TRANSACTION_MESSAGE_TYPE + 1;

// Creating coinbase message type
const CREATING_COINBASE_MESSAGE_TYPE = RECEIVING_TRANSACTION_MESSAGE_TYPE + 1;

// Speculos APDU port
const SPECULOS_APDU_PORT = 9999;

// Speculos automation port
const SPECULOS_AUTOMATION_PORT = 5000;

// Default currency
const DEFAULT_CURRENCY = "mimblewimble_coin";


// Main fucntion
(async function() {

	// Get currency from the command line arguments if provided
	const currency = (process["argv"]["length"] >= 3) ? process["argv"][2] : DEFAULT_CURRENCY;
	
	// Check currency
	switch(currency) {
	
		// MimbleWimble Coin
		case "mimblewimble_coin":
		
			// Break
			break;
		
		// MimbleWimble Coin floonet
		case "mimblewimble_coin_floonet":
		
			// Set consensus's get network type
			Consensus.getNetworkType = function() {
			
				// Return testnet network type
				return Consensus.TESTNET_NETWORK_TYPE;
			};
		
			// Break
			break;
			
		// Default
		default:
		
			// Log message
			console.log("Invalid currency. Supported currencies are: mimblewimble_coin and mimblewimble_coin_floonet");
			
			// Return
			return;
	}
	
	// Get use Speculos from the command line arguments if provided
	const useSpeculos = process["argv"]["length"] >= 4 && process["argv"][3] === "speculos";
	
	// Get target from the command line arguments if provided
	const target = (useSpeculos === true && process["argv"]["length"] >= 5) ? process["argv"][4] : null;
	
	// Log message
	console.log("Using currency: " + currency);

	// Initialize dependencies
	await initializeDependencies();
	
	// Perform tests
	await performTests(useSpeculos, target);
})();


// Supporting function implementation

// Initialize dependencies
async function initializeDependencies() {

	// Initialize BLAKE2b
	await Blake2b.initialize();
	
	// Initialize Ed25519
	await Ed25519.initialize();
	
	// Initialize X25519
	await X25519.initialize();
	
	// Initialize secp256k1-zkp
	await Secp256k1Zkp.initialize();
}

// Perform tests
async function performTests(useSpeculos, target) {
	
	// Try
	try {
	
		// Check if using Speculos
		if(useSpeculos === true) {
		
			// Connect to the hardware wallet using Speculos
			var hardwareWallet = await SpeculosTransport.open({
			
				// APDU port
				"apduPort": SPECULOS_APDU_PORT
			});
			
			// Check if target exists
			if(target !== null) {
			
				// Set hardware wallet's device model
				hardwareWallet["deviceModel"] = target;
			}
		}
		
		// Otherwise
		else {
		
			// Require transport Node HID
			const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid")["default"];
		
			// Connect to the hardware wallet using USB
			var hardwareWallet = await TransportNodeHid.open();
		}
		
		// Log message
		console.log("Running functional tests with the mnemonic: " + MNEMONIC);
		
		// Log message
		console.log("Running functional tests with the account: " + ACCOUNT.toFixed());
		
		// Log message
		console.log("Running functional tests with the index: " + INDEX.toFixed());
		
		// Initialize seed
		const seed = new Seed();
		await seed.initialize(MNEMONIC);
		
		// Get the extended private key from the seed
		const extendedPrivateKey = await seed.getExtendedPrivateKey(SEED_KEY, true);
		
		// Run get application information test
		await getApplicationInformationTest(hardwareWallet);
		
		// Run get root public key test
		await getRootPublicKeyTest(hardwareWallet, extendedPrivateKey);
		
		// Run get address test
		await getAddressTest(hardwareWallet, extendedPrivateKey, MQS_ADDRESS_TYPE);
		await getAddressTest(hardwareWallet, extendedPrivateKey, TOR_ADDRESS_TYPE);
		
		// Run get seed cookie test
		await getSeedCookieTest(hardwareWallet, extendedPrivateKey);
		
		// Run get commitment test
		await getCommitmentTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR);
		
		// Run get bulletproof test
		await getBulletproofTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SENDING_TRANSACTION_MESSAGE_TYPE);
		await getBulletproofTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, RECEIVING_TRANSACTION_MESSAGE_TYPE);
		await getBulletproofTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, CREATING_COINBASE_MESSAGE_TYPE);
		
		// Run verify root public key test
		await verifyRootPublicKeyTest(hardwareWallet, extendedPrivateKey);
		
		// Run verify address test
		await verifyAddressTest(hardwareWallet, extendedPrivateKey, MQS_ADDRESS_TYPE);
		await verifyAddressTest(hardwareWallet, extendedPrivateKey, TOR_ADDRESS_TYPE);
		
		// Run encrypt slate test
		await encryptSlateTest(hardwareWallet, extendedPrivateKey, MQS_ADDRESS_TYPE);
		await encryptSlateTest(hardwareWallet, extendedPrivateKey, TOR_ADDRESS_TYPE);
		
		// Run decrypt slate test
		await decryptSlateTest(hardwareWallet, extendedPrivateKey, MQS_ADDRESS_TYPE);
		await decryptSlateTest(hardwareWallet, extendedPrivateKey, TOR_ADDRESS_TYPE);
		
		// Run receive transaction test
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.COINBASE_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.COINBASE_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), MQS_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), MQS_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), MQS_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), TOR_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), TOR_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await receiveTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), TOR_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		
		// Run send transaction test
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.PLAIN_FEATURES, Slate.NO_LOCK_HEIGHT, SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, MQS_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.HEIGHT_LOCKED_FEATURES, new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)), SlateKernel.NO_RELATIVE_HEIGHT, TOR_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), MQS_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), MQS_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), MQS_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), TOR_ADDRESS_TYPE, NO_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), TOR_ADDRESS_TYPE, MQS_PAYMENT_PROOF_TYPE);
		await sendTransactionTest(hardwareWallet, extendedPrivateKey, Crypto.SWITCH_TYPE_REGULAR, SlateKernel.NO_RECENT_DUPLICATE_FEATURES, Slate.NO_LOCK_HEIGHT, new BigNumber(Math.floor(Math.random() * (SlateKernel.MAXIMUM_RECENT_HEIGHT - SlateKernel.MINIMUM_RECENT_HEIGHT + 1)) + SlateKernel.MINIMUM_RECENT_HEIGHT), TOR_ADDRESS_TYPE, TOR_PAYMENT_PROOF_TYPE);
		
		// Run get MQS timestamp signature test
		await getMqsTimestampSignatureTest(hardwareWallet, extendedPrivateKey);
		
		// Run get MQS default challenge signature test
		await getMqsDefaultChallengeSignatureTest(hardwareWallet, extendedPrivateKey);
		
		// Run get login signature test
		await getLoginSignatureTest(hardwareWallet, extendedPrivateKey);
		
		// Log message
		console.log("Passed running all functional tests");
		
		// Exit with success
		process.exit(0);
	}
	
	// Catch errors
	catch(error) {
	
		// Log error
		console.log(error);
		
		// Log message
		console.log("Running functional tests failed");
		
		// Exit with error
		process.exit(1);
	}
}

// Set automation
function setAutomation(automation) {

	// Return promise
	return new Promise(function(resolve, reject) {
	
		// Get data from automation
		const data = JSON.stringify(automation);
	
		// Create request
		const request = http.request({
		
			// Hostname
			"hostname": "127.0.0.1",
			
			// Port
			"port": SPECULOS_AUTOMATION_PORT,
			
			// Path
			"path": "/automation",
			
			// Method
			"method": "POST",
			
			// Headers
			"headers": {
			
				// Content type
				"Content-Type": "application/json",
				
				// Content length
				"Content-Length": data["length"]
			}
			
		}, function(response) {
		
			// Response data event
			response.on("data", function(chunk) {
			
			});
		
			// Response end event
			response.on("end", function() {
			
				// Resolve
				resolve();
			});
		
		// Request error event
		}).on("error", function(error) {
		
			// Reject
			reject();
		});
		
		// Add to request
		request.write(data);
		
		// Send request
		request.end();
	});
}
		
// Get application information test
async function getApplicationInformationTest(hardwareWallet) {

	// Log message
	console.log("Running get application information test");

	// Get the application information from the hardware wallet
	let response = await hardwareWallet.send(0xB0, 0x01, NO_PARAMETER, NO_PARAMETER);
	
	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Get application name length from response
	const applicationNameLength = response[1];
	
	// Get application name from the response
	const applicationName = (new TextDecoder("utf-8", {"fatal": true})).decode(response.subarray(2, 2 + applicationNameLength));
	
	// Log application name
	console.log("Application name: " + applicationName);
	
	// Get application version length from response
	const applicationVersionLength = response[2 + applicationNameLength];
	
	// Get application version from the response
	const applicationVersion = (new TextDecoder("utf-8", {"fatal": true})).decode(response.subarray(2 + applicationNameLength + 1, 2 + applicationNameLength + 1 + applicationVersionLength));
							
	// Log application version
	console.log("Application version: " + applicationVersion);
	
	// Log message
	console.log("Passed getting application information test");
}

// Get root public key test
async function getRootPublicKeyTest(hardwareWallet, extendedPrivateKey) {

	// Log message
	console.log("Running get root public key test");
	
	// Get the expected root public key from the extended private key
	const expectedRootPublicKey = await Crypto.rootPublicKey(extendedPrivateKey);
	
	// Check if not using Speculos
	if(hardwareWallet instanceof SpeculosTransport === false) {
	
		// Log message
		console.log("Verify that the account index on the device is: " + ACCOUNT.toFixed());
	}
	
	// Otherwise
	else {
	
		// Check if using a Nano hardware wallet
		if(hardwareWallet["deviceModel"].toLowerCase().startsWith("nano") === true) {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "Export root",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Account.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "The host will",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "the account's",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "Approve",
						"actions": [
						
							// Push both
							["button", 1, true],
							["button", 2, true],
							["button", 1, false],
							["button", 2, false]
						]
					}
				]
			});
		}
		
		// Otherwise
		else {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "Tap to continue",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 200, 500, false],
							["finger", 200, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Swipe to review",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 100, 500, false],
							["finger", 100, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Hold to export",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Set confirmed
							["setbool", "confirmed", true],
							
							// Touch start
							["finger", 250, 500, true]
						]
					},
					{
						"text": "Reject",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Touch
							["finger", 399, 586, false],
							["finger", 399, 586, true],
							["finger", 399, 586, false]
						]
					},
					{
						"text": "ROOT PUBLIC",
						"conditions": [
						
							// Is confirmed
							["confirmed", true]
						],
						"actions": [
						
							// Touch end
							["finger", 200, 500, false]
						]
					}
				]
			});
		}
	}
	
	// Get the root public key from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_ROOT_PUBLIC_KEY_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)));
	
	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Log root public key
	console.log("Root public key: " + Common.toHexString(response));
	
	// Check if root public key is invalid
	if(Common.arraysAreEqual(response, expectedRootPublicKey) === false) {
	
		// Log message
		console.log("Invalid root public key");
	
		// Throw error
		throw "Failed running get root pubic key test";
	}
	
	// Log message
	console.log("Passed getting root pubic key test");
}

// Get address test
async function getAddressTest(hardwareWallet, extendedPrivateKey, addressType) {

	// Log message
	console.log("Running get address test");
	
	// Check address type
	switch(addressType) {
	
		// MQS address type
		case MQS_ADDRESS_TYPE:
		
			// Log message
			console.log("Using address type: MQS");
			
			// Get MQS private key from the extended private key
			const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
			
			// Get MQS public key from the MQS private key
			const mqsPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(mqsPrivateKey);
			
			// Get expected address from the MQS public key
			var expectedAddress = Mqs.publicKeyToMqsAddress(mqsPublicKey, Consensus.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE);
			
			// Break
			break;
		
		// Tor address type
		case TOR_ADDRESS_TYPE:
		
			// Log message
			console.log("Using address type: Tor");
			
			// Get Tor private key from the extended private key
			const torPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
			
			// Get Tor public key from the Tor private key
			const torPublicKey = Ed25519.publicKeyFromSecretKey(torPrivateKey);
			
			// Get expected address from the Tor public key
			var expectedAddress = Tor.publicKeyToTorAddress(torPublicKey);
			
			// Break
			break;
	}
	
	// Get the address from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_ADDRESS_INSTRUCTION, addressType, NO_PARAMETER, Buffer.concat([
	
		// Account
		Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Index
		Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32))
	]));
	
	// Remove response code from response
	response = (new TextDecoder("utf-8", {"fatal": true})).decode(response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH));
	
	// Log address
	console.log("Address: " + response);
	
	// Check if address is invalid
	if(response !== expectedAddress) {
	
		// Log message
		console.log("Invalid address");
		
		// Throw error
		throw "Failed running get address test";
	}
	
	// Log message
	console.log("Passed getting address test");
}

// Get seed cookie test
async function getSeedCookieTest(hardwareWallet, extendedPrivateKey) {

	// Log message
	console.log("Running get seed cookie test");
	
	// Get the root public key from the extended private key
	const rootPublicKey = await Crypto.rootPublicKey(extendedPrivateKey);
	
	// Get the expected seed cookie from the root public key
	const expectedSeedCookie = new Uint8Array(await crypto["subtle"].digest("SHA-512", rootPublicKey));
	
	// Get seed cookie from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_SEED_COOKIE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)));
	
	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Log seed cookie
	console.log("Seed cookie: " + Common.toHexString(response));
	
	// Check if seed cookie is invalid
	if(Common.arraysAreEqual(response, expectedSeedCookie) === false) {
	
		// Log message
		console.log("Invalid seed cookie");
		
		// Throw error
		throw "Failed running get seed cookie test";
	}
	
	// Log message
	console.log("Passed getting seed cookie test");
}

// Get commitment test
async function getCommitmentTest(hardwareWallet, extendedPrivateKey, switchType) {

	// Log message
	console.log("Running get commitment test");
	
	// Amount
	const AMOUNT = new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER));
	
	// Identifier
	const IDENTIFIER = new Identifier(Common.toHexString(Common.mergeArrays([new Uint8Array([Math.round(Math.random() * Identifier.MAX_DEPTH)]), crypto.getRandomValues(new Uint8Array(Identifier.MAX_DEPTH * Uint32Array["BYTES_PER_ELEMENT"]))])));
	
	// Log amount
	console.log("Using amount: " + AMOUNT.toFixed());
	
	// Log identifier
	console.log("Using identifier: " + Common.toHexString(IDENTIFIER.getValue()));
	
	// Check switch type
	switch(switchType) {
	
		// Switch type none
		case Crypto.SWITCH_TYPE_NONE:
		
			// Log switch type
			console.log("Using switch type: none");
		
			// Break
			break;
		
		// Regular switch type
		case Crypto.SWITCH_TYPE_REGULAR:
		
			// Log switch type
			console.log("Using switch type: regular");
		
			// Break
			break;
	}
	
	// Get the expected commitment from the extended private key, amount, identifier, and switch type
	const expectedCommitment = await Crypto.commit(extendedPrivateKey, AMOUNT, IDENTIFIER, switchType);
	
	// Get commitment from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_COMMITMENT_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
				
		// Account
		Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Identifier
		Buffer.from(IDENTIFIER.getValue()),
		
		// Amount
		Buffer.from(AMOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
		
		// Switch type
		Buffer.from(new Uint8Array([switchType]))
	]));
	
	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Log commitment
	console.log("Commitment: " + Common.toHexString(response));
	
	// Check if commitment is invalid
	if(Common.arraysAreEqual(response, expectedCommitment) === false) {
	
		// Log message
		console.log("Invalid commitment");
		
		// Throw error
		throw "Failed running get commitment test";
	}
	
	// Log message
	console.log("Passed getting commitment test");
}

// Get bulletproof test
async function getBulletproofTest(hardwareWallet, extendedPrivateKey, switchType, messageType) {

	// Log message
	console.log("Running get bulletproof test");
	
	// Amount
	const AMOUNT = new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER));
	
	// Identifier
	const IDENTIFIER = new Identifier(Common.toHexString(Common.mergeArrays([new Uint8Array([Math.round(Math.random() * Identifier.MAX_DEPTH)]), crypto.getRandomValues(new Uint8Array(Identifier.MAX_DEPTH * Uint32Array["BYTES_PER_ELEMENT"]))])));
	
	// Log amount
	console.log("Using amount: " + AMOUNT.toFixed());
	
	// Log identifier
	console.log("Using identifier: " + Common.toHexString(IDENTIFIER.getValue()));
	
	// Check switch type
	switch(switchType) {
	
		// Switch type none
		case Crypto.SWITCH_TYPE_NONE:
		
			// Log switch type
			console.log("Using switch type: none");
		
			// Break
			break;
		
		// Regular switch type
		case Crypto.SWITCH_TYPE_REGULAR:
		
			// Log switch type
			console.log("Using switch type: regular");
		
			// Break
			break;
	}
	
	// Initialize proof builder with the extended private key
	const proofBuilder = new NewProofBuilder();
	await proofBuilder.initialize(extendedPrivateKey);
	
	// Get expected bulletproof from the extended private key, amount, identifier, switch type, and proof builder
	const expectedBulletproof = await Crypto.proof(extendedPrivateKey, AMOUNT, IDENTIFIER, switchType, proofBuilder);
	
	// Get bulletproof components from the hardware wallet
	const response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_BULLETPROOF_COMPONENTS_INSTRUCTION, messageType, NO_PARAMETER, Buffer.concat([
				
		// Account
		Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Identifier
		Buffer.from(IDENTIFIER.getValue()),
		
		// Amount
		Buffer.from(AMOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
		
		// Switch type
		Buffer.from(new Uint8Array([switchType]))
	]));
	
	// Get tau x from response
	const tauX = response.subarray(0, Crypto.TAU_X_LENGTH);
	
	// Get t one from response
	const tOne = response.subarray(Crypto.TAU_X_LENGTH, Crypto.TAU_X_LENGTH + Crypto.SECP256K1_PUBLIC_KEY_LENGTH);
	
	// Get t two from response
	const tTwo = response.subarray(Crypto.TAU_X_LENGTH + Crypto.SECP256K1_PUBLIC_KEY_LENGTH, Crypto.TAU_X_LENGTH + Crypto.SECP256K1_PUBLIC_KEY_LENGTH + Crypto.SECP256K1_PUBLIC_KEY_LENGTH);
	
	// Get commitment from the extended private key, amount, identifier, and switch type
	const commitment = await Crypto.commit(extendedPrivateKey, AMOUNT, IDENTIFIER, switchType);
	
	// Get rewind nonce from the proof builder and the commitment
	const rewindNonce = await proofBuilder.rewindNonce(commitment);
	
	// Get proof message from identifier and switch type
	const proofMessage = proofBuilder.proofMessage(IDENTIFIER, switchType);
	
	// Create bulletproof with the tau x, t one, t two, commit, amount, rewind nonce, and proof message
	const bulletproof = Secp256k1Zkp.createBulletproofBlindless(tauX, tOne, tTwo, commitment, AMOUNT.toFixed(), rewindNonce, new Uint8Array([]), proofMessage);
	
	// Log commitment
	console.log("Bulletproof: " + Common.toHexString(bulletproof));
	
	// Check if commitment is invalid
	if(Common.arraysAreEqual(bulletproof, expectedBulletproof) === false) {
	
		// Log message
		console.log("Invalid bulletproof");
		
		// Throw error
		throw "Failed running get bulletproof test";
	}
	
	// Log message
	console.log("Passed getting bulletproof test");
}

// Verify root public key test
async function verifyRootPublicKeyTest(hardwareWallet, extendedPrivateKey) {

	// Log message
	console.log("Running verify root public key test");
	
	// Get the root public key from the extended private key
	const rootPublicKey = await Crypto.rootPublicKey(extendedPrivateKey);
	
	// Check if not using Speculos
	if(hardwareWallet instanceof SpeculosTransport === false) {
	
		// Log message
		console.log("Verify that the root public key on the device is: " + Common.toHexString(rootPublicKey));
	}
	
	// Otherwise
	else {
	
		// Check if using a Nano hardware wallet
		if(hardwareWallet["deviceModel"].toLowerCase().startsWith("nano") === true) {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "Verify root",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Root Public Key.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "Valid",
						"actions": [
						
							// Push both
							["button", 1, true],
							["button", 2, true],
							["button", 1, false],
							["button", 2, false]
						]
					}
				]
			});
		}
		
		// Otherwise
		else {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "Tap to continue",
						"actions": [
						
							// Touch
							["finger", 200, 500, false],
							["finger", 200, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Swipe to review",
						"actions": [
						
							// Touch
							["finger", 100, 500, false],
							["finger", 100, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Cancel",
						"actions": [
						
							// Touch
							["finger", 200, (hardwareWallet["deviceModel"].toLowerCase() === "flex") ? 450 : 500, false],
							["finger", 200, (hardwareWallet["deviceModel"].toLowerCase() === "flex") ? 450 : 500, true],
							["finger", 200, (hardwareWallet["deviceModel"].toLowerCase() === "flex") ? 450 : 500, false]
						]
					}
				]
			});
		}
	}
	
	// Verify root public key on the hardware wallet
	await hardwareWallet.send(REQUEST_CLASS, REQUEST_VERIFY_ROOT_PUBLIC_KEY_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)));
	
	// Log message
	console.log("Passed verifying root pubic key test");
}

// Verify address test
async function verifyAddressTest(hardwareWallet, extendedPrivateKey, addressType) {

	// Check if not using Speculos or using a Nano hardware wallet
	if(hardwareWallet instanceof SpeculosTransport === false || hardwareWallet["deviceModel"].toLowerCase().startsWith("nano") === true) {
	
		// Log message
		console.log("Running verify address test");
		
		// Check address type
		switch(addressType) {
		
			// MQS address type
			case MQS_ADDRESS_TYPE:
			
				// Log message
				console.log("Using address type: MQS");
				
				// Get MQS private key from the extended private key
				const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
				
				// Get MQS public key from the MQS private key
				const mqsPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(mqsPrivateKey);
				
				// Get address from the MQS public key
				var address = Mqs.publicKeyToMqsAddress(mqsPublicKey, Consensus.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE);
				
				// Check if not using Speculos
				if(hardwareWallet instanceof SpeculosTransport === false) {
				
					// Log message
					console.log("Verify that the MQS address on the device is: " + address);
				}
				
				// Break
				break;
			
			// Tor address type
			case TOR_ADDRESS_TYPE:
			
				// Log message
				console.log("Using address type: Tor");
				
				// Get Tor private key from the extended private key
				const torPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
				
				// Get Tor public key from the Tor private key
				const torPublicKey = Ed25519.publicKeyFromSecretKey(torPrivateKey);
				
				// Get address from the Tor public key
				var address = Tor.publicKeyToTorAddress(torPublicKey);
				
				// Check if not using Speculos
				if(hardwareWallet instanceof SpeculosTransport === false) {
				
					// Log message
					console.log("Verify that the Tor address on the device is: " + address);
				}
				
				// Break
				break;
		}
		
		// Check if using Speculos
		if(hardwareWallet instanceof SpeculosTransport === true) {
		
			// Check if using a Nano hardware wallet
			if(hardwareWallet["deviceModel"].toLowerCase().startsWith("nano") === true) {
			
				// Set automation
				await setAutomation({
					"version": 1,
					"rules": [
						{
							"text": "address",
							"actions": [
							
								// Push right
								["button", 2, true],
								["button", 2, false]
							]
						},
						{
							"regexp": "^.+ress.*$",
							"actions": [
							
								// Push right
								["button", 2, true],
								["button", 2, false]
							]
						},
						{
							"text": "Valid",
							"actions": [
							
								// Push both
								["button", 1, true],
								["button", 2, true],
								["button", 1, false],
								["button", 2, false]
							]
						}
					]
				});
			}
			
			// Otherwise
			else {
			
				// Set automation
				await setAutomation({
					"version": 1,
					"rules": [
						{
							"text": "Tap to continue",
							"actions": [
							
								// Touch
								["finger", 200, 500, false],
								["finger", 200, 500, true],
								["finger", 200, 500, false]
							]
						},
						{
							"text": "Swipe to review",
							"actions": [
							
								// Touch
								["finger", 100, 500, false],
								["finger", 100, 500, true],
								["finger", 200, 500, false]
							]
						},
						{
							"text": "Cancel",
							"actions": [
							
								// Touch
								["finger", 200, (hardwareWallet["deviceModel"].toLowerCase() === "flex") ? 450 : 500, false],
								["finger", 200, (hardwareWallet["deviceModel"].toLowerCase() === "flex") ? 450 : 500, true],
								["finger", 200, (hardwareWallet["deviceModel"].toLowerCase() === "flex") ? 450 : 500, false]
							]
						}
					]
				});
			}
		}
		
		// Verify address on the hardware wallet
		await hardwareWallet.send(REQUEST_CLASS, REQUEST_VERIFY_ADDRESS_INSTRUCTION, addressType, NO_PARAMETER, Buffer.concat([
		
			// Account
			Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
			
			// Index
			Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32))
		]));
		
		// Log message
		console.log("Passed verifying address test");
	}
	
	// Otherwise
	else {
	
		// Log message
		console.log("Skipped running verify address test");
	}
}

// Encrypt slate test
async function encryptSlateTest(hardwareWallet, extendedPrivateKey, addressType) {

	// Check if not using Speculos
	if(hardwareWallet instanceof SpeculosTransport === false) {

		// Log message
		console.log("Running encrypt slate test");
		
		// Data
		const DATA = crypto.getRandomValues(new Uint8Array(Math.round(Math.random() * Common.BYTE_MAX_VALUE + 1)));
		
		// Maximum chunk size
		const MAXIMUM_CHUNK_SIZE = 64;
		
		// Domain
		const DOMAIN = "example.com";
		
		// Port
		const PORT = 80;
		
		// Log data
		console.log("Using data: " + Common.toHexString(DATA));
		
		// While random private key isn't a valid secret key
		const privateKey = new Uint8Array(Crypto.SECP256K1_SECRET_KEY_LENGTH);
		do {
		
			// Fill offset with random values
			crypto.getRandomValues(privateKey);
			
		} while(Secp256k1Zkp.isValidSecretKey(privateKey) !== true);
		
		// Log private key
		console.log("Using private key: " + Common.toHexString(privateKey));
		
		// Check address type
		switch(addressType) {
		
			// MQS address type
			case MQS_ADDRESS_TYPE:
			
				// Log message
				console.log("Using encryption type: MQS");
			
				{
					// Get MQS public key from the private key
					const publicKey = Secp256k1Zkp.publicKeyFromSecretKey(privateKey);
					
					// Get address from the MQS public key
					var address = Mqs.publicKeyToMqsAddress(publicKey, Consensus.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE) + "@" + DOMAIN + ":" + PORT.toFixed();
				}
				
				// Break
				break;
			
			// Tor address type
			case TOR_ADDRESS_TYPE:
			
				// Log message
				console.log("Using encryption type: Tor");
				
				{
					// Get Tor private key from the random private key
					var otherTorPrivateKey = await Crypto.addressKey(Common.mergeArrays([privateKey, crypto.getRandomValues(new Uint8Array(Crypto.CHAIN_CODE_LENGTH))]), INDEX.toNumber());
					
					// Get Tor public key from the Tor private key
					const publicKey = Ed25519.publicKeyFromSecretKey(otherTorPrivateKey);
					
					// Get address from the public key
					var address = Tor.publicKeyToTorAddress(publicKey);
				}
				
				// Break
				break;
		}
		
		// Start encrypting slate on the hardware wallet
		let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_START_ENCRYPTING_SLATE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
					
			// Account
			Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
			
			// Index
			Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
			
			// Address
			Buffer.from(address)
		]));
		
		// Get nonce from response
		const nonce = response.subarray(0, Slatepack.NONCE_LENGTH);
		
		// Log nonce
		console.log("Using nonce: " + Common.toHexString(nonce));
		
		// Get salt from response
		const salt = response.subarray(Slatepack.NONCE_LENGTH, response["length"] - RESPONSE_DELIMITER_LENGTH);
		
		// Check address type
		switch(addressType) {
		
			// MQS address type
			case MQS_ADDRESS_TYPE:
		
				// Log salt
				console.log("Using salt: " + Common.toHexString(salt));
				
				// Log domain
				console.log("Using domain: " + DOMAIN);
				
				// Log port
				console.log("Using port: " + PORT.toFixed());
				
				// Break
				break;
		}
		
		// Go through all chunks of the data
		let encryptedData = new Uint8Array([]);
		for(let i = 0; i < Math.ceil(DATA["length"] / MAXIMUM_CHUNK_SIZE); ++i) {
		
			// Continue encrypting slate on the hardware wallet
			response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_ENCRYPTING_SLATE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.from(DATA.subarray(i * MAXIMUM_CHUNK_SIZE, i * MAXIMUM_CHUNK_SIZE + MAXIMUM_CHUNK_SIZE)));
			
			// Remove response code from response
			response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
			
			// Append encrypted data to list
			encryptedData = Common.mergeArrays([encryptedData, response]);
		}
		
		// Finish encrypting slate on the hardware wallet
		response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_FINISH_ENCRYPTING_SLATE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER);
		
		// Remove response code from response
		response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
		
		// Check if using MQS encryption type
		if(addressType === MQS_ADDRESS_TYPE) {
		
			// Get tag from response
			const tag = response.subarray(0, Mqs.TAG_LENGTH);
		
			// Get message signature from response
			const messageSignature = response.subarray(Mqs.TAG_LENGTH);
			
			// Append tag to encrypted data
			encryptedData = Common.mergeArrays([encryptedData, tag]);
			
			// Create message
			const message = JSON.stringify({
				"destination": {
					"public_key": address.split("@")[0],
					"domain": DOMAIN,
					"port": PORT
				},
				"nonce": Common.toHexString(nonce),
				"salt": Common.toHexString(salt),
				"encrypted_message": Common.toHexString(encryptedData)	
			});
			
			// Get message hash
			const messageHash = new Uint8Array(sha256.arrayBuffer(message));
			
			// Get MQS private key from the extended private key
			const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
			
			// Set expected message signature as the message hash signed by the MQS private key
			const expectedMessageSignature = Secp256k1Zkp.createMessageHashSignature(messageHash, mqsPrivateKey);
			
			// Log message signature
			console.log("Message signature: " + Common.toHexString(messageSignature));
		
			// Check if message signature is invalid
			if(Common.arraysAreEqual(messageSignature, expectedMessageSignature) === false) {
			
				// Log message
				console.log("Invalid message signature");
				
				// Throw error
				throw "Failed running encrypt slate test";
			}
		}
		
		// Otherwise
		else {
		
			// Append tag to encrypted data
			encryptedData = Common.mergeArrays([encryptedData, response]);
		}
		
		// Log encrypted slate
		console.log("Encrypted slate: " + Common.toHexString(encryptedData));
		
		// Check address type
		switch(addressType) {
		
			// MQS address type
			case MQS_ADDRESS_TYPE:
			
				// Get MQS private key from the extended private key
				const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
				
				// Get MQS public key from the MQS private key
				const mqsPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(mqsPrivateKey);
				
				// Decrypt the encrypted data
				var decryptedData = await Mqs.decrypt(privateKey, mqsPublicKey, encryptedData, salt, nonce);
			
				// Break
				break;
			
			// Tor address type
			case TOR_ADDRESS_TYPE:
		
				// Get Tor private key from the extended private key
				const torPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
				
				// Get Tor public key from the Tor private key
				const torPublicKey = Ed25519.publicKeyFromSecretKey(torPrivateKey);
				
				// Decrypt the encrypted data
				var decryptedData = await Slatepack.decrypt(otherTorPrivateKey, torPublicKey, encryptedData, nonce);
				
				// Break
				break;
		}
		
		// Log decrypted slate
		console.log("Decrypted slate: " + Common.toHexString(decryptedData));
		
		// Check if decrypted data is invalid
		if(Common.arraysAreEqual(decryptedData, DATA) === false) {
		
			// Log message
			console.log("Invalid decrypted slate");
			
			// Throw error
			throw "Failed running encrypt slate test";
		}
		
		// Log message
		console.log("Passed running encrypt slate test");
	}
	
	// Otherwise
	else {
	
		// Log message
		console.log("Skipped running encrypt slate test");
	}
}

// Decrypt slate test
async function decryptSlateTest(hardwareWallet, extendedPrivateKey, addressType) {

	// Check if not using Speculos
	if(hardwareWallet instanceof SpeculosTransport === false) {

		// Log message
		console.log("Running decrypt slate test");
		
		// Data
		const DATA = crypto.getRandomValues(new Uint8Array(Math.round(Math.random() * Common.BYTE_MAX_VALUE + 1)));
		
		// Maximum chunk size
		const MAXIMUM_CHUNK_SIZE = 64;
		
		// AES IV size
		const AES_IV_SIZE = 16;
		
		// Log data
		console.log("Using data: " + Common.toHexString(DATA));
		
		// While random private key isn't a valid secret key
		const privateKey = new Uint8Array(Crypto.SECP256K1_SECRET_KEY_LENGTH);
		do {
		
			// Fill offset with random values
			crypto.getRandomValues(privateKey);
			
		} while(Secp256k1Zkp.isValidSecretKey(privateKey) !== true);
		
		// Log private key
		console.log("Using private key: " + Common.toHexString(privateKey));
		
		// Check address type
		switch(addressType) {
		
			// MQS address type
			case MQS_ADDRESS_TYPE:
			
				// Log message
				console.log("Using decryption type: MQS");
			
				{
					// Get public key from the private key
					const publicKey = Secp256k1Zkp.publicKeyFromSecretKey(privateKey);
					
					// Get address from the public key
					var address = Mqs.publicKeyToMqsAddress(publicKey, Consensus.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE);
					
					// Get MQS private key from the extended private key
					const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
					
					// Get MQS public key from the MQS private key
					const mqsPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(mqsPrivateKey);
					
					// Encrypt the data
					const encryptedData = await Mqs.encrypt(privateKey, mqsPublicKey, DATA);
					
					// Get salt from encrypted data
					var salt = encryptedData[Mqs.ENCRYPTED_DATA_SALT_INDEX];
					
					// Log salt
					console.log("Using salt: " + Common.toHexString(salt));
					
					// Get nonce from encrypted data
					var nonce = encryptedData[Mqs.ENCRYPTED_DATA_NONCE_INDEX];
					
					// Log nonce
					console.log("Using nonce: " + Common.toHexString(nonce));
					
					// Get encrypted message from encrypted data
					var encryptedMessage = encryptedData[Mqs.ENCRYPTED_DATA_DATA_INDEX];
				}
			
				// Break
				break;
			
			// Tor address type
			case TOR_ADDRESS_TYPE:
			
				// Log message
				console.log("Using decryption type: Tor");
			
				{
					// Get Tor private key from the random private key
					const otherTorPrivateKey = await Crypto.addressKey(Common.mergeArrays([privateKey, crypto.getRandomValues(new Uint8Array(Crypto.CHAIN_CODE_LENGTH))]), INDEX.toNumber());
					
					const publicKey = Ed25519.publicKeyFromSecretKey(otherTorPrivateKey);
					
					// Get address from the public key
					var address = Tor.publicKeyToTorAddress(publicKey);
					
					// Get Tor private key from the extended private key
					const torPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
					
					// Get Tor public key from the Tor private key
					const torPublicKey = Ed25519.publicKeyFromSecretKey(torPrivateKey);
					
					// Encrypt the data
					const encryptedData = await Slatepack.encrypt(otherTorPrivateKey, torPublicKey, DATA);
					
					// Set salt to nothing
					var salt = new Uint8Array([]);
					
					// Get nonce from encrypted data
					var nonce = encryptedData[Slatepack.ENCRYPTED_DATA_NONCE_INDEX];
					
					// Log nonce
					console.log("Using nonce: " + Common.toHexString(nonce));
					
					// Get encrypted message from encrypted data
					var encryptedMessage = encryptedData[Slatepack.ENCRYPTED_DATA_DATA_INDEX];
				}
				
				// Break
				break;
		}
		
		// Log encrypted slate
		console.log("Encrypted slate: " + Common.toHexString(encryptedMessage));
		
		// Remove tag from the encrypted message
		const tag = encryptedMessage.subarray(encryptedMessage["length"] - Slatepack.TAG_LENGTH);
		encryptedMessage = encryptedMessage.subarray(0, encryptedMessage["length"] - Slatepack.TAG_LENGTH);
		
		// Start decrypting slate on the hardware wallet
		let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_START_DECRYPTING_SLATE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
					
			// Account
			Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
			
			// Index
			Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
			
			// Nonce
			Buffer.from(nonce),
			
			// Address
			Buffer.from(address),
			
			// Salt
			Buffer.from(salt)
		]));
		
		// Go through all chunks of the encrypted message
		const decryptedDataChunks = [];
		for(let i = 0; i < Math.ceil(encryptedMessage["length"] / MAXIMUM_CHUNK_SIZE); ++i) {
		
			// Continue decrypting slate on the hardware wallet
			response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_DECRYPTING_SLATE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.from(encryptedMessage.subarray(i * MAXIMUM_CHUNK_SIZE, i * MAXIMUM_CHUNK_SIZE + MAXIMUM_CHUNK_SIZE)));
			
			// Remove response code from response
			response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
			
			// Append decrypted data chunk to list
			decryptedDataChunks.push(response);
		}
		
		// Finish decrypting slate on the hardware wallet
		response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_FINISH_DECRYPTING_SLATE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.from(tag));
		
		// Remove response code from response
		response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
		
		// Log AES key
		console.log("Using AES key: " + Common.toHexString(response));
		
		// Create AES key from response
		const aesKey = await crypto["subtle"].importKey("raw", response, {"name": "AES-CBC"}, false, ["decrypt"]);
		
		// Go through all decrypted data chunks
		let decryptedData = new Uint8Array([]);
		for(let i = 0; i < decryptedDataChunks["length"]; ++i) {
		
			// Decrypt the data chunk with the AES key
			const data = new Uint8Array(await crypto["subtle"].decrypt({"name": "AES-CBC", "iv": new Uint8Array(AES_IV_SIZE)}, aesKey, decryptedDataChunks[i]));
			
			// Append decrypted data chunk to list
			decryptedData = Common.mergeArrays([decryptedData, data]);
		}
		
		// Log decrypted slate
		console.log("Decrypted slate: " + Common.toHexString(decryptedData));
		
		// Check if decrypted data is invalid
		if(Common.arraysAreEqual(decryptedData, DATA) === false) {
		
			// Log message
			console.log("Invalid decrypted slate");
			
			// Throw error
			throw "Failed running decrypt slate test";
		}
		
		// Log message
		console.log("Passed running decrypt slate test");
	}
	
	// Otherwise
	else {
	
		// Log message
		console.log("Skipped running decrypt slate test");
	}
}

// Receive transaction test
async function receiveTransactionTest(hardwareWallet, extendedPrivateKey, switchType, features, lockHeight, relativeHeight, senderAddressType, paymentProofType) {

	// Log message
	console.log("Running receive transaction test");

	// Output
	const OUTPUT = new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER));
	
	// Input
	const INPUT = new BigNumber(0);
	
	// Fee
	const FEE = new BigNumber((features === SlateKernel.COINBASE_FEATURES) ? 0 : (Math.floor(Math.random() * (((Slate.MAXIMUM_FEE === Number.POSITIVE_INFINITY) ? Number.MAX_SAFE_INTEGER : Slate.MAXIMUM_FEE) - Slate.MINIMUM_FEE + 1)) + Slate.MINIMUM_FEE));
	
	// Identifier
	const IDENTIFIER = new Identifier(Common.toHexString(Common.mergeArrays([new Uint8Array([Math.round(Math.random() * Identifier.MAX_DEPTH)]), crypto.getRandomValues(new Uint8Array(Identifier.MAX_DEPTH * Uint32Array["BYTES_PER_ELEMENT"]))])));
	
	// Message
	const MESSAGE = "This is a message";
	
	// Log output
	console.log("Using output: " + OUTPUT.toFixed());
	
	// Log identifier
	console.log("Using identifier: " + Common.toHexString(IDENTIFIER.getValue()));
	
	// Log message
	console.log("Using message: " + MESSAGE);
	
	// Check switch type
	switch(switchType) {
	
		// Switch type none
		case Crypto.SWITCH_TYPE_NONE:
		
			// Log switch type
			console.log("Using switch type: none");
		
			// Break
			break;
		
		// Regular switch type
		case Crypto.SWITCH_TYPE_REGULAR:
		
			// Log switch type
			console.log("Using switch type: regular");
		
			// Break
			break;
	}
	
	// Check features
	switch(features) {
	
		// Coinbase features
		case SlateKernel.COINBASE_FEATURES:
		
			// Log features
			console.log("Using features: coinbase");
		
			// Break
			break;
		
		// Plain features
		case SlateKernel.PLAIN_FEATURES:
		
			// Log features
			console.log("Using features: plain");
			
			// Log fee
			console.log("Using fee: " + FEE.toFixed());
		
			// Break
			break;
		
		// Height locked features
		case SlateKernel.HEIGHT_LOCKED_FEATURES:
		
			// Log features
			console.log("Using features: height locked");
			
			// Log fee
			console.log("Using fee: " + FEE.toFixed());
			
			// Log lock height
			console.log("Using lock height: " + lockHeight.toFixed());
		
			// Break
			break;
		
		// No recent duplicate features
		case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
		
			// Log features
			console.log("Using features: no recent duplicate");
			
			// Log fee
			console.log("Using fee: " + FEE.toFixed());
			
			// Log relative height
			console.log("Using relative height: " + relativeHeight.toFixed());
		
			// Break
			break;
	}
	
	// Check sender address type
	switch(senderAddressType) {
	
		// MQS address type
		case MQS_ADDRESS_TYPE:
		
			// Log sender address type
			console.log("Using sender address type: MQS");
			
			// Get MQS private key from the extended private key
			const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.plus(1).toNumber());
			
			// Get MQS public key from the MQS private key
			const mqsPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(mqsPrivateKey);
			
			// Get sender address from the MQS public key
			var senderAddress = Mqs.publicKeyToMqsAddress(mqsPublicKey, Consensus.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE);
		
			// Break
			break;
		
		// Tor address type
		case TOR_ADDRESS_TYPE:
		
			// Log sender address type
			console.log("Using sender address type: Tor");
			
			// Get Tor private key from the extended private key
			const torPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.plus(1).toNumber());
			
			// Get Tor public key from the Tor private key
			const torPublicKey = Ed25519.publicKeyFromSecretKey(torPrivateKey);
			
			// Get sender address from the Tor public key
			var senderAddress = Tor.publicKeyToTorAddress(torPublicKey);
		
			// Break
			break;
	}
	
	// Get random kernel commitment
	const kernelCommit = await Crypto.commit(extendedPrivateKey, OUTPUT, IDENTIFIER, switchType);
	
	// Check payment proof type
	switch(paymentProofType) {
	
		// No payment proof type
		case NO_PAYMENT_PROOF_TYPE:
		
			// Log payment proof type
			console.log("Using payment proof type: none");
			
			// Set receiver address type
			var receiverAddressType = senderAddressType;
		
			// Break
			break;
		
		// MQS payment proof type
		case MQS_PAYMENT_PROOF_TYPE:
		
			// Log payment proof type
			console.log("Using payment proof type: MQS");
			
			// Set receiver address type
			var receiverAddressType = MQS_ADDRESS_TYPE;
		
			// Get MQS private key from the extended private key
			const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
			
			// Set payment proof message
			var paymentProofMessage = Slate.getPaymentProofMessage(OUTPUT, kernelCommit, senderAddress);
			
			// Get payment proof message hash
			const paymentProofMessageHash = new Uint8Array(sha256.arrayBuffer(paymentProofMessage));
			
			// Set expected payment proof as the payment proof message hash signed by the MQS private key
			var expectedPaymentProof = Secp256k1Zkp.createMessageHashSignature(paymentProofMessageHash, mqsPrivateKey);
			
			// Break
			break;
		
		// Tor payment proof type
		case TOR_PAYMENT_PROOF_TYPE:
		
			// Log payment proof type
			console.log("Using payment proof type: Tor");
			
			// Set receiver address type
			var receiverAddressType = TOR_ADDRESS_TYPE;
		
			// Get Tor private key from the extended private key
			const torPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
			
			// Set payment proof message
			var paymentProofMessage = Slate.getPaymentProofMessage(OUTPUT, kernelCommit, senderAddress);
			
			// Set expected payment proof as the payment proof message signed by the Tor private key
			var expectedPaymentProof = Ed25519.sign(paymentProofMessage, torPrivateKey);
		
			// Break
			break;
	}
	
	// Get the output's blinding factor
	const outputBlindingFactor = await Crypto.deriveSecretKey(extendedPrivateKey, OUTPUT, IDENTIFIER, switchType);
	
	// Get the sum of all the transaction's blinding factors
	const transactionBlindingFactor = Secp256k1Zkp.blindSum([outputBlindingFactor], []);
	
	// Get the expected transaction public key from the transaction's blinding factor
	const expectedTransactionPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(transactionBlindingFactor);

	// Start transaction on the hardware wallet
	await hardwareWallet.send(REQUEST_CLASS, REQUEST_START_TRANSACTION_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
	
		// Account
		Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Index
		Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Output
		Buffer.from(OUTPUT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
		
		// Input
		Buffer.from(INPUT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
		
		// Fee
		Buffer.from(FEE.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
		
		// Secret nonce index
		Buffer.from(new Uint8Array([0])),
		
		// Address
		Buffer.from((paymentProofType !== NO_PAYMENT_PROOF_TYPE) ? senderAddress : [])
	]));
	
	// Include output in the transaction on the hardware wallet
	await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_TRANSACTION_INCLUDE_OUTPUT_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
	
		// Identifier
		Buffer.from(IDENTIFIER.getValue()),
		
		// Amount
		Buffer.from(OUTPUT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
		
		// Switch type
		Buffer.from(new Uint8Array([switchType]))
	]));
	
	// Get the transaction public key from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_TRANSACTION_GET_PUBLIC_KEY_INSTRUCTION, NO_PARAMETER, NO_PARAMETER);

	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Log transaction public key
	console.log("Transaction public key: " + Common.toHexString(response));
	
	// Check if transaction public key is invalid
	if(Common.arraysAreEqual(response, expectedTransactionPublicKey) === false) {
	
		// Log message
		console.log("Invalid transaction public key");
		
		// Throw error
		throw "Failed running receive transaction test";
	}
	
	// Get the transaction public nonce from the hardware wallet
	response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_TRANSACTION_GET_PUBLIC_NONCE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER);

	// Get public nonce from response
	const publicNonce = response.subarray(0, Crypto.SECP256K1_PUBLIC_KEY_LENGTH);
	
	// Log transaction public nonce
	console.log("Transaction public nonce: " + Common.toHexString(publicNonce));
	
	// Get the message signature from the hardware wallet
	response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_TRANSACTION_GET_MESSAGE_SIGNATURE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.from((new TextEncoder()).encode(MESSAGE)));

	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Log message signature
	console.log("Message signature: " + Common.toHexString(response));
	
	// Check if features is coinbase
	if(features === SlateKernel.COINBASE_FEATURES) {
		
		// Get excess from commit and over commit
		const excess = Secp256k1Zkp.pedersenCommitSum([
		
			// Commit
			await Crypto.commit(extendedPrivateKey, OUTPUT, IDENTIFIER, switchType)
		], [
		
			// Over commit
			Crypto.commitAmount(OUTPUT)
		]);
		
		// Get public key from excess
		var publicKey = Secp256k1Zkp.pedersenCommitToPublicKey(excess);
	}
	
	// Otherwise
	else {
	
		// Get public key from transaction public key
		var publicKey = expectedTransactionPublicKey;
	}
	
	// Check if message signature is invalid
	if(Secp256k1Zkp.verifySingleSignerSignature(response, Blake2b.compute(Crypto.SINGLE_SIGNER_MESSAGE_LENGTH, (new TextEncoder()).encode(MESSAGE), new Uint8Array([])), Secp256k1Zkp.NO_PUBLIC_NONCE, publicKey, publicKey, false) !== true) {
	
		// Log message
		console.log("Invalid message signature");
		
		// Throw error
		throw "Failed running receive transaction test";
	}
	
	// Log message
	console.log("Verify that the account index on the device is: " + ACCOUNT.toFixed());
	
	// Check features
	switch(features) {
	
		// Plain features
		case SlateKernel.PLAIN_FEATURES:
		
			// Set kernel information to features
			var kernelInformation = new Uint8Array([features]);
		
			// Check if not using Speculos
			if(hardwareWallet instanceof SpeculosTransport === false) {
			
				// Log message
				console.log("Verify that the transaction's kernel features on the device is: Plain");
			}
			
			// Break
			break;
	
		// Coinbase features
		case SlateKernel.COINBASE_FEATURES:
		
			// Set kernel information to features
			var kernelInformation = new Uint8Array([features]);
			
			// Check if not using Speculos
			if(hardwareWallet instanceof SpeculosTransport === false) {
			
				// Log message
				console.log("Verify that the transaction's kernel features on the device is: Coinbase");
			}
		
			// Break
			break;
		
		// Height locked features
		case SlateKernel.HEIGHT_LOCKED_FEATURES:
		
			// Set kernel information to features followed by the lock height
			var kernelInformation = Common.mergeArrays([
			
				// Features
				new Uint8Array([features]),
				
				// Lock height
				new Uint8Array(lockHeight.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64))
			]);
			
			// Check if not using Speculos
			if(hardwareWallet instanceof SpeculosTransport === false) {
			
				// Log message
				console.log("Verify that the transaction's kernel features on the device is: Height Locked");
				
				// Log message
				console.log("Verify that the transaction's lock height on the device is: " + lockHeight.toFixed());
			}
		
			// Break
			break;
		
		// No recent duplicate features
		case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
		
			// Set kernel features to features followed by the relative height
			var kernelInformation = Common.mergeArrays([
			
				// Features
				new Uint8Array([features]),
				
				// Relative height
				new Uint8Array(relativeHeight.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT16))
			]);
			
			// Check if not using Speculos
			if(hardwareWallet instanceof SpeculosTransport === false) {
			
				// Log message
				console.log("Verify that the transaction's kernel features on the device is: No Recent Duplicate");
				
				// Log message
				console.log("Verify that the transaction's relative height on the device is: " + relativeHeight.toFixed());
			}
		
			// Break
			break;
	}
	
	// Check if not using Speculos
	if(hardwareWallet instanceof SpeculosTransport === false) {
	
		// Log message
		console.log("Verify that the transaction's amount on the device is: " + OUTPUT.dividedBy(Consensus.VALUE_NUMBER_BASE).toFixed() + ((Consensus.getNetworkType() !== Consensus.MAINNET_NETWORK_TYPE) ? " " + Consensus.networkTypeToText(Consensus.getNetworkType()) : "") + " " + Consensus.CURRENCY_NAME);
		
		// Log message
		console.log("Verify that the transaction's fee on the device is: " + FEE.dividedBy(Consensus.VALUE_NUMBER_BASE).toFixed() + ((Consensus.getNetworkType() !== Consensus.MAINNET_NETWORK_TYPE) ? " " + Consensus.networkTypeToText(Consensus.getNetworkType()) : "") + " " + Consensus.CURRENCY_NAME);
	}
	
	// Check if using a payment proof
	if(paymentProofType !== NO_PAYMENT_PROOF_TYPE) {
	
		// Check if not using Speculos
		if(hardwareWallet instanceof SpeculosTransport === false) {
		
			// Log message
			console.log("Verify that the transaction's sender payment proof address on the device is: " + senderAddress);
		}
	}
	
	// Otherwise
	else {
	
		// Check if not using Speculos
		if(hardwareWallet instanceof SpeculosTransport === false) {
	
			// Log message
			console.log("Verify that the transaction contains no payment proof on the device");
		}
	}
	
	// Check if using Speculos
	if(hardwareWallet instanceof SpeculosTransport === true) {
	
		// Check if using a Nano hardware wallet
		if(hardwareWallet["deviceModel"].toLowerCase().startsWith("nano") === true) {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "Receive",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Account.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Amount.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Fee.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Kernel Features.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Lock Height.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Relative Height.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "No payment",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Proof Address.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "Approve",
						"actions": [
						
							// Push both
							["button", 1, true],
							["button", 2, true],
							["button", 1, false],
							["button", 2, false]
						]
					}
				]
			});
		}
	
		// Otherwise
		else {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "Tap to continue",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 200, 500, false],
							["finger", 200, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Swipe to review",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 100, 500, false],
							["finger", 100, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Hold to receive",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Set confirmed
							["setbool", "confirmed", true],
							
							// Touch start
							["finger", 250, 500, true]
						]
					},
					{
						"text": "Reject",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Touch
							["finger", 399, 586, false],
							["finger", 399, 586, true],
							["finger", 399, 586, false]
						]
					},
					{
						"text": "TRANSACTION",
						"conditions": [
						
							// Is confirmed
							["confirmed", true]
						],
						"actions": [
						
							// Touch end
							["finger", 200, 500, false]
						]
					}
				]
			});
		}
	}
	
	// Get signature for the transaction from the hardware wallet
	response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_FINISH_TRANSACTION_INSTRUCTION, receiverAddressType, NO_PARAMETER, Buffer.concat([
	
		// Public nonce
		Buffer.from(publicNonce),
		
		// Public key
		Buffer.from(publicKey),
		
		// Kernel information
		Buffer.from(kernelInformation),
		
		// Kernel commitment
		Buffer.from((paymentProofType !== NO_PAYMENT_PROOF_TYPE) ? kernelCommit : [])
	]));
	
	// Get signature from response
	const signature = response.subarray(0, Crypto.SINGLE_SIGNER_SIGNATURE_LENGTH);
	
	// Get payment proof from response
	const paymentProof = response.subarray(Crypto.SINGLE_SIGNER_SIGNATURE_LENGTH, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Log transaction signature
	console.log("Transaction signature: " + Common.toHexString(signature));
	
	// Check if signature is invalid
	if(Secp256k1Zkp.verifySingleSignerSignature(signature, SlateKernel.signatureMessage(features, FEE, lockHeight, relativeHeight), publicNonce, publicKey, publicKey, true) !== true) {
	
		// Log message
		console.log("Invalid transaction signature");
		
		// Throw error
		throw "Failed running receive transaction test";
	}
	
	// Check if using a payment proof
	if(paymentProofType !== NO_PAYMENT_PROOF_TYPE) {
	
		// Log transaction payment proof
		console.log("Transaction payment proof: " + Common.toHexString(paymentProof));
		
		// Check if payment proof is invalid
		if(Common.arraysAreEqual(paymentProof, expectedPaymentProof) === false) {
		
			// Log message
			console.log("Invalid payment proof");
			
			// Throw error
			throw "Failed running receive transaction test";
		}
	}
	
	// Log message
	console.log("Passed running receive transaction test");
}

// Send transaction test
async function sendTransactionTest(hardwareWallet, extendedPrivateKey, switchType, features, lockHeight, relativeHeight, senderAddressType, paymentProofType) {

	// Log message
	console.log("Running send transaction test");

	// Output
	const OUTPUT = new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER));
	
	// Fee
	const FEE = new BigNumber(Math.floor(Math.random() * (((Slate.MAXIMUM_FEE === Number.POSITIVE_INFINITY) ? Number.MAX_SAFE_INTEGER : Slate.MAXIMUM_FEE) - Slate.MINIMUM_FEE + 1)) + Slate.MINIMUM_FEE);
	
	// Input
	const INPUT = (new BigNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER))).plus(OUTPUT);
	
	// Output identifier
	const OUTPUT_IDENTIFIER = new Identifier(Common.toHexString(Common.mergeArrays([new Uint8Array([Math.round(Math.random() * Identifier.MAX_DEPTH)]), crypto.getRandomValues(new Uint8Array(Identifier.MAX_DEPTH * Uint32Array["BYTES_PER_ELEMENT"]))])));
	
	// Input identifier
	const INPUT_IDENTIFIER = new Identifier(Common.toHexString(Common.mergeArrays([new Uint8Array([Math.round(Math.random() * Identifier.MAX_DEPTH)]), crypto.getRandomValues(new Uint8Array(Identifier.MAX_DEPTH * Uint32Array["BYTES_PER_ELEMENT"]))])));
	
	// Input switch type
	const INPUT_SWITCH_TYPE = Crypto.SWITCH_TYPE_REGULAR;
	
	// Message
	const MESSAGE = "This is a message";
	
	// Log output
	console.log("Using output: " + OUTPUT.toFixed());
	
	// Log input
	console.log("Using input: " + INPUT.toFixed());
	
	// Log fee
	console.log("Using fee: " + FEE.toFixed());
	
	// Log output identifier
	console.log("Using output identifier: " + Common.toHexString(OUTPUT_IDENTIFIER.getValue()));
	
	// Log input identifier
	console.log("Using input identifier: " + Common.toHexString(INPUT_IDENTIFIER.getValue()));
	
	// Log message
	console.log("Using message: " + MESSAGE);
	
	// Check switch type
	switch(switchType) {
	
		// Switch type none
		case Crypto.SWITCH_TYPE_NONE:
		
			// Log switch type
			console.log("Using switch type: none");
		
			// Break
			break;
		
		// Regular switch type
		case Crypto.SWITCH_TYPE_REGULAR:
		
			// Log switch type
			console.log("Using switch type: regular");
		
			// Break
			break;
	}
	
	// Check features
	switch(features) {
	
		// Plain features
		case SlateKernel.PLAIN_FEATURES:
		
			// Log features
			console.log("Using features: plain");
		
			// Break
			break;
		
		// Height locked features
		case SlateKernel.HEIGHT_LOCKED_FEATURES:
		
			// Log features
			console.log("Using features: height locked");
			
			// Log lock height
			console.log("Using lock height: " + lockHeight.toFixed());
		
			// Break
			break;
		
		// No recent duplicate features
		case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
		
			// Log features
			console.log("Using features: no recent duplicate");
			
			// Log relative height
			console.log("Using relative height: " + relativeHeight.toFixed());
		
			// Break
			break;
	}
	
	// Check sender address type
	switch(senderAddressType) {
	
		// MQS address type
		case MQS_ADDRESS_TYPE:
		
			// Log sender address type
			console.log("Using sender address type: MQS");
			
			// Get MQS private key from the extended private key
			const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
			
			// Get MQS public key from the MQS private key
			const mqsPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(mqsPrivateKey);
			
			// Get sender address from the MQS public key
			var senderAddress = Mqs.publicKeyToMqsAddress(mqsPublicKey, Consensus.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE);
		
			// Break
			break;
		
		// Tor address type
		case TOR_ADDRESS_TYPE:
		
			// Log sender address type
			console.log("Using sender address type: Tor");
			
			// Get Tor private key from the extended private key
			const torPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
			
			// Get Tor public key from the Tor private key
			const torPublicKey = Ed25519.publicKeyFromSecretKey(torPrivateKey);
			
			// Get sender address from the Tor public key
			var senderAddress = Tor.publicKeyToTorAddress(torPublicKey);
		
			// Break
			break;
	}
	
	// Get random kernel commitment
	const kernelCommit = await Crypto.commit(extendedPrivateKey, INPUT.minus(OUTPUT), OUTPUT_IDENTIFIER, INPUT_SWITCH_TYPE);
	
	// Set payment proof message
	const paymentProofMessage = Slate.getPaymentProofMessage(INPUT.minus(OUTPUT), kernelCommit, senderAddress);
	
	// Check payment proof type
	switch(paymentProofType) {
	
		// No payment proof type
		case NO_PAYMENT_PROOF_TYPE:
		
			// Log payment proof type
			console.log("Using payment proof type: none");
		
			// Break
			break;
		
		// MQS payment proof type
		case MQS_PAYMENT_PROOF_TYPE:
		
			// Log payment proof type
			console.log("Using payment proof type: MQS");
		
			// Get MQS private key from the extended private key
			const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
			
			// Get MQS public key from the MQS private key
			const mqsPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(mqsPrivateKey);
			
			// Get receiver address from the MQS public key
			var receiverAddress = Mqs.publicKeyToMqsAddress(mqsPublicKey, Consensus.getNetworkType() === Consensus.MAINNET_NETWORK_TYPE);
			
			// Get payment proof message hash
			const paymentProofMessageHash = new Uint8Array(sha256.arrayBuffer(paymentProofMessage));
			
			// Set payment proof as the payment proof message hash signed by the MQS private key
			var paymentProof = Secp256k1Zkp.createMessageHashSignature(paymentProofMessageHash, mqsPrivateKey);
			
			// Break
			break;
		
		// Tor payment proof type
		case TOR_PAYMENT_PROOF_TYPE:
		
			// Log payment proof type
			console.log("Using payment proof type: Tor");
		
			// Get Tor private key from the extended private key
			const torPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
			
			// Get Tor public key from the Tor private key
			const torPublicKey = Ed25519.publicKeyFromSecretKey(torPrivateKey);
			
			// Get receiver address from the Tor public key
			var receiverAddress = Tor.publicKeyToTorAddress(torPublicKey);
			
			// Set payment proof as the payment proof message signed by the Tor private key
			var paymentProof = Ed25519.sign(paymentProofMessage, torPrivateKey);
		
			// Break
			break;
	}
	
	// While offset isn't a valid secret key
	const offset = new Uint8Array(Crypto.BLINDING_FACTOR_LENGTH);
	do {
	
		// Fill offset with random values
		crypto.getRandomValues(offset);
		
	} while(Secp256k1Zkp.isValidSecretKey(offset) !== true);
	
	// Log offset
	console.log("Using offset: " + Common.toHexString(offset));
	
	// Start transaction twice to test secret nonce index
	let secretNonceIndex = 0;
	for(let i = 0; i < 2; ++i) {
	
		// Start transaction on the hardware wallet
		await hardwareWallet.send(REQUEST_CLASS, REQUEST_START_TRANSACTION_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
		
			// Account
			Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
			
			// Index
			Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
			
			// Output
			Buffer.from(OUTPUT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
			
			// Input
			Buffer.from(INPUT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
			
			// Fee
			Buffer.from(FEE.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
			
			// Secret nonce index
			Buffer.from(new Uint8Array([secretNonceIndex])),
			
			// Address
			Buffer.from((paymentProofType !== NO_PAYMENT_PROOF_TYPE) ? receiverAddress : [])
		]));
		
		// Include output in the transaction on the hardware wallet
		await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_TRANSACTION_INCLUDE_OUTPUT_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
		
			// Identifier
			Buffer.from(OUTPUT_IDENTIFIER.getValue()),
			
			// Amount
			Buffer.from(OUTPUT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
			
			// Switch type
			Buffer.from(new Uint8Array([switchType]))
		]));
		
		// Include input in the transaction on the hardware wallet
		await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_TRANSACTION_INCLUDE_INPUT_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
		
			// Identifier
			Buffer.from(INPUT_IDENTIFIER.getValue()),
			
			// Amount
			Buffer.from((INPUT.plus(FEE)).toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
			
			// Switch type
			Buffer.from(new Uint8Array([INPUT_SWITCH_TYPE]))
		]));
		
		// Apply offset to the transaction on the hardware wallet
		const response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_TRANSACTION_APPLY_OFFSET_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.from(offset));
		
		// Check if response contains a secret nonce index
		if(response["length"] > RESPONSE_DELIMITER_LENGTH) {
		
			// Get secret nonce index from response
			secretNonceIndex = response[0];
			
			// Log secret nonce index
			console.log("Secret nonce index: " + secretNonceIndex);
		}
	}
	
	// Get the output's blinding factor
	const outputBlindingFactor = await Crypto.deriveSecretKey(extendedPrivateKey, OUTPUT, OUTPUT_IDENTIFIER, switchType);
	
	// Get the input's blinding factor
	const inputBlindingFactor = await Crypto.deriveSecretKey(extendedPrivateKey, INPUT.plus(FEE), INPUT_IDENTIFIER, INPUT_SWITCH_TYPE);
	
	// Get the sum of all the transaction's blinding factors
	let transactionBlindingFactor = Secp256k1Zkp.blindSum([outputBlindingFactor], [inputBlindingFactor]);
	
	// Update the transaction blinding factor to include the offset
	transactionBlindingFactor = Secp256k1Zkp.blindSum([transactionBlindingFactor], [offset]);
	
	// Get the expected transaction public key from the transaction's blinding factor
	const expectedTransactionPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(transactionBlindingFactor);
	
	// Get the transaction public key from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_TRANSACTION_GET_PUBLIC_KEY_INSTRUCTION, NO_PARAMETER, NO_PARAMETER);
	
	// Get public key from response
	const publicKey = response.subarray(0, Crypto.SECP256K1_PUBLIC_KEY_LENGTH);
	
	// Log transaction public key after offset
	console.log("Transaction public key after offset: " + Common.toHexString(publicKey));
	
	// Check if transaction public key is invalid
	if(Common.arraysAreEqual(publicKey, expectedTransactionPublicKey) === false) {
	
		// Log message
		console.log("Invalid transaction public key");
		
		// Throw error
		throw "Failed running send transaction test";
	}
	
	// Get the transaction public nonce from the hardware wallet
	response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_TRANSACTION_GET_PUBLIC_NONCE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER);

	// Get public nonce from response
	const publicNonce = response.subarray(0, Crypto.SECP256K1_PUBLIC_KEY_LENGTH);
	
	// Log transaction public nonce
	console.log("Transaction public nonce: " + Common.toHexString(publicNonce));
	
	// Get the message signature from the hardware wallet
	response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_CONTINUE_TRANSACTION_GET_MESSAGE_SIGNATURE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.from((new TextEncoder()).encode(MESSAGE)));

	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Log message signature
	console.log("Message signature: " + Common.toHexString(response));
	
	// Check if message signature is invalid
	if(Secp256k1Zkp.verifySingleSignerSignature(response, Blake2b.compute(Crypto.SINGLE_SIGNER_MESSAGE_LENGTH, (new TextEncoder()).encode(MESSAGE), new Uint8Array([])), Secp256k1Zkp.NO_PUBLIC_NONCE, publicKey, publicKey, false) !== true) {
	
		// Log message
		console.log("Invalid message signature");
		
		// Throw error
		throw "Failed running send transaction test";
	}
	
	// Log message
	console.log("Verify that the account index on the device is: " + ACCOUNT.toFixed());
	
	// Check features
	switch(features) {
	
		// Plain features
		case SlateKernel.PLAIN_FEATURES:
		
			// Set kernel information to features
			var kernelInformation = new Uint8Array([features]);
			
			// Check if not using Speculos
			if(hardwareWallet instanceof SpeculosTransport === false) {
			
				// Log message
				console.log("Verify that the transaction's kernel features on the device is: Plain");
			}
			
			// Break
			break;
		
		// Height locked features
		case SlateKernel.HEIGHT_LOCKED_FEATURES:
		
			// Set kernel information to features followed by the lock height
			var kernelInformation = Common.mergeArrays([
			
				// Features
				new Uint8Array([features]),
				
				// Lock height
				new Uint8Array(lockHeight.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64))
			]);
			
			// Check if not using Speculos
			if(hardwareWallet instanceof SpeculosTransport === false) {
			
				// Log message
				console.log("Verify that the transaction's kernel features on the device is: Height Locked");
				
				// Log message
				console.log("Verify that the transaction's lock height on the device is: " + lockHeight.toFixed());
			}
			
			// Break
			break;
		
		// No recent duplicate features
		case SlateKernel.NO_RECENT_DUPLICATE_FEATURES:
		
			// Set kernel features to features followed by the relative height
			var kernelInformation = Common.mergeArrays([
			
				// Features
				new Uint8Array([features]),
				
				// Relative height
				new Uint8Array(relativeHeight.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT16))
			]);
			
			// Check if not using Speculos
			if(hardwareWallet instanceof SpeculosTransport === false) {
			
				// Log message
				console.log("Verify that the transaction's kernel features on the device is: No Recent Duplicate");
				
				// Log message
				console.log("Verify that the transaction's relative height on the device is: " + relativeHeight.toFixed());
			}
			
			// Break
			break;
	}
	
	// Check if not using Speculos
	if(hardwareWallet instanceof SpeculosTransport === false) {
	
		// Log message
		console.log("Verify that the transaction's amount on the device is: " + INPUT.minus(OUTPUT).dividedBy(Consensus.VALUE_NUMBER_BASE).toFixed() + ((Consensus.getNetworkType() !== Consensus.MAINNET_NETWORK_TYPE) ? " " + Consensus.networkTypeToText(Consensus.getNetworkType()) : "") + " " + Consensus.CURRENCY_NAME);
		
		// Log message
		console.log("Verify that the transaction's fee on the device is: " + FEE.dividedBy(Consensus.VALUE_NUMBER_BASE).toFixed() + ((Consensus.getNetworkType() !== Consensus.MAINNET_NETWORK_TYPE) ? " " + Consensus.networkTypeToText(Consensus.getNetworkType()) : "") + " " + Consensus.CURRENCY_NAME);
	}
	
	// Initialize payment proof information
	let paymentProofInformation = [];
	
	// Check if using a payment proof
	if(paymentProofType !== NO_PAYMENT_PROOF_TYPE) {
	
		// Set payment proof information
		paymentProofInformation = Buffer.concat([
		
			// Kernel commit
			Buffer.from(kernelCommit),
			
			// Payment proof
			Buffer.from(paymentProof)
		]);
		
		// Check if not using Speculos
		if(hardwareWallet instanceof SpeculosTransport === false) {
		
			// Log message
			console.log("Verify that the transaction's recipient payment proof address on the device is: " + receiverAddress);
		}
	}
	
	// Otherwise
	else {
	
		// Check if not using Speculos
		if(hardwareWallet instanceof SpeculosTransport === false) {
	
			// Log message
			console.log("Verify that the transaction contains no payment proof on the device");
		}
	}
	
	// Check if using Speculos
	if(hardwareWallet instanceof SpeculosTransport === true) {
	
		// Check if using a Nano hardware wallet
		if(hardwareWallet["deviceModel"].toLowerCase().startsWith("nano") === true) {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"regexp": "^.*end$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Account.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Amount.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Fee.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Kernel Features.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Lock Height.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Relative Height.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "No payment",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Proof Address.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "Approve",
						"actions": [
						
							// Push both
							["button", 1, true],
							["button", 2, true],
							["button", 1, false],
							["button", 2, false]
						]
					}
				]
			});
		}
		
		// Otherwise
		else {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "Tap to continue",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 200, 500, false],
							["finger", 200, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Swipe to review",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 100, 500, false],
							["finger", 100, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Hold to send",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Set confirmed
							["setbool", "confirmed", true],
							
							// Touch start
							["finger", 250, 500, true]
						]
					},
					{
						"text": "Reject",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Touch
							["finger", 399, 586, false],
							["finger", 399, 586, true],
							["finger", 399, 586, false]
						]
					},
					{
						"text": "TRANSACTION",
						"conditions": [
						
							// Is confirmed
							["confirmed", true]
						],
						"actions": [
						
							// Touch end
							["finger", 200, 500, false]
						]
					}
				]
			});
		}
	}
	
	// Get signature for the transaction from the hardware wallet
	response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_FINISH_TRANSACTION_INSTRUCTION, senderAddressType, NO_PARAMETER, Buffer.concat([
	
		// Public nonce
		Buffer.from(publicNonce),
		
		// Public key
		Buffer.from(publicKey),
		
		// Kernel information
		Buffer.from(kernelInformation),
		
		// Payment proof information
		Buffer.from(paymentProofInformation)
	]));
	
	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Log transaction signature
	console.log("Transaction signature: " + Common.toHexString(response));
	
	// Check if signature is invalid
	if(Secp256k1Zkp.verifySingleSignerSignature(response, SlateKernel.signatureMessage(features, FEE, lockHeight, relativeHeight), Secp256k1Zkp.NO_PUBLIC_NONCE, publicKey, publicKey, true) !== true) {
	
		// Log message
		console.log("Invalid transaction signature");
		
		// Throw error
		throw "Failed running send transaction test";
	}
	
	// Log message
	console.log("Passed running send transaction test");
}

// Get MQS timestamp signature test
async function getMqsTimestampSignatureTest(hardwareWallet, extendedPrivateKey) {

	// Log message
	console.log("Running get MQS timestamp signature test");
	
	// Timestamp
	const TIMESTAMP = new BigNumber(Math.round(Math.random() * Common.UINT32_MAX_VALUE));
	
	// Log timestamp
	console.log("Using timestamp: " + TIMESTAMP.multipliedBy(Common.MILLISECONDS_IN_A_SECOND).toFixed());
	
	// Get MQS private key from the extended private key
	const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
	
	// Get timestamp hash
	const timestampHash = new Uint8Array(sha256.arrayBuffer((new TextEncoder()).encode(TIMESTAMP.multipliedBy(Common.MILLISECONDS_IN_A_SECOND).toFixed())));
	
	// Set expected MQS timestamp signature as the timestamp hash signed by the MQS private key
	const expectedMqsTimestampSignature = Secp256k1Zkp.createMessageHashSignature(timestampHash, mqsPrivateKey);
	
	// Get time zone offset
	const timeZoneOffset = (new Date()).getTimezoneOffset();
	
	// Log time zone offset
	console.log("Using time zone offset: " + timeZoneOffset.toFixed());
	
	// Get timestamp as a date
	const date = new Date((TIMESTAMP.toNumber() - timeZoneOffset * Common.SECONDS_IN_A_MINUTE) * Common.MILLISECONDS_IN_A_SECOND);
	
	// Check if not using Speculos
	if(hardwareWallet instanceof SpeculosTransport === false) {
	
		// Log message
		console.log("Verify that the account index on the device is: " + ACCOUNT.toFixed());
		
		// Log message
		console.log("Verify that the timestamp's time and date on the device is: " + date.getUTCHours().toFixed().padStart(2, "0") + ":" + date.getUTCMinutes().toFixed().padStart(2, "0") + ":" + date.getUTCSeconds().toFixed().padStart(2, "0") + " on " + date.getUTCFullYear().toFixed() + "-" + (date.getUTCMonth() + 1).toFixed().padStart(2, "0") + "-" + date.getUTCDate().toFixed().padStart(2, "0") + " UTC" + ((timeZoneOffset > 0) ? "-" : "+") + Math.floor(Math.abs(timeZoneOffset) / Common.MINUTES_IN_AN_HOUR).toFixed().padStart(2, "0") + ":" + (Math.abs(timeZoneOffset) % Common.MINUTES_IN_AN_HOUR).toFixed().padStart(2, "0"));
	}
	
	// Convert time zone offset to the correct format
	const timeZoneOffsetBuffer = new ArrayBuffer(Uint16Array["BYTES_PER_ELEMENT"]);
	const timeZoneOffsetBufferView = new DataView(timeZoneOffsetBuffer);
	timeZoneOffsetBufferView.setUint16(0, timeZoneOffset, true);
	
	// Check if using Speculos
	if(hardwareWallet instanceof SpeculosTransport === true) {
	
		// Check if using a Nano hardware wallet
		if(hardwareWallet["deviceModel"].toLowerCase().startsWith("nano") === true) {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "challenge?",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Account.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Time And Date.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "The host will",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "listen for the",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "transactions",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "Approve",
						"actions": [
						
							// Push both
							["button", 1, true],
							["button", 2, true],
							["button", 1, false],
							["button", 2, false]
						]
					}
				]
			});
		}
		
		// Otherwise
		else {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "Tap to continue",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 200, 500, false],
							["finger", 200, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Swipe to review",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 100, 500, false],
							["finger", 100, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Hold to sign",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Set confirmed
							["setbool", "confirmed", true],
							
							// Touch start
							["finger", 250, 500, true]
						]
					},
					{
						"text": "Reject",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Touch
							["finger", 399, 586, false],
							["finger", 399, 586, true],
							["finger", 399, 586, false]
						]
					},
					{
						"text": "CHALLENGE",
						"conditions": [
						
							// Is confirmed
							["confirmed", true]
						],
						"actions": [
						
							// Touch end
							["finger", 200, 500, false]
						]
					}
				]
			});
		}
	}
	
	// Get the MQS challenge signature from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
				
		// Account
		Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Index
		Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Timestamp
		Buffer.from(TIMESTAMP.multipliedBy(Common.MILLISECONDS_IN_A_SECOND).toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
		
		// Time zone offset
		Buffer.from(new Uint8Array(timeZoneOffsetBuffer))
	]));
	
	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Log MQS timestamp signature
	console.log("MQS timestamp signature: " + Common.toHexString(response));
	
	// Check if MQS timestamp signature is invalid
	if(Common.arraysAreEqual(response, expectedMqsTimestampSignature) === false) {
	
		// Log message
		console.log("Invalid MQS timestamp signature");
		
		// Throw error
		throw "Failed running get MQS timestamp signature test";
	}
	
	// Log message
	console.log("Passed getting MQS timestamp signature test");
}

// Get MQS default challenge signature test
async function getMqsDefaultChallengeSignatureTest(hardwareWallet, extendedPrivateKey) {

	// Log message
	console.log("Running get MQS default challenge signature test");
	
	// Get MQS private key from the extended private key
	const mqsPrivateKey = await Crypto.addressKey(extendedPrivateKey, INDEX.toNumber());
	
	// Get default challenge hash
	const defaultChallengeHash = new Uint8Array(sha256.arrayBuffer((new TextEncoder()).encode(Mqs.DEFAULT_CHALLENGE)));
	
	// Set expected MQS default challenge signature as the default challenge hash signed by the MQS private key
	const expectedMqsDefaultChallengeSignature = Secp256k1Zkp.createMessageHashSignature(defaultChallengeHash, mqsPrivateKey);
	
	// Check if not using Speculos
	if(hardwareWallet instanceof SpeculosTransport === false) {
	
		// Log message
		console.log("Verify that the account index on the device is: " + ACCOUNT.toFixed());
	}
	
	// Check if using Speculos
	if(hardwareWallet instanceof SpeculosTransport === true) {
	
		// Check if using a Nano hardware wallet
		if(hardwareWallet["deviceModel"].toLowerCase().startsWith("nano") === true) {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "challenge?",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Account.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Default Challenge.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "The host will",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "listen for the",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "transactions",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "Approve",
						"actions": [
						
							// Push both
							["button", 1, true],
							["button", 2, true],
							["button", 1, false],
							["button", 2, false]
						]
					}
				]
			});
		}
		
		// Otherwise
		else {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "Tap to continue",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 200, 500, false],
							["finger", 200, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Swipe to review",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 100, 500, false],
							["finger", 100, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Hold to sign",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Set confirmed
							["setbool", "confirmed", true],
							
							// Touch start
							["finger", 250, 500, true]
						]
					},
					{
						"text": "Reject",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Touch
							["finger", 399, 586, false],
							["finger", 399, 586, true],
							["finger", 399, 586, false]
						]
					},
					{
						"text": "CHALLENGE",
						"conditions": [
						
							// Is confirmed
							["confirmed", true]
						],
						"actions": [
						
							// Touch end
							["finger", 200, 500, false]
						]
					}
				]
			});
		}
	}
	
	// Get the MQS challenge signature from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_MQS_CHALLENGE_SIGNATURE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
				
		// Account
		Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Index
		Buffer.from(INDEX.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32))
	]));
	
	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Log MQS default challenge signature
	console.log("MQS default challenge signature: " + Common.toHexString(response));
	
	// Check if MQS default challenge signature is invalid
	if(Common.arraysAreEqual(response, expectedMqsDefaultChallengeSignature) === false) {
	
		// Log message
		console.log("Invalid MQS default challenge signature");
		
		// Throw error
		throw "Failed running get MQS default challenge signature test";
	}
	
	// Log message
	console.log("Passed getting MQS default challenge signature test");
}

// Get login signature test
async function getLoginSignatureTest(hardwareWallet, extendedPrivateKey) {

	// Log message
	console.log("Running get login signature test");
	
	// Identifier
	const IDENTIFIER = "hardware wallet test";
	
	// Log identifier
	console.log("Using identifier: " + IDENTIFIER);
	
	// Timestamp
	const TIMESTAMP = new BigNumber(Math.round(Math.random() * Common.UINT32_MAX_VALUE));
	
	// Log timestamp
	console.log("Using timestamp: " + TIMESTAMP.multipliedBy(Common.MILLISECONDS_IN_A_SECOND).toFixed());
	
	// Get login private key from the extended private key
	const loginPrivateKey = await Crypto.loginKey(extendedPrivateKey);
	
	// Get timestamp and identifier hash
	const timestampAndIdentifierHash = new Uint8Array(sha256.arrayBuffer(Common.mergeArrays([(new TextEncoder()).encode(TIMESTAMP.multipliedBy(Common.MILLISECONDS_IN_A_SECOND).toFixed()), (new TextEncoder()).encode(" "), (new TextEncoder()).encode(IDENTIFIER)])));
	
	// Set expected login public key to the login private key's public key
	const expectedLoginPublicKey = Secp256k1Zkp.publicKeyFromSecretKey(loginPrivateKey);
	
	// Set expected login signature as the timestamp and identifier hash signed by the login private key
	const expectedLoginSignature = Secp256k1Zkp.createMessageHashSignature(timestampAndIdentifierHash, loginPrivateKey);
	
	// Get time zone offset
	const timeZoneOffset = (new Date()).getTimezoneOffset();
	
	// Log time zone offset
	console.log("Using time zone offset: " + timeZoneOffset.toFixed());
	
	// Get timestamp as a date
	const date = new Date((TIMESTAMP.toNumber() - timeZoneOffset * Common.SECONDS_IN_A_MINUTE) * Common.MILLISECONDS_IN_A_SECOND);
	
	// Check if not using Speculos
	if(hardwareWallet instanceof SpeculosTransport === false) {
	
		// Log message
		console.log("Verify that the account index on the device is: " + ACCOUNT.toFixed());
		
		// Log message
		console.log("Verify that the identifier is: " + IDENTIFIER);
		
		// Log message
		console.log("Verify that the time and date on the device is: " + date.getUTCHours().toFixed().padStart(2, "0") + ":" + date.getUTCMinutes().toFixed().padStart(2, "0") + ":" + date.getUTCSeconds().toFixed().padStart(2, "0") + " on " + date.getUTCFullYear().toFixed() + "-" + (date.getUTCMonth() + 1).toFixed().padStart(2, "0") + "-" + date.getUTCDate().toFixed().padStart(2, "0") + " UTC" + ((timeZoneOffset > 0) ? "-" : "+") + Math.floor(Math.abs(timeZoneOffset) / Common.MINUTES_IN_AN_HOUR).toFixed().padStart(2, "0") + ":" + (Math.abs(timeZoneOffset) % Common.MINUTES_IN_AN_HOUR).toFixed().padStart(2, "0"));
	}
	
	// Convert time zone offset to the correct format
	const timeZoneOffsetBuffer = new ArrayBuffer(Uint16Array["BYTES_PER_ELEMENT"]);
	const timeZoneOffsetBufferView = new DataView(timeZoneOffsetBuffer);
	timeZoneOffsetBufferView.setUint16(0, timeZoneOffset, true);
	
	// Check if using Speculos
	if(hardwareWallet instanceof SpeculosTransport === true) {
	
		// Check if using a Nano hardware wallet
		if(hardwareWallet["deviceModel"].toLowerCase().startsWith("nano") === true) {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "wallet?",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Account.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Identifier.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"regexp": "^Time And Date.*$",
						"actions": [
						
							// Push right
							["button", 2, true],
							["button", 2, false]
						]
					},
					{
						"text": "Approve",
						"actions": [
						
							// Push both
							["button", 1, true],
							["button", 2, true],
							["button", 1, false],
							["button", 2, false]
						]
					}
				]
			});
		}
		
		// Otherwise
		else {
		
			// Set automation
			await setAutomation({
				"version": 1,
				"rules": [
					{
						"text": "Tap to continue",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 200, 500, false],
							["finger", 200, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Swipe to review",
						"actions": [
						
							// Clear confirmed
							["setbool", "confirmed", false],
							
							// Touch
							["finger", 100, 500, false],
							["finger", 100, 500, true],
							["finger", 200, 500, false]
						]
					},
					{
						"text": "Hold to login",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Set confirmed
							["setbool", "confirmed", true],
							
							// Touch start
							["finger", 250, 500, true]
						]
					},
					{
						"text": "Reject",
						"conditions": [
						
							// Not confirmed
							["confirmed", false]
						],
						"actions": [
						
							// Touch
							["finger", 399, 586, false],
							["finger", 399, 586, true],
							["finger", 399, 586, false]
						]
					},
					{
						"text": "WALLET",
						"conditions": [
						
							// Is confirmed
							["confirmed", true]
						],
						"actions": [
						
							// Touch end
							["finger", 200, 500, false]
						]
					}
				]
			});
		}
	}
	
	// Get the login challenge signature from the hardware wallet
	let response = await hardwareWallet.send(REQUEST_CLASS, REQUEST_GET_LOGIN_CHALLENGE_SIGNATURE_INSTRUCTION, NO_PARAMETER, NO_PARAMETER, Buffer.concat([
				
		// Account
		Buffer.from(ACCOUNT.toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT32)),
		
		// Timestamp
		Buffer.from(TIMESTAMP.multipliedBy(Common.MILLISECONDS_IN_A_SECOND).toBytes(BigNumber.LITTLE_ENDIAN, Common.BYTES_IN_A_UINT64)),
		
		// Time zone offset
		Buffer.from(new Uint8Array(timeZoneOffsetBuffer)),
		
		// Identifier
		Buffer.from((new TextEncoder()).encode(IDENTIFIER))
	]));
	
	// Remove response code from response
	response = response.subarray(0, response["length"] - RESPONSE_DELIMITER_LENGTH);
	
	// Get login public key from response
	const loginPublicKey = response.subarray(0, Crypto.SECP256K1_PUBLIC_KEY_LENGTH);
	
	// Get login challenge signature from response
	const loginChallengeSignature = response.subarray(Crypto.SECP256K1_PUBLIC_KEY_LENGTH);
	
	// Log login public key
	console.log("Login public key: " + Common.toHexString(loginPublicKey));
	
	// Check if login public key is invalid
	if(Common.arraysAreEqual(loginPublicKey, expectedLoginPublicKey) === false) {
	
		// Log message
		console.log("Invalid login public key");
		
		// Throw error
		throw "Failed running get login signature test";
	}
	
	// Log login signature
	console.log("Login signature: " + Common.toHexString(loginChallengeSignature));
	
	// Check if login signature is invalid
	if(Common.arraysAreEqual(loginChallengeSignature, expectedLoginSignature) === false) {
	
		// Log message
		console.log("Invalid login signature");
		
		// Throw error
		throw "Failed running get login signature test";
	}
	
	// Log message
	console.log("Passed getting login signature test");
}
