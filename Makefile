# Check if BOLOS SDK isn't defined
ifeq ($(BOLOS_SDK),)

# Display error
$(error Environment variable BOLOS_SDK is not set)
endif

# Include BOLOS SDK Makefile target
include $(BOLOS_SDK)/Makefile.target

# Application version
APPVERSION_M = 7
APPVERSION_N = 5
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
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=9
	DEFINES += CURRENCY_ENABLE_MQS_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_TOR_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_NO_RECENT_DUPLICATE_KERNELS=true
	DEFINES += CURRENCY_MQS_VERSION=\{1,69\}
	DEFINES += CURRENCY_MAXIMUM_FEE=0xFFFFFFFFFF
	DEFINES += CURRENCY_ADDRESS_DERIVATION_TYPE=MWC_ADDRESS_DERIVATION
	DEFINES += CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE=ASCII_PAYMENT_PROOF_MESSAGE
	DEFINES += CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES=\(MQS_PAYMENT_PROOF_ADDRESS\|TOR_PAYMENT_PROOF_ADDRESS\)
	DEFINES += CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES=\(MQS_SLATE_ENCRYPTION\|TOR_SLATE_ENCRYPTION\)
	DEFINES += CURRENCY_MQS_NAME=\"MQS\"
	DEFINES += CURRENCY_NAME=\"MimbleWimble\\x20\\x43oin\"
	DEFINES += CURRENCY_ABBREVIATION=\"MWC\"

	# Check if target is the Stax or Flex
	ifeq ($(TARGET_NAME),$(filter $(TARGET_NAME),TARGET_STAX TARGET_FLEX))

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_mimblewimble_coin_big

	# Otherwise
	else

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_mimblewimble_coin
	endif

	# Icon
	ICON = MimbleWimble Coin

# Otherwise check if currency is MimbleWimble Coin floonet
else ifeq ($(CURRENCY),mimblewimble_coin_floonet)

	# Application name
	APPNAME = "MimbleWimble Coin Floonet"

	# 44'/1' path on secp256k1 curve
	CURVE_APP_LOAD_PARAMS = secp256k1
	PATH_APP_LOAD_PARAMS = "44'/1'"

	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=1
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=9
	DEFINES += CURRENCY_ENABLE_MQS_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_TOR_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_NO_RECENT_DUPLICATE_KERNELS=true
	DEFINES += CURRENCY_MQS_VERSION=\{1,121\}
	DEFINES += CURRENCY_MAXIMUM_FEE=0xFFFFFFFFFF
	DEFINES += CURRENCY_ADDRESS_DERIVATION_TYPE=MWC_ADDRESS_DERIVATION
	DEFINES += CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE=ASCII_PAYMENT_PROOF_MESSAGE
	DEFINES += CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES=\(MQS_PAYMENT_PROOF_ADDRESS\|TOR_PAYMENT_PROOF_ADDRESS\)
	DEFINES += CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES=\(MQS_SLATE_ENCRYPTION\|TOR_SLATE_ENCRYPTION\)
	DEFINES += CURRENCY_MQS_NAME=\"MQS\"
	DEFINES += CURRENCY_NAME=\"MimbleWimble\\x20\\x43oin\\x20\\x46loonet\"
	DEFINES += CURRENCY_ABBREVIATION=\"Floonet\\x20MWC\"

	# Check if target is the Stax or Flex
	ifeq ($(TARGET_NAME),$(filter $(TARGET_NAME),TARGET_STAX TARGET_FLEX))

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_mimblewimble_coin_big

	# Otherwise
	else

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_mimblewimble_coin
	endif

	# Icon
	ICON = MimbleWimble Coin

# Otherwise check if currency is Grin
else ifeq ($(CURRENCY),grin)

	# Application name
	APPNAME = "Grin"

	# 44'/592' path on secp256k1 curve
	CURVE_APP_LOAD_PARAMS = secp256k1
	PATH_APP_LOAD_PARAMS = "44'/592'"

	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=592
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=9
	DEFINES += CURRENCY_ENABLE_SLATEPACK_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_NO_RECENT_DUPLICATE_KERNELS=true
	DEFINES += CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART=\"grin\"
	DEFINES += CURRENCY_MAXIMUM_FEE=0xFFFFFFFFFF
	DEFINES += CURRENCY_ADDRESS_DERIVATION_TYPE=GRIN_ADDRESS_DERIVATION
	DEFINES += CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE=BINARY_PAYMENT_PROOF_MESSAGE
	DEFINES += CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES=SLATEPACK_PAYMENT_PROOF_ADDRESS
	DEFINES += CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES=SLATEPACK_SLATE_ENCRYPTION
	DEFINES += CURRENCY_NAME=\"Grin\"
	DEFINES += CURRENCY_ABBREVIATION=\"GRIN\"

	# Check if target is the Stax or Flex
	ifeq ($(TARGET_NAME),$(filter $(TARGET_NAME),TARGET_STAX TARGET_FLEX))

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_grin_big

	# Otherwise
	else

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_grin
	endif

	# Icon
	ICON = Grin

# Otherwise check if currency is Grin testnet
else ifeq ($(CURRENCY),grin_testnet)

	# Application name
	APPNAME = "Grin Testnet"

	# 44'/1' path on secp256k1 curve
	CURVE_APP_LOAD_PARAMS = secp256k1
	PATH_APP_LOAD_PARAMS = "44'/1'"

	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=1
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=9
	DEFINES += CURRENCY_ENABLE_SLATEPACK_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_NO_RECENT_DUPLICATE_KERNELS=true
	DEFINES += CURRENCY_SLATEPACK_ADDRESS_HUMAN_READABLE_PART=\"tgrin\"
	DEFINES += CURRENCY_MAXIMUM_FEE=0xFFFFFFFFFF
	DEFINES += CURRENCY_ADDRESS_DERIVATION_TYPE=GRIN_ADDRESS_DERIVATION
	DEFINES += CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE=BINARY_PAYMENT_PROOF_MESSAGE
	DEFINES += CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES=SLATEPACK_PAYMENT_PROOF_ADDRESS
	DEFINES += CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES=SLATEPACK_SLATE_ENCRYPTION
	DEFINES += CURRENCY_NAME=\"Grin\\x20Testnet\"
	DEFINES += CURRENCY_ABBREVIATION=\"Testnet\\x20GRIN\"

	# Check if target is the Stax or Flex
	ifeq ($(TARGET_NAME),$(filter $(TARGET_NAME),TARGET_STAX TARGET_FLEX))

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_grin_big

	# Otherwise
	else

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_grin
	endif

	# Icon
	ICON = Grin

# Otherwise check if currency is Epic Cash
else ifeq ($(CURRENCY),epic_cash)

	# Application name
	APPNAME = "Epic Cash"

	# 44'/23000' path on secp256k1 curve
	CURVE_APP_LOAD_PARAMS = secp256k1
	PATH_APP_LOAD_PARAMS = "44'/23000'"

	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=23000
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=8
	DEFINES += CURRENCY_ENABLE_MQS_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_TOR_ADDRESS=true
	DEFINES += CURRENCY_MQS_VERSION=\{1,0\}
	DEFINES += CURRENCY_ADDRESS_DERIVATION_TYPE=GRIN_ADDRESS_DERIVATION
	DEFINES += CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE=BINARY_PAYMENT_PROOF_MESSAGE
	DEFINES += CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES=TOR_PAYMENT_PROOF_ADDRESS
	DEFINES += CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES=MQS_SLATE_ENCRYPTION
	DEFINES += CURRENCY_MQS_NAME=\"Epicbox\"
	DEFINES += CURRENCY_NAME=\"Epic\\x20\\x43\\x61sh\"
	DEFINES += CURRENCY_ABBREVIATION=\"EPIC\"

	# Check if target is the Stax or Flex
	ifeq ($(TARGET_NAME),$(filter $(TARGET_NAME),TARGET_STAX TARGET_FLEX))

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_epic_cash_big

	# Otherwise
	else

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_epic_cash
	endif

	# Icon
	ICON = Epic Cash

# Otherwise check if currency is Epic Cash floonet
else ifeq ($(CURRENCY),epic_cash_floonet)

	# Application name
	APPNAME = "Epic Cash Floonet"

	# 44'/1' path on secp256k1 curve
	CURVE_APP_LOAD_PARAMS = secp256k1
	PATH_APP_LOAD_PARAMS = "44'/1'"

	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=1
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=8
	DEFINES += CURRENCY_ENABLE_MQS_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_TOR_ADDRESS=true
	DEFINES += CURRENCY_MQS_VERSION=\{1,136\}
	DEFINES += CURRENCY_ADDRESS_DERIVATION_TYPE=GRIN_ADDRESS_DERIVATION
	DEFINES += CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE=BINARY_PAYMENT_PROOF_MESSAGE
	DEFINES += CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES=TOR_PAYMENT_PROOF_ADDRESS
	DEFINES += CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES=MQS_SLATE_ENCRYPTION
	DEFINES += CURRENCY_MQS_NAME=\"Epicbox\"
	DEFINES += CURRENCY_NAME=\"Epic\\x20\\x43\\x61sh\\x20\\x46loonet\"
	DEFINES += CURRENCY_ABBREVIATION=\"Floonet\\x20\\x45PIC\"

	# Check if target is the Stax or Flex
	ifeq ($(TARGET_NAME),$(filter $(TARGET_NAME),TARGET_STAX TARGET_FLEX))

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_epic_cash_big

	# Otherwise
	else

		# Defines
		DEFINES += CURRENCY_ICON_DETAILS=C_icon_epic_cash
	endif

	# Icon
	ICON = Epic Cash

# Otherwise
else

# Display error
$(error Unsupported CURRENCY - use mimblewimble_coin, mimblewimble_coin_floonet, grin, grin_testnet, epic_cash, or epic_cash_floonet)
endif

# Defines
DEFINES += HAVE_BOLOS_APP_STACK_CANARY

# Icons
ICON_NANOS = "icons/$(ICON)/nanos_app.gif"
ICON_NANOX = "icons/$(ICON)/nanox_app.gif"
ICON_NANOSP = "icons/$(ICON)/nanosplus_app.gif"
ICON_STAX = "icons/$(ICON)/stax_app.png"
ICON_FLEX = "icons/$(ICON)/flex_app.png"

# Application source files
APP_SOURCE_PATH += src
INCLUDES_PATH += $(BOLOS_SDK)/lib_cxng/src
APP_SOURCE_FILES += $(BOLOS_SDK)/lib_cxng/src/cx_ram.c $(BOLOS_SDK)/lib_cxng/src/cx_blake2b.c $(BOLOS_SDK)/lib_cxng/src/cx_hkdf.c

# Variants
VARIANT_PARAM = CURRENCY
VARIANT_VALUES = mimblewimble_coin mimblewimble_coin_floonet grin grin_testnet epic_cash epic_cash_floonet

# Enable features
ENABLE_BLUETOOTH = 1
ENABLE_NBGL_QRCODE = 1

# Check if debug isn't set
ifneq ($(DEBUG),1)

	# Enable features
	ENABLE_PENDING_REVIEW_SCREEN = 1
endif

# Check if BOLOS ENV is defined
ifneq ($(BOLOS_ENV),)

	# Set compiler paths
	CLANGPATH = $(BOLOS_ENV)/clang-arm-fropi/bin/
	GCCPATH = $(BOLOS_ENV)/gcc-arm-none-eabi-5_3-2016q1/bin/
endif

# Emulator flags
EMULATOR_FLAGS = --model `echo $(lastword $(subst _, ,$(TARGET_NAME))) | tr 2 P | tr A-Z a-z` --seed "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"

# Check if target version is defined
ifneq ($(TARGET_VERSION),)

	# SDK emulator flag
	EMULATOR_FLAGS += --sdk $(subst $(eval) ,.,$(wordlist 1,2,$(subst ., ,$(TARGET_VERSION))))
endif

# Make command
all: default

# Run command
run: all

	# Run application in emulator
	SPECULOS_APPNAME=$(APPNAME):$(APPVERSION) $(BOLOS_EMU)/speculos.py bin/app.elf $(EMULATOR_FLAGS)

# Functional tests
functional_tests: all

	# Run functional tests
	node tests/functional_tests/main.js $(CURRENCY)

# Include BOLOS SDK Makefile standard app
include $(BOLOS_SDK)/Makefile.standard_app
