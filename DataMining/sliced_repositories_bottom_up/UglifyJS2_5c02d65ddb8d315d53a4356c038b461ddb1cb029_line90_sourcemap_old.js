function SourceMap(options) {
    options = defaults(options, {
        file : null,
        root : null,
        orig : null,

        orig_line_diff : 0,
        dest_line_diff : 0,
    });
    var orig_map = options.orig && new MOZ_SourceMap.SourceMapConsumer(options.orig);
    var generator;
    if (orig_map) {
      generator = MOZ_SourceMap.SourceMapGenerator.fromSourceMap(orig_map);
    } else {
        generator = new MOZ_SourceMap.SourceMapGenerator({
            file       : options.file,
            sourceRoot : options.root
        });
    }
    function add(source, gen_line, gen_col, orig_line, orig_col, name) {
        if (orig_map) {
            var info = orig_map.originalPositionFor({
            });
            source = info.source;
            orig_line = info.line;
            orig_col = info.column;
            name = info.name || name;
        }
    }
    return {
        add        : add,
        get        : function() { return generator },
        toString   : function() { return generator.toString() }
    };
};
