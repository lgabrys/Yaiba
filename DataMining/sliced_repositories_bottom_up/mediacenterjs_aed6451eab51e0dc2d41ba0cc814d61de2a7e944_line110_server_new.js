    , fs = require("fs-extra")
    , sys = require("sys")
    , isThere = require('is-there')
    , logger = require('winston');
function cleanUp(output, dir) {
    child.on('exit', function() {
        if(isThere.sync(output) === true){
            server.update = false;
        }
    });
}
server = {
    "start": function() {
        } else {
            logger.info('Starting server');
            }
        }
    },
}
