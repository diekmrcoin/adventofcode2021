const { BingoNumber } = require('./bingo-number');

class BingoBoard {
  /**
   * @param {string}numbers
   */
  constructor(numbers) {
    /**
     * @type {BingoNumber[][]}
     */
    this.numbers = this.generateBoard(numbers);
  }

  /**
   * @param {string} numbers
   * @return {BingoNumber[][]}
   */
  generateBoard(numbers) {
    const rows = numbers.split('\n');
    const board = [];
    for (const row of rows) {
      const numbers = row.trim().split(/\s+/);
      board.push(numbers.map(number => new BingoNumber(number)));
    }
    return board;
  }

  /**
   * @param {string} number
   * @return {void}
   */
  markNumber(number) {
    for (const row of this.numbers) {
      for (const bingoNumber of row) {
        if (bingoNumber.value === number) {
          bingoNumber.mark();
          return;
        }
      }
    }
  }

  /**
   * @return {boolean}
   */
  checkSomeRow() {
    for (const row of this.numbers) {
      if (row.every(bingoNumber => bingoNumber.marked)) {
        return true;
      }
    }
    return false;
  }

  /**
   * @return {boolean}
   */
  checkSomeColumn() {
    for (let i = 0; i < this.numbers[0].length; i++) {
      const column = this.numbers.map(row => row[i]);
      if (column.every(bingoNumber => bingoNumber.marked)) {
        return true;
      }
    }
    return false;
  }

  /**
   * @return {number[]}
   */
  getNotMarkedNumbers() {
    const numbers = [];
    for (const row of this.numbers) {
      for (const bingoNumber of row) {
        if (!bingoNumber.marked) {
          numbers.push(+bingoNumber.value);
        }
      }
    }
    return numbers;
  }

  /**
   * @return {number}
   */
  getNotMarkedNumbersSum() {
    return this.getNotMarkedNumbers().reduce((sum, number) => sum + number, 0);
  }

  toString() {
    return this.numbers.map(row => row.map(number => number.toString()).join(' ')).join('\n');
  }
}

module.exports.BingoBoard = BingoBoard;
