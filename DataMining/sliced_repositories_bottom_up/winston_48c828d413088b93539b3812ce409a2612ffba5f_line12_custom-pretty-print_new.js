var winston = require('../lib/winston');
function myPrettyPrint(obj) {
  return JSON.stringify(obj)
    .replace(/\{/g, '< wow ')
    .replace(/\:/g, ' such ')
    .replace(/\}/g, ' >');
}
var logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ prettyPrint: myPrettyPrint }),
  ]
});
