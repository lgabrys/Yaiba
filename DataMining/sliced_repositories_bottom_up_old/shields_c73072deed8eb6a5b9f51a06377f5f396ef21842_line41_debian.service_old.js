import { latest, renderVersionBadge } from '../version.js'
const defaultDistribution = 'stable'
export default class Debian extends BaseJsonService {
  async handle({ packageName, distribution = defaultDistribution }) {
    const data = await this._requestJson({
      options: {
        qs: {
        },
      },
    })
  }
}
