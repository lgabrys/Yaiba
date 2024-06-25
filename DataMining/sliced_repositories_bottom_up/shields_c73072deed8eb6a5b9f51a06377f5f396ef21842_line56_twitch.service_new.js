import TwitchBase from './twitch-base.js'
export default class TwitchStatus extends TwitchBase {
  async fetch({ user }) {
    const streams = this._requestJson({
      options: {
        searchParams: { user_login: user },
      },
    })
  }
}
