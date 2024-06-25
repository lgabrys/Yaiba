import Joi from 'joi'
import { renderBuildStatusBadge } from '../build-status.js'
const bitbucketPipelinesSchema = Joi.object({
  values: Joi.array()
    .items(
      Joi.object({
        state: Joi.object({
        }).required(),
      })
    )
}).required()
class BitbucketPipelines extends BaseJsonService {
  async fetch({ user, repo, branch }) {
    return this._requestJson({
      schema: bitbucketPipelinesSchema,
      options: {
        searchParams: {
        },
      },
    })
  }
}
