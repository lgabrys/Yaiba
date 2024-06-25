var net = require('net');
function toDateTime(date) {
    if (date instanceof Date) {
    }
}
function toDate(date) {
    if (!(date instanceof Date)) {
        date = toDateTime(date);
    }
}
var validators = module.exports = {
    isInt: function(str) {
        return (str % 1 === 0);
    },
};
