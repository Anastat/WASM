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
  [5, 12, 23, 56, 99, 96, 36, 80, 79, 60],
  [73, 86, 64, 12, 94, 52, 51, 41, 34, 79],
  [89, 67, 14, 87, 50, 27, 51, 14, 29, 3],
  [51, 88, 90, 64, 54, 38, 16, 0, 57, 2],
  [97, 17, 8, 22, 5, 75, 16, 89, 35, 20],
  [72, 88, 47, 46, 49, 38, 56, 25, 73, 23],
  [55, 51, 84, 1, 0, 73, 44, 75, 50, 88],
  [84, 41, 90, 29, 48, 63, 14, 42, 94, 38],
  [21, 56, 48, 88, 72, 26, 26, 58, 38, 28],
  [76, 20, 32, 49, 57, 1, 6, 76, 57, 2],
]

const transposeMatrix = [
  [5, 73, 89, 51, 97, 72, 55, 84, 21, 76],
  [12, 86, 67, 88, 17, 88, 51, 41, 56, 20],
  [23, 64, 14, 90, 8, 47, 84, 90, 48, 32],
  [56, 12, 87, 64, 22, 46, 1, 29, 88, 49],
  [99, 94, 50, 54, 5, 49, 0, 48, 72, 57],
  [96, 52, 27, 38, 75, 38, 73, 63, 26, 1],
  [36, 51, 51, 16, 16, 56, 44, 14, 26, 6],
  [80, 41, 14, 0, 89, 25, 75, 42, 58, 76],
  [79, 34, 29, 57, 35, 73, 50, 94, 38, 57],
  [60, 79, 3, 2, 20, 23, 88, 38, 28, 2],
]

const adjointMatrix = [
  [
    -7735088447954436, 4536915375802392, 7234592815087804, -9920545128577976,
    3813200036231956, -4125178527750268, -5549373080473372, 14225408682945804,
    2737959521210530, -3221078024895940,
  ],
  [
    -28747403338574144, 8821339304931991, -33234480273407610,
    -31959760841687220, 26811900368135936, 37493427566312000,
    -33745668847323284, 30293744507884212, 60533546744827570,
    -41744112624899490,
  ],
  [
    28301849298305276, -7039228915298417, 24362501124396692, 58561641465715430,
    -26894936975484190, -38035373627235830, 43934210000992440,
    -51216206329957416, -69368909344411460, 51412247568156456,
  ],
  [
    -13226415708326802, -4961706017709947, 3978962830416523, -24972898341660244,
    4858997915314048, 1879183349899762, -12028956004428228, 28938404636376910,
    38951262108069050, -24289568040891336,
  ],
  [
    15289417146602186, 7932699604873865, 6262123130100603, 20802141964993576,
    -8840661383359446, -14047554379630438, 4551837630440231, -20182606738093136,
    -27890756923924460, 21393282967958590,
  ],
  [
    13044895037575884, -1151229419450814, 4188170792755050, 21176005632718600,
    6568144101522302, -10394413038001036, 4604715094611056, -13324426173648528,
    -19157563072288364, -714725810558986,
  ],
  [
    52840176214314710, -13794628140229082, 46221964345621880, 75140671074404100,
    -43357661108447600, -35045501359801440, 67715761889960984,
    -92733678256667230, -117533766032491250, 79727872412234530,
  ],
  [
    8511308354556200, -2639638786174136, -4864531288155296, 17940949939942052,
    1010849382907896, -2869565990702244, 13758621709130098, -28841016038247150,
    -15681458460060866, 23314211439303772,
  ],
  [
    -15098568499712716, -4266553410136992, -19090494403082700,
    -37157560448971624, 7716090098954392, 32878480560413870, -23751852016554796,
    40057514979587100, 38743520049463670, -26404787265150496,
  ],
  [
    -41286889582085304, 11353889203886508, -20153539778164536,
    -80208617741930780, 18679853954004796, 27044316447381550,
    -40981930536033630, 81352385084941060, 94990450646679020,
    -66731910103441710,
  ],
]

const inverseMatrix = [
  [
    -0.006415, 0.003763, 0.006, -0.008228, 0.003163, -0.003421, -0.004602,
    0.011798, 0.002271, -0.002671,
  ],
  [
    -0.023842, 0.007316, -0.027564, -0.026507, 0.022237, 0.031096, -0.027988,
    0.025125, 0.050205, -0.034621,
  ],
  [
    0.023473, -0.005838, 0.020206, 0.048569, -0.022306, -0.031545, 0.036438,
    -0.042477, -0.057533, 0.04264,
  ],
  [
    -0.01097, -0.004115, 0.0033, -0.020712, 0.00403, 0.001559, -0.009976,
    0.024001, 0.032305, -0.020145,
  ],
  [
    0.012681, 0.006579, 0.005194, 0.017253, -0.007332, -0.011651, 0.003775,
    -0.016739, -0.023132, 0.017743,
  ],
  [
    0.010819, -0.000955, 0.003474, 0.017563, 0.005447, -0.008621, 0.003819,
    -0.011051, -0.015889, -0.000593,
  ],
  [
    0.043824, -0.011441, 0.038335, 0.06232, -0.03596, -0.029066, 0.056162,
    -0.076911, -0.097479, 0.066124,
  ],
  [
    0.007059, -0.002189, -0.004035, 0.01488, 0.000838, -0.00238, 0.011411,
    -0.02392, -0.013006, 0.019336,
  ],
  [
    -0.012522, -0.003539, -0.015833, -0.030817, 0.0064, 0.027268, -0.019699,
    0.033223, 0.032133, -0.021899,
  ],
  [
    -0.034242, 0.009417, -0.016715, -0.066523, 0.015493, 0.02243, -0.033989,
    0.067471, 0.078782, -0.055346,
  ],
]

describe("Matrix 10x10", () => {
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

    // Use toBeCloseTo as the number is big
    // and there can be small inaccuracy (-2 for a last two digits)
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        expect(result[i][j]).toBeCloseTo(adjointMatrix[i][j], -2)
      }
    }
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

    // Use toBeCloseTo as the number is big
    // and there can be small inaccuracy
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        expect(result[i][j]).toBeCloseTo(adjointMatrix[i][j])
      }
    }
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
