import BaseGreasyForkService from './greasyfork-base.js'
export default class GreasyForkInstalls extends BaseGreasyForkService {
  static category = 'downloads'
  static route = { base: 'greasyfork', pattern: ':variant(dt|dd)/:scriptId' }
  static examples = [
    {
      title: 'Greasy Fork',
      pattern: 'dd/:scriptId',
      namedParams: { scriptId: '407466' },
      staticPreview: renderDownloadsBadge({ downloads: 17 }),
    },
  ]
}
