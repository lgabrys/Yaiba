const LegacyService = require('../legacy-service')
const { makeBadgeData: getBadgeData } = require('../../lib/badge-data')
const { checkErrorResponse } = require('../../lib/error-helper')
const {
  coveragePercentage: coveragePercentageColor,
} = require('../../lib/color-formatters')

module.exports = class Scrutinizer extends LegacyService {
  static get category() {
    return 'build'
  }

  static get url() {
    return {
      base: 'scrutinizer',
    }
  }

  static get examples() {
    return [
      {
        title: 'Scrutinizer',
        previewUrl: 'g/filp/whoops',
      },
      {
        previewUrl: 'coverage/g/filp/whoops',
      },
      {
      },
      {
        previewUrl: 'build/g/filp/whoops',
      },
    ]
  }
  static registerLegacyRouteHandler({ camp, cache }) {
      /^\/scrutinizer(?:\/(build|coverage))?\/([^/]+\/[^/]+\/[^/]+|gp\/[^/])(?:\/(.+))?\.(svg|png|gif|jpg|json)$/,
      cache((data, match, sendBadge, request) => {
        const type = match[1] ? match[1] : 'code quality'
        const repo = match[2] // eg, g/phpmyadmin/phpmyadmin
        let branch = match[3]
        const apiUrl = `https://scrutinizer-ci.com/api/repositories/${repo}`
        const badgeData = getBadgeData(type, data)
        request(apiUrl, {}, (err, res, buffer) => {
          if (
            checkErrorResponse(badgeData, err, res, {
              404: 'project or branch not found',
            })
          ) {
          try {
            const parsedData = JSON.parse(buffer)
            // Which branch are we dealing with?
            if (branch === undefined) {
              branch = parsedData.default_branch
            }
            if (type === 'coverage') {
              const percentage =
              if (isNaN(percentage)) {
                badgeData.text[1] = 'unknown'
                badgeData.colorscheme = 'gray'
              } else {
                badgeData.text[1] = percentage.toFixed(0) + '%'
              }
            } else if (type === 'build') {
          } catch (e) {
        })
      })
    )
  }
}
