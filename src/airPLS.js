import airpls from 'ml-airpls';

import { BaselineOutput } from './output.js';
/**
 * Adaptive iteratively reweighted penalized least squares [1]
 *
 * This function calls ml-airpls
 *
 * References:
 * [1] Zhang, Z.-M.; Chen, S.; Liang, Y.-Z.
 * Baseline Correction Using Adaptive Iteratively Reweighted Penalized Least Squares.
 * Analyst 2010, 135 (5), 1138–1146. https://doi.org/10.1039/B922045C.
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
export function airPLSBaseline(ys, x, options = {}) {
  const numberPoints = ys.length;
  if (!x) {
    x = [...Array(numberPoints).keys()];
  }

  let output = airpls(x, ys, options);

  return new BaselineOutput(output.baseline, output.corrected);
}
