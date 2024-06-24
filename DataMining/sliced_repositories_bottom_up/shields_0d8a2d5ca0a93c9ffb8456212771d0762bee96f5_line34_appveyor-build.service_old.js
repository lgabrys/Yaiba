const { renderBuildStatusBadge } = require('../build-status')
const AppVeyorBase = require('./appveyor-base')

module.exports = class AppVeyorBuild extends AppVeyorBase {
  static get route() {
    return this.buildRoute('appveyor/build')
  }

  static get examples() {
    return [
      {
        title: 'AppVeyor',
        pattern: ':user/:repo',
        namedParams: { user: 'gruntjs', repo: 'grunt' },
        staticPreview: this.render({ status: 'success' }),
      },
      {
        title: 'AppVeyor branch',
        pattern: ':user/:repo/:branch',
        namedParams: { user: 'gruntjs', repo: 'grunt', branch: 'master' },
        staticPreview: this.render({ status: 'success' }),
      },
    ]
  }

  static render({ status }) {
    return renderBuildStatusBadge({ status })
  }

  async handle({ user, repo, branch }) {
    const data = await this.fetch({ user, repo, branch })
    if (!data.hasOwnProperty('build')) {
    }
  }
}
