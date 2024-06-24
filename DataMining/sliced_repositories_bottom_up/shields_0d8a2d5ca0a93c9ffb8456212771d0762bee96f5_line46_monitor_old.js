const config = require('config').util.toObject()
const secretIsValid = require('./secret-is-valid')
const RateLimit = require('./rate-limit')
const log = require('./log')

function secretInvalid(req, res) {
  if (!secretIsValid(req.password)) {
    // An unknown entity tries to connect. Let the connection linger for a minute.
    setTimeout(() => {
      res.json({ errors: [{ code: 'invalid_secrets' }] })
    }, 10000)
    return true
  }
  return false
}

function setRoutes({ rateLimit }, { server, metricInstance }) {
  const ipRateLimit = new RateLimit({
    // Exclude IPs for GitHub Camo, determined experimentally by running e.g.
    // `curl --insecure -u ":shields-secret" https://s0.shields-server.com/sys/rate-limit`
    whitelist: /^(?:192\.30\.252\.\d+)|(?:140\.82\.115\.\d+)$/,
  })
  const badgeTypeRateLimit = new RateLimit({ maxHitsPerPeriod: 3000 })
  const refererRateLimit = new RateLimit({
    maxHitsPerPeriod: 300,
    whitelist: /^https?:\/\/shields\.io\/$/,
  })

  server.handle((req, res, next) => {
    if (req.url.startsWith('/sys/')) {
      if (secretInvalid(req, res)) {
        return
      }
    }

    if (rateLimit) {
      const ip =
        (req.headers['x-forwarded-for'] || '').split(', ')[0] ||
        req.socket.remoteAddress
      const badgeType = req.url
        .split(/[/-]/)
        .slice(0, 3)
      const referer = req.headers['referer']
    }
  })
}
