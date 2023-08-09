// Header files
#include <stdlib.h>
#include "currency_information.h"

// Check if not using MimbleWimble Coin library
#ifndef USE_LIB_MIMBLEWIMBLE_COIN

	// Header files
	#include <os_io_seproxyhal.h>
	#include <string.h>
	#include "common.h"
	#include "menus.h"
	#include "process_requests.h"
	#include "state.h"
	
	
	// Function prototypes
	
	// Run application
	static void runApplication(void);
	
	
	// Main function
	__attribute__((section(".boot"))) int main(int parameters) {
	
		// Enable interrupts
		__asm volatile("cpsie i");
		
		// Check if parameters are provided
		if(parameters) {
		
			// Get currency information from parameters
			memcpy(&currencyInformation, *(unsigned int **)parameters, sizeof(currencyInformation));
		}
		
		// Otherwise
		else {
		
			// Get currency information
			getCurrencyInformation(&currencyInformation);
		}
		
		// Loop forever
		while(true) {
		
			// Reset state
			resetState();
			
			// Clear menu buffers
			clearMenuBuffers();
		
			// Initialize UX
			UX_INIT();
			
			// Boot OS
			os_boot();
			
			// Begin try
			BEGIN_TRY {
			
				// Try
				TRY {
				
					// Initialize HAL
					io_seproxyhal_init();
					
					// Check if target has Bluetooth
					#ifdef HAVE_BLE
					
						// Set plane mode
						G_io_app.plane_mode = os_setting_get(OS_SETTING_PLANEMODE, NULL, 0);
					#endif
					
					// Restart USB
					USB_power(0);
					USB_power(1);
					
					// Show main menu
					showMainMenu();
					
					// Check if target has Bluetooth
					#ifdef HAVE_BLE
					
						// Restart Bluetooth
						BLE_power(0, NULL);
						BLE_power(1, "Nano X");
					#endif
					
					// Run application
					runApplication();
				}
				
				// Catch IO reset error
				CATCH(EXCEPTION_IO_RESET) {
					
					// Continue
					continue;
				}
				
				// Catch all errors
				CATCH_ALL {
					
					// Break
					break;
				}
				
				// Finally
				FINALLY {
				
				}
			}
			
			// End try
			END_TRY;
		}
		
		// Exit application
		exitApplication();
		
		// Return success
		return EXIT_SUCCESS;
	}
	
	
	// Supporting function implementation
	
	// Run application
	void runApplication(void) {
	
		// Initialize request length
		volatile unsigned short requestLength = 0;
		
		// Initialize response length
		volatile unsigned short responseLength = 0;
		
		// Initialize response flags
		volatile unsigned char responseFlags = 0;
		
		// Loop forever
		while(true) {
		
			// Begin try
			BEGIN_TRY {
			
				// Try
				TRY {
				
					// Update request length
					requestLength = responseLength;
					
					// Reset response length
					responseLength = 0;
					
					// Check if response's length is too big
					if(requestLength >= sizeof(G_io_apdu_buffer)) {
					
						// Throw length error
						THROW(LENGTH_ERROR);
					}
					
					// Get request and/or send response
					requestLength = io_exchange(CHANNEL_APDU | responseFlags, requestLength);
					
					// Reset response flags
					responseFlags = 0;

					// Check if no request was received
					if(!requestLength) {
					
						// Throw IO reset error
						THROW(EXCEPTION_IO_RESET);
					}
					
					// Check if request's length is too big
					if(requestLength >= sizeof(G_io_apdu_buffer)) {
					
						// Throw length error
						THROW(LENGTH_ERROR);
					}
					
					// Check if pin is not validated
					if(os_global_pin_is_validated() != BOLOS_UX_OK) {
					
						// Throw device locked error
						THROW(DEVICE_LOCKED_ERROR);
					}
					
					// Process request
					processRequest(requestLength, &responseLength, &responseFlags);
				}
				
				// Catch IO reset error
				CATCH(EXCEPTION_IO_RESET) {
				
					// Throw IO reset error
					THROW(EXCEPTION_IO_RESET);
				}
				
				// Catch other errors
				CATCH_OTHER(error) {
				
					// Check error type
					switch(error & ERROR_TYPE_MASK) {
					
						// Lower application errors
						case ERR_APP_RANGE_01:
						case ERR_APP_RANGE_02:
						
							// Reset state
							resetState();
						
						// Higher application errors or success
						case ERR_APP_RANGE_03:
						case ERR_APP_RANGE_04:
						case SWO_SUCCESS:
						
							// Clear menu buffers
							clearMenuBuffers();
						
							// Check if response with the error will overflow
							if(willResponseOverflow(responseLength, sizeof(uint16_t))) {
							
								// Throw length error
								THROW(LENGTH_ERROR);
							}
							
							// Otherwise
							else {
						
								// Append error to response
								U2BE_ENCODE(G_io_apdu_buffer, responseLength, error);
							
								responseLength += sizeof(uint16_t);
								
								// Break
								break;
							}
						
						// Default
						default:
						
							// Throw error
							THROW(error);
					}
				}
				
				// Finally
				FINALLY {
				
				}
			}
			
			// End try
			END_TRY;
		}
	}

// Otherwise
#else

	// Header files
	#include <os.h>
	

	// Constants
	
	// Library name
	static const char LIBRARY_NAME[] = "MimbleWimble Coin";


	// Main function
	__attribute__((section(".boot"))) int main() {

		// Begin try
		BEGIN_TRY {
		
			// Try
			TRY {
			
				// Get current currency information
				struct CurrencyInformation currentCurrencyInformation;
				getCurrencyInformation(&currentCurrencyInformation);
				
				// Initialize library parameters
				unsigned int libraryParameters[] ={
				
					// Library name
					(unsigned int)LIBRARY_NAME,
					
					// Current currency information
					(unsigned int)&currentCurrencyInformation
				};
				
				// Call library with library parameters
				os_lib_call(libraryParameters);
			}
			
			// Catch all errors
			CATCH_ALL {
			
			}
			
			// Finally
			FINALLY {
			
			}
		}
		
		// End try
		END_TRY;
	
		// Begin try
		BEGIN_TRY_L(exit) {
		
			// Try
			TRY_L(exit) {
			
				// Exit OS
				os_sched_exit(-1);
			}
			
			// Finally
			FINALLY_L(exit) {
			
			}
		}
		
		// End try
		END_TRY_L(exit);
		
		// Return success
		return EXIT_SUCCESS;
	}
#endif
