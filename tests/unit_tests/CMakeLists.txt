cmake_minimum_required(VERSION 3.10)

# Project
project(unit_tests C)

# Include
include(CTest)

# Enable testing
enable_testing()

# Set C standard
set(CMAKE_C_STANDARD 11)

# Add unit tests definition
add_compile_definitions(UNIT_TESTS)

# Nano SDK definitions
add_compile_definitions(HAVE_HASH)
add_compile_definitions(HAVE_SHA256)

# Include directories
include_directories(../../src $ENV{BOLOS_SDK}/include $ENV{BOLOS_SDK}/lib_cxng/include)


# Tests

# Base32 test
add_executable(test_base32 test_base32.c cx.c)
add_library(base32 SHARED ../../src/base32.c)
target_link_libraries(test_base32 PUBLIC cmocka crypto ssl base32)
add_test(test_base32 test_base32)

# Base58 test
add_executable(test_base58 test_base58.c cx.c)
add_library(base58 SHARED ../../src/base58.c)
target_link_libraries(test_base58 PUBLIC cmocka crypto ssl base58)
add_test(test_base58 test_base58)

# Bech32 test
add_executable(test_bech32 test_bech32.c cx.c)
add_library(bech32 SHARED ../../src/bech32.c)
target_link_libraries(test_bech32 PUBLIC cmocka crypto ssl bech32)
add_test(test_bech32 test_bech32)
