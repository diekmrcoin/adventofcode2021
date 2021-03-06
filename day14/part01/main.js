const colors = require('colors');
const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 2068;
expect(result).to.be.eq(expected);
console.log('Day 14, Part 01:', result);

function main() {
  const input = readInput();
  let template = input[0].split('');
  /** @type {{[index: string]: string}} */
  const pairs = {};
  for (let i = 2; i < input.length; i++) {
    if (!input[i]) continue;
    const pair = input[i].split(' -> ');
    pairs[pair[0]] = pair[1];
  }
  let steps = 10;
  while (steps > 0) {
    const base = template;
    template = [];
    for (let i = 0; i < base.length - 1; i++) {
      const insertion = pairs[base[i] + base[i + 1]];
      template.push(base[i]);
      template.push(insertion);
    }
    template.push(base[base.length - 1]);
    steps--;
  }
  const letters = countLetters(template);
  return maxRepetitions(letters) - minRepetitions(letters);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}

/**
 * @param {string[]} template
 * @returns {{[index: string]: number}}
 */
function countLetters(template) {
  const letters = {};
  for (let i = 0; i < template.length; i++) {
    if (!letters[template[i]]) letters[template[i]] = 0;
    letters[template[i]]++;
  }
  return letters;
}

/**
 * @param {{[index: string]: number}} letters
 * @returns {number}
 */
function maxRepetitions(letters) {
  let max = 0;
  let letter = '';
  for (const key in letters) {
    if (letters[key] > max) {
      max = letters[key];
      letter = key;
    }
  }
  return max;
}

/**
 * @param {{[index: string]: number}} letters
 * @returns {number}
 */
function minRepetitions(letters) {
  let min = Number.MAX_SAFE_INTEGER;
  let letter = '';
  for (const key in letters) {
    if (letters[key] < min) {
      min = letters[key];
      letter = key;
    }
  }
  return min;
}
