export default function isFloat(str, options) {
  options = options || {};
  if (str === '' || str === '.' || str === '-' || str === '+') {
    return false;
  }
}
