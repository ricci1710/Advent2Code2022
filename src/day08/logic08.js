import {MOCK_DATA_DAY_08} from "./data08";
import {MOCK_DEMO_DATA_DAY_08} from "./demo08";

/**
 * --- Day 8: Treetop Tree House ---
 * The expedition comes across a peculiar patch of tall trees all planted carefully in a grid. The Elves explain that a previous expedition planted these trees as a reforestation effort. Now, they're curious if this would be a good location for a tree house.
 *
 * First, determine whether there is enough tree cover here to keep a tree house hidden. To do this, you need to count the number of trees that are visible from outside the grid when looking directly along a row or column.
 *
 * The Elves have already launched a quadcopter to generate a map with the height of each tree (your puzzle input). For example:
 *
 * 30373
 * 25512
 * 65332
 * 33549
 * 35390
 * Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest.
 *
 * A tree is visible if all the other trees between it and an edge of the grid are shorter than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.
 *
 * All the trees around the edge of the grid are visible - since they are already on the edge, there are no trees to block the view. In this example, that only leaves the interior nine trees to consider:
 *
 * The top-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
 * The top-middle 5 is visible from the top and right.
 * The top-right 1 is not visible from any direction; for it to be visible, there would need to only be trees of height 0 between it and an edge.
 * The left-middle 5 is visible, but only from the right.
 * The center 3 is not visible from any direction; for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
 * The right-middle 3 is visible from the right.
 * In the bottom row, the middle 5 is visible, but the 3 and 4 are not.
 * With 16 trees visible on the edge and another 5 visible in the interior, a total of 21 trees are visible in this arrangement.
 *
 * Consider your map; how many trees are visible from outside the grid?
 *
 * --- Part Two ---
 * Content with the amount of tree cover available, the Elves just need to know the best spot to build their tree house: they would like to be able to see a lot of trees.
 *
 * To measure the viewing distance from a given tree, look up, down, left, and right from that tree; stop if you reach an edge or at the first tree that is the same height or taller than the tree under consideration. (If a tree is right on the edge, at least one of its viewing distances will be zero.)
 *
 * The Elves don't care about distant trees taller than those found by the rules above; the proposed tree house has large eaves to keep it dry, so they wouldn't be able to see higher than the tree house anyway.
 *
 * In the example above, consider the middle 5 in the second row:
 *
 * 30373
 * 25512
 * 65332
 * 33549
 * 35390
 * Looking up, its view is not blocked; it can see 1 tree (of height 3).
 * Looking left, its view is blocked immediately; it can see only 1 tree (of height 5, right next to it).
 * Looking right, its view is not blocked; it can see 2 trees.
 * Looking down, its view is blocked eventually; it can see 2 trees (one of height 3, then the tree of height 5 that blocks its view).
 * A tree's scenic score is found by multiplying together its viewing distance in each of the four directions. For this tree, this is 4 (found by multiplying 1 * 1 * 2 * 2).
 *
 * However, you can do even better: consider the tree of height 5 in the middle of the fourth row:
 *
 * 30373
 * 25512
 * 65332
 * 33549
 * 35390
 * Looking up, its view is blocked at 2 trees (by another tree with a height of 5).
 * Looking left, its view is not blocked; it can see 2 trees.
 * Looking down, its view is also not blocked; it can see 1 tree.
 * Looking right, its view is blocked at 2 trees (by a massive tree of height 9).
 * This tree's scenic score is 8 (2 * 2 * 1 * 2); this is the ideal spot for the tree house.
 *
 * Consider each tree on your map. What is the highest scenic score possible for any tree?
 * Difficult: Easy
 * @constructor
 */
const Logic08 = () => {
  // region prepare mock data
  const data = MOCK_DATA_DAY_08.split('\n');
  const demoData = MOCK_DEMO_DATA_DAY_08.split('\n');

  const fill2dArray = (values) => {
    const array2d = [];
    values.forEach((line) => {
      array2d.push(Array.from(line).map(item => parseInt(item.toString(), 10)));
    });
    return array2d;
  }

  const demoArray = fill2dArray(demoData);
  const lifeArray = fill2dArray(data);
  // endregion prepare mock data
  // region score rules
  // A tree is visible if all the other trees between it and an edge of the grid are shorter than it.
  const searchRight = (x, y, value, rowLength, array2d) => {
    let treeIsVisible = true;
    for (let idx = x + 1; idx < rowLength; idx += 1) {
      const rowValue = array2d[y][idx];
      if (rowValue < value)
        continue;

      treeIsVisible = false;
      break;
    }

    return treeIsVisible;
  };
  const searchLeft = (x, y, value, array2d) => {
    let treeIsVisible = true;
    for (let idx = x - 1; idx >= 0; idx -= 1) {
      const rowValue = array2d[y][idx];
      if (rowValue < value)
        continue;

      treeIsVisible = false;
      break;
    }

    return treeIsVisible;
  };
  const searchDown = (x, y, value, columnLength, array2d) => {
    let treeIsVisible = true;
    for (let idy = y + 1; idy < columnLength; idy += 1) {
      const colValue = array2d[idy][x];
      if (colValue < value)
        continue;

      treeIsVisible = false;
      break;
    }

    return treeIsVisible;
  };
  const searchUp = (x, y, value, array2d) => {
    let treeIsVisible = true;
    for (let idy = y - 1; idy >= 0; idy -= 1) {
      const colValue = array2d[idy][x];
      if (colValue < value)
        continue;

      treeIsVisible = false;
      break;
    }

    return treeIsVisible;
  };

  const scoreRight = (x, y, value, rowLength, array2d) => {
    let areaScore = 0;
    for (let idx = x + 1; idx < rowLength; idx += 1) {
      const rowValue = array2d[y][idx];

      areaScore += 1;
      if (rowValue < value)
        continue;

      break;
    }

    return areaScore;
  };
  const scoreLeft = (x, y, value, array2d) => {
    let areaScore = 0;
    for (let idx = x - 1; idx >= 0; idx -= 1) {
      const rowValue = array2d[y][idx];
      areaScore += 1;
      if (rowValue < value)
        continue;
      break;
    }

    return areaScore;
  };
  const scoreDown = (x, y, value, columnLength, array2d) => {
    let areaScore = 0;
    for (let idy = y + 1; idy < columnLength; idy += 1) {
      const colValue = array2d[idy][x];
      areaScore += 1;
      if (colValue < value)
        continue;
      break;
    }

    return areaScore;
  };
  const scoreUp = (x, y, value, array2d) => {
    let areaScore = 0;
    for (let idy = y - 1; idy >= 0; idy -= 1) {
      const colValue = array2d[idy][x];
      areaScore += 1;
      if (colValue < value)
        continue;
      break;
    }

    return areaScore;
  };

  // endregion score rules
  // region score calculation
  const calcPartOne = (array2d) => {
    // initial: all the trees around the edge of the grid are visible
    const rowLength = array2d[0].length;
    const columnLength = array2d.length;
    let visibleTrees = 2 * rowLength + 2 * columnLength - 4;

    for (let y = 1; y < columnLength - 1; y += 1) {
      for (let x = 1; x < rowLength - 1; x += 1) {
        const value = array2d[y][x];
        let treeIsVisible = searchRight(x, y, value, rowLength, array2d);
        treeIsVisible = treeIsVisible || searchLeft(x, y, value, array2d);
        treeIsVisible = treeIsVisible || searchUp(x, y, value, array2d);
        treeIsVisible = treeIsVisible || searchDown(x, y, value, columnLength, array2d);

        if (treeIsVisible)
          visibleTrees += 1;
      }
    }

    return visibleTrees;
  };
  const calcPartTwo = (array2d) => {
    // initial: all the trees around the edge of the grid are visible
    const rowLength = array2d[0].length;
    const columnLength = array2d.length;
    let result = 0;

    for (let y = 1; y < columnLength - 1; y += 1) {
      for (let x = 1; x < rowLength - 1; x += 1) {
        const value = array2d[y][x];
        const areaScoreRight = scoreRight(x, y, value, rowLength, array2d);
        const areaScoreLeft = scoreLeft(x, y, value, array2d);
        const areaScoreUp = scoreUp(x, y, value, array2d);
        const areaScoreDown = scoreDown(x, y, value, columnLength, array2d);

        const areaScore = areaScoreRight * areaScoreLeft * areaScoreUp * areaScoreDown;
        if (result < areaScore)
          result = areaScore;
      }
    }

    return result;
  };
  // endregion score calculation
  // region print out part one
  const demoVisibleTrees = calcPartOne(demoArray);
  console.assert(demoVisibleTrees === 21, `Algorithm is incorrect - expected: 21 calculated value: ${demoVisibleTrees}`);
  console.log('Demo-Score (Part One)  -> 21 ===', demoVisibleTrees);

  const lifeVisibleTrees = calcPartOne(lifeArray);
  console.log('Life-Score (Part One)  -> (???) 1700 ===', lifeVisibleTrees);
  // endregion print out part one
  // region print out part two
  const demoVisibleTreesPT = calcPartTwo(demoArray);
  console.assert(demoVisibleTreesPT === 8, `Algorithm is incorrect - expected: 8 calculated value: ${demoVisibleTreesPT}`);
  console.log('Demo-Score (Part Two)  -> 8 ===', demoVisibleTreesPT);
  const lifeVisibleTreesPT = calcPartTwo(lifeArray);
  console.log('Life-Score (Part Two)  -> (???) 470596 ===', lifeVisibleTreesPT);
  // endregion print out part two
};

export default Logic08;
