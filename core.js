export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // 두 벡터의 이동을 결합한 최종 위치를 나타냅니다
  add(other) {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  // 한 벡터에서 다른 벡터를 빼면, 두 벡터의 시작점과 끝점 사이의 관계를 나타내는 벡터를 나타냅니다.
  // 점 A에서 B로 이동하는 벡터 X를 찾으려면 X = B - A 입니다.
  subtract(other) {
    return new Vector2D(this.x - other.x, this.y - other.y);
  }

  // 벡터에 스칼라(단순 숫자)를 곱하면 방향은 같지만 크기가 변한 새로운 벡터를 나타냅니다.
  multiply(scalar) {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  toArray() {
    return [this.x, this.y];
  }
}

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
  console.log(lineString, ratio);
  if (ratio <= 0) return lineString[0];
  if (ratio >= 1) return lineString[lineString.length - 1];

  const totalLength = getTotalLengthVector(lineString);
  console.log(totalLength)
  const targetDistance = totalLength * ratio;

  let runningDistance = 0;

  for (let i = 0; i < lineString.length - 1; i++) {
    const v1 = new Vector2D(lineString[i][0], lineString[i][1]);
    const v2 = new Vector2D(lineString[i + 1][0], lineString[i + 1][1]);
    const segment = v2.subtract(v1);
    const segmentLength = segment.length();
    console.log(segmentLength)

    // 오차 범위를 고려하여 조건문을 수정
    // `targetDistance`가 현재 세그먼트의 끝점에 매우 가깝다면 해당 세그먼트를 사용
    if (runningDistance + segmentLength >= targetDistance - Number.EPSILON) {
      const remainingDistance = targetDistance - runningDistance;
      const segmentRatio = remainingDistance / segmentLength;

      // Use the Vector2D objects for interpolation, which is more robust
      const resultVector = v1.add(segment.multiply(segmentRatio));

      return resultVector.toArray();
    }

    runningDistance += segmentLength;
  }

  // 예외 처리: 반복문을 통과했으면 마지막 점을 반환
  return lineString[lineString.length - 1];
}