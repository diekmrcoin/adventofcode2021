const { Point } = require('./point');
const path = require('path');
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

console.log("Part 2:", main());
