class Array3d {
  constructor() {
    this.array3d = new Map();
  }

  // Method
  set(x, y, z, value) {
    let zMap;
    let yMap = this.array3d.get(x);

    if (yMap) {
      zMap = yMap.get(y);
      if (!zMap) {
        zMap = new Map();
      } else {
        yMap = new Map();
        zMap = new Map();
      }
      yMap.set(y, zMap.set(z, value));
      this.array3d.set(x, yMap);
    }
  }

  get(x, y, z) {
    const yMap = this.array3d.get(x);
    const zMap = yMap.get(y);
    return zMap.get(z);
  }
}

export default Array3d;