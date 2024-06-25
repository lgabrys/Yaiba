import Joi from 'joi'
import AzureDevOpsBase from './azure-devops-base.js'
const buildCodeCoverageSchema = Joi.object({
  coverageData: Joi.array()
    .items(
      Joi.object({
        coverageStats: Joi.array()
          .items(
            Joi.object({
              label: Joi.string().required(),
            })
          )
      })
    )
}).required()
export default class AzureDevOpsCoverage extends AzureDevOpsBase {
  async handle({ organization, project, definitionId, branch }) {
    const buildId = await this.getLatestCompletedBuildId(
    )
    const options = {
      searchParams: {
        buildId,
        'api-version': '5.0-preview.1',
      },
    }
  }
}
