const { test } = require('tap')
const Comparator = require('../../classes/comparator')
test('ANY matches anything', t => {
  const c1 = new Comparator('>=1.2.3')
  const ANY = Comparator.ANY
  t.ok(c1.test(ANY), 'anything matches ANY')
})
