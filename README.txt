Compile C++ code to WebAssembly using Esncripten in `src/matrixCalculation` folder:

em++ -s EXPORT_ES6=1 -s EXPORTED_FUNCTIONS="['_malloc','_free']"  -s EXPORTED_RUNTIME_METHODS="['ccall']" -o wasmOutput/output_wasm.js matrix.cpp  

run `npm run test` in the root folder to see the function runtime result in the console
