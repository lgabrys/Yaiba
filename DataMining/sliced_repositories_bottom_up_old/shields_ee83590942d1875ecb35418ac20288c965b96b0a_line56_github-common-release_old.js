const Joi = require('joi')
const { latest } = require('../version')
function getLatestRelease({ releases, sort, includePrereleases }) {
  if (sort === 'semver') {
    const latestTagName = latest(
      releases.map(release => release.tag_name),
      { pre: includePrereleases }
    )
    return releases.find(({ tag_name }) => tag_name === latestTagName)
  }
}
