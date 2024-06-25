


const path = require('path')
const url = require('url')
const bytes = require('bytes')
const Joi = require('@hapi/joi')
const Camp = require('camp')
const makeBadge = require('../../gh-badges/lib/make-badge')
const GithubConstellation = require('../../services/github/github-constellation')
const suggest = require('../../services/suggest')
const { loadServiceClasses } = require('../base-service/loader')
const { makeSend } = require('../base-service/legacy-result-sender')
const {
  handleRequest,
  clearRequestCache,
} = require('../base-service/legacy-request-handler')
const { clearRegularUpdateCache } = require('../legacy/regular-update')
const { rasterRedirectUrl } = require('../badge-urls/make-badge-url')
const log = require('./log')
const sysMonitor = require('./monitor')
const PrometheusMetrics = require('./prometheus-metrics')

const optionalUrl = Joi.string().uri({ scheme: ['http', 'https'] })
const requiredUrl = optionalUrl.required()

const publicConfigSchema = Joi.object({
  bind: {
    port: Joi.number().port(),
    address: Joi.alternatives().try(
      Joi.string()
        .ip()
        .required(),
      Joi.string()
        .hostname()
        .required()
    ),
  },
  metrics: {
    prometheus: {
      enabled: Joi.boolean().required(),
    },
  },
  ssl: {
    isSecure: Joi.boolean().required(),
    key: Joi.string(),
    cert: Joi.string(),
  },
  redirectUrl: optionalUrl,
  cors: {
    allowedOrigin: Joi.array()
      .items(optionalUrl)
      .required(),
  },
  persistence: {
    dir: Joi.string().required(),
  },
  services: {
    github: {
      baseUri: requiredUrl,
      debug: {
        enabled: Joi.boolean().required(),
        intervalSeconds: Joi.number()
          .integer()
          .min(1)
          .required(),
      },
    },
    trace: Joi.boolean().required(),
  },
  profiling: {
    makeBadge: Joi.boolean().required(),
  },
  cacheHeaders: {
      .integer()
      .required(),
  },
}).required()
const privateConfigSchema = Joi.object({
  bintray_apikey: Joi.string(),
  gh_client_id: Joi.string(),
  jenkins_user: Joi.string(),
  jenkins_pass: Joi.string(),
  jira_user: Joi.string(),
  jira_pass: Joi.string(),
  nexus_user: Joi.string(),
  redis_url: Joi.string().uri({ scheme: ['redis', 'rediss'] }),
  sentry_dsn: Joi.string(),
  sl_insight_apiToken: Joi.string(),
  sonarqube_token: Joi.string(),
}).required()

/**
 * The Server is based on the web framework Scoutcamp. It creates
 * an http server, sets up helpers for token persistence and monitoring.
 * Then it loads all the services, injecting dependencies as it
 * asks each one to register its route with Scoutcamp.
 */
class Server {




  constructor(config) {
    const publicConfig = Joi.attempt(config.public, publicConfigSchema)
    let privateConfig
    try {
      privateConfig = Joi.attempt(config.private, privateConfigSchema)
    } catch (e) {
      const badPaths = e.details.map(({ path }) => path)
      throw Error(
        `Private configuration is invalid. Check these paths: ${badPaths.join(
          ','
        )}`
      )
    }
    this.config = {
      public: publicConfig,
    }

    this.githubConstellation = new GithubConstellation({
      persistence: publicConfig.persistence,
    })
    if (publicConfig.metrics.prometheus.enabled) {
      this.metrics = new PrometheusMetrics()
    }
  }
  get port() {
    const {
      port,
      ssl: { isSecure },
    } = this.config.public
  }

  registerErrorHandlers() {
    const { camp, config } = this

    camp.route(/\.(gif|jpg)$/, (query, match, end, request) => {
    })
    camp.notfound(/(.svg|.json|)$/, (query, match, end, request) => {
    })
  }
}
