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
  [872, 646, 171, 937, 383, 117],
  [212, 368, 224, 267, 426, 793],
  [938, 996, 304, 889, 874, 754],
  [983, 555, 112, 881, 13, 10],
  [560, 297, 26, 70, 488, 640],
  [695, 860, 224, 668, 715, 99],
]

const transposeMatrix = [
  [872, 212, 938, 983, 560, 695],
  [646, 368, 996, 555, 297, 860],
  [171, 224, 304, 112, 26, 224],
  [937, 267, 889, 881, 70, 668],
  [383, 426, 874, 13, 488, 715],
  [117, 793, 754, 10, 640, 99],
]

const adjointMatrix = [
  [
    -3384107025250, -6733285575205, 12555155524440, -1957471535085,
    -4843127324225, -6181566459405,
  ],
  [
    13964822585792, 10289378328066, -18132822873048, -3868327733254,
    5351978640304, 4971758960830,
  ],
  [
    -11744114834264, -30653044319497, 43368702638346, -3645643505037,
    -7286049945053, -23419674832915,
  ],
  [
    -3455699941872, 4914361047984, -8087591181082, 3277117117504, 2980780169016,
    6715170235740,
  ],
  [
    -6966133802530, -1198361019215, 4531099784510, 4672702690995,
    -2391156865905, -1691898253715,
  ],
  [
    2647292036588, 2738232210944, -6903234814302, -265332787306, 1150131854406,
    4608688723230,
  ],
]

const inverseMatrix = [
  [0.002206, 0.004389, -0.008184, 0.001276, 0.003157, 0.004029],
  [-0.009102, -0.006707, 0.011819, 0.002521, -0.003488, -0.003241],
  [0.007655, 0.01998, -0.028268, 0.002376, 0.004749, 0.015265],
  [0.002252, -0.003203, 0.005272, -0.002136, -0.001943, -0.004377],
  [0.004541, 0.000781, -0.002953, -0.003046, 0.001559, 0.001103],
  [-0.001726, -0.001785, 0.0045, 0.000173, -0.00075, -0.003004],
]

describe("Matrix 6x6", () => {
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
