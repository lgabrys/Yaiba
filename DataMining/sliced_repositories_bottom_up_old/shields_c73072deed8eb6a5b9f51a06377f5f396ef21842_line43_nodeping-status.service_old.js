import {
} from '../website-status.js'
export default class NodePingStatus extends BaseJsonService {
  async fetch({ checkUuid }) {
    const rows = await this._requestJson({
      options: {
        qs: { format: 'json' },
      },
    })
  }
}
