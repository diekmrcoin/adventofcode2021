const colors = require('colors');
const path = require('path');
const { expect } = require('chai');
const { Node } = require('./node');
const fs = require('fs');
const result = main();
const expected = 2068;
expect(result).to.be.eq(expected);
console.log('Day 14, Part 02:', result);

function main() {
  const input = readInput();
  let template = input[0];
  /** @type {{[index: string]: string}} */
  const pairs = {};
  for (let i = 2; i < input.length; i++) {
    if (!input[i]) continue;
    const pair = input[i].split(' -> ');
    pairs[pair[0]] = pair[1];
  }
  const linked = linkedList(template);
  let steps = 10;
  while (steps > 0) {
    let current = linked;
    while (current) {
      let next = current.next;
      if (!next) break;
      const newNode = new Node(pairs[current.value + next.value], next);
      current.next = newNode;
      current = next;
    }
    // printLinkedList(linked);
    steps--;
  }
  printLinkedList(linked);
  const letters = countLetters(linked);
  return maxRepetitions(letters) - minRepetitions(letters);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}

/**
 * @param {string} template
 * @returns {Node}
 */
function linkedList(template) {
  const root = new Node(template[0]);
  let current = root;
  for (let i = 1; i < template.length; i++) {
    current.next = new Node(template[i]);
    current = current.next;
  }
  return root;
}

/**
 * @param {Node} root
 */
function printLinkedList(root) {
  const text = [];
  let current = root;
  while (current) {
    text.push(current.value);
    current = current.next;
  }
  fs.writeFileSync(path.join(__dirname, 'output.txt'), text.join(''));
}

/**
 * @param {Node} root
 * @returns {{[index: string]: number}}
 */
function countLetters(root) {
  const letters = {};
  let current = root;
  while (current) {
    const char = current.value;
    if (!letters[char]) letters[char] = 0;
    letters[char]++;
    current = current.next;
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
