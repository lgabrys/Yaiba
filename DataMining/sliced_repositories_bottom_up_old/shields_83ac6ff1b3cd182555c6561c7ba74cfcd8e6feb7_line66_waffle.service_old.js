const LegacyService = require('../legacy-service')
const {
  makeBadgeData: getBadgeData,
  makeLabel: getLabel,
  makeColorB,
} = require('../../lib/badge-data')
const { checkErrorResponse } = require('../../lib/error-helper')

module.exports = class Waffle extends LegacyService {
  static get category() {
    return 'issue-tracking'
  }

  static get url() {
    return {
      base: 'waffle',
    }
  }
  static get examples() {
    return [
      {
        title: 'Waffle.io',
      },
    ]
  }

  static registerLegacyRouteHandler({ camp, cache }) {
      cache((data, match, sendBadge, request) => {
        const user = match[1] // eg, evancohen
        const ghLabel = match[3] || 'ready' // eg, in%20progress
        const format = match[4]
        const apiUrl = `https://api.waffle.io/${user}/${repo}/columns?with=count`
        const badgeData = getBadgeData('waffle', data)
        request(apiUrl, (err, res, buffer) => {
          try {
            if (checkErrorResponse(badgeData, err, res)) {
              sendBadge(format, badgeData)
              return
            }
            const cols = JSON.parse(buffer)
            if (cols.length === 0) {
              badgeData.text[1] = 'absent'
              sendBadge(format, badgeData)
              return
            }
            let count = 0
            let color = '78bdf2'
            for (let i = 0; i < cols.length; i++) {
              if ('label' in cols[i] && cols[i].label !== null) {
                if (cols[i].label.name === ghLabel) {
                  count = cols[i].count
                  color = cols[i].label.color
                  break
                }
              }
            }
            badgeData.text[0] = getLabel(ghLabel, data)
            badgeData.text[1] = '' + count
          } catch (e) {
        })
      })
  }
}
