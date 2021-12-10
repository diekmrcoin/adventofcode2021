const path = require('path');
const { expect } = require('chai');
const { ChunkLine } = require('./chunk-line');
const result = main();
const expected = 3042730309;
expect(result).to.be.eq(expected);
console.log('Day 10, Part 02:', result);

function main() {
  const input = readInput().filter(n => !!n);
  let scores = [];
  for (const row of input) {
    const chunkLine = new ChunkLine(row);
    const missingCharScore = chunkLine.validate();
    if (missingCharScore || !chunkLine.opened.length) continue;
    const score = chunkLine.opened
      .reverse()
      .reduce((acc, c) => (acc * 5) + chunkLine.badOpeningScore(c), 0);
    scores.push(score);
  }
  return middleScore(scores);
}

/**
 * Calculates the middle score
 * @param {number[]} scores
 * @return {number}
 */
function middleScore(scores) {
  scores.sort((a, b) => a - b);
  const middle = Math.floor(scores.length / 2);
  return scores[middle];
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
