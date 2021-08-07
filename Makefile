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
EMULATOR_FLAGS = --seed "slot rail north melt split chunk leisure much tennis worry boil between divert taxi twelve embrace own brave follow skate pilot change into jar"

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
	APP_LOAD_PARAMS += --appFlags 0xA00
	
	# Defines
	DEFINES += CURRENCY_ID=0 CURRENCY_BIP44_COIN_TYPE=593 CURRENCY_FRACTIONAL_DIGITS=9 CURRENCY_NAME=\"MimbleWimble\\x20\\x43oin\" CURRENCY_ABBREVIATION=\"MWC\" CURRENCY_VERSION=\"$(APPVERSION)\" CURRENCY_ICON_DETAILS=C_icon_mimblewimble_coin CURRENCY_ICON_COLORS=C_icon_mimblewimble_coin_colors CURRENCY_ICON_BITMAP=C_icon_mimblewimble_coin_bitmap

# Otherwise check if currency is Grin
else ifeq ($(CURRENCY),grin)

	# Application name
	APPNAME = "Grin"
	
	# Application parameters
	APP_LOAD_PARAMS += --path "44'/592'"
	APP_LOAD_PARAMS += --appFlags 0x200
	APP_LOAD_PARAMS += --dep "MimbleWimble Coin":$(APPVERSION)
	
	# Defines
	DEFINES += CURRENCY_ID=1 CURRENCY_BIP44_COIN_TYPE=592 CURRENCY_FRACTIONAL_DIGITS=9 CURRENCY_NAME=\"Grin\" CURRENCY_ABBREVIATION=\"GRIN\" CURRENCY_VERSION=\"$(APPVERSION)\" CURRENCY_ICON_DETAILS=C_icon_grin CURRENCY_ICON_COLORS=C_icon_grin_colors CURRENCY_ICON_BITMAP=C_icon_grin_bitmap
	
	# Defines library
	DEFINES_LIB = USE_LIB_MIMBLEWIMBLE_COIN
	
	# Emulator flags
	EMULATOR_FLAGS += --library "MimbleWimble Coin":"mimblewimble coin.elf"

# Otherwise
else

# Display error
$(error Unsupported CURRENCY - use mimblewimble_coin or grin)
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
CFLAGS += -std=gnu17 -O3 -Os -Wall -D HAVE_BOLOS_NO_DEFAULT_APDU -Wno-main
AS := $(GCCPATH)arm-none-eabi-gcc
LD := $(GCCPATH)arm-none-eabi-gcc
LDFLAGS += -O3 -Os
LDLIBS += -lm -lgcc -lc

# Compiler Secp256k1-zkp settings
CFLAGS += -D USE_NUM_NONE -D USE_FIELD_INV_BUILTIN -D USE_SCALAR_INV_BUILTIN -D USE_FIELD_10X26 -D USE_SCALAR_8X32 -D USE_ECMULT_STATIC_PRECOMPUTATION -D ENABLE_MODULE_COMMITMENT -D ENABLE_MODULE_GENERATOR -D ENABLE_MODULE_BULLETPROOF -D ENABLE_MODULE_AGGSIG -I src/secp256k1-zkp-master

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
	#SPECULOS_APPNAME=$(APPNAME):$(APPVERSION) $(BOLOS_EMU)/speculos.py bin/app.elf --model `echo $(lastword $(subst _, ,$(TARGET_NAME))) | tr A-Z a-z` --sdk $(subst $(eval) ,.,$(wordlist 1,2,$(subst ., ,$(TARGET_VERSION)))) $(EMULATOR_FLAGS)
	SPECULOS_APPNAME=$(APPNAME):$(APPVERSION) $(BOLOS_EMU)/speculos.py bin/app.elf --model `echo $(lastword $(subst _, ,$(TARGET_NAME))) | tr A-Z a-z` --sdk 1.2 $(EMULATOR_FLAGS)

# Dependencies command
dependencies:
	
	# Create Secp256k1-zkp dependency
	wget "https://github.com/mimblewimble/secp256k1-zkp/archive/master.zip"
	cd src && unzip ../master.zip
	cd src/secp256k1-zkp-master && ./autogen.sh && ./configure && make
	cd src/secp256k1-zkp-master/src && rm -r asm java bench* test* gen_context.c
	cd src/secp256k1-zkp-master/src && sed -i "s/#define WINDOW_A 5/#define WINDOW_A 2/g" ecmult_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/#define WINDOW_G 16/#define WINDOW_G 2/g" ecmult_impl.h
	cd src/secp256k1-zkp-master/src && sed -i "s/fprintf/\/\/fprintf/g" secp256k1.c
	cd src/secp256k1-zkp-master/src && sed -i "s/abort/\/\/abort/g" secp256k1.c
	cd src/secp256k1-zkp-master/src && sed -i "s/fprintf(stderr, \"%s:%d: %s\\\\n\", __FILE__, __LINE__, msg);/\/*fprintf(stderr, \"%s:%d: %s\\\\n\", __FILE__, __LINE__, msg);*\//g" util.h
	cd src/secp256k1-zkp-master/src && sed -i "s/abort();/\/*abort();*\//g" util.h	
	rm master.zip

# Include BOLOS SDK Makefile rules
include $(BOLOS_SDK)/Makefile.rules

# Source files
dep/%.d: %.c Makefile

# List variants
listvariants:
	@echo VARIANTS CURRENCY mimblewimble_coin grin
