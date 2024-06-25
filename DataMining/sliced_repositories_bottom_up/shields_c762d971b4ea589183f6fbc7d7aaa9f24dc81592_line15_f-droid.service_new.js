const Joi = require('@hapi/joi')
const { addv } = require('../text-formatters')
const { version: versionColor } = require('../color-formatters')
const { BaseYamlService, InvalidResponse } = require('..')

const schema = Joi.object({
  CurrentVersion: Joi.alternatives()
    .try(Joi.string(), Joi.number())
    .required(),
}).required()

const queryParamSchema = Joi.object({
  metadata_format: Joi.string().valid('yml', 'txt'),
}).required()
