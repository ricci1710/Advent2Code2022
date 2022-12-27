import Day25 from "./Day25";
import {MOCK_DEMO_DATA_DAY_25} from "./demo25";
import {MOCK_DATA_DAY_25} from "./data25";

describe('Test Class Day25', () => {
  test('constructor', () => {
    const demoData = MOCK_DEMO_DATA_DAY_25.split('\n');
    const day25 = new Day25(demoData);

    expect(day25).toBeDefined();
  });
  test('calcPartOne with demo data', () => {
    const demoData = MOCK_DEMO_DATA_DAY_25.split('\n');
    const day25 = new Day25(demoData);
    const result = day25.calcPartOne(demoData);
    expect('2=-1=0').toEqual(result);
  });

  test('calcPartOne with life data', () => {
    const lifeData = MOCK_DATA_DAY_25.split('\n');
    const day25 = new Day25(lifeData);
    const result = day25.calcPartOne(lifeData);
    // That's the right answer!
    expect('2=01-0-2-0=-0==-1=01').toEqual(result);
  });

  test('convertSNAFU2Decimal', () => {
    const demoData = MOCK_DEMO_DATA_DAY_25.split('\n');
    const day25 = new Day25(demoData);
    const sNAFU2Decimal = day25.SNAFU2Decimal;
    const decimal = day25.convertSNAFU2Decimal('1=-0-2');
    expect(sNAFU2Decimal.get('1=-0-2')).toEqual(decimal);
  });

  test('convertDecimal2SNAFU', () => {
    const demoData = MOCK_DEMO_DATA_DAY_25.split('\n');
    const day25 = new Day25(demoData);
    let snafu = day25.convertDecimal2SNAFU(314159265);
    expect('1121-1110-1=0').toEqual(snafu);   // '1-='
  });

  test('convert Decimal 2 SNAFU and back', () => {
    const demoData = MOCK_DEMO_DATA_DAY_25.split('\n');
    const day25 = new Day25(demoData);

    for (let num = 0; num < 10000; num += 1) {
      const snafu = day25.convertDecimal2SNAFU(num);
      const decimal = day25.convertSNAFU2Decimal(snafu);
      expect(num).toEqual(decimal);
    }
  });
});