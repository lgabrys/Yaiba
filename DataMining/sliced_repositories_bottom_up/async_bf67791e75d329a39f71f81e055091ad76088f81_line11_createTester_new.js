N
o
 
l
i
n
e
s
import wrapAsync from './wrapAsync'
export default function _createTester(check, getResult) {
    return (eachfn, arr, _iteratee, cb) => {
        const iteratee = wrapAsync(_iteratee)
        eachfn(arr, (value, _, callback) => {
            iteratee(value, (err, result) => {
                if (err || err === false) return callback(err);
            });
        });
    };
}
