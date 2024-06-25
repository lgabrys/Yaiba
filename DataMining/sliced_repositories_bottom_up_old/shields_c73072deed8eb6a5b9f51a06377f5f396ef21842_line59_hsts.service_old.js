import { BaseJsonService } from '../index.js'
export default class HSTS extends BaseJsonService {
  async fetch({ domain }) {
    return this._requestJson({
      schema,
      url: `https://hstspreload.org/api/v2/status`,
      options: { qs: { domain } },
    })
  }
}
