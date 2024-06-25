exports['auto'] = function(test){
};
exports['auto results'] = function(test){
};
exports['auto empty object'] = function(test){
};
exports['auto error'] = function(test){
};
exports['auto no callback'] = function(test){
};
exports['waterfall'] = function(test){
};
exports['waterfall empty array'] = function(test){
};
exports['waterfall no callback'] = function(test){
};
exports['waterfall async'] = function(test){
};
exports['waterfall error'] = function(test){
};
exports['waterfall multiple callback calls'] = function(test){
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
exports['series'] = function(test){
};
exports['series empty array'] = function(test){
};
exports['series error'] = function(test){
};
exports['series no callback'] = function(test){
};
exports['series object'] = function(test){
};
exports['iterator'] = function(test){
};
exports['iterator empty array'] = function(test){
};
exports['iterator.next'] = function(test){
};
exports['forEach'] = function(test){
};
exports['forEach empty array'] = function(test){
};
exports['forEach error'] = function(test){
};
exports['forEachSeries'] = function(test){
};
exports['forEachSeries empty array'] = function(test){
};
exports['forEachSeries error'] = function(test){
};
exports['forEachLimit'] = function(test){
};
exports['forEachLimit empty array'] = function(test){
};
exports['forEachLimit limit exceeds size'] = function(test){
};
exports['forEachLimit limit equal size'] = function(test){
};
exports['forEachLimit zero limit'] = function(test){
};
exports['forEachLimit error'] = function(test){
};
exports['map'] = function(test){
};
exports['map original untouched'] = function(test){
};
exports['map error'] = function(test){
};
exports['mapSeries'] = function(test){
};
exports['mapSeries error'] = function(test){
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
exports['some true'] = function(test){
};
exports['some false'] = function(test){
};
exports['some early return'] = function(test){
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
exports['sortBy'] = function(test){
};
exports['apply'] = function(test){
};
var console_fn_tests = function(name){
    if (typeof console !== 'undefined') {
        exports[name] = function(test){
        };
        exports[name + ' with multiple result params'] = function(test){
        };
    }
    exports[name + ' without console.' + name] = function(test){
    };
};
exports['nextTick'] = function(test){
};
exports['nextTick in the browser'] = function(test){
    setTimeout(function(){
        if (typeof process !== 'undefined') {
            process.nextTick = _nextTick;
        }
    }, 50);
};
exports['noConflict - node only'] = function(test){
    if (typeof process !== 'undefined') {
        var fs = require('fs');
        var filename = __dirname + '/../lib/async.js';
        fs.readFile(filename, function(err, content){
            var Script = process.binding('evals').Script;
        });
    }
};
