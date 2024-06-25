import Joi from 'joi'
const schema = Joi.object({
}).required()
export default class TravisBuild extends BaseSvgScrapingService {
  async handle({ comDomain, userRepo, branch }) {
    const domain = comDomain || 'org'
    const { message: status } = await this._requestSvg({
      schema,
      url: `https://api.travis-ci.${domain}/${userRepo}.svg`,
      options: { qs: { branch } },
    })
  }
}
