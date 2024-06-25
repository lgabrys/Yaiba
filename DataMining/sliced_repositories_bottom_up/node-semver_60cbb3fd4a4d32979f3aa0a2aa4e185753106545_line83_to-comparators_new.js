const { test } = require('tap')
const toComparators = require('../../ranges/to-comparators')
test('comparators test', (t) => {
  [['1.0.0 - 2.0.0', [['>=1.0.0', '<=2.0.0']]],
  ].forEach(([pre, wanted]) => {
    const found = toComparators(pre)
    const jw = JSON.stringify(wanted)
    t.same(found, wanted, `toComparators(${pre}) === ${jw}`)
  })
})
