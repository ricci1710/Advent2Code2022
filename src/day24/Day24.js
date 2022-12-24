import Array2d from "../utils/Array2d";

class Day24 {
  constructor(values) {
    this.playBoard = new Array2d({x: 0, y: 0}, values);

  }

  initPlayground() {

  }

  static moveLeft(steps, wayPoint, line) {
    const reverseLine = line.reverse();
    wayPoint.column = line.length - 1 - wayPoint.column;
    Day24.moveRight(steps, wayPoint, reverseLine);
    wayPoint.column = line.length - 1 - wayPoint.column;
    return false;
  }

  static moveRight(steps, wayPoint, line) {
    let char;
    for (let idx = 1; idx <= steps; idx += 1) {
      // Überlauf rechts?
      if (wayPoint.column + 1 === line.length) {
        // Bestimme den Anfang der Zeile
        const lineStartPos1 = line.indexOf('.'); // => suche erste . oder #
        const lineStartPos2 = line.indexOf('#');
        if (lineStartPos2 < lineStartPos1)
          break; // # an erster Stelle => Abbruch

        // Punkt an erster Stelle.
        char = line[lineStartPos1];
        wayPoint.column = lineStartPos1 - 1;
      } else
        char = line[wayPoint.column + 1];

      if (char === '#')
        break;
      else if (char === '.')
        wayPoint.column += 1;
    }
    return false;
  }

  static movUp(steps, wayPoint, line) {
    // row--
    Day24.moveLeft(steps, wayPoint, line);
    return false;
  }

  static moveDown(steps, wayPoint, line) {
    // row++
    Day24.moveRight(steps, wayPoint, line);
    return false;
  }

  calcPartOne() {
    const {wayPoint, commands, playBoard} = this.initPlayground();
    return 0;
  }

  calcPartTwo() {
    return 0;
  }
}

export default Day24;