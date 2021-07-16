// Header guard
#ifndef SETTINGS_H
#define SETTINGS_H


// Header files
#include <stdbool.h>


// Definitions

// Settings
#define settings (*(volatile struct PersistentStorage *)PIC(&N_PERSISTENTSTORAGE[currencyInformation.id]))

// Save setting
#define saveSetting nvm_write


// Structures

// Persistent storage
struct PersistentStorage {

	// Persistent storage version setting
	uint32_t persistentStorageVersionSetting;

	// Public keys export manual approval setting
	bool publicKeysExportManualApprovalSetting;
};


// Constants

// Persistent storage
extern const struct PersistentStorage N_PERSISTENTSTORAGE[TOTAL_NUMBER_OF_SUPPORTED_CURRENCIES];


// Function prototypes

// Initialize settings
void initializeSettings(void);


#endif
