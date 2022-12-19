/*
This file can create the ../../src/generators.c file by running the following commands:
wget https://github.com/mimblewimble/secp256k1-zkp/archive/refs/heads/master.zip
unzip master.zip
rm master.zip
cd secp256k1-zkp-master
./autogen.sh
./configure --disable-shared --with-bignum=no --with-field=32bit --with-scalar=32bit
make
sed -i "s/static const size_t SECP256K1_ECMULT_CONTEXT_PREALLOCATED_SIZE;/\/\/static const size_t SECP256K1_ECMULT_CONTEXT_PREALLOCATED_SIZE;/" src/ecmult.h
cd ..
g++ -D USE_NUM_NONE -D USE_FIELD_10X26 -D USE_SCALAR_8X32 -D USE_FIELD_INV_BUILTIN -D USE_SCALAR_INV_BUILTIN main.cpp -I secp256k1-zkp-master/include/ -I secp256k1-zkp-master/src/ -L secp256k1-zkp-master/.libs/ -l secp256k1
./a.out
*/

// Header files
#include <cstring>
#include <fstream>
#include <iomanip>
#include <iostream>
#include "secp256k1_bulletproofs.h"
#include "group_impl.h"
#include "scratch_impl.h"
#include "ecmult_const_impl.h"
#include "field_impl.h"
#include "scalar_impl.h"

using namespace std;


// Structures

// Secp256k1 bulletproof generators
struct secp256k1_bulletproof_generators {

	// Number of generators
	size_t numberOfGenerators;
	
	// Generators
	secp256k1_ge *generators;
	
	// Blinding generator
	secp256k1_ge *blindingGenerator;
};


// Constants

// Number of generators
static const size_t NUMBER_OF_GENERATORS = 256;

// Component size
static const size_t COMPONENT_SIZE = 32;

// File location
static const char FILE_LOCATION[] = "../../src/generators.c";

// Hexadecimal character size
static const size_t HEXADECIMAL_CHARACTER_SIZE = sizeof("FF") - sizeof('\0');

// Hexadecimal padding character
static const char HEXADECIMAL_PADDING_CHARACTER = '0';

// Bits in a byte
static const uint8_t BITS_IN_A_BYTE = 8;

// Bits to prove
static const uint8_t BITS_TO_PROVE = sizeof(uint64_t) * BITS_IN_A_BYTE;

// Window bits
static const uint8_t WINDOW_BITS = 1;


// Main function
int main() {

	// Create context
	secp256k1_context *context = secp256k1_context_create(SECP256K1_CONTEXT_NONE);

	// Create generators
	secp256k1_bulletproof_generators *generators = secp256k1_bulletproof_generators_create(context, &secp256k1_generator_const_g, NUMBER_OF_GENERATORS);
	
	// Create file
	ofstream file(FILE_LOCATION, ofstream::binary);
	
	// Write start of file to file
	file << "// Header files" << endl;
	file << "#include \"common.h\"" << endl;
	file << "#include \"generators.h\"" << endl;
	file << endl;
	file << endl;
	file << "// Constants" << endl;
	file << endl;
	
	// Write start of generators first half to file
	file << "// Generators first half" << endl;
	file << "const uint8_t GENERATORS_FIRST_HALF[BITS_TO_PROVE * WINDOW_BITS][GENERATOR_SIZE] = {" << endl;
	
	// Go through bits to prove
	for(uint8_t i = 0; i < BITS_TO_PROVE; ++i) {
	
		// Get generator from first half
		const secp256k1_ge &generator = generators->generators[i];
		
		// Go through bits in the window
		for(uint8_t j = 0; j < WINDOW_BITS; ++j) {
		
			// Get odd power based on the bit
			secp256k1_scalar oddPower;
			secp256k1_scalar_set_int(&oddPower, 2 * j + 1);
			
			// Multiply generator by the odd power
			secp256k1_gej generatorToPower;
			secp256k1_ecmult_const(&generatorToPower, &generator, &oddPower, 256);
			
			// Get result in affine coordinates
			secp256k1_ge generatorToPowerAffine;
			secp256k1_ge_set_gej(&generatorToPowerAffine, &generatorToPower);
			
			// Get result in affine coordinates's components
			uint8_t components[2 * COMPONENT_SIZE];
			secp256k1_fe_get_b32(components, &generatorToPowerAffine.x);
			secp256k1_fe_get_b32(&components[COMPONENT_SIZE], &generatorToPowerAffine.y);
			
			// Write start of generator to file
			file << "\t{";
			
			// Go through bytes in the components
			for(size_t k = 0; k < sizeof(components); ++k) {
			
				// Write byte to file
				file << "0x" << hex << uppercase << setfill(HEXADECIMAL_PADDING_CHARACTER) << setw(HEXADECIMAL_CHARACTER_SIZE) << right << static_cast<uint16_t>(components[k]) << ((k != sizeof(components) - 1) ? ", " : "");
			}
			
			// Write end of generator to file
			file << '}' << ((i != BITS_TO_PROVE - 1 || j != WINDOW_BITS - 1) ? "," : "") << endl;
		}
	}
	
	// Write end of generators first half to file
	file << "};" << endl;
	file << endl;
	
	// Write start of generators second half to file
	file << "// Generators second half" << endl;
	file << "const uint8_t GENERATORS_SECOND_HALF[BITS_TO_PROVE * WINDOW_BITS][GENERATOR_SIZE] = {" << endl;
	
	// Go through bits to prove
	for(uint8_t i = 0; i < BITS_TO_PROVE; ++i) {
	
		// Get generator from second half
		const secp256k1_ge &generator = generators->generators[i + generators->numberOfGenerators / 2];
		
		// Go through bits in the window
		for(uint8_t j = 0; j < WINDOW_BITS; ++j) {
		
			// Get odd power based on the bit
			secp256k1_scalar oddPower;
			secp256k1_scalar_set_int(&oddPower, 2 * j + 1);
			
			// Multiply generator by the odd power
			secp256k1_gej generatorToPower;
			secp256k1_ecmult_const(&generatorToPower, &generator, &oddPower, 256);
			
			// Get result in affine coordinates
			secp256k1_ge generatorToPowerAffine;
			secp256k1_ge_set_gej(&generatorToPowerAffine, &generatorToPower);
			
			// Get result in affine coordinates's components
			uint8_t components[2 * COMPONENT_SIZE];
			secp256k1_fe_get_b32(components, &generatorToPowerAffine.x);
			secp256k1_fe_get_b32(&components[COMPONENT_SIZE], &generatorToPowerAffine.y);
			
			// Write start of generator to file
			file << "\t{";
			
			// Go through bytes in the components
			for(size_t k = 0; k < sizeof(components); ++k) {
			
				// Write byte to file
				file << "0x" << hex << uppercase << setfill(HEXADECIMAL_PADDING_CHARACTER) << setw(HEXADECIMAL_CHARACTER_SIZE) << right << static_cast<uint16_t>(components[k]) << ((k != sizeof(components) - 1) ? ", " : "");
			}
			
			// Write end of generator to file
			file << '}' << ((i != BITS_TO_PROVE - 1 || j != WINDOW_BITS - 1) ? "," : "") << endl;
		}
	}
	
	// Write end of generators second half to file
	file << "};" << endl;
	
	// Display message
	cout << "Created " << FILE_LOCATION << endl;
	
	// Destroy generators
	secp256k1_bulletproof_generators_destroy(context, generators);
	
	// Destroy context
	secp256k1_context_destroy(context);
	
	// Return success
	return EXIT_SUCCESS;
}
