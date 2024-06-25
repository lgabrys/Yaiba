const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
describe('BaseService', function() {
  describe('ScoutCamp integration', function() {
    const expectedRouteRegex = /^\/foo\/([^\/]+?)(|\.svg|\.json)$/
    let mockHandleRequest
    beforeEach(function() {
      mockHandleRequest = sinon.spy()
    })
    it('handles the request', async function() {
      const {
        queryParams: serviceQueryParams,
        handler: requestHandler,
      } = mockHandleRequest.getCall(0).args[1]
      const mockSendBadge = sinon.spy()
      const mockRequest = {
        asPromise: sinon.spy(),
      }
      const queryParams = { queryParamA: '?' }
      const match = '/foo/bar.svg'.match(expectedRouteRegex)
      const expectedFormat = 'svg'
      expect(mockSendBadge).to.have.been.calledWith(expectedFormat, {
        text: ['cat', 'Hello namedParamA: bar with queryParamA: ?'],
        color: 'lightgrey',
        template: 'flat',
      })
    })
  })
})
