import {MOCK_DATA_DAY_15} from "./data15";
import {MOCK_DEMO_DATA_DAY_15} from "./demo15";

/**
 * --- Day 15: Beacon Exclusion Zone ---
 * You feel the ground rumble again as the distress signal leads you to a large network of subterranean tunnels.
 * You don't have time to search them all, but you don't need to: your pack contains a set of deployable sensors that
 * you imagine were originally built to locate lost Elves.
 *
 * The sensors aren't very powerful, but that's okay; your handheld device indicates that you're close enough to the
 * source of the distress signal to use them. You pull the emergency sensor system out of your pack, hit the big button
 * on top, and the sensors zoom off down the tunnels.
 *
 * Once a sensor finds a spot it thinks will give it a good reading, it attaches itself to a hard surface and begins
 * monitoring for the nearest signal source beacon. Sensors and beacons always exist at integer coordinates. Each sensor
 * knows its own position and can determine the position of a beacon precisely; however, sensors can only lock on to the
 * one beacon(Funkfeuer) closest to the sensor as measured by the Manhattan distance. (There is never a tie where two
 * beacons are he same distance to a sensor.)
 *
 * https://www.biancahoegel.de/mathe/raum/manhattan-metrik.html
 * d(a,b)=|a_{1}-b_{1}|+|a_{2}-b_{2}|=|6|+|6|=12
 *  x=8, y=7: closest beacon is at x=2, y=10
 *
 * It doesn't take long for the sensors to report back their positions and closest beacons (your puzzle input). For example:
 *
 * Sensor at x=2, y=18: closest beacon is at x=-2, y=15
 * Sensor at x=9, y=16: closest beacon is at x=10, y=16
 * Sensor at x=13, y=2: closest beacon is at x=15, y=3
 * Sensor at x=12, y=14: closest beacon is at x=10, y=16
 * Sensor at x=10, y=20: closest beacon is at x=10, y=16
 * Sensor at x=14, y=17: closest beacon is at x=10, y=16
 * Sensor at x=8, y=7: closest beacon is at x=2, y=10
 * Sensor at x=2, y=0: closest beacon is at x=2, y=10
 * Sensor at x=0, y=11: closest beacon is at x=2, y=10
 * Sensor at x=20, y=14: closest beacon is at x=25, y=17
 * Sensor at x=17, y=20: closest beacon is at x=21, y=22
 * Sensor at x=16, y=7: closest beacon is at x=15, y=3
 * Sensor at x=14, y=3: closest beacon is at x=15, y=3
 * Sensor at x=20, y=1: closest beacon is at x=15, y=3
 * So, consider the sensor at 2,18; the closest beacon to it is at -2,15. For the sensor at 9,16, the closest beacon to it is at 10,16.
 *
 * Drawing sensors as S and beacons as B, the above arrangement of sensors and beacons looks like this:
 *
 *                1    1    2    2
 *      0    5    0    5    0    5
 *  0 ....S.......................
 *  1 ......................S.....
 *  2 ...............S............
 *  3 ................SB..........
 *  4 ............................
 *  5 ............................
 *  6 ............................
 *  7 ..........S.......S.........
 *  8 ............................
 *  9 ............................
 * 10 ....B.......................
 * 11 ..S.........................
 * 12 ............................
 * 13 ............................
 * 14 ..............S.......S.....
 * 15 B...........................
 * 16 ...........SB...............
 * 17 ................S..........B
 * 18 ....S.......................
 * 19 ............................
 * 20 ............S......S........
 * 21 ............................
 * 22 .......................B....
 *
 * This isn't necessarily a comprehensive map of all beacons in the area, though. Because each sensor only identifies
 * its closest beacon, if a sensor detects a beacon, you know there are no other beacons that close or closer to that
 * sensor. There could still be beacons that just happen to not be the closest beacon to any sensor. Consider the
 * sensor at S:8,7 -> B:7,10:
 * d(S,B) = |8-2| + |7-10| = 6 + 3 = 9 => 9x '#'
 *
 *                1    1    2    2
 *      0    5    0    5    0    5
 * -2 ..........#.................
 * -1 .........###................
 *  0 ....S...#####...............
 *  1 .......#######........S.....
 *  2 ......#########S............
 *  3 .....###########SB..........
 *  4 ....#############...........
 *  5 ...###############..........
 *  6 ..#################.........
 *  7 .#########S#######S#........
 *  8 ..#################.........
 *  9 ...###############..........
 * 10 ....B############...........
 * 11 ..S..###########............
 * 12 ......#########.............
 * 13 .......#######..............
 * 14 ........#####.S.......S.....
 * 15 B........###................
 * 16 ..........#SB...............
 * 17 ................S..........B
 * 18 ....S.......................
 * 19 ............................
 * 20 ............S......S........
 * 21 ............................
 * 22 .......................B....
 * This sensor's closest beacon is at 2,10, and so you know there are no beacons that close or closer
 * (in any positions marked #).
 *
 * None of the detected beacons seem to be producing the distress signal, so you'll need to work out where the distress
 * beacon is by working out where it isn't. For now, keep things simple by counting the positions where a beacon cannot
 * possibly be along just a single row.
 *
 * So, suppose you have an arrangement of beacons and sensors like in the example above and, just in the row where y=10,
 * you'd like to count the number of positions a beacon cannot possibly exist. The coverage from all sensors near that
 * row looks like this:
 *
 *                  1    1    2    2
 *        0    5    0    5    0    5
 *  9 ...#########################...
 * 10 ..####B######################..
 * 11 .###S#############.###########.
 * In this example, in the row where y=10, there are 26 positions where a beacon cannot be present.
 *
 * Consult the report from the sensors you just deployed. In the row where y=2000000, how many positions cannot contain
 * a beacon?
 *
 * --- Part Two ---
 * Your handheld device indicates that the distress signal is coming from a beacon nearby. The distress beacon is not
 * detected by any sensor, but the distress beacon must have x and y coordinates each no lower than 0 and no larger
 * than 4000000.
 *
 * To isolate the distress beacon's signal, you need to determine its tuning frequency, which can be found by
 * multiplying its x coordinate by 4000000 and then adding its y coordinate.
 *
 * In the example above, the search space is smaller: instead, the x and y coordinates can each be at most 20. With
 * this reduced search area, there is only a single position that could have a beacon: x=14, y=11. The tuning frequency
 * for this distress beacon is 56000011.
 *
 * Find the only possible position for the distress beacon. What is its tuning frequency?
 *
 * @constructor
 */
const Logic15 = () => {
  // region prepare mock data
  const data = MOCK_DATA_DAY_15.split('\n');
  const demoData = MOCK_DEMO_DATA_DAY_15.split('\n');

  // endregion prepare mock data
  // region score rules
  const parseData = (values) => {
    const playerField = new Map();
    const sbMinDistance = new Map();

    values.forEach((line) => {
      const lineParts = line.split(':');
      const sensor = lineParts[0].split(' ');
      const beacon = lineParts[1].split(' ');

      console.assert(beacon.length === 7, `Algorithm is incorrect - beacon.length expected: 7 calculated value: ${beacon.length}`)
      let xPos = beacon[5].split('=');
      let yPos = beacon[6].split('=');
      let key = `${xPos[1]}${yPos[1]}`;
      playerField.set(key, 'B');

      const beaconPosX = parseInt(xPos[1], 10);
      const beaconPosY = parseInt(yPos[1], 10);

      console.assert(sensor.length === 4, `Algorithm is incorrect - sensor.length expected: 4 calculated value: ${sensor.length}`)
      xPos = sensor[2].split('=');
      yPos = sensor[3].split('=');
      key = `${xPos[1]}${yPos[1]}`;
      playerField.set(key, 'S');
      const sensorPosX = parseInt(xPos[1], 10);
      const sensorPosY = parseInt(yPos[1], 10);

      const dist = Math.abs(sensorPosX - beaconPosX) + Math.abs(sensorPosY - beaconPosY);
      sbMinDistance.set(key, dist);
    });

    return {playerField, sbMinDistance};
  };

  const forbiddenCellCounter = (sensorPosY, sensorDistance, lineNumber) => {
    return sensorDistance - Math.abs(sensorPosY - lineNumber);
  };
  const filterMap = (playerField, conditionCB) => {
    const result = new Map();
    for (let [key, value] of playerField) {
      if (conditionCB(key, value)) {
        result.set(key, value);
      }
    }
    return result;
  };
  // endregion score rules
  // region score calculation
  const calcPartOne = (values, lineNumber) => {
    const resultMap = new Map();
    const {playerField, sbMinDistance} = parseData(values);
    const sensorMapForLineNumber = filterMap(playerField, (key, value) => {
      if (value === 'B')
        return false;

      const sensorDistance = sbMinDistance.get(key);
      const sensorPosX = parseInt(key.split(',')[0]);
      const sensorPosY = parseInt(key.split(',')[1]);
      const diffPos = sensorPosY - lineNumber;

      // Liegt der Sensor über oder unter der gewünschten Zeile?
      let lineContained = false;
      if (diffPos === 0) {
        // Punkt liegt auf der Zeile
        lineContained = true;
      } else if (diffPos > 0) {
        // Punkt liegt unterhalb
        lineContained = sensorPosY - sensorDistance <= lineNumber;
      } else {
        // Punkt liegt oberhalb
        lineContained = sensorPosY + sensorDistance >= lineNumber;
      }

      if (lineContained) {
        const stampKey = `${sensorPosX},${lineNumber}`;
        const counter = forbiddenCellCounter(sensorPosY, sensorDistance, lineNumber);
        for (let idx = 0; idx <= counter; idx += 1) {
          const charRight = playerField.get(`${sensorPosX + idx},${lineNumber}`);
          if (charRight !== 'B' && charRight !== 'S')
            resultMap.set(`${sensorPosX + idx},${lineNumber}`, '#');
          const charLeft = playerField.get(`${sensorPosX - idx},${lineNumber}`);
          if (charLeft !== 'B' && charLeft !== 'S')
            resultMap.set(`${sensorPosX - idx},${lineNumber}`, '#');
        }
        const playFieldValue = playerField.get(stampKey);
        if (playFieldValue !== 'B' && playFieldValue !== 'S')
          resultMap.set(`${sensorPosX},${lineNumber}`, '#');
      }

      return lineContained;
    });

    const sortResult = new Map([...resultMap.entries()].sort((a, b) => {
      return parseInt(a[0], 10) < parseInt(b[0], 10) ? -1 : 1;
    }));
    return resultMap.size;
  };

  const calcPartTwo = () => {

  };
  // endregion score calculation
  // region print out part one
  // y=10
  const demoScore = calcPartOne(demoData, 10);
  console.assert(demoScore === 26, `Algorithm is incorrect - expected: 26 calculated value: ${demoScore}`);
  console.log('Demo-Score (Part One)  -> 26 ===', demoScore);

  // y = 2000000
  const lifeScore = calcPartOne(data, 2000000,);
  console.log('Life-Score (Part One)  -> (???) 5299855 ===', lifeScore);
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

export default Logic15;
