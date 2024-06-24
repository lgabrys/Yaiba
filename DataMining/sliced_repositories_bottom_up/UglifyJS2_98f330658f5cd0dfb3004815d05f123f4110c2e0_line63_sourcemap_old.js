function SourceMap(options) {
    options = defaults(options, {
        file : null,
        root : null,
        orig : null,

        orig_line_diff : 0,
        dest_line_diff : 0,
    });
    var orig_map = options.orig && new MOZ_SourceMap.SourceMapConsumer(options.orig);
    if (orig_map && Array.isArray(options.orig.sources)) {
        options.orig.sources.forEach(function(source) {
            var sourceContent = orig_map.sourceContentFor(source, true);
        });
    }
};
