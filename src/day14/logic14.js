import {MOCK_DATA_DAY_14} from "./data14";
import {MOCK_DEMO_DATA_DAY_14} from "./demo14";

/**
 * --- Day 14: Regolith Reservoir ---
 * The distress signal leads you to a giant waterfall! Actually, hang on - the signal seems like it's coming from the
 * waterfall itself, and that doesn't make any sense. However, you do notice a little path that leads behind the
 * waterfall.
 *
 * Correction: the distress signal leads you behind a giant waterfall! There seems to be a large cave system here, and
 * the signal definitely leads further inside.
 *
 * As you begin to make your way deeper underground, you feel the ground rumble for a moment. Sand begins pouring into
 * the cave! If you don't quickly figure out where the sand is going, you could quickly become trapped!
 *
 * Fortunately, your familiarity with analyzing the path of falling material will come in handy here. You scan a
 * two-dimensional vertical slice of the cave above you (your puzzle input) and discover that it is mostly air with
 * structures made of rock.
 *
 * Your scan traces the path of each solid rock structure and reports the x,y coordinates that form the shape of the
 * path, where x represents distance to the right and y represents distance down. Each path appears as a single line of
 * text in your scan. After the first point of each path, each point indicates the end of a straight horizontal or
 * vertical line to be drawn from the previous point. For example:
 *
 * 498,4 -> 498,6 -> 496,6
 * 503,4 -> 502,4 -> 502,9 -> 494,9
 * This scan means that there are two paths of rock; the first path consists of two straight lines, and the second path
 * consists of three straight lines. (Specifically, the first path consists of a line of rock from 498,4 through 498,6
 * and another line of rock from 498,6 through 496,6.)
 *
 * The sand is pouring into the cave from point 500,0.
 *
 * Drawing rock as #, air as ., and the source of the sand as +, this becomes:
 *
 *
 *   4     5  5
 *   9     0  0
 *   4     0  3
 * 0 ......+...
 * 1 ..........
 * 2 ..........
 * 3 ..........
 * 4 ....#...##
 * 5 ....#...#.
 * 6 ..###...#.
 * 7 ........#.
 * 8 ........#.
 * 9 #########.
 * Sand is produced one unit at a time, and the next unit of sand is not produced until the previous unit of sand comes
 * to rest. A unit of sand is large enough to fill one tile of air in your scan.
 *
 * A unit of sand always falls down one step if possible. If the tile immediately below is blocked (by rock or sand),
 * the unit of sand attempts to instead move diagonally one step down and to the left. If that tile is blocked, the unit
 * of sand attempts to instead move diagonally one step down and to the right. Sand keeps moving as long as it is able
 * to do so, at each step trying to move down, then down-left, then down-right. If all three possible destinations are
 * blocked, the unit of sand comes to rest and no longer moves, at which point the next unit of sand is created back at
 * the source.
 *
 * So, drawing sand that has come to rest as o, the first unit of sand simply falls straight down and then stops:
 *
 * ......+...
 * ..........
 * ..........
 * ..........
 * ....#...##
 * ....#...#.
 * ..###...#.
 * ........#.
 * ......o.#.
 * #########.
 * The second unit of sand then falls straight down, lands on the first one, and then comes to rest to its left:
 *
 * ......+...
 * ..........
 * ..........
 * ..........
 * ....#...##
 * ....#...#.
 * ..###...#.
 * ........#.
 * .....oo.#.
 * #########.
 * After a total of five units of sand have come to rest, they form this pattern:
 *
 * ......+...
 * ..........
 * ..........
 * ..........
 * ....#...##
 * ....#...#.
 * ..###...#.
 * ......o.#.
 * ....oooo#.
 * #########.
 * After a total of 22 units of sand:
 *
 * ......+...
 * ..........
 * ......o...
 * .....ooo..
 * ....#ooo##
 * ....#ooo#.
 * ..###ooo#.
 * ....oooo#.
 * ...ooooo#.
 * #########.
 * Finally, only two more units of sand can possibly come to rest:
 *
 * ......+...
 * ..........
 * ......o...
 * .....ooo..
 * ....#ooo##
 * ...o#ooo#.
 * ..###ooo#.
 * ....oooo#.
 * .o.ooooo#.
 * #########.
 * Once all 24 units of sand shown above have come to rest, all further sand flows out the bottom, falling into the
 * endless void. Just for fun, the path any new sand takes before falling forever is shown here with ~:
 *
 * .......+...
 * .......~...
 * ......~o...
 * .....~ooo..
 * ....~#ooo##
 * ...~o#ooo#.
 * ..~###ooo#.
 * ..~..oooo#.
 * .~o.ooooo#.
 * ~#########.
 * ~..........
 * ~..........
 * ~..........
 * Using your scan, simulate the falling sand. How many units of sand come to rest before sand starts flowing into the
 * abyss below?
 *
 * --- Part Two ---
 * You realize you misread the scan. There isn't an endless void at the bottom of the scan - there's floor, and you're
 * standing on it!
 *
 * You don't have time to scan the floor, so assume the floor is an infinite horizontal line with a y coordinate equal
 * to two plus the highest y coordinate of any point in your scan.
 *
 * In the example above, the highest y coordinate of any point is 9, and so the floor is at y=11. (This is as if your
 * scan contained one extra rock path like -infinity,11 -> infinity,11.) With the added floor, the example above now
 * looks like this:
 *
 *         ...........+........
 *         ....................
 *         ....................
 *         ....................
 *         .........#...##.....
 *         .........#...#......
 *         .......###...#......
 *         .............#......
 *         .............#......
 *         .....#########......
 *         ....................
 * <-- etc #################### etc -->
 * To find somewhere safe to stand, you'll need to simulate falling sand until a unit of sand comes to rest at 500,0,
 * blocking the source entirely and stopping the flow of sand into the cave. In the example above, the situation finally
 * looks like this after 93 units of sand come to rest:
 *
 * ............o............
 * ...........ooo...........
 * ..........ooooo..........
 * .........ooooooo.........
 * ........oo#ooo##o........
 * .......ooo#ooo#ooo.......
 * ......oo###ooo#oooo......
 * .....oooo.oooo#ooooo.....
 * ....oooooooooo#oooooo....
 * ...ooo#########ooooooo...
 * ..ooooo.......ooooooooo..
 * #########################
 * Using your scan, simulate the falling sand until the source of the sand becomes blocked. How many units of sand come to rest?
 *
 * @constructor
 */
const Logic14 = () => {
  // region prepare mock data
  const data = MOCK_DATA_DAY_14.split('\n');
  const demoData = MOCK_DEMO_DATA_DAY_14.split('\n');

  // The sand is pouring into the cave from point 500,0.
  const startPoint = {x: 500, y: 0, char: '+'};

  // endregion prepare mock data
  // region score rules
  /*
   Sand wird jeweils in einer Einheit produziert, und die nächste Sandeinheit wird erst produziert, wenn die vorherige
   Sandeinheit zur Ruhe gekommen ist. Eine Sandeinheit ist groß genug, um ein Luftfeld in deinem Scan zu füllen.
   Eine Sandeinheit fällt, wenn möglich, immer eine Stufe nach unten. Wenn das unmittelbar darunter liegende Plättchen
   blockiert ist (durch Felsen oder Sand), versucht die Sandeinheit stattdessen, sich diagonal einen Schritt nach unten
   und nach links zu bewegen. Ist dieses Plättchen blockiert, versucht die Sandeinheit, sich stattdessen diagonal einen
   Schritt nach unten und nach rechts zu bewegen. Der Sand bewegt sich so lange weiter, wie es ihm möglich ist, wobei er
   bei jedem Schritt versucht, erst nach unten, dann nach unten-links und dann nach unten-rechts zu gelangen. Wenn alle
   drei möglichen Ziele blockiert sind, kommt die Sandeinheit zum Stillstand und bewegt sich nicht mehr.
  */
  const getCalcXCoordinate = (x, minXCoordinate) => {
    return x - minXCoordinate + 1;
  };

  const getPoint = (value) => {
    const values = value.split(',');
    return {x: parseInt(values[0], 10), y: parseInt(values[1], 10)};
  };

  const getCalcPoint = (value, minXCoordinate) => {
    const point = getPoint(value);
    point.x = getCalcXCoordinate(point.x, minXCoordinate)
    return point;
  };

  const calculatePlayFieldSize = (values) => {
    let maxX = 1000;
    let maxY = 0;

    let minX = Number.MAX_VALUE;
    let minY = 0;

    values.forEach((line) => {
      const parsedLine = line.split(' -> ');
      parsedLine.forEach((point) => {
        const {x, y} = getPoint(point);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        // maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
    });

    const playerField = new Array(maxY + 1).fill('.').map(() => new Array(maxX).fill('.'));
    return {playerField, minXCoordinate: minX};
  };

  const buildPlayerField = ({playerField, minXCoordinate}, values) => {
    const {x, y, char} = startPoint;
    const calcX = getCalcXCoordinate(x, minXCoordinate);
    playerField[y][calcX] = char;
    values.forEach((line) => {
      const parsedLine = line.split(' -> ');
      for (let idx = 0; idx < parsedLine.length - 1; idx += 1) {
        const point = getCalcPoint(parsedLine[idx], minXCoordinate);
        const nextPoint = getCalcPoint(parsedLine[idx + 1], minXCoordinate);
        if (point.x === nextPoint.x) {
          const steps = point.y - nextPoint.y;
          if (steps > 0) {
            for (let step = 0; step < steps + 1; step += 1)
              playerField[point.y - step][point.x] = '#';
          } else {
            for (let step = 0; step < Math.abs(steps) + 1; step += 1)
              playerField[point.y + step][point.x] = '#';
          }
        } else {
          const steps = point.x - nextPoint.x;
          if (steps > 0) {
            for (let step = 0; step < steps + 1; step += 1)
              playerField[point.y][point.x - step] = '#';
          } else {
            for (let step = 0; step < Math.abs(steps) + 1; step += 1)
              playerField[point.y][point.x + step] = '#';
          }
        }
      }
    });
  };
  const buildPlayerFieldPartTwo = ({playerField, minXCoordinate}, values) => {
    const {x, y, char} = startPoint;
    playerField[y][x] = char;
    values.forEach((line) => {
      const parsedLine = line.split(' -> ');
      for (let idx = 0; idx < parsedLine.length - 1; idx += 1) {
        const point = getPoint(parsedLine[idx], minXCoordinate);
        const nextPoint = getPoint(parsedLine[idx + 1], minXCoordinate);
        if (point.x === nextPoint.x) {
          const steps = point.y - nextPoint.y;
          if (steps > 0) {
            for (let step = 0; step < steps + 1; step += 1)
              playerField[point.y - step][point.x] = '#';
          } else {
            for (let step = 0; step < Math.abs(steps) + 1; step += 1)
              playerField[point.y + step][point.x] = '#';
          }
        } else {
          const steps = point.x - nextPoint.x;
          if (steps > 0) {
            for (let step = 0; step < steps + 1; step += 1)
              playerField[point.y][point.x - step] = '#';
          } else {
            for (let step = 0; step < Math.abs(steps) + 1; step += 1)
              playerField[point.y][point.x + step] = '#';
          }
        }
      }
    });
  };
  const calcPlayerFieldPartOne = (playerFieldData) => {
    const {playerField, minXCoordinate} = playerFieldData;
    const maxYLength = playerField.length;

    let count = 0;
    let finish = false;
    while (finish === false) {
      const startPoint = {x: getCalcXCoordinate(500, minXCoordinate), y: 0};
      const xPos = startPoint.x;
      const yPos = startPoint.y;
      const currentPos = {x: xPos, y: yPos};

      for (let idy = 0; idy < maxYLength; idy += 1) {
        currentPos.y += 1;
        if (currentPos.y + 1 >= maxYLength) {
          finish = true;
          break;
        }

        const fieldValue = playerField[currentPos.y + 1][currentPos.x];
        if (fieldValue === 'o' || fieldValue === '#') {
          // linke diagonal prüfen
          if (currentPos.x - 1 < 0) {
            finish = true;
            break;
          }
          const leftValue = playerField[currentPos.y + 1][currentPos.x - 1];
          if (leftValue === 'o' || leftValue === '#') {
            // rechte diagonale prüfen
            const rightValue = playerField[currentPos.y + 1][currentPos.x + 1];
            if (rightValue === 'o' || rightValue === '#') {
              playerField[currentPos.y][currentPos.x] = 'o';
              break;
            } else {
              currentPos.x += 1;
            }
          } else {
            currentPos.x -= 1;
          }
        }
      }

      count++;
    }
    return count;
  };
  const calcPlayerFieldPartTwo = (playerFieldData) => {
    const {playerField} = playerFieldData;
    const maxYLength = playerField.length;

    let count = 0;
    let finish = false;
    while (finish === false) {
      const startPoint = {x: 500, y: -1};
      const xPos = startPoint.x;
      const yPos = startPoint.y;
      const currentPos = {x: xPos, y: yPos};

      for (let idy = 0; idy < maxYLength; idy += 1) {
        currentPos.y += 1;
        if (currentPos.y + 1 >= maxYLength) {
          finish = true;
          break;
        }

        const fieldValue = playerField[currentPos.y + 1][currentPos.x];
        if (fieldValue === 'o' || fieldValue === '#') {
          // linke diagonal prüfen
          if (currentPos.x - 1 < 0) {
            finish = true;
            break;
          }
          const leftValue = playerField[currentPos.y + 1][currentPos.x - 1];
          if (leftValue === 'o' || leftValue === '#') {
            // rechte diagonale prüfen
            const rightValue = playerField[currentPos.y + 1][currentPos.x + 1];
            if (rightValue === 'o' || rightValue === '#') {
              playerField[currentPos.y][currentPos.x] = 'o';
              if (currentPos.x === 500 && currentPos.y === 1)
                console.log(currentPos);
              if (currentPos.x === 500 && currentPos.y === 0)
                finish = true;
              break;
            } else {
              currentPos.x += 1;
            }
          } else {
            currentPos.x -= 1;
          }
        }
      }

      count++;
    }
    return count;
  };
  // endregion score rules
  // region score calculation
  const calcPartOne = (values) => {
    const playerFieldData = calculatePlayFieldSize(values);
    buildPlayerField(playerFieldData, values);
    return calcPlayerFieldPartOne(playerFieldData) - 1;
  };

  const calcPartTwo = (values) => {
    const playerFieldData = calculatePlayFieldSize(values);
    buildPlayerFieldPartTwo(playerFieldData, values);

    const {playerField} = playerFieldData;
    playerField.push(new Array(playerField[0].length).fill('.'))
    playerField.push(new Array(playerField[0].length).fill('#'))

    return calcPlayerFieldPartTwo(playerFieldData);
  };
  // endregion score calculation
  // region print out part one
  const demoScore = calcPartOne(demoData);
  console.assert(demoScore === 24, `Algorithm is incorrect - expected: 24 calculated value: ${demoScore}`);
  console.log('Demo-Score (Part One)  -> 24 ===', demoScore);

  const lifeScore = calcPartOne(data);
  console.log('Life-Score (Part One)  -> (???) 768 ===', lifeScore);
  // endregion print out part one
  // region print out part two
  const demoScorePT = calcPartTwo(demoData);
  console.assert(demoScorePT === 93, `Algorithm is incorrect - expected: 93 calculated value: ${demoScorePT}`);
  console.log('Demo-Score (Part Two)  -> 93 ===', demoScorePT);

  const lifeScorePT = calcPartTwo(data);
  console.log('Life-Score (Part Two)  -> (???) 26686 ===', lifeScorePT);
  // endregion print out part two
};

export default Logic14;
