import { metric } from '../text-formatters.js'
export default class BStatsServers extends BaseJsonService {
  async fetch({ pluginid }) {
    return this._requestJson({
      options: {
        searchParams: {
        },
      },
    })
  }
}
