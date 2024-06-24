var async = require('async');
exports.testRequires = function(test){
    var fn = function(){return 'test';};
    test.same(
        {requires: ['task1','task2'], run: fn}
    );
};
exports.testAuto = function(test){
};

exports.testWaterfall = function(test){
    async.waterfall([
        function(arg1, arg2, arg3, callback){
            process.nextTick(function(){callback('four');});
        },
    ]);
};
