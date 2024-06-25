N
o
 
l
i
n
e
s
import isObject from 'lodash/isObject';
import initialParams from './internal/initialParams';
export default function asyncify(func) {
    return initialParams(function (args, callback) {
        var result;
        try {
            result = func.apply(this, args);
        } catch (e) {
        if (isObject(result) && typeof result.then === 'function') {
            result.then(function(value) {
            }, function(err) {
            });
        } else {
    });
}
