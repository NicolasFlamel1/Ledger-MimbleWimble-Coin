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

# Include directories
include_directories(../../src $ENV{BOLOS_SDK}/include)


# Tests

# Bech32 test
add_executable(test_bech32 test_bech32.c)
add_library(bech32 SHARED ../../src/bech32.c)
target_link_libraries(test_bech32 PUBLIC cmocka bech32)
add_test(test_bech32 test_bech32)
