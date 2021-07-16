// Header files
#include <os.h>
#include "currency_information.h"
#include "settings.h"


// Constants

// Persistent storage
const struct PersistentStorage N_PERSISTENTSTORAGE[TOTAL_NUMBER_OF_SUPPORTED_CURRENCIES];

// Persistent storage version one
static const uint32_t PERSISTENT_STORAGE_VERSION_ONE = 1;

// Public keys export manual approval setting default value
static const bool PUBLIC_KEYS_EXPORT_MANUAL_APPROVAL_SETTING_DEFAULT_VALUE = true;


// Supporting function implementation

// Initialize settings
void initializeSettings(void) {

	// Check if persistent storage version is less than version one
	if(settings.persistentStorageVersionSetting < PERSISTENT_STORAGE_VERSION_ONE) {
	
		// Save public keys export manual approval setting to its default value
		nvm_write((void *)&settings.publicKeysExportManualApprovalSetting, (void *)&PUBLIC_KEYS_EXPORT_MANUAL_APPROVAL_SETTING_DEFAULT_VALUE, sizeof(PUBLIC_KEYS_EXPORT_MANUAL_APPROVAL_SETTING_DEFAULT_VALUE));
		
		// Save persistent storage version setting to version one
		nvm_write((void *)&settings.persistentStorageVersionSetting, (void *)&PERSISTENT_STORAGE_VERSION_ONE, sizeof(PERSISTENT_STORAGE_VERSION_ONE));
	}
}
