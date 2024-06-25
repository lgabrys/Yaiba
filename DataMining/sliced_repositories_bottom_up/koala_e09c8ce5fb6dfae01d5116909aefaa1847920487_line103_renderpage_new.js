var fs             = require('fs-extra'),
	path           = require('path'),
	appConfig      = require('./appConfig.js').getAppConfig(),
	util           = require('./util.js'),
	locales        = appConfig.locales,
	sessionStorage = mainWindow.window.sessionStorage;
var getTemplates = function (dir) {
	var templates = [];
	function walk(root) {
		var dirList = fs.readdirSync(root);
		for (var i = 0; i < dirList.length; i++) {
			var item = dirList[i];
			if(fs.statSync(root + path.sep + item).isDirectory()) {
				} catch (e) {
				}

			} else {
				templates.push(root + path.sep + item);
			}
		}
	}
	walk(dir);
	return templates;
}
var compare = function (localesPackage) {
	var current = util.readJsonSync(localesPackage) || {},
		last = util.parseJSON(sessionStorage.getItem('lastLocalesPackage')) || {};
}

var renderContext = function (useExpandPack) {
	var contextJson,
		content;
	if (useExpandPack) {
		contextJson = appConfig.userDataFolder + '/locales/' + locales + '/context.json';
	} else {
		contextJson = global.appRootPth + '/locales/' + locales + '/context.json';
	}
	content = fs.readFileSync(contextJson, 'utf8');
	content = util.replaceJsonComments(content);
	if (useExpandPack) {
		content = fs.readFileSync(global.appRootPth + '/locales/en_us/context.json', 'utf8');
		content = util.replaceJsonComments(content);
	}
}
var renderViews = function (viewsJson, useExpandPack) {
	// translate templates
	var templateDir = global.appRootPth + '/views/template',
		templates = getTemplates(templateDir),
		data = util.readJsonSync(viewsJson) || {},
		defaultData = {};

	if (useExpandPack) {
		defaultData = util.readJsonSync(global.appRootPth + '/locales/en_us/views.json');
	}
	templates.forEach(function (item) {
		var content = fs.readFileSync(item, 'utf8'),
			fields = content.match(/\{\{(.*?)\}\}/g)
		if (fields) {
			var key, val;
			fields.forEach(function (item) {
				key = item.slice(2, -2);
				val = data[key] || defaultData[key] || key.replace(/\[\@(.*?)\]/, '');
				content = content.replace(item, val);
			});
		}
		var sessionName = item.split(/[\\|\/]template/).pop().replace(/\\|\//g, '-').replace(/\.html|\.jade/, '');
		if (path.extname(item) === '.jade') {
			sessionName = 'jade' + sessionName;
			sessionStorage.setItem('fileNameOf-' + sessionName, item);
		} else {
	});
}
