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
import onlyOnce from './internal/onlyOnce';
import awaitify from './internal/awaitify';
function whilst(test, iteratee, callback) {
    callback = onlyOnce(callback);
    var results = [];
}
