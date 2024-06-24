import Joi from 'joi'
import { codacyGrade } from './codacy-helpers.js'
const schema = Joi.object({ message: codacyGrade }).required()
export default class CodacyGrade extends BaseSvgScrapingService {
  async handle({ projectId, branch }) {
    const { message: grade } = await this._requestSvg({
      schema,
      url: `https://api.codacy.com/project/badge/grade/${encodeURIComponent(
      options: { qs: { branch } },
    })
  }
}
