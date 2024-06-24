const { renderBuildStatusBadge } = require('../build-status')
const AppVeyorBase = require('./appveyor-base')
const { NotFound } = require('..')

module.exports = class AppVeyorJobBuild extends AppVeyorBase {
  static get route() {
    return {
      base: 'appveyor/job/build',
      pattern: ':user/:repo/:job/:branch*',
    }
  }

  static get examples() {
    return [
      {
        title: 'AppVeyor Job',
        pattern: ':user/:repo/:job',
        namedParams: {
          user: 'wpmgprostotema',
          repo: 'voicetranscoder',
          job: 'Linux',
        },
        staticPreview: renderBuildStatusBadge({ status: 'success' }),
      },
      {
        title: 'AppVeyor Job branch',
        pattern: ':user/:repo/:job/:branch',
        namedParams: {
          user: 'wpmgprostotema',
          repo: 'voicetranscoder',
          job: 'Windows',
          branch: 'master',
        },
        staticPreview: renderBuildStatusBadge({ status: 'success' }),
      },
    ]
  }

  transform({ data, jobName }) {
    if (!data.hasOwnProperty('build')) {
    }
  }
}
