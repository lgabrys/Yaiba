module.exports = {
	playMovie: function (req, res, movieRequest){
		var ffmpeg = require('fluent-ffmpeg')
		, fs = require('fs')
		, probe = require('node-ffprobe')
		, helper = require('../../lib/helpers.js')
		, Encoder = require('node-html-encoder').Encoder
		, encoder = new Encoder('entity')
		, colors = require('colors')
		, ini = require('ini')
		, config = ini.parse(fs.readFileSync('./configuration/config.ini', 'utf-8'));

		var movie = null;
		fs.readdir(config.moviepath,function(err,files){
			if (err){
				console.log('error checking location of file:',err .red);
			}else{
				var allFiles = new Array();
				files.forEach(function(file){
					if (file.match(movieRequest)){
						movie = config.moviepath+file;

						console.log('Getting ready to play', movie);

						var stat = fs.statSync(movie);

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
				});
			};
		});
	},
	handler: function (req, res, infoRequest){
		//Modules
		var fs = require('fs')
		, downloader = require('downloader')
		, helper = require('../../lib/helpers.js')
		, colors = require('colors')
		, ini = require('ini')
		, config = ini.parse(fs.readFileSync('./configuration/config.ini', 'utf-8'))
		, dblite = require('dblite');
		var movieRequest = infoRequest
		, movieTitle = null
		, api_key = '7983694ec277523c31ff1212e35e5fa3'
		, cdNumber = null
		, original_name = 'No data found...'
		, poster_path = '/movies/css/img/nodata.jpg'
		, backdrop_path = '/movies/css/img/backdrop.png'
		, imdb_id = 'No data found...'
		, rating = 'No data found...'
		, runtime = 'No data found...'
		// Init Database
		dblite.bin = "./lib/database/sqlite3";
		var db = dblite('./lib/database/mcjs.sqlite');
		db.on('info', function (text) { console.log(text) });
		db.on('error', function (err) { console.error('Database error: ' + err) });

		console.log('Searching for '+movieRequest+' in database');
		getStoredData(movieRequest);


		//Get data if new movie
		function getData(movieRequest){
			if (fs.existsSync('./public/movies/data/'+movieRequest)) {
				console.log('dir already created',movieRequest .green);
			}else{
			var filename = movieRequest
			, stripped = filename.replace(/\.|_|\/|\+|\-/g," ")
			, noyear = stripped.replace(/([0-9]{4})|\(|\)|\[|\]/g,"")
			, releasegroups = noyear.replace(/FxM|aAF|arc|AAC|MLR|AFO|TBFA|WB|ARAXIAL|UNiVERSAL|ToZoon|PFa|SiRiUS|Rets|BestDivX|NeDiVx|ESPiSE|iMMORTALS|QiM|QuidaM|COCAiN|DOMiNO|JBW|LRC|WPi|NTi|SiNK|HLS|HNR|iKA|LPD|DMT|DvF|IMBT|LMG|DiAMOND|DoNE|D0PE|NEPTUNE|TC|SAPHiRE|PUKKA|FiCO|PAL|aXXo|VoMiT|ViTE|ALLiANCE|mVs|XanaX|FLAiTE|PREVAiL|CAMERA|VH-PROD|BrG|replica|FZERO/g, "")
			, movietype = releasegroups.replace(/dvdrip|multi9|xxx|web|hdtv|vhs|embeded|embedded|ac3|dd5 1|m sub|x264|dvd5|dvd9|multi sub|non sub|subs|ntsc|ingebakken|torrent|torrentz|bluray|brrip|sample|xvid|cam|camrip|wp|workprint|telecine|ppv|ppvrip|scr|screener|dvdscr|bdscr|ddc|R5|telesync|telesync|pdvd|1080p|hq|sd|720p|hdrip/gi, "")
			, noCountries = movietype.replace(/NL|SWE|SWESUB|ENG|JAP|BRAZIL|TURKIC|slavic|SLK|ITA|HEBREW|HEB|ESP|RUS|DE|german|french|FR|ESPA|dansk|HUN/g,"")
			, movieTitle = noCountries.replace(/cd [1-9]|cd[1-9]/gi,"").trimRight();
			cdNumber = filename.match(/cd [1-9]|cd[1-9]/gi,"");
			//&year="+ year.shift() +
			helper.xhrCall("http://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query="+movieTitle+"&language="+config.language+"&=", function(response) {
				var requestResponse = JSON.parse(response)
				, requestInitialDetails = requestResponse.results[0];
				downloadCache(requestInitialDetails,movieRequest,function(poster, backdrop) {
					if (requestInitialDetails !== undefined && requestInitialDetails !== '' && requestInitialDetails !== null) {
						var localImageDir = '/movies/data/'+movieRequest;
						poster_path = localImageDir+requestInitialDetails.poster_path;
						backdrop_path = localImageDir+requestInitialDetails.backdrop_path;
						id = requestInitialDetails.id;
						original_name = requestInitialDetails.original_title;
						helper.xhrCall("http://api.themoviedb.org/3/movie/"+id+"?api_key="+api_key+"&=", function(response) {
							if (response !== 'Nothing found.' && response !== undefined && response !== '' && response !== null) {
								var secondRequestResponse = JSON.parse(response);
								runtime = secondRequestResponse.runtime;
								imdb_id = secondRequestResponse.imdb_id;
							};

						});
					} else {
						writeData(original_name,poster_path,backdrop_path,imdb_id,rating,certification,genre,runtime,overview, function(){
						});
					}
				});
			});
		}

		function getStoredData(movieRequest){
			db.query(
				'SELECT * FROM movies WHERE local_name =? ', [movieRequest],{
					original_name  	: String,
					imdb_id  		: String,
					overview  : String
				},
				function(rows) {
					if (typeof rows !== 'undefined' && rows.length > 0){
						res.json(rows);
					} else {
					}
				}
			);
		}

		function downloadCache(response,movieRequest,callback){
			if (response !== undefined && response !== '' && response !== null) {

				var backdrop_url = "http://cf2.imgobject.com/t/p/w1920/"
				, poster_url = "http://cf2.imgobject.com/t/p/w342/"
				, poster = poster_url+response.poster_path
				, backdrop = backdrop_url+response.backdrop_path
				, downloadDir = './public/movies/data/'+movieRequest+'/';
			}
		};
	}
}
