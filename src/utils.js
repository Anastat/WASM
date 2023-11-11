
export const printIntMatrix = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join(" "))
  }
}

export const printFloatMatrix = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].map((value) => value.toFixed(4)).join(" "))
  }
}