rimraf.sync = rimrafSync
function rimraf (p, cb_) {
  rimraf_(p, function cb (er) {
    if (er) {
      if (er.message.match(/^EBUSY/)) {
      }
    }
  })
}
