import {MOCK_DATA_DAY_10} from "./data10";
import {MOCK_DEMO_DATA_DAY_10} from "./demo10";

/**
 * --- Day 10: Cathode-Ray Tube ---
 * You avoid the ropes, plunge into the river, and swim to shore.
 *
 * The Elves yell something about meeting back up with them upriver, but the river is too loud to tell exactly what they're saying. They finish crossing the bridge and disappear from view.
 *
 * Situations like this must be why the Elves prioritized getting the communication system on your handheld device working. You pull it out of your pack, but the amount of water slowly draining from a big crack in its screen tells you it probably won't be of much immediate use.
 *
 * Unless, that is, you can design a replacement for the device's video system! It seems to be some kind of cathode-ray tube screen and simple CPU that are both driven by a precise clock circuit. The clock circuit ticks at a constant rate; each tick is called a cycle.
 *
 * Start by figuring out the signal being sent by the CPU. The CPU has a single register, X, which starts with the value 1. It supports only two instructions:
 *
 * addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
 * noop takes one cycle to complete. It has no other effect.
 * The CPU uses these instructions in a program (your puzzle input) to, somehow, tell the screen what to draw.
 *
 * Consider the following small program:
 *
 * noop
 * addx 3
 * addx -5
 * Execution of this program proceeds as follows:
 *
 * At the start of the first cycle, the noop instruction begins execution. During the first cycle, X is 1. After the first cycle, the noop instruction finishes execution, doing nothing.
 * At the start of the second cycle, the addx 3 instruction begins execution. During the second cycle, X is still 1.
 * During the third cycle, X is still 1. After the third cycle, the addx 3 instruction finishes execution, setting X to 4.
 * At the start of the fourth cycle, the addx -5 instruction begins execution. During the fourth cycle, X is still 4.
 * During the fifth cycle, X is still 4. After the fifth cycle, the addx -5 instruction finishes execution, setting X to -1.
 * Maybe you can learn something by looking at the value of the X register throughout execution. For now, consider the signal strength (the cycle number multiplied by the value of the X register) during the 20th cycle and every 40 cycles after that (that is, during the 20th, 60th, 100th, 140th, 180th, and 220th cycles).
 *
 * For example, consider this larger program:
 *
 * addx 15
 * addx -11
 * addx 6
 * addx -3
 * addx 5
 * addx -1
 * addx -8
 * addx 13
 * addx 4
 * noop
 * addx -1
 * addx 5
 * addx -1
 * addx 5
 * addx -1
 * addx 5
 * addx -1
 * addx 5
 * addx -1
 * addx -35
 * addx 1
 * addx 24
 * addx -19
 * addx 1
 * addx 16
 * addx -11
 * noop
 * noop
 * addx 21
 * addx -15
 * noop
 * noop
 * addx -3
 * addx 9
 * addx 1
 * addx -3
 * addx 8
 * addx 1
 * addx 5
 * noop
 * noop
 * noop
 * noop
 * noop
 * addx -36
 * noop
 * addx 1
 * addx 7
 * noop
 * noop
 * noop
 * addx 2
 * addx 6
 * noop
 * noop
 * noop
 * noop
 * noop
 * addx 1
 * noop
 * noop
 * addx 7
 * addx 1
 * noop
 * addx -13
 * addx 13
 * addx 7
 * noop
 * addx 1
 * addx -33
 * noop
 * noop
 * noop
 * addx 2
 * noop
 * noop
 * noop
 * addx 8
 * noop
 * addx -1
 * addx 2
 * addx 1
 * noop
 * addx 17
 * addx -9
 * addx 1
 * addx 1
 * addx -3
 * addx 11
 * noop
 * noop
 * addx 1
 * noop
 * addx 1
 * noop
 * noop
 * addx -13
 * addx -19
 * addx 1
 * addx 3
 * addx 26
 * addx -30
 * addx 12
 * addx -1
 * addx 3
 * addx 1
 * noop
 * noop
 * noop
 * addx -9
 * addx 18
 * addx 1
 * addx 2
 * noop
 * noop
 * addx 9
 * noop
 * noop
 * noop
 * addx -1
 * addx 2
 * addx -37
 * addx 1
 * addx 3
 * noop
 * addx 15
 * addx -21
 * addx 22
 * addx -6
 * addx 1
 * noop
 * addx 2
 * addx 1
 * noop
 * addx -10
 * noop
 * noop
 * addx 20
 * addx 1
 * addx 2
 * addx 2
 * addx -6
 * addx -11
 * noop
 * noop
 * noop
 * The interesting signal strengths can be determined as follows:
 *
 * During the 20th cycle, register X has the value 21, so the signal strength is 20 * 21 = 420. (The 20th cycle occurs in the middle of the second addx -1, so the value of register X is the starting value, 1, plus all of the other addx values up to that point: 1 + 15 - 11 + 6 - 3 + 5 - 1 - 8 + 13 + 4 = 21.)
 * During the 60th cycle, register X has the value 19, so the signal strength is 60 * 19 = 1140.
 * During the 100th cycle, register X has the value 18, so the signal strength is 100 * 18 = 1800.
 * During the 140th cycle, register X has the value 21, so the signal strength is 140 * 21 = 2940.
 * During the 180th cycle, register X has the value 16, so the signal strength is 180 * 16 = 2880.
 * During the 220th cycle, register X has the value 18, so the signal strength is 220 * 18 = 3960.
 * The sum of these signal strengths is 13140.
 *
 * Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?
 * @constructor
 */
const Logic10 = () => {
  // region prepare mock data
  const data = MOCK_DATA_DAY_10.split('\n');
  const demoData = MOCK_DEMO_DATA_DAY_10.split('\n');

  const demoDataExpected = new Map();
  demoDataExpected.set(20, 420);
  demoDataExpected.set(60, 1140);
  demoDataExpected.set(100, 1800);
  demoDataExpected.set(140, 2940);
  demoDataExpected.set(180, 2880);
  demoDataExpected.set(220, 3960);

  // endregion prepare mock data
  // region score rules
  // endregion score rules
  // region score calculation
  const calcPartOne = (values) => {
    let cycle = 0;
    let register = 1;

    let mapKey = 20;
    const cycleResults = new Map();

    values.forEach((item) => {
      cycle += item === 'noop' ? 1 : 2;
      if (cycle <= 20) {
        if (item !== 'noop') {
          const cmd = item.split(' ');
          register += parseInt(cmd[1], 10);
          cycleResults.set(mapKey, 20 * register);
        }
        // } else if (cycle <= 60) {
        //   const cycleCount = (cycle - 20) % 40;
        //   console.log('item:', item, cycleCount, cycle);
        //   if (item !== 'noop') {
        //     const cmd = item.split(' ');
        //     register += parseInt(cmd[1], 10);
        //     cycleResults.set(60, 60 * register);
        //   }
        // } else if (cycle <= 100) {
        //   const cycleCount = (cycle - 20) % 40;
        //   console.log('item:', item, cycleCount, cycle);
        //   if (item !== 'noop') {
        //     const cmd = item.split(' ');
        //     register += parseInt(cmd[1], 10);
        //     cycleResults.set(100, 100 * register);
        //   }
      } else {
        const cycleCount = (cycle - 20) % 40;
        if (cycleCount === 1)
          mapKey += 40;
        if (item !== 'noop') {
          const cmd = item.split(' ');
          register += parseInt(cmd[1], 10);
          cycleResults.set(mapKey, mapKey * register);
        }
      }
    });

    return cycleResults;
  };

  const calcPartTwo = () => {

  };
  // endregion score calculation
  // region print out part one
  const demoScore = calcPartOne(demoData);
  demoScore.forEach((value, key) => {
    console.assert(demoScore.get(key) === demoDataExpected.get(key), `Algorithm is incorrect - expected demoScore.get(${key}): ${demoDataExpected.get(key)} calculated value: ${demoScore.get(key)}`);
    console.log(`Demo-Score (Part One)  -> key(${key}): ${demoDataExpected.get(key)}  ===`, demoScore.get(key));
  });

  // const lifeScore = calcPartOne();
  // console.log('Life-Score (Part One)  -> (???) 1700 ===', lifeScore);
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

export default Logic10;