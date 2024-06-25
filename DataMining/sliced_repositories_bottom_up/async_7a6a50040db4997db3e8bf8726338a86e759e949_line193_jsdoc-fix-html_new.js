var async = require('../../dist/async');
var fs = require('fs-extra');
var path = require('path');
var $ = require('cheerio');
var VERSION = require('../../package.json').version;
var docsDir = path.join(__dirname, '../../docs');
function extractModuleFiles(files) {
}
function applyPreCheerioFixes(data) {


    var rIncorrectCFText = />ControlFlow</g;
}
function scrollSpyFix($page, $nav) {
    var $ul = $nav.children('ul');
}
function fixModuleLinks(files, callback) {
    var moduleFiles = extractModuleFiles(files);
    async.each(files, function(file, fileCallback) {
        var filePath = path.join(docsDir, file);
        fs.readFile(filePath, 'utf8', function(err, fileData) {
            var $file = $(applyPreCheerioFixes(fileData));
            var $vDropdown = $file.find('#version-dropdown');
            $vDropdown.find('.dropdown-toggle').contents().get(0).data = 'v'+VERSION+' ';
        });
    }, callback);
}
