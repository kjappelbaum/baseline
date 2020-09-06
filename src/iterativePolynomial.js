import PolynomialRegression from 'ml-regression-polynomial';

/**
 * Iterative polynomial fitting [1]
 *
 * Implementation based on https://github.com/mljs/baseline-correction-regression/blob/master/src/index.js
 *
 * References:
 * [1] Gan, F.; Ruan, G.; Mo, J.
 * Baseline Correction by Improved Iterative Polynomial Fitting with Automatic Threshold.
 *  Chemometrics and Intelligent Laboratory Systems 2006, 82 (1), 59–65.
 * https://doi.org/10.1016/j.chemolab.2005.08.009.
 *  @export
 * @param {Array<number>} spectrum
 * @param {Array<number>} x Optional, Independent axis variable. If not specified, we use a linear grid
 * @param {number} [degree=4] degree of the polynomial
 * @param {number} [maxIter=100] maximum number of iterations
 * @param {number} [tol=0.001] if error below this tolerance, the code returns
 */
export function iterativePolynomial(
  spectrum,
  x,
  degree = 4,
  maxIter = 100,
  tol = 0.001,
) {
  let baseline = spectrum.slice();
  let fit = spectrum.slice();
  let previousFit = spectrum;
  const numberPoints = spectrum.length;
  if (!x) {
    x = [...Array(numberPoints).keys()];
  }

  let iteration = 0;
  let delta;
  let regression;

  while (iteration < maxIter) {
    regression = new PolynomialRegression(x, baseline, degree);
    delta = 0;
    for (let i = 0; i < baseline.length; i++) {
      fit[i] = regression.predict(x[i]);
      if (baseline[i] > fit[i]) {
        baseline[i] = fit[i];
      }

      delta += Math.abs((fit[i] - previousFit[i]) / previousFit[i]);
    }

    if (delta < tol) {
      break;
    } else {
      previousFit = fit.slice();
      iteration++;
    }
  }

  return baseline;
}
