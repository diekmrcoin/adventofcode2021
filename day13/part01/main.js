const colors = require('colors');
const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 661;
expect(result).to.be.eq(expected);
console.log('Day 13, Part 01:', result);

function main() {
  const input = readInput().filter(n => !!n);
  const coordinates = input.filter(row => !row.includes('fold')).map(row => row.split(',').map(Number));
  const folds = input.filter(row => row.includes('fold')).map(row => {
    const data = row.substring(11).split('=');
    return [data[0], Number(data[1])];
  });
  /** @type {boolean[][]} */
  const grid = [];
  for (const [x, y] of coordinates) {
    if (!grid[y]) grid[y] = [];
    grid[y][x] = true;
  }

  for (const fold of folds) {
    // part 1 only one fold
    // printGrid(grid, fold[0], fold[1]);
    if (fold[0] === 'x')
      foldGridToLeft(fold[1], grid);
    else
      foldGridUp(fold[1], grid);
    break;
  }
  // printGrid(grid);
  return grid.reduce((sum, row) => sum + row.filter(n => n).length, 0);
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}

/**
 * @param {number} column
 * @param {boolean[][]} grid
 */
function foldGridToLeft(column, grid) {
  for (let y = 0; y < grid.length; y++) {
    if (!grid[y]) continue;
    for (let x = column; x < grid[y].length; x++) {
      if (!grid[y][x]) continue;
      const newX = column - (x - column);
      grid[y][newX] = true;
    }
    grid[y].splice(column, grid[y].length);
  }
}

/**
 * @param {number} row
 * @param {boolean[][]} grid
 */
function foldGridUp(row, grid) {
  for (let y = row; y < grid.length; y++) {
    if (!grid[y]) continue;
    for (let x = 0; x < grid[y].length; x++) {
      if (!grid[y][x]) continue;
      const newRow = row - (y - row);
      if (!grid[newRow]) grid[newRow] = [];
      grid[newRow][x] = true;
    }
  }
  grid.splice(row, grid.length);
}

function printGrid(grid, foldAction, foldCoordinate) {
  const maxX = grid.reduce((max, row) => Math.max(max, row.length), 0);
  for (let y = 0; y < grid.length; y++) {
    if (foldAction === 'y' && y === foldCoordinate) {
      console.log('-'.padEnd(maxX, '-').red);
      continue;
    }
    if (!grid[y]) console.log('.'.padEnd(maxX, '.'));
    else {
      const rowString = [];
      for (let x = 0; x < maxX; x++) {
        if (foldAction === 'x' && x === foldCoordinate) {
          rowString.push('|'.red);
          continue;
        }
        rowString.push(grid[y][x] ? '#'.red : '.');
      }
      console.log(rowString.join(''));
    }
  }
  console.log('-----'.green);
}
