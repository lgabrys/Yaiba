const Joi = require('joi')
const { nonNegativeInteger } = require('../validators')
const KeybaseProfile = require('./keybase-profile')

const stellarAddressSchema = Joi.object({
  status: Joi.object({
    code: nonNegativeInteger.required(),
  }).required(),
  them: Joi.array()
    .items(
      Joi.object({
        stellar: Joi.object({
          primary: Joi.object({
            account_id: Joi.string(),
          })
            .required()
            .allow(null),
        }).required(),
      })
        .required()
        .allow(null)
    )
    .min(0)
    .max(1),
}).required()

module.exports = class KeybaseXLM extends KeybaseProfile {
  static route = {
    base: 'keybase/xlm',
    pattern: ':username',
  }

  static examples = [
    {
      title: 'Keybase XLM',
      namedParams: { username: 'skyplabs' },
      staticPreview: this.render({
        address: 'GCGH37DYONEBPGAZGCHJEZZF3J2Q3EFYZBQBE6UJL5QKTULCMEA6MXLA',
      }),
    },
  ]

  static defaultBadgeData = {
    label: 'xlm',
    color: 'informational',
  }

  static render({ address }) {
    return {
      message: address,
    }
  }

  static apiVersion = '1.0'

  async handle({ username }) {
    const options = {
      form: {
        usernames: username,
        fields: 'stellar',
      },
    }
  }
}
