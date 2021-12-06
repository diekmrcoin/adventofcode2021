const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 372984;
expect(result).to.be.eq(expected);
console.log("Day 06, Part 01:", result);

function main() {
  let daysToSimulate = 80;
  const input = readInput();
  // The input is only one line
  let lanternFish = input[0].split(',').map(Number);
  while (daysToSimulate > 0) {
    let newLanternFish = [];
    lanternFish = lanternFish.map(days => {
      days--;
      if (days < 0) {
        newLanternFish.push(8);
        return 6;
      }
      return days;
    });
    lanternFish = lanternFish.concat(newLanternFish);
    daysToSimulate--;
  }
  return lanternFish.length;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
