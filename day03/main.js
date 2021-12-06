const path = require('path');
console.log(main());

function main() {
  const nums = readInput().map(Number);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
