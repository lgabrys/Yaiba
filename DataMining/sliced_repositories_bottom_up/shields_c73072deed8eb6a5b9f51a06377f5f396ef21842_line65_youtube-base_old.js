import { BaseJsonService, NotFound } from '../index.js'
const documentation = `
class YouTubeBase extends BaseJsonService {
  static renderSingleStat({ statistics, statisticName, id }) {
    return {
      link: `https://www.youtube.com/${this.type}/${encodeURIComponent(id)}`,
    }
  }
  async fetch({ id }) {
    return this._requestJson(
      this.authHelper.withQueryStringAuth(
        {
          options: {
            qs: { id, part: 'statistics' },
          },
        }
      )
    )
  }
}
