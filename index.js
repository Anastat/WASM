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

const inputMatrix = [
  [872, 646, 171, 937, 383, 117],
  [212, 368, 224, 267, 426, 793],
  [938, 996, 304, 889, 874, 754],
  [983, 555, 112, 881, 13, 10],
  [560, 297, 26, 70, 488, 640],
  [695, 860, 224, 668, 715, 99],
]

// Run all function without time for clear result
transposeJS(inputMatrix)
transposeWASM(inputMatrix)
adjointJS(inputMatrix)
adjointWASM(inputMatrix)
inverseJS(inputMatrix)
inverseWASM(inputMatrix)

// Transpose JS
const startTransposeJs = performance.now()
transposeJS(inputMatrix)
const endTransposeJs = performance.now()

console.log(
  `Execution time of matrix transpose JavaScript is: ${
    endTransposeJs - startTransposeJs
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

// Adjoint JS
const startAdjointJs = performance.now()
adjointJS(inputMatrix)
const endAdjointJs = performance.now()

console.log(
  `Execution time of matrix adjoint JavaScript is: ${
    endAdjointJs - startAdjointJs
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

// Inverse JS
const startInverseJS = performance.now()
inverseJS(inputMatrix)
const endInverseJs = performance.now()

console.log(
  `Execution time of matrix inverse JavaScript is: ${
    endInverseJs - startInverseJS
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
