import Pointer2dArray from "./Pointer2dArray";

const initArray = () => {
  const pointer2dArray = new Pointer2dArray();
  pointer2dArray.set(0, 0, '#');
  pointer2dArray.set(5, 5, '#');
  pointer2dArray.set(-5, 5, '#');
  pointer2dArray.set(5, -5, '#');
  return pointer2dArray;
};
describe('Test class Pointer2dArray', () => {
  test('get()', () => {
    let pointer2dArray = new Pointer2dArray();
    expect(pointer2dArray.get(0, 0)).toBeUndefined();

    pointer2dArray = initArray();
    expect(pointer2dArray.get(0, 0)).toEqual('#');
    expect(pointer2dArray.get(5, 5)).toEqual('#');
    expect(pointer2dArray.get(-5, 5)).toEqual('#');
    expect(pointer2dArray.get(5, -5)).toEqual('#');
  });
  test('xLineCount()', () => {
    const pointer2dArray = initArray();
    expect(pointer2dArray.xLineCount(5)).toEqual(2);
  });
  test('yLineCount()', () => {
    const pointer2dArray = initArray();
    expect(pointer2dArray.yLineCount()).toEqual(3);
  });
  test('xLineRange()', () => {
    const pointer2dArray = initArray();
    const {min, max} = pointer2dArray.xLineRange(5);
    expect(min).toEqual(-5);
    expect(max).toEqual(5);
  });
  test('printLine()', () => {
    const pointer2dArray = initArray();
    const lineTxt = pointer2dArray.printLine(5);
    expect(lineTxt.length).toEqual('#.........#'.length);
    expect(lineTxt).toEqual('#.........#');
  });
});
