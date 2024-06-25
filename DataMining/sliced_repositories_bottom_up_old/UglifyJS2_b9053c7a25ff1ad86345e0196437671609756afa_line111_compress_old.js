function Compressor(options, false_by_default) {
    var keep_fargs = this.options["keep_fargs"];
    this.drop_fargs = keep_fargs == "strict" ? function(lambda, parent) {
        var name = lambda.name;
        if (!name) return parent && parent.TYPE == "Call";
    } : keep_fargs ? return_false : return_true;
}
