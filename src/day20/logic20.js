import {MOCK_DATA_DAY_20} from "./data20";
import {MOCK_DEMO_DATA_DAY_20} from "./demo20";

/**
 * --- Day 20: Grove Positioning System ---
 * It's finally time to meet back up with the Elves. When you try to contact them, however, you get no reply. Perhaps
 * you're out of range?
 *
 * You know they're headed to the grove where the star fruit grows, so if you can figure out where that is, you should
 * be able to meet back up with them.
 *
 * Fortunately, your handheld device has a file (your puzzle input) that contains the grove's coordinates!
 * Unfortunately, the file is encrypted - just in case the device were to fall into the wrong hands.
 *
 * Maybe you can decrypt it?
 *
 * When you were still back at the camp, you overheard some Elves talking about coordinate file encryption. The main
 * operation involved in decrypting the file is called mixing.
 *
 * The encrypted file is a list of numbers. To mix the file, move each number forward or backward in the file a number
 * of positions equal to the value of the number being moved. The list is circular, so moving a number off one end of
 * the list wraps back around to the other end as if the ends were connected.
 *
 * For example, to move the 1 in a sequence like 4, 5, 6, 1, 7, 8, 9, the 1 moves one position
 * forward: 4, 5, 6, 7, 1, 8, 9. To move the -2 in a sequence like 4, -2, 5, 6, 7, 8, 9, the -2 moves two positions
 * backward, wrapping around: 4, 5, 6, 7, 8, -2, 9.
 *
 * The numbers should be moved in the order they originally appear in the encrypted file. Numbers moving around during
 * the mixing process do not change the order in which the numbers are moved.
 *
 * Consider this encrypted file:
 *
 * 1
 * 2
 * -3
 * 3
 * -2
 * 0
 * 4
 * Mixing this file proceeds as follows:
 *
 * Initial arrangement:
 * 1, 2, -3, 3, -2, 0, 4
 *
 * 1 moves between 2 and -3:
 * 2, 1, -3, 3, -2, 0, 4
 *
 * 2 moves between -3 and 3:
 * 1, -3, 2, 3, -2, 0, 4
 *
 * -3 moves between -2 and 0:
 * 1, 2, 3, -2, -3, 0, 4
 *
 * 3 moves between 0 and 4:
 * 1, 2, -2, -3, 0, 3, 4
 *
 * -2 moves between 4 and 1:
 * 1, 2, -3, 0, 3, 4, -2
 *
 * 0 does not move:
 * 1, 2, -3, 0, 3, 4, -2
 *
 * 4 moves between -3 and 0:
 * 1, 2, -3, 4, 0, 3, -2
 * Then, the grove coordinates can be found by looking at the 1000th, 2000th, and 3000th numbers after the value 0,
 * wrapping around the list as necessary. In the above example, the 1000th number after 0 is 4, the 2000th is -3, and
 * the 3000th is 2; adding these together produces 3.
 *
 * Mix your encrypted file exactly once. What is the sum of the three numbers that form the grove coordinates?
 *
 * Your puzzle answer was 2827.
 *
 * The first half of this puzzle is complete! It provides one gold star: *
 *
 * --- Part Two ---
 * The grove coordinate values seem nonsensical. While you ponder the mysteries of Elf encryption, you suddenly remember
 * the rest of the decryption routine you overheard back at camp.
 *
 * First, you need to apply the decryption key, 811589153. Multiply each number by the decryption key before you begin;
 * this will produce the actual list of numbers to mix.
 *
 * Second, you need to mix the list of numbers ten times. The order in which the numbers are mixed does not change
 * during mixing; the numbers are still moved in the order they appeared in the original, pre-mixed list.
 * (So, if -3 appears fourth in the original list of numbers to mix, -3 will be the fourth number to move during each
 * round of mixing.)
 *
 * Using the same example as above:
 *
 * Initial arrangement:
 * 811589153, 1623178306, -2434767459, 2434767459, -1623178306, 0, 3246356612
 *
 * After 1 round of mixing:
 * 0, -2434767459, 3246356612, -1623178306, 2434767459, 1623178306, 811589153
 *
 * After 2 rounds of mixing:
 * 0, 2434767459, 1623178306, 3246356612, -2434767459, -1623178306, 811589153
 *
 * After 3 rounds of mixing:
 * 0, 811589153, 2434767459, 3246356612, 1623178306, -1623178306, -2434767459
 *
 * After 4 rounds of mixing:
 * 0, 1623178306, -2434767459, 811589153, 2434767459, 3246356612, -1623178306
 *
 * After 5 rounds of mixing:
 * 0, 811589153, -1623178306, 1623178306, -2434767459, 3246356612, 2434767459
 *
 * After 6 rounds of mixing:
 * 0, 811589153, -1623178306, 3246356612, -2434767459, 1623178306, 2434767459
 *
 * After 7 rounds of mixing:
 * 0, -2434767459, 2434767459, 1623178306, -1623178306, 811589153, 3246356612
 *
 * After 8 rounds of mixing:
 * 0, 1623178306, 3246356612, 811589153, -2434767459, 2434767459, -1623178306
 *
 * After 9 rounds of mixing:
 * 0, 811589153, 1623178306, -2434767459, 3246356612, 2434767459, -1623178306
 *
 * After 10 rounds of mixing:
 * 0, -2434767459, 1623178306, 3246356612, -1623178306, 2434767459, 811589153
 * The grove coordinates can still be found in the same way. Here, the 1000th number after 0 is 811589153, the 2000th
 * is 2434767459, and the 3000th is -1623178306; adding these together produces 1623178306.
 *
 * Apply the decryption key and mix your encrypted file ten times. What is the sum of the three numbers that form the
 * grove coordinates?
 * @constructor
 */
const Logic20 = () => {
  // region prepare mock data
  let data = MOCK_DATA_DAY_20.split('\n');
  let demoData = MOCK_DEMO_DATA_DAY_20.split('\n');

  data = data.map(item => {
    return {
      val: parseInt(item, 10)
    };
  });
  demoData = demoData.map(item => {
    return {
      val: parseInt(item, 10)
    };
  });
  // endregion prepare mock data
  // region score rules
  const decryptionKey = 811589153;
  // endregion score rules
  // region score calculation
  const calcPartOne = (values) => {
    const shiftArray = [...values];
    // console.log(values, 'init');
    values.forEach(item => {
      //console.log(item);
      let position = shiftArray.findIndex(shiftItem => shiftItem === item);
      shiftArray.splice(position, 1);
      if (position + item.val <= 0) {
        position = position + item.val;
        while (position < 0)
          position += shiftArray.length;
        shiftArray.splice(position, 0, item);
      } else if (position + item.val >= shiftArray.length) {
        position = (position + item.val);
        while (position >= shiftArray.length)
          position -= shiftArray.length;
        shiftArray.splice(position, 0, item);
      } else
        shiftArray.splice(position + item.val, 0, item);
    });

    let shiftArrayClone = [...shiftArray];
    const first0Position = shiftArrayClone.findIndex(item => item.val === 0);
    while (shiftArrayClone.length < 3000 + first0Position) {
      shiftArrayClone = shiftArrayClone.concat(shiftArray);
    }

    const pos1000Value = shiftArrayClone[first0Position + 1000].val;
    const pos2000Value = shiftArrayClone[first0Position + 2000].val;
    const pos3000Value = shiftArrayClone[first0Position + 3000].val;

    return pos1000Value + pos2000Value + pos3000Value;
  };
  // endregion score calculation
  // region print out part one
  const demoScore = calcPartOne(demoData);
  console.assert(demoScore === 3, `Algorithm is incorrect - expected: 3 calculated value: ${demoScore}`);
  console.log('Demo-Score (Part One)  -> 3 ===', demoScore);

  const lifeScore = calcPartOne(data);
  console.log('Life-Score (Part One)  -> (???) 2827 ===', lifeScore);
  // endregion print out part one
  // region print out part two
  const logic20worker = new Worker('logic20worker.js');
  logic20worker.onmessage = function (event) {
    const {score, isDemoData} = event.data;
    if (isDemoData) {
      console.assert(score === 1623178306, `Algorithm is incorrect - expected: 1623178306 calculated value: ${score}`);
      console.log('Demo-Score (Part Two)  -> 1623178306 ===', score);
    } else {
      console.log('Life-Score (Part Two)  -> (???) 7834270093909 ===', score);
    }
  };
  logic20worker.postMessage([demoData, decryptionKey, true]);
  logic20worker.postMessage([data, decryptionKey, false]);
  // endregion print out part two
};

export default Logic20;
