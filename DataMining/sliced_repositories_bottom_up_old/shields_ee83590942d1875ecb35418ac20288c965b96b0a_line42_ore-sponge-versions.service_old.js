const { BaseOreService, documentation, keywords } = require('./ore-base')

module.exports = class OreSpongeVersions extends BaseOreService {
  static category = 'platform-support'

  static route = {
    base: 'ore/sponge-versions',
    pattern: ':pluginId',
  }

  static examples = [
    {
      title: 'Compatible versions (plugins on Ore)',
      namedParams: {
        pluginId: 'nucleus',
      },
      staticPreview: this.render({ versions: ['7.3', '6.0'] }),
      documentation,
      keywords,
    },
  ]

  static defaultBadgeData = {
    label: 'sponge',
  }

  static render({ versions }) {
    if (versions.length === 0) {
      return { message: 'none', color: 'inactive' }
    }
    return { message: versions.join(' | '), color: 'blue' }
  }

  transform({ data }) {
    const { promoted_versions } = data
    return {
      versions: promoted_versions
        .reduce((acc, { tags }) => acc.concat(tags), [])
        .filter(({ name }) => name.toLowerCase() === 'sponge')
        .map(({ display_data }) => display_data)
    }
  }
}
