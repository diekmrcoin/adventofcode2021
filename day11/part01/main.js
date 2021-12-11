const colors = require('colors');
const path = require('path');
const { expect } = require('chai');
const { Grid } = require('./grid');
const result = main();
const expected = 1702;
expect(result).to.be.eq(expected);
console.log('Day 11, Part 01:', result);

function main() {
  const input = readInput().filter(n => !!n).map(row => row.split('').map(Number));
  const grid = new Grid(input);
  return grid.run(100, false);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
