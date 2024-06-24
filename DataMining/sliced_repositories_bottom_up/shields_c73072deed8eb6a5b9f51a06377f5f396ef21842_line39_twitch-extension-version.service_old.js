import TwitchBase from './twitch-base.js'
export default class TwitchExtensionVersion extends TwitchBase {
  async fetch({ extensionId }) {
    const data = this._requestJson({
      options: {
        qs: { extension_id: extensionId },
      },
    })
  }
}
