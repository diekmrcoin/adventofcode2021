class Board {
  constructor(overlapLimit) {
    /**
     * @type {{[key: string]: number}}
     */
    this.coordinates = {};
    this.overlapLimit = overlapLimit;
  }

  /**
   * @param {string} range
   * @return {void}
   */
  addRange(range) {
    const regex = /(\d+),(\d+) -> (\d+),(\d+)/;
    const matches = regex.exec(range);
    const [, x1, y1, x2, y2] = matches.map(Number);
    let x = x1;
    let y = y1;
    // There is no input that's not horizontal, vertical or 45º diagonal
    do {
      this.incrementCoordinate(x, y);
      if (x2 > x1)
        x += 1;
      else if (x2 < x1)
        x -= 1;
      if (y2 > y1)
        y += 1;
      else if (y2 < y1)
        y -= 1;
    } while (x !== x2 || y !== y2);
    this.incrementCoordinate(x, y);
  }

  sumOverlapping() {
    return Object.keys(this.coordinates).reduce((sum, coordinate) => {
      const value = this.coordinates[coordinate];
      if (value >= this.overlapLimit) {
        sum++;
      }
      return sum;
    }, 0);
  }

  incrementCoordinate(x, y) {
    const coordinate = `${x},${y}`;
    if (this.coordinates[coordinate]) {
      this.coordinates[coordinate]++;
    } else {
      this.coordinates[coordinate] = 1;
    }
  }
}

module.exports.Board = Board;
