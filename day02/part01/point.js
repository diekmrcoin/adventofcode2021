class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {string} direction
   * @param {string} distance
   */
  move(direction, distance) {
    switch (direction) {
      case 'forward':
        this.x += +distance;
        break;
      case 'up':
        this.y -= +distance;
        break;
      case 'down':
        this.y += +distance;
        break;
      default:
        throw new Error(`Unknown direction: ${direction}`);
    }
  }

  result() {
    return this.x * this.y;
  }
}

module.exports.Point = Point;
