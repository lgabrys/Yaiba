function SourceMap(options) {
    options = defaults(options, {
        file : null,
        root : null,
        orig : null,

        orig_line_diff : 0,
        dest_line_diff : 0,
    });
    var generator = new MOZ_SourceMap.SourceMapGenerator({
        file       : options.file,
        sourceRoot : options.root
    });
    var orig_map = options.orig && new MOZ_SourceMap.SourceMapConsumer(options.orig);
    if (orig_map && Array.isArray(options.orig.sources)) {
        orig_map._sources.toArray().forEach(function(source) {
            var sourceContent = orig_map.sourceContentFor(source, true);
        });
    }
};
