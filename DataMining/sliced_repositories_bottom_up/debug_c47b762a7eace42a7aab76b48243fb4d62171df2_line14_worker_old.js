var a = require('../')('worker a')
  , b = require('../')('worker b');
function work() {
  a('doing some work');
}
function workb() {
  setTimeout(work, Math.random() * 1000);
}
