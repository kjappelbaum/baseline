import { airPLSBaseline } from './airPLS';
import { iterativePolynomialBaseline } from './iterativePolynomial';
import { rollingAverageBaseline } from './rollingAverage';
import { rollingBallBaseline } from './rollingBall';
import { rollingMedianBaseline } from './rollingMedian';

export {
  airPLSBaseline,
  iterativePolynomialBaseline,
  rollingBallBaseline,
  rollingAverageBaseline,
  rollingMedianBaseline,
};
/**
 * @typedef {Object} BaselineOutput
 * @property {Array<number>} baseline
 * @property {Array<number>} correctedSpectrum
 */
