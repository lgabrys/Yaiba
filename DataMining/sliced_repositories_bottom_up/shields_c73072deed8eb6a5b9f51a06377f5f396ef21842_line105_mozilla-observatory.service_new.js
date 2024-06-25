import { BaseJsonService } from '../index.js'
export default class MozillaObservatory extends BaseJsonService {
  async fetch({ host, publish }) {
    return this._requestJson({
      options: {
        method: 'POST',
        searchParams: { host },
      },
    })
  }
}
