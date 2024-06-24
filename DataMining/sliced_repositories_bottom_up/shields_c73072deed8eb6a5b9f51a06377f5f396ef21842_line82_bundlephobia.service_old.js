import prettyBytes from 'pretty-bytes'
export default class Bundlephobia extends BaseJsonService {
  async fetch({ scope, packageName, version }) {
    const packageQuery = `${scope ? `${scope}/` : ''}${packageName}${
    }`
    const options = { qs: { package: packageQuery } }
  }
}
