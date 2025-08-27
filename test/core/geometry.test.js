import { getTotalLengthVector, getPointAtRatio } from '../../src/core/geometry';

describe('Geometry Functions', () => {
  const lineString = [[0, 0], [3, 4], [3, 10]];

  test('getTotalLengthVector should calculate the total length of a line string', () => {
    const totalLength = getTotalLengthVector(lineString);
    expect(totalLength).toBe(11);
  });

  describe('getPointAtRatio', () => {
    test('should return the start point for a ratio of 0', () => {
      expect(getPointAtRatio(lineString, 0)).toEqual([0, 0]);
    });

    test('should return the end point for a ratio of 1', () => {
      expect(getPointAtRatio(lineString, 1)).toEqual([3, 10]);
    });

    test('should return the correct point on the first segment for a ratio of 0.5', () => {
      const expectedPoint = [3, 4.5];
      expect(getPointAtRatio(lineString, 0.5)).toEqual(expectedPoint);
    });

    test('should return a point on the second segment for a ratio of 0.8', () => {
      const ratioInSegment = 3.8 / 6;
      const y = 4 + (10 - 4) * ratioInSegment;
      const expectedPoint = [3, y];

      const receivedPoint = getPointAtRatio(lineString, 0.8);

      expect(receivedPoint[0]).toBeCloseTo(expectedPoint[0], 5); // Check X value
      expect(receivedPoint[1]).toBeCloseTo(expectedPoint[1], 5); // Check Y value
    });
  });
});