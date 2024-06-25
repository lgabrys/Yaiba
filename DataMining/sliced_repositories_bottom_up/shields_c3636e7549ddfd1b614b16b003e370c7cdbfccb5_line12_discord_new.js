const Joi = require('joi');
const ServiceTester = require('./runner/service-tester');
const t = new ServiceTester({ id: 'discord', title: 'Discord' });
t.create('gets status for Reactiflux')
  .get('/102860784329052160.json')
  .expectJSONTypes(Joi.object().keys({
    name: 'chat',
    value: Joi.string().regex(/^[0-9]+ online$/),
  }));
