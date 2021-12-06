const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 1616;
expect(result).to.be.eq(expected);
console.log("Day 01, Part 01:", result);

function main() {
  const nums = readInput().map(Number);
  let lastMeasure;
  let increase = 0;
  for (const num of nums) {
    if (num > lastMeasure) increase++;
    lastMeasure = num;
  }
  return increase;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
