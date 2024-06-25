import Joi from 'joi'
export default class TreewareTrees extends BaseJsonService {
  async fetch({ reference }) {
    return this._requestJson({
      options: {
        searchParams: { ref: reference },
      },
    })
  }
}
