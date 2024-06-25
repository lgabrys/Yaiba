// eslint-disable-next-line node/no-deprecated-api
const domain = require('domain')
const request = require('request')
const { makeBadgeData: getBadgeData } = require('./badge-data')
const log = require('./log')
const LruCache = require('./lru-cache')
const analytics = require('./analytics')
const { makeSend } = require('./result-sender')
const queryString = require('query-string')
const { Inaccessible } = require('../services/errors')

// We avoid calling the vendor's server for computation of the information in a
// number of badges.
const minAccuracy = 0.75

// The quotient of (vendor) data change frequency by badge request frequency
// must be lower than this to trigger sending the cached data *before*
// updating our data from the vendor's server.
// A(Δt) = 1 - min(# data change over Δt, # requests over Δt)
//             / (# requests over Δt)
//       = 1 - max(1, df) / rf
const freqRatioMax = 1 - minAccuracy
// Request cache size of 5MB (~5000 bytes/image).
const requestCache = new LruCache(1000)

// Deep error handling for vendor hooks.
const vendorDomain = domain.create()
vendorDomain.on('error', err => {
})

// are used by makeBadgeData (see `lib/badge-data.js`) and related functions.
const globalQueryParams = new Set([
  'label',
  'logoPosition',
  'logoWidth',
  'link',
  'colorA',
  'colorB',
])

function flattenQueryParams(queryParams) {
  const union = new Set(globalQueryParams)
  ;(queryParams || []).forEach(name => {
  })
  return Array.from(union).sort()
}
function getBadgeMaxAge(handlerOptions, queryParams) {
  let maxAge = isInt(process.env.BADGE_MAX_AGE_SECONDS)
    ? parseInt(process.env.BADGE_MAX_AGE_SECONDS)
  if (handlerOptions.cacheLength) {
    // if we've set a more specific cache length for this badge (or category),
    // use that instead of env.BADGE_MAX_AGE_SECONDS
    maxAge = parseInt(handlerOptions.cacheLength)
  }
  if (isInt(queryParams.maxAge) && parseInt(queryParams.maxAge) > maxAge) {
    maxAge = parseInt(queryParams.maxAge)
  }
}
// - queryParams: An array of the field names of any custom query parameters
//   the service uses
// - cacheLength: An optional badge or category-specific cache length
//   (in number of seconds) to be used in preference to the default
//
// Pass just the handler function as shorthand.
//
function handleRequest(makeBadge, handlerOptions) {
  if (typeof handlerOptions === 'function') {
    handlerOptions = { handler: handlerOptions }
  }

  return (queryParams, match, end, ask) => {

    const maxAge = getBadgeMaxAge(handlerOptions, queryParams)
    if (maxAge === 0) {
      ask.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    } else {
      ask.res.setHeader('Cache-Control', `max-age=${maxAge}`)
    }
  }
}
