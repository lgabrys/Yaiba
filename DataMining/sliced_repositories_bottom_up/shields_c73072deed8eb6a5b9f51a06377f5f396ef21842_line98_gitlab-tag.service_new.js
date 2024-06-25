import Joi from 'joi'
import GitLabBase from './gitlab-base.js'
const schema = Joi.array().items(
)
export default class GitlabTag extends GitLabBase {
  async fetch({ project, baseUrl }) {
    return super.fetch({
      schema,
      url: `${baseUrl}/api/v4/projects/${encodeURIComponent(
      )}/repository/tags`,
      options: { searchParams: { order_by: 'updated' } },
    })
  }
}
