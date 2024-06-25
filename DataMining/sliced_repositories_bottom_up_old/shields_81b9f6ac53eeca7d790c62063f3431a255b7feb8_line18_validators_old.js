const Joi = require('joi');
const withRegex = (re) => Joi.string().regex(re);
const isMetricOverTimePeriod = withRegex(/^[0-9]+[kMGTPEZY]?\/(year|month|week|day)$/);
