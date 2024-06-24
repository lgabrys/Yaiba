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
import queue from './queue';
import Heap from './internal/Heap';
export default function(worker, concurrency) {
    var q = queue(worker, concurrency);
    q._tasks = new Heap();
    q.push = function(data, priority = 0, callback = () => {}) {
        q.started = true;
        if (!Array.isArray(data)) {
            data = [data];
        }
        if (data.length === 0) {
        }
    };
}
