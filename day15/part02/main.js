const colors = require('colors');
const path = require('path');
const { expect } = require('chai');

class Node {
  constructor(x, y, weight) {
    this.x = x;
    this.y = y;
    this.weight = weight;
  }

  hash() {
    return `${this.x},${this.y}`;
  }

  toString() {
    return `(${this.x},${this.y}[${this.weight}])`;
  }
}

const result = main();
const expected = 2914;
expect(result).to.be.eq(expected);
console.log('Day 15, Part 02:', result);

function main() {
  const input = readInput().filter(n => !!n).map(row => row.split('').map(Number));
  const start = new Node(0, 0, gridValue(0, 0, input));
  const goal = new Node(
    (input.length * 5) - 1,
    (input[0].length * 5) - 1,
    gridValue((input[0].length * 5) - 1, (input.length * 5) - 1, input),
  );
  console.log('Start:'.yellow, start);
  console.log('Goal:'.green, goal);
  const path = findPath(
    start,
    goal,
    input,
    heuristic,
  );
  // printGrid(input, path);
  return path.reduce((acc, node) => acc + node.weight, input[0][0] * -1);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}

/**
 * Find the lowest weight path to the goal using A*.
 * @param {Node} start
 * @param {Node} goal
 * @param {number[][]} grid
 * @param {function} heuristic
 * @returns {Node[]} path with min weight
 */
function findPath(start, goal, grid, heuristic) {
  let openSet = [start];
  const cameFrom = {};
  const gScore = {};
  gScore[start.hash()] = start.weight;
  const fScore = {};
  fScore[start.hash()] = heuristic(start, goal);
  while (openSet.length) {
    const current = openSet.shift();
    if (current.hash() === goal.hash()) return reconstructPath(cameFrom, current);
    const neighbors = getNeighbors(current, grid);
    for (const neighbor of neighbors) {
      const gScoreNeighbor = gScore[current.hash()] + neighbor.weight;
      const fScoreNeighbor = gScoreNeighbor + heuristic(neighbor, goal);
      if (!gScore[neighbor.hash()] || gScoreNeighbor < gScore[neighbor.hash()]) {
        cameFrom[neighbor.hash()] = current;
        gScore[neighbor.hash()] = gScoreNeighbor;
        fScore[neighbor.hash()] = fScoreNeighbor;
        if (!openSet.find(n => n.hash() === neighbor.hash())) openSet.push(neighbor);
      }
    }
    openSet = openSet.sort((a, b) => fScore[a.hash()] - fScore[b.hash()]);
  }
}

function reconstructPath(cameFrom, current) {
  const totalPath = [current];
  while (cameFrom[current.hash()]) {
    current = cameFrom[current.hash()];
    totalPath.push(current);
  }
  return totalPath.reverse();
}

/**
 * Euclidean distance
 * @param {Node} start
 * @param {Node} goal
 * @returns {number}
 */
function heuristic(start, goal) {
  return Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y);
}

/**
 * @param {Node} node
 * @param {number[][]} grid
 * @return {Node[]}
 */
function getNeighbors(node, grid) {
  const neighbors = [];
  const x = node.x;
  const y = node.y;
  if (x > 0) {
    neighbors.push(new Node(x - 1, y, gridValue(y, x - 1, grid)));
  }
  if (x < (grid[0].length * 5) - 1) {
    neighbors.push(new Node(x + 1, y, gridValue(y, x + 1, grid)));
  }
  if (y > 0) {
    neighbors.push(new Node(x, y - 1, gridValue(y - 1, x, grid)));
  }
  if (y < (grid.length * 5) - 1) {
    neighbors.push(new Node(x, y + 1, gridValue(y + 1, x, grid)));
  }
  return neighbors;
}

/**
 * @param {number} y
 * @param {number} x
 * @param {number[][]} grid
 * @returns {number}
 */
function gridValue(y, x, grid) {
  const yGrid = (y % grid.length);
  const yDistance = Math.floor(y / grid.length);
  const xGrid = x % grid[0].length;
  const xDistance = Math.floor(x / grid[0].length);
  return ((grid[yGrid][xGrid] - 1 + yDistance + xDistance) % 9) + 1;
}

function printGrid(grid, path) {
  for (let y = 0; y < grid.length * 5; y++) {
    let row = '';
    for (let x = 0; x < grid[0].length * 5; x++) {
      const node = path.find(n => n.x === x && n.y === y);
      if (node)
        row += gridValue(y, x, grid).toString().green + ' ';
      else
        row += gridValue(y, x, grid) + ' ';
    }
    console.log(row);
  }
}
