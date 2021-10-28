# MimbleWimble Coin app for the Ledger Nano X

### Description
MimbleWimble Coin app for the Ledger Nano X.

### Building
Building this app requires setting up a Ledger Nano X build environment. The following steps describe how to setup a build environment.

Install dependencies:
```
sudo apt-get install libc6-dev gcc-multilib g++-multilib
```
Download the Ledger Nano X SDK:
```
git clone https://github.com/LedgerHQ/nanox-secure-sdk.git
```
Download the ARM and Clang development tools:
```
wget -O gcc.tar.bz2 'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-x86_64-linux.tar.bz2'
wget -O clang.tar.xz 'https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.0/clang+llvm-13.0.0-x86_64-linux-gnu-ubuntu-20.04.tar.xz'
mkdir bolos-environment
tar -xJf clang.tar.xz --directory bolos-environment
mv bolos-environment/clang+llvm-13.0.0-x86_64-linux-gnu-ubuntu-20.04 bolos-environment/clang-arm-fropi
tar -xjf gcc.tar.bz2 --directory bolos-environment
mv bolos-environment/gcc-arm-none-eabi-10.3-2021.10 bolos-environment/gcc-arm-none-eabi
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
Response: Application name (ASCII string varying length) | 00 | application version (ASCII string varying length) | 00
Requires user interaction: No
Example request: C700000000
Example response: 4D696D626C6557696D626C6520436F696E00302E302E3100
```

* Get root public key
```
Description: Returns the account's root public key
Class: C7
Instruction: 01
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | requestor's name (ASCII string varying length)
Response: Compressed secp256k1 public key (33 bytes)
Requires user interaction: Yes
Example request: C701000012000000004E69636F6C617320466C616d656C
Example response: 02CC4773277F41E7E10E1E28C1CC6A7E70D857E15CD677C5C8B65D98893D441C83
```

* Get public key verification
```
Description: Returns if the user verifies that the public key is valid
Class: C7
Instruction: 02
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: Public key type (Root 00, Tor 01, MQS 02)
Data: Account (unsigned 4 bytes little endian integer)
Response: N/A
Requires user interaction: Yes
Example request: C70200000400000000
Example response: N/A
```

* Get seed cookie
```
Description: Returns the account's seed cookie which can be used to identify the account
Class: C7
Instruction: 03
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer)
Response: Seed cookie (64 bytes)
Requires user interaction: No
Example request: C70300000400000000
Example response: 9c3400e2e53e053bbdabd698c8b274bc9a31637bb012e3a0cd514103c09f5034f5316dd75afde7e3191516035707d3ed242803d9cbe9afdbd48ec6eea218ca09
```

* Get commitment
```
Description: Returns the account's commitment for the identifier, value, and switch type
Class: C7
Instruction: 04
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | identifier (17 bytes) | value (unsigned 8 bytes little endian integer) | switch type (00 none, 01 regular)
Response: Commitment (33 bytes)
Requires user interaction: No
Example request: C70400001E0000000004000000010000000280000001800000023D73EA8D0000000001
Example response: 08E096C8D9A95570297DFA520BC4F175399CB76672A590A50D5ABA6CD438AD02F4
```

* Get bulletproof tau x
```
Description: Returns the account's bulletproof tau x for the identifier, value, and switch type
Class: C7
Instruction: 05
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | identifier (17 bytes) | value (unsigned 8 bytes little endian integer) | switch type (00 none, 01 regular)
Response: Bulletproof tau x (32 bytes)
Requires user interaction: No
Example request: C70500001E0000000004000000010000000280000001800000023D73EA8D0000000001
Example response: 0336ECDD1EF3AC2202686D8BCCA5A7BD9BAAE211C1B9BF3C9A4FC3EF6DD0CA98
```

* Get bulletproof t one and t two
```
Description: Returns the account's bulletproof t one and t two for the identifier, value, and switch type
Class: C7
Instruction: 06
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | identifier (17 bytes) | value (unsigned 8 bytes little endian integer) | switch type (00 none, 01 regular)
Response: Bulletproof t one (33 bytes) | bulletproof t two (33 bytes)
Requires user interaction: No
Example request: C70600001E0000000004000000010000000280000001800000023D73EA8D0000000001
Example response: 038e3b1f117fb8a7d0cb1096c8d4f70397ada4cc303cf025258ec4912e4179991b02da62acd91892b0c0c717766ec78a16b6b3f122c3c26c924ad5f5814cd7687e77
```

* Get Tor public key
```
Description: Returns the account's Tor public key
Class: C7
Instruction: 07
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer)
Response: Ed25519 public key (32 bytes)
Requires user interaction: No
Example request: C70700000400000000
Example response: 26489D8933530953BF00C20CED09E1EFE74E1A133291B8BCB4CB22D5863BECC9
```

* Get Tor transaction signature
```
Description: Returns the transaction's payment proof signed with the account's Tor private key
Class: C7
Instruction: 08
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | value (unsigned 8 bytes little endian integer) | commitment (33 bytes) | sender address (52 bytes for MQS address, 56 bytes for Tor address)
Response: Ed25519 signature (64 bytes)
Requires user interaction: No
Example request: C70800006500000000010000000000000008E096C8D9A95570297DFA520BC4F175399CB76672A590A50D5ABA6CD438AD02F4657A656A33636A746B6D6576687079617969676F326370623537747534677174676B6933727066757A6D726E6C6272333574653365626164
Example response: BC8E44F664236E9FCC3D2E9DC90BCB69DF741D4F72BF5C44D256F22C4415802A9C26AB78DF6E8AE452AB0001528FBE6FC0C0A1EF7E825B0745910580DBC96302
```

* Get Tor certificate signature
```
Description: Returns the certificate signed with the account's Tor private key
Class: C7
Instruction: 09
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | Ed25519 medium term certificate (varying size ed25519_signing_cert without the signature)
Response: Ed25519 signature (64 bytes)
Requires user interaction: Yes
Example request: C7090000500000000001040006E63101832D7A85EBF60242BD50C80EAE7760789288F8041E22C1954604037B42D7B564010020040026489D8933530953BF00C20CED09E1EFE74E1A133291B8BCB4CB22D5863BECC9
Example response: 27C6C4EF00EDF65264AFF97A28C1517F204EB4E494DE231EACBA5BB2A4AFCAF37ED3F88F149B68D76C3B1E83FC8E9BC10C92F8F58F0AFCB9AA98868C0543930B
```

* Start encrypting Slatepack data
```
Description: Returns the random nonce that will be used to encrypt the Slatepack data using the public key and account's Tor private key's X25519 private key to create a shared secret key
Class: C7
Instruction: 0A
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | X25519 public key (32 bytes)
Response: Nonce (12 bytes)
Requires user interaction: No
Example request: C70A000024000000009F28E8FA945FF3E7111AEF63C4396823F65F46D853F39AE36E9501301814494C
Example response: 86F3A5F7512FBA489B4D04DF
```

* Continue encrypting Slatepack data
```
Description: Returns the data encrypted for use in a Slatepack
Class: C7
Instruction: 0B
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Data (64 bytes with the final request able to be less than 64 bytes)
Response: Encrypted data (same size as the data)
Requires user interaction: No
Example request: C70B00004000010203040506070809000102030405060708090001020304050607080900010203040506070809000102030405060708090001020304050607080900010203
Example response: CD475B638924CDD7AC822ABA96A6E559D9FF39D84680D2C93AC61FC23B5AE28366ACD619C0A16296ED156F3D98B2E440B3B6FB88B162C1219ED5C009554A74C8
```

* Finish encrypting Slatepack data
```
Description: Returns the tag of the encrypted data
Class: C7
Instruction: 0C
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: N/A
Response: Tag (16 bytes)
Requires user interaction: No
Example request: C70C000000
Example response: 0B3BE8125B4081F33E7EB62A43C41A26
```

* Start decrypting Slatepack data
```
Description: Starts decrypting the encrypted Slatepack data using the provided nonce, public key, and account's Tor private key's X25519 private key
Class: C7
Instruction: 0D
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | X25519 public key (32 bytes) | nonce (12 bytes)
Response: N/A
Requires user interaction: No
Example request: C70D000030000000009F28E8FA945FF3E7111AEF63C4396823F65F46D853F39AE36E9501301814494C86F3A5F7512FBA489B4D04DF
Example response: N/A
```

* Continue decrypting Slatepack data
```
Description: Returns the decrypted data encrypted with a random AES key
Class: C7
Instruction: 0E
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Data (64 bytes with the final request able to be less than 64 bytes)
Response: Decrypted data (size of the data ceil to the next 16 byte boundary)
Requires user interaction: No
Example request: C70E000040CD475B638924CDD7AC822ABA96A6E559D9FF39D84680D2C93AC61FC23B5AE28366ACD619C0A16296ED156F3D98B2E440B3B6FB88B162C1219ED5C009554A74C8
Example response: 5E8C5D613CF500995FB6B03E0A8B266D89D18DDD8672593BE0179B3B88020D05A96A74ED39366613831007729FCC398775B89DEB42A8569067FBCA3C2FE60FC7A823F99A54D4C9E9A3D84D0B16D1A432
```

* Finish decrypting Slatepack data
```
Description: Returns the AES key used to encrypt the decrypted data if the provided tag is correct for the decrypted data
Class: C7
Instruction: 0F
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Tag (16 bytes)
Response: AES key (16 bytes)
Requires user interaction: No
Example request: C70F0000100B3BE8125B4081F33E7EB62A43C41A26
Example response: 000102030405060708090A0B0C0D0E0F
```

* Get MQS public key
```
Description: Returns the account's MQS public key
Class: C7
Instruction: 10
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer)
Response: Compressed secp256k1 public key (33 bytes)
Requires user interaction: No
Example request: C71000000400000000
Example response: 03D8E38A4968916176410BE0C7FB96CA4B03B17A43EA98008071A6EFA4DEAFF4F5
```

* Get MQS transaction signature
```
Description: Returns the transaction's payment proof signed with the account's MQS private key
Class: C7
Instruction: 11
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | value (unsigned 8 bytes little endian integer) | commitment (33 bytes) | sender address (52 bytes MQS address, 56 bytes Tor address)
Response: DER signature (at most 72 bytes)
Requires user interaction: No
Example request: C71100006100000000010000000000000008E096C8D9A95570297DFA520BC4F175399CB76672A590A50D5ABA6CD438AD02F4786D6A434A574B504C6265344470723156346B72446E776B327735484D42734667337942736538795255597946614C70534C4852
Example response: 3045022100C3745C60997EC457CC6EB7818A2AE7E7FF8A30EF52A29B9EBEFF95C6081A7B32022056F38D201D32A19B75C2AF7F81950898D443006C7F034D066B1391CE72DFA3DF
```

* Start encrypting MQS data
```
Description: Returns the random salt and nonce that will be used to encrypt the MQS data using the public key and account's MQS private key to create a shared secret key
Class: C7
Instruction: 12
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | secp256k1 compressed public key (33 bytes)
Response: Salt (8 bytes) | nonce (12 bytes)
Requires user interaction: No
Example request: C7120000250000000003D8E38A4968916176410BE0C7FB96CA4B03B17A43EA98008071A6EFA4DEAFF4F5
Example response: FFEC82955929F30286F3A5F7512FBA489B4D04DF
```

* Continue encrypting MQS data
```
Description: Returns the data encrypted for use in MQS
Class: C7
Instruction: 13
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Data (64 bytes with the final request able to be less than 64 bytes)
Response: Encrypted data (same size as the data)
Requires user interaction: No
Example request: C71300004000010203040506070809000102030405060708090001020304050607080900010203040506070809000102030405060708090001020304050607080900010203
Example response: 4C299DF0C501B7C78E961788C7BB35773B81E5D9820F2D6437074B24CF0F100CF8A16E7F0EA077308F22A9F1C63C44EA089D8171A846DBB2712EE69B0CA7DEBF
```

* Finish encrypting MQS data
```
Description: Returns the tag of the encrypted data
Class: C7
Instruction: 14
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: N/A
Response: Tag (16 bytes)
Requires user interaction: No
Example request: C714000000
Example response: 8DE95463C9B23A107D18BA3DDE480E61
```

* Start decrypting MQS data
```
Description: Starts decrypting the encrypted MQS data using the provided salt, nonce, public key, and account's MQS private key
Class: C7
Instruction: 15
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | secp256k1 compressed public key (33 bytes) | salt (8 bytes) | nonce (12 bytes)
Response: N/A
Requires user interaction: No
Example request: C7150000390000000003D8E38A4968916176410BE0C7FB96CA4B03B17A43EA98008071A6EFA4DEAFF4F5FFEC82955929F30286F3A5F7512FBA489B4D04DF
Example response: N/A
```

* Continue decrypting MQS data
```
Description: Returns the decrypted data encrypted with a random AES key
Class: C7
Instruction: 16
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Data (64 bytes with the final request able to be less than 64 bytes)
Response: Decrypted data (size of the data ceil to the next 16 byte boundary)
Requires user interaction: No
Example request: C7160000404C299DF0C501B7C78E961788C7BB35773B81E5D9820F2D6437074B24CF0F100CF8A16E7F0EA077308F22A9F1C63C44EA089D8171A846DBB2712EE69B0CA7DEBF
Example response: 5E8C5D613CF500995FB6B03E0A8B266D89D18DDD8672593BE0179B3B88020D05A96A74ED39366613831007729FCC398775B89DEB42A8569067FBCA3C2FE60FC7A823F99A54D4C9E9A3D84D0B16D1A432
```

* Finish decrypting MQS data
```
Description: Returns the AES key used to encrypt the decrypted data if the provided tag is correct for the decrypted data
Class: C7
Instruction: 17
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Tag (16 bytes)
Response: AES key (16 bytes)
Requires user interaction: No
Example request: C7170000108DE95463C9B23A107D18BA3DDE480E61
Example response: 000102030405060708090A0B0C0D0E0F
```

* Start transaction
```
Description: Starts a transaction with the following output, input, and fee for the account
Class: C7
Instruction: 18
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | output (unsigned 8 bytes little endian integer) | input (unsigned 8 bytes little endian integer) | fee (unsigned 8 bytes little endian integer) | [receiver address (52 bytes MQS address, 56 bytes Tor address)]
Response: N/A
Requires user interaction: No
Example request: C71800001C00000000020000000000000001000000000000000300000000000000
Example response: N/A
```

* Continue transaction include output
```
Description: Includes the output for the identifier, value, and switch type in the transaction
Class: C7
Instruction: 19
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Identifier (17 bytes) | value (unsigned 8 bytes little endian integer) | switch type (00 none, 01 regular)
Response: N/A
Requires user interaction: No
Example request: C71900001A0300000001000000000000000000000000020000000000000001
Example response: N/A
```

* Continue transaction include input
```
Description: Includes the input for the identifier, value, and switch type in the transaction
Class: C7
Instruction: 1A
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Identifier (17 bytes) | value (unsigned 8 bytes little endian integer) | switch type (00 none, 01 regular)
Response: N/A
Requires user interaction: No
Example request: C71A00001A0300000002000000000000000000000000040000000000000001
Example response: N/A
```

* Continue transaction apply offset
```
Description: Applies an offset to the transaction's blinding factor
Class: C7
Instruction: 1B
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: Offset (32 bytes)
Response: N/A
Requires user interaction: No
Example request: C71B00002008E096C8D9A95570297DFA520BC4F175399CB76672A590A50D5ABA6CD438AD02
Example response: N/A
```

* Continue transaction get public key
```
Description: Returns the transaction's blinding factor's public key
Class: C7
Instruction: 1C
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: 00
Data: N/A
Response: Secp256k1 compressed public key (33 bytes)
Requires user interaction: No
Example request: C71C000000
Example response: 0283871BA8A6D5CA7CCDDC7CCF3D00AC331B166A11AF42FA217D4AEDEAD8F58BD1
```

* Finish transaction
```
Description: Returns the kernel information signed with the transaction's blinding factor
Class: C7
Instruction: 1D
Parameters one: Network type (Mainnet 00, Floonet 01)
Parameter two: Address type (Tor 00, MQS 01)
Data: Secret nonce (32 bytes) | public nonce (use provided 33 bytes, use NULL 000000000000000000000000000000000000000000000000000000000000000000) | compressed secp256k1 pubic key (33 bytes) | kernel information (plain 00, coinbase 01, height locked 02 | lock height (unsigned 8 bytes little endian integer), no recent duplicate 03 | relative height (unsigned 8 bytes little endian integer)) | [commitment (33 bytes) | receiver signature (at most 72 bytes for MQS receiver address, 64 bytes for Tor receiver address)]
Response: Single-signer signature (64 bytes)
Requires user interaction: Yes for transactions that include an input, no otherwise
Example request: C71D00002203C1AA1FE1698AC85C309B0F80A367AF56AFA0F3AA09E40E4C10CDF32E73E7338201
Example response: 039172A3DC31C8D65251CD3B20FD2EF33B31FC34455C07E99A8E79CA8C84A4174960C5E68DB491A9E7DAF86E7E18B5EA310E84DD965A939709A5210E1C4862FF
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
* This app can be built for the Ledger Nano S, however most commands will crash the Ledger Nano S since it doesn't have enough ram.
* The app will reset its internal Slatepack, MQS data, and/or transaction state when unrelated commands are requested. For example, performing a `Start transaction` command followed by a `Get commitment` command will reset the app's internal transaction state thus requiring another `Start transaction` command to be performed before a `Continue transaction include output` command can be performed.
