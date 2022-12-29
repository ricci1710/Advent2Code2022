class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.moveCommand = new Map();
    this.moveCommand.set('<', () => this.moveLeft());
    this.moveCommand.set('>', () => this.moveRight());
    this.moveCommand.set('^', () => this.moveUp());
    this.moveCommand.set('v', () => this.moveDown());
  }

  get key() {
    return `${this.x},${this.y}`;
  }

  moveLeft() {
    this.x -= 1;
  }

  moveRight() {
    this.x += 1;
  }

  moveUp() {
    this.y -= 1;
  }

  moveDown() {
    this.y += 1;
  }

  move(direction) {
    this.moveCommand.get(direction)();
  }
}

export default Coordinate;