export default class GithubSearch extends GithubAuthV3Service {
  static category = 'analysis'
  async handle({ user, repo, query }) {
    const { total_count: totalCount } = await this._requestJson({
      options: {
        qs: {
        },
      },
    })
  }
}
