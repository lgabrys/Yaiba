import Joi from 'joi'
const cloudBuildSchema = Joi.object({
}).required()
async function fetchBuild(serviceInstance, { user, repo }) {
  return serviceInstance._requestJson({
    schema: cloudBuildSchema,
    url: `https://cloud.docker.com/api/build/v1/source`,
    options: { qs: { image: `${user}/${repo}` } },
  })
}
