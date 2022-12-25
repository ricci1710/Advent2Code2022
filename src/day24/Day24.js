import Array2d from "../utils/Array2d";
import MovePoint from "../utils/MovePoint";

/**
 * --- Day 24: Blizzard Basin ---
 * With everything replanted for next year (and with elephants and monkeys to tend the grove), you and the Elves leave
 * for the extraction point.
 *
 * Partway up the mountain that shields the grove is a flat, open area that serves as the extraction point. It's a bit
 * of a climb, but nothing the expedition can't handle.
 *
 * At least, that would normally be true; now that the mountain is covered in snow, things have become more difficult
 * than the Elves are used to.
 *
 * As the expedition reaches a valley that must be traversed to reach the extraction site, you find that strong,
 * turbulent winds are pushing small blizzards of snow and sharp ice around the valley. It's a good thing everyone
 * packed warm clothes! To make it across safely, you'll need to find a way to avoid them.
 *
 * Fortunately, it's easy to see all of this from the entrance to the valley, so you make a map of the valley and the
 * blizzards (your puzzle input). For example:
 *
 * #.#####
 * #.....#
 * #>....#
 * #.....#
 * #...v.#
 * #.....#
 * #####.#
 * The walls of the valley are drawn as #; everything else is ground. Clear ground - where there is currently no
 * blizzard - is drawn as .. Otherwise, blizzards are drawn with an arrow indicating their direction of motion:
 * up (^), down (v), left (<), or right (>).
 *
 * The above map includes two blizzards, one moving right (>) and one moving down (v). In one minute, each blizzard
 * moves one position in the direction it is pointing:
 *
 * #.#####
 * #.....#
 * #.>...#
 * #.....#
 * #.....#
 * #...v.#
 * #####.#
 * Due to conservation of blizzard energy, as a blizzard reaches the wall of the valley, a new blizzard forms on the
 * opposite side of the valley moving in the same direction. After another minute, the bottom downward-moving blizzard
 * has been replaced with a new downward-moving blizzard at the top of the valley instead:
 *
 * #.#####
 * #...v.#
 * #..>..#
 * #.....#
 * #.....#
 * #.....#
 * #####.#
 * Because blizzards are made of tiny snowflakes, they pass right through each other. After another minute, both
 * blizzards temporarily occupy the same position, marked 2:
 *
 * #.#####
 * #.....#
 * #...2.#
 * #.....#
 * #.....#
 * #.....#
 * #####.#
 * After another minute, the situation resolves itself, giving each blizzard back its personal space:
 *
 * #.#####
 * #.....#
 * #....>#
 * #...v.#
 * #.....#
 * #.....#
 * #####.#
 * Finally, after yet another minute, the rightward-facing blizzard on the right is replaced with a new one on the left
 * facing the same direction:
 *
 * #.#####
 * #.....#
 * #>....#
 * #.....#
 * #...v.#
 * #.....#
 * #####.#
 * This process repeats at least as long as you are observing it, but probably forever.
 *
 * Here is a more complex example:
 *
 * #.######
 * #>>.<^<#
 * #.<..<<#
 * #>v.><>#
 * #<^v^^>#
 * ######.#
 * Your expedition begins in the only non-wall position in the top row and needs to reach the only non-wall position
 * in the bottom row. On each minute, you can move up, down, left, or right, or you can wait in place. You and the
 * blizzards act simultaneously, and you cannot share a position with a blizzard.
 *
 * In the above example, the fastest way to reach your goal requires 18 steps. Drawing the position of the expedition
 * as E, one way to achieve this is:
 *
 * Initial state:
 * #E######
 * #>>.<^<#
 * #.<..<<#
 * #>v.><>#
 * #<^v^^>#
 * ######.#
 *
 * Minute 1, move down:
 * #.######
 * #E>3.<.#
 * #<..<<.#
 * #>2.22.#
 * #>v..^<#
 * ######.#
 *
 * Minute 2, move down:
 * #.######
 * #.2>2..#
 * #E^22^<#
 * #.>2.^>#
 * #.>..<.#
 * ######.#
 *
 * Minute 3, wait:
 * #.######
 * #<^<22.#
 * #E2<.2.#
 * #><2>..#
 * #..><..#
 * ######.#
 *
 * Minute 4, move up:
 * #.######
 * #E<..22#
 * #<<.<..#
 * #<2.>>.#
 * #.^22^.#
 * ######.#
 *
 * Minute 5, move right:
 * #.######
 * #2Ev.<>#
 * #<.<..<#
 * #.^>^22#
 * #.2..2.#
 * ######.#
 *
 * Minute 6, move right:
 * #.######
 * #>2E<.<#
 * #.2v^2<#
 * #>..>2>#
 * #<....>#
 * ######.#
 *
 * Minute 7, move down:
 * #.######
 * #.22^2.#
 * #<vE<2.#
 * #>>v<>.#
 * #>....<#
 * ######.#
 *
 * Minute 8, move left:
 * #.######
 * #.<>2^.#
 * #.E<<.<#
 * #.22..>#
 * #.2v^2.#
 * ######.#
 *
 * Minute 9, move up:
 * #.######
 * #<E2>>.#
 * #.<<.<.#
 * #>2>2^.#
 * #.v><^.#
 * ######.#
 *
 * Minute 10, move right:
 * #.######
 * #.2E.>2#
 * #<2v2^.#
 * #<>.>2.#
 * #..<>..#
 * ######.#
 *
 * Minute 11, wait:
 * #.######
 * #2^E^2>#
 * #<v<.^<#
 * #..2.>2#
 * #.<..>.#
 * ######.#
 *
 * Minute 12, move down:
 * #.######
 * #>>.<^<#
 * #.<E.<<#
 * #>v.><>#
 * #<^v^^>#
 * ######.#
 *
 * Minute 13, move down:
 * #.######
 * #.>3.<.#
 * #<..<<.#
 * #>2E22.#
 * #>v..^<#
 * ######.#
 *
 * Minute 14, move right:
 * #.######
 * #.2>2..#
 * #.^22^<#
 * #.>2E^>#
 * #.>..<.#
 * ######.#
 *
 * Minute 15, move right:
 * #.######
 * #<^<22.#
 * #.2<.2.#
 * #><2>E.#
 * #..><..#
 * ######.#
 *
 * Minute 16, move right:
 * #.######
 * #.<..22#
 * #<<.<..#
 * #<2.>>E#
 * #.^22^.#
 * ######.#
 *
 * Minute 17, move down:
 * #.######
 * #2.v.<>#
 * #<.<..<#
 * #.^>^22#
 * #.2..2E#
 * ######.#
 *
 * Minute 18, move down:
 * #.######
 * #>2.<.<#
 * #.2v^2<#
 * #>..>2>#
 * #<....>#
 * ######E#
 *
 * What is the fewest number of minutes required to avoid the blizzards and reach the goal?
 *
 */
class Day24 {
  constructor(values) {
    this.player = {x: 1, y: 0};
    this.playBoard = new Array2d({x: 0, y: 0}, values);
    this.blizzards = this.initBlizzards();
  }

  initBlizzards() {
    const blizzards = new Map();
    const size = this.playBoard.size();

    for (let y = 0; y < size.y; y += 1) {
      for (let x = 0; x < size.x; x += 1) {
        const char = this.playBoard.get(x, y);
        if (char === '<' || char === '>' || char === '^' || char === 'v')
          blizzards.set(`${x},${y}`, {point: {x, y}, char});
      }
    }

    return blizzards;
  }

  moveLeft(steps, wayPoint, line) {
    const reverseLine = line.reverse();
    wayPoint.column = line.length - 1 - wayPoint.column;
    Day24.moveRight(steps, wayPoint, reverseLine);
    wayPoint.column = line.length - 1 - wayPoint.column;
    return false;
  }

  moveRight(position) {

  }

  movUp(steps, wayPoint, line) {
    // row--
    Day24.moveLeft(steps, wayPoint, line);
    return false;
  }

  moveDown(steps, wayPoint, line) {
    // row++
    Day24.moveRight(steps, wayPoint, line);
    return false;
  }

  move(position, direction) {
    const playBoardSize = this.playBoard.size();
    switch (direction) {
      case '<':
        return MovePoint.moveLeft(position, playBoardSize.x - 1); // -1 Mauer am Rand
      case '>':
        return MovePoint.moveRight(position, playBoardSize.x - 1);
      case 'v':
        return MovePoint.moveDown(position, playBoardSize.y - 1);
      case '^':
        return MovePoint.moveUp(position, playBoardSize.y - 1);
      default:
        break;
    }
    return undefined;
  }

  calcNewPositionBlizzards() {
    for (let [key, value] of this.blizzards) {
      const {point: position, char} = value;
      const point = this.move(position, char);
      this.blizzards.set(key, {point, char});
    }
  }

  createPlayerBoard() {
    const size = this.playBoard.size();
    this.playBoard = new Array2d(size, '.');
    const rowWall = Array2d.initArray(size.x, '#');
    const columnWall = Array2d.initArray(size.y, '#');
    this.playBoard.fillRowLine(0, rowWall);
    this.playBoard.fillRowLine(size.x - 1, rowWall);
    this.playBoard.fillColumnLine(0, columnWall);
    this.playBoard.fillColumnLine(size.y - 1, columnWall);
    console.log(this.playBoard);
  }

  movePlayer() {
    const upChar = this.playBoard.get(this.player.x, this.player.y - 1);
    const downChar = this.playBoard.get(this.player.x, this.player.y + 1);
    const leftChar = this.playBoard.get(this.player.x - 1, this.player.y);
    const rightChar = this.playBoard.get(this.player.x + 1, this.player.y);
  }

  calcPartOne() {
    let gameOver = false;
    while (gameOver === false) {
      // Blizzards bewegen
      this.calcNewPositionBlizzards();
      // Spielbrett neu aufbauen
      this.createPlayerBoard();
      // Player bewegen
      this.movePlayer();
      // Prüfen auf Game Over
      gameOver = true; // (this.player.y === playBoardSize.y - 2 && this.player.x === playBoardSize.x - 2);
    }
    return 0;
  }

  calcPartTwo() {
    return 0;
  }
}

export default Day24;