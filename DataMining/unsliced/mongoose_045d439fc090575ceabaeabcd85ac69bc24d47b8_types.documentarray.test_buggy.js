
/**
 * Module dependencies.
 */

var mongoose = require('./common').mongoose
  , MongooseArray = mongoose.Types.Array
  , MongooseDocumentArray = mongoose.Types.DocumentArray
  , EmbeddedDocument = require('mongoose/types/document')
  , DocumentArray = require('mongoose/types/documentarray')
  , Schema = mongoose.Schema


/**
 * Setup.
 */

function TestDoc (schema) {
  var Subdocument = function () {
    EmbeddedDocument.call(this, {}, new DocumentArray);
  };

  /**
   * Inherits from EmbeddedDocument.
   */

  Subdocument.prototype.__proto__ = EmbeddedDocument.prototype;

  /**
   * Set schema.
   */

  var SubSchema = new Schema({
      title: { type: String }
  });

  Subdocument.prototype.schema = schema || SubSchema;

  return Subdocument;
}

/**
 * Test.
 */

module.exports = {

  'test that a mongoose array behaves and quacks like an array': function(){
    var a = new MongooseDocumentArray();

    a.should.be.an.instanceof(Array);
    a.should.be.an.instanceof(MongooseArray);
    a.should.be.an.instanceof(MongooseDocumentArray);
    Array.isArray(a).should.be.true;
    Array.isArray(a._atomics).should.be.true;
    'object'.should.eql(typeof a);

    var b = new MongooseArray([1,2,3,4]);
    'object'.should.eql(typeof b);
    Object.keys(b).length.should.equal(4);
  },

  '#id': function () {
    var Subdocument = TestDoc();

    var sub1 = new Subdocument();
    sub1.title = 'Hello again to all my friends';
    var id = sub1.id;

    var a = new MongooseDocumentArray([sub1]);
    a.id(id).title.should.equal('Hello again to all my friends');
    a.id(sub1._id).title.should.equal('Hello again to all my friends');

    // test with custom string _id
    var Custom = new Schema({
        title: { type: String }
      , _id:   { type: String, required: true }
    });

    var Subdocument = TestDoc(Custom);

    var sub2 = new Subdocument();
    sub2.title = 'together we can play some rock-n-roll';
    sub2._id = 'a25';
    var id2 = sub2.id;

    var a = new MongooseDocumentArray([sub2]);
    a.id(id2).title.should.equal('together we can play some rock-n-roll');
    a.id(sub2._id).title.should.equal('together we can play some rock-n-roll');

    // test with custom number _id
    var CustNumber = new Schema({
        title: { type: String }
      , _id:   { type: Number, required: true }
    });

    var Subdocument = TestDoc(CustNumber);

    var sub3 = new Subdocument();
    sub3.title = 'rock-n-roll';
    sub3._id = 1995;
    var id3 = sub3.id;

    var a = new MongooseDocumentArray([sub3]);
    a.id(id3).title.should.equal('rock-n-roll');
    a.id(sub3._id).title.should.equal('rock-n-roll');
  }

};
