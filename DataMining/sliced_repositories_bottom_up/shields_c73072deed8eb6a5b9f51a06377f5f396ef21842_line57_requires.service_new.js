import Joi from 'joi'
import { BaseJsonService } from '../index.js'
const statusSchema = Joi.object({
}).required()
export default class RequiresIo extends BaseJsonService {
  static category = 'dependencies'
  static route = {
  }
  async fetch({ service, user, repo, branch }) {
    const url = `https://requires.io/api/v1/status/${service}/${user}/${repo}`
    return this._requestJson({
      url,
      schema: statusSchema,
      options: { searchParams: { branch } },
    })
  }
}
