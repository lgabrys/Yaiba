const path = require('path');
exports.handlers = {
    jsdocCommentFound(e) {
        var moduleName = path.parse(e.filename).name;
    }
};
