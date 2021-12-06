const path = require('path');
const { BingoBoard } = require('./bingo-board');
const { expect } = require('chai');
const result = main();
const expected = 55770;
expect(result).to.be.eq(expected);
console.log("Day 04, Part 01:", result);

function main() {
  const input = readInput();
  /**
   * @type {string[]}
   */
  const randomNumbers = input.shift().trim().split(',');
  input.shift(); // empty line
  /**
   * @type {BingoBoard[]}
   */
  const boards = [];
  for (let i = 0; i < input.length; i += 6) {
    boards.push(new BingoBoard([input[i], input[i + 1], input[i + 2], input[i + 3], input[i + 4]].join('\n')));
  }

  for (const number of randomNumbers) {
    const board = checkBoards(number, boards);
    if (board)
      return board.getNotMarkedNumbersSum() * +number;
  }
}

function checkBoards(number, boards) {
  for (const board of boards) {
    board.markNumber(number);
    if (board.checkSomeRow() || board.checkSomeColumn())
      return board;
  }
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
