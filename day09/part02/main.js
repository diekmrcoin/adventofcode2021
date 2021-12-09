const path = require('path');
const { expect } = require('chai');
const { Point } = require('./point');
const { Basin } = require('./basin');
main().then((result) => {
  const expected = 1327014;
  expect(result).to.be.eq(expected);
  console.log('Day 09, Part 02:', result);
});

async function main() {
  const input = readInput().filter(n => !!n).map(n => n.split('').map(Number));
  /**
   * @type {Point[]}
   */
  const lowPoints = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (isMinInMatrix(x, y, input)) {
        lowPoints.push(new Point(x, y));
      }
    }
  }

  const basins = await Promise.all(lowPoints.map(async lowPoint => {
    const basin = new Basin(lowPoint, input);
    basin.getAdjacentPoints(lowPoint.x, lowPoint.y);
    basin.getSize();
    return basin;
  }));
  const ordered = basins.sort((a, b) => {
    return b.size - a.size;
  }).map(b => b.size);
  return ordered[0] * ordered[1] * ordered[2];
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
