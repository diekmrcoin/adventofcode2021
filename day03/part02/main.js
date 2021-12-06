const path = require('path');
const { Column } = require('./column');
main();

function main() {
  const bytesList = readInput();
  const bytes = fillBytes(bytesList);

  const gamma = parseInt(bytes.map(column => column.moreCommon()).join(''), 2);
  const epsilon = parseInt(bytes.map(column => column.lessCommon()).join(''), 2);
  console.log('Gamma:', gamma);
  console.log('Epsilon:', epsilon);
  console.log('Power consumption:', gamma * epsilon);

  const ogr = oxygenGeneratorRating(bytesList, bytes);
  const co2 = co2ScrubberRating(bytesList, bytes);
  console.log('Oxygen generator rating:', ogr);
  console.log('CO2 scrubber rating:', co2);
  console.log('Life support rating', ogr * co2);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}

function fillBytes(bytesList) {
  const columns = bytesList[0].length;
  const bytes = [];
  for (let i = 0; i < columns; i++) {
    bytes.push(new Column());
  }
  for (let i = 0; i < bytesList.length; i++) {
    const row = bytesList[i];
    if (!row) continue;
    for (let j = 0; j < row.length; j++) {
      bytes[j][row.charAt(j)]++;
    }
  }
  return bytes;
}

/**
 * @param {string[]} bytesList
 * @param {Column[]} bytes
 * @return {number}
 */
function oxygenGeneratorRating(bytesList, bytes) {
  let remaining = bytesList;
  for (let i = 0; i < bytes.length; i++) {
    let bytes = fillBytes(remaining);
    const moreCommon = bytes[i].moreCommon();
    remaining = remaining.filter(row => row.charAt(i) === moreCommon);
    if (remaining.length === 1) {
      return parseInt(remaining[0], 2);
    }
  }
}

/**
 * @param {string[]} bytesList
 * @param {Column[]} bytes
 * @return {number}
 */
function co2ScrubberRating(bytesList, bytes) {
  let remaining = bytesList;
  for (let i = 0; i < bytes.length; i++) {
    let bytes = fillBytes(remaining);
    const moreCommon = bytes[i].lessCommon('0');
    remaining = remaining.filter(row => row.charAt(i) === moreCommon);
    if (remaining.length === 1) {
      return parseInt(remaining[0], 2);
    }
  }
}
