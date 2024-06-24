import { BaseJsonService } from '../index.js'
export default class TwitchBase extends BaseJsonService {
  async _getNewToken() {
    const tokenRes = await super._requestJson(
      this.authHelper.withQueryStringAuth(
        {
          options: {
            method: 'POST',
            qs: {
            },
          },
        }
      )
    )
  }
}
