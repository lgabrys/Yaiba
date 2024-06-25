import { optionalUrl } from '../validators.js'
export default class JiraSprint extends BaseJsonService {
  async handle({ sprintId }, { baseUrl }) {
    const json = await this._requestJson(
      this.authHelper.withBasicAuth({
        options: {
          searchParams: {
          },
        },
      })
    )
  }
}
