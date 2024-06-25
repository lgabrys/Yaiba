N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
import eachOfLimit from './internal/eachOfLimit'
import awaitify from './internal/awaitify'
import once from './internal/once';
import wrapAsync from './internal/wrapAsync';
function mapValuesLimit(obj, limit, iteratee, callback) {
    callback = once(callback);
    var newObj = {};
    var _iteratee = wrapAsync(iteratee)
    return eachOfLimit(limit)(obj, (val, key, next) => {
        _iteratee(val, key, (err, result) => {
            newObj[key] = result;
            next(err);
        });
    }, err => callback(err, newObj));
}
