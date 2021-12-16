const colors = require('colors');
const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 0;
expect(result).to.be.eq(expected);
console.log('Day 16, Part 01:', result);

function main() {
  const input = readInput().filter(n => !!n)[0];
  const bits = hexToBin(input);
  console.log(bits);
  decodeBits(bits);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}

/**
 * @param {string} hex
 * @returns {string}
 */
function hexToBin(hex) {
  return parseInt(hex, 16).toString(2);
}

/**
 * @param {string} bits
 * @returns {string}
 */
function decodeBits(bits) {
  const version = parseInt(bits.slice(0, 3), 2);
  console.log('Version:'.green, version);
  const type = parseInt(bits.slice(3, 6), 2);
  console.log('Type:'.green, type);
  let payload;
  if (type === 4) {
    payload = decodeLiteralValue(bits);
  } else {
    payload = decodeOperator(bits);
  }
  console.log('Payload:'.green, payload);
}

/**
 * @param {string} bits
 * @returns {number}
 */
function decodeLiteralValue(bits) {
  let number = [];
  for (let i = 6; i < bits.length; i += 5) {
    const code = bits.slice(i + 1, i + 5);
    number.push(code);
    if (bits[i] === '0') break; // first 0 mark the end of the message, but the chunk must be processed
  }
  return parseInt(number.join(''), 2);
}

function decodeOperator(bits) {
  // TODO
  const lengthTypeId = parseInt(bits.slice(6, 7), 2);
  if (lengthTypeId === 0) {
    return 'nop';
  } else {

  }
}
