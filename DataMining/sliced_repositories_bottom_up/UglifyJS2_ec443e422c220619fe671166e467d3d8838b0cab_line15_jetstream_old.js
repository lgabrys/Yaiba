if (typeof phantom == "undefined") {
    var args = process.argv.slice(2);
    if (!args.length) {
        args.push("-mc", "warnings=false");
    }
} else {
