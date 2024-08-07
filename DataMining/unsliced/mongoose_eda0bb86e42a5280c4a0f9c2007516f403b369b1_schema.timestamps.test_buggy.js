'use strict';

/**
 * Test dependencies.
 */

const assert = require('power-assert');
const co = require('co');
const start = require('./common');

const mongoose = start.mongoose;
const Schema = mongoose.Schema;

describe('schema options.timestamps', function() {
  var conn;

  before(function() {
    conn = start();
  });

  after(function(done) {
    conn.close(done);
  });

  describe('create schema with options.timestamps', function() {
    it('should have createdAt and updatedAt fields', function(done) {
      var TestSchema = new Schema({
        name: String
      }, {
        timestamps: true
      });

      assert.ok(TestSchema.path('createdAt'));
      assert.ok(TestSchema.path('updatedAt'));
      done();
    });

    it('should have createdAt and updatedAt fields', function(done) {
      var TestSchema = new Schema({
        name: String
      });

      TestSchema.set('timestamps', true);

      assert.ok(TestSchema.path('createdAt'));
      assert.ok(TestSchema.path('updatedAt'));
      done();
    });

    it('should have created and updatedAt fields', function(done) {
      var TestSchema = new Schema({
        name: String
      }, {
        timestamps: {
          createdAt: 'created'
        }
      });

      assert.ok(TestSchema.path('created'));
      assert.ok(TestSchema.path('updatedAt'));
      done();
    });

    it('should have created and updatedAt fields', function(done) {
      var TestSchema = new Schema({
        name: String
      });

      TestSchema.set('timestamps', {
        createdAt: 'created'
      });

      assert.ok(TestSchema.path('created'));
      assert.ok(TestSchema.path('updatedAt'));
      done();
    });

    it('should have created and updated fields', function(done) {
      var TestSchema = new Schema({
        name: String
      }, {
        timestamps: {
          createdAt: 'created',
          updatedAt: 'updated'
        }
      });

      assert.ok(TestSchema.path('created'));
      assert.ok(TestSchema.path('updated'));
      done();
    });

    it('should have created and updated fields', function(done) {
      var TestSchema = new Schema({
        name: String
      });

      TestSchema.set('timestamps', {
        createdAt: 'created',
        updatedAt: 'updated'
      });

      assert.ok(TestSchema.path('created'));
      assert.ok(TestSchema.path('updated'));
      done();
    });

    it('should not override createdAt when not selected (gh-4340)', function(done) {
      var TestSchema = new Schema({
        name: String
      }, {
        timestamps: true
      });

      var Test = conn.model('Test', TestSchema);

      Test.create({
        name: 'hello'
      }, function(err, doc) {
        // Let’s save the dates to compare later.
        var createdAt = doc.createdAt;
        var updatedAt = doc.updatedAt;

        assert.ok(doc.createdAt);

        Test.findById(doc._id, { name: true }, function(err, doc) {
          // The dates shouldn’t be selected here.
          assert.ok(!doc.createdAt);
          assert.ok(!doc.updatedAt);

          doc.name = 'world';

          doc.save(function(err, doc) {
            // Let’s save the new updatedAt date as it should have changed.
            var newUpdatedAt = doc.updatedAt;

            assert.ok(!doc.createdAt);
            assert.ok(doc.updatedAt);

            Test.findById(doc._id, function(err, doc) {
              // Let’s make sure that everything is working again by
              // comparing the dates with the ones we saved.
              assert.equal(doc.createdAt.valueOf(), createdAt.valueOf());
              assert.notEqual(doc.updatedAt.valueOf(), updatedAt.valueOf());
              assert.equal(doc.updatedAt.valueOf(), newUpdatedAt.valueOf());

              done();
            });
          });
        });
      });
    });
  });

  describe('auto update createdAt and updatedAt when create/save/update document', function() {
    var CatSchema;
    var Cat;

    before(function() {
      CatSchema = new Schema({
        name: String,
        hobby: String
      }, {timestamps: true});
      Cat = conn.model('Cat', CatSchema);
      return Cat.deleteMany({});
    });

    it('should have fields when create', function(done) {
      var cat = new Cat({name: 'newcat'});
      cat.save(function(err, doc) {
        assert.ok(doc.createdAt);
        assert.ok(doc.updatedAt);
        assert.ok(doc.createdAt.getTime() === doc.updatedAt.getTime());
        done();
      });
    });

    it('should have fields when create with findOneAndUpdate', function(done) {
      Cat.findOneAndUpdate({name: 'notexistname'}, {$set: {}}, {upsert: true, new: true}, function(err, doc) {
        assert.ok(doc.createdAt);
        assert.ok(doc.updatedAt);
        assert.ok(doc.createdAt.getTime() === doc.updatedAt.getTime());
        done();
      });
    });

    it('should change updatedAt when save', function(done) {
      Cat.findOne({name: 'newcat'}, function(err, doc) {
        var old = doc.updatedAt;

        doc.hobby = 'coding';

        doc.save(function(err, doc) {
          assert.ok(doc.updatedAt.getTime() > old.getTime());
          done();
        });
      });
    });

    it('should not change updatedAt when save with no modifications', function(done) {
      Cat.findOne({name: 'newcat'}, function(err, doc) {
        var old = doc.updatedAt;

        doc.save(function(err, doc) {
          assert.ok(doc.updatedAt.getTime() === old.getTime());
          done();
        });
      });
    });

    it('should change updatedAt when findOneAndUpdate', function(done) {
      Cat.create({name: 'test123'}, function(err) {
        assert.ifError(err);
        Cat.findOne({name: 'test123'}, function(err, doc) {
          var old = doc.updatedAt;
          Cat.findOneAndUpdate({name: 'test123'}, {$set: {hobby: 'fish'}}, {new: true}, function(err, doc) {
            assert.ok(doc.updatedAt.getTime() > old.getTime());
            done();
          });
        });
      });
    });

    it('insertMany with createdAt off (gh-6381)', function() {
      const CatSchema = new Schema({
        name: String,
        createdAt: {
          type: Date,
          default: function() {
            return new Date('2013-06-01');
          }
        }
      },
      {
        timestamps: {
          createdAt: false,
          updatedAt: true
        }
      });

      const Cat = conn.model('gh6381', CatSchema);

      const d = new Date('2011-06-01');

      return co(function*() {
        yield Cat.insertMany([{ name: 'a' }, { name: 'b', createdAt: d }]);

        const cats = yield Cat.find().sort('name');

        assert.equal(cats[0].createdAt.valueOf(), new Date('2013-06-01').valueOf());
        assert.equal(cats[1].createdAt.valueOf(), new Date('2011-06-01').valueOf());
      });
    });

    it.skip('should have fields when update', function(done) {
      Cat.findOne({name: 'newcat'}, function(err, doc) {
        var old = doc.updatedAt;
        Cat.update({name: 'newcat'}, {$set: {hobby: 'fish'}}, function() {
          Cat.findOne({name: 'newcat'}, function(err, doc) {
            assert.ok(doc.updatedAt.getTime() > old.getTime());
            done();
          });
        });
      });
    });

    it('should change updatedAt when updateOne', function(done) {
      Cat.findOne({name: 'newcat'}, function(err, doc) {
        var old = doc.updatedAt;
        Cat.updateOne({name: 'newcat'}, {$set: {hobby: 'fish'}}, function() {
          Cat.findOne({name: 'newcat'}, function(err, doc) {
            assert.ok(doc.updatedAt.getTime() > old.getTime());
            done();
          });
        });
      });
    });

    it('should change updatedAt when updateMany', function(done) {
      Cat.findOne({name: 'newcat'}, function(err, doc) {
        var old = doc.updatedAt;
        Cat.updateMany({name: 'newcat'}, {$set: {hobby: 'fish'}}, function() {
          Cat.findOne({name: 'newcat'}, function(err, doc) {
            assert.ok(doc.updatedAt.getTime() > old.getTime());
            done();
          });
        });
      });
    });

    it('nested docs (gh-4049)', function(done) {
      var GroupSchema = new Schema({
        cats: [CatSchema]
      });

      var Group = conn.model('gh4049', GroupSchema);
      var now = Date.now();
      Group.create({ cats: [{ name: 'Garfield' }] }, function(error, group) {
        assert.ifError(error);
        assert.ok(group.cats[0].createdAt);
        assert.ok(group.cats[0].createdAt.getTime() >= now);
        done();
      });
    });

    it('nested docs with push (gh-4049)', function(done) {
      var GroupSchema = new Schema({
        cats: [CatSchema]
      });

      var Group = conn.model('gh4049_0', GroupSchema);
      var now = Date.now();
      Group.create({ cats: [{ name: 'Garfield' }] }, function(error, group) {
        assert.ifError(error);
        group.cats.push({ name: 'Keanu' });
        group.save(function(error) {
          assert.ifError(error);
          Group.findById(group._id, function(error, group) {
            assert.ifError(error);
            assert.ok(group.cats[1].createdAt);
            assert.ok(group.cats[1].createdAt.getTime() > now);
            done();
          });
        });
      });
    });

    after(function(done) {
      return Cat.deleteMany({});
    });
  });
});
