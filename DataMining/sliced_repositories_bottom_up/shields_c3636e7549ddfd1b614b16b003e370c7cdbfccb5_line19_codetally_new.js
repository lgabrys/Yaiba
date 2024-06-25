const Joi = require('joi');
const ServiceTester = require('./runner/service-tester');
const t = new ServiceTester({ id: 'codetally', title: 'Codetally' });
t.create('Codetally')
  .get('/triggerman722/colorstrap.json')
  .expectJSONTypes(Joi.object().keys({
    name: 'codetally',
    value: Joi.string().regex(/\b\d+(?:.\d+)?/)
  }));
