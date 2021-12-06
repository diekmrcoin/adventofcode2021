const path = require('path');
const { Ocean } = require('./ocean');
console.log('Part 2:', main());

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
