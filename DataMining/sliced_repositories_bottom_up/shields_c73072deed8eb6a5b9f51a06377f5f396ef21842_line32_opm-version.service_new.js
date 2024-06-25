import { renderVersionBadge } from '../version.js'
export default class OpmVersion extends BaseService {
  async fetch({ user, moduleName }) {
    const { res } = await this._request({
      options: {
        method: 'HEAD',
        searchParams: {
        },
      },
    })
  }
}
