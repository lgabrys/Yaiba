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
import map from './map';
import wrapAsync from './internal/wrapAsync';
import awaitify from './internal/awaitify'
function sortBy (coll, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return map(coll, (x, iterCb) => {
        _iteratee(x, (err, criteria) => {
            iterCb(err, {value: x, criteria});
        });
    });
}
