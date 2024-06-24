N
o
 
l
i
n
e
s
import wrapAsync from './internal/wrapAsync';

function constant(value) {
}
const DEFAULT_TIMES = 5;
const DEFAULT_INTERVAL = 0;
export default function retry(opts, task, callback) {
    var options = {
        times: DEFAULT_TIMES,
        intervalFunc: constant(DEFAULT_INTERVAL)
    };
    if (arguments.length < 3 && typeof opts === 'function') {
        callback = task || promiseCallback();
        task = opts;
    } else {
        callback = callback || promiseCallback();
    }
    var _task = wrapAsync(task);
    var attempt = 1;
    function retryAttempt() {
        _task((err, ...args) => {
            if (err === false) return
            if (err && attempt++ < options.times &&
                (typeof options.errorFilter != 'function' ||
                    options.errorFilter(err))) {
                setTimeout(retryAttempt, options.intervalFunc(attempt));
            } else {
        });
    }
}
