// Header files
#include "blake2b.h"
#include "common.h"

// Supporting function implementation

// Get BLAKE2b
void getBlake2b(volatile uint8_t *output, const size_t outputLength, const uint8_t *input, const size_t inputLength, const uint8_t *key, const size_t keyLength) {

	// Initialize state
	volatile blake2b_state state;

	// Begin try
	BEGIN_TRY {

		// Try
		TRY {

			// Check if key is provided
			if(key) {

				// Check if initializing the state with the key failed
				if(blake2b_init_key((blake2b_state *)&state, outputLength, key, keyLength)) {

					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}
			}

			// Otherwise
			else {

				// Check if initializing the state failed
				if(blake2b_init((blake2b_state *)&state, outputLength, NULL, 0, NULL, 0)) {

					// Throw internal error error
					THROW(INTERNAL_ERROR_ERROR);
				}
			}

			// Update state with the input
			blake2b_update((blake2b_state *)&state, input, inputLength);

			// Check if getting the hash from the state failed
			if(blake2b_final((blake2b_state *)&state, (uint8_t *)output, outputLength) != (ssize_t)outputLength) {

				// Throw internal error error
				THROW(INTERNAL_ERROR_ERROR);
			}
		}

		// Finally
		FINALLY {

			// Clear the state
			explicit_bzero((blake2b_state *)&state, sizeof(state));
		}
	}

	// End try
	END_TRY;
}
