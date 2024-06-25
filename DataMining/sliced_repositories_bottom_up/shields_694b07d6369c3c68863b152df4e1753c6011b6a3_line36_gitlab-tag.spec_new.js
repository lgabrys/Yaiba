import nock from 'nock'
import GitLabTag from './gitlab-tag.service.js'
describe('GitLabTag', function () {
  describe('auth', function () {
    it('sends the auth information as configured', async function () {
      const scope = nock('https://gitlab.com/')
      expect(
        await GitLabTag.invoke(
          { project: 'foo/bar' },
        )
      ).to.deep.equal({
    })
  })
})
