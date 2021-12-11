const colors = require('colors');
const path = require('path');
const { expect } = require('chai');
const { Grid } = require('./grid');
const expected = 251;
const result = main();
expect(result).to.be.eq(expected);
console.log('Day 11, Part 02:', result);

function main() {
  const input = readInput().filter(n => !!n).map(row => row.split('').map(Number));
  const grid = new Grid(input);
  return grid.runUntilSync(expected + 10, false);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
