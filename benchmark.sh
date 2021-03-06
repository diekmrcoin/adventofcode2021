#!/bin/bash
# { ./benchmark.sh } 2>&1 | cat > results.txt
echo "*********************************"
echo "* Advent of Code 2021 benchmark *"
echo "*********************************"
echo ""

\time -f "---- %Us\n" node day01/part01/main.js
\time -f "---- %Us\n" node day01/part02/main.js
\time -f "---- %Us\n" node day02/part01/main.js
\time -f "---- %Us\n" node day02/part02/main.js
\time -f "---- %Us\n" node day03/part01/main.js
\time -f "---- %Us\n" node day03/part02/main.js
\time -f "---- %Us\n" node day04/part01/main.js
\time -f "---- %Us\n" node day04/part02/main.js
\time -f "---- %Us\n" node day05/part01/main.js
\time -f "---- %Us\n" node day05/part02/main.js
\time -f "---- %Us\n" node day06/part01/main.js
\time -f "---- %Us\n" node day06/part02/main.js
\time -f "---- %Us\n" node day07/part01/main.js
\time -f "---- %Us\n" node day07/part02/main.js
\time -f "---- %Us\n" node day08/part01/main.js
\time -f "---- %Us\n" node day08/part02/main.js
\time -f "---- %Us\n" node day09/part01/main.js
\time -f "---- %Us\n" node day09/part02/main.js
\time -f "---- %Us\n" node day10/part01/main.js
\time -f "---- %Us\n" node day10/part02/main.js
\time -f "---- %Us\n" node day11/part01/main.js
\time -f "---- %Us\n" node day11/part02/main.js
\time -f "---- %Us\n" node day12/part01/main.js
\time -f "---- %Us\n" node day12/part02/main.js
\time -f "---- %Us\n" node day13/part01/main.js
\time -f "---- %Us\n" node day13/part02/main.js
\time -f "---- %Us\n" node day14/part01/main.js
\time -f "---- %Us\n" node day14/part02/main.js
\time -f "---- %Us\n" node day15/part01/main.js
\time -f "---- %Us\n" node day15/part02/main.js

echo ""
echo "*******"
echo "* END *"
echo "*******"
