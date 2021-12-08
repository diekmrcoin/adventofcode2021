const path = require('path');
const { expect } = require('chai');
const { CodifiedLine } = require('./codified-line');
const result = main();
const expected = 1011823;
expect(result).to.be.eq(expected);
console.log('Day 08, Part 02:', result);

function main() {
  const input = readInput().filter(row => !!row).map(row => row.split(' | '));
  let total = 0;
  for (const row of input) {
    const codifiedLine = new CodifiedLine();
    codifiedLine.setSignal(row[0].split(' '));
    let number = '';
    for (const word of row[1].split(' ')) {
      number += codifiedLine.getNumber(word);
    }
    total += Number(number);
  }
  return total;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
