const Raven = require('raven')
const throttle = require('lodash.throttle')
const listeners = []

// Zero-pad a number in a string.
// eg. 4 becomes 04 but 17 stays 17.
function pad(string) {
  string = String(string)
  return string.length < 2 ? '0' + string : string
}

// Compact date representation.
// eg. 0611093840 for June 11, 9:38:40 UTC.
function date() {
  const date = new Date()
  return (
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds())
  )
}
module.exports = function log(...msg) {
  const d = date()
  listeners.forEach(f => f(d, ...msg))
  console.log(d, ...msg)
}
const throttledConsoleError = throttle(console.error, 10000, {
  trailing: false,
})
module.exports.error = function error(...msg) {
  const d = date()
  listeners.forEach(f => f(d, ...msg))
  Raven.captureException(msg, sendErr => {
  })
}
