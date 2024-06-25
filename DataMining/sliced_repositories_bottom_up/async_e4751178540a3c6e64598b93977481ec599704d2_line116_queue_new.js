N
o
 
l
i
n
e
s
import queue from './internal/queue';
export default function (worker, concurrency) {
    return queue((items, cb) => {
    }, concurrency, 1);
}
