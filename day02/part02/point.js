class Point {
  constructor(x, y, aim = 0) {
    this.x = x;
    this.y = y;
    this.aim = aim;
  }

  /**
   * @param {string} direction
   * @param {string} distance
   */
  move(direction, distance) {
    switch (direction) {
      case 'forward':
        this.x += +distance;
        this.y += this.aim * +distance;
        break;
      case 'up':
        this.aim -= +distance;
        break;
      case 'down':
        this.aim += +distance;
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
