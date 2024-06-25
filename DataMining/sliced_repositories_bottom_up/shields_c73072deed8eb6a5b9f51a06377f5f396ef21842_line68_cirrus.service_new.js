import { isBuildStatus, renderBuildStatusBadge } from '../build-status.js'
export default class Cirrus extends BaseJsonService {
  static examples = [
    {
      namedParams: {
      },
    },
  ]
  async handle({ user, repo, branch }, { script, task }) {
    const json = await this._requestJson({
      schema,
      url: `https://api.cirrus-ci.com/github/${user}/${repo}.json`,
      options: { searchParams: { branch, script, task } },
    })
  }
}
