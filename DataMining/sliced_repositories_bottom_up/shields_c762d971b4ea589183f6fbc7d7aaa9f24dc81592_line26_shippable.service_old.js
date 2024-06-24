const Joi = require('@hapi/joi')
const { renderBuildStatusBadge } = require('../build-status')
const { BaseJsonService, NotFound } = require('..')

// source: https://github.com/badges/shields/pull/1362#discussion_r161693830
const statusCodes = {
  0: 'waiting',
  10: 'queued',
  20: 'processing',
  30: 'success',
  40: 'skipped',
  50: 'unstable',
  60: 'timeout',
  70: 'cancelled',
  80: 'failed',
  90: 'stopped',
}

const schema = Joi.array()
  .items(
    Joi.object({
      branchName: Joi.string().required(),
      statusCode: Joi.number()
        .valid(Object.keys(statusCodes).map(key => parseInt(key)))
    }).required()
  )
