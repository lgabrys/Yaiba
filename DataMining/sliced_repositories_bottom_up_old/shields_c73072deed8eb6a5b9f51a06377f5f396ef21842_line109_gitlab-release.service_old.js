import GitLabBase from './gitlab-base.js'
const commonProps = {
  namedParams: {
    project: 'shields-ops-group/tag-test',
  },
  documentation,
}
export default class GitLabRelease extends GitLabBase {
  async fetch({ project, baseUrl, isSemver, orderBy }) {
    return this.fetchPaginatedArrayData({
      options: {
        qs: { order_by: orderBy },
      },
    })
  }
}
