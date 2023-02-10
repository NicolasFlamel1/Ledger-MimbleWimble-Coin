# MimbleWimble Coin (MWC) and Grin (GRIN) Ledger hardware wallet apps

### Description
MimbleWimble Coin (MWC) and Grin (GRIN) apps for Ledger Nano S, Ledger Nano X, Ledger Nano S Plus, and Ledger Stax hardware wallets.

These apps can be installed onto Ledger Nano S and Ledger Nano S Plus hardware wallets by going [here](https://htmlpreview.github.io/?https://github.com/NicolasFlamel1/Ledger-MimbleWimble-Coin/blob/master/tools/installer/index.html) with a web browser that supports [WebUSB](https://caniuse.com/webusb).

Ledger Live Desktop and Ledger Live Mobile with MimbleWimble Coin (MWC) and Grin (GRIN) support can be downloaded [here](https://github.com/NicolasFlamel1/ledger-live/releases).

[These video tutorials](https://youtube.com/playlist?list=PLb1nuT3sFYbD_sydCVCngbvATsm9RwWyF) go over how to start using Grin with Ledger Live Desktop/Mobile and how to send Grin to and receive Grin from popular wallets and exchanges with it.

### Building
Building these apps requires setting up a Ledger Nano S, Ledger Nano X, Ledger Nano S Plus, or Ledger Stax build environment. The following steps describe how to do this on Linux.

Install dependencies:
```
sudo apt install libc6-dev gcc-multilib g++-multilib
```
Download the Ledger Nano S SDK, Ledger Nano X SDK, Ledger Nano S Plus SDK, and/or Ledger Stax SDK:
```
git clone https://github.com/LedgerHQ/nanos-secure-sdk.git
git clone https://github.com/LedgerHQ/nanox-secure-sdk.git
git clone https://github.com/LedgerHQ/nanosplus-secure-sdk.git
git clone https://github.com/LedgerHQ/ledger-secure-sdk.git
mv ledger-secure-sdk stax-secure-sdk
cd stax-secure-sdk
git checkout stax_1.0.0-rc8
git checkout API_LEVEL_3
git pull
echo stax > .target
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
echo "export BOLOS_ENV=$PWD/bolos-environment" >> ~/.bashrc
```
The apps can then be built with the following commands:
```
make CURRENCY=mimblewimble_coin
make CURRENCY=grin
```
The apps can be installed onto Ledger Nano S, Ledger Nano S Plus, and Ledger Stax hardware wallets with the following commands:
```
make load CURRENCY=mimblewimble_coin
make load CURRENCY=grin
```

### Testing
Functional tests for the apps can be ran with the following commands:
```
npm i @ledgerhq/hw-transport-node-speculos @ledgerhq/hw-transport-node-hid
make functional_tests CURRENCY=mimblewimble_coin
make functional_tests CURRENCY=grin
```
Unit tests can be ran with the following commands:
```
cmake -Btest/unit_tests/build -Htest/unit_tests/
make -C test/unit_tests/build/
make -C test/unit_tests/build test
```
