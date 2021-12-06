console.log(main());

function main() {
  const nums = readInput().map(Number);
  let lastMeasure;
  let increase = 0;
  for (const num of nums) {
    if (lastMeasure === undefined) {
      lastMeasure = num;
      continue;
    }
    if (num > lastMeasure) {
      increase++;
    }
    lastMeasure = num;
  }
  return increase;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync('input.txt', 'utf8').split('\n');
}
