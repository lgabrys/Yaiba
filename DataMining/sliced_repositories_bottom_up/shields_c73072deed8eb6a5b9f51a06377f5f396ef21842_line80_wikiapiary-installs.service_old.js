import Joi from 'joi'
import { renderDownloadsBadge } from '../downloads.js'
const schema = Joi.object({
  query: Joi.object({
    results: Joi.alternatives([
      Joi.object()
    ]).required(),
  }).required(),
}).required()
export default class WikiapiaryInstalls extends BaseJsonService {
  async fetch({ variant, name }) {
    return this._requestJson({
      options: {
        qs: {
        },
      },
    })
  }
}
