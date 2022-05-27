## Introduction

Hardware wallets provide a secure way to manage your crypto assets by keeping your private keys offline. This guide will help you connect your Ledger hardware wallet to the [MimbleWimble Coin web wallet](https://mwcwallet.com) which will allow you to send and receive MimbleWimble Coin with your Ledger hardware wallet.

## Quick Links

* [Requirements](#user-content-requirements)
* [Installation Instructions](#user-content-installation-instructions)
* [Setup Instructions](#user-content-setup-instructions)
* [How To View Your MimbleWimble Coin balance](#user-content-how-to-view-your-mimblewimble-coin-balance)
* [How To Receive MimbleWimble Coin](#user-content-how-to-receive-mimblewimble-coin)
* [How To Send MimbleWimble Coin](#user-content-how-to-send-mimblewimble-coin)
* [Support](#user-content-support)

## Requirements

1. [You've initialized your Ledger hardware wallet.](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-your-Ledger-Nano-S?docs=true)
2. [The latest firmware is installed on your Ledger hardware wallet.](https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware?docs=true)
3. [You have Ledger Live installed.](https://support.ledger.com/hc/en-us/articles/4404389606417-Download-and-install-Ledger-Live?docs=true)

## Installation Instructions

1. Open Ledger Live and click on the Settings button.
![Ledger Live Settings Button](/images/installation_instructions_1.png)

2. Click on the Experimental features tab.
![Ledger Live Experimental Features Tab](images/installation_instructions_2.png)

3. Enable the Developer mode setting.
![Ledger Live Developer Mode Setting](images/installation_instructions_3.png)

4. Click on the Manager section.
![Ledger Live Manager Section](images/installation_instructions_4.png)

5. Connect your Ledger hardware wallet to your computer, find MimbleWimble Coin in the App catalog, and click its Install button.
![Ledger Live MimbleWimble Coin App Install Button](images/installation_instructions_5.png)

6. The MimbleWimble Coin app should be available on your Ledger hardware wallet once the installation completes.
![Ledger Hardware Wallet MimbleWimble Coin App](images/installation_instructions_6.png)

## Setup Instructions

1. Go to the MimbleWimble Coin web wallet, [mwcwallet.com](https://mwcwallet.com), with a web browser that supports [WebUSB](https://caniuse.com/webusb), like Google Chrome.
![MimbleWimble Coin Web Wallet](images/setup_instructions_1.png)

2. Create an account if you have not already done so, otherwise log into your account.
![MimbleWimble Coin Web Wallet Log Into Account](images/setup_instructions_2.png)

3. Click on the Hardware button in the wallets list.
![MimbleWimble Coin Web Wallet Hardware Button](images/setup_instructions_3.png)

4. Open the MimbleWimble Coin app on your Ledger hardware wallet and choose to connect to the device in your web browser.
![MimbleWimble Coin Web Wallet Connect To Hardware Wallet](images/setup_instructions_4.png)

5. Approve exporting your root public key on the Ledger hardware wallet.
![MimbleWimble Coin App Export Root Public Key](images/setup_instructions_5.png)

6. Verify that the root public key displayed on your Ledger hardware wallet matches the one displayed in the MimbleWimble Coin web wallet.
![MimbleWimble Coin App Verify Root Public Key](images/setup_instructions_6.png)

7. The hardware wallet will now be listed in your wallets list.
![MimbleWimble Coin Web Wallet Hardware Wallet](images/setup_instructions_7.png)

## How To View Your MimbleWimble Coin balance

1. Click on the hardware wallet in the wallets list.
![MimbleWimble Coin Web Wallet Hardware Wallet In List](images/how_to_view_your_mimblewimble_coin_balance_1.png)

2. Once the hardware wallet has finished syncing, its MimbleWimble Coin balance will be displayed in the balance section.
![MimbleWimble Coin Web Wallet Balance Section](images/how_to_view_your_mimblewimble_coin_balance_2.png)

## How To Receive MimbleWimble Coin

1. Verify that the MimbleWimble Coin web wallet is connected to a listener. You can only receive payments while you are online and connected to a listener.
![MimbleWimble Coin Web Wallet Listener](images/how_to_receive_mimblewimble_coin_1.png)

2. Click on the hardware wallet in the wallets list.
![MimbleWimble Coin Web Wallet Hardware Wallet In List](images/how_to_receive_mimblewimble_coin_2.png)

3. Provide the payment sender with the QR code or address listed in the address section.
![MimbleWimble Coin Web Wallet Address Section](images/how_to_receive_mimblewimble_coin_3.png)

4. Click on the Get Payment Proof Address button in the Utilities section.
![MimbleWimble Coin Web Wallet Get Payment Proof Address Button](images/how_to_receive_mimblewimble_coin_4.png)

5. Verify that the Tor address displayed on the hardware wallet matches the one displayed in the MimbleWimble Coin web wallet.
![MimbleWimble Coin App Verify Tor Address](images/how_to_receive_mimblewimble_coin_5.png)

6. Provide the payment sender with the payment proof address so that they can confirm that they are truly sending to you.
![MimbleWimble Coin Web Wallet Payment Proof Address](images/how_to_receive_mimblewimble_coin_6.png)

7. A message will be displayed in the MimbleWimble Coin web wallet when you receive a payment.
![MimbleWimble Coin Web Wallet Payment Received Message](images/how_to_receive_mimblewimble_coin_7.png)

## How To Send MimbleWimble Coin

1. Verify that the MimbleWimble Coin web wallet is connected to a node. You can only send payment while you are connected to a node.
![MimbleWimble Coin Web Wallet Node](images/how_to_send_mimblewimble_coin_1.png)

2. Click on the hardware wallet in the wallets list.
![MimbleWimble Coin Web Wallet Hardware Wallet In List](images/how_to_send_mimblewimble_coin_2.png)

3. Click on the Send Payment button in the balance section.
![MimbleWimble Coin Web Wallet Send Payment Button](images/how_to_send_mimblewimble_coin_3.png)

4. Click the Send button after filling in the Recipient address and Amount fields.
![MimbleWimble Coin Web Wallet Payment Details](images/how_to_send_mimblewimble_coin_4.png)

5. Confirm the payment details, enter your password, and click the Continue button to start sending the payment.
![MimbleWimble Coin Web Wallet Confirm Payment Details](images/how_to_send_mimblewimble_coin_5.png)

6. After the recipient signs the transaction, confirm the amount, fee, and proof address displayed on the Ledger hardware wallet before finalizing sending the transaction.
![MimbleWimble Coin App Finalize Sending Transaction](images/how_to_send_mimblewimble_coin_6.png)

7. The message displayed in the MimbleWimble Coin web wallet will show a check mark if the transaction is successfully broadcast.
![MimbleWimble Coin Web Wallet Payment Successful](images/how_to_send_mimblewimble_coin_7.png)

## Support

* Discord: [https://discord.gg/n5dZaty](https://discord.gg/n5dZaty)
* Reddit: [https://www.reddit.com/r/MimbleWimbleCoin](https://www.reddit.com/r/MimbleWimbleCoin/)
* Github: [https://github.com/NicolasFlamel1/ledger-mimblewimble-coin/issues](https://github.com/NicolasFlamel1/ledger-mimblewimble-coin/issues)
