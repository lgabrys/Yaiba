import Joi from 'joi'
async function fetchIssue(serviceInstance, { user, repo, number }) {
}
const contentSchema = Joi.object({
  content: Joi.string().required(),
  encoding: Joi.equal('base64').required(),
}).required()
async function fetchRepoContent(
  serviceInstance,
  { user, repo, branch = 'HEAD', filename }
) {
  const errorMessages = errorMessagesFor(
  )
  if (serviceInstance.staticAuthConfigured) {
    const { content } = await serviceInstance._requestJson({
      schema: contentSchema,
      url: `/repos/${user}/${repo}/contents/${filename}`,
      options: { qs: { ref: branch } },
    })
  }
}
