# MimbleWimble Coin Ledger app

### Description
MimbleWimble Coin app for Ledger Nano S, Ledger Nano X, and Ledger Nano S Plus hardware wallets.

### Building
Building this app requires setting up a Ledger Nano S, Ledger Nano X, or Ledger Nano S Plus build environment. The following steps describe how to setup a build environment.

Install dependencies:
```
sudo apt-get install libc6-dev gcc-multilib g++-multilib
```
Download the Ledger Nano S SDK, Ledger Nano X SDK, or Ledger Nano S Plus SDK:
```
git clone https://github.com/LedgerHQ/nanos-secure-sdk.git
git clone https://github.com/LedgerHQ/nanox-secure-sdk.git
git clone https://github.com/LedgerHQ/nanosplus-secure-sdk.git
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
Add environmental variables:
```
echo "export BOLOS_SDK=$PWD/nanos-secure-sdk" >> ~/.bashrc
echo "#export BOLOS_SDK=$PWD/nanox-secure-sdk" >> ~/.bashrc
echo "#export BOLOS_SDK=$PWD/nanosplus-secure-sdk" >> ~/.bashrc
echo "export BOLOS_ENV=$PWD/bolos-environment" >> ~/.bashrc
```
The app can then be built with the following command:
```
make
```
The app can be installed on a Ledger hardware wallet with the following command:
```
make load
```

This app also supports Grin as a dependent app. To compile and install this app for Grin, run the following commands:
```
make CURRENCY=grin
make load CURRENCY=grin
```

You can also install the MimbleWimble Coin app and the Grin app on a Ledger Nano S or Ledger Nano S Plus without downloading or compiling anything by going [here](https://htmlpreview.github.io/?https://github.com/NicolasFlamel1/Ledger-MimbleWimble-Coin/blob/master/tools/installer/index.html) with a web browser that supports [WebUSB](https://caniuse.com/webusb).

### Testing
Functional tests for this app can be ran with the following commands:
```
npm i @ledgerhq/hw-transport-node-speculos @ledgerhq/hw-transport-node-hid
make functional_tests
```
Unit tests can be ran with the following commands:
```
cmake -Btest/unit_tests/build -Htest/unit_tests/
make -C test/unit_tests/build/
make -C test/unit_tests/build test
```
