// Header guard
#ifndef DEVICE_H
#define DEVICE_H


// Header files
#include <os.h>

// Check if CX API is at least level 12
#if CX_APILEVEL >= 12

	// Header files
	#include <libcxng.h>
	#include <os_apdu.h>

// Otherwise
#else

	// OS error ranges
	#define ERR_IOL_RANGE 0x1000
	#define ERR_TSK_RANGE 0x2000
	#define ERR_CRY_RANGE 0x3000
	#define ERR_PAR_RANGE 0x4000
	#define ERR_SEC_RANGE 0x5000
	#define ERR_APD_RANGE 0x6000
	#define ERR_MUI_RANGE 0xA000

	// Application error ranges
	#define ERR_APP_RANGE_01 0xB000
	#define ERR_APP_RANGE_02 0xC000
	#define ERR_APP_RANGE_03 0xD000
	#define ERR_APP_RANGE_04 0xE000
	
	// Error subcategories
	#define ERR_GEN_SUB_01 0x0100
	#define ERR_GEN_SUB_02 0x0200
	#define ERR_GEN_SUB_03 0x0300
	#define ERR_GEN_SUB_04 0x0400
	#define ERR_GEN_SUB_05 0x0500
	#define ERR_GEN_SUB_06 0x0600
	#define ERR_GEN_SUB_07 0x0700
	#define ERR_GEN_SUB_08 0x0800
	#define ERR_GEN_SUB_09 0x0900
	#define ERR_GEN_SUB_0D 0x0D00
	#define ERR_GEN_SUB_0E 0x0E00
	
	// APDU errors
	#define ERR_APD_CLA (ERR_APD_RANGE + ERR_GEN_SUB_0E)
	#define ERR_APD_INS (ERR_APD_RANGE + ERR_GEN_SUB_0D)
	#define ERR_APD_HDR (ERR_APD_RANGE + ERR_GEN_SUB_05)
	#define ERR_APD_STA (ERR_APD_RANGE + ERR_GEN_SUB_06)
	#define ERR_APD_LEN (ERR_APD_RANGE + ERR_GEN_SUB_07)
	#define ERR_APD_DAT (ERR_APD_RANGE + ERR_GEN_SUB_08)
	
	// Success
	#define SWO_SUCCESS 0x9000
	
	// APDU offsets
	#define APDU_OFF_CLA 0
	#define APDU_OFF_INS 1
	#define APDU_OFF_P1 2
	#define APDU_OFF_P2 3
	#define APDU_OFF_LC 4
	#define APDU_OFF_DATA 5
	
	// Derive node with seed key
	#define os_perso_derive_node_with_seed_key os_perso_derive_node_bip32_seed_key
	
	// Edwards compress point
	#define cx_edwards_compress_point cx_edward_compress_point
	
	// Edwards decompress point
	#define cx_edwards_decompress_point cx_edward_decompress_point
#endif


#endif
