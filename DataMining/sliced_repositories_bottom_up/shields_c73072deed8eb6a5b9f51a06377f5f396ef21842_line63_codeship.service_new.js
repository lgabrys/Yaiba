import Joi from 'joi'
const schema = Joi.object({
}).required()
export default class Codeship extends BaseSvgScrapingService {
  async fetch({ projectId, branch }) {
    const url = `https://app.codeship.com/projects/${projectId}/status`
    return this._requestSvg({
      schema,
      url,
      options: { searchParams: { branch } },
    })
  }
}
