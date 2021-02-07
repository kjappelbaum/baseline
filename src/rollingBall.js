import { rollingBall } from 'ml-rolling-ball-baseline';

import { BaselineOutput } from './output.js';

/**
 * Rolling ball baseline correction algorithm.
 * From the abstract of (1):
 * "This algorithm behaves equivalently to traditional polynomial backgrounds in simple spectra,
 * [...] and is considerably more robust for multiple overlapping peaks, rapidly varying background [...]
 *
 * The baseline is the trace one gets by rolling a ball below a spectrum. Algorithm has three steps:
 * Finding the minima in each window, find maxima among minima and then smooth over them by averaging.
 *
 * Algorithm described in (1), but in the implementation here the window width does not change.
 *
 * Reference:
 * (1) Kneen, M. A.; Annegarn, H. J.
 *     Algorithm for Fitting XRF, SEM and PIXE X-Ray Spectra Backgrounds.
 *     Nuclear Instruments and Methods in Physics Research Section B: Beam Interactions with Materials and Atoms 1996, 109–110, 209–213.
 *     https://doi.org/10.1016/0168-583X(95)00908-6.
 * (2) Kristian Hovde Liland, Bjørn-Helge Mevik, Roberto Canteri: baseline.
 *     https://cran.r-project.org/web/packages/baseline/index.html
 *
 * @export
 * @param {Array<number>} spectrum
 * @param {Object} [options={}]
 * @param {Number} [options.windowM] - width of local window for minimization/maximization, defaults to 4% of the spectrum length
 * @param {Number} [options.windowS] - width of local window for smoothing, defaults to 8% of the specturm length
 * @returns {BaselineOutput}
 */
export function rollingBallBaseline(spectrum, options = {}) {
  const baseline = rollingBall(spectrum, options);
  return BaselineOutput(baseline, spectrum - baseline);
}
