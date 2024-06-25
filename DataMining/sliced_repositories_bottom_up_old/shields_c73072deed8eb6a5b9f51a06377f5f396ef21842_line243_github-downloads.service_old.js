import Joi from 'joi'
const queryParamSchema = Joi.object({
  sort: Joi.string().valid('date', 'semver').default('date'),
}).required()
const releaseArraySchema = Joi.alternatives().try(
)
export default class GithubDownloads extends GithubAuthV3Service {
  async handle({ kind, user, repo, tag, assetName }, { sort }) {
    } else {
      const allReleases = await this._requestJson({
        schema: releaseArraySchema,
        url: `/repos/${user}/${repo}/releases`,
        options: { qs: { per_page: 500 } },
      })
    }
  }
}
