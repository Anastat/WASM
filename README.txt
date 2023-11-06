Compile C++ code to WebAssembly using Esncripten in `src` folder:

em++ -s EXPORT_ES6=1 -s EXPORTED_FUNCTIONS="['_free', '_malloc', '_adjointCPP', '_inverseCPP']" -s ALLOW_MEMORY_GROWTH=1 -s EXPORT_ALL=1 -o matrix_wasm.js matrix.cpp  

run `node index.js` in the root folder to see the function runtime result in the console
