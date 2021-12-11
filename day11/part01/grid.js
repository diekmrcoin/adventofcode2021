class Grid {
  constructor(input) {
    /**
     * @type {number[][]}
     */
    this.board = input;
    /**
     * @type {{[index: string]: boolean}}
     */
    this.currentCycleFlashes = {};

    /**
     * @type {{[index: string]: number}}
     */
    this.totalCycleFlashes = {};
  }

  /**
   * @param {number} cycles
   * @param {boolean} printCycle
   * @return {number}
   */
  run(cycles, printCycle = false) {
    let count = 0;
    while (count < cycles) {
      this.resetCycleFlashes();
      for (let y = 0; y < this.board.length; y++) {
        for (let x = 0; x < this.board[y].length; x++) {
          this.checkAndFlash(x, y);
        }
      }
      if (printCycle) {
        this.print();
      }
      count++;
    }
    // reduce total cycle flashes
    return Object.values(this.totalCycleFlashes).reduce((acc, cur) => acc + cur, 0);
  }

  checkAndFlash(x, y) {
    const index = `${x},${y}`;
    if (this.currentCycleFlashes[index]) {
      return;
    }
    this.incPoint(x, y);
    if (this.getPoint(x, y) > 9) {
      this.currentCycleFlashes[index] = true;
      this.totalCycleFlashes[index] = (this.totalCycleFlashes[index] || 0) + 1;
      this.resetPoint(x, y);
      this.checkAndFlash(x - 1, y);
      this.checkAndFlash(x + 1, y);
      this.checkAndFlash(x, y - 1);
      this.checkAndFlash(x, y + 1);
      this.checkAndFlash(x - 1, y - 1);
      this.checkAndFlash(x + 1, y + 1);
      this.checkAndFlash(x - 1, y + 1);
      this.checkAndFlash(x + 1, y - 1);
    }
  }

  getPoint(x, y) {
    if (this.board[y] && this.board[y][x]) {
      return this.board[y][x];
    }
    return 0;
  }

  incPoint(x, y) {
    if (this.board[y] !== undefined && this.board[y][x] !== undefined) {
      this.board[y][x]++;
    }
  }

  resetPoint(x, y) {
    if (this.board[y] !== undefined && this.board[y][x] !== undefined) {
      this.board[y][x] = 0;
    }
  }

  resetCycleFlashes() {
    this.currentCycleFlashes = {};
  }

  print() {
    for (let i = 0; i < this.board.length; i++) {
      const row = [];
      for (let j = 0; j < this.board[i].length; j++) {
        const value = this.board[i][j];
        row.push(value ? value : value.toString().red);
      }
      console.log(row.join(''));
    }
    console.log('---'.green);
  }
}

module.exports.Grid = Grid;
