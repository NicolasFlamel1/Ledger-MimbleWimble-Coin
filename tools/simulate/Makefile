# Parameters
NAME = "Simulate Test"
CC = "clang"
CFLAGS = -DFUZZING -DIO_SEPROXYHAL_BUFFER_SIZE_B=0 -DUSB_SEGMENT_SIZE=0 -DCUSTOM_IO_APDU_BUFFER_SIZE=260 -DOS_IO_SEPROXYHAL -DHAVE_AES -DHAVE_ECDSA -DHAVE_ECDH -DHAVE_HASH -DHAVE_SHA256 -DHAVE_SHA512 -DHAVE_RNG -DHAVE_ECC -DHAVE_ECC_TWISTED_EDWARDS -DHAVE_ED_CURVES -DHAVE_ECC_WEIERSTRASS -DHAVE_SECP_CURVES -DHAVE_SHA3 -DHAVE_BLAKE2 -DHAVE_CV25519_CURVE -DHAVE_ECC_MONTGOMERY -DHAVE_MATH -DHAVE_PBKDF2 -DHAVE_HMAC -DHAVE_EDDSA -DCURRENCY_BIP44_COIN_TYPE=0 -DCURRENCY_MQS_VERSION={1,69} -DCURRENCY_NAME="\"\"" -DCURRENCY_ABBREVIATION="\"\"" -I ../../src -I $(BOLOS_SDK)/include -I $(BOLOS_SDK)/lib_cxng/include -I $(BOLOS_SDK)/lib_cxng/src -funsigned-char
LIBS = -lcrypto
SRCS = main.c simulate.c ../../src/base32.c ../../src/base58.c ../../src/blake2b.c ../../src/chacha20_poly1305.c ../../src/common.c ../../src/crypto.c ../../src/generators.c ../../src/menus.c ../../src/mqs.c ../../src/slate.c ../../src/slatepack.c ../../src/state.c ../../src/storage.c ../../src/time.c ../../src/tor.c ../../src/transaction.c $(BOLOS_SDK)/lib_cxng/src/cx_ram.c $(BOLOS_SDK)/lib_cxng/src/cx_blake2b.c
PROGRAM_NAME = $(subst $\",,$(NAME))

# Make
all:
	$(CC) $(CFLAGS) -o "$(PROGRAM_NAME)" $(SRCS) $(LIBS)

# Make run
run:
	"./$(PROGRAM_NAME)"

# Make clean
clean:
	rm -rf "$(PROGRAM_NAME)"
