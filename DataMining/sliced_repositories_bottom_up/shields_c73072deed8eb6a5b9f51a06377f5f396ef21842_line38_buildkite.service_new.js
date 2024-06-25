import { isBuildStatus, renderBuildStatusBadge } from '../build-status.js'
export default class Buildkite extends BaseJsonService {
  async fetch({ identifier, branch }) {
    const options = { searchParams: { branch } }
  }
}
