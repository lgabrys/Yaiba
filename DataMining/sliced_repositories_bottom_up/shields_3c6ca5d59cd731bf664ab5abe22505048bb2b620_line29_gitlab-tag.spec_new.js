describe('GitLabTag', function () {
  describe('auth', function () {
    const fakeToken = 'abc123'
    it('sends the auth information as configured', async function () {
        // Without this the request wouldn't match and the test would fail.
        .matchHeader('Authorization', `Bearer ${fakeToken}`)
    })
  })
})
