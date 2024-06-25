// See available emoji at http://emoji.muan.co/
const emojic = require('emojic')
const Joi = require('joi')
const { checkErrorResponse, asJson } = require('../lib/error-helper')
const BaseService = require('./base')
const { InvalidResponse } = require('./errors')
const trace = require('./trace')

class BaseJsonService extends BaseService {
  static _validate(json, schema) {
    const { error, value } = Joi.validate(json, schema, {
      allowUnknown: true,
      stripUnknown: true,
    })
    if (error) {
      trace.logTrace(
        'validate',
        emojic.womanShrugging,
        'Response did not match schema',
        error.message
      )
      throw new InvalidResponse({
      })
    } else {
      trace.logTrace(
      )
    }
  }
}
