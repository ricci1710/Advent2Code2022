const parseData = (values) => {
  const playerField = new Map();
  const sbMinDistance = new Map();

  values.forEach((line) => {
    const lineParts = line.split(':');
    const sensor = lineParts[0].split(' ');
    const beacon = lineParts[1].split(' ');

    console.assert(beacon.length === 7, `Algorithm is incorrect - beacon.length expected: 7 calculated value: ${beacon.length}`)
    let xPos = beacon[5].split('=');
    let yPos = beacon[6].split('=');
    let key = `${xPos[1]}${yPos[1]}`;
    playerField.set(key, 'B');

    const beaconPosX = parseInt(xPos[1], 10);
    const beaconPosY = parseInt(yPos[1], 10);

    console.assert(sensor.length === 4, `Algorithm is incorrect - sensor.length expected: 4 calculated value: ${sensor.length}`)
    xPos = sensor[2].split('=');
    yPos = sensor[3].split('=');
    key = `${xPos[1]}${yPos[1]}`;
    playerField.set(key, 'S');
    const sensorPosX = parseInt(xPos[1], 10);
    const sensorPosY = parseInt(yPos[1], 10);

    const dist = Math.abs(sensorPosX - beaconPosX) + Math.abs(sensorPosY - beaconPosY);
    sbMinDistance.set(key, dist);
  });

  return {playerField, sbMinDistance};
};

const forbiddenCellCounter = (sensorPosY, sensorDistance, lineNumber) => {
  return sensorDistance - Math.abs(sensorPosY - lineNumber);
};
const filterMap = (playerField, conditionCB) => {
  const result = new Map();
  for (let [key, value] of playerField) {
    if (conditionCB(key, value)) {
      result.set(key, value);
    }
  }
  return result;
};

const getKeyOfEmptyField = (lineNumber, lineNumbers, map) => {
  let searchKey;
  let lastXPos = 0;
  for (let [key,] of map.entries()) {
    const xPos = parseInt(key.split(',')[0], 10);
    if (xPos < 0 || xPos > lineNumbers)
      continue;

    if (lastXPos === xPos) {
      lastXPos += 1;
    } else {
      searchKey = {x: xPos - 1, y: lineNumber};
      break;
    }
  }
  return searchKey;
};

onmessage = function (e) {
  const values = e.data[0];
  const lineNumber = e.data[1];
  const lineNumbers = e.data[2]
  const stampBSAllowed = e.data[3];

  const resultMap = new Map();

  const {playerField, sbMinDistance} = parseData(values);
  filterMap(playerField, (key, value) => {
    if (!stampBSAllowed && value === 'B')
      return false;

    const sensorDistance = sbMinDistance.get(key);
    const sensorPosX = parseInt(key.split(',')[0]);
    const sensorPosY = parseInt(key.split(',')[1]);
    const diffPos = sensorPosY - lineNumber;

    // Liegt der Sensor über oder unter der gewünschten Zeile?
    let lineContained = false;
    if (diffPos === 0) {
      // Punkt liegt auf der Zeile
      lineContained = true;
    } else if (diffPos > 0) {
      // Punkt liegt unterhalb
      lineContained = sensorPosY - sensorDistance <= lineNumber;
    } else {
      // Punkt liegt oberhalb
      lineContained = sensorPosY + sensorDistance >= lineNumber;
    }

    if (lineContained) {
      const stampKey = `${sensorPosX},${lineNumber}`;
      const counter = forbiddenCellCounter(sensorPosY, sensorDistance, lineNumber);
      for (let idx = 0; idx <= counter; idx += 1) {
        const charRight = playerField.get(`${sensorPosX + idx},${lineNumber}`);
        if (stampBSAllowed || (charRight !== 'B' && charRight !== 'S'))
          resultMap.set(`${sensorPosX + idx},${lineNumber}`, '#');
        const charLeft = playerField.get(`${sensorPosX - idx},${lineNumber}`);
        if (stampBSAllowed || (charLeft !== 'B' && charLeft !== 'S'))
          resultMap.set(`${sensorPosX - idx},${lineNumber}`, '#');
      }
      const playFieldValue = playerField.get(stampKey);
      if (stampBSAllowed || (playFieldValue !== 'B' && playFieldValue !== 'S'))
        resultMap.set(`${sensorPosX},${lineNumber}`, '#');
    }
  });

  const sortResult = new Map([...resultMap.entries()].sort((a, b) => {
    return parseInt(a[0], 10) < parseInt(b[0], 10) ? -1 : 1;
  }));

  if (lineNumbers) {
    const coordinate = getKeyOfEmptyField(lineNumber, lineNumbers, sortResult, '#');
    if (coordinate) {
      // found by multiplying its x coordinate by 4000000 and then adding its y coordinate.
      const frequency = coordinate.x * 4000000 + coordinate.y;
      postMessage({terminate: true, frequency, lineNumber: lineNumbers});
    }
  } else
    postMessage({sortResult, lineNumber});
}
