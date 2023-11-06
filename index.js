import { performance } from "perf_hooks"
import {
  adjointJS,
  inverseJS,
  printIntMatrix,
  printFloatMatrix,
} from "./src/matrix.js"
import WasmModule from "./src/matrix_wasm.js"

let Module = await WasmModule()

const inputMatrix = [
  [5, -2, 2, 7],
  [1, 0, 0, 3],
  [-3, 1, 5, 0],
  [3, -1, -9, 4],
]

// Adjoint JS
const startAdjointJs = performance.now()
printIntMatrix(adjointJS(inputMatrix))
const endAdjointJs = performance.now()

console.log(`Execution time: ${endAdjointJs - startAdjointJs} ms`)

// Inverse JS
const startInverseJS = performance.now()
printFloatMatrix(inverseJS(inputMatrix))
const endInverseJs = performance.now()

console.log(`Execution time: ${endInverseJs - startInverseJS} ms`)

// Measure WASM
const startAdjointCPP = performance.now()

const numRows = inputMatrix.length
const numCols = inputMatrix[0].length

const flattenedMatrix = new Float32Array(numRows * numCols)
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    flattenedMatrix[i * numCols + j] = inputMatrix[i][j]
  }
}

const inputMatrixPtr = Module._malloc(
  flattenedMatrix.length * flattenedMatrix.BYTES_PER_ELEMENT
)

Module.HEAPF32.set(flattenedMatrix, inputMatrixPtr >> 2)

const adjointMatrixPtr = Module._adjointCPP(inputMatrixPtr, numRows)

// Extract the result as a 1D array
const adjointArray = Module.HEAPF32.subarray(
  adjointMatrixPtr >> 2,
  adjointMatrixPtr >> (2 + numRows * numRows)
)

// Free memory
Module._free(inputMatrixPtr)
Module._free(adjointMatrixPtr)

const endAdjointCPP = performance.now()

console.log(`Execution time: ${endAdjointCPP - startAdjointCPP} ms`)
