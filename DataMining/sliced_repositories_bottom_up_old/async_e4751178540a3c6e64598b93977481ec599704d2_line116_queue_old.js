N
o
 
l
i
n
e
s
import queue from './internal/queue';
export default function (worker, concurrency) {
    return queue(function (items, cb) {
    }, concurrency, 1);
}
