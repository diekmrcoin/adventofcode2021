const path = require('path');
const { Board } = require('./board');
console.log('Amount of 2 lines overlap:', main());

function main() {
  const overlapLimit = 2;
  const input = readInput();
  const board = new Board(overlapLimit);
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
