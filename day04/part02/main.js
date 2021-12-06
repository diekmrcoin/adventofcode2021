const path = require('path');
const { BingoBoard } = require('./bingo-board');
console.log('Score:', main());

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

  const winners = [];
  for (const number of randomNumbers) {
    checkBoards(number, boards, winners);
    if (winners.length === boards.length)
      return winners[winners.length - 1].getNotMarkedNumbersSum() * number;
  }
}

function checkBoards(number, boards, winners) {
  for (const board of boards) {
    if (board.winner) continue;
    board.markNumber(number);
    if (board.checkSomeRow() || board.checkSomeColumn()) {
      board.winner = true;
      winners.push(board);
    }
  }
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
