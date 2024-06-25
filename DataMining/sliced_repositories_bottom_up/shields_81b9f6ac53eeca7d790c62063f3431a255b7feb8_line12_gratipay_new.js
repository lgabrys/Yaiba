const Joi = require('joi');
const ServiceTester = require('./runner/service-tester');
const t = new ServiceTester({ id: 'gratipay', title: 'Gratipay' });
t.create('Receiving')
  .get('/Gratipay.json')
  .expectJSONTypes(Joi.object().keys({
    name: 'receives',
    value: Joi.string().regex(/^\$[0-9]+(\.[0-9]{2})?\/week/)
  }));
