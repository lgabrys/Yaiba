import Joi from 'joi'
import { metric } from '../text-formatters.js'
const reputationSchema = Joi.object({
}).required()
export default class StackExchangeReputation extends BaseJsonService {
  static category = 'chat'
  static route = {
  }
  async handle({ stackexchangesite, query }) {

    const parsedData = await this._requestJson({
      schema: reputationSchema,
      options: { gzip: true, qs: { site: stackexchangesite } },
    })
  }
}
