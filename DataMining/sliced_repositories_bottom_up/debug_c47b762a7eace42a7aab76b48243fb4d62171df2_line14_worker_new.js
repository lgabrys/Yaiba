  , b = require('../')('worker b');
function workb() {
  b('doing some work');
  setTimeout(workb, Math.random() * 1000);
}
