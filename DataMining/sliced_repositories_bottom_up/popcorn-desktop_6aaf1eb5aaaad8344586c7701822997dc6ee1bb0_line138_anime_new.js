'use strict';
var _ = require('lodash');
var Generic = require('./generic');
var inherits = require('util').inherits;
var AnimeApi = function(args) {
};

AnimeApi.prototype.config = {
  name: 'AnimeApi',
  uniqueId: 'mal_id',
  tabName: 'Animes',
  type: 'anime',
  metadata: 'trakttv:anime-metadata'
};
function formatFetch(animes) {
  var results = _.map(animes, function(anime) {
  });
}
function formatDetail(anime) {
}
function get(index, url, that) {
}
AnimeApi.prototype.extractIds = function(items) {
};

AnimeApi.prototype.fetch = function(filters) {
  var that = this;
  var params = {};
  params.sort = 'seeds';
  params.limit = '50';
  if (filters.keywords) {
    params.keywords = this.apiURL[0].includes('popcorn-ru') ? filters.keywords.replace(/\s/g, '% ') : filters.keywords.replace(/[^a-zA-Z0-9]|\s/g, '% ');
  }
};
