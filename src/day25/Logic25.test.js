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
    // expect('2=-1=0').toEqual(result);
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
    let snafu = day25.convertDecimal2SNAFU(3);
    expect(day25.decimal2SNAFU.get(3)).toEqual(snafu);
    snafu = day25.convertDecimal2SNAFU(4);
    expect(day25.decimal2SNAFU.get(4)).toEqual(snafu);
    snafu = day25.convertDecimal2SNAFU(5);
    expect(day25.decimal2SNAFU.get(5)).toEqual(snafu);
    snafu = day25.convertDecimal2SNAFU(6);
    expect(day25.decimal2SNAFU.get(6)).toEqual(snafu);
    snafu = day25.convertDecimal2SNAFU(8);
    expect(day25.decimal2SNAFU.get(8)).toEqual(snafu);
    snafu = day25.convertDecimal2SNAFU(13);
    expect(day25.decimal2SNAFU.get(13)).toEqual(snafu);
    snafu = day25.convertDecimal2SNAFU(15);
    expect(day25.decimal2SNAFU.get(15)).toEqual(snafu);
    snafu = day25.convertDecimal2SNAFU(1747);
    expect('1=-0-2').toEqual(snafu);
  });
});