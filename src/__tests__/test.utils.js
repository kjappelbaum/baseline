import { runningMedianConst } from '../../testData/runningmed';
import { spectrum } from '../../testData/spectrum';
import { medianSlidingWindow } from '../utils';
import { secondOrderDiff } from '../utils';
import { Matrix } from 'ml-matrix';

describe('test running median', () => {
  it('compare with R', () => {
    const actual = medianSlidingWindow(spectrum, 2 * 500 + 1);
    expect(actual).toHaveLength(5000);
    for (let i = 0; i < actual.length; i++) {
      expect(
        Math.abs(actual[i] - runningMedianConst[i]) / runningMedianConst[i],
      ).toBeLessThan(0.01);
    }
  });
});

describe('test second order diff', () => {
  it('compare with matlab', () => {
    const matrix = new Matrix([
      [1, 1, 1],
      [5, 5, 5],
      [25, 25, 25],
    ]);
    const expected = new Matrix([[16, 16, 16]]);
    const actual = secondOrderDiff(matrix);
    expect(actual).toStrictEqual(expected);
  });
});
