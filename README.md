# Advent of Code 2021

### Objective

My personal objective doing this advent of code **is just to solve** every problem **in the same day** as it's released.

#### Don't expect to find beautiful solutions, clean or optimized in any way.

***

[Advent of Code 2021 website](https://adventofcode.com/2021)

You can see the code of every day and the variations in code between part 1 and part 2.

You can execute all the days with the following commands:

- `yarn install`
- `./benchmark.sh`

***

### Advent of Code 2021 benchmark

The benchmark is for curiosity (due to day 6 part 2), my goal here is not the optimized code.
<details>
<summary>SPOILER ALERT, the results are inside</summary>

**Day 1:**

- Part 1: 1616 *(0.06s)*
- Part 2: 1645 *(0.05s)*

**Day 2:**

- Part 1: 1580000 *(0.05s)*
- Part 2: 1251263225 *(0.04s)*

**Day 3:**

- Part 1: 2743844 *(0.05s)*
- Part 2: 6677951 *(0.05s)*

**Day 4:**

- Part 1: 55770 *(0.07s)*
- Part 2: 2980 *(0.07s)*

**Day 5:**

- Part 1: 6267 *(0.13s)*
- Part 2: 20196 *0.22s)*

**Day 6:**

- Part 1: 372984 *(0.14s)*
- Part 2: 1681503251694 *(0.04s)*

**Day 7:**

- Part 1: 349769 *(0.08s)*
- Part 2: 99540554 *(0.06s)*
    - Time using recurrent like factorial *(1.44s)*

**Day 8:**

- Part 1: 476 *(0.03s)*
- Part 2: 1011823 *(0.08s)*

**Day 9:**

- Part 1: 478 *(0.04s)*
- Part 2: 1327014 *(0.07s)*
    - Solution with parallel basin processing almost not affect the execution time

**Day 10:**

- Part 1: 311949 *(0.06s)*
- Part 2: 3042730309 *(0.07s)*

**Day 11:**

- Part 1: 1702 *(0.08s)*
- Part 2: 251 *(0.09s)*

**Day 12:**

- Part 1: 4775 *(0.07s)*
- Part 2: 152480 *(1.87s)*

**Day 13:**

- Part 1: 661 *(0.09s)*
- Part 2: PFKLKCFP *(0.1s)*

**Day 14:**

- Part 1: 2068 *(0.08s)*
- Part 2: 2158894777814 *(0.09s)*
    - Full polymer char's array calculation *(memory heap out)*
    - Full polymer string calculation *(memory heap out)*
    - Full polymer linked list calculation *(memory heap out)*
    - Disaggregated pairs calculation **(Correct)**

**Day 15:**
> Solved with A* -> [Wikipedia](https://en.wikipedia.org/wiki/A*_search_algorithm)

- Part 1: 595 *(0.69s)*
- Part 2: 2914
  - Sorting and shifting every new iteration to visit always the less weighted *(62.00s)*
  - Some equilibrium between sorting and shifting the neighbors *(2.05s)*

</details>

***

#### Hardware

i7-8550U 1.80GHz x8   
16GB RAM
