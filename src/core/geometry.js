// src/core/geometry.js

import { Vector2D } from './Vector2D.js';

export function getTotalLengthVector(lineString) {
  let totalLength = 0;
  for (let i = 0; i < lineString.length - 1; i++) {
    const v1 = new Vector2D(lineString[i][0], lineString[i][1]);
    const v2 = new Vector2D(lineString[i + 1][0], lineString[i + 1][1]);
    const segment = v2.subtract(v1);
    totalLength += segment.length();
  }
  return totalLength;
}

export function getPointAtRatio(lineString, ratio) {
  if (ratio <= 0) return lineString[0];
  if (ratio >= 1) return lineString[lineString.length - 1];

  const totalLength = getTotalLengthVector(lineString);
  const targetDistance = totalLength * ratio;

  let runningDistance = 0;
  for (let i = 0; i < lineString.length - 1; i++) {
    const v1 = new Vector2D(lineString[i][0], lineString[i][1]);
    const v2 = new Vector2D(lineString[i + 1][0], lineString[i + 1][1]);
    const segment = v2.subtract(v1);
    const segmentLength = segment.length();

    if (runningDistance + segmentLength >= targetDistance) {
      const remainingDistance = targetDistance - runningDistance;
      const segmentRatio = remainingDistance / segmentLength;

      const resultVector = v1.add(segment.multiply(segmentRatio));
      return resultVector.toArray();
    }

    runningDistance += segmentLength;
  }

  return lineString[lineString.length - 1];
}