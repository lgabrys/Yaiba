import { BaseJsonService, InvalidResponse } from '../index.js'
export default class Localizely extends BaseJsonService {
  static examples = [
    {
      namedParams: {
      },
    },
  ]
  async fetch({ projectId, branch, apiToken }) {
    return this._requestJson({
      options: {
        qs: { branch },
      },
    })
  }
}
