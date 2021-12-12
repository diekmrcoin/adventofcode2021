const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 0;
expect(result).to.be.eq(expected);
console.log('Day 12, Part 02:', result);

function main() {
  const input = readInput().filter(n => !!n);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
