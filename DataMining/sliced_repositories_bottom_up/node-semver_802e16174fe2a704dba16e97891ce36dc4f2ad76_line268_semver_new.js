const debug = require('../internal/debug')
const { MAX_LENGTH, MAX_SAFE_INTEGER } = require('../internal/constants')
const { re, t } = require('../internal/re')

const parseOptions = require('../internal/parse-options')
const { compareIdentifiers } = require('../internal/identifiers')
class SemVer {
  constructor (version, options) {
    options = parseOptions(options)

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
          version.includePrerelease === !!options.includePrerelease) {
      } else {
        version = version.version
      }
    } else if (typeof version !== 'string') {
    }
    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }
    this.options = options
    this.includePrerelease = !!options.includePrerelease
    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    }
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split('.').map((id) => {
      })
    }
  }
  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`
    }
  }
  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }
    } else if (!this.prerelease.length && other.prerelease.length) {
    } else if (!this.prerelease.length && !other.prerelease.length) {
    }
  }
  inc (release, identifier) {
    switch (release) {
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
      case 'prepatch':
        this.prerelease.length = 0
        ) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        if (this.prerelease.length === 0) {
          this.prerelease = [0]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++
              i = -2
            }
          }
        }
        if (identifier) {
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
          } else {
        }
    }
  }
}
