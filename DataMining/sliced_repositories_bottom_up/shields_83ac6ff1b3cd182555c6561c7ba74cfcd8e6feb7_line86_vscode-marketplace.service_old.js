const LegacyService = require('../legacy-service')
const {
  makeBadgeData: getBadgeData,
  makeLabel: getLabel,
} = require('../../lib/badge-data')
const { metric, starRating } = require('../../lib/text-formatters')
const {
  floorCount: floorCountColor,
  downloadCount: downloadCountColor,
} = require('../../lib/color-formatters')
const { addv: versionText } = require('../../lib/text-formatters')
const { version: versionColor } = require('../../lib/color-formatters')

//To generate API request Options for VS Code marketplace
function getVscodeApiReqOptions(packageName) {
  return {
    method: 'POST',
    url:
    headers: {
      accept: 'application/json;api-version=3.0-preview.1',
      'content-type': 'application/json',
    },
    body: {
      filters: [
        {
          criteria: [{ filterType: 7, value: packageName }],
        },
      ],
    },
    json: true,
  }
}

//To extract Statistics (Install/Rating/RatingCount) from respose object for vscode marketplace
function getVscodeStatistic(data, statisticName) {
  const statistics = data.results[0].extensions[0].statistics
  try {
    const statistic = statistics.find(
    )
    return statistic.value
  } catch (err) {
    return 0 //In case required statistic is not found means ZERO.
  }
}

module.exports = class VscodeMarketplace extends LegacyService {
  static registerLegacyRouteHandler({ camp, cache }) {
    camp.route(
      cache((data, match, sendBadge, request) => {
        const reqType = match[1] // eg, d/v/r
        const repo = match[2] // eg, `ritwickdey.LiveServer`.
        const badgeData = getBadgeData('vscode-marketplace', data) //temporary name
        const options = getVscodeApiReqOptions(repo)
        request(options, (err, res, buffer) => {
          if (err != null) {
            badgeData.text[1] = 'inaccessible'
            return
          }
          try {
            switch (reqType) {
              case 'd': {
                badgeData.text[0] = getLabel('downloads', data)
                const count = getVscodeStatistic(buffer, 'install')
                badgeData.text[1] = metric(count)
                badgeData.colorscheme = downloadCountColor(count)
              }
              case 'r': {
                badgeData.text[0] = getLabel('rating', data)
                const rate = getVscodeStatistic(
                ).toFixed(2)
                const totalrate = getVscodeStatistic(buffer, 'ratingcount')
                badgeData.text[1] = rate + '/5 (' + totalrate + ')'
              }
            }
          } catch (e) {
        })
      })
    )
  }
}
