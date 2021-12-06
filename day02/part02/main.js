const { Point } = require('./point');
const path = require('path');
const { expect } = require('chai');

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}

function main() {
  const directions = readInput();
  const initialPoint = new Point(0, 0);
  for (const direction of directions) {
    if (!direction) continue;
    initialPoint.move(...direction.split(' '));
  }
  return initialPoint.result();
}

const result = main();
const expected = 1251263225;
expect(result).to.be.eq(expected);
console.log('Day 02, part 02:', result);
