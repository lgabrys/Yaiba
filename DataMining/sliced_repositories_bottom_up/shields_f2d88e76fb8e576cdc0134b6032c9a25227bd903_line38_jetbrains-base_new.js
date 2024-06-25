
export default class JetbrainsBase extends BaseXmlService {
  async fetchIntelliJPluginData({ pluginId, schema }) {
    const parserOptions = {
      parseTagValue: false,
      ignoreAttributes: false,
    }
  }
}
