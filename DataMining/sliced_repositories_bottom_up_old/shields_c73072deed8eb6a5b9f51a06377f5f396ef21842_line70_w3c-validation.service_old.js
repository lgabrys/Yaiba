import { optionalUrl } from '../validators.js'
export default class W3cValidation extends BaseJsonService {
  async fetch(targetUrl, preset, parser) {
    return this._requestJson({
      options: {
        qs: {
        },
      },
    })
  }
}
