
export default class JetbrainsBase extends BaseXmlService {
  async fetchIntelliJPluginData({ pluginId, schema }) {
    const parserOptions = {
      parseNodeValue: false,
      ignoreAttributes: false,
    }
  }
}
