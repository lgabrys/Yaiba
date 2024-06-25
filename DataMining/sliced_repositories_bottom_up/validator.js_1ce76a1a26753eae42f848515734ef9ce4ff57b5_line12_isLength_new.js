export default function isLength(str, options) {
  let min;
  if (typeof (options) === 'object') {
    min = options.min || 0;
  } else { // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
  }
}
