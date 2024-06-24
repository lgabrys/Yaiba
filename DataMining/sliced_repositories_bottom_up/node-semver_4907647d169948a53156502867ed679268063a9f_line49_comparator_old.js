const { test } = require('tap')
const Comparator = require('../../classes/comparator')
test('ANY matches anything', t => {
  const c = new Comparator('')
  const ANY = Comparator.ANY
  t.ok(c.test(ANY), 'anything matches ANY')
})
