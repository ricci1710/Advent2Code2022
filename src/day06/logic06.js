import {MOCK_DATA_DAY_06} from "./data06";
import {MOCK_DEMO_DATA_DAY_06} from "./demo06";

/**
 * --- Day 6: Tuning Trouble ---
 * The preparations are finally complete; you and the Elves leave camp on foot and begin to make your way toward the star fruit grove.
 *
 * As you move through the dense undergrowth, one of the Elves gives you a handheld device. He says that it has many fancy features, but the most important one to set up right now is the communication system.
 *
 * However, because he's heard you have significant experience dealing with signal-based systems, he convinced the other Elves that it would be okay to give you their one malfunctioning device - surely you'll have no problem fixing it.
 *
 * As if inspired by comedic timing, the device emits a few colorful sparks.
 *
 * To be able to communicate with the Elves, the device needs to lock on to their signal. The signal is a series of seemingly-random characters that the device receives one at a time.
 *
 * To fix the communication system, you need to add a subroutine to the device that detects a start-of-packet marker in the datastream. In the protocol being used by the Elves, the start of a packet is indicated by a sequence of four characters that are all different.
 *
 * The device will send your subroutine a datastream buffer (your puzzle input); your subroutine needs to identify the first position where the four most recently received characters were all different. Specifically, it needs to report the number of characters from the beginning of the buffer to the end of the first such four-character marker.
 *
 * For example, suppose you receive the following datastream buffer:
 *
 * mjqjpqmgbljsphdztnvjfqwrcgsmlb
 * After the first three characters (mjq) have been received, there haven't been enough characters received yet to find the marker. The first time a marker could occur is after the fourth character is received, making the most recent four characters mjqj. Because j is repeated, this isn't a marker.
 *
 * The first time a marker appears is after the seventh character arrives. Once it does, the last four characters received are jpqm, which are all different. In this case, your subroutine should report the value 7, because the first start-of-packet marker is complete after 7 characters have been processed.
 *
 * Here are a few more examples:
 *
 * bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
 * nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
 * nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
 * zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11
 * How many characters need to be processed before the first start-of-packet marker is detected?
 *
 * --- Part Two ---
 * Your device's communication system is correctly detecting packets, but still isn't working. It looks like it also needs to look for messages.
 *
 * A start-of-message marker is just like a start-of-packet marker, except it consists of 14 distinct characters rather than 4.
 *
 * Here are the first positions of start-of-message markers for all of the above examples:
 *
 * mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 19
 * bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 23
 * nppdvjthqldpwncqszvftbrmjlhg: first marker after character 23
 * nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 29
 * zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 26
 * How many characters need to be processed before the first start-of-message marker is detected?
 *
 */
const Logic06 = () => {
  // region prepare mock data
  const data = MOCK_DATA_DAY_06;
  const demoData = MOCK_DEMO_DATA_DAY_06;
  // endregion prepare mock data
  // region score rules
  // endregion score rules
  // region score calculation
  const calcPartOne = (value, distinctLetters = 4) => {
    let endPos = 0;
    for (let startPos = 0; startPos < value.length; startPos += 1) {
      let found = false;
      endPos = startPos + distinctLetters;
      const sequence = value.substring(startPos, endPos);
      for (let idx = 0; idx < sequence.length - 1; idx += 1) {
        const letter = sequence.charAt(idx);
        found = sequence.indexOf(letter, idx + 1) !== -1;
        if (!found)
          continue;
        break;
      }

      if (found)
        continue;

      break;
    }

    return endPos;
  };
  const calcPartTwo = (value) => calcPartOne(value, 14);

  // endregion score calculation
  // region print out part one
  const demoScore = calcPartOne(demoData);
  console.assert(demoScore === 7, `Algorithm is incorrect - expected: 7 calculated value: ${demoScore}`);
  console.log('Demo-Score (Part One)  -> 7 ===', demoScore);
  console.assert(calcPartOne('bvwbjplbgvbhsrlpgdmjqwftvncz') === 5, `Algorithm is incorrect - expected: 5 calculated value: ${calcPartOne('bvwbjplbgvbhsrlpgdmjqwftvncz')}`);
  console.assert(calcPartOne('nppdvjthqldpwncqszvftbrmjlhg') === 6, `Algorithm is incorrect - expected: 6 calculated value: ${calcPartOne('nppdvjthqldpwncqszvftbrmjlhg')}`);
  console.assert(calcPartOne('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg') === 10, `Algorithm is incorrect - expected: 10 calculated value: ${calcPartOne('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')}`);
  console.assert(calcPartOne('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw') === 11, `Algorithm is incorrect - expected: 11 calculated value: ${calcPartOne('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')}`);

  const score = calcPartOne(data);
  console.log('Score (Part One)  -> ??? (1816) ===', score);
  // endregion print out part one
  // region print out part two
  const demoScorePT = calcPartTwo(demoData);
  console.assert(demoScorePT === 19, `Algorithm is incorrect - expected: 19 calculated value: ${demoScorePT}`);
  console.log('Demo-Score (Part Two)  -> 19 ===', demoScorePT);
  console.assert(calcPartTwo('bvwbjplbgvbhsrlpgdmjqwftvncz') === 23, `Algorithm is incorrect - expected: 23 calculated value: ${calcPartOne('bvwbjplbgvbhsrlpgdmjqwftvncz')}`);
  console.assert(calcPartTwo('nppdvjthqldpwncqszvftbrmjlhg') === 23, `Algorithm is incorrect - expected: 23 calculated value: ${calcPartOne('nppdvjthqldpwncqszvftbrmjlhg')}`);
  console.assert(calcPartTwo('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg') === 29, `Algorithm is incorrect - expected: 29 calculated value: ${calcPartOne('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')}`);
  console.assert(calcPartTwo('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw') === 26, `Algorithm is incorrect - expected: 26 calculated value: ${calcPartOne('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')}`);

  const scorePT = calcPartTwo(data);
  console.log('Score (Part Two)  -> ???(2625) ===', scorePT);
  // endregion print out part two
};

export default Logic06;
