// Header files
#include <setjmp.h>
#include <stdarg.h>
#include <stddef.h>
#include <cmocka.h>
#include "chacha20_poly1305.h"


// Function prototypes

// Test encrypt
static void testEncrypt(void **state);

// Test decrypt
static void testDecrypt(void **state);


// Main function
int main(void) {

	// Initialize tests
	const struct CMUnitTest tests[] = {
	
		// Test encrypt
		cmocka_unit_test(testEncrypt),
		
		// Test decrypt
		cmocka_unit_test(testDecrypt),
	};
	
	// Return performing tests
	return cmocka_run_group_tests(tests, NULL, NULL);
}


// Supporting function implementation

// Test encrypt
void testEncrypt(void **state) {

	// TODO
}

// Test decrypt
void testDecrypt(void **state) {

	// TODO
}
