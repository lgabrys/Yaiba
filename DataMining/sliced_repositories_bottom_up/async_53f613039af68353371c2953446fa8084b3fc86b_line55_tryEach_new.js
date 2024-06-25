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
import eachSeries from './eachSeries';
import noop from './internal/noop';
import wrapAsync from './internal/wrapAsync';
export default function tryEach(tasks, callback) {
    callback = callback || noop;
    eachSeries(tasks, function(task, callback) {
        wrapAsync(task)(function (err, res/*, ...args*/) {
            callback(err ? null : {});
        });
    });
}
