const Joi = require('joi')
const { TokenPool } = require('../../lib/token-pool')
const { nonNegativeInteger } = require('../validators')

const headerSchema = Joi.object({
  'x-ratelimit-limit': nonNegativeInteger,
  'x-ratelimit-remaining': nonNegativeInteger,
  'x-ratelimit-reset': nonNegativeInteger,
})
  .required()
  .unknown(true)

// Provides an interface to the Github API. Manages the base URL.
class GithubApiProvider {
  // reserveFraction: The amount of much of a token's quota we avoid using, to
  //   reserve it for the user.
  constructor({
    baseUrl,
    withPooling = true,
    onTokenInvalidated = tokenString => {},
    globalToken,
    reserveFraction = 0.25,
  }) {
    Object.assign(this, {
      baseUrl,
      withPooling,
      onTokenInvalidated,
      globalToken,
      reserveFraction,
    })

    if (this.withPooling) {
      this.standardTokens = new TokenPool({ batchSize: 25 })
      this.searchTokens = new TokenPool({ batchSize: 5 })
    }
  }

  serializeDebugInfo({ sanitize = true } = {}) {
    if (this.withPooling) {
      return {
        standardTokens: this.standardTokens.serializeDebugInfo({ sanitize }),
        searchTokens: this.searchTokens.serializeDebugInfo({ sanitize }),
      }
    } else {
      return {}
    }
  }

  addToken(tokenString) {
    if (this.withPooling) {
      this.standardTokens.add(tokenString)
    } else {
      throw Error('When not using a token pool, do not provide tokens')
    }
  }

  updateToken(token, headers) {
    let rateLimit, totalUsesRemaining, nextReset
    try {
      ;({
        'x-ratelimit-limit': rateLimit,
        'x-ratelimit-remaining': totalUsesRemaining,
        'x-ratelimit-reset': nextReset,
      } = Joi.attempt(headers, headerSchema))
    } catch (e) {
      const logHeaders = {
        'x-ratelimit-limit': headers['x-ratelimit-limit'],
        'x-ratelimit-remaining': headers['x-ratelimit-remaining'],
        'x-ratelimit-reset': headers['x-ratelimit-reset'],
      }
      console.log(
        `Invalid GitHub rate limit headers ${JSON.stringify(
          undefined,
          2
        )}`
      )
    }
    const reserve = this.reserveFraction * rateLimit
  }
}
