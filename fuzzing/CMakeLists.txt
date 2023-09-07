cmake_minimum_required(VERSION 3.10)

# Project
project(fuzzing C)

# Set export compile commands
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Set C standard
set(CMAKE_C_STANDARD 11)

# Add fuzzing definition
add_compile_definitions(FUZZING)

# Nano SDK definitions
add_compile_definitions(IO_SEPROXYHAL_BUFFER_SIZE_B=0)
add_compile_definitions(USB_SEGMENT_SIZE=0)
add_compile_definitions(OS_IO_SEPROXYHAL)
add_compile_definitions(HAVE_HASH)
add_compile_definitions(HAVE_SHA256)
add_compile_definitions(HAVE_ECC)
add_compile_definitions(HAVE_ECC_TWISTED_EDWARDS)
add_compile_definitions(HAVE_ED_CURVES)
add_compile_definitions(HAVE_ECC_WEIERSTRASS)
add_compile_definitions(HAVE_SECP_CURVES)
add_compile_definitions(HAVE_SHA3)
add_compile_definitions(HAVE_PBKDF2)
add_compile_definitions(CUSTOM_IO_APDU_BUFFER_SIZE=260)
add_compile_definitions(CURRENCY_BIP44_COIN_TYPE=0)
add_compile_definitions(CURRENCY_NAME="")
add_compile_definitions(CURRENCY_ABBREVIATION="")
add_compile_definitions(CURRENCY_MQS_VERSION={1,69})

# Include directories
include_directories(../src $ENV{BOLOS_SDK}/include $ENV{BOLOS_SDK}/lib_cxng/include)


# Fuzzing

# Fuzz start transaction
add_executable(fuzz_start_transaction
	fuzz_start_transaction.c
	simulate/simulate.c
	../../src/common.c
	../../src/mqs.c
	../../src/base58.c
	../../src/slate.c
	../../src/state.c
	../../src/transaction.c
	../../src/storage.c
	../../src/tor.c
	../../src/base32.c
)
add_library(start_transaction SHARED ../src/commands/start_transaction.c)
target_compile_options(fuzz_start_transaction
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_start_transaction
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto start_transaction
)
