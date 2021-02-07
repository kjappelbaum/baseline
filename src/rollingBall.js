import { rollingBall } from 'ml-rolling-ball-baseline';
import { BaselineOutput } from './output.js';

export function rollingBallBaseline(spectrum, options = {}) {
  const baseline = rollingBall(spectrum, options);
  return BaselineOutput(baseline, spectrum - baseline);
}
