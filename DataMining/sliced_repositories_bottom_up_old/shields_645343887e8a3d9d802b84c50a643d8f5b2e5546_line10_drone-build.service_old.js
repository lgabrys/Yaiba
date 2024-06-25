const Joi = require('@hapi/joi')
const { isBuildStatus, renderBuildStatusBadge } = require('../build-status')
const { optionalUrl } = require('../validators')
const { BaseJsonService } = require('..')

const DroneBuildSchema = Joi.object({
  status: Joi.alternatives()
    .try(isBuildStatus, Joi.equal('none'))
}).required()
