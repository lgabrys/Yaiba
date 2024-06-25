import Joi from 'joi'
import { metric } from '../text-formatters.js'
class TwitterUrl extends BaseService {
}

class TwitterFollow extends BaseJsonService {
  async fetch({ user }) {
    return this._requestJson({
      schema,
      url: `http://cdn.syndication.twimg.com/widgets/followbutton/info.json`,
      options: { searchParams: { screen_names: user } },
    })
  }
}
