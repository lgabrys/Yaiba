export default class GithubContributors extends GithubAuthV3Service {
  async handle({ variant, user, repo }) {
    const isAnon = variant === 'contributors-anon'
    const { res, buffer } = await this._request({
      url: `/repos/${user}/${repo}/contributors`,
      options: { searchParams: { page: '1', per_page: '1', anon: isAnon } },
    })
  }
}
