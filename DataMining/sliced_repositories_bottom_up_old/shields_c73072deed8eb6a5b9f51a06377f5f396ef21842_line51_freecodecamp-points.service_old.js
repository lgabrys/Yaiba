import { metric } from '../text-formatters.js'
export default class FreeCodeCampPoints extends BaseJsonService {
  async fetch({ username }) {
    return this._requestJson({
      options: {
        qs: {
        },
      },
    })
  }
}
