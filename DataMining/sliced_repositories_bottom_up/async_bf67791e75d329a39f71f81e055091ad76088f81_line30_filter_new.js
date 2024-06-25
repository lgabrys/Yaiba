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
import isArrayLike from './isArrayLike';
import wrapAsync from './wrapAsync';
function filterArray(eachfn, arr, iteratee, callback) {
}
function filterGeneric(eachfn, coll, iteratee, callback) {
    eachfn(coll, (x, index, iterCb) => {
        iteratee(x, (err, v) => {
            iterCb(err);
        });
    });
}
