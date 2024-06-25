
/* Modules */
var express = require('express')
, app = express()
, fs = require('fs.extra')
, downloader = require('downloader')
, rimraf = require('rimraf')
, request = require("request")
, helper = require('../../lib/helpers.js')
, Encoder = require('node-html-encoder').Encoder;

// entity type encoder
var encoder = new Encoder('entity');

exports.engine = 'jade';

var configfile = []
,configfilepath = './configuration/setup.js'
,configfile = fs.readFileSync(configfilepath)
,configfileResults = JSON.parse(configfile);

// Choose your render engine. The default choice is JADE:  http://jade-lang.com/
exports.engine = 'jade';

// Render the indexpage
exports.index = function(req, res, next){
	var dir = configfileResults.musicpath
	, writePath = './public/music/data/musicindex.js'
	, getDir = true
	, fileTypes = new RegExp("\.(mp3)","g");

	helper.getLocalFiles(req, res, dir, writePath, getDir, fileTypes, function(status){
		var musicfiles = []
		,musicfilepath = './public/music/data/musicindex.js'
		,musicfiles = fs.readFileSync(musicfilepath)
		,musicfileResults = JSON.parse(musicfiles)

		res.render('music',{
			music: musicfileResults,
			status:status
		});
	});
};

exports.album = function(req, res, next){
	var incomingFile = req.body
	, dir = configfileResults.musicpath+encoder.htmlDecode(incomingFile.album)+'/'
	, writePath = './public/music/data/'+encoder.htmlEncode(incomingFile.album)+'/album.js'
	, getDir = false
	, fileTypes = new RegExp("\.(mp3)","g");

	helper.getLocalFiles(req, res, dir, writePath, getDir, fileTypes, function(status){
		var musicfiles = []
		, musicfiles = fs.readFileSync(writePath)
		, musicfileResults = JSON.parse(musicfiles)
		res.send(musicfileResults);
	});
};

exports.track = function(req, res, next){
	var bitrate = '320k'
	var decodeTrack = encoder.htmlDecode(req.params.track).replace(/\^/gi,"/")
	if (req.params.album === 'none'){
		var track = configfileResults.musicpath+decodeTrack
	}else {
		var track = configfileResults.musicpath+encoder.htmlDecode(req.params.album)+'/'+decodeTrack
	}

	console.log('Streaming track:',track)
};
