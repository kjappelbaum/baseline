import baselineCorrection from 'ml-baseline-correction-regression';

import { BaselineOutput } from './output.js';

/**
 * Iterative polynomial fitting [1]
 *
 * Implementation based on ml-baseline-correction-regression
 *
 * References:
 * [1] Gan, F.; Ruan, G.; Mo, J.
 * Baseline Correction by Improved Iterative Polynomial Fitting with Automatic Threshold.
 *  Chemometrics and Intelligent Laboratory Systems 2006, 82 (1), 59–65.
 * https://doi.org/10.1016/j.chemolab.2005.08.009.
 * @export
 * @param {Array<number>} ys
 * @param {Array<number>} x Optional, Independent axis variable. If not specified, we use a linear grid
 * @param {object} [options] - Options object
 * @param {number} [options.maxIterations = 100] - Maximum number of allowed iterations
 * @param {function} [options.Regression = PolynomialRegression] - Regression class with a predict method
 * @param {*} [options.regressionOptions] - Options for regressionFunction
 * @param {number} [options.tolerance = 0.001] - Convergence error tolerance
 * @returns {BaselineOutput}
 */
export function iterativePolynomialBaseline(ys, x, options = {}) {
  const numberPoints = ys.length;
  if (!x) {
    x = [...Array(numberPoints).keys()];
  }

  let output = baselineCorrection(x, ys, options);

  return new BaselineOutput(output.baseline, output.corrected);
}
