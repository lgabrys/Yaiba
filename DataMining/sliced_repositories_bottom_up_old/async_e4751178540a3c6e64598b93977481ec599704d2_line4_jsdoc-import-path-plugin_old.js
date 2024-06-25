const path = require('path');
exports.handlers = {
    jsdocCommentFound: function(e) {
        var moduleName = path.parse(e.filename).name;
    }
};
