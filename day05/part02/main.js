const path = require('path');
const { Board } = require('./board');
const { expect } = require('chai');
const result = main();
const expected = 20196;
expect(result).to.be.eq(expected);
console.log("Day 05, Part 02:", result);

function main() {
  const overlapLimit = 2;
  const board = new Board(overlapLimit);
  const input = readInput();
  for (let i = 0; i < input.length - 1; i++) {
    board.addRange(input[i]);
  }
  return board.sumOverlapping();
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
