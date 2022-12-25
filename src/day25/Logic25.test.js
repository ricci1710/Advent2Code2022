import Day25 from "./Day25";
import {MOCK_DEMO_DATA_DAY_25} from "./demo25";

describe('Test Class Day25', () => {
  test('constructor', () => {
    const demoData = MOCK_DEMO_DATA_DAY_25.split('\n');
    const day25 = new Day25(demoData);

    expect(day25).toBeDefined();
  });
  test('calcPartOne', () => {
    const demoData = MOCK_DEMO_DATA_DAY_25.split('\n');
    const day25 = new Day25(demoData);
    const result = day25.calcPartOne(demoData);

    expect(day25).toBeDefined();
    expect('2=-1=0').toEqual(result);
  });
});