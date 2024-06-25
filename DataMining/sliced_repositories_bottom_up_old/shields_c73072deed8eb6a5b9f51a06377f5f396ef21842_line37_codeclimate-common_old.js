import Joi from 'joi'
const keywords = ['codeclimate']
const isLetterGrade = Joi.equal('A', 'B', 'C', 'D', 'E', 'F').required()
const repoSchema = Joi.object({
}).required()
async function fetchRepo(serviceInstance, { user, repo }) {
  const {
    data: [repoInfo],
  } = await serviceInstance._requestJson({
    schema: repoSchema,
    url: 'https://api.codeclimate.com/v1/repos',
    options: { qs: { github_slug: `${user}/${repo}` } },
  })
}
