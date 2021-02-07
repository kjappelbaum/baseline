/**
 * Output class for baseline corrections
 *
 * @export
 * @class Baseline
 */
export class BaselineOutput {
  /**
   *Creates an instance of BaselineOutput.
   * @param {Array<number>} baseline
   * @param {Array<number>} correctedSpectrum
   * @memberof Baseline
   */
  constructor(baseline, correctedSpectrum) {
    this.baseline = baseline;
    this.correctedSpectrum = correctedSpectrum;
  }
}
