import {MOCK_DATA_DAY_15} from "./data15";
import {MOCK_DEMO_DATA_DAY_15} from "./demo15";

const Logic15 = () => {
  // region prepare mock data
  const data = MOCK_DATA_DAY_15.split('\n');
  const demoData = MOCK_DEMO_DATA_DAY_15.split('\n');
  // endregion prepare mock data
  // region score rules
  // endregion score rules
  // region score calculation
  const calcPartOne = () => {

  };

  const calcPartTwo = () => {

  };
  // endregion score calculation
  // region print out part one
  const demoScore = calcPartOne();
  console.assert(demoScore === 21, `Algorithm is incorrect - expected: 21 calculated value: ${demoScore}`);
  console.log('Demo-Score (Part One)  -> 21 ===', demoScore);

  const lifeScore = calcPartOne();
  console.log('Life-Score (Part One)  -> (???) 1700 ===', lifeScore);
  // endregion print out part one
  // region print out part two
  const demoScorePT = calcPartTwo();
  console.assert(demoScorePT === 21, `Algorithm is incorrect - expected: 21 calculated value: ${demoScorePT}`);
  console.log('Demo-Score (Part Two)  -> 25 ===', demoScorePT);

  const lifeScorePT = calcPartTwo();
  console.log('Life-Score (Part Two)  -> (???) 2222 ===', lifeScorePT);
  // endregion print out part two
};

export default Logic15;
