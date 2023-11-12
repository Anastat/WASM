import { performance } from "perf_hooks"
import {
  transposeJS,
  adjointJS,
  inverseJS,
} from "../src/matrixCalculation/matrixJS.js"
import {
  transposeWASM,
  adjointWASM,
  inverseWASM,
} from "../src/matrixCalculation/matrixWASM.js"

const inputMatrix = [
  [5, -2, 2, 7],
  [1, 0, 0, 3],
  [-3, 1, 5, 0],
  [3, -1, -9, 4],
]

const transposeMatrix = [
  [5, 1, -3, 3],
  [-2, 0, 1, -1],
  [2, 0, 5, -9],
  [7, 3, 0, 4],
]

const adjointMatrix = [
  [-12, 76, -60, -36],
  [-56, 208, -82, -58],
  [4, 4, -2, -10],
  [4, 4, 20, 12],
]

const inverseMatrix = [
  [-0.136363, 0.863636, -0.681818, -0.40909],
  [-0.636363, 2.363636, -0.931818, -0.65909],
  [0.0454545, 0.0454545, -0.0227273, -0.113636],
  [0.0454545, 0.0454545, 0.227273, 0.136364],
]

describe("Matrix 4x4", () => {
  test("transpose JavaScript", () => {
    const startTransposeJs = performance.now()
    const result = transposeJS(inputMatrix)
    const endTransposeJs = performance.now()

    console.log(
      `Execution time of matrix transpose JavaScript is: ${
        endTransposeJs - startTransposeJs
      } ms`
    )

    expect(result).toEqual(transposeMatrix)
  })

  test("transpose WASM", () => {
    const startTransposeWasm = performance.now()
    const result = transposeWASM(inputMatrix)
    const endTransposeWasm = performance.now()

    console.log(
      `Execution time of matrix transpose WASM is: ${
        endTransposeWasm - startTransposeWasm
      } ms`
    )

    expect(result).toEqual(transposeMatrix)
  })

  test("adjoint JavaScript", () => {
    const startAdjointJs = performance.now()
    const result = adjointJS(inputMatrix)
    const endAdjointJs = performance.now()

    console.log(
      `Execution time of matrix adjoint JavaScript is: ${
        endAdjointJs - startAdjointJs
      } ms`
    )

    expect(result).toEqual(adjointMatrix)
  })

  test("adjoint WASM", () => {
    const startAdjointWasm = performance.now()
    const result = adjointWASM(inputMatrix)
    const endAdjointWasm = performance.now()

    console.log(
      `Execution time of matrix adjoint WASM is: ${
        endAdjointWasm - startAdjointWasm
      } ms`
    )

    expect(result).toEqual(adjointMatrix)
  })

  test("inverse JavaScript", () => {
    const startInverseJS = performance.now()
    const result = inverseJS(inputMatrix)
    const endInverseJs = performance.now()

    console.log(
      `Execution time of matrix inverse JavaScript is: ${
        endInverseJs - startInverseJS
      } ms`
    )

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        expect(result[i][j]).toBeCloseTo(inverseMatrix[i][j])
      }
    }
  })

  test("inverse WASM", () => {
    const startInverseWasm = performance.now()
    const result = inverseWASM(inputMatrix)
    const endInverseWasm = performance.now()

    console.log(
      `Execution time of matrix inverse WASM is: ${
        endInverseWasm - startInverseWasm
      } ms`
    )

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        expect(result[i][j]).toBeCloseTo(inverseMatrix[i][j])
      }
    }
  })
})
