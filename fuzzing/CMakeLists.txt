cmake_minimum_required(VERSION 3.10)

# Project
project(fuzzing C)

# Set export compile commands
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

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
add_compile_definitions(FUZZING)

# Include directories
include_directories(../src $ENV{BOLOS_SDK}/include $ENV{BOLOS_SDK}/lib_cxng/include $ENV{BOLOS_SDK}/lib_cxng/src)


# Fuzzers

# Fuzz get root public key
add_executable(fuzz_get_root_public_key
	fuzz_get_root_public_key.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(get_root_public_key SHARED ../src/commands/get_root_public_key.c)
target_compile_options(fuzz_get_root_public_key
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_get_root_public_key
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto get_root_public_key
)

# Fuzz get address
add_executable(fuzz_get_address
	fuzz_get_address.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(get_address SHARED ../src/commands/get_address.c)
target_compile_options(fuzz_get_address
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_get_address
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto get_address
)

# Fuzz get seed cookie
add_executable(fuzz_get_seed_cookie
	fuzz_get_seed_cookie.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(get_seed_cookie SHARED ../src/commands/get_seed_cookie.c)
target_compile_options(fuzz_get_seed_cookie
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_get_seed_cookie
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto get_seed_cookie
)

# Fuzz get commitment
add_executable(fuzz_get_commitment
	fuzz_get_commitment.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(get_commitment SHARED ../src/commands/get_commitment.c)
target_compile_options(fuzz_get_commitment
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_get_commitment
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto get_commitment
)

# Fuzz get bulletproof components
add_executable(fuzz_get_bulletproof_components
	fuzz_get_bulletproof_components.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(get_bulletproof_components SHARED ../src/commands/get_bulletproof_components.c)
target_compile_options(fuzz_get_bulletproof_components
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_get_bulletproof_components
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto get_bulletproof_components
)

# Fuzz verify root public key
add_executable(fuzz_verify_root_public_key
	fuzz_verify_root_public_key.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(verify_root_public_key SHARED ../src/commands/verify_root_public_key.c)
target_compile_options(fuzz_verify_root_public_key
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_verify_root_public_key
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto verify_root_public_key
)

# Fuzz verify address
add_executable(fuzz_verify_address
	fuzz_verify_address.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(verify_address SHARED ../src/commands/verify_address.c)
target_compile_options(fuzz_verify_address
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_verify_address
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto verify_address
)

# Fuzz start encrypting slate
add_executable(fuzz_start_encrypting_slate
	fuzz_start_encrypting_slate.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(start_encrypting_slate SHARED ../src/commands/start_encrypting_slate.c)
target_compile_options(fuzz_start_encrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_start_encrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto start_encrypting_slate
)

# Fuzz continue encrypting slate
add_executable(fuzz_continue_encrypting_slate
	fuzz_continue_encrypting_slate.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(continue_encrypting_slate SHARED ../src/commands/continue_encrypting_slate.c)
target_compile_options(fuzz_continue_encrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_continue_encrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto continue_encrypting_slate
)

# Fuzz finish encrypting slate
add_executable(fuzz_finish_encrypting_slate
	fuzz_finish_encrypting_slate.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(finish_encrypting_slate SHARED ../src/commands/finish_encrypting_slate.c)
target_compile_options(fuzz_finish_encrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_finish_encrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto finish_encrypting_slate
)

# Fuzz start decrypting slate
add_executable(fuzz_start_decrypting_slate
	fuzz_start_decrypting_slate.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(start_decrypting_slate SHARED ../src/commands/start_decrypting_slate.c)
target_compile_options(fuzz_start_decrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_start_decrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto start_decrypting_slate
)

# Fuzz continue decrypting slate
add_executable(fuzz_continue_decrypting_slate
	fuzz_continue_decrypting_slate.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(continue_decrypting_slate SHARED ../src/commands/continue_decrypting_slate.c)
target_compile_options(fuzz_continue_decrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_continue_decrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto continue_decrypting_slate
)

# Fuzz finish decrypting slate
add_executable(fuzz_finish_decrypting_slate
	fuzz_finish_decrypting_slate.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(finish_decrypting_slate SHARED ../src/commands/finish_decrypting_slate.c)
target_compile_options(fuzz_finish_decrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_finish_decrypting_slate
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto finish_decrypting_slate
)

# Fuzz start transaction
add_executable(fuzz_start_transaction
	fuzz_start_transaction.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(start_transaction SHARED ../src/commands/start_transaction.c)
target_compile_options(fuzz_start_transaction
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_start_transaction
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto start_transaction
)

# Fuzz continue transaction include output
add_executable(fuzz_continue_transaction_include_output
	fuzz_continue_transaction_include_output.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(continue_transaction_include_output SHARED ../src/commands/continue_transaction_include_output.c)
target_compile_options(fuzz_continue_transaction_include_output
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_continue_transaction_include_output
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto continue_transaction_include_output
)

# Fuzz continue transaction include input
add_executable(fuzz_continue_transaction_include_input
	fuzz_continue_transaction_include_input.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(continue_transaction_include_input SHARED ../src/commands/continue_transaction_include_input.c)
target_compile_options(fuzz_continue_transaction_include_input
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_continue_transaction_include_input
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto continue_transaction_include_input
)

# Fuzz continue transaction apply offet
add_executable(fuzz_continue_transaction_apply_offset
	fuzz_continue_transaction_apply_offset.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(continue_transaction_apply_offset SHARED ../src/commands/continue_transaction_apply_offset.c)
target_compile_options(fuzz_continue_transaction_apply_offset
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_continue_transaction_apply_offset
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto continue_transaction_apply_offset
)

# Fuzz continue transaction get public key
add_executable(fuzz_continue_transaction_get_public_key
	fuzz_continue_transaction_get_public_key.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(continue_transaction_get_public_key SHARED ../src/commands/continue_transaction_get_public_key.c)
target_compile_options(fuzz_continue_transaction_get_public_key
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_continue_transaction_get_public_key
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto continue_transaction_get_public_key
)

# Fuzz continue transaction get public nonce
add_executable(fuzz_continue_transaction_get_public_nonce
	fuzz_continue_transaction_get_public_nonce.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(continue_transaction_get_public_nonce SHARED ../src/commands/continue_transaction_get_public_nonce.c)
target_compile_options(fuzz_continue_transaction_get_public_nonce
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_continue_transaction_get_public_nonce
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto continue_transaction_get_public_nonce
)

# Fuzz continue transaction get message signature
add_executable(fuzz_continue_transaction_get_message_signature
	fuzz_continue_transaction_get_message_signature.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(continue_transaction_get_message_signature SHARED ../src/commands/continue_transaction_get_message_signature.c)
target_compile_options(fuzz_continue_transaction_get_message_signature
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_continue_transaction_get_message_signature
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto continue_transaction_get_message_signature
)

# Fuzz finish transaction
add_executable(fuzz_finish_transaction
	fuzz_finish_transaction.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(finish_transaction SHARED ../src/commands/finish_transaction.c)
target_compile_options(fuzz_finish_transaction
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_finish_transaction
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto finish_transaction
)

# Fuzz get MQS challenge signature
add_executable(fuzz_get_mqs_challenge_signature
	fuzz_get_mqs_challenge_signature.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(get_mqs_challenge_signature SHARED ../src/commands/get_mqs_challenge_signature.c)
target_compile_options(fuzz_get_mqs_challenge_signature
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_get_mqs_challenge_signature
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto get_mqs_challenge_signature
)

# Fuzz get login challenge signature
add_executable(fuzz_get_login_challenge_signature
	fuzz_get_login_challenge_signature.c
	../tools/simulate/simulate.c
	../src/base32.c
	../src/base58.c
	../src/blake2b.c
	../src/chacha20_poly1305.c
	../src/common.c
	../src/crypto.c
	../src/generators.c
	../src/menus.c
	../src/mqs.c
	../src/slate.c
	../src/slatepack.c
	../src/state.c
	../src/storage.c
	../src/time.c
	../src/tor.c
	../src/transaction.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_ram.c
	$ENV{BOLOS_SDK}/lib_cxng/src/cx_blake2b.c
)
add_library(get_login_challenge_signature SHARED ../src/commands/get_login_challenge_signature.c)
target_compile_options(fuzz_get_login_challenge_signature
	PRIVATE $<$<C_COMPILER_ID:Clang>:-g -O0 -funsigned-char -fsanitize=fuzzer,address,undefined>
)
target_link_libraries(fuzz_get_login_challenge_signature
	PRIVATE $<$<C_COMPILER_ID:Clang>:-fsanitize=fuzzer,address,undefined>
	PUBLIC crypto get_login_challenge_signature
)
