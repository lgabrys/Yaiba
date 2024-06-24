
</p>
export default class AzureDevOpsBuild extends BaseSvgScrapingService {
  async handle(
    { organization, projectId, definitionId, branch },
    { stage, job }
  ) {
    const { status } = await fetch(this, {
      url: `https://dev.azure.com/${organization}/${projectId}/_apis/build/status/${definitionId}`,
      qs: {
      },
    })
  }
}
