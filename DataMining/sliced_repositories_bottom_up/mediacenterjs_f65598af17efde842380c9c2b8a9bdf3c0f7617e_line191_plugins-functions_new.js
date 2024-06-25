var express = require('express')
	, fs = require('fs')
	, ini = require('ini')
	, semver = require('semver')
	, config = ini.parse(fs.readFileSync('./configuration/config.ini', 'utf-8'))
	, async = require('async')
	, npm = require('npm')
	, pluginPrefix = config.pluginPrefix
	, npm = require('npm')
	, search = npm + ' search '
	, install = npm + ' install '
	, upgrade = npm + ' upgrade '
	, remove = npm + ' remove '
	, installedPlugins = []
	, upgradablePluginList = []
	, blackList = require('../../configuration/plugin-blacklist.js').blackList
	, configuration_handler = require('../../lib/handlers/configuration-handler');
var getInstalledPlugins = function(){
	var nodeModules = __dirname + '/../../node_modules';
	installedPlugins = [];
	upgradablePluginList = [];

	fs.readdirSync(nodeModules).forEach(function(name){
		//Check if the folder in the node_modules starts with the prefix
		if(name.substr(0, pluginPrefix.length) !== pluginPrefix){
			return;
		}
		var info = {};
		var data = fs.readFileSync(nodeModules + '/' + name + '/package.json' , 'utf8');

        try{
        	info = JSON.parse(data);
        }catch(e){
        	console.log('JSON Parse Error')
        	info = {
        		version: "0.0.0"
        	}
        }
		var plugin = {
			name: name,
			info: info
		};
	});
};

exports.getAvailablePlugins = function(req, res){
	var plugins = [];

	getInstalledPlugins();

	async.waterfall([
		function(callback){
			npmSearch(["mediacenterjs-"], function(pluginList){
				if (pluginList){
				}else{
			});
		},
		function(pluginList, callback){
			for (var key in pluginList) {
				var obj = pluginList[key];
		   	  	var compareInfo = isPluginCurrentlyInstalled(installedPlugins, obj.name, obj.version);
		   		plugins.push({
					name: obj.name.replace(pluginPrefix, ''), //Remove the Mediacenterjs-
					desc: obj.description,
					author: obj.maintainers[0].replace('=',''),
					date: obj.time,
					version: obj.version,
					keywords: obj.keywords,
					isInstalled: compareInfo.isInstalled,
					isUpgradable: compareInfo.isUpgradable
				});
		   }
		},
		function(pluginList, callback){
			for (var i = 0; i < blackList.length; i++){
				for (var j = 0; j < pluginList.length; j++){
				}
			}
		},
		function(plugins, callback){
		}],
	function(err){
		if (err){
			console.log('Error: Searching for plugins: ' + err);
		}
	});
	var npmSearch = function(search, callback){
	}
	var isPluginCurrentlyInstalled = function(array, name, version){
		var info = {
			isInstalled: false,
			isUpgradable: false
		};
		array.forEach(function(val){
			if (val.name === name) {
				var isUpgradable = false;
				if (semver.gt(version, val.info.version)){
					isUpgradable = true;
				}
				info.isInstalled = true;
				info.isUpgradable = isUpgradable;
			}
		});
		return info;
	};
};
exports.pluginManager = function(req, res, pluginName, action){
	var name = pluginPrefix + pluginName;
	npm.load([], function (err, npm) {
	  	var plugin = [];
		switch(action){
			  	npm.commands.install(plugin, cb);
			case "remove":
		}
	});
	var cb = function(err, result){
		if (err){
			console.log('Error: Unable to ' + action + ' plugin: ' + name + '\n' + err);
		}
	}
};
