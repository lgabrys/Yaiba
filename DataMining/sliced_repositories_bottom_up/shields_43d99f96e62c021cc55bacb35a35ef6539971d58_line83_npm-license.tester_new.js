const Joi = require('joi')
const createServiceTester = require('../create-service-tester')
const { colorScheme: colorsB } = require('../test-helpers')
const t = createServiceTester()
t.create('gets the license of express')
  .expectJSONTypes(Joi.object().keys({ name: 'license', value: 'MIT' }))
t.create('gets the license of express from a custom registry')
  .expectJSONTypes(Joi.object().keys({ name: 'license', value: 'MIT' }))
t.create('public domain license')
  .expectJSON({ name: 'license', value: 'WTFPL', colorB: '#7cd958' })
t.create('copyleft license')
  .expectJSON({ name: 'license', value: 'GPL-3.0', colorB: colorsB.orange })
t.create('permissive license')
  .expectJSON({ name: 'license', value: 'MIT', colorB: colorsB.green })
t.create('permissive license for scoped package')
  .expectJSON({ name: 'license', value: 'MIT', colorB: colorsB.green })
t.create(
)
  .expectJSON({
    name: 'license',
    value: '(MPL-2.0 OR MIT)',
    colorB: colorsB.lightgrey,
  })
t.create('license for package without a license property')
  .intercept(nock =>
  )
  .expectJSON({ name: 'license', value: 'missing', colorB: colorsB.red })
t.create('license for package with a license object')
  .intercept(nock =>
  )
  .expectJSON({ name: 'license', value: 'MIT', colorB: colorsB.green })
t.create('license for package with a license array')
  .intercept(nock =>
  )
  .expectJSON({
    name: 'license',
    value: 'MPL-2.0, MIT',
    colorB: colorsB.green,
  })
