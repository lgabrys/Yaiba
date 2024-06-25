const path = require('path')
const Joi = require('joi')
const Camp = require('camp')
const makeBadge = require('../gh-badges/lib/make-badge')
const GithubConstellation = require('../services/github/github-constellation')
const { loadServiceClasses } = require('../services')
const analytics = require('./analytics')
const { makeBadgeData } = require('./badge-data')
const log = require('./log')
const { staticBadgeUrl } = require('./make-badge-url')
const suggest = require('./suggest')
const sysMonitor = require('./sys/monitor')
const PrometheusMetrics = require('./sys/prometheus-metrics')
const { makeSend } = require('./result-sender')
const { handleRequest, clearRequestCache } = require('./request-handler')
const { clearRegularUpdateCache } = require('./regular-update')

const optionalUrl = Joi.string().uri({ scheme: ['http', 'https'] })
const requiredUrl = optionalUrl.required()

const configSchema = Joi.object({
  bind: {
    port: Joi.number()
      .port()
      .required(),
      .try(
        Joi.string()
          .ip()
          .required(),
          .hostname()
          .required()
      )
      .required(),
  },
  metrics: {
    prometheus: {
      allowedIps: Joi.string(),
    },
  },
  ssl: {
    key: Joi.string(),
    cert: Joi.string(),
  },
  baseUri: requiredUrl,
  redirectUri: optionalUrl,
  cors: {
    allowedOrigin: Joi.array()
      .required(),
  },
  persistence: {
    dir: Joi.string().required(),
    redisUrl: optionalUrl,
  },
  services: {
    github: {
      baseUri: requiredUrl,
      debug: {
        intervalSeconds: Joi.number()
          .min(1),
      },
    },
    trace: Joi.boolean().required(),
  },
  profiling: {
  },
  cacheHeaders: {
  },
  rateLimit: Joi.boolean().required(),
}).required()
module.exports = class Server {
  constructor(config) {
    this.githubConstellation = new GithubConstellation({
      service: config.services.github,
    })
  }
  get baseUrl() {
    return this.config.baseUri
  }

  registerErrorHandlers() {
    const { camp } = this
    camp.notfound(/\.(svg|png|gif|jpg|json)/, (query, match, end, request) => {
      const format = match[1]
      const badgeData = makeBadgeData('404', query)
      badgeData.text[1] = 'badge not found'
      badgeData.colorscheme = 'red'
      badgeData.format = format
      const svg = makeBadge(badgeData)
      makeSend(format, request.res, end)(svg)
    })
    camp.notfound(/.*/, (query, match, end, request) => {
    })
  }
  registerServices() {
    loadServiceClasses().forEach(serviceClass =>
      serviceClass.register(
      )
    )
  }
  registerRedirects() {
    const { config, camp } = this

    // Any badge, old version. This route must be registered last.
    camp.route(/^\/([^/]+)\/(.+).png$/, (queryParams, match, end, ask) => {
      const [, label, message] = match
      const redirectUrl = staticBadgeUrl({
        label,
        format: 'png',
      })
      ask.res.statusCode = 301
      ask.res.setHeader('Location', redirectUrl)
      // The redirect is permanent.
      const cacheDuration = (365 * 24 * 3600) | 0 // 1 year
      ask.res.end()
    })

    if (config.redirectUri) {
      camp.route(/^\/$/, (data, match, end, ask) => {
        ask.res.statusCode = 302
      })
    }
  }
  async start() {
    const {
      ssl: { isSecure: secure, cert, key },
    } = this.config
    const camp = (this.camp = Camp.start({
      key,
    }))

    this.cleanupMonitor = sysMonitor.setRoutes({ rateLimit }, camp)
    const { apiProvider: githubApiProvider } = this.githubConstellation
  }
}
