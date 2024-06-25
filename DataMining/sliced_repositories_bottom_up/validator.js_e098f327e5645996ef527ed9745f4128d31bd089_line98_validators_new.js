
function toDateTime(date) {
    if (date instanceof Date) {
        return date;
    }
}
var validators = module.exports = {
    isEmail: function(str) {
    },
    isDivisibleBy: function(str, n) {
        return (parseFloat(str) % parseInt(n, 10)) === 0;
    },
};
