const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 40;
expect(result).to.be.eq(expected);
console.log('Day 15, Part 01:', result);

function main() {
  const input = readInput().filter(n => !!n);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
