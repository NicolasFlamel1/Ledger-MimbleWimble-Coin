# MimbleWimble Coin app for the Ledger Nano X

### Description
Work in progress MimbleWimble Coin app for the Ledger Nano X.

### Building
Building this app requires setting up a Ledger Nano X build environment. The following steps describe how to setup a build environment.

Install dependencies:
```
sudo apt-get install libc6-dev gcc-multilib g++-multilib
```
Download the Ledger Nano X SDK:
```
git clone https://github.com/LedgerHQ/nanox-secure-sdk.git
sed -i "s/\`clang/\`$\(CLANGPATH\)clang/g" nanox-secure-sdk/Makefile.rules_generic
```
Download the ARM and Clang development tools:
```
wget -O gcc.tar.bz2 'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-x86_64-linux.tar.bz2'
wget -O clang.tar.xz 'https://github.com/llvm/llvm-project/releases/download/llvmorg-12.0.1/clang+llvm-12.0.1-x86_64-linux-gnu-ubuntu-16.04.tar.xz'
mkdir bolos-environment
tar -xJf clang.tar.xz --directory bolos-environment
mv bolos-environment/clang+llvm-12.0.1-x86_64-linux-gnu-ubuntu- bolos-environment/clang-arm-fropi
tar -xjf gcc.tar.bz2 --directory bolos-environment
mv bolos-environment/gcc-arm-none-eabi-10.3-2021.07 bolos-environment/gcc-arm-none-eabi
```
Add environmental variables:
```
echo "export BOLOS_SDK=$PWD/nanox-secure-sdk" >> ~/.bashrc
echo "export BOLOS_ENV=$PWD/bolos-environment" >> ~/.bashrc
```
Build the app's dependencies:
```
make dependencies
```
The app can then be built with the following command:
```
make
```

### Testing
It's currently not possible to test this app on a Ledger Nano X since unsigned apps can't run on that device. It is possible to test this app in an emulator. The following steps describe how to setup an emulator for this app.

Install dependencies:
```
sudo apt install cmake gcc-arm-linux-gnueabihf libc6-dev-armhf-cross gdb-multiarch python3-pyqt5 python3-construct python3-flask-restful python3-jsonschema python3-mnemonic python3-pil python3-pyelftools python3-requests qemu-user-static
pip install ledgerblue
```
Build the emulator:
```
git clone https://github.com/LedgerHQ/speculos.git
cd speculos
cmake -Bbuild -H.
make -C build/
cd ..
```
Add environmental variables:
```
echo "export BOLOS_EMU=$PWD/speculos" >> ~/.bashrc
```
The app can be ran in the emulator with the following command:
```
make run
```

### Commands
The app supports the following commands.

* Get application information
```
Description: Returns the application name and version
Class: C7
Instruction: 00
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: N/A
Response: Application name (varying length) | 00 | application version (varying length) | 00
Requires user interaction: no
Example request: C700000000
Example response: 4d696d626c6557696d626c6520436f696e00302e302e3100
```

* Get root public key
```
Description: Returns the account's root public key
Class: C7
Instruction: 01
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian) | requestor's name (varying length)
Response: Account's compressed root public key (33 bytes)
Requires user interaction: yes
Example request: C701000012000000004E69636F6C617320466C616d656C
Example response: 02cc4773277f41e7e10e1e28c1cc6a7e70d857e15cd677c5c8b65d98893d441c83
```

* Get seed cookie
```
Description: Returns the account's seed cookie which can be used to identify the account
Class: C7
Instruction: 02
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian)
Response: Account's seed cookie (64 bytes)
Requires user interaction: no
Example request: C70200000400000000
Example response: 9c3400e2e53e053bbdabd698c8b274bc9a31637bb012e3a0cd514103c09f5034f5316dd75afde7e3191516035707d3ed242803d9cbe9afdbd48ec6eea218ca09
```

* Get commitment
```
Description: Returns the account's commitment for the identifier, value, and switch type
Class: C7
Instruction: 03
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian) | identifier (17 bytes) | value (unsigned 8 bytes little endian) | switch type (00 none, 01 regular)
Response: Account's commitment for the identifier, value, and switch type (33 bytes)
Requires user interaction: no
Example request: C70300001E0000000004000000010000000280000001800000023D73EA8D0000000001
Example response: 08e096c8d9a95570297dfa520bc4f175399cb76672a590a50d5aba6cd438ad02f4
```

* Get private nonce
```
Description: Returns the account's private nonce for the identifier, value, and switch type
Class: C7
Instruction: 04
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian) | identifier (17 bytes) | value (unsigned 8 bytes little endian) | switch type (00 none, 01 regular)
Response: Account's private nonce for the identifier, value, and switch type (32 bytes)
Requires user interaction: no
Example request: C70400001E0000000004000000010000000280000001800000023D73EA8D0000000001
Example response: d633bbdc04805794f647f15f26cb392616903dfd281ab954d49914d369a2b864
```

* Get blinding factor tweak multiply
```
Description: Returns the account's blinding factor for the identifier, value, and switch type multiplied by a scalar
Class: C7
Instruction: 05
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian) | identifier (17 bytes) | value (unsigned 8 bytes little endian) | switch type (00 none, 01 regular) | scalar (32 bytes)
Response: Account's blinding factor for the identifier, value, and switch type multiplied by the scalar (32 bytes)
Requires user interaction: no
Example request: C70500003E0000000004000000010000000280000001800000023D73EA8D00000000010001020304050607080900010203040506070809000102030405060708090001
Example response: 53b1227c3283f79d51b5fc95e7cdc60c739951432892f373e6ee058f2237d137
```

* Get Tor public key
```
Description: Returns the account's Tor public key
Class: C7
Instruction: 06
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian)
Response: Account's Tor public key (32 bytes)
Requires user interaction: no
Example request: C70600000400000000
Example response: 26489d8933530953bf00c20ced09e1efe74e1a133291b8bcb4cb22d5863becc9
```

### Response Codes
The app can return the following response codes when responding to a command:
```
B100: Unknown class
B101: Unknown instruction
B102: Device locked
B103: Malformed request
B104: User rejected
B105: Invalid parameters
D100: Invalid state
D101: Internal error
9000: Success
```

### Notes
* The emulator doesn't implement the `cx_pbkdf2_sha512` related system calls for the Ledger Nano X, so the `Start encrypting MQS data` and `Start decrypting MQS data` commands can't be tested on an emulator for the Ledger Nano X.
* The emulator doesn't implement the `cx_ecdh` function for `CX_CURVE_Curve25519` curves, so the `Start encrypting Slatepack data` and `Start decrypting Slatepack data` commands can't be tested on an emulator.
* This app can be build for the Ledger Nano S, however most commands will crash the Ledger Nano S since it doesn't have enough ram.
