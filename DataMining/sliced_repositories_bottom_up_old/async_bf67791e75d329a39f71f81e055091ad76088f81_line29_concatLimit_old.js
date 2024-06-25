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
import wrapAsync from './internal/wrapAsync';
import mapLimit from './mapLimit';
import awaitify from './internal/awaitify'
function concatLimit(coll, limit, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return mapLimit(coll, limit, (val, iterCb) => {
        _iteratee(val, (err, ...args) => {
            return iterCb(null, args);
        });
    });
}
