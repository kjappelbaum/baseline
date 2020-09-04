import { medianWindowBaseline } from '../../testData/baselines';
import { spectrum } from '../../testData/spectrum';
import { medianWindow } from '../medianWindow';

describe('test medianWindow', () => {
  it('compare with R', () => {
    const bl = medianWindow(spectrum, 500, 500);
    expect(bl).toHaveLength(spectrum.length);
    console.log(bl);
    for (let i = 0; i < spectrum.length; i++) {
      expect(
        Math.abs(bl[i] - medianWindowBaseline[i]) / medianWindowBaseline[i],
      ).toBeLessThan(0.01);
    }
  });
});
