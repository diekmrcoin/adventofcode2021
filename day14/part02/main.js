const colors = require('colors');
const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 2158894777814;
expect(result).to.be.eq(expected);
console.log('Day 14, Part 02:', result);

function main() {
  const input = readInput();
  let template = input[0];
  /** @type {{[index: string]: string}} */
  const instructions = {};
  for (let i = 2; i < input.length; i++) {
    if (!input[i]) continue;
    const pair = input[i].split(' -> ');
    instructions[pair[0]] = pair[1];
  }

  let pairs = {};
  for (let i = 0; i < template.length - 1; i++) {
    pairs[template[i] + template[i + 1]] = (pairs[template[i] + template[i + 1]] || 0) + 1;
  }
  let steps = 40;
  while (steps > 0) {
    const newPairs = { ...pairs };
    for (const pair in pairs) {
      const c = instructions[pair];
      if (!c) continue;
      const [a, b] = pair.split('');
      const amount = pairs[pair];
      newPairs[a + c] = (newPairs[a + c] || 0) + amount;
      newPairs[c + b] = (newPairs[c + b] || 0) + amount;
      newPairs[a + b] -= amount;
      if (newPairs[a + b] === 0) delete newPairs[a + b];
    }
    pairs = newPairs;
    steps--;
  }
  const letters = countLetters(pairs, template);
  // the letters are duplicated due to pairs increment logic
  return (maxRepetitions(letters) - minRepetitions(letters)) / 2;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}

/**
 * @param {{[index: string]: number}} pairs
 * @param {string} template
 * @returns {{[index: string]: number}}
 */
function countLetters(pairs, template) {
  /** @type {{[index: string]: number}} */
  const letters = {};
  letters[template[0]] = 1;
  letters[template[template.length - 1]] = 1;
  for (const pair in pairs) {
    const [a, b] = pair.split('');
    letters[a] = (letters[a] || 0) + pairs[pair];
    letters[b] = (letters[b] || 0) + pairs[pair];
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
