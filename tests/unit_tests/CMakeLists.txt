cmake_minimum_required(VERSION 3.10)

# Project
project(unit_tests C)

# Include
include(CTest)

# Enable testing
enable_testing()

# Set C standard
set(CMAKE_C_STANDARD 11)

# SDK definitions
add_compile_definitions(IO_SEPROXYHAL_BUFFER_SIZE_B=0)
add_compile_definitions(USB_SEGMENT_SIZE=0)
add_compile_definitions(CUSTOM_IO_APDU_BUFFER_SIZE=260)
add_compile_definitions(OS_IO_SEPROXYHAL)
add_compile_definitions(HAVE_AES)
add_compile_definitions(HAVE_ECDSA)
add_compile_definitions(HAVE_ECDH)
add_compile_definitions(HAVE_HASH)
add_compile_definitions(HAVE_SHA256)
add_compile_definitions(HAVE_SHA512)
add_compile_definitions(HAVE_RNG)
add_compile_definitions(HAVE_ECC)
add_compile_definitions(HAVE_ECC_TWISTED_EDWARDS)
add_compile_definitions(HAVE_ED_CURVES)
add_compile_definitions(HAVE_ECC_WEIERSTRASS)
add_compile_definitions(HAVE_SECP_CURVES)
add_compile_definitions(HAVE_SHA3)
add_compile_definitions(HAVE_BLAKE2)
add_compile_definitions(HAVE_CV25519_CURVE)
add_compile_definitions(HAVE_ECC_MONTGOMERY)
add_compile_definitions(HAVE_MATH)
add_compile_definitions(HAVE_PBKDF2)
add_compile_definitions(HAVE_HMAC)
add_compile_definitions(HAVE_EDDSA)
add_compile_definitions(CURRENCY_BIP44_COIN_TYPE=0)
add_compile_definitions(CURRENCY_MQS_VERSION={1,69})
add_compile_definitions(CURRENCY_NAME="")
add_compile_definitions(CURRENCY_ABBREVIATION="")

# Include directories
include_directories(../../src $ENV{BOLOS_SDK}/include $ENV{BOLOS_SDK}/lib_cxng/include $ENV{BOLOS_SDK}/lib_cxng/src)


# Tests

# Base32 test
add_executable(test_base32
	test_base32.c
	../../tools/simulate/simulate.c
)
add_library(base32 SHARED ../../src/base32.c)
target_link_libraries(test_base32 PUBLIC cmocka crypto base32)
add_test(test_base32 test_base32)

# Base58 test
add_executable(test_base58
	test_base58.c
	../../tools/simulate/simulate.c
)
add_library(base58 SHARED ../../src/base58.c)
target_link_libraries(test_base58 PUBLIC cmocka crypto base58)
add_test(test_base58 test_base58)

# ChaCha20 Poly1305 test
add_executable(test_chacha20_poly1305
	test_chacha20_poly1305.c
	../../tools/simulate/simulate.c
	../../src/base32.c
	../../src/base58.c
	../../src/blake2b.c
	../../src/common.c
	../../src/crypto.c
	../../src/generators.c
	../../src/menus.c
	../../src/mqs.c
	../../src/slate.c
	../../src/state.c
	../../src/storage.c
	../../src/transaction.c
	../../src/tor.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(chacha20_poly1305 SHARED ../../src/chacha20_poly1305.c)
target_link_libraries(test_chacha20_poly1305 PUBLIC cmocka crypto chacha20_poly1305)
add_test(test_chacha20_poly1305 test_chacha20_poly1305)

# Common test
add_executable(test_common
	test_common.c
	../../tools/simulate/simulate.c
	../../src/base32.c
	../../src/base58.c
	../../src/blake2b.c
	../../src/chacha20_poly1305.c
	../../src/crypto.c
	../../src/generators.c
	../../src/menus.c
	../../src/mqs.c
	../../src/slate.c
	../../src/state.c
	../../src/storage.c
	../../src/transaction.c
	../../src/tor.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(common SHARED ../../src/common.c)
target_link_libraries(test_common PUBLIC cmocka crypto common)
add_test(test_common test_common)

# MQS test
add_executable(test_mqs
	test_mqs.c
	../../tools/simulate/simulate.c
	../../src/base32.c
	../../src/base58.c
	../../src/blake2b.c
	../../src/chacha20_poly1305.c
	../../src/common.c
	../../src/crypto.c
	../../src/generators.c
	../../src/menus.c
	../../src/slate.c
	../../src/state.c
	../../src/storage.c
	../../src/transaction.c
	../../src/tor.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(mqs SHARED ../../src/mqs.c)
target_link_libraries(test_mqs PUBLIC cmocka crypto mqs)
add_test(test_mqs test_mqs)

# Time test
add_executable(test_time
	test_time.c
	../../tools/simulate/simulate.c
)
add_library(time SHARED ../../src/time.c)
target_link_libraries(test_time PUBLIC cmocka crypto time)
add_test(test_time test_time)

# Tor test
add_executable(test_tor
	test_tor.c
	../../tools/simulate/simulate.c
	../../src/base32.c
	../../src/base58.c
	../../src/blake2b.c
	../../src/chacha20_poly1305.c
	../../src/common.c
	../../src/crypto.c
	../../src/generators.c
	../../src/menus.c
	../../src/mqs.c
	../../src/slate.c
	../../src/state.c
	../../src/storage.c
	../../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(tor SHARED ../../src/tor.c)
target_link_libraries(test_tor PUBLIC cmocka crypto tor)
add_test(test_tor test_tor)
