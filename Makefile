# Check if BOLOS SDK isn't defined
ifeq ($(BOLOS_SDK),)

# Display error
$(error Environment variable BOLOS_SDK is not set)
endif

# Include BOLOS SDK Makefile defines
include $(BOLOS_SDK)/Makefile.defines

# Application parameters
APP_LOAD_PARAMS = --curve secp256k1
APP_LOAD_PARAMS += $(COMMON_LOAD_PARAMS)

# Application version
APPVERSION_M = 0
APPVERSION_N = 0
APPVERSION_P = 1
APPVERSION = "$(APPVERSION_M).$(APPVERSION_N).$(APPVERSION_P)"

# Emulator flags
EMULATOR_FLAGS = --seed "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"

# Check if currency isn't defined
ifndef CURRENCY

	# Set currency to MimbleWimble Coin
	CURRENCY = mimblewimble_coin
endif

# Check if currency is MimbleWimble Coin
ifeq ($(CURRENCY),mimblewimble_coin)

	# Application name
	APPNAME = "MimbleWimble Coin"
	
	# Application paramaters
	APP_LOAD_PARAMS += --path "44'/593'"
	APP_LOAD_PARAMS += --appFlags 0x800
	
	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=593
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=9
	DEFINES += CURRENCY_MQS_ADDRESS_PAYMENT_PROOF_ALLOWED
	DEFINES += CURRENCY_TOR_ADDRESS_PAYMENT_PROOF_ALLOWED
	DEFINES += CURRENCY_MQS_VERSION=\{1,69\}
	DEFINES += CURRENCY_NAME=\"MimbleWimble\\x20\\x43oin\"
	DEFINES += CURRENCY_ABBREVIATION=\"MWC\"
	DEFINES += CURRENCY_VERSION=\"$(APPVERSION)\"
	DEFINES += CURRENCY_ICON_DETAILS=C_icon_mimblewimble_coin
	DEFINES += CURRENCY_ICON_COLORS=C_icon_mimblewimble_coin_colors
	DEFINES += CURRENCY_ICON_BITMAP=C_icon_mimblewimble_coin_bitmap

# Otherwise check if currency is MimbleWimble Coin floonet
else ifeq ($(CURRENCY),mimblewimble_coin_floonet)

	# Application name
	APPNAME = "MimbleWimble Coin Floonet"
	
	# Application parameters
	APP_LOAD_PARAMS += --path "44'/1'"
	APP_LOAD_PARAMS += --appFlags 0
	APP_LOAD_PARAMS += --dep "MimbleWimble Coin":$(APPVERSION)
	
	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=1
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=9
	DEFINES += CURRENCY_MQS_ADDRESS_PAYMENT_PROOF_ALLOWED
	DEFINES += CURRENCY_TOR_ADDRESS_PAYMENT_PROOF_ALLOWED
	DEFINES += CURRENCY_MQS_VERSION=\{1,121\}
	DEFINES += CURRENCY_NAME=\"MimbleWimble\\x20\\x43oin\\x20\\x46loonet\"
	DEFINES += CURRENCY_ABBREVIATION=\"MWC\"
	DEFINES += CURRENCY_VERSION=\"$(APPVERSION)\"
	DEFINES += CURRENCY_ICON_DETAILS=C_icon_mimblewimble_coin
	DEFINES += CURRENCY_ICON_COLORS=C_icon_mimblewimble_coin_colors
	DEFINES += CURRENCY_ICON_BITMAP=C_icon_mimblewimble_coin_bitmap
	
	# Defines library
	DEFINES_LIB = USE_LIB_MIMBLEWIMBLE_COIN
	
	# Emulator flags
	EMULATOR_FLAGS += --library "MimbleWimble Coin":"mimblewimble coin.elf"

# Otherwise check if currency is Grin
else ifeq ($(CURRENCY),grin)

	# Application name
	APPNAME = "Grin"
	
	# Application parameters
	APP_LOAD_PARAMS += --path "44'/592'"
	APP_LOAD_PARAMS += --appFlags 0
	APP_LOAD_PARAMS += --dep "MimbleWimble Coin":$(APPVERSION)
	
	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=592
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=9
	DEFINES += CURRENCY_ED25519_ADDRESS_PAYMENT_PROOF_ALLOWED
	DEFINES += CURRENCY_NAME=\"Grin\"
	DEFINES += CURRENCY_ABBREVIATION=\"GRIN\"
	DEFINES += CURRENCY_VERSION=\"$(APPVERSION)\"
	DEFINES += CURRENCY_ICON_DETAILS=C_icon_grin
	DEFINES += CURRENCY_ICON_COLORS=C_icon_grin_colors
	DEFINES += CURRENCY_ICON_BITMAP=C_icon_grin_bitmap
	
	# Defines library
	DEFINES_LIB = USE_LIB_MIMBLEWIMBLE_COIN
	
	# Emulator flags
	EMULATOR_FLAGS += --library "MimbleWimble Coin":"mimblewimble coin.elf"

# Otherwise check if currency is Grin testnet
else ifeq ($(CURRENCY),grin_testnet)

	# Application name
	APPNAME = "Grin Testnet"
	
	# Application parameters
	APP_LOAD_PARAMS += --path "44'/1'"
	APP_LOAD_PARAMS += --appFlags 0
	APP_LOAD_PARAMS += --dep "MimbleWimble Coin":$(APPVERSION)
	
	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=1
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=9
	DEFINES += CURRENCY_ED25519_ADDRESS_PAYMENT_PROOF_ALLOWED
	DEFINES += CURRENCY_NAME=\"Grin\\x20Testnet\"
	DEFINES += CURRENCY_ABBREVIATION=\"GRIN\"
	DEFINES += CURRENCY_VERSION=\"$(APPVERSION)\"
	DEFINES += CURRENCY_ICON_DETAILS=C_icon_grin
	DEFINES += CURRENCY_ICON_COLORS=C_icon_grin_colors
	DEFINES += CURRENCY_ICON_BITMAP=C_icon_grin_bitmap
	
	# Defines library
	DEFINES_LIB = USE_LIB_MIMBLEWIMBLE_COIN
	
	# Emulator flags
	EMULATOR_FLAGS += --library "MimbleWimble Coin":"mimblewimble coin.elf"

# Otherwise
else

# Display error
$(error Unsupported CURRENCY - use mimblewimble_coin, mimblewimble_coin_floonet, grin, or grin_testnet)
endif

# Check if target is the Nano X
ifeq ($(TARGET_NAME),TARGET_NANOX)

	# Icon name
	ICONNAME=icons/nanox_app_$(CURRENCY).gif

# Otherwise
else

	# Icon name
	ICONNAME=icons/nanos_app_$(CURRENCY).gif
endif

# Make command
all: default

# Defines
DEFINES += $(DEFINES_LIB)
DEFINES += APPNAME=\"$(APPNAME)\"
DEFINES += APPVERSION=\"$(APPVERSION)\"
DEFINES += MAJOR_VERSION=$(APPVERSION_M) MINOR_VERSION=$(APPVERSION_N) PATCH_VERSION=$(APPVERSION_P)
DEFINES += OS_IO_SEPROXYHAL
DEFINES += HAVE_BAGL HAVE_UX_FLOW HAVE_SPRINTF
DEFINES += HAVE_IO_USB HAVE_L4_USBLIB IO_USB_MAX_ENDPOINTS=6 IO_HID_EP_LENGTH=64 HAVE_USB_APDU
DEFINES += USB_SEGMENT_SIZE=64
DEFINES += BLE_SEGMENT_SIZE=32
DEFINES += HAVE_WEBUSB WEBUSB_URL_SIZE_B=0 WEBUSB_URL=""
DEFINES += UNUSED\(x\)=\(void\)x

# Check if target is the Nano X
ifeq ($(TARGET_NAME),TARGET_NANOX)

	# Target specific defines
	DEFINES += IO_SEPROXYHAL_BUFFER_SIZE_B=300
	DEFINES += HAVE_BLE BLE_COMMAND_TIMEOUT_MS=2000 HAVE_BLE_APDU
	DEFINES += HAVE_GLO096
	DEFINES += BAGL_WIDTH=128 BAGL_HEIGHT=64
	DEFINES += HAVE_BAGL_ELLIPSIS
	DEFINES += HAVE_BAGL_FONT_OPEN_SANS_REGULAR_11PX
	DEFINES += HAVE_BAGL_FONT_OPEN_SANS_EXTRABOLD_11PX
	DEFINES += HAVE_BAGL_FONT_OPEN_SANS_LIGHT_16PX

# Otherwise
else

	# Target specific defines
	DEFINES += IO_SEPROXYHAL_BUFFER_SIZE_B=128
endif

# Set debug
DEBUG = 0

# Check if debug is set
ifneq ($(DEBUG),0)

	# Define printf
	DEFINES += HAVE_PRINTF
	
	# Check if target is the Nano X
	ifeq ($(TARGET_NAME),TARGET_NANOX)
	
		# Define target specific printf
		DEFINES += PRINTF=mcu_usb_printf
	
	# Otherwise
	else
	
		# Define target specific printf
		DEFINES += PRINTF=screen_printf
	endif

# Otherwise
else

	# Define printf as nothing
	DEFINES += PRINTF\(...\)=
endif

# Define stack canary
DEFINES += HAVE_BOLOS_APP_STACK_CANARY

# Check if BOLOS environment is defined
ifneq ($(BOLOS_ENV),)

# Display message
$(info BOLOS_ENV=$(BOLOS_ENV))

	# Set compiler paths
	CLANGPATH := $(BOLOS_ENV)/clang-arm-fropi/bin/
	GCCPATH := $(BOLOS_ENV)/gcc-arm-none-eabi/bin/

# Otherwise
else

# Display message
$(info BOLOS_ENV is not set: falling back to CLANGPATH and GCCPATH)
endif

# Check if Clang path isn't defined
ifeq ($(CLANGPATH),)

# Display message
$(info CLANGPATH is not set: clang will be used from PATH)
endif

# Check if GCC path isn't degined
ifeq ($(GCCPATH),)

# Display message
$(info GCCPATH is not set: arm-none-eabi-* will be used from PATH)
endif

# Compiler settings
CC := $(CLANGPATH)clang
CFLAGS += -std=gnu17 -Oz -Wall -D HAVE_BOLOS_NO_DEFAULT_APDU -Wno-main
AS := $(GCCPATH)arm-none-eabi-gcc
LD := $(GCCPATH)arm-none-eabi-gcc
LDFLAGS += -Oz
LDLIBS += -lm -lgcc -lc

# Compiler Secp256k1-zkp settings
CFLAGS += -D USE_NUM_NONE -D USE_FIELD_INV_BUILTIN -D USE_SCALAR_INV_BUILTIN -D USE_ECMULT_STATIC_PRECOMPUTATION -D ENABLE_MODULE_COMMITMENT -D ENABLE_MODULE_GENERATOR -D ENABLE_MODULE_AGGSIG -D ENABLE_MODULE_BULLETPROOF -I src/secp256k1-zkp-master

# Include BOLOS SDK Makefile glyphs
include $(BOLOS_SDK)/Makefile.glyphs

# Compiler settings
APP_SOURCE_PATH += src
SDK_SOURCE_PATH += lib_stusb lib_stusb_impl lib_ux

# Check if target is the Nano X
ifeq ($(TARGET_NAME),TARGET_NANOX)

	# Target specific compiler settings
	SDK_SOURCE_PATH += lib_blewbxx lib_blewbxx_impl
endif

# Load command
load: all
	
	# Load application on device 
	python3 -m ledgerblue.loadApp $(APP_LOAD_PARAMS)

# Load offline command
load-offline: all
	
	# Load application on on device offline
	python3 -m ledgerblue.loadApp $(APP_LOAD_PARAMS) --offline

# Delete command
delete:
	
	# Delete application from device
	python3 -m ledgerblue.deleteApp $(COMMON_DELETE_PARAMS)

# Run command
run: all
	
	# Run application in emulator
	SPECULOS_APPNAME=$(APPNAME):$(APPVERSION) $(BOLOS_EMU)/speculos.py bin/app.elf --model `echo $(lastword $(subst _, ,$(TARGET_NAME))) | tr A-Z a-z` --sdk $(subst $(eval) ,.,$(wordlist 1,2,$(subst ., ,$(TARGET_VERSION)))) $(EMULATOR_FLAGS)

# Dependencies command
dependencies:
	
	# Create Secp256k1-zkp dependency
	wget "https://github.com/NicolasFlamel1/secp256k1-zkp/archive/master.zip"
	cd src && unzip ../master.zip
	cd src/secp256k1-zkp-master/src && rm -r asm java bench* test* gen_context.c hash.h hash_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/#define WINDOW_A 5/#define WINDOW_A 2/g" ecmult_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/#define WINDOW_G 16/#define WINDOW_G 2/g" ecmult_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/fprintf/\/\/fprintf/g" secp256k1.c
	cd src/secp256k1-zkp-master/src && sed -i "s/abort/\/\/abort/g" secp256k1.c
	cd src/secp256k1-zkp-master/src && sed -i "s/fprintf(stderr, \"%s:%d: %s\\\\n\", __FILE__, __LINE__, msg);/\/*fprintf(stderr, \"%s:%d: %s\\\\n\", __FILE__, __LINE__, msg);*\//g" util.h
	cd src/secp256k1-zkp-master/src && sed -i "s/abort();/\/*abort();*\//g" util.h
	cd src/secp256k1-zkp-master/src && sed -i "s/#include \"ecmult_static_context.h\"/\/\/#include \"ecmult_static_context.h\"/g" ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/secp256k1_ecmult_static_context/NULL/g" ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/return ctx->prec != NULL;/return ctx->prec == NULL;/g" ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/secp256k1_ecmult_gen(const/secp256k1_ecmult_gen_unused(const/g" ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/#endif \/\* SECP256K1_ECMULT_GEN_IMPL_H \*\///g" ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "#include \"crypto.h\"" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "#include \"device.h\"" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "static void secp256k1_ecmult_gen(__attribute__((unused)) const secp256k1_ecmult_gen_context *ctx, secp256k1_gej *r, const secp256k1_scalar *gn) {" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    uint8_t n[SCALAR_DATA_SIZE];" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    secp256k1_scalar_get_b32(n, gn);" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    uint8_t generator[PUBLIC_KEY_PREFIX_SIZE + sizeof(GENERATOR_G)] = {UNCOMPRESSED_PUBLIC_KEY_PREFIX};" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    memcpy(&generator[PUBLIC_KEY_PREFIX_SIZE], &GENERATOR_G, sizeof(GENERATOR_G));" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    cx_ecfp_scalar_mult(CX_CURVE_SECP256K1, generator, sizeof(generator), n, sizeof(n));" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    secp256k1_fe x;" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    secp256k1_fe_set_b32(&x, &generator[PUBLIC_KEY_PREFIX_SIZE]);" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    secp256k1_fe y;" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    secp256k1_fe_set_b32(&y, &generator[PUBLIC_KEY_PREFIX_SIZE + PUBLIC_KEY_COMPONENT_SIZE]);" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    secp256k1_ge g;" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    secp256k1_ge_set_xy(&g, &x, &y);" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    secp256k1_gej_set_ge(r, &g);" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "    memset(n, 0, sizeof(n));" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "}" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src && echo "#endif /* SECP256K1_ECMULT_GEN_IMPL_H */" >> ecmult_gen_impl.h
	cd src/secp256k1-zkp-master/src/modules/bulletproofs && sed -i "s/commits == NULL) ||/commits == NULL) || 1 || /g" main_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/#error \"Please select field implementation\"/#include \"field_ledger.h\"/g" field.h
	cd src/secp256k1-zkp-master/src && sed -i "s/#error \"Please select field implementation\"/#include \"field_ledger_impl.h\"/g" field_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/#error \"Please select scalar implementation\"/#include \"scalar_ledger.h\"/g" scalar.h
	cd src/secp256k1-zkp-master/src && sed -i "s/#error \"Please select scalar implementation\"/#include \"scalar_ledger_impl.h\"/g" scalar_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/int secp256k1_scalar_is_even(/int secp256k1_scalar_is_even_unused(/g" scalar_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/a->d\[/a->data[/g" scalar_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/void secp256k1_scalar_inverse(/void secp256k1_scalar_inverse_unused(/g" scalar_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/secp256k1_scalar_get_b32(&output64\[0\]/swapEndianness((uint8_t *)\&r, sizeof(r));swapEndianness((uint8_t *)\&s, sizeof(s));secp256k1_scalar_get_b32(\&output64[0]/g" secp256k1.c
	cd src/secp256k1-zkp-master/src && sed -i "s/secp256k1_ge_from_storage(ge, &s);/swapEndianness((uint8_t *)\&s.x, sizeof(s.x));swapEndianness((uint8_t *)\&s.y, sizeof(s.y));secp256k1_ge_from_storage(ge, \&s);/g" secp256k1.c
	cd src/secp256k1-zkp-master/src && sed -i "s/secp256k1_ge_to_storage(&s, ge);/secp256k1_ge_to_storage(\&s, ge);swapEndianness((uint8_t *)\&s.x, sizeof(s.x));swapEndianness((uint8_t *)\&s.y, sizeof(s.y));/g" secp256k1.c
	cd src/secp256k1-zkp-master/src && sed -i "s/int secp256k1_fe_equal(/int secp256k1_fe_equal_unused(/g" field_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/int secp256k1_fe_equal_var(/int secp256k1_fe_equal_var_unused(/g" field_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/void secp256k1_fe_inv(/void secp256k1_fe_inv_unused(/g" field_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/int secp256k1_fe_sqrt(/int secp256k1_fe_sqrt_unused(/g" field_impl.h
	cd src/secp256k1-zkp-master && grep -rlP "memset\([^,]+, 0," | xargs sed -i -E "s/memset\(([^,]+), 0(x00)?,/explicit_bzero(\1,/g"
	rm master.zip

# Include BOLOS SDK Makefile rules
include $(BOLOS_SDK)/Makefile.rules

# Source files
dep/%.d: %.c Makefile

# List variants
listvariants:
	@echo VARIANTS CURRENCY mimblewimble_coin mimblewimble_coin_floonet grin grin_testnet
