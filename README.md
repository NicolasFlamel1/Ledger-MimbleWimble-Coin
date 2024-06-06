# MimbleWimble Coin (MWC) Ledger hardware wallet app

### Description
MimbleWimble Coin (MWC) app for Ledger Nano S, Ledger Nano X, Ledger Nano S Plus, Ledger Stax, and Ledger Flex hardware wallets.

This app can be installed onto Ledger Nano S, Ledger Nano S Plus, Ledger Stax, and Ledger Flex hardware wallets by going [here](https://htmlpreview.github.io/?https://github.com/NicolasFlamel1/Ledger-MimbleWimble-Coin/blob/master/tools/installer/index.html) with a web browser that supports [WebUSB](https://caniuse.com/webusb).

Ledger Live Desktop and Ledger Live Mobile with MimbleWimble Coin (MWC) support can be downloaded [here](https://github.com/NicolasFlamel1/ledger-live/releases).

### Building
Building this app requires setting up a Ledger Nano S, Ledger Nano X, Ledger Nano S Plus, Ledger Stax, or Ledger Flex build environment. The following steps describe how to do this on Linux.

Install dependencies:
```
sudo apt install libc6-dev gcc-multilib g++-multilib
```
Download the Ledger Nano S SDK, Ledger Nano X SDK, Ledger Nano S Plus SDK, Ledger Stax SDK, and/or Ledger Flex SDK:
```
git clone https://github.com/LedgerHQ/ledger-secure-sdk.git
mv ledger-secure-sdk nanos-secure-sdk
cd nanos-secure-sdk
git checkout nanos_2.1.0
git checkout API_LEVEL_LNS
git pull
echo nanos > .target
cd ..

git clone https://github.com/LedgerHQ/ledger-secure-sdk.git
mv ledger-secure-sdk nanox-secure-sdk
cd nanox-secure-sdk
git checkout nanox_2.2.3
git checkout API_LEVEL_5
git pull
echo nanox > .target
cd ..

git clone https://github.com/LedgerHQ/ledger-secure-sdk.git
mv ledger-secure-sdk nanosplus-secure-sdk
cd nanosplus-secure-sdk
git checkout nanos+_1.1.1
git checkout API_LEVEL_5
git pull
echo nanos2 > .target
cd ..

git clone https://github.com/LedgerHQ/ledger-secure-sdk.git
mv ledger-secure-sdk stax-secure-sdk
cd stax-secure-sdk
git checkout stax_1.4.0-rc2
git checkout API_LEVEL_15
git pull
echo stax > .target
cd ..

git clone https://github.com/LedgerHQ/ledger-secure-sdk.git
mv ledger-secure-sdk flex-secure-sdk
cd flex-secure-sdk
git checkout flex_0.2.0-rc2
git checkout API_LEVEL_18
git pull
echo flex > .target
cd ..
```
Download the ARM and Clang development tools:
```
wget -O gcc.tar.bz2 'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-x86_64-linux.tar.bz2'
wget -O clang.tar.xz 'https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.1/clang+llvm-13.0.1-x86_64-linux-gnu-ubuntu-18.04.tar.xz'
mkdir bolos-environment
tar -xJf clang.tar.xz --directory bolos-environment
rm clang.tar.xz
mv bolos-environment/clang+llvm-13.0.1-x86_64-linux-gnu-ubuntu-18.04 bolos-environment/clang-arm-fropi
tar -xjf gcc.tar.bz2 --directory bolos-environment
rm gcc.tar.bz2
mv bolos-environment/gcc-arm-none-eabi-10.3-2021.10 bolos-environment/gcc-arm-none-eabi
```
Add environmental variables (Remove the starting # from the line in your ~/.bashrc file for the device that you want to build for):
```
echo "#export BOLOS_SDK=$PWD/nanos-secure-sdk" >> ~/.bashrc
echo "#export BOLOS_SDK=$PWD/nanox-secure-sdk" >> ~/.bashrc
echo "#export BOLOS_SDK=$PWD/nanosplus-secure-sdk" >> ~/.bashrc
echo "#export BOLOS_SDK=$PWD/stax-secure-sdk" >> ~/.bashrc
echo "#export BOLOS_SDK=$PWD/flex-secure-sdk" >> ~/.bashrc
echo "export BOLOS_ENV=$PWD/bolos-environment" >> ~/.bashrc
```
The app can then be built with the following commands:
```
make CURRENCY=mimblewimble_coin
```
The app can be installed onto Ledger Nano S, Ledger Nano S Plus, Ledger Stax, and Ledger Flex hardware wallets with the following commands:
```
make load CURRENCY=mimblewimble_coin
```

### Testing
Functional tests for the app can be ran with the following commands:
```
npm i @ledgerhq/hw-transport-node-speculos @ledgerhq/hw-transport-node-hid
make functional_tests CURRENCY=mimblewimble_coin
```
Unit tests can be ran with the following commands:
```
cmake -Btests/unit_tests/build -Htests/unit_tests/
make -C tests/unit_tests/build/
make -C tests/unit_tests/build test
```

### Fuzzing
Fuzzers for all of the app's APDU commands can be ran with the following commands:
```
cmake -DCMAKE_C_COMPILER=/usr/bin/clang -Bfuzzing/build -Hfuzzing/
make -C fuzzing/build/
./fuzzing/build/fuzz_get_root_public_key -max_len=257
./fuzzing/build/fuzz_get_address -max_len=257
./fuzzing/build/fuzz_get_seed_cookie -max_len=257
./fuzzing/build/fuzz_get_commitment -max_len=257
./fuzzing/build/fuzz_get_bulletproof_components -max_len=257
./fuzzing/build/fuzz_verify_root_public_key -max_len=257
./fuzzing/build/fuzz_verify_address -max_len=257
./fuzzing/build/fuzz_start_encrypting_slate -max_len=257
./fuzzing/build/fuzz_continue_encrypting_slate -max_len=257
./fuzzing/build/fuzz_finish_encrypting_slate -max_len=257
./fuzzing/build/fuzz_start_decrypting_slate -max_len=257
./fuzzing/build/fuzz_continue_decrypting_slate -max_len=257
./fuzzing/build/fuzz_finish_decrypting_slate -max_len=257
./fuzzing/build/fuzz_start_transaction -max_len=257
./fuzzing/build/fuzz_continue_transaction_include_output -max_len=257
./fuzzing/build/fuzz_continue_transaction_include_input -max_len=257
./fuzzing/build/fuzz_continue_transaction_apply_offset -max_len=257
./fuzzing/build/fuzz_continue_transaction_get_public_key -max_len=257
./fuzzing/build/fuzz_continue_transaction_get_public_nonce -max_len=257
./fuzzing/build/fuzz_continue_transaction_get_message_signature -max_len=257
./fuzzing/build/fuzz_finish_transaction -max_len=257
./fuzzing/build/fuzz_get_mqs_challenge_signature -max_len=257
./fuzzing/build/fuzz_get_login_challenge_signature -max_len=257
```
