## Introduction

Hardware wallets provide a secure way to manage your crypto assets by keeping your private keys offline. This guide will help you connect your Ledger hardware wallet to the [MimbleWimble Coin web wallet](https://mwcwallet.com) which will allow you to send and receive Grin with your Ledger hardware wallet.

## Quick Links

* [Requirements](#user-content-requirements)
* [Installation Instructions](#user-content-installation-instructions)
* [Setup Instructions](#user-content-setup-instructions)
* [How To View Your Grin Balance](#user-content-how-to-view-your-grin-balance)
* [How To Receive Grin](#user-content-how-to-receive-grin)
* [How To Send Grin](#user-content-how-to-send-grin)
* [Support](#user-content-support)

## Requirements

1. [You've initialized your Ledger hardware wallet.](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-your-Ledger-Nano-S?docs=true)
2. [The latest firmware is installed on your Ledger hardware wallet.](https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware?docs=true)
3. [You have Ledger Live Desktop installed.](https://support.ledger.com/hc/en-us/articles/4404389606417-Download-and-install-Ledger-Live?docs=true)

## Installation Instructions

1. Open Ledger Live Desktop and click the My Ledger section.  
<p align="center">
	<img alt="Ledger Live Desktop My Ledger Section" src="images/installation_instructions_1.png">
</p>  

2. Connect your Ledger hardware wallet to your computer, find the Grin app in the App catalog, and click its Install button.  
<p align="center">
	<img alt="Ledger Live Desktop Grin App Install Button" src="images/installation_instructions_2.png">
</p>  

3. The Grin app will be available on your Ledger hardware wallet once the installation completes.  
<p align="center">
	<img alt="Ledger Hardware Wallet Grin App" src="images/installation_instructions_3.png">
</p>  

## Setup Instructions

1. Go to the Grin version of the MimbleWimble Coin web wallet, [mwcwallet.com?Override+Wallet+Type=Grin](https://mwcwallet.com?Override+Wallet+Type=Grin), with a web browser that supports [WebUSB](https://caniuse.com/webusb), like Google Chrome.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet" src="images/setup_instructions_1.png">
</p>  

2. Create an account if you have not already done so, otherwise log into your account.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Log Into Account" src="images/setup_instructions_2.png">
</p>  

3. Click the Hardware button in the wallets list.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Hardware Button" src="images/setup_instructions_3.png">
</p>  

4. Open the Grin app on your Ledger hardware wallet and choose to connect to the device in your web browser.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Connect To Hardware Wallet" src="images/setup_instructions_4.png">
</p>  

5. Approve exporting the root public key on you Ledger hardware wallet.  
<p align="center">
	<img alt="Grin App Export Root Public Key" src="images/setup_instructions_5.png">
</p>  

6. The hardware wallet will now be listed in your wallets list.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Hardware Wallet" src="images/setup_instructions_6.png">
</p>  

## How To View Your Grin Balance

1. Click the hardware wallet in the wallets list.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Hardware Wallet In List" src="images/how_to_view_your_grin_balance_1.png">
</p>  

2. Once the hardware wallet has finished syncing, its Grin balance will be displayed in the balance section.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Balance Section" src="images/how_to_view_your_grin_balance_2.png">
</p>  

## How To Receive Grin

1. Verify that the MimbleWimble Coin web wallet is connected to a listener. You can only receive payments while you are online and connected to a listener.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Listener" src="images/how_to_receive_grin_1.png">
</p>  

2. Click the hardware wallet in the wallets list.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Hardware Wallet In List" src="images/how_to_receive_grin_2.png">
</p>  

3. Provide the payment sender with the QR code or address listed in the address section.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Address Section" src="images/how_to_receive_grin_3.png">
</p>  

4. Click the Get Payment Proof Address button in the Utilities section.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Get Payment Proof Address Button" src="images/how_to_receive_grin_4.png">
</p>  

5. Verify that the Tor address displayed on your hardware wallet matches the one displayed in the MimbleWimble Coin web wallet.  
<p align="center">
	<img alt="Grin App Verify Tor Address" src="images/how_to_receive_grin_5.png">
</p>  

6. Provide the payment sender with the payment proof address so that they can confirm that they are truly sending to you.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Payment Proof Address" src="images/how_to_receive_grin_6.png">
</p>  

7. After the sender sends you the transaction, confirm the amount, fee, kernel features, and sender payment proof address displayed on you Ledger hardware wallet before approving receiving the transaction on your hardware wallet.  
<p align="center">
	<img alt="Grin App Approve Receiving Transaction" src="images/how_to_receive_grin_7.png">
</p>  

8. The MimbleWimble Coin web wallet will show a message with a check mark if the transaction response is successfully sent to the sender.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Payment Received Message" src="images/how_to_receive_grin_8.png">
</p>  

## How To Send Grin

1. Verify that the MimbleWimble Coin web wallet is connected to a node. You can only send payments when you are connected to a node.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Node" src="images/how_to_send_grin_1.png">
</p>  

2. Click the hardware wallet in the wallets list.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Hardware Wallet In List" src="images/how_to_send_grin_2.png">
</p>  

3. Click the Send Payment button in the balance section.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Send Payment Button" src="images/how_to_send_grin_3.png">
</p>  

4. Click the Send button after filling in the Recipient address and Amount fields.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Payment Details" src="images/how_to_send_grin_4.png">
</p>  

5. Confirm the payment details, enter your password, and click the Continue button to start sending the payment.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Confirm Payment Details" src="images/how_to_send_grin_5.png">
</p>  

6. After the recipient signs the transaction, confirm the amount, fee, kernel features, and recipient payment proof address displayed on your Ledger hardware wallet before approving sending the transaction on your hardware wallet.  
<p align="center">
	<img alt="Grin App Approve Sending Transaction" src="images/how_to_send_grin_6.png">
</p>  

7. The message displayed in the MimbleWimble Coin web wallet will show a check mark if the transaction is successfully broadcast.  
<p align="center">
	<img alt="MimbleWimble Coin Web Wallet Payment Successful" src="images/how_to_send_grin_7.png">
</p>  

## Support

* Grin Forum: [https://forum.grin.mw](https://forum.grin.mw)
* Github: [https://github.com/NicolasFlamel1/Ledger-MimbleWimble-Coin/issues](https://github.com/NicolasFlamel1/ledger-mimblewimble-coin/issues)
