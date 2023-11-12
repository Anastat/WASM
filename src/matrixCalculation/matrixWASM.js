import WasmModule from "./wasmOutput/output_wasm.js"

const Module = await WasmModule()

/**
 * Helper function to convert the Int32Array or Float32Array
 * to a 2D array
 *
 * @param {Int32Array, Float32Array} array 1D array
 * @param {number} numRows number of rows
 * @param {number} numCols number of columns
 *
 * @returns {Array} matrix (2D array)
 */
const convertArrayToMatrix = (array, numRows, numCols) => {
  const matrix = []
  for (let i = 0; i < numRows; i++) {
    matrix.push(
      Array.from(array.subarray(i * numCols, (i + 1) * numCols), Number)
    )
  }
  return matrix
}

export const transposeWASM = (inputMatrix) => {
  const numRows = inputMatrix.length
  const numCols = inputMatrix[0].length

  // Flatten the matrix into a 1D array
  const flattenedMatrix = new Int32Array(numRows * numCols)
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      flattenedMatrix[i * numCols + j] = inputMatrix[i][j]
    }
  }

  // Allocate memory for the input and result matrix in the WASM module
  const inputMatrixPtr = Module._malloc(flattenedMatrix.length * 4)
  const resultMatrixPtr = Module._malloc(flattenedMatrix.length * 4)

  // Copy the flattened matrix data to the allocated memory
  Module.HEAP32.set(flattenedMatrix, inputMatrixPtr / 4)

  // Call the transposeCPP function
  Module.ccall(
    "transposeCPP",
    "void",
    ["number", "number", "number", "number"],
    [inputMatrixPtr, numRows, numCols, resultMatrixPtr]
  )

  // Extract the result as a 1D array
  const resultArray = Module.HEAP32.subarray(
    resultMatrixPtr / 4,
    resultMatrixPtr / 4 + numRows * numCols
  )

  // Free memory
  Module._free(inputMatrixPtr)
  Module._free(resultMatrixPtr)

  return convertArrayToMatrix(resultArray, numRows, numCols)
}

export const adjointWASM = (inputMatrix) => {
  const numRows = inputMatrix.length
  const numCols = inputMatrix[0].length

  // Flatten the matrix into a 1D array
  const flattenedMatrix = new Int32Array(numRows * numCols)
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      flattenedMatrix[i * numCols + j] = inputMatrix[i][j]
    }
  }

  // Allocate memory for the input and result matrix in the WASM module
  const inputMatrixPtr = Module._malloc(flattenedMatrix.length * 4)
  const resultMatrixPtr = Module._malloc(flattenedMatrix.length * 8)

  // Copy the flattened matrix data to the allocated memory
  Module.HEAP32.set(flattenedMatrix, inputMatrixPtr / 4)

  // Call the adjointCPP function
  Module.ccall(
    "adjointCPP",
    "void",
    ["number", "number", "number"],
    [inputMatrixPtr, numRows, resultMatrixPtr]
  )

  // Assume resultMatrixPtr points to the result array in Wasm memory
  const resultArray = new BigInt64Array(
    Module.HEAPU8.buffer,
    resultMatrixPtr,
    numRows * numCols
  )

  // Free memory
  Module._free(inputMatrixPtr)
  Module._free(resultMatrixPtr)

  return convertArrayToMatrix(resultArray, numRows, numCols)
}

export const inverseWASM = (inputMatrix) => {
  const numRows = inputMatrix.length
  const numCols = inputMatrix[0].length

  // Flatten the matrix into a 1D array
  const flattenedMatrix = new Int32Array(numRows * numCols)
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      flattenedMatrix[i * numCols + j] = inputMatrix[i][j]
    }
  }

  // Allocate memory for the input and result matrix in the WASM module
  const inputMatrixPtr = Module._malloc(flattenedMatrix.length * 4)
  const resultMatrixPtr = Module._malloc(flattenedMatrix.length * 4)

  // Copy the flattened matrix data to the allocated memory
  Module.HEAP32.set(flattenedMatrix, inputMatrixPtr / 4)

  // Call the adjointCPP function
  Module.ccall(
    "inverseCPP",
    "void",
    ["number", "number", "number"], // additional parameter for the result matrix
    [inputMatrixPtr, numRows, resultMatrixPtr]
  )

  // Extract the result as a 1D array
  const resultArray = Module.HEAPF32.subarray(
    resultMatrixPtr / 4,
    resultMatrixPtr / 4 + numRows * numCols
  )

  // Free memory
  Module._free(inputMatrixPtr)
  Module._free(resultMatrixPtr)

  return convertArrayToMatrix(resultArray, numRows, numCols)
}
