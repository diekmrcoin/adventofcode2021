const path = require('path');
const { expect } = require('chai');
const { ChunkLine } = require('./chunk-line');
const result = main();
const expected = 311949;
expect(result).to.be.eq(expected);
console.log('Day 10, Part 01:', result);

function main() {
  const input = readInput().filter(n => !!n);
  let score = 0;
  for (const row of input) {
    const chunkLine = new ChunkLine(row);
    score += chunkLine.validate();
  }
  return score;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
