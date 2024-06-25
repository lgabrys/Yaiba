const Joi = require('joi')
const BaseJsonService = require('../base-json')
const { InvalidResponse, NotFound } = require('../errors')

const deprecatedLicenseObjectSchema = Joi.object({
  type: Joi.string().required(),
})
const schema = Joi.object({
  devDependencies: Joi.object().pattern(/./, Joi.string()),
  engines: Joi.object().pattern(/./, Joi.string()),
  license: Joi.alternatives().try(
    Joi.string(),
    deprecatedLicenseObjectSchema,
    Joi.array().items(
      Joi.alternatives(Joi.string(), deprecatedLicenseObjectSchema)
    )
  ),
}).required()

// Abstract class for NPM badges which display data about the latest version
// of a package.
module.exports = class NpmBase extends BaseJsonService {
  static buildUrl(base, { withTag } = {}) {
    if (withTag) {
      return {
        format: '(?:@([^/]+))?/?([^/]*)/?([^/]*)',
        capture: ['scope', 'packageName', 'tag'],
        queryParams: ['registry_uri'],
      }
    } else {
      return {
        capture: ['scope', 'packageName'],
        queryParams: ['registry_uri'],
      }
    }
  }

  static unpackParams(
    { scope, packageName, tag },
    { registry_uri: registryUrl = 'https://registry.npmjs.org' }
  ) {
    return {
      tag,
      registryUrl,
    }
  }
  static encodeScopedPackage({ scope, packageName }) {
  }
  async fetchPackageData({ registryUrl, scope, packageName, tag }) {
    registryUrl = registryUrl || this.constructor.defaultRegistryUrl
    let url
    if (scope === undefined) {
      // e.g. https://registry.npmjs.org/express/latest
      // these badges, and the response is smaller.
      url = `${registryUrl}/${packageName}/latest`
    } else {
      const scoped = this.constructor.encodeScopedPackage({
      })
      url = `${registryUrl}/${scoped}`
    }
    const json = await this._requestJson({
      // We don't validate here because we need to pluck the desired subkey first.
      schema: Joi.any(),
    })
    } else {
      try {
      } catch (e) {
      } catch (e) {
        throw new InvalidResponse('invalid json response')
      }
    }
  }
}
