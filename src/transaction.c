// Header files
#include <string.h>
#include "transaction.h"


// Global variables

// Transaction
struct Transaction transaction;


// Supporting function implementation

// Reset transaction
void resetTransaction(void) {

	// Clear the transaction
	explicit_bzero(&transaction, sizeof(transaction));
}
