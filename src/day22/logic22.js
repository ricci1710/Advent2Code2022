import {MOCK_DATA_DAY_22} from "./data22";
import {MOCK_DEMO_DATA_DAY_22} from "./demo22";

/**
 * --- Day 22: Monkey Map ---
 * The monkeys take you on a surprisingly easy trail through the jungle. They're even going in roughly the right direction according to your handheld device's Grove Positioning System.
 *
 * As you walk, the monkeys explain that the grove is protected by a force field. To pass through the force field, you have to enter a password; doing so involves tracing a specific path on a strangely-shaped board.
 *
 * At least, you're pretty sure that's what you have to do; the elephants aren't exactly fluent in monkey.
 *
 * The monkeys give you notes that they took when they last saw the password entered (your puzzle input).
 *
 * For example:
 *
 *         ...#
 *         .#..
 *         #...
 *         ....
 * ...#.......#
 * ........#...
 * ..#....#....
 * ..........#.
 *         ...#....
 *         .....#..
 *         .#......
 *         ......#.
 *
 * 10R5L5R10L4R5L5
 * The first half of the monkeys' notes is a map of the board. It is comprised of a set of open tiles (on which you can
 * move, drawn .) and solid walls (tiles which you cannot enter, drawn #).
 *
 * The second half is a description of the path you must follow. It consists of alternating numbers and letters:
 *
 * A number indicates the number of tiles to move in the direction you are facing. If you run into a wall, you stop
 * moving forward and continue with the next instruction.
 * A letter indicates whether to turn 90 degrees clockwise (R) or counterclockwise (L). Turning happens in-place; it
 * does not change your current tile.
 * So, a path like 10R5 means "go forward 10 tiles, then turn clockwise 90 degrees, then go forward 5 tiles".
 *
 * You begin the path in the leftmost open tile of the top row of tiles. Initially, you are facing to the right (from
 * the perspective of how the map is drawn).
 *
 * If a movement instruction would take you off of the map, you wrap around to the other side of the board. In other
 * words, if your next tile is off of the board, you should instead look in the direction opposite of your current
 * facing as far as you can until you find the opposite edge of the board, then reappear there.
 *
 * For example, if you are at A and facing to the right, the tile in front of you is marked B; if you are at C and
 * facing down, the tile in front of you is marked D:
 *
 *         ...#
 *         .#..
 *         #...
 *         ....
 * ...#.D.....#
 * ........#...
 * B.#....#...A
 * .....C....#.
 *         ...#....
 *         .....#..
 *         .#......
 *         ......#.
 * It is possible for the next tile (after wrapping around) to be a wall; this still counts as there being a wall in
 * front of you, and so movement stops before you actually wrap to the other side of the board.
 *
 * By drawing the last facing you had with an arrow on each tile you visit, the full path taken by the above example
 * looks like this:
 *
 *         >>v#
 *         .#v.
 *         #.v.
 *         ..v.
 * ...#...v..v#
 * >>>v...>#.>>
 * ..#v...#....
 * ...>>>>v..#.
 *         ...#....
 *         .....#..
 *         .#......
 *         ......#.
 * To finish providing the password to this strange input device, you need to determine numbers for your final row,
 * column, and facing as your final position appears from the perspective of the original map. Rows start from 1 at
 * the top and count downward; columns start from 1 at the left and count rightward. (In the above example, row 1,
 * column 1 refers to the empty space with no tile on it in the top-left corner.) Facing is 0 for right (>), 1 for
 * down (v), 2 for left (<), and 3 for up (^). The final password is the sum of 1000 times the row, 4 times the column,
 * and the facing.
 *
 * In the above example, the final row is 6, the final column is 8, and the final facing is 0. So, the final password
 * is 1000 * 6 + 4 * 8 + 0: 6032.
 *
 * Follow the path given in the monkeys' notes. What is the final password?
 *
 * @constructor
 */
const Logic22 = () => {
  // region prepare mock data
  const data = MOCK_DATA_DAY_22.split('\n');
  const demoData = MOCK_DEMO_DATA_DAY_22.split('\n');
  // endregion prepare mock data
  // region score rules
  /**
   * Eine Zahl gibt die Anzahl der Steine an, die Sie in die Richtung bewegen müssen, in die Sie schauen. Wenn Sie
   * gegen eine Wand laufen, hören Sie auf, sich vorwärts zu bewegen, und fahren mit der nächsten Anweisung fort.
   *
   * Ein Buchstabe gibt an, ob Sie sich um 90 Grad im Uhrzeigersinn (R) oder gegen den Uhrzeigersinn (L) drehen müssen.
   * Die Drehung erfolgt an Ort und Stelle; sie verändert nicht das aktuelle Plättchen.
   *
   * Wenn eine Bewegungsanweisung Sie vom Spielplan wegführen würde, gehen Sie auf die andere Seite des Spielbretts
   * über. Mit anderen Worten: Wenn Ihr nächstes Plättchen außerhalb des Spielfelds liegt, sollten Sie stattdessen so
   * weit wie möglich in die entgegengesetzte Richtung schauen, bis Sie den gegenüberliegenden Rand des Spielfelds
   * gefunden haben, und dann dort wieder auftauchen.
   *
   * Es ist möglich, dass das nächste Plättchen (nach dem Umwickeln) eine Wand ist; dies zählt immer noch als eine Wand
   * vor Ihnen, und so stoppt die Bewegung, bevor Sie tatsächlich auf die andere Seite des Brettes wechseln.
   */
  const intPlayground = (values) => {
    const wayPoint = {row: 0, column: 0};
    const playBoard = [];
    for (const item of values) {
      if (item.length === 0)
        break;
      const playLine = item.split('');
      playBoard.push(playLine);
    }

    wayPoint.column = playBoard[0].indexOf('.');
    const commands = values[values.length - 1];
    return {wayPoint, commands, playBoard};
  };
  const parseCommandLine = (commandLine) => {
    let lPosition = 0;
    let rPosition = 0;
    let calcPosition = 0;
    let indexStart = 0;
    let steps = '';
    let stepCmd = '';

    const commandTable = [];
    while (indexStart < commandLine.length) {
      rPosition = commandLine.indexOf('R', indexStart);
      lPosition = commandLine.indexOf('L', indexStart);
      if (rPosition === -1 && lPosition === -1) {
        steps = commandLine.substring(indexStart, commandLine.length);
        commandTable.push(steps);
        calcPosition = commandLine.length;
      } else {
        if (rPosition === -1)
          rPosition = Number.MAX_VALUE;
        if (lPosition === -1)
          lPosition = Number.MAX_VALUE;

        calcPosition = Math.min(rPosition, lPosition);
        steps = commandLine.substring(indexStart, calcPosition);
        stepCmd = commandLine.substring(calcPosition, calcPosition + 1);
        commandTable.push(steps, stepCmd);

      }
      indexStart = calcPosition + 1;
    }
    console.assert(commandLine[commandLine.length] === commandTable[commandTable.length], `Algorithm is incorrect - expected: ${commandLine[commandLine.length]} calculated value: ${commandTable[commandTable.length]}`)
    return commandTable;
  };
  // endregion score rules
  // region score calculation
  const calcPartOne = (values) => {
    const {wayPoint, commands, playBoard} = intPlayground(values);
    const commandTable = parseCommandLine(commands);
    //console.log(wayPoint, commands, playBoard, commandTable);

    let gameOver = false;
    let cmdIndex = 0;
    while (gameOver === false) {
      const cmd = commandTable[cmdIndex];
      cmdIndex += 1;

      if (cmdIndex === commandTable.length)
        gameOver = true;
    }
    return 0;
  };

  const calcPartTwo = (values) => {
    return 0;
  };
  // endregion score calculation
  // region print out part one
  const demoScore = calcPartOne(demoData);
  console.assert(demoScore === 21, `Algorithm is incorrect - expected: 21 calculated value: ${demoScore}`);
  console.log('Demo-Score (Part One)  -> 21 ===', demoScore);

  const lifeScore = calcPartOne(data);
  console.log('Life-Score (Part One)  -> (???) 1700 ===', lifeScore);
  // endregion print out part one
  // region print out part two
  //const demoScorePT = calcPartTwo();
  //console.assert(demoScorePT === 21, `Algorithm is incorrect - expected: 21 calculated value: ${demoScorePT}`);
  //console.log('Demo-Score (Part Two)  -> 25 ===', demoScorePT);

  //const lifeScorePT = calcPartTwo();
  //console.log('Life-Score (Part Two)  -> (???) 2222 ===', lifeScorePT);
  // endregion print out part two
};

export default Logic22;
