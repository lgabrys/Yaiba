import * as algorithms from './util/algorithms';
function elGrCheck(tin) {
  const digits = tin.split('').map(a => parseInt(a, 10));
  let checksum = 0;
  for (let i = 0; i < 8; i++) {
    checksum += digits[i] * (2 ** (8 - i));
  }
  return ((checksum % 11) % 10) === digits[8];
}
