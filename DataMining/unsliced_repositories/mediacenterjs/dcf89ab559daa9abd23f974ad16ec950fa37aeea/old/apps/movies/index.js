/*
	MediaCenterJS - A NodeJS based mediacenter solution
	
    Copyright (C) 2013 - Jan Smolders

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

exports.engine = 'jade';

/* Modules */
var express = require('express')
, app = express()
, fs = require('fs')
, downloader = require('downloader')
, request = require("request")
, ffmpeg = require('fluent-ffmpeg')
, probe = require('node-ffprobe')
, util = require('util')
, helper = require('../../lib/helpers.js')
, Encoder = require('node-html-encoder').Encoder
, encoder = new Encoder('entity')
, colors = require('colors')
, ini = require('ini')
, config = ini.parse(fs.readFileSync('./configuration/config.ini', 'utf-8'));

exports.index = function(req, res, next){	
	var writePath = './public/movies/data/movieindex.js'
	, getDir = false
	, dir = config.moviepath
	, fileTypes = new RegExp("\.(avi|mkv|mpeg|mov|mp4)","g");;

	helper.getLocalFiles(req, res, dir, writePath, getDir, fileTypes,  function(status){
		var moviefiles = []
		,moviefilepath = './public/movies/data/movieindex.js'
		,moviefiles = fs.readFileSync(moviefilepath)
		,moviefileResults = JSON.parse(moviefiles)	
		
		res.render('movies',{
			movies: moviefileResults,
			selectedTheme: config.theme,
			status:status
		});
	});
};

exports.play = function(req, res){
	var movieTitle = encoder.htmlDecode(req.params.filename)
	, movie = config.moviepath + movieTitle;
	
	console.log('Getting ready to play', movie .green)
		
	var stat = fs.statSync(movie)
	res.writeHead(200, {
		'Content-Type':'video/flv',
		'Content-Length':stat.size,
	});
	
	probe(movie, function(err, probeData) {
		if (err){
			console.log('Can not probe movie for metadata', err .red)
		} else {
			var metaDuration =  '-metadata duration="'+probeData.streams[0].duration+'"'
			, tDuration =  '-t '+probeData.streams[0].duration
			, proc = new ffmpeg({ source: movie, nolog: true, timeout:15000}) 
			.addOptions(['-y','-ss 0','-b 800k','-vcodec libx264','-acodec mp3','-ab 128','-ar 44100','-bufsize 62000', '-maxrate 620k',metaDuration,tDuration,'-f flv'])
			.writeToStream(res, function(retcode, error){
				if (!error){
					console.log('file has been converted succesfully',retcode .green);
				}else{
					console.log('file conversion error',error .red);
				}
			});
		}
	});
	
}

exports.post = function(req, res, next){	
	var movieTitle = null
	, path = './public/movies/data/'
	, api_key = '7983694ec277523c31ff1212e35e5fa3'
	, cdNumber = null
	, id = 'No data found...'
	, poster_path = '/movies/css/img/nodata.jpg'
	, backdrop_path = '/movies/css/img/backdrop.png'
	, original_name = 'No data found...'
	, imdb_id = 'No data found...'
	, rating = 'No data found...'
	, certification = 'No data found...'
	, genre = 'No data found...'
	, runtime = 'No data found...'
	, overview = 'No data found...';
	
	var scraperdata = new Array()
	,scraperdataset = null;

	var incommingFile = req.body
	, incommingMovieTitle = incommingFile.movieTitle
	, movieRequest = '';
	
	if (incommingMovieTitle.match(/\//)) { 
		var strippingFile = incommingMovieTitle.split('/');
		movieRequest = strippingFile[1];
	}else{ 
		movieRequest = incommingMovieTitle;
	}

	if (fs.existsSync('./public/movies/data/'+movieRequest)) {
		checkDirForCorruptedFiles(movieRequest)
	} else {
		fs.mkdir('./public/movies/data/'+movieRequest, 0777, function (err) {
			if (err) {
				console.log('Error creating folder',err .red);
			} else {
				console.log('Directory '+movieRequest+' created' .green);

				var filename = movieRequest
				, year = filename.match(/19\d{2}|20\d{2/)
				, stripped = filename.replace(/\.|_|\/|\+|\-/g," ")
				, noyear = stripped.replace(/([0-9]{4})|\(|\)|\[|\]/g,"")
				, releasegroups = noyear.replace(/FxM|aAF|arc|AAC|MLR|AFO|TBFA|WB|ARAXIAL|UNiVERSAL|ToZoon|PFa|SiRiUS|Rets|BestDivX|NeDiVx|ESPiSE|iMMORTALS|QiM|QuidaM|COCAiN|DOMiNO|JBW|LRC|WPi|NTi|SiNK|HLS|HNR|iKA|LPD|DMT|DvF|IMBT|LMG|DiAMOND|DoNE|D0PE|NEPTUNE|TC|SAPHiRE|PUKKA|FiCO|PAL|aXXo|VoMiT|ViTE|ALLiANCE|mVs|XanaX|FLAiTE|PREVAiL|CAMERA|VH-PROD|BrG|replica|FZERO/g, "")
				, movietype = releasegroups.replace(/dvdrip|multi9|xxx|web|hdtv|vhs|embeded|embedded|ac3|dd5 1|m sub|x264|dvd5|dvd9|multi sub|non sub|subs|ntsc|ingebakken|torrent|torrentz|bluray|brrip|sample|xvid|cam|camrip|wp|workprint|telecine|ppv|ppvrip|scr|screener|dvdscr|bdscr|ddc|R5|telesync|telesync|pdvd|1080p|hq|sd|720p|hdrip/gi, "")
				, noCountries = movietype.replace(/NL|SWE|SWESUB|ENG|JAP|BRAZIL|TURKIC|slavic|SLK|ITA|HEBREW|HEB|ESP|RUS|DE|german|french|FR|ESPA|dansk|HUN/g,"")
				, noCD = noCountries.replace(/cd [1-9]|cd[1-9]/gi,"");
				
				cdNumber = filename.match(/cd [1-9]|cd[1-9]/gi,"");
				movieTitle = noCD.replace(/avi|mkv|mpeg|mpg|mov|mp4|wmv|txt/gi,"").trimRight();
				// TODO: Fix year param
				//if (year.shift() == null) year = ''
				//&year="+ year.shift() +

				helper.xhrCall("http://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query="+movieTitle+"&language="+config.language+"&=", function(response) {

					var requestResponse = JSON.parse(response)
					, requestInitialDetails = requestResponse.results[0];
					
					downloadCache(requestInitialDetails,function(poster, backdrop) {

						if (requestInitialDetails !== undefined && requestInitialDetails !== '' && requestInitialDetails !== null) {
							var localImageDir = '/movies/data/'+movieRequest+'/';
							
							poster_path = localImageDir+requestInitialDetails.poster_path;
							backdrop_path = localImageDir+requestInitialDetails.backdrop_path;
							id = requestInitialDetails.id;
							original_name = requestInitialDetails.original_title;
								
							helper.xhrCall("http://api.themoviedb.org/3/movie/"+id+"?api_key="+api_key+"&=", function(response) {
							
								if (response !== 'Nothing found.' && response !== undefined && response !== '' && response !== null) {
									var secondRequestResponse = JSON.parse(response);
									
									genre = secondRequestResponse.genres[0].name;
									runtime = secondRequestResponse.runtime;
									imdb_id = secondRequestResponse.imdb_id;
									// Needs seperate call
									// rating = secondRequestResponse.rating;
									// certification = requestInitialDetails.certification;
									overview = secondRequestResponse.overview;
								};
								writeData(path,id,genre,runtime,original_name,imdb_id,rating,certification,overview,poster,backdrop,cdNumber);

							});
						} else {
							writeData(path,id,genre,runtime,original_name,imdb_id,rating,certification,overview,poster,backdrop,cdNumber);
						}

					}); 

				});
			}
		});
	};
	
	function downloadCache(response,callback){
		if (response !== undefined && response !== '' && response !== null) {

			var backdrop_url = "http://cf2.imgobject.com/t/p/w1920/"
			, poster_url = "http://cf2.imgobject.com/t/p/w342/"
			, poster = poster_url+response.poster_path
			, backdrop = backdrop_url+response.backdrop_path
			, downloadDir = './public/movies/data/'+movieRequest+'/';
			
			downloader.on('done', function(msg) { console.log('done', msg); });
			downloader.on('error', function(msg) { console.log('error', msg); });
			downloader.download(poster, downloadDir);
			downloader.download(backdrop, downloadDir);
		}else{
			var poster = poster_path
			, backdrop = backdrop_path;
		};
		callback(poster,backdrop);
	};
	
	
	function checkDirForCorruptedFiles(movieRequest){
		var checkDir = './public/movies/data/'+movieRequest

		if(fs.existsSync('./public/movies/data/'+movieRequest+'/data.js')){
			fs.stat('./public/movies/data/'+movieRequest+'/data.js', function (err, stats) {		
				if(stats.size == 0){
					helper.removeBadDir(req, res, checkDir)
				} else {
					fs.readFile('./public/movies/data/'+movieRequest+'/data.js', 'utf8', function (err, data) {
						if(!err){
							res.send(data);
						}else if(err){
							helper.removeBadDir(req, res, checkDir)
						}
					});
				}
			});
		} else {
			helper.removeBadDir(req, res, checkDir);
		}
	};
	
	function writeData(path,id,genre,runtime,original_name,imdb_id,rating,certification,overview,poster,backdrop,cdNumber){		
		var scraperdata = new Array()
		,scraperdataset = null;
		
		scraperdataset = { path:incommingMovieTitle, id:id, genre:genre, runtime:runtime, original_name:original_name, imdb_id:imdb_id, rating:rating, certification:certification, overview:overview, poster:poster_path, backdrop:backdrop_path, cdNumber:cdNumber }
		scraperdata[scraperdata.length] = scraperdataset;
		var dataToWrite = JSON.stringify(scraperdata, null, 4);
		var writePath = './public/movies/data/'+movieRequest+'/data.js'
		
		helper.writeToFile(req,res,writePath,dataToWrite);
							
	};

};