


exports.engine = 'jade';

/* Modules */
var express = require('express')
, app = express()
, fs = require('fs')
, ini = require('ini')
, config = ini.parse(fs.readFileSync('./configuration/config.ini', 'utf-8'))
, exec = require('child_process').exec
, async = require('async')
, functions = require('./plugins-functions');

exports.engine = 'jade';
exports.index = function(req, res, next){
	res.render('plugins',{
		selectedTheme: config.theme
	});
};
exports.get = function(req, res, next){
	var infoRequest = req.params.id
	, optionalParam = req.params.optionalParam
	, action = req.params.action;
	if(!action){
		switch(optionalParam) {
				functions.installPlugin(req,res);
		}
	}
}
