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

echo ""
echo "*******"
echo "* END *"
echo "*******"
