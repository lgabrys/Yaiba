const Joi = require('@hapi/joi')
const { NotFound, InvalidParameter } = require('..')
const { GithubAuthService } = require('./github-auth-service')
const { documentation, errorMessagesFor } = require('./github-helpers')

const schema = Joi.object({
  // https://stackoverflow.com/a/23969867/893113
  status: Joi.equal('identical', 'ahead', 'behind', 'diverged'),
}).required()

module.exports = class GithubCommitStatus extends GithubAuthService {
  static get category() {
    return 'issue-tracking'
  }

  static get route() {
    return {
      base: 'github/commit-status',
      pattern: ':user/:repo/:branch/:commit',
    }
  }

  static get examples() {
    return [
      {
        title: 'GitHub commit merge status',
        namedParams: {
          user: 'badges',
          repo: 'shields',
          branch: 'master',
          commit: '5d4ab86b1b5ddfb3c4a70a70bd19932c52603b8c',
        },
        staticPreview: this.render({
          isInBranch: true,
          branch: 'master',
        }),
        keywords: ['branch'],
        documentation,
      },
    ]
  }

  static get defaultBadgeData() {
    return {
      label: 'commit status',
    }
  }

  static render({ isInBranch, branch }) {
    if (isInBranch) {
      return {
        message: `in ${branch}`,
        color: 'brightgreen',
      }
    } else {
      return {
      }
    }
  }

  async handle({ user, repo, branch, commit }) {
    let status
    try {
      ;({ status } = await this._requestJson({
        errorMessages: errorMessagesFor('commit or branch not found'),
        schema,
      }))
    } catch (e) {
      if (e instanceof NotFound) {
        const { message } = this._parseJson(e.buffer)
        if (message && message.startsWith('No common ancestor between')) {
        }
      }
    }
  }
}
