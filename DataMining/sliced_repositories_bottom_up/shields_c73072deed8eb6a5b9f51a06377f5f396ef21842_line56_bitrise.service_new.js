import { BaseJsonService } from '../index.js'
export default class Bitrise extends BaseJsonService {
  async fetch({ appId, branch, token }) {
    return this._requestJson({
      url: `https://app.bitrise.io/app/${encodeURIComponent(
      options: { searchParams: { token, branch } },
    })
  }
}
