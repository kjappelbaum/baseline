import padArray from 'ml-pad-array';

export function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

export function medianSlidingWindow(arr, k) {
  // https://github.com/flashdesignory/javascript/blob/f34b5a2398bc254814b1b7b388ab7a00429218f8/algorithms/array/array.slidingwindow.median.js
  // extended with constant endrule
  if (!arr.length) return [];
  let k2 = Math.floor(k / 2);
  const result = [];
  const queue = arr.slice(0, k);
  let index = k;

  while (index <= arr.length) {
    const current = queue.slice(0);
    current.sort((a, b) => a - b);
    const length = current.length;
    const middle = Math.floor(length / 2);
    const isEven = length % 2 === 0;
    if (isEven) {
      const left = current[middle - 1];
      const right = current[middle];
      result.push((left + right) / 2);
    } else {
      result.push(current[middle]);
    }
    queue.shift();
    queue.push(arr[index]);
    index++;
  }

  return padArray(result, { size: k2, value: 'replicate' });
}

/**
 * Implements basic idea of Matlab's diff function
 * https://www.mathworks.com/help/matlab/ref/diff.html
 *
 * I.e., we get the differences beween rows. Hence if we
 * apply it to a (p,m) matrix we get a (p-1, m) matrix
 *
 * @param {Matrix} matrix
 * @returns
 */
function diff(matrix) {
  const rows = matrix.rows;
  const cols = matrix.columns;
  const a = matrix.subMatrix(0, rows - 2, 0, cols - 1);
  const b = matrix.subMatrix(1, rows - 1, 0, cols - 1);
  return a.sub(b);
}

/**
 * second order difference, equivalent to diff(X, 2) in Matlab
 *
 * @export
 * @param {Matrix} matrix
 * @returns
 */
export function secondOrderDiff(matrix) {
  return diff(diff(matrix));
}
