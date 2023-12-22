# Check if BOLOS SDK isn't defined
ifeq ($(BOLOS_SDK),)

# Display error
$(error Environment variable BOLOS_SDK is not set)
endif

# Include BOLOS SDK Makefile defines
include $(BOLOS_SDK)/Makefile.defines

# Application parameters
APP_LOAD_PARAMS += $(COMMON_LOAD_PARAMS)

# Application version
APPVERSION_M = 7
APPVERSION_N = 4
APPVERSION_P = 0
APPVERSION = "$(APPVERSION_M).$(APPVERSION_N).$(APPVERSION_P)"

# Emulator flags
EMULATOR_FLAGS = --model `echo $(lastword $(subst _, ,$(TARGET_NAME))) | tr 2 P | tr A-Z a-z` --seed "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"

# Check if target version is defined
ifneq ($(TARGET_VERSION),)

	# SDK emulator flag
	EMULATOR_FLAGS += --sdk $(subst $(eval) ,.,$(wordlist 1,2,$(subst ., ,$(TARGET_VERSION))))
endif

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
	APP_LOAD_PARAMS += --curve secp256k1 --path "44'/593'"

	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=593
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=9
	DEFINES += CURRENCY_ENABLE_MQS_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_TOR_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_NO_RECENT_DUPLICATE_KERNELS=true
	DEFINES += CURRENCY_MQS_VERSION=\{1,69\}
	DEFINES += CURRENCY_ADDRESS_DERIVATION_TYPE=MWC_ADDRESS_DERIVATION
	DEFINES += CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE=ASCII_PAYMENT_PROOF_MESSAGE
	DEFINES += CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES=\(MQS_PAYMENT_PROOF_ADDRESS\|TOR_PAYMENT_PROOF_ADDRESS\)
	DEFINES += CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES=\(MQS_SLATE_ENCRYPTION\|TOR_SLATE_ENCRYPTION\)
	DEFINES += CURRENCY_MQS_NAME=\"MQS\"
	DEFINES += CURRENCY_NAME=\"MimbleWimble\\x20\\x43oin\"
	DEFINES += CURRENCY_ABBREVIATION=\"MWC\"
	
	# Check if target is the Stax
	ifeq ($(TARGET_NAME),TARGET_STAX)
	
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
	APP_LOAD_PARAMS += --curve secp256k1 --path "44'/1'"

	# Defines
	DEFINES += CURRENCY_BIP44_COIN_TYPE=1
	DEFINES += CURRENCY_FRACTIONAL_DIGITS=9
	DEFINES += CURRENCY_ENABLE_MQS_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_TOR_ADDRESS=true
	DEFINES += CURRENCY_ENABLE_NO_RECENT_DUPLICATE_KERNELS=true
	DEFINES += CURRENCY_MQS_VERSION=\{1,121\}
	DEFINES += CURRENCY_ADDRESS_DERIVATION_TYPE=MWC_ADDRESS_DERIVATION
	DEFINES += CURRENCY_PAYMENT_PROOF_MESSAGE_TYPE=ASCII_PAYMENT_PROOF_MESSAGE
	DEFINES += CURRENCY_SUPPORTED_PAYMENT_PROOF_ADDRESS_TYPES=\(MQS_PAYMENT_PROOF_ADDRESS\|TOR_PAYMENT_PROOF_ADDRESS\)
	DEFINES += CURRENCY_SUPPORTED_SLATE_ENCRYPTION_TYPES=\(MQS_SLATE_ENCRYPTION\|TOR_SLATE_ENCRYPTION\)
	DEFINES += CURRENCY_MQS_NAME=\"MQS\"
	DEFINES += CURRENCY_NAME=\"MimbleWimble\\x20\\x43oin\\x20\\x46loonet\"
	DEFINES += CURRENCY_ABBREVIATION=\"Floonet\\x20MWC\"
	
	# Check if target is the Stax
	ifeq ($(TARGET_NAME),TARGET_STAX)
	
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
	APP_LOAD_PARAMS += --curve secp256k1 --path "44'/592'"

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
	
	# Check if target is the Stax
	ifeq ($(TARGET_NAME),TARGET_STAX)
	
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
	APP_LOAD_PARAMS += --curve secp256k1 --path "44'/1'"

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
	
	# Check if target is the Stax
	ifeq ($(TARGET_NAME),TARGET_STAX)
	
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
	APP_LOAD_PARAMS += --curve secp256k1 --path "44'/23000'"

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
	
	# Check if target is the Stax
	ifeq ($(TARGET_NAME),TARGET_STAX)
	
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
	APP_LOAD_PARAMS += --curve secp256k1 --path "44'/1'"

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
	
	# Check if target is the Stax
	ifeq ($(TARGET_NAME),TARGET_STAX)
	
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

# Check if target is the Nano X
ifeq ($(TARGET_NAME),TARGET_NANOX)

	# APPLICATION_FLAG_BOLOS_SETTINGS application flags for Bluetooth
	APP_LOAD_PARAMS += --appFlags 0x200

# Otherwise check if target is the Stax
else ifeq ($(TARGET_NAME),TARGET_STAX)

	# APPLICATION_FLAG_BOLOS_SETTINGS application flags for Bluetooth
	APP_LOAD_PARAMS += --appFlags 0x200

# Otherwise
else

	# No application flags
	APP_LOAD_PARAMS += --appFlags 0x000
endif

# Check if target is the Nano S
ifeq ($(TARGET_NAME),TARGET_NANOS)

	# Icon name
	ICONNAME="icons/$(ICON)/nanos_app.gif"

# Otherwise check if target is the Nano X
else ifeq ($(TARGET_NAME),TARGET_NANOX)

	# Icon name
	ICONNAME="icons/$(ICON)/nanox_app.gif"

# Otherwise check if target is the Nano S Plus
else ifeq ($(TARGET_NAME),TARGET_NANOS2)

	# Icon name
	ICONNAME="icons/$(ICON)/nanosplus_app.gif"

# Otherwise check if target is the Stax
else ifeq ($(TARGET_NAME),TARGET_STAX)

	# Icon name
	ICONNAME="icons/$(ICON)/stax_app.gif"
endif

# Make command
all: default

# Defines
DEFINES += APPVERSION=\"$(APPVERSION)\"
DEFINES += MAJOR_VERSION=$(APPVERSION_M) MINOR_VERSION=$(APPVERSION_N) PATCH_VERSION=$(APPVERSION_P)
DEFINES += OS_IO_SEPROXYHAL
DEFINES += HAVE_SPRINTF
DEFINES += HAVE_IO_USB HAVE_L4_USBLIB IO_USB_MAX_ENDPOINTS=6 IO_HID_EP_LENGTH=64 HAVE_USB_APDU
DEFINES += USB_SEGMENT_SIZE=64
DEFINES += BLE_SEGMENT_SIZE=32
DEFINES += HAVE_WEBUSB WEBUSB_URL_SIZE_B=0 WEBUSB_URL=""

# Check if target is the Nano X
ifeq ($(TARGET_NAME),TARGET_NANOX)

	# Target specific defines
	DEFINES += HAVE_BLE BLE_COMMAND_TIMEOUT_MS=2000 HAVE_BLE_APDU

# Otherwise check if target is the Stax
else ifeq ($(TARGET_NAME),TARGET_STAX)

	# Target specific defines
	DEFINES += HAVE_BLE BLE_COMMAND_TIMEOUT_MS=2000 HAVE_BLE_APDU
endif

# Check if target is the Nano S
ifeq ($(TARGET_NAME),TARGET_NANOS)

	# Target specific defines
	DEFINES += IO_SEPROXYHAL_BUFFER_SIZE_B=128

# Otherwise
else

	# Target specific defines
	DEFINES += IO_SEPROXYHAL_BUFFER_SIZE_B=300
endif

# Check if target is the Stax
ifeq ($(TARGET_NAME),TARGET_STAX)

	# Target specific defines
	DEFINES += NBGL_QRCODE
	SDK_SOURCE_PATH += qrcode

# Otherwise
else

	# Target specific defines
	DEFINES += HAVE_BAGL HAVE_UX_FLOW
	
	# Check if target isn't the nano S
	ifneq ($(TARGET_NAME),TARGET_NANOS)
	
		# Target specific defines
		DEFINES += HAVE_GLO096
		DEFINES += BAGL_WIDTH=128 BAGL_HEIGHT=64
		DEFINES += HAVE_BAGL_ELLIPSIS
		DEFINES += HAVE_BAGL_FONT_OPEN_SANS_REGULAR_11PX
		DEFINES += HAVE_BAGL_FONT_OPEN_SANS_EXTRABOLD_11PX
		DEFINES += HAVE_BAGL_FONT_OPEN_SANS_LIGHT_16PX
	endif
endif

# Set debug
DEBUG = 0

# Check if debug is set
ifneq ($(DEBUG),0)

	# Define printf
	DEFINES += HAVE_PRINTF

	# Check if target is the Nano S
	ifeq ($(TARGET_NAME),TARGET_NANOS)

		# Define target specific printf
		DEFINES += PRINTF=screen_printf

	# Otherwise
	else

		# Define target specific printf
		DEFINES += PRINTF=mcu_usb_printf
	endif

# Otherwise
else

	# Define printf as nothing
	DEFINES += PRINTF\(...\)=
	
	# Add security review banner. To be removed once Ledger security review is done.
	APP_LOAD_PARAMS += --tlvraw 9F:01
	DEFINES += HAVE_PENDING_REVIEW_SCREEN
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
CFLAGS += -Oz -Wall -Wextra
AS := $(GCCPATH)arm-none-eabi-gcc
LD := $(GCCPATH)arm-none-eabi-gcc
LDFLAGS +=
LDLIBS += -lgcc -lc

# Include BOLOS SDK Makefile glyphs
include $(BOLOS_SDK)/Makefile.glyphs

# Compiler settings
APP_SOURCE_PATH += src
SDK_SOURCE_PATH += lib_stusb lib_stusb_impl

# Check if target isn't the Stax
ifneq ($(TARGET_NAME),TARGET_STAX)

	# Target specific compiler settings
	SDK_SOURCE_PATH += lib_ux
endif

# Check if target is the Nano X
ifeq ($(TARGET_NAME),TARGET_NANOX)

	# Target specific compiler settings
	SDK_SOURCE_PATH += lib_blewbxx lib_blewbxx_impl

# Otherwise check if target is the Stax
else ifeq ($(TARGET_NAME),TARGET_STAX)

	# Target specific compiler settings
	SDK_SOURCE_PATH += lib_blewbxx lib_blewbxx_impl
endif

# Load command
load: all

	# Load application on device
	python3 -m ledgerblue.loadApp $(APP_LOAD_PARAMS)

# Delete command
delete:

	# Delete application from device
	python3 -m ledgerblue.deleteApp $(COMMON_DELETE_PARAMS)

# Run command
run: all

	# Run application in emulator
	SPECULOS_APPNAME=$(APPNAME):$(APPVERSION) $(BOLOS_EMU)/speculos.py bin/app.elf $(EMULATOR_FLAGS)

# Functional tests
functional_tests: all

	# Run functional tests
	node tests/functional_tests/main.js $(CURRENCY)

# Include BOLOS SDK Makefile rules
include $(BOLOS_SDK)/Makefile.rules

# Source files
dep/%.d: %.c Makefile

# List variants
listvariants:
	@echo VARIANTS CURRENCY mimblewimble_coin mimblewimble_coin_floonet grin grin_testnet epic_cash epic_cash_floonet
