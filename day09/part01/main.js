const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 478;
expect(result).to.be.eq(expected);
console.log('Day 09, Part 01:', result);

function main() {
  const input = readInput().filter(n => !!n).map(n => n.split('').map(Number));
  let sum = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (isMinInMatrix(x, y, input)) {
        sum += (input[y][x] + 1);
      }
    }
  }
  return sum;
}

function isMinInMatrix(x, y, matrix) {
  return matrix[y][x] < readMatrixPosition(x - 1, y, matrix) &&
    matrix[y][x] < readMatrixPosition(x + 1, y, matrix) &&
    matrix[y][x] < readMatrixPosition(x, y - 1, matrix) &&
    matrix[y][x] < readMatrixPosition(x, y + 1, matrix);
}

function readMatrixPosition(x, y, matrix) {
  return matrix[y] === undefined ? Infinity : matrix[y][x] === undefined ? Infinity : matrix[y][x];
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
