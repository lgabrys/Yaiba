	Datastore = require('nedb'),
	path = require('path'),
	Q = require('q'),
	db = {},
	data_path = require('nw.gui').App.dataPath,
db.bookmarks = new Datastore({
	filename: path.join(data_path, 'data/bookmarks.db'),
	autoload: true
});
db.settings = new Datastore({
	filename: path.join(data_path, 'data/settings.db'),
	autoload: true
});
db.tvshows = new Datastore({
	filename: path.join(data_path, 'data/shows.db'),
	autoload: true
});
db.movies = new Datastore({
	filename: path.join(data_path, 'data/movies.db'),
	autoload: true
});
db.watched = new Datastore({
	filename: path.join(data_path, 'data/watched.db'),
	autoload: true
});

db.tvshows.ensureIndex({
	fieldName: 'tvdb_id',
	unique: true
});
db.bookmarks.ensureIndex({
	fieldName: 'imdb_id',
	unique: true
});
var extractIds = function (items) {
};
var extractMovieIds = function (items) {
};
var promisifyDb = function (obj) {
};
var Database = {
	addMovie: function (data) {
		return db.movies.insert(data);
	},

	deleteMovie: function (imdb_id) {
		return db.movies.remove({
			imdb_id: imdb_id
		});
	},

	getMovie: function (imdb_id) {
		return promisifyDb(db.movies.findOne({
			imdb_id: imdb_id
		}));
	},

	addBookmark: function (imdb_id, type) {
		App.userBookmarks.push(imdb_id);
		return db.bookmarks.insert({
			imdb_id: imdb_id,
			type: type
		});
	},

	deleteBookmark: function (imdb_id) {
		App.userBookmarks.splice(App.userBookmarks.indexOf(imdb_id), 1);
		return db.bookmarks.remove({
			imdb_id: imdb_id
		});
	},

	getBookmark: function (imdb_id) {
		win.warn('what is this even supposed to do? It isn\'t used anywhere');
		return promisifyDb(db.bookmarks.findOne({
			imdb_id: imdb_id
		}));
	},

	deleteBookmarks: function () {
		return db.bookmarks.remove({}, {
			multi: true
		});
	},

	deleteWatched: function () {
		return db.watched.remove({}, {
			multi: true
		});
	},

	// format: {page: page, keywords: title}
	getBookmarks: function (data) {
		var page = data.page - 1;
		var byPage = 30;
		var offset = page * byPage;
		var query = {};

		return promisifyDb(db.bookmarks.find(query).skip(offset).limit(byPage));
	},

	getAllBookmarks: function () {
		win.warn('this used to use .exec after the find');

		return promisifyDb(db.bookmarks.find({}))
			.then(function (data) {
				var bookmarks = [];
				if (data) {
					bookmarks = extractIds(data);
				}

				return bookmarks;
			});
	},

	addMovies: function (data) {
		win.warn('addTvShow in addMovies seems like a bug');
		win.warn('this isnt called anywhere');

		var promises = data.movies.map(function (movie) {
			return Database.addTVShow({
				movie: movie
			});
		});

		return Q.all(promises);
	},

	markMoviesWatched: function (data) {
		return db.watched.insert(data);
	},

	markMovieAsWatched: function (data, trakt) {
		if (data.imdb_id) {
			if (trakt !== false) {
				App.Trakt.movie.seen(data.imdb_id);
			}
			App.watchedMovies.push(data.imdb_id);

			return db.watched.insert({
				movie_id: data.imdb_id.toString(),
				date: new Date(),
				type: 'movie'
			});
		}

		win.warn('This shouldn\'t be called');

		return Q();
	},

	markMovieAsNotWatched: function (data, trakt) {
		if (trakt !== false) {
			App.Trakt.movie.unseen(data.imdb_id);
		}

		App.watchedMovies.splice(App.watchedMovies.indexOf(data.imdb_id), 1);

		return db.watched.remove({
			movie_id: data.imdb_id.toString()
		});
	},

	isMovieWatched: function (data) {
		win.warn('this isn\'t used anywhere');

		return promisifyDb(db.watched.find({
				movie_id: data.imdb_id.toString()
			}))
			.then(function (data) {
				return (data != null && data.length > 0);
			});
	},

	getMoviesWatched: function () {
		return promisifyDb(db.watched.find({
			type: 'movie'
		}));
	},

	/*******************************
	 *******     SHOWS       ********
	 *******************************/


	addTVShow: function (data) {
		return db.tvshows.insert(data);
	},

	// This calls the addTVShow method as we need to setup a blank episodes array for each
	addTVShows: function (data) {
		win.warn('this isnt called anywhere');

		var promises = data.shows.map(function (show) {
			return Database.addTVShow({
				show: show
			});
		});

		return Q.all(promises);
	},

	markEpisodeAsWatched: function (data) {
		return promisifyDb(db.watched.find({
				tvdb_id: data.tvdb_id.toString()
			}))
			.then(function (response) {
				if (response.length === 0) {
					App.watchedShows.push(data.imdb_id.toString());
				}
			}).then(function () {


				return db.watched.insert({
					tvdb_id: data.tvdb_id.toString(),
					imdb_id: data.imdb_id.toString(),
					season: data.season.toString(),
					episode: data.episode.toString(),
					type: 'episode',
					date: new Date()
				});

			})

		.then(function () {
			App.vent.trigger('show:watched:' + data.tvdb_id, data);
		});


	},

	markEpisodesWatched: function (data) {
		return db.watched.insert(data);
	},

	markEpisodeAsNotWatched: function (data, trakt) {
		if (trakt !== false) {
			App.Trakt.show.episodeUnseen(data.tvdb_id, {
				season: data.season,
				episode: data.episode
			});
		}

		return promisifyDb(db.watched.find({
				tvdb_id: data.tvdb_id.toString()
			}))
			.then(function (response) {
				if (response.length === 1) {
					App.watchedShows.splice(App.watchedShows.indexOf(data.imdb_id.toString()), 1);
				}
			})
			.then(function () {
				return db.watched.remove({
					tvdb_id: data.tvdb_id.toString(),
					imdb_id: data.imdb_id.toString(),
					season: data.season.toString(),
					episode: data.episode.toString()
				});
			})
			.then(function () {
				App.vent.trigger('show:unwatched:' + data.tvdb_id, data);
			});
	},

	checkEpisodeWatched: function (data) {
		return promisifyDb(db.watched.find({
				tvdb_id: data.tvdb_id.toString(),
				imdb_id: data.imdb_id.toString(),
				season: data.season.toString(),
				episode: data.episode.toString()
			}))
			.then(function (data) {
				return (data != null && data.length > 0);
			});
	},

	// return an array of watched episode for this
	// tvshow
	getEpisodesWatched: function (tvdb_id) {
		return promisifyDb(db.watched.find({
			tvdb_id: tvdb_id.toString()
		}));
	},

	getAllEpisodesWatched: function () {
		return promisifyDb(db.watched.find({
			type: 'episode'
		}));
	},
	// deprecated: moved to provider
	// TODO: remove once is approved
	getSubtitles: function (data) {
		win.warn('This function is deprecated, also, nothing is currently using it.');
	},

	// Used in bookmarks
	deleteTVShow: function (imdb_id) {
		return db.tvshows.remove({
			imdb_id: imdb_id
		});
	},

	// Used in bookmarks
	getTVShow: function (data) {
		win.warn('this isn\'t used anywhere');

		return promisifyDb(db.tvshows.findOne({
			_id: data.tvdb_id
		}));
	},

	// Used in bookmarks
	getTVShowByImdb: function (imdb_id) {
		return promisifyDb(db.tvshows.findOne({
			imdb_id: imdb_id
		}));
	},

	// TO BE REWRITTEN TO USE TRAKT INSTEAD
	getImdbByTVShow: function (tvshow) {
		win.warn('this isn\'t used anywhere');

		return promisifyDb(db.tvshows.findOne({
			title: tvshow
		}));
	},

	getSetting: function (data) {
		return promisifyDb(db.settings.findOne({
			key: data.key
		}));
	},

	getSettings: function () {
		win.debug('getSettings() fired');
		return promisifyDb(db.settings.find({}));
	},

	getUserInfo: function () {
		var bookmarks = Database.getAllBookmarks()
			.then(function (data) {
				App.userBookmarks = data;
			});

		var movies = Database.getMoviesWatched()
			.then(function (data) {
				App.watchedMovies = extractMovieIds(data);
			});

		var episodes = Database.getAllEpisodesWatched()
			.then(function (data) {
				App.watchedShows = extractIds(data);
			});

		return Q.all([bookmarks, movies, episodes]);
	},

	// format: {key: key_name, value: settings_value}
	writeSetting: function (data) {
		return Database.getSetting({
				key: data.key
			})
			.then(function (result) {
				if (result) {
					return db.settings.update({
						'key': data.key
					}, {
						$set: {
							'value': data.value
						}
					}, {});
				} else {
					return db.settings.insert(data);
				}
			});
	},

	resetSettings: function () {
		return db.settings.remove({}, {
			multi: true
		});
	},

	deleteDatabases: function () {

		fs.unlinkSync(path.join(data_path, 'data/watched.db'));

		fs.unlinkSync(path.join(data_path, 'data/movies.db'));

		fs.unlinkSync(path.join(data_path, 'data/bookmarks.db'));

		fs.unlinkSync(path.join(data_path, 'data/shows.db'));

		fs.unlinkSync(path.join(data_path, 'data/settings.db'));

		return Q.Promise(function (resolve, reject) {
			var req = indexedDB.deleteDatabase(App.Config.cache.name);
			req.onsuccess = function () {
				resolve();
			};
			req.onerror = function () {
				resolve();
			};
		});

	},

	initialize: function () {
		App.vent.on('show:watched', _.bind(this.markEpisodeAsWatched, this));
		App.vent.on('show:unwatched', _.bind(this.markEpisodeAsNotWatched, this));
		App.vent.on('movie:watched', _.bind(this.markMovieAsWatched, this));

		// we'll intiatlize our settings and our API SSL Validation
		// we build our settings array
		return Database.getUserInfo()
			.then(Database.getSettings)
			.then(function (data) {
				if (data != null) {
					for (var key in data) {
						Settings[data[key].key] = data[key].value;
					}
				} else {
					win.warn('is it possible to get here');
				}

				// new install?
				if (Settings.version === false) {
					window.__isNewInstall = true;
				}

				App.vent.trigger('initHttpApi');

				return AdvSettings.checkApiEndpoints([
					Settings.ytsAPI,
					Settings.tvshowAPI,
					Settings.updateEndpoint
				]);
			})
			.then(function () {
				// set app language
				window.setLanguage(Settings.language);
				// set hardware settings and usefull stuff
				return AdvSettings.setup();
			})
			.then(function () {
				App.Trakt = App.Config.getProvider('metadata');
				// check update
				var updater = new App.Updater();

				updater.update()
					.catch(function (err) {
						win.error(err);
					});

				// we look if VPN is connected
				App.VPNClient.isRunning();

			})
			.catch(function (err) {
				win.error('Error starting up');
				win.error(err);
			});
	}
};
