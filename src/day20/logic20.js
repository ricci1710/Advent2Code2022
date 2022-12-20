import {MOCK_DATA_DAY_20} from "./data20";
import {MOCK_DEMO_DATA_DAY_20} from "./demo20";

const Logic20 = () => {
  // region prepare mock data
  let data = MOCK_DATA_DAY_20.split('\n');
  let demoData = MOCK_DEMO_DATA_DAY_20.split('\n');

  data = data.map(item => parseInt(item, 10));
  demoData = demoData.map(item => parseInt(item, 10));
  // endregion prepare mock data
  // region score rules
  // endregion score rules
  // region score calculation
  const calcPartOne = (values) => {
    const shiftArray = [...values];
    console.log(values, 'init');

    values.forEach(item => {
      let position = shiftArray.findIndex(shiftItem => shiftItem === item);
      shiftArray.splice(position, 1);
      if (position + item <= 0) {
        position = shiftArray.length + position + item;
        shiftArray.splice(position, 0, item);
      } else if (position + item >= shiftArray.length) {
        position = shiftArray.length - (position + item);
        shiftArray.splice(position, 0, item);
      } else
        shiftArray.splice(position + item, 0, item);
      console.log(shiftArray, item);
    });

    let shiftArrayClone = [...shiftArray];
    const first0Position = shiftArrayClone.findIndex(item => item === 0);

    while (shiftArrayClone.length < 3000 + first0Position) {
      shiftArrayClone = shiftArrayClone.concat(shiftArray);
    }

    const pos1000Value = shiftArrayClone[first0Position + 1000];
    const pos2000Value = shiftArrayClone[first0Position + 2000];
    const pos3000Value = shiftArrayClone[first0Position + 3000];

    return pos1000Value + pos2000Value + pos3000Value;
  };

  const calcPartTwo = () => {

  };
  // endregion score calculation
  // region print out part one
  const demoScore = calcPartOne(demoData);
  console.assert(demoScore === 3, `Algorithm is incorrect - expected: 3 calculated value: ${demoScore}`);
  console.log('Demo-Score (Part One)  -> 3 ===', demoScore);

  // const lifeScore = calcPartOne(data);
  // console.log('Life-Score (Part One)  -> (???) -5054 ===', lifeScore);
  // // endregion print out part one
  // // region print out part two
  // const demoScorePT = calcPartTwo();
  // console.assert(demoScorePT === 21, `Algorithm is incorrect - expected: 21 calculated value: ${demoScorePT}`);
  // console.log('Demo-Score (Part Two)  -> 25 ===', demoScorePT);
  //
  // const lifeScorePT = calcPartTwo();
  // console.log('Life-Score (Part Two)  -> (???) 2222 ===', lifeScorePT);
  // endregion print out part two
};

export default Logic20;
