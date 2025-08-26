import { Vector2D, getTotalLengthVector, getPointAtRatio } from "./core.js";
// --- 테스트 코드 시작 ---
console.log('--- Vector2D 클래스 테스트 ---');

// 벡터 인스턴스 생성
const v1 = new Vector2D(3, 4);
const v2 = new Vector2D(1, 2);

console.log(`v1: [${v1.x}, ${v1.y}]`);
console.log(`v2: [${v2.x}, ${v2.y}]`);

// add 메서드 테스트
const v3 = v1.add(v2);
console.assert(v3.x === 4 && v3.y === 6, `add() 실패: [${v3.x}, ${v3.y}] (기대값: [4, 6])`);
console.log(`add() 성공: [${v3.x}, ${v3.y}]`);

// subtract 메서드 테스트
const v4 = v1.subtract(v2);
console.assert(v4.x === 2 && v4.y === 2, `subtract() 실패: [${v4.x}, ${v4.y}] (기대값: [2, 2])`);
console.log(`subtract() 성공: [${v4.x}, ${v4.y}]`);

// multiply 메서드 테스트
const v5 = v1.multiply(2);
console.assert(v5.x === 6 && v5.y === 8, `multiply() 실패: [${v5.x}, ${v5.y}] (기대값: [6, 8])`);
console.log(`multiply() 성공: [${v5.x}, ${v5.y}]`);

// length 메서드 테스트 (피타고라스 정리)
const v1Length = v1.length();
console.assert(v1Length === 5, `length() 실패: ${v1Length} (기대값: 5)`);
console.log(`length() 성공: ${v1Length}`);

// toArray 메서드 테스트
const v1Array = v1.toArray();
console.assert(Array.isArray(v1Array) && v1Array[0] === 3 && v1Array[1] === 4, `toArray() 실패`);
console.log(`toArray() 성공: [${v1Array}]`);

console.log('\n--- 경로 함수 테스트 ---');

// 테스트용 단순 경로
const simpleLine = [
  [0, 0],
  [3, 4],
  [3, 7]
];

// getTotalLengthVector 테스트
const totalLength = getTotalLengthVector(simpleLine);
console.assert(Math.abs(totalLength - 8) < Number.EPSILON, `getTotalLengthVector() 실패: ${totalLength} (기대값: 8)`);
console.log(`getTotalLengthVector() 성공: ${totalLength}`);

// getPointAtRatio 테스트
// ratio = 0: 시작점
const startPoint = getPointAtRatio(simpleLine, 0);
console.assert(startPoint[0] === 0 && startPoint[1] === 0, `getPointAtRatio(0) 실패`);
console.log(`getPointAtRatio(0) 성공: [${startPoint}]`);

// ratio = 0.5: 중간 지점
const midPoint = getPointAtRatio(simpleLine, 0.5);
console.assert(Math.abs(midPoint[0] - 3) < Number.EPSILON && Math.abs(midPoint[1] - 4) < Number.EPSILON, `getPointAtRatio(0.5) 실패`);
console.log(`getPointAtRatio(0.5) 성공: [${midPoint}]`);

// ratio = 1: 끝점
const endPoint = getPointAtRatio(simpleLine, 1);
console.assert(endPoint[0] === 3 && endPoint[1] === 7, `getPointAtRatio(1) 실패`);
console.log(`getPointAtRatio(1) 성공: [${endPoint}]`);

// ratio = 0.875: 두 번째 세그먼트의 중간 지점
const halfwayPointSecondSegment = getPointAtRatio(simpleLine, 0.875);
console.assert(Math.abs(halfwayPointSecondSegment[0] - 3) < Number.EPSILON && Math.abs(halfwayPointSecondSegment[1] - 5.5) < Number.EPSILON, `getPointAtRatio(0.875) 실패`);
console.log(`getPointAtRatio(0.875) 성공: [${halfwayPointSecondSegment}]`);