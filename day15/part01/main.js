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
const expected = 595;
expect(result).to.be.eq(expected);
console.log('Day 15, Part 01:', result);

function main() {
  const input = readInput().filter(n => !!n).map(row => row.split('').map(Number));
  const path = findPath(
    new Node(0, 0, input[0][0]),
    new Node(input.length - 1, input[0].length - 1, input[input.length - 1][input[0].length - 1]),
    input,
    heuristic,
  );
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
    neighbors.push(new Node(x - 1, y, grid[y][x - 1]));
  }
  if (x < grid[y].length - 1) {
    neighbors.push(new Node(x + 1, y, grid[y][x + 1]));
  }
  if (y > 0) {
    neighbors.push(new Node(x, y - 1, grid[y - 1][x]));
  }
  if (y < grid.length - 1) {
    neighbors.push(new Node(x, y + 1, grid[y + 1][x]));
  }
  return neighbors;
}
