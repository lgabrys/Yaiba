const LegacyService = require('../legacy-service')
const { makeBadgeData: getBadgeData } = require('../../lib/badge-data')
const { checkErrorResponse } = require('../../lib/error-helper')
const log = require('../../lib/log')

// Handle .org and .com.
module.exports = class TravisBuild extends LegacyService {
  static get category() {
    return 'build'
  }

  static get route() {
    return {
      base: 'travis',
    }
  }

  static get examples() {
    const { staticExample } = this
    return [
      {
        title: 'Travis (.org)',
        pattern: ':user/:repo',
        staticExample,
      },
      {
        title: 'Travis (.org) branch',
        pattern: ':user/:repo/:branch',
        namedParams: { user: 'rust-lang', repo: 'rust', branch: 'master' },
      },
      {
        pattern: 'com/:user/:repo',
        namedParams: { user: 'ivandelabeldad', repo: 'rackian-gateway' },
        staticExample,
      },
      {
        pattern: 'com/:user/:repo/:branch',
        namedParams: {
          user: 'ivandelabeldad',
          repo: 'rackian-gateway',
          branch: 'master',
        },
      },
    ]
  }

  static get staticExample() {
  }
}
