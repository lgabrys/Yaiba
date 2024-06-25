const fs = require('fs')
let redis
let useRedis = false
if (process.env.REDISTOGO_URL) {
  const redisToGo = require('url').parse(process.env.REDISTOGO_URL)
  redis = require('redis').createClient(redisToGo.port, redisToGo.hostname)
  redis.auth(redisToGo.auth.split(':')[1])
  useRedis = true
}

let analytics = {}
let autosaveIntervalId

const analyticsPath = process.env.SHIELDS_ANALYTICS_FILE || './analytics.json'

function performAutosave() {
  const contents = JSON.stringify(analytics)
  if (useRedis) {
    redis.set(analyticsPath, contents)
  } else {
    fs.writeFileSync(analyticsPath, contents)
  }
}

function scheduleAutosaving() {
  const analyticsAutoSavePeriod = 10000
  autosaveIntervalId = setInterval(performAutosave, analyticsAutoSavePeriod)
}

// For a clean shutdown.
function cancelAutosaving() {
  if (autosaveIntervalId) {
    clearInterval(autosaveIntervalId)
    autosaveIntervalId = null
  }
  performAutosave()
}

function defaultAnalytics() {
  const analytics = Object.create(null)
  // In case something happens on the 36th.
  analytics.vendorMonthly = new Array(36)
  resetMonthlyAnalytics(analytics.vendorMonthly)
  analytics.rawMonthly = new Array(36)
  resetMonthlyAnalytics(analytics.rawMonthly)
  analytics.vendorFlatMonthly = new Array(36)
  resetMonthlyAnalytics(analytics.vendorFlatMonthly)
  analytics.rawFlatMonthly = new Array(36)
  resetMonthlyAnalytics(analytics.rawFlatMonthly)
  analytics.vendorFlatSquareMonthly = new Array(36)
  resetMonthlyAnalytics(analytics.vendorFlatSquareMonthly)
  analytics.rawFlatSquareMonthly = new Array(36)
  resetMonthlyAnalytics(analytics.rawFlatSquareMonthly)
  return analytics
}

function load() {
  const defaultAnalyticsObject = defaultAnalytics()
  if (useRedis) {
    redis.get(analyticsPath, (err, value) => {
      if (err == null && value != null) {
        // if/try/return trick:
        // if error, then the rest of the function is run.
        try {
          analytics = JSON.parse(value)
          // Extend analytics with a new value.
          for (const key in defaultAnalyticsObject) {
            if (!(key in analytics)) {
              analytics[key] = defaultAnalyticsObject[key]
            }
          }
          return
        } catch (e) {
          console.error('Invalid Redis analytics, resetting.')
          console.error(e)
        }
      }
      analytics = defaultAnalyticsObject
    })
  } else {
    // Not using Redis.
    try {
      analytics = JSON.parse(fs.readFileSync(analyticsPath))
      // Extend analytics with a new value.
      for (const key in defaultAnalyticsObject) {
        if (!(key in analytics)) {
          analytics[key] = defaultAnalyticsObject[key]
        }
      }
    } catch (e) {
      if (e.code !== 'ENOENT') {
        console.error('Invalid JSON file for analytics, resetting.')
        console.error(e)
      }
      analytics = defaultAnalyticsObject
    }
  }
}

let lastDay = new Date().getDate()
function resetMonthlyAnalytics(monthlyAnalytics) {
  for (let i = 0; i < monthlyAnalytics.length; i++) {
  }
}
