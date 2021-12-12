const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 4775;
expect(result).to.be.eq(expected);
console.log('Day 12, Part 01:', result);

function main() {
  const input = readInput().filter(n => !!n);
  const connections = {};
  for (const line of input) {
    const [from, to] = line.split('-');
    connections[from] ? connections[from].push(to) : connections[from] = [to];
    connections[to] ? connections[to].push(from) : connections[to] = [from];
  }
  const paths = [];
  search('start', 'end', connections, ['start'], [], paths);
  return paths.length;
}

/**
 * @param {string }x
 * @param {string} target
 * @param {{[index:string]:string[]}} connections
 * @param {string[]} path
 * @param {string[]} seen
 * @param {string[][]} paths
 * @returns {void}
 */
function search(x, target, connections, path, seen, paths) {
  if (x === target) {
    paths.push([...path]);
    return;
  }
  seen = [...path];
  for (const y of connections[x]) {
    // Allow revisit nodes that are big caves
    if (y.toUpperCase() === y || !path.includes(y)) {
      path.push(y);
      search(y, target, connections, path, seen, paths);
      const index = path.indexOf(y);
      path.splice(index, 1);
    }
  }
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
