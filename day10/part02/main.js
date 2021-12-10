const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 0;
expect(result).to.be.eq(expected);
console.log('Day 10, Part 02:', result);

function main() {
  const input = readInput().filter(n => !!n).map(Number);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}