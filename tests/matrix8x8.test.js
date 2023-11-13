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
  [17, 90, 65, 96, 96, 72, 32, 33],
  [35, 33, 51, 46, 63, 79, 56, 78],
  [68, 29, 12, 40, 78, 79, 34, 46],
  [43, 80, 29, 41, 39, 5, 6, 50],
  [53, 25, 78, 37, 80, 35, 19, 36],
  [66, 55, 64, 40, 55, 66, 3, 46],
  [45, 41, 47, 42, 10, 23, 70, 46],
  [46, 39, 49, 0, 58, 87, 49, 45],
]

const transposeMatrix = [
  [17, 35, 68, 43, 53, 66, 45, 46],
  [90, 33, 29, 80, 25, 55, 41, 39],
  [65, 51, 12, 29, 78, 64, 47, 49],
  [96, 46, 40, 41, 37, 40, 42, 0],
  [96, 63, 78, 39, 80, 55, 10, 58],
  [72, 79, 79, 5, 35, 66, 23, 87],
  [32, 56, 34, 6, 19, 3, 70, 49],
  [33, 78, 46, 50, 36, 46, 46, 45],
]

const adjointMatrix = [
  [
    2135566841298, 4249303804812, -3920984226291, 327863959665, -790978356531,
    -2667158570109, -2884116740109, 1019701310958,
  ],
  [
    -1635042481269, 3103039635207, 1326980241978, -3821900776929, 2508638774007,
    630391468260, -4578957414, -3936113629155,
  ],
  [
    -118717691244, -243549607080, 4685690070612, 2030723314557, -2785081528641,
    -2706233944461, -875945335668, -647114975460,
  ],
  [
    -1968844986639, -1344015181098, -1871738140884, 2942374813368,
    1245597862863, -2879653602024, -2242067159184, 6656531432211,
  ],
  [
    -631026342414, 568458639603, -2003330107386, -2422236537972, -4548089426976,
    6186812659740, 3206693719305, -1747132595910,
  ],
  [
    -1105026677301, -793751061327, -110369392599, 3649066756125, 4127563099449,
    -4613038683186, 695234790300, -1052692780437,
  ],
  [
    -776664692253, 1830969626580, -1123260844722, 446646347781, -873223810467,
    5387256809235, -3957805957587, -2714815479105,
  ],
  [
    3158692614363, -7959652455810, 1774428806403, -3653284752876, 499916687622,
    205180839138, 2738402228397, 2131620150924,
  ],
]

const inverseMatrix = [
  [-0.005798, -0.011537, 0.010645, -0.000890, 0.002147, 0.007241, 0.007830, -0.002768],
  [0.004439, -0.008425, -0.003603, 0.010376, -0.006811, -0.001711, 0.000012, 0.010686],
  [0.000322, 0.000661, -0.012721, -0.005513, 0.007561, 0.007347, 0.002378, 0.001757],
  [0.005345, 0.003649, 0.005082, -0.007988, -0.003382, 0.007818, 0.006087, -0.018072],
  [0.001713, -0.001543, 0.005439, 0.006576, 0.012348, -0.016797, -0.008706, 0.004743],
  [0.003000, 0.002155, 0.000300, -0.009907, -0.011206, 0.012524, -0.001888, 0.002858],
  [0.002109, -0.004971, 0.003050, -0.001213, 0.002371, -0.014626, 0.010745, 0.007371],
  [-0.008576, 0.021610, -0.004817, 0.009918, -0.001357, -0.000557, -0.007435, -0.005787],
]

describe("Matrix 8x8", () => {
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
