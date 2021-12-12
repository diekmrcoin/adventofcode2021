const colors = require('colors');
const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 152480;
expect(result).to.be.eq(expected);
console.log('Day 12, Part 02:', result);

function main() {
  const input = readInput().filter(n => !!n);
  const connections = {};
  for (const line of input) {
    const [from, to] = line.split('-');
    connections[from] ? connections[from].push(to) : connections[from] = [to];
    connections[to] ? connections[to].push(from) : connections[to] = [from];
  }
  const paths = [];
  search('start', 'end', connections, ['start'], paths);
  return paths.length;
}

/**
 * @param {string }x
 * @param {string} target
 * @param {{[index:string]:string[]}} connections
 * @param {string[]} path
 * @param {string[][]} paths
 * @returns {void}
 */
function search(x, target, connections, path, paths) {
  if (x === target) {
    paths.push([...path]);
    // console.log(`Path found: ${path.toString()}`.black.bgYellow);
    return;
  }
  for (const y of connections[x]) {
    if (allowCaveVisit(y, path)) {
      const index = path.push(y);
      search(y, target, connections, path, paths);
      path.splice(index - 1, 1);
    }
  }
}

/**
 * @param {string} x
 * @param {string[]} path
 * @returns {boolean}
 */
function allowCaveVisit(x, path) {
  if (x === 'start' || path[path.length - 1] === 'end') {
    return false;
  }
  if (x.toUpperCase() === x) return true;
  const smallCaves = {};
  for (const y of path) {
    if (y.toUpperCase() !== y) {
      smallCaves[y] = (smallCaves[y] || 0) + 1;
    }
  }
  const amounts = Object.values(smallCaves);
  const someVisitedTwice = amounts.some(amount => amount >= 2);
  if (someVisitedTwice) return path.filter(y => y === x).length < 1;
  return path.filter(y => y === x).length < 2;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}
