let createMedianFilter = require('moving-median'); // ToDo: maybe reimplement this
import { dot } from './utils';
// WARNING: Still WIP

/**
 *
 * (1) Friedrichs, MarkS. A Model-Free Algorithm for the Removal of Baseline Artifacts.
 * J Biomol NMR 1995, 5 (2). https://doi.org/10.1007/BF00208805.
 * @export
 * @param {*} spectrum
 * @param {*} hwMedianWindow
 * @param {*} hwSmoothingWindow
 */
export function medianWindow(spectrum, hwMedianWindow, hwSmoothingWindow) {
  const numberPoints = spectrum.length;
  let median = createMedianFilter(2 * hwMedianWindow + 1);
  let runningMedians = spectrum.map(median);
  let baseline = new Array(numberPoints);

  let gaussianWeights = gaussian(hwSmoothingWindow * 2, hwSmoothingWindow / 2);

  let g = 0;
  let cutL = 0 - hwSmoothingWindow;
  for (let i = 0; i < numberPoints; i++) {
    cutL = i - hwSmoothingWindow;
    if (cutL < 0) {
      g = gaussianWeights.slice(-cutL, gaussianWeights.length);
    } else if (numberPoints < i + hwSmoothingWindow) {
      g = gaussianWeights.slice(
        0,
        gaussianWeights.length - (i + hwSmoothingWindow - numberPoints),
      );
    } else {
      g = gaussianWeights;
    }
    let sum = g.reduce((a, b) => a + b, 0);
    g = g.map(function (item) {
      return item / sum;
    });

    let slice = runningMedians.slice(
      Math.max(0, i - hwSmoothingWindow),
      Math.min(i + hwSmoothingWindow, numberPoints),
    );
    baseline[i] = dot(slice, g);
  }
  return baseline;
}

function gaussian(length, sd) {
  const center = (length - 1) / 2;

  const data = new Float32Array(length);
  const normalConstant = 1 / Math.sqrt(2 * Math.PI) / sd;
  for (let i = 0; i <= center; i++) {
    data[i] =
      normalConstant * Math.exp(-(1 / 2) * Math.pow((i - center) / sd, 2));
    data[length - 1 - i] = data[i];
  }
  return data;
}
