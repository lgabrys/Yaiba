import Joi from 'joi'
import { BaseJsonService } from '../index.js'
const tagSchema = Joi.object({
}).required()
export default class StackExchangeQuestions extends BaseJsonService {
  static category = 'chat'
  static route = {
  }
  async handle({ stackexchangesite, query }) {
    const parsedData = await this._requestJson({
      schema: tagSchema,
      options: { decompress: true, searchParams: { site: stackexchangesite } },
    })
  }
}
