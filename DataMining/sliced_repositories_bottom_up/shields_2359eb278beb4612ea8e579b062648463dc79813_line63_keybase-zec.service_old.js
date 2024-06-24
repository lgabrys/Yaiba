const Joi = require('joi')
const { nonNegativeInteger } = require('../validators')
const KeybaseProfile = require('./keybase-profile')

const zcachAddressSchema = Joi.object({
  status: Joi.object({
    code: nonNegativeInteger.required(),
  }).required(),
  them: Joi.array()
    .items(
      Joi.object({
        cryptocurrency_addresses: Joi.object({
          zcash: Joi.array().items(
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

module.exports = class KeybaseZEC extends KeybaseProfile {
  static route = {
    base: 'keybase/zec',
    pattern: ':username',
  }

  static examples = [
    {
      title: 'Keybase ZEC',
      namedParams: { username: 'skyplabs' },
      staticPreview: this.render({
      }),
      keywords: ['zcash'],
    },
  ]

  static defaultBadgeData = {
    label: 'zec',
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
