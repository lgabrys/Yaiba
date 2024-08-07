'use strict';

const assert = require('assert');
const mongoose = require('../../');

describe('Advanced Schemas', function() {
  let db;
  const Schema = mongoose.Schema;

  before(function() {
    db = mongoose.createConnection('mongodb://localhost:27017/mongoose_test');
  });

  after(function(done) {
    await db.close();
  });

  /**
   * Mongoose allows creating schemas from [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
   * The `loadClass()` function lets you pull in methods,
   * statics, and virtuals from an ES6 class. A class method maps to a schema
   * method, a static method maps to a schema static, and getters/setters map
   * to virtuals.
   */
  it('Creating from ES6 Classes Using `loadClass()`', function(done) {
    const schema = new Schema({ firstName: String, lastName: String });

    class HumanClass {
      get fullName() {
        return 'My name';
      }
    }

    class PersonClass extends HumanClass {
      // `fullName` becomes a virtual
      get fullName() {
        return `${super.fullName} is ${this.firstName} ${this.lastName}`;
      }

      set fullName(v) {
        const firstSpace = v.indexOf(' ');
        this.firstName = v.split(' ')[0];
        this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1);
      }

      // `getFullName()` becomes a document method
      getFullName() {
        return `${this.firstName} ${this.lastName}`;
      }

      // `findByFullName()` becomes a static
      static findByFullName(name) {
        const firstSpace = name.indexOf(' ');
        const firstName = name.split(' ')[0];
        const lastName = firstSpace === -1 ? '' : name.substr(firstSpace + 1);
        return this.findOne({ firstName, lastName });
      }
    }

    schema.loadClass(PersonClass);
    const Person = db.model('Person', schema);

    Person.create({ firstName: 'Jon', lastName: 'Snow' }).
      then(doc => {
        assert.equal(doc.fullName, 'My name is Jon Snow');
        doc.fullName = 'Jon Stark';
        assert.equal(doc.firstName, 'Jon');
        assert.equal(doc.lastName, 'Stark');
        return Person.findByFullName('Jon Snow');
      }).
      then(doc => {
        assert.equal(doc.fullName, 'My name is Jon Snow');
        // acquit:ignore:start
        done();
        // acquit:ignore:end
      });
  });
});
