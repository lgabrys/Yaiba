import async from 'async';
import fs from 'fs';
const paths = [
];
function check(callback) {
  async.series(paths.map(p => function(cb) {
    fs.access(p, fs.R_OK | fs.W_OK, (err) => {
      cb(err ? err : new Error('FOUND'));
    });
  });
}
