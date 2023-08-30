// Header files
#include <os_io_seproxyhal.h>
#include <ux.h>
#include "device.h"


// Global variables

// SPI buffer
unsigned char G_io_seproxyhal_spi_buffer[IO_SEPROXYHAL_BUFFER_SIZE_B];

// UX
ux_state_t G_ux;

// UX parameters
bolos_ux_params_t G_ux_params;


// Supporting function implementation

// Check if has BAGL
#ifdef HAVE_BAGL

// HAL display
void io_seproxyhal_display(const bagl_element_t *element) {

	// HAL default display
	io_seproxyhal_display_default(element);
}

#endif

// IO exchange
unsigned short io_exchange_al(const unsigned char channel, const unsigned short length) {

	// Check channel
	switch(channel & ~IO_FLAGS) {

		// Keybard
		case CHANNEL_KEYBOARD:

			// Break
			break;

		// SPI
		case CHANNEL_SPI:

			// Check if length exists
			if(length) {

				// Send message
				io_seproxyhal_spi_send(G_io_apdu_buffer, length);

				// Check if resetting after reply
				if(channel & IO_RESET_AFTER_REPLIED) {

					// Reset
					reset();
				}
			}

			// Otherwise
			else {

				// Return receiving message
				return io_seproxyhal_spi_recv(G_io_apdu_buffer, sizeof(G_io_apdu_buffer), 0);
			}

			// Break
			break;

		// Default
		default:

			// Throw invalid parameter error
			THROW(INVALID_PARAMETER);

			// Break
			break;
	}

	// Return zero
	return 0;
}

// IO event
unsigned char io_event(__attribute__((unused)) const unsigned char channel) {

	// Check event
	switch(G_io_seproxyhal_spi_buffer[0]) {

		// Finger event
		case SEPROXYHAL_TAG_FINGER_EVENT:

			// UX finder event
			UX_FINGER_EVENT(G_io_seproxyhal_spi_buffer);

			// Break
			break;

		// Button push event
		case SEPROXYHAL_TAG_BUTTON_PUSH_EVENT:

// Check if has BAGL
#ifdef HAVE_BAGL

			// UX button push event
			UX_BUTTON_PUSH_EVENT(G_io_seproxyhal_spi_buffer);
#endif

			// Break
			break;

		// Status event
		case SEPROXYHAL_TAG_STATUS_EVENT:

			// Check if event's media is USB, but USB power is not detected
			if(G_io_apdu_media == IO_APDU_MEDIA_USB_HID && !(U4BE(G_io_seproxyhal_spi_buffer, 3) & SEPROXYHAL_TAG_STATUS_EVENT_FLAG_USB_POWERED)) {

				// Throw IO reset error
				THROW(EXCEPTION_IO_RESET);
			}

			// Fall through
			__attribute__((fallthrough));

		// Display processed event
		case SEPROXYHAL_TAG_DISPLAY_PROCESSED_EVENT:

// Check if has BAGL
#ifdef HAVE_BAGL

			// UX displayed event
			UX_DISPLAYED_EVENT({});

// Otherwise check if has NBGL
#elif defined HAVE_NBGL

			// UX default event
			UX_DEFAULT_EVENT();
#endif

			// Break
			break;

		// Ticker event
		case SEPROXYHAL_TAG_TICKER_EVENT:

			// UX ticker event
			UX_TICKER_EVENT(G_io_seproxyhal_spi_buffer, {});

			// Break
			break;

		// Default
		default:

			// UX default event
			UX_DEFAULT_EVENT();

			// Break
			break;
	}

	// Check if event isn't closed
	if(!io_seproxyhal_spi_is_status_sent()) {

		// Close the event
		io_seproxyhal_general_status();
	}

	// Return that event was processed
	return 1;
}
