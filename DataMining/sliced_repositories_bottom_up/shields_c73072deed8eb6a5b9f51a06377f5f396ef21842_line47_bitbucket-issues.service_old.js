import { metric } from '../text-formatters.js'
function issueClassGenerator(raw) {
  return class BitbucketIssues extends BaseJsonService {
    async fetch({ user, repo }) {
      return this._requestJson({
        options: {
          qs: { limit: 0, q: '(state = "new" OR state = "open")' },
        },
      })
    }
  }
}
