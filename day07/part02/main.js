const path = require('path');
const { expect } = require('chai');
const result = main();
const expected = 99540554;
expect(result.fuel).to.be.eq(expected);
console.log('Day 07, Part 02:', result.fuel);

function main() {
  const nums = readInput().filter(line => line.length > 0)[0].split(',').map(Number);
  const repeatedNums = {};
  for (const num of nums) {
    repeatedNums[num] = (repeatedNums[num] || 0) + 1;
  }

  let fuelCost = { num: 0, fuel: Infinity };
  for (const num in repeatedNums) {
    const accumulated = calculateFuelCost(num, nums);
    if (accumulated < fuelCost.fuel) {
      fuelCost.fuel = accumulated;
      fuelCost.num = num;
    }
  }

  // Search min values above num
  let tempFuelCost = { ...fuelCost };
  do {
    tempFuelCost.num++;
    tempFuelCost.fuel = calculateFuelCost(tempFuelCost.num, nums);
    if (tempFuelCost.fuel < fuelCost.fuel) {
      fuelCost = tempFuelCost;
    }
  } while (tempFuelCost.fuel < fuelCost.fuel);

  // Search min values below num
  tempFuelCost = { ...fuelCost };
  do {
    tempFuelCost.num--;
    tempFuelCost.fuel = calculateFuelCost(tempFuelCost.num, nums);
    if (tempFuelCost.fuel < fuelCost.fuel) {
      fuelCost = tempFuelCost;
    }
  } while (tempFuelCost.fuel < fuelCost.fuel);
  return fuelCost;
}

/**
 * @returns {string[]}
 */
function readInput() {
  return require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
}

function calculateFuelCost(num, nums) {
  return nums.reduce((acc, cur) => {
    const move = Math.abs(cur - num);
    return acc + ((move * (move + 1)) / 2);
  }, 0);
}
