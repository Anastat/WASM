const lowerBound = 0
const upperBound = 50
const column = 12
const row = 12

console.log(`${row} ${column}`)

for (let j = 0; j < row; j++) {
  let rowString = "["
  for (let k = 0; k < column; k++) {
    const a =
      Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound
    rowString += `${a}, `
  }
  rowString += "],"
  console.log(rowString)
}
