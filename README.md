# MimbleWimble Coin app for the Ledger Nano S and Nano X

### Description
MimbleWimble Coin app for the Ledger Nano S and Nano X.

### Building
Building this app requires setting up a Ledger Nano S or Nano X build environment. The following steps describe how to setup a build environment.

Install dependencies:
```
sudo apt-get install libc6-dev gcc-multilib g++-multilib
```
Download the Ledger Nano S or Nano X SDK:
```
git clone https://github.com/LedgerHQ/nanos-secure-sdk.git
#git clone https://github.com/LedgerHQ/nanox-secure-sdk.git
```
Download the ARM and Clang development tools:
```
wget -O gcc.tar.bz2 'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-x86_64-linux.tar.bz2'
wget -O clang.tar.xz 'https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.0/clang+llvm-13.0.0-x86_64-linux-gnu-ubuntu-20.04.tar.xz'
mkdir bolos-environment
tar -xJf clang.tar.xz --directory bolos-environment
rm clang.tar.xz
mv bolos-environment/clang+llvm-13.0.0-x86_64-linux-gnu-ubuntu-20.04 bolos-environment/clang-arm-fropi
tar -xjf gcc.tar.bz2 --directory bolos-environment
rm gcc.tar.bz2
mv bolos-environment/gcc-arm-none-eabi-10.3-2021.10 bolos-environment/gcc-arm-none-eabi
```
Add environmental variables:
```
echo "export BOLOS_SDK=$PWD/nanos-secure-sdk" >> ~/.bashrc
#echo "export BOLOS_SDK=$PWD/nanox-secure-sdk" >> ~/.bashrc
echo "export BOLOS_ENV=$PWD/bolos-environment" >> ~/.bashrc
```
The app can then be built with the following command:
```
make
```
The app can be installed on a Ledger device with the following command:
```
make load
```
This app also supports Grin as a companion app. To compile and install this app for Grin, run the following commands:
```
make CURRENCY=grin
make load CURRENCY=grin
```

### Testing
Tests for this app can be ran by opening the tests/index.html file in a web browser.

### Commands
The app supports the following commands.

* Get application information
```
Description: Returns the application name and version
Class: C7
Instruction: 00
Parameters one: 00
Parameter two: 00
Data: N/A
Response: Application name (ASCII string varying length) | 00 | application version (ASCII string varying length) | 00
Requires user interaction: No
Example request: C700000000
Example response: 4D696D626C6557696D626C6520436F696E00302E302E31009000
Test: printf "\xC7\x00\x00\x00\x00" | xxd -ps -c200 | ledgerctl send -
```

* Get root public key
```
Description: Returns the account's root public key
Class: C7
Instruction: 01
Parameters one: 00
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer)
Response: Compressed secp256k1 public key (33 bytes)
Requires user interaction: Yes
Example request: C70100000400000000
Example response: 037ED6CE5A1C46C5F74F73CCDC23C7B90C1BF7DDD9EC8FBAD6D4E1851634754F439000
Test: printf "\xC7\x01\x00\x00\x04\x00\x00\x00\x00" | xxd -ps -c200 | ledgerctl send -
```

* Get address
```
Description: Returns the account's address at the specified index
Class: C7
Instruction: 02
Parameters one: Address type (MQS 00, Tor 01, Slatepack 02)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | index (unsigned 4 bytes little endian integer)
Response: Address (52 bytes MQS address, 56 bytes Tor address, at least 60 bytes Slatepack address)
Requires user interaction: No
Example request: C7020000080000000000000000
Example response: 7135597633716B6146576F6A5161427350663236664772786939515344796A374E7242744A3761413570506242335034456F78389000
Test: printf "\xC7\x02\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00" | xxd -ps -c200 | ledgerctl send -
```

* Get seed cookie
```
Description: Returns the account's seed cookie which can be used to identify the account
Class: C7
Instruction: 03
Parameters one: 00
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer)
Response: Seed cookie (64 bytes)
Requires user interaction: No
Example request: C70300000400000000
Example response: BC76CA2EB2AD9FFE88FFC69E37726516A222E3D493B4C4C94745B33685AFCEB737DD4B03AD6729284DFAC5B15B27C43CB89A449FCAB3A2E51EB56C0FFCF1E48D9000
Test: printf "\xC7\x03\x00\x00\x04\x00\x00\x00\x00" | xxd -ps -c200 | ledgerctl send -
```

* Get commitment
```
Description: Returns the account's commitment for the identifier, value, and switch type
Class: C7
Instruction: 04
Parameters one: 00
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | identifier (17 bytes) | value (unsigned 8 bytes little endian integer) | switch type (00 none, 01 regular)
Response: Commitment (33 bytes)
Requires user interaction: No
Example request: C70400001E0000000004000000010000000280000001800000023D73EA8D0000000001
Example response: 085EC481DC79953E3E6F06E4479EE2BE86AB0BF6FFB4F3050E57E96B934C18AE219000
Test: printf "\xC7\x04\x00\x00\x1E\x00\x00\x00\x00\x04\x00\x00\x00\x01\x00\x00\x00\x02\x80\x00\x00\x01\x80\x00\x00\x02\x3D\x73\xEA\x8D\x00\x00\x00\x00\x01" | xxd -ps -c200 | ledgerctl send -
```

* Get bulletproof components
```
Description: Returns the account's tau x, t one, and t two for the identifier, value, and switch type
Class: C7
Instruction: 05
Parameters one: 00
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | identifier (17 bytes) | value (unsigned 8 bytes little endian integer) | switch type (00 none, 01 regular)
Response: Tau x (32 bytes) | t one (33 bytes) | t two (33 bytes)
Requires user interaction: No
Example request: C70500001E0000000004000000010000000280000001800000023D73EA8D0000000001
Example response: 0336ECDD1EF3AC2202686D8BCCA5A7BD9BAAE211C1B9BF3C9A4FC3EF6DD0CA98038E3B1F117FB8A7D0CB1096C8D4F70397ADA4CC303CF025258EC4912E4179991B02DA62ACD91892B0C0C717766EC78A16B6B3F122C3C26C924AD5F5814CD7687E779000
Test: printf "\xC7\x05\x00\x00\x1E\x00\x00\x00\x00\x04\x00\x00\x00\x01\x00\x00\x00\x02\x80\x00\x00\x01\x80\x00\x00\x02\x3D\x73\xEA\x8D\x00\x00\x00\x00\x01" | xxd -ps -c200 | ledgerctl send -
```

* Verify root public key
```
Description: Returns if the user verifies that the account's root public key is valid
Class: C7
Instruction: 06
Parameters one: 00
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer)
Response: N/A
Requires user interaction: Yes
Example request: C70600000400000000
Example response: 9000
Test: printf "\xC7\x06\x00\x00\x04\x00\x00\x00\x00" | xxd -ps -c200 | ledgerctl send -
```

* Verify address
```
Description: Returns if the user verifies that the account's address at the specified index is valid
Class: C7
Instruction: 07
Parameters one: Address type (MQS 00, Tor 01, Slatepack 02)
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | index (unsigned 4 bytes little endian integer)
Response: N/A
Requires user interaction: Yes
Example request: C7070000080000000000000000
Example response: 9000
Test: printf "\xC7\x07\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00" | xxd -ps -c200 | ledgerctl send -
```

* Start encrypting slate
```
Description: Returns the random nonce and optional salt that will be used to encrypt the data that can be sent to the address
Class: C7
Instruction: 08
Parameters one: 00
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | index (unsigned 4 bytes little endian integer) | address (52 bytes MQS address, 56 bytes Tor address, at least 60 bytes Slatepack address)
Response: Nonce (12 bytes) | [salt (8 bytes)]
Requires user interaction: No
Example request: C70800003C00000000000000007135613476757666614E5150445961746433736A72636A59645A4B537159434151646467513445346D6D414E4476594D37394375
Example response: 467084FA49F24E62B256CF5D01312F4AC0BFBD19000
Test: printf "\xC7\x08\x00\x00\x3C\x00\x00\x00\x00\x00\x00\x00\x00\x71\x35\x61\x34\x76\x75\x76\x66\x61\x4E\x51\x50\x44\x59\x61\x74\x64\x33\x73\x6A\x72\x63\x6A\x59\x64\x5A\x4B\x53\x71\x59\x43\x41\x51\x64\x64\x67\x51\x34\x45\x34\x6D\x6D\x41\x4E\x44\x76\x59\x4D\x37\x39\x43\x75" | xxd -ps -c200 | ledgerctl send -
```

* Continue encrypting slate
```
Description: Returns the encrypted data
Class: C7
Instruction: 09
Parameters one: 00
Parameter two: 00
Data: Data (64 bytes with the final request able to be less than 64 bytes)
Response: Encrypted data (same size as the data)
Requires user interaction: No
Example request: C70900004000010203040506070809000102030405060708090001020304050607080900010203040506070809000102030405060708090001020304050607080900010203
Example response: 976FB93AB07EAFA34A7A4385DEDAEC63DF0F5D3415BE47B39A2D0CE2781827298B85F4D7532D9EE23BDD7CF9BD8B91D352BD6402EBFF6350E05E49960133F46C9000
Test: printf "\xC7\x09\x00\x00\x40\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x00\x01\x02\x03" | xxd -ps -c200 | ledgerctl send -
```

* Finish encrypting slate
```
Description: Returns the tag of the encrypted data
Class: C7
Instruction: 0A
Parameters one: 00
Parameter two: 00
Data: N/A
Response: Tag (16 bytes)
Requires user interaction: No
Example request: C70A000000
Example response: A12D9E483216F781B690A3488CE4445B9000
Test: printf "\xC7\x0A\x00\x00\x00" | xxd -ps -c200 | ledgerctl send -
```

* Start decrypting slate
```
Description: Starts decrypting the encrypted data
Class: C7
Instruction: 0B
Parameters one: 00
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | index (unsigned 4 bytes little endian integer) | nonce (12 bytes) | address (52 bytes MQS address, 56 bytes Tor address, at least 60 bytes Slatepack address) | [salt (8 bytes)]
Response: N/A
Requires user interaction: No
Example request: C70B00005000000000000000008467084FA49F24E62B256CF57135613476757666614E5150445961746433736A72636A59645A4B537159434151646467513445346D6D414E4476594D37394375D01312F4AC0BFBD1
Example response: 9000
Test: printf "\xC7\x0B\x00\x00\x50\x00\x00\x00\x00\x00\x00\x00\x00\x84\x67\x08\x4F\xA4\x9F\x24\xE6\x2B\x25\x6C\xF5\x71\x35\x61\x34\x76\x75\x76\x66\x61\x4E\x51\x50\x44\x59\x61\x74\x64\x33\x73\x6A\x72\x63\x6A\x59\x64\x5A\x4B\x53\x71\x59\x43\x41\x51\x64\x64\x67\x51\x34\x45\x34\x6D\x6D\x41\x4E\x44\x76\x59\x4D\x37\x39\x43\x75\xD0\x13\x12\xF4\xAC\x0B\xFB\xD1" | xxd -ps -c200 | ledgerctl send -
```

* Continue decrypting slate
```
Description: Returns the decrypted data encrypted with a random AES key
Class: C7
Instruction: 0C
Parameters one: 00
Parameter two: 00
Data: Data (64 bytes with the final request able to be less than 64 bytes)
Response: Decrypted data (size of the data ceil to the next 16 byte boundary)
Requires user interaction: No
Example request: C70C000040976fb93ab07eafa34a7a4385dedaec63df0f5d3415be47b39a2d0ce2781827298b85f4d7532d9ee23bdd7cf9bd8b91d352bd6402ebff6350e05e49960133f46c
Example response: E668EBE958E0F7376006AD67E5E7497ED724771510272E55352F8E41ADCA8D004559A19D3FD2930C1152583E9BF53118BAB9DF5D1A0E7AA92341DAFB4F5909CFFC0927D3501721DF06AEA9364D2361F19000
Test: printf "\xC7\x0C\x00\x00\x40\x97\x6F\xB9\x3A\xB0\x7E\xAF\xA3\x4A\x7A\x43\x85\xDE\xDA\xEC\x63\xDF\x0F\x5D\x34\x15\xBE\x47\xB3\x9A\x2D\x0C\xE2\x78\x18\x27\x29\x8B\x85\xF4\xD7\x53\x2D\x9E\xE2\x3B\xDD\x7C\xF9\xBD\x8B\x91\xD3\x52\xBD\x64\x02\xEB\xFF\x63\x50\xE0\x5E\x49\x96\x01\x33\xF4\x6C" | xxd -ps -c200 | ledgerctl send -
```

* Finish decrypting slate
```
Description: Returns the AES key used to decrypted the encrypted data if the provided tag is correct
Class: C7
Instruction: 0D
Parameters one: 00
Parameter two: 00
Data: Tag (16 bytes)
Response: AES key (32 bytes)
Requires user interaction: No
Example request: C70D000010A12D9E483216F781B690A3488CE4445B
Example response: B5469FF5AA68FA098EB116DD6DE9DA5CD092A03EFF186F40DB4F907BAC2DD5619000
Test: printf "\xC7\x0D\x00\x00\x10\xA1\x2D\x9E\x48\x32\x16\xF7\x81\xB6\x90\xA3\x48\x8C\xE4\x44\x5B" | xxd -ps -c200 | ledgerctl send -
```

* Start transaction
```
Description: Starts a transaction with the following output, input, and fee for the account
Class: C7
Instruction: 0E
Parameters one: 00
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | index (unsigned 4 bytes little endian integer) | output (unsigned 8 bytes little endian integer) | input (unsigned 8 bytes little endian integer) | fee (unsigned 8 bytes little endian integer) | [address (52 bytes MQS address, 56 bytes Tor address, at least 60 bytes Slatepack address)]
Response: N/A
Requires user interaction: No
Example request: C70E0000200000000000000000020000000000000003000000000000000300000000000000
Example response: 9000
Test: printf "\xC7\x0E\x00\x00\x20\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x03\x00\x00\x00\x00\x00\x00\x00\x03\x00\x00\x00\x00\x00\x00\x00" | xxd -ps -c200 | ledgerctl send -
```

* Continue transaction include output
```
Description: Includes the output for the identifier, value, and switch type in the transaction
Class: C7
Instruction: 0F
Parameters one: 00
Parameter two: 00
Data: Identifier (17 bytes) | value (unsigned 8 bytes little endian integer) | switch type (00 none, 01 regular)
Response: N/A
Requires user interaction: No
Example request: C70F00001A0300000001000000000000000000000000020000000000000001
Example response: 9000
Test: printf "\xC7\x0F\x00\x00\x1A\x03\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x01" | xxd -ps -c200 | ledgerctl send -
```

* Continue transaction include input
```
Description: Includes the input for the identifier, value, and switch type in the transaction
Class: C7
Instruction: 10
Parameters one: 00
Parameter two: 00
Data: Identifier (17 bytes) | value (unsigned 8 bytes little endian integer) | switch type (00 none, 01 regular)
Response: N/A
Requires user interaction: No
Example request: C71000001A0300000002000000000000000000000000060000000000000001
Example response: 9000
Test: printf "\xC7\x10\x00\x00\x1A\x03\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x06\x00\x00\x00\x00\x00\x00\x00\x01" | xxd -ps -c200 | ledgerctl send -
```

* Continue transaction apply offset
```
Description: Applies an offset to the transaction's blinding factor
Class: C7
Instruction: 11
Parameters one: 00
Parameter two: 00
Data: Offset (32 bytes)
Response: N/A
Requires user interaction: No
Example request: C71100002008E096C8D9A95570297DFA520BC4F175399CB76672A590A50D5ABA6CD438AD02
Example response: 9000
Test: printf "\xC7\x11\x00\x00\x20\x08\xE0\x96\xC8\xD9\xA9\x55\x70\x29\x7D\xFA\x52\x0B\xC4\xF1\x75\x39\x9C\xB7\x66\x72\xA5\x90\xA5\x0D\x5A\xBA\x6C\xD4\x38\xAD\x02" | xxd -ps -c200 | ledgerctl send -
```

* Continue transaction get public key
```
Description: Returns the transaction's blinding factor's public key
Class: C7
Instruction: 12
Parameters one: 00
Parameter two: 00
Data: N/A
Response: Public key (33 bytes)
Requires user interaction: No
Example request: C712000000
Example response: 0324F279934A5AA53AC4930EB87744F80612AA7881855E514E619F426FFB34AB169000
Test: printf "\xC7\x12\x00\x00\x00" | xxd -ps -c200 | ledgerctl send -
```

* Finish transaction
```
Description: Returns the kernel information signed with the transaction's blinding factor
Class: C7
Instruction: 13
Parameters one: Address type (MQS 00, Tor 01, Slatepack 02)
Parameter two: 00
Data: Secret nonce (32 bytes) | public nonce (33 bytes) | pubic key (33 bytes) | kernel information (plain 00, coinbase 01, height locked 02 | lock height (unsigned 8 bytes little endian integer), no recent duplicate 03 | relative height (unsigned 8 bytes little endian integer)) | [kernel commitment (33 bytes) | receiver signature (at most 72 bytes for MQS receiver address, 64 bytes for Tor receiver address, 64 bytes for Slatepack receiver address)]
Response: Single-signer signature (64 bytes) | [payment proof (at most 72 bytes for MQS receiver address, 64 bytes for Tor receiver address, 64 bytes for Slatepack receiver address)]
Requires user interaction: Yes for transactions that include an input, no otherwise
Example request: C713000063117060e6676e02004aea8f5834ba51875e867aeaaeb32c9113467604cae2164e0340cb7f4f4173e8c86127985290c48fbe2398de2aecee7085f2da511a5b2e42d303e51bec53ff1efa50516669bc0889fda35e6ff84f0530a4b4adbdb0a543e5159300
Example response: D3422E5B1A51DAF28570EEEC2ADE9823BE8FC49052982761C8E873414F7FCB40883D13E79D2E626CBF0E1C92ABEDCC05543235FAC3972040D1AF9598121E92369000
Test: printf "\xC7\x13\x00\x00\x63\x11\x70\x60\xE6\x67\x6E\x02\x00\x4A\xEA\x8F\x58\x34\xBA\x51\x87\x5E\x86\x7A\xEA\xAE\xB3\x2C\x91\x13\x46\x76\x04\xCA\xE2\x16\x4E\x03\x40\xCB\x7F\x4F\x41\x73\xE8\xC8\x61\x27\x98\x52\x90\xC4\x8F\xBE\x23\x98\xDE\x2A\xEC\xEE\x70\x85\xF2\xDA\x51\x1A\x5B\x2E\x42\xD3\x03\xE5\x1B\xEC\x53\xFF\x1E\xFA\x50\x51\x66\x69\xBC\x08\x89\xFD\xA3\x5E\x6F\xF8\x4F\x05\x30\xA4\xB4\xAD\xBD\xB0\xA5\x43\xE5\x15\x93\x00" | xxd -ps -c200 | ledgerctl send -
```

* Get MQS timestamp signature
```
Description: Returns the timestamp signed with the account's MQS private key at the specified index
Class: C7
Instruction: 14
Parameters one: 00
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | index (unsigned 4 bytes little endian integer) | timestamp (unsigned 8 byte little endian) | time zone offset (signed 2 byte little endian)
Response: DER signature (at most 72 bytes)
Requires user interaction: Yes
Example request: C71400001000000000000000006642762100000000
Example response: 304402206FC03B70F2E15F16F18B697831B20F775FFECEF1A86568272AC90444EFE9BB5B02202656B1692E282BAE22D6D76B7F89015BEE7F71EA9D68071996C7FB46CE0F10229000
Test: printf "\xC7\x14\x00\x00\x10\x00\x00\x00\x00\x00\x00\x00\x00\x66\x42\x76\x21\x00\x00\x00\x00" | xxd -ps -c200 | ledgerctl send -
```

* Get Tor certificate signature
```
Description: Returns the certificate signed with the account's Tor private key at the specified index
Class: C7
Instruction: 15
Parameters one: 00
Parameter two: 00
Data: Account (unsigned 4 bytes little endian integer) | index (unsigned 4 bytes little endian integer) | Ed25519 medium term certificate (varying size Ed25519_signing_cert without header and signature) | time zone offset (signed 2 byte little endian)
Response: Ed25519 signature (64 bytes)
Requires user interaction: Yes
Example request: C7150000540000000000000000010400070003019e5fd5f3a704fb52aa3e54a835e12ae102d0b44b785f239467a1523ffd45824101002004002c425da6a34d075d0b576a6e5d4a66f524a2751eebe74e98b8bb29f025137c2a
Example response: 82FB14C3BC359C246E9870D4321D3A94379ABF4F4EBD66197573A0B32EDF52142FF69A4D1AAAAFB7ACBC2E6B996372AB76D0EE58DC8188BC9E9312E9DBC6410E9000
Test: printf "\xC7\x15\x00\x00\x54\x00\x00\x00\x00\x00\x00\x00\x00\x01\x04\x00\x07\x00\x03\x01\x9E\x5F\xD5\xF3\xA7\x04\xFB\x52\xAA\x3E\x54\xA8\x35\xE1\x2A\xE1\x02\xD0\xB4\x4B\x78\x5F\x23\x94\x67\xA1\x52\x3F\xFD\x45\x82\x41\x01\x00\x20\x04\x00\x2C\x42\x5D\xA6\xA3\x4D\x07\x5D\x0B\x57\x6A\x6E\x5D\x4A\x66\xF5\x24\xA2\x75\x1E\xEB\xE7\x4E\x98\xB8\xBB\x29\xF0\x25\x13\x7C\x2A" | xxd -ps -c200 | ledgerctl send -
```

### Response Codes
The app can return the following response codes when responding to a command:
```
B100: Unknown class
B101: Unknown instruction
B102: Device locked
B103: Malformed request
B104: User rejected
B105: Internal error
D100: Invalid parameters
D101: Invalid state
9000: Success
```

### Notes
* The app will reset its internal slate and/or transaction state when unrelated commands are requested. For example, performing a `Start transaction` command followed by a `Get commitment` command will reset the app's internal transaction state thus requiring another `Start transaction` command to be performed before a `Continue transaction include output` command can be performed.
* The `Get bulletproof components` command takes about 90 seconds to complete.
