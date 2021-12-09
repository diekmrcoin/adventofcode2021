const { Point } = require('./point');

class Basin {
  /**
   * @param {Point} min
   * @param {number[][]} matrix
   */
  constructor(min, matrix) {
    /**
     * @type {{[key: string]: Point}}
     */
    this.points = {};
    this.points[min.hash()] = min;
    this.matrix = matrix;
    this.size = -1;
  }

  getAdjacentPoints(x, y) {
    if (this.matrix[y - 1] && this.matrix[y - 1][x] < 9) {
      const point = new Point(x, y - 1);
      if (!this.points[point.hash()]) {
        this.points[point.hash()] = point;
        this.getAdjacentPoints(point.x, point.y);
      }
    }
    if (this.matrix[y + 1] && this.matrix[y + 1][x] < 9) {
      const point = new Point(x, y + 1);
      if (!this.points[point.hash()]) {
        this.points[point.hash()] = point;
        this.getAdjacentPoints(point.x, point.y);
      }
    }
    if (this.matrix[y][x - 1] < 9) {
      const point = new Point(x - 1, y);
      if (!this.points[point.hash()]) {
        this.points[point.hash()] = point;
        this.getAdjacentPoints(point.x, point.y);
      }
    }
    if (this.matrix[y][x + 1] < 9) {
      const point = new Point(x + 1, y);
      if (!this.points[point.hash()]) {
        this.points[point.hash()] = point;
        this.getAdjacentPoints(point.x, point.y);
      }
    }
  }

  getSize() {
    if (this.size < 0) {
      this.size = Object.keys(this.points).length;
    }
    return this.size;
  }
}

module.exports.Basin = Basin;
