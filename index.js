import { performance } from "perf_hooks"
import {
  transposeJS,
  adjointJS,
  inverseJS,
} from "./src/matrixCalculation/matrixJS.js"
import {
  transposeWASM,
  adjointWASM,
  inverseWASM,
} from "./src/matrixCalculation/matrixWASM.js"
import { printIntMatrix, printFloatMatrix } from "./src/utils.js"

const inputMatrix = [
  [5, -2, 2, 7],
  [1, 0, 0, 3],
  [-3, 1, 5, 0],
  [3, -1, -9, 4],
]

// Transpose JS
const startTransposeJs = performance.now()
transposeJS(inputMatrix)
const endTransposeJs = performance.now()

console.log(
  `Execution time of matrix transpose JavaScript is: ${
    endTransposeJs - startTransposeJs
  } ms`
)

// Adjoint JS
const startAdjointJs = performance.now()
adjointJS(inputMatrix)
const endAdjointJs = performance.now()

console.log(
  `Execution time of matrix adjoint JavaScript is: ${
    endAdjointJs - startAdjointJs
  } ms`
)

// Inverse JS
const startInverseJS = performance.now()
inverseJS(inputMatrix)
const endInverseJs = performance.now()

console.log(
  `Execution time of matrix inverse JavaScript is: ${
    endInverseJs - startInverseJS
  } ms`
)

// Transpose WASM
const startTransposeWasm = performance.now()
transposeWASM(inputMatrix)
const endTransposeWasm = performance.now()

console.log(
  `Execution time of matrix transpose WASM is: ${
    endTransposeWasm - startTransposeWasm
  } ms`
)

// Adjoint WASM
const startAdjointWasm = performance.now()
adjointWASM(inputMatrix)
const endAdjointWasm = performance.now()

console.log(
  `Execution time of matrix adjoint WASM is: ${
    endAdjointWasm - startAdjointWasm
  } ms`
)

// Inverse WASM
const startInverseWasm = performance.now()
inverseWASM(inputMatrix)
const endInverseWasm = performance.now()

console.log(
  `Execution time of matrix inverse WASM is: ${
    endInverseWasm - startInverseWasm
  } ms`
)
