var program = require('../')
  , should = require('should');
program.parse('node test -m'.split(' ')).should.throwError();
