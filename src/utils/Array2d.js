class Array2d {
  constructor(size, fillValue = ' ') {
    if (typeof fillValue === 'string')
      this.array2d = new Array(size.y + 1).fill(fillValue).map(() => new Array(size.x + 1).fill(fillValue));
    else if (Array.isArray(fillValue)) {
      this.array2d = [];
      fillValue.forEach((rowLine) => {
        this.array2d.push(rowLine.split(''));
      });
    }
  }

  /**
   * Create a 2d array with a schema.
   * @param fillArray
   */
  fillWithArray(fillArray) {
    this.array2d = [...fillArray];
  }

  /**
   * Get the array size back.
   * @returns {{x: number, y: number}|{x: number, y: number}}
   */
  size() {
    return this.array2d && this.array2d[0] ? {x: this.array2d[0].length, y: this.array2d.length} : {x: 0, y: 0};
  }

  /**
   * Check x,y Position in range od 2d-array.
   * @param x x position
   * @param y y position
   * @returns {boolean}
   */
  inRange(x, y) {
    if (y >= this.array2d.length)
      return false;

    const rowLine = this.array2d[0];
    return x < rowLine.length
  }

  /**
   * Get the value of 2d-array.
   * @param x x position
   * @param y y position
   * @returns {any|undefined}
   */
  get(x, y) {
    return this.inRange(x, y) ? this.array2d[y][x] : undefined;
  }

  /**
   * Get the value of 2d-array.
   * @param x x position
   * @param y y position
   * @value Wert
   * @returns {any|undefined}
   */
  set(x, y, value) {
    if (this.inRange(x, y) === false)
      return;
    this.array2d[y][x] = value;
  }

  /**
   * Get the row array back.
   * @param row row
   * @returns {any[]|undefined}
   */
  getRowLine(row) {
    if (this.inRange(0, row) === false)
      return undefined;
    return this.array2d[row];
  }

  /**
   * Get the column array back.
   * @param column column
   * @returns {any[]|undefined}
   */
  getColumnLine(column) {
    if (this.inRange(column, 0) === false)
      return undefined;

    const columnLine = [];
    for (const rowLine of this.array2d) {
      columnLine.push(rowLine[column]);
    }
    return columnLine;
  }

  /**
   * Get the line array as string back.
   * @param line line array
   * @returns {string}
   */
  static lineToString(line) {
    let result = '';
    line.forEach(char => result += char);
    return result;
  }
}

export default Array2d;