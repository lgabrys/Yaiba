
export default class GithubLastCommit extends GithubAuthV3Service {
  async fetch({ user, repo, branch }) {
    return this._requestJson({
      url: `/repos/${user}/${repo}/commits`,
      options: { qs: { sha: branch } },
    })
  }
}
