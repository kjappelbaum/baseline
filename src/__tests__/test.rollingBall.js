import { spectrum } from '../../testData/spectrum';
import { rollingBall } from '../rollingBall';

describe('test rollingball', () => {
  it('compare with R', () => {
    const bl = rollingBall(spectrum, 200, 400);
    expect(bl).toHaveLength(spectrum.length);
    console.log(bl);
  });
});
