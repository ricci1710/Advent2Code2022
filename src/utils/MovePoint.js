class MovePoint {
  static moveLeft(point, maxPosition) {
    point.x === 0 ? point.x = maxPosition - 1 : point.x -= 1;
    return point;
  }

  static moveRight(point, maxPosition) {
    point.x === maxPosition ? point.x = 0 : point.x += 1;
    return point;
  }

  static moveUp(point, maxPosition) {
    point.y === 0 ? point.y = maxPosition - 1 : point.y -= 1;
    return point;
  }

  static moveDown(point, maxPosition) {
    point.y === maxPosition ? point.y = 0 : point.y += 1;
    return point;
  }
}

export default MovePoint;