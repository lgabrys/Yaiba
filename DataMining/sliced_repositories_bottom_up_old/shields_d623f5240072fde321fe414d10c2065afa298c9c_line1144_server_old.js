var metricPrefix = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
var metricPower = Array.apply(null, Array(metricPrefix.length))
    .map(function(a, i) { return Math.pow(1000, i + 1); });
