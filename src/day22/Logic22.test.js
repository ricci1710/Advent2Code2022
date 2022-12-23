import {MOCK_DEMO_DATA_DAY_22} from "./demo22";
import Day22 from "./Day22";

describe('Test Move', () => {
  test('Right stop on #', () => {
    const wayPoint = {row: 0, column: 8};
    const line = '        >..#'.split('');
    Day22.moveRight(10, wayPoint, line);
    expect(wayPoint.row).toEqual(0);
    expect(wayPoint.column).toEqual(10);
  });

  test('Right shift on next .', () => {
    const wayPoint = {row: 0, column: 10};
    const line = '........#.>.'.split('');
    Day22.moveRight(5, wayPoint, line);
    expect(wayPoint.row).toEqual(0);
    expect(wayPoint.column).toEqual(3);
  });

  test('Right shift on next #', () => {
    const wayPoint = {row: 0, column: 10};
    const line = '#.......#.>.'.split('');
    Day22.moveRight(5, wayPoint, line);
    expect(wayPoint.row).toEqual(0);
    expect(wayPoint.column).toEqual(11);
  });

  test('Left stop on #', () => {
    const wayPoint = {row: 0, column: 11};
    const line = '        #..<'.split('');
    Day22.moveLeft(5, wayPoint, line);
    expect(wayPoint.row).toEqual(0);
    expect(wayPoint.column).toEqual(9);
  });

  test('Left shift on next .', () => {
    const wayPoint = {row: 0, column: 1};
    const line = '.<....#.....'.split('');
    Day22.moveLeft(5, wayPoint, line);
    expect(wayPoint.row).toEqual(0);
    expect(wayPoint.column).toEqual(8);
  });

  test('Left shift on next #', () => {
    const wayPoint = {row: 0, column: 1};
    const line = '.<....#....#'.split('');
    Day22.moveLeft(5, wayPoint, line);
    expect(wayPoint.row).toEqual(0);
    expect(wayPoint.column).toEqual(0);
  });

  test('Left shift with reverse', () => {
    const wayPoint = {row: 0, column: 11};
    const line = '        #..<'.split('');
    Day22.moveLeft(5, wayPoint, line);
    expect(wayPoint.row).toEqual(0);
    expect(wayPoint.column).toEqual(9);
  });

  test('Down', () => {
    // expect(linkElement).toBeInTheDocument();
  });
});
describe('Test Class Day22', () => {
  test('initPlayground', () => {
    const demoData = MOCK_DEMO_DATA_DAY_22.split('\n');
    const day22 = new Day22(demoData);

    expect(day22).toBeDefined();
    const {wayPoint, commands, playBoard} = day22.initPlayground();
    expect(wayPoint.row).toEqual(0);
    expect(wayPoint.column).toEqual(8);
    expect(commands.length).toEqual(15);
    // Zeilen
    expect(playBoard.length).toEqual(12);
  });

  test('getColumnLine', () => {
    const demoData = MOCK_DEMO_DATA_DAY_22.split('\n');
    const day22 = new Day22(demoData);
    const {playBoard} = day22.initPlayground();
    const columnLine = Day22.getColumnLine(2, playBoard);
    expect(' , , , ,.,.,#,., , , , ').toEqual(columnLine.toString());
  });
});