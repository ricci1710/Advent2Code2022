import { useState } from 'react';
import { MOCK_DATA_DAY_02 } from './data02';
import { MOCK_DEMO_DATA_DAY_02 } from './demo02';

/**
 * --- Day 2: Rock Paper Scissors ---
 * --- Part One ---
 * The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, a giant Rock Paper Scissors tournament is already in progress.
 *
 * Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.
 *
 * Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they say will be sure to help you win. "The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent.
 *
 * The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors. Winning every time would be suspicious, so the responses must have been carefully chosen.
 *
 * The winner of the whole tournament is the player with the highest score. Your total score is the sum of your scores for each round. The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
 *
 * Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get if you were to follow the strategy guide.
 *
 * @example
 * Suppose you were given the following strategy guide:
 *
 * Points: 1 for Rock, 2 for Paper, and 3 for Scissors
 * A for Rock, B for Paper, and C for Scissors
 * X for Rock, Y for Paper, and Z for Scissors
 * <b>Score for the shape you selected:</b>
 *  (1 for Rock, 2 for Paper, and 3 for Scissors) plus
 *  (0 if you lost, 3 if the round was a draw, and 6 if you won).
 *
 * A Y
 * B X
 * C Z
 * This strategy guide predicts and recommends the following:
 *
 * In the first round, your opponent will choose Rock (A), and you should choose Paper (Y). This ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you won).
 * In the second round, your opponent will choose Paper (B), and you should choose Rock (X). This ends in a loss for you with a score of 1 (1 + 0).
 * The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = 6.
 * In this example, if you were to follow the strategy guide, you would get a total score of 15 (8 + 1 + 6).
 * Stone,Stone = u | Stone,Paper = s, Stone,Scissors = n
 * => win ist  A Y |   + 8
 *             B Z |   + 9
 *             C X     + 7
 * => draw ist A X |   + 4
 *             B Y |   + 5
 *             C Z     + 6
 * => loose:   B X |   + 1
 *             C Y |   + 2
 *             A Z     + 3
 *
 * --- Part Two ---
 * The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"
 *
 * The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:
 *
 * In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
 * In the second round, your opponent will choose Paper (B), and you choose Rock, so you lose (X) with a score of 1 + 0 = 1.
 * In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
 * Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.
 *
 * What would your total score be if everything goes exactly according to your strategy guide?
 */
const Logic02 = () => {
  // region prepare mock data
  const [data] = useState( MOCK_DATA_DAY_02.split('\n'));
  const [demoData] = useState( MOCK_DEMO_DATA_DAY_02.split('\n'));
  // endregion prepare mock data
  // region score rules
  const scoreTableWin = new Map();
  scoreTableWin.set('A Y', 8);
  scoreTableWin.set('B Z', 9);
  scoreTableWin.set('C X', 7);

  const scoreTableDraw = new Map();
  scoreTableDraw.set('A X', 4);
  scoreTableDraw.set('B Y', 5);
  scoreTableDraw.set('C Z', 6);

  scoreTableDraw.set('A A', 4);
  scoreTableDraw.set('B B', 5);
  scoreTableDraw.set('C C', 6);

  const scoreTableLose = new Map();
  scoreTableLose.set('B X', 1);
  scoreTableLose.set('C Y', 2);
  scoreTableLose.set('A Z', 3);
  // endregion score rules
  // region score calculation
  /**
   * Calculate the Score with the rules.
   * @param item value etc. 'A Y'
   * @returns {number}
   */
  const calcScore = (item) => {
    let result;

    const winScore = scoreTableWin.get(item);
    if (winScore !== undefined)
      result = winScore;
    else {
      const drawScore = scoreTableDraw.get(item);
      if (drawScore !== undefined)
        result = drawScore;
      else
        result = scoreTableLose.get(item);
    }

    return result;
  }

  /**
   * Stone, Paper, Scissors: Rules part one.
   * @param value Array of player rounds
   * @returns {number}
   */
  const calcScorePartOne = (value) => {
    let score = 0;
    value.forEach((item) => {
      score += calcScore(item);
    });
    return score;
  }

  /**
   * Stone, Paper, Scissors: Rules part two.
   * @param value Array of player rounds
   * @returns {number}
   */
  const calcScorePartTwo = (value) => {
    let score = 0;
    value.forEach((item) => {
      const ruleItem = prepareRulesPartTwo(item);
      score += calcScore(ruleItem);
    });
    return score;
  }
  /**
   * New Rule: X means you need to lose
   *           Y means you need to end the round in a draw
   *           Z means you need to win
   * @param item Item of player rounds etc. 'A Y'
   * @returns {string}
   */
  const prepareRulesPartTwo = (item) => {
    let ruleItem;
    const elfChose = item.split(' ')[0];
    const playChose = item.split(' ')[1];

      switch (playChose) {
        case 'Y': // you need to end the round in a draw
          ruleItem = elfChose + ' ' + elfChose;
          break;
        case 'Z':
          if (elfChose === 'A') // you need to win
            ruleItem = 'A Y';
          else if (elfChose === 'B')
            ruleItem = 'B Z';
          else
            ruleItem = 'C X';
          break;
        default:  // you need to lose
          if (elfChose === 'A') // you need to win
            ruleItem = 'A Z';
          else if (elfChose === 'B')
            ruleItem = 'B X';
          else
            ruleItem = 'C Y';
          break;
      }
    return ruleItem;
  }
  // endregion score calculation
  // region print out part one
  const demoScore = calcScorePartOne(demoData);
  console.log('Demo-Score (Part One)  -> 15 ===', demoScore);

  const score = calcScorePartOne(data);
  console.log('Score  (Part One)  -> 11873 ===', score);
  // endregion print out part one
  // region print out part two
  const demoScorePT = calcScorePartTwo(demoData);
  console.log('Demo-Score (Part Two)  -> 12 ===', demoScorePT);

  const scorePT = calcScorePartTwo(data);
  console.log('Score  (Part Two) -> 12014 ===', scorePT);
  // endregion print out part two
};

export default Logic02;
