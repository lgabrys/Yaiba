const t = (module.exports = require('../create-service-tester')())

t.create('Shields colorscheme color')
  .get('/badge/label-message-blue.json?style=_shields_test')
  .expectJSON({ name: 'label', value: 'message', color: 'blue' })

t.create('CSS named color')
  .get('/badge/label-message-whitesmoke.json?style=_shields_test')
  .expectJSON({ name: 'label', value: 'message', color: 'whitesmoke' })

t.create('RGB color')
  .get('/badge/label-message-rgb(123,123,123).json?style=_shields_test')
  .expectJSON({ name: 'label', value: 'message', color: 'rgb(123,123,123)' })

t.create('All one color')
  .get('/badge/all%20one%20color-red.json?style=_shields_test')
  .expectJSON({ name: '', value: 'all one color', color: 'red' })

t.create('Not a valid color')
  .get('/badge/label-message-notacolor.json?style=_shields_test')
  .expectJSON({ name: 'label', value: 'message' })
