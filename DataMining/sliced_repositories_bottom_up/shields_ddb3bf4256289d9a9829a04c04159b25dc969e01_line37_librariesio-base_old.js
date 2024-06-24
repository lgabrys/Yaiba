const Joi = require('joi')
const BaseJsonService = require('../base-json')
const { InvalidResponse } = require('../errors')
const { nonNegativeInteger, anyInteger } = require('../validators')

// API doc: https://libraries.io/api#project
// We distinguishb between packages and repos based on the presence of the
// `platform` key.
const packageSchema = Joi.object({
  platform: Joi.string().required(),
  dependents_count: nonNegativeInteger,
  dependent_repos_count: nonNegativeInteger,
  rank: anyInteger,
}).required()

const repoSchema = Joi.object({
  platform: Joi.any().forbidden(),
}).required()
const packageOrRepoSchema = Joi.alternatives(repoSchema, packageSchema)

class LibrariesIoBase extends BaseJsonService {
  static buildUrl(base) {
    return {
      base,
      capture: ['platform', 'packageName'],
    }
  }
  async fetch({ platform, packageName }, { allowPackages, allowRepos } = {}) {
    const json = await this._requestJson({
      schema: packageOrRepoSchema,
      url: `https://libraries.io/api/${platform}/${packageName}`,
      notFoundMessage: 'package not found',
    })
  }
}
