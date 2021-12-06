const path = require('path');
const { Column } = require('./column');
const { expect } = require('chai');
const result = main();
const expected = 6677951;
expect(result).to.be.eq(expected);
console.log('Day 03, part 02:', result);

function main() {
  const bytesList = readInput();
  const bytes = fillBytes(bytesList);
  const ogr = oxygenGeneratorRating(bytesList, bytes);
  const co2 = co2ScrubberRating(bytesList, bytes);
  return ogr * co2;
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
