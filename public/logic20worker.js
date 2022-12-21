onmessage = function (e) {
  const values = e.data[0];
  const decryptionKey = e.data[1];
  const isDemoData = e.data[2];

  const shiftArray = [...values];
  for (let round = 0; round < 10; round++) {
    values.forEach(item => {
      let position = shiftArray.findIndex(shiftItem => shiftItem === item);
      shiftArray.splice(position, 1);
      const shiftPos = item.val * decryptionKey;
      if (position + shiftPos <= 0) {
        position = (position + shiftPos) % shiftArray.length;
        if (position < 0)
          position += shiftArray.length;
        shiftArray.splice(position, 0, item);
      } else if (position + shiftPos >= shiftArray.length) {
        position = (position + shiftPos) % shiftArray.length;
        shiftArray.splice(position, 0, item);
      } else
        shiftArray.splice(position + item.val, 0, item);
    });
  }

  let shiftArrayClone = [...shiftArray];

  const first0Position = shiftArrayClone.findIndex(item => item.val === 0);
  while (shiftArrayClone.length < 3000 + first0Position) {
    shiftArrayClone = shiftArrayClone.concat(shiftArray);
  }

  const pos1000Value = shiftArrayClone[first0Position + 1000].val * decryptionKey;
  const pos2000Value = shiftArrayClone[first0Position + 2000].val * decryptionKey;
  const pos3000Value = shiftArrayClone[first0Position + 3000].val * decryptionKey;

  postMessage({score: pos1000Value + pos2000Value + pos3000Value, isDemoData});
}
