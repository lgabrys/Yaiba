const Joi = require('@hapi/joi')
const validColors = ['brightgreen', 'green', 'yellow', 'orange', 'red']
const isColor = Joi.string()
  .valid(...validColors)
