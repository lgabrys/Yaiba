import { isBuildStatus, renderBuildStatusBadge } from '../build-status.js'
export default class DroneBuild extends BaseJsonService {
  static examples = [
    {
      staticPreview: renderBuildStatusBadge({ status: 'success' }),
    },
    {
    },
  ]
  async handle({ user, repo, branch }, { server = 'https://cloud.drone.io' }) {
    const json = await this._requestJson(
      this.authHelper.withBearerAuthHeader({
        options: {
          searchParams: { ref: branch ? `refs/heads/${branch}` : undefined },
        },
      })
    )
  }
}
