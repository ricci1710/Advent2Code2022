import Day09 from "./Day09";

describe('Test Class Day25', () => {
  test('constructor', () => {
    const day25 = new Day09();
    expect(day25).toBeDefined();
  });

  test('calcPartOne demo data', () => {
    const day09 = new Day09();
    const demoScore = day09.calcPartOne();
    expect(demoScore).toEqual(13);
  });
});
