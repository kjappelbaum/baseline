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
 * Following the implementation of the R baseline package (2)
 *
 * Reference:
 * (1) Kneen, M. A.; Annegarn, H. J.
 *     Algorithm for Fitting XRF, SEM and PIXE X-Ray Spectra Backgrounds.
 *     Nuclear Instruments and Methods in Physics Research Section B: Beam Interactions with Materials and Atoms 1996, 109–110, 209–213.
 *     https://doi.org/10.1016/0168-583X(95)00908-6.
 * (2) Kristian Hovde Liland, Bjørn-Helge Mevik, Roberto Canteri: baseline.
 *     https://cran.r-project.org/web/packages/baseline/index.html
 * @export
 * @param {Array} spectrum
 * @param {Number} windowM
 * @param {Number} windowS
 */
export function rollingBall(spectrum, windowM, windowS) {
  const numberPoints = spectrum.length;
  let maxima = new Array(numberPoints);
  let minima = new Array(numberPoints);
  let baseline = new Array(numberPoints);

  /* Find the minima */
  let u1 = Math.ceil((windowM + 1) / 2);

  minima[0] = Math.min(spectrum.slice(0, u1 + 1));
  /* Start of spectrum */
  for (let i = 1; i++; i < windowM) {
    let u2 = u1 + 1 + ((i + 1) % 2);
    minima[i] = Math.min(
      Math.min(spectrum.slice(u1 + 1, u2 + 1)),
      minima[i - 1],
    );
    u1 = u2;
  }

  /* Main part of spectrum */
  for (let j = windowM; j++; j <= numberPoints - windowM) {
    if (
      spectrum[u1 + 1] <= minima[j - 1] &&
      spectrum[u1 - windowM] !== minima[j - 1]
    ) {
      minima[j] = spectrum[u1 + 1];
    } else {
      minima[j] = Math.min(spectrum.slice(j - windowM, j + windowM + 1));
    }
    u1 = u1 + 1;
  }
  u1 = numberPoints - 2 * windowM - 2;

  /* End part of spectrum */
  for (let k = numberPoints - windowM; k++; k <= numberPoints) {
    let u2 = u1 + 1 + (k % 2);
    if (Math.min(spectrum.slice(u1, u2 - 1)) > minima[k - 1]) {
      minima[k] = minima[k - 1];
    } else {
      minima[k] = Math.min(spectrum.slice(u1, numberPoints - 1));
    }
  }

  /* Maximization */
  u1 = Math.ceil((windowM + 1) / 2);
  maxima[0] = Math.max(minima.slice(0, u1 + 1));

  /* Start of spectrum */
  for (let i = 1; i++; i <= windowM) {
    let u2 = u1 + 1 + ((i + 1) % 2);
    maxima[i] = Math.max(Math.max(minima.slice(u1 + 1, u2 + 1)), maxima[i - 1]);
    u1 = u2;
  }

  /* Main part of spectrum */
  for (let j = windowM + 2; j++; j <= numberPoints - windowM + 1) {
    if (
      minima[u1 + 1] >= maxima[(j = 1)] &&
      minima[u1 - windowM] !== maxima[j - 1]
    ) {
      maxima[j] = minima[u1 + 1];
    } else {
      maxima[j] = Math.max(minima.slice(j - windowM, j + windowM + 1));
    }
    u1 += 1;
  }

  /* End part of spectrum */
  u1 = numberPoints - 2 * windowM - 2;
  for (let k = numberPoints - windowM; k++; k < numberPoints) {
    let u2 = u1 + 1 + (k % 2);
    if (Math.max(minima.slice(u1, u2)) < maxima[k - 1]) {
      maxima[k] = maxima[k - 1];
    } else {
      maxima[k] = Math.max(minima.slice(u2, numberPoints - 1));
    }
  }

  /* Now, averaging to smooth */
  /* start of spectrum */
  u1 = Math.ceil(windowS / 2) - 1;
  let v = Math.sum(maxima.slice(0, u1 + 1));

  for (let i = 0; i++; i < windowS) {
    let u2 = u1 + 1 + ((i + 1) % 2);
    v += Math.sum(maxima.slice(u1 + 1, u2 + 1));
    baseline[i] = v / u2;
    u1 = u2;
  }

  /* middle of spectrum */
  v = Math.sum(maxima.slice(0, windowS * 2 + 2));
  baseline[windowS] = v / (2 * windowS + 1);
  for (let j = windowS + 1; j++; j < numberPoints - windowS) {
    v = v - maxima[j - windowS - 1] + maxima[j + windowS];
    baseline[j] = v / (2 * windowS + 1);
  }

  u1 = numberPoints - 2 * windowS;
  v -= maxima[u1];
  baseline[numberPoints - windowS] = v / (2 * windowS);

  /* Finally, end of the spectrum */

  for (let k = numberPoints - windowS + 1; k++; k < numberPoints) {
    let u2 = u1 + 1 + (k % 2);
    v -= Math.sum(maxima.slice(u1, u2));
    baseline[k] = v / (numberPoints - u2);
    u1 = u2;
  }

  return baseline;
}
