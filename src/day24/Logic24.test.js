import {MOCK_DEMO_DATA_DAY_24} from "./demo24";
import Day24 from "./Day24";
import Array2d from "../utils/Array2d";

describe('Test Class Day24', () => {
  test('constructor', () => {
    const demoData = MOCK_DEMO_DATA_DAY_24.split('\n');
    const day24 = new Day24(demoData);

    expect(day24).toBeDefined();
    const size = day24.playBoard.size();
    expect(8).toEqual(size.x);
    expect(6).toEqual(size.y);
  });
  test('getRowLine', () => {
    const demoData = MOCK_DEMO_DATA_DAY_24.split('\n');
    const day24 = new Day24(demoData);
    const rowLine = day24.playBoard.getRowLine(4);
    expect(8).toEqual(rowLine.length);
    expect('#<^v^^>#').toEqual(Array2d.lineToString(rowLine));
  });
  test('getColumnLine', () => {
    const demoData = MOCK_DEMO_DATA_DAY_24.split('\n');
    const day24 = new Day24(demoData);
    const columnLine = day24.playBoard.getColumnLine(4);
    expect(6).toEqual(columnLine.length);
    expect('#<.>^#').toEqual(Array2d.lineToString(columnLine));
  });
});