import Joi from 'joi'
import JenkinsBase from './jenkins-base.js'
const formatMap = {
  jacoco: {
    schema: Joi.object({
      instructionCoverage: Joi.object({
        percentage: Joi.number().min(0).max(100).required(),
      }).required(),
    }).required(),
    treeQueryParam: 'instructionCoverage[percentage]',
    transform: json => ({ coverage: json.instructionCoverage.percentage }),
    pluginSpecificPath: 'jacoco',
  },
  cobertura: {
    schema: Joi.object({
      results: Joi.object({
        elements: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              ratio: Joi.number().min(0).max(100).required(),
            })
          )
          .has(Joi.object({ name: 'Lines' }))
          .min(1)
          .required(),
      }).required(),
    }).required(),
    treeQueryParam: 'results[elements[name,ratio]]',
    transform: json => {
      const lineCoverage = json.results.elements.find(
        element => element.name === 'Lines'
      )
      return { coverage: lineCoverage.ratio }
    },
    pluginSpecificPath: 'cobertura',
  },
  api: {
    schema: Joi.object({
      results: Joi.object({
        elements: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              ratio: Joi.number().min(0).max(100).required(),
            })
          )
          .has(Joi.object({ name: 'Line' }))
          .min(1)
          .required(),
      }).required(),
    }).required(),
    treeQueryParam: 'results[elements[name,ratio]]',
    transform: json => {
      const lineCoverage = json.results.elements.find(
        element => element.name === 'Line'
      )
      return { coverage: lineCoverage.ratio }
    },
    pluginSpecificPath: 'coverage/result',
  },
}
const documentation = `
export default class JenkinsCoverage extends JenkinsBase {
  static category = 'coverage'
  static route = {
  }
  async handle({ format }, { jobUrl }) {
    const { schema, transform, treeQueryParam, pluginSpecificPath } =
    const json = await this.fetch({
      url: buildUrl({ jobUrl, plugin: pluginSpecificPath }),
      schema,
      searchParams: buildTreeParamQueryString(treeQueryParam),
    })
  }
}
