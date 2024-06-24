import Joi from 'joi'
const circleSchema = Joi.object({ message: isBuildStatus }).required()
  <p>
const vcsTypeMap = { gh: 'gh', github: 'gh', bb: 'bb', bitbucket: 'bb' }
class CircleCi extends BaseSvgScrapingService {
  async handle({ vcsType, user, repo, branch }, { token }) {
    const branchClause = branch ? `/tree/${branch}` : ''
    const vcs = vcsTypeMap[vcsType]
    const { message } = await this._requestSvg({
      schema: circleSchema,
      url: `https://circleci.com/${vcs}/${user}/${repo}${branchClause}.svg`,
      options: { qs: { style: 'shield', 'circle-token': token } },
    })
  }
}
