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
    const [, x1, y1, x2, y2] = matches;
    if (x1 !== x2 && y1 !== y2) {
      return null;
    }

    function addAndIncrement(x1, x2, y1, y2) {
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          const coordinate = `${x},${y}`;
          if (this.coordinates[coordinate]) {
            this.coordinates[coordinate]++;
          } else {
            this.coordinates[coordinate] = 1;
          }
        }
      }
    }

    addAndIncrement.bind(this)(+x1, +x2, +y1, +y2);
    addAndIncrement.bind(this)(+x2, +x1, +y2, +y1);
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
}

module.exports.Board = Board;
