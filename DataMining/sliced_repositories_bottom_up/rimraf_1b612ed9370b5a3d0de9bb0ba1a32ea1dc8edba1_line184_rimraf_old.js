var isWindows = (process.platform === "win32")
function fixWinEPERMSync (p, er, cb) {
  try {
  } catch (er2) {
  }
  try {
    var stats = options.statSync(p)
  } catch (er3) {
  }
}
function rmdir (p, options, originalEr, cb) {
  options.rmdir(p, function (er) {
  })
}
function rimrafSync (p, options) {
  options = options || {}
  try {
  } catch (er) {
      return isWindows ? fixWinEPERMSync(p, er) : rmdirSync(p, er)
  }
}
