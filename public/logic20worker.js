onmessage = function (e) {
  const values = e.data[0];
  const decryptionKey = e.data[1];
  const isDemoData = e.data[2];

  const shiftArray = [...values];
  // console.log(values, 'init');
  for (let round = 0; round < 10; round++) {
    console.log('round:', round);
    values.forEach(item => {
      //console.log(item);
      let position = shiftArray.findIndex(shiftItem => shiftItem === item);
      shiftArray.splice(position, 1);
      const shiftPos = item.val * decryptionKey;
      if (position + shiftPos <= 0) {
        position = position + shiftPos;
        while (position < 0)
          position += shiftArray.length;
        shiftArray.splice(position, 0, item);
      } else if (position + shiftPos >= shiftArray.length) {
        position = (position + shiftPos);
        while (position >= shiftArray.length)
          position -= shiftArray.length;
        shiftArray.splice(position, 0, item);
      } else
        shiftArray.splice(position + item.val, 0, item);
      // console.log(shiftArray, item);
    });
  }

  let shiftArrayClone = [...shiftArray];
  //const test = shiftArrayClone.filter((item) => typeof item !== 'object');
  //console.assert(test.length === 0, `Algorithm is incorrect - expected: 0 calculated value: ${test.length}`);

  const first0Position = shiftArrayClone.findIndex(item => item.val === 0);
  while (shiftArrayClone.length < 3000 + first0Position) {
    shiftArrayClone = shiftArrayClone.concat(shiftArray);
  }

  const pos1000Value = shiftArrayClone[first0Position + 1000].val * decryptionKey;
  const pos2000Value = shiftArrayClone[first0Position + 2000].val * decryptionKey;
  const pos3000Value = shiftArrayClone[first0Position + 3000].val * decryptionKey;

  //console.log(pos1000Value + pos2000Value + pos3000Value);
  postMessage({score: pos1000Value + pos2000Value + pos3000Value, isDemoData});
}
