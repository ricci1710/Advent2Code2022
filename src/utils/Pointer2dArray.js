class Pointer2dArray {
  constructor() {
    this.pointer2dArray = new Map();
  }

  // Method
  set(x, y, value) {
    let xLine = this.pointer2dArray.get(y);
    if (!xLine)
      xLine = new Map();

    xLine.set(x, value);
    // ❎ ❌ ☑ ✔ ✴ ❇ ⚠ ✌ 🙏 👏 👍
    // ✅ When keys are NUMBERS
    // ✅ Sort Ascending (low to high)
    xLine = new Map([...xLine].sort((a, b) => a[0] - b[0]));
    // 👇️ {1 => 'one', 2 => 'two', 3 => 'three'}
    // 👉️ {'z' => 'three', 'b' => 'two', 'a' => 'one'}
    this.pointer2dArray.set(y, xLine);
    this.pointer2dArray = new Map([...this.pointer2dArray].sort((a, b) => a[0] - b[0]));
  }

  // Method
  get(x, y) {
    if (this.pointer2dArray.get(y))
      return this.pointer2dArray.get(y).get(x);
    return undefined;
  }

  xLineCount = (y) => {
    const xLine = this.pointer2dArray.get(y);
    return xLine ? xLine.size : 0;
  }

  xLineRange = (y) => {
    const xLine = this.pointer2dArray.get(y);
    const iterator = xLine.keys();
    let key;
    let min = 0;
    let max = 0;
    do {
      key = iterator.next().value;
      if (key !== undefined) {
        min = Math.min(min, key);
        max = Math.max(max, key);
      }
    } while (key !== undefined);

    return {min, max};
  }

  yLineCount = () => {
    return this.pointer2dArray.size;
  }

  printLine(y, emptyChar = '.') {
    let result = '';
    const xLine = this.pointer2dArray.get(y);
    if (!xLine)
      return '';

    const {min, max} = this.xLineRange(y)
    for (let idx = min; idx <= max; idx += 1) {
      const value = this.get(idx, y);
      result += value ? value : emptyChar;
    }
    return result;
  }
}

export default Pointer2dArray;
