import Joi from 'joi'
import JenkinsBase from './jenkins-base.js'
// https://github.com/jenkinsci/jenkins/blob/master/core/src/main/java/hudson/model/BallColor.java#L56
const colorStatusMap = {
  red: 'failing',
  red_anime: 'building',
  yellow: 'unstable',
  yellow_anime: 'building',
  blue: 'passing',
  blue_anime: 'building',
  green: 'passing',
  green_anime: 'building',
  grey: 'not built',
  grey_anime: 'building',
  disabled: 'not built',
  disabled_anime: 'building',
  aborted: 'not built',
  aborted_anime: 'building',
  notbuilt: 'not built',
  notbuilt_anime: 'building',
}
const schema = Joi.object({
  color: Joi.allow(...Object.keys(colorStatusMap)).required(),
}).required()
export default class JenkinsBuild extends JenkinsBase {
  static category = 'build'
  static route = {
  }
  async handle(namedParams, { jobUrl }) {
    const json = await this.fetch({
      url: buildUrl({ jobUrl, lastCompletedBuild: false }),
      schema,
      qs: buildTreeParamQueryString('color'),
    })
  }
}
