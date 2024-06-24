export default class InfluxMetrics {
  constructor(metricInstance, config) {
    this._config = config
  }
  async sendMetrics() {
    const request = {
      url: this._config.url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: await this.metrics(),
      timeout: this._config.timeoutMillseconds,
      username: this._config.username,
      password: this._config.password,
      throwHttpErrors: false,
    }
  }
}
