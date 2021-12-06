const path = require('path');
const { Column } = require('./column');
const { expect } = require('chai');
const result = main();
const expected = 2743844;
expect(result).to.be.eq(expected);
console.log('Day 03, Part 01:', result);

function main() {
  const bitesList = readInput();
  const columns = bitesList[0].length;
  const bytes = [];
  for (let i = 0; i < columns; i++) {
    bytes.push(new Column());
  }
  for (let i = 0; i < bitesList.length; i++) {
    const row = bitesList[i];
    for (let j = 0; j < row.length; j++) {
      bytes[j][row.charAt(j)]++;
    }
  }
  const gamma = parseInt(bytes.map(column => column.moreCommon()).join(''), 2);
  const epsilon = parseInt(bytes.map(column => column.lessCommon()).join(''), 2);
  return gamma * epsilon;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
