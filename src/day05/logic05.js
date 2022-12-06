import {useState} from 'react';
import {MOCK_DATA_DAY_05} from "./data05";
import {MOCK_DEMO_DATA_DAY_05} from "./demo05";

/**
 * --- Day 5: Supply Stacks ---
 * The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.
 *
 * The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.
 *
 * The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.
 *
 * They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:
 *
 *     [D]
 * [N] [C]
 * [Z] [M] [P]
 *  1   2   3
 *
 * move 1 from 2 to 1
 * move 3 from 1 to 3
 * move 2 from 2 to 1
 * move 1 from 1 to 2
 * In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.
 *
 * Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack. In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:
 *
 * [D]
 * [N] [C]
 * [Z] [M] [P]
 *  1   2   3
 * In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:
 *
 *         [Z]
 *         [N]
 *     [C] [D]
 *     [M] [P]
 *  1   2   3
 * Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:
 *
 *         [Z]
 *         [N]
 * [M]     [D]
 * [C]     [P]
 *  1   2   3
 * Finally, one crate is moved from stack 1 to stack 2:
 *
 *         [Z]
 *         [N]
 *         [D]
 * [C] [M] [P]
 *  1   2   3
 * The Elves just need to know which crate will end up on top of each stack; in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3, so you should combine these together and give the Elves the message CMZ.
 *
 * After the rearrangement procedure completes, what crate ends up on top of each stack?
 *
 * --- Part Two ---
 * As you watch the crane operator expertly rearrange the crates, you notice the process isn't following your prediction.
 *
 * Some mud was covering the writing on the side of the crane, and you quickly wipe it away. The crane isn't a CrateMover 9000 - it's a CrateMover 9001.
 *
 * The CrateMover 9001 is notable for many new and exciting features: air conditioning, leather seats, an extra cup holder, and the ability to pick up and move multiple crates at once.
 *
 * Again considering the example above, the crates begin in the same configuration:
 *
 *     [D]
 * [N] [C]
 * [Z] [M] [P]
 *  1   2   3
 * Moving a single crate from stack 2 to stack 1 behaves the same as before:
 *
 * [D]
 * [N] [C]
 * [Z] [M] [P]
 *  1   2   3
 * However, the action of moving three crates from stack 1 to stack 3 means that those three moved crates stay in the same order, resulting in this new configuration:
 *
 *         [D]
 *         [N]
 *     [C] [Z]
 *     [M] [P]
 *  1   2   3
 * Next, as both crates are moved from stack 2 to stack 1, they retain their order as well:
 *
 *         [D]
 *         [N]
 * [C]     [Z]
 * [M]     [P]
 *  1   2   3
 * Finally, a single crate is still moved from stack 1 to stack 2, but now it's crate C that gets moved:
 *
 *         [D]
 *         [N]
 *         [Z]
 * [M] [C] [P]
 *  1   2   3
 * In this example, the CrateMover 9001 has put the crates in a totally different order: MCD.
 *
 * Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the final supplies. After the rearrangement procedure completes, what crate ends up on top of each stack?
 *
 * @constructor
 */
const Logic05 = () => {
  // region prepare mock data
  const [data] = useState(MOCK_DATA_DAY_05.split('\n'));
  const [demoData] = useState(MOCK_DEMO_DATA_DAY_05.split('\n'));
  // console.log('demoData:', demoData);

  const fillCrateStack = (item, stackStorage) => {
    const arrayCount = (item.length - 2) / 3;
    for (let i = 0; i < arrayCount; i += 1) {
      let stack = stackStorage.get(i);
      if (stack === undefined)
        stack = [];

      const stackItem = item.substring(i * 4, i * 4 + 3).trim();
      if (stackItem.length && isNaN(parseInt(stackItem, 10)))
        stack.push(stackItem);

      stackStorage.set(i, stack);
    }
  };
  const createMoveCommands = (rawData) => {
    let emptyStringCounter = 0;
    return rawData.filter((item) => {
      if (emptyStringCounter === 2)
        return true;

      if (item.length === 0)
        emptyStringCounter += 1;

      return false;
    });
  };
  const createCrateStack = (rawData) => {
    let emptyStringCounter = 0;
    const stackStorage = new Map();

    for (const item of rawData) {
      if (emptyStringCounter === 2)
        break;

      if (item.length === 0)
        emptyStringCounter += 1;
      else
        fillCrateStack(item, stackStorage);
    }

    return stackStorage;
  };

  const demoCrateStack = createCrateStack(demoData);
  const demoMoveCommands = createMoveCommands(demoData);
  console.assert(demoCrateStack.get(0).length === 2, `Algorithm is incorrect - expected: 2 calculated value: ${demoCrateStack.get(0).length}`);
  console.assert(demoCrateStack.get(1).length === 3, `Algorithm is incorrect - expected: 3 calculated value: ${demoCrateStack.get(1).length}`);
  console.assert(demoCrateStack.get(2).length === 1, `Algorithm is incorrect - expected: 1 calculated value: ${demoCrateStack.get(2).length}`);
  console.assert(demoMoveCommands.length === 4, `Algorithm is incorrect - expected: 4 calculated value: ${demoMoveCommands.length}`);

  const dataCrateStack = createCrateStack(data);
  const dataMoveCommands = createMoveCommands(data);

  console.assert(dataMoveCommands.length === 501, `Algorithm is incorrect - expected: 501 calculated value: ${dataMoveCommands.length}`);
  // endregion prepare mock data
  // region score rules
  // endregion score rules
  // region score calculation
  const calcPartOne = (moveCommands, stackStorage, crateMoverModel = '9000') => {
    let result = '';
    moveCommands.forEach(moveItem => {
      // moveItem => move 3 from 1 to 3
      const partOfMoveItems = moveItem.split(' ');
      const count = partOfMoveItems[1];

      const offset = -1; // wir start with index 0
      const fromStackNr = parseInt(partOfMoveItems[3], 10) + offset;
      const toStackNr = parseInt(partOfMoveItems[5], 10) + offset;

      const fromStorage = stackStorage.get(fromStackNr);
      const toStorage = stackStorage.get(toStackNr);

      let newToStorage = fromStorage.splice(0, count);
      if (crateMoverModel === '9000')
        newToStorage = newToStorage.reverse();

      newToStorage = newToStorage.concat(toStorage);
      stackStorage.set(toStackNr, newToStorage);
    })

    for (const value of stackStorage.values()) {
      let char = value.reverse().pop();
      if (char === undefined)
        continue;

      char = char.replace('[', '');
      char = char.replace(']', '');
      result += char;
    }
    return result;
  };
  const calcPartTwo = (moveCommands, stackStorage) => calcPartOne(moveCommands, stackStorage, '9001');
  // endregion score calculation
  // region print out part one
  const demoScore = calcPartOne(demoMoveCommands, demoCrateStack);
  console.assert(demoScore === 'CMZ', `Algorithm is incorrect - expected: 'CMZ' calculated value: ${demoScore}`);
  console.log('Demo-Score (Part One)  -> CMZ ===', demoScore);
  const score = calcPartOne(dataMoveCommands, dataCrateStack);
  console.log('Score (Part One)  -> ??? (PSNRGBTFT) ===', score);
  // endregion print out part one
  // region print out part two
  const demoCrateStackPart2 = createCrateStack(demoData);
  const demoMoveCommandsPart2 = createMoveCommands(demoData);
  const demoScorePT = calcPartTwo(demoMoveCommandsPart2, demoCrateStackPart2);
  console.assert(demoScorePT === 'MCD', `Algorithm is incorrect - expected: 'MCD calculated value: ${demoScorePT}`);
  console.log('Demo-Score (Part Two)  -> MCD ===', demoScorePT);

  const dataCrateStackPart2 = createCrateStack(data);
  const dataMoveCommandsPart2 = createMoveCommands(data);
  const scorePT = calcPartTwo(dataMoveCommandsPart2, dataCrateStackPart2);
  console.log('Score (Part Two)  -> ???(BNTZFPMMW) ===', scorePT);
  // endregion print out part two
};

export default Logic05;
