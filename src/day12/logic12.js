import {MOCK_DATA_DAY_12} from "./data12";
import {MOCK_DEMO_DATA_DAY_12} from "./demo12";

/**
 * --- Day 12: Hill Climbing Algorithm ---
 * You try contacting the Elves using your handheld device, but the river you're following must be too low to get a decent signal.
 *
 * You ask the device for a heightmap of the surrounding area (your puzzle input). The heightmap shows the local area from above broken into a grid; the elevation of each square of the grid is given by a single lowercase letter, where a is the lowest elevation, b is the next-lowest, and so on up to the highest elevation, z.
 *
 * Also included on the heightmap are marks for your current position (S) and the location that should get the best signal (E). Your current position (S) has elevation a, and the location that should get the best signal (E) has elevation z.
 *
 * You'd like to reach E, but to save energy, you should do it in as few steps as possible. During each step, you can move exactly one square up, down, left, or right. To avoid needing to get out your climbing gear, the elevation of the destination square can be at most one higher than the elevation of your current square; that is, if your current elevation is m, you could step to elevation n, but not to elevation o. (This also means that the elevation of the destination square can be much lower than the elevation of your current square.)
 *
 * For example:
 *
 * Sabqponm
 * abcryxxl
 * accszExk
 * acctuvwj
 * abdefghi
 * Here, you start in the top-left corner; your goal is near the middle. You could start by moving down or right, but eventually you'll need to head toward the e at the bottom. From there, you can spiral around to the goal:
 *
 * v..v<<<<
 * >v.vv<<^
 * .>vv>E^^
 * ..v>>>^^
 * ..>>>>>^
 * In the above diagram, the symbols indicate whether the path exits each square moving up (^), down (v), left (<), or right (>). The location that should get the best signal is still E, and . marks unvisited squares.
 *
 * This path reaches the goal in 31 steps, the fewest possible.
 *
 * What is the fewest steps required to move from your current position to the location that should get the best signal?
 *
 * First, create a list of coordinates, which we will use as a queue. The queue will be initialized with one coordinate, the end coordinate. Each coordinate will also have a counter variable attached (the purpose of this will soon become evident). Thus, the queue starts off as ((3,8,0)).
 *
 * Then, go through every element in the queue, including new elements added to the end over the course of the algorithm, and for each element, do the following:
 *
 * Create a list of the four adjacent cells, with a counter variable of the current element's counter variable + 1 (in our example, the four cells are ((2,8,1),(3,7,1),(4,8,1),(3,9,1)))
 * Check all cells in each list for the following two conditions:
 * If the cell is a wall, remove it from the list
 * If there is an element in the main list with the same coordinate, remove it from the cells list
 * Add all remaining cells in the list to the end of the main list
 * Go to the next item in the list
 * Thus, after turn 1, the list of elements is this: ((3,8,0),(2,8,1),(4,8,1))
 *
 * After 2 turns: ((3,8,0),(2,8,1),(4,8,1),(1,8,2),(4,7,2))
 * After 3 turns: (...(1,7,3),(4,6,3),(5,7,3))
 * After 4 turns: (...(1,6,4),(3,6,4),(6,7,4))
 * After 5 turns: (...(1,5,5),(3,5,5),(6,6,5),(6,8,5))
 * After 6 turns: (...(1,4,6),(2,5,6),(3,4,6),(6,5,6),(7,8,6))
 * After 7 turns: (...(1,3,7)) – problem solved, end this stage of the algorithm – note that if you have multiple units chasing the same target (as in many games – the finish to start approach of the algorithm is intended to make this easier), you can continue until the entire map is taken up, all units are reached or a set counter limit is reached
 * @constructor
 */
const Logic12 = () => {
  // region prepare mock data
  const data = MOCK_DATA_DAY_12.split('\n');
  const demoData = MOCK_DEMO_DATA_DAY_12.split('\n');

  const getStartCoordinate = (playerField) => {
    let idy = 0;
    let idx = 0;

    for (const line of playerField) {
      idx = line.findIndex(item => item === 'S');
      if (idx >= 0)
        break;
      idy += 1;
    }

    return {x: idx, y: idy, counter: 0, char: '`'};
  };
  const getEndCoordinate = (playerField) => {
    let idy = 0;
    let idx = 0;

    for (const line of playerField) {
      idx = line.findIndex(item => item === 'E');
      if (idx >= 0)
        break;
      idy += 1;
    }

    return {x: idx, y: idy, counter: 0, char: '{'};
  };

  console.log(demoData);
  const demoPlayerField = [];
  demoData.forEach(item => demoPlayerField.push(item.split('')));
  const lifePlayerField = [];
  data.forEach(item => lifePlayerField.push(item.split('')));

  const demoStartCoordinate = getStartCoordinate(demoPlayerField);
  const lifeStartCoordinate = getStartCoordinate(lifePlayerField);

  const demoEndCoordinate = getEndCoordinate(demoPlayerField);
  console.log(lifeStartCoordinate);
  console.assert(lifePlayerField[lifeStartCoordinate.y][lifeStartCoordinate.x] === 'S', `Algorithm is incorrect - expected: 'S' calculated value: ${lifePlayerField[lifeStartCoordinate.y][lifeStartCoordinate.x]}`);
  // endregion prepare mock data
  // region score rules
  const addToWayListUp = (fieldPoint, playerField, wayList) => {
    const {x, y, counter, char} = fieldPoint;
    // bin ich am aeusseren Rand (oben)?
    if (y === 0)
      return;

    const higherChar = char.charCodeAt(0);
    const lowerChar = (playerField[y - 1][x]).charCodeAt(0);

    if (higherChar <= lowerChar || higherChar - 1 === lowerChar) {
      const wayPoint = {x, y: y - 1, counter: counter + 1, char: String.fromCharCode(lowerChar)};
      wayList.set(`${wayPoint.x},${wayPoint.y}`, wayPoint);
    }
  };
  const addToWayListDown = (fieldPoint, playerField, wayList) => {
    const {x, y, counter, char} = fieldPoint;
    // bin ich am aeusseren Rand (unten)?
    if (y === playerField.length - 1)
      return;

    const higherChar = char.charCodeAt(0);
    const lowerChar = (playerField[y + 1][x]).charCodeAt(0);

    if (higherChar <= lowerChar || higherChar - 1 === lowerChar) {
      const wayPoint = {x, y: y + 1, counter: counter + 1, char: String.fromCharCode(lowerChar)};
      wayList.set(`${wayPoint.x},${wayPoint.y}`, wayPoint);
    }
  };

  const addToWayListRight = (fieldPoint, playerField, wayList) => {
    const {x, y, counter, char} = fieldPoint;
    // bin ich am aeusseren Rand (rechts)?
    if (x === playerField[0].length - 1)
      return;

    const higherChar = char.charCodeAt(0);
    const lowerChar = (playerField[y][x + 1]).charCodeAt(0);

    // if (lowerChar-higherChar < -1) {
    if (higherChar <= lowerChar || higherChar - 1 === lowerChar) {
      const wayPoint = {x: x + 1, y, counter: counter + 1, char: String.fromCharCode(lowerChar)};
      wayList.set(`${wayPoint.x},${wayPoint.y}`, wayPoint);
    }
  };

  const addToWayListLeft = (fieldPoint, playerField, wayList) => {
    const {x, y, counter, char} = fieldPoint;
    // bin ich am aeusseren Rand (links)?
    if (x === 0)
      return;

    const higherChar = char.charCodeAt(0);
    const lowerChar = (playerField[y][x - 1]).charCodeAt(0);

    if (higherChar <= lowerChar || higherChar - 1 === lowerChar) {
      const wayPoint = {x: x - 1, y, counter: counter + 1, char: String.fromCharCode(lowerChar)};
      wayList.set(`${wayPoint.x},${wayPoint.y}`, wayPoint);
    }
  };
  // endregion score rules
  // region score calculation
  const calcPartOne = (startPos, endPos, playerField) => {
    let counter = 0;
    const wayList = new Map();
    wayList.set(`${endPos.x},${endPos.y}`, endPos);
    let prevListLength = 0;

    while (prevListLength !== wayList.size) {
      const listStartPos = prevListLength;
      prevListLength = wayList.size;

      console.log('listStartPos:', listStartPos, '   prevListLength:', prevListLength, wayList);

      for (let [, value] of wayList) {
        if (value.counter < counter)
          continue;

        addToWayListUp(value, playerField, wayList);
        addToWayListDown(value, playerField, wayList);
        addToWayListRight(value, playerField, wayList);
        addToWayListLeft(value, playerField, wayList);
      }
      counter += 1;
    }

    const pathMap = new Array(5).fill('x').map(() => new Array(8).fill('x'));
    for (let [, value] of wayList) {
      const wayPoint = value;
      pathMap[wayPoint.y][wayPoint.x] = wayPoint.counter;
    }

    console.log(pathMap);
    return 0;
  };

  const calcPartTwo = () => {

  };
  // endregion score calculation
  // region print out part one
  const demoScore = calcPartOne(demoStartCoordinate, demoEndCoordinate, demoPlayerField);
  console.assert(demoScore === 31, `Algorithm is incorrect - expected: 31 calculated value: ${demoScore}`);
  console.log('Demo-Score (Part One)  -> 31 ===', demoScore);

  // const lifeScore = calcPartOne(lifeStartCoordinate, lifePlayerField);
  // console.log('Life-Score (Part One)  -> (???)  ===', lifeScore);
  // endregion print out part one
  // region print out part two
  // const demoScorePT = calcPartTwo();
  // console.assert(demoScorePT === 21, `Algorithm is incorrect - expected: 21 calculated value: ${demoScorePT}`);
  // console.log('Demo-Score (Part Two)  -> 25 ===', demoScorePT);
  //
  // const lifeScorePT = calcPartTwo();
  // console.log('Life-Score (Part Two)  -> (???) 2222 ===', lifeScorePT);
  // endregion print out part two
};

export default Logic12;
