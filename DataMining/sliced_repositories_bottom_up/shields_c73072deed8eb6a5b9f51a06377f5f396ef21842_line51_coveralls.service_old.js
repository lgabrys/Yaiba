import { coveragePercentage } from '../color-formatters.js'
export default class Coveralls extends BaseJsonService {
  static render({ coverage }) {
    return {
      color: coveragePercentage(coverage),
    }
  }
  async fetch({ vcsType, user, repo, branch }) {
    }/${user}/${repo}.json`
    const options = {
      qs: {
        // The API returns the latest result (across any branch) if no branch is explicitly specified,
        // whereas the Coveralls native badge (and the Shields.io badges for Coveralls) show
        // the coverage for the default branch if no branch is explicitly specified. If the user
        // doesn't specify their desired badge, then we can get the Coverage for the latest branch
        // from the API by specifying an invalid branch name in which case the API returns the coverage
        // for the default branch. This ensures we show the same percentage value.
        branch: branch || '@',
      },
    }
  }
