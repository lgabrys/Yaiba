const Joi = require('@hapi/joi')
const { addv } = require('../text-formatters')
const { version: versionColor } = require('../color-formatters')
const { BaseYamlService, InvalidResponse } = require('..')

const schema = Joi.object({
  CurrentVersion: Joi.alternatives()
    .try(Joi.number(), Joi.string())
}).required()
