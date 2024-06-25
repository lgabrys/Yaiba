import Joi from 'joi'
export default class SecurityHeaders extends BaseService {
  async handle(namedParams, { url, ignoreRedirects }) {
    const { res } = await this._request({
      options: {
        method: 'HEAD',
        qs: {
        },
      },
    })
  }
}
