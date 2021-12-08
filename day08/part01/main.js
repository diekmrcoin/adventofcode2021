const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 476;
expect(result).to.be.eq(expected);
console.log('Day 08, Part 01:', result);

function main() {
  const input = readInput().filter(row => !!row).map(row => row.split(' | '));
  let total = 0;
  for (const row of input) {
    const numbers = row[1].split(' ');
    for (const number of numbers) {
      if (validNumber(number)) total++;
    }
  }
  return total;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}

function validNumber(number) {
  const lengths = [2, 4, 3, 7];
  return lengths.some(length => number.length === length);
}
