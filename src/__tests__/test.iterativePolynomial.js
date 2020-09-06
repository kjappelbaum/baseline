import { polynomialBaseline } from '../../testData/baselines';
import { spectrum } from '../../testData/spectrum';
import { iterativePolynomial } from '../iterativePolynomial';

describe('test rollingball', () => {
  it('compare with R', () => {
    const bl = iterativePolynomial(spectrum);
    expect(bl).toHaveLength(spectrum.length);
    for (let i = 0; i < spectrum.length; i++) {
      expect(
        Math.abs(bl[i] - polynomialBaseline[i]) / polynomialBaseline[i],
      ).toBeLessThan(0.02);
    }
  });
});
