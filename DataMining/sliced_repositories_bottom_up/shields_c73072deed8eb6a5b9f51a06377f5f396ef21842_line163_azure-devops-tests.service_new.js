import AzureDevOpsBase from './azure-devops-base.js'
const commonAttrs = {
  keywords: ['vso', 'vsts', 'azure-devops'],
  namedParams: {
    organization: 'azuredevops-powershell',
    project: 'azuredevops-powershell',
    definitionId: '1',
    branch: 'master',
  },
  queryParams: {
    passed_label: 'passed',
    failed_label: 'failed',
    skipped_label: 'skipped',
    compact_message: null,
  },
  documentation: `
<p>
  To obtain your own badge, you need to get 3 pieces of information:
  <code>ORGANIZATION</code>, <code>PROJECT</code> and <code>DEFINITION_ID</code>.
</p>
<p>
  First, you need to select your build definition and look at the url:
</p>
<img
  src="https://user-images.githubusercontent.com/3749820/47259976-e2d9ec80-d4b2-11e8-92cc-7c81089a7a2c.png"
  alt="ORGANIZATION is after the dev.azure.com part, PROJECT is right after that, DEFINITION_ID is at the end after the id= part." />
<p>
  Your badge will then have the form:
  <code>https://img.shields.io/azure-devops/tests/ORGANIZATION/PROJECT/DEFINITION_ID.svg</code>.
</p>
<p>
  Optionally, you can specify a named branch:
  <code>https://img.shields.io/azure-devops/tests/ORGANIZATION/PROJECT/DEFINITION_ID/NAMED_BRANCH.svg</code>.
</p>
${commonDocumentation}
`,
}
export default class AzureDevOpsTests extends AzureDevOpsBase {
  async fetchTestResults({ organization, project, definitionId, branch }) {
    return await this.fetch({
      options: {
        searchParams: { buildId },
      },
    })
  }
}
