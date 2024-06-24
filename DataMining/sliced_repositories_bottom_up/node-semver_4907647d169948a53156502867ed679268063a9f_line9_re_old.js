const { test } = require('tap')
const semver = require('../../')
test('has a list of src, re, and tokens', (t) => {
  t.match(Object.assign({}, semver), {
    src: Array,
    re: Array,
    tokens: Object
  })
})
