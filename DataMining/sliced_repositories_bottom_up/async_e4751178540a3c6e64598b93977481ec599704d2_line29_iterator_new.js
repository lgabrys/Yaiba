N
o
 
l
i
n
e
s
import isArrayLike from './isArrayLike';
function createObjectIterator(obj) {
    var okeys = obj ? Object.keys(obj) : [];
    var i = -1;
    var len = okeys.length;
    return function next() {
        var key = okeys[++i];
        return i < len ? {value: obj[key], key} : null;
    };
}
