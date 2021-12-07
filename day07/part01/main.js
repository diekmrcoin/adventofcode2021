const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 349769;
expect(result).to.be.eq(expected);
console.log('Day 07, Part 01:', result);

function main() {
  const nums = readInput().filter(line => line.length > 0)[0].split(',').map(Number);
  const repeatedNums = {};
  for (const num of nums) {
    repeatedNums[num] = (repeatedNums[num] || 0) + 1;
  }

  let minFuelCost;
  for (const num in repeatedNums) {
    const accumulated = nums.reduce((acc, cur) => {
      return acc + (Math.abs(cur - num));
    }, 0);
    if (!minFuelCost || accumulated < minFuelCost) {
      minFuelCost = accumulated;
    }
  }

  return minFuelCost;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
