import { metric } from '../text-formatters.js'
export default class BStatsPlayers extends BaseJsonService {
  async fetch({ pluginid }) {
    return this._requestJson({
      options: {
        qs: {
        },
      },
    })
  }
}
