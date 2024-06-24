const { test } = require('tap')
const SemVer = require('../../classes/semver')
test('return SemVer arg to ctor if options match', t => {
  const s = new SemVer('1.2.3', { loose: true, includePrerelease: true })
  t.notEqual(new SemVer(s), s, 'get new object when options match')
})
