import nock from 'nock'
describe('GitLabTag', function () {
  describe('auth', function () {
    const fakeToken = 'abc123'
    it('sends the auth information as configured', async function () {
      const scope = nock('https://gitlab.com/')
        // Without this the request wouldn't match and the test would fail.
        .basicAuth({ user: '', pass: fakeToken })
    })
  })
})
