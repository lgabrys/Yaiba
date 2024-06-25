import Joi from 'joi'
const schema = Joi.object({
}).required()
export default class CodacyCoverage extends BaseSvgScrapingService {
  async handle({ projectId, branch }) {
    const { message: coverageString } = await this._requestSvg({
      schema,
      url: `https://api.codacy.com/project/badge/coverage/${encodeURIComponent(
      options: { searchParams: { branch } },
    })
  }
}
