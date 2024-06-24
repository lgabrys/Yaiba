const { expect } = require('chai')
const loadSimpleIcons = require('./load-simple-icons')
describe('loadSimpleIcons', function() {
  let simpleIcons
  before(function() {
    simpleIcons = loadSimpleIcons()
  })
  it('prepares three color themes', function() {
    expect(simpleIcons['sentry'].base64).to.have.all.keys(
    )
  })
})
