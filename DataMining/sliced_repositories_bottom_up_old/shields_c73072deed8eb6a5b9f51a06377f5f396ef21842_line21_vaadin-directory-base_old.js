import { nonNegativeInteger } from '../validators.js'
class BaseVaadinDirectoryService extends BaseJsonService {
  async fetch({ packageName }) {
    return this._requestJson({
      options: {
        qs: {
        },
      },
    })
  }
}
