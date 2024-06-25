
export default class GithubWorkflowStatus extends BaseSvgScrapingService {
  async fetch({ user, repo, workflow, branch, event }) {
    const { message: status } = await this._requestSvg({
      schema,
      url: `https://github.com/${user}/${repo}/workflows/${encodeURIComponent(
      options: { qs: { branch, event } },
    })
  }
}
