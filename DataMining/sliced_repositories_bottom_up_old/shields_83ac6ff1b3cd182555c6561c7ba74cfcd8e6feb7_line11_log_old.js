const Raven = require('raven')
const throttle = require('lodash.throttle')
const listeners = []

// Zero-pad a number in a string.
// eg. 4 becomes 04 but 17 stays 17.
function pad(string) {
  string = String(string)
  return string.length < 2 ? '0' + string : string
}
