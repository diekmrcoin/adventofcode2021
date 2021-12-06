const path = require('path');
const { Column } = require('./column');
console.log('Power consumption:', main());

function main() {
  const bitesList = readInput();
  const columns = bitesList[0].length;
  const bytes = [];
  for (let i = 0; i < columns; i++) {
    bytes.push(new Column());
  }
  for (let i = 0; i < bitesList.length; i++) {
    const row = bitesList[i];
    for (let j = 0; j < row.length; j++) {
      bytes[j][row.charAt(j)]++;
    }
  }
  const gamma = parseInt(bytes.map(column => column.moreCommon()).join(""), 2);
  const epsilon = parseInt(bytes.map(column => column.lessCommon()).join(""), 2);
  console.log("Gamma:", gamma);
  console.log("Epsilon:", epsilon);
  return gamma * epsilon;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
