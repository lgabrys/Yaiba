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
import mapLimit from './mapLimit';
import wrapAsync from './internal/wrapAsync';
import awaitify from './internal/awaitify'
function groupByLimit(coll, limit, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return mapLimit(coll, limit, (val, iterCb) => {
        _iteratee(val, (err, key) => {
            return iterCb(null, {key, val});
        });
    });
}
