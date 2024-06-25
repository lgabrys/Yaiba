var optimist = require('../index');
var assert = require('assert');
var path = require('path');

var localExpresso = path.normalize(
);

var expresso = process.argv[1] === localExpresso
;
exports['short boolean'] = function () {
    var parse = optimist.parse([ '-b' ]);
    assert.eql(parse, { b : true, _ : [], $0 : expresso });
};
exports['long boolean'] = function () {
    assert.eql(
        { bool : true, _ : [], $0 : expresso }
    );
};
exports.bare = function () {
    assert.eql(
        { _ : [ 'foo', 'bar', 'baz' ], $0 : expresso }
    );
};
exports['short group'] = function () {
    assert.eql(
        { c : true, a : true, t : true, s : true, _ : [], $0 : expresso }
    );
};
exports['short group next'] = function () {
    assert.eql(
        { c : true, a : true, t : true, s : 'meow', _ : [], $0 : expresso }
    );
};
exports['short capture'] = function () {
    assert.eql(
        { h : 'localhost', _ : [], $0 : expresso }
    );
};
exports['short captures'] = function () {
    assert.eql(
        { h : 'localhost', p : 555, _ : [], $0 : expresso }
    );
};
exports['long capture sp'] = function () {
    assert.eql(
        optimist.parse([ '--pow', 'xixxle' ]),
        { pow : 'xixxle', _ : [], $0 : expresso }
    );
};
exports['long capture eq'] = function () {
    assert.eql(
        { pow : 'xixxle', _ : [], $0 : expresso }
    );
};
exports['long captures sp'] = function () {
    assert.eql(
        { host : 'localhost', port : 555, _ : [], $0 : expresso }
    );
};
exports['long captures eq'] = function () {
    assert.eql(
        { host : 'localhost', port : 555, _ : [], $0 : expresso }
    );
};
exports['mixed short bool and capture'] = function () {
    assert.eql(
        optimist.parse([ '-h', 'localhost', '-fp', '555', 'script.js' ]),
    );
};
exports['short and long'] = function () {
};
exports.no = function () {
    assert.eql(
        { moo : false, _ : [], $0 : expresso }
    );
};
exports.multi = function () {
    assert.eql(
        { v : ['a','b','c'], _ : [], $0 : expresso }
    );
};
exports.comprehensive = function () {
    assert.eql(
        {
            h : 'awesome',
        }
    );
};
exports.nums = function () {
    var argv = optimist.parse([
        '-x', '1234',
    ]);
};
exports['flag boolean'] = function () {
    var parse = optimist([ '-t', 'moo' ]).boolean(['t']).argv;
    assert.eql(parse, { t : true, _ : [ 'moo' ], $0 : expresso });
};
exports['flag boolean value'] = function () {
    var parse = optimist(['--verbose', 'false', 'moo', '-t', 'true'])
};
exports['flag boolean default false'] = function () {
    var parse = optimist(['moo'])

};
exports['boolean groups'] = function () {
    var parse = optimist([ '-x', '-z', 'one', 'two', 'three' ])
};
exports.strings = function () {
    var s = optimist([ '-s', '0001234' ]).string('s').argv.s;
    var x = optimist([ '-x', '56' ]).string('x').argv.x;
};
exports.stringArgs = function () {
    var s = optimist([ '  ', '  ' ]).string('_').argv._;
};
exports.slashBreak = function () {
    assert.eql(
        { I : '/foo/bar/baz', _ : [], $0 : expresso }
    );
};
exports.alias = function () {
    var argv = optimist([ '-f', '11', '--zoom', '55' ])
};
exports.multiAlias = function () {
    var argv = optimist([ '-f', '11', '--zoom', '55' ])
};
exports['boolean default true'] = function () {
    var argv = optimist.options({
    }).argv;
};
exports['boolean default false'] = function () {
    var argv = optimist.options({
    }).argv;
};
exports['nested dotted objects'] = function () {
    var argv = optimist([
    ]).argv;
    assert.deepEqual(argv.foo, {
        quux : {
            quibble : 5,
            o_O : true
        },
    });
};
