import Joi from 'joi'
import {
} from '../color-formatters.js'
const aurSchema = Joi.object({
}).required()
class BaseAurService extends BaseJsonService {
  static defaultBadgeData = { label: 'aur' }
  async fetch({ packageName }) {
    return this._requestJson({
      schema: aurSchema,
      url: 'https://aur.archlinux.org/rpc.php',
      options: { searchParams: { v: 5, type: 'info', arg: packageName } },
    })
  }
}
