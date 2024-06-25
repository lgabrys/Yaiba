import qs from 'qs'
export default class BaseWordpress extends BaseJsonService {
  async fetch({ extensionType, slug }) {
    const queryString = qs.stringify(
      {
        action: `${extensionType}_information`,
        request: {
        },
      },
      { encode: false }
    )
    const json = await this._requestJson({
      options: {
        qs: queryString,
      },
    })
  }
}
