const path = require('path');
console.log(main());

function main() {
  const nums = readInput().filter(n => !!n).map(Number);
  let lastMeasure;
  let increase = 0;
  for (let i = 0; i < nums.length; i++) {
    const currentMeasure = nums[i] + nums[i + 1] + nums[i + 2];
    if (isNaN(currentMeasure)) break;
    if (currentMeasure > lastMeasure) increase++;
    lastMeasure = currentMeasure;
  }
  return increase;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
