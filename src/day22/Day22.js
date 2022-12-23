class Day22 {
  constructor(values) {
    this.dataStore = values;
    this.rotationMap = new Map();
    this.rotationMap.set('>R', 'v');
    this.rotationMap.set('vR', '<');
    this.rotationMap.set('<R', '^');
    this.rotationMap.set('^R', '>');
    this.rotationMap.set('>L', '^');
    this.rotationMap.set('^L', '<');
    this.rotationMap.set('<L', 'v');
    this.rotationMap.set('vL', '>');
  }

  initPlayground() {
    const wayPoint = {row: 0, column: 0};
    const playBoard = [];
    for (const item of this.dataStore) {
      if (item.length === 0)
        break;
      const playLine = item.split('');
      playBoard.push(playLine);
    }

    wayPoint.column = playBoard[0].indexOf('.');
    const commands = this.dataStore[this.dataStore.length - 1];
    return {wayPoint, commands, playBoard};
  }

  rotatePlayer(player, cmd) {
    return this.rotationMap.get(player + cmd);
  }

  static parseCommandLine(commandLine) {
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
  }

  static getColumnLine(column, playBoard) {
    const columnLine = [];
    for (const rowLine of playBoard) {
      if (column === rowLine.length)
        columnLine.push(' ');
      else
        columnLine.push(rowLine[column]);
    }
    return columnLine;
  }

  static moveLeft(steps, wayPoint, line) {
    const reverseLine = line.reverse();
    wayPoint.column = line.length - 1 - wayPoint.column;
    Day22.moveRight(steps, wayPoint, reverseLine);
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
    Day22.moveLeft(steps, wayPoint, line);
    return false;
  }

  static moveDown(steps, wayPoint, line) {
    // row++
    Day22.moveRight(steps, wayPoint, line);
    return false;
  }

  calcPartOne() {
    const {wayPoint, commands, playBoard} = this.initPlayground();
    const commandTable = Day22.parseCommandLine(commands);
    //console.log(wayPoint, commands, playBoard, commandTable);

    let gameOver = false;
    let cmdIndex = 0;
    let player = '>';

    while (gameOver === false) {
      const cmd = commandTable[cmdIndex];
      cmdIndex += 1;

      if (cmd === 'R' || cmd === 'L') {
        // rotate player
        player = this.rotatePlayer(player, cmd);
      } else {
        const line = playBoard[wayPoint.row];
        // move player
        switch (player) {
          case '>':
            gameOver = Day22.moveRight(cmd, wayPoint, line);
            break;
          case '<':
            gameOver = Day22.moveLeft(cmd, wayPoint, line);
            break;
          case '^':
            gameOver = Day22.movUp(cmd, wayPoint, playBoard);
            break;
          case 'v':
            gameOver = Day22.moveDown(cmd, wayPoint, playBoard)
            break;
          default:
            break;
        }
      }

      if (cmdIndex === commandTable.length)
        gameOver = true;
    }
    return 0;
  }

  calcPartTwo() {
    return 0;
  }
}

export default Day22;