const path = require('path');
console.log('Part 1:', main());

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
