import {useState} from 'react';
import {MOCK_DATA_DAY_03} from './data03';
import {MOCK_DEMO_DATA_DAY_03} from './demo03';

/**
 * --- Day 3: Rucksack Reorganization ---
 * --- Part One ---
 * One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.
 *
 * Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.
 *
 * The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).
 *
 * The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items in the second compartment.
 *
 * For example, suppose you have the following list of contents from six rucksacks:
 *
 * vJrwpWtwJgWrhcsFMMfFFhFp
 * jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
 * PmmdzqPrVvPwwTWBwg
 * wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
 * ttgJtRGJQctTZtZT
 * CrZsJsPPZsGzwwsLwLmpwMDw
 * The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its first compartment contains the items vJrwpWtwJgWr, while the second compartment contains the items hcsFMMfFFhFp. The only item type that appears in both compartments is lowercase p.
 * The second rucksack's compartments contain jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both compartments is uppercase L.
 * The third rucksack's compartments contain PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.
 * The fourth rucksack's compartments only share item type v.
 * The fifth rucksack's compartments only share item type t.
 * The sixth rucksack's compartments only share item type s.
 * To help prioritize item rearrangement, every item type can be converted to a priority:
 *
 * Lowercase item types a through z have priorities 1 through 26.
 * Uppercase item types A through Z have priorities 27 through 52.
 * In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.
 *
 * Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
 *
 * --- Part Two ---
 * As you finish identifying the misplaced items, the Elves come to you with another issue.
 *
 * For safety, the Elves are divided into groups of three. Every Elf carries a badge that identifies their group. For efficiency, within each group of three Elves, the badge is the only item type carried by all three Elves. That is, if a group's badge is item type B, then all three Elves will have item type B somewhere in their rucksack, and at most two of the Elves will be carrying any other item type.
 *
 * The problem is that someone forgot to put this year's updated authenticity sticker on the badges. All of the badges need to be pulled out of the rucksacks so the new authenticity stickers can be attached.
 *
 * Additionally, nobody wrote down which item type corresponds to each group's badges. The only way to tell which item type is the right one is by finding the one item type that is common between all three Elves in each group.
 *
 * Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example, the first group's rucksacks are the first three lines:
 *
 * vJrwpWtwJgWrhcsFMMfFFhFp
 * jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
 * PmmdzqPrVvPwwTWBwg
 * And the second group's rucksacks are the next three lines:
 *
 * wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
 * ttgJtRGJQctTZtZT
 * CrZsJsPPZsGzwwsLwLmpwMDw
 * In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.
 *
 * Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z) for the second group. The sum of these is 70.
 *
 * Find the item type that corresponds to the badges of each three-Elf group.
 * What is the sum of the priorities of those item types?
 *
 * @constructor
 */
const Logic03 = () => {
  // region prepare mock data
  const [data] = useState(MOCK_DATA_DAY_03.split('\n'));
  const [demoData] = useState(MOCK_DEMO_DATA_DAY_03.split('\n'));
  // endregion prepare mock data
  // region score rules
  const priorityMap = new Map();
  /**
   * Rules:
   * - Lowercase item types a through z have priorities 1 through 26.
   * - Uppercase item types A through Z have priorities 27 through 52.
   * @param intValue
   * @param uppercase
   * @returns {string}
   */
  const intToChar = (intValue, uppercase = true) => {
    // 👇️ for Uppercase letters, replace `a` with `A`
    let code = uppercase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
    // -1 because we start our loop from number 1.
    return String.fromCharCode(code + intValue - 1);
  };

  // Lowercase item types a through z have priorities 1 through 26.
  for (let priority = 1; priority <= 26; priority = priority + 1) {
    const char = intToChar(priority, false);
    priorityMap.set(char, priority);
  }
  // Uppercase item types A through Z have priorities 27 through 52.
  for (let priority = 1; priority <= 26; priority = priority + 1) {
    const char = intToChar(priority);
    priorityMap.set(char, 26 + priority);
  }
  // console.log(priorityMap);

  const chunkSize = 3;
  const demoChunks = [];
  for (let i = 0; i < demoData.length; i += chunkSize) {
    const chunk = demoData.slice(i, i + chunkSize);
    demoChunks.push(chunk);
  }
  console.assert(demoChunks.length === 2, `Algorithm is incorrect - expected: 2 calculated value: ${demoChunks.length}`);
  console.assert(demoChunks[0].length === 3, `Algorithm is incorrect - expected: 2 calculated value: ${demoChunks[0].length}`);
  console.assert(demoChunks[1].length === 3, `Algorithm is incorrect - expected: 2 calculated value: ${demoChunks[1].length}`);

  const dataChunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    dataChunks.push(chunk);
  }
  console.assert(dataChunks.length === data.length / 3, `Algorithm is incorrect - expected: ${data.length / 3} calculated value: ${dataChunks.length}`);
  // region
  // endregion score rules
  // region score calculation
  const calcPartOne = (valueAsArray) => {
    let result = 0;
    valueAsArray.forEach((item) => {
      const middlePos = item.length / 2;
      const backpackPartOne = Array.from(item.substring(0, middlePos));
      const backpackPartTwo = Array.from(item.substring(middlePos, item.length));

      const intersection = backpackPartOne.filter(x => backpackPartTwo.includes(x));
      result += priorityMap.get(intersection[0]);
    });

    return result;
  };

  const calcPartTwo = (valueAsArray) => {
    let result = 0;
    valueAsArray.forEach((item) => {
      const groupOne = Array.from(item[0]);
      const groupTwo = Array.from(item[1]);
      const groupThree = Array.from(item[2]);

      const intersection = groupOne.filter(x => groupTwo.includes(x));
      const intersection1 = intersection.filter(x => groupThree.includes(x));

      result += priorityMap.get(intersection1[0]);
    });

    return result;
  };
  // endregion score calculation
  // region print out part one
  const demoScore = calcPartOne(demoData);
  console.assert(demoScore === 157, `Algorithm is incorrect - expected: 157 calculated value: ${demoScore}`);
  console.log('Demo-Score (Part One)  -> 157 ===', demoScore);
  const score = calcPartOne(data);
  console.log('Score (Part One)  -> ??? ===', score);
  // endregion print out part one
  // region print out part two
  const demoScorePT = calcPartTwo(demoChunks);
  console.assert(demoScorePT === 70, `Algorithm is incorrect - expected: 157 calculated value: ${demoScorePT}`);
  console.log('Demo-Score (Part Two)  -> 70 ===', demoScorePT);
  const scorePT = calcPartTwo(dataChunks);
  console.log('Score (Part Two)  -> ??? ===', scorePT);
  // endregion print out part two
};

export default Logic03;
