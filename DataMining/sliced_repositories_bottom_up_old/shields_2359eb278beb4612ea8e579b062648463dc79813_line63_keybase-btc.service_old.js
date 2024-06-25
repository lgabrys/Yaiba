const Joi = require('joi')
const { nonNegativeInteger } = require('../validators')
const KeybaseProfile = require('./keybase-profile')

const bitcoinAddressSchema = Joi.object({
  status: Joi.object({
    code: nonNegativeInteger.required(),
  }).required(),
  them: Joi.array()
    .items(
      Joi.object({
        cryptocurrency_addresses: Joi.object({
          bitcoin: Joi.array().items(
            Joi.object({
              address: Joi.string().required(),
            }).required()
          ),
        })
          .required()
          .allow(null),
      })
        .required()
        .allow(null)
    )
    .min(0)
    .max(1),
}).required()

module.exports = class KeybaseBTC extends KeybaseProfile {
  static route = {
    base: 'keybase/btc',
    pattern: ':username',
  }

  static examples = [
    {
      title: 'Keybase BTC',
      namedParams: { username: 'skyplabs' },
      staticPreview: this.render({
      }),
      keywords: ['bitcoin'],
    },
  ]

  static defaultBadgeData = {
    label: 'btc',
    color: 'informational',
  }

  static render({ address }) {
    return {
      message: address,
    }
  }

  async handle({ username }) {
    const options = {
      form: {
        usernames: username,
        fields: 'cryptocurrency_addresses',
      },
    }
  }
}
