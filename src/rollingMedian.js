import { xRollingMedian } from 'ml-spectra-processing';

import { BaselineOutput } from './output.js';

/**

 *
 * @export
 * @param {Array<number>} ys
 * @param {Object} [options={}]
 * @param {number} [options.window] rolling window size, defaults to 10% of the length of the spectrum
 * @param {string} [options.padding.size=window-1] none, value, circular, duplicate
 * @param {string} [options.padding.algorithm='duplicate'] none, value, circular, duplicate
 * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
 * @returns {BaselineOutput}
 */
export function rollingMedianBaseline(ys, options = {}) {
  let window = Math.max(Math.round(ys.length * 0.1), 2);
  let defaults = {
    window: window,
    padding: {
      size: window - 1,
      algorithm: 'duplicate',
      value: 0,
    },
  };
  let actualOptions = Object.assign({}, defaults, options);
  let baseline = xRollingMedian(ys, actualOptions);
  let corrected = new Float64Array(ys.length);
  for (let i = 0; i < corrected.length; i++) {
    corrected[i] = ys[i] - baseline[i];
  }

  return new BaselineOutput(baseline, corrected);
}
