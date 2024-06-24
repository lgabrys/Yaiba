import Joi from 'joi'
const releaseInfoSchema = Joi.object({
  assets: Joi.array()
  tag_name: Joi.string().required(),
  name: Joi.string().allow(null),
}).required()
