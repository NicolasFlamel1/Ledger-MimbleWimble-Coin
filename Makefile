# Check if BOLOS SDK isn't defined
ifeq ($(BOLOS_SDK),)

# Display error
$(error Environment variable BOLOS_SDK is not set)
endif

# Include BOLOS SDK Makefile target
include $(BOLOS_SDK)/Makefile.target

# Application version
APPVERSION_M = 7
APPVERSION_N = 6
APPVERSION_P = 0
APPVERSION = "$(APPVERSION_M).$(APPVERSION_N).$(APPVERSION_P)"

# Check if currency isn't defined
ifndef CURRENCY

	# Set currency to MimbleWimble Coin
	CURRENCY = mimblewimble_coin
endif

# Check if currency is MimbleWimble Coin
ifeq ($(CURRENCY),mimblewimble_coin)

	# Application name
	APPNAME = "MimbleWimble Coin"

	# 44'/593' path on secp256k1 curve
	CURVE_APP_LOAD_PARAMS = secp256k1
	PATH_APP_LOAD_PARAMS = "44'/593'"

	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=593
	DEFINES += CURRENCY_MQS_VERSION=\{1,69\}
	DEFINES += CURRENCY_NAME=\"MimbleWimble\\x20\\x43oin\"
	DEFINES += CURRENCY_ABBREVIATION=\"MWC\"

# Otherwise check if currency is MimbleWimble Coin floonet
else ifeq ($(CURRENCY),mimblewimble_coin_floonet)

	# Application name
	APPNAME = "MimbleWimble Coin Floonet"

	# 44'/1' path on secp256k1 curve
	CURVE_APP_LOAD_PARAMS = secp256k1
	PATH_APP_LOAD_PARAMS = "44'/1'"

	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=1
	DEFINES += CURRENCY_MQS_VERSION=\{1,121\}
	DEFINES += CURRENCY_NAME=\"MimbleWimble\\x20\\x43oin\\x20\\x46loonet\"
	DEFINES += CURRENCY_ABBREVIATION=\"Floonet\\x20MWC\"

# Otherwise
else

# Display error
$(error Unsupported CURRENCY - use mimblewimble_coin or mimblewimble_coin_floonet)
endif

# Defines
DEFINES += HAVE_BOLOS_APP_STACK_CANARY

# Check if target is the Stax or Flex
ifeq ($(TARGET_NAME),$(filter $(TARGET_NAME),TARGET_STAX TARGET_FLEX))

	# Defines
	DEFINES += CURRENCY_ICON_DETAILS=C_icon_mimblewimble_coin_big

# Otherwise check if target is the Nano Gen5
else ifeq ($(TARGET_NAME),$(filter $(TARGET_NAME),TARGET_APEX_P))

	# Defines
	DEFINES += CURRENCY_ICON_DETAILS=C_icon_mimblewimble_coin_big_monochrome

# Otherwise
else

	# Defines
	DEFINES += CURRENCY_ICON_DETAILS=C_icon_mimblewimble_coin
endif

# Icons
ICON_NANOS = "icons/nanos_app.gif"
ICON_NANOX = "icons/nanox_app.gif"
ICON_NANOSP = "icons/nanosplus_app.gif"
ICON_STAX = "icons/stax_app.png"
ICON_FLEX = "icons/flex_app.png"
ICON_APEX_P = "icons/nanogen5_app.png"

# Application source files
APP_SOURCE_PATH += src
INCLUDES_PATH += $(BOLOS_SDK)/lib_cxng/src
APP_SOURCE_FILES += $(BOLOS_SDK)/lib_cxng/src/cx_ram.c $(BOLOS_SDK)/lib_cxng/src/cx_blake2b.c

# Check if target isn't the Nano S (The Nano S SDK doesn't include support for ChaCha20 Poly1305)
ifneq ($(TARGET_NAME),TARGET_NANOS)

	# Application source files
	APP_SOURCE_FILES += $(BOLOS_SDK)/lib_cxng/src/cx_chacha.c $(BOLOS_SDK)/lib_cxng/src/cx_poly1305.c $(BOLOS_SDK)/lib_cxng/src/cx_chacha_poly.c
	DEFINES += HAVE_CHACHA HAVE_POLY1305 HAVE_CHACHA_POLY
endif

# Variants
VARIANT_PARAM = CURRENCY
VARIANT_VALUES = mimblewimble_coin mimblewimble_coin_floonet

# Enable features
ENABLE_BLUETOOTH = 1
ENABLE_NBGL_QRCODE = 1

# Make command
all: default

# Run command
run: all

	# Run application in emulator
	$(BOLOS_EMU)/speculos.py bin/app.elf --seed "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"

# Functional tests
functional_tests: all

	# Run functional tests
	node tests/functional_tests/main.js $(CURRENCY)

# Include BOLOS SDK Makefile standard app
include $(BOLOS_SDK)/Makefile.standard_app
