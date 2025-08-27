import { Vector2D } from '../../src/core/Vector2D';

describe('Vector2D', () => {
  // Vector2D 클래스가 올바르게 생성되는지 확인
  test('should create a new Vector2D instance', () => {
    const v = new Vector2D(3, 4);
    expect(v.x).toBe(3);
    expect(v.y).toBe(4);
  });

  // add 메서드 테스트: 두 벡터의 합을 계산하는지 확인
  test('should correctly add two vectors', () => {
    const v1 = new Vector2D(1, 2);
    const v2 = new Vector2D(3, 4);
    const result = v1.add(v2);
    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
  });

  // subtract 메서드 테스트: 두 벡터의 차를 계산하는지 확인
  test('should correctly subtract one vector from another', () => {
    const v1 = new Vector2D(5, 5);
    const v2 = new Vector2D(2, 1);
    const result = v1.subtract(v2);
    expect(result.x).toBe(3);
    expect(result.y).toBe(4);
  });

  // multiply 메서드 테스트: 스칼라 곱을 계산하는지 확인
  test('should correctly multiply a vector by a scalar', () => {
    const v = new Vector2D(3, 4);
    const result = v.multiply(2);
    expect(result.x).toBe(6);
    expect(result.y).toBe(8);
  });

  // length 메서드 테스트: 벡터의 길이를 계산하는지 확인
  test('should calculate the correct length of the vector', () => {
    const v = new Vector2D(3, 4);
    expect(v.length()).toBe(5);
  });

  // toArray 메서드 테스트: 배열로 변환하는지 확인
  test('should convert the vector to an array', () => {
    const v = new Vector2D(3, 4);
    expect(v.toArray()).toEqual([3, 4]);
  });
});
