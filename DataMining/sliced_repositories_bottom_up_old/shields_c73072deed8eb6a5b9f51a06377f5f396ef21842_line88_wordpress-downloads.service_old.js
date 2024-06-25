import BaseWordpress from './wordpress-base.js'
const extensionData = {
  plugin: {
    capt: 'Plugin',
    exampleSlug: 'bbpress',
  },
  theme: {
    capt: 'Theme',
    exampleSlug: 'twentyseventeen',
  },
}
function DownloadsForExtensionType(extensionType) {
  return class WordpressDownloads extends BaseWordpress {
    async handle({ interval, slug }) {
      } else {
        const json = await this._requestJson({
          options: {
            qs: {
            },
          },
        })
      }
    }
  }
}
