var async = require('../lib/async');
exports['forever'] = {
};
exports['applyEach'] = function (test) {
};
exports['applyEachSeries'] = function (test) {
};
exports['applyEach partial application'] = function (test) {
};
exports['compose'] = function (test) {
};
exports['compose error'] = function (test) {
};
exports['compose binding'] = function (test) {
};
exports['seq'] = function (test) {
};
exports['seq error'] = function (test) {
};
exports['seq binding'] = function (test) {
};
exports['seq without callback'] = function (test) {
};
exports['auto'] = function(test){
};
exports['auto petrify'] = function (test) {
};
exports['auto results'] = function(test){
};
exports['auto empty object'] = function(test){
};
exports['auto error'] = function(test){
};
exports['auto no callback'] = function(test){
};
exports['auto error should pass partial results'] = function(test) {
};
exports['auto removeListener has side effect on loop iterator'] = function(test) {
};
exports['auto calls callback multiple times'] = function(test) {
};
exports['auto calls callback multiple times with parallel functions'] = function(test) {
};
exports['auto modifying results causes final callback to run early'] = function(test) {
};
exports['auto prevent dead-locks due to inexistant dependencies'] = function(test) {
};
exports['auto prevent dead-locks due to cyclic dependencies'] = function(test) {
};
exports['retry when attempt succeeds'] = function(test) {
};
exports['retry when all attempts succeeds'] = function(test) {
};
exports['retry fails with invalid arguments'] = function(test) {
};
exports['retry with interval when all attempts succeeds'] = function(test) {
};
exports['retry as an embedded task'] = function(test) {
};
exports['retry as an embedded task with interval'] = function(test) {
};
exports['waterfall'] = {
};
exports['parallel'] = function(test){
};
exports['parallel empty array'] = function(test){
};
exports['parallel error'] = function(test){
};
exports['parallel no callback'] = function(test){
};
exports['parallel object'] = function(test){
};
exports['paralel falsy return values'] = function (test) {
};
exports['parallel limit'] = function(test){
};
exports['parallel limit empty array'] = function(test){
};
exports['parallel limit error'] = function(test){
};
exports['parallel limit no callback'] = function(test){
};
exports['parallel limit object'] = function(test){
};
exports['parallel call in another context'] = function(test) {
};
exports['parallel does not continue replenishing after error'] = function (test) {
};
exports['series'] = {
};
exports['iterator'] = function(test){
};
exports['iterator empty array'] = function(test){
};
exports['iterator.next'] = function(test){
};
exports['each'] = function(test){
};
exports['each extra callback'] = function(test){
};
exports['each empty array'] = function(test){
};
exports['each empty array, with other property on the array'] = function(test){
};
exports['each error'] = function(test){
};
exports['each no callback'] = function(test){
};
exports['forEach alias'] = function (test) {
};
exports['forEachOf'] = function(test){
};
exports['forEachOf empty object'] = function(test){
};
exports['forEachOf empty array'] = function(test){
};
exports['forEachOf error'] = function(test){
};
exports['forEachOf no callback'] = function(test){
};
exports['forEachOf with array'] = function(test){
};
exports['eachSeries'] = function(test){
};
exports['eachSeries empty array'] = function(test){
};
exports['eachSeries array modification'] = function(test) {
};
exports['eachSeries single item'] = function (test) {
};
exports['eachSeries single item'] = function (test) {
};
exports['eachSeries error'] = function(test){
};
exports['eachSeries no callback'] = function(test){
};
exports['eachLimit'] = function(test){
};
exports['eachLimit empty array'] = function(test){
};
exports['eachLimit limit exceeds size'] = function(test){
};
exports['eachLimit limit equal size'] = function(test){
};
exports['eachLimit zero limit'] = function(test){
};
exports['eachLimit error'] = function(test){
};
exports['eachLimit no callback'] = function(test){
};
exports['eachLimit synchronous'] = function(test){
};
exports['eachLimit does not continue replenishing after error'] = function (test) {
};
exports['forEachSeries alias'] = function (test) {
};
exports['forEachOfSeries'] = function(test){
};
exports['forEachOfSeries empty object'] = function(test){
};
exports['forEachOfSeries error'] = function(test){
};
exports['forEachOfSeries no callback'] = function(test){
};
exports['forEachOfSeries with array'] = function(test){
};
exports['forEachLimit alias'] = function (test) {
};
exports['forEachOfLimit'] = function(test){
};
exports['forEachOfLimit empty object'] = function(test){
};
exports['forEachOfLimit limit exceeds size'] = function(test){
};
exports['forEachOfLimit limit equal size'] = function(test){
};
exports['forEachOfLimit zero limit'] = function(test){
};
exports['forEachOfLimit error'] = function(test){
};
exports['forEachOfLimit no callback'] = function(test){
};
exports['forEachOfLimit synchronous'] = function(test){
};
exports['forEachOfLimit with array'] = function(test){
};
exports['map'] = {
};
exports['reduce'] = function(test){
};
exports['reduce async with non-reference memo'] = function(test){
};
exports['reduce error'] = function(test){
};
exports['inject alias'] = function(test){
};
exports['foldl alias'] = function(test){
};
exports['reduceRight'] = function(test){
};
exports['foldr alias'] = function(test){
};
exports['filter'] = function(test){
};
exports['filter original untouched'] = function(test){
};
exports['filterSeries'] = function(test){
};
exports['select alias'] = function(test){
};
exports['selectSeries alias'] = function(test){
};
exports['reject'] = function(test){
};
exports['reject original untouched'] = function(test){
};
exports['rejectSeries'] = function(test){
};
exports['rejectLimit'] = function(test) {
};
exports['filterLimit'] = function(test) {
};
exports['some true'] = function(test){
};
exports['some false'] = function(test){
};
exports['some early return'] = function(test){
};
exports['someLimit true'] = function(test){
};
exports['someLimit false'] = function(test){
};
exports['every true'] = function(test){
};
exports['everyLimit false'] = function(test){
};
exports['everyLimit short-circuit'] = function(test){
};
exports['someLimit short-circuit'] = function(test){
};
exports['any alias'] = function(test){
};
exports['every true'] = function(test){
};
exports['every false'] = function(test){
};
exports['every early return'] = function(test){
};
exports['all alias'] = function(test){
};
exports['detect'] = function(test){
};
exports['detect - mulitple matches'] = function(test){
};
exports['detectSeries'] = function(test){
};
exports['detectSeries - multiple matches'] = function(test){
};
exports['detectSeries - ensure stop'] = function (test) {
};
exports['sortBy'] = function(test){
};
exports['sortBy inverted'] = function(test){
};
exports['sortBy error'] = function(test){
    async.sortBy([{a:1},{a:15},{a:6}], function(x, callback){
    }, function(err, result){
    });
};
