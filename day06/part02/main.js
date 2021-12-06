const path = require('path');
const { Ocean } = require('./ocean');
const { expect } = require('chai');
const result = main();
const expected = 1681503251694;
expect(result).to.be.eq(expected);
console.log("Day 06, part 02:", result);

function main() {
  let daysToSimulate = 256;
  const input = readInput();
  // The input is only one line
  const initialLanternFish = input[0].split(',').map(Number);
  const ocean = new Ocean(initialLanternFish);
  while (daysToSimulate > 0) {
    ocean.simulate();
    daysToSimulate--;
  }
  return ocean.totalLanternFish();
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
